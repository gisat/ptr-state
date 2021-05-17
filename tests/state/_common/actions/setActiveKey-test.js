import {assert} from 'chai';
import commonActions from '../../../../src/state/_common/actions';
import getStoreSet from '../helpers/store';
import {pick as _pick} from 'lodash';

const actionTypes = {
	SET_ACTIVE_KEY: 'SET_ACTIVE_KEY',
};

const tests = [
	{
		name: 'It dispatch setActiveKey.',
		action: (actions, actionTypes) => {
			let action;
			if (actionTypes) {
				action = actions.setActiveKey(actionTypes);
			} else {
				action = actions.setActiveKey;
			}
			const key = 'k1';
			return action(key);
		},
		getState: dataType => () => ({
			[dataType]: {activeKey: 'k2'},
		}),
		dispatchedActions: [
			{
				type: 'SET_ACTIVE_KEY',
				key: 'k1',
			},
		],
	},
];

const defaultGetState = () => ({});

describe('setActiveKey', () => {
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
