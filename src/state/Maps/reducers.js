import ActionTypes from '../../constants/ActionTypes';
import _ from 'lodash';

const INITIAL_STATE = {
    activeSetKey: null,
    activeMapKey: null,
    maps: {},
    sets: {}
};

const update = (state, data) => {
    return {...state, ...data};
};

export default function tasksReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionTypes.MAPS.UPDATE:
            return update(state, action.data);
        default:
            return state;
    }
}
