import {assert} from 'chai';
import commonSelectors from '../../../../src/state/_common/selectors';

const getActiveKey = storePath => {
	const getSubstate = state => state[storePath];
	const state = {[storePath]: {activeKey: 'key1'}};

	it('should return active key', () => {
		const expectedResult = 'key1';
		const output = commonSelectors.getActiveKey(getSubstate)(state);
		assert.equal(output, expectedResult);
	});

	it('should return null if there is no active key', () => {
		const state = {[storePath]: {activeKey: null}};
		const output = commonSelectors.getActiveKey(getSubstate)(state);
		assert.isNull(output);
	});
};

describe('getActiveKey', () => getActiveKey('sub'));
