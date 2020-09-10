import {assert} from 'chai';
import commonHelpers from '../../../../src/state/_common/helpers';

describe('convertModifiersToRequestFriendlyFormat', function() {
    it('should merge keys, defined keys have a priority', () => {
        const modifiers = {
            scopeKey: "A",
            placeKeys: ["B", "C"],
            scenarioKey: "F",
            caseKeys: ["I", "J"]
        }

        const expectedResult = {
            scopeKey: "A",
            placeKey: {
                in: ["B", "C"]
            },
            scenarioKey: "F",
            caseKey: {
                in: ["I", "J"]
            }
        };

        const output = commonHelpers.convertModifiersToRequestFriendlyFormat(modifiers);
        assert.deepStrictEqual(output, expectedResult);
    });

    it('should return null if input is null', () => {
        const output = commonHelpers.convertModifiersToRequestFriendlyFormat(null);
        assert.isNull(output);
    });
});