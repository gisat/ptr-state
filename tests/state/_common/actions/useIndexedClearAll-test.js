import {assert} from 'chai';
import commonActions from '../../../../src/state/_common/actions';
import getStoreSet from '../helpers/store';
import {pick as _pick} from 'lodash';

const actionTypes = {
	USE: {
		INDEXED: {
			CLEAR_ALL: 'USE.INDEXED.CLEAR_ALL',
		},
	},
};

const tests = [
	{
		name: 'It dispatch "USE.INDEXED.CLEAR_ALL".',
		action: (actions, actionTypes) => {
			let action;
			if (actionTypes) {
				action = actions.useIndexedClearAll(actionTypes);
			} else {
				action = actions.useIndexedClearAll;
			}
			return action();
		},
		dispatchedActions: [{type: 'USE.INDEXED.CLEAR_ALL'}],
	},
];

describe('useIndexedClearAll', () => {
	const storeHelpers = getStoreSet();

	const getState = () => ({});

	const dispatch = storeHelpers.getDispatch(getState);

	afterEach(function () {
		storeHelpers.clearDispatchedActions();
	});

	tests.forEach(test => {
		it(test.name, () => {
			dispatch(test.action(commonActions, actionTypes));
			assert.deepStrictEqual(
				storeHelpers.getDispatchedActions(),
				test.dispatchedActions
			);
		});
	});
});

export default tests;
