import {assert} from 'chai';
import selectors from '../../../src/state/Snapshots/selectors';

describe('state/Snapshots/selectors', function () {
	describe('getAll', function () {
		const tests = [
			{
				name: 'null',
				state: {
					snapshots: {
						byKey: null,
					},
				},
				expectedResult: [],
			},
			{
				name: 'empty',
				state: {
					snapshots: {
						byKey: {},
					},
				},
				expectedResult: [],
			},
			{
				name: 'some',
				state: {
					snapshots: {
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
});
