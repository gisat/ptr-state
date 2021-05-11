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
		name: 'It register index and add deta from response.',
		action: (actions, actionTypes, options) => {
			return (dispatch, getState) => {
				debugger;
				let action;
				// for common testing
				if (actionTypes && options) {
					action = actions.useIndexed(
						options.getSubstate,
						options.dataType,
						actionTypes,
						options.categoryPath
					);
				} else {
					action = actions.useIndexed;
				}

				return dispatch(
					action({name: 'afil'}, {name: 'fil'}, 'asc', 1, 5, 'cid')
				);
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
			attributes: {activeKey: 'k1'},
			[dataType]: {activeKey: 'k1'},
			periods: {activeKey: 'k1'},
			places: {activeKey: 'k1'},
			cases: {},
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
				data: {[dataType]: {k1: {}, k2: {}}},
				total: 2,
				changes: {
					[dataType]: '2020-01-01',
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
		},
		dispatchedActions: [
			{
				componentId: 'cid',
				filterByActive: {name: 'afil'},
				filter: {name: 'fil'},
				order: 'asc',
				start: 1,
				length: 5,
				type: 'USE.INDEXED.REGISTER',
			},
			{
				filter: {name: 'fil'},
				order: 'asc',
				count: 2,
				start: 1,
				data: {k1: {}, k2: {}},
				changedOn: '2020-01-01',
				type: 'INDEX.ADD',
			},
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
