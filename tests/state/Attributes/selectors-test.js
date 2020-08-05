import {assert} from 'chai';
import selectors from '../../../src/state/Attributes/selectors';

describe('state/Attributes/selectors', function () {
	describe('getAttributes', function () {
		const tests = [
			{
				name: 'null',
				state: {
					attributes: {
						byKey: null,
					},
				},
				expectedResult: [],
			},
			{
				name: 'empty',
				state: {
					attributes: {
						byKey: {},
					},
				},
				expectedResult: [],
			},
			{
				name: 'some',
				state: {
					attributes: {
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
					selectors.getAttributes(test.state),
					test.expectedResult
				);
			});
		});
	});

	describe('getActive', function () {
		const createState = (activeKey) => ({
			attributes: {
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
		const state = {attributes: {activeKey: 'k'}};

		assert.strictEqual(selectors.getActiveKey(state), 'k');
	});

	describe('getAllAsObject', function () {
		const tests = [
			{
				name: 'null',
				state: {
					attributes: {
						byKey: {},
					},
				},
				expectedResult: {},
			},
			{
				name: 'empty',
				state: {
					attributes: {
						byKey: {},
					},
				},
				expectedResult: {},
			},
			{
				name: 'some',
				state: {
					attributes: {
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
					attributes: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
					},
				},
				key: 'k3',
				expectedResult: null,
			},
			{
				name: 'null key',
				state: {
					attributes: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
					},
				},
				key: null,
				expectedResult: undefined,
			},
			{
				name: 'some',
				state: {
					attributes: {
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
					attributes: {
						byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
					},
				},
				keys: null,
				expectedResult: null,
			},
			{
				name: 'empty keys',
				state: {
					attributes: {
						byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
					},
				},
				keys: [],
				expectedResult: null,
			},
			{
				name: 'none',
				state: {
					attributes: {
						byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3}},
					},
				},
				keys: ['k5', 'k6'],
				expectedResult: null,
			},
			{
				name: 'empty',
				state: {
					attributes: {},
				},
				keys: ['k1', 'k2'],
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					attributes: {
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
					attributes: {
						byKey: {k1: {n: 1, data: 'data'}, k2: {n: 2}},
					},
				},
				key: 'k5',
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					attributes: {
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
					attributes: {
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
					attributes: {
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
					attributes: {},
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
					attributes: {
						editedByKey: {k1: 'val1', k2: {data: 'datk2'}},
					},
				},
				key: 'k5',
				expectedResult: null,
			},
			{
				name: 'no data',
				state: {
					attributes: {
						editedByKey: {k1: 'val1', k2: {data: 'datk2'}},
					},
				},
				key: 'k1',
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					attributes: {
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

	describe('getUpdatePermissionByKey', function () {
		const tests = [
			{
				name: 'user with access',
				state: {
					attributes: {
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
					attributes: {
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
					attributes: {},
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

	describe('getStateToSave', function () {
		const tests = [
			{
				name: 'default state',
				state: {attributes: {}},
				expectedResult: {},
			},
			{
				name: 'active key',
				state: {attributes: {activeKey: 'actv'}},
				expectedResult: {activeKey: 'actv'},
			},
			{
				name: 'active keys',
				state: {attributes: {activeKeys: ['k1', 'k2']}},
				expectedResult: {activeKeys: ['k1', 'k2']},
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

	it('getSubstate', function () {
		assert.strictEqual(
			selectors.getSubstate({
				attributes: 'subst',
			}),
			'subst'
		);
	});
});
