import ActionTypes from '../../../constants/ActionTypes';
import common from '../../_common/actions';

const actionTypes = ActionTypes.DATA.SPATIAL_DATA_SOURCES;

// ============ creators ===========
/**
 * It ensure adding index and adding recieved spatialDataSources from BE.
 * @param {Object} spatialDataSources Object recieved from BE. 
 * @param {Object} filter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Array?} order
 * @param {Number} start
 * @param {Number} total
 * @param {string?} changedOn 
 */
function receiveIndexed(spatialDataSources, filter, order, start, total, changedOn) {
    return dispatch => {
        // add spatialDataSources to store
        if (spatialDataSources.length) {
            dispatch(common.add(actionTypes)(spatialDataSources, filter));
        }

        // add to index
        dispatch(common.actionAddIndex(actionTypes, filter, order, total, start, spatialDataSources, changedOn));
    }
}

// ============ actions ============

// ============ export ===========

export default {
	add: common.add(actionTypes),
    receiveIndexed,
}
