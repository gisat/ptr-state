import ActionTypes from '../../../constants/ActionTypes';
import common, {DEFAULT_INITIAL_STATE} from '../../_common/reducers';
import commonHelpers from '../../_common/helpers';

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
	return {
		...state,
		byDataSourceKey: {...state.byDataSourceKey, [action.key]: {...action.data}},
	};
};

/**
 * update attribute data for given data source
 * @param state {Object}
 * @param action {Object}
 * @param action.key {string} attribute data source key
 * @param action.data {Object} feature key - attribute value pairs
 * @return {Object}
 */
const update = (state, action) => {
	return {
		...state,
		byDataSourceKey: {
			...state.byDataSourceKey,
			[action.key]: {...state.byDataSourceKey[action.key], ...action.data},
		},
	};
};

/**
 * @param state {Object}
 * @param action {Object}
 * @param action.attributeDataSourceKey {string} uuid
 * @param action.data {Object} attribute data
 * @param action.spatialFilter {Object}
 * @param action.order {Array}
 * @param action.indexData {Array}
 * @param action.changedOn {string}
 * @return {Object}
 */
const addWithSpatialIndex = (state, action) => {
	const byDataSourceKey = {
		...state.byDataSourceKey,
		[action.attributeDataSourceKey]: state.byDataSourceKey[
			action.attributeDataSourceKey
		]
			? {
					...state.byDataSourceKey[action.attributeDataSourceKey],
					...action.data,
			  }
			: action.data,
	};

	const updatedIndexes = commonHelpers.getUpdatedIndexes(
		state,
		action.spatialFilter,
		action.order,
		action.indexData,
		action.changedOn,
		'spatialIndexes'
	);

	return {...state, byDataSourceKey, spatialIndexes: updatedIndexes};
};

const addIndex = (state, action) => {
	const updatedIndexes = commonHelpers.getUpdatedIndexes(
		state,
		action.spatialFilter,
		action.order,
		action.indexData,
		action.changedOn,
		'spatialIndexes'
	);

	return {
		...state,
		spatialIndexes: updatedIndexes,
	};
};

/**
 * Remove index that fit to filter and order from state.
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
const removeIndex = (state, action) => {
	const updatedIndexes = commonHelpers.removeIndex(
		state.spatialIndexes,
		action.filter,
		action.order
	);

	return {
		...state,
		spatialIndexes: updatedIndexes,
	};
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ActionTypes.DATA.ATTRIBUTE_DATA.ADD:
			return add(state, action);
		case ActionTypes.DATA.ATTRIBUTE_DATA.ADD_WITH_SPATIAL_INDEX:
			return addWithSpatialIndex(state, action);
		case ActionTypes.DATA.ATTRIBUTE_DATA.ADD_WITH_INDEX:
			return addWithIndex(state, action);
		case ActionTypes.DATA.ATTRIBUTE_DATA.UPDATE:
			return update(state, action);
		case ActionTypes.DATA.ATTRIBUTE_DATA.INDEX.ADD:
			return common.add(state, action);
		case ActionTypes.DATA.ATTRIBUTE_DATA.INDEX.ADD_WITH_SPATIAL:
			return addIndexWithSpatial(state, action);
		case ActionTypes.DATA.ATTRIBUTE_DATA.INDEX.REMOVE:
			return removeIndex(state, action);
		case ActionTypes.DATA.ATTRIBUTE_DATA.UPDATE_STORE:
			return common.updateStore(state, action.data);
		default:
			return state;
	}
};
