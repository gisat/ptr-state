import {
	createObserver as createRecomputeObserver,
	createSelector as createRecomputeSelector,
} from '@jvitela/recompute';
import createCachedSelector from 're-reselect';
import {
	isEmpty as _isEmpty,
	forIn as _forIn,
	get as _get,
	isMatch as _isMatch,
	isNumber as _isNumber,
} from 'lodash';

import commonHelpers from '../../_common/helpers';
import commonSelectors from '../../_common/selectors';
import attributeDataSelectors from '../AttributeData/selectors';
import attributeRelationsSelectors from '../AttributeRelations/selectors';
import componentsSelectors from '../../Components/selectors';

const getSubstate = state => state.data.components;

const getAllComponentsInUse = state => state.data.components.components.inUse;
const getComponentStateByKey = (state, key) =>
	state.data.components.components.byKey[key];

const getComponentStateByKeyObserver = createRecomputeObserver(
	getComponentStateByKey
);

/**
 * Check if component is in use
 * @param state {Object}
 * @param componentKey {string}
 * @return {boolean}
 */
const isComponentInUse = createCachedSelector(
	[getAllComponentsInUse, (state, componentKey) => componentKey],
	(componentsInUse, componentKey) => {
		if (componentsInUse.length && componentKey) {
			return !!_.includes(componentsInUse, componentKey);
		} else {
			return false;
		}
	}
)((state, componentKey) => componentKey);

/**
 * Check if component's filter by active matches give filterByActive
 * @param state {Object}
 * @param componentKey {string}
 * @param filterByActive {Object} {scope: true, place: true, ...}
 * @return {boolean}
 */
const componentMatchesFilterByActive = createCachedSelector(
	[
		getComponentStateByKey,
		(state, componentKey, filterByActive) => filterByActive,
	],
	(componentState, filterByActive) => {
		if (componentState?.filterByActive && filterByActive) {
			return _isMatch(componentState.filterByActive, filterByActive);
		} else {
			return false;
		}
	}
)(
	(state, componentKey, filterByActive) =>
		`${componentKey}_${JSON.stringify(filterByActive)}`
);

const getData = createRecomputeSelector(componentKey => {
	const componentState = getComponentStateByKeyObserver(componentKey);

	if (componentState) {
		// TODO cached selector for data of only relevant data sources needed!!!
		const data = attributeDataSelectors.getAllAsObjectObserver();
		const attributeKeys = componentState?.attributeKeys;

		if (!_isEmpty(data) && attributeKeys?.length) {
			const attributeDataFilterExtension = getAttributeDataFilterExtensionByComponentKey(
				componentKey
			);

			const commonFilter = getCommonFilterByComponentKey(componentKey);

			const attributeFilter = {
				...commonFilter,
				...attributeDataFilterExtension,
			};

			const attributeOrder = componentState.attributeOrder || null;

			const relationsFilter = {
				...commonFilter,
			};

			// Get relations
			const attributeRelations = attributeRelationsSelectors.getIndexed(
				relationsFilter
			);

			if (attributeRelations?.length) {
				// Get from relations, which data source is associated with which attribute
				let attributeDsKeyAttributeKeyPairs = {};
				attributeRelations.forEach(relation => {
					attributeDsKeyAttributeKeyPairs[
						relation.data.attributeDataSourceKey
					] = relation.data.attributeKey;
				});

				// Find data index
				// TODO more sophisticated index with attributeFilter & attributeOrder
				const attributeDataIndex = attributeDataSelectors.getIndex_recompute(
					attributeFilter,
					attributeOrder
				);

				// Get indexed features
				let indexedFeatureKeysAsObject = attributeDataIndex?.index;

				if (indexedFeatureKeysAsObject) {
					let {start, length} = componentState;
					start = start || 1;
					length = length || attributeDataIndex.count;
					let end = Math.min(start + length - 1, attributeDataIndex.count);

					let finalFeaturesAsObject = [];

					// Loop through indexed features
					for (let i = start; i <= end; i++) {
						const featureKey = indexedFeatureKeysAsObject[i];
						if (featureKey) {
							// We don't know which feature is in which attribute DS
							// also there could be more attributes for the feature
							_forIn(
								attributeDsKeyAttributeKeyPairs,
								(attributeKey, attributeDsKey) => {
									let value = data[attributeDsKey]?.[featureKey];

									if (value !== undefined) {
										// existing feature
										if (finalFeaturesAsObject[i - start]) {
											finalFeaturesAsObject[i - start].data[
												attributeKey
											] = value;
										}

										// new feature
										else {
											// TODO temporary fix for buggy BE values datatype
											value = isNaN(value)
												? value
												: _isNumber(value)
												? value
												: Number(value);

											// TODO format?
											finalFeaturesAsObject[i - start] = {
												key: featureKey,
												data: {
													[attributeKey]: value,
												},
											};
										}
									}
								}
							);
						} else {
							// no feature key at index
							finalFeaturesAsObject.push(null);
						}
					}
					return finalFeaturesAsObject;
				} else {
					return null;
				}
			} else {
				return null;
			}
		} else {
			return null;
		}
	} else {
		return null;
	}
});

