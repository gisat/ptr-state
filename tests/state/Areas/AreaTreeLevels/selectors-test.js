import {assert} from 'chai';
import selectors from '../../../../src/state/Areas/AreaTreeLevels/selectors';

describe('state/Areas/AreaTreeLevels/selectors', function () {
	describe('getAll', function () {
		const tests = [
			{
				name: 'null',
				state: {
					areas: {
						areaTreeLevels: {
							byKey: null,
						},
					},
				},
				expectedResult: [],
			},
			{
				name: 'empty',
				state: {
					areas: {
						areaTreeLevels: {
							byKey: {},
						},
					},
				},
				expectedResult: [],
			},
			{
				name: 'some',
				state: {
					areas: {
						areaTreeLevels: {
							byKey: {
								k1: {n: 1},
								k2: {n: 2},
								k3: {n: 3, removed: true},
							},
						},
					},
				},
				expectedResult: [{n: 1}, {n: 2}],
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getAll(test.state),
					test.expectedResult
				);
			});
		});
	});

	describe('getAllAsObject', function () {
		const tests = [
			{
				name: 'null',
				state: {
					areas: {
						areaTreeLevels: {
							byKey: {},
						},
					},
				},
				expectedResult: {},
			},
			{
				name: 'empty',
				state: {
					areas: {
						areaTreeLevels: {
							byKey: {},
						},
					},
				},
				expectedResult: {},
			},
			{
				name: 'some',
				state: {
					areas: {
						areaTreeLevels: {
							byKey: {
								k1: {n: 1},
								k2: {n: 2},
								k3: {n: 3, removed: true},
							},
						},
					},
				},
				expectedResult: {
					k1: {n: 1},
					k2: {n: 2},
				},
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getAllAsObject(test.state),
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
					areas: {
						areaTreeLevels: {},
					},
					scopes: {
						activeKey: 'scopeK',
					},
				},
				expectedResult: null,
			},
			{
				name: 'empty indexes',
				state: {
					areas: {
						areaTreeLevels: {
							byKey: {k1: {n: 1}, k2: {n: 2}},
							indexes: [],
						},
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
					areas: {
						areaTreeLevels: {
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
					scopes: {},
				},
				expectedResult: null,
			},
			{
				name: 'some',
				state: {
					areas: {
						areaTreeLevels: {
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
					selectors.getAllForActiveScope(test.state, order),
					test.expectedResult
				);
			});
		});
	});

	it('getActiveKey', function () {
		const state = {
			areas: {
				areaTreeLevels: {activeKey: 'k'},
			},
		};

		assert.strictEqual(selectors.getActiveKey(state), 'k');
	});

	describe('getActive', function () {
		const createState = activeKey => ({
			areas: {
				areaTreeLevels: {
					byKey: {
						k1: {n: 1},
						k2: {n: 2},
						k3: {n: 3, removed: true},
					},
					activeKey,
				},
			},
		});

		it('select active', function () {
			assert.deepStrictEqual(selectors.getActive(createState('k1')), {
				n: 1,
			});
		});

		it('select inactive', function () {
			assert.isNull(selectors.getActive(createState('k3')));
		});
	});

	it('getSubstate', function () {
		assert.strictEqual(
			selectors.getSubstate({
				areas: {
					areaTreeLevels: 'subst',
				},
			}),
			'subst'
		);
	});
});
