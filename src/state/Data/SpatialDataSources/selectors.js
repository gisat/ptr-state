import _ from 'lodash';
import {createSelector as createRecomputeSelector, createObserver as createRecomputeObserver} from '@jvitela/recompute';
import {createSelector} from "reselect";
import common from "../../_common/selectors";
import createCachedSelector from "re-reselect";

const getByKeyObserver = createRecomputeObserver((state, key) => {
	// console.log("SpatialDataSources/selectors#getByKeyObserver", ((new Date()).getMilliseconds()));
	return state.data.spatialDataSources.byKey?.[key];
});

const getSubstate = state => state.data.spatialDataSources;

const getIndex = common.getIndex(getSubstate);

const getFilteredIndexes = common.getFilteredIndexes(getSubstate);

const getAllAsObject = common.getAllAsObject(getSubstate);

const getIndexesObserver = createRecomputeObserver(state => {
	// console.log("SpatialDataSources/selectors#getIndexesObserver", ((new Date()).getMilliseconds()));
	return state.data.spatialDataSources.indexes;
});

const getByKeys = createRecomputeSelector(keys => {
	// console.log("SpatialDataSources/selectors#getByKeys", ((new Date()).getMilliseconds()));
	return keys.map(key => getByKeyObserver(key));
});

const getIndexByFilter = createRecomputeSelector(filter => {
	// console.log("SpatialDataSources/selectors#getIndex", ((new Date()).getMilliseconds()));
	const indexes = getIndexesObserver();
	return _.find(indexes, (index) => _.isMatch(index.filter, filter))?.index || null;
});

const getFiltered = createRecomputeSelector(filter => {
	// console.log("SpatialDataSources/selectors#getFiltered", ((new Date()).getMilliseconds()));
	const index = getIndexByFilter(filter);
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


/**
 * @param {*} state 
 * @param {*} filter 
 * @param {*} order 
 * @param {*} level 
 */
const getByFilteredIndexes = createCachedSelector([
	getFilteredIndexes,
	getAllAsObject,
    ],
    (indexes, dataSources) => {
        if(!_.isEmpty(indexes)) {
			const dataSourceKey = indexes[0].index[0];
			return dataSources[dataSourceKey];
        } else {
            return null;
        }
    }
)((state, filter, order) => {
	return `${JSON.stringify(filter)}${JSON.stringify(order)}`
})


export default {
	getFiltered,
	getIndex,
	getFilteredIndexes,
	getByFilteredIndexes,
};