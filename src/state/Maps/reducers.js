import ActionTypes from '../../constants/ActionTypes';
import {stateManagement} from '@gisatcz/ptr-utils';
import {
	findIndex as _findIndex,
	indexOf as _indexOf,
	isEmpty as _isEmpty,
} from 'lodash';

export const INITIAL_STATE = {
	activeSetKey: null,
	activeMapKey: null,
	inUse: {
		maps: [],
		sets: [],
	},
	maps: {},
	sets: {},
};

/**
 * TODO @vlach1989 test
 * Set active map key
 * @param state {Object}
 * @param mapKey {string}
 * @return {Object} updated state
 */
const setActiveMapKey = (state, mapKey) => {
	if (mapKey) {
		return {...state, activeMapKey: mapKey};
	} else {
		return null;
	}
};

/**
 * TODO @vlach1989 test
 * Remove map from map set
 * @param state {Object}
 * @param setKey {string}
 * @param mapKey {string}
 * @return {Object} updated state
 */
const removeMapFromSet = (state, setKey, mapKey) => {
	if (setKey && mapKey) {
		const index = _indexOf(state.sets[setKey]?.maps, mapKey);
		if (index > -1) {
			let updatedMaps = stateManagement.removeItemByIndex(
				state.sets[setKey].maps,
				index
			);

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
	} else {
		return state;
	}
};

/**
 * TODO @vlach1989 test
 * Remove layer from map
 * @param state {Object}
 * @param mapKey {string}
 * @param layerKey {string}
 * @return {Object} Updated state
 */
const removeMapLayer = (state, mapKey, layerKey) => {
	if (layerKey && mapKey) {
		const index = _findIndex(state.maps[mapKey]?.data.layers, {key: layerKey});
		if (index > -1) {
			let updatedLayers = stateManagement.removeItemByIndex(
				state.maps[mapKey]?.data.layers,
				index
			);

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
	} else {
		return state;
	}
};

/**
 * TODO @vlach1989 test
 * Add layer states to map
 * @param state {Object}
 * @param mapKey {string}
 * @param layerStates {Array} A collection, where each object represents state of the layer
 * @return {Object} updated state
 */
const addMapLayers = (state, mapKey, layerStates) => {
	if (mapKey && layerStates) {
		return {
			...state,
			maps: {
				...state.maps,
				[mapKey]: {
					...state.maps[mapKey],
					data: {
						...state.maps[mapKey].data,
						layers: state.maps[mapKey].data.layers
							? [...state.maps[mapKey].data.layers, ...layerStates]
							: layerStates,
					},
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
 * TODO @vlach1989 test
 * Set map layer option
 * @param state {Object}
 * @param mapKey {string}
 * @param layerKey {string}
 * @param optionKey {string}
 * @param optionValue {*}
 * @return {Object} state
 */
const setMapLayerOption = (state, mapKey, layerKey, optionKey, optionValue) => {
	const layers = state.maps[mapKey]?.data?.layers;

	if (layers) {
		const updatedLayers = layers.map(item => {
			if (item.key === layerKey) {
				return {
					...item,
					options: {
						...item.options,
						[optionKey]: optionValue,
					},
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
	if (mapKey && width && height) {
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
	} else {
		return state;
	}
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
 * Set map set layers state
 * @param state {Object}
 * @param setKey {string}
 * @param layers {Object} layers state
 * @return {Object} state
 */
const setSetLayers = (state, setKey, layers) => {
	return {
		...state,
		sets: {
			...state.sets,
			[setKey]: {
				...state.sets[setKey],
				data: {
					...state.sets[setKey].data,
					layers,
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
	if (updates && !_isEmpty(updates)) {
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
	} else {
		return state;
	}
};

/**
 * Update map set view
 * @param state {Object}
 * @param setKey {string}
 * @param updates {Object} map view updates
 * @return {Object} state
 */
const updateSetView = (state, setKey, updates) => {
	if (updates && !_isEmpty(updates)) {
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

/**
 * Remove map usage
 * @param state {Object}
 * @param mapKey {string}
 * @return {Object} state
 */
const mapUseClear = (state, mapKey) => {
	if (mapKey) {
		const index = _indexOf(state.inUse.maps, mapKey);
		if (index > -1) {
			const updatedInUse = stateManagement.removeItemByIndex(
				state.inUse.maps,
				index
			);

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
	} else {
		return state;
	}
};

/**
 * Remove map set usage
 * @param state {Object}
 * @param mapSetKey {string}
 * @return {Object} state
 */
const mapSetUseClear = (state, mapSetKey) => {
	if (mapSetKey) {
		const index = _indexOf(state.inUse.sets, mapSetKey);
		if (index > -1) {
			const updatedInUse = stateManagement.removeItemByIndex(
				state.inUse.sets,
				index
			);

			return {
				...state,
				inUse: {
					...state.inUse,
					sets: updatedInUse,
				},
			};
		} else {
			return state;
		}
	} else {
		return state;
	}
};

/**
 * Register map usage
 * @param state {Object}
 * @param mapKey {string}
 * @return {Object} state
 */
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

/**
 * Register map set usage
 * @param state {Object}
 * @param mapSetKey {string}
 * @return {Object} state
 */
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
		case ActionTypes.MAPS.MAP.LAYERS.ADD:
			return addMapLayers(state, action.mapKey, action.layerStates);
		case ActionTypes.MAPS.MAP.LAYERS.REMOVE_LAYER:
			return removeMapLayer(state, action.mapKey, action.layerKey);
		case ActionTypes.MAPS.MAP.LAYERS.SET_OPTION:
			return setMapLayerOption(
				state,
				action.mapKey,
				action.layerKey,
				action.optionKey,
				action.optionValue
			);
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
		case ActionTypes.MAPS.SET.SET_LAYERS:
			return setSetLayers(state, action.setKey, action.layers);
		case ActionTypes.MAPS.SET.USE.CLEAR:
			return mapSetUseClear(state, action.mapSetKey);
		case ActionTypes.MAPS.SET.USE.REGISTER:
			return mapSetUseRegister(state, action.mapSetKey);
		case ActionTypes.MAPS.SET.VIEW.UPDATE:
			return updateSetView(state, action.setKey, action.update);
		case ActionTypes.MAPS.SET_ACTIVE_MAP_KEY:
			return setActiveMapKey(state, action.mapKey);
		case ActionTypes.MAPS.UPDATE:
			return update(state, action.data);
		default:
			return state;
	}
}
