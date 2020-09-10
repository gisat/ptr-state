import {assert} from 'chai';
import actions from '../../../src/state/SpatialRelations/actions';
import {resetFetch, setFetch} from '../../../src/state/_common/request';
import slash from 'slash';

describe('state/SpatialRelations/actions', function () {
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
			{type: 'SPATIAL_RELATIONS.ADD', data: ['data'], filter: 'filter'},
		]);
	});

	it('useIndexedRegister', function () {
		assert.deepStrictEqual(
			actions.useIndexedRegister(
				'cid',
				{name: 'afil'},
				{name: 'fil'},
				'asc',
				1,
				5
			),
			{
				type: 'SPATIAL_RELATIONS.USE.INDEXED.REGISTER',
				componentId: 'cid',
				filterByActive: {name: 'afil'},
				filter: {name: 'fil'},
				order: 'asc',
				start: 1,
				length: 5,
			}
		);
	});

	it('useIndexedClearAll', function () {
		actions.useIndexedClearAll()(dispatch);

		assert.deepStrictEqual(dispatchedActions, [
			{type: 'SPATIAL_RELATIONS.USE.INDEXED.CLEAR_ALL'},
		]);
	});

	describe('ensureIndexed', function () {
		it('already loaded', function () {
			const getState = () => ({
				app: {
					localConfiguration: {
						apiBackendProtocol: 'http',
						apiBackendHost: 'localhost',
						apiBackendPath: '',
					},
				},
				spatialRelations: {
					indexes: [
						{
							filter: {name: 'fil'},
							order: 'asc',
							count: 5,
							changedOn: '2020-01-01',
							index: ['k1', 'k2', 'k3', 'k4', 'k5'],
						},
					],
				},
			});

			actions
				.ensureIndexed(
					{name: 'fil'},
					'asc',
					0,
					5
				)(dispatch, getState)
				.then(function () {
					return runFunctionActions({dispatch, getState});
				})
				.then(function () {
					assert.deepStrictEqual(dispatchedActions, []);
				});
		});

		it('missing keys', function () {
			const getState = () => ({
				app: {
					localConfiguration: {
						apiBackendProtocol: 'http',
						apiBackendHost: 'localhost',
						apiBackendPath: '',
					},
				},
				spatialRelations: {
					indexes: [
						{
							filter: {name: 'fil'},
							order: 'asc',
							count: 5,
							changedOn: '2020-01-01',
							index: [null, 'k1', 'k2', 'k3'],
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
					'http://localhost/backend/rest/relations/filtered/spatial',
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
					data: {spatial: {k3: {}, k4: {}}},
					total: 5,
					changes: {
						spatial: '2020-01-01',
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
					{name: 'fil'},
					'asc',
					1,
					5
				)(dispatch, getState)
				.then(function () {
					return runFunctionActions({dispatch, getState});
				})
				.then(function () {
					assert.deepStrictEqual(dispatchedActions, [
						{
							type: 'SPATIAL_RELATIONS.INDEX.ADD',
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
			const getState = () => ({
				app: {
					localConfiguration: {
						apiBackendProtocol: 'http',
						apiBackendHost: 'localhost',
						apiBackendPath: '',
					},
				},
				spatialRelations: {
					indexes: [],
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
					'http://localhost/backend/rest/relations/filtered/spatial',
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
					data: {spatial: {k1: {}, k2: {}, k3: {}, k4: {}}},
					total: 5,
					changes: {
						spatial: '2020-01-01',
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
					{name: 'fil'},
					'asc',
					1,
					5
				)(dispatch, getState)
				.then(function () {
					return runFunctionActions({dispatch, getState});
				})
				.then(function () {
					assert.deepStrictEqual(dispatchedActions, [
						{
							type: 'SPATIAL_RELATIONS.INDEX.ADD',
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

	it('ensureIndexesWithFilterByActive', function () {
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: '',
				},
			},
			spatialRelations: {
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
				'http://localhost/backend/rest/relations/filtered/spatial',
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
				data: {spatial: {k1: {}, k2: {}, k3: {}, k4: {}}},
				total: 5,
				changes: {
					spatial: '2020-01-01',
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

		dispatch(actions.ensureIndexesWithFilterByActive({name: 'fil'}));

		return runFunctionActions({dispatch, getState}).then(function () {
			assert.deepStrictEqual(dispatchedActions, [
				{
					type: 'SPATIAL_RELATIONS.INDEX.ADD',
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
