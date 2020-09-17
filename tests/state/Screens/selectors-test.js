import {assert} from 'chai';
import selectors from '../../../src/state/Screens/selectors';

describe('state/Screens/selectors', function () {
	it('getScreenByLineage', function () {
		assert.deepStrictEqual(
			selectors.getScreenByLineage(
				{
					screens: {
						screens: {
							l1: {key: 'l1'},
						},
					},
				},
				'l1'
			),
			{key: 'l1'}
		);
	});

	it('getSetByKey', function () {
		assert.deepStrictEqual(
			selectors.getSetByKey(
				{
					screens: {sets: {s1: {key: 's1'}}},
				},
				's1'
			),
			{key: 's1'}
		);
	});

	it('getScreensBySetKey', function () {
		assert.deepStrictEqual(
			selectors.getScreensBySetKey(
				{
					screens: {
						screens: {l1: {key: 'l1'}, l2: {key: 'l2'}},
						sets: {
							s1: {key: 's1', orderBySpace: ['l1']},
						},
					},
				},
				's1'
			),
			{l1: {key: 'l1'}}
		);
	});

	it('getSetKeyByScreenLineage', function () {
		assert.deepStrictEqual(
			selectors.getSetKeyByScreenLineage(
				{
					screens: {
						screens: {l1: {key: 'l1'}},
						sets: {
							s1: {key: 's1', orderByHistory: ['l1']},
						},
					},
				},
				'l1'
			),
			's1'
		);
	});
});
