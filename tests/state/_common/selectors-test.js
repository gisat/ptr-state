import {assert} from 'chai';
import selectors from '../../../src/state/_common/selectors';

describe('state/_common/selectors', function () {
	const getSubState = state => state.sub;

	describe('getActive', function () {
		const createState = activeKey => ({
			sub: {
				byKey: {
					k1: {n: 1},
					k2: {n: 2},
					k3: {n: 3, removed: true},
				},
				activeKey,
			},
		});

		it('select active', function () {
			assert.deepStrictEqual(
				selectors.getActive(getSubState)(createState('k1')),
				{n: 1}
			);
		});

		it('select inactive', function () {
			assert.isNull(selectors.getActive(getSubState)(createState('k3')));
		});
	});

	describe('getActiveModels', function () {
		const tests = [
			{
				name: 'none with null active keys',
				state: {
					sub: {
						byKey: {
							k1: {n: 1},
							k2: {n: 2},
							k3: {n: 3, removed: true},
						},
						activeKeys: null,
					},
				},
				expectedResult: null,
			},
			{
				name: 'none with empty active keys',
				state: {
					sub: {
						byKey: {
							k1: {n: 1},
							k2: {n: 2},
							k3: {n: 3, removed: true},
						},
						activeKeys: [],
					},
				},
				expectedResult: null,
			},
			{
				name: 'none with empty models',
				state: {
					sub: {
						byKey: {},
						activeKeys: ['k3'],
					},
				},
				expectedResult: null,
			},
			{
				name: 'none',
				state: {
					sub: {
						byKey: {
							k1: {n: 1},
							k2: {n: 2},
							k3: {n: 3, removed: true},
						},
						activeKeys: ['k3'],
					},
				},
				expectedResult: null,
			},
			{
				name: 'one',
				state: {
					sub: {
						byKey: {
							k1: {n: 1},
							k2: {n: 2},
							k3: {n: 3, removed: true},
						},
						activeKeys: ['k1', 'k3'],
					},
				},
				expectedResult: [{n: 1}],
			},
			{
				name: 'two',
				state: {
					sub: {
						byKey: {
							k1: {n: 1},
							k2: {n: 2},
							k3: {n: 3, removed: true},
						},
						activeKeys: ['k1', 'k2', 'k3'],
					},
				},
				expectedResult: [{n: 1}, {n: 2}],
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getActiveModels(getSubState)(test.state),
					test.expectedResult
				);
			});
		});
	});

	it('getActiveKey', function () {
		const state = {sub: {activeKey: 'k'}};

		assert.strictEqual(selectors.getActiveKey(getSubState)(state), 'k');
	});

	it('getActiveKeys', function () {
		const state = {sub: {activeKeys: ['k1', 'k2']}};

		assert.deepStrictEqual(selectors.getActiveKeys(getSubState)(state), [
			'k1',
			'k2',
		]);
	});

	describe('getAll', function () {
		const tests = [
			{
				name: 'null',
				state: {
					sub: {
						byKey: null,
					},
				},
				expectedResult: [],
			},
			{
				name: 'empty',
				state: {
					sub: {
						byKey: {},
					},
				},
				expectedResult: [],
			},
			{
				name: 'some',
				state: {
					sub: {
						byKey: {
							k1: {n: 1},
							k2: {n: 2},
							k3: {n: 3, removed: true},
						},
					},
				},
				expectedResult: [{n: 1}, {n: 2}],
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getAll(getSubState)(test.state),
					test.expectedResult
				);
			});
		});
	});

	describe('getAllActiveKeys', function () {
		const tests = [
			{
				name: 'none specified',
				state: {},
				expectedResult: {
					activeAreaTreeLevelKey: null,
					activeAttributeKey: null,
					activeAttributeKeys: null,
					activeCaseKey: null,
					activeCaseKeys: null,
					activeLayerTemplateKey: null,
					activePeriodKey: null,
					activePeriodKeys: null,
					activePlaceKey: null,
					activePlaceKeys: null,
					activeScenarioKey: null,
					activeScenarioKeys: null,
					activeScopeKey: null,
				},
			},
			{
				name: 'all specified',
				state: {
					scopes: {activeKey: 'scopesKey'},
					cases: {activeKey: 'casesKey', activeKeys: ['c1', 'c2']},
					scenarios: {activeKey: 'scenariosKey'},
					places: {activeKey: 'placesKey', activeKeys: ['p1', 'p2']},
					periods: {
						activeKey: 'periodsKey',
						activeKeys: ['ps1', 'ps2'],
					},
					attributes: {activeKey: 'attributesKey', activeKeys: ['a1', 'a2']},
					layerTemplates: {activeKey: 'layerTemplatesKey'},
					areaTreeLevelKeys: {activeKey: 'areaTreeLevelKey'},
					specific: {apps: {activeKey: 'appsKey'}},
					app: {key: 'appKey'},
				},
				expectedResult: {
					activeApplicationKey: 'appsKey',
					activeAreaTreeLevelKey: 'areaTreeLevelKey',
					activeAttributeKey: 'attributesKey',
					activeAttributeKeys: ['a1', 'a2'],
					activeCaseKey: 'casesKey',
					activeCaseKeys: ['c1', 'c2'],
					activeLayerTemplateKey: 'layerTemplatesKey',
					activePeriodKey: 'periodsKey',
					activePeriodKeys: ['ps1', 'ps2'],
					activePlaceKey: 'placesKey',
					activePlaceKeys: ['p1', 'p2'],
					activeScenarioKey: 'scenariosKey',
					activeScenarioKeys: null,
					activeScopeKey: 'scopesKey',
				},
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getAllActiveKeys(test.state),
					test.expectedResult
				);
			});
		});
	});

	describe('getAllAsObject', function () {
		const tests = [
			{
				name: 'null',
				state: {
					sub: {
						byKey: {},
					},
				},
				expectedResult: {},
			},
			{
				name: 'empty',
				state: {
					sub: {
						byKey: {},
					},
				},
				expectedResult: {},
			},
			{
				name: 'some',
				state: {
					sub: {
						byKey: {
							k1: {n: 1},
							k2: {n: 2},
							k3: {n: 3, removed: true},
						},
					},
				},
				expectedResult: {
					k1: {n: 1},
					k2: {n: 2},
				},
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getAllAsObject(getSubState)(test.state),
					test.expectedResult
				);
			});
		});
	});

	describe('getAllForActiveScope', function () {
		const tests = [
			{
				name: 'empty models',
				state: {
					sub: {},
					scopes: {
						activeKey: 'scopeK',
					},
				},
				expectedResult: null,
			},
			{
				name: 'empty indexes',
				state: {
					sub: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
						indexes: [],
					},
					scopes: {
						activeKey: 'scopeK',
					},
				},
				expectedResult: null,
			},
			{
				name: 'no active skope key',
				state: {
					sub: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
						indexes: [
							{filter: 'fil', order: 'desc'},
							{
								filter: {scopeKey: 'scopeK'},
								order: 'asc',
								count: 4,
								index: {1: null, 2: 'k1', 3: 'k2', 4: 'k3'},
							},
						],
					},
					scopes: {},
				},
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					sub: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
						indexes: [
							{filter: 'fil', order: 'desc'},
							{
								filter: {scopeKey: 'scopeK'},
								order: 'asc',
								count: 4,
								index: {1: null, 2: 'k1', 3: 'k2', 4: 'k3'},
							},
						],
					},
					scopes: {
						activeKey: 'scopeK',
					},
				},
				expectedResult: [null, {n: 1}, {n: 2}, {key: 'k3'}],
			},
		];
		const order = 'asc';

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getAllForActiveScope(getSubState)(test.state, order),
					test.expectedResult
				);
			});
		});
	});

	describe('getByFilterOrder', function () {
		const tests = [
			{
				name: 'empty models',
				state: {
					sub: {
						byKey: {},
						indexes: [
							{filter: 'fil', order: 'desc'},
							{
								filter: {scopeKey: 'scopeK'},
								order: 'asc',
								count: 4,
								index: {1: null, 2: 'k1', 3: 'k2', 4: 'k3'},
							},
						],
					},
				},
				expectedResult: [null, {key: 'k1'}, {key: 'k2'}, {key: 'k3'}],
			},
			{
				name: 'empty indexes',
				state: {
					sub: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
						indexes: [],
					},
				},
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					sub: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
						indexes: [
							{filter: 'fil', order: 'desc'},
							{
								filter: {scopeKey: 'scopeK'},
								order: 'asc',
								count: 4,
								index: {1: null, 2: 'k1', 3: 'k2', 4: 'k3'},
							},
						],
					},
				},
				expectedResult: [null, {n: 1}, {n: 2}, {key: 'k3'}],
			},
		];
		const filter = {scopeKey: 'scopeK'};
		const order = 'asc';

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getByFilterOrder(getSubState)(test.state, filter, order),
					test.expectedResult
				);
			});
		});
	});

	describe('getBatchByFilterOrder', function () {
		const tests = [
			{
				name: 'empty models',
				state: {
					sub: {
						byKey: {},
						indexes: [
							{filter: 'fil', order: 'desc'},
							{
								filter: {scopeKey: 'scopeK'},
								order: 'asc',
								count: 4,
								index: {1: null, 2: 'k1', 3: 'k2', 4: 'k3'},
							},
						],
					},
				},
				expectedResult: [null, null, null, null],
			},
			{
				name: 'empty indexes',
				state: {
					sub: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
						indexes: [],
					},
				},
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					sub: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
						indexes: [
							{filter: 'fil', order: 'desc'},
							{
								filter: {scopeKey: 'scopeK'},
								order: 'asc',
								count: 4,
								index: {1: null, 2: 'k1', 3: 'k2', 4: 'k3'},
							},
						],
					},
				},
				expectedResult: [null, {n: 1}, {n: 2}, null],
			},
		];
		const filter = {scopeKey: 'scopeK'};
		const order = 'asc';

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getBatchByFilterOrder(getSubState)(
						test.state,
						filter,
						order
					),
					test.expectedResult
				);
			});
		});
	});

	describe('getByKey', function () {
		const tests = [
			{
				name: 'none',
				state: {
					sub: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
					},
				},
				key: 'k3',
				expectedResult: null,
			},
			{
				name: 'null key',
				state: {
					sub: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
					},
				},
				key: null,
				expectedResult: undefined,
			},
			{
				name: 'some',
				state: {
					sub: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
					},
				},
				key: 'k1',
				expectedResult: {
					n: 1,
				},
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getByKey(getSubState)(test.state, test.key),
					test.expectedResult
				);
			});
		});
	});

	describe('getByKeysAsObject', function () {
		const tests = [
			{
				name: 'null keys',
				state: {
					sub: {
						byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
					},
				},
				keys: null,
				expectedResult: null,
			},
			{
				name: 'none',
				state: {
					sub: {
						byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
					},
				},
				keys: ['k5', 'k6'],
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					sub: {
						byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
					},
				},
				keys: ['k1', 'k2'],
				expectedResult: {
					k1: {n: 1},
					k2: {n: 2},
				},
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getByKeysAsObject(getSubState)(test.state, test.keys),
					test.expectedResult
				);
			});
		});
	});

	describe('getByKeys', function () {
		const tests = [
			{
				name: 'null keys',
				state: {
					sub: {
						byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
					},
				},
				keys: null,
				expectedResult: null,
			},
			{
				name: 'empty keys',
				state: {
					sub: {
						byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
					},
				},
				keys: [],
				expectedResult: null,
			},
			{
				name: 'none',
				state: {
					sub: {
						byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
					},
				},
				keys: ['k5', 'k6'],
				expectedResult: null,
			},
			{
				name: 'empty',
				state: {
					sub: {},
				},
				keys: ['k1', 'k2'],
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					sub: {
						byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
					},
				},
				keys: ['k1', 'k2'],
				expectedResult: [{n: 1}, {n: 2}],
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getByKeys(getSubState)(test.state, test.keys),
					test.expectedResult
				);
			});
		});
	});

	describe('getDataByKey', function () {
		const tests = [
			{
				name: 'none',
				state: {
					sub: {
						byKey: {k1: {n: 1, data: 'data'}, k2: {n: 2}},
					},
				},
				key: 'k5',
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					sub: {
						byKey: {k1: {n: 1, data: 'data'}, k2: {n: 2}},
					},
				},
				key: 'k1',
				expectedResult: 'data',
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.strictEqual(
					selectors.getDataByKey(getSubState)(test.state, test.key),
					test.expectedResult
				);
			});
		});
	});

	describe('getDeletePermissionByKey', function () {
		const tests = [
			{
				name: 'user with access',
				state: {
					sub: {
						byKey: {
							k1: {
								permissions: {
									activeUser: {
										delete: true,
									},
								},
							},
						},
					},
				},
				expectedResult: true,
			},
			{
				name: 'guest with access',
				state: {
					sub: {
						byKey: {
							k1: {
								permissions: {
									guest: {
										delete: true,
									},
								},
							},
						},
					},
				},
				expectedResult: true,
			},
			{
				name: 'no access',
				state: {
					sub: {},
				},
				expectedResult: false,
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.strictEqual(
					selectors.getDeletePermissionByKey(getSubState)(test.state, 'k1'),
					test.expectedResult
				);
			});
		});
	});

	describe('getUpdatePermissionByKey', function () {
		const tests = [
			{
				name: 'user with access',
				state: {
					sub: {
						byKey: {
							k1: {
								permissions: {
									activeUser: {
										update: true,
									},
								},
							},
						},
					},
				},
				expectedResult: true,
			},
			{
				name: 'guest with access',
				state: {
					sub: {
						byKey: {
							k1: {
								permissions: {
									guest: {
										update: true,
									},
								},
							},
						},
					},
				},
				expectedResult: true,
			},
			{
				name: 'no access',
				state: {
					sub: {},
				},
				expectedResult: false,
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.strictEqual(
					selectors.getUpdatePermissionByKey(getSubState)(test.state, 'k1'),
					test.expectedResult
				);
			});
		});
	});

	describe('getEditedActive', function () {
		const tests = [
			{
				name: 'none',
				state: {
					sub: {
						activeKey: 'k5',
						editedByKey: {k1: 'val1', k2: 'val2'},
					},
				},
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					sub: {
						activeKey: 'k1',
						editedByKey: {k1: 'val1', k2: 'val2'},
					},
				},
				expectedResult: 'val1',
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.strictEqual(
					selectors.getEditedActive(getSubState)(test.state),
					test.expectedResult
				);
			});
		});
	});

	describe('getEditedAll', function () {
		const tests = [
			{
				name: 'null',
				state: {
					sub: {
						editedByKey: null,
					},
				},
				expectedResult: null,
			},
			{
				name: 'empty',
				state: {
					sub: {
						editedByKey: {},
					},
				},
				expectedResult: [],
			},
			{
				name: 'some',
				state: {
					sub: {
						editedByKey: {k1: 'val1', k2: 'val2'},
					},
				},
				expectedResult: ['val1', 'val2'],
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getEditedAll(getSubState)(test.state),
					test.expectedResult
				);
			});
		});
	});

	describe('getEditedAllAsObject', function () {
		const tests = [
			{
				name: 'null',
				state: {
					sub: {
						editedByKey: null,
					},
				},
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					sub: {
						editedByKey: {prop: 'val'},
					},
				},
				expectedResult: {prop: 'val'},
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getEditedAllAsObject(getSubState)(test.state),
					test.expectedResult
				);
			});
		});
	});

	describe('getEditedByKey', function () {
		const tests = [
			{
				name: 'null key',
				state: {
					sub: {
						editedByKey: {k1: 'val1', k2: 'val2'},
					},
				},
				key: null,
				expectedResult: null,
			},
			{
				name: 'none',
				state: {
					sub: {
						editedByKey: {k1: 'val1', k2: 'val2'},
					},
				},
				key: 'k5',
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					sub: {
						editedByKey: {k1: 'val1', k2: 'val2'},
					},
				},
				key: 'k2',
				expectedResult: 'val2',
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.strictEqual(
					selectors.getEditedByKey(getSubState)(test.state, test.key),
					test.expectedResult
				);
			});
		});
	});

	describe('getEditedDataByKey', function () {
		const tests = [
			{
				name: 'none',
				state: {
					sub: {
						editedByKey: {k1: 'val1', k2: {data: 'datk2'}},
					},
				},
				key: 'k5',
				expectedResult: null,
			},
			{
				name: 'no data',
				state: {
					sub: {
						editedByKey: {k1: 'val1', k2: {data: 'datk2'}},
					},
				},
				key: 'k1',
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					sub: {
						editedByKey: {k1: 'val1', k2: {data: 'datk2'}},
					},
				},
				key: 'k2',
				expectedResult: 'datk2',
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.strictEqual(
					selectors.getEditedDataByKey(getSubState)(test.state, test.key),
					test.expectedResult
				);
			});
		});
	});

	describe('getEditedKeys', function () {
		const tests = [
			{
				name: 'null',
				state: {
					sub: {editedByKey: null},
				},
				expectedResult: null,
			},
			{
				name: 'empty',
				state: {
					sub: {editedByKey: {}},
				},
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					sub: {
						editedByKey: {k1: {key: 'ke1'}, k2: {key: 'ke2'}},
					},
				},
				expectedResult: ['ke1', 'ke2'],
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getEditedKeys(getSubState)(test.state),
					test.expectedResult
				);
			});
		});
	});

	describe('getIndex', function () {
		const tests = [
			{
				name: 'none',
				state: {
					sub: {
						indexes: [
							{filter: 'fil2', order: 'desc'},
							{filter: 'fil', order: 'desc'},
							{filter: 'fil', order: 'asc'},
							{filter: 'fil2', order: 'asc'},
						],
					},
				},
				filter: 'fil-not-present',
				order: 'asc',
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					sub: {
						indexes: [
							{filter: 'fil2', order: 'desc'},
							{filter: 'fil', order: 'desc'},
							{filter: 'fil', order: 'asc'},
							{filter: 'fil2', order: 'asc'},
						],
					},
				},
				filter: 'fil',
				order: 'asc',
				expectedResult: {filter: 'fil', order: 'asc'},
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getIndex(getSubState)(test.state, test.filter, test.order),
					test.expectedResult
				);
			});
		});
	});

	it('getIndexed', function () {
		const state = {
			sub: {
				scopes: {activeKey: 'scopesKey'},
				byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3, removed: true}},
				indexes: [
					{
						filterByActive: {scope: true},
						filter: {scopeKey: 'scopesKey'},
						order: 'asc',
						count: 7,
						index: {
							1: 'first',
							2: 'second',
							3: 'third',
							4: 'fourth',
							5: 'fifth',
							6: 'sixth',
							7: 'seventh',
						},
					},
				],
			},
		};
		const filterByActive = {scope: true};
		const filter = {scopeKey: 'scopesKey'};
		const order = 'asc';
		const start = 3;
		const length = 2;

		const expectedResult = [{key: 'third'}, {key: 'fourth'}];

		assert.deepStrictEqual(
			selectors.getIndexed(getSubState)(
				state,
				filterByActive,
				filter,
				order,
				start,
				length
			),
			expectedResult
		);
	});

	it('getIndexes', function () {
		assert.strictEqual(
			selectors.getIndexes(state => state.sub)({
				sub: {indexes: 'indexes'},
			}),
			'indexes'
		);
	});

	describe('getIndexChangedOn', function () {
		const indexes = [
			{filter: 'fil2', order: 'desc'},
			{filter: 'fil', order: 'desc', changedOn: '2020-01-01'},
			{filter: 'fil', order: 'asc'},
			{filter: 'fil2', order: 'asc'},
		];
		const filter = 'fil';
		const state = {sub: {indexes}};

		it('nil changedOn', function () {
			assert.deepStrictEqual(
				selectors.getIndexChangedOn(getSubState)(state, filter, 'asc'),
				null
			);
		});

		it('changedOn', function () {
			assert.deepStrictEqual(
				selectors.getIndexChangedOn(getSubState)(state, filter, 'desc'),
				'2020-01-01'
			);
		});
	});

	it('getIndexPage', function () {
		const state = {
			sub: {
				indexes: [
					{
						filter: 'fil',
						order: 'asc',
						count: 7,
						index: {
							1: 'first',
							2: 'second',
							3: 'third',
							4: 'fourth',
							5: 'fifth',
							6: 'sixth',
							7: 'seventh',
						},
					},
				],
			},
		};
		const filter = 'fil';
		const order = 'asc';
		const start = 3;
		const length = 2;

		const expectedResult = {3: 'third', 4: 'fourth'};

		assert.deepStrictEqual(
			selectors.getIndexPage(getSubState)(state, filter, order, start, length),
			expectedResult
		);
	});

	// getIndexPage selector returns object on which getIndexedPage accesses `length` property?
	// it.skip('getIndexedPage', function () {});

	it('getIndexTotal', function () {
		const state = {
			sub: {
				indexes: [
					{filter: 'fil2', order: 'desc'},
					{filter: 'fil', order: 'desc'},
					{filter: 'fil', order: 'asc', count: 5},
					{filter: 'fil2', order: 'asc'},
				],
			},
		};
		const filter = 'fil';
		const order = 'asc';

		assert.strictEqual(
			selectors.getIndexTotal(getSubState)(state, filter, order),
			5
		);
	});

	it('getIndexesByFilteredItem', function () {
		const state = {
			sub: {
				indexes: [
					{filter: 'fil2', order: 'desc'},
					{filter: {sameProp: 'that'}, order: 'desc'},
					{filter: {sameProp: 'notThis'}, order: 'asc', count: 5},
					{filter: {sameProp: 'that'}, order: 'asc'},
				],
			},
		};
		const item = {
			data: {
				sameProp: 'that',
			},
		};

		const expectedResult = [
			{filter: {sameProp: 'that'}, order: 'desc'},
			{filter: {sameProp: 'that'}, order: 'asc'},
		];

		assert.deepStrictEqual(
			selectors.getIndexesByFilteredItem(getSubState)(state, item),
			expectedResult
		);
	});

	describe('getKeysToLoad', function () {
		const tests = [
			{
				name: 'no keys',
				keys: [],
				state: {
					sub: {
						byKey: {
							k1: {p: '1'},
							k2: {p: '2'},
							k3: {p: '3', outdated: true},
						},
					},
				},
				expectedResult: null,
			},
			{
				name: 'null keys',
				keys: null,
				state: {
					sub: {
						byKey: {
							k1: {p: '1'},
							k2: {p: '2'},
							k3: {p: '3', outdated: true},
						},
					},
				},
				expectedResult: null,
			},
			{
				name: 'nothing loaded',
				keys: ['k1', 'k2'],
				state: {
					sub: {
						byKey: null,
					},
				},
				expectedResult: ['k1', 'k2'],
			},
			{
				name: 'all loaded',
				keys: ['k1', 'k2'],
				state: {
					sub: {
						byKey: {
							k1: {p: '1'},
							k2: {p: '2'},
							k3: {p: '3', outdated: true},
						},
					},
				},
				expectedResult: null,
			},
			{
				name: 'outdated k3, missing k5',
				keys: ['k1', 'k3', 'k5'],
				state: {
					sub: {
						byKey: {
							k1: {p: '1'},
							k2: {p: '2'},
							k3: {p: '3', outdated: true},
						},
					},
				},
				expectedResult: ['k3', 'k5'],
			},
		];

		tests.forEach(test => {
			assert.deepStrictEqual(
				selectors.getKeysToLoad(getSubState)(test.state, test.keys),
				test.expectedResult
			);
		});
	});

	describe('getStateToSave', function () {
		const tests = [
			{
				name: 'default state',
				getSubState: state => state.sub,
				state: {sub: {}},
				expectedResult: {},
			},
			{
				name: 'active key',
				getSubState: state => state.sub,
				state: {sub: {activeKey: 'actv'}},
				expectedResult: {activeKey: 'actv'},
			},
			{
				name: 'active keys',
				getSubState: state => state.sub,
				state: {sub: {activeKeys: ['k1', 'k2']}},
				expectedResult: {activeKeys: ['k1', 'k2']},
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getStateToSave(test.getSubState)(test.state),
					test.expectedResult
				);
			});
		});
	});

	it('getUsesForIndex', function () {
		const state = {
			scopes: {activeKey: 'scopesKey'},
			sub: {
				inUse: {
					indexes: [
						[
							{
								filterByActive: {scope: true},
								filter: {scopeKey: 'filter'},
								order: 'asc',
								start: 5,
								length: 3,
							},
						],
					],
				},
			},
		};
		const filter = {scopeKey: 'filter'};
		const order = 'asc';

		const expectedResult = {
			filter: {
				scopeKey: 'filter',
			},
			order: 'asc',
			uses: [{start: 5, length: 3}],
		};

		assert.deepStrictEqual(
			selectors.getUsesForIndex(getSubState)(state, filter, order),
			expectedResult
		);
	});

	it('getUsedIndexPages', function () {
		const state = {
			scopes: {activeKey: 'scopesKey'},
			sub: {
				inUse: {
					indexes: [
						[
							{
								filterByActive: {scope: true},
								filter: {scopeKey: 'filter'},
								order: 'asc',
								start: 5,
								length: 3,
							},
						],
					],
				},
			},
		};

		const expectedResult = [
			{
				filter: {
					scopeKey: 'filter',
				},
				order: 'asc',
				uses: [{start: 5, length: 3}],
			},
		];

		assert.deepStrictEqual(
			selectors.getUsedIndexPages(getSubState)(state),
			expectedResult
		);
	});

	it('getUsedKeys', function () {
		const state = {
			sub: {
				inUse: {
					keys: ['k1', 'k2', 'k3', ['k1', 'k3', 'k4']],
				},
			},
		};
		const expectedResult = ['k1', 'k2', 'k3', 'k4'];

		assert.deepStrictEqual(
			selectors.getUsedKeys(getSubState)(state),
			expectedResult
		);
	});

	it('getUsesWithActiveDependency', function () {
		const state = {
			scopes: {activeKey: 'scopesKey'},
			sub: {
				inUse: {
					indexes: [
						[
							{
								filterByActive: {scopeKey: 'k'},
								filter: {scopeKey: 'filter'},
								order: 'asc',
								start: 5,
								length: 3,
							},
						],
					],
				},
			},
		};
		const filter = {scopeKey: 'scopesKey'};
		const order = 'asc';

		const expectedResult = [
			{
				filter: {
					scopeKey: 'filter',
				},
				order: 'asc',
				uses: [
					{
						length: 3,
						start: 5,
					},
				],
			},
		];

		assert.deepStrictEqual(
			selectors.getUsesWithActiveDependency(getSubState)(state, filter, order),
			expectedResult
		);
	});

	describe('_mergeIntervals', function () {
		const tests = [
			{
				name: 'empty',
				intervals: [],
				expectedResult: null,
			},
			{
				name: 'single',
				intervals: [
					{
						start: 5,
						length: 3,
					},
				],
				expectedResult: [
					{
						start: 5,
						length: 3,
					},
				],
			},
			{
				name: 'non overlapping unsorted',
				intervals: [
					{
						start: 10,
						length: 2,
					},
					{
						start: 3,
						length: 4,
					},
					{
						start: 8,
						length: 1,
					},
				],
				expectedResult: [
					{
						start: 3,
						length: 4,
					},
					{
						start: 8,
						length: 1,
					},
					{
						start: 10,
						length: 2,
					},
				],
			},
			{
				name: 'overlapping unsorted',
				intervals: [
					{
						start: 12,
						length: 1,
					},
					{
						start: 10,
						length: 2,
					},
					{
						start: 7,
						length: 3,
					},
				],
				expectedResult: [
					{
						start: 7,
						length: 6,
					},
				],
			},
			{
				name: 'mixed',
				intervals: [
					{
						start: 12,
						length: 1,
					},
					{
						name: 'invalid interval',
					},
					null,
					{
						start: 10,
						length: 2,
					},
					{start: 20, length: 5},
				],
				expectedResult: [
					{start: 10, length: 3},
					{start: 20, length: 5},
				],
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors._mergeIntervals(test.intervals),
					test.expectedResult
				);
			});
		});
	});
});
