import {createSelector} from 'reselect';
import createCachedSelector from "re-reselect";
import _, {isEmpty, cloneDeep} from 'lodash';
import common from "../_common/selectors";

const getSubstate = (state) => state.spatialRelations;
const getAll = common.getAll(getSubstate);
const getByKey = common.getByKey(getSubstate);
const getByKeys = common.getByKeys(getSubstate);

/**
 * @return {Array|null}
 */
const getAllData = createSelector(
	[getAll],
	(relations) => {
		if (relations) {
			return _.map(relations, relation => relation.data);
		} else {
			return null;
		}
	}
);

/**
 * @param state {Object}
 * @param filter {Object}
 * @returns {Array|null}
 */
const getFilteredData = createSelector(
	[
		getAllData,
		(state, filter) => filter
	],
	(relations, filter) => {
		if (relations && relations.length > 0 && filter && !_.isEmpty(filter)) {
			return _.filter(relations, filter);
		} else {
			return null;
		}
	}
);

/**
 * @returns {Object}
 */
const getFilteredDataSourceKeysGroupedByLayerKey = createCachedSelector(
	[
		getAll,
		(state, layers) => layers
	],
	(relations, layers) => {
		if (relations && relations.length) {
			let filteredGroupedByLayerKey = {};

			_.forEach(layers, (layer) => {
				let filteredRelations = _.filter(relations, {'data': layer.filter});
				if (filteredRelations.length) {
					filteredGroupedByLayerKey[layer.key] = filteredRelations.map(relation => {
						return {
							spatialDataSourceKey: relation.data.spatialDataSourceKey,
							fidColumnName: relation.data.fidColumnName
						}
					});
				}
			});
			return !_.isEmpty(filteredGroupedByLayerKey) ? filteredGroupedByLayerKey : null;

		} else {
			return null;
		}
	}
)(
	(state, layers) => JSON.stringify(layers)
);

/**
 * @returns {Object}
 */
const getFilteredDataGroupedByLayerTemplateKey = createCachedSelector(
	[
		getAll,
		(state, layers) => layers
	],
	(relations, layers) => {
		if (relations && relations.length) {
			let filteredGroupedByLayerKey = {};

			_.forEach(layers, (layer) => {
				let filteredRelations = _.filter(relations, {'data': layer.filter});
				const layerTemplateKey = layer.filter.layerTemplateKey;
				if (layerTemplateKey && filteredRelations.length) {
					filteredGroupedByLayerKey[layerTemplateKey] = filteredRelations;
				}
			});
			return !_.isEmpty(filteredGroupedByLayerKey) ? filteredGroupedByLayerKey : null;

		} else {
			return null;
		}
	}
)(
	(state, layersState) => layersState.map(l => l.filter && l.filter.layerTemplateKey).join(',')
);

/********************************
 DEPRECATED
 ********************************/

/**
 * Collect and prepare relations for given filters grouped by layer key
 *
 * @param state {Object}
 * @param layers {Array | null} Collection of layers data. Each object in collection contains filter property (it is used for selecting of relations) and data property (which contains data about layer from map state - e.g. key).
 */
const getFilteredDataGroupedByLayerKey = createSelector(
	[
		getAllData,
		(state, layers) => layers
	],
	/**
	 * @param relations {Array | null} list of all relations data
	 * @param layers {Array | null}
	 * @return {Object | null} Selected relations grouped by layer key
	 */
	(relations, layers) => {
		if (layers && !_.isEmpty(layers)) {
			let groupedRelations = {};
			layers.forEach(layer => {
				const layerKey = layer.key || (layer.data && layer.data.key);
				if (layerKey) {
					if (relations && relations.length) {
						const filter = cloneDeep(layer.filter);
						//TODO
						//sapatial data should not be filtered by period and attributeKey
						delete filter.attributeKey;
						let filteredRelations = _.filter(relations, filter);
						if (!_.isEmpty(filteredRelations)) {
							groupedRelations[layerKey] = filteredRelations;
						} else {
							groupedRelations[layerKey] = [null];
						}
					} else {
						groupedRelations[layerKey] = [null];
					}
				}
			});
			return !_.isEmpty(groupedRelations) ? groupedRelations : null;
		} else {
			return null;
		}
	}
);

/**
 * @param state {Object}
 * @param filter {Object}
 */
