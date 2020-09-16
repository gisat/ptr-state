import {assert} from 'chai';
import reducer from '../../../src/state/Maps/reducers';

describe('state/Maps/reducers', function () {
	it('setInitial', function () {
		assert.deepStrictEqual(reducer({}, {type: 'MAPS.SET_INITIAL'}), {
			activeSetKey: null,
			activeMapKey: null,
			maps: {},
			sets: {},
		});
	});

	it('setActiveMapKey', function () {
		assert.deepStrictEqual(
			reducer({}, {type: 'MAPS.SET_ACTIVE_MAP_KEY', mapKey: 'mk'}),
			{activeMapKey: 'mk'}
		);
	});

	it('setActiveSetKey', function () {
		assert.deepStrictEqual(
			reducer({}, {type: 'MAPS.SET_ACTIVE_SET_KEY', setKey: 'sk'}),
			{activeSetKey: 'sk'}
		);
	});

	it('addSet', function () {
		assert.deepStrictEqual(
			reducer(
				{sets: {s1: {}, s2: {}}},
				{
					type: 'MAPS.SET.ADD',
					set: {
						key: 's3',
						maps: ['m1', 'm2'],
					},
				}
			),
			{
				sets: {
					s1: {},
					s2: {},
					s3: {
						key: 's3',
						maps: ['m1', 'm2'],
						sync: {
							location: false,
							center: false,
							roll: false,
							range: false,
							tilt: false,
							heading: false,
							elevation: false,
						},
						data: {
							backgroundLayer: null,
							layers: null,
							metadataModifiers: null,
							worldWindNavigator: null,
							view: null,
							filterByActive: null,
						},
					},
				},
			}
		);
	});

	it('removeSet', function () {
		assert.deepStrictEqual(
			reducer(
				{sets: {s1: {}, s2: {}, s3: {}}},
				{type: 'MAPS.SET.REMOVE', setKey: 's3'}
			),
			{sets: {s1: {}, s2: {}}}
		);
	});

	it('addMapKeyToSet', function () {
		assert.deepStrictEqual(
			reducer(
				{sets: {s1: {maps: ['m1', 'm2']}}},
				{type: 'MAPS.SET.ADD_MAP', setKey: 's1', mapKey: 'm3'}
			),
			{sets: {s1: {maps: ['m1', 'm2', 'm3']}}}
		);
	});

	it('removeMapKeyFromSet', function () {
		assert.deepStrictEqual(
			reducer(
				{sets: {s1: {maps: ['m1', 'm2', 'm3']}}},
				{type: 'MAPS.SET.REMOVE_MAP', setKey: 's1', mapKey: 'm2'}
			),
			{sets: {s1: {maps: ['m1', 'm3']}}}
		);
	});

	it('setSetBackgroundLayer', function () {
		assert.deepStrictEqual(
			reducer(
				{sets: {s1: {data: {}}}},
				{
					type: 'MAPS.SET.SET_BACKGROUND_LAYER',
					setKey: 's1',
					backgroundLayer: 'l1',
				}
			),
			{sets: {s1: {data: {backgroundLayer: 'l1'}}}}
		);
	});

	it('setSetLayers', function () {
		assert.deepStrictEqual(
			reducer(
				{sets: {s1: {data: {layers: ['l5', 'l6']}}}},
				{
					type: 'MAPS.SET.SET_LAYERS',
					setKey: 's1',
					layers: ['l1', 'l2'],
				}
			),
			{sets: {s1: {data: {layers: ['l1', 'l2']}}}}
		);
	});

	it('setSetView', function () {
		assert.deepStrictEqual(
			reducer(
				{sets: {s1: {data: {}}}},
				{
					type: 'MAPS.SET.VIEW.SET',
					setKey: 's1',
					view: {
						heading: 5,
					},
				}
			),
			{
				sets: {
					s1: {
						data: {
							view: {
								center: {
									lat: 50.1,
									lon: 14.5,
								},
								boxRange: 100000,
								roll: 0,
								tilt: 0,
								heading: 5,
								elevationExaggeration: 0,
							},
						},
					},
				},
			}
		);
	});

	it('updateSetView', function () {
		assert.deepStrictEqual(
			reducer(
				{
					sets: {
						s1: {
							data: {
								view: {
									center: {
										lat: 50.1,
										lon: 14.5,
									},
									boxRange: 100000,
									roll: 0,
									tilt: 0,
									heading: 0,
									elevationExaggeration: 0,
								},
							},
						},
					},
				},
				{
					type: 'MAPS.SET.VIEW.UPDATE',
					setKey: 's1',
					update: {heading: 6, roll: 3},
				}
			),
			{
				sets: {
					s1: {
						data: {
							view: {
								center: {
									lat: 50.1,
									lon: 14.5,
								},
								boxRange: 100000,
								roll: 3,
								tilt: 0,
								heading: 6,
								elevationExaggeration: 0,
							},
						},
					},
				},
			}
		);
	});

	it('setSetActiveMapKey', function () {
		assert.deepStrictEqual(
			reducer(
				{sets: {s1: {}}},
				{
					type: 'MAPS.SET.SET_ACTIVE_MAP_KEY',
					setKey: 's1',
					mapKey: 'mk',
				}
			),
			{sets: {s1: {activeMapKey: 'mk'}}}
		);
	});

	it('setSetMaps', function () {
		assert.deepStrictEqual(
			reducer(
				{sets: {s1: {}}},
				{type: 'MAPS.SET.SET_MAPS', setKey: 's1', maps: ['m1', 'm2']}
			),
			{sets: {s1: {maps: ['m1', 'm2']}}}
		);
	});

	it('setSetSync', function () {
		assert.deepStrictEqual(
			reducer(
				{sets: {s1: {sync: {k1: 'vo1', k3: 'vo3'}}}},
				{
					type: 'MAPS.SET.SET_SYNC',
					setKey: 's1',
					sync: {k1: 'v1', k2: 'v2'},
				}
			),
			{sets: {s1: {sync: {k1: 'v1', k2: 'v2', k3: 'vo3'}}}}
		);
	});

	it('addMap', function () {
		assert.deepStrictEqual(
			reducer({}, {type: 'MAPS.MAP.ADD', map: {key: 'm1'}}),
			{
				maps: {
					m1: {
						key: 'm1',
						name: null,
						data: {
							backgroundLayer: null,
							layers: null,
							metadataModifiers: null,
							worldWindNavigator: null,
							view: null,
							filterByActive: null,
						},
					},
				},
			}
		);
	});

	it('setMapLayerHoveredFeatureKeys', function () {
		assert.deepStrictEqual(
			reducer(
				{
					maps: {
						m1: {
							key: 'm1',
							data: {
								layers: [
									{
										key: 'l1',
										options: {
											hovered: {keys: ['ho1', 'ho2']},
										},
									},
								],
							},
						},
					},
				},
				{
					type: 'MAPS.MAP.LAYERS.SET.HOVERED_FEATURE_KEYS',
					mapKey: 'm1',
					layerKey: 'l1',
					hoveredFeatureKeys: ['h1', 'h2'],
				}
			),
			{
				maps: {
					m1: {
						key: 'm1',
						name: null,
						data: {
							backgroundLayer: null,
							filterByActive: null,
							metadataModifiers: null,
							view: null,
							worldWindNavigator: null,
							layers: [
								{
									key: 'l1',
									options: {hovered: {keys: ['h1', 'h2']}},
								},
							],
						},
					},
				},
			}
		);
	});

	it('setMapLayerSelection', function () {
		assert.deepStrictEqual(
			reducer(
				{
					maps: {
						m1: {
							key: 'm1',
							data: {
								layers: [{key: 'l1', options: {}}],
							},
						},
					},
				},
				{
					type: 'MAPS.MAP.LAYERS.SET.SELECTION',
					mapKey: 'm1',
					layerKey: 'l1',
					selectionKey: 's1',
				}
			),
			{
				maps: {
					m1: {
						key: 'm1',
						data: {
							layers: [
								{key: 'l1', options: {selected: {s1: {}}}},
							],
						},
					},
				},
			}
		);
	});

	it('setMapLayerStyle', function () {
		assert.deepStrictEqual(
			reducer(
				{
					maps: {
						m1: {
							key: 'm1',
							data: {layers: [{key: 'l1', options: {}}]},
						},
					},
				},
				{
					type: 'MAPS.MAP.LAYERS.SET.STYLE',
					mapKey: 'm1',
					layerKey: 'l1',
					style: 's1',
				}
			),
			{
				maps: {
					m1: {
						key: 'm1',
						data: {
							layers: [{key: 'l1', options: {style: 's1'}}],
						},
					},
				},
			}
		);
	});

	it('clearMapLayersSelection', function () {
		assert.deepStrictEqual(
			reducer(
				{
					maps: {
						m1: {
							key: 'm1',
							data: {
								layers: [
									{key: 'l1', options: {selected: {s1: {}}}},
									{key: 'l1', options: {selected: {s2: {}}}},
									{
										key: 'l1',
										options: {selected: {s1: {}, s2: {}}},
									},
								],
							},
						},
					},
				},
				{
					type: 'MAPS.MAP.LAYERS.CLEAR.SELECTION',
					mapKey: 'm1',
					selectionKey: 's1',
				}
			),
			{
				maps: {
					m1: {
						key: 'm1',
						name: null,
						data: {
							backgroundLayer: null,
							filterByActive: null,
							metadataModifiers: null,
							view: null,
							worldWindNavigator: null,
							layers: [
								{key: 'l1', options: {selected: {}}},
								{key: 'l1', options: {selected: {s2: {}}}},
								{
									key: 'l1',
									options: {selected: {s2: {}}},
								},
							],
						},
					},
				},
			}
		);
	});

	it('removeMap', function () {
		assert.deepStrictEqual(
			reducer(
				{
					maps: {
						m1: {},
						m2: {},
					},
					sets: {
						s1: {key: 's1', maps: ['m1', 'm2']},
						s2: {key: 's2', maps: ['m1']},
					},
				},
				{type: 'MAPS.MAP.REMOVE', mapKey: 'm1'}
			),
			{
				maps: {m2: {}},
				sets: {
					s1: {key: 's1', maps: ['m2']},
					s2: {key: 's2', maps: []},
				},
			}
		);
	});

	it('setMapName', function () {
		assert.deepStrictEqual(
			reducer(
				{maps: {m1: {key: 'm1', name: 'old'}}},
				{type: 'MAPS.MAP.SET_NAME', mapKey: 'm1', name: 'new'}
			),
			{maps: {m1: {key: 'm1', name: 'new'}}}
		);
	});

	it('setMapData', function () {
		assert.deepStrictEqual(
			reducer(
				{maps: {m1: {key: 'm1', data: {k1: 'vo1'}}}},
				{
					type: 'MAPS.MAP.SET_DATA',
					mapKey: 'm1',
					data: {k1: 'v1', k2: 'v2'},
				}
			),
			{maps: {m1: {key: 'm1', data: {k1: 'v1', k2: 'v2'}}}}
		);
	});

	it('setMapView', function () {
		assert.deepStrictEqual(
			reducer(
				{maps: {m1: {key: 'm1', data: {}}}},
				{
					type: 'MAPS.MAP.VIEW.SET',
					mapKey: 'm1',
					view: {roll: 3, tilt: 8},
				}
			),
			{
				maps: {
					m1: {
						key: 'm1',
						data: {
							view: {
								center: {
									lat: 50.1,
									lon: 14.5,
								},
								boxRange: 100000,
								roll: 3,
								tilt: 8,
								heading: 0,
								elevationExaggeration: 0,
							},
						},
					},
				},
			}
		);
	});

	it('updateMapView', function () {
		assert.deepStrictEqual(
			reducer(
				{
					maps: {
						m1: {
							key: 'm1',
							data: {
								view: {
									center: {
										lat: 50.1,
										lon: 14.5,
									},
									boxRange: 100000,
									roll: 3,
									tilt: 8,
									heading: 0,
									elevationExaggeration: 0,
								},
							},
						},
					},
				},
				{
					type: 'MAPS.MAP.VIEW.UPDATE',
					mapKey: 'm1',
					update: {heading: 4},
				}
			),
			{
				maps: {
					m1: {
						key: 'm1',
						data: {
							view: {
								center: {
									lat: 50.1,
									lon: 14.5,
								},
								boxRange: 100000,
								roll: 3,
								tilt: 8,
								heading: 4,
								elevationExaggeration: 0,
							},
						},
					},
				},
			}
		);
	});

	it('addLayer', function () {
		assert.deepStrictEqual(
			reducer(
				{
					maps: {
						m1: {
							key: 'm1',
							data: {
								layers: [{key: 'l1'}, {key: 'l2'}],
							},
						},
					},
				},
				{
					type: 'MAPS.LAYERS.LAYER.ADD',
					mapKey: 'm1',
					layer: {key: 'l3'},
					index: 1,
				}
			),
			{
				maps: {
					m1: {
						key: 'm1',
						data: {
							layers: [{key: 'l1'}, {key: 'l3'}, {key: 'l2'}],
						},
					},
				},
			}
		);
	});

	it('removeLayer', function () {
		assert.deepStrictEqual(
			reducer(
				{
					maps: {
						m1: {
							key: 'm1',
							data: {layers: [{key: 'l1'}, {key: 'l2'}]},
						},
					},
				},
				{type: 'MAPS.LAYERS.LAYER.REMOVE', mapKey: 'm1', layerKey: 'l1'}
			),
			{
				maps: {
					m1: {
						key: 'm1',
						data: {
							layers: [{key: 'l2'}],
						},
					},
				},
			}
		);
	});

	it('removeLayers', function () {
		assert.deepStrictEqual(
			reducer(
				{
					maps: {
						m1: {
							key: 'm1',
							data: {
								layers: [{key: 'l1'}, {key: 'l2'}, {key: 'l3'}],
							},
						},
					},
				},
				{
					type: 'MAPS.LAYERS.REMOVE_LAYERS',
					mapKey: 'm1',
					layersKeys: ['l1', 'l3'],
				}
			),
			{
				maps: {
					m1: {
						key: 'm1',
						data: {
							layers: [{key: 'l2'}],
						},
					},
				},
			}
		);
	});

	it('setLayerIndex', function () {
		assert.deepStrictEqual(
			reducer(
				{
					maps: {
						m1: {
							key: 'm1',
							data: {
								layers: [{key: 'l1'}, {key: 'l2'}, {key: 'l3'}],
							},
						},
					},
				},
				{
					type: 'MAPS.LAYERS.LAYER.SET_INDEX',
					mapKey: 'm1',
					layerKey: 'l2',
					index: 2,
				}
			),
			{
				maps: {
					m1: {
						key: 'm1',
						name: null,
						data: {
							backgroundLayer: null,
							filterByActive: null,
							metadataModifiers: null,
							view: null,
							worldWindNavigator: null,
							layers: [{key: 'l1'}, {key: 'l3'}, {key: 'l2'}],
						},
					},
				},
			}
		);
	});

	it('updateMapLayer', function () {
		assert.deepStrictEqual(
			reducer(
				{
					maps: {
						m1: {
							key: 'm1',
							data: {layers: [{key: 'l1', k1: 'vo1', k2: 'vo2'}]},
						},
					},
				},
				{
					type: 'MAPS.LAYERS.LAYER.UPDATE',
					mapKey: 'm1',
					layer: {k2: 'v2', k3: 'v3'},
					layerKey: 'l1',
				}
			),
			{
				maps: {
					m1: {
						key: 'm1',
						name: null,
						data: {
							backgroundLayer: null,
							filterByActive: null,
							metadataModifiers: null,
							view: null,
							worldWindNavigator: null,
							layers: [
								{key: 'l1', k1: 'vo1', k2: 'v2', k3: 'v3'},
							],
						},
					},
				},
			}
		);
	});

	it('setMapLayer', function () {
		assert.deepStrictEqual(
			reducer(
				{
					maps: {
						m1: {
							key: 'm1',
							data: {layers: [{key: 'l1', k1: 'vo1'}]},
						},
					},
				},
				{
					type: 'MAPS.LAYERS.LAYER.SET',
					mapKey: 'm1',
					layerKey: 'l1',
					layer: {k2: 'v2'},
				}
			),
			{
				maps: {
					m1: {
						key: 'm1',
						name: null,
						data: {
							backgroundLayer: null,
							filterByActive: null,
							metadataModifiers: null,
							view: null,
							worldWindNavigator: null,
							layers: [
								{
									key: 'l1',
									k2: 'v2',
									layerTemplate: null,
									opacity: 100,
									style: null,
								},
							],
						},
					},
				},
			}
		);
	});

	it('setMapLayers', function () {
		assert.deepStrictEqual(
			reducer(
				{maps: {m1: {key: 'm1', data: {layers: []}}}},
				{
					type: 'MAPS.LAYERS.SET',
					mapKey: 'm1',
					layers: [{key: 'l1'}, {key: 'l2'}],
				}
			),
			{
				maps: {
					m1: {key: 'm1', data: {layers: [{key: 'l1'}, {key: 'l2'}]}},
				},
			}
		);
	});

	it('setMapScope', function () {
		assert.deepStrictEqual(
			reducer(
				{maps: {m1: {key: 'm1'}}},
				{type: 'MAPS.SET_SCOPE', mapKey: 'm1', scope: 's'}
			),
			{
				maps: {
					m1: {
						key: 'm1',
						name: null,
						scope: 's',
						data: {
							backgroundLayer: null,
							filterByActive: null,
							metadataModifiers: null,
							view: null,
							worldWindNavigator: null,
							layers: null,
						},
					},
				},
			}
		);
	});

	it('setMapScenario', function () {
		assert.deepStrictEqual(
			reducer(
				{maps: {m1: {key: 'm1'}}},
				{type: 'MAPS.SET_SCENARIO', mapKey: 'm1', scenario: 'scen'}
			),
			{
				maps: {
					m1: {
						key: 'm1',
						name: null,
						scenario: 'scen',
						data: {
							backgroundLayer: null,
							filterByActive: null,
							metadataModifiers: null,
							view: null,
							worldWindNavigator: null,
							layers: null,
						},
					},
				},
			}
		);
	});

	it('setMapPeriod', function () {
		assert.deepStrictEqual(
			reducer(
				{maps: {m1: {key: 'm1'}}},
				{type: 'MAPS.SET_PERIOD', mapKey: 'm1', period: 'per'}
			),
			{
				maps: {
					m1: {
						key: 'm1',
						name: null,
						period: 'per',
						data: {
							backgroundLayer: null,
							filterByActive: null,
							metadataModifiers: null,
							view: null,
							worldWindNavigator: null,
							layers: null,
						},
					},
				},
			}
		);
	});

	it('setMapPlace', function () {
		assert.deepStrictEqual(
			reducer(
				{maps: {m1: {key: 'm1'}}},
				{type: 'MAPS.SET_PLACE', mapKey: 'm1', place: 'pl1'}
			),
			{
				maps: {
					m1: {
						key: 'm1',
						name: null,
						place: 'pl1',
						data: {
							backgroundLayer: null,
							filterByActive: null,
							metadataModifiers: null,
							view: null,
							worldWindNavigator: null,
							layers: null,
						},
					},
				},
			}
		);
	});

	it('setMapCase', function () {
		assert.deepStrictEqual(
			reducer(
				{maps: {m1: {key: 'm1'}}},
				{type: 'MAPS.SET_CASE', mapKey: 'm1', case: 'cas1'}
			),
			{
				maps: {
					m1: {
						key: 'm1',
						name: null,
						case: 'cas1',
						data: {
							backgroundLayer: null,
							filterByActive: null,
							metadataModifiers: null,
							view: null,
							worldWindNavigator: null,
							layers: null,
						},
					},
				},
			}
		);
	});

	it('setMapBackgroundLayer', function () {
		assert.deepStrictEqual(
			reducer(
				{maps: {m1: {key: 'm1'}}},
				{
					type: 'MAPS.SET_BACKGROUND_LAYER',
					mapKey: 'm1',
					backgroundLayer: 'bl1',
				}
			),
			{
				maps: {
					m1: {
						key: 'm1',
						name: null,
						data: {
							backgroundLayer: 'bl1',
							filterByActive: null,
							metadataModifiers: null,
							view: null,
							worldWindNavigator: null,
							layers: null,
						},
					},
				},
			}
		);
	});

	it('update', function () {
		assert.deepStrictEqual(
			reducer(
				{maps: {m1: {key: 'm1'}}},
				{
					type: 'MAPS.UPDATE',
					data: {k1: 'v1', k2: 'v2'},
				}
			),
			{maps: {m1: {key: 'm1'}}, k1: 'v1', k2: 'v2'}
		);
	});

	it('deprecated_setSetWorldWindNavigator', function () {
		assert.deepStrictEqual(
			reducer(
				{
					sets: {
						s1: {key: 's1'},
					},
				},
				{
					type: 'MAPS.SET.WORLD_WIND_NAVIGATOR.SET',
					setKey: 's1',
					worldWindNavigator: {roll: 3, tilt: 4},
				}
			),
			{
				sets: {
					s1: {
						key: 's1',
						data: {
							worldWindNavigator: {
								lookAtLocation: {
									latitude: 50.1,
									longitude: 14.5,
								},
								range: 100000,
								roll: 3,
								tilt: 4,
								heading: 0,
								elevation: 0,
							},
						},
					},
				},
			}
		);
	});

	it('deprecated_updateSetWorldWindNavigator', function () {
		assert.deepStrictEqual(
			reducer(
				{
					sets: {
						s1: {
							key: 's1',
							data: {
								worldWindNavigator: {
									lookAtLocation: {
										latitude: 50.1,
										longitude: 14.5,
									},
									range: 100000,
									roll: 3,
									tilt: 4,
									heading: 0,
									elevation: 0,
								},
							},
						},
					},
				},
				{
					type: 'MAPS.SET.WORLD_WIND_NAVIGATOR.UPDATE',
					setKey: 's1',
					worldWindNavigator: {tilt: 6},
				}
			),
			{
				sets: {
					s1: {
						key: 's1',
						data: {
							worldWindNavigator: {
								lookAtLocation: {
									latitude: 50.1,
									longitude: 14.5,
								},
								range: 100000,
								roll: 3,
								tilt: 6,
								heading: 0,
								elevation: 0,
							},
						},
					},
				},
			}
		);
	});

	it('deprecated_setMapWorldWindNavigator', function () {
		assert.deepStrictEqual(
			reducer(
				{
					maps: {
						m1: {key: 'm1'},
					},
				},
				{
					type: 'MAPS.MAP.WORLD_WIND_NAVIGATOR.SET',
					mapKey: 'm1',
					worldWindNavigator: {roll: 3, tilt: 4},
				}
			),
			{
				maps: {
					m1: {
						key: 'm1',
						name: null,
						data: {
							backgroundLayer: null,
							filterByActive: null,
							metadataModifiers: null,
							view: null,
							worldWindNavigator: null,
							layers: null,
							worldWindNavigator: {
								lookAtLocation: {
									latitude: 50.1,
									longitude: 14.5,
								},
								range: 100000,
								roll: 3,
								tilt: 4,
								heading: 0,
								elevation: 0,
							},
						},
					},
				},
			}
		);
	});

	it('deprecated_updateMapWorldWindNavigator', function () {
		assert.deepStrictEqual(
			reducer(
				{
					maps: {
						m1: {
							key: 'm1',
							data: {
								worldWindNavigator: {
									lookAtLocation: {
										latitude: 50.1,
										longitude: 14.5,
									},
									range: 100000,
									roll: 3,
									tilt: 4,
									heading: 0,
									elevation: 0,
								},
							},
						},
					},
				},
				{
					type: 'MAPS.MAP.WORLD_WIND_NAVIGATOR.UPDATE',
					mapKey: 'm1',
					worldWindNavigator: {tilt: 6},
				}
			),
			{
				maps: {
					m1: {
						key: 'm1',
						name: null,
						data: {
							backgroundLayer: null,
							filterByActive: null,
							metadataModifiers: null,
							view: null,
							worldWindNavigator: null,
							layers: null,
							worldWindNavigator: {
								lookAtLocation: {
									latitude: 50.1,
									longitude: 14.5,
								},
								range: 100000,
								roll: 3,
								tilt: 6,
								heading: 0,
								elevation: 0,
							},
						},
					},
				},
			}
		);
	});

	it('unknown', function () {
		assert.deepStrictEqual(
			reducer(
				{},
				{
					type: 'UNKNOWN_ACTION',
				}
			),
			{}
		);
	});
});
