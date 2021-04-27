import {assert} from 'chai';
import reducers, {
	INITIAL_STATE,
} from '../../../../src/state/Components/reducers';
import {ComponentsReducersState as state} from './_state';

describe('set-test', function () {
	it('Should set the value in given path', function () {
		const component = 'componentA';
		const path = 'data.something';
		const value = 'something else';

		const expectedState = {
			...state,
			componentA: {
				data: {
					something: 'something else',
				},
			},
		};

		const action = {
			type: 'COMPONENTS.SET',
			component,
			path,
			value,
		};

		const output = reducers(state, action);
		assert.deepStrictEqual(output, expectedState);
	});

	it('Should set the value in given path 2', function () {
		const component = 'componentZ';
		const path = 'data';
		const value = 'something';

		const expectedState = {
			...state,
			componentZ: {
				data: 'something',
			},
		};

		const action = {
			type: 'COMPONENTS.SET',
			component,
			path,
			value,
		};

		const output = reducers(state, action);
		assert.deepStrictEqual(output, expectedState);
	});

	it('Should return the same state if no component key given', function () {
		const path = 'data';
		const value = 'something';

		const action = {
			type: 'COMPONENTS.SET',
			path,
			value,
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});

	it('Should return the same state if no path', function () {
		const path = 'data';
		const value = 'something';

		const action = {
			type: 'COMPONENTS.SET',
			component: 'componentA',
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});
});
