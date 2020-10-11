import _ from 'lodash';
import {createSelector as createRecomputeSelector, createObserver as createRecomputeObserver} from '@jvitela/recompute';

const getByKeyObserver = createRecomputeObserver((state, key) => {
	// console.log("SpatialDataSources/selectors#getByKeyObserver", ((new Date()).getMilliseconds()));
	return state.data.spatialDataSources.byKey?.[key];
});

const getIndexesObserver = createRecomputeObserver(state => {
	// console.log("SpatialDataSources/selectors#getIndexesObserver", ((new Date()).getMilliseconds()));
	return state.data.spatialDataSources.indexes;
});

const getByKeys = createRecomputeSelector(keys => {
	// console.log("SpatialDataSources/selectors#getByKeys", ((new Date()).getMilliseconds()));
	return keys.map(key => getByKeyObserver(key));
});

const getIndex = createRecomputeSelector(filter => {
	// console.log("SpatialDataSources/selectors#getIndex", ((new Date()).getMilliseconds()));
	const indexes = getIndexesObserver();
	return _.find(indexes, (index) => _.isMatch(index.filter, filter))?.index || null;
});

const getFiltered = createRecomputeSelector(filter => {
	// console.log("SpatialDataSources/selectors#getFiltered", ((new Date()).getMilliseconds()));
	const index = getIndex(filter);
	if (index) {
		let keys = Object.values(index);
		if (keys) {
			return getByKeys(keys);
		} else {
			return null;
		}
	} else {
		return null;
	}
});

export default {
	getFiltered
};

