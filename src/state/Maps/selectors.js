import {createSelector} from 'reselect';
import createCachedSelector from "re-reselect";
import _ from 'lodash';
import * as path from "path";

import {CacheFifo, map as mapUtils} from '@gisatcz/ptr-utils';
import mapHelpers from './helpers';

import commonSelectors from "../_common/selectors";
import LayerTemplatesSelectors from '../LayerTemplates/selectors';
import SpatialDataSourcesSelectors from '../SpatialDataSources/selectors';
import AttributeDataSelectors from '../AttributeData/selectors';
import AttributeDataSourcesSelectors from '../AttributeDataSources/selectors';
import AppSelectors from '../App/selectors';
// import {mapConstants} from '@gisatcz/ptr-core';
import StylesSelectors from "../Styles/selectors";
import SelectionsSelectors from "../Selections/selectors";
import PeriodsSelectors from "../Periods/selectors";
import AppSelect from "../App/selectors";

const defaultMapView = {
	center: {
		lat: 50.099577,
		lon: 14.425960
	},
	boxRange: 10000000,
	tilt: 0,
	roll: 0,
	heading: 0
};

const mapConstants = {defaultMapView};

let getBackgroundLayerCache = new CacheFifo(10);
let getLayersCache = new CacheFifo(10);

/* ===== Basic selectors ==================== */
const getSubstate = state => state.maps;

const getMapsAsObject = state => state.maps.maps;
const getMapSetsAsObject = state => state.maps.sets;

const getActiveSetKey = state => state.maps.activeSetKey;
const getActiveMapKey = state => state.maps.activeMapKey;

const getActiveMap = createSelector(
    [
        getMapsAsObject,
        getActiveMapKey
    ],
    (maps, activeKey) => {
        if (maps && !_.isEmpty(maps) && activeKey && maps[activeKey]) {
            return maps[activeKey];
        } else {
            return null;
        }
    }
);

const getActiveMapViewport = createSelector(
	[
		getActiveMap
	],
	(map) => {
		if(!_.isEmpty(map)) {
			return map?.data?.viewport;
		} else {
			return null;
		}
	}
);

const getMaps = createSelector(
	[getMapsAsObject],
	(maps) => {
		if (maps && !_.isEmpty(maps)) {
			return Object.values(maps);
		} else {
			return null;
		}
	}
);

const getMapSets = createSelector(
	[getMapSetsAsObject],
	(sets) => {
		if (sets && !_.isEmpty(sets)) {
			return Object.values(sets);
		} else {
			return null;
		}
	}
);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getMapByKey = createCachedSelector(
	[getMapsAsObject,
	(state, key) => key],
	(maps, key) => {
		if (maps && !_.isEmpty(maps) && key) {
			return maps[key] ? maps[key] : null;
		} else {
			return null;
		}
	}
)((state, key) => key);


const getMapLayersByMapKey = createSelector(
	[getMapByKey],
	(map) => {
		return map && map.data && map.data.layers || null;
	}
);



/**
 * @param state {Object}
 * @param setKey {string}
 */
const getMapSetByKey = createSelector(
	[getMapSetsAsObject,
	(state, key) => key],
	(sets, key) => {
		if (sets && !_.isEmpty(sets) && key) {
			return sets[key] ? sets[key] : null;
		} else {
			return null;
		}
	}
);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getMapSetByMapKey = createSelector(
	[getMapSets,
	(state, mapKey) => (mapKey)],
	(sets, mapKey) => {
		if (sets && !_.isEmpty(sets) && mapKey) {
			let setForMap = null;
			sets.forEach((set) => {
				if (set.maps && _.includes(set.maps, mapKey)) {
					setForMap = set;
				}
			});
			return setForMap;
		} else {
			return null;
		}
	}
);

/**
 * @param state {Object}
 * @param setKey {string}
 */
