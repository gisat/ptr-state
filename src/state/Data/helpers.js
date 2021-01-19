/**
 * Returns string representing given tile
 * @param {Array|string} tile 
 * @returns {string}
 */
export const tileAsString = (tile) => {
    if(typeof tile === 'string') {
        return tile;
    } else {
        return `${tile[0]},${tile[1]}`;
    }
}

/**
 * Compare wanted tiles from filter with already loaded or loading tiles and give array of missing tiles
 * @param {Object} index Already loaded index
 * @param {Object} filter Required filter
 * @param {Array.<string|Array.<number>>} filter.tiles
 * @param {number} filter.level
 */
export const getMissingTiles = (index, filter) => {
    if(index && index.index && filter) {
        if(index?.index[filter.level] && filter && filter.tiles) {
            const loadedTilesInIndex = Object.entries(index.index[filter.level]).reduce((acc, tile) => {
                const tileKey = tile[0];
                const tileData = tile[1];
                //tileData === true means it is loading, so we mark them as not missing
                if(tileData) {
                    return [...acc, tileKey];
                } else {
                    return acc;
                }
            }, [])
            
            const missingTiles = filter.tiles.filter(tile => !loadedTilesInIndex.includes(tileAsString(tile)));
            return missingTiles;
        } else {
            // no data for requested level
            // all tiles are missing 
            return filter.tiles.map(tile => tileAsString(tile));
        }
    } else {
        if(filter?.tiles) {
            // all tiles are missing 
            return filter.tiles.map(tile => tileAsString(tile));
        } else {
            //filter is not defined
            return null;
        }
    }

}