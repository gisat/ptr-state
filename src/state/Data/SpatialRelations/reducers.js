import ActionTypes from '../../../constants/ActionTypes';
import common, {DEFAULT_INITIAL_STATE} from '../../_common/reducers';

const INITIAL_STATE = {
    ...DEFAULT_INITIAL_STATE
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.DATA.SPATIAL_RELATIONS.ADD:
			return common.add(state, action);
		case ActionTypes.DATA.SPATIAL_RELATIONS.INDEX.ADD:
			return common.addIndex(state, action);
		case ActionTypes.DATA.SPATIAL_RELATIONS.INDEX.REGISTER:
			return common.registerIndex(state, action);
        default:
            return state;
    }
}
