import {assert} from 'chai';
import actions from '../../../src/state/Snapshots/actions';

describe('state/Snapshots/actions', function () {
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

	it('add', function () {
		const getState = () => ({});

		dispatch(actions.add({p: 'v'}));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					data: [
						{
							p: 'v',
						},
					],
					type: 'SNAPSHOTS_ADD',
				},
			]);
		});
	});

	it('remove', function () {
		const getState = () => ({});

		dispatch(actions.remove(['k1']));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					keys: ['k1'],
					type: 'SNAPSHOTS_REMOVE',
				},
			]);
		});
	});
});
