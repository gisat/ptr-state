import _ from 'lodash';
import common from '../../_common/selectors';
import {makeSelector} from '@taskworld.com/rereselect';
import {createSelector as createRecomputeSelector, createObserver as createRecomputeObserver} from '@jvitela/recompute';

import SpatialRelationsSelectors from "../SpatialRelations/selectors";

const getSubstate = state => state.data.spatialDataSources;
const getAll = common.getAll(getSubstate);

const getAllObserver = createRecomputeObserver(getAll);

const getFiltered = createRecomputeSelector(filter => {
	console.log("SpatialDataSources/selectors#getFiltered");

	const dataSourceKeys = SpatialRelationsSelectors.getFilteredDataSourceKeys(filter);
	const dataSources = getAllObserver();

	if (dataSourceKeys?.length && dataSources?.length) {
		let filteredDataSources = [];
		_.forEach(dataSourceKeys, key => {
			const dataSource = _.find(dataSources, {key});
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