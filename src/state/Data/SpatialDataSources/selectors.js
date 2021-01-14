import _ from 'lodash';
import {createSelector as createRecomputeSelector, createObserver as createRecomputeObserver} from '@jvitela/recompute';
import common from "../../_common/selectors";
import createCachedSelector from "re-reselect";

const getSubstate = state => state.data.spatialDataSources;
const getIndex_recompute = common.getIndex_recompute(getSubstate);

const getByKeyObserver = createRecomputeObserver((state, key) => {
	return getSubstate(state)?.byKey?.[key] || null;
});

const getIndex = common.getIndex(getSubstate);

const getAllAsObject = common.getAllAsObject(getSubstate);

const getByKeys = createRecomputeSelector(keys => {
	return keys.map(key => getByKeyObserver(key));
});

const getFiltered = createRecomputeSelector(filter => {
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
	getFiltered,
	getIndex,
	getByFilteredIndex,
};