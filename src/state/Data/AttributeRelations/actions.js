import ActionTypes from '../../../constants/ActionTypes';
import common from '../../_common/actions';
import {reduce as _reduce} from 'lodash';

const actionTypes = ActionTypes.DATA.ATTRIBUTE_RELATIONS;

const add = common.add(actionTypes);
const addIndex = common.addIndex(actionTypes);
// ============ creators ===========
/**
 * It ensure adding index and adding or updating received data from BE.
 * Add relations to state only when attributeRelations received, in case of empty attributeRelations it adds only index.
 * @param {Array} attributeRelations Array received from BE contains attributeRelations.
 * @param {Object} filter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Array?} order
 * @param {Number} start
 * @param {Number} total
 * @param {string?} changedOn
 */
function receiveIndexed(
	attributeRelations,
	filter,
	order,
	start,
	total,
	changedOn,
	limit
) {
	return dispatch => {
		// add attributeRelations to store
		if (attributeRelations.length) {
			dispatch(add(attributeRelations, filter));
		}

		// add to index
		dispatch(
			addIndex(
				filter,
				order,
				total,
				start,
				attributeRelations,
				changedOn,
				limit
			)
		);
	};
}

/**
 * Create new index with loading indicator based on pagination.
 * @param {Object} pagination
 * @param {Object} filter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Array?} order
 */
function addLoadingIndex(pagination, filter, order) {
	const changedOn = null;

	//Fake new data object for common action
	const data = _reduce(
		[...Array(pagination.limit)],
		(acc, val) => {
			//Use key = true as a loading identificator
			return [...acc, {key: true}];
		},
		[]
	);

	// filter, order, data, start, count, changedOn
	return addIndexAction(
		filter,
		order,
		data,
		pagination.offset + 1,
		null,
		changedOn
	);
}

// ============ actions ============
const actionUpdateStore = data => {
	return {
		type: ActionTypes.DATA.ATTRIBUTE_RELATIONS.UPDATE_STORE,
		data,
	};
};

function addIndexAction(filter, order, data, start, count, changedOn) {
	return {
		type: actionTypes.INDEX.ADD,
		filter,
		order,
		data: data,
		start,
		count,
		changedOn,
	};
}
// ============ export ===========

export default {
	receiveIndexed,
	addLoadingIndex,
	updateStore: actionUpdateStore,
};
