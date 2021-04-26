"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recomputeSelectorOptions = void 0;

var _fastStringify = _interopRequireDefault(require("fast-stringify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Use fast-stringify instead of default JSON.stringify to get cache key
var serialize = function serialize(args) {
  return (0, _fastStringify["default"])(args);
};

var recomputeSelectorOptions = {
  serialize: serialize
};
exports.recomputeSelectorOptions = recomputeSelectorOptions;