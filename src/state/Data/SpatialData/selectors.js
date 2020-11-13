import _ from 'lodash';
import common from '../../_common/selectors';
import {createSelector as createRecomputeSelector, createObserver as createRecomputeObserver} from '@jvitela/recompute';

const getSubstate = (state) => state.data.spatialData;

const getIndex = common.getIndex(getSubstate);

const getIndexesObserver = createRecomputeObserver(common.getIndexes(getSubstate));

const getIndexByFilter = createRecomputeSelector((filter) => {
	const indexes = getIndexesObserver();
	if (filter && indexes) {
		return _.find(indexes, (index) => _.isMatch(index.filter, filter))?.index || null;
	} else {
		return null;
	}
});

const getByDataSourceKeyObserver = createRecomputeObserver((state, key) => {
	const substate = getSubstate(state);
	return substate.byDataSourceKey?.[key] || null;
});

const getIndexedFeatureKeys = createRecomputeSelector((filter, level, tile, dataSourceKey) => {
	const index = getIndexByFilter(filter);
	if (index) {
		const featureKeys = index[level]?.[tile]?.[dataSourceKey];
		return featureKeys?.length ? featureKeys : null;
	} else {
		return null;
	}
});

export default {
	getByDataSourceKeyObserver,
	getIndexByFilter,
	getIndex,
	getIndexedFeatureKeys
};