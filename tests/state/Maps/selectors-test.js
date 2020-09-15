import {assert} from 'chai';
import Select from "../../../src/state/Select";
import testHelpers from "../../helpers";
import {createSelector} from "reselect";
import _ from "lodash";
import {mapConstants} from "@gisatcz/ptr-core";

describe('state/Maps/selectors', function () {
    const state = {
        maps: {
            maps: {
                map1: {
                    key: "map1",
                    name: "Map 1",
                    data: {
                        backgroundLayer: {
                            layerTemplateKey: "layerTemplateBackground"
                        },
                        layers: [
                            {
                                key: "layer1",
                                name: "Layer 1",
                                layerTemplateKey: "layerTemplate1",
                                styleKey: "style1",
                                metadataModifiers: {
                                    placeKey: "place1",
                                    scenarioKeys: ["scenario1", "scenario2"]
                                },
                                filterByActive: {
                                    place: true,
                                    layerTemplateKey: true,
                                    applicationKey: true
                                }
                            }, {
                                key: "layerDefinition1",
                                name: "Layer with definitions",
                                type: "vector",
                                options: {
                                    features: [],
                                    style: {
                                        styles: [{
                                            fill: "#ff0000"
                                        }]
                                    }
                                }
                            }
                        ],
                        metadataModifiers: null,
                        filterByActive: {
                            period: true
                        },
                        view: {
                            boxRange: 500000,
                            center: {
                                lat: 49,
                                lon: 10
                            }
                        }
                    }
                },
                map2: {
                    key: "map2",
                    name: "Map 2",
                    data: {
                        backgroundLayer: null,
                        layers: [
                            {
                                key: "layer3",
                                name: "Layer 3",
                                layerTemplateKey: "layerTemplate3",
                                styleKey: "style3",
                                metadataModifiers: {
                                    placeKey: "place2"
                                }
                            }
                        ],
                        view: {
                            boxRange: 1000000
                        },
                        metadataModifiers: {
                            periodKey: "period2"
                        }
                    }
                }
            },
            sets: {
                set1: {
                    key: "set1",
                    activeMapKey: "map1",
                    maps: ["map1", "map2"],
                    sync: {center: true},
                    data: {
                        backgroundLayer: {
                            type: "wmts",
                            options: {
                                url: "http://backgroundLayer.no"
                            }
                        },
                        layers: [
                            {
                                key: "layer2",
                                layerTemplateKey: "layerTemplate2",
                                metadataModifiers: {
                                    periodKey: "period1"
                                }
                            }
                        ],
                        metadataModifiers: {
                            scopeKey: "scope1"
                        },
                        filterByActive: null,
                        view: {
                            center: {
                                lat: 50,
                                lon: 10
                            }
                        },
                        viewLimits: [500, 500000]
                    }
                }
            }
        }
    };

    describe('getMapByKey', function () {
        it('should return data for given mapKey, if map exists', () => {
            const expectedResult = state.maps.maps.map1;
            const output = Select.maps.getMapByKey(state, "map1");
            assert.deepStrictEqual(output, expectedResult);
        });

        it('should return null, if map does not exist', () => {
            const output = Select.maps.getMapByKey(state, "mapXYZ");
            assert.isNull(output);
        });
    });

    describe('getMapSets', function () {
        it('should return collection of all existing map sets', () => {
            const expectedResult = Object.values(state.maps.sets);
            const output = Select.maps.getMapSets(state);
            assert.deepStrictEqual(output, expectedResult);
        });

        it('should return null, if no sets exist', () => {
            const output = Select.maps.getMapSets({...state, maps: {...state.maps, sets: null}});
            assert.isNull(output);
        });
    });

    describe('getMapSetByMapKey', function () {
        it('should return data of the map set for given mapKey, if map exists', () => {
            const expectedResult = state.maps.sets.set1;
            const output = Select.maps.getMapSetByMapKey(state, "map1");
            assert.deepStrictEqual(output, expectedResult);
        });

        it('should return null, if no sets exist', () => {
            const output = Select.maps.getMapSetByMapKey({...state, maps: {...state.maps, sets: null}}, "map1");
            assert.isNull(output);
        });

        it('should return null, if map set for given map key does not exist', () => {
            const output = Select.maps.getMapSetByMapKey(state, "mapXYZ");
            assert.isNull(output);
        });
    });

    describe('getMapSetByKey', function () {
        it('should return data for given setKey, if set exists', () => {
            const expectedResult = state.maps.sets.set1;
            const output = Select.maps.getMapSetByKey(state, "set1");
            assert.deepStrictEqual(output, expectedResult);
        });

        it('should return null, if map does not exist', () => {
            const output = Select.maps.getMapSetByKey(state, "setXYZ");
            assert.isNull(output);
        });
    });

    describe('getMapSetActiveMapKey', function () {
        it('should return data active map key, if it is defined in map set', () => {
            const expectedResult = state.maps.sets.set1.activeMapKey;
            const output = Select.maps.getMapSetActiveMapKey(state, "set1");
            assert.deepStrictEqual(output, expectedResult);
        });

        it('should return global map key, if map set does not have active key, but map exists in given map set', () => {
            const updatedState = {
                ...state,
                maps: {
                    ...state.maps,
                    activeMapKey: "map2",
                    sets: {
                        ...state.maps.sets,
                        set1: {
                            ...state.maps.sets.set1,
                            activeMapKey: null
                        }
                    }
                }
            }
            const output = Select.maps.getMapSetActiveMapKey(updatedState, "set1");
            assert.deepStrictEqual(output, "map2");
        });

        it('should return null if map set does not exist', () => {
            const output = Select.maps.getMapSetActiveMapKey(state, "setXYZ");
            assert.isNull(output);
        });
    });

    describe('getMapSetActiveMapView', function () {
        it('should return data active map view and omit synced view params', () => {
            const expectedResult = {
                center: {
                    lat: 50,
                    lon: 10
                },
                boxRange: 500000,
                heading: 0,
                tilt: 0,
                roll: 0
            };
            const output = Select.maps.getMapSetActiveMapView(state, "set1");
            assert.deepStrictEqual(output, expectedResult);
        });

        it('should return data active map view and omit synced view params 2', () => {
            const updatedState = {
                ...state,
                maps: {
                    ...state.maps,
                    sets: {
                        ...state.maps.sets,
                        set1: {
                            ...state.maps.sets.set1,
                            data: {
                                ...state.maps.sets.set1.data,
                                view: {
                                    ...state.maps.sets.set1.data.view,
                                    heading: 1
                                }
                            }
                        }
                    },
                    maps: {
                        ...state.maps.maps,
                        map1: {
                            ...state.maps.maps.map1,
                            data: {
                                ...state.maps.maps.map1.data,
                                view: {
                                    ...state.maps.maps.map1.data.view,
                                    heading: 0.5
                                }
                            }
                        }
                    }
                }
            }

            const expectedResult = {
                center: {
                    lat: 50,
                    lon: 10
                },
                boxRange: 500000,
                heading: 0.5,
                tilt: 0,
                roll: 0
            };
            const output = Select.maps.getMapSetActiveMapView(updatedState, "set1");
            assert.deepStrictEqual(output, expectedResult);
        });
    });

    describe('getMapSetMapKeys', function () {
        it('should return map set keys for given setKey, if set exists', () => {
            const expectedResult = state.maps.sets.set1.maps;
            const output = Select.maps.getMapSetMapKeys(state, "set1");
            assert.deepStrictEqual(output, expectedResult);
        });

        it('should return null, maps is empty array', () => {
            const updatedState = {
                ...state,
                maps: {
                    ...state.maps,
                    sets: {
                        ...state.maps.sets,
                        set1: {
                            ...state.maps.sets.set1,
                            maps: []
                        }
                    },
                }
            };
            const output = Select.maps.getMapSetMapKeys(updatedState, "set1");
            assert.isNull(output);
        });

        it('should return null, map set does not exist', () => {
            const output = Select.maps.getMapSetMapKeys(state, "setXYZ");
            assert.isNull(output);
        });
    });

    describe('getMapSetView', function () {
        it('should return map set view for given setKey, if set exists', () => {
            const expectedResult = {...mapConstants.defaultMapView, ...state.maps.sets.set1.data.view};
            const output = Select.maps.getMapSetView(state, "set1");
            assert.deepStrictEqual(output, expectedResult);
        });

        it('should return null, map set does not exist', () => {
            const output = Select.maps.getMapSetView(state, "setXYZ");
            assert.isNull(output);
        });
    });

    describe('getMapSetViewLimits', function () {
        it('should return map set view limits for given setKey, if set exists', () => {
            const expectedResult = state.maps.sets.set1.data.viewLimits;
            const output = Select.maps.getMapSetViewLimits(state, "set1");
            assert.deepStrictEqual(output, expectedResult);
        });

        it('should return null, map set does not exist', () => {
            const output = Select.maps.getMapSetViewLimits(state, "setXYZ");
            assert.isNull(output);
        });
    });

    describe('getMapBackgroundLayerStateByMapKey', function () {
        it('should return backgroundLayer data', () => {
            const expectedResult = {
                layerTemplateKey: "layerTemplateBackground"
            };
            const output = Select.maps.getMapBackgroundLayerStateByMapKey(state, "map1");
            assert.deepStrictEqual(output, expectedResult);
        });

        it('should return null, if no background layer data exist', () => {
            const output = Select.maps.getMapBackgroundLayerStateByMapKey({...state,
                maps: {
                    ...state.maps,
                    maps: {
                        ...state.maps.maps,
                        map1: {
                            ...state.maps.maps.map1,
                            data: {
                                ...state.maps.maps.map1.data,
                                backgroundLayer: null
                            }
                        }
                    }
                }
            }, "map1");
            assert.isNull(output);
        });
    });

    describe('getMapLayersStateByMapKey', function () {
        it('should return layers data', () => {
            const expectedResult = state.maps.maps.map1.data.layers;
            const output = Select.maps.getMapLayersStateByMapKey(state, "map1");
            assert.deepStrictEqual(output, expectedResult);
        });

        it('should return null, if no layers exist', () => {
            const output = Select.maps.getMapLayersStateByMapKey({...state,
                maps: {
                    ...state.maps,
                    maps: {
                        ...state.maps.maps,
                        map1: {
                            ...state.maps.maps.map1,
                            data: {
                                ...state.maps.maps.map1.data,
                                layers: null
                            }
                        }
                    }
                }
            }, "map1");
            assert.isNull(output);
        });
    });

    describe('getMapSetBackgroundLayerStateByMapKey', function () {
        it('should return backgroundLayer data', () => {
            const expectedResult = {
                type: "wmts",
                options: {
                    url: "http://backgroundLayer.no"
                }
            };
            const output = Select.maps.getMapSetBackgroundLayerStateByMapKey(state, "map1");
            assert.deepStrictEqual(output, expectedResult);
        });

        it('should return null, if no background layer data exist', () => {
            const output = Select.maps.getMapSetBackgroundLayerStateByMapKey({...state,
                maps: {
                    ...state.maps,
                    sets: {
                        ...state.maps.sets,
                        set1: {
                            ...state.maps.sets.set1,
                            data: {
                                ...state.maps.sets.set1.data,
                                backgroundLayer: null
                            }
                        }
                    }
                }
            }, "map1");
            assert.isNull(output);
        });
    });

    describe('getMapSetLayersStateByMapKey', function () {
        it('should return layers data', () => {
            const expectedResult = state.maps.sets.set1.data.layers;
            const output = Select.maps.getMapSetLayersStateByMapKey(state, "map1");
            assert.deepStrictEqual(output, expectedResult);
        });

        it('should return null, if no layers exist', () => {
            const output = Select.maps.getMapSetLayersStateByMapKey({...state,
                maps: {
                    ...state.maps,
                    sets: {
                        ...state.maps.sets,
                        set1: {
                            ...state.maps.sets.set1,
                            data: {
                                ...state.maps.sets.set1.data,
                                layers: null
                            }
                        }
                    }
                }
            }, "map1");
            assert.isNull(output);
        });
    });

    describe('getMapMetadataModifiersByMapKey', function () {
        it('should return metadata modifiers', () => {
            const expectedResult = {
                periodKey: "period2"
            };
            const output = Select.maps.getMapMetadataModifiersByMapKey(state, "map2");
            assert.deepStrictEqual(output, expectedResult);
        });

        it('should return null, if no layers exist', () => {
            const output = Select.maps.getMapMetadataModifiersByMapKey(state, "map1");
            assert.isNull(output);
        });
    });

    describe('getMapSetMetadataModifiersByMapKey', function () {
        it('should return metadata modifiers', () => {
            const expectedResult = {
                scopeKey: "scope1"
            };
            const output = Select.maps.getMapSetMetadataModifiersByMapKey(state, "map1");
            assert.deepStrictEqual(output, expectedResult);
        });

        it('should return null, if no metadata modifiers exist', () => {
            const output = Select.maps.getMapSetMetadataModifiersByMapKey({...state,
                maps: {
                    ...state.maps,
                    sets: {
                        ...state.maps.sets,
                        set1: {
                            ...state.maps.sets.set1,
                            data: {
                                ...state.maps.sets.set1.data,
                                metadataModifiers: null
                            }
                        }
                    }
                }
            }, "map1");
            assert.isNull(output);
        });
    });

    describe('getMetadataModifiersByMapKey', function () {
        it('should return merged map modifiers', () => {
            const expectedResult = {
                scopeKey: "scope1",
                periodKey: "period2"
            };
            const output = Select.maps.getMetadataModifiersByMapKey(state, "map2");
            assert.deepStrictEqual(output, expectedResult);
        });

        it('should return map set modifiers, if map modifiers does not exist', () => {
            const expectedResult = {
                scopeKey: "scope1"
            };
            const output = Select.maps.getMetadataModifiersByMapKey(state, "map1");
            assert.deepStrictEqual(output, expectedResult);
        });

        it('should return null, if no modifiers exist', () => {
            const output = Select.maps.getMetadataModifiersByMapKey(state, "map3");
            assert.isNull(output);
        });

        testHelpers.testCache(Select.maps.getMetadataModifiersByMapKey, [state, "map2"], {
            scopeKey: "scope1",
            periodKey: "period2"
        }, [state, "map2"]);
    });

    describe('getMapFilterByActiveByMapKey', function () {
        it('should return filter by active', () => {
            const expectedResult = {
                period: true
            };
            const output = Select.maps.getMapFilterByActiveByMapKey(state, "map1");
            assert.deepStrictEqual(output, expectedResult);
        });

        it('should return null, if no filter by active exists', () => {
            const output = Select.maps.getMapFilterByActiveByMapKey(state, "map2");
            assert.isNull(output);
        });
    });

    describe('getMapSetFilterByActiveByMapKey', function () {
        it('should return filter by active', () => {
            const expectedResult = {
                period: true
            };
            const output = Select.maps.getMapSetFilterByActiveByMapKey({...state,
                maps: {
                    ...state.maps,
                    sets: {
                        ...state.maps.sets,
                        set1: {
                            ...state.maps.sets.set1,
                            data: {
                                ...state.maps.sets.set1.data,
                                filterByActive: {
                                    period: true
                                }
                            }
                        }
                    }
                }
            }, "map1");
            assert.deepStrictEqual(output, expectedResult);
        });

        it('should return null, if no filter by active exists', () => {
            const output = Select.maps.getMapSetFilterByActiveByMapKey(state, "map2");
            assert.isNull(output);
        });
    });

    describe('getFilterByActiveByMapKey', function () {
        it('should return merged filter by active', () => {
            const expectedResult = {
                period: true
            };
            const output = Select.maps.getFilterByActiveByMapKey(state, "map1");
            assert.deepStrictEqual(output, expectedResult);
        });

        testHelpers.testCache(Select.maps.getFilterByActiveByMapKey, [state, "map1"], {
            period: true
        });

        it('should return null, if no modifiers exist', () => {
            const output = Select.maps.getFilterByActiveByMapKey(state, "map2");
            assert.isNull(output);
        });
    });

    describe('getBackgroundLayerStateByMapKey', function () {
        it('should return map background layer', () => {
            const expectedResult = {
                layerTemplateKey: "layerTemplateBackground"
            };
            const output = Select.maps.getBackgroundLayerStateByMapKey(state, "map1");
            assert.deepStrictEqual(output, expectedResult);
        });

        it('should return map set background layer', () => {
            const expectedResult = {
                type: "wmts",
                options: {
                    url: "http://backgroundLayer.no"
                }
            };
            const output = Select.maps.getBackgroundLayerStateByMapKey(state, "map2");
            assert.deepStrictEqual(output, expectedResult);
        });

        it('should return null', () => {
            const output = Select.maps.getBackgroundLayerStateByMapKey(state, "map3");
            assert.isNull(output);
        });
    });

    describe('getMapSetLayersStateByMapKeyWithModifiers', function () {
        const expectedResult = [
            {
                key: "layer2",
                layerTemplateKey: "layerTemplate2",
                metadataModifiers: {
                    periodKey: "period1",
                    scopeKey: "scope1"
                },
                filterByActive: null
            }
        ];

        it('should return map set layers for map 1', () => {
            const output = Select.maps.getMapSetLayersStateByMapKeyWithModifiers(state, "map1");
            assert.deepStrictEqual(output, expectedResult);
        });

        testHelpers.testCache(Select.maps.getMapSetLayersStateByMapKeyWithModifiers, [state, "map1"], expectedResult);
    });

    describe('getMapLayersStateByMapKeyWithModifiers', function () {
        const expectedResult = [
            {
                key: "layer1",
                name: "Layer 1",
                layerTemplateKey: "layerTemplate1",
                styleKey: "style1",
                metadataModifiers: {
                    placeKey: "place1",
                    scopeKey: "scope1",
                    scenarioKeys: ["scenario1", "scenario2"]
                },
                filterByActive: {
                    place: true,
                    period: true,
                    layerTemplateKey: true,
                    applicationKey: true
                }
            }, {
                key: "layerDefinition1",
                name: "Layer with definitions",
                type: "vector",
                options: {
                    features: [],
                    style: {
                        styles: [{
                            fill: "#ff0000"
                        }]
                    }
                },
                filterByActive: {
                    period: true
                },
                metadataModifiers: {
                    scopeKey: "scope1"
                }
            }
        ];

        it('should return map layers for map 1', () => {
            const output = Select.maps.getMapLayersStateByMapKeyWithModifiers(state, "map1");
            assert.deepStrictEqual(output, expectedResult);
        });

        testHelpers.testCache(Select.maps.getMapLayersStateByMapKeyWithModifiers, [state, "map1"], expectedResult);
    });

    describe('getLayersStateByMapKey', function () {
        const expectedResult = [
            {
                key: "layer2",
                layerTemplateKey: "layerTemplate2",
                metadataModifiers: {
                    periodKey: "period1",
                    scopeKey: "scope1"
                },
                filterByActive: null
            },
            {
                key: "layer1",
                name: "Layer 1",
                layerTemplateKey: "layerTemplate1",
                styleKey: "style1",
                metadataModifiers: {
                    placeKey: "place1",
                    scopeKey: "scope1",
                    scenarioKeys: ["scenario1", "scenario2"]
                },
                filterByActive: {
                    place: true,
                    period: true,
                    layerTemplateKey: true,
                    applicationKey: true
                }
            }, {
                key: "layerDefinition1",
                name: "Layer with definitions",
                type: "vector",
                options: {
                    features: [],
                    style: {
                        styles: [{
                            fill: "#ff0000"
                        }]
                    }
                },
                filterByActive: {
                    period: true
                },
                metadataModifiers: {
                    scopeKey: "scope1"
                }
            }
        ];

        const expectedResult2 = [
            {
                key: "layer2",
                layerTemplateKey: "layerTemplate2",
                metadataModifiers: {
                    periodKey: "period1",
                    scopeKey: "scope1"
                },
                filterByActive: null
            },
            {
                key: "layer3",
                name: "Layer 3",
                layerTemplateKey: "layerTemplate3",
                styleKey: "style3",
                metadataModifiers: {
                    placeKey: "place2",
                    periodKey: "period2",
                    scopeKey: "scope1"
                },
                filterByActive: null
            }
        ];

        it('should return map layers for map 1', () => {
            const output = Select.maps.getLayersStateByMapKey(state, "map1");
            assert.deepStrictEqual(output, expectedResult);
        });

        it('should return map layers for map 2', () => {
            const output = Select.maps.getLayersStateByMapKey(state, "map2");
            assert.deepStrictEqual(output, expectedResult2);
        });

        testHelpers.testCache(Select.maps.getLayersStateByMapKey, [state, "map1"], expectedResult, [state, "map2"]);
    });

    describe('getAllLayersStateByMapKey', function () {
        const expectedResult = [
            {
                key: "pantherBackgroundLayer",
                layerTemplateKey: "layerTemplateBackground"
            },
            {
                key: "layer2",
                layerTemplateKey: "layerTemplate2",
                metadataModifiers: {
                    periodKey: "period1",
                    scopeKey: "scope1"
                },
                filterByActive: null
            },
            {
                key: "layer1",
                name: "Layer 1",
                layerTemplateKey: "layerTemplate1",
                styleKey: "style1",
                metadataModifiers: {
                    placeKey: "place1",
                    scopeKey: "scope1",
                    scenarioKeys: ["scenario1", "scenario2"]
                },
                filterByActive: {
                    place: true,
                    period: true,
                    layerTemplateKey: true,
                    applicationKey: true
                }
            }, {
                key: "layerDefinition1",
                name: "Layer with definitions",
                type: "vector",
                options: {
                    features: [],
                    style: {
                        styles: [{
                            fill: "#ff0000"
                        }]
                    }
                },
                filterByActive: {
                    period: true
                },
                metadataModifiers: {
                    scopeKey: "scope1"
                }
            }
        ];

        it('should return all map layers for map 1', () => {
            const output = Select.maps.getAllLayersStateByMapKey(state, "map1");
            assert.deepStrictEqual(output, expectedResult);
        });

        testHelpers.testCache(Select.maps.getAllLayersStateByMapKey, [state, "map1"], expectedResult);

        it('should return all map layers for map 2', () => {
            const expectedResult = [
                {
                    key: "pantherBackgroundLayer",
                    type: "wmts",
                    options: {
                        url: "http://backgroundLayer.no"
                    }
                },
                {
                    key: "layer2",
                    layerTemplateKey: "layerTemplate2",
                    metadataModifiers: {
                        periodKey: "period1",
                        scopeKey: "scope1"
                    },
                    filterByActive: null
                },
                {
                    key: "layer3",
                    name: "Layer 3",
                    layerTemplateKey: "layerTemplate3",
                    styleKey: "style3",
                    metadataModifiers: {
                        placeKey: "place2",
                        periodKey: "period2",
                        scopeKey: "scope1"
                    },
                    filterByActive: null
                }
            ];
            const output = Select.maps.getAllLayersStateByMapKey(state, "map2");
            assert.deepStrictEqual(output, expectedResult);
        });
    });
});