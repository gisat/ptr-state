import commonActionsTests from '../../_common/actions/';
import actions from '../../../../src/state/Selections/actions';
import testBatchRunner, {
	getDispatchedActionsModificator,
	getTestsByActionName,
} from '../../helpers';

const actionNames = ['add', 'setActiveKey', 'updateStateFromView'];

const store = 'SELECTIONS';
const dataType = 'selections';
const categoryPath = 'metadata';
const tests = getTestsByActionName(actionNames, commonActionsTests);
describe(
	'common SELECTIONS actions',
	testBatchRunner(
		dataType,
		categoryPath,
		tests,
		actions,
		null,
		getDispatchedActionsModificator(store),
		store
	)
);

// TODO
// clearFeatureKeysFilter
// setActiveSelectionFeatureKeysFilterKeys
// updateStateFromViewWithData
