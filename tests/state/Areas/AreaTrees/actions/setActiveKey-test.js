import componentsActions from '../../../../../src/state/Areas/AreaTrees/actions';
import testBatchRunner from '../../../helpers';
import {commonActionTypesObj as actionTypes} from '../../../../constants';

const tests = [
	{
		name: 'setActiveKey',
		action: (actions, actionTypes) => {
			return actions.setActiveKey('k1');
		},
		dispatchedActions: [{type: 'AREAS.AREA_TREES.SET_ACTIVE_KEY', key: 'k1'}],
	},
];

const dataType = 'areaTree';
const categoryPath = 'metadata';
describe(
	'state/Areas/AreaTrees/actions',
	testBatchRunner(dataType, categoryPath, tests, componentsActions, actionTypes)
);

export default tests;
