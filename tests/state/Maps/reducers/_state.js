export const MapReducersState = {
	activeSetKey: null,
	activeMapKey: null,
	inUse: {
		maps: ['map1', 'map3'],
		sets: ['set1'],
	},
	maps: {
		map1: {
			key: 'map1',
			data: {
				backgroundLayer: {
					layerTemplateKey: 'layerTemplate1',
				},
				layers: [
					{
						key: 'layer1',
						styleKey: 'style1',
					},
					{
						key: 'layer2',
						styleKey: 'style1',
					},
				],
				viewport: {
					width: 100,
					height: 100,
				},
			},
		},
		map2: {
			key: 'map2',
			data: {
				view: {
					boxRange: 1000,
				},
			},
		},
		map4: {
			key: 'map4',
			data: {
				layers: [
					{
						key: 'layer3',
					},
				],
			},
		},
		map11: {
			key: 'map11',
		},
	},
	sets: {
		set1: {
			activeMapKey: 'map1',
			maps: ['map1', 'map2', 'map3'],
			data: {},
		},
		set2: {
			maps: ['map4'],
			data: {
				view: {
					boxRange: 1000,
				},
				layers: [
					{
						key: 'layer1',
						styleKey: 'style1',
					},
				],
			},
		},
		set11: {
			data: {},
		},
	},
};