const getMapSetMapKeys = createSelector(
	[getMapSetByKey],
	(set) => {
		if (set && set.maps && set.maps.length) {
			return set.maps;
		} else {
			return null;
		}
	}
);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getMapBackgroundLayerStateByMapKey = createSelector(
	[
		getMapByKey
	],
	(map) => {
		if (map && map.data && map.data.backgroundLayer) {
			return map.data.backgroundLayer;
		} else {
			return null;
		}
	}
);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getMapLayersStateByMapKey = createSelector(
	[
		getMapByKey
	],
	(map) => {
		if (map && map.data && map.data.layers) {
			return map.data.layers;
		} else {
			return null;
		}
	}
);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getMapMetadataModifiersByMapKey = createSelector(
	[
		getMapByKey
	],
	(map) => {
		if (map && map.data && map.data.metadataModifiers) {
			return map.data.metadataModifiers;
		} else {
			return null;
		}
	}
);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getMapFilterByActiveByMapKey = createSelector(
	[
		getMapByKey
	],
	(map) => {
		if (map && map.data && map.data.filterByActive) {
			return map.data.filterByActive;
		} else {
			return null;
		}
	}
);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getMapSetBackgroundLayerStateByMapKey = createSelector(
	[
		getMapSetByMapKey
	],
	(set) => {
		if (set && set.data && set.data.backgroundLayer) {
			return set.data.backgroundLayer;
		} else {
			return null;
		}
	}
);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getMapSetLayersStateByMapKey = createSelector(
	[
		getMapSetByMapKey
	],
	(set) => {
		if (set && set.data && set.data.layers) {
			return set.data.layers;
		} else {
			return null;
		}
	}
);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getMapSetMetadataModifiersByMapKey = createSelector(
	[
		getMapSetByMapKey
	],
	(set) => {
		if (set && set.data && set.data.metadataModifiers) {
			return set.data.metadataModifiers;
		} else {
			return null;
		}
	}
);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getMapSetFilterByActiveByMapKey = createSelector(
	[
		getMapSetByMapKey
	],
	(set) => {
		if (set && set.data && set.data.filterByActive) {
			return set.data.filterByActive;
		} else {
			return null;
		}
	}
);

/**
 * @param state {Object}
 * @param mapSetKey {string}
 */
const getMapSetLayersStateBySetKey = createSelector(
	[
		getMapSetByKey
	],
	(set) => {
		if (set && set.data && set.data.layers) {
			return set.data.layers;
		} else {
			return null;
		}
	}
);

/**
 * @param state {Object}
 * @param mapKey {string}
 * @param layerKey {string}
 */
const getMapLayerByMapKeyAndLayerKey = createSelector(
	[getMapLayersStateByMapKey, (state, mapKey, layerKey) => layerKey],
	(layers, layerKey) => {
		if (layers && layerKey) {
			return layers.find(l => l.key === layerKey)
		} else {
			return null;
		}
	}
);





/* ===== Combined selectors ==================== */

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getFilterByActiveByMapKey = createCachedSelector(
	[
		getMapFilterByActiveByMapKey,
		getMapSetFilterByActiveByMapKey
	],
	(mapFilter, setFilter) => {
		return (setFilter || mapFilter) && {...setFilter, ...mapFilter};
	}
)((state, mapKey) => mapKey);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getBackgroundLayerStateByMapKey = createCachedSelector(
	[
		getMapBackgroundLayerStateByMapKey,
		getMapSetBackgroundLayerStateByMapKey,
	],
	(mapBackgroundLayer, setBackgroundLayer) => {
		return mapBackgroundLayer || setBackgroundLayer;
	}
)(
	(state, mapKey) => `${mapKey}`
);


/**
 * @param state {Object}
 * @param mapKey {string}
 * @return {Object} Merged layer state from mapState and mapSetState with metadataModifiers and filterByActive.
 */
const getLayersStateByMapKey = createCachedSelector(
	[
		getMapLayersStateByMapKey,
		getMapSetLayersStateByMapKey,
		getMapMetadataModifiersByMapKey,
		getMapSetMetadataModifiersByMapKey,
		getFilterByActiveByMapKey
	],
	(mapLayers, setLayers, mapMetadataModifiers, setMetadataModifiers, mapFilterByActive) => {
		if (mapLayers || setLayers) {
			let layers = [...(setLayers || []), ...(mapLayers || [])];
			let modifiers = {};
			if (setMetadataModifiers) {
				modifiers = setMetadataModifiers;
			}
			modifiers = {...modifiers, ...mapMetadataModifiers};

			layers = layers.map(layer => {
				let layerMetadataModifiers = layer.metadataModifiers ? {...modifiers, ...layer.metadataModifiers} : modifiers;
				let layerFilterByActive = layer.filterByActive ? {...mapFilterByActive, ...layer.filterByActive} : mapFilterByActive;

				return {...layer, metadataModifiers: layerMetadataModifiers, filterByActive: layerFilterByActive};
			});

			// TODO return error for duplicates?
			return _.uniqBy(layers, 'key');
		} else {
			return null;
		}
	}
)((state, mapKey) => mapKey);


