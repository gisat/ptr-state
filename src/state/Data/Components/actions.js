import _ from 'lodash';
import ActionTypes from '../../../constants/ActionTypes';
import request from '../../_common/request';
import commonActions from '../../_common/actions';
import attributeRelations from '../AttributeRelations/actions';
import attributeData from '../AttributeData/actions';
import Select from '../../Select';
import {getPagination, getNullishPagination, getMissingPages} from './helpers';

import {getPageSize} from '../helpers';

const DEFAULT_PAGE_PAGINATION = {
	offset: 0,
	limit: 100,
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
 * Useful if no indexes are registered for relations and attribute data.
 * Function has two phases, it loads data and relations in first and determinate and loads what is missing in second phase.
 * @param {String} componentKey Related component
 * @param {Array?} order
 * @param {Object} commonFilter Common filter object used as a relationsFilter and used in attributeDataFilter.
 * @param {Object} attributeDataFilterExtension Object contains values for extend commonFilter to create attributeDataFilter.
 * @param {Number} start Position of first asked item after ordered.
 * @param {Number} length How many attribute data asking for.
 * @param {Number} PAGE_SIZE How many attribute data items will be in one request.
 * @param {Boolean} loadRelations Whether to load relations.
 * @param {Boolean} loadData Whether to load attribute data.
 * @param {Object} attributePagination Paginations for attributes {offset: Number, limit: Number}
 * @param {Object} relationsPagination Paginations for relations {offset: Number, limit: Number}
 * @return {function}
 */
function ensureDataAndRelations(
	componentKey,
	order,
	commonFilter,
	attributeDataFilterExtension,
	start,
	length,
	PAGE_SIZE,
	loadRelations,
	loadData,
	attributePagination,
	relationsPagination
) {
	return (dispatch, getState) => {
		const state = getState();
		const RELATIONS_PAGE_SIZE = getPageSize(state);

		return dispatch(
			loadIndexedPage(
				order,
				commonFilter,
				attributeDataFilterExtension,
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

			const relationsFilter = {...commonFilter};
			const attributeRelationsIndex =
				Select.data.attributeRelations.getIndex(getState(), relationsFilter) ||
				[];

			const missingAttributesPages = getMissingPages(
				attributeDataIndex,
				PAGE_SIZE,
				start,
				length
			);
			const missingRelationsPages = getMissingPages(
				attributeRelationsIndex,
				RELATIONS_PAGE_SIZE,
				1,
				null
			);

			if (
				missingRelationsPages.length === 0 &&
				missingAttributesPages.length === 0
			) {
				//nothing to load
				return;
			} else {
				//needs to load more relations or data
				return dispatch(
					loadMissingRelationsAndData(
						componentKey,
						order,
						commonFilter,
						attributeDataFilterExtension,
						missingRelationsPages,
						missingAttributesPages,
						start,
						length,
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
 * @param {String} componentKey
 * @param {Array?} order
 * @param {Object} commonFilter Common filter object used as a relationsFilter and used in attributeDataFilter.
 * @param {Object} attributeDataFilterExtension Object contains values for extend commonFilter to create attributeDataFilter.
 * @param {Array} remainingRelationsPages
 * @param {Array} remainingAttributeDataPages [0,1,2,3] || [2,5]
 * @param {Array} start
 * @param {Array} PAGE_SIZE
 * @return {function} Return promise.
 */
function loadMissingRelationsAndData(
	componentKey,
	order,
	commonFilter,
	attributeDataFilterExtension,
	remainingRelationsPages,
	remainingAttributeDataPages,
	start,
	length,
	PAGE_SIZE
) {
	return (dispatch, getState) => {
		const state = getState();
		const RELATIONS_PAGE_SIZE = getPageSize(state);

		const promises = [];

		const attributeDataIndex =
			Select.data.components.getIndexForAttributeDataByComponentKey(
				state,
				componentKey
			) || {};
		const attributeCount = attributeDataIndex.count;

		// load remaining relations pages
		let pagination = 0;
		const loadRelations = true;

		for (let i = 1; i <= remainingRelationsPages.length; i++) {
			const relationsPagination = getPagination(
				remainingRelationsPages[i - 1],
				1,
				RELATIONS_PAGE_SIZE
			);

			//only if missing attribute data pages missing
			let attributePagination = getNullishPagination();
			let loadData = false;
			if (pagination < remainingAttributeDataPages.length) {
				attributePagination = getPagination(
					remainingAttributeDataPages[i - 1],
					start,
					PAGE_SIZE,
					length,
					attributeCount
				);
				loadData = true;
				pagination = i;
			}

			promises.push(
				dispatch(
					loadIndexedPage(
						order,
						commonFilter,
						attributeDataFilterExtension,
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
				PAGE_SIZE,
				length,
				attributeCount
			);
			const loadRelations = false;
			const loadData = true;
			promises.push(
				dispatch(
					loadIndexedPage(
						order,
						commonFilter,
						attributeDataFilterExtension,
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
 * Check if for given componentKey missing data or relations and load them.
 * @param {String} componentKey
 */
const ensure = componentKey => {
	return (dispatch, getState) => {
		const state = getState();
		const componentState = Select.data.components.getComponentStateByKey(
			state,
			componentKey
		);
		const {attributeOrder: order = null, start = 1, length} = componentState;

		const attributeDataFilterExtension = Select.data.components.getAttributeDataFilterExtensionByComponentKey(
			state,
			componentKey
		);

		const commonFilter = Select.data.components.getCommonFilterByComponentKey(
			state,
			componentKey
		);

		const relationsFilter = {
			...commonFilter,
		};

		const attributeDataIndex =
			Select.data.components.getIndexForAttributeDataByComponentKey(
				state,
				componentKey
			) || [];

		const attributeRelationsIndex =
			Select.data.attributeRelations.getIndex(state, relationsFilter) || [];

		let loadRelations = true;
		let loadData = true;

		const RELATIONS_PAGE_SIZE = getPageSize(state);

		// Attribute data page size is same like app page size
		// In case of need PAGE_SIZE could be modified here
		const PAGE_SIZE = RELATIONS_PAGE_SIZE;

		let relationsPagination = getPagination(0, 1, RELATIONS_PAGE_SIZE);
		let attributePagination = getPagination(0, start, PAGE_SIZE, length);

		let missingRelationsPages, missingAttributesPages;
		// Relations index exist
		// find if all required relations are loaded
		if (!_.isEmpty(attributeDataIndex)) {
			missingRelationsPages = getMissingPages(
				attributeRelationsIndex,
				RELATIONS_PAGE_SIZE,
				1,
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
				PAGE_SIZE,
				length,
				attributeDataIndex.count
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
				// Load just missing data and relations defined by missingPages
				return dispatch(
					loadMissingRelationsAndData(
						componentKey,
						order,
						commonFilter,
						attributeDataFilterExtension,
						missingRelationsPages,
						missingAttributesPages,
						start,
						length,
						PAGE_SIZE
					)
				);
			} else {
				// All data are loaded
				return;
			}
			// Attribute or relations or both index is not loaded.
		} else {
			// Load relations and data
			return dispatch(
				ensureDataAndRelations(
					componentKey,
					order,
					commonFilter,
					attributeDataFilterExtension,
					start,
					length,
					PAGE_SIZE,
					loadRelations,
					loadData,
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
		const componentsInUse = Select.data.components.getAllComponentsInUse(state);
		if (componentsInUse.length) {
			componentsInUse.forEach(componentKey => {
				const fitsFilterByActive = Select.data.components.componentMatchesFilterByActive(
					state,
					componentKey,
					filterByActive
				);
				if (fitsFilterByActive) {
					dispatch(ensure(componentKey));
				}
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
		dispatch(componentUseRegister(componentKey));
		dispatch(ensure(componentKey));
	};
};

/**
 * Clear use of the component
 * @param componentKey {string}
 */
const componentUseClear = componentKey => {
	return (dispatch, getState) => {
		const registered = Select.data.components.isComponentInUse(
			getState(),
			componentKey
		);
		if (registered) {
			dispatch(actionComponentUseClear(componentKey));
		}
	};
};

/**
 * Register use of the component
 * @param componentKey {string}
 */
const componentUseRegister = componentKey => {
	return (dispatch, getState) => {
		const alreadyRegistered = Select.data.components.isComponentInUse(
			getState(),
			componentKey
		);
		if (!alreadyRegistered) {
			dispatch(actionComponentUseRegister(componentKey));
		}
	};
};

/**
 *
 * @param {Array?} order
 * @param {Object} commonFilter Common filter object used as a relationsFilter and used in attributeDataFilter.
 * @param {Object} attributeDataFilterExtension Object contains values for extend commonFilter to create attributeDataFilter.
 * @param {bool} loadRelations Whether response should contain relations
 * @param {bool} loadData Whether response should contain data
 * @param {Object?} relationsPagination Pagination for relations.
 * @param {Object?} attributeDataPagination Pagination for attributeData.
 */
function loadIndexedPage(
	order,
	commonFilter,
	attributeDataFilterExtension,
	loadRelations,
	loadData,
	relationsPagination,
	attributeDataPagination
) {
	return (dispatch, getState) => {
		const localConfig = Select.app.getCompleteLocalConfiguration(getState());
		const apiPath = 'rest/attributeData/filtered';
		const relationsOrder = null;

		const {
			layerTemplateKey,
			areaTreeLevelKey,
			attributeKeys,
			modifiers,
		} = commonFilter;

		const {
			attributeFilter,
			dataSourceKeys,
			featureKeys,
			spatialFilter,
		} = attributeDataFilterExtension;

		const relationsFilter = {...commonFilter};
		const attributeDataFilter = {
			...commonFilter,
			...attributeDataFilterExtension,
		};

		const usedRelationsPagination = relationsPagination
			? {...relationsPagination}
			: DEFAULT_PAGE_PAGINATION;

		if (loadRelations) {
			usedRelationsPagination.relations = true;
			//set relations loading
			dispatch(
				attributeRelations.addLoadingIndex(
					usedRelationsPagination,
					relationsFilter,
					relationsOrder
				)
			);
		} else {
			usedRelationsPagination.relations = false;
		}

		const usedAttributeDataPagination = attributeDataPagination
			? {...attributeDataPagination}
			: DEFAULT_PAGE_PAGINATION;

		if (loadData) {
			usedAttributeDataPagination.data = true;
			//set attributeData loading
			dispatch(
				attributeData.addLoadingIndex(
					usedAttributeDataPagination,
					attributeDataFilter,
					order
				)
			);
		} else {
			usedAttributeDataPagination.data = false;
		}

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
						if (loadRelations) {
							const changes = null;
							dispatch(
								attributeRelations.receiveIndexed(
									result.attributeRelationsDataSources.attributeRelations,
									relationsFilter,
									relationsOrder,
									result.attributeRelationsDataSources.offset + 1,
									result.attributeRelationsDataSources.total,
									changes,
									usedRelationsPagination.limit
								)
							);
						}

						if (result.attributeData.attributeData) {
							const changes = null;
							dispatch(
								attributeData.receiveIndexedAttributeEndPoint(
									result.attributeData,
									attributeDataFilter,
									order,
									result.attributeData.offset + 1,
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

const actionSetAttributeKeys = (componentKey, attributeKeys) => {
	return {
		type: ActionTypes.DATA.COMPONENTS.COMPONENT.SET.ATTRIBUTE_KEYS,
		componentKey,
		attributeKeys,
	};
};

const actionUpdateComponents = components => {
	return {
		type: ActionTypes.DATA.COMPONENTS.UPDATE_COMPONENTS,
		components,
	};
};

const actionComponentUseClear = componentKey => {
	return {
		type: ActionTypes.DATA.COMPONENTS.COMPONENT.USE.CLEAR,
		componentKey,
	};
};

const actionComponentUseRegister = componentKey => {
	return {
		type: ActionTypes.DATA.COMPONENTS.COMPONENT.USE.REGISTER,
		componentKey,
	};
};

export default {
	componentUseClear,
	ensureWithFilterByActive,
	setAttributeKeys: actionSetAttributeKeys,
	updateComponentsStateFromView,
	use,
	updateComponent,
};
