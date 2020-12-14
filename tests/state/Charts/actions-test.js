import {assert} from 'chai';
import slash from 'slash';
import actions from '../../../src/state/Charts/actions';
import {resetFetch, setFetch} from '../../../src/state/_common/request';

describe('state/Charts/actions', function () {
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
		resetFetch();
		clearDispatchedActions();
	});

	describe('updateStateFromView', function () {
		const tests = [
			{
				name: 'no data',
				data: null,
				expectedResult: [],
			},
			{
				name: 'some data',
				data: {k: 'v'},
				expectedResult: [
					{
						type: 'CHARTS.UPDATE',
						data: {
							k: 'v',
						},
					},
				],
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				dispatch(actions.updateStateFromView(test.data));
				runFunctionActions({dispatch, getState: () => {}});

				assert.deepStrictEqual(dispatchedActions, test.expectedResult);
			});
		});
	});

	it('use', function () {
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: 'backend',
				},
			},
			scopes: {activeKey: 'sc1'},
			periods: {activeKey: 'sp1', activeKeys: ['sp1']},
			attributes: {activeKey: 'a1'},
			charts: {
				charts: {
					k1: {
						data: {
							scope: 's1',
							periods: ['p1'],
							attributes: ['a1'],
							layerTemplate: 't1',
						},
					},
				},
			},
			attributeRelations: {
				indexes: [
					{
						filter: {
							scopeKey: 's1',
							periodKey: 'p1',
							attributeKey: 'a1',
							layerTemplateKey: 't1',
						},
						order: null,
						count: 5,
					},
				],
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
		setFetch(function (url, options) {
			assert.strictEqual(
				'http://localhost/backend/rest/relations/filtered/attribute',
				slash(url)
			);

			assert.deepStrictEqual(options, {
				body: JSON.stringify({
					filter: {
						scopeKey: 's1',
						periodKey: 'p1',
						attributeKey: 'a1',
						layerTemplateKey: 't1',
					},
					offset: 0,
					order: null,
					limit: 100,
				}),
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});

			const body = {
				data: {attribute: {k1: {}, k2: {}, k3: {}, k4: {}}},
				total: 5,
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

		dispatch(actions.use('k1', false));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					componentId: 'chart-k1',
					filter: {
						attributeKey: 'a1',
						layerTemplateKey: 't1',
						periodKey: 'p1',
						scopeKey: 's1',
					},
					filterByActive: {},
					length: 1000,
					order: null,
					start: 1,
					type: 'ATTRIBUTE_RELATIONS.USE.INDEXED.REGISTER',
				},
			]);
		});
	});

	it('useClear', function () {
		dispatch(actions.useClear('ck'));

		return runFunctionActions({dispatch, getState: () => ({})}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					componentId: 'chart_ck',
					type: 'ATTRIBUTE_RELATIONS.USE.INDEXED.CLEAR',
				},
			]);
		});
	});

	it('setInitial', function () {
		actions.setInitial()(dispatch);

		assert.deepStrictEqual(dispatchedActions, [
			{type: 'CHARTS.SET_INITIAL'},
		]);
	});
});