/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getAllLayersStateByMapKey = createSelector(
	[
		getBackgroundLayerStateByMapKey,
		getLayersStateByMapKey
	],
	(backgroundLayer, layers) => {
		if (layers || backgroundLayer) {
			layers = layers || [];

			if (backgroundLayer) {
				// TODO do not create new object for background layer on change in layers
				backgroundLayer = {...backgroundLayer, key: 'pantherBackgroundLayer'};
				return [backgroundLayer, ...layers];
			}

			return layers;
		} else {
			return null;
		}
	}
);

/**
 * Get active map key for set. Either local, or global.
 *
 * @param state {Object}
 * @param setKey {string}
 */
const getMapSetActiveMapKey = createSelector(
	[
		getActiveMapKey,
		getMapSetByKey
	],
	(mapKey, set) => {
		if (set) {
			let mapKeyInSet = _.includes(set.maps, mapKey);
			return set.activeMapKey || (mapKeyInSet && mapKey) || null;
		} else {
			return null;
		}
	}
);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getView = createCachedSelector(
	[
		getMapByKey,
		getMapSetByMapKey
	],
	(map, set) => {
		if (map) {
			if (set) {
				let mapView = map.data && map.data.view;

				// omit synced view params from map
				if (set.sync && !_.isEmpty(set.sync)) {
					mapView = _.omitBy(mapView, (viewValue, viewKey) => {
						return set.sync[viewKey];
					});
				}

				let mapSetView = set.data && set.data.view;
				let view = mapUtils.view.mergeViews(mapConstants.defaultMapView, mapSetView, mapView);
				return !_.isEmpty(view) ? view : null;
			} else {
				let view = map.data && map.data.view;
				return mapUtils.view.mergeViews(mapConstants.defaultMapView, view);
			}
		} else {
			return null;
		}
	}
)((state, mapKey) => mapKey);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getViewLimits = createCachedSelector(
	[
		getMapByKey,
		getMapSetByMapKey
	],
	(map, set) => {
		if (map) {
			if (set) {
				let mapViewLimits = map.data?.viewLimits;
				let mapSetViewLimits = set.data?.viewLimits;
				let viewLimits = mapUtils.view.mergeViews(mapSetViewLimits, mapViewLimits);
				return !_.isEmpty(viewLimits) ? viewLimits : null;
			} else {
				return map.data?.viewLimits;
			}
		} else {
			return null;
		}
	}
)((state, mapKey) => mapKey);

/**
 * @param state {Object}
 * @param setKey {string}
 */
const getMapSetView = createSelector(
	[
		getMapSetByKey
	],
	(set) => {
		if (set) {
			let setView = set.data && set.data.view;
			return mapUtils.view.mergeViews(mapConstants.defaultMapView, setView);
		} else {
			return null;
		}
	}
);

/**
 * @param state {Object}
 * @param setKey {string}
 */
const getMapSetViewLimits = createSelector(
	[
		getMapSetByKey
	],
	(set) => {
		return set?.data?.viewLimits || null;
	}
);

const getMapSetActiveMapView = createSelector(
	[
		getMapSetActiveMapKey,
		getMapSetByKey,
		getMapsAsObject
	],
	(mapKey, set, maps) => {
		let map = maps[mapKey];

		if (map) {
			if (set) {
				let mapView = map.data && map.data.view;

				// omit synced view params from map
				if (set.sync && !_.isEmpty(set.sync)) {
					mapView = _.omitBy(mapView, (viewValue, viewKey) => {
						return set.sync[viewKey];
					});
				}

				let mapSetView = set.data && set.data.view;
				let view = mapUtils.view.mergeViews(mapConstants.defaultMapView, mapSetView, mapView);
				return !_.isEmpty(view) ? view : null;
			} else {
				let view = map.data && map.data.view;
				return mapUtils.view.mergeViews(mapConstants.defaultMapView, view);
			}
		} else {
			return null;
		}
	}
);


/* ===== Complex selectors ========================= */

