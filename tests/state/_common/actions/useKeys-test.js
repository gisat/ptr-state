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
		name: 'It register requested keys and loads them.',
		action: (actions, actionTypes, options) => {
			return (dispatch, getState) => {
				const keys = ['k1', 'k2'];
				const componentId = 'placeSelect';
				const action = actions.useKeys(
					options.getSubstate,
					options.dataType,
					actionTypes,
					options.categoryPath
				);
				return dispatch(action(keys, componentId));
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
			[dataType]: {
				byKey: {
					k2: {key: 'k2'},
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
					filter: {key: {in: ['k1']}},
				}),
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});

			return Promise.resolve({
				ok: true,
				json: function () {
					return Promise.resolve({data: {[dataType]: [{key: 'k1'}]}});
				},
				headers: {
					get: function (name) {
						return {'Content-type': 'application/json'}[name];
					},
				},
				data: options.body,
			});
		},
		dispatchedActions: [
			{
				type: 'USE.KEYS.REGISTER',
				componentId: 'placeSelect',
				keys: ['k1', 'k2'],
			},
			{
				type: 'ADD',
				filter: undefined,
				data: [
					{
						key: 'k1',
					},
				],
			},
		],
	},
	{
		name: 'It register requested keys and don`t loads them.',
		action: (actions, actionTypes, options) => {
			return (dispatch, getState) => {
				const keys = ['k1', 'k2'];
				const componentId = 'placeSelect';
				const action = actions.useKeys(
					options.getSubstate,
					options.dataType,
					actionTypes,
					options.categoryPath
				);
				return dispatch(action(keys, componentId));
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
			[dataType]: {
				byKey: {
					k1: {key: 'k1'},
					k2: {key: 'k2'},
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
		setFetch: (dataType, categoryPath) => (url, options) => {},
		dispatchedActions: [
			{
				type: 'USE.KEYS.REGISTER',
				componentId: 'placeSelect',
				keys: ['k1', 'k2'],
			},
		],
	},
];

const defaultGetState = () => ({});

describe('useKeys', () => {
	const storeHelpers = getStoreSet();

	afterEach(function () {
		storeHelpers.clearDispatchedActions();
		resetFetch();
	});

	tests.forEach(test => {
		it(test.name, () => {
			const dataType = 'testStore';
			const getState = test.getState(dataType) || defaultGetState;
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
