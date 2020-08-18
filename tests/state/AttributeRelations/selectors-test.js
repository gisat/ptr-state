import {assert} from 'chai';
import selectors from '../../../src/state/AttributeRelations/selectors';

describe('state/AttributeRelations/selectors', function () {
	it('getIndexed', function () {
		const state = {
			attributeRelations: {
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

	describe('getAllData', function () {
		const tests = [
			{
				name: 'null',
				state: {
					attributeRelations: {
						byKey: null,
					},
				},
				expectedResult: [],
			},
			{
				name: 'empty',
				state: {
					attributeRelations: {
						byKey: {},
					},
				},
				expectedResult: [],
			},
			{
				name: 'some',
				state: {
					attributeRelations: {
						byKey: {
							k1: {data: {n: 1}},
							k2: {data: {n: 2}},
						},
					},
				},
				expectedResult: [{n: 1}, {n: 2}],
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

	it('getSubstate', function () {
		assert.strictEqual(
			selectors.getSubstate({
				attributeRelations: 'subst',
			}),
			'subst'
		);
	});

	it('getFiltered', function () {
		const state = {
			attributeRelations: {
				byKey: {
					k1: {data: {v: 1, active: true}},
					k2: {data: {v: 2, active: true}},
					k3: {data: {v: 3, active: false}},
				},
			},
		};
		const filter = 'active';
		const expectedResult = [
			{v: 1, active: true},
			{v: 2, active: true},
		];

		assert.deepStrictEqual(
			selectors.getFiltered(state, filter),
			expectedResult
		);
	});

	it('getFilteredRelations', function () {
		const state = {
			attributeRelations: {
				byKey: {
					k1: {data: {v: 1, active: true}},
					k2: {data: {v: 2, active: true}},
					k3: {data: {v: 3, active: false}},
				},
			},
		};
		const filter = {active: true};
		const expectedResult = [
			{v: 1, active: true},
			{v: 2, active: true},
		];

		assert.deepStrictEqual(
			selectors.getFilteredRelations(state, filter),
			expectedResult
		);
	});

	it('getFilteredDataGroupedByLayerKey', function () {
		const state = {
			attributeRelations: {
				byKey: {
					k1: {data: {v: 1, active: true}},
					k2: {data: {v: 2, active: true}},
					k3: {data: {v: 3, active: false}},
				},
			},
		};
		const layers = [{data: {key: 'l1', filter: ['v', 1]}}];
		const expectedResult = {
			l1: [
				{
					active: true,
					v: 1,
				},
				{
					active: true,
					v: 2,
				},
				{
					active: false,
					v: 3,
				},
			],
		};

		assert.deepStrictEqual(
			selectors.getFilteredDataGroupedByLayerKey(state, layers),
			expectedResult
		);
	});

	it('getDataSourceRelationsGroupedByLayerKey', function () {
		const state = {
			attributeRelations: {
				byKey: {
					k1: {data: {v: 1, active: true}},
					k2: {data: {v: 2, active: true}},
					k3: {data: {v: 3, active: false}},
				},
			},
		};
		const layers = [{data: {key: 'l1', filter: ['v', 1]}}];
		const expectedResult = {
			l1: [
				{
					active: true,
					v: 1,
				},
				{
					active: true,
					v: 2,
				},
				{
					active: false,
					v: 3,
				},
			],
		};

		assert.deepStrictEqual(
			selectors.getDataSourceRelationsGroupedByLayerKey(state, layers),
			expectedResult
		);
	});

	it('getDataSourceKeysGroupedByLayerKey', function () {
		const state = {
			attributeRelations: {
				byKey: {
					k1: {
						data: {
							v: 1,
							active: true,
							attributeDataSourceKey: 'ad1',
						},
					},
					k2: {
						data: {
							v: 2,
							active: true,
							attributeDataSourceKey: 'ad2',
						},
					},
					k3: {
						data: {
							v: 3,
							active: false,
							attributeDataSourceKey: 'ad3',
						},
					},
				},
			},
		};
		const layers = [{data: {key: 'l1', filter: ['v', 1]}}];
		const expectedResult = {
			l1: ['ad1', 'ad2', 'ad3'],
		};

		assert.deepStrictEqual(
			selectors.getDataSourceKeysGroupedByLayerKey(state, layers),
			expectedResult
		);
	});

	it('getDataSourcesFromFilteredRelations', function () {
		const state = {
			attributeRelations: {
				byKey: {
					k1: {
						data: {
							v: 1,
							active: true,
							attributeDataSourceKey: 'ad1',
							fidColumnName: 'fid',
						},
					},
					k2: {
						data: {
							v: 2,
							active: true,
							attributeDataSourceKey: 'ad2',
							fidColumnName: 'fid',
						},
					},
					k3: {data: {v: 3, active: false}},
				},
			},
		};
		const filter = {active: true};
		const expectedResult = [
			{
				attributeDataSourceKey: 'ad1',
				fidColumnName: 'fid',
			},
			{
				attributeDataSourceKey: 'ad2',
				fidColumnName: 'fid',
			},
		];

		assert.deepStrictEqual(
			selectors.getDataSourcesFromFilteredRelations(state, filter),
			expectedResult
		);
	});

	it('getDataSourceKeyFiltered', function () {
		const state = {
			attributeRelations: {
				byKey: {
					k1: {data: {v: 1, active: true, dataSourceKey: 'dk'}},
					k3: {data: {v: 3, active: false}},
				},
			},
		};
		const filter = 'active';
		const expectedResult = 'dk';

		assert.deepStrictEqual(
			selectors.getDataSourceKeyFiltered(state, filter),
			expectedResult
		);
	});

	it('getFilteredDataSourceKeysWithFidColumn', function () {
		const state = {
			attributeRelations: {
				byKey: {
					k1: {
						data: {
							v: 1,
							active: true,
							attributeDataSourceKey: 'ad1',
							attributeKey: 'ak1',
							periodKey: 'pk1',
							fidColumnName: 'fid',
						},
					},
				},
			},
		};
		const filter = {
			attributeKey: {
				in: ['ak1'],
			},
		};
		const expectedResult = [
			{
				attributeDataSourceKey: 'ad1',
				attributeKey: 'ak1',
				fidColumnName: 'fid',
				periodKey: 'pk1',
			},
		];

		assert.deepStrictEqual(
			selectors.getFilteredDataSourceKeysWithFidColumn(state, filter),
			expectedResult
		);
	});

	// getFilteredDataSourceKeysWithFidColumnGroupedByLayerKey,
});
