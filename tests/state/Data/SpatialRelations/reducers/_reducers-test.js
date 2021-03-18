import testHelpers from '../../../../helpers';
import reducers, {
	INITIAL_STATE,
} from '../../../../../src/state/Data/SpatialRelations/reducers';

const actionTypes = [
	'DATA.SPATIAL_RELATIONS.ADD',
	'DATA.SPATIAL_RELATIONS.INDEX.ADD',
];

describe('_reducers-test', () =>
	testHelpers.baseReducersTestSet(reducers, INITIAL_STATE, actionTypes));
