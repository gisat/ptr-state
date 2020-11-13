import ActionTypes from '../../../constants/ActionTypes';
import common from '../../_common/actions';

const actionTypes = ActionTypes.DATA.SPATIAL_RELATIONS;

const registerIndex = common.registerIndex(actionTypes);

// ============ creators ===========
function receiveIndexed(data, filter, order, start, total, changes) {
    return dispatch => {
        // add data to store
        if (data.length) {
            dispatch(common.add(actionTypes)(data, filter));
        }

        // add to index
        dispatch(common.actionAddIndex(actionTypes, filter, order, total, start, data, changes));
    }
}


// ============ actions ============
// ============ export ===========

export default {
    receiveIndexed,
    registerIndex,
}
