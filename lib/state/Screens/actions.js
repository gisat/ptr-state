"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("../../constants/ActionTypes"));

var _Select = _interopRequireDefault(require("../Select"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var timeouts = {}; // ============ creators ===========

function addOrUpdate(setKey, lineage, width, minActiveWidth, component, props) {
  return function (dispatch, getState) {
    var existingScreen = _Select["default"].screens.getScreenByLineage(getState(), lineage);

    if (existingScreen) {
      if (timeouts[lineage]) {
        clearTimeout(timeouts[lineage]);
      }

      dispatch(actionUpdate(setKey, lineage, {
        width: width,
        minActiveWidth: minActiveWidth,
        desiredState: 'opening',
        component: component,
        props: props
      }));
    } else {
      dispatch(actionAdd(setKey, lineage, {
        width: width,
        minActiveWidth: minActiveWidth,
        desiredState: 'opening',
        component: component,
        props: props
      }));
    } // TODO timeout is necessary to actually trigger associated selectors twice


    setTimeout(function () {
      dispatch(open(setKey, lineage));
    }, 1);
  };
}

function ensureSet(setKey) {
  return function (dispatch, getState) {
    var existingSet = _Select["default"].screens.getSetByKey(getState(), setKey);

    if (!existingSet) {
      dispatch(actionAddSet(setKey));
    }
  };
}

function open(setKey, screenLineage) {
  return function (dispatch, getState) {
    if (screenLineage !== 'base') {
      dispatch(actionOpen(setKey, screenLineage));
    }

    dispatch(actionTopHistory(setKey, screenLineage));
  };
}

function close(setKey, screenLineage) {
  return function (dispatch, getState) {
    dispatch(actionClose(setKey, screenLineage));
    dispatch(actionTopHistory(setKey, screenLineage));
    timeouts[screenLineage] = setTimeout(function () {
      dispatch(actionRemove(setKey, screenLineage));
    }, 550);
  };
}

function removeAllScreensFromSet(setKey) {
  return function (dispatch) {
    dispatch(actionRemoveAllScreensFromSet(setKey));
  };
}

function retract(setKey, screenLineage) {
  return function (dispatch, getState) {
    dispatch(actionRetract(setKey, screenLineage));
    dispatch(actionTopHistory(setKey, screenLineage));
  };
}

function topHistory(setKey, screenLineage) {
  return function (dispatch) {
    dispatch(ensureSet(setKey));
    dispatch(actionTopHistory(setKey, screenLineage));
  };
} // ============ actions ===========


var actionAdd = function actionAdd(setKey, lineage, data) {
  return {
    type: _ActionTypes["default"].SCREENS.ADD,
    setKey: setKey,
    lineage: lineage,
    data: data
  };
};

var actionAddSet = function actionAddSet(setKey) {
  return {
    type: _ActionTypes["default"].SCREENS.SETS.ADD,
    setKey: setKey
  };
};

var actionOpen = function actionOpen(setKey, lineage) {
  return {
    type: _ActionTypes["default"].SCREENS.OPEN,
    setKey: setKey,
    lineage: lineage
  };
};

var actionClose = function actionClose(setKey, lineage) {
  return {
    type: _ActionTypes["default"].SCREENS.CLOSE,
    setKey: setKey,
    lineage: lineage
  };
};

var actionRemove = function actionRemove(setKey, lineage) {
  return {
    type: _ActionTypes["default"].SCREENS.REMOVE,
    setKey: setKey,
    lineage: lineage
  };
};

var actionRemoveAllScreensFromSet = function actionRemoveAllScreensFromSet(setKey) {
  return {
    type: _ActionTypes["default"].SCREENS.REMOVE_ALL,
    setKey: setKey
  };
};

var actionRetract = function actionRetract(setKey, lineage) {
  return {
    type: _ActionTypes["default"].SCREENS.RETRACT,
    setKey: setKey,
    lineage: lineage
  };
};

var actionTopHistory = function actionTopHistory(setKey, lineage) {
  return {
    type: _ActionTypes["default"].SCREENS.TOP_HISTORY,
    setKey: setKey,
    lineage: lineage
  };
};

var actionUpdate = function actionUpdate(setKey, lineage, data) {
  return {
    type: _ActionTypes["default"].SCREENS.UPDATE,
    setKey: setKey,
    lineage: lineage,
    data: data
  };
}; // ============ export ===========


var _default = {
  addOrUpdate: addOrUpdate,
  addSet: actionAddSet,
  close: close,
  open: open,
  removeAllScreensFromSet: removeAllScreensFromSet,
  retract: retract,
  topHistory: topHistory
};
exports["default"] = _default;