import ActionTypes from '../../../constants/ActionTypes';
import common from '../../_common/reducers';

const INITIAL_STATE = {
	components: {
		byKey: {},
		inUse: [],
	},
	sets: {},
};

const setAttributeKeys = (state, componentKey, attributeKeys) => {
	if (componentKey) {
		return {
			...state,
			components: {
				...state.components,
				byKey: {
					...state.components.byKey,
					[componentKey]: state.components.byKey[componentKey]
						? {
								...state.components.byKey[componentKey],
								attributeKeys,
						  }
						: {
								attributeKeys,
						  },
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
 * @param componentsByKey {Object}
 * @return {Object}
 */
const updateComponents = (state, componentsByKey) => {
	if (componentsByKey) {
		return {
			...state,
			components: {
				...state.components,
				byKey: {
					...state.components.byKey,
					...componentsByKey,
				},
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
