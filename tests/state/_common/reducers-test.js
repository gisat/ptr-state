import {assert} from 'chai';
import reducers, {
	DEFAULT_INITIAL_STATE,
} from '../../../src/state/_common/reducers';

describe('state/_common/reducers', function () {
	describe('removeEditedPropertyValues', function () {
		const tests = [
			{
				name: 'updated',
				state: {
					editedByKey: {
						k1: {
							data: {
								name: 'key prop in keys',
								actionKey: 'ak1',
							},
						},
						k2: {
							data: {
								name: 'key prop not in keys',
								actionKey: 'nak2',
							},
						},
						k3: {
							data: {
								name: 'multi key prop in keys',
								actionKeys: ['ak3.1', 'ak3.2'],
							},
						},
						k4: {
							data: {
								name: 'multi key prop not in keys',
								actionKeys: ['ak4.1', 'ak4.2'],
							},
						},
					},
				},
				action: {
					dataType: 'actions',
					keys: ['ak1', 'ak3.2'],
				},
				expectedResult: {
					editedByKey: {
						k1: {
							data: {
								name: 'key prop in keys',
								actionKey: null,
							},
						},
						k2: {
							data: {
								name: 'key prop not in keys',
								actionKey: 'nak2',
							},
						},
						k3: {
							data: {
								name: 'multi key prop in keys',
								actionKeys: ['ak3.1'],
							},
						},
						k4: {
							data: {
								name: 'multi key prop not in keys',
								actionKeys: ['ak4.1', 'ak4.2'],
							},
						},
					},
				},
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					reducers.removeEditedPropertyValues(test.state, test.action),
					test.expectedResult
				);
			});
		});
	});

	describe('clearIndexes', function () {
		const tests = [
			{
				name: 'empty',
				state: {
					indexes: [],
				},
				action: {},
				expectedResult: {
					indexes: null,
				},
			},
			{
				name: 'non empty',
				state: {
					indexes: [
						{
							filter: 'fil',
							order: 'asc',
							count: 5,
							index: {1: 'v1', 2: 'v2'},
							changedOn: 'changed on',
						},
					],
				},
				action: {},
				expectedResult: {
					indexes: [
						{
							filter: 'fil',
							order: 'asc',
							count: null,
							index: null,
							changedOn: null,
							outdated: {1: 'v1', 2: 'v2'},
							outdatedCount: 5,
						},
					],
				},
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					reducers.clearIndexes(test.state, test.action),
					test.expectedResult
				);
			});
		});
	});

	describe('clearIndex', function () {
		const tests = [
			{
				name: 'without match',
				state: {
					indexes: [
						{
							filter: 'fil',
							order: 'asc',
							count: 5,
							index: {1: 'v1', 2: 'v2'},
							changedOn: 'changed on',
						},
						{
							filter: 'fil',
							order: 'desc',
							count: 7,
							index: {1: 'v2.1', 2: 'v2.2'},
							changedOn: 'changed on2',
						},
					],
				},
				action: {
					filter: 'fil2',
					order: 'asc',
				},
				expectedResult: {
					indexes: [
						{
							filter: 'fil',
							order: 'asc',
							count: 5,
							index: {1: 'v1', 2: 'v2'},
							changedOn: 'changed on',
						},
						{
							filter: 'fil',
							order: 'desc',
							count: 7,
							index: {1: 'v2.1', 2: 'v2.2'},
							changedOn: 'changed on2',
						},
					],
				},
			},
			{
				name: 'with match',
				state: {
					indexes: [
						{
							filter: 'fil',
							order: 'asc',
							count: 5,
							index: {1: 'v1', 2: 'v2'},
							changedOn: 'changed on',
						},
						{
							filter: 'fil',
							order: 'desc',
							count: 7,
							index: {1: 'v2.1', 2: 'v2.2'},
							changedOn: 'changed on2',
						},
					],
				},
				action: {
					filter: 'fil',
					order: 'asc',
				},
				expectedResult: {
					indexes: [
						{
							filter: 'fil',
							order: 'asc',
							count: null,
							index: null,
							changedOn: null,
							outdated: {1: 'v1', 2: 'v2'},
							outdatedCount: 5,
						},
						{
							filter: 'fil',
							order: 'desc',
							count: 7,
							index: {1: 'v2.1', 2: 'v2.2'},
							changedOn: 'changed on2',
						},
					],
				},
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					reducers.clearIndex(test.state, test.action),
					test.expectedResult
				);
			});
		});
	});

	describe('dataSetOutdated', function () {
		const tests = [
			{
				name: 'empty',
				state: {byKey: {}},
				action: {},
				expectedResult: {byKey: {}},
			},
			{
				name: 'non empty',
				state: {
					byKey: {
						k1: {data: {p: 1}},
						k2: {data: {p: 2}},
					},
				},
				action: {},
				expectedResult: {
					byKey: {
						k1: {data: {p: 1}, outdated: true},
						k2: {data: {p: 2}, outdated: true},
					},
				},
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					reducers.dataSetOutdated(test.state, test.action),
					test.expectedResult
				);
			});
		});
	});

	describe('cleanupOnLogout', function () {
		const tests = [
			{
				name: 'test',
				state: {
					byKey: {
						k1: {data: {p: 1}, permissions: {guest: {get: true}}},
						k2: {data: {p: 2}},
						k3: {data: {p: 3}, permissions: {guest: {get: true}}},
					},
				},
				action: {},
				expectedResult: {
					byKey: {
						k1: {data: {p: 1}, permissions: {guest: {get: true}}},
						k3: {data: {p: 3}, permissions: {guest: {get: true}}},
					},
				},
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					reducers.cleanupOnLogout(test.state, test.action),
					test.expectedResult
				);
			});
		});
	});
});
