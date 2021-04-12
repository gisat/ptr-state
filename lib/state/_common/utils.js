"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeParameterizedSelector = makeParameterizedSelector;
exports.RecomputeSerialize = exports.RecomputeCache = void 0;

var _rereselect = require("@taskworld.com/rereselect");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function makeParameterizedSelector(displayName, selectionLogicGenerator) {
  var memoized = new Map();
  return Object.assign(function selectorFactory() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var key = args.join(',');
    if (memoized.has(key)) return memoized.get(key);
    var name = "".concat(displayName, "(").concat(key, ")");
    var selectionLogic = selectionLogicGenerator.apply(void 0, args);
    var selector = (0, _rereselect.makeSelector)(selectionLogic);
    selector.displayName = name;
    memoized.set(key, selector);
    return selector;
  }, {
    displayName: displayName
  });
}

var RecomputeCache = /*#__PURE__*/function () {
  function RecomputeCache() {
    _classCallCheck(this, RecomputeCache);

    this.contents = {};
  }

  _createClass(RecomputeCache, [{
    key: "get",
    value: function get(key) {
      return this.contents[key];
    }
  }, {
    key: "set",
    value: function set(key, value) {
      this.contents[key] = value;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.contents = {};
    }
  }]);

  return RecomputeCache;
}();

exports.RecomputeCache = RecomputeCache;

var RecomputeSerialize = function RecomputeSerialize(args) {
  return JSON.stringify(args);
};

exports.RecomputeSerialize = RecomputeSerialize;