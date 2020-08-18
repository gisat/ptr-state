import {assert} from 'chai';
import selectors from '../../../src/state/App/selectors';

describe('state/App/selectors', function () {
	it('getKey', function () {
		assert.strictEqual('kk', selectors.getKey({app: {key: 'kk'}}));
	});

	it('getConfiguration', function () {
		assert.strictEqual(
			selectors.getConfiguration({app: {configuration: {p: 'v'}}}, 'p'),
			'v'
		);
	});

	it('getCompleteConfiguration', function () {
		assert.deepStrictEqual(
			selectors.getCompleteConfiguration({
				app: {configuration: {p: 'v'}},
			}),
			{p: 'v'}
		);
	});

	it('getLocalConfiguration', function () {
		assert.strictEqual(
			selectors.getLocalConfiguration(
				{app: {localConfiguration: {p: 'v'}}},
				'p'
			),
			'v'
		);
	});

	it('getCompleteLocalConfiguration', function () {
		assert.deepStrictEqual(
			selectors.getCompleteLocalConfiguration({
				app: {localConfiguration: {p: 'v'}},
			}),
			{p: 'v'}
		);
	});
});
