import {assert} from 'chai';
import selectors from '../../../src/state/LayerTemplates/selectors';

describe('state/LayerTemplates/selectors', function () {
	it('getActiveKey', function () {
		const state = {layerTemplates: {activeKey: 'k'}};

		assert.strictEqual(selectors.getActiveKey(state), 'k');
	});

	describe('getAll', function () {
		const tests = [
			{
				name: 'null',
				state: {
					layerTemplates: {
						byKey: null,
					},
				},
				expectedResult: [],
			},
			{
				name: 'empty',
				state: {
					layerTemplates: {
						byKey: {},
					},
				},
				expectedResult: [],
			},
			{
				name: 'some',
				state: {
					layerTemplates: {
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
					layerTemplates: {
						byKey: {},
					},
				},
				expectedResult: {},
			},
			{
				name: 'empty',
				state: {
					layerTemplates: {
						byKey: {},
					},
				},
				expectedResult: {},
			},
			{
				name: 'some',
				state: {
					layerTemplates: {
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
					layerTemplates: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
					},
				},
				key: 'k3',
				expectedResult: null,
			},
			{
				name: 'null key',
				state: {
					layerTemplates: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
					},
				},
				key: null,
				expectedResult: undefined,
			},
			{
				name: 'some',
				state: {
					layerTemplates: {
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
					layerTemplates: {
						byKey: {k1: {n: 1, data: 'data'}, k2: {n: 2}},
					},
				},
				key: 'k5',
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					layerTemplates: {
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
					layerTemplates: {
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
					layerTemplates: {
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
					layerTemplates: {},
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
					layerTemplates: {
						editedByKey: {k1: 'val1', k2: {data: 'datk2'}},
					},
				},
				key: 'k5',
				expectedResult: null,
			},
			{
				name: 'no data',
				state: {
					layerTemplates: {
						editedByKey: {k1: 'val1', k2: {data: 'datk2'}},
					},
				},
				key: 'k1',
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					layerTemplates: {
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
			layerTemplates: {
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
					layerTemplates: {
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
					layerTemplates: {
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
					layerTemplates: {},
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

	describe('getFilteredTemplatesGroupedByLayerKey', function () {
		const tests = [
			{
				name: 'null',
				state: {
					layerTemplates: {
						byKey: null,
					},
				},
				layersState: [],
				expectedResult: null,
			},
			{
				name: 'empty',
				state: {
					layerTemplates: {
						byKey: {},
					},
				},
				layersState: [],
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					layerTemplates: {
						byKey: {
							k1: {n: 1},
							k2: {n: 2},
							k3: {n: 3, removed: true},
							k4: {n: 4},
						},
					},
				},
				layersState: [
					{
						key: 'l1',
						filter: {layerTemplateKey: 'k1'},
					},
					{
						key: 'l2',
						filter: {layerTemplateKey: 'k2'},
					},
				],
				expectedResult: {
					l1: {n: 1},
					l2: {n: 2},
				},
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getFilteredTemplatesGroupedByLayerKey(
						test.state,
						test.layersState
					),
					test.expectedResult
				);
			});
		});
	});

	describe('getFilteredTemplatesGroupedByLayerTemplateKey', function () {
		const tests = [
			{
				name: 'null',
				state: {
					layerTemplates: {
						byKey: null,
					},
				},
				layersState: [],
				expectedResult: null,
			},
			{
				name: 'empty',
				state: {
					layerTemplates: {
						byKey: {},
					},
				},
				layersState: [],
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					layerTemplates: {
						byKey: {
							k1: {n: 1},
							k2: {n: 2},
							k3: {n: 3, removed: true},
							k4: {n: 4},
						},
					},
				},
				layersState: [
					{
						key: 'l1',
						filter: {layerTemplateKey: 'k1'},
					},
					{
						key: 'l2',
						filter: {layerTemplateKey: 'k2'},
					},
				],
				expectedResult: {
					k1: {n: 1},
					k2: {n: 2},
				},
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getFilteredTemplatesGroupedByLayerTemplateKey(
						test.state,
						test.layersState
					),
					test.expectedResult
				);
			});
		});
	});

	it('getSubstate', function () {
		assert.strictEqual(selectors.getSubstate({layerTemplates: 'lt'}), 'lt');
	});
});
