import ActionTypes from '../../../constants/ActionTypes';
import Select from '../../Select';
import commonHelpers from '../../_common/helpers';
import commonSelectors from '../../_common/selectors';
import request from '../../_common/request';
import commonActions from '../../_common/actions';
import attributeRelations from '../AttributeRelations/actions';
import attributeData from '../AttributeData/actions';

const DEFAULT_PAGE_PAGINATION = {
	offset: 0,
	limit: 100,
};

/**
 * Central method for getting PAGE_SIZE from state or configDefaults.
 * @param {Object} state App state
 * @return {Number}
 */
const getPageSize = (state, optPageSize) => {
	if (_.isNumber(optPageSize)) {
		return optPageSize;
	} else {
		const localConfig = Select.app.getCompleteLocalConfiguration(state);
		const PAGE_SIZE =
			localConfig.requestPageSize || configDefaults.requestPageSize;
		return PAGE_SIZE;
	}
};

// TODO - tests, move to helper
const getRestPages = (count, PAGE_SIZE, optStart = 0, optLength) => {
	if (count === 0 || optStart > count) {
		return [];
	} else {
		let wanted = count - optStart;

		// Request specific number of results
		if (_.isNumber(optLength)) {
			if (optStart + optLength > count) {
				wanted = count - optStart;
			} else {
				wanted = optLength;
			}
		}

		const startIndex = optStart;
		const endIndex = optStart + wanted;

		const lastPageIndex = Math.ceil((endIndex - startIndex) / PAGE_SIZE);
		const pages = [...Array(lastPageIndex)].map((_, i) => {
			return i;
		});

		return pages;
	}
};

const getPagination = (pageIndex, start, pageSize) => {
	start = _.isNumber(start) ? start : 0;
	return {
		offset: start + pageIndex * pageSize,
		limit: pageSize,
	};
};

const getNullishPagination = () => getPagination(0, 0, 0);

const getLoadedPages = (
	dataIndex = {},
	start = 0,
	pageSize,
	pages = [],
	count
) => {
	const loadedPages = [];
	pages.forEach(pageIndex => {
		let itemsOnPage = 0;

		if (start + pageSize * (pageIndex + 1) > count) {
			itemsOnPage = count - (start + pageSize * (pageIndex + 1) - pageSize);
		} else {
			itemsOnPage = pageSize;
		}

		const requestedDataIndexes = [...Array(itemsOnPage)].map((_, i) => {
			return start + pageSize * pageIndex + i;
		});
		const hasPage = requestedDataIndexes.every(index =>
			dataIndex.hasOwnProperty(index)
		);
		if (hasPage) {
			loadedPages.push(pageIndex);
		}
	});
	return loadedPages;
};

const getMissingPages = (dataIndex, pageSize, start, length) => {
	const count = dataIndex.count;
	const restPages = getRestPages(count, pageSize, start, length);

	const loadedAttributePages = getLoadedPages(
		dataIndex?.index,
		start,
		pageSize,
		restPages,
		count
	);
	const missingAttributesPages = _.difference(restPages, loadedAttributePages);

	return missingAttributesPages;
};

/**
 * Update whole data.components.components object with given components
 * @param components {Object}
 */
function updateComponentsStateFromView(components) {
	return dispatch => {
		if (components) {
			dispatch(actionUpdateComponents(components));
		}
	};
}

function updateComponent(componentKey, update) {
	return (dispatch, getState) => {
		const state = getState();
		const componentState = Select.data.components.getComponentStateByKey(
			state,
			componentKey
		);

		dispatch(
			actionUpdateComponents({[componentKey]: {...componentState, ...update}})
		);
	};
}

/**
 * Ensure load attribute data and relations.
 * @param {Array?} order
 * @param {Object} mergedAttributeFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @return {function}
 */
function ensureDataAndRelations(
	order,
	mergedAttributeFilter,
	start,
	length,
	PAGE_SIZE,
	loadRelations,
	loadData,
	componentKey,
	attributePagination,
	relationsPagination
) {
	return (dispatch, getState) => {
		const state = getState();
		const RELATIONS_PAGE_SIZE = getPageSize(state);

		return dispatch(
			loadIndexedPage(
				order,
				mergedAttributeFilter,
				!!loadRelations,
				loadData,
				relationsPagination,
				attributePagination
			)
		).then(response => {
			if (response instanceof Error) {
				return;
				throw response;
			}

			const attributeDataIndex =
				Select.data.components.getIndexForAttributeDataByComponentKey(
					getState(),
					componentKey
				) || [];

			const attributeRelationsIndex =
				Select.data.attributeRelations.getIndex(
					getState(),
					mergedAttributeFilter
				) || [];

			const missingAttributesPages = getMissingPages(
				attributeDataIndex,
				PAGE_SIZE,
				start,
				length
			);
			const missingRelationsPages = getMissingPages(
				attributeRelationsIndex,
				RELATIONS_PAGE_SIZE,
				0,
				null
			);

			if (missingRelationsPages === 0 && missingAttributesPages.length === 0) {
				//nothing to load
				return;
			} else {
				//needs to load more relations or data
				return dispatch(
					loadMissingRelationsAndData(
						order,
						mergedAttributeFilter,
						missingRelationsPages,
						missingAttributesPages,
						start,
						PAGE_SIZE
					)
				);
			}
		});
	};
}

