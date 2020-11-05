import _ from 'lodash';
import {createSelector as createRecomputeSelector, createObserver as createRecomputeObserver} from '@jvitela/recompute';
import {createSelector} from "reselect";
import common from "../../_common/selectors";

const getSubstate = state => state.data.attributeDataSources;

const getByKeyObserver = createRecomputeObserver((state, key) => {
	// console.log("AttributeDataSources/selectors#getByKeyObserver", ((new Date()).getMilliseconds()));
	const substate = getSubstate(state);
	return substate.byKey?.[key];
});


const getIndex = common.getIndex(getSubstate);

const getFilteredIndexes = common.getFilteredIndexes(getSubstate);

const getAllAsObject = common.getAllAsObject(getSubstate);

const getIndexesObserver = createRecomputeObserver(state => {
	// console.log("AttributeDataSources/selectors#getIndexesObserver", ((new Date()).getMilliseconds()));
	const substate = getSubstate(state);
	return substate.indexes;
});

const getByKeys = createRecomputeSelector(keys => {
	// console.log("AttributeDataSources/selectors#getByKeys", ((new Date()).getMilliseconds()));
	return keys.map(key => getByKeyObserver(key));
});

const getIndexByFilter = createRecomputeSelector(filter => {
	// console.log("AttributeDataSources/selectors#getIndex", ((new Date()).getMilliseconds()));
	const indexes = getIndexesObserver();
	return _.find(indexes, (index) => _.isMatch(index.filter, filter))?.index || null;
});

const getFiltered = createRecomputeSelector(filter => {
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
const getByFilteredIndexes =  createSelector([
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
);


export default {
	getFiltered,
	getIndex,
	getFilteredIndexes,
	getByFilteredIndexes,
};