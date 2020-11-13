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
		const changes = null;
		dispatch(actions.receiveIndexed(result, filter, order, changes));

		const expectedResult = [
				{
				  "changedOn": null,
				  "count": null,
				  "data": [
				    {}
				  ],
				  "filter": {},
				  "order": null,
				  "start": 0,
				  "type": "DATA.SPATIAL_DATA.INDEX.ADD",
				}
		]

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
				    "key": "key1",
				    "level": "2",
				    "type": "DATA.SPATIAL_DATA.ADD",  
				},
				{
				    "data": {
						citizens: 2
					},
					"key": "key2",
					"level": "2",
				    "type": "DATA.SPATIAL_DATA.ADD",  
				},
				{
					type: 'DATA.SPATIAL_DATA.INDEX.ADD',
					start: 0,
                    filter,
					order,
					"count": null,
                    data: [
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
				      }],
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
					"key": "key1",
					"level": "2",
				    "type": "DATA.SPATIAL_DATA.ADD",  
				},
				{
				    "data": {
						citizens: 2
					},
					"key": "key2",
					"level": "2",
				    "type": "DATA.SPATIAL_DATA.ADD",  
				},
				{
					type: 'DATA.SPATIAL_DATA.INDEX.ADD',
                    filter,
					order,
					count: null,
					data: [
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
					],
					changedOn: changes,
					"start": 0,
				}
			]);
		});
	});
});
