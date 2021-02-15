import {createObserver as createRecomputeObserver, createSelector as createRecomputeSelector} from '@jvitela/recompute';
import common from "../../_common/selectors";
import commonHelpers from '../../_common/helpers';
import {recomputeSelectorOptions} from '../../_common/recomputeHelpers';

const getSubstate = state => state.data.attributeData;

const getIndex = common.getIndexByPath(getSubstate);

const getSpatialIndexesObserver = createRecomputeObserver((state, getSubstate) => getSubstate(state).spatialIndexes);

/**
 * It returns all data for given datasource key
 * @param key {string} data source key
 * @returns {Object} Features as object (by feature key)
 */
const getByDataSourceKeyObserver = createRecomputeObserver((state, key) => {
	return getSubstate(state)?.byDataSourceKey?.[key] || null;
});

/**
 * It returns whole index for given filter & order
 * @param {Object} filter
 * @param {Array} order
 * @return {Object} index
 */
const getIndex_recompute = createRecomputeSelector((filter, order) => {
	const indexes = getSpatialIndexesObserver(getSubstate);
	if (indexes) {
		return commonHelpers.getIndex(indexes, filter, order);
	} else {
		return null;
	}
}, recomputeSelectorOptions);

/**
 * It returns attributes data (an object containing featureKey-attributeValue pairs) grouped by data source key
 * @param dataSourceKeys {Array}
 * @return {Object}
 */
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
}, recomputeSelectorOptions);

/**
 * It returns attribute values for given feature key grouped by data source key
 * @param attributeDataSourceKeyAttributeKeyPairs {Object} key-value pairs, where the key is attribute data source key and the value is matching attribute key
 * @param featureKey {string | number}
 * @return {Object} attributeDataSource key - attribute value pairs
 */
const getAttributesByDataSourceKeysForFeatureKey = createRecomputeSelector((attributeDataSourceKeyAttributeKeyPairs, featureKey) => {
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
}, recomputeSelectorOptions);

/**
 * It returns indexed feature keys grouped by attribute data source keys
 * @param {Object} filter
 * @param {number} level
 * @param {string} tile
 * @return {Object}
 */
const getIndexedFeatureKeysByDataSourceKeys = createRecomputeSelector((filter, level, tile) => {
	const index = getIndex_recompute(filter, null);
	if (index?.index) {
		const featureKeysByDataSourceKeys = index.index[level]?.[tile];
		return featureKeysByDataSourceKeys || null;
	} else {
		return null;
	}
}, recomputeSelectorOptions);


export default {
	getIndex,
	getDataByDataSourceKeys,
	getAttributesByDataSourceKeysForFeatureKey,
	getIndexedFeatureKeysByDataSourceKeys
};