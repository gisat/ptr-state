import {assert} from 'chai';
import reducers, {
	DEFAULT_INITIAL_STATE,
} from '../../../src/state/_common/reducers';

describe('state/_common/reducers', function () {
	describe('add', function () {
		const tests = [
			{
				name: 'no data',
				state: {byKey: null},
				action: {},
				expectedResult: {byKey: {}},
			},
			{
				name: 'empty data',
				state: {byKey: null},
				action: {data: []},
				expectedResult: {byKey: {}},
			},
			{
				name: 'some data',
				state: {byKey: null},
				action: {
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
					reducers.add(test.state, test.action),
					test.expectedResult
				);
			});
		});
	});

	describe('addBatch', function () {
		const tests = [
			{
				name: 'no data',
				state: {byKey: null},
				action: {},
				expectedResult: {byKey: {}},
			},
			{
				name: 'empty data',
				state: {byKey: null},
				action: {data: []},
				expectedResult: {byKey: {}},
			},
			{
				name: 'some data',
				state: {byKey: null},
				action: {
					key: 'someKey',
					data: [
						{
							key: 'k1',
							someKey: 'sk1',
							name: 'first',
						},
						{
							key: 'k2',
							someKey: 'sk2',
							name: 'second',
							outdated: true,
							unreceived: true,
						},
					],
				},
				expectedResult: {
					byKey: {
						sk1: {key: 'k1', someKey: 'sk1', name: 'first'},
						sk2: {key: 'k2', someKey: 'sk2', name: 'second'},
					},
				},
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					reducers.addBatch(test.state, test.action),
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
				action: {},
				expectedResult: {byKey: {}},
			},
			{
				name: 'empty keys',
				state: {byKey: null},
				action: {keys: []},
				expectedResult: {byKey: {}},
			},
			{
				name: 'some keys',
				state: {byKey: null},
				action: {keys: ['k1', 'k2']},
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
					reducers.addUnreceivedKeys(test.state, test.action),
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
					reducers.addIndex(test.state, test.action),
					test.expectedResult
				);
			});
		});
	});

	describe('addBatchIndex', function () {
		const tests = [
			{
				name: 'empty data',
				state: {indexes: [{filter: 'fil', order: 'asc', index: 'idx'}]},
				action: {
					filter: 'fil',
					order: 'asc',
					key: 'someKey',
					data: [],
				},
				expectedResult: {
					indexes: [
						{
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
							index: [
								{someKey: 'k'},
								{someKey: 'k.1'},
								{someKey: 'k.2'},
							],
						},
					],
				},
				action: {
					filter: 'fil',
					order: 'asc',
					key: 'someKey',
					data: [{someKey: 'k2'}, {someKey: 'k3'}],
				},
				expectedResult: {
					indexes: [
						{
							filter: 'fil',
							index: {0: 'k2', 1: 'k3', 2: {someKey: 'k.2'}},
							order: 'asc',
						},
					],
				},
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					reducers.addBatchIndex(test.state, test.action),
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
					reducers.registerUseIndexed(test.state, test.action),
					test.expectedResult
				);
			});
		});
	});

	describe('registerBatchUseIndexed', function () {
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
								},
							],
						},
					},
				},
				action: {
					componentId: 'compId',
					filterByActive: 'fba',
					filter: 'f',
					order: 'asc',
				},
				expectedResult: {
					inUse: {
						indexes: {
							compId: [
								{
									filterByActive: 'fba',
									filter: 'f',
									order: 'asc',
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
								},
							],
						},
					},
				},
				action: {
					componentId: 'compId',
					filterByActive: '_fba',
					filter: 'f',
					order: 'asc',
				},
				expectedResult: {
					inUse: {
						indexes: {
							compId: [
								{
									filterByActive: 'fba',
									filter: 'f',
									order: 'asc',
								},
								{
									filterByActive: '_fba',
									filter: 'f',
									order: 'asc',
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
					reducers.registerBatchUseIndexed(test.state, test.action),
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
					reducers.useIndexedClear(test.state, test.action),
					test.expectedResult
				);
			});
		});
	});

	it('useIndexedClearAll', function () {
		const tests = [
			{
				name: 'clear all',
				state: {
					inUse: {indexes: {some: 'some', some3: 'some3'}},
				},
				action: {},
				expectedResult: {
					inUse: {indexes: null},
				},
			},
		];
		tests.forEach((test) => {
			assert.deepStrictEqual(
				reducers.useIndexedClearAll(test.state, test.action),
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
					reducers.useKeysRegister(test.state, test.action),
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
					reducers.useKeysClear(test.state, test.action),
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
					reducers.markDeleted(test.state, test.action),
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
					keys: ['k1', 'k2', 'k3'],
				},
				expectedResult: {
					byKey: {},
				},
			},
		];

		tests.forEach((test) => {
			assert.deepStrictEqual(
				reducers.remove(test.state, test.action),
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
					reducers.removeEdited(test.state, test.action),
					test.expectedResult
				);
			});
		});
	});

	describe('removeEditedActive', function () {
		const tests = [
			{
				name: 'some',
				state: {
					activeKey: 'k1',
					editedByKey: {k1: 1, k2: 2, k3: 3},
				},
				action: {},
				expectedResult: {
					activeKey: 'k1',
					editedByKey: {k2: 2, k3: 3},
				},
			},
			{
				name: 'all',
				state: {
					activeKey: 'k1',
					editedByKey: {k1: 1},
				},
				action: {},
				expectedResult: {
					activeKey: 'k1',
					editedByKey: {},
				},
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					reducers.removeEditedActive(test.state, test.action),
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
					reducers.removeEditedProperty(test.state, test.action),
					test.expectedResult
				);
			});
		});
	});

	describe('removeEditedPropertyValues', function () {
		const tests = [
			{
				name: 'updated',
				state: {
					editedByKey: {
						k1: {
							data: {
								name: 'key prop in keys',
								actionKey: 'ak1',
							},
						},
						k2: {
							data: {
								name: 'key prop not in keys',
								actionKey: 'nak2',
							},
						},
						k3: {
							data: {
								name: 'multi key prop in keys',
								actionKeys: ['ak3.1', 'ak3.2'],
							},
						},
						k4: {
							data: {
								name: 'multi key prop not in keys',
								actionKeys: ['ak4.1', 'ak4.2'],
							},
						},
					},
				},
				action: {
					dataType: 'actions',
					keys: ['ak1', 'ak3.2'],
				},
				expectedResult: {
					editedByKey: {
						k1: {
							data: {
								name: 'key prop in keys',
								actionKey: null,
							},
						},
						k2: {
							data: {
								name: 'key prop not in keys',
								actionKey: 'nak2',
							},
						},
						k3: {
							data: {
								name: 'multi key prop in keys',
								actionKeys: ['ak3.1'],
							},
						},
						k4: {
							data: {
								name: 'multi key prop not in keys',
								actionKeys: ['ak4.1', 'ak4.2'],
							},
						},
					},
				},
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					reducers.removeEditedPropertyValues(
						test.state,
						test.action
					),
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
					reducers.setActive(test.state, test.action),
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
				reducers.setActiveMultiple(test.state, test.action),
				test.expectedResult
			);
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
					reducers.updateEdited(test.state, test.action),
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
				action: {},
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
				action: {},
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
					reducers.clearIndexes(test.state, test.action),
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
					reducers.clearIndex(test.state, test.action),
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
				action: {},
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
				action: {},
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
					reducers.dataSetOutdated(test.state, test.action),
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
				action: {},
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
					reducers.cleanupOnLogout(test.state, test.action),
					test.expectedResult
				);
			});
		});
	});
});
