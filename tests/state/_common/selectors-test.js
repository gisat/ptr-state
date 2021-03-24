import {assert} from 'chai';
import selectors from '../../../src/state/_common/selectors';

describe('state/_common/selectors', function () {
	const getSubState = state => state.sub;

	it('getIndexesByFilteredItem', function () {
		const state = {
			sub: {
				indexes: [
					{filter: 'fil2', order: 'desc'},
					{filter: {sameProp: 'that'}, order: 'desc'},
					{filter: {sameProp: 'notThis'}, order: 'asc', count: 5},
					{filter: {sameProp: 'that'}, order: 'asc'},
				],
			},
		};
		const item = {
			data: {
				sameProp: 'that',
			},
		};

		const expectedResult = [
			{filter: {sameProp: 'that'}, order: 'desc'},
			{filter: {sameProp: 'that'}, order: 'asc'},
		];

		assert.deepStrictEqual(
			selectors.getIndexesByFilteredItem(getSubState)(state, item),
			expectedResult
		);
	});

	it('getUsesWithActiveDependency', function () {
		const state = {
			scopes: {activeKey: 'scopesKey'},
			sub: {
				inUse: {
					indexes: [
						[
							{
								filterByActive: {scopeKey: 'k'},
								filter: {scopeKey: 'filter'},
								order: 'asc',
								start: 5,
								length: 3,
							},
						],
					],
				},
			},
		};
		const filter = {scopeKey: 'scopesKey'};
		const order = 'asc';

		const expectedResult = [
			{
				filter: {
					scopeKey: 'filter',
				},
				order: 'asc',
				uses: [
					{
						length: 3,
						start: 5,
					},
				],
			},
		];

		assert.deepStrictEqual(
			selectors.getUsesWithActiveDependency(getSubState)(state, filter, order),
			expectedResult
		);
	});
});
