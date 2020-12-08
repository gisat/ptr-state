import ActionTypes from '../../../constants/ActionTypes';
import _ from "lodash";
import common from '../../_common/actions';
import {tileAsString} from '../helpers';

const actionTypes = ActionTypes.DATA.SPATIAL_DATA;

// ============ creators ===========
const receiveIndexed = (data, filter, order, changedOn) => {
    return dispatch => {
        // add data to store
        if (data) {            
            dispatch(addData(data));
        }

        // add to index
        dispatch(addIndex(filter, order, data, changedOn));
    }
}

function addIndex(filter, order, data, changedOn) {
    const count = null;
    const start = 0;
    const transformedData = {};
    for (const [sdKey, datasource] of Object.entries(data)) {
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

function addData(data) {
    return (dispatch, getState) => {
        for(const key of Object.keys(data)) {
            if(!_.isEmpty(data[key].data)) {
                //data should be only from one level
                const levels = Object.keys(data[key].spatialIndex);
                for (const level of levels) {
                    dispatch(addDataAction(key, data[key].data, level));
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
