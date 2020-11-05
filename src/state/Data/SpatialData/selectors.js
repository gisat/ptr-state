import common from '../../_common/selectors';
import {createSelector} from "reselect";
import {createSelector as createRecomputeSelector, createObserver as createRecomputeObserver} from '@jvitela/recompute';

const getSubstate = (state) => state.data.spatialData;

/**
 * TODO - can be replaced by getIndex???
 * @param {*} state 
 * @param {*} filter 
 * @param {*} order 
 * @param {*} level 
 */
const getFilteredIndexes =  createSelector([
    common.getFilteredIndexes(getSubstate),
    (state, filter) => filter,
    (state, filter, order) => order,
    (state, filter, order, level) => level],
    (index, filter, order, level) => {
        if(index) {
			//fixme - by level???
            // return indexes.filter(index => index.level === level);
            if(index.level === level) {
				return index
			} else {
				return null
			}
        } else {
            return null;
        }
    }
);

const getByDataSourceKeyObserver = createRecomputeObserver((state, key) => {
	const substate = getSubstate(state);
	return substate.byDataSourceKey?.[key];
});


const getGeometriesByDataSourceKey = createRecomputeSelector((dataSourceKey, fidColumnName) => {
	const geometries = getByDataSourceKeyObserver(dataSourceKey);
	if (geometries && !_.isEmpty(geometries)) {
		return geometries;
	} else {
		return null;
	}
	//
	// const data = getByDataSourceKeyObserver(dataSourceKey);
	// if (data) {
	// 	return _.map(data, (geometry, key) => {
	// 		return {
	// 			type: "Feature",
	// 			key,
	// 			geometry,
	// 			properties: {
	// 				[fidColumnName]: key // TODO fix dependency on this in ptr-maps
	// 			}
	// 		}
	// 	});
	// } else {
	// 	return null;
	// }
});

export default {
	getGeometriesByDataSourceKey,
    getFilteredIndexes
};