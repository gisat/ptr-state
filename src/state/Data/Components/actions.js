import ActionTypes from '../../../constants/ActionTypes';
import common from '../../_common/actions';

/**
 * Update whole data.components.components object with given components
 * @param components {Object}
 */
function updateComponentsStateFromView(components) {
	return dispatch => {
		if (components) {
			dispatch(actionUpdateComponents(components));
		}
	};
}

// Actions
const actionUpdateComponents = components => {
	return {
		type: ActionTypes.DATA.COMPONENTS.UPDATE_COMPONENTS,
		components,
	};
};

export default {
	updateComponentsStateFromView,
};
