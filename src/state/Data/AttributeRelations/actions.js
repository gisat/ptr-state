import ActionTypes from '../../../constants/ActionTypes';
import common from '../../_common/actions';

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
	changedOn
) {
	return dispatch => {
		// add attributeRelations to store
		if (attributeRelations.length) {
			dispatch(add(attributeRelations, filter));
		}

		// add to index
		dispatch(
			addIndex(filter, order, total, start, attributeRelations, changedOn)
		);
	};
}

/**
 * Create new index based on given level and tiles with loading indicator.
 * @param {Object} filter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Array?} order
 * @param {Number} level
 * @param {Array.[Array]} tiles
 */
function addLoadingIndex(pagination, filter, order) {
	const changedOn = null;

	//Fake new data object for common action
	const data = _.reduce(
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
		pagination.offset,
		pagination.limit,
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
