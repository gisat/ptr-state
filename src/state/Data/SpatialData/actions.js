import ActionTypes from '../../../constants/ActionTypes';
import common from '../../_common/actions';
import _ from "lodash";
const actionTypes = ActionTypes.DATA.SPATIAL_DATA;

// ============ creators ===========
const receiveIndexed = (result, filter) => {
    return dispatch => {
        // add data to store
        if (result) {            
            dispatch(addOrUpdateData(result));
        }

        // add to index
        // dispatch(common.actionAddIndex(actionTypes, filter, order, total, start, result, changes));
    }
}

function addOrUpdateData(result) {
    return (dispatch, getState) => {
        const state = getState();
        for(const key of Object.keys(result)) {
            if(_.isEmpty(state.data.spatialData.byDataSourceKey[key])) {
                dispatch(addDataAction(key, result[key].data));
            } else {
                dispatch(updateDataAction(key, result[key].data));
            }
        }
    }
}

// ============ actions ============
function addDataAction(key, data) {
    return {
        type: actionTypes.ADD,
        key,
        data,
    }
}

function updateDataAction(key, data) {
    return {
        type: actionTypes.UPDATE,
        key,
        data,
    }
}

// ============ export ===========

export default {
    receiveIndexed,
}
