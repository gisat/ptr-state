import {createSelector as createRecomputeSelector} from '@jvitela/recompute';

import attributeRelations from './AttributeRelations/selectors';
import attributeDataSources from './AttributeDataSources/selectors';
import attributeData from './AttributeData/selectors';
import spatialRelations from './SpatialRelations/selectors';
import spatialDataSources from './SpatialDataSources/selectors';
import spatialData from './SpatialData/selectors';
import {CacheFifo} from '@gisatcz/ptr-utils';
import _ from 'lodash';

let tilesCache = new CacheFifo(1000);

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

const getTile = createRecomputeSelector((spatialDataSourceKey, fidColumnName, level, tile, spatialRelationsFilter, attributeRelationsFilter, attributeDataSourceKeyAttributeKeyPairs, styleKey) => {
	const spatialDataForDataSource = spatialData.getByDataSourceKeyObserver(spatialDataSourceKey); // TODO here or pass as parameter?

	if (spatialDataForDataSource) {
		const tileAsString = `${tile[0]},${tile[1]}`;
		const cacheParams = {
			attributeRelationsFilter,
			spatialRelationsFilter, 
			level,
			tileAsString,
			spatialDataSourceKey,
			styleKey
		};
		const indexedFeatureKeys = spatialData.getIndexedFeatureKeys(cacheParams['spatialRelationsFilter'], cacheParams['level'], cacheParams['tileAsString'], cacheParams['spatialDataSourceKey']);
		const indexedFeatureKeysByAttributeDataSourceKeys = attributeData.getIndexedFeatureKeysByDataSourceKeys(cacheParams['attributeRelationsFilter'], cacheParams['level'], cacheParams['tileAsString']);
		const cacheKey = JSON.stringify({cacheParams, indexedFeatureKeys, indexedFeatureKeysByAttributeDataSourceKeys}); // TODO is index enough as cache key?
		const cache = tilesCache.findByKey(cacheKey);
		if (cache) {
			return cache.data;
		} else {
			let features = null;
			if (indexedFeatureKeys?.length) {
				features = indexedFeatureKeys.map(key => {
					let properties = {
						[fidColumnName]: key
					}

					// TODO what if some geometries is missing
					const geometry = spatialDataForDataSource[key]?.geometry || spatialDataForDataSource[key]?.geometries[level];

					if (attributeDataSourceKeyAttributeKeyPairs) {
						const attributes = attributeData.getAttributesByDataSourceKeysByFeatureKey(attributeDataSourceKeyAttributeKeyPairs, key);
						if (attributes) {
							properties = {...properties, ...attributes};
						}
					}

					return {
						type: "Feature",
						key,
						geometry,
						properties
					}
				});

				const data = {
					features,
					tile: tileAsString,
					level
				};

				tilesCache.addOrUpdate({
					cacheKey,
					data
				});

				return data;
			} else {
				return null;
			}
		}
	} else {
		return null;
	}
});

const getTiles = createRecomputeSelector((dataSourceKey, fidColumnName, level, tiles, spatialRelationsFilter, attributeRelationsFilter, attributeDataSourceKeyAttributeKeyPairs, styleKey) => {
	if (tiles?.length) {
		let populatedTiles = [];
		_.forEach(tiles, tile => {
			const populatedTile = getTile(dataSourceKey, fidColumnName, level, tile, spatialRelationsFilter, attributeRelationsFilter, attributeDataSourceKeyAttributeKeyPairs, styleKey);
			if (populatedTile) {
				populatedTiles.push(populatedTile);
			}
		});

		return populatedTiles.length ? populatedTiles : null;
	} else {
		return null;
	}
});

export default {
	getFeatures,
	getTiles,

    attributeData,
    attributeDataSources,
    attributeRelations,
    spatialData,
    spatialDataSources,
    spatialRelations
}