import {assert} from 'chai';
import actions from '../../../../src/state/Data/SpatialDataSources/actions';

describe('state/Data/SpatialDataSources/actions', function () {
	let dispatchedActions = [];

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
				} else if (Array.isArray(action)) {
					dispatchedActions = [...dispatchedActions, ...action];
					dispatchedActions[i] = null;
				}
			}

			dispatchedActions = dispatchedActions.filter(a => a != null);

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

	it('receiveIndexed', function () {
		const getState = () => ({});
		const dispatch = action => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};

		const result = [];
		const filter = {};
		const order = null;
		const start = 0;
		const total = 10;
		const changes = null;

		dispatch(
			actions.receiveIndexed(result, filter, order, start, total, changes)
		);

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					type: 'DATA.SPATIAL_DATA_SOURCES.INDEX.ADD',
					filter,
					order,
					start,
					count: total,
					data: result,
					changedOn: changes,
				},
			]);
		});
	});

	it('receiveIndexed with results', function () {
		const getState = () => ({});
		const dispatch = action => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};

		const results = [{key: 1}, {key: 2}];
		const filter = {};
		const order = null;
		const start = 0;
		const total = 10;
		const changes = null;

		dispatch(
			actions.receiveIndexed(results, filter, order, start, total, changes)
		);

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					data: results,
					filter: filter,
					type: 'DATA.SPATIAL_DATA_SOURCES.ADD',
				},
				{
					type: 'DATA.SPATIAL_DATA_SOURCES.INDEX.ADD',
					filter,
					order,
					start,
					count: total,
					data: results,
					changedOn: changes,
				},
			]);
		});
	});
});
