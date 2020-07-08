import {assert} from 'chai';
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

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					actions.action(test.actionTypes, test.type, test.payload),
					test.expectedAction
				);
			});
		});
	});

	describe('actionAdd', function () {
		const tests = [
			{
				name: 'single data',
				actionTypes: {ADD: 'ADD'},
				data: 'data',
				filter: 'filter',
				expectedAction: {type: 'ADD', data: ['data'], filter: 'filter'},
			},
			{
				name: 'multiple data',
				actionTypes: {ADD: 'ADD'},
				data: ['data'],
				filter: 'filter',
				expectedAction: {type: 'ADD', data: ['data'], filter: 'filter'},
			},
		];

		tests.forEach((test) => {
			it(test.name, function () {
				assert.deepStrictEqual(
					actions.actionAdd(test.actionTypes, test.data, test.filter),
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
		const getSubState = (state) => state.sub;
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
			assert.strictEqual('http://localhost/backend/rest/user', url);
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
		const getSubState = (state) => state.sub;
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
			assert.strictEqual('http://localhost/backend/rest/user', url);
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
		const getSubState = (state) => state.sub;
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
		const dispatch = (action) => {
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				dispatchedActions.push(res);

				return res;
			}

			dispatchedActions.push(action);
		};
		setFetch(function (url, options) {
			assert.strictEqual('http://localhost/backend/rest/user', url);
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
		const getSubState = (state) => state.sub;
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
				'http://localhost/backend/rest/user/filtered/users',
				url
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

	// ensureIndexed,
	// ensureIndexesWithFilterByActive,
	// ensureKeys,
	// loadAll,
	// loadFiltered,
	// useIndexedBatch,
	// loadIndexedPage,
	// loadKeysPage,
	// setActiveKey: creator(actionSetActiveKey),
	// setActiveKeyAndEnsureDependencies,
	// setActiveKeysAndEnsureDependencies,
	// setActiveKeys: creator(actionSetActiveKeys),
	// receiveUpdated,
	// receiveIndexed,
	// receiveKeys,
	// refreshUses,
	// removePropertyFromEdited,
	// request: requestWrapper,
	// saveEdited,
	// updateSubstateFromView,
	// updateEdited,
	// useKeys,
	// useKeysClear: creator(actionUseKeysClear),
	// useIndexed,
	// clearIndex: creator(actionClearIndex),
	// useIndexedRegister: actionUseIndexedRegister,
	// useIndexedClear: creator(actionUseIndexedClear),
	// useIndexedClearAll: creator(actionUseIndexedClearAll),
	// setInitial: creator(actionSetInitial),
	// actionDataSetOutdated,
	// actionSetActiveKey
});
