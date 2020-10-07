import {assert} from 'chai';
import actions from '../../../../src/state/Data/SpatialData/actions';

describe('state/Data/SpatialData/actions', function () {
	let dispatchedActions = [];

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
				} else if (Array.isArray(action)) {
					dispatchedActions = [...dispatchedActions, ...action];
					dispatchedActions[i] = null;
				}
			}

			dispatchedActions = dispatchedActions.filter((a) => a != null);

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

	it('receiveIndexed', function () {
		const getState = () => ({
			data: {
				spatialData: {
					byDataSourceKey: null
				}
			}
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
        
        const result = [];
        const filter = {};
        const order = null;
        const level = 10;
        const changes = null;
		dispatch(actions.receiveIndexed(result, filter, level, order, changes));

		//empty array because of empty results
		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, []);
		});
	});

	it('receiveIndexed and addDataAction', function () {
		const getState = () => ({
			data: {
				spatialData: {
					byDataSourceKey: {}
				}
			}
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
        
        const results = {
			key1: {
				key:1,
				spatialIndex: {},
				data: {
					citizens: 1
				}
			}, 
			key2: {
				key:2,
				spatialIndex: {},
				data: {
					citizens: 2
				}
			}
		};

        const filter = {};
        const order = null;
        const level = 10;
        const changes = null;
		dispatch(actions.receiveIndexed(results, filter, level, order, changes));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
				    "data": {
						citizens: 1
					},
				    "key": "key1",
				    "type": "DATA.SPATIAL_DATA.ADD",  
				},
				{
				    "data": {
						citizens: 2
					},
				    "key": "key2",
				    "type": "DATA.SPATIAL_DATA.ADD",  
				},
				{
					type: 'DATA.SPATIAL_DATA.INDEX.ADD',
					spatialDataSourceKey: 'key1',
                    filter,
					order,
					level,
                    index: {},
                    changedOn: changes,
				},
				{
					type: 'DATA.SPATIAL_DATA.INDEX.ADD',
					spatialDataSourceKey: 'key2',
                    filter,
					order,
					level,
                    index: {},
                    changedOn: changes,
				}
			]);
		});
	});
	it('receiveIndexed add new data and update current data', function () {
		const getState = () => ({
			data: {
				spatialData: {
					byDataSourceKey: {
						"key1": {
							citizens: 4
						}
					}
				}
			}
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
        
        const results = {
			key1: {
				key: 'key1',
				spatialIndex: {},
				data: {
					citizens: 1
				}
			}, 
			key2: {
				key:'key2',
				spatialIndex: {},
				data: {
					citizens: 2
				}
			}
		};

        const filter = {};
        const order = null;
        const level = 10;
        const changes = null;
		dispatch(actions.receiveIndexed(results, filter, level, order, changes));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
				    "data": {
						citizens: 1
					},
				    "key": "key1",
				    "type": "DATA.SPATIAL_DATA.UPDATE",  
				},
				{
				    "data": {
						citizens: 2
					},
				    "key": "key2",
				    "type": "DATA.SPATIAL_DATA.ADD",  
				},
				{
					type: 'DATA.SPATIAL_DATA.INDEX.ADD',
					spatialDataSourceKey: 'key1',
                    filter,
					order,
					level,
                    index: {},
                    changedOn: changes,
				},
				{
					type: 'DATA.SPATIAL_DATA.INDEX.ADD',
					spatialDataSourceKey: 'key2',
                    filter,
					order,
					level,
                    index: {},
                    changedOn: changes,
				}
			]);
		});
	});
});
