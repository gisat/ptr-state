import {assert} from 'chai';
import reducer from '../../../src/state/Cases/reducers';

describe('state/Cases/reducers', function () {
	describe('add', function () {
		const tests = [
			{
				name: 'no data',
				state: {byKey: null},
				action: {type: 'CASES.ADD'},
				expectedResult: {byKey: {}},
			},
			{
				name: 'empty data',
				state: {byKey: null},
				action: {type: 'CASES.ADD', data: []},
				expectedResult: {byKey: {}},
			},
			{
				name: 'some data',
				state: {byKey: null},
				action: {
					type: 'CASES.ADD',
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
				state: {byKey: null},
				action: {type: 'CASES.ADD_UNRECEIVED'},
				expectedResult: {byKey: {}},
			},
			{
				name: 'empty keys',
				state: {byKey: null},
				action: {type: 'CASES.ADD_UNRECEIVED', keys: []},
				expectedResult: {byKey: {}},
			},
			{
				name: 'some keys',
				state: {byKey: null},
				action: {type: 'CASES.ADD_UNRECEIVED', keys: ['k1', 'k2']},
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

	describe('remove', function () {
		const tests = [
			{
				name: 'some',
				state: {byKey: {k1: 1, k2: 2, k3: 3}},
				action: {
					type: 'CASES.DELETE',
					keys: ['k1', 'k2'],
				},
				expectedResult: {
					byKey: {k3: 3},
				},
			},
			{
				name: 'all',
				state: {byKey: {k1: 1, k2: 2, k3: 3}},
				action: {
					type: 'CASES.DELETE',
					keys: ['k1', 'k2', 'k3'],
				},
				expectedResult: {
					byKey: {},
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

	describe('removeEdited', function () {
		const tests = [
			{
				name: 'some',
				state: {editedByKey: {k1: 1, k2: 2, k3: 3}},
				action: {
					type: 'CASES.EDITED.REMOVE',
					keys: ['k1', 'k2'],
				},
				expectedResult: {
					editedByKey: {k3: 3},
				},
			},
			{
				name: 'all',
				state: {editedByKey: {k1: 1, k2: 2, k3: 3}},
				action: {
					type: 'CASES.EDITED.REMOVE',
					keys: ['k1', 'k2', 'k3'],
				},
				expectedResult: {
					editedByKey: {},
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

	describe('removeEditedProperty', function () {
		const tests = [
			{
				name: 'empty data',
				state: {
					editedByKey: {
						k1: {data: {p: 1, p2: 12}},
						k2: {data: null},
					},
				},
				action: {
					type: 'CASES.EDITED.REMOVE_PROPERTY',
					key: 'k2',
					property: 'p',
				},
				expectedResult: {
					editedByKey: {
						k1: {data: {p: 1, p2: 12}},
						k2: {data: null},
					},
				},
			},
			{
				name: 'non existing property',
				state: {
					editedByKey: {
						k1: {data: {p: 1, p2: 12}},
						k2: {data: {p: 2, p2: 22}},
					},
				},
				action: {
					type: 'CASES.EDITED.REMOVE_PROPERTY',
					key: 'k2',
					property: 'p3',
				},
				expectedResult: {
					editedByKey: {
						k1: {data: {p: 1, p2: 12}},
						k2: {data: {p: 2, p2: 22}},
					},
				},
			},
			{
				name: 'matched property',
				state: {
					editedByKey: {
						k1: {data: {p: 1, p2: 12}},
						k2: {data: {p: 2, p2: 22}},
					},
				},
				action: {
					type: 'CASES.EDITED.REMOVE_PROPERTY',
					key: 'k2',
					property: 'p',
				},
				expectedResult: {
					editedByKey: {
						k1: {data: {p: 1, p2: 12}},
						k2: {data: {p2: 22}},
					},
				},
			},
			{
				name: 'matched last property',
				state: {
					editedByKey: {
						k1: {data: {p: 1, p2: 12}},
						k2: {data: {p: 2}},
					},
				},
				action: {
					type: 'CASES.EDITED.REMOVE_PROPERTY',
					key: 'k2',
					property: 'p',
				},
				expectedResult: {
					editedByKey: {
						k1: {data: {p: 1, p2: 12}},
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

	describe('updateEdited', function () {
		const tests = [
			{
				name: 'empty data',
				state: {
					editedByKey: {
						k1: {data: {p: 1, ep: 2}},
						k2: {data: {p: 2}},
					},
				},
				action: {
					type: 'CASES.EDITED.UPDATE',
					data: [],
				},
				expectedResult: {
					editedByKey: {
						k1: {data: {p: 1, ep: 2}},
						k2: {data: {p: 2}},
					},
				},
			},
			{
				name: 'some data',
				state: {
					editedByKey: {
						k1: {data: {p: 1, ep: 2}},
						k2: {data: {p: 2}},
					},
				},
				action: {
					type: 'CASES.EDITED.UPDATE',
					data: [
						{key: 'k1', data: {p: 11}},
						{key: 'k3', data: {p: 33}},
					],
				},
				expectedResult: {
					editedByKey: {
						k1: {data: {p: 11, ep: 2}},
						k2: {data: {p: 2}},
						k3: {key: 'k3', data: {p: 33}},
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
					type: 'CASES.INDEX.ADD',
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
					type: 'CASES.INDEX.ADD',
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

	describe('clearIndexes', function () {
		const tests = [
			{
				name: 'empty',
				state: {
					indexes: [],
				},
				action: {type: 'CASES.INDEX.CLEAR_ALL'},
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
				action: {type: 'CASES.INDEX.CLEAR_ALL'},
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
			it(test.name, function () {
				assert.deepStrictEqual(
					reducer(test.state, test.action),
					test.expectedResult
				);
			});
		});
	});

	describe('clearIndex', function () {
		const tests = [
			{
				name: 'without match',
				state: {
					indexes: [
						{
							filter: 'fil',
							order: 'asc',
							count: 5,
							index: ['v1', 'v2'],
							changedOn: 'changed on',
						},
						{
							filter: 'fil',
							order: 'desc',
							count: 7,
							index: ['v2.1', 'v2.2'],
							changedOn: 'changed on2',
						},
					],
				},
				action: {
					type: 'CASES.INDEX.CLEAR_INDEX',
					filter: 'fil2',
					order: 'asc',
				},
				expectedResult: {
					indexes: [
						{
							filter: 'fil',
							order: 'asc',
							count: 5,
							index: ['v1', 'v2'],
							changedOn: 'changed on',
						},
						{
							filter: 'fil',
							order: 'desc',
							count: 7,
							index: ['v2.1', 'v2.2'],
							changedOn: 'changed on2',
						},
					],
				},
			},
			{
				name: 'with match',
				state: {
					indexes: [
						{
							filter: 'fil',
							order: 'asc',
							count: 5,
							index: ['v1', 'v2'],
							changedOn: 'changed on',
						},
						{
							filter: 'fil',
							order: 'desc',
							count: 7,
							index: ['v2.1', 'v2.2'],
							changedOn: 'changed on2',
						},
					],
				},
				action: {
					type: 'CASES.INDEX.CLEAR_INDEX',
					filter: 'fil',
					order: 'asc',
				},
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
						{
							filter: 'fil',
							order: 'desc',
							count: 7,
							index: ['v2.1', 'v2.2'],
							changedOn: 'changed on2',
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

	describe('markDeleted', function () {
		const tests = [
			{
				name: 'non matching key',
				state: {
					byKey: {nk: {v: 1}, nk2: {v: 2}},
				},
				action: {
					type: 'CASES.MARK_DELETED',
					key: 'sk',
				},
				expectedResult: {
					byKey: {nk: {v: 1}, nk2: {v: 2}},
				},
			},
			{
				name: 'matching key',
				state: {
					byKey: {sk: {v: 0}, nk: {v: 1}, nk2: {v: 2}},
				},
				action: {
					type: 'CASES.MARK_DELETED',
					key: 'sk',
				},
				expectedResult: {
					byKey: {sk: {v: 0, removed: true}, nk: {v: 1}, nk2: {v: 2}},
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
					type: 'CASES.SET_ACTIVE_KEY',
					key: 'ak',
				},
				expectedResult: {
					activeKey: 'ak',
					activeKeys: null,
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

	describe('setActiveMultiple', function () {
		const tests = [
			{
				name: 'setActiveMultiple',
				state: {
					activeKey: 'k1',
					activeKeys: ['ks1', 'ks2'],
				},
				action: {
					type: 'CASES.SET_ACTIVE_KEYS',
					keys: ['aks1', 'aks2'],
				},
				expectedResult: {
					activeKey: null,
					activeKeys: ['aks1', 'aks2'],
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

	describe('useIndexedClear', function () {
		const tests = [
			{
				name: 'no index',
				state: {
					inUse: {indexes: {some: 'some', some3: 'some3'}},
				},
				action: {
					type: 'CASES.USE.INDEXED.CLEAR',
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
					type: 'CASES.USE.INDEXED.CLEAR',
					componentId: 'some3',
				},
				expectedResult: {
					inUse: {indexes: {some: 'some'}},
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
					type: 'CASES.USE.INDEXED.REGISTER',
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
					type: 'CASES.USE.INDEXED.REGISTER',
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

	describe('useKeysRegister', function () {
		const tests = [
			{
				name: 'no initial keys',
				state: {
					inUse: {},
				},
				action: {
					type: 'CASES.USE.KEYS.REGISTER',
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
					type: 'CASES.USE.KEYS.REGISTER',
					componentId: 'comp',
					keys: ['k1', 'k2'],
				},
				expectedResult: {
					inUse: {keys: {comp: ['k1', 'k3', 'k2']}},
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

	describe('useKeysClear', function () {
		const tests = [
			{
				name: 'non existing',
				state: {
					inUse: {keys: {comp: ['k1', 'k3', 'k2']}},
				},
				action: {
					type: 'CASES.USE.KEYS.CLEAR',
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
					type: 'CASES.USE.KEYS.CLEAR',
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
					type: 'CASES.USE.KEYS.CLEAR',
					componentId: 'comp',
				},
				expectedResult: {
					inUse: {keys: null},
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
			it(test.name, function () {
				assert.deepStrictEqual(
					reducer(test.state, test.action),
					test.expectedResult
				);
			});
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
			it(test.name, function () {
				assert.deepStrictEqual(
					reducer(test.state, test.action),
					test.expectedResult
				);
			});
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
