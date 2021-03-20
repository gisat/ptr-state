import {assert} from 'chai';
import commonSelectors from '../../../../src/state/_common/selectors';

const getUsedKeysForComponent = storePath => {
	const getSubstate = state => state[storePath];
	const state = {
		[storePath]: {
			inUse: {keys: {componentA: ['key1', 'key2', 'key3'], componentB: []}},
		},
	};

	it('should return used keys for component', () => {
		const componentKey = 'componentA';
		const expectedOutput = ['key1', 'key2', 'key3'];
		const output = commonSelectors.getUsedKeysForComponent(getSubstate)(
			state,
			componentKey
		);
		assert.deepStrictEqual(output, expectedOutput);
	});

	it('should return null if no keys registered for given component', () => {
		const componentKey = 'componentB';
		const output = commonSelectors.getUsedKeysForComponent(getSubstate)(
			state,
			componentKey
		);
		assert.isNull(output);
	});

	it('should return null if no keys registered for given component 2', () => {
		const componentKey = 'componentC';
		const output = commonSelectors.getUsedKeysForComponent(getSubstate)(
			state,
			componentKey
		);
		assert.isNull(output);
	});

	it('should return null if no component key given', () => {
		const output = commonSelectors.getUsedKeysForComponent(getSubstate)(state);
		assert.isNull(output);
	});

	it('should return null if no keys registered at all', () => {
		const state = {
			[storePath]: {inUse: {keys: {}}},
		};
		const componentKey = 'componentA';
		const output = commonSelectors.getUsedKeysForComponent(getSubstate)(
			state,
			componentKey
		);
		assert.isNull(output);
	});
};

describe('getUsedKeysForComponent', () => getUsedKeysForComponent('sub'));
