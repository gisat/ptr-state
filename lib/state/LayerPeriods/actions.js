"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("../../constants/ActionTypes"));

var _lodash = _interopRequireDefault(require("lodash"));

var _path = _interopRequireDefault(require("path"));

var _isomorphicFetch = _interopRequireDefault(require("isomorphic-fetch"));

var _Select = _interopRequireDefault(require("../Select"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TTL = 3; // ============ creators ===========

function loadForAoiLayer(aoi, wmsLayer, ttl) {
  if (_lodash["default"].isUndefined(ttl)) ttl = TTL;
  return function (dispatch, getState) {
    var state = getState();

    var apiBackendProtocol = _Select["default"].app.getLocalConfiguration(state, 'apiBackendProtocol');

    var apiBackendHost = _Select["default"].app.getLocalConfiguration(state, 'apiBackendHost');

    var apiBackendPath = _Select["default"].app.getLocalConfiguration(state, 'apiBackendPath');

    var apiBackendAoiLayerPeriodsPath = _Select["default"].app.getLocalConfiguration(state, 'apiBackendAoiLayerPeriodsPath');

    if (!_lodash["default"].isObject(aoi)) {
      aoi = _lodash["default"].find(_Select["default"].aoi.getAois(getState()), {
        key: aoi
      });
    }

    if (!_lodash["default"].isObject(wmsLayer)) {
      wmsLayer = _lodash["default"].find(getState().wmsLayers.data, {
        key: wmsLayer
      });
    }

    dispatch(actionLoadForAoiRequest(aoi.key, wmsLayer.key));

    var url = apiBackendProtocol + '://' + _path["default"].join(apiBackendHost, apiBackendPath, apiBackendAoiLayerPeriodsPath);

    var body = {
      data: {
        geometry: aoi.geometry,
        layerName: wmsLayer.layerName
      }
    };
    return (0, _isomorphicFetch["default"])(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json'
      }
    }).then(function (response) {
      console.log('#### LayerPeriods receive', response);

      if (response.ok) {
        response.json().then(function (data) {
          if (data) {
            dispatch(actionLoadForAoiLayerReceive(aoi.key, wmsLayer.key, data.dates));
          } else {
            dispatch(actionloadForAoiLayerError(aoi.key, wmsLayer.key, 'no data returned'));
          }
        })["catch"](function (err) {
          if (ttl - 1) {
            loadForAoiLayer(aoi, wmsLayer, ttl - 1);
          }
        });
      } else {
        dispatch(actionloadForAoiLayerError(aoi.key, wmsLayer.key, response));
      }
    });
  };
}

function loadForPlaceLayer(place, wmsLayer, ttl) {
  if (_lodash["default"].isUndefined(ttl)) ttl = TTL;
  return function (dispatch, getState) {
    var state = getState();

    var apiBackendProtocol = _Select["default"].app.getLocalConfiguration(state, 'apiBackendProtocol');

    var apiBackendHost = _Select["default"].app.getLocalConfiguration(state, 'apiBackendHost');

    var apiBackendPath = _Select["default"].app.getLocalConfiguration(state, 'apiBackendPath');

    var apiBackendAoiLayerPeriodsPath = _Select["default"].app.getLocalConfiguration(state, 'apiBackendAoiLayerPeriodsPath');

    if (!_lodash["default"].isObject(place)) {
      place = _lodash["default"].find(_Select["default"].places.getPlaces(getState()), {
        key: place
      });
    }

    if (!_lodash["default"].isObject(wmsLayer)) {
      wmsLayer = _lodash["default"].find(getState().wmsLayers.data, {
        key: wmsLayer
      });
    }

    dispatch(actionLoadForPlaceRequest(place.key, wmsLayer.key));

    var url = apiBackendProtocol + '://' + _path["default"].join(apiBackendHost, apiBackendPath, apiBackendAoiLayerPeriodsPath);

    var body = {
      data: {
        geometry: place.geometry,
        layerName: wmsLayer.layerName
      }
    };
    return (0, _isomorphicFetch["default"])(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json'
      }
    }).then(function (response) {
      console.log('#### LayerPeriods receive', response);

      if (response.ok) {
        response.json().then(function (data) {
          if (data) {
            dispatch(actionLoadForPlaceLayerReceive(place.key, wmsLayer.key, data.dates));
          } else {
            dispatch(actionLoadForPlaceLayerError(place.key, wmsLayer.key, 'no data returned'));
          }
        })["catch"](function (err) {
          if (ttl - 1) {
            loadForPlaceLayer(place, wmsLayer, ttl - 1);
          }
        });
      } else {
        dispatch(actionLoadForPlaceLayerError(place.key, wmsLayer.key, response));
      }
    });
  };
}

