import common from '../../_common/selectors';
import {createSelector} from "reselect";

const getSubstate = (state) => state.data.spatialData;

/**
 * @param {*} state 
 * @param {*} filter 
 * @param {*} order 
 * @param {*} level 
 */
const getFilteredIndexes =  createSelector([
    common.getFilteredIndexes(getSubstate),
    (state, filter) => filter,
    (state, filter, order) => order,
    (state, filter, order, level) => level],
    (indexes, filter, order, level) => {
        if(!_.isEmpty(indexes)) {
            return indexes.filter(index => index.level === level);
        } else {
            return null;
        }
    }
);

export default {
    getFilteredIndexes
};