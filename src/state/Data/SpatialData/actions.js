import ActionTypes from '../../../constants/ActionTypes';
import _ from "lodash";
const actionTypes = ActionTypes.DATA.SPATIAL_DATA;

// ============ creators ===========
const receiveIndexed = (result, filter, level, order, changedOn) => {
    return dispatch => {
        // add data to store
        if (result) {            
            dispatch(addOrUpdateData(result));
        }

        // add to index
        dispatch(addIndex(filter, level, order, result, changedOn));
    }
}

function addIndex(filter, level, order, result, changedOn) {
    return (dispatch, getState) => {
        const state = getState();
        for(const key of Object.keys(result)) {
            dispatch(addIndexesAction(key, filter, level, order, result[key].spatialIndex, changedOn));
        }
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

function addIndexesAction(spatialDataSourceKey, filter, level, order, index, changedOn) {
    return {
        type: actionTypes.INDEX.ADD,
        filter,
        order,
        spatialDataSourceKey,
        level,
        changedOn,
        index,
    }
}

// ============ export ===========

export default {
    receiveIndexed,
}
