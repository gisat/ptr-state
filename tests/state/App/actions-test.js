import {assert} from 'chai';
import slash from 'slash';
import actions from '../../../src/state/App/actions';
import {resetFetch, setFetch} from '../../../src/state/_common/request';

describe('state/App/actions', function () {
	let dispatchedActions = [];

	this.afterEach(function () {
		resetFetch();
		dispatchedActions = [];
	});

	it('add', function () {
		assert.deepStrictEqual(actions.add({p: 'v'}), {
			type: 'APP.RECEIVE_CONFIGURATION',
			configuration: {p: 'v'},
		});
	});

	it('setKey', function () {
		assert.deepStrictEqual(actions.setKey('k1'), {
			type: 'APP.SET_KEY',
			key: 'k1',
		});
	});

	it('updateLocalConfiguration', function () {
		assert.deepStrictEqual(actions.updateLocalConfiguration('update'), {
			type: 'APP.UPDATE_LOCAL_CONFIGURATION',
			update: 'update',
		});
	});

	it('updateLocalConfiguration', function () {
		assert.deepStrictEqual(actions.updateLocalConfiguration('update'), {
			type: 'APP.UPDATE_LOCAL_CONFIGURATION',
			update: 'update',
		});
	});

	it('setBaseUrl', function () {
		assert.deepStrictEqual(actions.setBaseUrl('http://localhost'), {
			type: 'APP.SET_BASE_URL',
			url: 'http://localhost',
		});
	});

	it('setLocalConfiguration', function () {
		assert.deepStrictEqual(actions.setLocalConfiguration('pth', 'val'), {
			type: 'APP.SET_LOCAL_CONFIGURATION',
			path: 'pth',
			value: 'val',
		});
	});

	it('loadConfiguration', function () {
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: '',
				},
			},
		});
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
		setFetch(function (url, options) {
			assert.strictEqual(
				'http://localhost/rest/application/filtered/configurations',
				slash(url)
			);
			assert.deepStrictEqual(options, {
				body: JSON.stringify({
					filter: {},
				}),
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});

			const body = {
				data: {configurations: [{key: 'k1', data: {data: {p1: 'v1'}}}]},
				total: 1,
				changes: {
					configurations: '2020-01-01',
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
			.loadConfiguration()(dispatch, getState)
			.then(() => {
				assert.deepStrictEqual(dispatchedActions, [
					{
						type: 'APP.RECEIVE_CONFIGURATION',
						configuration: {p1: 'v1'},
					},
				]);
			});
	});
});
