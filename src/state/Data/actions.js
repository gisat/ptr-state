import _ from 'lodash';
import {configDefaults} from '@gisatcz/ptr-core';
import attributeRelations from './AttributeRelations/actions';
import attributeDataSources from './AttributeDataSources/actions';
import attributeData from './AttributeData/actions';
import components from './Components/actions';
import spatialRelations from './SpatialRelations/actions';
import spatialDataSources from './SpatialDataSources/actions';
import spatialData from './SpatialData/actions';
import request from '../_common/request';
import commonActions from '../_common/actions';

import Select from '../Select';
import {getMissingTiles, tileAsArray, getPageSize} from './helpers';
import {TILED_VECTOR_LAYER_TYPES} from './constants';

const DEFAULT_RELATIONS_PAGE = {
	offset: 0,
	limit: configDefaults.requestPageSize,
};

/**
 * Calculates how many page of relations is missing.
 * It assume that one page of size PAGE_SIZE was loaded.
 * @param {Number} attributeRelationsCount Wanted attributeRelations items
 * @param {Number} spatialRelationsCount Wanted spatialRelations items
 * @param {Number} PAGE_SIZE How many items fit to one page
 * @returns Number How many pages remaining
 */
const getRestRelationsPages = (
	attributeRelationsCount,
	spatialRelationsCount,
	PAGE_SIZE
) => {
	// What is higer to load? attributeRelations or spatialRelations
	const maxCountValue = Math.max(
		attributeRelationsCount,
		spatialRelationsCount
	);
	if (maxCountValue === 0) {
		return 0;
	} else {
		const remainingPageCount = Math.ceil(
			(maxCountValue - PAGE_SIZE) / PAGE_SIZE
		);
		return remainingPageCount;
	}
};

/**
 * Helper function. Usually second step in requesting data.
 * Calculate if relations requests are missing based on attributeRelationsCount and spatialRelationsCount.
 * Each relations request loads one next tile from spatialFilter.
 * Rest tiles are loaded without relatiions.
 * @param {bool} loadGeometry Whether response should contain geometry
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @param {string?} styleKey UUID
 * @param {Array?} order
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Object} attributeRelationsFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Number} attributeRelationsCount Count of known attribute relations. Used for determinate further requests.
 * @param {Number} spatialRelationsCount Count of known spatial relations. Used for determinate further requests.
 * @param {Array} preloadedSpatialDataSources SpatialDataSources loaded by previous request.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @return {function} Return promise.
 */
