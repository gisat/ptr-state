import ActionTypes from '../../../constants/ActionTypes';
import common, {DEFAULT_INITIAL_STATE} from '../../_common/reducers';

const INITIAL_STATE = {
    ...DEFAULT_INITIAL_STATE,
    byDataSourceKey: {},
};

/**
 * Add attribute data
 * @param state {Object}
 * @param action {Object}
 * @param action.key {string} attribute data source key
 * @param action.data {Object} feature key - attribute value pairs
 * @return {Object}
 */
const add = (state, action) => {
    return {...state, byDataSourceKey: {...state.byDataSourceKey, [action.key]: {...action.data}}}
}

/**
 * update attribute data for given data source
 * @param state {Object}
 * @param action {Object}
 * @param action.key {string} attribute data source key
 * @param action.data {Object} feature key - attribute value pairs
 * @return {Object}
 */
const update = (state, action) => {
    return {...state, byDataSourceKey: {...state.byDataSourceKey, [action.key]: {...state.byDataSourceKey[action.key], ...action.data}}}
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.DATA.ATTRIBUTE_DATA.ADD:
			return add(state, action);
        case ActionTypes.DATA.ATTRIBUTE_DATA.UPDATE:
            return update(state, action);
        case ActionTypes.DATA.ATTRIBUTE_DATA.INDEX.ADD:
            return common.addIndex(state, action)
        default:
            return state;
    }
}
