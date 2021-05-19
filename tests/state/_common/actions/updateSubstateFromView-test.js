import commonActions from '../../../../src/state/_common/actions';
import testBatchRunner from '../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../constants';

const tests = [
	{
		name: 'It dispatch "SET_ACTIVE_KEY",',
		action: (actions, actionTypes) => {
			let action;
			if (actionTypes) {
				action = actions.updateSubstateFromView(actionTypes);
			} else {
				action = actions.updateSubstateFromView;
			}
			return action({activeKey: 'ak'});
		},
		dispatchedActions: [{type: 'SET_ACTIVE_KEY', key: 'ak'}],
	},
	{
		name: 'It dispatch "SET_ACTIVE_KEYS",',
		action: (actions, actionTypes) => {
			let action;
			if (actionTypes) {
				action = actions.updateSubstateFromView(actionTypes);
			} else {
				action = actions.updateSubstateFromView;
			}
			return action({activeKeys: ['ak1', 'ak2']});
		},
		dispatchedActions: [{type: 'SET_ACTIVE_KEYS', keys: ['ak1', 'ak2']}],
	},
];

const dataType = 'testStore';
const categoryPath = 'metadata';
describe(
	'updateSubstateFromView',
	testBatchRunner(dataType, categoryPath, tests, commonActions, actionTypes)
);

export default tests;
