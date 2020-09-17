import {assert} from 'chai';
import actions from '../../../src/state/Selections/actions';

describe('state/Selections/actions', function () {
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
		actions.add('data', 'filter')(dispatch);
		assert.deepStrictEqual(dispatchedActions, [
			{type: 'SELECTIONS.ADD', data: ['data'], filter: 'filter'},
		]);
	});

	it('setActiveKey', function () {
		actions.setActiveKey('k1')(dispatch);

		assert.deepStrictEqual(dispatchedActions, [
			{type: 'SELECTIONS.SET_ACTIVE_KEY', key: 'k1'},
		]);
	});

	it('updateStateFromView', function () {
		actions.updateStateFromView({
			activeKey: 'ak',
		})(dispatch);

		assert.deepStrictEqual(dispatchedActions, [
			{key: 'ak', type: 'SELECTIONS.SET_ACTIVE_KEY'},
		]);
	});

	it('updateStateFromViewWithData', function () {
		const getState = () => ({});

		dispatch(
			actions.updateStateFromViewWithData({
				activeKey: 'ak',
				data: {k: 'v'},
			})
		);

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{key: 'ak', type: 'SELECTIONS.SET_ACTIVE_KEY'},
				{
					data: [
						{
							k: 'v',
						},
					],
					filter: undefined,
					type: 'SELECTIONS.ADD',
				},
			]);
		});
	});

	it('clearFeatureKeysFilter', function () {
		const getState = () => ({});

		dispatch(actions.clearFeatureKeysFilter('k1'));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					key: 'k1',
					type: 'SELECTIONS.CLEAR.FEATURE_KEYS_FILTER',
				},
			]);
		});
	});

	it('setActiveSelectionFeatureKeysFilterKeys', function () {
		const getState = () => ({
			selections: {
				activeKey: 's1',
			},
		});

		dispatch(actions.setActiveSelectionFeatureKeysFilterKeys(['s1', 's2']));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					featureKeys: ['s1', 's2'],
					key: 's1',
					type: 'SELECTIONS.SET.FEATURE_KEYS_FILTER.KEYS',
				},
			]);
		});
	});
});
