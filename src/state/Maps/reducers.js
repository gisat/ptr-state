import ActionTypes from '../../constants/ActionTypes';
import _, {indexOf as _indexOf} from 'lodash';

const INITIAL_STATE = {
	activeSetKey: null,
	activeMapKey: null,
	inUse: {
		maps: [],
		sets: [],
	},
	maps: {},
	sets: {},
};

const removeMapFromSet = (state, setKey, mapKey) => {
	if (setKey && mapKey) {
		const index = _indexOf(state.sets[setKey].maps, mapKey);
		let updatedMaps = [
			...state.sets[setKey].maps.slice(0, index),
			...state.sets[setKey].maps.slice(index + 1),
		];

		return {
			...state,
			sets: {
				...state.sets,
				[setKey]: {
					...state.sets[setKey],
					maps: updatedMaps,
				},
			},
		};
	} else {
		return state;
	}
};

/**
 * Set styleKey to the specific layer of the specific map
 * @param state {Object}
 * @param mapKey {string}
 * @param layerKey {string}
 * @param styleKey {string} uuid
 * @return {Object} state
 */
const setMapLayerStyleKey = (state, mapKey, layerKey, styleKey) => {
	const layers = state.maps[mapKey]?.data?.layers;

	if (layers) {
		const updatedLayers = layers.map(item => {
			if (item.key === layerKey) {
				return {
					...item,
					styleKey,
				};
			} else {
				return item;
			}
		});

		return {
			...state,
			maps: {
				...state.maps,
				[mapKey]: {
					...state.maps[mapKey],
					data: {
						...state.maps[mapKey].data,
						layers: updatedLayers,
					},
				},
			},
		};
	} else {
		return state;
	}
};

/**
 * Set map width and height
 * @param state {Object}
 * @param mapKey {string}
 * @param width {number} map width in px
 * @param height {number} map height in px
 * @return {Object} state
 */
const setMapViewport = (state, mapKey, width, height) => {
	return {
		...state,
		maps: {
			...state.maps,
			[mapKey]: {
				...state.maps[mapKey],
				data: {
					...state.maps[mapKey].data,
					viewport: {
						width,
						height,
					},
				},
			},
		},
	};
};

/**
 * Set active map of the map set
 * @param state {Object}
 * @param setKey {string}
 * @param mapKey {string}
 * @return {Object} state
 */
const setSetActiveMapKey = (state, setKey, mapKey) => {
	return {
		...state,
		sets: {
			...state.sets,
			[setKey]: {
				...state.sets[setKey],
				activeMapKey: mapKey,
			},
		},
	};
};

/**
 * Set map set background layer state
 * @param state {Object}
 * @param setKey {string}
 * @param backgroundLayer {Object} background layer state
 * @return {Object} state
 */
const setSetBackgroundLayer = (state, setKey, backgroundLayer) => {
	return {
		...state,
		sets: {
			...state.sets,
			[setKey]: {
				...state.sets[setKey],
				data: {
					...state.sets[setKey].data,
					backgroundLayer,
				},
			},
		},
	};
};

/**
 * Update whole map state
 * @param state {Object}
 * @param data {Object}
 * @return {Object}
 */
const update = (state, data) => {
	return {...state, ...data};
};

/**
 * Update map view
 * @param state {Object}
 * @param mapKey {string}
 * @param updates {Object} map view updates
 * @return {Object} state
 */
const updateMapView = (state, mapKey, updates) => {
	return {
		...state,
		maps: {
			...state.maps,
			[mapKey]: {
				...state.maps[mapKey],
				data: {
					...state.maps[mapKey].data,
					view: state.maps[mapKey].data.view
						? {...state.maps[mapKey].data.view, ...updates}
						: updates,
				},
			},
		},
	};
};

/**
 * Update map set view
 * @param state {Object}
 * @param setKey {string}
 * @param updates {Object} map view updates
 * @return {Object} state
 */
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
						view: state.sets[setKey].data.view
							? {...state.sets[setKey].data.view, ...updates}
							: updates,
					},
				},
			},
		};
	} else {
		return state;
	}
};

const mapUseClear = (state, mapKey) => {
	if (mapKey) {
		const index = _indexOf(state.inUse.maps, mapKey);
		let updatedInUse = [
			...state.inUse.maps.slice(0, index),
			...state.inUse.maps.slice(index + 1),
		];

		return {
			...state,
			inUse: {
				...state.inUse,
				maps: updatedInUse,
			},
		};
	} else {
		return state;
	}
};

const mapUseRegister = (state, mapKey) => {
	if (mapKey) {
		return {
			...state,
			inUse: {
				...state.inUse,
				maps: [...state.inUse.maps, mapKey],
			},
		};
	} else {
		return state;
	}
};

const mapSetUseRegister = (state, mapSetKey) => {
	if (mapSetKey) {
		return {
			...state,
			inUse: {
				...state.inUse,
				sets: [...state.inUse.sets, mapSetKey],
			},
		};
	} else {
		return state;
	}
};

export default function tasksReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case ActionTypes.MAPS.MAP.LAYERS.SET_STYLE_KEY:
			return setMapLayerStyleKey(
				state,
				action.mapKey,
				action.layerKey,
				action.styleKey
			);
		case ActionTypes.MAPS.MAP.USE.CLEAR:
			return mapUseClear(state, action.mapKey);
		case ActionTypes.MAPS.MAP.USE.REGISTER:
			return mapUseRegister(state, action.mapKey);
		case ActionTypes.MAPS.MAP.VIEW.UPDATE:
			return updateMapView(state, action.mapKey, action.update);
		case ActionTypes.MAPS.MAP.VIEWPORT.SET:
			return setMapViewport(state, action.mapKey, action.width, action.height);
		case ActionTypes.MAPS.SET.REMOVE_MAP:
			return removeMapFromSet(state, action.setKey, action.mapKey);
		case ActionTypes.MAPS.SET.SET_ACTIVE_MAP_KEY:
			return setSetActiveMapKey(state, action.setKey, action.mapKey);
		case ActionTypes.MAPS.SET.SET_BACKGROUND_LAYER:
			return setSetBackgroundLayer(
				state,
				action.setKey,
				action.backgroundLayer
			);
		case ActionTypes.MAPS.SET.USE.REGISTER:
			return mapSetUseRegister(state, action.mapSetKey);
		case ActionTypes.MAPS.SET.VIEW.UPDATE:
			return updateSetView(state, action.setKey, action.update);
		case ActionTypes.MAPS.UPDATE:
			return update(state, action.data);
		default:
			return state;
	}
}
