import reducers, {
	INITIAL_STATE,
} from '../../../../src/state/Components/reducers';
import testHelpers from '../../../helpers';

const actionTypes = ['COMPONENTS.UPDATE_STORE'];

describe('_reducers-test', () =>
	testHelpers.baseReducersTestSet(reducers, INITIAL_STATE, actionTypes));
