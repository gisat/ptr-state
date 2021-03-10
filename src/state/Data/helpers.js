import {
	isArray as _isArray,
	isFinite as _isFinite,
	reduce as _reduce,
} from 'lodash';

import {configDefaults} from '@gisatcz/ptr-core';

/**
 * Returns string representing given tile
 * @param {Array|string} tile
 * @returns {string}
 */
export const tileAsString = tile => {
	if (typeof tile === 'string') {
		return tile;
	} else if (_isArray(tile)) {
		const arrTile = tileAsArray(tile);
		if (arrTile) {
			return arrTile.join(',');
		} else {
			return null;
		}
	}
};

/**
 * Converts tile as a string to array
 * @param {Array|string} tile
 * @returns {Array} Tile defined by Numbers in array
 */
export const tileAsArray = tile => {
	if (
		typeof tile === 'string' &&
		tile.split(',').length > 1 &&
		tile.split(',').every(i => _isFinite(parseFloat(i)))
	) {
		return tile.split(',').map(parseFloat);
	} else if (
		_isArray(tile) &&
		tile.length !== 1 &&
		tile.every(i => _isFinite(parseFloat(i)))
	) {
		return tile.map(parseFloat);
	} else if (_isArray(tile) && tile.length === 1) {
		return tileAsArray(tile[0]);
	} else {
		return null;
	}
};

/**
 * Compare wanted tiles from filter with already loaded or loading tiles and give array of missing tiles in string format
 * @param {Object} index Already loaded index
 * @param {Object} filter Required filter
 * @param {Array.<string|Array.<number>>} filter.tiles
 * @param {number} filter.level
 * @returns {Array?} Array of missing tiles in string format
 */
export const getMissingTiles = (index, filter) => {
	if (index && index.index && filter && _isArray(filter.tiles)) {
		//index contains level
		if (index.index?.[filter.level]) {
			const loadedTilesInIndex = _reduce(
				index.index[filter.level],
				(acc, tileData, tileKey) => {
					//tileData === true means it is loading, so we mark them as not missing
					if (tileData) {
						//re-save tile as array to prevent negative zero
						return [...acc, tileAsArray(tileKey).join(',')];
					} else {
						return acc;
					}
				},
				[]
			);

			const missingTiles = filter.tiles
				.filter(tile => !loadedTilesInIndex.includes(tileAsString(tile)))
				.map(tile => tileAsString(tile));
			return missingTiles;
		} else {
			// no data for requested level
			// all tiles are missing
			return filter.tiles.map(tile => tileAsString(tile));
		}
	} else {
		if (_isArray(filter?.tiles)) {
			// all tiles are missing
			return filter.tiles.map(tile => tileAsString(tile));
		} else {
			//filter is not defined
			return null;
		}
	}
};

/**
 * Central method for getting PAGE_SIZE from state or configDefaults.
 * @param {Object} localConfig Configuration with overrides
 * @return {Number}
 */
export function getPageSize(localConfig) {
	const PAGE_SIZE =
		localConfig?.requestPageSize || configDefaults.requestPageSize;
	return PAGE_SIZE;
}
