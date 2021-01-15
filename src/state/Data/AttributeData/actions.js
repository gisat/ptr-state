import ActionTypes from '../../../constants/ActionTypes';
import common from '../../_common/actions';

const actionTypes = ActionTypes.DATA.ATTRIBUTE_DATA;

// ============ creators ===========
const receiveIndexed = (attributeData, spatialData, filter, order, changedOn) => {
    return dispatch => {
        // add attributeData to store
        if (attributeData) {            
            dispatch(addOrUpdateData(attributeData));
        }
        // attribute data index is same like spatial data index
        // add to index
        dispatch(addIndex(filter, order, attributeData, spatialData, changedOn));
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

/**
 * Create and add spatial index for given attribute data based on related spatial data index.
 * @param {*} filter 
 * @param {*} order 
 * @param {*} attributeData 
 * @param {*} spatialData SpatialData indexes are used as a templete for attribute data indexes.
 * @param {*} changedOn 
 */
function addIndex(filter, order, attributeData, spatialData, changedOn) {
    const count = null;
    const start = 0;
    const transformedData = {};

    //Attribute data indexes are stored in related spatial index
    //for all spatial data keys in spatialData
    for (const [sdKey, datasource] of Object.entries(spatialData)) {
        //for all levels in spatial data source
        for (const [level, tiles] of Object.entries(datasource.spatialIndex)) {
            if(!transformedData[level]) {
                transformedData[level] = {};
            }
            //for all tiles in tiles
            for (const [tile, tileData] of Object.entries(tiles)) {
                transformedData[level][tile] = {};
                //for all attribute data source keys in attributeData
                for (const [adKey, attributedatasource] of Object.entries(attributeData)) {
                    // Save only tileData that are incuded in attribute data keys
                    transformedData[level][tile][adKey] = tileData.filter((e => Object.keys(attributedatasource).includes(e.toString())));
                }
            }
        }
    }
    return common.actionAddIndex(actionTypes, filter, order, count, start, [transformedData], changedOn);
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
