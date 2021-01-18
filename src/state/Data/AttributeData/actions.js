import ActionTypes from '../../../constants/ActionTypes';
import common from '../../_common/actions';
import {tileAsString} from '../helpers';

const actionTypes = ActionTypes.DATA.ATTRIBUTE_DATA;

// ============ creators ===========
/**
 * It ensure adding index and adding or updating recieved data from BE.
 * @param {Object} attributeData Object recieved from BE contains under attributeDataKey object of data attributes [id]: [value]. 
 * @param {Object} spatialData Object recieved from BE contains under spatialDataKey object of data attributes [id]: {data, spatialIndex}. 
 * @param {Object} filter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Array?} order
 * @param {string?} changedOn 
 */
const receiveIndexed = (attributeData, spatialData, filter, order, changedOn) => {
    return dispatch => {
        // add attributeData to store
        if (attributeData) {            
            dispatch(addOrUpdateData(attributeData));
        }
        // attribute data index has same structure like spatial data index
        // add to index
        dispatch(addIndex(filter, order, attributeData, spatialData, changedOn));
    }
}

/**
 * If given attributeDataKey is alredy in state update its date otherwise add data to state.
 * @param {Object} attributeData Object recieved from BE contains under attributeDataKey object of data attributes [id]: [value].
 */
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
 * Create and add index for given attribute data based on related spatial data index.
 * @param {Object} filter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Array?} order
 * @param {Object} attributeData Object recieved from BE contains under attributeDataKey object of data attributes [id]: [value].
 * @param {Object} spatialData Object recieved from BE contains under spatialDataKey object of data attributes [id]: {data, spatialIndex}. SpatialData indexes are used as a templete for attribute data indexes.
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

/**
 * Create new index based on given level and tiles with loading indicator.
 * @param {Object} filter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Array?} order
 * @param {Number} level 
 * @param {Array.[Array]} tiles
 */
function addLoadingIndex(filter, order, level, tiles) {
    const count = null;
    const start = 0;
    const changedOn = null;
    
    //create index with tiles value "true" that indicates loading state
    const loadingTiles = tiles.reduce((acc, tile) => {
        const tileId = tileAsString(tile);
        acc[tileId] = true; 
        return acc
    }, {})
    const index = {
        [level]: loadingTiles
    };
    return common.actionAddIndex(actionTypes, filter, order, count, start, [index], changedOn);
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
    addLoadingIndex,
}
