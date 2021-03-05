import _, {isMatch as _isMatch} from 'lodash';
import {map as mapUtils} from '@gisatcz/ptr-utils';

import ActionTypes from '../../constants/ActionTypes';
import Select from '../../state/Select';
import commonHelpers from '../_common/helpers';
import commonSelectors from '../_common/selectors';

import DataActions from '../Data/actions';
import {TILED_VECTOR_LAYER_TYPES} from '../Data/constants';
import StylesActions from '../Styles/actions';

import helpers from './selectorHelpers';
import SelectionsAction from '../Selections/actions';

/* ==================================================
 * CREATORS
 * ================================================== */

/**
 * Clear use of the map set
 * @param mapSetKey {string}
 */
const mapSetUseClear = mapSetKey => {
	return (dispatch, getState) => {
		const registered = Select.maps.isMapSetInUse(getState(), mapSetKey);
		if (registered) {
			dispatch(actionMapSetUseClear(mapSetKey));
		}
	};
};

/**
 * Register use of the map set
 * @param mapSetKey {string}
 */
const mapSetUseRegister = mapSetKey => {
	return (dispatch, getState) => {
		const alreadyRegistered = Select.maps.isMapSetInUse(getState(), mapSetKey);
		if (!alreadyRegistered) {
			dispatch(actionMapSetUseRegister(mapSetKey));
		}
	};
};

/**
 * Clear use of the map
 * @param mapKey {string}
 */
const mapUseClear = mapKey => {
	return (dispatch, getState) => {
		const registered = Select.maps.isMapInUse(getState(), mapKey);
		if (registered) {
			dispatch(actionMapUseClear(mapKey));
		}
	};
};

/**
 * Register use of the map
 * @param mapKey {string}
 */
const mapUseRegister = mapKey => {
	return (dispatch, getState) => {
		const alreadyRegistered = Select.maps.isMapInUse(getState(), mapKey);
		if (!alreadyRegistered) {
			dispatch(actionMapUseRegister(mapKey));
		}
	};
};

/**
 * @param mapKey {string}
 * @param backgroundLayer {Object} background layer definition
 * @param layers {Object} layers definition
 * @param mapWidth {number} width of map component in px
 * @param mapHeight {number} height of map component in px
 */
function use(mapKey, backgroundLayer, layers, mapWidth, mapHeight) {
	return (dispatch, getState) => {
		dispatch(mapUseRegister(mapKey));
		const state = getState();

		const spatialFilter = Select.maps.getSpatialFilterByMapKey(
			state,
			mapKey,
			mapWidth,
			mapHeight
		);
		//spatial filter is required for now
		if (!spatialFilter) {
			return;
		}
		const activeKeys = commonSelectors.getAllActiveKeys(state);

		// uncontrolled map - the map is not controlled from store, but layer data is collected based on stored metadata.
		if (backgroundLayer || layers) {
			layers = helpers.mergeBackgroundLayerWithLayers(layers, backgroundLayer);
		}
		// controlled map (with stateMapKey) - the map is completely controlled from store
		else {
			layers = Select.maps.getAllLayersStateByMapKey(state, mapKey);
		}

		if (layers) {
			layers.forEach(layer =>
				// apply layerUse asynchronous on each leyer
				// it cause better FPS and prevent long synchronous tasks
				setTimeout(() => {
					dispatch(layerUse(layer, spatialFilter, activeKeys));
				}, 0)
			);
		}
	};
}

/**
 * @param activeKeys {Object} active metadata keys (such as activeApplicationKey, activeScopeKey etc.)
 * @param layerState {Object} layer definition
 * @param spatialFilter {{level: number}, {tiles: Array}}
 */
