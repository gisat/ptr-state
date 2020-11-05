export const getMissingTiles = (index, filter) => {
    if(filter && filter.tiles && index) {
        let loadedTiles = [];
        if(filter.tiles.find(tile => index.tile === `${tile[0]},${tile[1]}`)) {
            loadedTiles = [index.tile];
        };

        const missingTiles = filter.tiles.filter(tile => !loadedTiles.includes(`${tile[0]},${tile[1]}`));
        return missingTiles;
    } else {
        return null;
    }

}