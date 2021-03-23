import {assert} from 'chai';
import selectors from '../../../src/state/AttributeSets/selectors';

describe('state/AttributeSets/selectors', function () {
	describe('getStateToSave', function () {
		const tests = [
			{
				name: 'default state',
				state: {attributeSets: {}},
				expectedResult: {},
			},
			{
				name: 'active key',
				state: {attributeSets: {activeKey: 'actv'}},
				expectedResult: {activeKey: 'actv'},
			},
			{
				name: 'active keys',
				state: {attributeSets: {activeKeys: ['k1', 'k2']}},
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