function layerUse(layerState, spatialFilter, activeKeys) {
	return (dispatch, getState) => {
		const state = getState();
		const styleKey = layerState.styleKey || null;

		// TODO ensure style here for now
		if (styleKey) {
			dispatch(
				StylesActions.useKeys(
					[layerState.styleKey],
					layerState.key + '_layerUse'
				)
			);
		}

		// modifiers defined by key
		let metadataDefinedByKey = layerState.metadataModifiers
			? {...layerState.metadataModifiers}
			: {};

		// add layerTemplate od areaTreeLevelKey
		if (layerState.layerTemplateKey) {
			metadataDefinedByKey.layerTemplateKey = layerState.layerTemplateKey;
			// TODO use layerTemplate here?
		} else if (layerState.areaTreeLevelKey) {
			metadataDefinedByKey.areaTreeLevelKey = layerState.areaTreeLevelKey;
			// TODO use areaTreeLevelKey here?
		}

		// Get actual metadata keys defined by filterByActive
		const activeMetadataKeys = layerState.filterByActive
			? commonSelectors.getActiveKeysByFilterByActive(
					state,
					layerState.filterByActive
			  )
			: null;

		// Merge metadata, metadata defined by key have priority
		const mergedMetadataKeys = commonHelpers.mergeMetadataKeys(
			metadataDefinedByKey,
			activeMetadataKeys
		);

		// Decouple modifiers from templates
		const {
			areaTreeLevelKey,
			layerTemplateKey,
			applicationKey,
			...modifiers
		} = mergedMetadataKeys;

		// It converts modifiers from metadataKeys: ["A", "B"] to metadataKey: {in: ["A", "B"]}
		const modifiersForRequest = commonHelpers.convertModifiersToRequestFriendlyFormat(
			modifiers
		);
		if (layerTemplateKey || areaTreeLevelKey) {
			let commonRelationsFilter = {};
			if (areaTreeLevelKey) {
				commonRelationsFilter = {...modifiersForRequest, areaTreeLevelKey};
			}

			if (layerTemplateKey) {
				commonRelationsFilter = {...modifiersForRequest, layerTemplateKey};
			}

			if (layerTemplateKey) {
				const order = null;
				const spatialDataSources = Select.data.spatialDataSources.getByFilteredIndex(
					state,
					commonRelationsFilter,
					order
				);
				const sdsContainsVector =
					spatialDataSources?.some(spatialDataSource =>
						TILED_VECTOR_LAYER_TYPES.includes(spatialDataSource?.data?.type)
					) || false;
				// load only dataSources that are supported type
				if (spatialDataSources && !sdsContainsVector) {
					return;
				}
			}

			dispatch(
				DataActions.ensure(styleKey, commonRelationsFilter, spatialFilter)
			);
		}
	};
}

/**
 * Ensure indexes with filter by active for each active map
 * @param filterByActive {Object}
 */
function ensureWithFilterByActive(filterByActive) {
	return (dispatch, getState) => {
		const state = getState();
		const activeKeys = commonSelectors.getAllActiveKeys(state);
		const mapKeys = Select.maps.getAllMapsInUse(state);

		if (mapKeys && activeKeys) {
			mapKeys.forEach(mapKey => {
				const mapViewport = Select.maps.getViewportByMapKey(state, mapKey);
				if (mapViewport) {
					const {width, height} = mapViewport;
					const spatialFilter = Select.maps.getSpatialFilterByMapKey(
						state,
						mapKey,
						width,
						height
					);

					if (spatialFilter) {
						const layers = Select.maps.getAllLayersStateByMapKey(state, mapKey);
						if (layers) {
							layers.forEach(layer => {
								if (
									layer.filterByActive &&
									_isMatch(layer.filterByActive, filterByActive)
								) {
									// apply layerUse asynchronous on each leyer
									// it cause better FPS and prevent long synchronous tasks
									setTimeout(() => {
										dispatch(layerUse(layer, spatialFilter, activeKeys));
									}, 0);
								}
							});
						}
					}
				}
			});
		}
	};
}

/**
 * @param mapKey {string}
 * @param layerKey {string}
 * @param selectedFeatureKeys {Array}
 */
