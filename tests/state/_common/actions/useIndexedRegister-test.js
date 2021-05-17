import {assert} from 'chai';
import commonActions from '../../../../src/state/_common/actions';
import getStoreSet from '../helpers/store';
import {pick as _pick} from 'lodash';

const actionTypes = {
	USE: {
		INDEXED: {
			REGISTER: 'USE.INDEXED.REGISTER',
		},
	},
};

const tests = [
	{
		name: 'It dispatch "USE.INDEXED.REGISTER".',
		action: (actions, actionTypes) => {
			let action;
			if (actionTypes) {
				action = actions.useIndexedRegister(actionTypes);
			} else {
				action = actions.useIndexedRegister;
			}

			const componentId = 'placeSelect';
			const filterByActive = {
				place: true,
			};
			const filter = {};
			const order = null;
			const start = 10;
			const length = 5;
			return action(componentId, filterByActive, filter, order, start, length);
		},
		dispatchedActions: [
			{
				type: 'USE.INDEXED.REGISTER',
				componentId: 'placeSelect',
				filterByActive: {
					place: true,
				},
				filter: {},
				order: null,
				start: 10,
				length: 5,
			},
		],
	},
];

describe('useIndexedRegister', () => {
	const storeHelpers = getStoreSet();

	const getState = () => ({});

	const dispatch = storeHelpers.getDispatch(getState);

	afterEach(function () {
		storeHelpers.clearDispatchedActions();
	});

	tests.forEach(test => {
		it(test.name, () => {
			dispatch(test.action(commonActions, actionTypes));
			debugger;
			assert.deepStrictEqual(
				storeHelpers.getDispatchedActions(),
				test.dispatchedActions
			);
		});
	});
});

export default tests;
