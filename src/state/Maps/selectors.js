import {createSelector} from 'reselect';
import createCachedSelector from "re-reselect";
import {makeSelector} from '@taskworld.com/rereselect';
import {createSelector as createRecomputeSelector, createObserver as createRecomputeObserver} from '@jvitela/recompute';
import _ from 'lodash';

import {map as mapUtils} from "@gisatcz/ptr-utils";
import {mapConstants} from "@gisatcz/ptr-core";
import selectorHelpers from "./selectorHelpers";

import SpatialDataSourcesSelectors from "../Data/SpatialDataSources/selectors";

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
            return _.find(sets, (set) => set.maps && _.includes(set.maps, mapKey)) || null;
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
        if (map) {
            return selectorHelpers.getView(map, set);
        } else {
            return null;
        }
    }
)((state, setKey) => setKey);

/**
 * @param state {Object}
 * @param mapKey {string}
 */
const getViewByMapKey = createCachedSelector(
    [
        getMapByKey,
        getMapSetByMapKey
    ],
	selectorHelpers.getView
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
                return mapViewLimits || mapSetViewLimits || null;
            } else {
                return map.data?.viewLimits || null;
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
const getMapSetMaps = createSelector(
	[
		getMapsAsObject,
		getMapSetMapKeys
	],
	(maps, mapKeys) => {
		if (maps && mapKeys?.length) {
			return mapKeys.map(key => maps[key]);
		} else {
			return null;
		}
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
            return {...setModifiers, ...mapModifiers};
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
const getBackgroundLayerStateByMapKey = createCachedSelector(
    [
        getMapBackgroundLayerStateByMapKey,
        getMapSetBackgroundLayerStateByMapKey,
    ],
    (mapBackgroundLayer, setBackgroundLayer) => {
		console.log("getBackgroundLayerStateByMapKey");
        return mapBackgroundLayer || setBackgroundLayer || null;
    }
)((state, mapKey) => mapKey);

const getBackgroundLayerStateByMapKeyObserver = createRecomputeObserver(getBackgroundLayerStateByMapKey);

/**
 * @param state {Object}
 * @param mapKey {string}
 * @return {Object} Merged mapSetState with metadataModifiers and filterByActive.
 */
const getMapSetLayersStateWithModifiersByMapKey = createCachedSelector(
    [
        getMapSetLayersStateByMapKey,
        getMapSetMetadataModifiersByMapKey,
        getMapSetFilterByActiveByMapKey
    ],
    (setLayers, metadataModifiers, mapSetFilterByActive) => {
        if (setLayers?.length) {
            return selectorHelpers.mergeModifiersAndFilterByActiveToLayerStructure(setLayers, metadataModifiers, mapSetFilterByActive);
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
const getMapLayersStateWithModifiersByMapKey = createCachedSelector(
    [
        getMapLayersStateByMapKey,
        getMetadataModifiersByMapKey,
        getFilterByActiveByMapKey
    ],
    (mapLayers, metadataModifiers, mapFilterByActive) => {
        if (mapLayers?.length) {
            return selectorHelpers.mergeModifiersAndFilterByActiveToLayerStructure(mapLayers, metadataModifiers, mapFilterByActive);
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
        getMapSetLayersStateWithModifiersByMapKey,
        getMapLayersStateWithModifiersByMapKey
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
            return selectorHelpers.mergeBackgroundLayerWithLayers(backgroundLayer, layers);
        } else {
            return null;
        }
    }
)((state, mapKey) => mapKey);

const getMapBackgroundLayer = createRecomputeSelector((mapKey) => {
	const layerState = getBackgroundLayerStateByMapKeyObserver(mapKey);
	console.log("getMapBackgroundLayer");
	if (layerState) {
		if (layerState.type) {
			return layerState;
		} else {
			// TODO filterByActive & metadata modifiers?
			const layerKey = 'pantherBackgroundLayer';
			const spatialDataSources = SpatialDataSourcesSelectors.getFiltered(layerState);
			if (spatialDataSources) {
				return spatialDataSources.map((dataSource, index) => selectorHelpers.getLayerByDataSourceType(index, layerKey, layerState, dataSource));
			} else {
				return null;
			}
		}
	} else {
		return null;
	}
});


// const getMapBackgroundLayer = createCachedSelector(
//     [
// 		(state, mapKey) => getBackgroundLayerStateByMapKeyObserver(mapKey)
//     ],
// 	getBackgroundLayer
// )((state, mapKey) => mapKey);

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
    getMapLayersStateWithModifiersByMapKey,
    getMapMetadataModifiersByMapKey,

    getMapSetActiveMapKey,
    getMapSetActiveMapView,
    getMapSetBackgroundLayerStateByMapKey,
    getMapSetByMapKey,
    getMapSetByKey,
    getMapSetFilterByActiveByMapKey,
    getMapSetLayersStateByMapKey,
    getMapSetLayersStateWithModifiersByMapKey,
    getMapSetMetadataModifiersByMapKey,
    getMapSetMapKeys,
    getMapSetMaps,
    getMapSets,
    getMapSetView,
    getMapSetViewLimits,

    getViewByMapKey,
    getViewLimitsByMapKey
};