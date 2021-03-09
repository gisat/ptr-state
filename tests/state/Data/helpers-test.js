import {assert} from 'chai';
import {getPageSize} from '../../../src/state/Data/helpers';

describe('state/Data/helpers', function () {
	describe('getPageSize', function () {
		it('It return pageSize from state', function () {
			const localConfiguration = {
				requestPageSize: 99,
			};
			assert.deepStrictEqual(getPageSize(localConfiguration), 99);
		});
		it('It return pageSize from ptr-core', function () {
			const localConfiguration = {};
			assert.deepStrictEqual(getPageSize(localConfiguration), 100);
		});
	});
});
