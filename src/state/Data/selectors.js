import {createSelector as createRecomputeSelector} from '@jvitela/recompute';

import attributeRelations from './AttributeRelations/selectors';
import attributeDataSources from './AttributeDataSources/selectors';
import attributeData from './AttributeData/selectors';
import spatialRelations from './SpatialRelations/selectors';
import spatialDataSources from './SpatialDataSources/selectors';
import spatialData from './SpatialData/selectors';

const getFeatures = createRecomputeSelector((dataSourceKey, fidColumnName, attributeDataSourceKeyAttributeKeyPairs) => {
	const geometries = spatialData.getGeometriesByDataSourceKey(dataSourceKey);
	let attributesByDataSourceKey = null;

	if (attributeDataSourceKeyAttributeKeyPairs) {
		attributesByDataSourceKey = attributeData.getDataByDataSourceKeys(Object.keys(attributeDataSourceKeyAttributeKeyPairs));
	}

	if (geometries) {
		return _.map(geometries, (geometry, key) => {
			let properties = {
				[fidColumnName]: key // TODO fix dependency on this in ptr-maps
			}

			if (attributesByDataSourceKey) {
				_.forIn(attributesByDataSourceKey, (features, attributeDataSourceKey) => {
					const attributeValue = features[key];
					if (attributeValue) {
						properties[attributeDataSourceKeyAttributeKeyPairs[attributeDataSourceKey]] = attributeValue;
					}
				});
			}

			return {
				type: "Feature",
				key,
				geometry,
				properties
			}
		});
	} else {
		return null;
	}
});

export default {
	getFeatures,

    attributeData,
    attributeDataSources,
    attributeRelations,
    spatialData,
    spatialDataSources,
    spatialRelations
}