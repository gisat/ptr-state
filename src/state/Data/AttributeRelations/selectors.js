import common from '../../_common/selectors';
import {createObserver as createRecomputeObserver, createSelector as createRecomputeSelector} from '@jvitela/recompute';
import _ from 'lodash';

const getSubstate = (state) => state.data.attributeRelations;

const getIndex = common.getIndex(getSubstate);
const getIndex_recompute = common.getIndex_recompute(getSubstate);

const getByKeyObserver = createRecomputeObserver((state, key) => {
	return getSubstate(state)?.byKey?.[key] || null;
});

const getByKeys = createRecomputeSelector(keys => {
	return keys.map(key => getByKeyObserver(key));
});

const getFiltered = createRecomputeSelector(filter => {
	const index = getIndex_recompute(filter, null);
	if (index?.index) {
		// filter only uuids (not true or false values of index)
		const keys = _.filter(Object.values(index.index), (key) => typeof key === "string");
		if (keys?.length) {
			return getByKeys(keys);
		} else {
			return null;
		}
	} else {
		return null;
	}
});

const getFilteredAttributeDataSourceKeyAttributeKeyPairs = createRecomputeSelector(filter => {
	const relations = getFiltered(filter);
	if (relations) {
		const pairs = {};
		_.forEach(relations, relation => {
			pairs[relation.data.attributeDataSourceKey] = relation.data.attributeKey;
		});
		return pairs;
	} else {
		return null;
	}
})

export default {
	getFilteredAttributeDataSourceKeyAttributeKeyPairs,
    getIndex
};