import _ from 'lodash';
import ActionTypes from '../../constants/ActionTypes';
import Select from '../../state/Select';
import commonActions from '../_common/actions';
import commonHelpers from '../_common/helpers';
import commonSelectors from '../_common/selectors';

import DataActions from "../Data/actions";

import helpers from "./selectorHelpers";
import {map as mapUtils} from "@gisatcz/ptr-utils";

const {actionGeneralError} = commonActions;

/* ==================================================
 * CREATORS
 * ================================================== */
function use(mapKey, backgroundLayer, layers, mapWidth, mapHeight) {
    return (dispatch, getState) => {
        // TODO clear use for given mapKey, if exists
        const state = getState();
        const componentId = `map_${mapKey}`;
        const activeKeys = commonSelectors.getAllActiveKeys(state);
        const spatialFilter = {};
        if(mapWidth && mapHeight) {
            const view = Select.maps.getViewByMapKey(state, mapKey);
            const tiles = helpers.getTiles(mapWidth, mapHeight, view.center, view.boxRange);
            const level = helpers.getZoomLevel(mapWidth, mapHeight, view.boxRange);
            spatialFilter.tiles = tiles;
            spatialFilter.level = level;
        }
        // uncontrolled map - the map is not controlled from store, but layer data is collected based on stored metadata.
        if (backgroundLayer || layers) {
            layers = helpers.mergeBackgroundLayerWithLayers(layers, backgroundLayer);
        }
        // controlled map (with stateMapKey) - the map is completely controlled from store
        else {
            layers = Select.maps.getAllLayersStateByMapKey(state, mapKey);
        }

        if (layers) {
            layers.forEach(layer => dispatch(layerUse(componentId, activeKeys, layer, spatialFilter)));
        }
    }
}

function layerUse(componentId, activeKeys, layer, spatialFilter) {
    return (dispatch, getState) => {
        const state = getState();

        // modifiers defined by key
        let metadataDefinedByKey = layer.metadataModifiers ? {...layer.metadataModifiers} : {};

        // add layerTemplate od areaTreeLevelKey
        if (layer.layerTemplateKey) {
            metadataDefinedByKey.layerTemplateKey = layer.layerTemplateKey;
            // TODO use layerTemplate here?
        } else if (layer.areaTreeLevelKey) {
            metadataDefinedByKey.areaTreeLevelKey = layer.areaTreeLevelKey;
            // TODO use areaTreeLevelKey here?
        }

        // Get actual metadata keys defined by filterByActive
        const activeMetadataKeys = commonSelectors.getActiveKeysByFilterByActive(state, layer.filterByActive);

        // Merge metadata, metadata defined by key have priority
        const mergedMetadataKeys = commonHelpers.mergeMetadataKeys(metadataDefinedByKey, activeMetadataKeys);

        // Decouple modifiers from templates
        const {areaTreeLevelKey, layerTemplateKey, applicationKey, ...modifiers} = mergedMetadataKeys;

        // It converts modifiers from metadataKeys: ["A", "B"] to metadataKey: {in: ["A", "B"]}
        const modifiersForRequest = commonHelpers.convertModifiersToRequestFriendlyFormat(modifiers);

        if (layerTemplateKey || areaTreeLevelKey) {
            // TODO register use?
            dispatch(DataActions.ensure({
                modifiers: modifiersForRequest,
                areaTreeLevelKey,
                layerTemplateKey,
                styleKey: layer.styleKey || null,
                data: {
                    spatialFilter
                }
            }));
        }
    }
}

function setMapSetActiveMapKey(mapKey) {
    return (dispatch, getState) => {
        let set = Select.maps.getMapSetByMapKey(getState(), mapKey);
        if (set) {
            dispatch(actionSetMapSetActiveMapKey(set.key, mapKey));
        }
    };
}

function updateMapAndSetView(mapKey, update) {
    return (dispatch, getState) => {
        let set = Select.maps.getMapSetByMapKey(getState(), mapKey);
        let forSet = null;
        let forMap = null;

        if (set && set.sync) {
            // pick key-value pairs that are synced for set
            forSet = _.pickBy(update, (updateVal, updateKey) => {
                return set.sync[updateKey];
            });

            forMap = _.omitBy(update, (updateVal, updateKey) => {
                return set.sync[updateKey];
            });
        } else {
            forMap = update;
        }

        if (forSet && !_.isEmpty(forSet)) {
            //check data integrity
            forSet = mapUtils.view.ensureViewIntegrity(forSet); //TODO test
            dispatch(actionUpdateSetView(set.key, forSet));
        }

        if (forMap && !_.isEmpty(forMap)) {
            //check data integrity
            forMap = mapUtils.view.ensureViewIntegrity(forMap); //TODO test
            dispatch(actionUpdateMapView(mapKey, forMap));
        }
    }
}

function updateSetView(setKey, update) {
    return (dispatch, getState) => {
        let activeMapKey = Select.maps.getMapSetActiveMapKey(getState(), setKey);
        dispatch(updateMapAndSetView(activeMapKey, update));
    };
}

function updateStateFromView(data) {
    return dispatch => {
        if (data) {
            dispatch(actionUpdate(data));
        }
    };
}


/**
 * 
 * It enables to update any layer property except layerKey. 
 * Layer object is merged with actual layer option.
 */
function updateMapLayer(mapKey, layerKey, update) {
	return (dispatch, getState) => {
		const state = getState();
		const mapByKey = Select.maps.getMapByKey(state, mapKey);
		if(!mapByKey) {
			return dispatch(actionGeneralError(`No map found for mapKey ${mapKey}.`));
		} else {
            //check if layer exist
			const layers = Select.maps.getMapLayersStateByMapKey(state, mapKey);
            const layerExists = layers ? layers.find(l => l.key === layerKey) : null;
			if(layerExists) {
				return dispatch(actionUpdateMapLayer(mapKey, layerKey, update));
			} else {
				return dispatch(actionGeneralError(`No layer (${layerKey}) found in mapKey ${mapKey}.`));
			}
		}
	}
};


/* ==================================================
 * ACTIONS
 * ================================================== */

const actionSetMapSetActiveMapKey = (setKey, mapKey) => {
    return {
        type: ActionTypes.MAPS.SET.SET_ACTIVE_MAP_KEY,
        mapKey,
        setKey
    }
};

const actionUpdate = (data) => {
    return {
        type: ActionTypes.MAPS.UPDATE,
        data
    }
};


const actionUpdateMapView = (mapKey, update) => {
    return {
        type: ActionTypes.MAPS.MAP.VIEW.UPDATE,
        mapKey,
        update
    }
};


const actionUpdateSetView = (setKey, update) => {
    return {
        type: ActionTypes.MAPS.SET.VIEW.UPDATE,
        setKey,
        update
    }
}

const actionUpdateMapLayer = (mapKey, layerKey, update) => {
	return {
		type: ActionTypes.MAPS.LAYERS.LAYER.UPDATE,
		mapKey,
		layerKey,
		update,
	}
};



// ============ export ===========
export default {
    setMapSetActiveMapKey,
    updateMapAndSetView,
    updateMapLayer,
    updateSetView,
    updateStateFromView,
    use
}
