import {assert} from 'chai';
import commonActions from '../../../../src/state/_common/actions';
import getStoreSet from '../helpers/store';
import {pick as _pick} from 'lodash';

const actionTypes = {
	USE: {
		INDEXED: {
			CLEAR: 'USE.INDEXED.CLEAR',
		},
	},
};

const tests = [
	{
		name: 'It dispatch "USE.INDEXED.CLEAR".',
		action: (actions, actionTypes) => {
			let action;
			if (actionTypes) {
				action = actions.useIndexedClear(actionTypes);
			} else {
				action = actions.useIndexedClear;
			}
			return action('map-window');
		},
		dispatchedActions: [{type: 'USE.INDEXED.CLEAR', componentId: 'map-window'}],
	},
];

describe('useIndexedClear', () => {
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
