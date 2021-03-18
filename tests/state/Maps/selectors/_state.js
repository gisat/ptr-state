export const MapsSelectorsState = {
	scopes: {},
	scenarios: {},
	cases: {},
	places: {
		activeKey: 'place1',
	},
	maps: {
		maps: {
			map1: {
				key: 'map1',
				name: 'Map 1',
				data: {
					backgroundLayer: {
						layerTemplateKey: 'layerTemplateBackground',
					},
					layers: [
						{
							key: 'layer1',
							name: 'Layer 1',
							layerTemplateKey: 'layerTemplate1',
							styleKey: 'style1',
							metadataModifiers: {
								placeKey: 'place1',
								scenarioKeys: ['scenario1', 'scenario2'],
							},
							filterByActive: {
								place: true,
								layerTemplateKey: true,
								applicationKey: true,
							},
						},
						{
							key: 'layerDefinition1',
							name: 'Layer with definitions',
							type: 'vector',
							options: {
								features: [],
								style: {
									styles: [
										{
											fill: '#ff0000',
										},
									],
								},
							},
						},
					],
					metadataModifiers: null,
					filterByActive: {
						period: true,
					},
					viewport: {
						width: 800,
						height: 600,
					},
					view: {
						boxRange: 500000,
						center: {
							lat: 49,
							lon: 10,
						},
					},
				},
			},
			map2: {
				key: 'map2',
				name: 'Map 2',
				data: {
					backgroundLayer: null,
					layers: [
						{
							key: 'layer3',
							name: 'Layer 3',
							layerTemplateKey: 'layerTemplate3',
							styleKey: 'style3',
							metadataModifiers: {
								placeKey: 'place2',
							},
						},
					],
					view: {
						boxRange: 1000000,
					},
					metadataModifiers: {
						periodKey: 'period2',
					},
				},
			},
			map3: {
				key: 'map3',
				name: 'Map 3',
				data: {
					backgroundLayer: {
						type: 'wmts',
						options: {
							url: 'http://back.ground',
						},
					},
				},
			},
		},
		sets: {
			set1: {
				key: 'set1',
				activeMapKey: 'map1',
				maps: ['map1', 'map2'],
				sync: {center: true},
				data: {
					backgroundLayer: {
						type: 'wmts',
						options: {
							url: 'http://backgroundLayer.no',
						},
					},
					layers: [
						{
							key: 'layer2',
							layerTemplateKey: 'layerTemplate2',
							metadataModifiers: {
								periodKey: 'period1',
							},
						},
					],
					metadataModifiers: {
						scopeKey: 'scope1',
					},
					filterByActive: null,
					view: {
						center: {
							lat: 50,
							lon: 10,
						},
					},
					viewLimits: [500, 500000],
				},
			},
			set2: {
				maps: ['map3'],
			},
		},
		inUse: {
			maps: ['map1', 'map2'],
			sets: ['set1'],
		},
	},
};

export const MapsSelectorsState_2 = {
	maps: {
		maps: {
			map1: {
				key: 'map1',
				name: 'Map 1',
				data: {
					backgroundLayer: {
						key: 'definedBackground',
						type: 'wmts',
						options: {
							url: 'https://background.defined',
						},
					},
					view: {
						center: {
							lat: 0,
							lon: 0,
						},
						boxRange: 50000,
					},
					viewport: {
						width: 50,
						height: 50,
					},
				},
			},
			map2: {
				key: 'map1',
				name: 'Map 1',
				data: {
					backgroundLayer: {
						layerTemplateKey: 'layerTemplateWmts',
					},
					view: {
						center: {
							lat: 0,
							lon: 0,
						},
						boxRange: 50000,
					},
					viewport: {
						width: 50,
						height: 50,
					},
				},
			},
			map3: {
				key: 'map3',
				name: 'Map 3',
				data: {
					backgroundLayer: {
						key: 'definedBackground',
						options: {
							url: 'https://background.defined',
						},
					},
				},
			},
			map4: {
				key: 'map4',
				name: 'Map 4',
				data: {
					backgroundLayer: {
						layerTemplateKey: 'layerTemplateUnsupportedLayerType',
					},
				},
			},
		},
	},
};
