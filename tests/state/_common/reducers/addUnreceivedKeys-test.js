import {assert} from 'chai';
import commonReducers from '../../../../src/state/_common/reducers';
import {CommonReducersState as state} from './_state';

describe('addUnreceivedKeys', () => {
	it('should add unreceived models', () => {
		const action = {
			keys: ['keyA', 'keyB'],
		};
		const expectedState = {
			...state,
			byKey: {
				...state.byKey,
				keyA: {
					key: 'keyA',
					unreceived: true,
				},
				keyB: {
					key: 'keyB',
					unreceived: true,
				},
			},
		};
		const returnedState = commonReducers.addUnreceivedKeys(state, action);
		assert.deepStrictEqual(returnedState, expectedState);
	});

	it('should rewrite existing models', () => {
		const action = {
			keys: ['key1'],
		};
		const expectedState = {
			...state,
			byKey: {
				...state.byKey,
				key1: {
					key: 'key1',
					unreceived: true,
				},
			},
		};
		const returnedState = commonReducers.addUnreceivedKeys(state, action);
		assert.deepStrictEqual(returnedState, expectedState);
	});

	it('should return original state if no keys given', () => {
		const action = {
			keys: [],
		};
		const returnedState = commonReducers.addUnreceivedKeys(state, action);
		assert.deepStrictEqual(returnedState, state);
	});
});
