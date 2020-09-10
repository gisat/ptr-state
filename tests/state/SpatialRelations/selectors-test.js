import {assert} from 'chai';
import selectors from '../../../src/state/SpatialRelations/selectors';

describe('state/SpatialRelations/selectors', function () {
	it('getSubstate', function () {
		assert.strictEqual(
			selectors.getSubstate({
				spatialRelations: 'subst',
			}),
			'subst'
		);
	});

	describe('getByKey', function () {
		const tests = [
			{
				name: 'none',
				state: {
					spatialRelations: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
					},
				},
				key: 'k3',
				expectedResult: null,
			},
			{
				name: 'null key',
				state: {
					spatialRelations: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
					},
				},
				key: null,
				expectedResult: undefined,
			},
			{
				name: 'some',
				state: {
					spatialRelations: {
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
					spatialRelations: {
						byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
					},
				},
				keys: null,
				expectedResult: null,
			},
			{
				name: 'empty keys',
				state: {
					spatialRelations: {
						byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
					},
				},
				keys: [],
				expectedResult: null,
			},
			{
				name: 'none',
				state: {
					spatialRelations: {
						byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
					},
				},
				keys: ['k5', 'k6'],
				expectedResult: null,
			},
			{
				name: 'empty',
				state: {
					spatialRelations: {},
				},
				keys: ['k1', 'k2'],
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					spatialRelations: {
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

	describe('getAllData', function () {
		const tests = [
			{
				name: 'null',
				state: {
					spatialRelations: {
						byKey: null,
					},
				},
				expectedResult: [],
			},
			{
				name: 'empty',
				state: {
					spatialRelations: {
						byKey: {},
					},
				},
				expectedResult: [],
			},
			{
				name: 'some',
				state: {
					spatialRelations: {
						byKey: {
							k1: {n: 1, data: {p: 1}},
							k2: {n: 2, data: {p: 2}},
							k3: {n: 3, removed: true},
						},
					},
				},
				expectedResult: [{p: 1}, {p: 2}],
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getAllData(test.state),
					test.expectedResult
				);
			});
		});
	});

	describe('getFilteredData', function () {
		const tests = [
			{
				name: 'null',
				state: {
					spatialRelations: {
						byKey: null,
					},
				},
				expectedResult: null,
			},
			{
				name: 'empty',
				state: {
					spatialRelations: {
						byKey: {},
					},
				},
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					spatialRelations: {
						byKey: {
							k1: {n: 1, data: {p: 1}},
							k2: {n: 2, data: {p: 2}},
							k3: {n: 3, removed: true},
						},
					},
				},
				expectedResult: [{p: 1}],
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getFilteredData(test.state, {p: 1}),
					test.expectedResult
				);
			});
		});
	});

	it('getFilteredDataSourceKeysGroupedByLayerKey', function () {
		assert.deepStrictEqual(
			selectors.getFilteredDataSourceKeysGroupedByLayerKey(
				{
					spatialRelations: {
						byKey: {
							k1: {
								key: 'k1',
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
						fidColumnName: 'fid',
						spatialDataSourceKey: 'sds1',
					},
				],
			}
		);
	});

	it('getFilteredDataGroupedByLayerTemplateKey', function () {
		assert.deepStrictEqual(
			selectors.getFilteredDataGroupedByLayerTemplateKey(
				{
					spatialRelations: {
						byKey: {
							k1: {
								key: 'k1',
								data: {
									layerTemplateKey: 'lt1',
								},
							},
						},
					},
				},
				[{key: 'l1', filter: {layerTemplateKey: 'lt1'}}]
			),
			{
				lt1: [
					{
						data: {
							layerTemplateKey: 'lt1',
						},
						key: 'k1',
					},
				],
			}
		);
	});

	describe('getDataSourceKeysFiltered', function () {
		const tests = [
			{
				name: 'null',
				state: {
					spatialRelations: {
						byKey: null,
					},
				},
				expectedResult: null,
			},
			{
				name: 'empty',
				state: {
					spatialRelations: {
						byKey: {},
					},
				},
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					spatialRelations: {
						byKey: {
							k1: {
								n: 1,
								data: {p: 1, spatialDataSourceKey: 'sds1'},
							},
							k2: {n: 2, data: {p: 2}},
							k3: {n: 3, removed: true},
						},
					},
				},
				expectedResult: ['sds1'],
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getDataSourceKeysFiltered(test.state, {p: 1}),
					test.expectedResult
				);
			});
		});
	});

	describe('getDataSourceRelationsByLayerTemplateKeys', function () {
		const tests = [
			{
				name: 'null',
				state: {
					spatialRelations: {
						byKey: null,
					},
				},
				expectedResult: null,
			},
			{
				name: 'empty',
				state: {
					spatialRelations: {
						byKey: {},
					},
				},
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					spatialRelations: {
						byKey: {
							k1: {n: 1, data: {p: 1, layerTemplateKey: 'lt1'}},
							k2: {n: 2, data: {p: 2, layerTemplateKey: 'lt2'}},
							k3: {n: 3, removed: true},
						},
					},
				},
				expectedResult: [{p: 1, layerTemplateKey: 'lt1'}],
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getDataSourceRelationsByLayerTemplateKeys(
						test.state,
						['lt1']
					),
					test.expectedResult
				);
			});
		});
	});
});
