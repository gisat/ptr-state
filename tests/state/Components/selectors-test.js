import {assert} from 'chai';
import selectors from '../../../src/state/Components/selectors';

describe('state/Components/selectors', function () {
	it('get', function () {
		assert.deepStrictEqual(
			selectors.get(
				{components: {k1: {key: 'k1', data: {k: 'v1'}}}},
				'k1',
				'data'
			),
			{
				k: 'v1',
			}
		);
	});

	it('getDataByComponentKey', function () {
		assert.deepStrictEqual(
			selectors.getDataByComponentKey(
				{components: {k1: {key: 'k1', data: {k: 'v1'}}}},
				'k1'
			),
			{
				key: 'k1',
				data: {
					k: 'v1',
				},
			}
		);
	});

	it('getStateToSave', function () {
		assert.deepStrictEqual(
			selectors.getStateToSave(
				{components: {k1: {key: 'k1', data: {k: 'v1'}}}},
				'k1'
			),
			{k1: {key: 'k1', data: {k: 'v1'}}}
		);
	});
});