function loadForKeyLayer(key, geometry, wmsLayer, ttl) {
  if (_lodash["default"].isUndefined(ttl)) ttl = TTL;
  return function (dispatch, getState) {
    var state = getState();

    var localConfig = _Select["default"].app.getCompleteLocalConfiguration(state);

    if (!_lodash["default"].isObject(wmsLayer)) {
      wmsLayer = _lodash["default"].find(state.wmsLayers.data, {
        key: wmsLayer
      });
    }

    dispatch(actionLoadForKeyLayerRequest(key, geometry, wmsLayer.key));

    var url = localConfig.apiBackendProtocol + '://' + _path["default"].join(localConfig.apiBackendHost, localConfig.apiBackendPath, localConfig.apiBackendAoiLayerPeriodsPath);

    var body = {
      data: {
        geometry: geometry,
        layerName: wmsLayer.layerName
      }
    };
    return (0, _isomorphicFetch["default"])(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json'
      }
    }).then(function (response) {
      console.log('#### LayerPeriods receive', response);

      if (response.ok) {
        response.json().then(function (data) {
          if (data) {
            dispatch(actionLoadForKeyLayerReceive(key, geometry, wmsLayer.key, data.dates));
          } else {
            dispatch(actionLoadForKeyLayerError(key, geometry, wmsLayer.key, 'no data returned'));
          }
        })["catch"](function (err) {
          if (ttl - 1) {
            loadForKeyLayer(key, geometry, wmsLayer, ttl - 1);
          }
        });
      } else {
        dispatch(actionLoadForKeyLayerError(key, geometry, wmsLayer.key, response));
      }
    });
  };
}

function loadForAoi(aoiKey) {
  return function (dispatch, getState) {
    var state = getState();

    var aoi = _lodash["default"].find(_Select["default"].aoi.getAois(state), {
      key: aoiKey
    });

    _lodash["default"].each(state.wmsLayers.data, function (wmsLayer) {
      if (wmsLayer.getDates) dispatch(loadForAoiLayer(aoi, wmsLayer));
    });
  };
}

function loadForPlace(placeKey) {
  return function (dispatch, getState) {
    var state = getState();

    var place = _lodash["default"].find(_Select["default"].places.getPlaces(state), {
      key: placeKey
    });

    if (place && place.geometry) {
      _lodash["default"].each(state.wmsLayers.data, function (wmsLayer) {
        if (wmsLayer.getDates) dispatch(loadForPlaceLayer(place, wmsLayer));
      });
    }
  };
}

function loadForKey(key, geometry) {
  return function (dispatch, getState) {
    var state = getState();

    var layers = _Select["default"].wmsLayers.getLayersWithGetDate(state);

    _lodash["default"].each(layers, function (wmsLayer) {
      dispatch(loadForKeyLayer(key, geometry, wmsLayer));
    });
  };
} //function loadReceive(features, aoiLayer) {
//	return dispatch => {
//		features = _.map(features, feature => {
//			return {
//				key: feature.properties[aoiLayer.fidColumn || 'fid'],
//				code: feature.properties[aoiLayer.idColumn]
//			};
//		});
//		dispatch(actionLoadReceive(features));
//	};
//}
// ============ actions ===========


function actionLoadForAoiRequest(aoiKey, layerKey) {
  return {
    type: _ActionTypes["default"].LAYER_PERIODS_AOI_LAYER_REQUEST,
    aoiKey: aoiKey,
    layerKey: layerKey
  };
}

function actionLoadForAoiLayerReceive(aoiKey, layerKey, periods) {
  return {
    type: _ActionTypes["default"].LAYER_PERIODS_AOI_LAYER_RECEIVE,
    aoiKey: aoiKey,
    layerKey: layerKey,
    periods: periods
  };
}

function actionloadForAoiLayerError(aoiKey, layerKey, error) {
  return {
    type: _ActionTypes["default"].LAYER_PERIODS_AOI_LAYER_REQUEST_ERROR,
    aoiKey: aoiKey,
    layerKey: layerKey,
    error: error
  };
}

function actionLoadForPlaceRequest(placeKey, layerKey) {
  return {
    type: _ActionTypes["default"].LAYER_PERIODS_PLACE_LAYER_REQUEST,
    placeKey: placeKey,
    layerKey: layerKey
  };
}

function actionLoadForPlaceLayerReceive(placeKey, layerKey, periods) {
  return {
    type: _ActionTypes["default"].LAYER_PERIODS_PLACE_LAYER_RECEIVE,
    placeKey: placeKey,
    layerKey: layerKey,
    periods: periods
  };
}

function actionLoadForPlaceLayerError(placeKey, layerKey, error) {
  return {
    type: _ActionTypes["default"].LAYER_PERIODS_PLACE_LAYER_REQUEST_ERROR,
    placeKey: placeKey,
    layerKey: layerKey,
    error: error
  };
}

function actionLoadForKeyLayerRequest(key, geometry, layerKey) {
  return {
    type: _ActionTypes["default"].LAYER_PERIODS_KEY_LAYER_REQUEST,
    key: key,
    geometry: geometry,
    layerKey: layerKey
  };
}

function actionLoadForKeyLayerReceive(key, geometry, layerKey, periods) {
  return {
    type: _ActionTypes["default"].LAYER_PERIODS_KEY_LAYER_RECEIVE,
    key: key,
    geometry: geometry,
    layerKey: layerKey,
    periods: periods
  };
}

function actionLoadForKeyLayerError(key, geometry, layerKey, error) {
  return {
    type: _ActionTypes["default"].LAYER_PERIODS_KEY_LAYER_REQUEST_ERROR,
    key: key,
    geometry: geometry,
    layerKey: layerKey,
    error: error
  };
} // ============ export ===========


var _default = {
  loadForAoi: loadForAoi,
  loadForPlace: loadForPlace,
  loadForKey: loadForKey
};
exports["default"] = _default;