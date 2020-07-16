import {assert} from 'chai';
import reducer from '../../../src/state/App/reducers';

describe('state/App/reducers', function () {
	it('SET_BASE_URL', function () {
		assert.deepStrictEqual(
			reducer(null, {
				type: 'APP.SET_BASE_URL',
				url: 'http://localhost',
			}),
			{baseUrl: 'http://localhost'}
		);
	});

	it('SET_KEY', function () {
		assert.deepStrictEqual(
			reducer(null, {
				type: 'APP.SET_KEY',
				key: 'k1',
			}),
			{key: 'k1'}
		);
	});

	it('SET_LOCAL_CONFIGURATION', function () {
		assert.deepStrictEqual(
			reducer(
				{},
				{
					type: 'APP.SET_LOCAL_CONFIGURATION',
					path: 'pth',
					value: 'val',
				}
			),
			{localConfiguration: {pth: 'val'}}
		);
	});

	it('UPDATE_LOCAL_CONFIGURATION', function () {
		assert.deepStrictEqual(
			reducer(
				{},
				{
					type: 'APP.UPDATE_LOCAL_CONFIGURATION',
					update: {p: 'v'},
				}
			),
			{localConfiguration: {p: 'v'}}
		);
	});

	it('RECEIVE_CONFIGURATION', function () {
		assert.deepStrictEqual(
			reducer(
				{},
				{
					type: 'APP.RECEIVE_CONFIGURATION',
					configuration: {p: 'v'},
				}
			),
			{configuration: {p: 'v'}}
		);
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