// TODO cache?
const getBackgroundLayer = (state, layerState) => {
	if (layerState) {
		if (layerState.type) {
			// TODO helper
			return layerState;
		} else {
			let layerKey = 'pantherBackgroundLayer';
			// TODO valid approach to stringify parameter?
			let layersWithFilter = mapHelpers.getBackgroundLayersWithFilter(state, JSON.stringify(layerState), layerKey);
			let dataSourcesByLayerKey = SpatialDataSourcesSelectors.getFilteredSourcesGroupedByLayerKey(state, layersWithFilter);

			if (dataSourcesByLayerKey && dataSourcesByLayerKey[layerKey]) {

				// TODO experimental
				let cacheKey = JSON.stringify(layersWithFilter);
				let cache = getBackgroundLayerCache.findByKey(cacheKey);
				let layerDataSources = dataSourcesByLayerKey[layerKey];
				
				if (cache && cache.layersWithFilter === layersWithFilter && cache.layerDataSources === layerDataSources) {
					return cache.mapLayers;
				} else {
					let mapLayers =  _.map(dataSourcesByLayerKey[layerKey], (dataSourceWithFidColumn, index) => mapHelpers.prepareLayerByDataSourceType(layerKey, dataSourceWithFidColumn.dataSource, dataSourceWithFidColumn.fidColumnName, index));

					getBackgroundLayerCache.addOrUpdate({
						cacheKey,
						layersWithFilter,
						layerDataSources,
						mapLayers
					});

					return mapLayers;
				}
			}
			else {
				return null;
			}
		}
	} else {
		return null;
	}
};

// TODO cache?
/**
 * @param state {Object}
 * @param mapKey {string}
 * @return {Array}
 */
const getMapBackgroundLayer = (state, mapKey) => {
	let layerState = getBackgroundLayerStateByMapKey(state, mapKey);
	return getBackgroundLayer(state, layerState);
};

/**
 * Use this function for getting layer deffinition if layer is defined in state.
 * Check if dataSources for layerKey are loaded and defined otherwise return null.
 * Returns object that is input for Layer from @gisatcz/ptr-maps.
 * @param {Object} state App state
 * @param {Object} layerState Merged layer state from mapState and mapSetState with metadataModifiers and filterByActive.
 * @param {Object} dataSourcesByLayerKey dataSources related to layerState.key
 * @param {Object} attributeDataSourcesByLayerKey attributeDataSources related to layerState.key
 * @param {Object} stylesByLayerKey styles related to layerState.key
 * @param {Object} selections selections related to layerState.key
 * @param {Object} layerTemplatesByLayerKey layerTemplates related to layerState.key
 * @param {Object} periodsByLayerKey periods related to layerState.key
 */
const getLayerFromState = (state, layerState, dataSourcesByLayerKey, attributeDataSourcesByLayerKey, stylesByLayerKey, selections, layerTemplatesByLayerKey, periodsByLayerKey) => {
	let layerKey = layerState.key;
	let dataSources = dataSourcesByLayerKey[layerKey];
	let attributeDataSources = attributeDataSourcesByLayerKey && attributeDataSourcesByLayerKey[layerKey];
	let style = stylesByLayerKey && stylesByLayerKey[layerKey];
	let layerTemplate = layerTemplatesByLayerKey && layerTemplatesByLayerKey[layerKey];
	let period = periodsByLayerKey && periodsByLayerKey[layerKey];
	let layer = null;
	if (dataSources && dataSources.length) {
		dataSources.forEach((dataSourceWithFidColumn, index) => {
			const dataSource = dataSourceWithFidColumn && dataSourceWithFidColumn.dataSource;
			const fidColumnName = dataSourceWithFidColumn && dataSourceWithFidColumn.fidColumnName;

			// TODO remove - quick solution for geoinv
			let currentApp = AppSelectors.getKey(state);
			if (currentApp === 'tacrGeoinvaze') {
				const apiGeoserverWMSProtocol = AppSelect.getLocalConfiguration(state, 'apiGeoserverWMSProtocol');
				const apiGeoserverWMSHost = AppSelect.getLocalConfiguration(state, 'apiGeoserverWMSHost');
				const apiGeoserverWMSPath = AppSelect.getLocalConfiguration(state, 'apiGeoserverWMSPath');

				if (dataSource && dataSource.data && dataSource.data.layerName && (dataSource.data.type === "vector" || dataSource.data.type === "raster")) {
					layer = {
						key: layerKey + '_' + dataSource.key,
						layerKey: layerKey,
						type: "wms",
						options: {
							url: apiGeoserverWMSProtocol + "://" + path.join(apiGeoserverWMSHost, apiGeoserverWMSPath),
							params: {
								layers: dataSource.data.layerName
							}
						}
					};
				} else {
					layer = mapHelpers.prepareLayerByDataSourceType(layerKey, dataSource, fidColumnName, index);
				}
			} else if (dataSource && dataSource.data) {
				layer = mapHelpers.prepareLayerByDataSourceType(layerKey, dataSource, fidColumnName, index, layerState, style, attributeDataSources, selections, layerTemplate, period);
			}
		});
	}
	return layer;
}

