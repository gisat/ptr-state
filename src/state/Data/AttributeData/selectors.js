import {createObserver as createRecomputeObserver, createSelector as createRecomputeSelector} from '@jvitela/recompute';
import common from "../../_common/selectors";
const getSubstate = state => state.data.attributeData;

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
	return substate.byDataSourceKey?.[key];
});


const getDataByDataSourceKeys = createRecomputeSelector((dataSourceKeys) => {
	if (dataSourceKeys) {
		let data = {};
		_.forEach(dataSourceKeys, key => {
			const attributes = getByDataSourceKeyObserver(key);
			if (attributes && !_.isEmpty(attributes)) {
				data[key] = attributes;
			}
		});

		return !_.isEmpty(data) ? data : null;
	} else {
		return null;
	}
});

const getAttributesByDataSourceKeysByFeatureKey = createRecomputeSelector((attributeDataSourceKeyAttributeKeyPairs, featureKey) => {
	if (attributeDataSourceKeyAttributeKeyPairs && featureKey) {
		const dataSourceKeys = Object.keys(attributeDataSourceKeyAttributeKeyPairs);
		const dataByDataSourceKey = getDataByDataSourceKeys(dataSourceKeys);
		if (dataByDataSourceKey) {
			let attributes = {};
			_.forIn(dataByDataSourceKey, (dataSourceData, dataSourceKey) => {
				const value = dataSourceData[featureKey];
				const attributeKey = attributeDataSourceKeyAttributeKeyPairs[dataSourceKey];
				attributes[attributeKey] = value;
			});

			return !_.isEmpty(attributes) ? attributes : null;
		}
	} else {
		return null;
	}
});

const getIndexedFeatureKeysByDataSourceKeys = createRecomputeSelector((filter, level, tile) => {
	const index = getIndexByFilter(filter);
	if (index) {
		const featureKeysByDataSourceKeys = index[level]?.[tile];
		return featureKeysByDataSourceKeys || null;
	} else {
		return null;
	}
});


export default {
	getIndex,
	getDataByDataSourceKeys,
	getAttributesByDataSourceKeysByFeatureKey,
	getIndexedFeatureKeysByDataSourceKeys
};