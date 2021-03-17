import {assert} from 'chai';

// import all reducers due to coverage overview
import {baseStores} from '../src/index';

function testCache(testingFunction, params, expectedResult, otherParams) {
	it('should be cached', () => {
		if (!otherParams) {
			otherParams = params.map(param => null);
		}

		// first run of the selector should return computed value
		const firstOutput = testingFunction(...params);
		assert.deepStrictEqual(expectedResult, firstOutput);
		assert.notEqual(expectedResult, firstOutput);

		// second run to simulate different params
		testingFunction(...otherParams);

		// third run with the same params as the first one should return cached value
		const thirdOutput = testingFunction(...params);
		assert.equal(firstOutput, thirdOutput);
	});
}

/**
 * @param reducers {function}
 * @param state {Object}
 * @param actionTypes {Array}
 */
function baseReducersTestSet(reducers, state, actionTypes) {
	it('Should return the same state no matching action type', function () {
		const action = {
			type: 'CREEPY_ACTION',
		};

		const output = reducers(state, action);
		assert.equal(output, state);
	});

	it('Should return the default state if no state given', function () {
		const action = {
			type: 'CREEPY_ACTION',
		};

		const output = reducers(undefined, action);
		assert.equal(output, state);
	});

	actionTypes &&
		actionTypes.forEach(type => {
			it('Reducer exists for given action types ' + type, function () {
				const action = {
					type,
				};
				assert.exists(reducers(state, action));
			});
		});
}

export default {
	testCache,
	baseReducersTestSet,
};
