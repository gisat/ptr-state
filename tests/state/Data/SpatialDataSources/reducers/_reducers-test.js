import testHelpers from '../../../../helpers';
import reducers, {
	INITIAL_STATE,
} from '../../../../../src/state/Data/SpatialDataSources/reducers';

const actionTypes = [
	'DATA.SPATIAL_DATA_SOURCES.ADD',
	'DATA.SPATIAL_DATA_SOURCES.INDEX.ADD',
];

describe('_reducers-test', () =>
	testHelpers.baseReducersDataTestSet(reducers, INITIAL_STATE, actionTypes));
