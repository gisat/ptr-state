import {assert} from 'chai';
import selectors from '../../../src/state/Attributes/selectors';

describe('state/Attributes/selectors', function () {
	describe('getStateToSave', function () {
		const tests = [
			{
				name: 'default state',
				state: {attributes: {}},
				expectedResult: {},
			},
			{
				name: 'active key',
				state: {attributes: {activeKey: 'actv'}},
				expectedResult: {activeKey: 'actv'},
			},
			{
				name: 'active keys',
				state: {attributes: {activeKeys: ['k1', 'k2']}},
				expectedResult: {activeKeys: ['k1', 'k2']},
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					selectors.getStateToSave(test.state),
					test.expectedResult
				);
			});
		});
	});
});
