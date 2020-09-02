import {assert} from 'chai';
import selectors from '../../../src/state/Periods/selectors';

describe('state/Periods/selectors', function () {
	describe('getActive', function () {
		const createState = (activeKey) => ({
			periods: {
				byKey: {
					k1: {n: 1},
					k2: {n: 2},
					k3: {n: 3, removed: true},
				},
				activeKey,
			},
		});

		it('select active', function () {
			assert.deepStrictEqual(selectors.getActive(createState('k1')), {
				n: 1,
			});
		});

		it('select inactive', function () {
			assert.isNull(selectors.getActive(createState('k3')));
		});
	});

	it('getActiveKey', function () {
		const state = {periods: {activeKey: 'k'}};

		assert.strictEqual(selectors.getActiveKey(state), 'k');
	});

	it('getActiveKeys', function () {
		const state = {periods: {activeKeys: ['k1', 'k2']}};

		assert.deepStrictEqual(selectors.getActiveKeys(state), ['k1', 'k2']);
	});

	describe('getActiveModels', function () {
		const tests = [
			{
				name: 'none with null active keys',
				state: {
					periods: {
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
					periods: {
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
					periods: {
						byKey: {},
						activeKeys: ['k3'],
					},
				},
				expectedResult: null,
			},
			{
				name: 'none',
				state: {
					periods: {
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
					periods: {
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
					periods: {
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

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getActiveModels(test.state),
					test.expectedResult
				);
			});
		});
	});

	describe('getAll', function () {
		const tests = [
			{
				name: 'null',
				state: {
					periods: {
						byKey: null,
					},
				},
				expectedResult: [],
			},
			{
				name: 'empty',
				state: {
					periods: {
						byKey: {},
					},
				},
				expectedResult: [],
			},
			{
				name: 'some',
				state: {
					periods: {
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

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getAll(test.state),
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
					periods: {
						byKey: {},
					},
				},
				expectedResult: {},
			},
			{
				name: 'empty',
				state: {
					periods: {
						byKey: {},
					},
				},
				expectedResult: {},
			},
			{
				name: 'some',
				state: {
					periods: {
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

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getAllAsObject(test.state),
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
					periods: {},
					scopes: {
						activeKey: 'scopeK',
					},
				},
				expectedResult: null,
			},
			{
				name: 'empty indexes',
				state: {
					periods: {
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
					periods: {
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
					scopes: {},
				},
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					periods: {
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
				},
				expectedResult: [{n: 1}, {n: 2}, {key: 'k3'}, null],
			},
		];
		const order = 'asc';

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getAllForActiveScope(test.state, order),
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
					periods: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
					},
				},
				key: 'k3',
				expectedResult: null,
			},
			{
				name: 'null key',
				state: {
					periods: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
					},
				},
				key: null,
				expectedResult: undefined,
			},
			{
				name: 'some',
				state: {
					periods: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
					},
				},
				key: 'k1',
				expectedResult: {
					n: 1,
				},
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getByKey(test.state, test.key),
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
					periods: {
						byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
					},
				},
				keys: null,
				expectedResult: null,
			},
			{
				name: 'empty keys',
				state: {
					periods: {
						byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
					},
				},
				keys: [],
				expectedResult: null,
			},
			{
				name: 'none',
				state: {
					periods: {
						byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
					},
				},
				keys: ['k5', 'k6'],
				expectedResult: null,
			},
			{
				name: 'empty',
				state: {
					periods: {},
				},
				keys: ['k1', 'k2'],
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					periods: {
						byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
					},
				},
				keys: ['k1', 'k2'],
				expectedResult: [{n: 1}, {n: 2}],
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getByKeys(test.state, test.keys),
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
					periods: {
						byKey: {k1: {n: 1, data: 'data'}, k2: {n: 2}},
					},
				},
				key: 'k5',
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					periods: {
						byKey: {k1: {n: 1, data: 'data'}, k2: {n: 2}},
					},
				},
				key: 'k1',
				expectedResult: 'data',
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.strictEqual(
					selectors.getDataByKey(test.state, test.key),
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
					periods: {
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
					periods: {
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
					periods: {},
				},
				expectedResult: false,
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.strictEqual(
					selectors.getDeletePermissionByKey(test.state, 'k1'),
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
					periods: {
						editedByKey: {k1: 'val1', k2: {data: 'datk2'}},
					},
				},
				key: 'k5',
				expectedResult: null,
			},
			{
				name: 'no data',
				state: {
					periods: {
						editedByKey: {k1: 'val1', k2: {data: 'datk2'}},
					},
				},
				key: 'k1',
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					periods: {
						editedByKey: {k1: 'val1', k2: {data: 'datk2'}},
					},
				},
				key: 'k2',
				expectedResult: 'datk2',
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.strictEqual(
					selectors.getEditedDataByKey(test.state, test.key),
					test.expectedResult
				);
			});
		});
	});

	it('getIndexed', function () {
		const state = {
			periods: {
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

		const expectedResult = [{key: 'fourth'}, {key: 'fifth'}];

		assert.deepStrictEqual(
			selectors.getIndexed(
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

	describe('getUpdatePermissionByKey', function () {
		const tests = [
			{
				name: 'user with access',
				state: {
					periods: {
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
					periods: {
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
					periods: {},
				},
				expectedResult: false,
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.strictEqual(
					selectors.getUpdatePermissionByKey(test.state, 'k1'),
					test.expectedResult
				);
			});
		});
	});

	it('getSubstate', function () {
		assert.deepStrictEqual(
			selectors.getSubstate({
				periods: {},
			}),
			{}
		);
	});

	it('getByFullPeriodAsObject', function () {
		assert.deepStrictEqual(
			selectors.getByFullPeriodAsObject(
				{
					periods: {
						byKey: {
							p1: {
								data: {
									name: 'inside',
									start: '2020-01-02T00:00:00Z',
									end: '2020-01-05T23:59:59Z',
								},
							},
							p2: {
								data: {
									name: 'starts within',
									start: '2020-01-02T00:00:00Z',
								},
							},
							p3: {
								data: {
									name: 'ends within',
									end: '2020-01-02T00:00:00Z',
								},
							},
							p4: {
								data: {
									name: 'outside',
									start: '2020-03-02T00:00:00Z',
									end: '2020-03-05T23:59:59Z',
								},
							},
							p5: {
								data: {
									name: 'starts outside',
									start: '2020-03-02T00:00:00Z',
								},
							},
							p6: {
								data: {
									name: 'ends outside',
									end: '2020-03-02T00:00:00Z',
								},
							},
							p7: {
								data: {
									name: 'start outside',
									start: '2019-12-02T00:00:00Z',
									end: '2020-01-05T23:59:59Z',
								},
							},
							p8: {
								data: {
									name: 'end outside',
									start: '2020-01-02T00:00:00Z',
									end: '2020-03-05T23:59:59Z',
								},
							},
						},
					},
				},
				'2020-01-01T00:00:00Z',
				'2020-03-01T23:59:59Z'
			),
			{
				p1: {
					data: {
						end: '2020-01-05T23:59:59Z',
						name: 'inside',
						start: '2020-01-02T00:00:00Z',
					},
				},
				p2: {
					data: {
						name: 'starts within',
						start: '2020-01-02T00:00:00Z',
					},
				},
				p3: {
					data: {
						end: '2020-01-02T00:00:00Z',
						name: 'ends within',
					},
				},
			}
		);
	});

	it('getFilteredGroupedByLayerTemplateKey', function () {
		assert.deepStrictEqual(
			selectors.getFilteredGroupedByLayerTemplateKey(
				{
					periods: {byKey: {p1: {key: 'p1'}}},
					spatialRelations: {
						byKey: {
							sr1: {
								key: 'sr1',
								data: {
									periodKey: 'p1',
									layerTemplateKey: 'lt1',
								},
							},
						},
					},
				},
				[
					{
						filter: {layerTemplateKey: 'lt1'},
					},
				]
			),
			{
				lt1: [
					{
						key: 'p1',
					},
				],
			}
		);
	});

	it('getFilteredGroupedByLayerKey', function () {
		assert.deepStrictEqual(
			selectors.getFilteredGroupedByLayerKey(
				{
					periods: {byKey: {p1: {key: 'p1'}}},
					spatialRelations: {
						byKey: {
							sr1: {
								key: 'sr1',
								data: {
									periodKey: 'p1',
								},
							},
						},
					},
				},
				[
					{
						key: 'l1',
						filter: {},
					},
				]
			),
			{
				l1: [
					{
						key: 'p1',
					},
				],
			}
		);
	});

	it('getKeysByAttributeRelations', function () {
		assert.deepStrictEqual(
			selectors.getKeysByAttributeRelations(
				{
					attributeRelations: {
						byKey: {
							ar1: {
								key: 'ar1',
								data: {
									p: 'v',
									periodKey: 'p1',
								},
							},
						},
					},
				},
				{p: 'v'}
			),
			['p1']
		);
	});
});
