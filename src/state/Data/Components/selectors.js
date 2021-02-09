import common from '../../_common/selectors';
import {createObserver as createRecomputeObserver, createSelector as createRecomputeSelector} from '@jvitela/recompute';
import _ from 'lodash';

import attributeDataSelectors from '../AttributeData/selectors';
import attributeRelationsSelectors from '../AttributeRelations/selectors';

const getSubstate = (state) => state.data.components;
const getComponentStateByKey = (state, key) => state.data.components.components[key];

const getComponentStateByKeyObserver = createRecomputeObserver(getComponentStateByKey);

const getData = createRecomputeSelector((componentKey) => {
	const componentState = getComponentStateByKeyObserver(componentKey);

	// TODO cached selector for data of only relevant data sources needed!!!
	const data = attributeDataSelectors.getAllAsObject_recompute();

	// TODO multiple attributes - sorting, indexes, etc...
	const attributeKeys = componentState?.attributeKeys;

	if (!_.isEmpty(data) && attributeKeys?.length) {
		// Get common relations filter
		let commonRelationsFilter = common.getCommmonDataRelationsFilterFromComponentState(componentState);

		// Create final relations filter
		const relationsFilter = {...commonRelationsFilter, attributeKey: {in: attributeKeys}};

		// Get relations
		const attributeRelations = attributeRelationsSelectors.getIndexed(relationsFilter);

		if (attributeRelations?.length) {
			// Get from relations, which data source is associated with which attribute
			let attributeDsKeyAttributeKeyPairs = {};
			attributeRelations.forEach(relation => {
				attributeDsKeyAttributeKeyPairs[relation.data.attributeDataSourceKey] = relation.data.attributeKey;
			});

			// Find data index
			// TODO more sophisticated index with attributeFilter & attributeOrder
			const attributeDataIndex = attributeDataSelectors.getIndex_recompute(relationsFilter, null);

			// Get indexed features
			const indexedFeatureKeys = attributeDataIndex?.index;

			if (indexedFeatureKeys) {
				let finalFeatures = [];

				// Loop through indexed features
				_.forIn(indexedFeatureKeys, (featureKey) => {

					// We don't know which feature is in which attribute DS
					_.forIn(attributeDsKeyAttributeKeyPairs, (attributeKey, attributeDsKey) => {
						const value = data[attributeDsKey]?.[featureKey];
						if (value) {
							// TODO format
							finalFeatures.push({
								key: featureKey,
								data: {
									[attributeKey]: value
								}
							})
							return false;
						}
					});
				});
				return finalFeatures;
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

const getDataForBigNumber = createRecomputeSelector((componentKey) => {
	const data = getData(componentKey);
	const firstFeature = data?.[0];
	const title = firstFeature?.key;
	const attributes = firstFeature?.data;
	const value = attributes && Object.values(attributes)?.[0];

	return {title, value};
});

const getDataForColumnChart = createRecomputeSelector((componentKey) => {
	const data = getData(componentKey);
	if (data) {
		return {
			data,
			ySourcePath: ['data', data[0].data && Object.keys(data[0].data)?.[0]].join('.')
		}
	} else {
		return null;
	}
});

export default {
	getData,
	getDataForBigNumber,
	getDataForColumnChart
};