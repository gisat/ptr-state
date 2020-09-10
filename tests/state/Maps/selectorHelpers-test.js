import {assert} from 'chai';
import selectorHelpers from "../../../src/state/Maps/selectorHelpers";
import testHelpers from "../../helpers";

describe('state/Maps/selectorHelpers', function () {
    describe('getBackgroundLayerAsLayer', function () {
        const backgroundLayer = {
            layerTemplateKey: "layerTemplate-uuid"
        };

        const expectedResult = {
            key: "pantherBackgroundLayer",
            layerTemplateKey: "layerTemplate-uuid"
        };

        it('should return backgroundLayer as layer', () => {
            // check structure
            assert.deepStrictEqual(selectorHelpers.getBackgroundLayerAsLayer(backgroundLayer), expectedResult);
        });

        testHelpers.testCache(selectorHelpers.getBackgroundLayerAsLayer, [backgroundLayer], expectedResult);
    });

    describe('mergeBackgroundLayerWithLayer', function () {
        const backgroundLayer = {
            layerTemplateKey: "layerTemplate-uuid"
        };

        const layers = [
            {
                key: "layer-1",
                metadataModifiers: {
                    caseKey: "case-1"
                }
            }
        ];

        const expectedResult = [
            {
                key: "pantherBackgroundLayer",
                layerTemplateKey: "layerTemplate-uuid"
            },
            {
                key: "layer-1",
                metadataModifiers: {
                    caseKey: "case-1"
                }
            }
        ];

        it('should return merged layers', () => {
            // check structure
            assert.deepStrictEqual(selectorHelpers.mergeBackgroundLayerWithLayer(backgroundLayer, layers), expectedResult);
        });

        testHelpers.testCache(selectorHelpers.mergeBackgroundLayerWithLayer, [backgroundLayer, layers], expectedResult);
    });
});
