import {assert} from 'chai';
import reducers, {
	INITIAL_STATE,
} from '../../../../../src/state/Data/AttributeData/reducers';

describe('_reducers-test', function () {
	it('Should return the same state no matching action type', function () {
		const action = {
			type: 'CREEPY_ACTION',
		};

		const output = reducers(INITIAL_STATE, action);
		assert.equal(output, INITIAL_STATE);
	});

	it('Should return the default state if no state given', function () {
		const action = {
			type: 'CREEPY_ACTION',
		};

		const output = reducers(undefined, action);
		assert.equal(output, INITIAL_STATE);
	});

	// common reducers
	it('Reducer exists for given action type', function () {
		const action = {
			type: 'DATA.ATTRIBUTE_DATA.INDEX.ADD',
		};
		assert.exists(reducers(INITIAL_STATE, action));
	});

	it('Reducer exists for given action type 2', function () {
		const action = {
			type: 'DATA.ATTRIBUTE_DATA.UPDATE_STORE',
		};
		assert.exists(reducers(INITIAL_STATE, action));
	});
});