const getDataForBigNumber = createRecomputeSelector(props => {
	const componentSettings = componentsSelectors.getByComponentKey_recompute(
		props.stateComponentKey
	);
	const data = getData(props.stateComponentKey);
	const firstFeature = data?.[0];

	return {
		title: _get(firstFeature, componentSettings?.titleSourcePath),
		value: _get(firstFeature, componentSettings?.valueSourcePath),
	};
});

const getDataForTable = createRecomputeSelector(props => {
	const componentSettings = componentsSelectors.getByComponentKey_recompute(
		props.stateComponentKey
	);
	const data = getData(props.stateComponentKey);

	const dataDefinition =
		data?.map(item => {
			const itemData = {};
			componentSettings.columns?.forEach(column => {
				itemData[column.columnKey] = _get(item, column.dataPath);
			});
			return itemData;
		}) || [];

	const columnsDefinition =
		componentSettings.columns?.map(column => ({
			Header: column.header,
			accessor: column.columnKey,
		})) || [];

	return {
		data: dataDefinition,
		columns: columnsDefinition,
	};
});

const getDataForColumnChart = createRecomputeSelector(props => {
	const componentSettings = componentsSelectors.getByComponentKey_recompute(
		props.stateComponentKey
	);
	const chartSettings = {...componentSettings, ...props};
	const data = getData(props.stateComponentKey);

	if (data) {
		return {
			data,
			...chartSettings,
		};
	} else {
		return {
			...chartSettings,
			data: [],
		};
	}
});

const getDataForScatterChart = createRecomputeSelector(props => {
	// const componentState = getComponentStateByKeyObserver(stateComponentKey);
	const componentSettings = componentsSelectors.getByComponentKey_recompute(
		props.stateComponentKey
	);
	const chartSettings = {...componentSettings, ...props};
	const data = getData(props.stateComponentKey);

	if (data) {
		return {
			data,
			...chartSettings,
		};
	} else {
		return chartSettings;
	}
});

/**
 * Get filter params which are specific for attribute data
 * @param componentKey {string}
 * @return {Object}
 */
const getAttributeDataFilterExtensionByComponentKey = createRecomputeSelector(
	componentKey => {
		const componentState = getComponentStateByKeyObserver(componentKey);

		const {
			attributeFilter,
			dataSourceKeys,
			featureKeys,
			spatialFilter,
		} = componentState;

		return {
			...(attributeFilter !== undefined && {attributeFilter}),
			...(dataSourceKeys !== undefined && {dataSourceKeys}),
			...(featureKeys !== undefined && {featureKeys}),
			...(spatialFilter !== undefined && {spatialFilter}),
		};
	}
);

/**
 * Get filter params which are common to both attributeRelations and attributeData
 * @param componentKey {string}
 * @return {{modifiers: Object, areaTreeLevelKey: string, layerTemplateKey: string, attributeKeys: Array}}
 */
const getCommonFilterByComponentKey = createRecomputeSelector(componentKey => {
	const componentState = getComponentStateByKeyObserver(componentKey);

	const {
		areaTreeLevelKey,
		attributeKeys,
		filterByActive,
		layerTemplateKey,
		metadataModifiers,
	} = componentState;

	// modifiers defined by key
	const metadataDefinedByKey = metadataModifiers ? {...metadataModifiers} : {};

	if (layerTemplateKey) {
		metadataDefinedByKey[layerTemplateKey] = layerTemplateKey;
	} else if (areaTreeLevelKey) {
		metadataDefinedByKey[areaTreeLevelKey] = areaTreeLevelKey;
	}

	// Get actual metadata keys defined by filterByActive
	const activeMetadataKeys = filterByActive
		? commonSelectors.getActiveKeysByFilterByActiveObserver(filterByActive)
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

	return {
		modifiers: modifiersForRequest,
		...(areaTreeLevelKey !== undefined && {areaTreeLevelKey}),
		...(layerTemplateKey !== undefined && {layerTemplateKey}),
		...(attributeKeys !== undefined && {attributeKeys}),
	};
});

const getIndexForAttributeDataByComponentKey = createRecomputeSelector(
	componentKey => {
		const componentState = getComponentStateByKeyObserver(componentKey);

		const {attributeOrder} = componentState;

		const attributeDataFilterExtension = getAttributeDataFilterExtensionByComponentKey(
			componentKey
		);

		const commonFilter = getCommonFilterByComponentKey(componentKey);

		const attributeFilter = {
			...commonFilter,
			...attributeDataFilterExtension,
		};

		const attributeDataIndex =
			attributeDataSelectors.getIndex_recompute(
				attributeFilter,
				attributeOrder
			) || [];

		const missingAttributesData = _isEmpty(attributeDataIndex);
		return missingAttributesData ? null : attributeDataIndex;
	}
);

export default {
	componentMatchesFilterByActive,

	getAllComponentsInUse,
	getComponentStateByKey,
	getData,
	getDataForBigNumber,
	getDataForColumnChart,
	getDataForScatterChart,
	getDataForTable,
	getIndexForAttributeDataByComponentKey,
	getCommonFilterByComponentKey,
	getAttributeDataFilterExtensionByComponentKey,
	isComponentInUse,
};
