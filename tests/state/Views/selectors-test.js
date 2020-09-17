import {assert} from 'chai';
import selectors from '../../../src/state/Views/selectors';

describe('state/Views/selectors', function () {
	it('getActiveKey', function () {
		const state = {views: {activeKey: 'k'}};

		assert.strictEqual(selectors.getActiveKey(state), 'k');
	});

	it('getActiveKeys', function () {
		const state = {views: {activeKeys: ['k1', 'k2']}};

		assert.deepStrictEqual(selectors.getActiveKeys(state), ['k1', 'k2']);
	});

	describe('getByKeys', function () {
		const tests = [
			{
				name: 'null keys',
				state: {
					views: {
						byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
					},
				},
				keys: null,
				expectedResult: null,
			},
			{
				name: 'empty keys',
				state: {
					views: {
						byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
					},
				},
				keys: [],
				expectedResult: null,
			},
			{
				name: 'none',
				state: {
					views: {
						byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
					},
				},
				keys: ['k5', 'k6'],
				expectedResult: null,
			},
			{
				name: 'empty',
				state: {
					views: {},
				},
				keys: ['k1', 'k2'],
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					views: {
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
					views: {
						byKey: {k1: {n: 1, data: 'data'}, k2: {n: 2}},
					},
				},
				key: 'k5',
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					views: {
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

	describe('getEditedDataByKey', function () {
		const tests = [
			{
				name: 'none',
				state: {
					views: {
						editedByKey: {k1: 'val1', k2: {data: 'datk2'}},
					},
				},
				key: 'k5',
				expectedResult: null,
			},
			{
				name: 'no data',
				state: {
					views: {
						editedByKey: {k1: 'val1', k2: {data: 'datk2'}},
					},
				},
				key: 'k1',
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					views: {
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

	describe('getViewsData', function () {
		const tests = [
			{
				name: 'none',
				state: {
					views: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
					},
				},
				key: 'k3',
				expectedResult: null,
			},
			{
				name: 'null key',
				state: {
					views: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
					},
				},
				key: null,
				expectedResult: undefined,
			},
			{
				name: 'some',
				state: {
					views: {
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
					selectors.getViewsData(test.state, test.key),
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
					views: {
						byKey: null,
					},
				},
				expectedResult: [],
			},
			{
				name: 'empty',
				state: {
					views: {
						byKey: {},
					},
				},
				expectedResult: [],
			},
			{
				name: 'some',
				state: {
					views: {
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
					views: {
						byKey: {},
					},
				},
				expectedResult: {},
			},
			{
				name: 'empty',
				state: {
					views: {
						byKey: {},
					},
				},
				expectedResult: {},
			},
			{
				name: 'some',
				state: {
					views: {
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

	describe('getDeletePermissionByKey', function () {
		const tests = [
			{
				name: 'user with access',
				state: {
					views: {
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
					views: {
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
					views: {},
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

	describe('getUpdatePermissionByKey', function () {
		const tests = [
			{
				name: 'user with access',
				state: {
					views: {
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
					views: {
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
					views: {},
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
		assert.strictEqual(
			selectors.getSubstate({
				views: 'subst',
			}),
			'subst'
		);
	});

	describe('getStateToSave', function () {
		const tests = [
			{
				name: 'active key',
				state: {
					attributes: {activeKey: 'atr_actv'},
					attributeSets: {activeKey: 'atrs_actv'},
					components: {activeKey: 'comp_actv'},
					scopes: {activeKey: 'scop_actv'},
				},
				expectedResult: {
					attributeSets: {
						activeKey: 'atrs_actv',
					},
					attributes: {
						activeKey: 'atr_actv',
					},
					components: {
						activeKey: 'comp_actv',
					},
					scopes: {
						activeKey: 'scop_actv',
					},
				},
			},
			{
				name: 'active keys',
				state: {
					attributes: {activeKeys: ['atr_actv1', 'atr_actv2']},
					attributeSets: {activeKeys: ['atrs_actv1', 'atrs_actv2']},
					components: {activeKeys: ['comp_actv1', 'comp_actv2']},
					scopes: {activeKeys: ['scop_actv1', 'scop_actv2']},
				},
				expectedResult: {
					attributeSets: {
						activeKeys: ['atrs_actv1', 'atrs_actv2'],
					},
					attributes: {
						activeKeys: ['atr_actv1', 'atr_actv2'],
					},
					components: {
						activeKeys: ['comp_actv1', 'comp_actv2'],
					},
					scopes: {
						activeKeys: ['scop_actv1', 'scop_actv2'],
					},
				},
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getStateToSave(test.state),
					test.expectedResult
				);
			});
		});
	});
});