function loadMissingRelationsAndData(
	loadGeometry,
	spatialFilter,
	styleKey,
	order,
	spatialRelationsFilter,
	attributeRelationsFilter,
	attributeRelationsCount,
	spatialRelationsCount,
	preloadedSpatialDataSources = [],
	attributeDataFilter
) {
	return (dispatch, getState) => {
		const localConfig = Select.app.getCompleteLocalConfiguration(getState());
		const PAGE_SIZE = getPageSize(localConfig);

		const promises = [];

		// load remaining relations pages
		const remainingRelationsPageCount = getRestRelationsPages(
			attributeRelationsCount,
			spatialRelationsCount,
			PAGE_SIZE
		);
		let tilesPagination = 0;
		const loadRelations = true;
		for (let i = 1; i <= remainingRelationsPageCount; i++) {
			const relations = {
				offset: i * PAGE_SIZE,
				limit: PAGE_SIZE,
			};

			tilesPagination = i;
			const spatialIndex = {
				tiles: [spatialFilter.tiles[tilesPagination]],
			};
			promises.push(
				dispatch(
					loadIndexedPage(
						styleKey,
						relations,
						spatialIndex,
						spatialFilter,
						loadGeometry,
						loadRelations,
						order,
						spatialRelationsFilter,
						attributeRelationsFilter,
						attributeDataFilter
					)
				)
			);
		}

		//
		//load rest of tiles
		//
		const remainingTilesPageCount = spatialFilter?.tiles?.length || 0;

		//first tile was loaded before loadMissingRelationsAndData first request
		for (let i = tilesPagination + 1; i < remainingTilesPageCount; i++) {
			const spatialIndex = {
				tiles: [spatialFilter.tiles[i]],
			};

			const relations = {};
			const loadRestTilesRelations = false;
			promises.push(
				dispatch(
					loadIndexedPage(
						styleKey,
						relations,
						spatialIndex,
						spatialFilter,
						loadGeometry,
						loadRestTilesRelations,
						order,
						spatialRelationsFilter,
						attributeRelationsFilter,
						attributeDataFilter
					)
				)
			);
		}
		if (promises.length > 0) {
			return Promise.all(promises).then((response = []) => {
				// All relations are loaded at this moment.
				// Check if all spatialDataSources relations from response and preloadedSpatialDataSources are type of "unsupported" like raster/wms/wmts.
				// If all spatialDataSources are unsupported, then received data are empty and indexes needs to be removed.
				// If only some of spatialDataSources relations are unsupported, then loading status on index will be replaced by data.
				const spatialDataSourcesTypes = _.flattenDeep(
					response.map(r =>
						r?.data?.spatialDataSources?.map(sds => ({
							type: sds.data.type,
							key: sds.key,
						}))
					)
				);
				const spatialDataSourcesPairs = [
					...spatialDataSourcesTypes,
					...preloadedSpatialDataSources,
				];
				const allSourcesAreUnsupported = spatialDataSourcesPairs.every(
					ds => !TILED_VECTOR_LAYER_TYPES.includes(ds.type)
				);

				// Check if all of returned spatialDataSources are unsupported type.
				// Indexes for unsupported layers can be cleared.
				if (allSourcesAreUnsupported) {
					// AttributeData and spatialData index represented by spatialRelationsFilter, attributeRelationsFilter and order can be deleted
					dispatch(spatialData.removeIndex(spatialRelationsFilter, order));
					dispatch(attributeData.removeIndex(attributeDataFilter, order));
				}
			});
		} else {
			return Promise.resolve();
		}
	};
}

/**
 * Ensure load missing attribute data for tiles defined in spatialFilter that are not loaded or loading in state.
 *
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @param {string?} styleKey UUID
 * @param {Array?} order
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Object} attributeRelationsFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @return {function}
 */
function loadMissingAttributeData(
	spatialFilter,
	styleKey,
	order,
	spatialRelationsFilter,
	attributeRelationsFilter,
	attributeDataFilter
) {
	return (dispatch, getState) => {
		const state = getState();
		const localConfig = Select.app.getCompleteLocalConfiguration(state);
		const PAGE_SIZE = getPageSize(localConfig);

		const relations = {
			// start: 0,
			// length: 1000,
			offset: 0,
			limit: PAGE_SIZE,
		};

		//
		// which attribute data to load
		//

		//get attribute data index with loaded and loading data
		const attributeDataIndex =
			Select.data.attributeData.getIndex(
				state,
				'spatialIndexes',
				attributeDataFilter,
				order
			) || [];

		//diff loaded attribute data from index with wanted spatial data
		const missingAttributeDataTiles =
			getMissingTiles(attributeDataIndex, spatialFilter) || [];
		const missingAttributeDataTilesAsArrays = missingAttributeDataTiles.map(
			tileAsArray
		);

		// Load relations and data sources in first request if they are not already loaded.
		const attributeRelations = Select.data.attributeRelations.getIndex(
			state,
			attributeRelationsFilter,
			order
		);
		const attributeDataSources = Select.data.attributeDataSources.getIndex(
			state,
			attributeRelationsFilter,
			order
		);
		let loadRelationsAndDS = !(
			!_.isEmpty(attributeRelations) && !_.isEmpty(attributeDataSources)
		);

		//load only attribute data
		const loadGeometry = false;

		// Modified spatial filter with only missing attribute data tiles
		const spatialFilterWithMissingTiles = {
			...spatialFilter,
			tiles: missingAttributeDataTilesAsArrays,
		};
		// Relations for given filters are missing
		if (loadRelationsAndDS) {
			const spatialIndex = null;
			const loadRelations = true;
			// Load relations
			return dispatch(
				loadIndexedPage(
					styleKey,
					relations,
					spatialIndex,
					spatialFilterWithMissingTiles,
					loadGeometry,
					loadRelations,
					order,
					spatialRelationsFilter,
					attributeRelationsFilter,
					attributeDataFilter
				)
			).then(response => {
				if (response instanceof Error) {
					return;
					throw response;
				}

				const spatialDataSources = response?.data?.spatialDataSources || [];
				const preloadSpatialDataSources = spatialDataSources.map(sds => ({
					type: sds.data.type,
					key: sds.key,
				}));

				const attributeRelationsCount = response.total.attributeRelations;
				const spatialRelationsCount = response.total.spatialRelations;
				return dispatch(
					loadMissingRelationsAndData(
						loadGeometry,
						spatialFilterWithMissingTiles,
						styleKey,
						order,
						spatialRelationsFilter,
						attributeRelationsFilter,
						attributeRelationsCount,
						spatialRelationsCount,
						preloadSpatialDataSources,
						attributeDataFilter
					)
				);
			});
		} else {
			const promises = [];
			const loadRelations = false;
			for (const tile of missingAttributeDataTiles) {
				const spatialIndex = {
					tiles: [tile],
				};

				promises.push(
					dispatch(
						loadIndexedPage(
							styleKey,
							relations,
							spatialIndex,
							spatialFilter,
							loadGeometry,
							loadRelations,
							order,
							spatialRelationsFilter,
							attributeRelationsFilter
						)
					)
				);
			}
			return Promise.all(promises);
		}
	};
}

