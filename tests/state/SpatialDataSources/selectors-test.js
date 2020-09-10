import {assert} from 'chai';
import selectors from '../../../src/state/SpatialDataSources/selectors';

describe('state/SpatialDataSources/selectors', function () {
	it('getSubstate', function () {
		assert.strictEqual(
			selectors.getSubstate({
				spatialDataSources: 'subst',
			}),
			'subst'
		);
	});

	describe('getByKey', function () {
		const tests = [
			{
				name: 'none',
				state: {
					spatialDataSources: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
					},
				},
				key: 'k3',
				expectedResult: null,
			},
			{
				name: 'null key',
				state: {
					spatialDataSources: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
					},
				},
				key: null,
				expectedResult: undefined,
			},
			{
				name: 'some',
				state: {
					spatialDataSources: {
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
					spatialDataSources: {
						byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
					},
				},
				keys: null,
				expectedResult: null,
			},
			{
				name: 'empty keys',
				state: {
					spatialDataSources: {
						byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
					},
				},
				keys: [],
				expectedResult: null,
			},
			{
				name: 'none',
				state: {
					spatialDataSources: {
						byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
					},
				},
				keys: ['k5', 'k6'],
				expectedResult: null,
			},
			{
				name: 'empty',
				state: {
					spatialDataSources: {},
				},
				keys: ['k1', 'k2'],
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					spatialDataSources: {
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

	it('getFilteredSourcesGroupedByLayerKey', function () {
		assert.deepStrictEqual(
			selectors.getFilteredSourcesGroupedByLayerKey(
				{
					spatialDataSources: {byKey: {sds1: {key: 'sds1'}}},
					spatialRelations: {
						byKey: {
							sr1: {
								key: 'sr1',
								data: {
									spatialDataSourceKey: 'sds1',
									fidColumnName: 'fid',
								},
							},
						},
					},
					areaRelations: {
						byKey: {
							ar1: {
								key: 'ar1',
								data: {
									spatialDataSourceKey: 'sds1',
									fidColumnName: 'fid',
								},
							},
						},
					},
					spatialData: {byKey: {sd1: {key: 'sd1'}}},
				},
				[{key: 'l1', filter: {}}]
			),
			{
				l1: [
					{
						dataSource: {
							key: 'sds1',
						},
						fidColumnName: 'fid',
					},
				],
			}
		);
	});

	it('getFilteredGroupedByLayerKey', function () {
		assert.deepStrictEqual(
			selectors.getFilteredGroupedByLayerKey(
				{
					spatialDataSources: {byKey: {sds1: {key: 'sds1'}}},
					spatialRelations: {
						byKey: {
							sr1: {
								key: 'sr1',
								data: {
									spatialDataSourceKey: 'sds1',
									fidColumnName: 'fid',
								},
							},
						},
					},
				},
				[{key: 'l1', filter: {}}]
			),
			{
				l1: [
					{
						key: 'sds1',
						spatialRelationData: {
							fidColumnName: 'fid',
							spatialDataSourceKey: 'sds1',
						},
					},
				],
			}
		);
	});
});