// TODO caching is experimental
/**
 * Returns Array of objects that is input for Layer from @gisatcz/ptr-maps.
 * @param {Object} state App state
 * @param {Array} layersState 
 */
const getLayers = (state, layersState) => {	
	// TODO valid approach to stringify parameter?
	const layersStateAsString = JSON.stringify(mapHelpers.getLayersStateWithoutFeatures(layersState));
	let layersWithFilter = mapHelpers.getLayersWithFilter(state, layersStateAsString);

	if (layersWithFilter && layersWithFilter.length) {
		let dataSourcesByLayerKey = SpatialDataSourcesSelectors.getFilteredSourcesGroupedByLayerKey(state, layersWithFilter);
		let layerTemplatesByLayerKey = LayerTemplatesSelectors.getFilteredTemplatesGroupedByLayerKey(state, layersWithFilter);
		let attributeDataSourcesByLayerKey = AttributeDataSourcesSelectors.getFilteredDataSourcesGroupedByLayerKey(state, layersWithFilter, layersState, layersStateAsString);
		let stylesByLayerKey = StylesSelectors.getGroupedByLayerKey(state, layersState, layersStateAsString);
		let selections = SelectionsSelectors.getAllAsObjectWithStyles(state);
		let periodsByLayerKey = PeriodsSelectors.getFilteredGroupedByLayerKey(state, layersWithFilter);

		let cacheKey = JSON.stringify(layersWithFilter);
		let cache = getLayersCache.findByKey(cacheKey);
		if (cache
			&& cache.layersWithFilter === layersWithFilter
			&& cache.dataSourcesByLayerKey === dataSourcesByLayerKey
			&& cache.layerTemplatesByLayerKey === layerTemplatesByLayerKey
			&& cache.stylesByLayerKey === stylesByLayerKey
			&& cache.attributeDataSourcesByLayerKey === attributeDataSourcesByLayerKey
			&& cache.selections === selections
			&& cache.periodsByLayerKey === periodsByLayerKey
		) {
			return cache.mapLayers;
		} else {
			const mapLayers = [];
			layersState.forEach((layerState) => {
				if (layerState.layerTemplateKey && dataSourcesByLayerKey && !_.isEmpty(dataSourcesByLayerKey)) {
					const layer = getLayerFromState(state, layerState, dataSourcesByLayerKey, attributeDataSourcesByLayerKey, stylesByLayerKey, selections, layerTemplatesByLayerKey, periodsByLayerKey);
					if(layer) {
						mapLayers.push(layer);
					}
				} else if(layerState.type) {
					const layer = layerState.options?.selected ? {
						...layerState,
						options: {
							...layerState.options,
							selected: mapHelpers.prepareSelection(selections, layerState.options.selected)
						}
					} : layerState;
					mapLayers.push(layer);
				}
			});

			getLayersCache.addOrUpdate({
				cacheKey,
				layersWithFilter,
				dataSourcesByLayerKey,
				layerTemplatesByLayerKey,
				attributeDataSourcesByLayerKey,
				mapLayers,
				stylesByLayerKey,
				selections,
				periodsByLayerKey
			});

			return mapLayers;
		};
	} else {
		return null;
	}
}

// TODO cache?
/**
 * @param state {Object}
 * @param mapKey {string}
 * @return {Array}
 */
const getMapLayers = (state, mapKey) => {
	let layersState = getLayersStateByMapKey(state, mapKey);
	return getLayers(state, layersState);
};


