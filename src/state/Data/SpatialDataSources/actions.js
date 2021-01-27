import ActionTypes from '../../../constants/ActionTypes';
import common from '../../_common/actions';

const actionTypes = ActionTypes.DATA.SPATIAL_DATA_SOURCES;

const addIndex = common.addIndex(actionTypes);
const add = common.add(actionTypes);

// ============ creators ===========
/**
 * It ensure adding index and adding received spatialDataSources from BE.
 * Add dataSources to state only when spatialDataSources received, in case of empty spatialDataSources it adds only index.
 * @param {Object} spatialDataSources Object received from BE. 
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
            dispatch(add(spatialDataSources, filter));
        }

        // add to index
        dispatch(addIndex(filter, order, total, start, spatialDataSources, changedOn));
    }
}

// ============ actions ============

// ============ export ===========

export default {
	add,
    receiveIndexed,
}
