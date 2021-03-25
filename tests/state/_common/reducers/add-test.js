import {assert} from 'chai';
import commonReducers from '../../../../src/state/_common/reducers';
import {CommonReducersState as state} from './_state';

describe('add', () => {
	it('should add models', () => {
		const action = {
			data: [
				{
					key: 'keyA',
					data: {
						nameInternal: 'Mili',
						nameDisplay: 'Milan',
					},
				},
				{
					key: 'keyB',
					data: {
						nameInternal: 'Tom',
						nameDisplay: 'Tomas',
					},
				},
			],
		};
		const expectedState = {
			...state,
			byKey: {
				...state.byKey,
				keyA: {
					key: 'keyA',
					data: {
						nameInternal: 'Mili',
						nameDisplay: 'Milan',
					},
				},
				keyB: {
					key: 'keyB',
					data: {
						nameInternal: 'Tom',
						nameDisplay: 'Tomas',
					},
				},
			},
		};
		const returnedState = commonReducers.add(state, action);
		assert.deepStrictEqual(returnedState, expectedState);
	});

	it('should update models', () => {
		const action = {
			data: [
				{
					key: 'key1',
					data: {
						nameInternal: 'Albicek',
					},
				},
				{
					key: 'key2',
					data: {
						nameInternal: 'Bertik',
					},
				},
			],
		};
		const expectedState = {
			...state,
			byKey: {
				...state.byKey,
				key1: {
					key: 'key1',
					data: {
						nameInternal: 'Albicek',
					},
				},
				key2: {
					key: 'key2',
					data: {
						nameInternal: 'Bertik',
					},
				},
			},
		};
		const returnedState = commonReducers.add(state, action);
		assert.deepStrictEqual(returnedState, expectedState);
	});

	it('should add models and delete outdated or unreceived', () => {
		const action = {
			data: [
				{
					key: 'keyA',
					data: {
						nameInternal: 'Mili',
						nameDisplay: 'Milan',
					},
					outdated: true,
				},
				{
					key: 'keyB',
					data: {
						nameInternal: 'Tom',
						nameDisplay: 'Tomas',
					},
					unreceived: true,
				},
			],
		};
		const expectedState = {
			...state,
			byKey: {
				...state.byKey,
				keyA: {
					key: 'keyA',
					data: {
						nameInternal: 'Mili',
						nameDisplay: 'Milan',
					},
				},
				keyB: {
					key: 'keyB',
					data: {
						nameInternal: 'Tom',
						nameDisplay: 'Tomas',
					},
				},
			},
		};
		const returnedState = commonReducers.add(state, action);
		assert.deepStrictEqual(returnedState, expectedState);
	});

	it('should return original state if no data given', () => {
		const action = {
			data: [],
		};
		const returnedState = commonReducers.add(state, action);
		assert.deepStrictEqual(returnedState, state);
	});
});
