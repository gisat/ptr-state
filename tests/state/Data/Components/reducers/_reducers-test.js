import {assert} from 'chai';
import reducers, {
	INITIAL_STATE,
} from '../../../../../src/state/Data/Components/reducers';

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
});
