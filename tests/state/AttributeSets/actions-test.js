import {assert} from 'chai';
import actions from '../../../src/state/AttributeSets/actions';

describe('state/AttributeSets/actions', function () {
	let dispatchedActions = [];
	const dispatch = function (action) {
		dispatchedActions.push(action);
	};

	const clearDispatchedActions = function () {
		dispatchedActions = [];
	};

	afterEach(function () {
		clearDispatchedActions();
	});

	it('setActiveKeys', function () {
		actions.setActiveKeys(['k1', 'k2'])(dispatch);

		assert.deepStrictEqual(dispatchedActions, [
			{type: 'ATTRIBUTE_SETS.SET_ACTIVE_KEYS', keys: ['k1', 'k2']},
		]);
	});
});
