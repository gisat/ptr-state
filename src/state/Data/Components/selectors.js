import common from '../../_common/selectors';
import {
	createObserver as createRecomputeObserver,
	createSelector as createRecomputeSelector,
} from '@jvitela/recompute';
import createCachedSelector from 're-reselect';
import {
	isEmpty as _isEmpty,
	filter as _filter,
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

const getAllComponentsAsObject = state =>
	state.data.components.components.byKey;
const getAllComponentsInUse = state => state.data.components.components.inUse;
const getComponentStateByKey = (state, key) =>
	state.data.components.components.byKey[key];

const getComponentStateByKeyObserver = createRecomputeObserver(
	getComponentStateByKey
);

const getAttributeFilterExtensionByComponentKeyObserver = createRecomputeObserver(
	getAttributeFilterExtensionByComponentKey
);

const getCommonFilterByComponentKeyObserver = createRecomputeObserver(
	getCommonFilterByComponentKey
);

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

const getComponentKeysByFilterByActive = createCachedSelector(
	[getAllComponentsAsObject, (state, filterByActive) => filterByActive],
	(components, filterByActive) => {
		if (!_isEmpty(components) && !_isEmpty(filterByActive)) {
			let filteredKeys = [];
			_forIn(components, (componentState, key) => {
				if (_isMatch(componentState.filterByActive, filterByActive)) {
					filteredKeys.push(key);
				}
			});

			return filteredKeys.length ? filteredKeys : null;
		} else {
			return null;
		}
	}
)((state, filterByActive) => JSON.stringify(filterByActive));

const getData = createRecomputeSelector(componentKey => {
	const componentState = getComponentStateByKeyObserver(componentKey);

	if (componentState) {
		// TODO cached selector for data of only relevant data sources needed!!!
		const data = attributeDataSelectors.getAllAsObject_recompute();
		const attributeKeys = componentState?.attributeKeys;

		if (!_isEmpty(data) && attributeKeys?.length) {
			const attributeFilterExtension = getAttributeFilterExtensionByComponentKeyObserver(
				componentKey
			);

			const commonFilter = getCommonFilterByComponentKeyObserver(componentKey);

			const attributeFilter = {
				...commonFilter,
				...attributeFilterExtension,
			};

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
					null
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

function getAttributeFilterExtensionByComponentKey(state, componentKey) {
	const componentState = getComponentStateByKey(state, componentKey);

	const {
		attributeFilter,
		dataSourceKeys,
		featureKeys,
		spatialFilter,
	} = componentState;

	const attributeRelationsFilter = {
		...(attributeFilter !== undefined && {attributeFilter}),
		...(dataSourceKeys !== undefined && {dataSourceKeys}),
		...(featureKeys !== undefined && {featureKeys}),
		...(spatialFilter !== undefined && {spatialFilter}),
	};

	return attributeRelationsFilter;
}

function getCommonFilterByComponentKey(state, componentKey) {
	const componentState = getComponentStateByKey(state, componentKey);

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

	const commonFilter = {
		modifiers: modifiersForRequest,
		...(areaTreeLevelKey !== undefined && {areaTreeLevelKey}),
		...(layerTemplateKey !== undefined && {layerTemplateKey}),
		...(attributeKeys !== undefined && {attributeKeys}),
	};

	return commonFilter;
}

const getIndexForAttributeDataByComponentKey = (state, componentKey) => {
	const componentState = getComponentStateByKey(state, componentKey);

	const {attributeOrder} = componentState;

	const attributeFilterExtension = getAttributeFilterExtensionByComponentKey(
		state,
		componentKey
	);

	const commonFilter = getCommonFilterByComponentKey(state, componentKey);

	const attributeFilter = {
		...commonFilter,
		...attributeFilterExtension,
	};

	const attributeDataIndex =
		attributeDataSelectors.getIndex(
			state,
			'indexes',
			attributeFilter,
			attributeOrder
		) || [];

	const missingAttributesData = _isEmpty(attributeDataIndex);
	return missingAttributesData ? null : attributeDataIndex;
};

export default {
	getComponentStateByKey,
	getComponentKeysByFilterByActive,
	getData,
	getDataForBigNumber,
	getDataForColumnChart,
	getDataForScatterChart,
	getDataForTable,
	getIndexForAttributeDataByComponentKey,
	getCommonFilterByComponentKey,
	getAttributeFilterExtensionByComponentKey,
	isComponentInUse,
};
