import ActionTypes from '../../../constants/ActionTypes';
import _ from "lodash";
const actionTypes = ActionTypes.DATA.SPATIAL_DATA;

// ============ creators ===========
const receiveIndexed = (data, filter, level, order, changedOn) => {
    return dispatch => {
        // add data to store
        if (data) {            
            dispatch(addOrUpdateData(data));
        }

        // add to index
        dispatch(addIndex(filter, level, order, data, changedOn));
    }
}

function addIndex(filter, level, order, data, changedOn) {
    return (dispatch, getState) => {
        for(const key of Object.keys(data)) {
            dispatch(addIndexesAction(key, filter, level, order, data[key].spatialIndex, changedOn));
        }
    }
}

function addOrUpdateData(data) {
    return (dispatch, getState) => {
        const state = getState();
        for(const key of Object.keys(data)) {
            if(_.isEmpty(state.data.spatialData.byDataSourceKey[key])) {
                dispatch(addDataAction(key, data[key].data));
            } else {
                dispatch(updateDataAction(key, data[key].data));
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

function registerIndex(filter, level, order, spatialDataSourceKey, tile, limit) {
    return {
        type: actionTypes.INDEX.REGISTER,
        count: null,
        filter,
        level,
        order,
        spatialDataSourceKey,
        limit,
        tile,
    };
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
    registerIndex,
}
