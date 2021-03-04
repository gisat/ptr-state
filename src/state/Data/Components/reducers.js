import {indexOf as _indexOf} from 'lodash';
import ActionTypes from '../../../constants/ActionTypes';

const INITIAL_STATE = {
	components: {
		byKey: {},
		inUse: [],
	},
	sets: {},
};

const componentUseClear = (state, componentKey) => {
	if (componentKey) {
		const index = _indexOf(state.components.inUse, componentKey);
		let updatedInUse = [
			...state.components.inUse.slice(0, index),
			...state.components.inUse.slice(index + 1),
		];

		return {
			...state,
			components: {
				...state.components,
				inUse: updatedInUse,
			},
		};
	} else {
		return state;
	}
};

const componentUseRegister = (state, componentKey) => {
	if (componentKey) {
		return {
			...state,
			components: {
				...state.components,
				inUse: [...state.components.inUse, componentKey],
			},
		};
	} else {
		return state;
	}
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
		return state;
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
		return state;
	}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ActionTypes.DATA.COMPONENTS.COMPONENT.SET.ATTRIBUTE_KEYS:
			return setAttributeKeys(state, action.componentKey, action.attributeKeys);
		case ActionTypes.DATA.COMPONENTS.COMPONENT.USE.CLEAR:
			return componentUseClear(state, action.componentKey);
		case ActionTypes.DATA.COMPONENTS.COMPONENT.USE.REGISTER:
			return componentUseRegister(state, action.componentKey);
		case ActionTypes.DATA.COMPONENTS.UPDATE_COMPONENTS:
			return updateComponents(state, action.components);
		default:
			return state;
	}
};
