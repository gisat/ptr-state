import {assert} from 'chai';
import actions from '../../../src/state/Styles/actions';

describe('state/Styles/actions', function () {
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
			{type: 'STYLES.ADD', data: ['data'], filter: 'filter'},
		]);
	});

	it('useKeys', function () {
		const getSubState = (state) => state.sub;
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
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: 'backend',
				},
			},
			styles: {
				byKey: {k1: {key: 'k1'}, k2: {key: 'k2'}},
			},
		});

		return actions
			.useKeys(
				['k1', 'k2'],
				'cid'
			)(dispatch)
			.then(function () {
				return runFunctionActions({dispatch, getState});
			})
			.then(function () {
				assert.deepStrictEqual(dispatchedActions, [
					{
						componentId: 'cid',
						keys: ['k1', 'k2'],
						type: 'STYLES.USE.KEYS.REGISTER',
					},
				]);
			});
	});

	it('useKeysClear', function () {
		actions.useKeysClear('cid')(dispatch);

		assert.deepStrictEqual(dispatchedActions, [
			{componentId: 'cid', type: 'STYLES.USE.KEYS.CLEAR'},
		]);
	});
});