/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getViewportByMapKey = createCachedSelector(
	[
		getMapByKey,
	],
	(map) => {
		if(!_.isEmpty(map)) {
			return map?.data?.viewport;
		} else {
			return null;
		}
	}
)((state, mapKey) => mapKey);










/* ===============================================
   Deprecated
   =============================================== */

const getMapByMetadata_deprecated = createSelector(
	[
		getMaps,
		(state, metadata) => metadata
	],
	(maps, metadata) => {
		if (maps && metadata) {
			let filtered =  _.filter(maps, (map) => {
				if (map.data && map.data.metadataModifiers) {
					return _.isMatch(map.data.metadataModifiers, metadata);
				} else {
					return false;
				}
			});
			if (filtered && filtered.length) {
				return filtered[0]; //TODO what if more maps are selected based on filter
			} else {
				return null;
			}
		} else {
			return null;
		}
	}
);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getNavigator_deprecated = createSelector(
	[getMapByKey,
		getMapSetByMapKey],
	(map, set) => {
		if (map) {
			if (set) {
				let mapNavigator = map.data && map.data.worldWindNavigator;
				let mapSetNavigator = set.data && set.data.worldWindNavigator;
				let navigator = {...mapSetNavigator, ...mapNavigator};
				return !_.isEmpty(navigator) ? navigator : null;
			} else {
				let navigator = map.data && map.data.worldWindNavigator;
				return navigator && !_.isEmpty(navigator) ? navigator : null;
			}
		} else {
			return null;
		}
	}
);

const getMapSetNavigatorRange_deprecated = createSelector(
	[
		getMapSetByKey
	],
	(set) => {
		if (set) {
			return set.data && set.data.worldWindNavigator && set.data.worldWindNavigator.range;
		} else {
			return null;
		}
	}
);



/**
 * Collect and prepare data for map component
 *
 * @param state {Object}
 * @param layers {Array} Collection of layers data. Each object in collection contains filter property (it is used for selecting of relations) and data property (which contains data about layer from map state - e.g. key).
 */
const getLayers_deprecated = createSelector(
	[
		SpatialDataSourcesSelectors.getFilteredGroupedByLayerKey,
		AttributeDataSelectors.getFilteredGroupedByLayerKey,
		AppSelectors.getCompleteLocalConfiguration,
		(state, layers) => (layers)
	],
	/**
	 * @param groupedSources {null | Object} Data sources grouped by layer key
	 * @param layers {null | Array}
	 * @return {null | Array} Collection of layers data for map component
	 */
	(groupedSpatialSources, groupedAttributeSources,localConfig, layers) => {
		// FIXME - more complex
		if (groupedSpatialSources && groupedAttributeSources && layers) {
			return layers.map((layer) => getLayerConfiguration(localConfig, layer, groupedSpatialSources[layer.data.key], groupedAttributeSources[layer.data.key]));
		} else {
			return null;
		}
	}
);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getBackgroundLayerStateByMapKey_deprecated = createSelector(
	[
		getMapByKey,
		getMapSetByMapKey,
		commonSelectors.getAllActiveKeys
	],
	(map, set, activeKeys) => {
		let layerTemplate = null;
		let filter = {
			place: null,
			period: null,
			case: null,
			scenario: null
		};
		if (map && map.data && map.data.backgroundLayer) {
			layerTemplate = map.data.backgroundLayer;
		} else if (set && set.data && set.data.backgroundLayer) {
			layerTemplate = set.data.backgroundLayer;
		}

		if (layerTemplate) {
			return getFiltersForUse_deprecated({...filter, layerTemplate: layerTemplate.layerTemplate, key: layerTemplate.key}, activeKeys)
		} else {
			return null;
		}
	}
);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getLayersStateByMapKey_deprecated = createSelector(
	[
		getMapByKey,
		getMapSetByMapKey,
		commonSelectors.getAllActiveKeys,
		(state, mapKey, useActiveMetadataKeys) => useActiveMetadataKeys
	],
	(map, mapSet, activeKeys, useActiveMetadataKeys) => {
		let setLayers = (mapSet && mapSet.data && mapSet.data.layers) || null;
		let mapLayers = (map && map.data && map.data.layers) || null;

		if (map && (mapLayers || setLayers)) {
			let layers = [...(setLayers || []), ...(mapLayers || [])];
			let modifiers = {};
			if (mapSet) {
				modifiers = {...modifiers, ...mapSet.data.metadataModifiers};
			}
			modifiers = {...modifiers, ...map.data.metadataModifiers};

			layers = layers.map(layer => {
				return getFiltersForUse_deprecated({...modifiers, ...layer}, activeKeys, useActiveMetadataKeys);
			});

			return layers;
		} else {
			return null;
		}
	}
);


