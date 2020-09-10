import {createSelector} from 'reselect';
import createCachedSelector from "re-reselect";
import _ from 'lodash';

/* === HELPERS ======================================================================= */

/**
 * Get background layer in 'layer' format
 */
const getBackgroundLayerAsLayer = createCachedSelector(
    [
        (backgroundLayer) => backgroundLayer
    ],
    (backgroundLayer) => {
        if (backgroundLayer) {
            return {...backgroundLayer, key: 'pantherBackgroundLayer'};
        } else {
            return null;
        }
    }
)(backgroundLayer => JSON.stringify(backgroundLayer));


/**
 * Merge background layer definition with layers to one collection
 */
const mergeBackgroundLayerWithLayer = createCachedSelector(
    [
        (backgroundLayer) => getBackgroundLayerAsLayer(backgroundLayer),
        (backgroundLayer, layers) => layers
    ],
    (backgroundLayer, layers) => {
        let finalLayers = null;

        if (layers) {
            finalLayers = layers || [];
        }

        if (backgroundLayer) {
            finalLayers = [backgroundLayer, ...finalLayers];
        }

        return finalLayers;
    }
)((backgroundLayer, layer) => `${backgroundLayer}_${layer}`);

export default {
    getBackgroundLayerAsLayer,
    mergeBackgroundLayerWithLayer
}