import {assert} from 'chai';
import actions from '../../../src/state/Maps/actions';

describe('state/Maps/actions', function () {
	let dispatchedActions = [];

	const clearDispatchedActions = function () {
		dispatchedActions = [];
	};

	const runFunctionActions = function ({dispatch, getState}) {
		return new Promise((resolve, reject) => {
			const promises = [];
			for (let i = 0; i < dispatchedActions.length; i++) {
				const action = dispatchedActions[i];

				if (typeof action === 'function') {
					promises.push(action(dispatch, getState));
					dispatchedActions[i] = null;
				} else if (action instanceof Promise) {
					promises.push(action);
					dispatchedActions[i] = null;
				} else if (Array.isArray(action)) {
					dispatchedActions = [...dispatchedActions, ...action];
					dispatchedActions[i] = null;
				}
			}

			dispatchedActions = dispatchedActions.filter((a) => a != null);

			if (promises.length > 0) {
				return Promise.all(promises)
					.then(() => runFunctionActions({dispatch, getState}))
					.then(() => resolve());
			}

			resolve();
		});
	};

	afterEach(function () {
		clearDispatchedActions();
	});

	it('addLayer', function () {
		const getState = () => ({
			maps: {
				maps: {
					m1: {key: 'm1'},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.addLayer('m1', {key: 'l1'}, 0, false));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					index: 0,
					layer: {
						key: 'l1',
					},
					mapKey: 'm1',
					type: 'MAPS.LAYERS.LAYER.ADD',
				},
				{
					componentId: 'map_m1',
					type: 'SPATIAL_RELATIONS.USE.INDEXED.CLEAR',
				},
				{
					componentId: 'map_m1',
					type: 'SPATIAL_DATA_SOURCES.USE.KEYS.CLEAR',
				},
				{
					componentId: 'map_m1',
					type: 'LAYER_TEMPLATES.USE.KEYS.CLEAR',
				},
				{
					componentId: 'map_m1',
					type: 'AREAS.AREA_TREE_LEVELS.USE.KEYS.CLEAR',
				},
				{
					componentId: 'map_m1',
					type: 'STYLES.USE.KEYS.CLEAR',
				},
			]);
		});
	});

	it('addLayers', function () {
		const getState = () => ({
			maps: {
				maps: {
					m1: {key: 'm1'},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.addLayers('m1', [{key: 'l1'}]));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					index: undefined,
					layer: {
						key: 'l1',
					},
					mapKey: 'm1',
					type: 'MAPS.LAYERS.LAYER.ADD',
				},
				{
					componentId: 'map_m1',
					type: 'SPATIAL_RELATIONS.USE.INDEXED.CLEAR',
				},
				{
					componentId: 'map_m1',
					type: 'SPATIAL_DATA_SOURCES.USE.KEYS.CLEAR',
				},
				{
					componentId: 'map_m1',
					type: 'LAYER_TEMPLATES.USE.KEYS.CLEAR',
				},
				{
					componentId: 'map_m1',
					type: 'AREAS.AREA_TREE_LEVELS.USE.KEYS.CLEAR',
				},
				{
					componentId: 'map_m1',
					type: 'STYLES.USE.KEYS.CLEAR',
				},
			]);
		});
	});

	it('addMap', function () {
		const getState = () => ({
			maps: {
				maps: {},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.addMap({key: 'm1'}));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					map: {
						key: 'm1',
					},
					type: 'MAPS.MAP.ADD',
				},
			]);
		});
	});

	it('addMapForPeriod', function () {
		const getState = () => ({
			periods: {byKey: {p1: {key: 'p1'}}},
			maps: {
				maps: {
					m1: {key: 'm1', data: {metadataModifiers: {period: 'p1'}}},
				},
				sets: {
					s1: {key: 's1', maps: []},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.addMapForPeriod('p1', 's1'));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					mapKey: 'm1',
					setKey: 's1',
					type: 'MAPS.SET.ADD_MAP',
				},
			]);
		});
	});

	it('addMapToSet', function () {
		const getState = () => ({
			maps: {
				sets: {
					s1: {key: 's1', maps: []},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.addMapToSet('s1', 'm1'));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					mapKey: 'm1',
					setKey: 's1',
					type: 'MAPS.SET.ADD_MAP',
				},
			]);
		});
	});

	it('addSet', function () {
		const getState = () => ({
			maps: {
				sets: {},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.addSet({key: 's1'}));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					set: {
						key: 's1',
					},
					type: 'MAPS.SET.ADD',
				},
				{
					setKey: 's1',
					type: 'MAPS.SET_ACTIVE_SET_KEY',
				},
			]);
		});
	});

	it('removeLayer', function () {
		const getState = () => ({
			maps: {
				maps: {
					m1: {key: 'm1', data: {layers: [{key: 'l1'}]}},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.removeLayer('m1', 'l1'));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					layerKey: 'l1',
					mapKey: 'm1',
					type: 'MAPS.LAYERS.LAYER.REMOVE',
				},
			]);
		});
	});

	it('removeLayers', function () {
		const getState = () => ({
			maps: {
				maps: {
					m1: {key: 'm1', data: {layers: [{key: 'l1'}]}},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.removeLayers('m1', ['l1']));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					layerKey: 'l1',
					mapKey: 'm1',
					type: 'MAPS.LAYERS.LAYER.REMOVE',
				},
			]);
		});
	});

	it('removeMap', function () {
		const getState = () => ({
			maps: {
				maps: {
					m1: {key: 'm1'},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.removeMap('m1'));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					mapKey: 'm1',
					type: 'MAPS.MAP.REMOVE',
				},
			]);
		});
	});

	it('removeMapForPeriod', function () {
		const getState = () => ({
			maps: {
				maps: {
					m1: {key: 'm1', data: {metadataModifiers: {period: 'p1'}}},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.removeMapForPeriod('p1'));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					mapKey: 'm1',
					type: 'MAPS.MAP.REMOVE',
				},
			]);
		});
	});

	it('removeMapKeyFromSet', function () {
		const getState = () => ({
			maps: {
				sets: {
					s1: {key: 's1', maps: ['m1']},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.removeMapKeyFromSet('s1', 'm1'));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					mapKey: 'm1',
					setKey: 's1',
					type: 'MAPS.SET.REMOVE_MAP',
				},
			]);
		});
	});

	it('removeSet', function () {
		const getState = () => ({
			maps: {
				sets: {
					s1: {key: 's1'},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.removeSet('s1'));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					setKey: 's1',
					type: 'MAPS.SET.REMOVE',
				},
			]);
		});
	});

	it('setActiveMapKey', function () {
		const getState = () => ({
			maps: {
				maps: {
					m1: {key: 'm1'},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.setActiveMapKey('m1'));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					mapKey: 'm1',
					type: 'MAPS.SET_ACTIVE_MAP_KEY',
				},
			]);
		});
	});

	it('setActiveSetKey', function () {
		const getState = () => ({
			maps: {
				sets: {
					s1: {key: 's1'},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.setActiveSetKey('s1'));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					setKey: 's1',
					type: 'MAPS.SET_ACTIVE_SET_KEY',
				},
			]);
		});
	});

	it('setLayerHoveredFeatureKeys', function () {
		const getState = () => ({
			maps: {
				maps: {
					m1: {key: 'm1', data: {layers: [{key: 'l1'}]}},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.setLayerHoveredFeatureKeys('m1', 'l1', ['f1']));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					hoveredFeatureKeys: ['f1'],
					layerKey: 'l1',
					mapKey: 'm1',
					type: 'MAPS.MAP.LAYERS.SET.HOVERED_FEATURE_KEYS',
				},
			]);
		});
	});

	it('setLayerSelectedFeatureKeys', function () {
		const getState = () => ({
			selections: {activeKey: 's1'},
			maps: {
				maps: {
					m1: {key: 'm1', data: {layers: [{key: 'l1'}]}},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.setLayerSelectedFeatureKeys('m1', 'l1', ['f1']));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					featureKeys: ['f1'],
					key: 's1',
					type: 'SELECTIONS.SET.FEATURE_KEYS_FILTER.KEYS',
				},
			]);
		});
	});

	it('setLayerIndex', function () {
		const getState = () => ({
			maps: {
				maps: {
					m1: {key: 'm1', data: {layers: [{key: 'l1'}]}},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.setLayerIndex('m1', 'l1', 0));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					index: 0,
					layerKey: 'l1',
					mapKey: 'm1',
					type: 'MAPS.LAYERS.LAYER.SET_INDEX',
				},
			]);
		});
	});

	it('setMapBackgroundLayer', function () {
		const getState = () => ({
			maps: {
				maps: {
					m1: {key: 'm1'},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.setMapBackgroundLayer('m1', {key: 'bl1'}));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					backgroundLayer: {
						key: 'bl1',
					},
					mapKey: 'm1',
					type: 'MAPS.SET_BACKGROUND_LAYER',
				},
			]);
		});
	});

	it('setMapCase', function () {
		const getState = () => ({
			maps: {
				maps: {
					m1: {key: 'm1'},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.setMapCase('m1', 'c1'));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					case: 'c1',
					mapKey: 'm1',
					type: 'MAPS.SET_CASE',
				},
			]);
		});
	});

	it('setMapData', function () {
		const getState = () => ({
			maps: {
				maps: {
					m1: {key: 'm1'},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.setMapData('m1', {p: 'v'}));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					data: {
						p: 'v',
					},
					mapKey: 'm1',
					type: 'MAPS.MAP.SET_DATA',
				},
			]);
		});
	});

	it('setMapLayer', function () {
		const getState = () => ({
			maps: {
				maps: {
					m1: {key: 'm1', data: {layers: [{key: 'l1'}]}},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.setMapLayer('m1', 'l1', {key: 'l1'}));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					layer: {
						key: 'l1',
					},
					layerKey: 'l1',
					mapKey: 'm1',
					type: 'MAPS.LAYERS.LAYER.SET',
				},
			]);
		});
	});

	it('setMapLayerStyle', function () {
		const getState = () => ({
			maps: {
				maps: {
					m1: {key: 'm1', data: {layers: [{key: 'l1'}]}},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.setMapLayerStyle('m1', 'l1', {key: 's1'}));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					layerKey: 'l1',
					mapKey: 'm1',
					style: {
						key: 's1',
					},
					type: 'MAPS.MAP.LAYERS.SET.STYLE',
				},
			]);
		});
	});

	it('setMapLayers', function () {
		const getState = () => ({
			maps: {
				maps: {
					m1: {key: 'm1'},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.setMapLayers('m1', [{key: 'l1'}]));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					layers: [
						{
							key: 'l1',
						},
					],
					mapKey: 'm1',
					type: 'MAPS.LAYERS.SET',
				},
				{
					componentId: 'map_m1',
					type: 'SPATIAL_RELATIONS.USE.INDEXED.CLEAR',
				},
				{
					componentId: 'map_m1',
					type: 'SPATIAL_DATA_SOURCES.USE.KEYS.CLEAR',
				},
				{
					componentId: 'map_m1',
					type: 'LAYER_TEMPLATES.USE.KEYS.CLEAR',
				},
				{
					componentId: 'map_m1',
					type: 'AREAS.AREA_TREE_LEVELS.USE.KEYS.CLEAR',
				},
				{
					componentId: 'map_m1',
					type: 'STYLES.USE.KEYS.CLEAR',
				},
			]);
		});
	});

	it('setMapName', function () {
		const getState = () => ({
			maps: {
				maps: {
					m1: {key: 'm1'},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.setMapName('m1', 'nam'));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					mapKey: 'm1',
					name: 'nam',
					type: 'MAPS.MAP.SET_NAME',
				},
			]);
		});
	});

	it('setMapPeriod', function () {
		const getState = () => ({
			maps: {
				maps: {
					m1: {key: 'm1'},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.setMapPeriod('m1', {key: 'p1'}));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					mapKey: 'm1',
					period: {
						key: 'p1',
					},
					type: 'MAPS.SET_PERIOD',
				},
			]);
		});
	});

	it('setMapPlace', function () {
		const getState = () => ({
			maps: {
				maps: {
					m1: {key: 'm1'},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.setMapPlace('m1', {key: 'p1'}));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					mapKey: 'm1',
					place: {
						key: 'p1',
					},
					type: 'MAPS.SET_PLACE',
				},
			]);
		});
	});

	it('setMapScenario', function () {
		const getState = () => ({
			maps: {
				maps: {
					m1: {key: 'm1'},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.setMapScenario('m1', {key: 's1'}));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					mapKey: 'm1',
					scenario: {
						key: 's1',
					},
					type: 'MAPS.SET_SCENARIO',
				},
			]);
		});
	});

	it('setMapScope', function () {
		const getState = () => ({
			maps: {
				maps: {
					m1: {key: 'm1'},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.setMapScope('m1', {key: 's1'}));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					mapKey: 'm1',
					scope: {
						key: 's1',
					},
					type: 'MAPS.SET_SCOPE',
				},
			]);
		});
	});

	it('setMapView', function () {
		const getState = () => ({
			maps: {
				maps: {
					m1: {key: 'm1'},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.setMapView('m1', {key: 'v1'}));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					mapKey: 'm1',
					type: 'MAPS.MAP.VIEW.SET',
					view: {
						key: 'v1',
					},
				},
			]);
		});
	});

	it('setMapSetActiveMapKey', function () {
		const getState = () => ({
			maps: {
				maps: {
					m1: {key: 'm1'},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.setMapSetActiveMapKey('m1'));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, []);
		});
	});

	it('setSetBackgroundLayer', function () {
		const getState = () => ({
			maps: {
				sets: {
					s1: {key: 's1'},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.setSetBackgroundLayer('s1', {key: 'sbl1'}));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					backgroundLayer: {
						key: 'sbl1',
					},
					setKey: 's1',
					type: 'MAPS.SET.SET_BACKGROUND_LAYER',
				},
			]);
		});
	});

	it('setSetLayers', function () {
		const getState = () => ({
			maps: {
				sets: {
					s1: {key: 's1'},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.setSetLayers('s1', [{key: 'sl1'}]));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					layers: [
						{
							key: 'sl1',
						},
					],
					setKey: 's1',
					type: 'MAPS.SET.SET_LAYERS',
				},
			]);
		});
	});

	it('setSetSync', function () {
		const getState = () => ({
			maps: {
				sets: {
					s1: {key: 's1'},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.setSetSync('s1', true));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					setKey: 's1',
					sync: true,
					type: 'MAPS.SET.SET_SYNC',
				},
			]);
		});
	});

	it('setSetView', function () {
		const getState = () => ({
			maps: {
				sets: {
					s1: {key: 's1'},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.setSetView('s1', {key: 'v1'}));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					setKey: 's1',
					type: 'MAPS.SET.VIEW.SET',
					view: {
						key: 'v1',
					},
				},
			]);
		});
	});

	it('setInitial', function () {
		const getState = () => ({});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.setInitial());

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					type: 'MAPS.SET_INITIAL',
				},
			]);
		});
	});

	it('updateMapLayer', function () {
		const getState = () => ({
			maps: {
				maps: {
					m1: {key: 'm1', data: {layers: [{key: 'l1'}]}},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.updateMapLayer('m1', 'l1', {key: 'l1'}));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					layer: {
						key: 'l1',
					},
					layerKey: 'l1',
					mapKey: 'm1',
					type: 'MAPS.LAYERS.LAYER.UPDATE',
				},
			]);
		});
	});

	it('updateStateFromView', function () {
		const getState = () => ({
			maps: {
				sets: {
					s1: {key: 's1'},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.updateStateFromView({key: 'v1'}));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					data: {
						key: 'v1',
					},
					type: 'MAPS.UPDATE',
				},
			]);
		});
	});

	it('updateMapAndSetView', function () {
		const getState = () => ({
			maps: {
				maps: {
					m1: {key: 'm1'},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.updateMapAndSetView('m1', {key: 'v1'}));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					mapKey: 'm1',
					type: 'MAPS.MAP.VIEW.UPDATE',
					update: {
						key: 'v1',
					},
				},
			]);
		});
	});

	it('updateSetView', function () {
		const getState = () => ({
			maps: {
				sets: {
					s1: {key: 's1'},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.updateSetView('s1', {key: 'v1'}));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					mapKey: null,
					type: 'MAPS.MAP.VIEW.UPDATE',
					update: {
						key: 'v1',
					},
				},
			]);
		});
	});

	it('useClear', function () {
		const getState = () => ({
			maps: {
				maps: {
					m1: {key: 'm1'},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.useClear('m1'));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					componentId: 'map_m1',
					type: 'SPATIAL_RELATIONS.USE.INDEXED.CLEAR',
				},
				{
					componentId: 'map_m1',
					type: 'SPATIAL_DATA_SOURCES.USE.KEYS.CLEAR',
				},
				{
					componentId: 'map_m1',
					type: 'LAYER_TEMPLATES.USE.KEYS.CLEAR',
				},
				{
					componentId: 'map_m1',
					type: 'AREAS.AREA_TREE_LEVELS.USE.KEYS.CLEAR',
				},
				{
					componentId: 'map_m1',
					type: 'STYLES.USE.KEYS.CLEAR',
				},
			]);
		});
	});

	it('deprecated_setMapWorldWindNavigator', function () {
		const getState = () => ({
			maps: {
				maps: {
					m1: {key: 'm1'},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.deprecated_setMapWorldWindNavigator('m1', {p: 'v'}));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					mapKey: 'm1',
					type: 'MAPS.MAP.WORLD_WIND_NAVIGATOR.SET',
					worldWindNavigator: {
						p: 'v',
					},
				},
			]);
		});
	});

	it('deprecated_setSetWorldWindNavigator', function () {
		const getState = () => ({
			maps: {
				sets: {
					s1: {key: 's1'},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.deprecated_setSetWorldWindNavigator('s1', {p: 'v'}));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					setKey: 's1',
					type: 'MAPS.SET.WORLD_WIND_NAVIGATOR.SET',
					worldWindNavigator: {
						p: 'v',
					},
				},
			]);
		});
	});

	it('deprecated_updateWorldWindNavigator', function () {
		const getState = () => ({
			maps: {
				maps: {
					m1: {key: 'm1'},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.deprecated_updateWorldWindNavigator('m1', {p: 'v'}));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					mapKey: 'm1',
					type: 'MAPS.MAP.WORLD_WIND_NAVIGATOR.UPDATE',
					worldWindNavigator: {
						p: 'v',
					},
				},
			]);
		});
	});

	it('deprecated_useClear', function () {
		const getState = () => ({
			maps: {
				maps: {
					m1: {key: 'm1'},
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
		dispatch(actions.deprecated_useClear('m1'));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					componentId: 'map_m1',
					type: 'SPATIAL_RELATIONS.USE.INDEXED.CLEAR',
				},
			]);
		});
	});
});
