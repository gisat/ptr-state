import _ from 'lodash';
import ActionTypes from '../../constants/ActionTypes';
import Select from '../../state/Select';
import commonActions from '../_common/actions';
import commonSelectors from '../_common/selectors';

import helpers from "./selectorHelpers";

const {actionGeneralError} = commonActions;

/* ==================================================
 * CREATORS
 * ================================================== */

function use(mapKey, backgroundLayer, layers) {
    return (dispatch, getState) => {
        // TODO clear use for given mapKey, if exists
        const state = getState();
        const activeKeys = commonSelectors.getAllActiveKeys(state);

        // uncontrolled map - the map is not controlled from store, but layer data is collected based on stored metadata.
        if (backgroundLayer || layers) {
            layers = helpers.mergeBackgroundLayerWithLayer(layers, backgroundLayer);
        }
        // controlled map (with stateMapKey) - the map is completely controlled from store
        else {
            layers = Select.maps.getAllLayersStateByMapKey(state, mapKey);
        }
    }
}


/* ==================================================
 * ACTIONS
 * ================================================== */


// ============ export ===========
export default {
    use
}
