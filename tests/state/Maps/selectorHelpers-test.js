import {assert} from 'chai';
import selectorHelpers from "../../../src/state/Maps/selectorHelpers";
import testHelpers from "../../helpers";

import {mapConstants} from "@gisatcz/ptr-core";

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

    describe('mergeBackgroundLayerWithLayers', function () {
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
            assert.deepStrictEqual(selectorHelpers.mergeBackgroundLayerWithLayers(backgroundLayer, layers), expectedResult);
        });

        testHelpers.testCache(selectorHelpers.mergeBackgroundLayerWithLayers, [backgroundLayer, layers], expectedResult);

        it('should return null, if both backgroundLayer and layers are null', () => {
            // check structure
            assert.isNull(selectorHelpers.mergeBackgroundLayerWithLayers(null, null));
        });

        it('should return layer with one item, if layers are null, but backgroundLayer', () => {
            // check structure
            assert.deepStrictEqual(selectorHelpers.mergeBackgroundLayerWithLayers(backgroundLayer), [expectedResult[0]]);
        });
    });

    describe('getView', function () {
        const defaultView = mapConstants.defaultMapView;

        it('should merge map view with set view', () => {
            const map = {
                key: "map1",
                data: {
                    view: {
                        center: {
                            lat: 50,
                            lon: 15
                        }
                    }
                }
            };

            const set = {
                maps: ["map1"],
                sync: {
                    boxRange: true
                },
                data: {
                    view: {
                        boxRange: 5000
                    }
                }
            }



            const expectedResult = {...defaultView, ...{
                    center: {
                        lat: 50,
                        lon: 15
                    },
                    boxRange: 5000
                }
            };

            const output = selectorHelpers.getView(map, set);
            assert.deepStrictEqual(output, expectedResult);
        });

        it('should use set boxRange, if the param is synced', () => {
            const map = {
                key: "map1",
                data: {
                    view: {
                        center: {
                            lat: 50,
                            lon: 15
                        },
                        boxRange: 1000
                    }
                }
            };

            const set = {
                maps: ["map1"],
                sync: {
                    boxRange: true
                },
                data: {
                    view: {
                        boxRange: 5000
                    }
                }
            }



            const expectedResult = {...defaultView, ...{
                    center: {
                        lat: 50,
                        lon: 15
                    },
                    boxRange: 5000
                }
            };

            const output = selectorHelpers.getView(map, set);
            assert.deepStrictEqual(output, expectedResult);
        });

        it('should not  use set boxRange, if a param is not synced', () => {
            const map = {
                key: "map1",
                data: {
                    view: {
                        center: {
                            lat: 50,
                            lon: 15
                        },
                        boxRange: 1000,
                    }
                }
            };

            const set = {
                maps: ["map1"],
                data: {
                    view: {
                        boxRange: 5000
                    }
                }
            }



            const expectedResult = {...defaultView, ...{
                    center: {
                        lat: 50,
                        lon: 15
                    },
                    boxRange: 1000
                }
            };

            const output = selectorHelpers.getView(map, set);
            assert.deepStrictEqual(output, expectedResult);
        });

        it('should return map view, if set is not defined', () => {
            const map = {
                key: "map1",
                data: {
                    view: {
                        center: {
                            lat: 50,
                            lon: 15
                        }
                    }
                }
            };

            const expectedResult = {...defaultView, ...{
                    center: {
                        lat: 50,
                        lon: 15
                    }
                }
            };

            const output = selectorHelpers.getView(map, null);
            assert.deepStrictEqual(output, expectedResult);
        });

        it('should return map view, if map is not defined', () => {
            const set = {
                maps: ["mapXYZ"],
                data: {
                    view: {
                        boxRange: 5000
                    }
                }
            }

            const output = selectorHelpers.getView(null, null);
            assert.isNull(output);

            const output2 = selectorHelpers.getView(null, set);
            assert.isNull(output2);
        });

        it('should return set view, if view is not defined & param is synced', () => {
            const map = {
                key: "map1",
                data: {
                    view: null
                }
            };

            const set = {
                maps: ["mapXYZ"],
                sync: {
                    boxRange: true
                },
                data: {
                    view: {
                        boxRange: 5000
                    }
                }
            }



            const expectedResult = {...defaultView, ...{
                    boxRange: 5000
                }
            };

            const output = selectorHelpers.getView(map, set);
            assert.deepStrictEqual(output, expectedResult);
        });
    });

});
