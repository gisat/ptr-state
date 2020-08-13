import {assert} from 'chai';
import actions from '../../../src/state/Components/actions';

describe('state/Components/actions', function () {
	let dispatchedActions = [];
	const dispatch = function (action) {
		dispatchedActions.push(action);
	};

	const clearDispatchedActions = function () {
		dispatchedActions = [];
	};

	const runFunctionActions = function ({dispatch, getState}) {
		return new Promise((resolve, reject) => {
			const promises = [];
			for (let i = 0; i < dispatchedActions.length; i++) {
				const action = dispatchedActions[i];

				if (typeof action === 'function') {
					promises.push(action(dispatch, getState));
					dispatchedActions[i] = null;
				} else if (action instanceof Promise) {
					promises.push(action);
					dispatchedActions[i] = null;
				}
			}

			dispatchedActions = dispatchedActions.filter((a) => a !== null);

			if (promises.length > 0) {
				return Promise.all(promises)
					.then(() => runFunctionActions({dispatch, getState}))
					.then(() => resolve());
			}

			resolve();
		});
	};

	afterEach(function () {
		clearDispatchedActions();
	});

	it('update', function () {
		dispatch(actions.update('cmp', {k: 'v'}));

		return runFunctionActions({dispatch, getState: () => ({})}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					component: 'cmp',
					type: 'COMPONENTS.UPDATE',
					update: {
						k: 'v',
					},
				},
			]);
		});
	});

	it('updateStateFromView', function () {
		dispatch(actions.updateStateFromView({cmp: {k: 'v'}}));

		return runFunctionActions({dispatch, getState: () => ({})}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					component: 'cmp',
					type: 'COMPONENTS.UPDATE',
					update: {
						k: 'v',
					},
				},
			]);
		});
	});

	it('set', function () {
		dispatch(actions.set('cmp', 'k', 'v'));

		return runFunctionActions({dispatch, getState: () => ({})}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					type: 'COMPONENTS.SET',
					component: 'cmp',
					path: 'k',
					value: 'v',
				},
			]);
		});
	});
});
