import common from '../../_common/selectors';
import {createSelector} from "reselect";
import {createSelector as createRecomputeSelector, createObserver as createRecomputeObserver} from '@jvitela/recompute';

const getSubstate = (state) => state.data.spatialData;

const getIndex = common.getIndex(getSubstate);

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
	getIndex,
};