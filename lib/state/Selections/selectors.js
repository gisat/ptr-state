"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _selectors = _interopRequireDefault(require("../_common/selectors"));

var _selectors2 = _interopRequireDefault(require("../Styles/selectors"));

var _reselect = require("reselect");

var _recompute = require("@jvitela/recompute");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getSubstate = function getSubstate(state) {
  return state.selections;
};

var getActive = _selectors["default"].getActive(getSubstate);

var getActiveKey = _selectors["default"].getActiveKey(getSubstate);

var getAllAsObject = _selectors["default"].getAllAsObject(getSubstate);

var getAll = _selectors["default"].getAll(getSubstate);

var getAllAsObjectWithStyles = (0, _reselect.createSelector)([getAllAsObject, _selectors2["default"].getAllAsObject], function (selections, allStyles) {
  if (selections) {
    if (allStyles) {
      var selectionsWithStyles = {};

      _lodash["default"].forIn(selections, function (selection, key) {
        var _selection$data;

        var styleKey = (_selection$data = selection.data) === null || _selection$data === void 0 ? void 0 : _selection$data.styleKey;

        if (styleKey && allStyles[styleKey]) {
          var _allStyles$styleKey$d, _allStyles$styleKey$d2, _allStyles$styleKey$d3, _allStyles$styleKey$d4;

          var selectionStyle = (_allStyles$styleKey$d = allStyles[styleKey].data) === null || _allStyles$styleKey$d === void 0 ? void 0 : (_allStyles$styleKey$d2 = _allStyles$styleKey$d.definition) === null || _allStyles$styleKey$d2 === void 0 ? void 0 : (_allStyles$styleKey$d3 = _allStyles$styleKey$d2.rules) === null || _allStyles$styleKey$d3 === void 0 ? void 0 : (_allStyles$styleKey$d4 = _allStyles$styleKey$d3[0].styles) === null || _allStyles$styleKey$d4 === void 0 ? void 0 : _allStyles$styleKey$d4[0]; // TODO get first style of first rule for now

          if (selectionStyle) {
            selectionsWithStyles[key] = _objectSpread(_objectSpread({}, selection), {}, {
              data: _objectSpread(_objectSpread({}, selection.data), {}, {
                style: selectionStyle
              })
            });
          } else {
            selectionsWithStyles[key] = selection;
          }
        } else {
          selectionsWithStyles[key] = selection;
        }
      });

      return selectionsWithStyles;
    } else {
      return selections;
    }
  } else {
    return null;
  }
});
var getByKeyObserver = (0, _recompute.createObserver)(function (state, key) {
  return state.selections.byKey[key];
});
var prepareSelectionByLayerStateSelected = (0, _recompute.createSelector)(function (layerStateSelected) {
  var populatedSelections = {};

  _lodash["default"].forIn(layerStateSelected, function (value, key) {
    var selection = getByKeyObserver(key);
    var selectionData = selection === null || selection === void 0 ? void 0 : selection.data;

    if (selectionData) {
      var style = selectionData.style;
      var hoveredStyle = selectionData.hoveredStyle || style;
      var color = selectionData.color;
      var hoveredColor = selectionData.hoveredColor || color;

      if (selectionData.featureKeysFilter) {
        populatedSelections[key] = {
          keys: selectionData.featureKeysFilter.keys
        };

        if (style) {
          populatedSelections[key].style = style;
          populatedSelections[key].hoveredStyle = hoveredStyle;
        } else {
          populatedSelections[key].style = {
            outlineColor: color,
            outlineWidth: 2
          };
          populatedSelections[key].hoveredStyle = {
            outlineColor: hoveredColor,
            outlineWidth: 2
          };
        }
      } //TODO other selection types

    }
  });

  return populatedSelections;
});
var _default = {
  getActiveKey: getActiveKey,
  getActive: getActive,
  getAll: getAll,
  getAllAsObject: getAllAsObject,
  getAllAsObjectWithStyles: getAllAsObjectWithStyles,
  prepareSelectionByLayerStateSelected: prepareSelectionByLayerStateSelected
};
exports["default"] = _default;