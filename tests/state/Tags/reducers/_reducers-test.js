import reducers, {INITIAL_STATE} from '../../../../src/state/Tags/reducers';
import testHelpers from '../../../helpers';

describe('_reducers', () => {
	testHelpers.baseReducersMetadataTestSet(reducers, INITIAL_STATE, 'TAGS');
});
