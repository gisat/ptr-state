import {assert} from 'chai';
import commonActions from '../../../../src/state/_common/actions';
import getStoreSet from '../helpers/store';
import {pick as _pick} from 'lodash';

const actionTypes = {
	SET_ACTIVE_KEYS: 'SET_ACTIVE_KEYS',
};

const tests = [
	{
		name: 'It dispatch setActiveKeys.',
		action: (actions, actionTypes) => {
			let action;
			if (actionTypes) {
				action = actions.setActiveKeys(actionTypes);
			} else {
				action = actions.setActiveKeys;
			}
			const keys = ['k1', 'k2'];
			return action(keys);
		},
		getState: dataType => () => ({
			[dataType]: {activeKeys: null},
		}),
		dispatchedActions: [
			{
				type: 'SET_ACTIVE_KEYS',
				keys: ['k1', 'k2'],
			},
		],
	},
];

const defaultGetState = () => ({});

describe('setActiveKeys', () => {
	const storeHelpers = getStoreSet();

	afterEach(function () {
		storeHelpers.clearDispatchedActions();
	});

	tests.forEach(test => {
		it(test.name, () => {
			const dataType = 'testStore';
			const getState = test.getState(dataType) || defaultGetState;
			const dispatch = storeHelpers.getDispatch(getState);
			dispatch(test.action(commonActions, actionTypes));
			assert.deepStrictEqual(
				storeHelpers.getDispatchedActions(),
				test.dispatchedActions
			);
		});
	});
});

export default tests;
