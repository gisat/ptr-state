import _ from 'lodash';
import ActionTypes from '../../constants/ActionTypes';
import Select from '../../state/Select';
import commonActions from '../_common/actions';
import commonHelpers from '../_common/helpers';
import commonSelectors from '../_common/selectors';

import DataActions from "../Data/actions";

import helpers from "./selectorHelpers";

const {actionGeneralError} = commonActions;

/* ==================================================
 * CREATORS
 * ================================================== */

function use(mapKey, backgroundLayer, layers, spatialFilter) {
    return (dispatch, getState) => {
        // TODO clear use for given mapKey, if exists
        const state = getState();
        const componentId = `map_${mapKey}`;
        const activeKeys = commonSelectors.getAllActiveKeys(state);

        // uncontrolled map - the map is not controlled from store, but layer data is collected based on stored metadata.
        if (backgroundLayer || layers) {
            layers = helpers.mergeBackgroundLayerWithLayer(layers, backgroundLayer);
        }
        // controlled map (with stateMapKey) - the map is completely controlled from store
        else {
            layers = Select.maps.getAllLayersStateByMapKey(state, mapKey);
        }

        if (layers) {
            layers.forEach(layer => layerUse(componentId, activeKeys, layer, spatialFilter));
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

function updateStateFromView(data) {
    return dispatch => {
        if (data) {
            dispatch(actionUpdate(data));
        }
    };
}


/* ==================================================
 * ACTIONS
 * ================================================== */

const actionUpdate = (data) => {
    return {
        type: ActionTypes.MAPS.UPDATE,
        data
    }
};


// ============ export ===========
export default {
    updateStateFromView,
    use
}
