import ActionTypes from '../../../constants/ActionTypes';
import common from '../../_common/reducers';

const INITIAL_STATE = {
    components: {},
	sets: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
}
