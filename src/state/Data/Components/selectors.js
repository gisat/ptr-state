import common from '../../_common/selectors';
import {
	createObserver as createRecomputeObserver,
	createSelector as createRecomputeSelector,
} from '@jvitela/recompute';
import _ from 'lodash';

import commonHelpers from '../../_common/helpers';
import commonSelectors from '../../_common/selectors';
import attributeDataSelectors from '../AttributeData/selectors';
import attributeRelationsSelectors from '../AttributeRelations/selectors';
import componentsSelectors from '../../Components/selectors';

const getSubstate = state => state.data.components;
const getComponentStateByKey = (state, key) =>
	state.data.components.components[key];

const getComponentStateByKeyObserver = createRecomputeObserver(
	getComponentStateByKey
);

const getData = createRecomputeSelector(componentKey => {
	const componentState = getComponentStateByKeyObserver(componentKey);

	if (componentState) {
		// TODO cached selector for data of only relevant data sources needed!!!
		const data = attributeDataSelectors.getAllAsObject_recompute();
		const attributeKeys = componentState?.attributeKeys;

		if (!_.isEmpty(data) && attributeKeys?.length) {
			// Get common relations filter
			let commonRelationsFilter = common.getCommmonDataRelationsFilterFromComponentState_recompute(
				componentState
			);

			// Create final relations filter
			const relationsFilter = {
				...commonRelationsFilter,
				attributeKeys,
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
					relationsFilter,
					null
				);

				// Get indexed features
				let indexedFeatureKeysAsObject = attributeDataIndex?.index;

				if (indexedFeatureKeysAsObject) {
					let {start, length} = componentState;
					start = start || 0;
					length = length || attributeDataIndex.count - 1;
					let end = Math.min(start + length - 1, attributeDataIndex.count - 1);

					let finalFeaturesAsObject = [];

					// Loop through indexed features
					for (let i = start; i <= end; i++) {
						const featureKey = indexedFeatureKeysAsObject[i];
						if (featureKey) {
							// We don't know which feature is in which attribute DS
							// also there could be more attributes for the feature
							_.forIn(
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
												: _.isNumber(value)
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
		title: _.get(firstFeature, componentSettings?.titleSourcePath),
		value: _.get(firstFeature, componentSettings?.valueSourcePath),
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
				itemData[column.columnKey] = _.get(item, column.dataPath);
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

const getAttributeFilterByComponentKey = (state, componentKey) => {
	const componentState = getComponentStateByKey(
		state,
		componentKey
	);

	const {
		areaTreeLevelKey,
		attributeKeys,
		attributeFilter,
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

	const mergedAttributeFilter = {
		...modifiersForRequest,
		...(areaTreeLevelKey !== undefined && {areaTreeLevelKey}),
		...(attributeKeys !== undefined && {attributeKeys}),
		...(attributeFilter !== undefined && {attributeFilter}),
		...(dataSourceKeys !== undefined && {dataSourceKeys}),
		...(featureKeys !== undefined && {featureKeys}),
		...(layerTemplateKey !== undefined && {layerTemplateKey}),
		...(spatialFilter !== undefined && {spatialFilter}),
	};

	return mergedAttributeFilter;
}

const getIndexForAttributeDataByComponentKey = (state, componentKey) => {
	const componentState = getComponentStateByKey(
		state,
		componentKey
	);

	const {
		attributeOrder,
	} = componentState;
	
	const mergedAttributeFilter = getAttributeFilterByComponentKey(state, componentKey)

	const attributeDataIndex =
		attributeDataSelectors.getIndex(
			state,
			'indexes',
			mergedAttributeFilter,
			attributeOrder
		) || [];

	const missingAttributesData = _.isEmpty(attributeDataIndex);
	return missingAttributesData ? null : attributeDataIndex;
}

export default {
	getComponentStateByKey,
	getData,
	getDataForBigNumber,
	getDataForColumnChart,
	getDataForScatterChart,
	getDataForTable,
	getIndexForAttributeDataByComponentKey,
	getAttributeFilterByComponentKey,
};