/**
 * Ensure load missing spatial data for tiles defined in spatialFilter that are not loaded or loading in state.
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @param {string?} styleKey UUID
 * @param {Array?} order
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Object} attributeRelationsFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @return {function}
 */
function loadMissingSpatialData(
	spatialFilter,
	styleKey,
	order,
	spatialRelationsFilter,
	attributeRelationsFilter,
	attributeDataFilter
) {
	return (dispatch, getState) => {
		//
		//which spatial data to load
		//

		//get spatial data index with loaded and loading data
		const spatialDataIndex =
			Select.data.spatialData.getIndex(
				getState(),
				spatialRelationsFilter,
				order
			) || [];

		//diff spatial data loaded/loading and to load
		const missingSpatialDataTiles =
			getMissingTiles(spatialDataIndex, spatialFilter) || [];
		const promises = [];
		for (const tile of missingSpatialDataTiles) {
			const spatialIndex = {
				tiles: [tile],
			};

			const relations = {};
			const loadGeometry = true;
			const loadRelations = false;
			promises.push(
				dispatch(
					loadIndexedPage(
						styleKey,
						relations,
						spatialIndex,
						spatialFilter,
						loadGeometry,
						loadRelations,
						order,
						spatialRelationsFilter,
						attributeRelationsFilter,
						attributeDataFilter
					)
				)
			);
		}
		return Promise.all(promises);
	};
}

/**
 * Ensure load spatial data, attribute data and relations for tiles defined in spatialFilter.
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @param {string?} styleKey UUID
 * @param {Array?} order
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Object} attributeRelationsFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @return {function}
 */
