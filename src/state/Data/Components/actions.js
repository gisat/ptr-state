import ActionTypes from '../../../constants/ActionTypes';
import Select from '../../Select';
import commonHelpers from '../../_common/helpers';
import commonSelectors from '../../_common/selectors';
import request from '../../_common/request';
import commonActions from '../../_common/actions';
import attributeRelations from '../AttributeRelations/actions';
import attributeData from '../AttributeData/actions';

const DEFAULT_RELATIONS_PAGE = {
	offset: 0,
	limit: 100,
};

/**
 * Central method for getting PAGE_SIZE from state or configDefaults.
 * @param {Object} state App state
 * @return {Number}
 */
const getPageSize = state => {
	const localConfig = Select.app.getCompleteLocalConfiguration(state);
	const PAGE_SIZE =
		localConfig.requestPageSize || configDefaults.requestPageSize;
	return PAGE_SIZE;
};


const getRestPages = (
	count,
	PAGE_SIZE
) => {
	if (count === 0) {
		return 0;
	} else {
		const remainingPageCount = Math.ceil(
			(count - PAGE_SIZE) / PAGE_SIZE
		);
		return remainingPageCount;
	}
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

// Actions
const actionUpdateComponents = components => {
	return {
		type: ActionTypes.DATA.COMPONENTS.UPDATE_COMPONENTS,
		components,
	};
};

/**
 * Ensure load attribute data and relations.
 * @param {Array?} order
 * @param {Object} mergedAttributeFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @return {function}
 */
function ensureDataAndRelations(
	order,
	mergedAttributeFilter
) {
	return (dispatch, getState) => {
		const state = getState();
		const PAGE_SIZE = getPageSize(state);

		const relations = {
			offset: 0,
			limit: PAGE_SIZE,
		};
		const loadRelations = true;
		return dispatch(
			loadIndexedPage(
				order,
				mergedAttributeFilter,
				loadRelations,
				relations,
				relations,
			)).then(response => {
				if (response instanceof Error) {
					return;
					throw response;
				}

				const attributeRelationsCount = response.attributeRelationsDataSources.total;
				const attributeCount = response.attributeData.total;

				const restRelationsPages = getRestPages(
					attributeRelationsCount,
					PAGE_SIZE
				);

				const restAttributesPages = getRestPages(
					attributeCount,
					PAGE_SIZE
				);

				if(restRelationsPages === 0 && restAttributesPages === 0) {
					//nothing to load
					return
				} else {
					//needs to load more relations or data
					return dispatch(
						loadMissingRelationsAndData(
							order,
							mergedAttributeFilter,
							restRelationsPages,
							restAttributesPages,
						)
					);
				}
			})
	}
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
	remainingRelationsPageCount,
	remainingAttributeDataPageCount,
) {
	return (dispatch, getState) => {
		const PAGE_SIZE = getPageSize(getState());

		const promises = [];

		// load remaining relations pages
		let pagination = 0;
		const loadRelations = true;
		for (let i = 1; i <= remainingRelationsPageCount; i++) {
			const relations = {
				offset: i * PAGE_SIZE,
				limit: PAGE_SIZE,
			};

			pagination = i;
			
			promises.push(
				dispatch(
					loadIndexedPage(
						order,
						mergedAttributeFilter,
						loadRelations,
						relations, //paginations for relations
						relations, //paginations for data is same like for relations here
					)
				)
			);
		}

		// If its still needed, load remaining data pages
		for (let i = pagination + 1; i <= remainingAttributeDataPageCount; i++) {

			const attributeDataPagination = {
				offset: i * PAGE_SIZE,
				limit: PAGE_SIZE,
			};
			promises.push(
				dispatch(
					loadIndexedPage(
						order,
						mergedAttributeFilter,
						false,
						{},
						attributeDataPagination,
					)
				)
			);
		}

		return Promise.all(promises);
	};
}

const ensure = ({
	areaTreeLevelKey,
	attributeKeys,
	attributeFilter,
	attributeOrder,
	dataSourceKeys,
	featureKeys,
	layerTemplateKey,
	modifiers,
	spatialFilter,
}) => {
	return (dispatch, getState) => {
		const mergedAttributeFilter = {
			...modifiers,
			...(areaTreeLevelKey !== undefined && {areaTreeLevelKey}),
			...(attributeKeys !== undefined && {attributeKeys}),
			...(attributeFilter !== undefined && {attributeFilter}),
			...(dataSourceKeys !== undefined && {dataSourceKeys}),
			...(featureKeys !== undefined && {featureKeys}),
			...(layerTemplateKey !== undefined && {layerTemplateKey}),
			...(spatialFilter !== undefined && {spatialFilter}),
		}

		const attributeDataIndex =
			Select.data.attributeData.getIndex(
				getState(),
				'indexes',
				mergedAttributeFilter,
				attributeOrder
			) || [];

		const missingAttributesData = _.isEmpty(attributeDataIndex);

		//FIXME - add determination for missing some pages

		//
		// No index exists for filter and order
		// load all
		//  
		if(missingAttributesData) {
			return dispatch(
				ensureDataAndRelations(
					attributeOrder,
					mergedAttributeFilter
				)
			);
		} else {
			//nothing is missing
			return
		}
	};
};

const use = componentKey => {
	return (dispatch, getState) => {
		const state = getState();
		const componentState = Select.data.components.getComponentStateByKey(
			state,
			componentKey
		);
		const {
			areaTreeLevelKey,
			attributeKeys,
			attributeFilter,
			attributeOrder,
			dataSourceKeys,
			featureKeys,
			filterByActive,
			layerTemplateKey,
			metadataModifiers,
			spatialFilter,
		} = componentState;

		// modifiers defined by key
		const metadataDefinedByKey = metadataModifiers
			? {...metadataModifiers}
			: {};

		if (layerTemplateKey) {
			metadataDefinedByKey[layerTemplateKey] = layerTemplateKey;
		} else if (areaTreeLevelKey) {
			metadataDefinedByKey[areaTreeLevelKey] = areaTreeLevelKey;
		}

		// Get actual metadata keys defined by filterByActive
		const activeMetadataKeys = filterByActive
			? commonSelectors.getActiveKeysByFilterByActive(state, filterByActive)
			: null;

		// Merge metadata, metadata defined by key have priority
		const mergedMetadataKeys = commonHelpers.mergeMetadataKeys(
			metadataDefinedByKey,
			activeMetadataKeys
		);

		// Decouple modifiers from templates
		const {
			areaTreeLevelKey: modifiedAreaTreeLevelKey,
			layerTemplateKey: modifiedLayerTemplateKey,
			applicationKey,
			...modifiers
		} = mergedMetadataKeys;

		// It converts modifiers from metadataKeys: ["A", "B"] to metadataKey: {in: ["A", "B"]}
		const modifiersForRequest = commonHelpers.convertModifiersToRequestFriendlyFormat(
			modifiers
		);

		// TODO register use?
		dispatch(
			ensure({
				areaTreeLevelKey: modifiedAreaTreeLevelKey,
				attributeKeys,
				attributeFilter,
				attributeOrder,
				dataSourceKeys,
				featureKeys,
				layerTemplateKey: modifiedLayerTemplateKey,
				modifiers: modifiersForRequest,
				spatialFilter,
			})
		);
	};
};

/**
 *
 * @param {Array?} order
 * @param {Object} filter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {bool} loadRelations Whether response should contain relations
 * @param {Object?} relations Pagination for relations.
 * @param {Object?} attributeDataPagination Pagination for attributeData.
 */
function loadIndexedPage(
	order,
	filter,
	loadRelations,
	relations,
	attributeDataPagination,
) {
	return (dispatch, getState) => {
		const localConfig = Select.app.getCompleteLocalConfiguration(getState());
		const apiPath = 'rest/attributeData/filtered';

		const usedRelations = relations ? {...relations} : DEFAULT_RELATIONS_PAGE;
		const usedAttributeDataPagination = attributeDataPagination ? {...attributeDataPagination} : DEFAULT_RELATIONS_PAGE;

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
			// ...(loadRelations && {relations: usedRelations}),
			relations: usedRelations,

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
							!_.isEmpty(result.attributeRelationsDataSources.attributeRelations)
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
	setAttributeKeys: actionSetAttributeKeys,
	updateComponentsStateFromView,
	use,
};