function setLayerSelectedFeatureKeys(mapKey, layerKey, selectedFeatureKeys) {
	return (dispatch, getState) => {
		const state = getState();
		const layer = Select.maps.getLayerStateByLayerKeyAndMapKey(
			state,
			mapKey,
			layerKey
		);
		if (layer?.options?.selectable) {
			const activeSelectionKey = Select.selections.getActiveKey(state);
			if (
				activeSelectionKey &&
				layer.options.selected?.hasOwnProperty(activeSelectionKey)
			) {
				// TODO possible conflicts if features with same key from different layers are selected
				dispatch(
					SelectionsAction.setActiveSelectionFeatureKeysFilterKeys(
						selectedFeatureKeys
					)
				);
			} else {
				// TODO what if there is no active selection?
			}
		}
	};
}

/**
 * @param mapKey {string}
 * @param layerKey {string}
 * @param styleKey {string}
 */
function setMapLayerStyleKey(mapKey, layerKey, styleKey) {
	return dispatch => {
		dispatch(actionSetMapLayerStyleKey(mapKey, layerKey, styleKey));
	};
}

/**
 * @param mapKey {string}
 */
function setMapSetActiveMapKey(mapKey) {
	return (dispatch, getState) => {
		let set = Select.maps.getMapSetByMapKey(getState(), mapKey);
		if (set) {
			dispatch(actionSetMapSetActiveMapKey(set.key, mapKey));
		}
	};
}

/**
 * @param setKey {string}
 * @param backgroundLayer {Object} background layer definition
 */
function setMapSetBackgroundLayer(setKey, backgroundLayer) {
	return (dispatch, getState) => {
		dispatch(actionSetMapSetBackgroundLayer(setKey, backgroundLayer));
		const maps = Select.maps.getMapSetMaps(getState(), setKey);
		if (maps) {
			maps.forEach(map => {
				// TODO is viewport always defined?
				dispatch(
					use(
						map.key,
						null,
						null,
						map?.data?.viewport?.width,
						map?.data?.viewport?.height
					)
				);
			});
		}
	};
}

/**
 * @param setKey {string}
 */
function refreshMapSetUse(setKey) {
	return (dispatch, getState) => {
		const maps = Select.maps.getMapSetMaps(getState(), setKey);
		if (maps) {
			maps.forEach(map => {
				// TODO is viewport always defined?
				dispatch(
					use(
						map.key,
						null,
						null,
						map?.data?.viewport?.width,
						map?.data?.viewport?.height
					)
				);
			});
		}
	};
}

/**
 * @param setKey {string}
 * @param mapKey {string}
 */
function removeMapFromSet(setKey, mapKey) {
	return (dispatch, getState) => {
		const state = getState();
		const mapSetMapKeys = Select.maps.getMapSetMapKeys(state, setKey);
		if (mapSetMapKeys && mapSetMapKeys.includes(mapKey)) {
			const activeMapKey = Select.maps.getMapSetActiveMapKey(state, setKey);
			dispatch(actionRemoveMapFromSet(setKey, mapKey));

			// if map to remove is active at the same time
			if (activeMapKey === mapKey) {
				// check map set map keys again & set first map as active
				const mapSetMapKeys = Select.maps.getMapSetMapKeys(getState(), setKey);
				if (mapSetMapKeys) {
					dispatch(actionSetMapSetActiveMapKey(setKey, mapSetMapKeys[0]));
				}
			}
		}
	};
}

/**
 * @param mapKey {string}
 * @param update {Object} map view fragment
 */
