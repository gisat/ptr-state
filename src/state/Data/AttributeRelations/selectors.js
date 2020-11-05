import common from '../../_common/selectors';
import {createObserver as createRecomputeObserver, createSelector as createRecomputeSelector} from '@jvitela/recompute';
import _ from 'lodash';

const getSubstate = (state) => state.data.attributeRelations;

const getIndex = common.getIndex(getSubstate);

const getByKeyObserver = createRecomputeObserver((state, key) => {
	// console.log("AttributeDataSources/selectors#getByKeyObserver", ((new Date()).getMilliseconds()));
	const substate = getSubstate(state);
	return substate.byKey?.[key];
});

const getIndexesObserver = createRecomputeObserver(state => {
	const substate = getSubstate(state);
	return substate.indexes;
});

const getByKeys = createRecomputeSelector(keys => {
	// console.log("AttributeDataSources/selectors#getByKeys", ((new Date()).getMilliseconds()));
	return keys.map(key => getByKeyObserver(key));
});

const getIndexByFilter = createRecomputeSelector(filter => {
	// console.log("AttributeDataSources/selectors#getIndex", ((new Date()).getMilliseconds()));
	const indexes = getIndexesObserver();
	return _.find(indexes, (index) => _.isMatch(index.filter, filter))?.index || null;
});

const getFiltered = createRecomputeSelector(filter => {
	// console.log("AttributeDataSources/selectors#getFiltered", ((new Date()).getMilliseconds()));
	const index = getIndexByFilter(filter);
	if (index) {
		// filter only uuids (not true or false values of index)
		const keys = _.filter(Object.values(index), (key) => typeof key === "string");
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