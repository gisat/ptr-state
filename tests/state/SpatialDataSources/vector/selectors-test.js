import {assert} from 'chai';
import selectors from '../../../../src/state/SpatialDataSources/vector/selectors';

describe('state/SpatialDataSources/vector/selectors', function () {
	describe('getBatchByFilterOrder', function () {
		const tests = [
			{
				name: 'empty models',
				state: {
					spatialVectorDataSources: {
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
					spatialVectorDataSources: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
						indexes: [],
					},
				},
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					spatialVectorDataSources: {
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

	it('getSubstate', function () {
		assert.strictEqual(
			selectors.getSubstate({
				spatialVectorDataSources: 'subst',
			}),
			'subst'
		);
	});

	it('getEditedFeatures', function () {
		assert.deepStrictEqual(
			selectors.getEditedFeatures({
				spatialDataSources: {
					vector: {
						editedFeaturesBySourceKey: {
							s1: [{key: 'f1'}, {key: 'f2'}],
						},
					},
				},
			}),
			{
				s1: [{key: 'f1'}, {key: 'f2'}],
			}
		);
	});

	describe('getAll', function () {
		const tests = [
			{
				name: 'null',
				state: {
					spatialVectorDataSources: {
						byKey: null,
					},
				},
				expectedResult: [],
			},
			{
				name: 'empty',
				state: {
					spatialVectorDataSources: {
						byKey: {},
					},
				},
				expectedResult: [],
			},
			{
				name: 'some',
				state: {
					spatialVectorDataSources: {
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
					spatialVectorDataSources: {
						byKey: {},
					},
				},
				expectedResult: {},
			},
			{
				name: 'empty',
				state: {
					spatialVectorDataSources: {
						byKey: {},
					},
				},
				expectedResult: {},
			},
			{
				name: 'some',
				state: {
					spatialVectorDataSources: {
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

	describe('getByKey', function () {
		const tests = [
			{
				name: 'none',
				state: {
					spatialVectorDataSources: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
					},
				},
				key: 'k3',
				expectedResult: null,
			},
			{
				name: 'null key',
				state: {
					spatialVectorDataSources: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
					},
				},
				key: null,
				expectedResult: undefined,
			},
			{
				name: 'some',
				state: {
					spatialVectorDataSources: {
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

	describe('getDataByKey', function () {
		const tests = [
			{
				name: 'none',
				state: {
					spatialVectorDataSources: {
						byKey: {k1: {n: 1, data: 'data'}, k2: {n: 2}},
					},
				},
				key: 'k5',
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					spatialVectorDataSources: {
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

	it('noMemoGetFeaturesBySourceKey', function () {
		assert.deepStrictEqual(
			selectors.noMemoGetFeaturesBySourceKey(
				{
					spatialDataSources: {
						vector: {featuresBySourceKey: {ds1: ['f1', 'f2']}},
					},
				},
				{
					dataSourceKey: 'ds1',
				}
			),
			['f1', 'f2']
		);
	});

	it('noMemoGetEditedFeaturesBySourceKey', function () {
		assert.deepStrictEqual(
			selectors.noMemoGetEditedFeaturesBySourceKey(
				{
					spatialDataSources: {
						vector: {
							editedFeaturesBySourceKey: {ds1: ['f1', 'f2']},
						},
					},
				},
				{
					dataSourceKey: 'ds1',
				}
			),
			['f1', 'f2']
		);
	});
});
