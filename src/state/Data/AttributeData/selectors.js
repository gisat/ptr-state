import {createObserver as createRecomputeObserver, createSelector as createRecomputeSelector} from '@jvitela/recompute';
import common from "../../_common/selectors";

const getSubstate = state => state.data.attributeData;

const getIndex = common.getIndex(getSubstate);
const getIndex_recompute = common.getIndex_recompute(getSubstate);

const getByDataSourceKeyObserver = createRecomputeObserver((state, key) => {
	return getSubstate(state)?.byDataSourceKey?.[key] || null;
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
		} else {
			return null;
		}
	} else {
		return null;
	}
});

const getIndexedFeatureKeysByDataSourceKeys = createRecomputeSelector((filter, level, tile) => {
	const index = getIndex_recompute(filter, null);
	if (index?.index) {
		const featureKeysByDataSourceKeys = index.index[level]?.[tile];
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