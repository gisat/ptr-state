import ActionTypes from '../../../constants/ActionTypes';
import common from '../../_common/actions';

const actionTypes = ActionTypes.DATA.SPATIAL_DATA;

// ============ creators ===========
const receiveIndexed = (result, filter) => {
    return dispatch => {
        // add data to store
        if (result) {            
            dispatch(addData(result));
        }

        // add to index
        // dispatch(common.actionAddIndex(actionTypes, filter, order, total, start, result, changes));
    }
}

function addData(result) {
    return dispatch => {
        for(key of Object.keys(result)) {
            dispatch(addDataAction(key,result[key].data));
        }
    }
}

// ============ actions ============
function addDataAction(dataSourceKey, data) {
    return {
        type: actionTypes.ADD_OR_UPDATE,
        dataSourceKey,
        data,
    }
}

// ============ export ===========

export default {
    receiveIndexed,
}
