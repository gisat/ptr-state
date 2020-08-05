import {assert} from 'chai';
import reducer from '../../../src/state/Charts/reducers';

describe('state/Charts/reducers', function () {
	it('update', function () {
		assert.deepStrictEqual(
			reducer(
				{
					charts: {},
					sets: {},
				},
				{type: 'CHARTS.UPDATE', data: {new: true}}
			),
			{
				charts: {},
				sets: {},
				new: true,
			}
		);
	});

	it('setInitial', function () {
		assert.deepStrictEqual(reducer({}, {type: 'CHARTS.SET_INITIAL'}), {
			charts: {},
			sets: {},
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
