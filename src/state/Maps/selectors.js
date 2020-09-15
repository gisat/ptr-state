import {createSelector} from 'reselect';
import createCachedSelector from "re-reselect";
import _ from 'lodash';

import helpers from "./selectorHelpers";
import {map as mapUtils} from "@gisatcz/ptr-utils";
import {mapConstants} from "@gisatcz/ptr-core";

/* === SELECTORS ======================================================================= */

const getSubstate = state => state.maps;

const getActiveMapKey = state => state.maps.activeMapKey;
const getMapsAsObject = state => state.maps.maps;
const getMapSetsAsObject = state => state.maps.sets;

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getMapByKey = createSelector(
    [
        getMapsAsObject,
        (state, key) => key
    ],
    (maps, key) => {
        return maps?.[key] || null;
    }
);

/**
 * @param state {Object}
 */
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
 * @param setKey {string}
 */
const getMapSetByKey = createSelector(
    [
        getMapSetsAsObject,
        (state, key) => key
    ],
    (sets, key) => {
        return sets?.[key] || null;
    }
);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getMapSetByMapKey = createSelector(
    [
        getMapSets,
        (state, mapKey) => (mapKey)
    ],
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
 * @param setKey {string}
 */
const getMapSetActiveMapView = createCachedSelector(
    [
        getMapSetActiveMapKey,
        getMapSetByKey,
        getMapsAsObject
    ],
    (mapKey, set, maps) => {
        let map = maps?.[mapKey];
        return helpers.getView(map, set);
    }
)((state, mapKey) => mapKey);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getViewByMapKey = createCachedSelector(
    [
        getMapByKey,
        getMapSetByMapKey
    ],
    helpers.getView
)((state, mapKey) => mapKey);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getViewLimitsByMapKey = createCachedSelector(
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
const getMapSetMapKeys = createSelector(
    [getMapSetByKey],
    (set) => {
        return set?.maps?.length ? set.maps : null;
    }
);

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
            return mapUtils.view.mergeViews(mapConstants.defaultMapView, set.data?.view);
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

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getMapBackgroundLayerStateByMapKey = createSelector(
    [
        getMapByKey
    ],
    (map) => {
        return map?.data?.backgroundLayer || null;
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
        return map?.data?.layers || null;
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
        return set?.data?.backgroundLayer || null;
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
        return set?.data?.layers || null;
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
        return map?.data?.metadataModifiers || null;
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
        return set?.data?.metadataModifiers || null;
    }
);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getMetadataModifiersByMapKey = createCachedSelector(
    [
        getMapMetadataModifiersByMapKey,
        getMapSetMetadataModifiersByMapKey
    ],
    (mapModifiers, setModifiers) => {
        if (mapModifiers && setModifiers) {
            return {...mapModifiers, ...setModifiers};
        } else {
            return setModifiers || mapModifiers || null;
        }
    }
)((state, mapKey) => mapKey);


/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getMapFilterByActiveByMapKey = createSelector(
    [
        getMapByKey
    ],
    (map) => {
        return map?.data?.filterByActive || null;
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
        return set?.data?.filterByActive || null;
    }
);

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
        if (mapFilter && setFilter) {
            return {...mapFilter, ...setFilter};
        } else {
            return setFilter || mapFilter || null;
        }
    }
)((state, mapKey) => mapKey);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getBackgroundLayerStateByMapKey = createSelector(
    [
        getMapBackgroundLayerStateByMapKey,
        getMapSetBackgroundLayerStateByMapKey,
    ],
    (mapBackgroundLayer, setBackgroundLayer) => {
        return mapBackgroundLayer || setBackgroundLayer || null;
    }
);

/**
 * @param state {Object}
 * @param mapKey {string}
 * @return {Object} Merged mapSetState with metadataModifiers and filterByActive.
 */
