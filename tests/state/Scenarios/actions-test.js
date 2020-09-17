import {assert} from 'chai';
import actions from '../../../src/state/Scenarios/actions';

describe('state/Scenarios/actions', function () {
	this.afterEach(function () {
		clearDispatchedActions();
	});

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

	it('add', function () {
		actions.add('data', 'filter')(dispatch);
		assert.deepStrictEqual(dispatchedActions, [
			{type: 'SCENARIOS.ADD', data: ['data'], filter: 'filter'},
		]);
	});

	it('setActive', function () {
		dispatch(actions.setActive('s1'));
		assert.deepStrictEqual(dispatchedActions, [
			{
				data: 's1',
				type: 'SCENARIOS_SET_ACTIVE',
			},
		]);
	});

	it('removeEditedActiveCase', function () {
		dispatch(actions.removeEditedActiveCase());
		assert.deepStrictEqual(dispatchedActions, [
			{
				type: 'SCENARIOS_CASES_EDITED_REMOVE_ACTIVE',
			},
		]);
	});

	it('setDefaultSituationActive', function () {
		dispatch(actions.setDefaultSituationActive(true));
		assert.deepStrictEqual(dispatchedActions, [
			{
				type: 'SCENARIOS_SET_DEFAULT_SITUATION_ACTIVE',
				active: true,
			},
		]);
	});

	it('addActiveScenario', function () {
		const getState = () => ({
			scenarios: {
				scenarios: {
					activeKeys: ['s1', 's2'],
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};

		dispatch(actions.addActiveScenario('s1'));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					type: 'SCENARIOS_SET_ACTIVE_MULTI',
					keys: ['s1', 's2'],
				},
			]);
		});
	});

	it('removeActiveScenario', function () {
		const getState = () => ({
			scenarios: {
				scenarios: {
					activeKeys: ['s1', 's2'],
				},
			},
		});
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};

		dispatch(actions.removeActiveScenario('s1'));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					type: 'SCENARIOS_SET_ACTIVE_MULTI',
					keys: ['s2'],
				},
			]);
		});
	});

	it('addEditedScenario', function () {
		const getState = () => ({
			scenarios: {
				cases: {
					byKey: {},
				},
				scenarios: {
					byKey: {
						s1: {
							key: 's1',
						},
					},
					activeKeys: ['s1', 's2'],
				},
			},
		});

		dispatch(actions.addEditedScenario('s1', {k: 'v'}));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					data: [
						{
							k: 'v',
							key: 's1',
						},
					],
					type: 'SCENARIOS_EDITED_UPDATE',
				},
				{
					data: [
						{
							data: {
								scenarios: ['s1'],
							},
							key: undefined,
						},
					],
					type: 'SCENARIOS_CASES_EDITED_UPDATE',
				},
			]);
		});
	});

	it('removeActiveCaseEditedScenarios', function () {
		const getState = () => ({
			scenarios: {
				cases: {
					byKey: {
						k1: {n: 1, data: {scenarios: ['s1', 's2']}},
						k2: {n: 2},
						k3: {n: 3, removed: true},
					},
					activeKey: 'k1',
				},
			},
		});

		dispatch(actions.removeActiveCaseEditedScenarios());

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					keys: ['s1', 's2'],
					type: 'SCENARIOS_EDITED_REMOVE',
				},
			]);
		});
	});

	it('updateEditedActiveCase', function () {
		const getState = () => ({
			scenarios: {
				cases: {
					activeKey: 'c1',
				},
			},
		});

		dispatch(actions.updateEditedActiveCase('k', 'v'));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					data: [
						{
							data: {
								k: 'v',
							},
							key: 'c1',
						},
					],
					type: 'SCENARIOS_CASES_EDITED_UPDATE',
				},
			]);
		});
	});

	it('updateEditedScenario', function () {
		const getState = () => ({
			scenarios: {
				cases: {
					byKey: {},
				},
				scenarios: {
					byKey: {
						s1: {key: 's1', data: {}},
					},
				},
			},
		});

		dispatch(actions.updateEditedScenario('s1', 'k', 'v'));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					data: [
						{
							data: {
								scenarios: [],
							},
							key: undefined,
						},
					],
					type: 'SCENARIOS_CASES_EDITED_UPDATE',
				},
				{
					data: [
						{
							data: {
								k: 'v',
							},
							key: 's1',
						},
					],
					type: 'SCENARIOS_EDITED_UPDATE',
				},
			]);
		});
	});
});
