import ActionTypes from '../../../constants/ActionTypes';
import common from '../../_common/actions';

const actionTypes = ActionTypes.DATA.ATTRIBUTE_DATA;

// ============ creators ===========
const receiveIndexed = (data, filter, order, changedOn) => {
    return dispatch => {
        // add data to store
        if (data) {            
            dispatch(addOrUpdateData(data));
        }
        // attribute data index is same like spatial data index
        // add to index
        // dispatch(addIndex(filter, order, data, changedOn));
    }
}

function addOrUpdateData(data) {
    return (dispatch, getState) => {
        const state = getState();
        for(const key of Object.keys(data)) {
            if(_.isEmpty(state.data.attributeData.byDataSourceKey[key])) {
                dispatch(addDataAction(key, data[key]));
            } else {
                dispatch(updateDataAction(key, data[key]));
            }
        }
    }
}


function addIndex(filter, order, data, changedOn) {
    return (dispatch) => {
        for(const key of Object.keys(data)) {
            dispatch(addIndexesAction(key, filter, order, data[key], changedOn));
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
