import {assert} from 'chai';
import reducer from '../../../../src/state/SpatialDataSources/vector/reducers';

describe('state/SpatialDataSources/vector/reducers', function () {
	describe('add', function () {
		const tests = [
			{
				name: 'no data',
				state: {byKey: null},
				action: {type: 'SPATIAL_DATA_SOURCES.VECTOR.ADD'},
				expectedResult: {byKey: {}},
			},
			{
				name: 'empty data',
				state: {byKey: null},
				action: {type: 'SPATIAL_DATA_SOURCES.VECTOR.ADD', data: []},
				expectedResult: {byKey: {}},
			},
			{
				name: 'some data',
				state: {byKey: null},
				action: {
					type: 'SPATIAL_DATA_SOURCES.VECTOR.ADD',
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

	describe('addBatch', function () {
		const tests = [
			{
				name: 'no data',
				state: {byKey: null},
				action: {type: 'SPATIAL_DATA_SOURCES.VECTOR.ADD_BATCH'},
				expectedResult: {byKey: {}},
			},
			{
				name: 'empty data',
				state: {byKey: null},
				action: {
					type: 'SPATIAL_DATA_SOURCES.VECTOR.ADD_BATCH',
					data: [],
				},
				expectedResult: {byKey: {}},
			},
			{
				name: 'some data',
				state: {byKey: null},
				action: {
					type: 'SPATIAL_DATA_SOURCES.VECTOR.ADD_BATCH',
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
				action: {type: 'SPATIAL_DATA_SOURCES.VECTOR.ADD_UNRECEIVED'},
				expectedResult: {byKey: {}},
			},
			{
				name: 'empty keys',
				state: {byKey: null},
				action: {
					type: 'SPATIAL_DATA_SOURCES.VECTOR.ADD_UNRECEIVED',
					keys: [],
				},
				expectedResult: {byKey: {}},
			},
			{
				name: 'some keys',
				state: {byKey: null},
				action: {
					type: 'SPATIAL_DATA_SOURCES.VECTOR.ADD_UNRECEIVED',
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
					type: 'SPATIAL_DATA_SOURCES.VECTOR.INDEX.ADD',
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
					type: 'SPATIAL_DATA_SOURCES.VECTOR.INDEX.ADD',
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

	describe('addBatchIndex', function () {
		const tests = [
			{
				name: 'empty data',
				state: {indexes: [{filter: 'fil', order: 'asc', index: 'idx'}]},
				action: {
					type: 'SPATIAL_DATA_SOURCES.VECTOR.INDEX.ADD_BATCH',
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
					type: 'SPATIAL_DATA_SOURCES.VECTOR.INDEX.ADD_BATCH',
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
				action: {type: 'SPATIAL_DATA_SOURCES.VECTOR.INDEX.CLEAR_ALL'},
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
				action: {type: 'SPATIAL_DATA_SOURCES.VECTOR.INDEX.CLEAR_ALL'},
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
					type: 'SPATIAL_DATA_SOURCES.VECTOR.INDEX.CLEAR_INDEX',
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
					type: 'SPATIAL_DATA_SOURCES.VECTOR.INDEX.CLEAR_INDEX',
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

	describe('useKeysRegister', function () {
		const tests = [
			{
				name: 'no initial keys',
				state: {
					inUse: {},
				},
				action: {
					type: 'SPATIAL_DATA_SOURCES.VECTOR.USE.KEYS.REGISTER',
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
					type: 'SPATIAL_DATA_SOURCES.VECTOR.USE.KEYS.REGISTER',
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
					type: 'SPATIAL_DATA_SOURCES.VECTOR.USE.KEYS.CLEAR',
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
					type: 'SPATIAL_DATA_SOURCES.VECTOR.USE.KEYS.CLEAR',
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
					type: 'SPATIAL_DATA_SOURCES.VECTOR.USE.KEYS.CLEAR',
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
					type: 'SPATIAL_DATA_SOURCES.VECTOR.USE.INDEXED.REGISTER',
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
					type: 'SPATIAL_DATA_SOURCES.VECTOR.USE.INDEXED.REGISTER',
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
					type:
						'SPATIAL_DATA_SOURCES.VECTOR.USE.INDEXED_BATCH.REGISTER',
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
					type:
						'SPATIAL_DATA_SOURCES.VECTOR.USE.INDEXED_BATCH.REGISTER',
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
					type: 'SPATIAL_DATA_SOURCES.VECTOR.USE.INDEXED.CLEAR',
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
					type: 'SPATIAL_DATA_SOURCES.VECTOR.USE.INDEXED.CLEAR',
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

	it('receive', function () {
		assert.deepStrictEqual(
			reducer(
				{
					featuresBySourceKey: {
						ds1: [{key: 'f2', k: 'v'}],
					},
				},
				{
					type: 'SPATIAL_DATA_SOURCES_VECTOR_FEATURES_RECEIVE',
					dataSourceKey: 'ds1',
					data: [{key: 'f1'}, {key: 'f2'}],
				}
			),
			{
				featuresBySourceKey: {
					ds1: [
						{
							key: 'f1',
						},
						{
							key: 'f2',
						},
					],
				},
				loading: false,
			}
		);
	});

	it('select', function () {
		const tests = [
			{
				name: 'replace',
				state: {
					selectedFeaturesKeysBySourceKey: {
						ds1: {
							selectedKeys: ['f3'],
						},
					},
				},
				action: {
					type: 'SPATIAL_DATA_SOURCES_VECTOR_FEATURES_SELECT',
					dataSourceKey: 'ds1',
					featureKeys: ['f1', 'f2'],
					selectionMode: 'replace',
				},
				expectedResult: {
					selectedFeaturesKeysBySourceKey: {
						ds1: {
							selectedKeys: ['f1', 'f2'],
						},
					},
				},
			},
			{
				name: 'add',
				state: {
					selectedFeaturesKeysBySourceKey: {
						ds1: {
							selectedKeys: ['f3'],
						},
					},
				},
				action: {
					type: 'SPATIAL_DATA_SOURCES_VECTOR_FEATURES_SELECT',
					dataSourceKey: 'ds1',
					featureKeys: ['f1', 'f2'],
					selectionMode: 'add',
				},
				expectedResult: {
					selectedFeaturesKeysBySourceKey: {
						ds1: {
							selectedKeys: ['f1', 'f2', 'f3'],
						},
					},
				},
			},
			{
				name: 'remove',
				state: {
					selectedFeaturesKeysBySourceKey: {
						ds1: {
							selectedKeys: ['f3', 'f1'],
						},
					},
				},
				action: {
					type: 'SPATIAL_DATA_SOURCES_VECTOR_FEATURES_SELECT',
					dataSourceKey: 'ds1',
					featureKeys: ['f1'],
					selectionMode: 'remove',
				},
				expectedResult: {
					selectedFeaturesKeysBySourceKey: {
						ds1: {
							selectedKeys: ['f3'],
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

	it('addEdited', function () {
		assert.deepStrictEqual(
			reducer(
				{
					editedFeaturesBySourceKey: {
						ds1: [{key: 'f1', op: 'ov'}],
					},
				},
				{
					type: 'SPATIAL_DATA_SOURCES_VECTOR_FEATURES_EDITED_ADD',
					dataSourceKey: 'ds1',
					features: [{key: 'f1', p: 'v'}, {key: 'f2'}],
				}
			),
			{
				editedFeaturesBySourceKey: {
					ds1: [{key: 'f1', p: 'v'}, {key: 'f2'}],
				},
			}
		);
	});
});
