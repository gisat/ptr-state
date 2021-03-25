import {assert} from 'chai';
import slash from 'slash';
import actions from '../../../../../src/state/Data/Components/actions';
import {resetFetch, setFetch} from '../../../../../src/state/_common/request';
import getStoreSet from '../../../_common/helpers/store';

// import {
// 	responseWithSpatialAndAttributeData,
// 	responseWithRelationsSpatialAndAttributeData,
// } from './mockData/mockData';

describe('state/Data/Components/actions/loadIndexedPage', function () {
	afterEach(function () {
		resetFetch();
	});

	it('dispatch nothing', function () {
		const storeHelpers = getStoreSet();

		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: 'backend',
					requestPageSize: 1,
				},
				data: {
					spatialData: {
						indexes: [],
					},
					attributeData: {
						indexes: [],
					},
				},
			},
		});

		const dispatch = storeHelpers.getDispatch(getState);

		setFetch(function (url, options) {
			assert.strictEqual(
				'http://localhost/backend/rest/attributeData/filtered',
				slash(url)
			);

			return Promise.resolve({
				ok: true,
				json: function () {
					return Promise.resolve({});
				},
				headers: {
					get: function (name) {
						return {'Content-type': 'application/json'}[name];
					},
				},
				data: options.body,
			});
		});

		const order = null;
		const commonFilter = {};
		const attributeDataFilterExtension = {};
		const loadRelations = null;
		const loadData = null;
		const relationsPagination = null;
		const attributeDataPagination = null;

		dispatch(
			actions.loadIndexedPage(
				order,
				commonFilter,
				attributeDataFilterExtension,
				loadRelations,
				loadData,
				relationsPagination,
				attributeDataPagination
			)
		);

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), [
				{type: 'ERROR'},
			]);
		});
	});

	it('dispatch nothing', function () {
		const storeHelpers = getStoreSet();

		const getState = () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: 'backend',
					requestPageSize: 1,
				},
				data: {
					spatialData: {
						indexes: [],
					},
					attributeData: {
						indexes: [],
					},
				},
			},
		});

		const dispatch = storeHelpers.getDispatch(getState);

		setFetch(function (url, options) {
			assert.strictEqual(
				'http://localhost/backend/rest/attributeData/filtered',
				slash(url)
			);

			return Promise.resolve({
				ok: true,
				json: function () {
					return Promise.resolve({});
				},
				headers: {
					get: function (name) {
						return {'Content-type': 'application/json'}[name];
					},
				},
				data: options.body,
			});
		});

		const order = null;
		const commonFilter = {};
		const attributeDataFilterExtension = {};
		const loadRelations = null;
		const loadData = null;
		const relationsPagination = null;
		const attributeDataPagination = null;

		dispatch(
			actions.loadIndexedPage(
				order,
				commonFilter,
				attributeDataFilterExtension,
				loadRelations,
				loadData,
				relationsPagination,
				attributeDataPagination
			)
		);

		return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
			assert.deepStrictEqual(storeHelpers.getDispatchedActions(), [
				{type: 'ERROR'},
			]);
		});
	});
});
