import common from '../../_common/selectors';
import {createSelector as createRecomputeSelector, createObserver as createRecomputeObserver} from '@jvitela/recompute';

const getSubstate = (state) => state.data.spatialData;

const getIndex = common.getIndex(getSubstate);
const getIndex_recompute = common.getIndex_recompute(getSubstate);

const getByDataSourceKeyObserver = createRecomputeObserver((state, key) => {
	return getSubstate(state)?.byDataSourceKey?.[key] || null;
});

const getIndexedFeatureKeys = createRecomputeSelector((filter, level, tile, dataSourceKey) => {
	const index = getIndex_recompute(filter, null);
	if (index?.index) {
		const featureKeys = index.index[level]?.[tile]?.[dataSourceKey];
		return featureKeys?.length ? featureKeys : null;
	} else {
		return null;
	}
});

export default {
	getByDataSourceKeyObserver,
	getIndex,
	getIndexedFeatureKeys
};