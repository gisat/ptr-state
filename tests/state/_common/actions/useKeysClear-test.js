import {assert} from 'chai';
import commonActions from '../../../../src/state/_common/actions';
import getStoreSet from '../helpers/store';
import {pick as _pick} from 'lodash';

const actionTypes = {
	USE: {
		KEYS: {
			CLEAR: 'USE.KEYS.CLEAR',
		},
	},
};

const tests = [
	{
		name: 'It dispatch "USE.KEYS.CLEAR".',
		action: (actions, actionTypes) => {
			let action;
			if (actionTypes) {
				action = actions.useKeysClear(actionTypes);
			} else {
				action = actions.useKeysClear;
			}
			return action('map-window');
		},
		dispatchedActions: [{type: 'USE.KEYS.CLEAR', componentId: 'map-window'}],
	},
];

describe('useKeysClear', () => {
	const storeHelpers = getStoreSet();

	const getState = () => ({});

	const dispatch = storeHelpers.getDispatch(getState);

	afterEach(function () {
		storeHelpers.clearDispatchedActions();
	});

	tests.forEach(test => {
		it(test.name, () => {
			dispatch(test.action(commonActions, actionTypes));
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
