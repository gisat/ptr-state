import _ from 'lodash';
import ActionTypes from '../../constants/ActionTypes';
import Select from '../../state/Select';
import commonActions from '../_common/actions';
import commonSelectors from '../_common/selectors';

import helpers from "./selectorHelpers";
import LayerTemplatesAction from "../LayerTemplates/actions";
import AreasAction from "../Areas/actions";
import {commonHelpers} from "../../index";

const {actionGeneralError} = commonActions;

/* ==================================================
 * CREATORS
 * ================================================== */

function use(mapKey, backgroundLayer, layers) {
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
            layers.forEach(layer => layerUse(componentId, activeKeys, layer));
        }
    }
}

function layerUse(componentKey, activeKeys, layer) {
    return (dispatch, getState) => {
        const state = getState();

        // modifiers defined by key
        let metadataDefinedByKey = {...layer.metadataModifiers};

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
    }
}


/* ==================================================
 * ACTIONS
 * ================================================== */


// ============ export ===========
export default {
    use
}
