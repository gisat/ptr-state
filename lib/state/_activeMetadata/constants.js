"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STORES_TO_ENSURE_WITH_FILTER_BY_ACTIVE = void 0;

var _Select = _interopRequireDefault(require("../Select"));

var _ActionTypes = _interopRequireDefault(require("../../constants/ActionTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * A list of stores where indexes should be checked, if they depend on given filter by active.
 * The collection item has following structure: {storeKey: [getSubstate, data type, action types, category path ('metadata' by default)]}
 */
var STORES_TO_ENSURE_WITH_FILTER_BY_ACTIVE = {
  areaRelations: [_Select["default"].areaRelations.getSubstate, 'area', _ActionTypes["default"].AREA_RELATIONS, 'relations'],
  areaTrees: [_Select["default"].areas.areaTrees.getSubstate, 'areaTrees', _ActionTypes["default"].AREAS.AREA_TREES],
  areaTreeLevels: [_Select["default"].areas.areaTrees.getSubstate, 'areaTreeLevels', _ActionTypes["default"].AREAS.AREA_TREE_LEVELS],
  attributes: [_Select["default"].attributes.getSubstate, 'attributes', _ActionTypes["default"].ATTRIBUTES],
  attributeSets: [_Select["default"].attributeSets.getSubstate, 'attributes', _ActionTypes["default"].ATTRIBUTE_SETS],
  cases: [_Select["default"].cases.getSubstate, 'cases', _ActionTypes["default"].CASES],
  layerTemplates: [_Select["default"].layerTemplates.getSubstate, 'layerTemplates', _ActionTypes["default"].LAYER_TEMPLATES],
  periods: [_Select["default"].periods.getSubstate, 'periods', _ActionTypes["default"].PERIODS],
  places: [_Select["default"].places.getSubstate, 'places', _ActionTypes["default"].PLACES],
  scenarios: [_Select["default"].scenarios.getSubstate, 'scenarios', _ActionTypes["default"].SCENARIOS],
  scopes: [_Select["default"].scopes.getSubstate, 'scopes', _ActionTypes["default"].SCOPES],
  tags: [_Select["default"].tags.getSubstate, 'tags', _ActionTypes["default"].TAGS],
  views: [_Select["default"].views.getSubstate, 'views', _ActionTypes["default"].VIEWS, 'views']
};
exports.STORES_TO_ENSURE_WITH_FILTER_BY_ACTIVE = STORES_TO_ENSURE_WITH_FILTER_BY_ACTIVE;