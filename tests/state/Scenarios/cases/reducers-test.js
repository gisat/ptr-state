import {assert} from 'chai';
import reducer from '../../../../src/state/Scenarios/cases/reducers';

describe('state/Scenarios/cases/reducers', function () {
	describe('add', function () {
		const tests = [
			{
				name: 'no data',
				state: {byKey: null},
				action: {type: 'SCENARIOS_CASES_ADD'},
				expectedResult: {byKey: {}},
			},
			{
				name: 'empty data',
				state: {byKey: null},
				action: {type: 'SCENARIOS_CASES_ADD', data: []},
				expectedResult: {byKey: {}},
			},
			{
				name: 'some data',
				state: {byKey: null},
				action: {
					type: 'SCENARIOS_CASES_ADD',
					data: [
						{
							key: 'k1',
							name: 'first',
						},
						{
							key: 'k2',
							name: 'second',
							outdated: true,
							unreceived: true,
						},
					],
				},
				expectedResult: {
					byKey: {
						k1: {key: 'k1', name: 'first'},
						k2: {key: 'k2', name: 'second'},
					},
				},
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					reducer(test.state, test.action),
					test.expectedResult
				);
			});
		});
	});

	describe('setActive', function () {
		const tests = [
			{
				name: 'test',
				state: {
					activeKey: 'k1',
					activeKeys: ['ks1', 'ks2'],
				},
				action: {
					type: 'SCENARIOS_CASES_SET_ACTIVE',
					key: 'ak',
				},
				expectedResult: {
					activeKey: 'ak',
					activeKeys: null,
				},
			},
		];
		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					reducer(test.state, test.action),
					test.expectedResult
				);
			});
		});
	});

	describe('updateEdited', function () {
		const tests = [
			{
				name: 'empty data',
				state: {
					editedByKey: {
						k1: {data: {p: 1, ep: 2}},
						k2: {data: {p: 2}},
					},
				},
				action: {
					type: 'SCENARIOS_CASES_EDITED_UPDATE',
					data: [],
				},
				expectedResult: {
					editedByKey: {
						k1: {data: {p: 1, ep: 2}},
						k2: {data: {p: 2}},
					},
				},
			},
			{
				name: 'some data',
				state: {
					editedByKey: {
						k1: {data: {p: 1, ep: 2}},
						k2: {data: {p: 2}},
					},
				},
				action: {
					type: 'SCENARIOS_CASES_EDITED_UPDATE',
					data: [
						{key: 'k1', data: {p: 11}},
						{key: 'k3', data: {p: 33}},
					],
				},
				expectedResult: {
					editedByKey: {
						k1: {data: {p: 11, ep: 2}},
						k2: {data: {p: 2}},
						k3: {key: 'k3', data: {p: 33}},
					},
				},
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					reducer(test.state, test.action),
					test.expectedResult
				);
			});
		});
	});

	describe('removeEdited', function () {
		const tests = [
			{
				name: 'some',
				state: {editedByKey: {k1: 1, k2: 2, k3: 3}},
				action: {
					type: 'SCENARIOS_CASES_EDITED_REMOVE',
					keys: ['k1', 'k2'],
				},
				expectedResult: {
					editedByKey: {k3: 3},
				},
			},
			{
				name: 'all',
				state: {editedByKey: {k1: 1, k2: 2, k3: 3}},
				action: {
					type: 'SCENARIOS_CASES_EDITED_REMOVE',
					keys: ['k1', 'k2', 'k3'],
				},
				expectedResult: {
					editedByKey: {},
				},
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					reducer(test.state, test.action),
					test.expectedResult
				);
			});
		});
	});

	describe('removeEditedActive', function () {
		const tests = [
			{
				name: 'some',
				state: {
					activeKey: 'k1',
					editedByKey: {k1: 1, k2: 2, k3: 3},
				},
				action: {type: 'SCENARIOS_CASES_EDITED_REMOVE_ACTIVE'},
				expectedResult: {
					activeKey: 'k1',
					editedByKey: {k2: 2, k3: 3},
				},
			},
			{
				name: 'all',
				state: {
					activeKey: 'k1',
					editedByKey: {k1: 1},
				},
				action: {type: 'SCENARIOS_CASES_EDITED_REMOVE_ACTIVE'},
				expectedResult: {
					activeKey: 'k1',
					editedByKey: {},
				},
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					reducer(test.state, test.action),
					test.expectedResult
				);
			});
		});
	});

	describe('removeEditedProperty', function () {
		const tests = [
			{
				name: 'empty data',
				state: {
					editedByKey: {
						k1: {data: {p: 1, p2: 12}},
						k2: {data: null},
					},
				},
				action: {
					type: 'SCENARIOS_CASES_EDITED_REMOVE_PROPERTY',
					key: 'k2',
					property: 'p',
				},
				expectedResult: {
					editedByKey: {
						k1: {data: {p: 1, p2: 12}},
						k2: {data: null},
					},
				},
			},
			{
				name: 'non existing property',
				state: {
					editedByKey: {
						k1: {data: {p: 1, p2: 12}},
						k2: {data: {p: 2, p2: 22}},
					},
				},
				action: {
					type: 'SCENARIOS_CASES_EDITED_REMOVE_PROPERTY',
					key: 'k2',
					property: 'p3',
				},
				expectedResult: {
					editedByKey: {
						k1: {data: {p: 1, p2: 12}},
						k2: {data: {p: 2, p2: 22}},
					},
				},
			},
			{
				name: 'matched property',
				state: {
					editedByKey: {
						k1: {data: {p: 1, p2: 12}},
						k2: {data: {p: 2, p2: 22}},
					},
				},
				action: {
					type: 'SCENARIOS_CASES_EDITED_REMOVE_PROPERTY',
					key: 'k2',
					property: 'p',
				},
				expectedResult: {
					editedByKey: {
						k1: {data: {p: 1, p2: 12}},
						k2: {data: {p2: 22}},
					},
				},
			},
			{
				name: 'matched last property',
				state: {
					editedByKey: {
						k1: {data: {p: 1, p2: 12}},
						k2: {data: {p: 2}},
					},
				},
				action: {
					type: 'SCENARIOS_CASES_EDITED_REMOVE_PROPERTY',
					key: 'k2',
					property: 'p',
				},
				expectedResult: {
					editedByKey: {
						k1: {data: {p: 1, p2: 12}},
					},
				},
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					reducer(test.state, test.action),
					test.expectedResult
				);
			});
		});
	});

	describe('add', function () {
		const tests = [
			{
				name: 'no data',
				state: {byKey: null},
				action: {type: 'SCENARIOS_CASES_RECEIVE'},
				expectedResult: {byKey: {}},
			},
			{
				name: 'empty data',
				state: {byKey: null},
				action: {type: 'SCENARIOS_CASES_RECEIVE', data: []},
				expectedResult: {byKey: {}},
			},
			{
				name: 'some data',
				state: {byKey: null},
				action: {
					type: 'SCENARIOS_CASES_RECEIVE',
					data: [
						{
							key: 'k1',
							name: 'first',
						},
						{
							key: 'k2',
							name: 'second',
							outdated: true,
							unreceived: true,
						},
					],
				},
				expectedResult: {
					byKey: {
						k1: {key: 'k1', name: 'first'},
						k2: {key: 'k2', name: 'second'},
					},
				},
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					reducer(test.state, test.action),
					test.expectedResult
				);
			});
		});
	});

	describe('remove', function () {
		const tests = [
			{
				name: 'some',
				state: {byKey: {k1: 1, k2: 2, k3: 3}},
				action: {
					type: 'SCENARIOS_CASES_REMOVE',
					keys: ['k1', 'k2'],
				},
				expectedResult: {
					byKey: {k3: 3},
				},
			},
			{
				name: 'all',
				state: {byKey: {k1: 1, k2: 2, k3: 3}},
				action: {
					type: 'SCENARIOS_CASES_REMOVE',
					keys: ['k1', 'k2', 'k3'],
				},
				expectedResult: {
					byKey: {},
				},
			},
		];

		tests.forEach((test) => {
			assert.deepStrictEqual(
				reducer(test.state, test.action),
				test.expectedResult
			);
		});
	});

	describe('add', function () {
		const tests = [
			{
				name: 'no data',
				state: {byKey: null},
				action: {type: 'SCENARIOS_CASES_UPDATE'},
				expectedResult: {byKey: {}},
			},
			{
				name: 'empty data',
				state: {byKey: null},
				action: {type: 'SCENARIOS_CASES_UPDATE', data: []},
				expectedResult: {byKey: {}},
			},
			{
				name: 'some data',
				state: {byKey: null},
				action: {
					type: 'SCENARIOS_CASES_UPDATE',
					data: [
						{
							key: 'k1',
							name: 'first',
						},
						{
							key: 'k2',
							name: 'second',
							outdated: true,
							unreceived: true,
						},
					],
				},
				expectedResult: {
					byKey: {
						k1: {key: 'k1', name: 'first'},
						k2: {key: 'k2', name: 'second'},
					},
				},
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					reducer(test.state, test.action),
					test.expectedResult
				);
			});
		});
	});

	it('unknown', function () {
		assert.deepStrictEqual(
			reducer(
				{},
				{
					type: 'UNKNOWN_ACTION',
				}
			),
			{}
		);
	});
});
