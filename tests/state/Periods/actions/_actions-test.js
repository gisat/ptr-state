import commonActionsTests from '../../_common/actions/';
import actions from '../../../../src/state/Periods/actions';
import testBatchRunner, {
	getDispatchedActionsModificator,
	getTestsByActionName,
} from '../../helpers';

const actionNames = [
	'useIndexed',
	'useIndexedClear',
	'useKeysClear',
	'useKeys',
];
const store = 'PERIODS';
const dataType = 'periods';
const categoryPath = 'metadata';
const tests = getTestsByActionName(actionNames, commonActionsTests);
describe(
	'common PERIODS actions',
	testBatchRunner(
		dataType,
		categoryPath,
		tests,
		actions,
		null,
		getDispatchedActionsModificator(store)
	)
);
