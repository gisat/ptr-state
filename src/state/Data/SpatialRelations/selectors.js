import _ from 'lodash';
import {makeSelector} from '@taskworld.com/rereselect';
import {createSelector as createRecomputeSelector, createObserver as createRecomputeObserver} from '@jvitela/recompute';
import common from '../../_common/selectors';

const getSubstate = (state) => state.data.spatialRelations;

const getIndex = common.getIndex(getSubstate);
const getAll = common.getAll(getSubstate);

const getAllObserver = createRecomputeObserver(getAll);

const getFiltered = createRecomputeSelector(filter => {
	console.log("SpatialRelations#getFiltered");
	const relations = getAllObserver();
	if (relations?.length) {
		const filtered = _.filter(relations, (relation) => _.isMatch(relation.data, filter));
		return filtered.length ? filtered : null;
	} else {
		return null;
	}
});

const getFilteredDataSourceKeys = createRecomputeSelector(filter => {
	console.log("SpatialRelations#getFilteredDataSourceKeys");
	const filteredRelations = getFiltered(filter);
	if (filteredRelations?.length) {
		return filteredRelations.map(relation => relation.data.spatialDataSourceKey);
	} else {
		return null;
	}
});

export default {
	getFiltered,
	getFilteredDataSourceKeys,
    getIndex
};