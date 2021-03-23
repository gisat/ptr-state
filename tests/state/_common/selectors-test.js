import {assert} from 'chai';
import selectors from '../../../src/state/_common/selectors';

describe('state/_common/selectors', function () {
	const getSubState = state => state.sub;

	describe('getAllActiveKeys', function () {
		const tests = [
			{
				name: 'none specified',
				state: {},
				expectedResult: {
					activeAreaTreeLevelKey: null,
					activeAttributeKey: null,
					activeAttributeKeys: null,
					activeCaseKey: null,
					activeCaseKeys: null,
					activeLayerTemplateKey: null,
					activePeriodKey: null,
					activePeriodKeys: null,
					activePlaceKey: null,
					activePlaceKeys: null,
					activeScenarioKey: null,
					activeScenarioKeys: null,
					activeScopeKey: null,
				},
			},
			{
				name: 'all specified',
				state: {
					scopes: {activeKey: 'scopesKey'},
					cases: {activeKey: 'casesKey', activeKeys: ['c1', 'c2']},
					scenarios: {activeKey: 'scenariosKey'},
					places: {activeKey: 'placesKey', activeKeys: ['p1', 'p2']},
					periods: {
						activeKey: 'periodsKey',
						activeKeys: ['ps1', 'ps2'],
					},
					attributes: {activeKey: 'attributesKey', activeKeys: ['a1', 'a2']},
					layerTemplates: {activeKey: 'layerTemplatesKey'},
					areaTreeLevelKeys: {activeKey: 'areaTreeLevelKey'},
					specific: {apps: {activeKey: 'appsKey'}},
					app: {key: 'appKey'},
				},
				expectedResult: {
					activeApplicationKey: 'appsKey',
					activeAreaTreeLevelKey: 'areaTreeLevelKey',
					activeAttributeKey: 'attributesKey',
					activeAttributeKeys: ['a1', 'a2'],
					activeCaseKey: 'casesKey',
					activeCaseKeys: ['c1', 'c2'],
					activeLayerTemplateKey: 'layerTemplatesKey',
					activePeriodKey: 'periodsKey',
					activePeriodKeys: ['ps1', 'ps2'],
					activePlaceKey: 'placesKey',
					activePlaceKeys: ['p1', 'p2'],
					activeScenarioKey: 'scenariosKey',
					activeScenarioKeys: null,
					activeScopeKey: 'scopesKey',
				},
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getAllActiveKeys(test.state),
					test.expectedResult
				);
			});
		});
	});

	describe('getAllForActiveScope', function () {
		const tests = [
			{
				name: 'empty models',
				state: {
					sub: {},
					scopes: {
						activeKey: 'scopeK',
					},
				},
				expectedResult: null,
			},
			{
				name: 'empty indexes',
				state: {
					sub: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
						indexes: [],
					},
					scopes: {
						activeKey: 'scopeK',
					},
				},
				expectedResult: null,
			},
			{
				name: 'no active skope key',
				state: {
					sub: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
						indexes: [
							{filter: 'fil', order: 'desc'},
							{
								filter: {scopeKey: 'scopeK'},
								order: 'asc',
								count: 4,
								index: {1: null, 2: 'k1', 3: 'k2', 4: 'k3'},
							},
						],
					},
					scopes: {},
				},
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					sub: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
						indexes: [
							{filter: 'fil', order: 'desc'},
							{
								filter: {scopeKey: 'scopeK'},
								order: 'asc',
								count: 4,
								index: {1: null, 2: 'k1', 3: 'k2', 4: 'k3'},
							},
						],
					},
					scopes: {
						activeKey: 'scopeK',
					},
				},
				expectedResult: [null, {n: 1}, {n: 2}, {key: 'k3'}],
			},
		];
		const order = 'asc';

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getAllForActiveScope(getSubState)(test.state, order),
					test.expectedResult
				);
			});
		});
	});

	describe('getByFilterOrder', function () {
		const tests = [
			{
				name: 'empty models',
				state: {
					sub: {
						byKey: {},
						indexes: [
							{filter: 'fil', order: 'desc'},
							{
								filter: {scopeKey: 'scopeK'},
								order: 'asc',
								count: 4,
								index: {1: null, 2: 'k1', 3: 'k2', 4: 'k3'},
							},
						],
					},
				},
				expectedResult: [null, {key: 'k1'}, {key: 'k2'}, {key: 'k3'}],
			},
			{
				name: 'empty indexes',
				state: {
					sub: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
						indexes: [],
					},
				},
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					sub: {
						byKey: {k1: {n: 1}, k2: {n: 2}},
						indexes: [
							{filter: 'fil', order: 'desc'},
							{
								filter: {scopeKey: 'scopeK'},
								order: 'asc',
								count: 4,
								index: {1: null, 2: 'k1', 3: 'k2', 4: 'k3'},
							},
						],
					},
				},
				expectedResult: [null, {n: 1}, {n: 2}, {key: 'k3'}],
			},
		];
		const filter = {scopeKey: 'scopeK'};
		const order = 'asc';

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getByFilterOrder(getSubState)(test.state, filter, order),
					test.expectedResult
				);
			});
		});
	});

	it('getIndexed', function () {
		const state = {
			sub: {
				scopes: {activeKey: 'scopesKey'},
				byKey: {k1: {n: 1}, k2: {n: 2}, k3: {n: 3, removed: true}},
				indexes: [
					{
						filterByActive: {scope: true},
						filter: {scopeKey: 'scopesKey'},
						order: 'asc',
						count: 7,
						index: {
							1: 'first',
							2: 'second',
							3: 'third',
							4: 'fourth',
							5: 'fifth',
							6: 'sixth',
							7: 'seventh',
						},
					},
				],
			},
		};
		const filterByActive = {scope: true};
		const filter = {scopeKey: 'scopesKey'};
		const order = 'asc';
		const start = 3;
		const length = 2;

		const expectedResult = [{key: 'third'}, {key: 'fourth'}];

		assert.deepStrictEqual(
			selectors.getIndexed(getSubState)(
				state,
				filterByActive,
				filter,
				order,
				start,
				length
			),
			expectedResult
		);
	});

	it('getIndexPage', function () {
		const state = {
			sub: {
				indexes: [
					{
						filter: 'fil',
						order: 'asc',
						count: 7,
						index: {
							1: 'first',
							2: 'second',
							3: 'third',
							4: 'fourth',
							5: 'fifth',
							6: 'sixth',
							7: 'seventh',
						},
					},
				],
			},
		};
		const filter = 'fil';
		const order = 'asc';
		const start = 3;
		const length = 2;

		const expectedResult = {3: 'third', 4: 'fourth'};

		assert.deepStrictEqual(
			selectors.getIndexPage(getSubState)(state, filter, order, start, length),
			expectedResult
		);
	});

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

	describe('getKeysToLoad', function () {
		const tests = [
			{
				name: 'no keys',
				keys: [],
				state: {
					sub: {
						byKey: {
							k1: {p: '1'},
							k2: {p: '2'},
							k3: {p: '3', outdated: true},
						},
					},
				},
				expectedResult: null,
			},
			{
				name: 'null keys',
				keys: null,
				state: {
					sub: {
						byKey: {
							k1: {p: '1'},
							k2: {p: '2'},
							k3: {p: '3', outdated: true},
						},
					},
				},
				expectedResult: null,
			},
			{
				name: 'nothing loaded',
				keys: ['k1', 'k2'],
				state: {
					sub: {
						byKey: null,
					},
				},
				expectedResult: ['k1', 'k2'],
			},
			{
				name: 'all loaded',
				keys: ['k1', 'k2'],
				state: {
					sub: {
						byKey: {
							k1: {p: '1'},
							k2: {p: '2'},
							k3: {p: '3', outdated: true},
						},
					},
				},
				expectedResult: null,
			},
			{
				name: 'outdated k3, missing k5',
				keys: ['k1', 'k3', 'k5'],
				state: {
					sub: {
						byKey: {
							k1: {p: '1'},
							k2: {p: '2'},
							k3: {p: '3', outdated: true},
						},
					},
				},
				expectedResult: ['k3', 'k5'],
			},
		];

		tests.forEach(test => {
			assert.deepStrictEqual(
				selectors.getKeysToLoad(getSubState)(test.state, test.keys),
				test.expectedResult
			);
		});
	});

	describe('getStateToSave', function () {
		const tests = [
			{
				name: 'default state',
				getSubState: state => state.sub,
				state: {sub: {}},
				expectedResult: {},
			},
			{
				name: 'active key',
				getSubState: state => state.sub,
				state: {sub: {activeKey: 'actv'}},
				expectedResult: {activeKey: 'actv'},
			},
			{
				name: 'active keys',
				getSubState: state => state.sub,
				state: {sub: {activeKeys: ['k1', 'k2']}},
				expectedResult: {activeKeys: ['k1', 'k2']},
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getStateToSave(test.getSubState)(test.state),
					test.expectedResult
				);
			});
		});
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

	it('getUsedKeys', function () {
		const state = {
			sub: {
				inUse: {
					keys: ['k1', 'k2', 'k3', ['k1', 'k3', 'k4']],
				},
			},
		};
		const expectedResult = ['k1', 'k2', 'k3', 'k4'];

		assert.deepStrictEqual(
			selectors.getUsedKeys(getSubState)(state),
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
