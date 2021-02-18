import ActionTypes from '../../../constants/ActionTypes';
import common from '../../_common/actions';
import {tileAsString} from '../helpers';
import _ from 'lodash';

const actionTypes = ActionTypes.DATA.ATTRIBUTE_DATA;

// ============ creators ===========
/**
 * It ensure adding index and adding or updating received data from BE.
 * Add data to state only when attributeData received, in case of empty attributeData it adds only index.
 * @param {Object} attributeData Object received from BE contains under attributeDataKey object of data attributes [id]: [value].
 * @param {Object} spatialData Object received from BE contains under spatialDataKey object of data attributes [id]: {data, spatialIndex}.
 * @param {Object} filter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Array?} order
 * @param {string?} changedOn
 */
const receiveIndexed = (
	attributeData,
	spatialData,
	filter,
	order,
	changedOn
) => {
	return dispatch => {
		if (!_.isEmpty(attributeData)) {
			dispatch(
				addDataAndIndex(filter, order, attributeData, spatialData, changedOn)
			);
		} else {
			// add to index
			dispatch(
				createAndAddIndex(filter, order, attributeData, spatialData, changedOn)
			);
		}
	};
};

/**
 * Add data and index at the same time
 *
 * @param spatialFilter {Object}
 * @param {Object} attributeData Object received from BE contains under attributeDataKey object of data attributes [id]: [value].
 * @param {Object} spatialData Object received from BE contains under spatialDataKey object of data attributes [id]: {data, spatialIndex}
 * @param order {Array}
 * @param changedOn {string}
 */
function addDataAndIndex(
	spatialFilter,
	order,
	attributeData,
	spatialData,
	changedOn
) {
	return dispatch => {
		const indexData = getIndexData(spatialData, attributeData);

		for (const attributeDataSourceKey of Object.keys(attributeData)) {
			dispatch(
				addDataAndIndexAction(
					attributeDataSourceKey,
					attributeData[attributeDataSourceKey],
					spatialFilter,
					order,
					[indexData],
					changedOn
				)
			);
		}
	};
}

/**
 * If given attributeDataKey is already in state update its data otherwise add data to state.
 * @param {Object} attributeData Object received from BE contains under attributeDataKey object of data attributes [id]: [value].
 */
function addOrUpdateData(attributeData) {
	return (dispatch, getState) => {
		const state = getState();
		for (const key of Object.keys(attributeData)) {
			if (_.isEmpty(state.data.attributeData.byDataSourceKey[key])) {
				dispatch(addDataAction(key, attributeData[key]));
			} else {
				dispatch(updateDataAction(key, attributeData[key]));
			}
		}
	};
}

/**
 * Create and add index for given attribute data based on related spatial data index.
 * @param {Object} filter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Array?} order
 * @param {Object} attributeData Object received from BE contains under attributeDataKey object of data attributes [id]: [value].
 * @param {Object} spatialData Object received from BE contains under spatialDataKey object of data attributes [id]: {data, spatialIndex}. SpatialData indexes are used as a templete for attribute data indexes.
 * @param {*} changedOn
 */
function createAndAddIndex(
	filter,
	order,
	attributeData,
	spatialData,
	changedOn
) {
	const indexByLevelByTileByDataSourceKey = getIndexData(
		spatialData,
		attributeData
	);
	return addIndexAction(
		filter,
		order,
		[indexByLevelByTileByDataSourceKey],
		changedOn
	);
}

/**
 * Create new index based on given level and tiles with loading indicator.
 * @param {Object} filter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Array?} order
 * @param {Number} level
 * @param {Array.[Array]} tiles
 */
function addLoadingIndex(filter, order, level, tiles) {
	const changedOn = null;

	//create index with tiles value "true" that indicates loading state
	const loadingTiles = _.reduce(
		tiles,
		(acc, tile) => {
			const tileId = tileAsString(tile);
			acc[tileId] = true;
			return acc;
		},
		{}
	);
	const index = {
		[level]: loadingTiles,
	};

	return addIndexAction(filter, order, [index], changedOn);
}

// ============ helpers ============

/**
 * Get data for indexing
 * @param {Object} spatialData
 * @param {Object} attributeData
 * @return {Object}
 */
function getIndexData(spatialData, attributeData) {
	const indexByLevelByTileByDataSourceKey = {};

	//Attribute data indexes are stored in related spatial index
	//for all spatial data keys in spatialData
	for (const [spatialDataSourceKey, datasource] of Object.entries(
		spatialData
	)) {
		//for all levels in spatial data source
		for (const [level, tiles] of Object.entries(datasource.spatialIndex)) {
			if (!indexByLevelByTileByDataSourceKey[level]) {
				indexByLevelByTileByDataSourceKey[level] = {};
			}
			//for all tiles in tiles
			for (const [tile, tileData] of Object.entries(tiles)) {
				// If empty attributeData, then rewrite "loading" state.
				// or
				// Prepare empty tile for new data if tile does not exists.
				if (
					!indexByLevelByTileByDataSourceKey[level][tile] ||
					_.isEmpty(attributeData)
				) {
					indexByLevelByTileByDataSourceKey[level][tile] = {};
				}

				if (!_.isEmpty(attributeData)) {
					//for all attribute data source keys in attributeData
					for (const [
						attributeDataSourceKey,
						attributeDataSource,
					] of Object.entries(attributeData)) {
						// Save only tileData that are incuded in attribute data keys

						const indexes = tileData.filter(e =>
							Object.keys(attributeDataSource).includes(e.toString())
						);

						//Add to existing index
						if (
							indexByLevelByTileByDataSourceKey?.[level]?.[tile]?.[
								attributeDataSourceKey
							]
						) {
							indexByLevelByTileByDataSourceKey[level][tile][
								attributeDataSourceKey
							] = [
								...indexByLevelByTileByDataSourceKey[level][tile][
									attributeDataSourceKey
								],
								...indexes,
							];
						} else {
							//Create new tile and insert dsKey index data
							indexByLevelByTileByDataSourceKey[level][tile][
								attributeDataSourceKey
							] = indexes;
						}
					}
				}
			}
		}
	}

	return indexByLevelByTileByDataSourceKey;
}

// ============ actions ============
function addDataAction(key, data) {
	return {
		type: actionTypes.ADD,
		key,
		data,
	};
}

function removeIndexAction(filter, order) {
	return {
		type: actionTypes.INDEX.REMOVE,
		filter,
		order,
	};
}

function updateDataAction(key, data) {
	return {
		type: actionTypes.UPDATE,
		key,
		data,
	};
}

function addDataAndIndexAction(
	attributeDataSourceKey,
	data,
	spatialFilter,
	order,
	indexData,
	changedOn
) {
	return {
		type: actionTypes.ADD_WITH_INDEX,
		attributeDataSourceKey,
		data,
		spatialFilter,
		order,
		indexData,
		changedOn,
	};
}

function addIndexAction(filter, order, index, changedOn) {
	return {
		type: actionTypes.INDEX.ADD,
		spatialFilter: filter,
		order,
		indexData: index,
		changedOn,
	};
}

function actionUpdateStore(data) {
	return {
		type: actionTypes.UPDATE_STORE,
		data,
	};
}

// ============ export ===========

export default {
	addLoadingIndex,
	removeIndex: removeIndexAction,
	receiveIndexed,
	updateStore: actionUpdateStore,
};
