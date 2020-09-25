import ActionTypes from '../../../constants/ActionTypes';
import common from '../../_common/actions';

const actionTypes = ActionTypes.DATA.SPATIAL_DATA_SOURCES;

// ============ creators ===========
function receiveIndexed(result, filter, order, start, total, changes) {
    return dispatch => {
        // add data to store
        if (result.length) {
            dispatch(common.add(actionTypes)(result, filter));
        }

        // add to index
        dispatch(common.actionAddIndex(actionTypes, filter, order, total, start, result, changes));
    }
}

// ============ actions ============

// ============ export ===========

export default {
    receiveIndexed,
}
