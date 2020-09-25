import ActionTypes from '../../../constants/ActionTypes';
import common, {DEFAULT_INITIAL_STATE} from '../../_common/reducers';

const INITIAL_STATE = {
    ...DEFAULT_INITIAL_STATE
};

const add = (state, action) {
    return {...state, byDataSourceKey}
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.DATA.SPATIAL_DATA.ADD_OR_UPDATE:
			return add(state, action);
		// case ActionTypes.DATA.SPATIAL_RELATIONS.INDEX.ADD:
		// 	return common.addIndex(state, action);
        default:
            return state;
    }
}