const getMapSetLayersStateByMapKeyWithModifiers = createCachedSelector(
    [
        getMapSetLayersStateByMapKey,
        getMapSetMetadataModifiersByMapKey,
        getMapSetFilterByActiveByMapKey
    ],
    (setLayers, metadataModifiers, mapFilterByActive) => {
        if (setLayers?.length) {
            setLayers = setLayers.map(layer => {
                let layerMetadataModifiers = (layer.metadataModifiers && metadataModifiers) ? {...metadataModifiers, ...layer.metadataModifiers} : metadataModifiers || layer.metadataModifiers;
                let layerFilterByActive = (layer.filterByActive && mapFilterByActive) ? {...mapFilterByActive, ...layer.filterByActive} : (mapFilterByActive || layer.filterByActive || null);

                return {...layer, metadataModifiers: layerMetadataModifiers, filterByActive: layerFilterByActive};
            });

            return setLayers;
        } else {
            return null;
        }
    }
)((state, mapKey) => mapKey);

/**
 * @param state {Object}
 * @param mapKey {string}
 * @return {Object} Merged mapState with metadataModifiers and filterByActive.
 */
const getMapLayersStateByMapKeyWithModifiers = createCachedSelector(
    [
        getMapLayersStateByMapKey,
        getMetadataModifiersByMapKey,
        getFilterByActiveByMapKey
    ],
    (mapLayers, metadataModifiers, mapFilterByActive) => {
        if (mapLayers?.length) {
            mapLayers = mapLayers.map(layer => {
                let layerMetadataModifiers = (layer.metadataModifiers && metadataModifiers) ? {...metadataModifiers, ...layer.metadataModifiers} : (metadataModifiers || layer.metadataModifiers || null);
                let layerFilterByActive = (layer.filterByActive && mapFilterByActive) ? {...mapFilterByActive, ...layer.filterByActive} : (mapFilterByActive || layer.filterByActive || null);

                return {...layer, metadataModifiers: layerMetadataModifiers, filterByActive: layerFilterByActive};
            });

            return mapLayers;
        } else {
            return null;
        }
    }
)((state, mapKey) => mapKey);

/**
 * @param state {Object}
 * @param mapKey {string}
 * @return {Object} Merged layer state from mapState and mapSetState with metadataModifiers and filterByActive.
 */
const getLayersStateByMapKey = createCachedSelector(
    [
        getMapSetLayersStateByMapKeyWithModifiers,
        getMapLayersStateByMapKeyWithModifiers
    ],
    (setLayers, mapLayers) => {
        if (mapLayers && setLayers) {
            return [...setLayers, ...mapLayers]
        } else if (mapLayers) {
            return mapLayers;
        } else if (setLayers) {
            return setLayers;
        }  else {
            return null;
        }
    }
)((state, mapKey) => mapKey);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getAllLayersStateByMapKey = createCachedSelector(
    [
        getBackgroundLayerStateByMapKey,
        getLayersStateByMapKey
    ],
    (backgroundLayer, layers) => {
        if (layers || backgroundLayer) {
            return helpers.mergeBackgroundLayerWithLayer(backgroundLayer, layers);
        } else {
            return null;
        }
    }
)((state, mapKey) => mapKey);

// TODO add logic
const getMapBackgroundLayer = createCachedSelector(
    [
        (state, mapKey) => getBackgroundLayerStateByMapKey(state, mapKey)
    ],
    (layerState) => {
        if (layerState) {
            if (layerState.type) {
                return layerState;
            } else {
                // TODO
                return null;
            }
        } else {
            return null;
        }
    }
)((state, mapKey) => mapKey);

export default {
    getAllLayersStateByMapKey,
    getBackgroundLayerStateByMapKey,
    getFilterByActiveByMapKey,
    getLayersStateByMapKey,
    getMetadataModifiersByMapKey,

    getMapBackgroundLayerStateByMapKey,
    getMapBackgroundLayer,
    getMapByKey,
    getMapFilterByActiveByMapKey,
    getMapLayersStateByMapKey,
    getMapLayersStateByMapKeyWithModifiers,
    getMapMetadataModifiersByMapKey,

    getMapSetActiveMapKey,
    getMapSetActiveMapView,
    getMapSetBackgroundLayerStateByMapKey,
    getMapSetByMapKey,
    getMapSetByKey,
    getMapSetFilterByActiveByMapKey,
    getMapSetLayersStateByMapKey,
    getMapSetLayersStateByMapKeyWithModifiers,
    getMapSetMetadataModifiersByMapKey,
    getMapSetMapKeys,
    getMapSets,
    getMapSetView,
    getMapSetViewLimits,

    getViewByMapKey,
    getViewLimitsByMapKey
};