import {assert} from 'chai';
import reducer from '../../../../src/state/Areas/AreaTrees/reducers';

describe('state/Areas/AreaTrees/reducers', function () {
	describe('add', function () {
		const tests = [
			{
				name: 'no data',
				state: {byKey: null},
				action: {type: 'AREAS.AREA_TREES.ADD'},
				expectedResult: {byKey: {}},
			},
			{
				name: 'empty data',
				state: {byKey: null},
				action: {type: 'AREAS.AREA_TREES.ADD', data: []},
				expectedResult: {byKey: {}},
			},
			{
				name: 'some data',
				state: {byKey: null},
				action: {
					type: 'AREAS.AREA_TREES.ADD',
					data: [
						{
							key: 'k1',
							name: 'first',
						},
						{
							key: 'k2',
							name: 'second',
							outdated: true,
							unreceived: true,
						},
					],
				},
				expectedResult: {
					byKey: {
						k1: {key: 'k1', name: 'first'},
						k2: {key: 'k2', name: 'second'},
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

	describe('addUnreceivedKeys', function () {
		const tests = [
			{
				name: 'no keys',
				state: {
					byKey: null,
				},
				action: {type: 'AREAS.AREA_TREES.ADD_UNRECEIVED'},
				expectedResult: {byKey: {}},
			},
			{
				name: 'empty keys',
				state: {byKey: null},
				action: {
					type: 'AREAS.AREA_TREES.ADD_UNRECEIVED',
					keys: [],
				},
				expectedResult: {byKey: {}},
			},
			{
				name: 'some keys',
				state: {byKey: null},
				action: {
					type: 'AREAS.AREA_TREES.ADD_UNRECEIVED',
					keys: ['k1', 'k2'],
				},
				expectedResult: {
					byKey: {
						k1: {key: 'k1', unreceived: true},
						k2: {key: 'k2', unreceived: true},
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

	describe('addIndex', function () {
		const tests = [
			{
				name: 'empty data',
				state: {indexes: [{filter: 'fil', order: 'asc', index: 'idx'}]},
				action: {
					type: 'AREAS.AREA_TREES.INDEX.ADD',
					filter: 'fil',
					order: 'asc',
					changedOn: 'some time',
					count: 2,
					data: [],
				},
				expectedResult: {
					indexes: [
						{
							changedOn: 'some time',
							count: 2,
							filter: 'fil',
							index: 'idx',
							order: 'asc',
						},
					],
				},
			},
			{
				name: 'new data',
				state: {
					indexes: [
						{
							filter: 'fil',
							order: 'asc',
							index: [{key: 'k'}, {key: 'k.1'}, {key: 'k.2'}],
						},
					],
				},
				action: {
					type: 'AREAS.AREA_TREES.INDEX.ADD',
					filter: 'fil',
					order: 'asc',
					changedOn: 'some time',
					count: 2,
					start: 1,
					data: [{key: 'k2'}, {key: 'k3'}],
				},
				expectedResult: {
					indexes: [
						{
							changedOn: 'some time',
							count: 2,
							filter: 'fil',
							index: {0: {key: 'k'}, 1: 'k2', 2: 'k3'},
							order: 'asc',
						},
					],
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

	describe('setActive', function () {
		const tests = [
			{
				name: 'test',
				state: {
					activeKey: 'k1',
					activeKeys: ['ks1', 'ks2'],
				},
				action: {
					type: 'AREAS.AREA_TREES.SET_ACTIVE_KEY',
					key: 'ak',
				},
				expectedResult: {
					activeKey: 'ak',
					activeKeys: null,
				},
			},
		];
		tests.forEach((test) => {
			assert.deepStrictEqual(
				reducer(test.state, test.action),
				test.expectedResult
			);
		});
	});

	describe('registerUseIndexed', function () {
		const tests = [
			{
				name: 'existing',
				state: {
					inUse: {
						indexes: {
							compId: [
								{
									filterByActive: 'fba',
									filter: 'f',
									order: 'asc',
									start: 4,
									length: 2,
								},
							],
						},
					},
				},
				action: {
					type: 'AREAS.AREA_TREES.USE.INDEXED.REGISTER',
					componentId: 'compId',
					filterByActive: 'fba',
					filter: 'f',
					order: 'asc',
					start: 4,
					length: 2,
				},
				expectedResult: {
					inUse: {
						indexes: {
							compId: [
								{
									filterByActive: 'fba',
									filter: 'f',
									order: 'asc',
									start: 4,
									length: 2,
								},
							],
						},
					},
				},
			},
			{
				name: 'non existing',
				state: {
					inUse: {
						indexes: {
							compId: [
								{
									filterByActive: 'fba',
									filter: 'f',
									order: 'asc',
									start: 4,
									length: 2,
								},
							],
						},
					},
				},
				action: {
					type: 'AREAS.AREA_TREES.USE.INDEXED.REGISTER',
					componentId: 'compId',
					filterByActive: '_fba',
					filter: 'f',
					order: 'asc',
					start: 4,
					length: 2,
				},
				expectedResult: {
					inUse: {
						indexes: {
							compId: [
								{
									filterByActive: 'fba',
									filter: 'f',
									order: 'asc',
									start: 4,
									length: 2,
								},
								{
									filterByActive: '_fba',
									filter: 'f',
									order: 'asc',
									start: 4,
									length: 2,
								},
							],
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

	describe('useIndexedClear', function () {
		const tests = [
			{
				name: 'no index',
				state: {
					inUse: {indexes: {some: 'some', some3: 'some3'}},
				},
				action: {
					type: 'AREAS.AREA_TREES.USE.INDEXED.CLEAR',
					componentId: 'some2',
				},
				expectedResult: {
					inUse: {indexes: {some: 'some', some3: 'some3'}},
				},
			},
			{
				name: 'matched index',
				state: {
					inUse: {indexes: {some: 'some', some3: 'some3'}},
				},
				action: {
					type: 'AREAS.AREA_TREES.USE.INDEXED.CLEAR',
					componentId: 'some3',
				},
				expectedResult: {
					inUse: {indexes: {some: 'some'}},
				},
			},
		];

		tests.forEach((test) => {
			assert.deepStrictEqual(
				reducer(test.state, test.action),
				test.expectedResult
			);
		});
	});

	describe('useKeysRegister', function () {
		const tests = [
			{
				name: 'no initial keys',
				state: {
					inUse: {},
				},
				action: {
					type: 'AREAS.AREA_TREES.USE.KEYS.REGISTER',
					componentId: 'comp',
					keys: ['k1', 'k2'],
				},
				expectedResult: {
					inUse: {keys: {comp: ['k1', 'k2']}},
				},
			},
			{
				name: 'with initial keys',
				state: {
					inUse: {
						keys: {comp: ['k1', 'k3']},
					},
				},
				action: {
					type: 'AREAS.AREA_TREES.USE.KEYS.REGISTER',
					componentId: 'comp',
					keys: ['k1', 'k2'],
				},
				expectedResult: {
					inUse: {keys: {comp: ['k1', 'k3', 'k2']}},
				},
			},
		];

		tests.forEach((test) => {
			assert.deepStrictEqual(
				reducer(test.state, test.action),
				test.expectedResult
			);
		});
	});

	describe('useKeysClear', function () {
		const tests = [
			{
				name: 'non existing',
				state: {
					inUse: {keys: {comp: ['k1', 'k3', 'k2']}},
				},
				action: {
					type: 'AREAS.AREA_TREES.USE.KEYS.CLEAR',
					componentId: 'comp2',
				},
				expectedResult: {
					inUse: {keys: {comp: ['k1', 'k3', 'k2']}},
				},
			},
			{
				name: 'single',
				state: {
					inUse: {keys: {comp: ['k1', 'k3', 'k2'], comp2: ['kc']}},
				},
				action: {
					type: 'AREAS.AREA_TREES.USE.KEYS.CLEAR',
					componentId: 'comp',
				},
				expectedResult: {
					inUse: {keys: {comp2: ['kc']}},
				},
			},
			{
				name: 'last',
				state: {
					inUse: {keys: {comp: ['k1', 'k3', 'k2']}},
				},
				action: {
					type: 'AREAS.AREA_TREES.USE.KEYS.CLEAR',
					componentId: 'comp',
				},
				expectedResult: {
					inUse: {keys: null},
				},
			},
		];
		tests.forEach((test) => {
			assert.deepStrictEqual(
				reducer(test.state, test.action),
				test.expectedResult
			);
		});
	});

	describe('clearIndexes', function () {
		const tests = [
			{
				name: 'empty',
				state: {
					indexes: [],
				},
				action: {type: 'AREAS.AREA_TREES.INDEX.CLEAR_ALL'},
				expectedResult: {
					indexes: null,
				},
			},
			{
				name: 'non empty',
				state: {
					indexes: [
						{
							filter: 'fil',
							order: 'asc',
							count: 5,
							index: ['v1', 'v2'],
							changedOn: 'changed on',
						},
					],
				},
				action: {type: 'AREAS.AREA_TREES.INDEX.CLEAR_ALL'},
				expectedResult: {
					indexes: [
						{
							filter: 'fil',
							order: 'asc',
							count: null,
							index: null,
							changedOn: null,
							outdated: ['v1', 'v2'],
							outdatedCount: 5,
						},
					],
				},
			},
		];

		tests.forEach((test) => {
			assert.deepStrictEqual(
				reducer(test.state, test.action),
				test.expectedResult
			);
		});
	});

	describe('dataSetOutdated', function () {
		const tests = [
			{
				name: 'empty',
				state: {byKey: {}},
				action: {type: 'COMMON.DATA.SET_OUTDATED'},
				expectedResult: {byKey: {}},
			},
			{
				name: 'non empty',
				state: {
					byKey: {
						k1: {data: {p: 1}},
						k2: {data: {p: 2}},
					},
				},
				action: {type: 'COMMON.DATA.SET_OUTDATED'},
				expectedResult: {
					byKey: {
						k1: {data: {p: 1}, outdated: true},
						k2: {data: {p: 2}, outdated: true},
					},
				},
			},
		];

		tests.forEach((test) => {
			assert.deepStrictEqual(
				reducer(test.state, test.action),
				test.expectedResult
			);
		});
	});

	describe('cleanupOnLogout', function () {
		const tests = [
			{
				name: 'test',
				state: {
					byKey: {
						k1: {data: {p: 1}, permissions: {guest: {get: true}}},
						k2: {data: {p: 2}},
						k3: {data: {p: 3}, permissions: {guest: {get: true}}},
					},
				},
				action: {type: 'COMMON.DATA.CLEANUP_ON_LOGOUT'},
				expectedResult: {
					byKey: {
						k1: {data: {p: 1}, permissions: {guest: {get: true}}},
						k3: {data: {p: 3}, permissions: {guest: {get: true}}},
					},
				},
			},
		];

		tests.forEach((test) => {
			assert.deepStrictEqual(
				reducer(test.state, test.action),
				test.expectedResult
			);
		});
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
