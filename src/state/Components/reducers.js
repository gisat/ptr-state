import {isEmpty as _isEmpty} from 'lodash';
import ActionTypes from '../../constants/ActionTypes';
import common from '../_common/reducers';

export const INITIAL_STATE = {};

/**
 * Update component
 * @param state {Object}
 * @param componentKey {string}
 * @param update {Object}
 * @return {Object} state
 */
function update(state, componentKey, update) {
	if (!_isEmpty(update)) {
		return {
			...state,
			[componentKey]: state[componentKey]
				? {...state[componentKey], ...update}
				: update,
		};
	} else {
		return state;
	}
}

/**
 * Set value in given path
 * @param state {Object}
 * @param component {string}
 * @param path {string} data.property.something
 * @param value {*}
 * @return {Object} state
 */
function set(state, component, path, value) {
	if (component && path) {
		const pathParams = path.split('.');
		return {
			...state,
			[component]: setHelper(state[component], pathParams, value),
		};
	} else {
		return state;
	}
}

// helpers ---------------------------------------------------------------------

/**
 *
 * @param state {Object}
 * @param path {string}
 * @param value {*}
 * @return {Object}
 */
function setHelper(state, path, value) {
	let remainingPath = [...path];
	let currentKey = remainingPath.shift();
	if (remainingPath.length) {
		return {
			...state,
			[currentKey]: setHelper(state[currentKey], remainingPath, value),
		};
	} else {
		return {...state, [currentKey]: value};
	}
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ActionTypes.COMPONENTS.UPDATE:
			return update(state, action.component, action.update);
		case ActionTypes.COMPONENTS.UPDATE_STORE:
			return common.updateStore(state, action);
		case ActionTypes.COMPONENTS.SET:
			return set(state, action.component, action.path, action.value);
		default:
			return state;
	}
};