function ensureDataAndRelations(
	spatialFilter,
	styleKey,
	order,
	spatialRelationsFilter,
	attributeRelationsFilter,
	attributeDataFilter
) {
	return (dispatch, getState) => {
		const localConfig = Select.app.getCompleteLocalConfiguration(getState());
		const PAGE_SIZE = getPageSize(localConfig);

		const relations = {
			// start: 0,
			// length: 1000,
			offset: 0,
			limit: PAGE_SIZE,
		};

		const loadGeometry = true;
		const loadRelations = true;
		const spatialIndex = null;
		if (spatialFilter && !_.isEmpty(spatialFilter)) {
			return dispatch(
				loadIndexedPage(
					styleKey,
					relations,
					spatialIndex,
					spatialFilter,
					loadGeometry,
					loadRelations,
					order,
					spatialRelationsFilter,
					attributeRelationsFilter,
					attributeDataFilter
				)
			)
				.then(response => {
					if (response instanceof Error) {
						return;
						throw response;
					}

					//FIXME

					const attributeRelationsCount = response.total.attributeRelations;
					const spatialRelationsCount = response.total.spatialRelations;

					const restRelationsPages = getRestRelationsPages(
						attributeRelationsCount,
						spatialRelationsCount,
						PAGE_SIZE
					);

					const spatialDataSources = response?.data?.spatialDataSources || [];

					const allSourcesAreUnsupported = spatialDataSources.every(
						ds => !TILED_VECTOR_LAYER_TYPES.includes(ds.data?.type)
					);

					// Check if all of returned spatialDataSources are unsupported type.
					// If so, is no reason to make further requests.
					// Indexes for unsupported layers can be cleared.
					if (restRelationsPages === 0 && allSourcesAreUnsupported) {
						// AttributeData and spatialData index represented by spatialRelationsFilter, attributeRelationsFilter and order can be deleted
						dispatch(spatialData.removeIndex(spatialRelationsFilter, order));
						dispatch(attributeData.removeIndex(attributeDataFilter, order));
						return;
					} else {
						const preloadSpatialDataSources = spatialDataSources.map(sds => ({
							type: sds.data.type,
							key: sds.key,
						}));
						return dispatch(
							loadMissingRelationsAndData(
								loadGeometry,
								spatialFilter,
								styleKey,
								order,
								spatialRelationsFilter,
								attributeRelationsFilter,
								attributeRelationsCount,
								spatialRelationsCount,
								preloadSpatialDataSources,
								attributeDataFilter
							)
						);
					}
				})
				.catch(err => {
					if (err?.message === 'Index outdated') {
						dispatch(
							refreshIndex(
								getSubstate,
								dataType,
								filter,
								order,
								actionTypes,
								categoryPath
							)
						);
					} else {
						throw new Error(`data/actions#ensure: ${err}`);
					}
				});
		} else {
			return dispatch(
				commonActions.actionGeneralError(new Error('Missing spatial filter'))
			);
		}
	};
}

/**
 * Find out all tiles from spatialFilter without loaded attribute data
 * @param {Object} attributeDataIndex
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 */
const hasMissingAttributesData = (attributeDataIndex, spatialFilter) => {
	const missingAttributeDataTiles =
		getMissingTiles(attributeDataIndex, spatialFilter) || spatialFilter.tiles;
	return missingAttributeDataTiles &&
		missingAttributeDataTiles.length &&
		missingAttributeDataTiles.length > 0
		? true
		: false;
};

/**
 * Find out all tiles from spatialFilter without loaded attribute data
 * @param {Object} spatialDataIndex
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 */
const hasMissingSpatialData = (spatialDataIndex, spatialFilter) => {
	const missingSpatialDataTiles =
		getMissingTiles(spatialDataIndex, spatialFilter) || spatialFilter.tiles;
	return missingSpatialDataTiles &&
		missingSpatialDataTiles.length &&
		missingSpatialDataTiles.length > 0
		? true
		: false;
};

/**
 * It find out if for given ltKey/atlKey and spatialRelationsFilter exists relations index.
 * The Existence of index means it is loading or loaded.
 * TODO - add support of areaTrees
 * @param {Object} state App state object
 * @param {string?} areaTreeLevelKey Optional area tree key
 * @param {string?} layerTemplateKey Optional layer template key
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Array} order
 * @return {bool}
 */
const hasSpatialOrAreaRelations = (
	state,
	areaTreeLevelKey,
	layerTemplateKey,
	spatialRelationsFilter,
	order
) => {
	let spatialRelationsIndex = null;
	let areaRelationsIndex = null;

	if (layerTemplateKey) {
		spatialRelationsIndex = Select.data.spatialRelations.getIndex(
			state,
			spatialRelationsFilter,
			order
		);
	}

	// FIXME - add support for areaTreeLevels
	if (areaTreeLevelKey) {
		// areaRelationsIndex = Select.data.areaRelations.getIndex(getState(), spatialRelationsFilter, order);
	}

	return spatialRelationsIndex !== null || areaRelationsIndex !== null;
};

