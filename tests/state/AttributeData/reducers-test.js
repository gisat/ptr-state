import {assert} from 'chai';
import reducer from '../../../src/state/AttributeData/reducers';

describe('state/AttributeData/reducers', function () {
	describe('addUnreceivedKeys', function () {
		const tests = [
			{
				name: 'no keys',
				state: {
					byKey: null,
				},
				action: {type: 'ATTRIBUTE_DATA.ADD_UNRECEIVED'},
				expectedResult: {byKey: {}},
			},
			{
				name: 'empty keys',
				state: {byKey: null},
				action: {
					type: 'ATTRIBUTE_DATA.ADD_UNRECEIVED',
					keys: [],
				},
				expectedResult: {byKey: {}},
			},
			{
				name: 'some keys',
				state: {byKey: null},
				action: {
					type: 'ATTRIBUTE_DATA.ADD_UNRECEIVED',
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
					type: 'ATTRIBUTE_DATA.INDEX.ADD',
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
					type: 'ATTRIBUTE_DATA.INDEX.ADD',
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
					type: 'ATTRIBUTE_DATA.USE.INDEXED.REGISTER',
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
					type: 'ATTRIBUTE_DATA.USE.INDEXED.REGISTER',
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
					type: 'ATTRIBUTE_DATA.USE.INDEXED.CLEAR',
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
					type: 'ATTRIBUTE_DATA.USE.INDEXED.CLEAR',
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

	describe('addBatch', function () {
		const tests = [
			{
				name: 'no data',
				state: {byKey: null},
				action: {type: 'ATTRIBUTE_DATA.ADD_BATCH'},
				expectedResult: {byKey: {}},
			},
			{
				name: 'empty data',
				state: {byKey: null},
				action: {
					type: 'ATTRIBUTE_DATA.ADD_BATCH',
					data: [],
				},
				expectedResult: {byKey: {}},
			},
			{
				name: 'some data',
				state: {byKey: null},
				action: {
					type: 'ATTRIBUTE_DATA.ADD_BATCH',
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

	describe('addBatchIndex', function () {
		const tests = [
			{
				name: 'empty data',
				state: {indexes: [{filter: 'fil', order: 'asc', index: 'idx'}]},
				action: {
					type: 'ATTRIBUTE_DATA.INDEX.ADD_BATCH',
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
					type: 'ATTRIBUTE_DATA.INDEX.ADD_BATCH',
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
					type: 'ATTRIBUTE_DATA.USE.INDEXED_BATCH.REGISTER',
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
					type: 'ATTRIBUTE_DATA.USE.INDEXED_BATCH.REGISTER',
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

	describe('update', function () {
		const tests = [
			{
				name: 'merge',
				state: {
					byKey: {
						k1: {key: 'k1'},
						k3: {
							key: 'k3',
							attributeData: {
								features: [{properties: {fid: 'f1'}, cv: '1'}],
							},
						},
					},
				},
				action: {
					type: 'ATTRIBUTE_DATA.ADD',
					data: [
						{
							attributeDataSourceKey: 'k2',
						},
						{
							attributeDataSourceKey: 'k3',
							attributeData: {
								features: [{properties: {fid: 'f2'}, cv: '2'}],
							},
						},
					],
					filter: {fidColumnName: 'fid'},
				},
				expectedResult: {
					byKey: {
						k1: {
							key: 'k1',
						},
						k2: {
							attributeDataSourceKey: 'k2',
						},
						k3: {
							attributeData: {
								features: [
									{
										cv: '1',
										properties: {
											fid: 'f1',
										},
									},
									{
										cv: '2',
										properties: {
											fid: 'f2',
										},
									},
								],
							},
							key: 'k3',
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
});