const getDataSourceKeysFiltered = createSelector(
	[getFilteredData],
	(filteredRelations) => {
		if (filteredRelations && filteredRelations.length) {
			return _.map(filteredRelations, relation => relation.spatialDataSourceKey);
		} else {
			return null;
		}
	}
);

/**
 * Filter spatialRelationsData by layerTemplateKeys.
 *
 * @param state {Object}
 * @param layerTemplateKeys {Array | null} Array of layerTemplateKeys.
 */
const getDataSourceRelationsByLayerTemplateKeys = createSelector(
	[getAllData, (state, layerTemplateKeys) => layerTemplateKeys],
	(allData, layerTemplateKeys) => {
		if (allData && !_.isEmpty(allData) && layerTemplateKeys && !_.isEmpty(layerTemplateKeys)) {
			const filtered = allData.filter(i => layerTemplateKeys.includes(i.layerTemplateKey));
			return !_.isEmpty(filtered) ? filtered : null;
		} else {
			return null;
		}
	}
);

// TODO wtf?
/**
 * Collect and prepare data relations grouped by layer key
 *
 * @param state {Object}
 * @param layers {Array | null} Collection of layers data. Each object in collection contains filter property (it is used for selecting of relations) and data property (which contains data about layer from map state - e.g. key).
 */
const getDataSourceRelationsGroupedByLayerKey = createSelector(
	[getFilteredDataGroupedByLayerKey],

	/**
	 * @param groupedRelations {null | Object} Relations grouped by layer key
	 * @return {null | Object} Data sources keys grouped by layer key
	 */
	(groupedRelations) => {
		if (groupedRelations) {
			let groupedDataSourceKeys = {};
			_.forIn(groupedRelations, (relationsData, layerKey) => {
				groupedDataSourceKeys[layerKey] = relationsData;
			});
			return !_.isEmpty(groupedDataSourceKeys) ? groupedDataSourceKeys : null;
		} else {
			return null;
		}
	}
);

/**
 * Collect and prepare data sources keys grouped by layer key
 *
 * @param state {Object}
 * @param layers {Array | null} Collection of layers data. Each object in collection contains filter property (it is used for selecting of relations) and data property (which contains data about layer from map state - e.g. key).
 */
const getDataSourceKeysGroupedByLayerKey = createSelector(
	[getDataSourceRelationsGroupedByLayerKey],

	/**
	 * @param groupedRelations {null | Object} Relations grouped by layer key
	 * @return {null | Object} Data sources keys grouped by layer key
	 */
	(groupedRelations) => {
		if (groupedRelations) {
			const groupedRelationsDataSource = {};
			for (const [key, value] of Object.entries(groupedRelations)) {
				groupedRelationsDataSource[key] = value.map(r => r ? r.spatialDataSourceKey : null);
			}
			return groupedRelationsDataSource;
		} else {
			return null;
		}
	}
);

/**
 * Collect and prepare data sources keys grouped by layer key
 *
 * @param state {Object}
 * @param layers {Array | null} Collection of layers data. Each object in collection contains filter property (it is used for selecting of relations) and data property (which contains data about layer from map state - e.g. key).
 */
const getDataSourceRelationsForLayerKey = createSelector(
	[
		getDataSourceRelationsGroupedByLayerKey,
		(state, layers) => layers, //FIXME -> create selector for layers
		(state, layerKey) => layerKey
	],

	/**
	 * @param groupedRelations {null | Object} Relations grouped by layer key
	 * @return {null | Object} Data sources keys grouped by layer key
	 */
	(groupedRelations, layerKey) => {
		if (groupedRelations) {
			return groupedRelations[layerKey] || null;
		} else {
			return null;
		}
	}
);

export default {
	getSubstate,
	getByKey,
	getByKeys,
	getAllData,
	getFilteredData,
	getFilteredDataSourceKeysGroupedByLayerKey,
	getFilteredDataGroupedByLayerTemplateKey,


	// Deprecated
	getDataSourceKeysFiltered,
	getDataSourceKeysGroupedByLayerKey,
	getDataSourceRelationsGroupedByLayerKey: getFilteredDataGroupedByLayerKey,
	getDataSourceRelationsByLayerTemplateKeys,
	getDataSourceRelationsForLayerKey,
	getFilteredDataGroupedByLayerKey
};