/**
 * Entry function for requesting of loading new data. In first step are identified loaded indexes based on filters.
 * Next phase is request only data that are missing.
 * @param styleKey {string}
 * @param commonRelationsFilter {Object} Filter object with modifiers, layerTemplateKey or areaTreeLevelKey. It defines spatialRealations and after add styleKey is used as a attributeRelations filter.
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @param attributeDataFilterExtension {Object} Filter object with optional values for attributeFilter, dataSourceKeys and featureKeys. After merge with attributeRelationsFilter it defines filter for attributeData
 * @return {function}
 */
function ensure(
	styleKey,
	commonRelationsFilter,
	spatialFilter,
	attributeDataFilterExtension
) {
	return (dispatch, getState) => {
		// Filter params - see Panther docs: Code/API/Data endpoint
		const {areaTreeLevelKey, layerTemplateKey} = commonRelationsFilter;
		const spatialRelationsFilter = commonRelationsFilter;
		const attributeRelationsFilter = {...commonRelationsFilter, styleKey};
		const attributeDataFilter = {
			...attributeRelationsFilter,
			...attributeDataFilterExtension,
		};

		// Order for spatialData if null at the moment
		const order = null;

		const spatialDataIndex =
			Select.data.spatialData.getIndex(
				getState(),
				spatialRelationsFilter,
				order
			) || [];
		const attributeDataIndex =
			Select.data.attributeData.getIndex(
				getState(),
				'spatialIndexes',
				attributeDataFilter,
				order
			) || [];
		const missingAttributesData = hasMissingAttributesData(
			attributeDataIndex,
			spatialFilter
		);
		const missingSpatialData = hasMissingSpatialData(
			spatialDataIndex,
			spatialFilter
		);
		const filterHasSpatialOrAreaRelations = hasSpatialOrAreaRelations(
			getState(),
			areaTreeLevelKey,
			layerTemplateKey,
			spatialRelationsFilter,
			order
		);

		//
		// Skip over load request on already loaded/loading data
		//
		if (!filterHasSpatialOrAreaRelations && missingSpatialData) {
			return dispatch(
				ensureDataAndRelations(
					spatialFilter,
					styleKey,
					order,
					spatialRelationsFilter,
					attributeRelationsFilter,
					attributeDataFilter
				)
			);
		}

		if (missingSpatialData) {
			return dispatch(
				loadMissingSpatialData(
					spatialFilter,
					styleKey,
					order,
					spatialRelationsFilter,
					attributeRelationsFilter,
					attributeDataFilter
				)
			);
		}

		if (missingAttributesData) {
			return dispatch(
				loadMissingAttributeData(
					spatialFilter,
					styleKey,
					order,
					spatialRelationsFilter,
					attributeRelationsFilter,
					attributeDataFilter
				)
			);
		}
	};
}

/**
 * Save result data to related stores.
 * If data are presented, then save them to attributeRelations, attributeDataSources, attributeData, spatialRelations, spatialDataSources, spatialData.
 * @param {Object} result result data from backend data endpoind
 * @param {bool} loadGeometry Whether response should contain geometry
 * @param {bool} loadRelations Whether response should contain relations
 * @param {Array?} order
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Object} attributeRelationsFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Object} start
 */
