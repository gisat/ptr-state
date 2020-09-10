import {assert} from 'chai';
import reducer from '../../../src/state/Selections/reducers';

describe('state/Selections/reducers', function () {
	describe('add', function () {
		const tests = [
			{
				name: 'no data',
				state: {byKey: null},
				action: {type: 'SELECTIONS.ADD'},
				expectedResult: {byKey: {}},
			},
			{
				name: 'empty data',
				state: {byKey: null},
				action: {type: 'SELECTIONS.ADD', data: []},
				expectedResult: {byKey: {}},
			},
			{
				name: 'some data',
				state: {byKey: null},
				action: {
					type: 'SELECTIONS.ADD',
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

	describe('setActive', function () {
		const tests = [
			{
				name: 'test',
				state: {
					activeKey: 'k1',
					activeKeys: ['ks1', 'ks2'],
				},
				action: {
					type: 'SELECTIONS.SET_ACTIVE_KEY',
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

	it('clearFeatureKeysFilter', function () {
		assert.deepStrictEqual(
			reducer(
				{
					byKey: {
						k1: {
							key: 'k1',
							data: {featureKeysFilter: {name: 'val'}},
						},
					},
				},
				{type: 'SELECTIONS.CLEAR.FEATURE_KEYS_FILTER', key: 'k1'}
			),
			{
				byKey: {k1: {key: 'k1', data: {featureKeysFilter: null}}},
			}
		);
	});

	it('setFeatureKeysFilterKeys', function () {
		assert.deepStrictEqual(
			reducer(
				{
					byKey: {
						k1: {
							key: 'k1',
							data: {featureKeysFilter: {keys: ['fk2', 'fk3']}},
						},
					},
				},
				{
					type: 'SELECTIONS.SET.FEATURE_KEYS_FILTER.KEYS',
					key: 'k1',
					featureKeys: ['fk1'],
				}
			),
			{
				byKey: {
					k1: {key: 'k1', data: {featureKeysFilter: {keys: ['fk1']}}},
				},
			}
		);
	});
});
