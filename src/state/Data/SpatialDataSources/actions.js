import ActionTypes from '../../../constants/ActionTypes';
import common from '../../_common/actions';

const actionTypes = ActionTypes.DATA.SPATIAL_DATA_SOURCES;

// ============ creators ===========
function receiveIndexed(spatialDataSources, filter, order, start, total, changes) {
    return dispatch => {
        // add spatialDataSources to store
        if (spatialDataSources.length) {
            dispatch(common.add(actionTypes)(spatialDataSources, filter));
        }

        // add to index
        dispatch(common.actionAddIndex(actionTypes, filter, order, total, start, spatialDataSources, changes));
    }
}

// ============ actions ============

// ============ export ===========

export default {
	add: common.add(actionTypes),
    receiveIndexed,
}
