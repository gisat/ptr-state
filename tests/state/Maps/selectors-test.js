import {assert} from 'chai';
import selectors from '../../../src/state/Maps/selectors';

describe('state/Maps/selectors', function () {
	it('getActiveMapKey', function () {
		assert.strictEqual(
			selectors.getActiveMapKey({maps: {activeMapKey: 'm1'}}),
			'm1'
		);
	});

	it('getActiveSetKey', function () {
		assert.strictEqual(
			selectors.getActiveSetKey({maps: {activeSetKey: 's1'}}),
			's1'
		);
	});

	it('getAllLayersStateByMapKey', function () {
		assert.deepStrictEqual(
			selectors.getAllLayersStateByMapKey(
				{
					maps: {
						maps: {
							m1: {
								data: {
									backgroundLayer: {key: 'bl1'},
									layers: [{key: 'ml1'}, {key: 'ml2'}],
									metadataModifiers: ['mm1'],
									filterByActive: {mf: 'mv'},
								},
							},
						},
					},
					sets: {
						s1: {maps: ['m1']},
						data: {
							backgroundLayer: {key: 'bls1'},
							layers: [{key: 'sl1'}],
							metadataModifiers: ['sm1', 'sm2'],
							filterByActive: {sf: 'sv'},
						},
					},
				},
				'm1'
			),

			[
				{
					key: 'pantherBackgroundLayer',
				},
				{
					filterByActive: {
						mf: 'mv',
					},
					key: 'ml1',
					metadataModifiers: {
						0: 'mm1',
					},
				},
				{
					filterByActive: {
						mf: 'mv',
					},
					key: 'ml2',
					metadataModifiers: {
						0: 'mm1',
					},
				},
			]
		);
	});

	it('getBackgroundLayer', function () {
		assert.deepStrictEqual(
			selectors.getBackgroundLayer(
				{
					scopes: {activeKey: 's1'},
					cases: {activeKey: 'c1'},
					spatialData: {byKey: {s1: {key: 's1'}}},
					spatialDataSources: {
						byKey: {
							sd1: {
								key: 'sd1',
								data: {type: 'wmts', urls: ['url1', 'url2']},
							},
						},
					},
					spatialRelations: {
						byKey: {
							sr1: {
								key: 'src1',
								data: {
									p: 'v',
									spatialDataSourceKey: 'sd1',
									fidColumnName: 'fid',
								},
							},
						},
					},
					areaRelations: {
						byKey: {
							ar1: {
								key: 'ar1',
								data: {
									p: 'v',
									spatialDataSourceKey: 'sd1',
									fidColumnName: 'fid',
								},
							},
						},
					},
				},
				JSON.stringify({
					filterByActive: {case: true, scope: true},
					layerTemplateKey: 'lt1',
					areaTreeLevelKey: 'atl1',
					metadataModifiers: [],
				})
			),
			[
				{
					description: undefined,
					key: 'pantherBackgroundLayer_0',
					layerKey: 'pantherBackgroundLayer',
					name: undefined,
					opacity: 1,
					options: {
						url: 'url1',
						urls: ['url1', 'url2'],
					},
					type: 'wmts',
				},
			]
		);
	});

	it('getMapBackgroundLayer', function () {
		assert.deepStrictEqual(
			selectors.getMapBackgroundLayer(
				{
					scopes: {activeKey: 's1'},
					cases: {activeKey: 'c1'},
					spatialData: {byKey: {s1: {key: 's1'}}},
					spatialDataSources: {
						byKey: {
							sd1: {
								key: 'sd1',
								data: {type: 'wmts', urls: ['url1', 'url2']},
							},
						},
					},
					spatialRelations: {
						byKey: {
							sr1: {
								key: 'src1',
								data: {
									p: 'v',
									spatialDataSourceKey: 'sd1',
									fidColumnName: 'fid',
								},
							},
						},
					},
					areaRelations: {
						byKey: {
							ar1: {
								key: 'ar1',
								data: {
									p: 'v',
									spatialDataSourceKey: 'sd1',
									fidColumnName: 'fid',
								},
							},
						},
					},
					maps: {
						maps: {
							m1: {
								data: {
									backgroundLayer: JSON.stringify({
										filterByActive: {
											case: true,
											scope: true,
										},
										layerTemplateKey: 'lt1',
										areaTreeLevelKey: 'atl1',
										metadataModifiers: [],
									}),
								},
							},
						},
						sets: {
							s1: {
								data: {
									backgroundLayer: {key: 'bls1'},
								},
							},
						},
					},
				},
				'm1'
			),
			[
				{
					description: undefined,
					key: 'pantherBackgroundLayer_0',
					layerKey: 'pantherBackgroundLayer',
					name: undefined,
					opacity: 1,
					options: {
						url: 'url1',
						urls: ['url1', 'url2'],
					},
					type: 'wmts',
				},
			]
		);
	});

	it('getBackgroundLayerStateByMapKey', function () {
		assert.deepStrictEqual(
			selectors.getBackgroundLayerStateByMapKey(
				{
					maps: {
						maps: {
							m1: {
								data: {
									backgroundLayer: {key: 'bl1'},
								},
							},
						},
						sets: {
							s1: {
								data: {
									backgroundLayer: {key: 'bls1'},
								},
							},
						},
					},
				},
				'm1'
			),
			{key: 'bl1'}
		);
	});

	it('getFilterByActiveByMapKey', function () {
		assert.deepStrictEqual(
			selectors.getFilterByActiveByMapKey(
				{
					maps: {
						maps: {
							m1: {
								key: 'm1',
								data: {filterByActive: {mfa: true}},
							},
						},
						sets: {
							s1: {
								key: 's1',
								maps: ['m1'],
								data: {filterByActive: {sfa: true}},
							},
						},
					},
				},
				'm1'
			),
			{sfa: true, mfa: true}
		);
	});

	it('getLayers', function () {
		assert.deepStrictEqual(
			selectors.getLayers(
				{
					app: {key: 'apk'},
					scopes: {activeKey: 's1'},
					cases: {activeKey: 'c1'},
					spatialDataSources: {
						byKey: {
							sd1: {
								key: 'sd1',
								data: {type: 'wmts', urls: ['url1', 'url2']},
							},
						},
					},
					spatialRelations: {
						byKey: {
							sr1: {
								key: 'src1',
								data: {
									periodKey: 'p1',
									spatialDataSourceKey: 'sd1',
									fidColumnName: 'fid',
								},
							},
						},
					},
					areaRelations: {byKey: {ar1: {key: 'ar1'}}},
					spatialData: {byKey: {s1: {key: 's1'}}},
					layerTemplates: {byKey: {lt1: {key: 'lt1'}}},
					attributeDataSources: {byKey: {ads1: {key: 'ads1'}}},
					attributeRelations: {byKey: {ar1: {key: 'ar1'}}},
					attributeData: {byKey: {ad1: {key: 'ad1'}}},
					styles: {byKey: {s1: {key: 'st1'}}},
					periods: {byKey: {p1: {key: 'p1'}}},
					selections: {byKey: {sel1: {key: 'sel1'}}},
				},
				[
					{
						key: 'l1',
						layerTemplateKey: 'lt1',
						options: {
							features: ['f1', 'f2'],
						},
					},
					{
						key: 'l1',
						options: {},
					},
				]
			),
			[
				{
					key: 'l1_0',
					name: undefined,
					description: undefined,
					layerKey: 'l1',
					opacity: 1,
					type: 'wmts',
					options: {
						urls: ['url1', 'url2'],
						url: 'url1',
						period: [{key: 'p1'}],
					},
				},
			]
		);
	});

	it('getLayersStateByMapKey', function () {
		assert.deepStrictEqual(
			selectors.getLayersStateByMapKey(
				{
					maps: {
						maps: {
							m1: {
								key: 'm1',
								data: {
									filterByActive: {mfa: true},
									layers: [
										{key: 'ml1', layerTemplateKey: 'lt1'},
									],
									metadataModifiers: {mm1: true},
								},
							},
						},
						sets: {
							s1: {
								key: 's1',
								maps: ['m1'],
								data: {
									filterByActive: {sfa: true},
									layers: [{key: 'sl1'}],
									metadataModifiers: {sm1: true},
								},
							},
						},
					},
				},
				'm1'
			),
			[
				{
					filterByActive: {
						mfa: true,
						sfa: true,
					},
					key: 'sl1',
					metadataModifiers: {
						mm1: true,
						sm1: true,
					},
				},
				{
					filterByActive: {
						mfa: true,
						sfa: true,
					},
					key: 'ml1',
					layerTemplateKey: 'lt1',
					metadataModifiers: {
						mm1: true,
						sm1: true,
					},
				},
			]
		);
	});

	it('getMapLayers', function () {
		assert.deepStrictEqual(
			selectors.getMapLayers(
				{
					app: {key: 'apk'},
					scopes: {activeKey: 's1'},
					cases: {activeKey: 'c1'},
					spatialDataSources: {
						byKey: {
							sd1: {
								key: 'sd1',
								data: {type: 'wmts', urls: ['url1', 'url2']},
							},
						},
					},
					spatialRelations: {
						byKey: {
							sr1: {
								key: 'src1',
								data: {
									periodKey: 'p1',
									spatialDataSourceKey: 'sd1',
									fidColumnName: 'fid',
									layerTemplateKey: 'lt1',
									sm1: true,
									mm1: true,
								},
							},
						},
					},
					areaRelations: {byKey: {ar1: {key: 'ar1'}}},
					spatialData: {byKey: {s1: {key: 's1'}}},
					layerTemplates: {
						byKey: {
							lt1: {key: 'lt1'},
						},
					},
					attributeDataSources: {byKey: {ads1: {key: 'ads1'}}},
					attributeRelations: {byKey: {ar1: {key: 'ar1'}}},
					attributeData: {byKey: {ad1: {key: 'ad1'}}},
					styles: {byKey: {s1: {key: 'st1'}}},
					periods: {byKey: {p1: {key: 'p1'}}},
					selections: {byKey: {sel1: {key: 'sel1'}}},
					maps: {
						maps: {
							m1: {
								key: 'm1',
								data: {
									filterByActive: {mfa: true},
									layers: [
										{key: 'ml1', layerTemplateKey: 'lt1'},
									],
									metadataModifiers: {mm1: true},
								},
							},
						},
						sets: {
							s1: {
								key: 's1',
								maps: ['m1'],
								data: {
									filterByActive: {sfa: true},
									layers: [{key: 'sl1'}],
									metadataModifiers: {sm1: true},
								},
							},
						},
					},
				},
				'm1'
			),
			[
				{
					description: undefined,
					key: 'ml1_0',
					layerKey: 'ml1',
					name: undefined,
					opacity: 1,
					options: {
						period: [
							{
								key: 'p1',
							},
						],
						url: 'url1',
						urls: ['url1', 'url2'],
					},
					type: 'wmts',
				},
			]
		);
	});

	it('getMapByKey', function () {
		assert.deepStrictEqual(
			selectors.getMapByKey(
				{
					maps: {
						maps: {
							m1: {key: 'm1'},
						},
					},
				},
				'm1'
			),
			{key: 'm1'}
		);
	});

	it('getMapLayerByMapKeyAndLayerKey', function () {
		assert.deepStrictEqual(
			selectors.getMapLayerByMapKeyAndLayerKey(
				{
					maps: {
						maps: {
							m1: {key: 'm1', data: {layers: [{key: 'l1'}]}},
						},
					},
				},
				'm1',
				'l1'
			),
			{key: 'l1'}
		);
	});

	it('getMapLayersByMapKey', function () {
		assert.deepStrictEqual(
			selectors.getMapLayersByMapKey(
				{
					maps: {
						maps: {
							m1: {key: 'm1', data: {layers: [{key: 'l1'}]}},
						},
					},
				},
				'm1'
			),
			[{key: 'l1'}]
		);
	});

	it('getMapsAsObject', function () {
		assert.deepStrictEqual(
			selectors.getMapsAsObject({
				maps: {
					maps: {
						m1: {key: 'm1'},
						m2: {key: 'm2'},
						m3: {key: 'm3'},
					},
				},
			}),
			{
				m1: {key: 'm1'},
				m2: {key: 'm2'},
				m3: {key: 'm3'},
			}
		);
	});

	it('getMapSetActiveMapKey', function () {
		assert.deepStrictEqual(
			selectors.getMapSetActiveMapKey(
				{
					maps: {
						activeMapKey: 'm1',
						maps: {
							m1: {key: 'm1'},
						},
						sets: {
							s1: {
								key: 's1',
								maps: ['m2', 'm1'],
								activeMapKey: 'm3',
							},
						},
					},
				},
				's1'
			),
			'm3'
		);
	});

	it('getMapSetActiveMapView', function () {
		assert.deepStrictEqual(
			selectors.getMapSetActiveMapView(
				{
					maps: {
						activeMapKey: 'm1',
						maps: {
							m1: {key: 'm1'},
							m3: {key: 'm3', data: {view: {heading: 1}}},
						},
						sets: {
							s1: {
								key: 's1',
								maps: ['m2', 'm1'],
								activeMapKey: 'm3',
								data: {
									view: {roll: 2},
								},
							},
						},
					},
				},
				's1'
			),
			{
				boxRange: 10000000,
				center: {
					lat: 50.099577,
					lon: 14.42596,
				},
				heading: 1,
				roll: 2,
				tilt: 0,
			}
		);
	});

	it('getMapSetByKey', function () {
		assert.deepStrictEqual(
			selectors.getMapSetByKey(
				{
					maps: {
						sets: {s1: {key: 's1'}},
					},
				},
				's1'
			),
			{key: 's1'}
		);
	});

	it('getMapSetByMapKey', function () {
		assert.deepStrictEqual(
			selectors.getMapSetByMapKey(
				{
					maps: {
						sets: {
							s1: {key: 's1', maps: ['m1']},
						},
					},
				},
				'm1'
			),
			{key: 's1', maps: ['m1']}
		);
	});

	it('getMapSetLayersStateBySetKey', function () {
		assert.deepStrictEqual(
			selectors.getMapSetLayersStateBySetKey(
				{
					maps: {
						sets: {
							s1: {key: 's1', data: {layers: [{key: 'l1'}]}},
						},
					},
				},
				's1'
			),
			[{key: 'l1'}]
		);
	});

	it('getMapSetMapKeys', function () {
		assert.deepStrictEqual(
			selectors.getMapSetMapKeys(
				{
					maps: {
						sets: {s1: {key: 's1', maps: ['m2', 'm3']}},
					},
				},
				's1'
			),
			['m2', 'm3']
		);
	});

	it('getMapSetView', function () {
		assert.deepStrictEqual(
			selectors.getMapSetView(
				{
					maps: {
						sets: {
							s1: {key: 's1', data: {view: {tilt: 3}}},
						},
					},
				},
				's1'
			),
			{
				tilt: 3,
				boxRange: 10000000,
				center: {
					lat: 50.099577,
					lon: 14.42596,
				},
				heading: 0,
				roll: 0,
			}
		);
	});

	it('getMapSetViewLimits', function () {
		assert.deepStrictEqual(
			selectors.getMapSetViewLimits(
				{
					maps: {
						sets: {s1: {key: 's1', data: {viewLimits: 3}}},
					},
				},
				's1'
			),
			3
		);
	});

	it('getMapSets', function () {
		assert.deepStrictEqual(
			selectors.getMapSets({
				maps: {
					sets: {
						s1: {key: 's1'},
						s2: {key: 's2'},
						s3: {key: 's3'},
					},
				},
			}),
			[{key: 's1'}, {key: 's2'}, {key: 's3'}]
		);
	});

	it('getMapSetsAsObject', function () {
		assert.deepStrictEqual(
			selectors.getMapSetsAsObject({
				maps: {
					sets: {
						s1: {key: 's1'},
						s2: {key: 's2'},
						s3: {key: 's3'},
					},
				},
			}),
			{
				s1: {key: 's1'},
				s2: {key: 's2'},
				s3: {key: 's3'},
			}
		);
	});

	it('getSubstate', function () {
		assert.deepStrictEqual(
			selectors.getSubstate({
				maps: {sets: {}},
			}),
			{sets: {}}
		);
	});

	it('getView', function () {
		assert.deepStrictEqual(
			selectors.getView(
				{
					maps: {
						maps: {m1: {key: 'm1', data: {view: {roll: 3}}}},
						sets: {
							s1: {
								key: 's1',
								maps: ['m1'],
								data: {view: {tilt: 2}},
							},
						},
					},
				},
				'm1'
			),
			{
				boxRange: 10000000,
				center: {
					lat: 50.099577,
					lon: 14.42596,
				},
				heading: 0,
				roll: 3,
				tilt: 2,
			}
		);
	});

	it('getViewLimits', function () {
		assert.deepStrictEqual(
			selectors.getViewLimits(
				{
					maps: {
						maps: {
							m1: {key: 'm1', data: {viewLimits: {p1: 'v1'}}},
						},
						sets: {
							s1: {
								key: 's1',
								maps: ['m1'],
								data: {viewLimits: {p2: 'v2'}},
							},
						},
					},
				},
				'm1'
			),
			{
				p1: 'v1',
				p2: 'v2',
			}
		);
	});

	it('getLayersStateByMapKey_deprecated', function () {
		assert.deepStrictEqual(
			selectors.getLayersStateByMapKey_deprecated(
				{
					maps: {
						maps: {m1: {key: 'm1', data: {layers: [{key: 'ml1'}]}}},
						sets: {
							s1: {
								key: 's1',
								maps: ['m1'],
								data: {layers: [{key: 'sl1'}]},
							},
						},
					},
				},
				'm1',
				false
			),
			[
				{
					filter: {},
					filterByActive: {
						attribute: true,
						case: true,
						period: true,
						place: true,
						scenario: true,
						scope: true,
					},
					layer: {
						key: 'sl1',
					},
					mergedFilter: {},
				},
				{
					filter: {},
					filterByActive: {
						attribute: true,
						case: true,
						period: true,
						place: true,
						scenario: true,
						scope: true,
					},
					layer: {
						key: 'ml1',
					},
					mergedFilter: {},
				},
			]
		);
	});

	it('getFiltersForUse_deprecated', function () {
		assert.deepStrictEqual(
			selectors.getFiltersForUse_deprecated({}, {}, false),
			{
				filter: {},
				filterByActive: {
					attribute: true,
					case: true,
					period: true,
					place: true,
					scenario: true,
					scope: true,
				},
				layer: {},
				mergedFilter: {},
			}
		);
	});

	it('getBackgroundLayerStateByMapKey_deprecated', function () {
		assert.deepStrictEqual(
			selectors.getBackgroundLayerStateByMapKey_deprecated(
				{
					maps: {
						maps: {
							m1: {
								key: 'm1',
								data: {
									backgroundLayer: {
										layerTemplate: {key: 'lt1'},
									},
								},
							},
						},
						sets: {
							s1: {
								key: 's1',
								maps: ['m1'],
							},
						},
					},
				},
				'm1'
			),
			{
				filter: {
					caseKey: null,
					layerTemplateKey: {
						key: 'lt1',
					},
					periodKey: null,
					placeKey: null,
					scenarioKey: null,
				},
				filterByActive: {
					attribute: true,
					scope: true,
				},
				layer: {
					case: null,
					key: undefined,
					layerTemplate: {
						key: 'lt1',
					},
					period: null,
					place: null,
					scenario: null,
				},
				mergedFilter: {
					caseKey: null,
					layerTemplateKey: {
						key: 'lt1',
					},
					periodKey: null,
					placeKey: null,
					scenarioKey: null,
				},
			}
		);
	});

	it('getAllLayersStateByMapKey_deprecated', function () {
		assert.deepStrictEqual(
			selectors.getAllLayersStateByMapKey_deprecated(
				{
					maps: {
						maps: {
							m1: {
								key: 'm1',
								data: {
									backgroundLayer: {
										layerTemplate: {key: 'lt1'},
									},
									layers: [{key: 'ml1'}],
								},
							},
						},
						sets: {
							s1: {
								key: 's1',
								maps: ['m1'],
								data: {layers: [{key: 'sl1'}]},
							},
						},
					},
				},
				'm1'
			),
			[
				{
					data: {
						key: 'sl1',
					},
					filter: {},
				},
				{
					data: {
						key: 'ml1',
					},
					filter: {},
				},
				{
					data: {
						case: null,
						key: undefined,
						layerTemplate: {
							key: 'lt1',
						},
						period: null,
						place: null,
						scenario: null,
					},
					filter: {
						caseKey: null,
						layerTemplateKey: {
							key: 'lt1',
						},
						periodKey: null,
						placeKey: null,
						scenarioKey: null,
					},
				},
			]
		);
	});

	it('getLayers_deprecated', function () {
		assert.deepStrictEqual(
			selectors.getLayers_deprecated(
				{
					app: {
						localConfiguration: {
							apiGeoserverWMSProtocol: 'proto',
							apiGeoserverWMSHost: 'host',
							apiGeoserverWMSPath: 'path',
							apiGeoserverWFSProtocol: 'fproto',
							apiGeoserverWFSHost: 'fhost',
							apiGeoserverWFSPath: 'fpath',
						},
					},
					spatialDataSources: {byKey: {sd1: {key: 'sd1'}}},
					spatialRelations: {
						byKey: {
							sr1: {
								key: 'sr1',
								data: {spatialDataSourceKey: 'sd1'},
							},
						},
					},
					attributeData: {byKey: {ad1: {key: 'ad1'}}},
					attributeRelations: {
						byKey: {
							ar1: {
								key: 'ar1',
								data: {
									spatialDataSourceKey: 'sd1',
									attributeDataSourceKey: 'ad1',
								},
							},
						},
					},
				},
				[
					{
						key: 'l1',
						data: {key: 'l1'},
						filter: {},
					},
				]
			),
			[
				{
					key: 'l1-sd1',
					mapServerConfig: {
						wfsMapServerUrl: 'fproto://fhost/fpath',
						wmsMapServerUrl: 'proto://host/path',
					},
					spatialDataSourceKey: 'sd1',
					spatialRelationsData: {
						spatialDataSourceKey: 'sd1',
					},
				},
			]
		);
	});

	it('getLayersStateByMapSetKey_deprecated', function () {
		assert.deepStrictEqual(
			selectors.getLayersStateByMapSetKey_deprecated(
				{
					maps: {
						maps: {
							m1: {key: 'm1', data: {layers: [{key: 'ml1'}]}},
						},
						sets: {
							s1: {
								key: 's1',
								maps: ['m1'],
								data: {layers: [{key: 'sl1'}]},
							},
						},
					},
				},
				's1'
			),
			{
				m1: [
					{
						filter: {},
						filterByActive: {
							attribute: true,
							period: true,
							scope: true,
						},
						layer: {
							key: 'sl1',
						},
						mergedFilter: {},
					},
					{
						filter: {},
						filterByActive: {
							attribute: true,
							period: true,
							scope: true,
						},
						layer: {
							key: 'ml1',
						},
						mergedFilter: {},
					},
				],
			}
		);
	});

	it('getMapByMetadata_deprecated', function () {
		assert.deepStrictEqual(
			selectors.getMapByMetadata_deprecated(
				{
					maps: {
						maps: {
							m1: {
								key: 'm1',
								data: {metadataModifiers: {p: 'v'}},
							},
						},
					},
				},
				{p: 'v'}
			),
			{
				data: {
					metadataModifiers: {
						p: 'v',
					},
				},
				key: 'm1',
			}
		);
	});

	it('getMapSetNavigatorRange_deprecated', function () {
		assert.strictEqual(
			selectors.getMapSetNavigatorRange_deprecated(
				{
					maps: {
						sets: {
							s1: {
								key: 's1',
								data: {worldWindNavigator: {range: 3}},
							},
						},
					},
				},
				's1'
			),
			3
		);
	});

	it('getNavigator_deprecated', function () {
		assert.deepStrictEqual(
			selectors.getNavigator_deprecated(
				{
					maps: {
						maps: {
							m1: {key: 'm1', data: {worldWindNavigator: {p: 1}}},
						},
						sets: {
							s1: {
								key: 's1',
								maps: ['m1'],
								data: {worldWindNavigator: {p2: 2}},
							},
						},
					},
				},
				'm1'
			),
			{p2: 2, p: 1}
		);
	});
});
