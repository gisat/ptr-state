import {assert} from 'chai';
import actions from '../../../src/state/Users/actions';
import {resetFetch, setFetch} from '../../../src/state/_common/request';
import slash from 'slash';

describe('state/Users/actions', function () {
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

	it('add', function () {
		actions.add('data', 'filter')(dispatch);
		assert.deepStrictEqual(dispatchedActions, [
			{type: 'USERS.ADD', data: ['data'], filter: 'filter'},
		]);
	});

	it('apiLoadCurrentUser', function () {
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: 'backend',
				},
			},
			users: {},
		});
		setFetch(function (url, options) {
			assert.strictEqual(
				'http://localhost/backend/rest/user/current',
				slash(url)
			);
			assert.deepStrictEqual(options, {
				body: null,
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'GET',
			});

			return Promise.resolve({
				ok: true,
				json: function () {
					return Promise.resolve({
						key: 1,
						groups: [{key: 1}, {key: 2}],
						data: {},
					});
				},
				headers: {
					get: function (name) {
						return {'Content-type': 'application/json'}[name];
					},
				},
			});
		});

		dispatch(actions.apiLoadCurrentUser());

		return runFunctionActions({dispatch, getState}).then(function () {
			assert.deepStrictEqual(dispatchedActions, [
				{
					type: 'USERS.CURRENT.REQUEST',
				},
				{
					data: [
						{
							key: 1,
							permissions: {
								guest: {
									get: false,
								},
							},
						},
						{
							key: 2,
							permissions: {
								guest: {
									get: false,
								},
							},
						},
					],
					type: 'USERS.GROUPS.ADD',
				},
				{
					key: 1,
					type: 'USERS.SET_ACTIVE_KEY',
				},
				{
					data: [
						{
							data: {},
							groups: [1, 2],
							key: 1,
							permissions: {
								guest: {
									get: false,
								},
							},
						},
					],
					filter: undefined,
					type: 'USERS.ADD',
				},
			]);
		});
	});

	it('apiLoginUser', function () {
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: 'backend',
				},
			},
			users: {inUse: {}, groups: {inUse: {}}},
			scopes: {inUse: {}},
			places: {inUse: {}},
			periods: {inUse: {}},
		});
		setFetch(function (url, options) {
			assert.strictEqual(
				'http://localhost/backend/api/login/login',
				slash(url)
			);
			assert.deepStrictEqual(options, {
				body: JSON.stringify({
					username: 'user@example.com',
					password: 'pwd',
				}),
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});

			const response = Promise.resolve({
				ok: true,
				json: function () {
					return Promise.resolve({
						data: {
							status: 'ok',
						},
					});
				},
				headers: {
					get: function (name) {
						return {'Content-type': 'application/json'}[name];
					},
				},
			});

			setFetch(function (url, options) {
				assert.strictEqual(
					'http://localhost/backend/rest/user/current',
					slash(url)
				);
				assert.deepStrictEqual(options, {
					body: null,
					credentials: 'include',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					method: 'GET',
				});

				return Promise.resolve({
					ok: true,
					json: function () {
						return Promise.resolve({
							key: 1,
							groups: [{key: 1}, {key: 2}],
							data: {},
						});
					},
					headers: {
						get: function (name) {
							return {'Content-type': 'application/json'}[name];
						},
					},
				});
			});

			return response;
		});

		dispatch(actions.apiLoginUser('user@example.com', 'pwd'));

		return runFunctionActions({dispatch, getState}).then(function () {
			assert.deepStrictEqual(dispatchedActions, [
				{
					type: 'USERS.LOGIN.REQUEST',
				},
				{
					type: 'COMMON.DATA.SET_OUTDATED',
				},
				{
					type: 'USERS.CURRENT.REQUEST',
				},
				{
					type: 'SCOPES.INDEX.CLEAR_ALL',
				},
				{
					type: 'PLACES.INDEX.CLEAR_ALL',
				},
				{
					type: 'PERIODS.INDEX.CLEAR_ALL',
				},
				{
					type: 'USERS.INDEX.CLEAR_ALL',
				},
				{
					type: 'USERS.GROUPS.INDEX.CLEAR_ALL',
				},
				{
					data: [
						{
							key: 1,
							permissions: {
								guest: {
									get: false,
								},
							},
						},
						{
							key: 2,
							permissions: {
								guest: {
									get: false,
								},
							},
						},
					],
					type: 'USERS.GROUPS.ADD',
				},
				{
					key: 1,
					type: 'USERS.SET_ACTIVE_KEY',
				},
				{
					data: [
						{
							data: {},
							groups: [1, 2],
							key: 1,
							permissions: {
								guest: {
									get: false,
								},
							},
						},
					],
					filter: undefined,
					type: 'USERS.ADD',
				},
			]);
		});
	});

	it('refreshUses', function () {
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: 'backend',
				},
			},
			users: {
				groups: {inUse: {}},
				inUse: {
					keys: ['k1', 'k2'],
					indexes: [
						[
							{
								filter: {name: 'fil'},
								order: 'asc',
								start: 1,
								length: 3,
							},
						],
					],
				},
				byKey: {
					k1: {key: 'k1'},
					k2: {key: 'k2'},
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
		setFetch(function (url, options) {
			assert.strictEqual(
				'http://localhost/backend/rest/user/filtered/users',
				slash(url)
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
				data: {users: {k1: {}, k2: {}}},
				total: 2,
				changes: {
					users: '2020-01-01',
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

		dispatch(actions.refreshUses());

		return runFunctionActions({dispatch, getState}).then(function () {
			assert.deepStrictEqual(dispatchedActions, [
				{
					type: 'USERS.INDEX.CLEAR_ALL',
				},
				{
					type: 'USERS.GROUPS.INDEX.CLEAR_ALL',
				},
				{
					changedOn: '2020-01-01',
					count: 2,
					data: {
						k1: {},
						k2: {},
					},
					filter: {
						name: 'fil',
					},
					order: 'asc',
					start: 1,
					type: 'USERS.INDEX.ADD',
				},
			]);
		});
	});

	it('useKeys', function () {
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: 'backend',
				},
			},
			users: {
				byKey: {k1: {key: 'k1'}, k2: {key: 'k2'}},
			},
		});

		dispatch(actions.useKeys(['k1', 'k2'], 'cid'));

		return runFunctionActions({dispatch, getState}).then(function () {
			assert.deepStrictEqual(dispatchedActions, [
				{
					componentId: 'cid',
					keys: ['k1', 'k2'],
					type: 'USERS.USE.KEYS.REGISTER',
				},
			]);
		});
	});

	it('useKeysClear', function () {
		actions.useKeysClear('cid')(dispatch);

		assert.deepStrictEqual(dispatchedActions, [
			{componentId: 'cid', type: 'USERS.USE.KEYS.CLEAR'},
		]);
	});

	it('useIndexedUsers', function () {
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: 'backend',
				},
			},
			attributes: {activeKey: 'k1'},
			scopes: {activeKey: 'k1'},
			periods: {activeKey: 'k1'},
			places: {activeKey: 'k1'},
			users: {},
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
				'http://localhost/backend/rest/user/filtered/users',
				slash(url)
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
				data: {users: {k1: {}, k2: {}}},
				total: 2,
				changes: {
					users: '2020-01-01',
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

		dispatch(
			actions.useIndexedUsers(
				{name: 'afil'},
				{name: 'fil'},
				'asc',
				1,
				5,
				'cid'
			)
		);

		return runFunctionActions({dispatch, getState}).then(function () {
			assert.deepStrictEqual(dispatchedActions, [
				{
					componentId: 'cid',
					filterByActive: {name: 'afil'},
					filter: {name: 'fil'},
					order: 'asc',
					start: 1,
					length: 5,
					type: 'USERS.USE.INDEXED.REGISTER',
				},
				{
					filter: {name: 'fil'},
					order: 'asc',
					count: 2,
					start: 1,
					data: {k1: {}, k2: {}},
					changedOn: '2020-01-01',
					type: 'USERS.INDEX.ADD',
				},
			]);
		});
	});

	it('useIndexedGroups', function () {
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: 'backend',
				},
			},
			attributes: {activeKey: 'k1'},
			scopes: {activeKey: 'k1'},
			periods: {activeKey: 'k1'},
			places: {activeKey: 'k1'},
			users: {groups: {}},
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
				'http://localhost/backend/rest/user/filtered/groups',
				slash(url)
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
				data: {groups: {k1: {}, k2: {}}},
				total: 2,
				changes: {
					groups: '2020-01-01',
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

		dispatch(
			actions.useIndexedGroups(
				{name: 'afil'},
				{name: 'fil'},
				'asc',
				1,
				5,
				'cid'
			)
		);

		return runFunctionActions({dispatch, getState}).then(function () {
			assert.deepStrictEqual(dispatchedActions, [
				{
					componentId: 'cid',
					filterByActive: {name: 'afil'},
					filter: {name: 'fil'},
					order: 'asc',
					start: 1,
					length: 5,
					type: 'USERS.GROUPS.USE.INDEXED.REGISTER',
				},
				{
					filter: {name: 'fil'},
					order: 'asc',
					count: 2,
					start: 1,
					data: {k1: {}, k2: {}},
					changedOn: '2020-01-01',
					type: 'USERS.GROUPS.INDEX.ADD',
				},
			]);
		});
	});

	it('useIndexedUsersClear', function () {
		dispatch(actions.useIndexedUsersClear('cid'));

		assert.deepStrictEqual(dispatchedActions, [
			{
				componentId: 'cid',
				type: 'USERS.USE.INDEXED.CLEAR',
			},
		]);
	});

	it('useIndexedGroupsClear', function () {
		dispatch(actions.useIndexedGroupsClear('cid'));

		assert.deepStrictEqual(dispatchedActions, [
			{
				componentId: 'cid',
				type: 'USERS.GROUPS.USE.INDEXED.CLEAR',
			},
		]);
	});
});
