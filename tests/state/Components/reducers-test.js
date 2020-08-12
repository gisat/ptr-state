import {assert} from 'chai';
import reducer from '../../../src/state/Components/reducers';

describe('state/Components/reducers', function () {
	it('update', function () {
		assert.deepStrictEqual(
			reducer(
				{},
				{type: 'COMPONENTS.UPDATE', component: 'cmp', update: {k: 'v'}}
			),
			{cmp: {k: 'v'}}
		);
	});

	it('set', function () {
		assert.deepStrictEqual(
			reducer(
				{cmp: {k: {v: 'old_v'}}},
				{
					type: 'COMPONENTS.SET',
					component: 'cmp',
					path: 'k.v',
					value: 'v',
				}
			),
			{cmp: {k: {v: 'v'}}}
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
