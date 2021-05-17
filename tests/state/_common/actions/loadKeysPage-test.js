import {assert} from 'chai';
import {pick as _pick} from 'lodash';
import slash from 'slash';
import {utils} from '@gisatcz/ptr-utils';
import {resetFetch, setFetch} from '../../../../src/state/_common/request';
import commonActions from '../../../../src/state/_common/actions';
import getStoreSet from '../helpers/store';

const actionTypes = utils.deepKeyMirror({
	ADD: null,
	ADD_UNRECEIVED: null,
	DELETE: null,
	MARK_DELETED: null,
	EDITED: {
		REMOVE: null,
		REMOVE_ACTIVE: null,
		REMOVE_PROPERTY: null,
		UPDATE: null,
	},
	ENSURE: {
		ERROR: null,
	},
	INDEX: {
		ADD: null,
		CLEAR_INDEX: null,
		CLEAR_ALL: null,
	},
	LOAD: {
		ERROR: null,
		REQUEST: null,
	},
	SET_ACTIVE_KEY: null,
	UPDATE_STORE: null,
	USE: {
		INDEXED: {
			CLEAR: null,
			CLEAR_ALL: null,
			REGISTER: null,
		},
		KEYS: {
			CLEAR: null,
			REGISTER: null,
		},
	},
});

const tests = [
	{
		name: 'It compose and sent request for data defined by keys.',
		action: (actions, actionTypes, options) => {
			return (dispatch, getState) => {
				let action;
				const dataType = options.dataType;
				const keys = ['k1', 'k2'];
				const categoryPath = options.categoryPath;

				action = actions.loadKeysPage;
				return dispatch(action(dataType, actionTypes, keys, categoryPath));
			};
		},
		getState: dataType => () => ({
			app: {
				localConfiguration: {
					apiBackendProtocol: 'http',
					apiBackendHost: 'localhost',
					apiBackendPath: '',
				},
			},
		}),
		getOptions: params => {
			return {
				getSubstate: params.getSubstate,
				dataType: params.dataType,
				categoryPath: params.categoryPath,
			};
		},
		setFetch: (dataType, categoryPath) => (url, options) => {
			assert.strictEqual(
				`http://localhost/rest/${categoryPath}/filtered/${dataType}`,
				slash(url)
			);
			assert.deepStrictEqual(options, {
				body: JSON.stringify({
					filter: {key: {in: ['k1', 'k2']}},
				}),
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});

			const body = {
				data: {[dataType]: [{key: 'k1'}]},
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
		},
		dispatchedActions: [
			{type: 'ADD', filter: undefined, data: [{key: 'k1'}]},
			{keys: ['k2'], type: 'ADD_UNRECEIVED'},
		],
	},
];

const defaultGetState = () => ({});

describe('useIndexed', () => {
	const storeHelpers = getStoreSet();

	afterEach(function () {
		storeHelpers.clearDispatchedActions();
		resetFetch();
	});

	tests.forEach(test => {
		it(test.name, () => {
			const dataType = 'testStore';
			const getState = test.getState(dataType) || defaultGetState;
			debugger;
			const dispatch = storeHelpers.getDispatch(getState);
			const categoryPath = 'metadata';
			const options = {
				getSubstate: state => state[dataType],
				dataType,
				categoryPath,
			};

			if (test.setFetch) {
				setFetch(test.setFetch(dataType, categoryPath));
			}

			dispatch(test.action(commonActions, actionTypes, options));
			return storeHelpers.runFunctionActions({dispatch, getState}).then(() => {
				assert.deepStrictEqual(
					storeHelpers.getDispatchedActions(),
					test.dispatchedActions
				);
			});
		});
	});
});

export default tests;