function processResult(
	result,
	loadGeometry,
	loadRelations,
	order,
	spatialRelationsFilter,
	attributeRelationsFilter,
	attributeDataFilter,
	start
) {
	return (dispatch, getState) => {
		////
		// Attributes
		////
		if (
			!!loadRelations &&
			result.data.attributeRelations &&
			!_.isEmpty(result.data.attributeRelations)
		) {
			const changes = null;
			dispatch(
				attributeRelations.receiveIndexed(
					result.data.attributeRelations,
					attributeRelationsFilter,
					order,
					start,
					result.total.attributeRelations,
					changes
				)
			);
		}

		if (
			!!loadRelations &&
			result.data.attributeDataSources &&
			!_.isEmpty(result.data.attributeDataSources)
		) {
			const changes = null;
			dispatch(
				attributeDataSources.receiveIndexed(
					result.data.attributeDataSources,
					attributeRelationsFilter,
					order,
					start,
					result.total.attributeRelations,
					changes
				)
			);
		}

		if (result.data.spatialData && result.data.attributeData) {
			const changes = null;
			dispatch(
				attributeData.receiveIndexed(
					result.data.attributeData,
					result.data.spatialData,
					attributeDataFilter,
					order,
					changes
				)
			);
		}

		////
		// Spatial data
		////
		if (
			!!loadRelations &&
			result.data.spatialRelations &&
			!_.isEmpty(result.data.spatialRelations)
		) {
			const changes = null;
			dispatch(
				spatialRelations.receiveIndexed(
					result.data.spatialRelations,
					spatialRelationsFilter,
					order,
					start,
					result.total.spatialRelations,
					changes
				)
			);
		}

		if (
			!!loadRelations &&
			result.data.spatialDataSources &&
			!_.isEmpty(result.data.spatialDataSources)
		) {
			const changes = null;
			dispatch(
				spatialDataSources.receiveIndexed(
					result.data.spatialDataSources,
					spatialRelationsFilter,
					order,
					start,
					result.total.spatialRelations,
					changes
				)
			);
		}

		if (!!loadGeometry) {
			// Add data even if data are empty.
			// Override loading indicator in state index
			const changes = null;
			dispatch(
				spatialData.receiveIndexed(
					result.data.spatialData,
					spatialRelationsFilter,
					order,
					changes
				)
			);
		}
	};
}

/**
 * Create request payload for data endpoint
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {string?} styleKey
 * @param {Object?} relations Pagination for relations.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Object?} spatialIndex Object where under "tiles" key is array of tiles that should be loaded. Tiles are subset of tiles defined inspatilaFilter.
 * @param {bool} loadGeometry Whether response should contain geometry
 * @param {bool} loadRelations Whether response should contain relations
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @returns
 */
function composeDataEndpointPayload(
	spatialRelationsFilter,
	styleKey,
	relations,
	attributeDataFilter,
	spatialIndex,
	loadGeometry,
	loadRelations,
	spatialFilter
) {
	const {areaTreeLevelKey, layerTemplateKey, modifiers} =
		spatialRelationsFilter || {};

	// Create payload
	const payload = {
		...(modifiers && {modifiers}),

		// which layer you want
		...(layerTemplateKey && {layerTemplateKey}),
		...(areaTreeLevelKey && {areaTreeLevelKey}),

		// get attributes from style
		...(styleKey && {styleKey}),

		// pagination for relations (& data sources)
		relations,

		data: {
			// list of features you want
			...(attributeDataFilter?.featureKeys && {
				featureKeys: attributeDataFilter.featureKeys,
			}),

			// which tiles you want (pseudo-pagination)
			// spatialIndex: {
			//     tiles: [[lon, lat], ...],
			// },
			...(spatialIndex && {spatialIndex}),

			// extent
			spatialFilter,

			// filter features by attribute value
			// attributeFilter: {
			//     'attribute-uuid': "blue",
			//     'attribute-uuid': {
			//         in: [12, 13]
			//     },
			//     ...
			// },
			...(attributeDataFilter?.attributeFilter && {
				attributeFilter: attributeDataFilter.attributeFilter,
			}),

			//request for geometry
			geometry: !!loadGeometry,

			//request for relations
			relations: !!loadRelations,

			// use data source keys as filter or add them to filter
			...(attributeDataFilter?.dataSourceKeys && {
				dataSourceKeys: attributeDataFilter.dataSourceKeys,
			}),
		},
	};
	return payload;
}

