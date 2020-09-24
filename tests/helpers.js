import {assert} from 'chai';

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

export default {
    testCache
}