import {assert} from 'chai';
import actions from '../../../src/state/Screens/actions';

describe('state/Screens/actions', function () {
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

	it('addOrUpdate', function () {
		const getState = () => ({screens: {screens: {}}});

		dispatch(actions.addOrUpdate('s1', 'l1', 20, 2, 'c1', {p: 'v'}));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					data: {
						component: 'c1',
						desiredState: 'opening',
						minActiveWidth: 2,
						props: {
							p: 'v',
						},
						width: 20,
					},
					lineage: 'l1',
					setKey: 's1',
					type: 'SCREENS.ADD',
				},
			]);
		});
	});

	it('addSet', function () {
		const getState = () => ({});

		dispatch(actions.addSet('s1'));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					setKey: 's1',
					type: 'SCREENS.SETS.ADD',
				},
			]);
		});
	});

	it('open', function () {
		const getState = () => ({});

		dispatch(actions.open('s1', 'l1'));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					lineage: 'l1',
					setKey: 's1',
					type: 'SCREENS.OPEN',
				},
				{
					lineage: 'l1',
					setKey: 's1',
					type: 'SCREENS.TOP_HISTORY',
				},
			]);
		});
	});

	it('removeAllScreensFromSet', function () {
		const getState = () => ({});

		dispatch(actions.removeAllScreensFromSet('s1'));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					setKey: 's1',
					type: 'SCREENS.REMOVE_ALL',
				},
			]);
		});
	});

	it('retract', function () {
		const getState = () => ({});

		dispatch(actions.retract('s1', 'l1'));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					lineage: 'l1',
					setKey: 's1',
					type: 'SCREENS.RETRACT',
				},
				{
					lineage: 'l1',
					setKey: 's1',
					type: 'SCREENS.TOP_HISTORY',
				},
			]);
		});
	});

	it('topHistory', function () {
		const getState = () => ({
			screens: {
				sets: {},
			},
		});

		dispatch(actions.topHistory('s1', 'l1'));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					lineage: 'l1',
					setKey: 's1',
					type: 'SCREENS.TOP_HISTORY',
				},
				{
					setKey: 's1',
					type: 'SCREENS.SETS.ADD',
				},
			]);
		});
	});
});
