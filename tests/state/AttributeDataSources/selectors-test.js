import {assert} from 'chai';
import selectors from '../../../src/state/AttributeDataSources/selectors';

describe('state/AttributeDataSources/selectors', function () {
	it('getSubstate', function () {
		assert.strictEqual(
			selectors.getSubstate({
				attributeDataSources: 'subst',
			}),
			'subst'
		);
	});

	describe('getByKey', function () {
		const tests = [
			{
				name: 'none',
				state: {
					attributeDataSources: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
					},
				},
				key: 'k3',
				expectedResult: null,
			},
			{
				name: 'null key',
				state: {
					attributeDataSources: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
					},
				},
				key: null,
				expectedResult: undefined,
			},
			{
				name: 'some',
				state: {
					attributeDataSources: {
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
					attributeDataSources: {
						byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
					},
				},
				keys: null,
				expectedResult: null,
			},
			{
				name: 'empty keys',
				state: {
					attributeDataSources: {
						byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
					},
				},
				keys: [],
				expectedResult: null,
			},
			{
				name: 'none',
				state: {
					attributeDataSources: {
						byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
					},
				},
				keys: ['k5', 'k6'],
				expectedResult: null,
			},
			{
				name: 'empty',
				state: {
					attributeDataSources: {},
				},
				keys: ['k1', 'k2'],
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					attributeDataSources: {
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

	describe('getFiltered', function () {
		const tests = [
			{
				name: 'null',
				state: {
					attributeDataSources: {
						byKey: {},
					},
					attributeRelations: {
						byKey: {},
					},
				},
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					attributeDataSources: {
						byKey: {
							k1: {n: 1},
							k2: {n: 2},
							k3: {n: 3, removed: true},
						},
					},
					attributeRelations: {
						byKey: {
							r1: {
								data: {v: 1, dataSourceKey: 'k1'},
							},
							r2: {data: {v: 2}},
						},
					},
				},
				expectedResult: {
					n: 1,
				},
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getFiltered(test.state, ['v', 1]),
					test.expectedResult
				);
			});
		});
	});

	describe('getFilteredGroupedByLayerKey', function () {
		const tests = [
			{
				name: 'some',
				state: {
					attributeDataSources: {
						byKey: {
							k1: {n: 1},
							k2: {n: 2},
							k3: {n: 3, removed: true},
						},
					},
					attributeRelations: {
						byKey: {
							r1: {
								data: {v: 1, attributeDataSourceKey: 'k1'},
							},
							r2: {data: {v: 2}},
						},
					},
				},
				expectedResult: {
					l1: [
						{
							attributeRelationData: {
								attributeDataSourceKey: 'k1',
								v: 1,
							},
							n: 1,
						},
					],
				},
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getFilteredGroupedByLayerKey(test.state, [
						{data: {key: 'l1'}, filter: ['v', 1]},
					]),
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
					attributeDataSources: {
						byKey: {},
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
				},
				expectedResult: [null, null, null, null],
			},
			{
				name: 'empty indexes',
				state: {
					attributeDataSources: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
						indexes: [],
					},
				},
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					attributeDataSources: {
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
				},
				expectedResult: [null, {n: 1}, {n: 2}, null],
			},
		];
		const filter = {scopeKey: 'scopeK'};
		const order = 'asc';

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getBatchByFilterOrder(test.state, filter, order),
					test.expectedResult
				);
			});
		});
	});

	describe('getFilteredDataSources', function () {
		const tests = [
			{
				name: 'some',
				state: {
					attributeDataSources: {
						byKey: {
							k1: {n: 1},
							k2: {n: 2},
							k3: {n: 3, removed: true},
						},
					},
					attributeData: {
						byKey: {
							ad1: {n: 1},
							ad2: {n: 2},
							ad33: {n: 3, removed: true},
						},
					},
					attributeRelations: {
						byKey: {
							r1: {
								data: {
									v: 1,
									attributeDataSourceKey: 'k1',
									attributeKey: 'ad1',
									fidColumnName: 'fid',
								},
							},
						},
					},
				},
				filter: {
					attributeKey: {in: ['ad1']},
				},
				expectedResult: [
					{
						attributeKey: 'ad1',
						dataSource: {
							n: 1,
						},
						fidColumnName: 'fid',
						periodKey: undefined,
					},
				],
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getFilteredDataSources(test.state, test.filter),
					test.expectedResult
				);
			});
		});
	});

	describe('getFilteredDataSourcesGroupedByLayerKey', function () {
		const tests = [
			{
				name: 'some',
				state: {
					attributeDataSources: {
						byKey: {
							k1: {n: 1},
							k2: {n: 2},
							k3: {n: 3, removed: true},
						},
					},
					attributeData: {
						byKey: {
							ad1: {n: 1},
							ad2: {n: 2},
							ad33: {n: 3, removed: true},
						},
					},
					attributeRelations: {
						byKey: {
							r1: {
								data: {
									v: 1,
									attributeDataSourceKey: 'k1',
									attributeKey: 'ad1',
									fidColumnName: 'fid',
								},
							},
						},
					},
				},
				layersWithFilter: [
					{
						key: 'l1',
						attributeFilter: {
							v: 1,
							attributeDataSourceKey: 'k1',
							attributeKey: 'ad1',
							fidColumnName: 'fid',
						},
					},
				],
				layersState: [
					{
						key: 'l1',
						attributeKeys: ['ad1'],
					},
				],
				expectedResult: {
					l1: [
						{
							attributeKey: 'ad1',
							dataSource: {
								n: 1,
							},
							fidColumnName: 'fid',
						},
					],
				},
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getFilteredDataSourcesGroupedByLayerKey(
						test.state,
						test.layersWithFilter,
						test.layersState,
						3
					),
					test.expectedResult
				);
			});
		});
	});
});
