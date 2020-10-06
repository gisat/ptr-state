import {createSelector} from 'reselect';
import createCachedSelector from "re-reselect";
import _ from 'lodash';
import {map as mapUtils} from "@gisatcz/ptr-utils";
import {mapConstants} from "@gisatcz/ptr-core";
import {utils as tileGridUtils, grid} from "@gisatcz/ptr-tile-grid";

/* === HELPERS ======================================================================= */

/**
 * Get background layer in 'layer' format
 */
const getBackgroundLayerAsLayer = createCachedSelector(
    [
        (backgroundLayer) => backgroundLayer
    ],
    (backgroundLayer) => {
        if (backgroundLayer) {
            return {...backgroundLayer, key: 'pantherBackgroundLayer'};
        } else {
            return null;
        }
    }
)(backgroundLayer => JSON.stringify(backgroundLayer));


/**
 * Merge background layer definition with layers to one collection
 */
const mergeBackgroundLayerWithLayers = createCachedSelector(
    [
        (backgroundLayer) => getBackgroundLayerAsLayer(backgroundLayer),
        (backgroundLayer, layers) => layers
    ],
    (backgroundLayer, layers) => {
        let finalLayers = [];

        if (layers) {
            finalLayers = layers || [];
        }

        if (backgroundLayer) {
            finalLayers = [backgroundLayer, ...finalLayers];
        }

        return finalLayers?.length ? finalLayers : null;
    }
)((backgroundLayer, layers) => `${JSON.stringify(backgroundLayer)}_${JSON.stringify(layers)}`);


const mergeModifiersAndFilterByActiveToLayerStructure = (layers, metadataModifiers, filterByActive) => {
    return layers.map(layer => {
        let layerMetadataModifiers = (layer.metadataModifiers && metadataModifiers) ? {...metadataModifiers, ...layer.metadataModifiers} : (metadataModifiers || layer.metadataModifiers || null);
        let layerFilterByActive = (layer.filterByActive && filterByActive) ? {...filterByActive, ...layer.filterByActive} : (filterByActive || layer.filterByActive || null);

        return {...layer, metadataModifiers: layerMetadataModifiers, filterByActive: layerFilterByActive};
    });
}

const getView = (map, set) => {
    if (map) {
        if (set) {
            let mapView = map.data?.view;

            // omit synced view params from map
            if (set.sync && !_.isEmpty(set.sync)) {
                mapView = _.omitBy(mapView, (viewValue, viewKey) => {
                    return set.sync[viewKey];
                });
            }

            let mapSetView = set.data?.view;
            let view = mapUtils.view.mergeViews(mapConstants.defaultMapView, mapSetView, mapView);
            return !_.isEmpty(view) ? view : null;
        } else {
            let view = map.data?.view;
            return mapUtils.view.mergeViews(mapConstants.defaultMapView, view);
        }
    } else {
        return null;
    }
}

/**
 * Get zoom level of current view represented by mapWidth, mapHeight and boxRange.
 */
const getZoomLevel = createCachedSelector(
    [
        (mapWidth) => mapWidth,
        (mapWidth, mapHeight) => mapHeight,
        (mapWidth, mapHeight, boxRange) => boxRange,
    ],
    (mapWidth, mapHeight, boxRange) => {
        const viewportRange = mapUtils.view.getMapViewportRange(mapWidth, mapHeight);
		const levelBoxRange = mapUtils.view.getNearestZoomLevelBoxRange(mapWidth, mapHeight, boxRange);
        const level = grid.getLevelByViewport(levelBoxRange, viewportRange);
        return level
    }
)((mapWidth, mapHeight, boxRange) => `${mapWidth}${mapHeight}${boxRange}`);

/**
 * Get tiles intersected by map extent.
 * Map extent is represented by mapWidth, mapHeight, center and boxRange.
 */
const getTiles = createCachedSelector(
    [
        (mapWidth) => mapWidth,
        (mapWidth, mapHeight) => mapHeight,
        (mapWidth, mapHeight, center) => center,
        (mapWidth, mapHeight, center, boxRange) => boxRange,
    ],
    (mapWidth, mapHeight, center, boxRange) => {
		const levelBoxRange = mapUtils.view.getNearestZoomLevelBoxRange(mapWidth, mapHeight, boxRange);
		const lonLat = [center.lon, center.lat];
        const tileGrid = grid.getTileGrid(mapWidth, mapHeight, levelBoxRange, lonLat, true);
        return tileGrid.flat(1);
    }
)((mapWidth, mapHeight, center, boxRange) => `${mapWidth}${mapHeight}${center.lon}${center.lat}${boxRange}`);

const getLayerByDataSourceType = (index, layerKey, layerState, dataSource) => {
	let {attribution, nameInternal, type, tableName, layerName, features, selected, ...options} = dataSource;

	if (type === 'wmts') {
		options.url = options.urls[0];
	} else if (type === 'wms') {
		const {url, params, configuration, ...rest} = options;
		const singleTile = configuration && configuration.hasOwnProperty('singleTile') ? configuration.singleTile : false;

		options = {
			params: {
				...params,
				layers: rest.layers,
				styles: rest.styles,
			},
			singleTile,
			url
		}
	}

	return {
		key: layerKey + '_' + index,
		name: layerState.name,
		layerKey: layerKey,
		opacity: (layerState && layerState.opacity) || 1,
		type,
		options
	};
};

export default {
    getBackgroundLayerAsLayer,
	getLayerByDataSourceType,
    getTiles,
    getView,
    getZoomLevel,
    mergeBackgroundLayerWithLayers,
	mergeModifiersAndFilterByActiveToLayerStructure
}