import reducers, {INITIAL_STATE} from '../../../../src/state/Tags/reducers';
import testHelpers from '../../../helpers';
import ActionTypes from '../../../../src/constants/ActionTypes';

import add from '../../_common/reducers/add-test';
import addIndex from '../../_common/reducers/addIndex-test';
import addUnreceivedKeys from '../../_common/reducers/addUnreceivedKeys-test';
import markDeleted from '../../_common/reducers/markDeleted-test';
import registerUseIndexed from '../../_common/reducers/registerUseIndexed-test';
import remove from '../../_common/reducers/remove-test';
import removeEdited from '../../_common/reducers/removeEdited-test';
import removeEditedActive from '../../_common/reducers/removeEditedActive-test';
import removeEditedProperty from '../../_common/reducers/removeEditedProperty-test';
import setActive from '../../_common/reducers/setActive-test';
import setActiveMultiple from '../../_common/reducers/setActiveMultiple-test';
import updateEdited from '../../_common/reducers/updateEdited-test';
import useIndexedClear from '../../_common/reducers/useIndexedClear-test';
import useIndexedClearAll from '../../_common/reducers/useIndexedClearAll-test';
import useKeysClear from '../../_common/reducers/useKeysClear-test';
import useKeysRegister from '../../_common/reducers/useKeysRegister-test';

describe('_reducers', () => {
	testHelpers.baseReducersMetadataTestSet(reducers, INITIAL_STATE, 'TAGS');
});

describe('add', () => {
	add.forEach(test => {
		const action = {...test.action, type: ActionTypes.TAGS.ADD};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('addIndex', () => {
	addIndex.forEach(test => {
		const action = {...test.action, type: ActionTypes.TAGS.INDEX.ADD};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('addUnreceivedKeys', () => {
	addUnreceivedKeys.forEach(test => {
		const action = {...test.action, type: ActionTypes.TAGS.ADD_UNRECEIVED};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('markDeleted', () => {
	markDeleted.forEach(test => {
		const action = {...test.action, type: ActionTypes.TAGS.MARK_DELETED};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('registerUseIndexed', () => {
	registerUseIndexed.forEach(test => {
		const action = {
			...test.action,
			type: ActionTypes.TAGS.USE.INDEXED.REGISTER,
		};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('remove', () => {
	remove.forEach(test => {
		const action = {...test.action, type: ActionTypes.TAGS.DELETE};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('removeEdited', () => {
	removeEdited.forEach(test => {
		const action = {...test.action, type: ActionTypes.TAGS.EDITED.REMOVE};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('removeEditedActive', () => {
	removeEditedActive.forEach(test => {
		const action = {
			...test.action,
			type: ActionTypes.TAGS.EDITED.REMOVE_ACTIVE,
		};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('removeEditedProperty', () => {
	removeEditedProperty.forEach(test => {
		const action = {
			...test.action,
			type: ActionTypes.TAGS.EDITED.REMOVE_PROPERTY,
		};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('setActive', () => {
	setActive.forEach(test => {
		const action = {
			...test.action,
			type: ActionTypes.TAGS.SET_ACTIVE_KEY,
		};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('setActiveMultiple', () => {
	setActiveMultiple.forEach(test => {
		const action = {
			...test.action,
			type: ActionTypes.TAGS.SET_ACTIVE_KEYS,
		};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('updateEdited', () => {
	updateEdited.forEach(test => {
		const action = {
			...test.action,
			type: ActionTypes.TAGS.EDITED.UPDATE,
		};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('useIndexedClear', () => {
	useIndexedClear.forEach(test => {
		const action = {...test.action, type: ActionTypes.TAGS.USE.INDEXED.CLEAR};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('useIndexedClearAll', () => {
	useIndexedClearAll.forEach(test => {
		const action = {
			...test.action,
			type: ActionTypes.TAGS.USE.INDEXED.CLEAR_ALL,
		};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('useKeysRegister', () => {
	useKeysRegister.forEach(test => {
		const action = {...test.action, type: ActionTypes.TAGS.USE.KEYS.REGISTER};
		it(test.name, () => test.test(action, reducers));
	});
});

describe('useKeysClear', () => {
	useKeysClear.forEach(test => {
		const action = {...test.action, type: ActionTypes.TAGS.USE.KEYS.CLEAR};
		it(test.name, () => test.test(action, reducers));
	});
});
