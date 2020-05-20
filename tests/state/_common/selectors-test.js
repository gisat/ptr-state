import {assert} from 'chai';
import selectors from '../../../src/state/_common/selectors';

describe('state/_common/selectors', function () {
	describe('getActive', function () {
		const getSubState = (state) => state.sub;
		const createState = (activeKey) => ({
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

	it('getActiveModels', function () {
		const getSubState = (state) => state.sub;
		const state = {
			sub: {
				byKey: {
					k1: {n: 1},
					k2: {n: 2},
					k3: {n: 3, removed: true},
				},
				activeKeys: ['k1', 'k3'],
			},
		};

		assert.deepStrictEqual(selectors.getActiveModels(getSubState)(state), [
			{n: 1},
		]);
	});

	it('getActiveKey', function () {
		const getSubState = (state) => state.sub;
		const state = {sub: {activeKey: 'k'}};

		assert.strictEqual(selectors.getActiveKey(getSubState)(state), 'k');
	});

	it('getActiveKeys', function () {
		const getSubState = (state) => state.sub;
		const state = {sub: {activeKeys: ['k1', 'k2']}};

		assert.deepStrictEqual(selectors.getActiveKeys(getSubState)(state), [
			'k1',
			'k2',
		]);
	});

	it('getAll', function () {
		const getSubState = (state) => state.sub;
		const state = {
			sub: {byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3, removed: true}}},
		};

		assert.deepStrictEqual(selectors.getAll(getSubState)(state), [
			{n: 1},
			{n: 2},
		]);
	});

	it('getAllActiveKeys', function () {
		const state = {
			scopes: {activeKey: 'scopesKey'},
			cases: {activeKey: 'casesKey'},
			scenarios: {activeKey: 'scenariosKey'},
			places: {activeKey: 'placesKey', activeKeys: ['p1', 'p2']},
			periods: {activeKey: 'periodsKey', activeKeys: ['ps1', 'ps2']},
			attributes: {activeKey: 'attributesKey'},
			layerTemplates: {activeKey: 'layerTemplatesKey'},
			areaTreeLevelKeys: {activeKey: 'areaTreeLevelKey'},
			specific: {apps: {activeKey: 'appsKey'}},
			app: {key: 'appKey'},
		};

		assert.deepStrictEqual(selectors.getAllActiveKeys(state), {
			activeApplicationKey: 'appsKey',
			activeAreaTreeLevelKey: 'areaTreeLevelKey',
			activeAttributeKey: 'attributesKey',
			activeCaseKey: 'casesKey',
			activeLayerTemplateKey: 'layerTemplatesKey',
			activePeriodKey: 'periodsKey',
			activePeriodKeys: ['ps1', 'ps2'],
			activePlaceKey: 'placesKey',
			activePlaceKeys: ['p1', 'p2'],
			activeScenarioKey: 'scenariosKey',
			activeScopeKey: 'scopesKey',
		});
	});

	it('getAllAsObject', function () {
		const getSubState = (state) => state.sub;
		const state = {
			sub: {byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3, removed: true}}},
		};

		assert.deepStrictEqual(selectors.getAllAsObject(getSubState)(state), {
			k1: {n: 1},
			k2: {n: 2},
		});
	});

	it('getAllForActiveScope', function () {
		const getSubState = (state) => state.sub;
		const state = {
			sub: {
				byKey: {k1: {n: 1}, k2: {n: 2}},
				indexes: [
					{filter: 'fil', order: 'desc'},
					{
						filter: {scopeKey: 'scopeK'},
						order: 'asc',
						count: 4,
						index: [null, 'k1', 'k2', 'k3'],
					},
				],
			},
			scopes: {
				activeKey: 'scopeK',
			},
		};
		const order = 'asc';

		assert.deepStrictEqual(
			selectors.getAllForActiveScope(getSubState)(state, order),
			[{n: 1}, {n: 2}, {key: 'k3'}, null]
		);
	});

	it('getByFilterOrder', function () {
		const getSubState = (state) => state.sub;
		const state = {
			sub: {
				byKey: {k1: {n: 1}, k2: {n: 2}},
				indexes: [
					{filter: 'fil', order: 'desc'},
					{
						filter: {scopeKey: 'scopeK'},
						order: 'asc',
						count: 4,
						index: [null, 'k1', 'k2', 'k3'],
					},
				],
			},
		};
		const filter = {scopeKey: 'scopeK'};
		const order = 'asc';

		assert.deepStrictEqual(
			selectors.getByFilterOrder(getSubState)(state, filter, order),
			[{n: 1}, {n: 2}, {key: 'k3'}, null]
		);
	});

	describe('getBatchByFilterOrder', function () {
		const getSubState = (state) => state.sub;
		const state = {
			sub: {
				byKey: {k1: {n: 1}, k2: {n: 2}},
				indexes: [
					{filter: 'fil', order: 'desc'},
					{
						filter: {scopeKey: 'scopeK'},
						order: 'asc',
						count: 4,
						index: [null, 'k1', 'k2', 'k3'],
					},
				],
			},
		};
		const filter = {scopeKey: 'scopeK'};
		const order = 'asc';

		assert.deepStrictEqual(
			selectors.getBatchByFilterOrder(getSubState)(state, filter, order),
			[null, {n: 1}, {n: 2}, null]
		);
	});

	it('getByKey', function () {
		const getSubState = (state) => state.sub;
		const state = {
			sub: {
				byKey: {k1: {n: 1}, k2: {n: 2}},
			},
		};

		assert.deepStrictEqual(selectors.getByKey(getSubState)(state, 'k1'), {
			n: 1,
		});
	});

	it('getByKeysAsObject', function () {
		const getSubState = (state) => state.sub;
		const state = {
			sub: {
				byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
			},
		};

		assert.deepStrictEqual(
			selectors.getByKeysAsObject(getSubState)(state, ['k1', 'k2']),
			{
				k1: {n: 1},
				k2: {n: 2},
			}
		);
	});

	it('getByKeys', function () {
		const getSubState = (state) => state.sub;
		const state = {
			sub: {
				byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
			},
		};

		assert.deepStrictEqual(
			selectors.getByKeys(getSubState)(state, ['k1', 'k2']),
			[{n: 1}, {n: 2}]
		);
	});

	describe('getDataByKey', function () {
		const getSubState = (state) => state.sub;
		const state = {
			sub: {
				byKey: {k1: {n: 1, data: 'data'}, k2: {n: 2}},
			},
		};

		assert.strictEqual(
			selectors.getDataByKey(getSubState)(state, 'k1'),
			'data'
		);
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

		const getSubState = (state) => state.sub;

		tests.forEach((test) => {
			it(test.name, function () {
				assert.strictEqual(
					selectors.getDeletePermissionByKey(getSubState)(
						test.state,
						'k1'
					),
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

		const getSubState = (state) => state.sub;

		tests.forEach((test) => {
			it(test.name, function () {
				assert.strictEqual(
					selectors.getUpdatePermissionByKey(getSubState)(
						test.state,
						'k1'
					),
					test.expectedResult
				);
			});
		});
	});

	it('getEditedActive', function () {
		const state = {
			sub: {
				activeKey: 'k1',
				editedByKey: {k1: 'val1', k2: 'val2'},
			},
		};
		const getSubState = (state) => state.sub;

		assert.strictEqual(
			selectors.getEditedActive(getSubState)(state),
			'val1'
		);
	});

	it('getEditedAll', function () {
		const state = {
			sub: {
				activeKey: 'k1',
				editedByKey: {k1: 'val1', k2: 'val2'},
			},
		};
		const getSubState = (state) => state.sub;

		assert.deepStrictEqual(selectors.getEditedAll(getSubState)(state), [
			'val1',
			'val2',
		]);
	});

	it('getEditedAllAsObject', function () {
		const state = {
			sub: {
				editedByKey: {prop: 'val'},
			},
		};
		const getSubState = (state) => state.sub;

		assert.deepStrictEqual(
			selectors.getEditedAllAsObject(getSubState)(state),
			{prop: 'val'}
		);
	});

	it('getEditedByKey', function () {
		const state = {
			sub: {
				editedByKey: {k1: 'val1', k2: 'val2'},
			},
		};
		const getSubState = (state) => state.sub;

		assert.strictEqual(
			selectors.getEditedByKey(getSubState)(state, 'k2'),
			'val2'
		);
	});

	it('getEditedDataByKey', function () {
		const state = {
			sub: {
				editedByKey: {k1: 'val1', k2: {data: 'datk2'}},
			},
		};
		const getSubState = (state) => state.sub;

		assert.strictEqual(
			selectors.getEditedDataByKey(getSubState)(state, 'k2'),
			'datk2'
		);
	});

	it('getEditedKeys', function () {
		const state = {
			sub: {
				editedByKey: {k1: {key: 'ke1'}, k2: {key: 'ke2'}},
			},
		};
		const getSubState = (state) => state.sub;

		assert.deepStrictEqual(selectors.getEditedKeys(getSubState)(state), [
			'ke1',
			'ke2',
		]);
	});

	it('getIndex', function () {
		const getSubState = (state) => state.sub;
		const indexes = [
			{filter: 'fil2', order: 'desc'},
			{filter: 'fil', order: 'desc'},
			{filter: 'fil', order: 'asc'},
			{filter: 'fil2', order: 'asc'},
		];
		const filter = 'fil';
		const order = 'asc';
		const state = {sub: {indexes}};

		assert.deepStrictEqual(
			selectors.getIndex(getSubState)(state, filter, order),
			{filter: 'fil', order: 'asc'}
		);
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
						index: [
							'first',
							'second',
							'third',
							'fourth',
							'fifth',
							'sixth',
							'seventh',
						],
					},
				],
			},
		};
		const filterByActive = {scope: true};
		const filter = {scopeKey: 'scopesKey'};
		const order = 'asc';
		const start = 3;
		const length = 2;
		const getSubState = (state) => state.sub;

		const expectedResult = [{key: 'fourth'}, {key: 'fifth'}];

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
			selectors.getIndexes((state) => state.sub)({
				sub: {indexes: 'indexes'},
			}),
			'indexes'
		);
	});

	describe('getIndexChangedOn', function () {
		const getSubState = (state) => state.sub;
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
						index: [
							'first',
							'second',
							'third',
							'fourth',
							'fifth',
							'sixth',
							'seventh',
						],
					},
				],
			},
		};
		const filter = 'fil';
		const order = 'asc';
		const start = 3;
		const length = 2;
		const getSubState = (state) => state.sub;

		const expectedResult = {3: 'fourth', 4: 'fifth'};

		assert.deepStrictEqual(
			selectors.getIndexPage(getSubState)(
				state,
				filter,
				order,
				start,
				length
			),
			expectedResult
		);
	});

	// getIndexPage selector returns object on which getIndexedPage accesses `length` property?
	it.skip('getIndexedPage', function () {});

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
		const getSubState = (state) => state.sub;

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
		const getSubState = (state) => state.sub;

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

		const getSubState = (state) => state.sub;

		tests.forEach((test) => {
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
				getSubState: (state) => state.sub,
				state: {sub: {}},
				expectedResult: {},
			},
			{
				name: 'active key',
				getSubState: (state) => state.sub,
				state: {sub: {activeKey: 'actv'}},
				expectedResult: {activeKey: 'actv'},
			},
			{
				name: 'active keys',
				getSubState: (state) => state.sub,
				state: {sub: {activeKeys: ['k1', 'k2']}},
				expectedResult: {activeKeys: ['k1', 'k2']},
			},
		];

		tests.forEach((test) => {
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
		const getSubState = (state) => state.sub;
		const filter = {scopeKey: 'scopesKey'};
		const order = 'asc';

		const expectedResult = {
			filter: {
				scopeKey: 'scopesKey',
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

		const getSubState = (state) => state.sub;
		const expectedResult = [
			{
				filter: {
					scopeKey: 'scopesKey',
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
		const getSubState = (state) => state.sub;
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
		const getSubState = (state) => state.sub;
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
			selectors.getUsesWithActiveDependency(getSubState)(
				state,
				filter,
				order
			),
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

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors._mergeIntervals(test.intervals),
					test.expectedResult
				);
			});
		});
	});
});
