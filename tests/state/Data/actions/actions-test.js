import {assert} from 'chai';
import actions from '../../../../src/state/Data/actions';
import {resetFetch} from '../../../../src/state/_common/request';

describe('state/Data/actions', function () {
	this.timeout(5000);
	let dispatchedActions = [];

	const clearDispatchedActions = function () {
		dispatchedActions = [];
	};

	const getDispatch = getState => {
		return action => {
			const dispatch = getDispatch(getState);
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
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

			dispatchedActions = dispatchedActions.filter(a => a != null);

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
		resetFetch();
	});

	describe('getRestRelationsPages', function () {
		it('No page is missing', function () {
			assert.strictEqual(actions.getRestRelationsPages(100, 100, 100), 0);
		});

		it('One page is missing for attributeRelations', function () {
			assert.strictEqual(actions.getRestRelationsPages(101, 100, 100), 1);
		});
		it('One page is missing for spatialRelations', function () {
			assert.strictEqual(actions.getRestRelationsPages(100, 101, 100), 1);
		});

		it('Two page are missing for spatialRelations while spatialRelations is 299', function () {
			assert.strictEqual(actions.getRestRelationsPages(100, 299, 100), 2);
		});

		it('Two page are missing for spatialRelations while spatialRelations is 300', function () {
			assert.strictEqual(actions.getRestRelationsPages(100, 300, 100), 2);
		});

		it('No page is missing cause no data are required.', function () {
			assert.strictEqual(actions.getRestRelationsPages(0, 0, 100), 0);
		});
	});

	describe('loadMissingRelationsAndData', function () {
		it('dispatch nothing', function () {
			const getState = () => ({});
			const dispatch = getDispatch(getState);

			const loadGeometry = null;
			const spatialFilterWithMissingTiles = null;
			const styleKey = null;
			const order = null;
			const spatialRelationsFilter = null;
			const attributeRelationsFilter = null;
			const attributeRelationsCount = null;
			const spatialRelationsCount = null;
			const preloadSpatialDataSources = null;
			const attributeDataFilter = null;
			dispatch(
				actions.loadMissingRelationsAndData(
					loadGeometry,
					spatialFilterWithMissingTiles,
					styleKey,
					order,
					spatialRelationsFilter,
					attributeRelationsFilter,
					attributeRelationsCount,
					spatialRelationsCount,
					preloadSpatialDataSources,
					attributeDataFilter
				)
			);

			return runFunctionActions({dispatch, getState}).then(() => {
				assert.deepStrictEqual(dispatchedActions, []);
			});
		});

		// it('dispatch ', function () {
		// 	const getState = () => ({});
		// 	const dispatch = getDispatch(getState);

		// 	const loadGeometry = null;
		// 	const spatialFilterWithMissingTiles = null;
		// 	const styleKey = null;
		// 	const order = null;
		// 	const spatialRelationsFilter = null;
		// 	const attributeRelationsFilter = null;
		// 	const attributeRelationsCount = 101;
		// 	const spatialRelationsCount = null;
		// 	const preloadSpatialDataSources = null;
		// 	const attributeDataFilter = null;
		// 	dispatch(
		// 		actions.loadMissingRelationsAndData(loadGeometry,
		// 			spatialFilterWithMissingTiles,
		// 			styleKey,
		// 			order,
		// 			spatialRelationsFilter,
		// 			attributeRelationsFilter,
		// 			attributeRelationsCount,
		// 			spatialRelationsCount,
		// 			preloadSpatialDataSources,
		// 			attributeDataFilter)
		// 	);

		// 	return runFunctionActions({dispatch, getState}).then(() => {
		// 		assert.deepStrictEqual(dispatchedActions, [
		// 			// {
		// 			// 	type: 'DATA.SPATIAL_RELATIONS.INDEX.ADD',
		// 			// 	filter,
		// 			// 	order,
		// 			// 	start,
		// 			// 	count: total,
		// 			// 	data: result,
		// 			// 	changedOn: changes,
		// 			// },
		// 		]);
		// 	});
		// });
	});

	describe('hasMissingAttributesData', function () {
		it('Find that has MissingAttributesData', function () {
			const attributeDataIndex = null;
			const spatialFilter = {
				tiles: [[0, 0]],
				level: 1,
			};
			const hasMissingAttributesData = actions.hasMissingAttributesData(
				attributeDataIndex,
				spatialFilter
			);
			assert.deepStrictEqual(hasMissingAttributesData, true);
		});

		it('Find that has MissingAttributesData _1', function () {
			const attributeDataIndex = {
				index: {
					1: {
						'0,0': true,
					},
				},
			};
			const spatialFilter = {
				tiles: [
					[0, 0],
					[0, 1],
				],
				level: 1,
			};
			const hasMissingAttributesData = actions.hasMissingAttributesData(
				attributeDataIndex,
				spatialFilter
			);
			assert.deepStrictEqual(hasMissingAttributesData, true);
		});

		it('Find that has MissingAttributesData _2', function () {
			const attributeDataIndex = {
				index: {
					1: {
						'0,0': true,
					},
				},
			};
			const spatialFilter = {
				tiles: [[0, 0]],
				level: 2,
			};
			const hasMissingAttributesData = actions.hasMissingAttributesData(
				attributeDataIndex,
				spatialFilter
			);
			assert.deepStrictEqual(hasMissingAttributesData, true);
		});

		it('Find that has no MissingAttributesData', function () {
			const attributeDataIndex = {
				index: {
					1: {
						'0,0': true,
					},
				},
			};
			const spatialFilter = {
				tiles: [[0, 0]],
				level: 1,
			};
			const hasMissingAttributesData = actions.hasMissingAttributesData(
				attributeDataIndex,
				spatialFilter
			);
			assert.deepStrictEqual(hasMissingAttributesData, false);
		});

		it('Find that has no MissingAttributesData _2', function () {
			const attributeDataIndex = {
				index: {
					1: {
						'0,0': true,
					},
				},
			};
			const spatialFilter = {};
			const hasMissingAttributesData = actions.hasMissingAttributesData(
				attributeDataIndex,
				spatialFilter
			);
			assert.deepStrictEqual(hasMissingAttributesData, false);
		});
	});

	describe('hasMissingSpatialData', function () {
		it('Find that has MissingAttributesData', function () {
			const attributeDataIndex = null;
			const spatialFilter = {
				tiles: [[0, 0]],
				level: 1,
			};
			const hasMissingSpatialData = actions.hasMissingSpatialData(
				attributeDataIndex,
				spatialFilter
			);
			assert.deepStrictEqual(hasMissingSpatialData, true);
		});

		it('Find that has MissingAttributesData _1', function () {
			const attributeDataIndex = {
				index: {
					1: {
						'0,0': true,
					},
				},
			};
			const spatialFilter = {
				tiles: [
					[0, 0],
					[0, 1],
				],
				level: 1,
			};
			const hasMissingSpatialData = actions.hasMissingSpatialData(
				attributeDataIndex,
				spatialFilter
			);
			assert.deepStrictEqual(hasMissingSpatialData, true);
		});

		it('Find that has MissingAttributesData _2', function () {
			const attributeDataIndex = {
				index: {
					1: {
						'0,0': true,
					},
				},
			};
			const spatialFilter = {
				tiles: [[0, 0]],
				level: 2,
			};
			const hasMissingSpatialData = actions.hasMissingSpatialData(
				attributeDataIndex,
				spatialFilter
			);
			assert.deepStrictEqual(hasMissingSpatialData, true);
		});

		it('Find that has no MissingAttributesData', function () {
			const attributeDataIndex = {
				index: {
					1: {
						'0,0': true,
					},
				},
			};
			const spatialFilter = {
				tiles: [[0, 0]],
				level: 1,
			};
			const hasMissingSpatialData = actions.hasMissingSpatialData(
				attributeDataIndex,
				spatialFilter
			);
			assert.deepStrictEqual(hasMissingSpatialData, false);
		});

		it('Find that has no MissingAttributesData _2', function () {
			const attributeDataIndex = {
				index: {
					1: {
						'0,0': true,
					},
				},
			};
			const spatialFilter = {};
			const hasMissingSpatialData = actions.hasMissingSpatialData(
				attributeDataIndex,
				spatialFilter
			);
			assert.deepStrictEqual(hasMissingSpatialData, false);
		});
	});

	describe('hasSpatialOrAreaRelations', function () {
		it('Find that has SpatialOrAreaRelations', function () {
			const state = {
				data: {
					spatialRelations: {
						indexes: [
							{
								filter: {
									layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
									modifiers: {
										scopeKey: 'c81d59c8-0b4c-4df3-9c20-375f977660d3',
										placeKey: {
											in: [
												'8b65f2c9-bd6a-4d92-bc09-af604761f2f1',
												'9e28f519-dc30-4ebb-bcc8-97f696d9cf2a',
											],
										},
										caseKey: '4c2afea6-0964-458e-88a7-a65318554487',
										periodKey: '439af632-5804-4fc0-b641-a9c34cc6a853',
									},
								},
								order: null,
							},
						],
					},
				},
			};
			const spatialRelationsFilter = {
				layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
				modifiers: {
					scopeKey: 'c81d59c8-0b4c-4df3-9c20-375f977660d3',
					placeKey: {
						in: [
							'8b65f2c9-bd6a-4d92-bc09-af604761f2f1',
							'9e28f519-dc30-4ebb-bcc8-97f696d9cf2a',
						],
					},
					caseKey: '4c2afea6-0964-458e-88a7-a65318554487',
					periodKey: '439af632-5804-4fc0-b641-a9c34cc6a853',
				},
			};
			const order = null;
			const hasSpatialOrAreaRelations = actions.hasSpatialOrAreaRelations(
				state,
				spatialRelationsFilter,
				order
			);
			assert.deepStrictEqual(hasSpatialOrAreaRelations, true);
		});
		it('Find that has SpatialOrAreaRelations _1', function () {
			const state = {
				data: {
					spatialRelations: {
						indexes: [
							{
								filter: {
									layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
									modifiers: {
										scopeKey: 'c81d59c8-0b4c-4df3-9c20-375f977660d3',
										placeKey: {
											in: [
												'8b65f2c9-bd6a-4d92-bc09-af604761f2f1',
												'9e28f519-dc30-4ebb-bcc8-97f696d9cf2a',
											],
										},
										caseKey: '4c2afea6-0964-458e-88a7-a65318554487',
										periodKey: '439af632-5804-4fc0-b641-a9c34cc6a853',
									},
								},
								order: null,
							},
						],
					},
				},
			};
			const spatialRelationsFilter = {
				modifiers: {
					scopeKey: 'c81d59c8-0b4c-4df3-9c20-375f977660d3',
					placeKey: {
						in: [
							'8b65f2c9-bd6a-4d92-bc09-af604761f2f1',
							'9e28f519-dc30-4ebb-bcc8-97f696d9cf2a',
						],
					},
					caseKey: '4c2afea6-0964-458e-88a7-a65318554487',
					periodKey: '439af632-5804-4fc0-b641-a9c34cc6a853',
				},
			};
			const order = null;
			const hasSpatialOrAreaRelations = actions.hasSpatialOrAreaRelations(
				state,
				spatialRelationsFilter,
				order
			);
			assert.deepStrictEqual(hasSpatialOrAreaRelations, false);
		});

		it('Find that has SpatialOrAreaRelations _2', function () {
			const state = {
				data: {
					spatialRelations: {
						indexes: [
							{
								filter: {
									layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
									modifiers: {
										scopeKey: 'c81d59c8-0b4c-4df3-9c20-375f977660d3',
										placeKey: {
											in: [
												'8b65f2c9-bd6a-4d92-bc09-af604761f2f1',
												'9e28f519-dc30-4ebb-bcc8-97f696d9cf2a',
											],
										},
										caseKey: '4c2afea6-0964-458e-88a7-a65318554487',
										periodKey: '439af632-5804-4fc0-b641-a9c34cc6a853',
									},
								},
								order: null,
							},
						],
					},
				},
			};
			const spatialRelationsFilter = {
				layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
				modifiers: {
					placeKey: {
						in: [
							'8b65f2c9-bd6a-4d92-bc09-af604761f2f1',
							'9e28f519-dc30-4ebb-bcc8-97f696d9cf2a',
						],
					},
					caseKey: '4c2afea6-0964-458e-88a7-a65318554487',
					periodKey: '439af632-5804-4fc0-b641-a9c34cc6a853',
				},
			};
			const order = null;
			const hasSpatialOrAreaRelations = actions.hasSpatialOrAreaRelations(
				state,
				spatialRelationsFilter,
				order
			);
			assert.deepStrictEqual(hasSpatialOrAreaRelations, false);
		});
	});
});
