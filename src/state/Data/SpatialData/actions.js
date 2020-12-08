import ActionTypes from '../../../constants/ActionTypes';
import _ from "lodash";
import common from '../../_common/actions';
import {tileAsString} from '../helpers';

const actionTypes = ActionTypes.DATA.SPATIAL_DATA;

// ============ creators ===========
const receiveIndexed = (spatialData, filter, order, changedOn) => {
    return dispatch => {
        // add spatialData to store
        if (spatialData) {            
            dispatch(addData(spatialData));
        }

        // add to index
        dispatch(addIndex(filter, order, spatialData, changedOn));
    }
}

function addIndex(filter, order, spatialData, changedOn) {
    const count = null;
    const start = 0;
    const transformedData = {};
    for (const [sdKey, datasource] of Object.entries(spatialData)) {
        for (const [level, tiles] of Object.entries(datasource.spatialIndex)) {
            if(!transformedData[level]) {
                transformedData[level] = {};
            }
            for (const [tile, tileData] of Object.entries(tiles)) {
                transformedData[level][tile] = {
                    [sdKey]: tileData
                }
            }
        }
    }
    return common.actionAddIndex(actionTypes, filter, order, count, start, [transformedData], changedOn);
}

function addData(spatialData) {
    return (dispatch, getState) => {
        for(const key of Object.keys(spatialData)) {
            if(!_.isEmpty(spatialData[key].data)) {
                //spatialData should be only from one level
                const levels = Object.keys(spatialData[key].spatialIndex);
                for (const level of levels) {
                    dispatch(addDataAction(key, spatialData[key].data, level));
                }
            }
        }
    }
}

// ============ actions ============
function addDataAction(key, data, level) {
    return {
        type: actionTypes.ADD,
        key,
        data,
        level,
    }
}

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

// ============ export ===========

export default {
    receiveIndexed,
    addLoadingIndex,
}
