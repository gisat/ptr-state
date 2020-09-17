import _ from 'lodash';
import {createSelector} from 'reselect';

const getAllSetsAsObject = state => state.windows.sets;
const getAllWindowsAsObject = state => state.windows.windows;

/**
 * If `val` is empty, returns `null`, else `val`
 */
function notEmpty(val) {
	return _.isEmpty(val) ? null : val;
}

const getSetByKey = createSelector(
	[
		getAllSetsAsObject,
		(state, key) => key
	],
	(sets, key) => {
		return sets && sets[key];
	}
);

const getWindow = createSelector(
	[
		getAllWindowsAsObject,
		(state, key) => key
	],
	(windows, key) => {
		return windows && windows[key];
	}
);

const getWindowsBySetKeyAsObject = createSelector(
	[
		getSetByKey,
		getAllWindowsAsObject
	],
	(set, windows) => {
		return notEmpty(_.pick(windows, set?.orderByHistory));
	}
);

const isOpen = createSelector(
	[getWindow],
	(window) => {
		return window?.data?.state === 'open';
	}
);

export default {
	getSetByKey,
	getWindow,
	getWindowsBySetKeyAsObject,
	isOpen
}