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

	it('getUsesForIndex', function () {
		const state = {
			scopes: {activeKey: 'scopesKey'},
			sub: {
				inUse: {
					indexes: [
						[
							{
								filterByActive: {scope: true},
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
		const filter = {scopeKey: 'filter'};
		const order = 'asc';

		const expectedResult = {
			filter: {
				scopeKey: 'filter',
			},
			order: 'asc',
			uses: [{start: 5, length: 3}],
		};

		assert.deepStrictEqual(
			selectors.getUsesForIndex(getSubState)(state, filter, order),
			expectedResult
		);
	});

	it('getUsedIndexPages', function () {
		const state = {
			scopes: {activeKey: 'scopesKey'},
			sub: {
				inUse: {
					indexes: [
						[
							{
								filterByActive: {scope: true},
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

		const expectedResult = [
			{
				filter: {
					scopeKey: 'filter',
				},
				order: 'asc',
				uses: [{start: 5, length: 3}],
			},
		];

		assert.deepStrictEqual(
			selectors.getUsedIndexPages(getSubState)(state),
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

	describe('_mergeIntervals', function () {
		const tests = [
			{
				name: 'empty',
				intervals: [],
				expectedResult: null,
			},
			{
				name: 'single',
				intervals: [
					{
						start: 5,
						length: 3,
					},
				],
				expectedResult: [
					{
						start: 5,
						length: 3,
					},
				],
			},
			{
				name: 'non overlapping unsorted',
				intervals: [
					{
						start: 10,
						length: 2,
					},
					{
						start: 3,
						length: 4,
					},
					{
						start: 8,
						length: 1,
					},
				],
				expectedResult: [
					{
						start: 3,
						length: 4,
					},
					{
						start: 8,
						length: 1,
					},
					{
						start: 10,
						length: 2,
					},
				],
			},
			{
				name: 'overlapping unsorted',
				intervals: [
					{
						start: 12,
						length: 1,
					},
					{
						start: 10,
						length: 2,
					},
					{
						start: 7,
						length: 3,
					},
				],
				expectedResult: [
					{
						start: 7,
						length: 6,
					},
				],
			},
			{
				name: 'mixed',
				intervals: [
					{
						start: 12,
						length: 1,
					},
					{
						name: 'invalid interval',
					},
					null,
					{
						start: 10,
						length: 2,
					},
					{start: 20, length: 5},
				],
				expectedResult: [
					{start: 10, length: 3},
					{start: 20, length: 5},
				],
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors._mergeIntervals(test.intervals),
					test.expectedResult
				);
			});
		});
	});
});
