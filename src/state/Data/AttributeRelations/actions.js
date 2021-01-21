import ActionTypes from '../../../constants/ActionTypes';
import common from '../../_common/actions';

const actionTypes = ActionTypes.DATA.ATTRIBUTE_RELATIONS;

const add = common.add(actionTypes);
const addIndex = common.addIndex(actionTypes);
// ============ creators ===========
/**
 * It ensure adding index and adding or updating recieved data from BE.
 * @param {Array} attributeRelations Array recieved from BE contains attributeRelations.
 * @param {Object} filter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Array?} order
 * @param {Number} start
 * @param {Number} total
 * @param {string?} changedOn 
 */
function receiveIndexed(attributeRelations, filter, order, start, total, changedOn) {
    return dispatch => {
        // add attributeRelations to store
        if (attributeRelations.length) {
            dispatch(add(attributeRelations, filter));
        }

        // add to index
        dispatch(addIndex(filter, order, total, start, attributeRelations, changedOn));
    }
}


// ============ actions ============
// ============ export ===========

export default {
    receiveIndexed,
}
