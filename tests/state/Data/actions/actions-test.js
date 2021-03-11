import {assert} from 'chai';
import slash from 'slash';
import actions from '../../../../src/state/Data/actions';
import {resetFetch, setFetch} from '../../../../src/state/_common/request';

import {
	responseWithSpatialAndAttributeData,
	responseWithRelationsSpatialAndAttributeData,
} from './mockData';

describe('state/Data/actions', function () {
	let dispatchedActions = [];

	const clearDispatchedActions = function () {
		dispatchedActions = [];
	};

	const getDispatch = getState => {
		return action => {
			const dispatch = getDispatch(getState);
			if (typeof action === 'function') {
				const res = action(dispatch, getState);
				if (res != null) {
					dispatchedActions.push(res);
				}

				return res;
			}

			dispatchedActions.push(action);
		};
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

			dispatchedActions = dispatchedActions.filter(a => a != null);

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

	describe('getRestRelationsPages', function () {
		it('No page is missing', function () {
			assert.strictEqual(actions.getRestRelationsPages(100, 100, 100), 0);
		});

		it('One page is missing for attributeRelations', function () {
			assert.strictEqual(actions.getRestRelationsPages(101, 100, 100), 1);
		});
		it('One page is missing for spatialRelations', function () {
			assert.strictEqual(actions.getRestRelationsPages(100, 101, 100), 1);
		});

		it('Two page are missing for spatialRelations while spatialRelations is 299', function () {
			assert.strictEqual(actions.getRestRelationsPages(100, 299, 100), 2);
		});

		it('Two page are missing for spatialRelations while spatialRelations is 300', function () {
			assert.strictEqual(actions.getRestRelationsPages(100, 300, 100), 2);
		});

		it('No page is missing cause no data are required.', function () {
			assert.strictEqual(actions.getRestRelationsPages(0, 0, 100), 0);
		});
	});

	describe('loadMissingRelationsAndData', function () {
		it('dispatch nothing', function () {
			const getState = () => ({});
			const dispatch = getDispatch(getState);

			const loadGeometry = null;
			const spatialFilterWithMissingTiles = null;
			const styleKey = null;
			const order = null;
			const spatialRelationsFilter = null;
			const attributeRelationsFilter = null;
			const attributeRelationsCount = null;
			const spatialRelationsCount = null;
			const preloadSpatialDataSources = null;
			const attributeDataFilter = null;
			dispatch(
				actions.loadMissingRelationsAndData(
					loadGeometry,
					spatialFilterWithMissingTiles,
					styleKey,
					order,
					spatialRelationsFilter,
					attributeRelationsFilter,
					attributeRelationsCount,
					spatialRelationsCount,
					preloadSpatialDataSources,
					attributeDataFilter
				)
			);

			return runFunctionActions({dispatch, getState}).then(() => {
				assert.deepStrictEqual(dispatchedActions, []);
			});
		});

		// 	it('dispatch ', function () {
		// 		const getState = () => ({});
		// 		const dispatch = getDispatch(getState);

		// 		const loadGeometry = null;
		// 		const spatialFilterWithMissingTiles = null;
		// 		const styleKey = null;
		// 		const order = null;
		// 		const spatialRelationsFilter = null;
		// 		const attributeRelationsFilter = null;
		// 		const attributeRelationsCount = 101;
		// 		const spatialRelationsCount = null;
		// 		const preloadSpatialDataSources = null;
		// 		const attributeDataFilter = null;
		// 		dispatch(
		// 			actions.loadMissingRelationsAndData(loadGeometry,
		// 				spatialFilterWithMissingTiles,
		// 				styleKey,
		// 				order,
		// 				spatialRelationsFilter,
		// 				attributeRelationsFilter,
		// 				attributeRelationsCount,
		// 				spatialRelationsCount,
		// 				preloadSpatialDataSources,
		// 				attributeDataFilter)
		// 		);

		// 		return runFunctionActions({dispatch, getState}).then(() => {
		// 			assert.deepStrictEqual(dispatchedActions, [
		// 				// {
		// 				// 	type: 'DATA.SPATIAL_RELATIONS.INDEX.ADD',
		// 				// 	filter,
		// 				// 	order,
		// 				// 	start,
		// 				// 	count: total,
		// 				// 	data: result,
		// 				// 	changedOn: changes,
		// 				// },
		// 			]);
		// 		});
		// 	});
	});
});