/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getAllLayersStateByMapKey_deprecated = createSelector(
	[
		getLayersStateByMapKey_deprecated,
		getBackgroundLayerStateByMapKey_deprecated
	],
	(layersState, backgroundLayerState) => {
		const backgroundLayerData = backgroundLayerState ? [getLayerState(backgroundLayerState)] : [];
		const layersData = layersState ? layersState.map(getLayerState) : [];
		return new Array(...layersData, ...backgroundLayerData);
	}
);

/**
 * @param state {Object}
 * @param mapSetKey {string}
 * @returns {Array<Map> | null}
 */
const getMapsByMapSetKey_deprecated = createSelector(
	[
		getMapsAsObject,
		getMapSetMapKeys
	],
	(maps, mapSetMapsKeys) => {
		if (maps && !_.isEmpty(maps) && mapSetMapsKeys && !_.isEmpty(mapSetMapsKeys)) {
			return mapSetMapsKeys.map(k => maps[k]);
		} else {
			return null;
		}
	}
);


const getLayersStateByMapSetKey_deprecated = createSelector(
	[
		getMapSetByKey,
		getMapsByMapSetKey_deprecated,
		commonSelectors.getAllActiveKeys,
	],
	(mapSet, maps, activeKeys) => {
		const mapsLayersState = {};
		let setLayers = (mapSet && mapSet.data && mapSet.data.layers) || null;

		if (maps) {
			maps.forEach((map) => {
				let mapLayers = (map && map.data && map.data.layers) || null;
				if (map && (mapLayers || setLayers)) {
					let layers = [...(setLayers || []), ...(mapLayers || [])];
					let modifiers = {};
					if (mapSet) {
						let a = mapSet.data.metadataModifiers;
						modifiers = {...modifiers, ...mapSet.data.metadataModifiers};
					}
					modifiers = {...modifiers, ...map.data.metadataModifiers};

					//TODO
					//specific for FUORE
					const useMetadata = {
						scope: true,
						attribute: true,
						period: true,
					}

					layers = layers.map(layer => {
						return getFiltersForUse_deprecated({...modifiers, ...layer}, activeKeys, useMetadata);
					});

					mapsLayersState[map.key] = layers;
				}

			});
		}

		return mapsLayersState;
	}
);


// ----- helpers ------
const getLayerState = (layer) => ({filter: layer.mergedFilter, data: layer.layer});

const getLayerConfiguration = (localConfig, layer, spatialSourcesForLayer, attributeSourcesForLayer) => {
	// let spatialSourcesForLayer = groupedSpatialSources[layer.data.key];
	let layerConfig = null;
	if (spatialSourcesForLayer) {
		//TODO
		//take only first datasource for now
		// spatialSourcesForLayer.forEach(source => {
		[spatialSourcesForLayer[0]].forEach(source => {
			let key = `${layer.data.key}`;
			let mapServerConfig = {
				wmsMapServerUrl: `${localConfig.apiGeoserverWMSProtocol}://${localConfig.apiGeoserverWMSHost}/${localConfig.apiGeoserverWMSPath}`,
				wfsMapServerUrl: `${localConfig.apiGeoserverWFSProtocol}://${localConfig.apiGeoserverWFSHost}/${localConfig.apiGeoserverWFSPath}`
			};

			if (source) {
				key += `-${source.key}`;
				layerConfig = {
					...source.data,
					spatialDataSourceKey: source.key,
					spatialRelationsData: source.spatialRelationData,
					key,
					mapServerConfig
				};
			} else {
				layerConfig = {
					key,
					mapServerConfig
				};
			}
		});
	}

	//add attribute relations data
	if (attributeSourcesForLayer && layerConfig) {
		attributeSourcesForLayer.forEach(source => {
			if (source) {
				const attributeLayerTemplateKey = source.attributeRelationData && source.attributeRelationData.layerTemplateKey;
				if(attributeLayerTemplateKey) {
					layerConfig.attributeRelationsData = source.attributeRelationData;
				}
			}
		});
	}
	return layerConfig;
};

