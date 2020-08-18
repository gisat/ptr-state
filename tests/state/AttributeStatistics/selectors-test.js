import {assert} from 'chai';
import selectors from '../../../src/state/AttributeStatistics/selectors';

describe('state/AttributeStatistics/selectors', function () {
	describe('getByKey', function () {
		const tests = [
			{
				name: 'none',
				state: {
					attributeStatistics: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
					},
				},
				key: 'k3',
				expectedResult: null,
			},
			{
				name: 'null key',
				state: {
					attributeStatistics: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
					},
				},
				key: null,
				expectedResult: undefined,
			},
			{
				name: 'some',
				state: {
					attributeStatistics: {
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

	describe('getAllAsObject', function () {
		const tests = [
			{
				name: 'null',
				state: {
					attributeStatistics: {
						byKey: {},
					},
				},
				expectedResult: {},
			},
			{
				name: 'empty',
				state: {
					attributeStatistics: {
						byKey: {},
					},
				},
				expectedResult: {},
			},
			{
				name: 'some',
				state: {
					attributeStatistics: {
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

	describe('getBatchByFilterOrder', function () {
		const tests = [
			{
				name: 'empty models',
				state: {
					attributeStatistics: {
						byKey: {},
						indexes: [
							{filter: 'fil', order: 'desc'},
							{
								filter: {scopeKey: 'scopeK'},
								order: 'asc',
								count: 4,
								index: [null, 'k1', 'k2', 'k3'],
							},
						],
					},
				},
				expectedResult: [null, null, null, null],
			},
			{
				name: 'empty indexes',
				state: {
					attributeStatistics: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
						indexes: [],
					},
				},
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					attributeStatistics: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
						indexes: [
							{filter: 'fil', order: 'desc'},
							{
								filter: {scopeKey: 'scopeK'},
								order: 'asc',
								count: 4,
								index: [null, 'k1', 'k2', 'k3'],
							},
						],
					},
				},
				expectedResult: [null, {n: 1}, {n: 2}, null],
			},
		];
		const filter = {scopeKey: 'scopeK'};
		const order = 'asc';

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getBatchByFilterOrder(test.state, filter, order),
					test.expectedResult
				);
			});
		});
	});

	it('getSubstate', function () {
		assert.strictEqual(
			selectors.getSubstate({
				attributeStatistics: 'subst',
			}),
			'subst'
		);
	});
});
