import _ from 'lodash';
import {createSelector as createRecomputeSelector, createObserver as createRecomputeObserver} from '@jvitela/recompute';
import common from "../../_common/selectors";
import createCachedSelector from "re-reselect";
import commonHelpers from '../../_common/helpers';

const getSubstate = state => state.data.spatialDataSources;

const getIndex = common.getIndex(getSubstate);
const getAllAsObject = common.getAllAsObject(getSubstate);

const getIndexesObserver = createRecomputeObserver((state, getSubstate) => common.getIndexes(getSubstate)(state));

/**
 * It returns data source model for given key, if exists
 * @param key {string} data source key
 * @return {Object} Data source
 */
const getByKeyObserver = createRecomputeObserver((state, key) => {
	return getSubstate(state)?.byKey?.[key] || null;
});


/**
 * It returns data source models for given keys, if exist
 * @param keys {Array} data source keys
 * @return {Array} A collection of data sources
 */
const getByKeys = createRecomputeSelector(keys => {
	return keys.map(key => getByKeyObserver(key));
});

/**
 * It returns whole index for given filter and order
 * @param filter {Object}
 * @param order {Array}
 * @return {Object} index
 */
const getIndex_recompute = createRecomputeSelector((filter, order) => {
	const indexes = getIndexesObserver(getSubstate);
	if (indexes) {
		return commonHelpers.getIndex(indexes, filter, order);
	} else {
		return null;
	}
});

/**
 * It returns a collection of indexed data sources for given filter
 * @param filter {Object}
 * @return {Array}
 */
const getIndexed = createRecomputeSelector(filter => {
	const index = getIndex_recompute(filter, null);
	if (index?.index) {
		let keys = Object.values(index.index);
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
const getByFilteredIndex = createCachedSelector([
	getIndex,
	getAllAsObject,
    ],
    (index, dataSources) => {
        if(!_.isEmpty(index)) {
			//Each SpatialDataSource index targets to one entry in "byKey"
			const dataSourceKey = index.index[0];
			return dataSources[dataSourceKey];
        } else {
            return null;
        }
    }
)((state, filter, order) => {
	return `${JSON.stringify(filter)}${JSON.stringify(order)}`
})


export default {
	getIndexed,
	getIndex,
	getByFilteredIndex,
};