function updateMapAndSetView(mapKey, update) {
	return (dispatch, getState) => {
		let set = Select.maps.getMapSetByMapKey(getState(), mapKey);
		let forSet, forMap;

		if (set && set.sync) {
			// pick key-value pairs that are synced for set
			forSet = _.pickBy(update, (updateVal, updateKey) => {
				return set.sync[updateKey];
			});

			forMap = _.omitBy(update, (updateVal, updateKey) => {
				return set.sync[updateKey];
			});
		} else {
			forMap = update;
		}

		if (forSet && !_.isEmpty(forSet)) {
			//check data integrity
			forSet = mapUtils.view.ensureViewIntegrity(forSet); //TODO test
			dispatch(actionUpdateSetView(set.key, forSet));
		}

		if (forMap && !_.isEmpty(forMap)) {
			//check data integrity
			forMap = mapUtils.view.ensureViewIntegrity(forMap); //TODO test
			dispatch(actionUpdateMapView(mapKey, forMap));
		}
	};
}

/**
 * @param setKey {string}
 * @param update {Object} map view fragment
 */
function updateSetView(setKey, update) {
	return (dispatch, getState) => {
		let activeMapKey = Select.maps.getMapSetActiveMapKey(getState(), setKey);
		dispatch(updateMapAndSetView(activeMapKey, update));
	};
}

/**
 * Update whole maps state from view definition
 * @param data {Object}
 */
function updateStateFromView(data) {
	return dispatch => {
		if (data) {
			dispatch(actionUpdate(data));
		}
	};
}

/* ==================================================
 * ACTIONS
 * ================================================== */

const actionRemoveMapFromSet = (setKey, mapKey) => {
	return {
		type: ActionTypes.MAPS.SET.REMOVE_MAP,
		setKey,
		mapKey,
	};
};

const actionSetMapLayerStyleKey = (mapKey, layerKey, styleKey) => {
	return {
		type: ActionTypes.MAPS.MAP.LAYERS.SET_STYLE_KEY,
		mapKey,
		layerKey,
		styleKey,
	};
};

const actionSetMapSetActiveMapKey = (setKey, mapKey) => {
	return {
		type: ActionTypes.MAPS.SET.SET_ACTIVE_MAP_KEY,
		mapKey,
		setKey,
	};
};

const actionSetMapSetBackgroundLayer = (setKey, backgroundLayer) => {
	return {
		type: ActionTypes.MAPS.SET.SET_BACKGROUND_LAYER,
		setKey,
		backgroundLayer,
	};
};

const actionSetMapViewport = (mapKey, width, height) => {
	return {
		type: ActionTypes.MAPS.MAP.VIEWPORT.SET,
		mapKey,
		width,
		height,
	};
};

const actionUpdate = data => {
	return {
		type: ActionTypes.MAPS.UPDATE,
		data,
	};
};

const actionUpdateMapView = (mapKey, update) => {
	return {
		type: ActionTypes.MAPS.MAP.VIEW.UPDATE,
		mapKey,
		update,
	};
};

const actionUpdateSetView = (setKey, update) => {
	return {
		type: ActionTypes.MAPS.SET.VIEW.UPDATE,
		setKey,
		update,
	};
};

const actionMapSetUseClear = mapSetKey => {
	return {
		type: ActionTypes.MAPS.SET.USE.CLEAR,
		mapSetKey,
	};
};

const actionMapSetUseRegister = mapSetKey => {
	return {
		type: ActionTypes.MAPS.SET.USE.REGISTER,
		mapSetKey,
	};
};

const actionMapUseClear = mapKey => {
	return {
		type: ActionTypes.MAPS.MAP.USE.CLEAR,
		mapKey,
	};
};

const actionMapUseRegister = mapKey => {
	return {
		type: ActionTypes.MAPS.MAP.USE.REGISTER,
		mapKey,
	};
};

// ============ export ===========
export default {
	ensureWithFilterByActive,
	mapSetUseClear,
	mapSetUseRegister,
	mapUseClear,
	mapUseRegister,
	refreshMapSetUse,
	removeMapFromSet,
	setLayerSelectedFeatureKeys,
	setMapLayerStyleKey,
	setMapSetActiveMapKey,
	setMapSetBackgroundLayer,
	setMapViewport: actionSetMapViewport,
	updateMapAndSetView,
	updateSetView,
	updateStateFromView,
	use,
};
