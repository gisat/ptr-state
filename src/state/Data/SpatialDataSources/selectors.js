import _ from 'lodash';
import common from '../../_common/selectors';
import {createSelector as createRecomputeSelector, createObserver as createRecomputeObserver} from '@jvitela/recompute';

import SpatialRelationsSelectors from "../SpatialRelations/selectors";

const getSubstate = state => state.data.spatialDataSources;
const getAllAsObject = common.getAllAsObject(getSubstate);

const getAllAsObjectObserver = createRecomputeObserver(getAllAsObject);

const getFiltered = createRecomputeSelector(filter => {
	console.log("SpatialDataSources/selectors#getFiltered");

	const dataSourceKeys = SpatialRelationsSelectors.getFilteredDataSourceKeys(filter);
	const dataSources = getAllAsObjectObserver();

	if (dataSourceKeys?.length && dataSources) {
		let filteredDataSources = [];
		_.forEach(dataSourceKeys, key => {
			const dataSource = dataSources[key];
			if (dataSource) {
				filteredDataSources.push(dataSource.data);
			}
		});
		return filteredDataSources.length ? filteredDataSources : null;
	} else {
		return null;
	}
});

export default {
	getFiltered
};