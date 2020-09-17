import {assert} from 'chai';
import selectors from '../../../../src/state/Scenarios/cases/selectors';

describe('state/Scenarios/cases/selectors', function () {
	describe('getActive', function () {
		const createState = (activeKey) => ({
			scenarios: {
				cases: {
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
				cases: {activeKey: 'k'},
			},
		};

		assert.strictEqual(selectors.getActiveKey(state), 'k');
	});

	describe('getAll', function () {
		const tests = [
			{
				name: 'null',
				state: {
					scenarios: {
						cases: {
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
						cases: {
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
						cases: {
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

	describe('getByKey', function () {
		const tests = [
			{
				name: 'none',
				state: {
					scenarios: {
						cases: {
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
						cases: {
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
						cases: {
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
						cases: {
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
						cases: {
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
						cases: {
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

	it('getSubstate', function () {
		assert.deepStrictEqual(
			selectors.getSubstate({
				scenarios: {
					cases: {},
				},
			}),
			{}
		);
	});

	it('activeCaseScenariosLoaded', function () {
		assert.strictEqual(
			selectors.activeCaseScenariosLoaded({
				scenarios: {
					cases: {
						byKey: {
							k1: {n: 1, data: {scenariosLoaded: true}},
							k2: {n: 2},
							k3: {n: 3, removed: true},
						},
						activeKey: 'k1',
					},
				},
			}),
			true
		);
	});

	describe('getActiveCaseEdited', function () {
		const tests = [
			{
				name: 'none',
				state: {
					scenarios: {
						cases: {
							activeKey: 'k5',
							editedByKey: {k1: 'val1', k2: 'val2'},
						},
					},
				},
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					scenarios: {
						cases: {
							activeKey: 'k1',
							editedByKey: {k1: 'val1', k2: 'val2'},
						},
					},
				},
				expectedResult: 'val1',
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.strictEqual(
					selectors.getActiveCaseEdited(test.state),
					test.expectedResult
				);
			});
		});
	});

	it('getActiveCaseScenarioKeys', function () {
		assert.deepStrictEqual(
			selectors.getActiveCaseScenarioKeys({
				scenarios: {
					cases: {
						byKey: {
							k1: {n: 1, data: {scenarios: ['s1', 's2']}},
							k2: {n: 2},
							k3: {n: 3, removed: true},
						},
						activeKey: 'k1',
					},
				},
			}),
			['s1', 's2']
		);
	});

	describe('getActiveCaseEditedScenarioKeys', function () {
		const tests = [
			{
				name: 'none',
				state: {
					scenarios: {
						cases: {
							activeKey: 'k5',
							editedByKey: {k1: 'val1', k2: 'val2'},
						},
					},
				},
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					scenarios: {
						cases: {
							activeKey: 'k1',
							editedByKey: {
								k1: {
									key: 'k1',
									data: {scenarios: ['s1', 's2']},
								},
								k2: {key: 'k2'},
							},
						},
					},
				},
				expectedResult: ['s1', 's2'],
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getActiveCaseEditedScenarioKeys(test.state),
					test.expectedResult
				);
			});
		});
	});

	it('getActiveCaseScenariosEditedKeys', function () {
		assert.deepStrictEqual(
			selectors.getActiveCaseScenariosEditedKeys({
				scenarios: {
					cases: {
						byKey: {
							k1: {n: 1, data: {scenarios: ['s1']}},
							k2: {n: 2},
							k3: {n: 3, removed: true},
						},
						activeKey: 'k1',
					},
					scenarios: {
						editedByKey: {s1: {key: 's1'}, s2: {key: 's2'}},
					},
				},
			}),
			['s1']
		);
	});

	it('getActiveCaseScenariosEdited', function () {
		assert.deepStrictEqual(
			selectors.getActiveCaseScenariosEdited({
				scenarios: {
					cases: {
						byKey: {
							k1: {n: 1, data: {scenarios: ['s1']}},
							k2: {n: 2},
							k3: {n: 3, removed: true},
						},
						activeKey: 'k1',
					},
					scenarios: {
						editedByKey: {s1: {key: 's1'}, s2: {key: 's2'}},
					},
				},
			}),
			[{key: 's1'}]
		);
	});

	it('getActiveCaseScenarioEdited', function () {
		assert.deepStrictEqual(
			selectors.getActiveCaseScenarioEdited({
				scenarios: {
					cases: {
						byKey: {
							k1: {n: 1, data: {scenarios: ['s1']}},
							k2: {n: 2},
							k3: {n: 3, removed: true},
						},
						activeKey: 'k1',
					},
					scenarios: {
						editedByKey: {s1: {key: 's1'}, s2: {key: 's2'}},
					},
				},
			}),
			{key: 's1'}
		);
	});

	it('getActiveCaseScenarios', function () {
		assert.deepStrictEqual(
			selectors.getActiveCaseScenarios({
				scenarios: {
					cases: {
						byKey: {
							k1: {n: 1, data: {scenarios: ['s1', 's2']}},
							k2: {n: 2},
							k3: {n: 3, removed: true},
						},
						activeKey: 'k1',
					},
					scenarios: {
						byKey: {
							s1: {key: 's1'},
							s2: {key: 's2'},
							s3: {key: 's3'},
						},
					},
				},
			}),
			[{key: 's1'}, {key: 's2'}]
		);
	});

	it('getActivePlaceCases', function () {
		assert.deepStrictEqual(
			selectors.getActivePlaceCases({
				scenarios: {
					cases: {
						byKey: {
							k1: {n: 1, data: {place_ids: ['p1', 'p2']}},
							k2: {n: 2, data: {place_ids: ['p3', 'p1']}},
							k3: {n: 3, data: {place_ids: ['p2', 'p3']}},
						},
					},
				},
				places: {
					activeKey: 'p1',
				},
			}),
			[
				{n: 1, data: {place_ids: ['p1', 'p2']}},
				{n: 2, data: {place_ids: ['p3', 'p1']}},
			]
		);
	});
});
