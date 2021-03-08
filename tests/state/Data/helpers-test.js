import {assert} from 'chai';
import {getPageSize} from '../../../src/state/Data/helpers';

describe('state/Data/helpers', function () {
	describe('getPageSize', function () {
		it('It return pageSize from state', function () {
			const mockState = {
				app: {
					localConfiguration: {
						requestPageSize: 99,
					},
				},
			};
			assert.deepStrictEqual(getPageSize(mockState), 99);
		});
		it('It return pageSize from ptr-core', function () {
			const mockState = {
				app: {
					localConfiguration: {},
				},
			};
			assert.deepStrictEqual(getPageSize(mockState), 100);
		});
	});
});
