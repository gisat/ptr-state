import ActionTypes from '../../constants/ActionTypes';
import _ from 'lodash';

const INITIAL_STATE = {
    activeSetKey: null,
    activeMapKey: null,
    maps: {},
    sets: {}
};

const setSetActiveMapKey = (state, setKey, mapKey) => {
    return {
        ...state,
        sets: {
            ...state.sets,
            [setKey]: {
                ...state.sets[setKey],
                activeMapKey: mapKey
            }
        }
    };
};

const update = (state, data) => {
    return {...state, ...data};
};

const updateMapView = (state, mapKey, updates) => {
    return {
        ...state,
        maps: {
            ...state.maps,
            [mapKey]: {
                ...state.maps[mapKey],
                data: {
                    ...state.maps[mapKey].data,
                    view: state.maps[mapKey].data.view ?
                        {...state.maps[mapKey].data.view, ...updates} : updates
                }
            }
        }
    };
};

const updateSetView = (state, setKey, updates) => {
    if (updates && !_.isEmpty(updates)) {
        return {
            ...state,
            sets: {
                ...state.sets,
                [setKey]: {
                    ...state.sets[setKey],
                    data: {
                        ...state.sets[setKey].data,
                        view: state.sets[setKey].data.view ?
                            {...state.sets[setKey].data.view, ...updates} : updates
                    }
                }
            }
        };
    } else {
        return state;
    }
};

export default function tasksReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionTypes.MAPS.MAP.VIEW.UPDATE:
            return updateMapView(state, action.mapKey, action.update);
        case ActionTypes.MAPS.SET.SET_ACTIVE_MAP_KEY:
            return setSetActiveMapKey(state, action.setKey, action.mapKey);
        case ActionTypes.MAPS.SET.VIEW.UPDATE:
            return updateSetView(state, action.setKey, action.update);
        case ActionTypes.MAPS.UPDATE:
            return update(state, action.data);
        default:
            return state;
    }
}
