import ActionTypes from '../../../constants/ActionTypes';
import common from '../../_common/actions';

const actionTypes = ActionTypes.DATA.ATTRIBUTE_DATA;

// ============ creators ===========
const receiveIndexed = (attributeData, filter, order, changedOn) => {
    return dispatch => {
        // add attributeData to store
        if (attributeData) {            
            dispatch(addOrUpdateData(attributeData));
        }
        // attribute data index is same like spatial data index
        // add to index
        // dispatch(addIndex(filter, order, data, changedOn));
    }
}

function addOrUpdateData(attributeData) {
    return (dispatch, getState) => {
        const state = getState();
        for(const key of Object.keys(attributeData)) {
            if(_.isEmpty(state.data.attributeData.byDataSourceKey[key])) {
                dispatch(addDataAction(key, attributeData[key]));
            } else {
                dispatch(updateDataAction(key, attributeData[key]));
            }
        }
    }
}


function addIndex(filter, order, attributeData, changedOn) {
    return (dispatch) => {
        for(const key of Object.keys(attributeData)) {
            dispatch(addIndexesAction(key, filter, order, attributeData[key], changedOn));
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
