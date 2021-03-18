import {createSelector} from 'reselect';
import {
	createObserver as createRecomputeObserver,
	createSelector as createRecomputeSelector,
} from '@jvitela/recompute';
import _ from 'lodash';

const getAllByKey = state => state.components;
const getAllByKeyObserver = createRecomputeObserver(getAllByKey);

const getDataByComponentKey = createSelector(
	[getAllByKey, (state, key) => key],
	(components, key) => {
		if (components && key && components[key]) {
			return components[key];
		} else {
			return null;
		}
	}
);

const getByComponentKey_recompute = createRecomputeSelector(componentKey => {
	return getAllByKeyObserver()?.[componentKey];
});

const get = createSelector(
	[getDataByComponentKey, (state, key, path) => path],
	(componentState, path) => _.get(componentState, path, null)
);

export default {
	get,
	getDataByComponentKey,
	getStateToSave: getAllByKey,

	getByComponentKey_recompute,

	getSubstate: getAllByKey,
};
