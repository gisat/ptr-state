import {assert} from 'chai';
import {sampleSubstoreName} from '../../../constants';
import commonSelectors from '../../../../src/state/_common/selectors';

describe('getIndexByPath', () => {
	const getSubstate = state => state[sampleSubstoreName];
	const state = {
		[sampleSubstoreName]: {
			byKey: {k1: {key: 'k1', data: {a: 'A'}}, k2: {key: 'k2', data: {a: 'B'}}},
			specialIndexes: [
				{
					filter: {
						scopeKey: 'scope1',
					},
					order: [['a', 'descending']],
					index: {1: 'k2', 2: 'k1'},
					count: 2,
				},
				{
					filter: {
						placeKey: 'place1',
					},
					index: {1: 'k2'},
					count: 1,
				},
			],
		},
	};

	it('should return index', () => {
		const filter = {
			scopeKey: 'scope1',
		};
		const order = [['a', 'descending']];
		const expectedResult = {
			filter: {
				scopeKey: 'scope1',
			},
			order: [['a', 'descending']],
			index: {1: 'k2', 2: 'k1'},
			count: 2,
		};
		const output = commonSelectors.getIndexByPath(getSubstate)(
			state,
			'specialIndexes',
			filter,
			order
		);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return index 2', () => {
		const filter = {
			placeKey: 'place1',
		};
		const order = null;
		const expectedResult = {
			filter: {
				placeKey: 'place1',
			},
			index: {1: 'k2'},
			count: 1,
		};
		const output = commonSelectors.getIndexByPath(getSubstate)(
			state,
			'specialIndexes',
			filter,
			order
		);
		assert.deepStrictEqual(output, expectedResult);
	});

	it('should return null if there are no indexes', () => {
		const filter = {
			scopeKey: 'scope1',
		};
		const order = [['a', 'descending']];
		const state = {[sampleSubstoreName]: {indexes: null}};
		const output = commonSelectors.getIndexByPath(getSubstate)(
			state,
			'specialIndexes',
			filter,
			order
		);
		assert.isNull(output);
	});

	it('should return null if indexes are empty', () => {
		const filter = {
			scopeKey: 'scope1',
		};
		const order = [['a', 'descending']];
		const state = {[sampleSubstoreName]: {indexes: []}};
		const output = commonSelectors.getIndexByPath(getSubstate)(
			state,
			'specialIndexes',
			filter,
			order
		);
		assert.isNull(output);
	});
});
