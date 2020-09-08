import ActionTypes from '../../constants/ActionTypes';
import _ from 'lodash';

const INITIAL_STATE = {
    activeSetKey: null,
    activeMapKey: null,
    maps: {},
    sets: {}
};

export default function tasksReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        default:
            return state;
    }
}
