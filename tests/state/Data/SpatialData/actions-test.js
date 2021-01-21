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

	it('Dispatch nothing if recieved data are empty', function () {
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
		const changes = null;
		dispatch(actions.receiveIndexed(result, filter, order, changes));

		const expectedResult = [];

		//empty array because of empty results
		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, expectedResult);
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
				spatialIndex: {
					2: {
						'0,0': [1]
					}
				},
				data: {
					citizens: 1
				}
			}, 
			key2: {
				spatialIndex: {
					2: {
						'0,1': [2]
					}
				},
				data: {
					citizens: 2
				}
			}
		};

        const filter = {};
        const order = null;
        const level = 10;
        const changes = null;
		dispatch(actions.receiveIndexed(results, filter, order, changes));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
				    "data": {
						citizens: 1
					},
				    "level": "2",
				    "dataSourceKey": "key1",
					"type": "DATA.SPATIAL_DATA.ADD_WITH_INDEX",
					"order": null,
					"spatialFilter": {},
					"changedOn": null,
					"indexeData": [
						{
				        "2": {
				          "0,0": {
				            "key1": [
				              1
				            ]
				          },
				        
				          "0,1": {
				            "key2": [
				              2
				            ]
				          }
				        }
				      }]
				},
				{
				    "data": {
						citizens: 2
					},
					"dataSourceKey": "key2",
					"type": "DATA.SPATIAL_DATA.ADD_WITH_INDEX",
					"changedOn": null,
					"order": null,
					"spatialFilter": {},
					"level": "2",
					"type": "DATA.SPATIAL_DATA.ADD_WITH_INDEX",  
					"indexeData": [
						{
				        "2": {
				          "0,0": {
				            "key1": [
				              1
				            ]
				          },
				        
				          "0,1": {
				            "key2": [
				              2
				            ]
				          }
				        }
				      }]
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
				spatialIndex: {
					2: {
						'0,0': [1]
					}
				},
				data: {
					citizens: 1
				}
			}, 
			key2: {
				spatialIndex: {
					2: {
						'0,1': [2]
					}
				},
				data: {
					citizens: 2
				}
			}
		};

        const filter = {};
        const order = null;
        const level = 10;
        const changes = null;
		dispatch(actions.receiveIndexed(results, filter, order, changes));

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					"changedOn": null,
				    "data": {
						citizens: 1
					},
					"level": "2",
					"order": null,
					"dataSourceKey": "key1",
					"type": "DATA.SPATIAL_DATA.ADD_WITH_INDEX",
					"spatialFilter": {},
					"indexeData": [
						{
				        "2": {
				          "0,0": {
				            "key1": [
				              1
				            ]
				          },
				          "0,1": {
				            "key2": [
				              2
				            ]
				          }
				        }
				      }
					]
				},
				{
					"changedOn": null,
				    "data": {
						citizens: 2
					},
					"level": "2",
					"order": null,
					"dataSourceKey": "key2",
					"type": "DATA.SPATIAL_DATA.ADD_WITH_INDEX",
					"spatialFilter": {},
					"indexeData": [
						{
				        "2": {
				          "0,0": {
				            "key1": [
				              1
				            ]
				          },
				          "0,1": {
				            "key2": [
				              2
				            ]
				          }
				        }
				      }
					]
				}
			]);
		});
	});
});
