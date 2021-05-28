import commonActionsTests from '../../_common/actions/';
import actions from '../../../../src/state/Cases/actions';
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
const store = 'CASES';
const dataType = 'cases';
const categoryPath = 'metadata';
const tests = getTestsByActionName(actionNames, commonActionsTests);
describe(
	'common CASES actions',
	testBatchRunner(
		dataType,
		categoryPath,
		tests,
		actions,
		null,
		getDispatchedActionsModificator(store)
	)
);
