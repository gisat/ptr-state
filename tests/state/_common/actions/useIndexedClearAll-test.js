import {assert} from 'chai';
import actions from '../../../../src/state/_common/actions';
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
		action: actionTypes => {
			const path = 'USE.INDEXED.CLEAR_ALL';
			const croppedActionTypes = _pick(actionTypes, path);
			if (!croppedActionTypes) {
				return new Error(`Action types not found for ${path}`);
			}
			const action = actions.useIndexedClearAll(croppedActionTypes)();
			return action;
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
			dispatch(test.action(actionTypes));
			assert.deepStrictEqual(
				storeHelpers.getDispatchedActions(),
				test.dispatchedActions
			);
		});
	});
});

export default tests;
