import {assert} from 'chai';
import actions from '../../../src/state/Windows/actions';

describe('state/Windows/actions', function () {
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

	describe('addOrOpen', function () {
		it('new window', function () {
			const getState = () => ({
				windows: {windows: {}, sets: {}},
			});

			dispatch(
				actions.addOrOpen('s1', 'w1', {ps: 'vs'}, 'c1', {pp: 'vp'})
			);

			return runFunctionActions({dispatch, getState}).then(() => {
				assert.deepStrictEqual(dispatchedActions, [
					{
						component: 'c1',
						props: {
							pp: 'vp',
						},
						setKey: 's1',
						settings: {
							ps: 'vs',
						},
						state: 'open',
						type: 'WINDOWS.ADD',
						windowKey: 'w1',
					},
				]);
			});
		});

		it('existing window', function () {
			const getState = () => ({
				windows: {windows: {w1: {}}, sets: {}},
			});

			dispatch(
				actions.addOrOpen('s1', 'w1', {ps: 'vs'}, 'c1', {pp: 'vp'})
			);

			return runFunctionActions({dispatch, getState}).then(() => {
				assert.deepStrictEqual(dispatchedActions, [
					{
						setKey: 's1',
						type: 'WINDOWS.OPEN',
						windowKey: 'w1',
					},
				]);
			});
		});
	});

	it('remove', function () {
		dispatch(actions.remove('s1', 'w1'));

		assert.deepStrictEqual(dispatchedActions, [
			{
				setKey: 's1',
				type: 'WINDOWS.REMOVE',
				windowKey: 'w1',
			},
		]);
	});

	it('topWindow', function () {
		dispatch(actions.topWindow('s1', 'w1'));

		assert.deepStrictEqual(dispatchedActions, [
			{
				setKey: 's1',
				type: 'WINDOWS.TOP',
				windowKey: 'w1',
			},
		]);
	});

	it('updateSettings', function () {
		const getState = () => ({
			windows: {windows: {w1: {data: {settings: {}}}}, sets: {}},
		});

		dispatch(actions.updateSettings('w1', {p: 'v'}));

		return runFunctionActions({getState, dispatch}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					data: {
						settings: {
							p: 'v',
						},
					},
					type: 'WINDOWS.UPDATE',
					windowKey: 'w1',
				},
			]);
		});
	});
});
