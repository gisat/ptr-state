import ActionTypes from '../../../constants/ActionTypes';
import common from '../../_common/reducers';

const INITIAL_STATE = {
	components: {},
	sets: {},
};

const setAttributeKeys = (state, componentKey, attributeKeys) => {
	if (componentKey) {
		return {
			...state,
			components: {
				...state.components,
				[componentKey]: state.components[componentKey]
					? {
							...state.components[componentKey],
							attributeKeys,
					  }
					: {
							attributeKeys,
					  },
			},
		};
	} else {
		return null;
	}
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
		case ActionTypes.DATA.COMPONENTS.COMPONENT.SET.ATTRIBUTE_KEYS:
			return setAttributeKeys(state, action.componentKey, action.attributeKeys);
		case ActionTypes.DATA.COMPONENTS.UPDATE_COMPONENTS:
			return updateComponents(state, action.components);
		default:
			return state;
	}
};
