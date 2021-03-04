import {assert} from 'chai';
import slash from 'slash';
import '../../../src/state/Action';
import actions from '../../../src/state/_common/actions';
import {resetFetch, setFetch} from '../../../src/state/_common/request';

describe('state/_common/actions', function () {
	this.afterEach(function () {
		resetFetch();
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

			dispatchedActions = dispatchedActions.filter(a => a !== null);

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
		actions.add({ADD: 'ADD'})('data', 'filter')(dispatch);
		assert.deepStrictEqual(dispatchedActions, [
			{type: 'ADD', data: ['data'], filter: 'filter'},
		]);
	});

	it('addBatch', function () {
		actions.addBatch({ADD_BATCH: 'ADD_BATCH'})('data', 'key')(dispatch);
		assert.deepStrictEqual(dispatchedActions, [
			{type: 'ADD_BATCH', data: ['data'], key: 'key'},
		]);
	});

	it('addBatchIndex', function () {
		actions.addBatchIndex({INDEX: {ADD_BATCH: 'ADD_BATCH_INDEX'}})(
			'filter',
			'order',
			'data',
			'key'
		)(dispatch);
		assert.deepStrictEqual(dispatchedActions, [
			{
				type: 'ADD_BATCH_INDEX',
				data: 'data',
				filter: 'filter',
				order: 'order',
				key: 'key',
			},
		]);
	});

	describe('action', function () {
		const tests = [
			{
				name: 'simple path',
				actionTypes: {ACTION: 'STR_ACTION'},
				type: 'ACTION',
				payload: {p: true},
				expectedAction: {type: 'STR_ACTION', p: true},
			},
			{
				name: 'complex path',
				actionTypes: {SCOPE: {ACTION: 'STR_SCOPE_ACTION'}},
				type: 'SCOPE.ACTION',
				payload: {p: true},
				expectedAction: {type: 'STR_SCOPE_ACTION', p: true},
			},
		];

		tests.forEach(test => {
			it(test.name, function () {
				assert.deepStrictEqual(
					actions.action(test.actionTypes, test.type, test.payload),
					test.expectedAction
				);
			});
		});
	});

	it('actionGeneralError', function () {
		assert.deepStrictEqual(actions.actionGeneralError(new Error()), {
			type: 'ERROR',
		});
	});

	it('creator', function () {
		const action = (...args) => ({
			type: 'action',
			args,
		});

		actions.creator(action)({ADD: 'ADD'})('arg1')(dispatch);
		assert.deepStrictEqual(dispatchedActions, [
			{type: 'action', args: [{ADD: 'ADD'}, 'arg1']},
		]);
	});

	it('apiUpdate', function () {
		const getSubState = state => state.sub;
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: '',
				},
			},
			sub: {
				byKey: {k1: {data: {name: 'old'}}},
				editedByKey: {k1: {data: {name: 'old'}}},
				indexes: [{filter: {name: 'new'}}, {filter: {name: 'old'}}],
			},
		});
		setFetch(function (url, options) {
			assert.strictEqual('http://localhost/rest/user', slash(url));
			assert.deepStrictEqual(options, {
				body: JSON.stringify({
					data: {users: [{key: 'k1', data: {name: 'new'}}]},
				}),
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'PUT',
			});

			return Promise.resolve({
				ok: true,
				json: function () {
					return Promise.resolve(JSON.parse(options.body));
				},
				headers: {
					get: function (name) {
						return {'Content-type': 'application/json'}[name];
					},
				},
				data: options.body,
			});
		});

		return actions
			.apiUpdate(
				getSubState,
				'users',
				{
					ADD: 'ADD',
					UPDATE: 'UPDATE',
					INDEX: {CLEAR_INDEX: 'CLEAR_INDEX'},
				},
				'user',
				[
					{
						key: 'k1',
						data: {
							name: 'new',
						},
					},
				]
			)(dispatch, getState)
			.then(function () {
				return runFunctionActions({dispatch, getState});
			})
			.then(function () {
				assert.deepStrictEqual(dispatchedActions, [
					{
						type: 'ADD',
						filter: undefined,
						data: [
							{
								key: 'k1',
								data: {
									name: 'new',
								},
							},
						],
					},
					{
						type: 'CLEAR_INDEX',
						filter: {
							name: 'new',
						},
						order: undefined,
					},
					{
						type: 'CLEAR_INDEX',
						filter: {
							name: 'old',
						},
						order: undefined,
					},
				]);
			});
	});

	it('create', function () {
		const getSubState = state => state.sub;
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: '',
				},
			},
			sub: {
				indexes: [{filter: {applicationKey: 'ak'}}],
			},
		});
		setFetch(function (url, options) {
			assert.strictEqual('http://localhost/rest/user', slash(url));
			assert.deepStrictEqual(options, {
				body: JSON.stringify({
					data: {users: [{key: 'k1', data: {applicationKey: 'ak'}}]},
				}),
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});

			return Promise.resolve({
				ok: true,
				json: function () {
					return Promise.resolve(JSON.parse(options.body));
				},
				headers: {
					get: function (name) {
						return {'Content-type': 'application/json'}[name];
					},
				},
				data: options.body,
			});
		});

		return actions
			.create(
				getSubState,
				'users',
				{ADD: 'ADD', INDEX: {CLEAR_INDEX: 'CLEAR_INDEX'}},
				'user'
			)('k1', 'ak')(dispatch, getState)
			.then(function () {
				return runFunctionActions({dispatch, getState});
			})
			.then(function () {
				assert.deepStrictEqual(dispatchedActions, [
					{
						type: 'ADD',
						filter: undefined,
						data: [
							{
								key: 'k1',
								data: {
									applicationKey: 'ak',
								},
							},
						],
					},
					{
						type: 'CLEAR_INDEX',
						filter: {
							applicationKey: 'ak',
						},
						order: undefined,
					},
				]);
			});
	});

	it('deleteItem', function () {
		const getSubState = state => state.sub;
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: '',
				},
			},
			sub: {},
		});
		const dispatch = action => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				dispatchedActions.push(res);

				return res;
			}

			dispatchedActions.push(action);
		};
		setFetch(function (url, options) {
			assert.strictEqual('http://localhost/rest/user', slash(url));
			assert.deepStrictEqual(options, {
				body: JSON.stringify({
					data: {users: [{key: 'k1'}]},
				}),
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'DELETE',
			});

			return Promise.resolve({
				ok: true,
				json: function () {
					return Promise.resolve(JSON.parse(options.body));
				},
				headers: {
					get: function (name) {
						return {'Content-type': 'application/json'}[name];
					},
				},
				data: options.body,
			});
		});

		return actions
			.delete(
				getSubState,
				'users',
				{MARK_DELETED: 'MARK_DELETED'},
				'user'
			)({key: 'k1'})(dispatch, getState)
			.then(function () {
				return runFunctionActions({dispatch, getState});
			})
			.then(function () {
				delete dispatchedActions[0]['date'];
				assert.deepStrictEqual(dispatchedActions, [
					{
						key: 'k1',
						type: 'MARK_DELETED',
					},
					{
						type: 'COMMON.EDITED.REMOVE_PROPERTY_VALUES',
						dataType: 'users',
						keys: ['k1'],
					},
				]);
			});
	});

	it('ensureKeys', function () {
		const getSubState = state => state.sub;
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: '',
				},
			},
			sub: {
				byKey: {
					k2: {key: 'k2'},
				},
			},
		});
		setFetch(function (url, options) {
			assert.strictEqual(
				'http://localhost/rest/user/filtered/users',
				slash(url)
			);
			assert.deepStrictEqual(options, {
				body: JSON.stringify({
					filter: {key: {in: ['k1']}},
				}),
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});

			return Promise.resolve({
				ok: true,
				json: function () {
					return Promise.resolve({data: {users: [{key: 'k1'}]}});
				},
				headers: {
					get: function (name) {
						return {'Content-type': 'application/json'}[name];
					},
				},
				data: options.body,
			});
		});

		return actions
			.ensureKeys(
				getSubState,
				'users',
				{ADD: 'ADD'},
				['k1', 'k2'],
				'user'
			)(dispatch, getState)
			.then(function () {
				return runFunctionActions({dispatch, getState});
			})
			.then(function () {
				assert.deepStrictEqual(dispatchedActions, [
					{
						type: 'ADD',
						filter: undefined,
						data: [
							{
								key: 'k1',
							},
						],
					},
				]);
			});
	});

	describe('ensureIndexed', function () {
		it('already loaded', function () {
			const getSubState = state => state.sub;
			const getState = () => ({
				app: {
					localConfiguration: {
						apiBackendProtocol: 'http',
						apiBackendHost: 'localhost',
						apiBackendPath: '',
					},
				},
				sub: {
					indexes: [
						{
							filter: {name: 'fil'},
							order: 'asc',
							count: 5,
							changedOn: '2020-01-01',
							index: {1: 'k1', 2: 'k2', 3: 'k3', 4: 'k4', 5: 'k5'},
						},
					],
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

			return actions
				.ensureIndexed(
					getSubState,
					'users',
					{name: 'fil'},
					'asc',
					1,
					5,
					{INDEX: {ADD: 'ADD_INDEX'}},
					'user'
				)(dispatch, getState)
				.then(function () {
					return runFunctionActions({dispatch, getState});
				})
				.then(function () {
					//do not call any request, everything is loaded
					assert.deepStrictEqual(dispatchedActions, []);
				});
		});

		it('missing keys', function () {
			const getSubState = state => state.sub;
			const getState = () => ({
				app: {
					localConfiguration: {
						apiBackendProtocol: 'http',
						apiBackendHost: 'localhost',
						apiBackendPath: '',
					},
				},
				sub: {
					indexes: [
						{
							filter: {name: 'fil'},
							order: 'asc',
							count: 5,
							changedOn: '2020-01-01',
							index: {1: null, 2: 'k1', 3: 'k2', 4: 'k3'},
						},
					],
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
					'http://localhost/rest/user/filtered/users',
					slash(url)
				);
				assert.deepStrictEqual(options, {
					body: JSON.stringify({
						filter: {
							name: 'fil',
							key: {
								notin: ['k1', 'k2', 'k3'],
							},
						},
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
					data: {users: {k3: {}, k4: {}}},
					total: 5,
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

			return actions
				.ensureIndexed(
					getSubState,
					'users',
					{name: 'fil'},
					'asc',
					1,
					5,
					{INDEX: {ADD: 'ADD_INDEX'}},
					'user'
				)(dispatch, getState)
				.then(function () {
					return runFunctionActions({dispatch, getState});
				})
				.then(function () {
					assert.deepStrictEqual(dispatchedActions, [
						{
							type: 'ADD_INDEX',
							filter: {
								name: 'fil',
								key: {notin: ['k1', 'k2', 'k3']},
							},
							order: 'asc',
							start: 1,
							data: {k3: {}, k4: {}},
							changedOn: '2020-01-01',
							count: 5,
						},
					]);
				});
		});

		it('nothing loaded', function () {
			const getSubState = state => state.sub;
			const getState = () => ({
				app: {
					localConfiguration: {
						apiBackendProtocol: 'http',
						apiBackendHost: 'localhost',
						apiBackendPath: '',
					},
				},
				sub: {
					indexes: [],
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
					'http://localhost/rest/user/filtered/users',
					slash(url)
				);
				assert.deepStrictEqual(options, {
					body: JSON.stringify({
						filter: {
							name: 'fil',
						},
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
					data: {users: {k1: {}, k2: {}, k3: {}, k4: {}}},
					total: 5,
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

			return actions
				.ensureIndexed(
					getSubState,
					'users',
					{name: 'fil'},
					'asc',
					1,
					5,
					{INDEX: {ADD: 'ADD_INDEX'}},
					'user'
				)(dispatch, getState)
				.then(function () {
					return runFunctionActions({dispatch, getState});
				})
				.then(function () {
					assert.deepStrictEqual(dispatchedActions, [
						{
							type: 'ADD_INDEX',
							filter: {
								name: 'fil',
							},
							order: 'asc',
							start: 1,
							data: {k1: {}, k2: {}, k3: {}, k4: {}},
							changedOn: '2020-01-01',
							count: 5,
						},
					]);
				});
		});
	});

	it('ensureKeys', function () {
		const getSubState = state => state.sub;
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: '',
				},
			},
			sub: {
				byKey: {
					k1: {},
				},
			},
		});
		setFetch(function (url, options) {
			assert.strictEqual(
				'http://localhost/rest/user/filtered/users',
				slash(url)
			);
			assert.deepStrictEqual(options, {
				body: JSON.stringify({
					filter: {
						key: {in: ['k2', 'k3']},
					},
				}),
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});

			const body = {
				data: {users: [{key: 'k2'}]},
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
			.ensureKeys(
				getSubState,
				'users',
				{ADD_UNRECEIVED: 'ADD_UNRECEIVED', ADD: 'ADD'},
				['k1', 'k2', 'k3'],
				'user'
			)(dispatch, getState)
			.then(function () {
				return runFunctionActions({dispatch, getState});
			})
			.then(function () {
				assert.deepStrictEqual(dispatchedActions, [
					{
						type: 'ADD',
						filter: undefined,
						data: [
							{
								key: 'k2',
							},
						],
					},
					{
						type: 'ADD_UNRECEIVED',
						keys: ['k3'],
					},
				]);
			});
	});

	it('loadAll', function () {
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: '',
				},
			},
		});
		setFetch(function (url, options) {
			assert.strictEqual(
				'http://localhost/rest/user/filtered/users',
				slash(url)
			);
			assert.deepStrictEqual(options, {
				body: JSON.stringify({
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

		return actions
			.loadAll(
				'users',
				{ADD: 'ADD'},
				'user'
			)(dispatch, getState)
			.then(function () {
				return runFunctionActions({dispatch, getState});
			})
			.then(function () {
				assert.deepStrictEqual(dispatchedActions, [
					{
						type: 'ADD',
						filter: undefined,
						data: [
							{
								k1: {},
								k2: {},
							},
						],
					},
				]);
			});
	});

	it('loadFiltered', function () {
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: '',
				},
			},
		});
		setFetch(function (url, options) {
			assert.strictEqual(
				'http://localhost/rest/user/filtered/users',
				slash(url)
			);
			assert.deepStrictEqual(options, {
				body: JSON.stringify({
					filter: {name: 'fil'},
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

		return actions
			.loadFiltered(
				'users',
				{ADD: 'ADD'},
				{name: 'fil'},
				'user'
			)(dispatch, getState)
			.then(function () {
				return runFunctionActions({dispatch, getState});
			})
			.then(function () {
				assert.deepStrictEqual(dispatchedActions, [
					{
						type: 'ADD',
						filter: undefined,
						data: [
							{
								k1: {},
								k2: {},
							},
						],
					},
				]);
			});
	});

	it('useIndexedBatch', function () {
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: '',
				},
			},
			scopes: {activeKey: 's1'},
			periods: {activeKey: 'pe1'},
			places: {activeKey: 'pl1'},
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
				'http://localhost/rest/user/filtered/users',
				slash(url)
			);
			assert.deepStrictEqual(options, {
				body: JSON.stringify({
					filter: {name: 'fil'},
					order: 'asc',
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

		return actions
			.useIndexedBatch(
				'users',
				{
					USE: {INDEXED_BATCH: {REGISTER: 'REGISTER'}},
					INDEX: {ADD_BATCH: 'ADD_BATCH'},
				},
				'user'
			)(
				{name: 'fil'},
				{name: 'fil'},
				'asc',
				'cid',
				'k1',
				{}
			)(dispatch, getState)
			.then(function () {
				return runFunctionActions({dispatch, getState});
			})
			.then(function () {
				assert.deepStrictEqual(dispatchedActions, [
					{
						type: 'REGISTER',
						componentId: 'cid',
						filterByActive: {name: 'fil'},
						filter: {name: 'fil'},
						order: 'asc',
					},
					{
						type: 'ADD_BATCH',
						filter: {name: 'fil'},
						order: 'asc',
						data: {k1: {}, k2: {}},
						key: 'k1',
					},
				]);
			});
	});

	it('loadIndexedPage', function () {
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
				'http://localhost/rest/user/filtered/users',
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

		return actions
			.loadIndexedPage(
				'users',
				{name: 'fil'},
				'asc',
				1,
				'2020-01-01',
				{INDEX: {ADD: 'ADD_INDEX'}},
				'user'
			)(dispatch, getState)
			.then(function () {
				return runFunctionActions({dispatch, getState});
			})
			.then(function () {
				assert.deepStrictEqual(dispatchedActions, [
					{
						type: 'ADD_INDEX',
						filter: {name: 'fil'},
						order: 'asc',
						count: 2,
						start: 1,
						data: {k1: {}, k2: {}},
						changedOn: '2020-01-01',
					},
				]);
			});
	});

	it('loadKeysPage', function () {
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
				'http://localhost/rest/user/filtered/users',
				slash(url)
			);
			assert.deepStrictEqual(options, {
				body: JSON.stringify({
					filter: {key: {in: ['k1', 'k2']}},
				}),
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});

			const body = {
				data: {users: [{key: 'k1'}]},
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
			.loadKeysPage(
				'users',
				{ADD: 'ADD', ADD_UNRECEIVED: 'ADD_UNRECEIVED'},
				['k1', 'k2'],
				'user'
			)(dispatch, getState)
			.then(function () {
				return runFunctionActions({dispatch, getState});
			})
			.then(function () {
				assert.deepStrictEqual(dispatchedActions, [
					{type: 'ADD', filter: undefined, data: [{key: 'k1'}]},
					{keys: ['k2'], type: 'ADD_UNRECEIVED'},
				]);
			});
	});

	it('setActiveKey', function () {
		actions.setActiveKey({SET_ACTIVE_KEY: 'SET_ACTIVE_KEY'})('k1')(dispatch);

		assert.deepStrictEqual(dispatchedActions, [
			{type: 'SET_ACTIVE_KEY', key: 'k1'},
		]);
	});

	it('setActiveKeys', function () {
		actions.setActiveKeys({SET_ACTIVE_KEYS: 'SET_ACTIVE_KEYS'})(['k1', 'k2'])(
			dispatch
		);

		assert.deepStrictEqual(dispatchedActions, [
			{type: 'SET_ACTIVE_KEYS', keys: ['k1', 'k2']},
		]);
	});

	describe('receiveUpdated', function () {
		it('no updates', function () {
			const getSubState = state => state.sub;
			const getState = () => ({
				sub: {},
			});
			const result = {data: {users: []}};

			actions.receiveUpdated(
				getSubState,
				{},
				result,
				'users',
				'user'
			)(dispatch, getState);

			assert.deepStrictEqual(dispatchedActions, []);
		});

		it('some updates', function () {
			const getSubState = state => state.sub;
			const getState = () => ({
				sub: {
					editedByKey: {
						k1: {
							key: 'k1',
							data: {
								propScalarSame: 'propScalarSame',
								propScalarChanged: 'propScalarChanged',
								propObjSame: {same: 'same'},
								propObjChanged: {changed: 'changed'},
								propArrSame: ['same'],
								propArrChanged: ['changed'],
							},
						},
					},
				},
			});
			const result = {
				data: {
					users: [
						{
							key: 'k1',
							data: {
								propScalarSame: 'propScalarSame',
								propScalarChanged: 'propScalarChanged2',
								propObjSame: {same: 'same'},
								propObjChanged: {changed: 'changed2'},
								propArrSame: ['same'],
								propArrChanged: ['changed2'],
							},
						},
					],
				},
			};

			actions.receiveUpdated(
				getSubState,
				{ADD: 'ADD', EDITED: {REMOVE_PROPERTY: 'REMOVE_PROPERTY'}},
				result,
				'users',
				'user'
			)(dispatch, getState);

			assert.deepStrictEqual(dispatchedActions, [
				{
					type: 'ADD',
					filter: undefined,
					data: [
						{
							key: 'k1',
							data: {
								propScalarSame: 'propScalarSame',
								propScalarChanged: 'propScalarChanged2',
								propObjSame: {same: 'same'},
								propObjChanged: {changed: 'changed2'},
								propArrSame: ['same'],
								propArrChanged: ['changed2'],
							},
						},
					],
				},
				{
					key: 'k1',
					property: 'propScalarSame',
					type: 'REMOVE_PROPERTY',
				},
				{key: 'k1', property: 'propObjSame', type: 'REMOVE_PROPERTY'},
				{key: 'k1', property: 'propArrSame', type: 'REMOVE_PROPERTY'},
			]);
		});
	});

	it('receiveIndexed', function () {
		actions.receiveIndexed(
			{ADD: 'ADD', INDEX: {ADD: 'ADD_INDEX'}},
			{
				data: {users: [{key: 'k1'}]},
				total: 1,
				changes: {
					users: '2020-01-01',
				},
			},
			'users',
			'fil',
			'asc',
			1
		)(dispatch);

		assert.deepStrictEqual(dispatchedActions, [
			{
				type: 'ADD',
				data: [{key: 'k1'}],
				filter: 'fil',
			},
			{
				type: 'ADD_INDEX',
				count: 1,
				changedOn: '2020-01-01',
				filter: 'fil',
				order: 'asc',
				start: 1,
				data: [{key: 'k1'}],
			},
		]);
	});

	it('receiveKeys', function () {
		actions.receiveKeys(
			{ADD: 'ADD', ADD_UNRECEIVED: 'ADD_UNRECEIVED'},
			{data: {users: [{key: 'k1'}]}},
			'users',
			['k1', 'k2']
		)(dispatch);

		assert.deepStrictEqual(dispatchedActions, [
			{type: 'ADD', data: [{key: 'k1'}], filter: undefined},
			{type: 'ADD_UNRECEIVED', keys: ['k2']},
		]);
	});

	it('refreshUses', function () {
		const getSubState = state => state.sub;
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: '',
				},
			},
			sub: {
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
				'http://localhost/rest/user/filtered/users',
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

		return actions
			.refreshUses(
				getSubState,
				'users',
				{INDEX: {CLEAR_ALL: 'CLEAR_ALL', ADD: 'ADD'}},
				'user'
			)()(dispatch, getState)
			.then(function () {
				return runFunctionActions({dispatch, getState});
			})
			.then(function () {
				assert.deepStrictEqual(dispatchedActions, [
					{type: 'CLEAR_ALL'},
					{
						filter: {name: 'fil'},
						order: 'asc',
						count: 2,
						start: 1,
						data: {k1: {}, k2: {}},
						changedOn: '2020-01-01',
						type: 'ADD',
					},
				]);
			});
	});

	it('saveEdited', function () {
		const getSubState = state => state.sub;
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: '',
				},
			},
			sub: {
				byKey: {k1: {key: 'k1'}},
				editedByKey: {k1: {key: 'k1', data: {prop: 'val'}}},
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
			assert.strictEqual('http://localhost/rest/user', slash(url));
			assert.deepStrictEqual(options, {
				body: JSON.stringify({
					data: {users: [{key: 'k1', data: {prop: 'val'}}]},
				}),
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'PUT',
			});

			const body = {
				data: {users: [{key: 'k1', data: {prop: 'val'}}]},
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

		return actions
			.saveEdited(
				getSubState,
				'users',
				{ADD: 'ADD', EDITED: {REMOVE_PROPERTY: 'REMOVE_PROPERTY'}},
				'user'
			)('k1')(dispatch, getState)
			.then(function () {
				return runFunctionActions({dispatch, getState});
			})
			.then(function () {
				assert.deepStrictEqual(dispatchedActions, [
					{
						type: 'ADD',
						data: [{key: 'k1', data: {prop: 'val'}}],
						filter: undefined,
					},
					{type: 'REMOVE_PROPERTY', key: 'k1', property: 'prop'},
				]);
			});
	});

	describe('updateSubstateFromView', function () {
		it('activeKey', function () {
			actions.updateSubstateFromView({SET_ACTIVE_KEY: 'SET_ACTIVE_KEY'})({
				activeKey: 'ak',
			})(dispatch);

			assert.deepStrictEqual(dispatchedActions, [
				{key: 'ak', type: 'SET_ACTIVE_KEY'},
			]);
		});

		it('activeKeys', function () {
			actions.updateSubstateFromView({
				SET_ACTIVE_KEYS: 'SET_ACTIVE_KEYS',
			})({
				activeKeys: ['k1', 'k2'],
			})(dispatch);

			assert.deepStrictEqual(dispatchedActions, [
				{keys: ['k1', 'k2'], type: 'SET_ACTIVE_KEYS'},
			]);
		});
	});

	it('updateEdited', function () {
		const getSubState = state => state.sub;
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: '',
				},
			},
			sub: {
				byKey: {k1: {key: 'k1'}},
				editedByKey: {k1: {key: 'k1', data: {prop: 'val'}}},
			},
		});
		actions.updateEdited(getSubState, {
			EDITED: {UPDATE: 'UPDATE'},
		})('users', 'k1', {
			key: 'k1',
			data: {prop: 'val'},
		})(dispatch, getState);

		assert.deepStrictEqual(dispatchedActions, [
			{
				type: 'UPDATE',
				data: [
					{
						key: 'users',
						data: {k1: {key: 'k1', data: {prop: 'val'}}},
					},
				],
			},
		]);
	});

	it('useKeys', function () {
		const getSubState = state => state.sub;
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
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: '',
				},
			},
			sub: {
				byKey: {k1: {key: 'k1'}, k2: {key: 'k2'}},
			},
		});

		return actions
			.useKeys(
				getSubState,
				'users',
				{
					USE: {KEYS: {REGISTER: 'REGISTER'}},
				},
				'user'
			)(
				['k1', 'k2'],
				'cid'
			)(dispatch)
			.then(function () {
				return runFunctionActions({dispatch, getState});
			})
			.then(function () {
				assert.deepStrictEqual(dispatchedActions, [
					{componentId: 'cid', keys: ['k1', 'k2'], type: 'REGISTER'},
				]);
			});
	});

	it('useKeysClear', function () {
		actions.useKeysClear({USE: {KEYS: {CLEAR: 'CLEAR'}}})('cid')(dispatch);

		assert.deepStrictEqual(dispatchedActions, [
			{componentId: 'cid', type: 'CLEAR'},
		]);
	});

	it('useIndexed', function () {
		const getSubState = state => state.sub;
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
			sub: {},
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
				'http://localhost/rest/user/filtered/users',
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

		return actions
			.useIndexed(
				getSubState,
				'users',
				{USE: {INDEXED: {REGISTER: 'REGISTER'}}, INDEX: {ADD: 'ADD'}},
				'user'
			)(
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
						type: 'REGISTER',
					},
					{
						filter: {name: 'fil'},
						order: 'asc',
						count: 2,
						start: 1,
						data: {k1: {}, k2: {}},
						changedOn: '2020-01-01',
						type: 'ADD',
					},
				]);
			});
	});

	it('clearIndex', function () {
		actions.clearIndex({INDEX: {CLEAR_INDEX: 'CLEAR_INDEX'}})('fil', 'asc')(
			dispatch
		);

		assert.deepStrictEqual(dispatchedActions, [
			{filter: 'fil', order: 'asc', type: 'CLEAR_INDEX'},
		]);
	});

	it('useIndexedRegister', function () {
		assert.deepStrictEqual(
			actions.useIndexedRegister(
				{USE: {INDEXED: {REGISTER: 'REGISTER'}}},
				'cid',
				{name: 'afil'},
				{name: 'fil'},
				'asc',
				1,
				5
			),
			{
				type: 'REGISTER',
				componentId: 'cid',
				filterByActive: {name: 'afil'},
				filter: {name: 'fil'},
				order: 'asc',
				start: 1,
				length: 5,
			}
		);
	});

	it('useIndexedClear', function () {
		actions.useIndexedClear({
			USE: {INDEXED: {CLEAR: 'CLEAR'}},
		})('cid')(dispatch);

		assert.deepStrictEqual(dispatchedActions, [
			{componentId: 'cid', type: 'CLEAR'},
		]);
	});

	it('useIndexedClearAll', function () {
		actions.useIndexedClearAll({
			USE: {INDEXED: {CLEAR_ALL: 'CLEAR_ALL'}},
		})()(dispatch);

		assert.deepStrictEqual(dispatchedActions, [{type: 'CLEAR_ALL'}]);
	});

	it('setInitial', function () {
		actions.setInitial({SET_INITIAL: 'SET_INITIAL'})()(dispatch);

		assert.deepStrictEqual(dispatchedActions, [{type: 'SET_INITIAL'}]);
	});

	it('actionDataSetOutdated', function () {
		assert.deepStrictEqual(actions.actionDataSetOutdated(), {
			type: 'COMMON.DATA.SET_OUTDATED',
		});
	});

	it('actionSetActiveKey', function () {
		actions.setActiveKey({SET_ACTIVE_KEY: 'SET_ACTIVE_KEY'})('k1')(dispatch);

		assert.deepStrictEqual(dispatchedActions, [
			{key: 'k1', type: 'SET_ACTIVE_KEY'},
		]);
	});
});
