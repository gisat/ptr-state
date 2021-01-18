import ActionTypes from '../../../constants/ActionTypes';
import common from '../../_common/actions';

const actionTypes = ActionTypes.DATA.ATTRIBUTE_DATA_SOURCES;

// ============ creators ===========
/**
 * It ensure adding index and adding or updating recieved data from BE.
 * @param {Array} attributeDataSources Array recieved from BE contains attributeDataSource definitions.
 * @param {Object} filter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Array?} order
 * @param {Number} start
 * @param {Number} total
 * @param {string?} changedOn 
 */
function receiveIndexed(attributeDataSources, filter, order, start, total, changedOn) {
    return dispatch => {
        // add attributeDataSources to store
        if (attributeDataSources.length) {
            dispatch(common.add(actionTypes)(attributeDataSources, filter));
        }

        // add to index
        dispatch(common.actionAddIndex(actionTypes, filter, order, total, start, attributeDataSources, changedOn));
    }
}

// ============ actions ============

// ============ export ===========

export default {
	add: common.add(actionTypes),
    receiveIndexed,
}
