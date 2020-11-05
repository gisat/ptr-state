import {assert} from 'chai';
import commonHelpers from '../../../../src/state/_common/helpers';
import testHelpers from "../../../helpers";

describe('getIndexes', function() {
    const state = {
        indexes: [
            {
                filter: {
                    scope: 'abc'
                },
                order: null,
                index: [1,2,3]
            }
        ]
    };

    
    it('should select index by filter and order', () => {
        const expectedResult = [{
            filter: {
                scope: 'abc'
            },
            order: null,
            index: [1,2,3]
        }];
        const filter = {scope: 'abc'};
        const order = null;
        const indexes = commonHelpers.getIndexes(state.indexes, filter, order);
        assert.deepStrictEqual(indexes, expectedResult);
    });

    it('should select cached index by filter and order', () => {
        const expectedResult = [{
            filter: {
                scope: 'abc'
            },
            order: null,
            index: [1,2,3]
        }];

        const updatedState = {
            ...state, 
            byKey: []
        }
        
        const filter = {scope: 'abc'};
        const order = null;

        testHelpers.testCache(commonHelpers.getIndexes, [state.indexes, filter, order], expectedResult, [updatedState, filter, order]);
    });

    it('should select cached index by filter and order', () => {
        const indexes = [
            {
                filter: {
                    scope: 'abcd'
                },
                order: null,
                index: [1,2,3,4]
            }
        ]
        const state = {indexes}
        const updatedState = {
            ...state, 
            byKey: []
        }
        const filter = {scope: 'abcd'};
        const order = null;
        const indexes1 = commonHelpers.getIndexes(state.indexes, filter, order);
        const indexes2 = commonHelpers.getIndexes(updatedState.indexes, filter, order);
        const isSame = indexes1 === indexes2;

        assert.equal(isSame, true);
        assert.equal(indexes1, indexes2);
    });

    it('should not select cached index by filter and order', () => {
        const expectedResult = [{
            filter: {
                scope: 'abc'
            },
            order: null,
            index: [1,2,3]
        }];

        const updatedState = {
            ...state, 
            indexes: [
                ...state.indexes,
                {
                    filter: {
                        scope: 'abc',
                        place: 'czechia'
                    },
                    order: null,
                    index: [5]
                }
            ]
        }

        // testHelpers.testCache(commonHelpers.getIndexes, [state.indexes, {scope: 'abc'}, null], expectedResult, [updatedState, {scope: 'abcd'}, null]);
        const filter = {scope: 'abc'};
        const order = null;
        const indexes1 = commonHelpers.getIndexes(state.indexes, filter, order);
        assert.deepStrictEqual(indexes1, expectedResult);
        
        const indexes2 = commonHelpers.getIndexes(updatedState.indexes, filter, order);
        assert.deepStrictEqual(indexes2, expectedResult);
        
        assert.notEqual(indexes1, indexes2);
    });
});