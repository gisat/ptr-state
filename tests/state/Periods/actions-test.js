import {assert} from 'chai';
import actions from '../../../src/state/Periods/actions';
import {resetFetch, setFetch} from '../../../src/state/_common/request';
import slash from 'slash';

describe('state/Periods/actions', function () {
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
			{type: 'PERIODS.ADD', data: ['data'], filter: 'filter'},
		]);
	});

	it('create', function () {
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: '',
				},
			},
			periods: {
				indexes: [{filter: {applicationKey: 'ak'}}],
			},
		});
		setFetch(function (url, options) {
			assert.strictEqual(
				'http://localhost/backend/rest/metadata',
				slash(url)
			);
			assert.deepStrictEqual(options, {
				body: JSON.stringify({
					data: {
						periods: [{key: 'k1', data: {applicationKey: 'ak'}}],
					},
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
			.create('k1', 'ak')(dispatch, getState)
			.then(function () {
				return runFunctionActions({dispatch, getState});
			})
			.then(function () {
				assert.deepStrictEqual(dispatchedActions, [
					{
						type: 'PERIODS.ADD',
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
						type: 'PERIODS.INDEX.CLEAR_INDEX',
						filter: {
							applicationKey: 'ak',
						},
						order: undefined,
					},
				]);
			});
	});

	it('delete', function () {
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: '',
				},
			},
			periods: {},
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
			assert.strictEqual(
				'http://localhost/backend/rest/metadata',
				slash(url)
			);
			assert.deepStrictEqual(options, {
				body: JSON.stringify({
					data: {periods: [{key: 'k1'}]},
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
			.delete({key: 'k1'})(dispatch, getState)
			.then(function () {
				return runFunctionActions({dispatch, getState});
			})
			.then(function () {
				delete dispatchedActions[0]['date'];
				assert.deepStrictEqual(dispatchedActions, [
					{
						key: 'k1',
						type: 'PERIODS.MARK_DELETED',
					},
					{
						type: 'COMMON.EDITED.REMOVE_PROPERTY_VALUES',
						dataType: 'periods',
						keys: ['k1'],
					},
				]);
			});
	});

	it('ensureIndexesWithFilterByActive', function () {
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: '',
				},
			},
			periods: {
				inUse: {
					indexes: [
						[
							{
								filterByActive: {name: 'fil'},
								filter: {
									name: 'fil',
								},
								order: 'asc',
								start: 1,
								length: 5,
							},
						],
					],
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
				'http://localhost/backend/rest/metadata/filtered/periods',
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
				data: {periods: {k1: {}, k2: {}, k3: {}, k4: {}}},
				total: 5,
				changes: {
					periods: '2020-01-01',
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
			.ensureIndexesWithFilterByActive({name: 'fil'})(dispatch, getState)
			.then(function () {
				return runFunctionActions({dispatch, getState});
			})
			.then(function () {
				assert.deepStrictEqual(dispatchedActions, [
					{
						type: 'PERIODS.INDEX.ADD',
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

	it('refreshUses', function () {
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: '',
				},
			},
			periods: {
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
				'http://localhost/backend/rest/metadata/filtered/periods',
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
				data: {periods: {k1: {}, k2: {}}},
				total: 2,
				changes: {
					periods: '2020-01-01',
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
			.refreshUses()(dispatch, getState)
			.then(function () {
				return runFunctionActions({dispatch, getState});
			})
			.then(function () {
				assert.deepStrictEqual(dispatchedActions, [
					{type: 'PERIODS.INDEX.CLEAR_ALL'},
					{
						filter: {name: 'fil'},
						order: 'asc',
						count: 2,
						start: 1,
						data: {k1: {}, k2: {}},
						changedOn: '2020-01-01',
						type: 'PERIODS.INDEX.ADD',
					},
				]);
			});
	});

	it('saveEdited', function () {
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: '',
				},
			},
			periods: {
				byKey: {k1: {key: 'k1'}},
				editedByKey: {k1: {key: 'k1', data: {prop: 'val'}}},
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
				'http://localhost/backend/rest/metadata',
				slash(url)
			);
			assert.deepStrictEqual(options, {
				body: JSON.stringify({
					data: {periods: [{key: 'k1', data: {prop: 'val'}}]},
				}),
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'PUT',
			});

			const body = {
				data: {periods: [{key: 'k1', data: {prop: 'val'}}]},
				total: 2,
				changes: {
					periods: '2020-01-01',
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
			.saveEdited('k1')(dispatch, getState)
			.then(function () {
				return runFunctionActions({dispatch, getState});
			})
			.then(function () {
				assert.deepStrictEqual(dispatchedActions, [
					{
						type: 'PERIODS.ADD',
						data: [{key: 'k1', data: {prop: 'val'}}],
						filter: undefined,
					},
					{
						type: 'PERIODS.EDITED.REMOVE_PROPERTY',
						key: 'k1',
						property: 'prop',
					},
				]);
			});
	});

	it('updateEdited', function () {
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: '',
				},
			},
			periods: {
				byKey: {k1: {key: 'k1'}},
				editedByKey: {k1: {key: 'k1', data: {prop: 'val'}}},
			},
		});
		actions.updateEdited('users', 'k1', {
			key: 'k1',
			data: {prop: 'val'},
		})(dispatch, getState);

		assert.deepStrictEqual(dispatchedActions, [
			{
				type: 'PERIODS.EDITED.UPDATE',
				data: [
					{
						key: 'users',
						data: {k1: {key: 'k1', data: {prop: 'val'}}},
					},
				],
			},
		]);
	});

	describe('updateStateFromView', function () {
		it('activeKey', function () {
			actions.updateStateFromView({
				activeKey: 'ak',
			})(dispatch);

			assert.deepStrictEqual(dispatchedActions, [
				{key: 'ak', type: 'PERIODS.SET_ACTIVE_KEY'},
			]);
		});

		it('activeKeys', function () {
			actions.updateStateFromView({
				activeKeys: ['k1', 'k2'],
			})(dispatch);

			assert.deepStrictEqual(dispatchedActions, [
				{keys: ['k1', 'k2'], type: 'PERIODS.SET_ACTIVE_KEYS'},
			]);
		});
	});

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
				'http://localhost/backend/rest/metadata/filtered/periods',
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
				data: {periods: {k1: {}, k2: {}}},
				total: 2,
				changes: {
					periods: '2020-01-01',
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
						type: 'PERIODS.USE.INDEXED.REGISTER',
					},
					{
						filter: {name: 'fil'},
						order: 'asc',
						count: 2,
						start: 1,
						data: {k1: {}, k2: {}},
						changedOn: '2020-01-01',
						type: 'PERIODS.INDEX.ADD',
					},
				]);
			});
	});

	it('useIndexedClear', function () {
		actions.useIndexedClear('cid')(dispatch);

		assert.deepStrictEqual(dispatchedActions, [
			{componentId: 'cid', type: 'PERIODS.USE.INDEXED.CLEAR'},
		]);
	});

	it('useKeys', function () {
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
					apiBackendPath: '',
				},
			},
			periods: {
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
						type: 'PERIODS.USE.KEYS.REGISTER',
					},
				]);
			});
	});

	it('useKeysClear', function () {
		actions.useKeysClear('cid')(dispatch);

		assert.deepStrictEqual(dispatchedActions, [
			{componentId: 'cid', type: 'PERIODS.USE.KEYS.CLEAR'},
		]);
	});
});
