import {assert} from 'chai';
import getStoreSet from '../../../../store';
import actions from '../../../../../src/state/Data/SpatialData/actions';

describe('state/Data/SpatialData/actions/receiveIndexed', function () {
	it('Dispatch nothing, because spatialData are undefined', function () {
		const storeHelpers = getStoreSet();
		const getState = () => {
			return () => ({});
		};
		const dispatch = storeHelpers.getDispatch(getState);
		const spatialData = undefined;

		const attributeDataFilter = {appKey: 'testKey'};
		const order = null;
		const changedOn = null;

		dispatch(
			actions.receiveIndexed(spatialData, attributeDataFilter, order, changedOn)
		);
		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepEqual(storeHelpers.getDispatchedActions(), []);
		});
	});

	it('Dispatch ADD_WITH_SPATIAL_INDEX one datasource', function () {
		const storeHelpers = getStoreSet();
		const getState = () => {
			return () => ({});
		};
		const dispatch = storeHelpers.getDispatch(getState);
		const spatialData = {
			'85e35be5-1706-402a-86ad-851397bae7aa': {
				data: {
					18502: {
						type: 'MultiPolygon',
						coordinates: [
							[
								[
									[2.50647283, 50.63433838],
									[2.5012393, 50.63986206],
									[2.50829029, 50.64472198],
									[2.50647283, 50.63433838],
								],
							],
						],
					},
				},
				spatialIndex: {
					7: {
						'0,1': [18502],
					},
				},
			},
		};

		const attributeDataFilter = {appKey: 'testKey'};
		const order = null;
		const changedOn = null;

		dispatch(
			actions.receiveIndexed(spatialData, attributeDataFilter, order, changedOn)
		);
		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'DATA.SPATIAL_DATA.ADD_WITH_INDEX',
					dataByDataSourceKey: {
						'85e35be5-1706-402a-86ad-851397bae7aa': {
							18502: {
								type: 'MultiPolygon',
								coordinates: [
									[
										[
											[2.50647283, 50.63433838],
											[2.5012393, 50.63986206],
											[2.50829029, 50.64472198],
											[2.50647283, 50.63433838],
										],
									],
								],
							},
						},
					},
					level: '7',
					filter: attributeDataFilter,
					order,
					indexData: [
						{
							7: {
								'0,1': {
									'85e35be5-1706-402a-86ad-851397bae7aa': [18502],
								},
							},
						},
					],
					changedOn,
				},
			]);
		});
	});

	it('Dispatch ADD_WITH_SPATIAL_INDEX two datasource', function () {
		const storeHelpers = getStoreSet();
		const getState = () => {
			return () => ({});
		};
		const dispatch = storeHelpers.getDispatch(getState);
		const spatialData = {
			'85e35be5-1706-402a-86ad-851397bae7aa': {
				data: {
					18502: {
						type: 'MultiPolygon',
						coordinates: [
							[
								[
									[2.50647283, 50.63433838],
									[2.5012393, 50.63986206],
									[2.50829029, 50.64472198],
									[2.50647283, 50.63433838],
								],
							],
						],
					},
				},
				spatialIndex: {
					7: {
						'0,1': [18502],
					},
				},
			},
			'd8e72383-d72e-4a62-b23b-cc240e198d2e': {
				data: {
					18503: {
						type: 'MultiPolygon',
						coordinates: [
							[
								[
									[2.50647283, 50.63433838],
									[2.5012393, 50.63986206],
									[2.50829029, 50.64472198],
									[2.50647283, 50.63433838],
								],
							],
						],
					},
				},
				spatialIndex: {
					7: {
						'0,1': [18503],
					},
				},
			},
		};

		const attributeDataFilter = {appKey: 'testKey'};
		const order = null;
		const changedOn = null;

		dispatch(
			actions.receiveIndexed(spatialData, attributeDataFilter, order, changedOn)
		);
		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepEqual(storeHelpers.getDispatchedActions(), [
				{
					type: 'DATA.SPATIAL_DATA.ADD_WITH_INDEX',
					dataByDataSourceKey: {
						'85e35be5-1706-402a-86ad-851397bae7aa': {
							18502: {
								type: 'MultiPolygon',
								coordinates: [
									[
										[
											[2.50647283, 50.63433838],
											[2.5012393, 50.63986206],
											[2.50829029, 50.64472198],
											[2.50647283, 50.63433838],
										],
									],
								],
							},
						},
						'd8e72383-d72e-4a62-b23b-cc240e198d2e': {
							18503: {
								type: 'MultiPolygon',
								coordinates: [
									[
										[
											[2.50647283, 50.63433838],
											[2.5012393, 50.63986206],
											[2.50829029, 50.64472198],
											[2.50647283, 50.63433838],
										],
									],
								],
							},
						},
					},
					level: '7',
					filter: attributeDataFilter,
					order,
					indexData: [
						{
							7: {
								'0,1': {
									'85e35be5-1706-402a-86ad-851397bae7aa': [18502],
									'd8e72383-d72e-4a62-b23b-cc240e198d2e': [18503],
								},
							},
						},
					],
					changedOn,
				},
			]);
		});
	});

	it('receiveIndexed and addDataWithIndex', function () {
		const storeHelpers = getStoreSet();

		const getState = () => ({
			data: {
				spatialData: {
					byDataSourceKey: {},
				},
			},
		});

		const dispatch = storeHelpers.getDispatch(getState);

		const results = {
			key1: {
				spatialIndex: {
					2: {
						'0,0': [1],
					},
				},
				data: {
					citizens: 1,
				},
			},
			key2: {
				spatialIndex: {
					2: {
						'0,1': [2],
					},
				},
				data: {
					citizens: 2,
				},
			},
		};

		const filter = {};
		const order = null;
		const changes = null;
		dispatch(actions.receiveIndexed(results, filter, order, changes));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), [
				{
					dataByDataSourceKey: {
						key1: {
							citizens: 1,
						},
						key2: {
							citizens: 2,
						},
					},
					level: '2',
					type: 'DATA.SPATIAL_DATA.ADD_WITH_INDEX',
					order: null,
					filter: {},
					changedOn: null,
					indexData: [
						{
							2: {
								'0,0': {
									key1: [1],
								},

								'0,1': {
									key2: [2],
								},
							},
						},
					],
				},
			]);
		});
	});

	it('receiveIndexed add new data and update current data', function () {
		const storeHelpers = getStoreSet();
		const getState = () => ({
			data: {
				spatialData: {
					byDataSourceKey: {
						key1: {
							citizens: 4,
						},
					},
				},
			},
		});

		const dispatch = storeHelpers.getDispatch(getState);

		const results = {
			key1: {
				spatialIndex: {
					2: {
						'0,0': [1],
					},
				},
				data: {
					citizens: 1,
				},
			},
			key2: {
				spatialIndex: {
					2: {
						'0,1': [2],
					},
				},
				data: {
					citizens: 2,
				},
			},
		};

		const filter = {};
		const order = null;
		const changes = null;
		dispatch(actions.receiveIndexed(results, filter, order, changes));

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), [
				{
					changedOn: null,
					dataByDataSourceKey: {
						key1: {
							citizens: 1,
						},
						key2: {
							citizens: 2,
						},
					},
					level: '2',
					order: null,
					type: 'DATA.SPATIAL_DATA.ADD_WITH_INDEX',
					filter: {},
					indexData: [
						{
							2: {
								'0,0': {
									key1: [1],
								},
								'0,1': {
									key2: [2],
								},
							},
						},
					],
				},
			]);
		});
	});
});
