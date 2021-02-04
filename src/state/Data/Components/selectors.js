import common from '../../_common/selectors';
import {createObserver as createRecomputeObserver, createSelector as createRecomputeSelector} from '@jvitela/recompute';
import createCachedSelector from 're-reselect';
import _ from 'lodash';

import attributeDataSelectors from '../attributeData/selectors';
import attributeDataSourcesSelectors from '../attributeDataSources/selectors';

const getSubstate = (state) => state.data.components;
const getComponentStateByKey = (state, key) => state.data.components.components[key];

const getComponentStateByKeyObserver = createRecomputeObserver(getComponentStateByKey);

const getData = createRecomputeSelector((componentKey) => {
	const componentState = getComponentStateByKeyObserver(componentKey);

	// TODO cached selector for data of only relevant data sources needed!!!
	const data = attributeDataSelectors.getAllAsObject_recompute();

	// TODO multiple attributes - sorting, indexes, etc...
	const attributeKey = componentState?.attributeKeys?.[0];

	if (!_.isEmpty(data) && attributeKey) {
		// Get common relations filter
		let commonRelationsFilter = common.getCommmonDataRelationsFilterFromComponentState(componentState);

		// Create final relations filter
		const relationsFilter = {...commonRelationsFilter, attributeKey};

		// Get keys of all relevant data sources (typically just one)
		const attributeDataSourceIndex = attributeDataSourcesSelectors.getIndex_recompute(relationsFilter, null);
		const attributeDataSourceKeys = attributeDataSourceIndex?.index && Object.values(attributeDataSourceIndex.index);

		// Find data index
		// TODO more sophisticated index with attributeFilter & attributeOrder
		const attributeDataIndex = attributeDataSelectors.getIndex_recompute(relationsFilter, null);

		// Get indexed features
		const indexedFeatureKeys = attributeDataIndex?.index;

		if (indexedFeatureKeys && attributeDataSourceKeys?.length) {
			let finalFeatures = [];
			_.forIn(indexedFeatureKeys, (featureKey) => {

				// We don't know which feature is in which attribute DS
				_.forEach(attributeDataSourceKeys, (attributeDataSourceKey) => {
					const value = data[attributeDataSourceKey]?.[featureKey];
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
});

export default {
	getData
};