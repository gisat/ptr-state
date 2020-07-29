import {assert} from 'chai';
import actions from '../../../src/state/AttributeData/actions';
import {resetFetch, setFetch} from '../../../src/state/_common/request';

describe('state/AttributeData/actions', function () {
	let dispatchedActions = [];

	const dispatch = function (action) {
		dispatchedActions.push(action);
	};

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

	it('useIndexed', function () {
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: '',
				},
			},
			attributes: {activeKey: 'k1'},
			scopes: {activeKey: 'k1'},
			periods: {activeKey: 'k1'},
			places: {activeKey: 'k1'},
			attributeData: {},
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
				'http://localhost/backend/rest/data/filtered/attribute',
				url
			);
			assert.deepStrictEqual(options, {
				body: JSON.stringify({
					filter: {name: 'fil'},
					offset: 0,
					order: 'asc',
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
			.useIndexed(
				{name: 'afil'},
				{name: 'fil'},
				'asc',
				1,
				5,
				'cid'
			)(dispatch, getState)
			.then(function () {
				return runFunctionActions({dispatch, getState});
			})
			.then(function () {
				assert.deepStrictEqual(dispatchedActions, [
					{
						componentId: 'cid',
						filterByActive: {name: 'afil'},
						filter: {name: 'fil'},
						order: 'asc',
						start: 1,
						length: 5,
						type: 'ATTRIBUTE_DATA.USE.INDEXED.REGISTER',
					},
					{
						filter: {name: 'fil'},
						order: 'asc',
						count: 2,
						start: 1,
						data: {k1: {}, k2: {}},
						changedOn: '2020-01-01',
						type: 'ATTRIBUTE_DATA.INDEX.ADD',
					},
				]);
			});
	});

	it('useIndexedClear', function () {
		actions.useIndexedClear('cid')(dispatch);
		assert.deepStrictEqual(dispatchedActions, [
			{
				type: 'ATTRIBUTE_DATA.USE.INDEXED.CLEAR',
				componentId: 'cid',
			},
		]);
	});
});