/**
 * Helper function. Usually second step in requesting data.
 * Load all relations and attributeData based on its remaining page counts.
 * @param {Array?} order
 * @param {Object} mergedAttributeFilter Filler object contains modifiers.
 * @param {Number} remainingRelationsPageCount
 * @param {Number} remainingAttributeDataPageCount
 * @return {function} Return promise.
 */
function loadMissingRelationsAndData(
	order,
	mergedAttributeFilter,
	remainingRelationsPages,
	remainingAttributeDataPages, // [0,1,2,3] || [2,5]
	start,
	PAGE_SIZE
) {
	return (dispatch, getState) => {
		const state = getState();
		const RELATIONS_PAGE_SIZE = getPageSize(state);

		const promises = [];

		// load remaining relations pages
		let pagination = 0;
		const loadRelations = true;

		for (let i = 1; i <= remainingRelationsPages.length; i++) {
			const relationsPagination = getPagination(
				remainingRelationsPages[i - 1],
				0,
				RELATIONS_PAGE_SIZE
			);

			//only if missing attribute data pages missing
			let attributePagination = getNullishPagination();
			let loadData = false;
			if (pagination < remainingAttributeDataPages.length) {
				attributePagination = getPagination(
					remainingAttributeDataPages[i - 1],
					start,
					PAGE_SIZE
				);
				loadData = true;
				pagination = i;
			}

			promises.push(
				dispatch(
					loadIndexedPage(
						order,
						mergedAttributeFilter,
						loadRelations,
						loadData,
						relationsPagination, //pagination for relations
						attributePagination //pagination for data is same like for relations here
					)
				)
			);
		}

		// If its still needed, load remaining data pages
		for (let i = pagination + 1; i <= remainingAttributeDataPages.length; i++) {
			const relationsPagination = getNullishPagination();
			const attributePagination = getPagination(
				remainingAttributeDataPages[i - 1],
				start,
				PAGE_SIZE
			);
			const loadRelations = false;
			const loadData = true;
			promises.push(
				dispatch(
					loadIndexedPage(
						order,
						mergedAttributeFilter,
						loadRelations,
						loadData,
						relationsPagination,
						attributePagination
					)
				)
			);
		}

		return Promise.all(promises);
	};
}

/**
 * Check if for given componentKey missing data and load missing
 * @param {String} componentKey
 */
const ensure = componentKey => {
	return (dispatch, getState) => {
		const state = getState();
		const componentState = Select.data.components.getComponentStateByKey(
			state,
			componentKey
		);
		const {attributeOrder, start, length, pageSize} = componentState;

		const mergedAttributeFilter = Select.data.components.getAttributeFilterByComponentKey(
			state,
			componentKey
		);
		const attributeDataIndex =
			Select.data.components.getIndexForAttributeDataByComponentKey(
				state,
				componentKey
			) || [];

		const attributeRelationsIndex =
			Select.data.attributeRelations.getIndex(state, mergedAttributeFilter) ||
			[];

		let loadRelations = true;
		let loadData = true;

		const RELATIONS_PAGE_SIZE = getPageSize(state);
		const PAGE_SIZE = getPageSize(state, pageSize);
		let relationsPagination = getPagination(0, 0, RELATIONS_PAGE_SIZE);
		let attributePagination = getPagination(0, start, PAGE_SIZE);

		let missingRelationsPages, missingAttributesPages;

		// Relations index exist
		// find if all required relations are loaded
		if (!_.isEmpty(attributeRelationsIndex)) {
			missingRelationsPages = getMissingPages(
				attributeRelationsIndex,
				RELATIONS_PAGE_SIZE,
				0,
				null
			);
			relationsPagination = getPagination(
				missingRelationsPages[0] || 0,
				0,
				RELATIONS_PAGE_SIZE
			);
			if (missingRelationsPages.length > 0) {
				loadRelations = true;
			} else {
				loadRelations = false;
			}
		}

		// Attribute data index exist
		// find if all required data are loaded
		if (!_.isEmpty(attributeDataIndex)) {
			missingAttributesPages = getMissingPages(
				attributeDataIndex,
				PAGE_SIZE,
				start,
				length
			);
			attributePagination = getPagination(
				missingAttributesPages[0] || 0,
				start,
				PAGE_SIZE
			);
			if (missingAttributesPages.length > 0) {
				loadData = true;
			} else {
				loadData = false;
			}
		}

		// Attribute and relation index is loaded. We know exactly which attribute or relations pages we need.
		if (!_.isEmpty(attributeDataIndex) && !_.isEmpty(attributeRelationsIndex)) {
			// Some of data or relations are needed
			if (loadData || loadRelations) {
				return dispatch(
					loadMissingRelationsAndData(
						attributeOrder,
						mergedAttributeFilter,
						missingRelationsPages,
						missingAttributesPages,
						start,
						PAGE_SIZE
					)
				);
			} else {
				// All data are loaded
				return;
			}
			// Attribute or relations or both index is not loaded.
		} else {
			return dispatch(
				ensureDataAndRelations(
					attributeOrder,
					mergedAttributeFilter,
					start,
					length,
					PAGE_SIZE,
					loadRelations,
					loadData,
					componentKey,
					attributePagination,
					relationsPagination
				)
			);
		}
	};
};

