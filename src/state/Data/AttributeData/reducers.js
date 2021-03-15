import {reduce as _reduce} from 'lodash';
import ActionTypes from '../../../constants/ActionTypes';
import common, {DEFAULT_INITIAL_STATE} from '../../_common/reducers';
import commonHelpers from '../../_common/helpers';

export const INITIAL_STATE = {
	...DEFAULT_INITIAL_STATE,
	byDataSourceKey: {},
};

/**
 * Add attribute data
 * @param state {Object}
 * @param attributeDataSourceKey {string} attribute data source key
 * @param data {Object} feature key - attribute value pairs
 * @return {Object}
 */
const add = (state, attributeDataSourceKey, data) => {
	if (attributeDataSourceKey && data) {
		return {
			...state,
			byDataSourceKey: {
				...state.byDataSourceKey,
				[attributeDataSourceKey]: data,
			},
		};
	} else {
		return state;
	}
};

/**
 * Update attribute data for given data source
 * @param state {Object}
 * @param attributeDataSourceKey {string} attribute data source key
 * @param data {Object} feature key - attribute value pairs
 * @return {Object}
 */
const update = (state, attributeDataSourceKey, data) => {
	if (attributeDataSourceKey && data) {
		return {
			...state,
			byDataSourceKey: {
				...state.byDataSourceKey,
				[attributeDataSourceKey]: state.byDataSourceKey[attributeDataSourceKey]
					? {...state.byDataSourceKey[attributeDataSourceKey], ...data}
					: data,
			},
		};
	} else {
		return state;
	}
};

/**
 * @param state {Object}
 * @param attributeDataSourceKey {string} uuid
 * @param data {Object} attribute data
 * @param filter {Object}
 * @param order {Array}
 * @param indexData {Array}
 * @param changedOn {string}
 * @return {Object}
 */
const addWithSpatialIndex = (
	state,
	attributeDataSourceKey,
	data,
	filter,
	order,
	indexData,
	changedOn
) => {
	const byDataSourceKey = {
		...state.byDataSourceKey,
		[attributeDataSourceKey]: state.byDataSourceKey[attributeDataSourceKey]
			? {
					...state.byDataSourceKey[attributeDataSourceKey],
					...data,
			  }
			: data,
	};

	// TODO test commonHelpers.getUpdatedIndexes properly
	const updatedIndexes = commonHelpers.getUpdatedIndexes(
		state,
		filter,
		order,
		indexData,
		changedOn,
		'spatialIndexes'
	);

	return {...state, byDataSourceKey, spatialIndexes: updatedIndexes};
};

/**
 * Add data and index in one step
 * @param state {Object}
 * @param index {Array} ordered index
 * @param data {Object} Object with data
 * @param filter {Array}
 * @param order {Array}
 * @param start {Array}
 * @param total {Array}
 * @param changedOn {string}
 * @return {Object}
 */
const addWithIndex = (
	state,
	index,
	data,
	filter,
	order,
	start,
	total,
	changedOn
) => {
	// TODO test commonHelpers.getUpdatedByDataSourceKey properly
	const byDataSourceKey = commonHelpers.getUpdatedByDataSourceKey(
		state.byDataSourceKey,
		data
	);

	//Fake new data object for common action
	const newData = _reduce(
		index,
		(acc, val) => {
			return [...acc, {key: val}];
		},
		[]
	);

	const addIndexAction = {
		filter,
		order,
		data: newData,
		start,
		count: total,
		changedOn,
	};

	// TODO test common.addIndex properly
	const stateWithUpdatedIndexes = common.addIndex(state, addIndexAction);

	return {...state, byDataSourceKey, indexes: stateWithUpdatedIndexes.indexes};
};

const addIndexWithSpatial = (state, action) => {
	const updatedIndexes = commonHelpers.getUpdatedIndexes(
		state,
		action.filter,
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
			return add(state, action.key, action.data);
		case ActionTypes.DATA.ATTRIBUTE_DATA.ADD_WITH_SPATIAL_INDEX:
			return addWithSpatialIndex(
				state,
				action.attributeDataSourceKey,
				action.data,
				action.filter,
				action.order,
				action.indexData,
				action.changedOn
			);
		case ActionTypes.DATA.ATTRIBUTE_DATA.ADD_WITH_INDEX:
			return addWithIndex(
				state,
				action.index,
				action.data,
				action.filter,
				action.order,
				action.start,
				action.total,
				action.changedOn
			);
		case ActionTypes.DATA.ATTRIBUTE_DATA.UPDATE:
			return update(state, action.key, action.data);
		case ActionTypes.DATA.ATTRIBUTE_DATA.INDEX.ADD:
			return common.addIndex(state, action);
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
