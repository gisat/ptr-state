import ActionTypes from '../../../constants/ActionTypes';
import common, {DEFAULT_INITIAL_STATE} from '../../_common/reducers';
import {stateManagement} from '@gisatcz/ptr-utils';

const INITIAL_STATE = {
    ...DEFAULT_INITIAL_STATE,
    byDataSourceKey: {},
};

const add = (state, action) => {
    return {...state, byDataSourceKey: {...state.byDataSourceKey, [action.key]: {...action.data}}}
}

const update = (state, action) => {
    return {...state, byDataSourceKey: {...state.byDataSourceKey, [action.key]: {...state.byDataSourceKey[action.key], ...action.data}}}
}

const addIndexes = (state, action) => {
    const foundIndexes = []
    let stateUpdate = state;
    
    //prepare empty indexes in no one is in state
    if(!stateUpdate.indexes) {
        stateUpdate.indexes = [];
    }
    const tiles = Object.keys(action.index[action.level]);
    
    //Check if some tiles are not already in state
    for (const [i, index] of Object.entries(stateUpdate.indexes)) {
        if (_.isEqual(index.filter, action.filter) && _.isEqual(index.order, action.order) && tiles.includes(index.tile) && _.isEqual(index.level, action.level) && _.isEqual(index.spatialDataSourceKey, action.spatialDataSourceKey)){
            foundIndexes.push({index: i, tile: index.tile})
        }
    };

    const newIndexes = tiles.filter(t => !foundIndexes.find(f => f.tile === t));

    //replace same indexes
    if(foundIndexes.length > 0) {
        let indexes = stateUpdate.indexes;
        foundIndexes.forEach(index => {
            //replace old index by new one
            const updatedIndex = {
                filter: action.filter,
                order: action.order,
                spatialDataSourceKey: action.spatialDataSourceKey,
                tile: index.tile[action.level],
                level: action.level,
        
                count: action.index[action.level][index.tile].length,
                changedOn: action.changedOn,
                index: action.index[action.level][index.tile],
            }
            indexes = stateManagement.replaceItemOnIndex(indexes, index.index, updatedIndex);
        })
        stateUpdate = {...stateUpdate, indexes: indexes};
    }
    
    //add new indexes
    if(newIndexes.length) {
        newIndexes.forEach(newTile => {
            const newIndex = {
                filter: action.filter,
                order: action.order,
                spatialDataSourceKey: action.spatialDataSourceKey,
                tile: newTile,
                level: action.level,
        
                count: action.index[action.level][newTile].length,
                changedOn: action.changedOn,
                index: action.index[action.level][newTile],
            };
            
            stateUpdate = {...stateUpdate, indexes: [...stateUpdate.indexes, newIndex]};
        })
    }

    return stateUpdate;
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.DATA.SPATIAL_DATA.ADD:
			return add(state, action);
        case ActionTypes.DATA.SPATIAL_DATA.UPDATE:
			return update(state, action);
		case ActionTypes.DATA.SPATIAL_DATA.INDEX.ADD:
			return addIndexes(state, action);
        default:
            return state;
    }
}
