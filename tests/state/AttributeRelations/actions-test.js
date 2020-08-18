import {assert} from 'chai';
import slash from 'slash';
import actions from '../../../src/state/AttributeRelations/actions';
import {resetFetch, setFetch} from '../../../src/state/_common/request';

describe('state/AttributeRelations/actions', function () {
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
			attributeRelations: {},
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
						type: 'ATTRIBUTE_RELATIONS.USE.INDEXED.REGISTER',
					},
					{
						filter: {name: 'fil'},
						order: 'asc',
						count: 2,
						start: 1,
						data: {k1: {}, k2: {}},
						changedOn: '2020-01-01',
						type: 'ATTRIBUTE_RELATIONS.INDEX.ADD',
					},
				]);
			});
	});

	it('useIndexedClearAll', function () {
		actions.useIndexedClearAll()(dispatch);

		assert.deepStrictEqual(dispatchedActions, [
			{type: 'ATTRIBUTE_RELATIONS.USE.INDEXED.CLEAR_ALL'},
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
				type: 'ATTRIBUTE_RELATIONS.USE.INDEXED.REGISTER',
				componentId: 'cid',
				filterByActive: {name: 'afil'},
				filter: {name: 'fil'},
				order: 'asc',
				start: 1,
				length: 5,
			}
		);
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
				attributeRelations: {
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
				attributeRelations: {
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
					'http://localhost/backend/rest/relations/filtered/attribute',
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
					data: {attribute: {k3: {}, k4: {}}},
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
							type: 'ATTRIBUTE_RELATIONS.INDEX.ADD',
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
				attributeRelations: {
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
					'http://localhost/backend/rest/relations/filtered/attribute',
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
							type: 'ATTRIBUTE_RELATIONS.INDEX.ADD',
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
			attributeRelations: {
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
				'http://localhost/backend/rest/relations/filtered/attribute',
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

		actions.ensureIndexesWithFilterByActive({name: 'fil'})(
			dispatch,
			getState
		);

		return runFunctionActions({dispatch, getState}).then(function () {
			assert.deepStrictEqual(dispatchedActions, [
				{
					type: 'ATTRIBUTE_RELATIONS.INDEX.ADD',
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

	it('ensureIndexedSpecific', function () {
		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: '',
				},
			},
			attributeRelations: {
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
				'http://localhost/backend/rest/relations/filtered/attribute',
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

		actions.ensureIndexedSpecific(
			{name: 'fil'},
			'asc',
			1,
			5,
			'cid',
			true
		)(dispatch, getState);

		return runFunctionActions({dispatch, getState}).then(function () {
			assert.deepStrictEqual(dispatchedActions, [
				{
					type: 'ATTRIBUTE_RELATIONS.INDEX.ADD',
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
