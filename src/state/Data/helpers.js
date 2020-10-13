export const getMissingTiles = (indexes = [], filter) => {
    if(filter && filter.tiles && indexes) {
        const loadedTiles = indexes.reduce((loaded, index) => {
            if(filter.tiles.find(tile => index.tile === `${tile[0]},${tile[1]}`)) {
                return [...loaded, index.tile];
            } else {
                return loaded;
            }
        }, []);
    
        const missingTiles = filter.tiles.filter(tile => !loadedTiles.includes(`${tile[0]},${tile[1]}`));
        return missingTiles;
    } else {
        return null;
    }

}