const ensureWithFilterByActive = filterByActive => {
	return (dispatch, getState) => {
		const state = getState();
		const componentKeys = Select.data.components.getComponentKeysByFilterByActive(
			state,
			filterByActive
		);
		if (componentKeys) {
			componentKeys.forEach(componentKey => {
				dispatch(ensure(componentKey));
			});
		}
	};
};

/**
 * Entry point for ensuring data for component
 * @param {string} componentKey
 */
const use = componentKey => {
	return dispatch => {
		// TODO register use?
		dispatch(ensure(componentKey));
	};
};

/**
 *
 * @param {Array?} order
 * @param {Object} filter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {bool} loadRelations Whether response should contain relations
 * @param {bool} loadData Whether response should contain data
 * @param {Object?} relationsPagination Pagination for relations.
 * @param {Object?} attributeDataPagination Pagination for attributeData.
 */
function loadIndexedPage(
	order,
	filter,
	loadRelations,
	loadData,
	relationsPagination,
	attributeDataPagination
) {
	return (dispatch, getState) => {
		const localConfig = Select.app.getCompleteLocalConfiguration(getState());
		const apiPath = 'rest/attributeData/filtered';

		const usedRelationsPagination = relationsPagination
			? {...relationsPagination}
			: DEFAULT_PAGE_PAGINATION;

		if (loadRelations) {
			usedRelationsPagination.relations = true;
		} else {
			usedRelationsPagination.relations = false;
		}

		const usedAttributeDataPagination = attributeDataPagination
			? {...attributeDataPagination}
			: DEFAULT_PAGE_PAGINATION;

		if (loadData) {
			usedAttributeDataPagination.data = true;
		} else {
			usedAttributeDataPagination.data = false;
		}

		//FIXME add loading support

		const {
			componentKey,
			layerTemplateKey,
			areaTreeLevelKey,
			attributeKeys,
			attributeFilter,
			dataSourceKeys,
			featureKeys,
			spatialFilter,
			...modifiers
		} = filter;

		// Create payload
		const payload = {
			modifiers,

			// which layer you want
			...(layerTemplateKey && {layerTemplateKey}),
			...(areaTreeLevelKey && {areaTreeLevelKey}),

			// which attributes you want
			...(attributeKeys && {attributeKeys}),

			// pagination for relations (& data sources)
			// TODO add support for relations:false on BE
			// ...(loadRelations && {relations: usedRelationsPagination}),
			relations: usedRelationsPagination,

			data: {
				...usedAttributeDataPagination,

				...(attributeFilter && {attributeFilter}),

				attributeOrder: order || null,

				// list of specific features you want
				...(featureKeys && {featureKeys}),

				// extent
				...(spatialFilter && {spatialFilter}),

				// use data source keys instead of LayerTemplateKey/AreaTreeLevelKey + modifiers
				...(dataSourceKeys && {dataSourceKeys}),
			},
		};

		return request(localConfig, apiPath, 'POST', null, payload, undefined, null)
			.then(result => {
				if (result.errors) {
					throw new Error(result.errors[dataType] || 'no data');
				} else {
					if (result.attributeData || result.attributeRelationsDataSources) {
						if (
							!!loadRelations &&
							result.attributeRelationsDataSources.attributeRelations &&
							!_.isEmpty(
								result.attributeRelationsDataSources.attributeRelations
							)
						) {
							const changes = null;
							dispatch(
								attributeRelations.receiveIndexed(
									result.attributeRelationsDataSources.attributeRelations,
									filter,
									order,
									result.attributeRelationsDataSources.offset,
									result.attributeRelationsDataSources.total,
									changes
								)
							);
						}

						if (result.attributeData.attributeData) {
							const changes = null;
							dispatch(
								attributeData.receiveIndexedAttributeEndPoint(
									result.attributeData,
									filter,
									order,
									result.attributeData.offset,
									result.attributeData.total,
									changes
								)
							);
						}
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

// Actions ------------------------------------------------------------------------------------------------------------

const actionSetAttributeKeys = (component, attributeKeys) => {
	return {
		type: ActionTypes.DATA.COMPONENTS.SET.ATTRIBUTE_KEYS,
		component,
		attributeKeys,
	};
};

const actionUpdateComponents = components => {
	return {
		type: ActionTypes.DATA.COMPONENTS.UPDATE_COMPONENTS,
		components,
	};
};

export default {
	ensureWithFilterByActive,
	setAttributeKeys: actionSetAttributeKeys,
	updateComponentsStateFromView,
	use,
	updateComponent,
};
