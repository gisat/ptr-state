import {assert} from 'chai';
import reducer from '../../../src/state/AttributeDataSources/reducers';

describe('state/AttributeDataSources/reducers', function () {
	describe('add', function () {
		const tests = [
			{
				name: 'no data',
				state: {byKey: null},
				action: {type: 'ATTRIBUTE_DATA_SOURCES.ADD'},
				expectedResult: {byKey: {}},
			},
			{
				name: 'empty data',
				state: {byKey: null},
				action: {type: 'ATTRIBUTE_DATA_SOURCES.ADD', data: []},
				expectedResult: {byKey: {}},
			},
			{
				name: 'some data',
				state: {byKey: null},
				action: {
					type: 'ATTRIBUTE_DATA_SOURCES.ADD',
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
				action: {type: 'ATTRIBUTE_DATA_SOURCES.ADD_UNRECEIVED'},
				expectedResult: {byKey: {}},
			},
			{
				name: 'empty keys',
				state: {byKey: null},
				action: {
					type: 'ATTRIBUTE_DATA_SOURCES.ADD_UNRECEIVED',
					keys: [],
				},
				expectedResult: {byKey: {}},
			},
			{
				name: 'some keys',
				state: {byKey: null},
				action: {
					type: 'ATTRIBUTE_DATA_SOURCES.ADD_UNRECEIVED',
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

	describe('useKeysRegister', function () {
		const tests = [
			{
				name: 'no initial keys',
				state: {
					inUse: {},
				},
				action: {
					type: 'ATTRIBUTE_DATA_SOURCES.USE.KEYS.REGISTER',
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
					type: 'ATTRIBUTE_DATA_SOURCES.USE.KEYS.REGISTER',
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
					type: 'ATTRIBUTE_DATA_SOURCES.USE.KEYS.CLEAR',
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
					type: 'ATTRIBUTE_DATA_SOURCES.USE.KEYS.CLEAR',
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
					type: 'ATTRIBUTE_DATA_SOURCES.USE.KEYS.CLEAR',
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
