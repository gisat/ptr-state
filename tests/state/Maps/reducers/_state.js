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
			},
		},
	},
};