import {createSelector} from 'reselect';
import createCachedSelector from "re-reselect";
import _ from 'lodash';
import {map as mapUtils} from "@gisatcz/ptr-utils";
import {mapConstants} from "@gisatcz/ptr-core";

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

export default {
    getBackgroundLayerAsLayer,
    getView,
    mergeBackgroundLayerWithLayers
}