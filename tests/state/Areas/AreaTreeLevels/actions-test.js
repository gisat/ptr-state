import {assert} from 'chai';
import slash from 'slash';
import actions from '../../../../src/state/Areas/AreaTreeLevels/actions';
import {resetFetch, setFetch} from '../../../../src/state/_common/request';

describe('state/Areas/AreaTreeLevels/actions', function () {
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

	it('ensureIndexesWithFilterByActive', function () {
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: 'backend',
				},
			},
			areas: {
				areaTrees: {
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
				'http://localhost/backend/rest/metadata/filtered/areaTreeLevels',
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
				data: {areaTreeLevels: {k1: {}, k2: {}, k3: {}, k4: {}}},
				total: 5,
				changes: {
					areaTreeLevels: '2020-01-01',
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
						type: 'AREAS.AREA_TREE_LEVELS.INDEX.ADD',
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
		const getSubState = (state) => state.sub;
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: 'backend',
				},
			},
			areas: {
				areaTreeLevels: {
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
				'http://localhost/backend/rest/metadata/filtered/areaTreeLevels',
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
				data: {areaTreeLevels: {k1: {}, k2: {}}},
				total: 2,
				changes: {
					areaTreeLevels: '2020-01-01',
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
					{type: 'AREAS.AREA_TREE_LEVELS.INDEX.CLEAR_ALL'},
					{
						filter: {name: 'fil'},
						order: 'asc',
						count: 2,
						start: 1,
						data: {k1: {}, k2: {}},
						changedOn: '2020-01-01',
						type: 'AREAS.AREA_TREE_LEVELS.INDEX.ADD',
					},
				]);
			});
	});

	it('setActiveKey', function () {
		actions.setActiveKey('k1')(dispatch);

		assert.deepStrictEqual(dispatchedActions, [
			{type: 'AREAS.AREA_TREE_LEVELS.SET_ACTIVE_KEY', key: 'k1'},
		]);
	});

	it('useIndexed', function () {
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
			areas: {
				areaTreeLevels: {},
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
				'http://localhost/backend/rest/metadata/filtered/areaTreeLevels',
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
				data: {areaTreeLevels: {k1: {}, k2: {}}},
				total: 2,
				changes: {
					areaTreeLevels: '2020-01-01',
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
						type: 'AREAS.AREA_TREE_LEVELS.USE.INDEXED.REGISTER',
					},
					{
						filter: {name: 'fil'},
						order: 'asc',
						count: 2,
						start: 1,
						data: {k1: {}, k2: {}},
						changedOn: '2020-01-01',
						type: 'AREAS.AREA_TREE_LEVELS.INDEX.ADD',
					},
				]);
			});
	});

	it('useIndexedClear', function () {
		assert.deepStrictEqual(actions.useIndexedClear('cid'), {
			type: 'AREAS.AREA_TREE_LEVELS.USE.INDEXED.CLEAR',
			componentId: 'cid',
		});
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
			areas: {
				areaTreeLevels: {
					byKey: {k1: {key: 'k1'}, k2: {key: 'k2'}},
				},
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
						type: 'AREAS.AREA_TREE_LEVELS.USE.KEYS.REGISTER',
					},
				]);
			});
	});
});
