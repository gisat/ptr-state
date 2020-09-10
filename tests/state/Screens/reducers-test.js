import {assert} from 'chai';
import reducer from '../../../src/state/Screens/reducers';

describe('state/Screens/reducers', function () {
	it('add', function () {
		assert.deepStrictEqual(
			reducer(
				{screens: {}, sets: {}},
				{type: 'SCREENS.ADD', lineage: 's1', setKey: 's1'}
			),
			{
				screens: {
					s1: {
						data: {
							desiredState: 'open',
							minActiveWidth: null,
							width: null,
						},
						lineage: 's1',
					},
				},
				sets: {
					s1: {
						orderByHistory: ['s1'],
						orderBySpace: ['s1'],
					},
				},
			}
		);
	});

	it('close', function () {
		assert.deepStrictEqual(
			reducer(
				{
					screens: {s1: {key: 'sq', data: {}}},
				},
				{type: 'SCREENS.CLOSE', lineage: 's1'}
			),
			{
				screens: {
					s1: {
						data: {
							desiredState: 'closing',
						},
						lineage: 's1',
					},
				},
			}
		);
	});

	it('open', function () {
		assert.deepStrictEqual(
			reducer(
				{
					screens: {s1: {key: 'sq', data: {}}},
				},
				{type: 'SCREENS.OPEN', lineage: 's1'}
			),
			{
				screens: {
					s1: {
						data: {
							desiredState: 'open',
						},
						lineage: 's1',
					},
				},
			}
		);
	});

	it('remove', function () {
		assert.deepStrictEqual(
			reducer(
				{
					sets: {
						s1: {
							key: 's1',
							orderByHistory: ['l1', 'l2'],
							orderBySpace: ['l2', 'l1'],
						},
					},
				},
				{type: 'SCREENS.REMOVE', setKey: 's1', lineage: 'l1'}
			),
			{
				sets: {
					s1: {
						orderByHistory: ['l2'],
						orderBySpace: ['l2'],
					},
				},
			}
		);
	});

	it('removeAllScreensFromSet', function () {
		assert.deepStrictEqual(
			reducer(
				{
					sets: {
						s1: {
							key: 's1',
							orderByHistory: ['l1', 'l2'],
							orderBySpace: ['l2', 'l1'],
						},
						s2: {
							key: 's2',
							orderByHistory: ['l1', 'l2'],
							orderBySpace: ['l2', 'l1'],
						},
					},
				},
				{type: 'SCREENS.REMOVE_ALL', setKey: 's1'}
			),
			{
				sets: {
					s1: {
						orderByHistory: [],
						orderBySpace: [],
					},
					s2: {
						key: 's2',
						orderByHistory: ['l1', 'l2'],
						orderBySpace: ['l2', 'l1'],
					},
				},
			}
		);
	});

	it('retract', function () {
		assert.deepStrictEqual(
			reducer(
				{screens: {s1: {data: {}}}},
				{type: 'SCREENS.RETRACT', lineage: 's1'}
			),
			{
				screens: {
					s1: {
						lineage: 's1',
						data: {
							desiredState: 'retracted',
						},
					},
				},
			}
		);
	});

	it('addSet', function () {
		assert.deepStrictEqual(
			reducer({sets: {}}, {type: 'SCREENS.SETS.ADD', setKey: 's1'}),
			{
				sets: {
					s1: {
						orderByHistory: [],
						orderBySpace: [],
					},
				},
			}
		);
	});

	it('topHistory', function () {
		assert.deepStrictEqual(
			reducer(
				{sets: {s1: {orderByHistory: ['l1', 'l2', 'l3']}}},
				{type: 'SCREENS.TOP_HISTORY', setKey: 's1', lineage: 'l1'}
			),
			{sets: {s1: {orderByHistory: ['l2', 'l3', 'l1']}}}
		);
	});

	it('update', function () {
		assert.deepStrictEqual(
			reducer(
				{screens: {l1: {}}, sets: {}},
				{
					type: 'SCREENS.UPDATE',
					lineage: 'l1',
					data: {k: 'v'},
					setKey: 's1',
				}
			),
			{
				screens: {
					l1: {
						data: {
							k: 'v',
						},
					},
				},
				sets: {
					s1: {
						orderByHistory: ['l1'],
						orderBySpace: ['l1'],
					},
				},
			}
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
