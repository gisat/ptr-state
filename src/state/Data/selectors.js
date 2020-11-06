import {createSelector as createRecomputeSelector} from '@jvitela/recompute';

import attributeRelations from './AttributeRelations/selectors';
import attributeDataSources from './AttributeDataSources/selectors';
import attributeData from './AttributeData/selectors';
import spatialRelations from './SpatialRelations/selectors';
import spatialDataSources from './SpatialDataSources/selectors';
import spatialData from './SpatialData/selectors';
import {CacheFifo} from '@gisatcz/ptr-utils';
import _ from 'lodash';
import mapHelpers from '../_deprecatedMaps/helpers';

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

const getTile = createRecomputeSelector((spatialDataSourceKey, fidColumnName, level, tile) => {
	const geometries = spatialData.getGeometriesByDataSourceKey(spatialDataSourceKey); // TODO here or pass as parameter?

	const tileAsString = `${tile[0]},${tile[1]}`;
	const filter = {
		spatialDataSourceKey,
		tile: tileAsString,
		level
	};
	const index = spatialData.getIndexByFilter(filter);

	const cacheKey = JSON.stringify(index); // TODO is index enough as cache key?
	const cache = tilesCache.findByKey(cacheKey);
	if (cache) {
		return cache.data;
	} else {
		let features = null;

		if (index?.index?.length) {
			const featureKeys = Object.values(index.index);
			if (featureKeys.length) {
				features = featureKeys.map(key => {
					let properties = {
						[fidColumnName]: key
					}

					return {
						type: "Feature",
						key,
						geometry: geometries[key], // TODO what if some geometries is missing
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
		} else {
			return null;
		}
	}
});

const getTiles = createRecomputeSelector((dataSourceKey, fidColumnName, level, tiles) => {
	if (tiles?.length) {
		let populatedTiles = [];
		_.forEach(tiles, tile => {
			const populatedTile = getTile(dataSourceKey, fidColumnName, level, tile);
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