/**
 * Prepare filters for use from layers state
 * @param layer {Object} layer state
 * @param activeKeys {Object} Metadata active keys
 * @param useMetadata {Object}
 * @return {{filter, filterByActive, mergedFilter, layer}}
 */
function getFiltersForUse_deprecated(layer, activeKeys, useMetadata) {
	let filter = {};
	let filterByActive = {};
	let mergedFilter = {};

	if (layer && layer.hasOwnProperty('scope')){
		filter.scopeKey = layer.scope;
	} else if(!useMetadata || (useMetadata && useMetadata.scope)) {
		filterByActive.scope = true;
		if (activeKeys && activeKeys.activeScopeKey) {
			mergedFilter.scopeKey = activeKeys.activeScopeKey;
		}
	}
	if (layer && layer.hasOwnProperty('place')){
		filter.placeKey = layer.place;
	} else if(!useMetadata || (useMetadata && useMetadata.place)) {
		filterByActive.place = true;
		if (activeKeys && activeKeys.activePlaceKey) {
			mergedFilter.placeKey = activeKeys.activePlaceKey;
		}
	}
	if (layer && layer.hasOwnProperty('period')){
		filter.periodKey = layer.period;
	} else if(!useMetadata || (useMetadata && useMetadata.period)) {
		filterByActive.period = true;
		if (activeKeys && activeKeys.activePeriodKey) {
			mergedFilter.periodKey = activeKeys.activePeriodKey;
		}
	}
	if (layer && layer.hasOwnProperty('case')){
		filter.caseKey = layer.case;
	} else if(!useMetadata || (useMetadata && useMetadata.case)) {
		filterByActive.case = true;
		if (activeKeys && activeKeys.activeCaseKey) {
			mergedFilter.caseKey = activeKeys.activeCaseKey;
		}
	}
	if (layer && layer.hasOwnProperty('scenario')){
		filter.scenarioKey = layer.scenario;
	} else if(!useMetadata || (useMetadata && useMetadata.scenario)) {
		filterByActive.scenario = true;
		if (activeKeys && activeKeys.activeScenarioKey) {
			mergedFilter.scenarioKey = activeKeys.activeScenarioKey;
		}
	}

	if (layer && layer.hasOwnProperty('layerTemplate')){
		filter.layerTemplateKey = layer.layerTemplate;
	}

	if (layer && layer.hasOwnProperty('attribute')){
		filter.attributeKey = layer.attribute;
	} else if(!useMetadata || (useMetadata && useMetadata.attribute)) {
		filterByActive.attribute = true;
		if (activeKeys && activeKeys.activeAttributeKey) {
			mergedFilter.attributeKey = activeKeys.activeAttributeKey;
		}
	}

	mergedFilter = {...filter, ...mergedFilter};

	return {
		layer: layer ? layer : null,
		filter,
		filterByActive,
		mergedFilter
	}
}

export default {
    getActiveMap,
	getActiveMapKey,
	getActiveMapViewport,
	getActiveSetKey,
	getAllLayersStateByMapKey,

	getBackgroundLayer,
	getMapBackgroundLayer,
	getBackgroundLayerStateByMapKey,

	getFilterByActiveByMapKey,

	getLayers,
	getMapLayers,
	getLayersStateByMapKey,

	getMapByKey,
	getMapLayerByMapKeyAndLayerKey,
	getMapLayersByMapKey,
	getMapsAsObject,

	getMapSetActiveMapKey,
	getMapSetActiveMapView,
	getMapSetByKey,
	getMapSetByMapKey,
	getMapSetLayersStateBySetKey,
	getMapSetMapKeys,
	getMapSetView,
	getMapSetViewLimits,
	getMapSets,
	getMapSetsAsObject,

	getSubstate,

	getView,
	getViewLimits,
	getViewportByMapKey,


	// Deprecated
	getAllLayersStateByMapKey_deprecated,
	getBackgroundLayerStateByMapKey_deprecated,
	getFiltersForUse_deprecated,
	getLayers_deprecated,
	getLayersStateByMapKey_deprecated,
	getLayersStateByMapSetKey_deprecated,
	getMapByMetadata_deprecated,
	getMapSetNavigatorRange_deprecated,
	getNavigator_deprecated
};