import ActionTypes from '../../constants/ActionTypes';
import Select from '../Select';

import common from '../_common/actions';

// ============ creators ===========

const create = common.create(
	Select.layerTrees.getSubstate,
	'layerTrees',
	ActionTypes.LAYER_TREES,
	'applications'
);
const deleteItem = common.delete(
	Select.layerTrees.getSubstate,
	'layerTrees',
	ActionTypes.LAYER_TREES,
	'applications'
);
const saveEdited = common.saveEdited(
	Select.layerTrees.getSubstate,
	'layerTrees',
	ActionTypes.LAYER_TREES,
	'applications'
);
const updateEdited = common.updateEdited(
	Select.layerTrees.getSubstate,
	ActionTypes.LAYER_TREES
);
const useKeys = common.useKeys(
	Select.layerTrees.getSubstate,
	'layerTrees',
	ActionTypes.LAYER_TREES,
	'applications'
);
const useKeysClear = common.useKeysClear(ActionTypes.LAYER_TREES);
const useIndexedClear = common.useIndexedClear(ActionTypes.LAYER_TREES);
const useIndexed = common.useIndexed(
	Select.layerTrees.getSubstate,
	'layerTrees',
	ActionTypes.LAYER_TREES,
	'applications'
);
const refreshUses = common.refreshUses(
	Select.layerTrees.getSubstate,
	'layerTrees',
	ActionTypes.LAYER_TREES,
	'applications'
);
const updateStateFromView = common.updateSubstateFromView(
	ActionTypes.LAYER_TREES
);

// ============ actions ===========
function ensureData(filter, componentId) {
	return dispatch => {
		return dispatch(useIndexed(null, filter, null, 1, 100, componentId)).then();
	};
}

// ============ export ===========

export default {
	create,
	delete: deleteItem,

	ensureData,

	refreshUses,

	saveEdited,

	updateEdited,
	updateStateFromView,
	useIndexed,
	useIndexedClear,
	useKeys,
	useKeysClear,
};
