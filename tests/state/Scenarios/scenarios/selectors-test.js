import {assert} from 'chai';
import selectors from '../../../../src/state/Scenarios/scenarios/selectors';

describe('state/Scenarios/scenarios/selectors', function () {
	describe('getActive', function () {
		const createState = (activeKey) => ({
			scenarios: {
				scenarios: {
					byKey: {
						k1: {n: 1},
						k2: {n: 2},
						k3: {n: 3, removed: true},
					},
					activeKey,
				},
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
		const state = {
			scenarios: {
				scenarios: {activeKey: 'k'},
			},
		};

		assert.strictEqual(selectors.getActiveKey(state), 'k');
	});

	describe('getActiveScenarios', function () {
		const tests = [
			{
				name: 'none with null active keys',
				state: {
					scenarios: {
						scenarios: {
							byKey: {
								k1: {n: 1},
								k2: {n: 2},
								k3: {n: 3, removed: true},
							},
							activeKeys: null,
						},
					},
				},
				expectedResult: null,
			},
			{
				name: 'none with empty active keys',
				state: {
					scenarios: {
						scenarios: {
							byKey: {
								k1: {n: 1},
								k2: {n: 2},
								k3: {n: 3, removed: true},
							},
							activeKeys: [],
						},
					},
				},
				expectedResult: null,
			},
			{
				name: 'none with empty models',
				state: {
					scenarios: {
						scenarios: {
							byKey: {},
							activeKeys: ['k3'],
						},
					},
				},
				expectedResult: null,
			},
			{
				name: 'none',
				state: {
					scenarios: {
						scenarios: {
							byKey: {
								k1: {n: 1},
								k2: {n: 2},
								k3: {n: 3, removed: true},
							},
							activeKeys: ['k3'],
						},
					},
				},
				expectedResult: null,
			},
			{
				name: 'one',
				state: {
					scenarios: {
						scenarios: {
							byKey: {
								k1: {n: 1},
								k2: {n: 2},
								k3: {n: 3, removed: true},
							},
							activeKeys: ['k1', 'k3'],
						},
					},
				},
				expectedResult: [{n: 1}],
			},
			{
				name: 'two',
				state: {
					scenarios: {
						scenarios: {
							byKey: {
								k1: {n: 1},
								k2: {n: 2},
								k3: {n: 3, removed: true},
							},
							activeKeys: ['k1', 'k2', 'k3'],
						},
					},
				},
				expectedResult: [{n: 1}, {n: 2}],
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getActiveScenarios(test.state),
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
					scenarios: {
						scenarios: {
							byKey: null,
						},
					},
				},
				expectedResult: [],
			},
			{
				name: 'empty',
				state: {
					scenarios: {
						scenarios: {
							byKey: {},
						},
					},
				},
				expectedResult: [],
			},
			{
				name: 'some',
				state: {
					scenarios: {
						scenarios: {
							byKey: {
								k1: {n: 1},
								k2: {n: 2},
								k3: {n: 3, removed: true},
							},
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
					scenarios: {
						scenarios: {
							byKey: {},
						},
					},
				},
				expectedResult: {},
			},
			{
				name: 'empty',
				state: {
					scenarios: {
						scenarios: {
							byKey: {},
						},
					},
				},
				expectedResult: {},
			},
			{
				name: 'some',
				state: {
					scenarios: {
						scenarios: {
							byKey: {
								k1: {n: 1},
								k2: {n: 2},
								k3: {n: 3, removed: true},
							},
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
					scenarios: {
						scenarios: {
							byKey: {k1: {n: 1}, k2: {n: 2}},
						},
					},
				},
				key: 'k3',
				expectedResult: null,
			},
			{
				name: 'null key',
				state: {
					scenarios: {
						scenarios: {
							byKey: {k1: {n: 1}, k2: {n: 2}},
						},
					},
				},
				key: null,
				expectedResult: undefined,
			},
			{
				name: 'some',
				state: {
					scenarios: {
						scenarios: {
							byKey: {k1: {n: 1}, k2: {n: 2}},
						},
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

	describe('getEditedAll', function () {
		const tests = [
			{
				name: 'null',
				state: {
					scenarios: {
						scenarios: {
							editedByKey: null,
						},
					},
				},
				expectedResult: null,
			},
			{
				name: 'empty',
				state: {
					scenarios: {
						scenarios: {
							editedByKey: {},
						},
					},
				},
				expectedResult: [],
			},
			{
				name: 'some',
				state: {
					scenarios: {
						scenarios: {
							editedByKey: {k1: 'val1', k2: 'val2'},
						},
					},
				},
				expectedResult: ['val1', 'val2'],
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getEditedAll(test.state),
					test.expectedResult
				);
			});
		});
	});

	describe('getEditedAllAsObject', function () {
		const tests = [
			{
				name: 'null',
				state: {
					scenarios: {
						scenarios: {
							editedByKey: null,
						},
					},
				},
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					scenarios: {
						scenarios: {
							editedByKey: {prop: 'val'},
						},
					},
				},
				expectedResult: {prop: 'val'},
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getEditedAllAsObject(test.state),
					test.expectedResult
				);
			});
		});
	});
	describe('getEditedByKey', function () {
		const tests = [
			{
				name: 'null key',
				state: {
					scenarios: {
						scenarios: {
							editedByKey: {k1: 'val1', k2: 'val2'},
						},
					},
				},
				key: null,
				expectedResult: null,
			},
			{
				name: 'none',
				state: {
					scenarios: {
						scenarios: {
							editedByKey: {k1: 'val1', k2: 'val2'},
						},
					},
				},
				key: 'k5',
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					scenarios: {
						scenarios: {
							editedByKey: {k1: 'val1', k2: 'val2'},
						},
					},
				},
				key: 'k2',
				expectedResult: 'val2',
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.strictEqual(
					selectors.getEditedByKey(test.state, test.key),
					test.expectedResult
				);
			});
		});
	});

	describe('getEditedKeys', function () {
		const tests = [
			{
				name: 'null',
				state: {
					scenarios: {
						scenarios: {editedByKey: null},
					},
				},
				expectedResult: null,
			},
			{
				name: 'empty',
				state: {
					scenarios: {
						scenarios: {editedByKey: {}},
					},
				},
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					scenarios: {
						scenarios: {
							editedByKey: {k1: {key: 'ke1'}, k2: {key: 'ke2'}},
						},
					},
				},
				expectedResult: ['ke1', 'ke2'],
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getEditedKeys(test.state),
					test.expectedResult
				);
			});
		});
	});

	it('getSubstate', function () {
		assert.deepStrictEqual(
			selectors.getSubstate({
				scenarios: {
					scenarios: {},
				},
			}),
			{}
		);
	});

	it('isDefaultSituationActive', function () {
		assert.strictEqual(
			selectors.isDefaultSituationActive({
				scenarios: {
					scenarios: {defaultSituationActive: true},
				},
			}),
			true
		);
	});
});
