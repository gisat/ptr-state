import ActionTypes from '../../../constants/ActionTypes';
import common, {DEFAULT_INITIAL_STATE} from '../../_common/reducers';
import _ from 'lodash';

const INITIAL_STATE = {
    ...DEFAULT_INITIAL_STATE,
    byDataSourceKey: {},
};

/**
 * Add attribute data
 * @param state {Object}
 * @param action {Object}
 * @param action.key {string} attribute data source key
 * @param action.data {Object} feature key - attribute value pairs
 * @return {Object}
 */
const add = (state, action) => {
    return {...state, byDataSourceKey: {...state.byDataSourceKey, [action.key]: {...action.data}}}
}

/**
 * update attribute data for given data source
 * @param state {Object}
 * @param action {Object}
 * @param action.key {string} attribute data source key
 * @param action.data {Object} feature key - attribute value pairs
 * @return {Object}
 */
const update = (state, action) => {
    return {...state, byDataSourceKey: {...state.byDataSourceKey, [action.key]: {...state.byDataSourceKey[action.key], ...action.data}}}
}

const addWithIndex = (state, action) => {
	const byDataSourceKey = {
		...state.byDataSourceKey,
		[action.attributeDataSourceKey]: state.byDataSourceKey[action.attributeDataSourceKey] ? {
			...state.byDataSourceKey[action.attributeDataSourceKey],
			...action.data,
		} : action.data,
	};

	const updatedIndexes = getUpdatedIndexes(state, action.spatialFilter, action.order, action.indexesData, action.changedOn);

	return {...state, byDataSourceKey, indexes: updatedIndexes}
}

// helpers

/**
 * @param state {Object}
 * @param spatialFilter {Object}
 * @param order {Array}
 * @param indexesData {Array}
 * @param changedOn {string}
 */
function getUpdatedIndexes(state, spatialFilter, order, indexesData, changedOn) {
	let indexes = [];
	let selectedIndex = {};

	if (state.indexes){
		state.indexes.forEach(index => {
			if (_.isEqual(index.filter, spatialFilter) && _.isEqual(index.order, order)){
				selectedIndex = index;
			} else {
				indexes.push(index);
			}
		});
	}

	let index;
	if (indexesData.length){
		index = {...selectedIndex.index};
		indexesData.forEach((model, i) => {
			if(model.key) {
				index[i] = model.key;
			} else {
				//spatial data by spatialDataSourceKey, levels and tiles
				//update spatialDataSourceKey
				for(const [level, dataByTiles] of Object.entries(model)) {
					if(index.hasOwnProperty(level) && index[level]) {
						//update data on level
						index[level] =  {...index[level], ...dataByTiles}
					} else {
						index[level] =  {...dataByTiles}
					}
				}
			}

		});
	}

	selectedIndex = {
		filter: selectedIndex.filter || spatialFilter,
		order: selectedIndex.order || order,
		changedOn: changedOn,
		index: index || selectedIndex.index
	};
	indexes.push(selectedIndex);

	return indexes;
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.DATA.ATTRIBUTE_DATA.ADD:
			return add(state, action);
		case ActionTypes.DATA.ATTRIBUTE_DATA.ADD_WITH_INDEX:
			return addWithIndex(state, action);
        case ActionTypes.DATA.ATTRIBUTE_DATA.UPDATE:
            return update(state, action);
        case ActionTypes.DATA.ATTRIBUTE_DATA.INDEX.ADD:
            return common.addIndex(state, action)
        default:
            return state;
    }
}
