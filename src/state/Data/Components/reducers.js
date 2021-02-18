import ActionTypes from '../../../constants/ActionTypes';
import common from '../../_common/reducers';

const INITIAL_STATE = {
	components: {},
	sets: {},
};

/**
 * Update whole data.components.components object with given components
 * @param state {Object}
 * @param components {Object}
 * @return {Object}
 */
const updateComponents = (state, components) => {
	if (components) {
		return {
			...state,
			components: {
				...state.components,
				...components,
			},
		};
	} else {
		return null;
	}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ActionTypes.DATA.COMPONENTS.UPDATE_COMPONENTS:
			return updateComponents(state, action.components);
		default:
			return state;
	}
};
