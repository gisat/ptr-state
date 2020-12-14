import {assert} from 'chai';
import slash from 'slash';
import actions from '../../../src/state/AttributeStatistics/actions';
import {resetFetch, setFetch} from '../../../src/state/_common/request';

describe('state/AttributeStatistics/actions', function () {
	let dispatchedActions = [];

	this.afterEach(function () {
		resetFetch();
		dispatchedActions = [];
	});

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

	it('loadFilteredData', function () {
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: 'backend',
				},
			},
			scopes: {activeKey: 's1'},
			periods: {activeKey: 'pe1'},
			places: {activeKey: 'pl1'},
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
		setFetch(function (url, options) {
			assert.strictEqual(
				'http://localhost/backend/rest/statistic/filtered/attribute',
				slash(url)
			);
			assert.deepStrictEqual(options, {
				body: JSON.stringify({
					filter: {name: 'fil'},
					order: null,
				}),
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});

			const body = {
				data: {attribute: {k1: {}, k2: {}}},
				total: 2,
				changes: {
					attribute: '2020-01-01',
				},
			};

			return Promise.resolve({
				ok: true,
				json: function () {
					return Promise.resolve(body);
				},
				headers: {
					get: function (name) {
						return {'Content-type': 'application/json'}[name];
					},
				},
				data: JSON.stringify(body),
			});
		});

		return actions
			.loadFilteredData({name: 'fil'}, 'cid')(dispatch, getState)
			.then(function () {
				return runFunctionActions({dispatch, getState});
			})
			.then(function () {
				assert.deepStrictEqual(dispatchedActions, [
					{
						type: 'ATTRIBUTE_STATISTICS.USE.INDEXED_BATCH.REGISTER',
						componentId: 'cid',
						filter: {name: 'fil'},
						filterByActive: null,
						order: null,
					},
					{
						type: 'ATTRIBUTE_STATISTICS.INDEX.ADD_BATCH',
						filter: {name: 'fil'},
						order: null,
						data: {k1: {}, k2: {}},
						key: 'attributeDataSourceKey',
					},
				]);
			});
	});
});