/**
 * Set loading status to spatialData and attributeData stores to related indexes, level and tiles.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Object?} spatialIndex Object where under "tiles" key is array of tiles that should be loaded. Tiles are subset of tiles defined inspatilaFilter.
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Array?} order
 * @param {bool} loadGeometry Whether response should contain geometry
 */
function setLoading(
	attributeDataFilter,
	spatialIndex,
	spatialFilter,
	spatialRelationsFilter,
	order,
	loadGeometry
) {
	return (dispatch, getState) => {
		const loadingTilesGeometry =
			spatialIndex?.tiles || spatialFilter?.tiles || [];

		////
		// Spatial
		////
		if (loadGeometry && loadingTilesGeometry.length > 0) {
			dispatch(
				spatialData.addLoadingIndex(
					spatialRelationsFilter,
					order,
					spatialFilter.level,
					loadingTilesGeometry
				)
			);
		}

		////
		// Attribute
		////
		if (loadingTilesGeometry.length > 0) {
			dispatch(
				attributeData.addLoadingSpatialIndex(
					attributeDataFilter,
					order,
					spatialFilter.level,
					loadingTilesGeometry
				)
			);
		}
	};
}

/**
 * Central method for executing requests to data endpoint.
 * @param {string?} styleKey
 * @param {Object?} relations Pagination for relations.
 * @param {Object?} spatialIndex Object where under "tiles" key is array of tiles that should be loaded. Tiles are subset of tiles defined inspatilaFilter.
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @param {bool} loadGeometry Whether response should contain geometry
 * @param {bool} loadRelations Whether response should contain relations
 * @param {Array?} order
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Object} attributeRelationsFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 */
function loadIndexedPage(
	styleKey,
	relations,
	spatialIndex,
	spatialFilter,
	loadGeometry,
	loadRelations,
	order,
	spatialRelationsFilter = {},
	attributeRelationsFilter,
	attributeDataFilter
) {
	return (dispatch, getState) => {
		const localConfig = Select.app.getCompleteLocalConfiguration(getState());
		const apiPath = 'rest/data/filtered';

		//Register loading to related indexes and tiles
		dispatch(
			setLoading(
				attributeDataFilter,
				spatialIndex,
				spatialFilter,
				spatialRelationsFilter,
				order,
				loadGeometry
			)
		);

		const usedRelations = relations ? {...relations} : DEFAULT_RELATIONS_PAGE;

		const payload = composeDataEndpointPayload(
			spatialRelationsFilter,
			styleKey,
			usedRelations,
			attributeDataFilter,
			spatialIndex,
			loadGeometry,
			loadRelations,
			spatialFilter
		);

		const start = usedRelations.offset + 1;

		return request(localConfig, apiPath, 'POST', null, payload)
			.then(result => {
				if (result.errors) {
					const error = new Error(result.errors[dataType] || 'no data');
					dispatch(commonActions.actionGeneralError(error));
				} else {
					if (result.data) {
						dispatch(
							processResult(
								result,
								loadGeometry,
								loadRelations,
								order,
								spatialRelationsFilter,
								attributeRelationsFilter,
								attributeDataFilter,
								start
							)
						);
						return result;
					} else {
						const error = new Error('no data');
						dispatch(commonActions.actionGeneralError(error));
						return error;
					}
				}
			})
			.catch(error => {
				dispatch(commonActions.actionGeneralError(error));
				return error; //todo do we need to return this
			});
	};
}

export default {
	//export of sub actions
	attributeData,
	attributeDataSources,
	attributeRelations,
	components,
	spatialData,
	spatialDataSources,
	spatialRelations,

	//export functions
	getRestRelationsPages, //tested
	loadMissingRelationsAndData,
	loadMissingAttributeData,
	loadMissingSpatialData,
	ensureDataAndRelations,
	hasMissingAttributesData,
	hasMissingSpatialData,
	hasSpatialOrAreaRelations,
	ensure,
	loadIndexedPage, //tested
	processResult, //tested
	composeDataEndpointPayload,
	setLoading, //tested
};
