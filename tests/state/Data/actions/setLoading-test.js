import {assert} from 'chai';
import actions from '../../../../src/state/Data/actions';

describe('state/Data/actions/setLoading', function () {
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

	//
	// END OF SETTINGS
	//

	it('Set loading for spatial and attribute data', function () {
		const getState = () => ({
			data: {
				spatialData: {
					indexes: [],
				},
				attributeData: {
					indexes: [],
				},
			},
		});
		const dispatch = getDispatch(getState);

		const modifiers = {
			scopeKey: 'c81d59c8-0b4c-4df3-9c20-375f977660d3',
			placeKey: {
				in: [
					'8b65f2c9-bd6a-4d92-bc09-af604761f2f1',
					'9e28f519-dc30-4ebb-bcc8-97f696d9cf2a',
				],
			},
			caseKey: '4c2afea6-0964-458e-88a7-a65318554487',
			periodKey: '439af632-5804-4fc0-b641-a9c34cc6a853',
		};
		const styleKey = '460372b1-4fce-4676-92be-b1656a5415f5';
		const loadGeometry = true;
		const order = null;
		const layerTemplateKey = '11c7cc1b-9834-4e85-aba6-eab5571705e4';
		const spatialRelationsFilter = {
			layerTemplateKey: layerTemplateKey,
			modifiers: modifiers,
		};
		const attributeRelationsFilter = {
			...spatialRelationsFilter,
			styleKey,
		};
		const attributeDataFilter = {
			...attributeRelationsFilter,
			featureKeys: [18502],
		};

		const spatialIndex = {
			tiles: [[0, 0]],
		};
		const spatialFilter = {
			level: 9,
			tiles: [
				[0, 0],
				[90, 0],
			],
		};
		dispatch(
			actions.setLoading(
				attributeDataFilter,
				spatialIndex,
				spatialFilter,
				spatialRelationsFilter,
				order,
				loadGeometry
			)
		);

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					type: 'DATA.SPATIAL_DATA.INDEX.ADD',
					filter: {
						layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
						modifiers: {
							scopeKey: 'c81d59c8-0b4c-4df3-9c20-375f977660d3',
							placeKey: {
								in: [
									'8b65f2c9-bd6a-4d92-bc09-af604761f2f1',
									'9e28f519-dc30-4ebb-bcc8-97f696d9cf2a',
								],
							},
							caseKey: '4c2afea6-0964-458e-88a7-a65318554487',
							periodKey: '439af632-5804-4fc0-b641-a9c34cc6a853',
						},
					},
					order: null,
					indexData: [
						{
							9: {
								'0,0': true,
							},
						},
					],
					changedOn: null,
				},
				{
					type: 'DATA.ATTRIBUTE_DATA.SPATIAL_INDEX.ADD',
					filter: {
						layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
						modifiers: {
							scopeKey: 'c81d59c8-0b4c-4df3-9c20-375f977660d3',
							placeKey: {
								in: [
									'8b65f2c9-bd6a-4d92-bc09-af604761f2f1',
									'9e28f519-dc30-4ebb-bcc8-97f696d9cf2a',
								],
							},
							caseKey: '4c2afea6-0964-458e-88a7-a65318554487',
							periodKey: '439af632-5804-4fc0-b641-a9c34cc6a853',
						},
						styleKey: '460372b1-4fce-4676-92be-b1656a5415f5',
						featureKeys: [18502],
					},
					order: null,
					indexData: [
						{
							9: {
								'0,0': true,
							},
						},
					],
					changedOn: null,
				},
			]);
		});
	});
	it('Set loading for attribute data', function () {
		const getState = () => ({
			data: {
				attributeData: {
					indexes: [],
				},
				spatialData: {
					indexes: [],
				},
			},
		});

		const dispatch = getDispatch(getState);

		const modifiers = {
			scopeKey: 'c81d59c8-0b4c-4df3-9c20-375f977660d3',
			placeKey: {
				in: [
					'8b65f2c9-bd6a-4d92-bc09-af604761f2f1',
					'9e28f519-dc30-4ebb-bcc8-97f696d9cf2a',
				],
			},
			caseKey: '4c2afea6-0964-458e-88a7-a65318554487',
			periodKey: '439af632-5804-4fc0-b641-a9c34cc6a853',
		};
		const styleKey = '460372b1-4fce-4676-92be-b1656a5415f5';
		const loadGeometry = false;
		const order = null;
		const layerTemplateKey = '11c7cc1b-9834-4e85-aba6-eab5571705e4';
		const spatialRelationsFilter = {
			layerTemplateKey: layerTemplateKey,
			modifiers: modifiers,
		};
		const attributeRelationsFilter = {
			...spatialRelationsFilter,
			styleKey,
		};
		const attributeDataFilter = {
			...attributeRelationsFilter,
			featureKeys: [18502],
		};

		const spatialIndex = {
			tiles: [[0, 0]],
		};
		const spatialFilter = {
			level: 9,
			tiles: [
				[0, 0],
				[90, 0],
			],
		};
		dispatch(
			actions.setLoading(
				attributeDataFilter,
				spatialIndex,
				spatialFilter,
				spatialRelationsFilter,
				order,
				loadGeometry
			)
		);

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, [
				{
					type: 'DATA.ATTRIBUTE_DATA.SPATIAL_INDEX.ADD',
					filter: {
						layerTemplateKey: '11c7cc1b-9834-4e85-aba6-eab5571705e4',
						modifiers: {
							scopeKey: 'c81d59c8-0b4c-4df3-9c20-375f977660d3',
							placeKey: {
								in: [
									'8b65f2c9-bd6a-4d92-bc09-af604761f2f1',
									'9e28f519-dc30-4ebb-bcc8-97f696d9cf2a',
								],
							},
							caseKey: '4c2afea6-0964-458e-88a7-a65318554487',
							periodKey: '439af632-5804-4fc0-b641-a9c34cc6a853',
						},
						styleKey: '460372b1-4fce-4676-92be-b1656a5415f5',
						featureKeys: [18502],
					},
					order: null,
					indexData: [
						{
							9: {
								'0,0': true,
							},
						},
					],
					changedOn: null,
				},
			]);
		});
	});
	it('Do not dispatch any action cause tiles are empty', function () {
		const getState = () => ({
			data: {
				attributeData: {
					indexes: [],
				},
				spatialData: {
					indexes: [],
				},
			},
		});
		const dispatch = getDispatch(getState);

		const modifiers = {
			scopeKey: 'c81d59c8-0b4c-4df3-9c20-375f977660d3',
			placeKey: {
				in: [
					'8b65f2c9-bd6a-4d92-bc09-af604761f2f1',
					'9e28f519-dc30-4ebb-bcc8-97f696d9cf2a',
				],
			},
			caseKey: '4c2afea6-0964-458e-88a7-a65318554487',
			periodKey: '439af632-5804-4fc0-b641-a9c34cc6a853',
		};
		const styleKey = '460372b1-4fce-4676-92be-b1656a5415f5';
		const loadGeometry = false;
		const order = null;
		const layerTemplateKey = '11c7cc1b-9834-4e85-aba6-eab5571705e4';
		const spatialRelationsFilter = {
			layerTemplateKey: layerTemplateKey,
			modifiers: modifiers,
		};
		const attributeRelationsFilter = {
			...spatialRelationsFilter,
			styleKey,
		};
		const attributeDataFilter = {
			...attributeRelationsFilter,
			featureKeys: [18502],
		};

		const spatialIndex = {
			tiles: [],
		};
		const spatialFilter = {
			level: 9,
			tiles: [],
		};
		dispatch(
			actions.setLoading(
				attributeDataFilter,
				spatialIndex,
				spatialFilter,
				spatialRelationsFilter,
				order,
				loadGeometry
			)
		);

		return runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(dispatchedActions, []);
		});
	});
});
