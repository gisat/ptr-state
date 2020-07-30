import {assert} from 'chai';
import selectors from '../../../src/state/AttributeData/selectors';

describe('state/AttributeData/selectors', function () {
	describe('getAllAsObject', function () {
		const tests = [
			{
				name: 'null',
				state: {
					attributeData: {
						byKey: {},
					},
				},
				expectedResult: {},
			},
			{
				name: 'empty',
				state: {
					attributeData: {
						byKey: {},
					},
				},
				expectedResult: {},
			},
			{
				name: 'some',
				state: {
					attributeData: {
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

	it('getSubstate', function () {
		assert.strictEqual(
			selectors.getSubstate({
				attributeData: 'subst',
			}),
			'subst'
		);
	});

	describe('getByKey', function () {
		const tests = [
			{
				name: 'none',
				state: {
					attributeData: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
					},
				},
				key: 'k3',
				expectedResult: null,
			},
			{
				name: 'null key',
				state: {
					attributeData: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
					},
				},
				key: null,
				expectedResult: undefined,
			},
			{
				name: 'some',
				state: {
					attributeData: {
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

	describe('getBatchByFilterOrder', function () {
		const tests = [
			{
				name: 'empty models',
				state: {
					attributeData: {
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
					attributeData: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
						indexes: [],
					},
				},
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					attributeData: {
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

	describe('getFiltered', function () {
		const tests = [
			{
				name: 'null',
				state: {
					attributeData: {
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
					attributeData: {
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
					attributeData: {
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

	describe('getFilteredGroupedByFid', function () {
		const tests = [
			{
				name: 'some',
				state: {
					attributeData: {
						byKey: {
							k1: {
								n: 1,
								attributeData: {
									features: [{properties: {fid: 1}}],
								},
							},
							k2: {n: 2},
							k3: {n: 3, removed: true},
						},
					},
					attributeRelations: {
						byKey: {
							r1: {
								data: {
									v: 1,
									attributeDataSourceKey: 'k1',
									fidColumnName: 'fid',
								},
							},
							r2: {data: {v: 2}},
						},
					},
				},
				expectedResult: [{key: 1, data: {name: 1, values: []}}],
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getFilteredGroupedByFid(test.state, [
						{data: {key: 'l1'}, filter: ['v', 1]},
					]),
					test.expectedResult
				);
			});
		});
	});

	describe('getNamesByFid', function () {
		const tests = [
			{
				name: 'some',
				state: {
					attributeData: {
						byKey: {
							k1: {
								n: 1,
								attributeData: {
									features: [{properties: {fid: 1, p: 'v'}}],
								},
							},
							k2: {n: 2},
							k3: {n: 3, removed: true},
						},
					},
					attributeRelations: {
						byKey: {
							r1: {
								data: {
									v: 1,
									attributeDataSourceKey: 'k1',
									fidColumnName: 'fid',
								},
							},
						},
					},
				},
				expectedResult: [
					{
						data: {
							name: 'v',
						},
						key: 1,
					},
				],
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getNamesByFid(test.state, [
						{data: {key: 'l1'}, filter: ['v', 1]},
					]),
					test.expectedResult
				);
			});
		});
	});
});
