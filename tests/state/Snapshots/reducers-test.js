import {assert} from 'chai';
import reducer from '../../../src/state/Snapshots/reducers';

describe('state/Snapshots/reducers', function () {
	describe('add', function () {
		const tests = [
			{
				name: 'no data',
				state: {byKey: {k1: {key: 'k1', p1: 'v1', p2: 'v2'}}},
				action: {
					type: 'SNAPSHOTS_ADD',
				},
				expectedResult: {byKey: {k1: {key: 'k1', p1: 'v1', p2: 'v2'}}},
			},
			{
				name: 'some',
				state: {byKey: {k1: {key: 'k1', p1: 'v1', p2: 'v2'}}},
				action: {
					type: 'SNAPSHOTS_ADD',
					data: [
						{key: 'k1', p2: 'v2.2', p3: 'v3.3'},
						{key: 'k2', p: 'v'},
					],
				},
				expectedResult: {
					byKey: {
						k1: {
							key: 'k1',
							p1: 'v1',
							p2: 'v2.2',
							p3: 'v3.3',
						},
						k2: {
							key: 'k2',
							p: 'v',
						},
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

	it('remove', function () {
		assert.deepStrictEqual(
			reducer(
				{byKey: {k1: {}, k2: {}}},
				{type: 'SNAPSHOTS_REMOVE', keys: ['k1']}
			),
			{byKey: {k2: {}}}
		);
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
