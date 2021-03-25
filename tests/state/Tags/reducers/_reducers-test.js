import reducers, {INITIAL_STATE} from '../../../../src/state/Tags/reducers';
import testHelpers from '../../../helpers';

import add from '../../_common/reducers/add-test';
import addUnreceivedKeys from '../../_common/reducers/addUnreceivedKeys-test';
import registerUseIndexed from '../../_common/reducers/registerUseIndexed-test';

describe('_reducers', () => {
	testHelpers.baseReducersMetadataTestSet(reducers, INITIAL_STATE, 'TAGS');
});

describe('add', () => {
	add.forEach(test => {
		const action = {...test.action, type: 'TAGS.ADD'};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('addUnreceivedKeys', () => {
	addUnreceivedKeys.forEach(test => {
		const action = {...test.action, type: 'TAGS.ADD_UNRECEIVED'};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('registerUseIndexed', () => {
	registerUseIndexed.forEach(test => {
		const action = {...test.action, type: 'TAGS.USE.INDEXED.REGISTER'};
		it(test.name, () => test.test(action, reducers));
	});
});
