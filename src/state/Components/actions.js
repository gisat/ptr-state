import ActionTypes from '../../constants/ActionTypes';
import common from '../_common/actions';
import Select from '../Select';

const updateStore = common.updateStore(
	Select.components.getSubstate,
	ActionTypes.COMPONENTS
);

// ============ creators ===========
function update(component, data) {
	return dispatch => {
		dispatch(actionUpdate(component, data));
	};
}

function updateStateFromView(components) {
	return dispatch => {
		if (components) {
			dispatch(updateStore(components));
		}
	};
}

// ============ actions ===========
function actionUpdate(component, data) {
	return {
		type: ActionTypes.COMPONENTS.UPDATE,
		component: component,
		update: data,
	};
}
function actionSet(component, path, value) {
	return {
		type: ActionTypes.COMPONENTS.SET,
		component,
		path,
		value,
	};
}

// ============ export ===========

export default {
	update,
	updateStateFromView: updateStore,
	updateStore,
	set: actionSet,
};
