import ActionTypes from '../../../constants/ActionTypes';
import common from '../../_common/actions';

const actionTypes = ActionTypes.DATA.SPATIAL_RELATIONS;

const addIndex = common.addIndex(actionTypes);
const add = common.add(actionTypes);

// ============ creators ===========
/**
 * It ensure adding index and adding recieved spatialRelations from BE.
 * @param {Object} spatialRelations Object recieved from BE. 
 * @param {Object} filter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Array?} order
 * @param {Number} start
 * @param {Number} total
 * @param {string?} changedOn 
 */
function receiveIndexed(spatialRelations, filter, order, start, total, changes) {
    return dispatch => {
        // add spatialRelations to store
        if (spatialRelations.length) {
            dispatch(add(spatialRelations, filter));
        }

        // add to index
        dispatch(addIndex(filter, order, total, start, spatialRelations, changes));
    }
}


// ============ actions ============
// ============ export ===========

export default {
    receiveIndexed,
}
