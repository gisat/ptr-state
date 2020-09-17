import {assert} from 'chai';
import selectors from '../../../src/state/Windows/selectors';

describe('state/Windows/selectors', function () {
	it('getSetByKey', function () {
		assert.deepStrictEqual(
			selectors.getSetByKey({windows: {sets: {s1: {key: 's1'}}}}, 's1'),
			{key: 's1'}
		);
	});

	it('getWindow', function () {
		assert.deepStrictEqual(
			selectors.getWindow({windows: {windows: {w1: {key: 'w1'}}}}, 'w1'),
			{key: 'w1'}
		);
	});

	describe('getWindowsBySetKeyAsObject', function () {
		it('missing set', function () {
			assert.isNull(
				selectors.getWindowsBySetKeyAsObject(
					{
						windows: {
							sets: {s1: {orderByHistory: ['w1', 'w2']}},
							windows: {w1: {key: 'w1'}, w2: {key: 'w2'}},
						},
					},
					's2'
				)
			);
		});

		it('some', function () {
			assert.deepStrictEqual(
				selectors.getWindowsBySetKeyAsObject(
					{
						windows: {
							sets: {s1: {orderByHistory: ['w1', 'w2']}},
							windows: {w1: {key: 'w1'}, w2: {key: 'w2'}},
						},
					},
					's1'
				),
				{
					w1: {
						key: 'w1',
					},
					w2: {
						key: 'w2',
					},
				}
			);
		});
	});

	describe('isOpen', function () {
		it('open window', function () {
			assert.isTrue(
				selectors.isOpen(
					{windows: {windows: {w1: {data: {state: 'open'}}}}},
					'w1'
				)
			);
		});

		it('non existing window', function () {
			assert.isFalse(
				selectors.isOpen(
					{windows: {windows: {w1: {data: {state: 'open'}}}}},
					'w2'
				)
			);
		});
	});
});
