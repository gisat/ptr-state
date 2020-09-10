import {assert} from 'chai';
import selectors from '../../../src/state/SpatialData/selectors';

describe('state/SpatialData/selectors', function () {
	describe('getAllAsObject', function () {
		const tests = [
			{
				name: 'null',
				state: {
					spatialData: {
						byKey: {},
					},
				},
				expectedResult: {},
			},
			{
				name: 'empty',
				state: {
					spatialData: {
						byKey: {},
					},
				},
				expectedResult: {},
			},
			{
				name: 'some',
				state: {
					spatialData: {
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
					spatialData: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
					},
				},
				key: 'k3',
				expectedResult: null,
			},
			{
				name: 'null key',
				state: {
					spatialData: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
					},
				},
				key: null,
				expectedResult: undefined,
			},
			{
				name: 'some',
				state: {
					spatialData: {
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

	it('getSubstate', function () {
		assert.strictEqual(
			selectors.getSubstate({
				spatialData: 'subst',
			}),
			'subst'
		);
	});
});
