import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
export { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
export { default as thunk } from 'redux-thunk';
import logger from 'redux-logger';
export { default as logger } from 'redux-logger';
import { reduxBatch } from '@manaflair/redux-batch';
export { reduxBatch } from '@manaflair/redux-batch';
import { createObserver, createSelector as createSelector$1, setState } from '@jvitela/recompute';
export { createObserver as createRecomputeObserver, createSelector as createRecomputeSelector, setState as setRecomputeState } from '@jvitela/recompute';
import { connect } from 'react-redux';
export { Provider, connect } from 'react-redux';
import { utils, CacheFifo, map } from '@gisatcz/ptr-utils';
import _get from 'lodash/get';
import _isUndefined from 'lodash/isUndefined';
import _fetch from 'isomorphic-fetch';
import path from 'path';
import queryString from 'query-string';
import { createSelector } from 'reselect';
import _map from 'lodash/map';
import _flatMap from 'lodash/flatMap';
import _find2 from 'lodash/find';
import _remove from 'lodash/remove';
import _isObject2 from 'lodash/isObject';
import _forIn from 'lodash/forIn';
import _chunk from 'lodash/chunk';
import _each from 'lodash/each';
import _isEmpty2 from 'lodash/isEmpty';
import _isArray2 from 'lodash/isArray';
import _isEqual2 from 'lodash/isEqual';
import moment from 'moment';
import _tail2 from 'lodash/tail';
import _sortBy2 from 'lodash/sortBy';
import _reduce from 'lodash/reduce';
import _isNumber from 'lodash/isNumber';
import _head2 from 'lodash/head';
import createCachedSelector from 're-reselect';
import _pickBy2 from 'lodash/pickBy';
import _pick2 from 'lodash/pick';
import _difference from 'lodash/difference';
import _forEach from 'lodash/forEach';
import _filter from 'lodash/filter';
import stringify from 'fast-stringify';
import _includes from 'lodash/includes';
import _isMatch2 from 'lodash/isMatch';
import _isFinite2 from 'lodash/isFinite';
import { configDefaults, mapConstants } from '@gisatcz/ptr-core';
import _flatten2 from 'lodash/flatten';
import _compact2 from 'lodash/compact';
import _omitBy from 'lodash/omitBy';
import { grid } from '@gisatcz/ptr-tile-grid';
import _intersection from 'lodash/intersection';
import _flattenDeep from 'lodash/flattenDeep';
import _values from 'lodash/values';
import React from 'react';
import _union2 from 'lodash/union';
import _omit2 from 'lodash/omit';
import _findIndex2 from 'lodash/findIndex';
import _indexOf2 from 'lodash/indexOf';
import _without from 'lodash/without';

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];

  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }

  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");

  return typeof key === "symbol" ? key : String(key);
}

var commonActionTypes = utils.deepKeyMirror({
  APP: {
    SET_KEY: null,
    SET_BASE_URL: null,
    SET_LOCAL_CONFIGURATION: null,
    UPDATE_LOCAL_CONFIGURATION: null,
    RECEIVE_CONFIGURATION: null
  },
  AREAS: {
    AREA_TREE_LEVELS: {
      ADD: null,
      ADD_UNRECEIVED: null,
      ENSURE: {
        ERROR: null
      },
      INDEX: {
        ADD: null,
        CLEAR_ALL: null
      },
      LOAD: {
        ERROR: null,
        REQUEST: null
      },
      SET_ACTIVE_KEY: null,
      USE: {
        INDEXED: {
          CLEAR: null,
          REGISTER: null
        },
        KEYS: {
          CLEAR: null,
          REGISTER: null
        }
      }
    },
    AREA_TREES: {
      ADD: null,
      ADD_UNRECEIVED: null,
      ENSURE: {
        ERROR: null
      },
      INDEX: {
        ADD: null,
        CLEAR_ALL: null
      },
      LOAD: {
        ERROR: null,
        REQUEST: null
      },
      SET_ACTIVE_KEY: null,
      USE: {
        INDEXED: {
          CLEAR: null,
          REGISTER: null
        },
        KEYS: {
          CLEAR: null,
          REGISTER: null
        }
      }
    }
  },
  AREA_RELATIONS: {
    ADD: null,
    ADD_UNRECEIVED: null,
    ENSURE: {
      ERROR: null
    },
    INDEX: {
      ADD: null,
      CLEAR_ALL: null
    },
    USE: {
      INDEXED: {
        CLEAR: null,
        CLEAR_ALL: null,
        REGISTER: null
      }
    }
  },
  ATTRIBUTES: {
    ADD: null,
    ADD_UNRECEIVED: null,
    DELETE: null,
    MARK_DELETED: null,
    EDITED: {
      REMOVE: null,
      REMOVE_ACTIVE: null,
      REMOVE_PROPERTY: null,
      UPDATE: null
    },
    ENSURE: {
      ERROR: null
    },
    INDEX: {
      ADD: null,
      CLEAR_ALL: null,
      CLEAR_INDEX: null
    },
    LOAD: {
      ERROR: null,
      REQUEST: null
    },
    SET_ACTIVE_KEY: null,
    SET_ACTIVE_KEYS: null,
    UPDATE_STORE: null,
    USE: {
      INDEXED: {
        CLEAR: null,
        CLEAR_ALL: null,
        REGISTER: null
      },
      KEYS: {
        CLEAR: null,
        REGISTER: null
      }
    }
  },
  ATTRIBUTE_SETS: {
    ADD: null,
    ADD_UNRECEIVED: null,
    DELETE: null,
    MARK_DELETED: null,
    EDITED: {
      REMOVE: null,
      REMOVE_ACTIVE: null,
      REMOVE_PROPERTY: null,
      UPDATE: null
    },
    ENSURE: {
      ERROR: null
    },
    INDEX: {
      ADD: null,
      CLEAR_ALL: null,
      CLEAR_INDEX: null
    },
    LOAD: {
      ERROR: null,
      REQUEST: null
    },
    SET_ACTIVE_KEY: null,
    SET_ACTIVE_KEYS: null,
    UPDATE_STORE: null,
    USE: {
      INDEXED: {
        CLEAR: null,
        CLEAR_ALL: null,
        REGISTER: null
      },
      KEYS: {
        CLEAR: null,
        REGISTER: null
      }
    }
  },
  CASES: {
    ADD: null,
    ADD_UNRECEIVED: null,
    DELETE: null,
    MARK_DELETED: null,
    EDITED: {
      REMOVE: null,
      REMOVE_ACTIVE: null,
      REMOVE_PROPERTY: null,
      UPDATE: null
    },
    ENSURE: {
      ERROR: null
    },
    INDEX: {
      ADD: null,
      CLEAR_ALL: null,
      CLEAR_INDEX: null
    },
    LOAD: {
      ERROR: null,
      REQUEST: null
    },
    SET_ACTIVE_KEY: null,
    SET_ACTIVE_KEYS: null,
    UPDATE_STORE: null,
    USE: {
      INDEXED: {
        CLEAR: null,
        CLEAR_ALL: null,
        REGISTER: null
      },
      KEYS: {
        CLEAR: null,
        REGISTER: null
      }
    }
  },
  COMMON: {
    DATA: {
      CLEANUP_ON_LOGOUT: null,
      SET_OUTDATED: null
    },
    EDITED: {
      REMOVE_PROPERTY_VALUES: null
    }
  },
  COMPONENTS: {
    SET: null,
    UPDATE: null,
    UPDATE_STORE: null
  },
  DATA: {
    ATTRIBUTE_DATA: {
      ADD: null,
      ADD_WITH_INDEX: null,
      ADD_WITH_SPATIAL_INDEX: null,
      UPDATE: null,
      UPDATE_STORE: null,
      INDEX: {
        ADD: null,
        REMOVE: null
      },
      SPATIAL_INDEX: {
        ADD: null,
        REMOVE: null
      }
    },
    ATTRIBUTE_DATA_SOURCES: {
      ADD: null,
      UPDATE_STORE: null,
      INDEX: {
        ADD: null
      }
    },
    ATTRIBUTE_RELATIONS: {
      ADD: null,
      UPDATE_STORE: null,
      INDEX: {
        ADD: null
      }
    },
    COMPONENTS: {
      COMPONENT: {
        SET: {
          ATTRIBUTE_KEYS: null
        },
        USE: {
          CLEAR: null,
          REGISTER: null
        }
      },
      UPDATE_COMPONENTS: null
    },
    SPATIAL_DATA: {
      ADD: null,
      ADD_WITH_INDEX: null,
      INDEX: {
        ADD: null,
        REMOVE: null
      }
    },
    SPATIAL_DATA_SOURCES: {
      ADD: null,
      INDEX: {
        ADD: null
      }
    },
    SPATIAL_RELATIONS: {
      ADD: null,
      INDEX: {
        ADD: null
      }
    },
    UPDATE: null
  },
  LAYER_TEMPLATES: {
    ADD: null,
    ADD_UNRECEIVED: null,
    DELETE: null,
    MARK_DELETED: null,
    EDITED: {
      REMOVE: null,
      REMOVE_ACTIVE: null,
      REMOVE_PROPERTY: null,
      UPDATE: null
    },
    ENSURE: {
      ERROR: null
    },
    INDEX: {
      ADD: null,
      CLEAR_INDEX: null,
      CLEAR_ALL: null
    },
    LOAD: {
      ERROR: null,
      REQUEST: null
    },
    SET_ACTIVE_KEY: null,
    SET_ACTIVE_KEYS: null,
    UPDATE_STORE: null,
    USE: {
      INDEXED: {
        CLEAR: null,
        CLEAR_ALL: null,
        REGISTER: null
      },
      KEYS: {
        CLEAR: null,
        REGISTER: null
      }
    }
  },
  LAYER_TREES: {
    ADD: null,
    ADD_UNRECEIVED: null,
    DELETE: null,
    MARK_DELETED: null,
    EDITED: {
      REMOVE: null,
      REMOVE_PROPERTY: null,
      UPDATE: null
    },
    ENSURE: {
      ERROR: null
    },
    INDEX: {
      ADD: null,
      CLEAR_INDEX: null,
      CLEAR_ALL: null
    },
    LOAD: {
      ERROR: null,
      REQUEST: null
    },
    UPDATE_STORE: null,
    USE: {
      INDEXED: {
        CLEAR: null,
        CLEAR_ALL: null,
        REGISTER: null
      },
      KEYS: {
        CLEAR: null,
        REGISTER: null
      }
    }
  },
  MAPS: {
    SET: {
      REMOVE_MAP: null,
      SET_ACTIVE_MAP_KEY: null,
      SET_BACKGROUND_LAYER: null,
      USE: {
        CLEAR: null,
        REGISTER: null
      },
      VIEW: {
        SET: null,
        UPDATE: null
      }
    },
    MAP: {
      LAYERS: {
        SET_STYLE_KEY: null
      },
      USE: {
        CLEAR: null,
        REGISTER: null
      },
      VIEWPORT: {
        SET: null
      },
      VIEW: {
        SET: null,
        UPDATE: null
      }
    },
    UPDATE: null
  },
  PERIODS: {
    ADD: null,
    ADD_UNRECEIVED: null,
    DELETE: null,
    MARK_DELETED: null,
    EDITED: {
      REMOVE: null,
      REMOVE_ACTIVE: null,
      REMOVE_PROPERTY: null,
      UPDATE: null
    },
    ENSURE: {
      ERROR: null
    },
    INDEX: {
      ADD: null,
      CLEAR_ALL: null,
      CLEAR_INDEX: null
    },
    LOAD: {
      ERROR: null,
      REQUEST: null
    },
    SET_ACTIVE_KEY: null,
    SET_ACTIVE_KEYS: null,
    UPDATE_STORE: null,
    USE: {
      INDEXED: {
        CLEAR: null,
        CLEAR_ALL: null,
        REGISTER: null
      },
      KEYS: {
        CLEAR: null,
        REGISTER: null
      }
    }
  },
  PLACES: {
    ADD: null,
    ADD_UNRECEIVED: null,
    DELETE: null,
    MARK_DELETED: null,
    EDITED: {
      REMOVE: null,
      REMOVE_ACTIVE: null,
      REMOVE_PROPERTY: null,
      UPDATE: null
    },
    ENSURE: {
      ERROR: null
    },
    INDEX: {
      ADD: null,
      CLEAR_INDEX: null,
      CLEAR_ALL: null
    },
    LOAD: {
      ERROR: null,
      REQUEST: null
    },
    SET_ACTIVE_KEY: null,
    SET_ACTIVE_KEYS: null,
    UPDATE_STORE: null,
    USE: {
      INDEXED: {
        CLEAR: null,
        CLEAR_ALL: null,
        REGISTER: null
      },
      KEYS: {
        CLEAR: null,
        REGISTER: null
      }
    }
  },
  SCENARIOS: {
    ADD: null,
    ADD_UNRECEIVED: null,
    DELETE: null,
    MARK_DELETED: null,
    EDITED: {
      REMOVE: null,
      REMOVE_ACTIVE: null,
      REMOVE_PROPERTY: null,
      UPDATE: null
    },
    ENSURE: {
      ERROR: null
    },
    INDEX: {
      ADD: null,
      CLEAR_INDEX: null,
      CLEAR_ALL: null
    },
    LOAD: {
      ERROR: null,
      REQUEST: null
    },
    SET_ACTIVE_KEY: null,
    SET_ACTIVE_KEYS: null,
    UPDATE_STORE: null,
    USE: {
      INDEXED: {
        CLEAR: null,
        CLEAR_ALL: null,
        REGISTER: null
      },
      KEYS: {
        CLEAR: null,
        REGISTER: null
      }
    }
  },
  SCOPES: {
    ADD: null,
    ADD_UNRECEIVED: null,
    DELETE: null,
    MARK_DELETED: null,
    EDITED: {
      REMOVE: null,
      REMOVE_ACTIVE: null,
      REMOVE_PROPERTY: null,
      UPDATE: null
    },
    ENSURE: {
      ERROR: null
    },
    INDEX: {
      ADD: null,
      CLEAR_INDEX: null,
      CLEAR_ALL: null
    },
    LOAD: {
      ERROR: null,
      REQUEST: null
    },
    SET_ACTIVE_KEY: null,
    UPDATE_STORE: null,
    USE: {
      INDEXED: {
        CLEAR: null,
        CLEAR_ALL: null,
        REGISTER: null
      },
      KEYS: {
        CLEAR: null,
        REGISTER: null
      }
    }
  },
  SCREENS: {
    ADD: null,
    CLOSE: null,
    OPEN: null,
    REMOVE: null,
    REMOVE_ALL: null,
    RETRACT: null,
    SETS: {
      ADD: null,
      REMOVE: null
    },
    TOP_HISTORY: null,
    UPDATE: null
  },
  SELECTIONS: {
    ADD: null,
    ADD_UNRECEIVED: null,
    SET_ACTIVE_KEY: null,
    SET: {
      FEATURE_KEYS_FILTER: {
        KEYS: null
      }
    },
    CLEAR: {
      FEATURE_KEYS_FILTER: null
    }
  },
  STYLES: {
    ADD: null,
    ADD_UNRECEIVED: null,
    DELETE: null,
    MARK_DELETED: null,
    EDITED: {
      REMOVE: null,
      REMOVE_ACTIVE: null,
      REMOVE_PROPERTY: null,
      UPDATE: null
    },
    ENSURE: {
      ERROR: null
    },
    INDEX: {
      ADD: null,
      CLEAR_INDEX: null,
      CLEAR_ALL: null
    },
    LOAD: {
      ERROR: null,
      REQUEST: null
    },
    SET_ACTIVE_KEY: null,
    SET_ACTIVE_KEYS: null,
    UPDATE_STORE: null,
    USE: {
      INDEXED: {
        CLEAR: null,
        CLEAR_ALL: null,
        REGISTER: null
      },
      KEYS: {
        CLEAR: null,
        REGISTER: null
      }
    }
  },
  TAGS: {
    ADD: null,
    ADD_UNRECEIVED: null,
    DELETE: null,
    MARK_DELETED: null,
    EDITED: {
      REMOVE: null,
      REMOVE_ACTIVE: null,
      REMOVE_PROPERTY: null,
      UPDATE: null
    },
    ENSURE: {
      ERROR: null
    },
    INDEX: {
      ADD: null,
      CLEAR_INDEX: null,
      CLEAR_ALL: null
    },
    LOAD: {
      ERROR: null,
      REQUEST: null
    },
    SET_ACTIVE_KEY: null,
    SET_ACTIVE_KEYS: null,
    UPDATE_STORE: null,
    USE: {
      INDEXED: {
        CLEAR: null,
        CLEAR_ALL: null,
        REGISTER: null
      },
      KEYS: {
        CLEAR: null,
        REGISTER: null
      }
    }
  },
  USERS: {
    ADD: null,
    ADD_UNRECEIVED: null,
    GROUPS: {
      ADD: null,
      ADD_UNRECEIVED: null,
      INDEX: {
        ADD: null,
        CLEAR_ALL: null
      },
      USE: {
        INDEXED: {
          CLEAR: null,
          REGISTER: null
        },
        KEYS: {
          CLEAR: null,
          REGISTER: null
        }
      }
    },
    SET_ACTIVE_KEY: null,
    CURRENT: {
      REQUEST: null
    },
    LOGIN: {
      REQUEST: null
    },
    INDEX: {
      ADD: null,
      CLEAR_ALL: null
    },
    USE: {
      INDEXED: {
        CLEAR: null,
        REGISTER: null
      },
      KEYS: {
        CLEAR: null,
        REGISTER: null
      }
    }
  },
  VIEWS: {
    ADD: null,
    ADD_UNRECEIVED: null,
    DELETE: null,
    MARK_DELETED: null,
    EDITED: {
      REMOVE: null,
      REMOVE_ACTIVE: null,
      REMOVE_PROPERTY: null,
      UPDATE: null
    },
    ENSURE: {
      ERROR: null
    },
    INDEX: {
      ADD: null,
      CLEAR_INDEX: null,
      CLEAR_ALL: null
    },
    LOAD: {
      ERROR: null,
      REQUEST: null
    },
    SET_ACTIVE_KEY: null,
    UPDATE_STORE: null,
    USE: {
      INDEXED: {
        CLEAR: null,
        CLEAR_ALL: null,
        REGISTER: null
      },
      KEYS: {
        CLEAR: null,
        REGISTER: null
      }
    }
  },
  WINDOWS: {
    ADD: null,
    OPEN: null,
    REMOVE: null,
    SETS: {
      ADD: null,
      REMOVE: null
    },
    TOP: null,
    UPDATE: null
  }
});

var TTL = 5;
var DATAPATH = 'data';
/**
 * Fetch implementation used by this module.
 *
 * It can be useful in tests to override this using `setFetch` fn.
 */

var fetch = _fetch;
/**
 * Request helper. Creates an request to backend.
 * @param localConfig
 * @param apiPath - path to backend endpoint (hostname taken from config)
 * @param method - HTTP method
 * @param query - url query as object
 * @param payload - payload as object
 * @param ttl - (optional) number of tries
 * @param dataPath - (optional) [default: "data"] Path where should data be. If response object does not have data on "dataPath", then return Error.
 * @returns response or error
 */

function request(localConfig, apiPath, method, query, payload, ttl, dataPath) {
  if (_isUndefined(ttl)) ttl = TTL;
  if (_isUndefined(dataPath)) dataPath = DATAPATH;
  var url = localConfig.apiBackendProtocol + '://' + path.join(localConfig.apiBackendHost, localConfig.apiBackendPath, apiPath);

  if (query) {
    url += '?' + queryString.stringify(query);
  }

  return fetch(url, {
    method: method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: payload ? JSON.stringify(payload) : null
  }).then(function (response) {
    var contentType = response.headers.get('Content-type');

    if (response.ok && contentType && contentType.indexOf('application/json') !== -1) {
      return response.json().then(function (body) {
        if (dataPath === null || dataPath && _get(body, dataPath)) {
          return body;
        } else {
          throw new Error('no data returned');
        }
      });
    } else {
      throw new Error('response error');
    }
  }, function (error) {
    if (ttl - 1) {
      request(localConfig, apiPath, method, query, payload, ttl - 1);
    } else {
      throw error;
    }
  });
}

var getKey = function getKey(state) {
  return state.app.key;
};

var getCompleteConfiguration = function getCompleteConfiguration(state) {
  return state.app.configuration;
};

var getCompleteLocalConfiguration = function getCompleteLocalConfiguration(state) {
  var _state$app;

  return (_state$app = state.app) === null || _state$app === void 0 ? void 0 : _state$app.localConfiguration;
};

var getConfiguration = createSelector([getCompleteConfiguration, function (state, path) {
  return path;
}], function (configuration, path) {
  return _get(configuration, path, null);
});
var getLocalConfiguration = createSelector([getCompleteLocalConfiguration, function (state, path) {
  return path;
}], function (localConfiguration, path) {
  return _get(localConfiguration, path, null);
});
var selectors = {
  getKey: getKey,
  getConfiguration: getConfiguration,
  getCompleteConfiguration: getCompleteConfiguration,
  getLocalConfiguration: getLocalConfiguration,
  getCompleteLocalConfiguration: getCompleteLocalConfiguration
};

/**
 * Return index for given filter and order
 * @param indexes {Array} list of indexes
 * @param filter {Object}
 * @param order {Array}
 */
var getIndex = createCachedSelector([function (indexes) {
  return indexes;
}, function (indexes, filter) {
  return filter;
}, function (indexes, filter, order) {
  return order;
}], function (indexes, filter, order) {
  if (indexes) {
    var index = _find2(indexes, function (index) {
      return isCorrespondingIndex(index, filter, order);
    });

    return index ? index : null;
  } else {
    return null;
  }
})(function (indexes, filter, order) {
  return "".concat(JSON.stringify(filter)).concat(JSON.stringify(order));
}); // TODO @vdubr please check the usage if it makes sense

function getUniqueIndexes(indexes) {
  if (!_isEmpty2(indexes)) {
    return indexes.reduce(function (uniqueIndexes, index) {
      if (_find2(uniqueIndexes, function (i) {
        return i && isCorrespondingIndex(index, i.filter, i.order);
      })) {
        return uniqueIndexes;
      }

      return [].concat(_toConsumableArray(uniqueIndexes), [index]);
    }, []);
  } else {
    return null;
  }
}
/**
 * Remove index from given indexes that fit to filter and order.
 * If index does not exists under filter, same instance of indexes has return.
 * @param indexes {Array} Array of indexes
 * @param filter {Object}
 * @param order {Array}
 * @return {Array} New instance of indexes
 */


function removeIndex() {
  var indexes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var filter = arguments.length > 1 ? arguments[1] : undefined;
  var order = arguments.length > 2 ? arguments[2] : undefined;

  if (indexes && !_isEmpty2(indexes)) {
    var clearedIndexes = _reduce(indexes, function (acc, index) {
      var indexToBeCleared = isCorrespondingIndex(index, filter, order);

      if (indexToBeCleared) {
        return acc;
      } else {
        return [].concat(_toConsumableArray(acc), [index]);
      }
    }, []);

    if (clearedIndexes.length === indexes.length) {
      return indexes;
    } else {
      return clearedIndexes;
    }
  } else {
    return indexes;
  }
}
/**
 * Create set of updated indexes state based on current state and given indexUpdate.
 * It produce updated indexes state in case of existing index for given filter and order.
 * If index with filter and order is not in the state yet, its add to indexes state.
 * @param state {Object}
 * @param filter {Object}
 * @param order {Array}
 * @param indexUpdate {Array}
 * @param changedOn {string}
 * @param indexesPath {string} name of a property where indexes are stored
 */


function getUpdatedIndexes(state, filter, order, indexUpdate, changedOn) {
  var indexesPath = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'indexes';
  var indexes = [];
  var selectedIndex = {};

  if (state[indexesPath]) {
    state[indexesPath].forEach(function (index) {
      if (_isEqual2(index.filter, filter) && _isEqual2(index.order, order)) {
        selectedIndex = index;
      } else {
        indexes.push(index);
      }
    });
  }

  var index;

  if (indexUpdate.length) {
    index = _objectSpread2({}, selectedIndex.index);
    indexUpdate.forEach(function (model, i) {
      if (model.key) {
        index[i] = model.key;
      } else {
        //spatial data by spatialDataSourceKey, levels and tiles
        //update spatialDataSourceKey
        for (var _i = 0, _Object$entries = Object.entries(model); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              level = _Object$entries$_i[0],
              dataByTiles = _Object$entries$_i[1];

          if (index.hasOwnProperty(level) && index[level]) {
            //update data on level
            index[level] = _objectSpread2(_objectSpread2({}, index[level]), dataByTiles);
          } else {
            index[level] = _objectSpread2({}, dataByTiles);
          }
        }
      }
    });
  }

  selectedIndex = {
    filter: selectedIndex.filter || filter,
    order: selectedIndex.order || order,
    changedOn: changedOn,
    index: index || selectedIndex.index
  };
  indexes.push(selectedIndex);
  return indexes;
}
/**
 * Extend object "currentByDataSourceKey" by "update". Return new instance.
 * @param {Object} currentByDataSourceKey
 * @param {Object} update
 * @return {Object}
 */


function getUpdatedByDataSourceKey(currentByDataSourceKey) {
  var update = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var updated = _objectSpread2({}, currentByDataSourceKey);

  for (var _i2 = 0, _Object$entries2 = Object.entries(update); _i2 < _Object$entries2.length; _i2++) {
    var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
        key = _Object$entries2$_i[0],
        values = _Object$entries2$_i[1];

    if (updated.hasOwnProperty(key)) {
      updated = _objectSpread2(_objectSpread2({}, updated), {}, _defineProperty({}, key, _objectSpread2(_objectSpread2({}, updated[key]), values)));
    } else {
      updated = _objectSpread2(_objectSpread2({}, updated), {}, _defineProperty({}, key, _objectSpread2({}, values)));
    }
  }

  return updated;
}
/**
 * True, if index.filter object and index.order array are deeply equal to given filter and order
 * @param index {Object} existing index
 * @param index.filter {Object}
 * @param index.order {Array}
 * @param filter {Object}
 * @param order {Array}
 * @return {boolean}
 */


function isCorrespondingIndex(index, filter, order) {
  return _isEqual2(index.filter || null, filter || null) && _isEqual2(index.order || null, order || null);
} // TODO @vdubr please help with comments & proper testing


function itemFitFilter(filter, item) {
  // null filter fit
  if (filter === null) {
    return true;
  }

  var entries = Object.entries(filter);
  return entries.every(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    var itemHasFilterKey = item.data && item.data.hasOwnProperty(key);
    var itemHasFilterLinkKey = item.data && item.data.hasOwnProperty("".concat(key, "Key"));

    if (itemHasFilterKey) {
      //apply condition
      //"column0": "hleda se rovnost",
      //"column1": null,
      if (item.data && item.data[key] === value) {
        return true;
      } // "column2": {
      // 	"like": "hleda se podobnost, castecny vyskyt"
      // },


      if (_isObject2(value) && value['like']) {
        //now we dont deal like filter, refrest indexes
        return true;
      } // "column3": {
      // 	"in": ["existuje", "v", "poli", "prvku"]
      // },


      if (_isObject2(value) && value['in']) {
        return value["in"].includes(item.data[key]);
      } // "column4": {
      // 	"notin": ["neexistuje", "v", "poli", "prvku"]
      // }


      if (_isObject2(value) && value['notin']) {
        return !value.notin.includes(item.data[key]);
      }
    } //check if filter contains linking like scopeKey, viewKey, ...


    if (itemHasFilterLinkKey) {
      if (item.data && item.data["".concat(key, "Key")] === value) {
        return true;
      }
    } //if to filter fit return false


    return false;
  });
}
/**
 * Merge stores active keys with filter by active and filter
 * @param activeKeys {Object} {activeScopeKey: 'bbb', activePlaceKeys: ['ddd', 'eee'], ...}
 * @param filterByActive {Object} {scope: true, place: true, ...}
 * @param filter {Object} {scopeKey: 'aaa', placeKey: {in: ['fff']}, ...}
 * @return {Object} merged object which looks like this {scopeKey: 'aaa', placeKey: {in: ['bbb', 'ccc']}, ...}
 */


function mergeFilters(activeKeys, filterByActive, filter) {
  if (activeKeys && filterByActive) {
    var activeKeysFilter = {};

    if (filterByActive.application) {
      if (activeKeys.activeApplicationKey) {
        activeKeysFilter.applicationKey = activeKeys.activeApplicationKey;
      }
    }

    if (filterByActive["case"]) {
      if (activeKeys.activeCaseKey) {
        activeKeysFilter.caseKey = activeKeys.activeCaseKey;
      } else if (activeKeys.activeCaseKeys) {
        activeKeysFilter.caseKey = {
          "in": activeKeys.activeCaseKeys
        };
      }
    }

    if (filterByActive.scope) {
      if (activeKeys.activeScopeKey) {
        activeKeysFilter.scopeKey = activeKeys.activeScopeKey;
      }
    }

    if (filterByActive.scenario) {
      if (activeKeys.activeScenarioKey) {
        activeKeysFilter.scenarioKey = activeKeys.activeScenarioKey;
      } else if (activeKeys.activeScenarioKeys) {
        activeKeysFilter.scenarioKey = {
          "in": activeKeys.activeScenarioKeys
        };
      }
    }

    if (filterByActive.place) {
      if (activeKeys.activePlaceKey) {
        activeKeysFilter.placeKey = activeKeys.activePlaceKey;
      } else if (activeKeys.activePlaceKeys) {
        activeKeysFilter.placeKey = {
          "in": activeKeys.activePlaceKeys
        };
      }
    }

    if (filterByActive.period) {
      if (activeKeys.activePeriodKey) {
        activeKeysFilter.periodKey = activeKeys.activePeriodKey;
      } else if (activeKeys.activePeriodKeys) {
        activeKeysFilter.periodKey = {
          "in": activeKeys.activePeriodKeys
        };
      }
    }

    if (filterByActive.attribute) {
      if (activeKeys.activeAttributeKey) {
        activeKeysFilter.attributeKey = activeKeys.activeAttributeKey;
      } else if (activeKeys.activeAttributeKeys) {
        activeKeysFilter.attributeKey = {
          "in": activeKeys.activeAttributeKeys
        };
      }
    }

    if (filterByActive.layerTemplate) {
      if (activeKeys.activeLayerTemplateKey) {
        activeKeysFilter.layerTemplateKey = activeKeys.activeLayerTemplateKey;
      }
    }

    if (filterByActive.areaTreeLevel) {
      if (activeKeys.activeAreaTreeLevelKey) {
        activeKeysFilter.areaTreeLevelKey = activeKeys.activeAreaTreeLevelKey;
      }
    }

    var finalFilter = _objectSpread2(_objectSpread2({}, activeKeysFilter), filter);

    return _isEmpty2(finalFilter) ? null : finalFilter;
  } else {
    return filter;
  }
}
/**
 * Merge metadata defined by key with metadata keys defined by filterByActive
 * @param definedKeys {Object}
 * @param activeKeys {Object}
 * @return {Object|null}
 */


function mergeMetadataKeys(definedKeys, activeKeys) {
  if (definedKeys && activeKeys) {
    return _objectSpread2(_objectSpread2({}, activeKeys), definedKeys);
  } else {
    return definedKeys || activeKeys || null;
  }
}
/**
 * It converts modifiers from metadataKeys: ["A", "B"] to metadataKey: {in: ["A", "B"]}
 * @param modifiers {Object}
 * @return {Object|null}
 */


function convertModifiersToRequestFriendlyFormat(modifiers) {
  if (modifiers) {
    var modifiersForRequest = {};

    if (modifiers.scopeKey) {
      modifiersForRequest.scopeKey = modifiers.scopeKey;
    }

    if (modifiers.placeKeys) {
      modifiersForRequest.placeKey = {
        "in": modifiers.placeKeys
      };
    } else if (modifiers.placeKey) {
      modifiersForRequest.placeKey = modifiers.placeKey;
    }

    if (modifiers.caseKeys) {
      modifiersForRequest.caseKey = {
        "in": modifiers.caseKeys
      };
    } else if (modifiers.caseKey) {
      modifiersForRequest.caseKey = modifiers.caseKey;
    }

    if (modifiers.scenarioKeys) {
      modifiersForRequest.scenarioKey = {
        "in": modifiers.scenarioKeys
      };
    } else if (modifiers.scenarioKey) {
      modifiersForRequest.scenarioKey = modifiers.scenarioKey;
    }

    if (modifiers.periodKeys) {
      modifiersForRequest.periodKey = {
        "in": modifiers.periodKeys
      };
    } else if (modifiers.periodKey) {
      modifiersForRequest.periodKey = modifiers.periodKey;
    }

    if (modifiers.applicationKey) {
      modifiersForRequest.applicationKey = modifiers.applicationKey;
    }

    return !_isEmpty2(modifiersForRequest) ? modifiersForRequest : null;
  } else {
    return null;
  }
}
/**
 * Check if given input is natural number
 * @param input
 * @return {boolean}
 */


function isNaturalNumber(input) {
  return _isNumber(input) && input > 0 && input % 1 === 0;
}
/**
 * @param interval {Object}
 * @return {boolean}
 */


function isInterval(interval) {
  return isNaturalNumber(interval === null || interval === void 0 ? void 0 : interval.start) && isNaturalNumber(interval === null || interval === void 0 ? void 0 : interval.length);
}
/**
 * Return only intervals which really are intervals
 * @param intervals {Array}
 * @return {Array}
 */


function getValidIntervals(intervals) {
  return intervals.filter(function (interval) {
    return isInterval(interval);
  });
}
/**
 * Return sorted intervals
 * @param intervals {Array}
 * @return {Array}
 */


function getSortedValidIntervals(intervals) {
  return _sortBy2(getValidIntervals(intervals), ['start', 'length']);
}
/**
 * @param earlier {Object} interval
 * @param later {Object} interval
 * @return {boolean}
 */


function areIntervalsOverlappedOrSubsequent(earlier, later) {
  if (isInterval(earlier) && isInterval(later)) {
    return later.start <= earlier.start + earlier.length;
  } else {
    return false;
  }
}
/**
 * Merge relevant intervals together
 * @param intervals {Array}
 * @return {Array}
 */


function mergeIntervals(intervals) {
  var sortedIntervals = getSortedValidIntervals(intervals);

  if (sortedIntervals.length === 0) {
    return null;
  } //merge intervals


  return _tail2(sortedIntervals).reduce(function (mergedIntervals, interval) {
    var last = mergedIntervals.pop();

    if (areIntervalsOverlappedOrSubsequent(last, interval)) {
      //merge last & current
      var end = Math.max(last.start + last.length, interval.start + interval.length);
      return [].concat(_toConsumableArray(mergedIntervals), [{
        start: last.start,
        length: end - last.start
      }]);
    } else {
      //add both
      return [].concat(_toConsumableArray(mergedIntervals), [last, interval]);
    }
  }, [_head2(sortedIntervals)]);
}
/**
 * Add keys to index
 * @param index {Object}
 * @param models {Object} Collection of models
 * @param start {Number}
 * @return {Object} index
 */


function registerModelsToIndex(index, models, start) {
  if (models !== null && models !== void 0 && models.length && index && start > -1) {
    models.forEach(function (model, i) {
      index[start + i] = model.key;
    });
    return index;
  } else {
    return index;
  }
}

var commonHelpers = {
  convertModifiersToRequestFriendlyFormat: convertModifiersToRequestFriendlyFormat,
  removeIndex: removeIndex,
  getIndex: getIndex,
  getUniqueIndexes: getUniqueIndexes,
  getUpdatedIndexes: getUpdatedIndexes,
  getUpdatedByDataSourceKey: getUpdatedByDataSourceKey,
  mergeFilters: mergeFilters,
  mergeMetadataKeys: mergeMetadataKeys,
  isCorrespondingIndex: isCorrespondingIndex,
  itemFitFilter: itemFitFilter,
  registerModelsToIndex: registerModelsToIndex,
  // intervals
  areIntervalsOverlappedOrSubsequent: areIntervalsOverlappedOrSubsequent,
  isInterval: isInterval,
  isNaturalNumber: isNaturalNumber,
  getValidIntervals: getValidIntervals,
  getSortedValidIntervals: getSortedValidIntervals,
  mergeIntervals: mergeIntervals
};

var getActiveKey = function getActiveKey(getSubstate) {
  return function (state) {
    return getSubstate(state).activeKey;
  };
};

var getActiveKeys = function getActiveKeys(getSubstate) {
  return function (state) {
    return getSubstate(state).activeKeys;
  };
};

var getAllByKey = function getAllByKey(getSubstate) {
  return function (state) {
    return getSubstate(state).byKey;
  };
};

var getKeysInUse = function getKeysInUse(getSubstate) {
  return function (state) {
    var _getSubstate$inUse;

    return (_getSubstate$inUse = getSubstate(state).inUse) === null || _getSubstate$inUse === void 0 ? void 0 : _getSubstate$inUse.keys;
  };
};

var getIndexesInUse = function getIndexesInUse(getSubstate) {
  return function (state) {
    var _getSubstate$inUse2;

    return (_getSubstate$inUse2 = getSubstate(state).inUse) === null || _getSubstate$inUse2 === void 0 ? void 0 : _getSubstate$inUse2.indexes;
  };
};

var getEditedAllAsObject = function getEditedAllAsObject(getSubstate) {
  return function (state) {
    return getSubstate(state).editedByKey;
  };
};

var getIndexes = function getIndexes(getSubstate) {
  return function (state) {
    return getSubstate(state).indexes;
  };
};
/**
 * Get indexes value from given state on given path.
 * Optional param indexPath has default value "indexes". Call with:
 * state {Object}
 * indexPath {string}
 * @param getSubstate {function}
 * @return {Object} index
 */


var getIndexesByPath = function getIndexesByPath(getSubstate) {
  return function (state) {
    var indexPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'indexes';
    return _get(getSubstate(state), indexPath);
  };
};
/**
 * Get all but removed models in byKey
 * @param getSubstate {function}
 * @returns {Object} all models except removed from by key
 */


var getAllNotRemovedAsObject = function getAllNotRemovedAsObject(getSubstate) {
  return createSelector([getAllByKey(getSubstate)], function (byKey) {
    if (byKey) {
      return _pickBy2(byKey, function (item) {
        return !item.hasOwnProperty('removed');
      });
    } else {
      return null;
    }
  });
};

var getAllAsObject = getAllNotRemovedAsObject;
/**
 * Get all but removed models as a collection
 * @param getSubstate {function}
 * @returns {Array|null} all models except removed as a collection
 */

var getAll = function getAll(getSubstate) {
  return createSelector([getAllAsObject(getSubstate)], function (byKey) {
    return byKey ? Object.values(byKey) : null;
  });
};
/**
 * Get active model
 * @param getSubstate {func}
 * @return {Object} Active model
 */


var getActive = function getActive(getSubstate) {
  return createSelector([getAllAsObject(getSubstate), getActiveKey(getSubstate)], function (models, activeKey) {
    return (models === null || models === void 0 ? void 0 : models[activeKey]) || null;
  });
};
/**
 * Get active models
 * @param getSubstate {func}
 * @return {Array} A collection of active models
 */


var getActiveModels = function getActiveModels(getSubstate) {
  return createSelector([getAllAsObject(getSubstate), getActiveKeys(getSubstate)], function (models, activeKeys) {
    var activeModels = [];

    if (models && !_isEmpty2(models) && activeKeys && !_isEmpty2(activeKeys)) {
      activeKeys.map(function (key) {
        var model = models[key];

        if (model) {
          activeModels.push(model);
        }
      });
    }

    return activeModels.length ? activeModels : null;
  });
};
/**
 * Get model with given key. Call with:
 * state {Object}
 * key {string} model key
 * @param getSubstate {function}
 * @return {Object} selected model
 */


var getByKey = function getByKey(getSubstate) {
  return createCachedSelector([getAllAsObject(getSubstate), function (state, key) {
    return key;
  }], function (allData, key) {
    if (key && allData && !_isEmpty2(allData) && allData[key]) {
      return allData[key];
    } else {
      return null;
    }
  })(function (state, key) {
    return key;
  });
};
/**
 * Get models by given keys. Call with:
 * state {Object}
 * keys {Array} model keys
 * @param getSubstate {function}
 * @return {Object} selected models
 */


var getByKeysAsObject = function getByKeysAsObject(getSubstate) {
  return createCachedSelector([getAllAsObject(getSubstate), function (state, keys) {
    return keys;
  }], function (allData, keys) {
    if (keys && keys.length && allData && !_isEmpty2(allData)) {
      var data = _pick2(allData, keys);

      return _isEmpty2(data) ? null : data;
    } else {
      return null;
    }
  })(function (state, keys) {
    return "".concat(keys);
  });
};
/**
 * Get models by given keys. Call with:
 * state {Object}
 * keys {Array} model keys
 * @param getSubstate {function}
 * @return {Array} selected models
 */


var getByKeys = function getByKeys(getSubstate) {
  return createCachedSelector([getByKeysAsObject(getSubstate)], function (asObject) {
    if (asObject) {
      return Object.values(asObject);
    } else {
      return null;
    }
  })(function (state, keys) {
    return "".concat(keys);
  });
};
/**
 * Get model's data by given keys. Call with:
 * state {Object}
 * keys {Array} model keys
 * @param getSubstate {function}
 * @return {Object} selected model data
 */


var getDataByKey = function getDataByKey(getSubstate) {
  return createSelector([getByKey(getSubstate)], function (model) {
    return (model === null || model === void 0 ? void 0 : model.data) || null;
  });
};
/**
 * True, if current user or guest has a permission to delete the model. Call with:
 * state {Object}
 * key {string}
 * @param getSubstate {function}
 * @return {bool}
 */


var getDeletePermissionByKey = function getDeletePermissionByKey(getSubstate) {
  return createSelector([getByKey(getSubstate)], function (model) {
    var _model$permissions, _model$permissions$ac, _model$permissions2, _model$permissions2$g;

    return (model === null || model === void 0 ? void 0 : (_model$permissions = model.permissions) === null || _model$permissions === void 0 ? void 0 : (_model$permissions$ac = _model$permissions.activeUser) === null || _model$permissions$ac === void 0 ? void 0 : _model$permissions$ac["delete"]) || (model === null || model === void 0 ? void 0 : (_model$permissions2 = model.permissions) === null || _model$permissions2 === void 0 ? void 0 : (_model$permissions2$g = _model$permissions2.guest) === null || _model$permissions2$g === void 0 ? void 0 : _model$permissions2$g["delete"]) || false;
  });
};
/**
 * True, if current user or guest has a permission to update the model. Call with:
 * state {Object}
 * key {string}
 * @param getSubstate {function}
 * @return {bool}
 */


var getUpdatePermissionByKey = function getUpdatePermissionByKey(getSubstate) {
  return createSelector([getByKey(getSubstate)], function (model) {
    var _model$permissions3, _model$permissions3$a, _model$permissions4, _model$permissions4$g;

    return (model === null || model === void 0 ? void 0 : (_model$permissions3 = model.permissions) === null || _model$permissions3 === void 0 ? void 0 : (_model$permissions3$a = _model$permissions3.activeUser) === null || _model$permissions3$a === void 0 ? void 0 : _model$permissions3$a.update) || (model === null || model === void 0 ? void 0 : (_model$permissions4 = model.permissions) === null || _model$permissions4 === void 0 ? void 0 : (_model$permissions4$g = _model$permissions4.guest) === null || _model$permissions4$g === void 0 ? void 0 : _model$permissions4$g.update) || false;
  });
};
/**
 * Get all edited models. Call with:
 * state {Object}
 * @param getSubstate {function}
 * @return {Object}
 */


var getEditedAll = function getEditedAll(getSubstate) {
  return createSelector([getEditedAllAsObject(getSubstate)], function (editedAsObject) {
    return editedAsObject ? Object.values(editedAsObject) : null;
  });
};
/**
 * Get active edited model. Call with:
 * state {Object}
 * @param getSubstate {function}
 * @return {Object} edited active model
 */


var getEditedActive = function getEditedActive(getSubstate) {
  return createSelector([getEditedAllAsObject(getSubstate), getActiveKey(getSubstate)], function (models, activeKey) {
    return (models === null || models === void 0 ? void 0 : models[activeKey]) || null;
  });
};
/**
 * Get edited model with given key. Call with:
 * state {Object}
 * key {string} model key
 * @param getSubstate {function}
 * @return {Object} edited model
 */


var getEditedByKey = function getEditedByKey(getSubstate) {
  return createCachedSelector([getEditedAllAsObject(getSubstate), function (state, key) {
    return key;
  }], function (allData, key) {
    if (key && allData && !_isEmpty2(allData) && allData[key]) {
      return allData[key];
    } else {
      return null;
    }
  })(function (state, key) {
    return key;
  });
};
/**
 * Get edited model's data by given key. Call with:
 * state {Object}
 * keys {Array} model keys
 * @param getSubstate {function}
 * @return {Object} edited model data
 */


var getEditedDataByKey = function getEditedDataByKey(getSubstate) {
  return createSelector([getEditedByKey(getSubstate)], function (model) {
    return (model === null || model === void 0 ? void 0 : model.data) || null;
  });
};
/**
 * Get edited models keys. Call with:
 * state {Object}
 * @param getSubstate {function}
 * @return {Array} edited keys
 */


var getEditedKeys = function getEditedKeys(getSubstate) {
  return createSelector([getEditedAllAsObject(getSubstate)], function (edited) {
    if (edited && !_isEmpty2(edited)) {
      return Object.keys(edited);
    }

    return null;
  });
};
/**
 * Get whole index by given filter and order. Call with:
 * state {Object}
 * filter {Object}
 * order {Array}
 * @param getSubstate {function}
 * @return {Object} index
 */


var getIndex$1 = function getIndex(getSubstate) {
  return createSelector([getIndexes(getSubstate), function (state, filter) {
    return filter;
  }, function (state, filter, order) {
    return order;
  }], function (indexes, filter, order) {
    return commonHelpers.getIndex(indexes, filter, order);
  });
};
/**
 * Get whole index by given filter and order and optional indexPath. Call with:
 * state {Object}
 * indexPath {string} [optional]
 * filter {Object}
 * order {Array}
 * @param getSubstate {function}
 * @return {Object} index
 */


var getIndexByPath = function getIndexByPath(getSubstate) {
  return createSelector([getIndexesByPath(getSubstate), function (state, indexPath, filter) {
    return filter;
  }, function (state, indexPath, filter, order) {
    return order;
  }], function (indexes, filter, order) {
    return commonHelpers.getIndex(indexes, filter, order);
  });
};
/**
 * Get changeOn of filtered index
 * state {Object}
 * filter {Object}
 * order {Array}
 * @param getSubstate {function}
 * @return {string}
 */


var getIndexChangedOn = function getIndexChangedOn(getSubstate) {
  return createSelector([getIndex$1(getSubstate)], function (index) {
    return (index === null || index === void 0 ? void 0 : index.changedOn) || null;
  });
};
/**
 * Get indexes page. Call with:
 * state {Object}
 * filter {Object}
 * order {Array}
 * start {number} from 1 to n. Default 1.
 * length {number} from 1 to n. If no length specified, then is equal to total
 * @param getSubstate {function}
 * @return {Object} {7: 'key1', 8: null, ...}
 */


var getIndexPage = function getIndexPage(getSubstate) {
  return createSelector([getIndex$1(getSubstate), function (state, filter, order, start) {
    return start;
  }, function (state, filter, order, start, length) {
    return length;
  }], function (index, start, length) {
    if (index !== null && index !== void 0 && index.index && start && length) {
      var indexed = {};

      for (var o = start; o < start + length && o <= index.count; o++) {
        var key = index.index[o];
        indexed[o] = key ? key : null;
      }

      return indexed;
    } else {
      return null;
    }
  });
};
/**
 * Get indexed models. Call with:
 * state {Object}
 * filterByActive {Object}
 * filter {Object}
 * order {Array}
 * start {number} from 1 to n. Default 1.
 * length {number} from 1 to n. If no length specified, then is equal to total
 * @param getSubstate {function}
 * @return {Array} collection of models
 */


var getIndexed = function getIndexed(getSubstate) {
  return createCachedSelector([getAllAsObject(getSubstate), getIndexes(getSubstate), getAllActiveKeys, function (state, filterByActive) {
    return filterByActive;
  }, function (state, filterByActive, filter) {
    return filter;
  }, function (state, filterByActive, filter, order) {
    return order;
  }, function (state, filterByActive, filter, order, start) {
    return start;
  }, function (state, filterByActive, filter, order, start, length) {
    return length;
  }], function (models, indexes, activeKeys, filterByActive, filter, order, start, length) {
    if (models && indexes) {
      var mergedFilter = commonHelpers.mergeFilters(activeKeys, filterByActive, filter);
      var index = commonHelpers.getIndex(indexes, mergedFilter, order);

      if (index !== null && index !== void 0 && index.index) {
        var indexedModels = [];
        start = start || 1;
        length = length || index.count;
        var end = Math.min(start + length - 1, index.count);

        for (var i = start; i <= end; i++) {
          var modelKey = index.index[i];

          if (modelKey) {
            var indexedModel = models[modelKey];

            if (indexedModel) {
              indexedModels.push(indexedModel);
            } else {
              indexedModels.push({
                key: modelKey
              });
            }
          } else {
            indexedModels.push(null);
          }
        }

        return indexedModels.length ? indexedModels : null;
      } else {
        return null;
      }
    } else {
      return null;
    }
  })(function (state, filterByActive, filter, order, start, length) {
    return "".concat(JSON.stringify(filterByActive), ":").concat(JSON.stringify(filter), ":").concat(JSON.stringify(order), ":").concat(start, ":").concat(length);
  });
};
/**
 * Get count of indexed items. Call with:
 * state {Object}
 * filter {Object}
 * order {Array}
 * @param getSubstate {function}
 * @return {number}
 */


var getIndexTotal = function getIndexTotal(getSubstate) {
  return createSelector([getIndex$1(getSubstate)], function (index) {
    if ((index === null || index === void 0 ? void 0 : index.count) > -1) {
      return index.count;
    } else {
      return null;
    }
  });
}; // TODO @vdubr please help

/**
 *
 * @param {func} getSubstate
 * @return {Array}
 */


var getIndexesByFilteredItem = function getIndexesByFilteredItem(getSubstate) {
  return createSelector([getIndexes(getSubstate), function (state, item) {
    return item;
  }], function (indexes, item) {
    if (!_isEmpty2(indexes)) {
      return indexes.filter(function (index) {
        return commonHelpers.itemFitFilter(index.filter, item);
      });
    } else {
      return null;
    }
  });
};
/**
 * Compare keys with loaded models and return which keys need to be loaded
 * state {Object}
 * keys {Array}
 * @param getSubstate {function}
 * @return {Array} keys to load
 */


var getKeysToLoad = function getKeysToLoad(getSubstate) {
  return createSelector([getAllAsObject(getSubstate), function (state, keys) {
    return keys;
  }], function (models, keys) {
    if (keys && keys.length) {
      if (!models) {
        return keys;
      } else {
        var filteredKeys = keys.filter(function (key) {
          return !models[key] || models[key].outdated;
        });
        return filteredKeys.length ? filteredKeys : null;
      }
    } else {
      return null;
    }
  });
};
/**
 * Get a list of keys used by given component
 * state {Object}
 * componentKey {string}
 * @param getSubstate {function}
 * @return {Array} used keys
 */


var getUsedKeysForComponent = function getUsedKeysForComponent(getSubstate) {
  return createCachedSelector([getKeysInUse(getSubstate), function (state, componentKey) {
    return componentKey;
  }], function (usedKeys, componentKey) {
    return usedKeys && componentKey && usedKeys[componentKey] && usedKeys[componentKey].length ? usedKeys[componentKey] : null;
  })(function (state, componentKey) {
    return "".concat(componentKey);
  });
};
/**
 * True, if all given keys are registered for given component
 * state {Object}
 * componentKey {string}
 * keys {Array}
 * @param getSubstate {function}
 * @return {boolean}
 */


var haveAllKeysRegisteredUse = function haveAllKeysRegisteredUse(getSubstate) {
  return createCachedSelector([getUsedKeysForComponent(getSubstate), function (state, componentKey, keys) {
    return keys;
  }], function (usedKeys, keys) {
    if (usedKeys && keys !== null && keys !== void 0 && keys.length) {
      var notIncluded = _difference(keys, usedKeys);

      return !notIncluded.length;
    } else {
      return false;
    }
  })(function (state, componentKey, keys) {
    return "".concat(componentKey, "_").concat(keys);
  });
};
/**
 * Return all used index pages for given substate
 * @param getSubstate {function}
 * @return {Array} a collection of used pages {filter: Object, order: Array, uses: [{start: number, length: number}]}
 */


var getUsedIndexPages = function getUsedIndexPages(getSubstate) {
  return createSelector([getIndexesInUse(getSubstate), getAllActiveKeys], function (indexedDataUses, activeKeys) {
    var groupedUses = [];
    var finalUsedIndexes = [];

    if (!_isEmpty2(indexedDataUses)) {
      _each(indexedDataUses, function (usedIndexes) {
        usedIndexes.forEach(function (usedIndex) {
          var mergedFilter = commonHelpers.mergeFilters(activeKeys, usedIndex.filterByActive, usedIndex.filter);

          var existingIndex = _find2(groupedUses, function (use) {
            return _isEqual2(use.filter, mergedFilter) && _isEqual2(use.order, usedIndex.order);
          });

          if (existingIndex) {
            existingIndex.inUse.push({
              start: usedIndex.start,
              length: usedIndex.length
            });
          } else {
            groupedUses.push({
              filter: mergedFilter,
              order: usedIndex.order,
              inUse: [{
                start: usedIndex.start,
                length: usedIndex.length
              }]
            });
          }
        });
      });
    }

    if (!_isEmpty2(groupedUses)) {
      _each(groupedUses, function (groupedUse) {
        var _groupedUse$inUse;

        if (groupedUse !== null && groupedUse !== void 0 && (_groupedUse$inUse = groupedUse.inUse) !== null && _groupedUse$inUse !== void 0 && _groupedUse$inUse.length) {
          var uses = commonHelpers.mergeIntervals(groupedUse.inUse);

          if (uses) {
            finalUsedIndexes.push({
              filter: groupedUse.filter,
              order: groupedUse.order,
              uses: uses
            });
          }
        }
      });
    }

    return finalUsedIndexes.length ? finalUsedIndexes : null;
  });
};
/**
 * Return used index page for given substate, filter & order. Call with:
 * filter {Object}
 * order {Array}
 * @param getSubstate {function}
 * @return {Object} used page {filter: Object, order: Array, uses: [{start: number, length: number}]}
 */


var getUsedIndexPage = function getUsedIndexPage(getSubstate) {
  return createCachedSelector(getUsedIndexPages(getSubstate), function (state, filter) {
    return filter;
  }, function (state, filter, order) {
    return order;
  }, function (usedIndexPages, filter, order) {
    if (usedIndexPages) {
      return _find2(usedIndexPages, {
        filter: filter,
        order: order
      });
    } else {
      return null;
    }
  })(function (state, filter, order) {
    var stringOrder = JSON.stringify(order);
    var stringFilter = JSON.stringify(_map(filter, function (value, key) {
      return "".concat(key, ":").concat(value);
    }).sort());
    return "".concat(stringOrder, ":").concat(stringFilter);
  });
};
/**
 * Return all uses with active dependency. Call with:
 * filterByActive {Object}
 * @param getSubstate {function}
 * @return {Array} a collection of used pages {filter: Object, order: Array, uses: [{start: number, length: number}]}
 */


var getUsesWithActiveDependency = function getUsesWithActiveDependency(getSubstate) {
  return createSelector([getIndexesInUse(getSubstate), getAllActiveKeys, function (state, filterByActive) {
    return filterByActive;
  }],
  /**
   * @param indexedDataUses {Object} inUse.indexes
   * @param activeKeys {Object} active keys of all metadata
   * @param filterByActive {Object} given metadata type active key for filtering (e.g. {scope: true})
   */
  function (indexedDataUses, activeKeys, filterByActive) {
    var groupedUses = []; // uses grouped by filter

    var usedIndexes = [];

    if (filterByActive && !_isEmpty2(indexedDataUses)) {
      // loop through components
      _map(indexedDataUses, function (componentUsedIndexes) {
        // loop through uses for component
        _map(componentUsedIndexes, function (usedIndex) {
          if (_reduce(filterByActive, function (accumulator, value, index) {
            return accumulator && value && usedIndex.filterByActive && usedIndex.filterByActive[index];
          }, true)) {
            // if usedIndex.filterByActive has all the properties of filterByActive
            var mergedFilter = commonHelpers.mergeFilters(activeKeys, usedIndex.filterByActive, usedIndex.filter);

            var existingIndex = _find2(groupedUses, function (use) {
              return _isEqual2(use.filter, mergedFilter) && _isEqual2(use.order, usedIndex.order);
            });

            if (existingIndex) {
              existingIndex.inUse.push({
                start: usedIndex.start,
                length: usedIndex.length
              });
            } else {
              groupedUses.push({
                filter: mergedFilter,
                order: usedIndex.order,
                inUse: [{
                  start: usedIndex.start,
                  length: usedIndex.length
                }]
              });
            }
          }
        });
      }); // loop through uses grouped by filter and merge intervals


      if (!_isEmpty2(groupedUses)) {
        _map(groupedUses, function (groupedUse) {
          var _groupedUse$inUse2;

          if (groupedUse !== null && groupedUse !== void 0 && (_groupedUse$inUse2 = groupedUse.inUse) !== null && _groupedUse$inUse2 !== void 0 && _groupedUse$inUse2.length) {
            var uses = commonHelpers.mergeIntervals(groupedUse.inUse);

            if (uses) {
              usedIndexes.push({
                filter: groupedUse.filter,
                order: groupedUse.order,
                uses: uses
              });
            }
          }
        });
      }

      return usedIndexes.length ? usedIndexes : null;
    } else {
      return null;
    }
  });
};
/**
 * Get all data from substore which should be saved (to the view for instance)
 * @param getSubstate {function}
 * @return {Object} substore state to save
 */


var getStateToSave = function getStateToSave(getSubstate) {
  return function (state) {
    var activeKey = getSubstate(state).activeKey;

    if (activeKey) {
      return {
        activeKey: activeKey
      };
    }

    var activeKeys = getSubstate(state).activeKeys;

    if (activeKeys) {
      return {
        activeKeys: activeKeys
      };
    }

    return {};
  };
};
/* 	--- Selectors across stores --------------------------------------------- */

/**
 * Get activeKey/activeKeys from all relevant substores
 * @param state {Object}
 * @return {Object}
 */


var getAllActiveKeys = createSelector([function (state) {
  var _state$scopes;

  return (_state$scopes = state.scopes) === null || _state$scopes === void 0 ? void 0 : _state$scopes.activeKey;
}, function (state) {
  var _state$cases;

  return (_state$cases = state.cases) === null || _state$cases === void 0 ? void 0 : _state$cases.activeKey;
}, function (state) {
  var _state$cases2;

  return (_state$cases2 = state.cases) === null || _state$cases2 === void 0 ? void 0 : _state$cases2.activeKeys;
}, function (state) {
  var _state$scenarios;

  return (_state$scenarios = state.scenarios) === null || _state$scenarios === void 0 ? void 0 : _state$scenarios.activeKey;
}, function (state) {
  var _state$scenarios2;

  return (_state$scenarios2 = state.scenarios) === null || _state$scenarios2 === void 0 ? void 0 : _state$scenarios2.activeKeys;
}, function (state) {
  var _state$places;

  return (_state$places = state.places) === null || _state$places === void 0 ? void 0 : _state$places.activeKey;
}, function (state) {
  var _state$places2;

  return (_state$places2 = state.places) === null || _state$places2 === void 0 ? void 0 : _state$places2.activeKeys;
}, function (state) {
  var _state$periods;

  return (_state$periods = state.periods) === null || _state$periods === void 0 ? void 0 : _state$periods.activeKey;
}, function (state) {
  var _state$periods2;

  return (_state$periods2 = state.periods) === null || _state$periods2 === void 0 ? void 0 : _state$periods2.activeKeys;
}, function (state) {
  var _state$attributes;

  return (_state$attributes = state.attributes) === null || _state$attributes === void 0 ? void 0 : _state$attributes.activeKey;
}, function (state) {
  var _state$attributes2;

  return (_state$attributes2 = state.attributes) === null || _state$attributes2 === void 0 ? void 0 : _state$attributes2.activeKeys;
}, function (state) {
  var _state$layerTemplates;

  return (_state$layerTemplates = state.layerTemplates) === null || _state$layerTemplates === void 0 ? void 0 : _state$layerTemplates.activeKey;
}, function (state) {
  var _state$areas, _state$areas$areaTree;

  return (_state$areas = state.areas) === null || _state$areas === void 0 ? void 0 : (_state$areas$areaTree = _state$areas.areaTreeLevels) === null || _state$areas$areaTree === void 0 ? void 0 : _state$areas$areaTree.activeKey;
}, function (state) {
  var _state$specific;

  return (_state$specific = state.specific) === null || _state$specific === void 0 ? void 0 : _state$specific.apps;
}, function (state) {
  var _state$app;

  return (_state$app = state.app) === null || _state$app === void 0 ? void 0 : _state$app.key;
}], function (activeScopeKey, activeCaseKey, activeCaseKeys, activeScenarioKey, activeScenarioKeys, activePlaceKey, activePlaceKeys, activePeriodKey, activePeriodKeys, activeAttributeKey, activeAttributeKeys, activeLayerTemplateKey, activeAreaTreeLevelKey, apps, appKey) {
  var activeKeys = {
    activeScopeKey: activeScopeKey || null,
    activeCaseKey: activeCaseKey || null,
    activeCaseKeys: activeCaseKeys || null,
    activeScenarioKey: activeScenarioKey || null,
    activeScenarioKeys: activeScenarioKeys || null,
    activePlaceKey: activePlaceKey || null,
    activePlaceKeys: activePlaceKeys || null,
    activePeriodKey: activePeriodKey || null,
    activePeriodKeys: activePeriodKeys || null,
    activeAttributeKey: activeAttributeKey || null,
    activeAttributeKeys: activeAttributeKeys || null,
    activeLayerTemplateKey: activeLayerTemplateKey || null,
    activeAreaTreeLevelKey: activeAreaTreeLevelKey || null
  }; // for BO usage

  if (apps) {
    activeKeys.activeApplicationKey = apps.activeKey;
  } else if (appKey) {
    activeKeys.activeApplicationKey = appKey;
  }

  return activeKeys;
});
/**
 * Get activeKey/activeKeys by filterByActive from all relevant substores
 * @param state {Object}
 * @param filterByActive {Object}
 * @return {Object}
 */

var getActiveKeysByFilterByActive = createCachedSelector([getAllActiveKeys, function (state, filterByActive) {
  return filterByActive;
}], function (activeKeys, filterByActive) {
  if (filterByActive && !_isEmpty2(filterByActive)) {
    var keys = {};

    if (filterByActive.scope && activeKeys.activeScopeKey) {
      keys.scopeKey = activeKeys.activeScopeKey;
    }

    if (filterByActive.place) {
      if (activeKeys.activePlaceKey) {
        keys.placeKey = activeKeys.activePlaceKey;
      } else if (activeKeys.activePlaceKeys) {
        keys.placeKeys = activeKeys.activePlaceKeys;
      }
    }

    if (filterByActive.scenario) {
      if (activeKeys.activeScenarioKey) {
        keys.scenarioKey = activeKeys.activeScenarioKey;
      } else if (activeKeys.activeScenarioKeys) {
        keys.scenarioKeys = activeKeys.activeScenarioKeys;
      }
    }

    if (filterByActive["case"]) {
      if (activeKeys.activeCaseKey) {
        keys.caseKey = activeKeys.activeCaseKey;
      } else if (activeKeys.activeCaseKeys) {
        keys.caseKeys = activeKeys.activeCaseKeys;
      }
    }

    if (filterByActive.period) {
      if (activeKeys.activePeriodKey) {
        keys.periodKey = activeKeys.activePeriodKey;
      } else if (activeKeys.activePeriodKeys) {
        keys.periodKeys = activeKeys.activePeriodKeys;
      }
    }

    if (filterByActive.attribute) {
      if (activeKeys.activeAttributeKey) {
        keys.attributeKey = activeKeys.activeAttributeKey;
      } else if (activeKeys.activeAttributeKeys) {
        keys.attributeKeys = activeKeys.activeAttributeKeys;
      }
    }

    if (filterByActive.layerTemplate && activeKeys.activeLayerTemplateKey) {
      keys.layerTemplateKey = activeKeys.activeLayerTemplateKey;
    }

    if (filterByActive.areaTreeLevel && activeKeys.activeAreaTreeLevelKey) {
      keys.areaTreeLevelKey = activeKeys.activeAreaTreeLevelKey;
    }

    if (filterByActive.application && activeKeys.activeApplicationKey) {
      keys.applicationKey = activeKeys.activeApplicationKey;
    }

    return !_isEmpty2(keys) ? keys : null;
  } else {
    return null;
  }
})(function (state, filterByActive) {
  return JSON.stringify(filterByActive);
});
/* 	--- Recompute observers -------------------------------------------------- */

/**
 * Get activeKey/activeKeys by filterByActive from all relevant substores. Call with:
 * filterByActive {Object}
 * @return {Object}
 */

var getActiveKeysByFilterByActiveObserver = createObserver(function (state, filterByActive) {
  return getActiveKeysByFilterByActive(state, filterByActive);
});
/**
 * Get all indexes from substore
 * @return {Object}
 */

var getIndexesObserver = createObserver(function (state, getSubstate) {
  return getIndexes(getSubstate)(state);
});
/* --- Recompute selectors -------------------------------------------------- */

/**
 * Get whole index by given filter and order. Call with:
 * filter {Object}
 * order {Array}
 * @return {Object}
 */

var getIndex_recompute = function getIndex_recompute(getSubstate) {
  return createSelector$1(function (filter, order) {
    var indexes = getIndexesObserver(getSubstate);

    if (indexes) {
      return commonHelpers.getIndex(indexes, filter, order);
    } else {
      return null;
    }
  });
};
/**
 * Merge metadata modifiers with filter by active.
 * @param metadataModifiers {Object} {placeKey: "uuid", scopeKey: "uuid", ...}
 * @param filterByActive {Object} {place: true, case: true, ...}
 * @param {Object} Merged modifiers
 */


var getMergedModifiers_recompute = createSelector$1(function (metadataModifiers, filterByActive) {
  // TODO at least a part is the same as in Maps/actions/layerUse?
  // modifiers defined by key
  var metadataDefinedByKey = metadataModifiers ? _objectSpread2({}, metadataModifiers) : {}; // Get actual metadata keys defined by filterByActive

  var activeMetadataKeys = getActiveKeysByFilterByActiveObserver(filterByActive); // Merge metadata, metadata defined by key have priority

  return commonHelpers.mergeMetadataKeys(metadataDefinedByKey, activeMetadataKeys);
});
/**
 * Merge metadata modifiers with filter by active and return it in request-like format
 * @param metadataModifiers {Object}
 * @param filterByActive {Object}
 * @return {Object} Merged modifiers in request-like format
 */

var getMergedModifiersInRequestFormat_recompute = createSelector$1(function (metadataModifiers, filterByActive) {
  var mergedMetadataKeys = getMergedModifiers_recompute(metadataModifiers, filterByActive); // It converts modifiers from metadataKeys: ["A", "B"] to metadataKey: {in: ["A", "B"]}

  return commonHelpers.convertModifiersToRequestFriendlyFormat(mergedMetadataKeys);
});
/**
 * Get common filter for data relations
 * @params componentState {Object}
 * @return {Object} relations filter
 */

var getCommmonDataRelationsFilterFromComponentState_recompute = createSelector$1(function (componentState) {
  var relationsFilter = {};
  var modifiers = getMergedModifiersInRequestFormat_recompute(componentState === null || componentState === void 0 ? void 0 : componentState.metadataModifiers, componentState === null || componentState === void 0 ? void 0 : componentState.filterByActive);

  if (!_isEmpty2(modifiers)) {
    relationsFilter.modifiers = modifiers;
  } // add layerTemplate od areaTreeLevelKey


  if (componentState !== null && componentState !== void 0 && componentState.layerTemplateKey) {
    relationsFilter.layerTemplateKey = componentState.layerTemplateKey;
  } else if (componentState !== null && componentState !== void 0 && componentState.areaTreeLevelKey) {
    relationsFilter.areaTreeLevelKey = componentState.areaTreeLevelKey;
  }

  return relationsFilter;
});
var commonSelectors = {
  getActive: getActive,
  getActiveKey: getActiveKey,
  getActiveKeys: getActiveKeys,
  getActiveModels: getActiveModels,
  getAll: getAll,
  getAllAsObject: getAllAsObject,
  getAllByKey: getAllByKey,
  getByKey: getByKey,
  getByKeysAsObject: getByKeysAsObject,
  getByKeys: getByKeys,
  getDataByKey: getDataByKey,
  getDeletePermissionByKey: getDeletePermissionByKey,
  getEditedActive: getEditedActive,
  getEditedAll: getEditedAll,
  getEditedAllAsObject: getEditedAllAsObject,
  getEditedByKey: getEditedByKey,
  getEditedDataByKey: getEditedDataByKey,
  getEditedKeys: getEditedKeys,
  getIndex: getIndex$1,
  getIndexByPath: getIndexByPath,
  getIndexed: getIndexed,
  getIndexes: getIndexes,
  getIndexesByPath: getIndexesByPath,
  getIndexChangedOn: getIndexChangedOn,
  getIndexPage: getIndexPage,
  getIndexTotal: getIndexTotal,
  getIndexesByFilteredItem: getIndexesByFilteredItem,
  getKeysInUse: getKeysInUse,
  getKeysToLoad: getKeysToLoad,
  getStateToSave: getStateToSave,
  getUpdatePermissionByKey: getUpdatePermissionByKey,
  getUsedIndexPage: getUsedIndexPage,
  getUsedIndexPages: getUsedIndexPages,
  getUsedKeysForComponent: getUsedKeysForComponent,
  getUsesWithActiveDependency: getUsesWithActiveDependency,
  haveAllKeysRegisteredUse: haveAllKeysRegisteredUse,
  // selectors across stores
  getActiveKeysByFilterByActive: getActiveKeysByFilterByActive,
  getAllActiveKeys: getAllActiveKeys,
  // recompute observers
  getActiveKeysByFilterByActiveObserver: getActiveKeysByFilterByActiveObserver,
  getIndexesObserver: getIndexesObserver,
  // recompute selectors
  getIndex_recompute: getIndex_recompute,
  getCommmonDataRelationsFilterFromComponentState_recompute: getCommmonDataRelationsFilterFromComponentState_recompute,
  getMergedModifiers_recompute: getMergedModifiers_recompute,
  getMergedModifiersInRequestFormat_recompute: getMergedModifiersInRequestFormat_recompute
};

var getSubstate$1 = function getSubstate(state) {
  return state.areas.areaTreeLevels;
};

var getAll$1 = commonSelectors.getAll(getSubstate$1);
var getAllAsObject$1 = commonSelectors.getAllAsObject(getSubstate$1);
var getActiveKey$1 = commonSelectors.getActiveKey(getSubstate$1);
var getActive$1 = commonSelectors.getActive(getSubstate$1);
var areaTreeLevels = {
  getAll: getAll$1,
  getAllAsObject: getAllAsObject$1,
  getActiveKey: getActiveKey$1,
  getActive: getActive$1,
  getSubstate: getSubstate$1
};

var getSubstate$2 = function getSubstate(state) {
  return state.areas.areaTrees;
};

var getAll$2 = commonSelectors.getAll(getSubstate$2);
var getAllAsObject$2 = commonSelectors.getAllAsObject(getSubstate$2);
var getActiveKey$2 = commonSelectors.getActiveKey(getSubstate$2);
var getActive$2 = commonSelectors.getActive(getSubstate$2);
var areaTrees = {
  getAll: getAll$2,
  getAllAsObject: getAllAsObject$2,
  getActiveKey: getActiveKey$2,
  getActive: getActive$2,
  getByKeys: commonSelectors.getByKeys(getSubstate$2),
  getByKeysAsObject: commonSelectors.getByKeysAsObject(getSubstate$2),
  getSubstate: getSubstate$2
};

var Areas = {
  areaTreeLevels: areaTreeLevels,
  areaTrees: areaTrees
};

var getSubstate$3 = function getSubstate(state) {
  return state.areaRelations;
};

var getAll$3 = commonSelectors.getAll(getSubstate$3);
/**
 * @return {Array|null}
 */

var getAllData = createSelector([getAll$3], function (relations) {
  if (relations) {
    return _map(relations, function (relation) {
      return relation.data;
    });
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param filter {Object}
 * @returns {Array|null}
 */

var getFilteredData = createSelector([getAllData, function (state, filter) {
  return filter;
}], function (relations, filter) {
  if (relations && relations.length > 0 && filter && !_isEmpty2(filter)) {
    return _filter(relations, filter);
  } else {
    return null;
  }
});
/**
 * @returns {Object}
 */

var getFilteredDataSourceKeysGroupedByLayerKey = createCachedSelector([getAll$3, function (state, layers) {
  return layers;
}], function (relations, layers) {
  if (relations && relations.length) {
    var filteredGroupedByLayerKey = {};

    _forEach(layers, function (layer) {
      var filteredRelations = _filter(relations, {
        data: layer.filter
      });

      if (filteredRelations.length) {
        filteredGroupedByLayerKey[layer.key] = filteredRelations.map(function (relation) {
          return {
            spatialDataSourceKey: relation.data.spatialDataSourceKey,
            fidColumnName: relation.data.fidColumnName
          };
        });
      }
    });

    return !_isEmpty2(filteredGroupedByLayerKey) ? filteredGroupedByLayerKey : null;
  } else {
    return null;
  }
})(function (state, layers) {
  return JSON.stringify(layers);
});
var AreaRelations = {
  getSubstate: getSubstate$3,
  getFilteredData: getFilteredData,
  getFilteredDataSourceKeysGroupedByLayerKey: getFilteredDataSourceKeysGroupedByLayerKey
};

var getSubstate$4 = function getSubstate(state) {
  return state.attributes;
};

var getAll$4 = commonSelectors.getAll(getSubstate$4);
var getActive$3 = commonSelectors.getActive(getSubstate$4);
var getActiveKey$3 = commonSelectors.getActiveKey(getSubstate$4);
var getActiveKeys$1 = commonSelectors.getActiveKeys(getSubstate$4);
var getActiveModels$1 = commonSelectors.getActiveModels(getSubstate$4);
var getAllAsObject$3 = commonSelectors.getAllAsObject(getSubstate$4);
var getByKey$1 = commonSelectors.getByKey(getSubstate$4);
var getByKeys$1 = commonSelectors.getByKeys(getSubstate$4);
var getByKeysAsObject$1 = commonSelectors.getByKeysAsObject(getSubstate$4);
var getDataByKey$1 = commonSelectors.getDataByKey(getSubstate$4);
var getDeletePermissionByKey$1 = commonSelectors.getDeletePermissionByKey(getSubstate$4);
var getEditedActive$1 = commonSelectors.getEditedActive(getSubstate$4);
var getEditedAll$1 = commonSelectors.getEditedAll(getSubstate$4);
var getEditedAllAsObject$1 = commonSelectors.getEditedAllAsObject(getSubstate$4);
var getEditedByKey$1 = commonSelectors.getEditedByKey(getSubstate$4);
var getEditedDataByKey$1 = commonSelectors.getEditedDataByKey(getSubstate$4);
var getEditedKeys$1 = commonSelectors.getEditedKeys(getSubstate$4);
var getIndexed$1 = commonSelectors.getIndexed(getSubstate$4);
var getUpdatePermissionByKey$1 = commonSelectors.getUpdatePermissionByKey(getSubstate$4);
var getUsedKeysForComponent$1 = commonSelectors.getUsedKeysForComponent(getSubstate$4);
var getStateToSave$1 = commonSelectors.getStateToSave(getSubstate$4);
var haveAllKeysRegisteredUse$1 = commonSelectors.haveAllKeysRegisteredUse(getSubstate$4);
var Attributes = {
  getActive: getActive$3,
  getActiveKey: getActiveKey$3,
  getActiveKeys: getActiveKeys$1,
  getActiveModels: getActiveModels$1,
  getAll: getAll$4,
  getAllAsObject: getAllAsObject$3,
  getByKey: getByKey$1,
  getByKeys: getByKeys$1,
  getByKeysAsObject: getByKeysAsObject$1,
  getDataByKey: getDataByKey$1,
  getDeletePermissionByKey: getDeletePermissionByKey$1,
  getEditedActive: getEditedActive$1,
  getEditedAll: getEditedAll$1,
  getEditedAllAsObject: getEditedAllAsObject$1,
  getEditedByKey: getEditedByKey$1,
  getEditedDataByKey: getEditedDataByKey$1,
  getEditedKeys: getEditedKeys$1,
  getIndexed: getIndexed$1,
  getUpdatePermissionByKey: getUpdatePermissionByKey$1,
  getUsedKeysForComponent: getUsedKeysForComponent$1,
  getStateToSave: getStateToSave$1,
  getSubstate: getSubstate$4,
  haveAllKeysRegisteredUse: haveAllKeysRegisteredUse$1
};

var getSubstate$5 = function getSubstate(state) {
  return state.attributeSets;
};

var getAll$5 = commonSelectors.getAll(getSubstate$5);
var getAllAsObject$4 = commonSelectors.getAllAsObject(getSubstate$5);
var getActiveKey$4 = commonSelectors.getActiveKeys(getSubstate$5);
var getActiveKeys$2 = commonSelectors.getActiveKeys(getSubstate$5);
var getActiveModels$2 = commonSelectors.getActiveModels(getSubstate$5);
var getActive$4 = commonSelectors.getActive(getSubstate$5);
var getByKey$2 = commonSelectors.getByKey(getSubstate$5);
var getByKeys$2 = commonSelectors.getByKeys(getSubstate$5);
var getByKeysAsObject$2 = commonSelectors.getByKeysAsObject(getSubstate$5);
var getDataByKey$2 = commonSelectors.getDataByKey(getSubstate$5);
var getDeletePermissionByKey$2 = commonSelectors.getDeletePermissionByKey(getSubstate$5);
var getEditedActive$2 = commonSelectors.getEditedActive(getSubstate$5);
var getEditedAll$2 = commonSelectors.getEditedAll(getSubstate$5);
var getEditedAllAsObject$2 = commonSelectors.getEditedAllAsObject(getSubstate$5);
var getEditedByKey$2 = commonSelectors.getEditedByKey(getSubstate$5);
var getEditedDataByKey$2 = commonSelectors.getEditedDataByKey(getSubstate$5);
var getEditedKeys$2 = commonSelectors.getEditedKeys(getSubstate$5);
var getIndexed$2 = commonSelectors.getIndexed(getSubstate$5);
var getStateToSave$2 = commonSelectors.getStateToSave(getSubstate$5);
var getUpdatePermissionByKey$2 = commonSelectors.getUpdatePermissionByKey(getSubstate$5);
var getUsedKeysForComponent$2 = commonSelectors.getUsedKeysForComponent(getSubstate$5);
var haveAllKeysRegisteredUse$2 = commonSelectors.haveAllKeysRegisteredUse(getSubstate$5);
var AttributeSets = {
  getActive: getActive$4,
  getActiveKey: getActiveKey$4,
  getActiveKeys: getActiveKeys$2,
  getActiveModels: getActiveModels$2,
  getAll: getAll$5,
  getAllAsObject: getAllAsObject$4,
  getByKey: getByKey$2,
  getByKeys: getByKeys$2,
  getByKeysAsObject: getByKeysAsObject$2,
  getDataByKey: getDataByKey$2,
  getDeletePermissionByKey: getDeletePermissionByKey$2,
  getEditedActive: getEditedActive$2,
  getEditedAll: getEditedAll$2,
  getEditedAllAsObject: getEditedAllAsObject$2,
  getEditedByKey: getEditedByKey$2,
  getEditedDataByKey: getEditedDataByKey$2,
  getEditedKeys: getEditedKeys$2,
  getIndexed: getIndexed$2,
  getStateToSave: getStateToSave$2,
  getSubstate: getSubstate$5,
  getUpdatePermissionByKey: getUpdatePermissionByKey$2,
  getUsedKeysForComponent: getUsedKeysForComponent$2,
  haveAllKeysRegisteredUse: haveAllKeysRegisteredUse$2
};

var getSubstate$6 = function getSubstate(state) {
  return state.cases;
};

var getAll$6 = commonSelectors.getAll(getSubstate$6);
var getAllAsObject$5 = commonSelectors.getAllAsObject(getSubstate$6);
var getActive$5 = commonSelectors.getActive(getSubstate$6);
var getActiveKey$5 = commonSelectors.getActiveKey(getSubstate$6);
var getActiveKeys$3 = commonSelectors.getActiveKeys(getSubstate$6);
var getActiveModels$3 = commonSelectors.getActiveModels(getSubstate$6);
var getByKey$3 = commonSelectors.getByKey(getSubstate$6);
var getByKeys$3 = commonSelectors.getByKeys(getSubstate$6);
var getByKeysAsObject$3 = commonSelectors.getByKeysAsObject(getSubstate$6);
var getDataByKey$3 = commonSelectors.getDataByKey(getSubstate$6);
var getDeletePermissionByKey$3 = commonSelectors.getDeletePermissionByKey(getSubstate$6);
var getEditedActive$3 = commonSelectors.getEditedActive(getSubstate$6);
var getEditedAll$3 = commonSelectors.getEditedAll(getSubstate$6);
var getEditedAllAsObject$3 = commonSelectors.getEditedAllAsObject(getSubstate$6);
var getEditedByKey$3 = commonSelectors.getEditedByKey(getSubstate$6);
var getEditedDataByKey$3 = commonSelectors.getEditedDataByKey(getSubstate$6);
var getEditedKeys$3 = commonSelectors.getEditedKeys(getSubstate$6);
var getIndexed$3 = commonSelectors.getIndexed(getSubstate$6);
var getStateToSave$3 = commonSelectors.getStateToSave(getSubstate$6);
var getUpdatePermissionByKey$3 = commonSelectors.getUpdatePermissionByKey(getSubstate$6);
var getUsedKeysForComponent$3 = commonSelectors.getUsedKeysForComponent(getSubstate$6);
var haveAllKeysRegisteredUse$3 = commonSelectors.haveAllKeysRegisteredUse(getSubstate$6);
var Cases = {
  getActive: getActive$5,
  getActiveKey: getActiveKey$5,
  getActiveKeys: getActiveKeys$3,
  getActiveModels: getActiveModels$3,
  getAll: getAll$6,
  getAllAsObject: getAllAsObject$5,
  getByKey: getByKey$3,
  getByKeys: getByKeys$3,
  getByKeysAsObject: getByKeysAsObject$3,
  getDataByKey: getDataByKey$3,
  getDeletePermissionByKey: getDeletePermissionByKey$3,
  getEditedActive: getEditedActive$3,
  getEditedAll: getEditedAll$3,
  getEditedAllAsObject: getEditedAllAsObject$3,
  getEditedByKey: getEditedByKey$3,
  getEditedDataByKey: getEditedDataByKey$3,
  getEditedKeys: getEditedKeys$3,
  getIndexed: getIndexed$3,
  getStateToSave: getStateToSave$3,
  getSubstate: getSubstate$6,
  getUpdatePermissionByKey: getUpdatePermissionByKey$3,
  getUsedKeysForComponent: getUsedKeysForComponent$3,
  haveAllKeysRegisteredUse: haveAllKeysRegisteredUse$3
};

var getAllByKey$1 = function getAllByKey(state) {
  return state.components;
};

var getAllByKeyObserver = createObserver(getAllByKey$1);
/**
 * @param state {Object}
 * @param componentKey {string}
 * @return {Object} component data
 */

var getByComponentKey = createSelector([getAllByKey$1, function (state, key) {
  return key;
}], function (components, key) {
  if (components && key && components[key]) {
    return components[key];
  } else {
    return null;
  }
});
/**
 * @param componentKey {string}
 * @return {Object} component data
 */

var getByComponentKey_recompute = createSelector$1(function (componentKey) {
  if (componentKey) {
    var components = getAllByKeyObserver();

    if (!_isEmpty2(components)) {
      return components[componentKey] || null;
    } else {
      return null;
    }
  } else {
    return null;
  }
});
/**
 * Get value from given path
 * @param state {Object}
 * @param componentKey {string}
 * @param path {string}
 * @return {*} value
 */

var get = createSelector([getByComponentKey, function (state, key, path) {
  return path;
}], function (componentState, path) {
  return _get(componentState, path, null);
});
var Components = {
  get: get,
  getAllByKeyObserver: getAllByKeyObserver,
  getByComponentKey: getByComponentKey,
  getByComponentKey_recompute: getByComponentKey_recompute,
  getStateToSave: getAllByKey$1,
  getSubstate: getAllByKey$1
};

var serialize = function serialize(args) {
  return stringify(args);
};

var recomputeSelectorOptions = {
  serialize: serialize
};

var getSubstate$7 = function getSubstate(state) {
  return state.data.attributeRelations;
};

var getIndex$2 = commonSelectors.getIndex(getSubstate$7);
var getIndex_recompute$1 = commonSelectors.getIndex_recompute(getSubstate$7);
/**
 * It returns relation model for given key, if exists
 * @param key {string} relation key
 * @return {Object} attribute relation
 */

var getByKeyObserver = createObserver(function (state, key) {
  var _getSubstate, _getSubstate$byKey;

  return ((_getSubstate = getSubstate$7(state)) === null || _getSubstate === void 0 ? void 0 : (_getSubstate$byKey = _getSubstate.byKey) === null || _getSubstate$byKey === void 0 ? void 0 : _getSubstate$byKey[key]) || null;
});
/**
 * It returns relation models for given keys
 * @param keys {Array} relation keys
 * @return {Array} A collection of relations
 */

var getByKeys$4 = createSelector$1(function (keys) {
  if (keys !== null && keys !== void 0 && keys.length) {
    var relations = [];
    keys.forEach(function (key) {
      var relation = getByKeyObserver(key);

      if (relation) {
        relations.push(relation);
      }
    });
    return relations.length ? relations : null;
  } else {
    return null;
  }
}, recomputeSelectorOptions);
/**
 * It returns a collection of indexed relations for given filter
 * @param filter {Object}
 * @return {Array}
 */

var getIndexed$4 = createSelector$1(function (filter) {
  var index = getIndex_recompute$1(filter, null);

  if (index !== null && index !== void 0 && index.index) {
    // filter only uuids (not true or false values of index)
    var keys = _filter(Object.values(index.index), function (key) {
      return typeof key === 'string';
    });

    if (keys !== null && keys !== void 0 && keys.length) {
      return getByKeys$4(keys);
    } else {
      return null;
    }
  } else {
    return null;
  }
}, recomputeSelectorOptions);
/**
 * It returns key-value pairs, where the key is attribute data source key and the value is attribute key
 * @param filter {Object} attribute relation filter
 * @return {Object}
 */

var getFilteredAttributeDataSourceKeyAttributeKeyPairs = createSelector$1(function (filter) {
  var relations = getIndexed$4(filter);

  if (relations) {
    var pairs = {};

    _forEach(relations, function (relation) {
      pairs[relation.data.attributeDataSourceKey] = relation.data.attributeKey;
    });

    return pairs;
  } else {
    return null;
  }
}, recomputeSelectorOptions);
var attributeRelations = {
  getByKeyObserver: getByKeyObserver,
  getByKeys: getByKeys$4,
  getFilteredAttributeDataSourceKeyAttributeKeyPairs: getFilteredAttributeDataSourceKeyAttributeKeyPairs,
  getIndexed: getIndexed$4,
  getIndex: getIndex$2
};

var getSubstate$8 = function getSubstate(state) {
  return state.data.attributeDataSources;
};

var getIndex$3 = commonSelectors.getIndex(getSubstate$8);
var getIndex_recompute$2 = commonSelectors.getIndex_recompute(getSubstate$8);
/**
 * It returns data source model for given key, if exists
 * @param key {string} data source key
 * @return {Object} attribute data source model
 */

var getByKeyObserver$1 = createObserver(function (state, key) {
  var _getSubstate, _getSubstate$byKey;

  return ((_getSubstate = getSubstate$8(state)) === null || _getSubstate === void 0 ? void 0 : (_getSubstate$byKey = _getSubstate.byKey) === null || _getSubstate$byKey === void 0 ? void 0 : _getSubstate$byKey[key]) || null;
});
/**
 * It returns data source models for given keys
 * @param keys {Array} data source keys
 * @return {Array} A collection of data source models
 */

var getByKeys$5 = createSelector$1(function (keys) {
  if (keys !== null && keys !== void 0 && keys.length) {
    var dataSources = [];
    keys.forEach(function (key) {
      var dataSource = getByKeyObserver$1(key);

      if (dataSource) {
        dataSources.push(dataSource);
      }
    });
    return dataSources.length ? dataSources : null;
  } else {
    return null;
  }
}, recomputeSelectorOptions);
/**
 * It returns a collection of indexed data sources for given filter
 * @param filter {Object}
 * @return {Array}
 */

var getIndexed$5 = createSelector$1(function (filter) {
  var index = getIndex_recompute$2(filter, null);

  if (index !== null && index !== void 0 && index.index) {
    var keys = Object.values(index.index);

    if (keys !== null && keys !== void 0 && keys.length) {
      return getByKeys$5(keys);
    } else {
      return null;
    }
  } else {
    return null;
  }
}, recomputeSelectorOptions);
var attributeDataSources = {
  getByKeyObserver: getByKeyObserver$1,
  getByKeys: getByKeys$5,
  getIndexed: getIndexed$5,
  getIndex: getIndex$3,
  getIndex_recompute: getIndex_recompute$2
};

var getSubstate$9 = function getSubstate(state) {
  return state.data.attributeData;
};

var getIndex$4 = commonSelectors.getIndexByPath(getSubstate$9); // Recompute observers ---------------------------------------------------------

var getAllAsObjectObserver = createObserver(function (state) {
  return getSubstate$9(state).byDataSourceKey;
});
var getIndexesObserver$1 = createObserver(function (state) {
  return getSubstate$9(state).indexes;
});
var getSpatialIndexesObserver = createObserver(function (state) {
  return getSubstate$9(state).spatialIndexes;
});
/**
 * It returns all data for given datasource key
 * @param key {string} data source key
 * @returns {Object} Features as object (by feature key)
 */

var getByDataSourceKeyObserver = createObserver(function (state, key) {
  var _getSubstate, _getSubstate$byDataSo;

  return ((_getSubstate = getSubstate$9(state)) === null || _getSubstate === void 0 ? void 0 : (_getSubstate$byDataSo = _getSubstate.byDataSourceKey) === null || _getSubstate$byDataSo === void 0 ? void 0 : _getSubstate$byDataSo[key]) || null;
});
/**
 * It returns whole index for given filter & order
 * @param {Object} filter
 * @param {Array} order
 * @return {Object} index
 */

var getIndex_recompute$3 = createSelector$1(function (filter, order) {
  var indexes = getIndexesObserver$1();

  if (indexes && !_isEmpty2(indexes)) {
    return commonHelpers.getIndex(indexes, filter, order);
  } else {
    return null;
  }
}, recomputeSelectorOptions);
/**
 * It returns whole spatial index for given filter & order
 * @param {Object} filter
 * @param {Array} order
 * @return {Object} index
 */

var getSpatialIndex_recompute = createSelector$1(function (filter, order) {
  var indexes = getSpatialIndexesObserver();

  if (indexes && !_isEmpty2(indexes)) {
    return commonHelpers.getIndex(indexes, filter, order);
  } else {
    return null;
  }
}, recomputeSelectorOptions);
/**
 * It returns attributes data (an object containing featureKey-attributeValue pairs) grouped by data source key
 * @param dataSourceKeys {Array}
 * @return {Object}
 */

var getDataByDataSourceKeys = createSelector$1(function (dataSourceKeys) {
  if (dataSourceKeys) {
    var data = {};

    _forEach(dataSourceKeys, function (key) {
      var attributes = getByDataSourceKeyObserver(key);

      if (attributes && !_isEmpty2(attributes)) {
        data[key] = attributes;
      }
    });

    return !_isEmpty2(data) ? data : null;
  } else {
    return null;
  }
}, recomputeSelectorOptions);
/**
 * It returns attribute values for given feature key grouped by data source key
 * @param attributeDataSourceKeyAttributeKeyPairs {Object} key-value pairs, where the key is attribute data source key and the value is matching attribute key
 * @param featureKey {string | number}
 * @return {Object} attributeDataSource key - attribute value pairs
 */

var getAttributesByDataSourceKeysForFeatureKey = createSelector$1(function (attributeDataSourceKeyAttributeKeyPairs, featureKey) {
  if (attributeDataSourceKeyAttributeKeyPairs && featureKey) {
    var dataSourceKeys = Object.keys(attributeDataSourceKeyAttributeKeyPairs);
    var dataByDataSourceKey = getDataByDataSourceKeys(dataSourceKeys);

    if (dataByDataSourceKey) {
      var attributes = {};

      _forIn(dataByDataSourceKey, function (dataSourceData, dataSourceKey) {
        if (dataSourceData.hasOwnProperty(featureKey)) {
          var value = dataSourceData[featureKey];
          var attributeKey = attributeDataSourceKeyAttributeKeyPairs[dataSourceKey];

          if (attributeKey) {
            attributes[attributeKey] = value;
          }
        }
      });

      return !_isEmpty2(attributes) ? attributes : null;
    } else {
      return null;
    }
  } else {
    return null;
  }
}, recomputeSelectorOptions);
/**
 * It returns indexed feature keys grouped by attribute data source keys
 * @param {Object} filter
 * @param {number} level
 * @param {string} tile
 * @return {Object}
 */

var getSpatiallyIndexedFeatureKeysByDataSourceKeys = createSelector$1(function (filter, level, tile) {
  var spatialIndex = getSpatialIndex_recompute(filter, null);

  if (spatialIndex !== null && spatialIndex !== void 0 && spatialIndex.index && !_isEmpty2(spatialIndex)) {
    var _spatialIndex$index$l;

    var featureKeysByDataSourceKeys = (_spatialIndex$index$l = spatialIndex.index[level]) === null || _spatialIndex$index$l === void 0 ? void 0 : _spatialIndex$index$l[tile];
    return featureKeysByDataSourceKeys || null;
  } else {
    return null;
  }
}, recomputeSelectorOptions);
/**
 * @param {Object} filter
 * @param {number} level
 * @param {string} tile
 * @param {string} dataSourceKey
 * @return {Array} indexed feature keys
 */

var isTileLoading = createSelector$1(function (filter, level, tile) {
  if (_isNumber(level) && tile) {
    var index = getSpatialIndex_recompute(filter, null);

    if (index) {
      var _index$index$level;

      var loading = index === null || index === void 0 ? void 0 : (_index$index$level = index.index[level]) === null || _index$index$level === void 0 ? void 0 : _index$index$level[tile];
      return loading === true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}, recomputeSelectorOptions);
var attributeData = {
  getAllAsObjectObserver: getAllAsObjectObserver,
  getByDataSourceKeyObserver: getByDataSourceKeyObserver,
  getIndex: getIndex$4,
  getIndex_recompute: getIndex_recompute$3,
  getIndexesObserver: getIndexesObserver$1,
  getSpatialIndex_recompute: getSpatialIndex_recompute,
  getSpatialIndexesObserver: getSpatialIndexesObserver,
  getDataByDataSourceKeys: getDataByDataSourceKeys,
  getAttributesByDataSourceKeysForFeatureKey: getAttributesByDataSourceKeysForFeatureKey,
  getSpatiallyIndexedFeatureKeysByDataSourceKeys: getSpatiallyIndexedFeatureKeysByDataSourceKeys,
  isTileLoading: isTileLoading,
  getSubstate: getSubstate$9
};

var getAllComponentsInUse = function getAllComponentsInUse(state) {
  return state.data.components.components.inUse;
};

var getComponentStateByKey = function getComponentStateByKey(state, key) {
  return state.data.components.components.byKey[key] || null;
};

var getComponentStateByKeyObserver = createObserver(getComponentStateByKey);
/**
 * Check if component is in use
 * @param state {Object}
 * @param componentKey {string}
 * @return {boolean}
 */

var isComponentInUse = createCachedSelector([getAllComponentsInUse, function (state, componentKey) {
  return componentKey;
}], function (componentsInUse, componentKey) {
  if (componentsInUse !== null && componentsInUse !== void 0 && componentsInUse.length && componentKey) {
    return !!_includes(componentsInUse, componentKey);
  } else {
    return false;
  }
})(function (state, componentKey) {
  return componentKey;
});
/**
 * Check if component's filter by active matches give filterByActive
 * @param state {Object}
 * @param componentKey {string}
 * @param filterByActive {Object} {scope: true, place: true, ...}
 * @return {boolean}
 */

var componentMatchesFilterByActive = createCachedSelector([getComponentStateByKey, function (state, componentKey, filterByActive) {
  return filterByActive;
}], function (componentState, filterByActive) {
  if (componentState !== null && componentState !== void 0 && componentState.filterByActive && filterByActive) {
    return _isMatch2(componentState.filterByActive, filterByActive);
  } else {
    return false;
  }
})(function (state, componentKey, filterByActive) {
  return "".concat(componentKey, "_").concat(JSON.stringify(filterByActive));
});
/**
 * Get filter params which are specific for attribute data
 * @param componentKey {string}
 * @return {Object}
 */

var getAttributeDataFilterExtensionByComponentKey = createSelector$1(function (componentKey) {
  var componentState = getComponentStateByKeyObserver(componentKey);

  if (componentState) {
    var attributeFilter = componentState.attributeFilter,
        dataSourceKeys = componentState.dataSourceKeys,
        featureKeys = componentState.featureKeys,
        spatialFilter = componentState.spatialFilter;
    return _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, attributeFilter !== undefined && {
      attributeFilter: attributeFilter
    }), dataSourceKeys !== undefined && {
      dataSourceKeys: dataSourceKeys
    }), featureKeys !== undefined && {
      featureKeys: featureKeys
    }), spatialFilter !== undefined && {
      spatialFilter: spatialFilter
    });
  } else {
    return {};
  }
});
/**
 * Get filter params which are common to both attributeRelations and attributeData
 * @param componentKey {string}
 * @return {{modifiers: Object, areaTreeLevelKey: string, layerTemplateKey: string, attributeKeys: Array}}
 */

var getCommonFilterByComponentKey = createSelector$1(function (componentKey) {
  var componentState = getComponentStateByKeyObserver(componentKey);

  if (componentState) {
    var areaTreeLevelKey = componentState.areaTreeLevelKey,
        attributeKeys = componentState.attributeKeys,
        filterByActive = componentState.filterByActive,
        layerTemplateKey = componentState.layerTemplateKey,
        metadataModifiers = componentState.metadataModifiers; // modifiers defined by key

    var metadataDefinedByKey = metadataModifiers ? _objectSpread2({}, metadataModifiers) : {};

    if (layerTemplateKey) {
      metadataDefinedByKey[layerTemplateKey] = layerTemplateKey;
    } else if (areaTreeLevelKey) {
      metadataDefinedByKey[areaTreeLevelKey] = areaTreeLevelKey;
    } // Get actual metadata keys defined by filterByActive


    var activeMetadataKeys = filterByActive ? commonSelectors.getActiveKeysByFilterByActiveObserver(filterByActive) : null; // Merge metadata, metadata defined by key have priority

    var mergedMetadataKeys = commonHelpers.mergeMetadataKeys(metadataDefinedByKey, activeMetadataKeys); // Decouple modifiers from templates

    mergedMetadataKeys.areaTreeLevelKey;
        mergedMetadataKeys.layerTemplateKey;
        var modifiers = _objectWithoutProperties(mergedMetadataKeys, ["areaTreeLevelKey", "layerTemplateKey"]); // It converts modifiers from metadataKeys: ["A", "B"] to metadataKey: {in: ["A", "B"]}


    var modifiersForRequest = commonHelpers.convertModifiersToRequestFriendlyFormat(modifiers);
    return _objectSpread2(_objectSpread2(_objectSpread2({
      modifiers: modifiersForRequest
    }, areaTreeLevelKey !== undefined && {
      areaTreeLevelKey: areaTreeLevelKey
    }), layerTemplateKey !== undefined && {
      layerTemplateKey: layerTemplateKey
    }), attributeKeys !== undefined && {
      attributeKeys: attributeKeys
    });
  } else {
    return {};
  }
});
/**
 * Select attribute data indexes by component key
 * @param componentKey {string}
 */

var getIndexForAttributeDataByComponentKey = createSelector$1(function (componentKey) {
  var componentState = getComponentStateByKeyObserver(componentKey);

  if (componentState) {
    var attributeOrder = componentState.attributeOrder;
    var attributeDataFilterExtension = getAttributeDataFilterExtensionByComponentKey(componentKey);
    var commonFilter = getCommonFilterByComponentKey(componentKey);

    var attributeDataFilter = _objectSpread2(_objectSpread2({}, commonFilter), attributeDataFilterExtension);

    var attributeDataIndex = attributeData.getIndex_recompute(attributeDataFilter, attributeOrder) || [];
    return !_isEmpty2(attributeDataIndex) ? attributeDataIndex : null;
  } else {
    return null;
  }
}); // Data selectors ------------------------------------------------------------------------------------------------------

/**
 * General selector for assembling attribute data for component
 * @param componentKey {string}
 * @return {Array} A collection of features, where each feature has following format: {featureKey: string, data: {attributeKey: string|number|boolean|null}}
 */

var getData = createSelector$1(function (componentKey) {
  var componentState = getComponentStateByKeyObserver(componentKey);

  if (componentState) {
    var _ret = function () {
      // TODO cached selector for data of only relevant data sources needed!!!
      var data = attributeData.getAllAsObjectObserver();
      var attributeKeys = componentState === null || componentState === void 0 ? void 0 : componentState.attributeKeys;

      if (!_isEmpty2(data) && attributeKeys !== null && attributeKeys !== void 0 && attributeKeys.length) {
        var attributeDataFilterExtension = getAttributeDataFilterExtensionByComponentKey(componentKey);
        var commonFilter = getCommonFilterByComponentKey(componentKey);

        var attributeFilter = _objectSpread2(_objectSpread2({}, commonFilter), attributeDataFilterExtension);

        var attributeOrder = componentState.attributeOrder || null;

        var relationsFilter = _objectSpread2({}, commonFilter); // Get relations


        var attributeRelations$1 = attributeRelations.getIndexed(relationsFilter);

        if (attributeRelations$1 !== null && attributeRelations$1 !== void 0 && attributeRelations$1.length) {
          // Get from relations, which data source is associated with which attribute
          var attributeDsKeyAttributeKeyPairs = {};
          attributeRelations$1.forEach(function (relation) {
            attributeDsKeyAttributeKeyPairs[relation.data.attributeDataSourceKey] = relation.data.attributeKey;
          }); // Find data index
          // TODO more sophisticated index with attributeFilter & attributeOrder

          var attributeDataIndex = attributeData.getIndex_recompute(attributeFilter, attributeOrder); // Get indexed features

          var indexedFeatureKeysAsObject = attributeDataIndex === null || attributeDataIndex === void 0 ? void 0 : attributeDataIndex.index;

          if (indexedFeatureKeysAsObject && !_isEmpty2(indexedFeatureKeysAsObject)) {
            var _ret2 = function () {
              var start = componentState.start,
                  length = componentState.length;
              start = start || 1;
              length = length || attributeDataIndex.count;
              var end = Math.min(start + length - 1, attributeDataIndex.count);
              var finalFeaturesAsObject = []; // Loop through indexed features

              var _loop = function _loop(i) {
                var featureKey = indexedFeatureKeysAsObject[i];

                if (featureKey) {
                  // We don't know which feature is in which attribute DS
                  // also there could be more attributes for the feature
                  _forIn(attributeDsKeyAttributeKeyPairs, function (attributeKey, attributeDsKey) {
                    var _data$attributeDsKey;

                    var value = (_data$attributeDsKey = data[attributeDsKey]) === null || _data$attributeDsKey === void 0 ? void 0 : _data$attributeDsKey[featureKey];

                    if (value !== undefined) {
                      // existing feature
                      if (finalFeaturesAsObject[i - start]) {
                        finalFeaturesAsObject[i - start].data[attributeKey] = value;
                      } // new feature
                      else {
                          // TODO temporary fix for buggy BE values datatype
                          value = isNaN(value) ? value : _isNumber(value) ? value : Number(value); // TODO format?

                          finalFeaturesAsObject[i - start] = {
                            key: featureKey,
                            data: _defineProperty({}, attributeKey, value)
                          };
                        }
                    }
                  });
                } else {
                  // no feature key at index
                  finalFeaturesAsObject.push(null);
                }
              };

              for (var i = start; i <= end; i++) {
                _loop(i);
              }

              return {
                v: {
                  v: finalFeaturesAsObject
                }
              };
            }();

            if (_typeof(_ret2) === "object") return _ret2.v;
          } else {
            return {
              v: null
            };
          }
        } else {
          return {
            v: null
          };
        }
      } else {
        return {
          v: null
        };
      }
    }();

    if (_typeof(_ret) === "object") return _ret.v;
  } else {
    return null;
  }
});
/**
 * Specific selector to assembling the attribute data & settings of the cartesian chart
 * @param props {Object} component props
 * @param props.stateComponentKey {string} component key, needed for data assembling
 * @return {Object} Cartesian chart data & settings
 */

var getDataForCartesianChart = createSelector$1(function (props) {
  var componentSettings = Components.getByComponentKey_recompute(props.stateComponentKey);

  var chartSettings = _objectSpread2(_objectSpread2({}, componentSettings), props);

  var data = getData(props.stateComponentKey);
  return _objectSpread2({
    data: data || []
  }, chartSettings);
});
var components = {
  componentMatchesFilterByActive: componentMatchesFilterByActive,
  getAllComponentsInUse: getAllComponentsInUse,
  getAttributeDataFilterExtensionByComponentKey: getAttributeDataFilterExtensionByComponentKey,
  getCommonFilterByComponentKey: getCommonFilterByComponentKey,
  getComponentStateByKey: getComponentStateByKey,
  getComponentStateByKeyObserver: getComponentStateByKeyObserver,
  getIndexForAttributeDataByComponentKey: getIndexForAttributeDataByComponentKey,
  isComponentInUse: isComponentInUse,
  // Data selectors
  getData: getData,
  getDataForCartesianChart: getDataForCartesianChart
};

var getSubstate$a = function getSubstate(state) {
  return state.data.spatialRelations;
};

var getIndex$5 = commonSelectors.getIndex(getSubstate$a);
var spatialRelations = {
  getIndex: getIndex$5
};

var getSubstate$b = function getSubstate(state) {
  return state.data.spatialDataSources;
};

var getIndex$6 = commonSelectors.getIndex(getSubstate$b);
var getAllAsObject$6 = commonSelectors.getAllAsObject(getSubstate$b);
var getIndexesObserver$2 = createObserver(function (state) {
  return commonSelectors.getIndexes(getSubstate$b)(state);
});
/**
 * It returns data source model for given key, if exists
 * @param key {string} data source key
 * @return {Object} Data source
 */

var getByKeyObserver$2 = createObserver(function (state, key) {
  var _getSubstate, _getSubstate$byKey;

  return ((_getSubstate = getSubstate$b(state)) === null || _getSubstate === void 0 ? void 0 : (_getSubstate$byKey = _getSubstate.byKey) === null || _getSubstate$byKey === void 0 ? void 0 : _getSubstate$byKey[key]) || null;
});
/**
 * It returns data source models for given keys, if exist
 * @param keys {Array} data source keys
 * @return {Array} A collection of data sources
 */

var getByKeys$6 = createSelector$1(function (keys) {
  if (keys !== null && keys !== void 0 && keys.length) {
    var dataSources = [];
    keys.forEach(function (key) {
      var dataSource = getByKeyObserver$2(key);

      if (dataSource) {
        dataSources.push(dataSource);
      }
    });
    return dataSources.length ? dataSources : null;
  } else {
    return null;
  }
}, recomputeSelectorOptions);
/**
 * It returns whole index for given filter and order
 * @param filter {Object} Filter object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param order {Array}
 * @return index {Object}
 */

var getIndex_recompute$4 = createSelector$1(function (filter, order) {
  var indexes = getIndexesObserver$2();

  if (indexes) {
    return commonHelpers.getIndex(indexes, filter, order);
  } else {
    return null;
  }
}, recomputeSelectorOptions);
/**
 * It returns a collection of indexed data sources for given filter
 * @param filter {Object} Filter object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @return {Array}
 */

var getIndexed_recompute = createSelector$1(function (filter) {
  var index = getIndex_recompute$4(filter, null);

  if (index !== null && index !== void 0 && index.index) {
    var keys = Object.values(index.index);

    if (keys) {
      return getByKeys$6(keys);
    } else {
      return null;
    }
  } else {
    return null;
  }
}, recomputeSelectorOptions);
/**
 * It returns a collection of indexed data sources for given filter.
 * @param state {Object}
 * @param filter {Object} Filter object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @return {Array}
 */

var getIndexed$6 = createCachedSelector([getIndex$6, getAllAsObject$6], function (index, dataSources) {
  if (!_isEmpty2(index) && index.index) {
    var dataSourceKeys = Object.values(index.index);

    if (!_isEmpty2(dataSourceKeys)) {
      var filteredDataSources = [];
      dataSourceKeys.forEach(function (dataSourceKey) {
        var dataSource = dataSources[dataSourceKey];

        if (dataSource) {
          filteredDataSources.push(dataSource);
        }
      });

      if (filteredDataSources.length > 0) {
        return filteredDataSources;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
})(function (state, filter) {
  return "".concat(JSON.stringify(filter));
});
var spatialDataSources = {
  getByKeys: getByKeys$6,
  getByKeyObserver: getByKeyObserver$2,
  getIndexesObserver: getIndexesObserver$2,
  getIndexed: getIndexed$6,
  getIndexed_recompute: getIndexed_recompute,
  getIndex: getIndex$6,
  getIndex_recompute: getIndex_recompute$4
};

var getSubstate$c = function getSubstate(state) {
  return state.data.spatialData;
};

var getIndex$7 = commonSelectors.getIndex(getSubstate$c);
var getIndexesObserver$3 = createObserver(function (state) {
  return commonSelectors.getIndexes(getSubstate$c)(state);
});
/**
 * It returns all data for given datasource key
 * @param key {string} data source key
 * @returns {Object} Features as object (by feature key)
 */

var getByDataSourceKeyObserver$1 = createObserver(function (state, key) {
  var _getSubstate, _getSubstate$byDataSo;

  return ((_getSubstate = getSubstate$c(state)) === null || _getSubstate === void 0 ? void 0 : (_getSubstate$byDataSo = _getSubstate.byDataSourceKey) === null || _getSubstate$byDataSo === void 0 ? void 0 : _getSubstate$byDataSo[key]) || null;
});
/**
 * It returns whole index for given filter & order
 * @param {Object} filter
 * @param {Array} order
 * @return {Object} index
 */

var getIndex_recompute$5 = createSelector$1(function (filter, order) {
  var indexes = getIndexesObserver$3();

  if (indexes) {
    return commonHelpers.getIndex(indexes, filter, order);
  } else {
    return null;
  }
}, recomputeSelectorOptions);
/**
 * @param {Object} filter
 * @param {number} level
 * @param {string} tile
 * @param {string} dataSourceKey
 * @return {Array} indexed feature keys
 */

var getIndexedFeatureKeys = createSelector$1(function (filter, level, tile, dataSourceKey) {
  if (_isNumber(level) && tile && dataSourceKey) {
    var _index$index$level, _index$index$level$ti;

    var index = getIndex_recompute$5(filter, null);
    var featureKeys = index === null || index === void 0 ? void 0 : (_index$index$level = index.index[level]) === null || _index$index$level === void 0 ? void 0 : (_index$index$level$ti = _index$index$level[tile]) === null || _index$index$level$ti === void 0 ? void 0 : _index$index$level$ti[dataSourceKey];
    return featureKeys && featureKeys.length ? featureKeys : null;
  } else {
    return null;
  }
}, recomputeSelectorOptions);
/**
 * @param {Object} filter
 * @param {number} level
 * @param {string} tile
 * @param {string} dataSourceKey
 * @return {Array} indexed feature keys
 */

var isTileLoading$1 = createSelector$1(function (filter, level, tile) {
  if (_isNumber(level) && tile) {
    var index = getIndex_recompute$5(filter, null);

    if (index) {
      var _index$index$level2;

      var loading = index === null || index === void 0 ? void 0 : (_index$index$level2 = index.index[level]) === null || _index$index$level2 === void 0 ? void 0 : _index$index$level2[tile];
      return loading === true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}, recomputeSelectorOptions);
var spatialData = {
  getByDataSourceKeyObserver: getByDataSourceKeyObserver$1,
  getIndex: getIndex$7,
  getIndex_recompute: getIndex_recompute$5,
  getIndexesObserver: getIndexesObserver$3,
  getIndexedFeatureKeys: getIndexedFeatureKeys,
  isTileLoading: isTileLoading$1
};

/**
 * Determinate decimal precision of number
 * @param {Number} number
 * @returns {Number}
 */

var precision = function precision(number) {
  if (!Number.isFinite(number)) {
    return 0;
  }

  var e = 1,
      p = 0;

  while (Math.round(number * e) / e !== number) {
    e *= 10;
    p++;
  }

  return p;
};
/**
 * Finite numbers are transformed to the decimal format and to the string.
 * Example: 2e-2 -> "0.02"
 * Example: 0.02 -> "0.02"
 * @param {Number} number
 * @returns {string?}
 */

var getNumberInDecimalString = function getNumberInDecimalString(number) {
  if (!Number.isFinite(number)) {
    return null;
  }

  var numberPrecision = precision(number);
  return number.toFixed(numberPrecision);
};
/**
 * Returns array of strings representing given tile
 * @param {Array|string} tile
 * @returns {Array}
 */


var tileAsStringArray = function tileAsStringArray(tile) {
  if (_isArray2(tile) && typeof tile[0] === 'string' && typeof tile[1] === 'string') {
    return tile;
  } else if (_isArray2(tile)) {
    var arrTile = tileAsArray(tile);

    if (arrTile) {
      // return arrTile.map(getNumberInDecimalString).join(',');
      return arrTile.map(getNumberInDecimalString);
    } else {
      return null;
    }
  } else {
    return null;
  }
};
/**
 * Returns string representing given tile
 * @param {Array|string} tile
 * @returns {string}
 */

var tileAsString = function tileAsString(tile) {
  if (typeof tile === 'string') {
    return tile;
  } else {
    var stringTile = tileAsStringArray(tile);
    return stringTile ? stringTile.join(',') : null;
  }
};
/**
 * Converts tile as a string to array
 * @param {Array|string} tile
 * @returns {Array} Tile defined by Numbers in array
 */

var tileAsArray = function tileAsArray(tile) {
  if (typeof tile === 'string' && tile.split(',').length > 1 && tile.split(',').every(function (i) {
    return _isFinite2(parseFloat(i));
  })) {
    return tile.split(',').map(parseFloat);
  } else if (_isArray2(tile) && tile.length !== 1 && tile.every(function (i) {
    return _isFinite2(parseFloat(i));
  })) {
    return tile.map(parseFloat);
  } else if (_isArray2(tile) && tile.length === 1) {
    return tileAsArray(tile[0]);
  } else {
    return null;
  }
};
/**
 * Compare wanted tiles from filter with already loaded or loading tiles and give array of missing tiles in string format
 * @param {Object} index Already loaded index
 * @param {Object} filter Required filter
 * @param {Array.<string|Array.<number>>} filter.tiles
 * @param {number} filter.level
 * @returns {Array?} Array of missing tiles in stringArray format
 */

var getMissingTiles = function getMissingTiles(index, filter) {
  if (index && index.index && filter && _isArray2(filter.tiles)) {
    var _index$index;

    //index contains level
    if ((_index$index = index.index) !== null && _index$index !== void 0 && _index$index[filter.level]) {
      var loadedTilesInIndex = _reduce(index.index[filter.level], function (acc, tileData, tileKey) {
        //tileData === true means it is loading, so we mark them as not missing
        if (tileData) {
          //re-save tile as array to prevent negative zero
          return [].concat(_toConsumableArray(acc), [tileAsString(tileKey)]);
        } else {
          return acc;
        }
      }, []);

      var missingTiles = filter.tiles.filter(function (tile) {
        return !loadedTilesInIndex.includes(tileAsString(tile));
      });
      return missingTiles;
    } else {
      // no data for requested level
      // all tiles are missing
      return filter.tiles.map(function (tile) {
        return tileAsStringArray(tile);
      });
    }
  } else {
    if (_isArray2(filter === null || filter === void 0 ? void 0 : filter.tiles)) {
      // all tiles are missing
      return filter.tiles.map(function (tile) {
        return tileAsStringArray(tile);
      });
    } else {
      //filter is not defined
      return null;
    }
  }
};
/**
 * Central method for getting PAGE_SIZE from state or configDefaults.
 * @param {Object} localConfig Configuration with overrides
 * @return {Number}
 */

function getPageSize(localConfig) {
  var PAGE_SIZE = (localConfig === null || localConfig === void 0 ? void 0 : localConfig.requestPageSize) || configDefaults.requestPageSize;
  return PAGE_SIZE;
}

var tilesCache = new CacheFifo(1000);
/**
 * @param dataSourceKey {string} uuid
 * @param fidColumnName {string} name of property used as feature identifier
 * @param attributeDataSourceKeyAttributeKeyPairs {Object} key-value pairs, where key is attribute data source key and value is matching attribute key
 */

var getFeatures = createSelector$1(function (dataSourceKey, fidColumnName, attributeDataSourceKeyAttributeKeyPairs) {
  var data = spatialData.getByDataSourceKeyObserver(dataSourceKey);
  var attributesByDataSourceKey = null;

  if (attributeDataSourceKeyAttributeKeyPairs) {
    attributesByDataSourceKey = attributeData.getDataByDataSourceKeys(Object.keys(attributeDataSourceKeyAttributeKeyPairs));
  }

  if (data) {
    return _map(data, function (feature, key) {
      var properties = _defineProperty({}, fidColumnName, key);

      if (attributesByDataSourceKey) {
        _forIn(attributesByDataSourceKey, function (features, attributeDataSourceKey) {
          var attributeValue = features[key];

          if (attributeValue) {
            properties[attributeDataSourceKeyAttributeKeyPairs[attributeDataSourceKey]] = attributeValue;
          }
        });
      }

      return {
        type: 'Feature',
        key: key,
        geometry: feature.geometry,
        properties: properties
      };
    });
  } else {
    return null;
  }
}, recomputeSelectorOptions);
/**
 * Assemble vector data for single tile
 * @param dataSourceKey {string} uuid
 * @param fidColumnName {string} name of property used as feature identifier
 * @param level {number}
 * @param tile {Array} tile definition point
 * @param spatialRelationsFilter {Object} getSpatialRelationsFilterFromLayerState
 * @param attributeRelationsFilter {Object} getAttributeRelationsFilterFromLayerState
 * @param attributeDataSourceKeyAttributeKeyPairs {Object} key-value pairs, where key is attribute data source key and value is matching attribute key
 * @param styleKey {string} uuid
 * @param attributeDataFilter {Object} Filter object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @return {Object} populated tile (with feature's geometries and attributes)
 */

var getTile = createSelector$1(function (spatialDataSourceKey, fidColumnName, level, tile, spatialRelationsFilter, attributeRelationsFilter, attributeDataSourceKeyAttributeKeyPairs, styleKey, attributeDataFilter) {
  // Get all data for given key. It caused performance issues when the data was passed as a parameter
  var spatialDataForDataSource = spatialData.getByDataSourceKeyObserver(spatialDataSourceKey);

  if (spatialDataForDataSource) {
    var tileString = tileAsString(tile);
    var cacheParams = {
      attributeRelationsFilter: attributeRelationsFilter,
      attributeDataFilter: attributeDataFilter,
      spatialRelationsFilter: spatialRelationsFilter,
      level: level,
      tileString: tileString,
      spatialDataSourceKey: spatialDataSourceKey,
      styleKey: styleKey
    };
    var indexedFeatureKeys = spatialData.getIndexedFeatureKeys(spatialRelationsFilter, level, tileString, spatialDataSourceKey);
    var indexedFeatureKeysByAttributeDataSourceKeys = attributeData.getSpatiallyIndexedFeatureKeysByDataSourceKeys(attributeDataFilter, level, tileString);
    var cacheKey = stringify({
      cacheParams: cacheParams,
      indexedFeatureKeys: indexedFeatureKeys,
      indexedFeatureKeysByAttributeDataSourceKeys: indexedFeatureKeysByAttributeDataSourceKeys
    });
    var cache = tilesCache.findByKey(cacheKey);

    if (cache) {
      return cache.data;
    } else {
      if (indexedFeatureKeys !== null && indexedFeatureKeys !== void 0 && indexedFeatureKeys.length) {
        var features = [];
        indexedFeatureKeys.forEach(function (key) {
          var _spatialDataForDataSo, _spatialDataForDataSo2, _spatialDataForDataSo3;

          var properties = _defineProperty({}, fidColumnName, key); // TODO what if some geometries is missing


          var geometry = ((_spatialDataForDataSo = spatialDataForDataSource[key]) === null || _spatialDataForDataSo === void 0 ? void 0 : _spatialDataForDataSo.geometry) || ((_spatialDataForDataSo2 = spatialDataForDataSource[key]) === null || _spatialDataForDataSo2 === void 0 ? void 0 : (_spatialDataForDataSo3 = _spatialDataForDataSo2.geometries) === null || _spatialDataForDataSo3 === void 0 ? void 0 : _spatialDataForDataSo3[level]);

          if (attributeDataSourceKeyAttributeKeyPairs) {
            var attributes = attributeData.getAttributesByDataSourceKeysForFeatureKey(attributeDataSourceKeyAttributeKeyPairs, key);

            if (attributes) {
              properties = _objectSpread2(_objectSpread2({}, properties), attributes);
            }
          }

          if (geometry) {
            features.push({
              type: 'Feature',
              key: key,
              geometry: geometry,
              properties: properties
            });
          }
        });
        var data = {
          features: features.length ? features : null,
          tile: tileString,
          level: level
        };
        tilesCache.addOrUpdate({
          cacheKey: cacheKey,
          data: data
        });
        return data;
      } else {
        return null;
      }
    }
  } else {
    return null;
  }
}, recomputeSelectorOptions);
/**
 * Assemble vector data for all tiles
 * @param dataSourceKey {string} uuid
 * @param fidColumnName {string} name of property used as feature identifier
 * @param level {number}
 * @param tiles {Array} list of tiles definition points
 * @param spatialRelationsFilter {Object} getSpatialRelationsFilterFromLayerState
 * @param attributeRelationsFilter {Object} getAttributeRelationsFilterFromLayerState
 * @param attributeDataSourceKeyAttributeKeyPairs {Object} key-value pairs, where key is attribute data source key and value is matching attribute key
 * @param styleKey {string} uuid
 * @param attributeDataFilter {Object} Filter object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @return {Array} a collection of populated tiles (with feature's geometries and attributes)
 */

var getTiles = createSelector$1(function (dataSourceKey, fidColumnName, level, tiles, spatialRelationsFilter, attributeRelationsFilter, attributeDataSourceKeyAttributeKeyPairs, styleKey, attributeDataFilter) {
  if (tiles !== null && tiles !== void 0 && tiles.length) {
    var populatedTiles = [];

    _forEach(tiles, function (tile) {
      var populatedTile = getTile(dataSourceKey, fidColumnName, level, tile, spatialRelationsFilter, attributeRelationsFilter, attributeDataSourceKeyAttributeKeyPairs, styleKey, attributeDataFilter);

      if (populatedTile) {
        populatedTiles.push(populatedTile);
      }
    });

    return populatedTiles.length ? populatedTiles : null;
  } else {
    return null;
  }
}, recomputeSelectorOptions);
var Data = {
  getFeatures: getFeatures,
  getTile: getTile,
  getTiles: getTiles,
  attributeData: attributeData,
  attributeDataSources: attributeDataSources,
  attributeRelations: attributeRelations,
  components: components,
  spatialData: spatialData,
  spatialDataSources: spatialDataSources,
  spatialRelations: spatialRelations
};

var getSubstate$d = function getSubstate(state) {
  return state.layerTemplates;
};

var getActive$6 = commonSelectors.getActive(getSubstate$d);
var getActiveKey$6 = commonSelectors.getActiveKey(getSubstate$d);
var getActiveKeys$4 = commonSelectors.getActiveKeys(getSubstate$d);
var getActiveModels$4 = commonSelectors.getActiveModels(getSubstate$d);
var getAll$7 = commonSelectors.getAll(getSubstate$d);
var getAllAsObject$7 = commonSelectors.getAllAsObject(getSubstate$d);
var getByKey$4 = commonSelectors.getByKey(getSubstate$d);
var getByKeys$7 = commonSelectors.getByKeys(getSubstate$d);
var getByKeysAsObject$4 = commonSelectors.getByKeysAsObject(getSubstate$d);
var getDataByKey$4 = commonSelectors.getDataByKey(getSubstate$d);
var getDeletePermissionByKey$4 = commonSelectors.getDeletePermissionByKey(getSubstate$d);
var getEditedActive$4 = commonSelectors.getEditedActive(getSubstate$d);
var getEditedAll$4 = commonSelectors.getEditedAll(getSubstate$d);
var getEditedAllAsObject$4 = commonSelectors.getEditedAllAsObject(getSubstate$d);
var getEditedByKey$4 = commonSelectors.getEditedByKey(getSubstate$d);
var getEditedDataByKey$4 = commonSelectors.getEditedDataByKey(getSubstate$d);
var getEditedKeys$4 = commonSelectors.getEditedKeys(getSubstate$d);
var getIndexed$7 = commonSelectors.getIndexed(getSubstate$d);
var getStateToSave$4 = commonSelectors.getStateToSave(getSubstate$d);
var getUpdatePermissionByKey$4 = commonSelectors.getUpdatePermissionByKey(getSubstate$d);
var getUsedKeysForComponent$4 = commonSelectors.getUsedKeysForComponent(getSubstate$d);
var haveAllKeysRegisteredUse$4 = commonSelectors.haveAllKeysRegisteredUse(getSubstate$d);
var LayerTemplates = {
  getActive: getActive$6,
  getActiveKey: getActiveKey$6,
  getActiveKeys: getActiveKeys$4,
  getActiveModels: getActiveModels$4,
  getAll: getAll$7,
  getAllAsObject: getAllAsObject$7,
  getByKey: getByKey$4,
  getByKeys: getByKeys$7,
  getByKeysAsObject: getByKeysAsObject$4,
  getDataByKey: getDataByKey$4,
  getDeletePermissionByKey: getDeletePermissionByKey$4,
  getEditedActive: getEditedActive$4,
  getEditedAll: getEditedAll$4,
  getEditedAllAsObject: getEditedAllAsObject$4,
  getEditedByKey: getEditedByKey$4,
  getEditedDataByKey: getEditedDataByKey$4,
  getEditedKeys: getEditedKeys$4,
  getIndexed: getIndexed$7,
  getStateToSave: getStateToSave$4,
  getSubstate: getSubstate$d,
  getUpdatePermissionByKey: getUpdatePermissionByKey$4,
  getUsedKeysForComponent: getUsedKeysForComponent$4,
  haveAllKeysRegisteredUse: haveAllKeysRegisteredUse$4
};

var getSubstate$e = function getSubstate(state) {
  return state.layerTrees;
};

var getActive$7 = commonSelectors.getActive(getSubstate$e);
var getActiveKey$7 = commonSelectors.getActiveKey(getSubstate$e);
var getAll$8 = commonSelectors.getAll(getSubstate$e);
var getAllAsObject$8 = commonSelectors.getAllAsObject(getSubstate$e);
var getByKey$5 = commonSelectors.getByKey(getSubstate$e);
var getByKeys$8 = commonSelectors.getByKeys(getSubstate$e);
var getByKeysAsObject$5 = commonSelectors.getByKeysAsObject(getSubstate$e);
var getDataByKey$5 = commonSelectors.getDataByKey(getSubstate$e);
var getEditedActive$5 = commonSelectors.getEditedActive(getSubstate$e);
var getEditedAll$5 = commonSelectors.getEditedAll(getSubstate$e);
var getEditedAllAsObject$5 = commonSelectors.getEditedAllAsObject(getSubstate$e);
var getEditedByKey$5 = commonSelectors.getEditedByKey(getSubstate$e);
var getEditedDataByKey$5 = commonSelectors.getEditedDataByKey(getSubstate$e);
var getEditedKeys$5 = commonSelectors.getEditedKeys(getSubstate$e);
var getIndexed$8 = commonSelectors.getIndexed(getSubstate$e);
var getDeletePermissionByKey$5 = commonSelectors.getDeletePermissionByKey(getSubstate$e);
var getUpdatePermissionByKey$5 = commonSelectors.getUpdatePermissionByKey(getSubstate$e);
var getUsedKeysForComponent$5 = commonSelectors.getUsedKeysForComponent(getSubstate$e);
var haveAllKeysRegisteredUse$5 = commonSelectors.haveAllKeysRegisteredUse(getSubstate$e);
var getStateToSave$5 = commonSelectors.getStateToSave(getSubstate$e);
var LayerTrees = {
  getActive: getActive$7,
  getActiveKey: getActiveKey$7,
  getAll: getAll$8,
  getAllAsObject: getAllAsObject$8,
  getByKey: getByKey$5,
  getByKeys: getByKeys$8,
  getByKeysAsObject: getByKeysAsObject$5,
  getDataByKey: getDataByKey$5,
  getDeletePermissionByKey: getDeletePermissionByKey$5,
  getEditedActive: getEditedActive$5,
  getEditedAll: getEditedAll$5,
  getEditedAllAsObject: getEditedAllAsObject$5,
  getEditedByKey: getEditedByKey$5,
  getEditedDataByKey: getEditedDataByKey$5,
  getEditedKeys: getEditedKeys$5,
  getIndexed: getIndexed$8,
  getSubstate: getSubstate$e,
  getStateToSave: getStateToSave$5,
  getUpdatePermissionByKey: getUpdatePermissionByKey$5,
  getUsedKeysForComponent: getUsedKeysForComponent$5,
  haveAllKeysRegisteredUse: haveAllKeysRegisteredUse$5
};

/* === HELPERS ======================================================================= */

/**
 * Get background layer in 'layer' format
 */

var getBackgroundLayerAsLayer = createCachedSelector([function (backgroundLayer) {
  return backgroundLayer;
}], function (backgroundLayer) {
  if (backgroundLayer) {
    return _objectSpread2(_objectSpread2({}, backgroundLayer), {}, {
      key: 'pantherBackgroundLayer'
    });
  } else {
    return null;
  }
})(function (backgroundLayer) {
  return JSON.stringify(backgroundLayer);
});
/**
 * Merge background layer definition with layers to one collection
 */

var mergeBackgroundLayerWithLayers = createCachedSelector([function (backgroundLayer) {
  return getBackgroundLayerAsLayer(backgroundLayer);
}, function (backgroundLayer, layers) {
  return layers;
}], function (backgroundLayer, layers) {
  var finalLayers = [];

  if (layers) {
    finalLayers = _toConsumableArray(layers);
  }

  if (backgroundLayer) {
    finalLayers = [backgroundLayer].concat(_toConsumableArray(finalLayers));
  }

  return finalLayers.length ? finalLayers : null;
})(function (backgroundLayer, layers) {
  return "".concat(JSON.stringify(backgroundLayer), "_").concat(JSON.stringify(layers));
});
/**
 * Merge given modifiers with layer's modifiers & given filterByActive with layer's filter by active and add it to the layer state
 *
 * @param layers {Object} layers state
 * @param metadataModifiers {Object} modifiers like scopeKey, placeKey
 * @param filterByActive {{scope: bool, place: bool, period: bool,  scenario: bool, case: bool}}
 * @return {Object} Final layer state definition
 */

var mergeModifiersAndFilterByActiveToLayerStructure = function mergeModifiersAndFilterByActiveToLayerStructure(layers, metadataModifiers, filterByActive) {
  return layers.map(function (layer) {
    var layerMetadataModifiers = layer.metadataModifiers && metadataModifiers ? _objectSpread2(_objectSpread2({}, metadataModifiers), layer.metadataModifiers) : metadataModifiers || layer.metadataModifiers || null;
    var layerFilterByActive = layer.filterByActive && filterByActive ? _objectSpread2(_objectSpread2({}, filterByActive), layer.filterByActive) : filterByActive || layer.filterByActive || null;
    return _objectSpread2(_objectSpread2({}, layer), {}, {
      metadataModifiers: layerMetadataModifiers,
      filterByActive: layerFilterByActive
    });
  });
};
/**
 * It returns merged view from map and associated map set based on synced params
 * @param map {Object}
 * @param set {Object}
 * @return {Object|unknown} final map view
 */


var getView = function getView(map$1, set) {
  if (map$1) {
    if (set) {
      var _map$data, _set$data;

      var mapView = (_map$data = map$1.data) === null || _map$data === void 0 ? void 0 : _map$data.view; // omit synced view params from map

      if (set.sync && !_isEmpty2(set.sync)) {
        mapView = _omitBy(mapView, function (viewValue, viewKey) {
          return set.sync[viewKey];
        });
      }

      var mapSetView = (_set$data = set.data) === null || _set$data === void 0 ? void 0 : _set$data.view;
      return map.view.mergeViews(mapConstants.defaultMapView, mapSetView, mapView);
    } else {
      var _map$data2;

      var view = (_map$data2 = map$1.data) === null || _map$data2 === void 0 ? void 0 : _map$data2.view;
      return map.view.mergeViews(mapConstants.defaultMapView, view);
    }
  } else {
    return null;
  }
};
/**
 * Get zoom level of current view represented by mapWidth, mapHeight and boxRange.
 */


var getZoomLevel = createCachedSelector([function (mapWidth) {
  return mapWidth;
}, function (mapWidth, mapHeight) {
  return mapHeight;
}, function (mapWidth, mapHeight, boxRange) {
  return boxRange;
}], function (mapWidth, mapHeight, boxRange) {
  var viewportRange = map.view.getMapViewportRange(mapWidth, mapHeight);
  var levelBoxRange = map.view.getNearestZoomLevelBoxRange(mapWidth, mapHeight, boxRange);
  return grid.getLevelByViewport(levelBoxRange, viewportRange);
})(function (mapWidth, mapHeight, boxRange) {
  return "".concat(mapWidth).concat(mapHeight).concat(boxRange);
});
/**
 * Get tiles intersected by map extent.
 * Map extent is represented by mapWidth, mapHeight, center and boxRange.
 */

var getTiles$1 = createCachedSelector([function (mapWidth) {
  return mapWidth;
}, function (mapWidth, mapHeight) {
  return mapHeight;
}, function (mapWidth, mapHeight, center) {
  return center;
}, function (mapWidth, mapHeight, center, boxRange) {
  return boxRange;
}], function (mapWidth, mapHeight, center, boxRange) {
  if (mapWidth && mapHeight && center && boxRange) {
    var levelBoxRange = map.view.getNearestZoomLevelBoxRange(mapWidth, mapHeight, boxRange);
    var tileGrid = grid.getTileGrid(mapWidth, mapHeight, levelBoxRange, center, true);
    return tileGrid.flat(1);
  } else {
    return null;
  }
})(function (mapWidth, mapHeight, center, boxRange) {
  return "".concat(mapWidth).concat(mapHeight).concat(center === null || center === void 0 ? void 0 : center.lon).concat(center === null || center === void 0 ? void 0 : center.lat).concat(boxRange);
});
var helpers = {
  getBackgroundLayerAsLayer: getBackgroundLayerAsLayer,
  getTiles: getTiles$1,
  getView: getView,
  getZoomLevel: getZoomLevel,
  mergeBackgroundLayerWithLayers: mergeBackgroundLayerWithLayers,
  mergeModifiersAndFilterByActiveToLayerStructure: mergeModifiersAndFilterByActiveToLayerStructure
};

var getSubstate$f = function getSubstate(state) {
  return state.styles;
};

var getActive$8 = commonSelectors.getActive(getSubstate$f);
var getActiveModels$5 = commonSelectors.getActiveModels(getSubstate$f);
var getActiveKey$8 = commonSelectors.getActiveKey(getSubstate$f);
var getActiveKeys$5 = commonSelectors.getActiveKeys(getSubstate$f);
var getAll$9 = commonSelectors.getAll(getSubstate$f);
var getAllAsObject$9 = commonSelectors.getAllAsObject(getSubstate$f);
var getByKey$6 = commonSelectors.getByKey(getSubstate$f);
var getByKeys$9 = commonSelectors.getByKeys(getSubstate$f);
var getByKeysAsObject$6 = commonSelectors.getByKeysAsObject(getSubstate$f);
var getDataByKey$6 = commonSelectors.getDataByKey(getSubstate$f);
var getEditedActive$6 = commonSelectors.getEditedActive(getSubstate$f);
var getEditedAll$6 = commonSelectors.getEditedAll(getSubstate$f);
var getEditedAllAsObject$6 = commonSelectors.getEditedAllAsObject(getSubstate$f);
var getEditedByKey$6 = commonSelectors.getEditedByKey(getSubstate$f);
var getEditedDataByKey$6 = commonSelectors.getEditedDataByKey(getSubstate$f);
var getEditedKeys$6 = commonSelectors.getEditedKeys(getSubstate$f);
var getIndexed$9 = commonSelectors.getIndexed(getSubstate$f);
var getStateToSave$6 = commonSelectors.getStateToSave(getSubstate$f);
var getDeletePermissionByKey$6 = commonSelectors.getDeletePermissionByKey(getSubstate$f);
var getUpdatePermissionByKey$6 = commonSelectors.getUpdatePermissionByKey(getSubstate$f);
var getUsedKeysForComponent$6 = commonSelectors.getUsedKeysForComponent(getSubstate$f);
var haveAllKeysRegisteredUse$6 = commonSelectors.haveAllKeysRegisteredUse(getSubstate$f);
var getByKeyObserver$3 = createObserver(getByKey$6);
var getDefinitionByKey = createSelector$1(function (key) {
  var _style$data;

  var style = getByKeyObserver$3(key);
  return (style === null || style === void 0 ? void 0 : (_style$data = style.data) === null || _style$data === void 0 ? void 0 : _style$data.definition) || null;
});
var Styles = {
  getActive: getActive$8,
  getActiveKey: getActiveKey$8,
  getActiveKeys: getActiveKeys$5,
  getActiveModels: getActiveModels$5,
  getAll: getAll$9,
  getAllAsObject: getAllAsObject$9,
  getByKey: getByKey$6,
  getByKeys: getByKeys$9,
  getByKeysAsObject: getByKeysAsObject$6,
  getDataByKey: getDataByKey$6,
  getDeletePermissionByKey: getDeletePermissionByKey$6,
  getEditedActive: getEditedActive$6,
  getEditedAll: getEditedAll$6,
  getEditedAllAsObject: getEditedAllAsObject$6,
  getEditedByKey: getEditedByKey$6,
  getEditedDataByKey: getEditedDataByKey$6,
  getEditedKeys: getEditedKeys$6,
  getIndexed: getIndexed$9,
  getStateToSave: getStateToSave$6,
  getSubstate: getSubstate$f,
  getUpdatePermissionByKey: getUpdatePermissionByKey$6,
  getUsedKeysForComponent: getUsedKeysForComponent$6,
  haveAllKeysRegisteredUse: haveAllKeysRegisteredUse$6,
  // recompute
  getDefinitionByKey: getDefinitionByKey
};

var getSubstate$g = function getSubstate(state) {
  return state.selections;
};

var getActive$9 = commonSelectors.getActive(getSubstate$g);
var getActiveKey$9 = commonSelectors.getActiveKey(getSubstate$g);
var getAllAsObject$a = commonSelectors.getAllAsObject(getSubstate$g);
var getAll$a = commonSelectors.getAll(getSubstate$g);
var getAllAsObjectWithStyles = createSelector([getAllAsObject$a, Styles.getAllAsObject], function (selections, allStyles) {
  if (selections) {
    if (allStyles) {
      var selectionsWithStyles = {};

      _forIn(selections, function (selection, key) {
        var _selection$data;

        var styleKey = (_selection$data = selection.data) === null || _selection$data === void 0 ? void 0 : _selection$data.styleKey;

        if (styleKey && allStyles[styleKey]) {
          var _allStyles$styleKey$d, _allStyles$styleKey$d2, _allStyles$styleKey$d3, _allStyles$styleKey$d4;

          var selectionStyle = (_allStyles$styleKey$d = allStyles[styleKey].data) === null || _allStyles$styleKey$d === void 0 ? void 0 : (_allStyles$styleKey$d2 = _allStyles$styleKey$d.definition) === null || _allStyles$styleKey$d2 === void 0 ? void 0 : (_allStyles$styleKey$d3 = _allStyles$styleKey$d2.rules) === null || _allStyles$styleKey$d3 === void 0 ? void 0 : (_allStyles$styleKey$d4 = _allStyles$styleKey$d3[0].styles) === null || _allStyles$styleKey$d4 === void 0 ? void 0 : _allStyles$styleKey$d4[0]; // TODO get first style of first rule for now

          if (selectionStyle) {
            selectionsWithStyles[key] = _objectSpread2(_objectSpread2({}, selection), {}, {
              data: _objectSpread2(_objectSpread2({}, selection.data), {}, {
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
var getByKeyObserver$4 = createObserver(function (state, key) {
  return state.selections.byKey[key];
});
var prepareSelectionByLayerStateSelected = createSelector$1(function (layerStateSelected) {
  var populatedSelections = {};

  _forIn(layerStateSelected, function (value, key) {
    var selection = getByKeyObserver$4(key);
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
var Selections = {
  getActiveKey: getActiveKey$9,
  getActive: getActive$9,
  getAll: getAll$a,
  getAllAsObject: getAllAsObject$a,
  getAllAsObjectWithStyles: getAllAsObjectWithStyles,
  prepareSelectionByLayerStateSelected: prepareSelectionByLayerStateSelected
};

/* === SELECTORS ======================================================================= */

var getSubstate$h = function getSubstate(state) {
  return state.maps;
};

var getAllMapSetsInUse = function getAllMapSetsInUse(state) {
  return state.maps.inUse.sets;
};

var getAllMapsInUse = function getAllMapsInUse(state) {
  return state.maps.inUse.maps;
};

var getActiveMapKey = function getActiveMapKey(state) {
  return state.maps.activeMapKey;
};

var getMapsAsObject = function getMapsAsObject(state) {
  return state.maps.maps;
};

var getMapSetsAsObject = function getMapSetsAsObject(state) {
  return state.maps.sets;
};

var isMapSetInUse = createCachedSelector([getAllMapSetsInUse, function (state, mapSetKey) {
  return mapSetKey;
}], function (mapSetsInUse, mapSetKey) {
  if (mapSetsInUse.length && mapSetKey) {
    return !!_includes(mapSetsInUse, mapSetKey);
  } else {
    return false;
  }
})(function (state, mapSetKey) {
  return mapSetKey ? mapSetKey : '';
});
var isMapInUse = createCachedSelector([getAllMapsInUse, function (state, mapKey) {
  return mapKey;
}], function (mapsInUse, mapKey) {
  if (mapsInUse.length && mapKey) {
    return !!_includes(mapsInUse, mapKey);
  } else {
    return false;
  }
})(function (state, mapKey) {
  return mapKey ? mapKey : '';
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getMapByKey = createSelector([getMapsAsObject, function (state, key) {
  return key;
}], function (maps, key) {
  return (maps === null || maps === void 0 ? void 0 : maps[key]) || null;
});
/**
 * @param state {Object}
 */

var getMapSets = createSelector([getMapSetsAsObject], function (sets) {
  if (sets && !_isEmpty2(sets)) {
    return Object.values(sets);
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 */

var getAllMapSetsMaps = createSelector([getMapSets], function (mapSets) {
  if (mapSets) {
    return _flatten2(mapSets.map(function (mapSet) {
      return mapSet.maps;
    }));
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param setKey {string}
 */

var getMapSetByKey = createSelector([getMapSetsAsObject, function (state, key) {
  return key;
}], function (sets, key) {
  return (sets === null || sets === void 0 ? void 0 : sets[key]) || null;
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getMapSetByMapKey = createSelector([getMapSets, function (state, mapKey) {
  return mapKey;
}], function (sets, mapKey) {
  if (sets && !_isEmpty2(sets) && mapKey) {
    return _find2(sets, function (set) {
      return set.maps && _includes(set.maps, mapKey);
    }) || null;
  } else {
    return null;
  }
});
/**
 * Get active map key for set. Either local, or global.
 *
 * @param state {Object}
 * @param setKey {string}
 */

var getMapSetActiveMapKey = createSelector([getActiveMapKey, getMapSetByKey], function (mapKey, set) {
  if (set) {
    var mapKeyInSet = _includes(set.maps, mapKey);

    return set.activeMapKey || mapKeyInSet && mapKey || null;
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param setKey {string}
 */

var getMapSetActiveMapView = createCachedSelector([getMapSetActiveMapKey, getMapSetByKey, getMapsAsObject], function (mapKey, set, maps) {
  var map = maps === null || maps === void 0 ? void 0 : maps[mapKey];

  if (map) {
    return helpers.getView(map, set);
  } else {
    return null;
  }
})(function (state, setKey) {
  return setKey;
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getViewByMapKey = createCachedSelector([getMapByKey, getMapSetByMapKey], helpers.getView)(function (state, mapKey) {
  return mapKey;
});
var getViewByMapKeyObserver = createObserver(getViewByMapKey);
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getViewportByMapKey = createCachedSelector([getMapByKey], function (map) {
  var _map$data;

  return (map === null || map === void 0 ? void 0 : (_map$data = map.data) === null || _map$data === void 0 ? void 0 : _map$data.viewport) || null;
})(function (state, mapKey) {
  return mapKey;
});
var getViewportByMapKeyObserver = createObserver(getViewportByMapKey);
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getViewLimitsByMapKey = createCachedSelector([getMapByKey, getMapSetByMapKey], function (map, set) {
  if (map) {
    if (set) {
      var _map$data2, _set$data;

      var mapViewLimits = (_map$data2 = map.data) === null || _map$data2 === void 0 ? void 0 : _map$data2.viewLimits;
      var mapSetViewLimits = (_set$data = set.data) === null || _set$data === void 0 ? void 0 : _set$data.viewLimits;
      return mapViewLimits || mapSetViewLimits || null;
    } else {
      var _map$data3;

      return ((_map$data3 = map.data) === null || _map$data3 === void 0 ? void 0 : _map$data3.viewLimits) || null;
    }
  } else {
    return null;
  }
})(function (state, mapKey) {
  return mapKey;
});
/**
 * @param state {Object}
 * @param setKey {string}
 */

var getMapSetMapKeys = createSelector([getMapSetByKey], function (set) {
  var _set$maps;

  return set !== null && set !== void 0 && (_set$maps = set.maps) !== null && _set$maps !== void 0 && _set$maps.length ? set.maps : null;
});
/**
 * @param state {Object}
 * @param setKey {string}
 */

var getMapSetMaps = createSelector([getMapsAsObject, getMapSetMapKeys], function (maps, mapKeys) {
  if (!_isEmpty2(maps) && mapKeys !== null && mapKeys !== void 0 && mapKeys.length) {
    return mapKeys.map(function (key) {
      return maps[key];
    });
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param setKey {string}
 */

var getMapSetView = createSelector([getMapSetByKey], function (set) {
  if (set) {
    var _set$data2;

    return map.view.mergeViews(mapConstants.defaultMapView, (_set$data2 = set.data) === null || _set$data2 === void 0 ? void 0 : _set$data2.view);
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param setKey {string}
 */

var getMapSetViewLimits = createSelector([getMapSetByKey], function (set) {
  var _set$data3;

  return (set === null || set === void 0 ? void 0 : (_set$data3 = set.data) === null || _set$data3 === void 0 ? void 0 : _set$data3.viewLimits) || null;
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getMapBackgroundLayerStateByMapKey = createSelector([getMapByKey], function (map) {
  var _map$data4;

  return (map === null || map === void 0 ? void 0 : (_map$data4 = map.data) === null || _map$data4 === void 0 ? void 0 : _map$data4.backgroundLayer) || null;
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getMapLayersStateByMapKey = createSelector([getMapByKey], function (map) {
  var _map$data5;

  return (map === null || map === void 0 ? void 0 : (_map$data5 = map.data) === null || _map$data5 === void 0 ? void 0 : _map$data5.layers) || null;
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getMapSetBackgroundLayerStateByMapKey = createSelector([getMapSetByMapKey], function (set) {
  var _set$data4;

  return (set === null || set === void 0 ? void 0 : (_set$data4 = set.data) === null || _set$data4 === void 0 ? void 0 : _set$data4.backgroundLayer) || null;
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getMapSetLayersStateByMapKey = createSelector([getMapSetByMapKey], function (set) {
  var _set$data5;

  return (set === null || set === void 0 ? void 0 : (_set$data5 = set.data) === null || _set$data5 === void 0 ? void 0 : _set$data5.layers) || null;
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getMapMetadataModifiersByMapKey = createSelector([getMapByKey], function (map) {
  var _map$data6;

  return (map === null || map === void 0 ? void 0 : (_map$data6 = map.data) === null || _map$data6 === void 0 ? void 0 : _map$data6.metadataModifiers) || null;
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getMapSetMetadataModifiersByMapKey = createSelector([getMapSetByMapKey], function (set) {
  var _set$data6;

  return (set === null || set === void 0 ? void 0 : (_set$data6 = set.data) === null || _set$data6 === void 0 ? void 0 : _set$data6.metadataModifiers) || null;
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getMetadataModifiersByMapKey = createCachedSelector([getMapMetadataModifiersByMapKey, getMapSetMetadataModifiersByMapKey], function (mapModifiers, setModifiers) {
  if (mapModifiers && setModifiers) {
    return _objectSpread2(_objectSpread2({}, setModifiers), mapModifiers);
  } else {
    return setModifiers || mapModifiers || null;
  }
})(function (state, mapKey) {
  return mapKey;
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getMapFilterByActiveByMapKey = createSelector([getMapByKey], function (map) {
  var _map$data7;

  return (map === null || map === void 0 ? void 0 : (_map$data7 = map.data) === null || _map$data7 === void 0 ? void 0 : _map$data7.filterByActive) || null;
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getMapSetFilterByActiveByMapKey = createSelector([getMapSetByMapKey], function (set) {
  var _set$data7;

  return (set === null || set === void 0 ? void 0 : (_set$data7 = set.data) === null || _set$data7 === void 0 ? void 0 : _set$data7.filterByActive) || null;
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getFilterByActiveByMapKey = createCachedSelector([getMapFilterByActiveByMapKey, getMapSetFilterByActiveByMapKey], function (mapFilter, setFilter) {
  if (mapFilter && setFilter) {
    return _objectSpread2(_objectSpread2({}, mapFilter), setFilter);
  } else {
    return setFilter || mapFilter || null;
  }
})(function (state, mapKey) {
  return mapKey;
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getBackgroundLayerStateByMapKey = createCachedSelector([getMapBackgroundLayerStateByMapKey, getMapSetBackgroundLayerStateByMapKey], function (mapBackgroundLayer, setBackgroundLayer) {
  return mapBackgroundLayer || setBackgroundLayer || null;
})(function (state, mapKey) {
  return mapKey;
});
var getBackgroundLayerStateByMapKeyObserver = createObserver(getBackgroundLayerStateByMapKey);
/**
 * @param state {Object}
 * @param mapKey {string}
 * @return {Object} Merged mapSetState with metadataModifiers and filterByActive.
 */

var getMapSetLayersStateWithModifiersByMapKey = createCachedSelector([getMapSetLayersStateByMapKey, getMapSetMetadataModifiersByMapKey, getMapSetFilterByActiveByMapKey], function (setLayers, metadataModifiers, mapSetFilterByActive) {
  if (setLayers !== null && setLayers !== void 0 && setLayers.length) {
    return helpers.mergeModifiersAndFilterByActiveToLayerStructure(setLayers, metadataModifiers, mapSetFilterByActive);
  } else {
    return null;
  }
})(function (state, mapKey) {
  return mapKey;
});
/**
 * @param state {Object}
 * @param mapKey {string}
 * @return {Object} Merged mapState with metadataModifiers and filterByActive.
 */

var getMapLayersStateWithModifiersByMapKey = createCachedSelector([getMapLayersStateByMapKey, getMetadataModifiersByMapKey, getFilterByActiveByMapKey], function (mapLayers, metadataModifiers, mapFilterByActive) {
  if (mapLayers !== null && mapLayers !== void 0 && mapLayers.length) {
    return helpers.mergeModifiersAndFilterByActiveToLayerStructure(mapLayers, metadataModifiers, mapFilterByActive);
  } else {
    return null;
  }
})(function (state, mapKey) {
  return mapKey;
});
/**
 * @param state {Object}
 * @param mapKey {string}
 * @return {Object} Merged layer state from mapState and mapSetState with metadataModifiers and filterByActive.
 */

var getLayersStateByMapKey = createCachedSelector([getMapSetLayersStateWithModifiersByMapKey, getMapLayersStateWithModifiersByMapKey], function (setLayers, mapLayers) {
  if (mapLayers && setLayers) {
    return [].concat(_toConsumableArray(setLayers), _toConsumableArray(mapLayers));
  } else if (mapLayers) {
    return mapLayers;
  } else if (setLayers) {
    return setLayers;
  } else {
    return null;
  }
})(function (state, mapKey) {
  return mapKey;
});
var getLayersStateByMapKeyObserver = createObserver(getLayersStateByMapKey);
/**
 * @param state {Object}
 * @param mapKey {string}
 * @param layerKey {string}
 * @return {Object | null}
 */

var getLayerStateByLayerKeyAndMapKey = createSelector([getLayersStateByMapKey, function (state, mapKey, layerKey) {
  return layerKey;
}], function (layers, layerKey) {
  if (layers) {
    var layer = _find2(layers, function (layer) {
      return layer.key === layerKey;
    });

    return layer || null;
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param mapKey {string}
 */

var getAllLayersStateByMapKey = createCachedSelector([getBackgroundLayerStateByMapKey, getLayersStateByMapKey], function (backgroundLayer, layers) {
  if (layers || backgroundLayer) {
    return helpers.mergeBackgroundLayerWithLayers(backgroundLayer, layers);
  } else {
    return null;
  }
})(function (state, mapKey) {
  return mapKey;
});
/**
 * @param layerState {Object}
 */

var getSpatialRelationsFilterFromLayerState = createSelector$1(function (layerState) {
  if (layerState) {
    // TODO at least a part is the same as in Maps/actions/layerUse?
    var layer = layerState; // modifiers defined by key

    var metadataDefinedByKey = layer.metadataModifiers ? _objectSpread2({}, layer.metadataModifiers) : {}; // Get actual metadata keys defined by filterByActive

    var activeMetadataKeys = commonSelectors.getActiveKeysByFilterByActiveObserver(layer.filterByActive); // Merge metadata, metadata defined by key have priority

    var mergedMetadataKeys = commonHelpers.mergeMetadataKeys(metadataDefinedByKey, activeMetadataKeys);
    var relationsFilter = {}; // It converts modifiers from metadataKeys: ["A", "B"] to metadataKey: {in: ["A", "B"]}

    relationsFilter.modifiers = commonHelpers.convertModifiersToRequestFriendlyFormat(mergedMetadataKeys); // add layerTemplate od areaTreeLevelKey

    if (layer.layerTemplateKey) {
      relationsFilter.layerTemplateKey = layer.layerTemplateKey;
    } else if (layer.areaTreeLevelKey) {
      relationsFilter.areaTreeLevelKey = layer.areaTreeLevelKey;
    }

    return relationsFilter;
  } else {
    return null;
  }
}, recomputeSelectorOptions);
/**
 * @param {string} mapKey
 * @param {number} mapWidth
 * @param {number} mapHeight
 */

var getSpatialFilterByMapKey = createCachedSelector([getViewByMapKey, function (state, mapKey, mapWidth) {
  return mapWidth;
}, function (state, mapKey, mapWidth, mapHeight) {
  return mapHeight;
}], function (view, mapWidth, mapHeight) {
  if (view !== null && view !== void 0 && view.center && view !== null && view !== void 0 && view.boxRange && mapWidth && mapHeight) {
    var tiles = helpers.getTiles(mapWidth, mapHeight, view.center, view.boxRange);
    var level = helpers.getZoomLevel(mapWidth, mapHeight, view.boxRange);
    return {
      tiles: tiles,
      level: level
    };
  } else {
    return null;
  }
})(function (state, mapKey, mapWidth, mapHeight) {
  return "".concat(mapKey, "_").concat(mapWidth, "_").concat(mapHeight);
});
/**
 * @param layerState {Object}
 */

var getAttributeDataFilterFromLayerState = createSelector$1(function (layerState) {
  if (layerState) {
    var commonFilter = commonSelectors.getCommmonDataRelationsFilterFromComponentState_recompute(layerState);

    if (!_isEmpty2(commonFilter)) {
      var _layerState$options, _layerState$options2, _layerState$options3;

      var attributeFilter = _objectSpread2({}, commonFilter);

      var attributeDataFilterExtension = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, (layerState === null || layerState === void 0 ? void 0 : (_layerState$options = layerState.options) === null || _layerState$options === void 0 ? void 0 : _layerState$options.attributeFilter) && {
        attributeFilter: layerState.options.attributeFilter
      }), (layerState === null || layerState === void 0 ? void 0 : (_layerState$options2 = layerState.options) === null || _layerState$options2 === void 0 ? void 0 : _layerState$options2.dataSourceKeys) && {
        dataSourceKeys: layerState.options.dataSourceKeys
      }), (layerState === null || layerState === void 0 ? void 0 : (_layerState$options3 = layerState.options) === null || _layerState$options3 === void 0 ? void 0 : _layerState$options3.featureKeys) && {
        featureKeys: layerState.options.featureKeys
      }), (layerState === null || layerState === void 0 ? void 0 : layerState.styleKey) && {
        styleKey: layerState.styleKey
      });

      return _objectSpread2(_objectSpread2({}, attributeFilter), attributeDataFilterExtension);
    } else {
      return null;
    }
  } else {
    return null;
  }
}, recomputeSelectorOptions);
/**
 * @param layerState {Object}
 */

var getAttributeRelationsFilterFromLayerState = createSelector$1(function (layerState) {
  if (layerState) {
    var commonFilter = commonSelectors.getCommmonDataRelationsFilterFromComponentState_recompute(layerState);

    if (!_isEmpty2(commonFilter)) {
      var attributeFilter = _objectSpread2({}, commonFilter);

      if (layerState.styleKey) {
        // add styleKey
        attributeFilter.styleKey = layerState.styleKey;
      }

      return attributeFilter;
    } else {
      return null;
    }
  } else {
    return null;
  }
}, recomputeSelectorOptions);
/**
 * @param spatialDataSource {Object}
 * @param layerState {Object} layer definition from state or passed to the Map component
 * @param layerKey {string} layer unique identifier
 * @param attributeDataSourceKeyAttributeKeyPairs {Object} key-value pairs, where key is attribute data source key and value is matching attribute key
 * @param mapKey {string} map unique identifier
 * @param spatialRelationsFilter {Object} see getSpatialRelationsFilterFromLayerState
 * @param attributeRelationsFilter {Object} see getAttributeRelationsFilterFromLayerState
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 */

var getFinalLayerByDataSourceAndLayerState = createSelector$1(function (spatialDataSource, layerState, layerKey, attributeDataSourceKeyAttributeKeyPairs, mapKey, spatialRelationsFilter, attributeRelationsFilter, attributeDataFilter) {
  var _spatialDataSource$da = spatialDataSource === null || spatialDataSource === void 0 ? void 0 : spatialDataSource.data;
      _spatialDataSource$da.attribution;
      _spatialDataSource$da.nameInternal;
      var type = _spatialDataSource$da.type,
      fidColumnName = _spatialDataSource$da.fidColumnName,
      geometryColumnName = _spatialDataSource$da.geometryColumnName,
      dataSourceOptions = _objectWithoutProperties(_spatialDataSource$da, ["attribution", "nameInternal", "type", "fidColumnName", "geometryColumnName"]);

  var key = layerState.key,
      name = layerState.name,
      opacity = layerState.opacity,
      styleKey = layerState.styleKey,
      layerStateOptions = layerState.options;
  layerKey = layerKey || key;

  var options = _objectSpread2(_objectSpread2({}, dataSourceOptions), layerStateOptions);

  if (type === 'wmts') {
    var _dataSourceOptions$ur;

    options.url = dataSourceOptions.url || ((_dataSourceOptions$ur = dataSourceOptions.urls) === null || _dataSourceOptions$ur === void 0 ? void 0 : _dataSourceOptions$ur[0]);
  } else if (type === 'wms') {
    var url = dataSourceOptions.url,
        params = dataSourceOptions.params,
        configuration = dataSourceOptions.configuration,
        rest = _objectWithoutProperties(dataSourceOptions, ["url", "params", "configuration"]);

    var singleTile = configuration && configuration.hasOwnProperty('singleTile') ? configuration.singleTile : false;
    var styles = rest.styles;
    options = {
      params: _objectSpread2(_objectSpread2(_objectSpread2({}, params), styles && {
        styles: styles
      }), {}, {
        layers: rest.layers
      }),
      singleTile: singleTile,
      url: url
    };
  } else if (type === 'vector' || type === 'tiledVector' || type === 'tiled-vector') {
    var _options, _options2;

    var features,
        tiles = null;

    if (type === 'vector') {
      features = Data.getFeatures(spatialDataSource.key, fidColumnName, attributeDataSourceKeyAttributeKeyPairs);
    } else if (type === 'tiledVector' || type === 'tiled-vector') {
      var view = getViewByMapKeyObserver(mapKey);
      var viewport = getViewportByMapKeyObserver(mapKey);
      var tileList = helpers.getTiles(viewport.width, viewport.height, view.center, view.boxRange);
      var level = helpers.getZoomLevel(viewport.width, viewport.height, view.boxRange);
      tiles = Data.getTiles(spatialDataSource.key, fidColumnName, level, tileList, spatialRelationsFilter, attributeRelationsFilter, attributeDataSourceKeyAttributeKeyPairs, styleKey, attributeDataFilter);
    }

    var selected = null;
    var style = (_options = options) === null || _options === void 0 ? void 0 : _options.style;

    if ((_options2 = options) !== null && _options2 !== void 0 && _options2.selected) {
      selected = Selections.prepareSelectionByLayerStateSelected(options.selected);
    }

    if (!style && styleKey) {
      style = Styles.getDefinitionByKey(styleKey);
    }

    options = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, options), selected && {
      selected: selected
    }), style && {
      style: style
    }), features && {
      features: features
    }), tiles && {
      tiles: tiles
    }), {}, {
      fidColumnName: fidColumnName,
      geometryColumnName: geometryColumnName
    });
  }

  return {
    key: layerKey + '_' + spatialDataSource.key,
    layerKey: layerKey,
    opacity: opacity || opacity === 0 ? opacity : 1,
    name: name,
    type: type,
    options: options
  };
}, recomputeSelectorOptions);
/**
 * @param mapKey {string} map unique identifier
 * @param layerState {Object} layer definition in state (see getBackgroundLayerState) or passed to the Map component
 * @return {Array} It returns a list of end format definitions of the background layer (per data source). See: https://gisat.github.io/ > Architecture > System data types > Layers
 */

var getMapBackgroundLayer = createSelector$1(function (mapKey, layerState) {
  if (!layerState) {
    layerState = getBackgroundLayerStateByMapKeyObserver(mapKey);
  }

  if (layerState) {
    if (layerState.type) {
      return layerState;
    } else {
      var layerKey = 'pantherBackgroundLayer';
      var spatialDataSources = Data.spatialDataSources.getIndexed_recompute(layerState);

      if (spatialDataSources) {
        var layers = _compact2(spatialDataSources.map(function (dataSource) {
          var _dataSource$data;

          var dataSourceType = dataSource === null || dataSource === void 0 ? void 0 : (_dataSource$data = dataSource.data) === null || _dataSource$data === void 0 ? void 0 : _dataSource$data.type; // TODO currently only wms or wmts is supported; add filterByActive & metadata modifiers to support vectors

          if (dataSourceType === 'wmts' || dataSourceType === 'wms') {
            return getFinalLayerByDataSourceAndLayerState(dataSource, layerState, layerKey);
          } else {
            return null;
          }
        }));

        return layers.length ? layers : null;
      } else {
        return null;
      }
    }
  } else {
    return null;
  }
}, recomputeSelectorOptions);
/**
 * @param mapKey {string} map unique identifier
 * @param layerState {Object} layer definition in state (see getBackgroundLayerState) or passed to the Map component
 * @return {Array} It returns a list of end format definitions of the background layer (per data source). See: https://gisat.github.io/ > Architecture > System data types > Layers
 */

var getMapLayers = createSelector$1(function (mapKey, layersState) {
  if (!layersState) {
    layersState = getLayersStateByMapKeyObserver(mapKey);
  }

  if (layersState) {
    var finalLayers = [];

    _forEach(layersState, function (layerState) {
      // layer is already defined by the end format suitable for presentational map component
      if (layerState.type) {
        var _layerState$options4;

        if (layerState.type === 'vector' && (_layerState$options4 = layerState.options) !== null && _layerState$options4 !== void 0 && _layerState$options4.selected) {
          layerState = _objectSpread2(_objectSpread2({}, layerState), {}, {
            options: _objectSpread2(_objectSpread2({}, layerState.options), {}, {
              selected: Selections.prepareSelectionByLayerStateSelected(layerState.options.selected)
            })
          });
        }

        finalLayers.push(layerState);
      } // necessary to assemble data for the end format
      else {
          var spatialRelationsFilter = getSpatialRelationsFilterFromLayerState(layerState);
          var attributeRelationsFilter = getAttributeRelationsFilterFromLayerState(layerState);
          var attributeDataFilter = getAttributeDataFilterFromLayerState(layerState);
          var spatialDataSources = Data.spatialDataSources.getIndexed_recompute(spatialRelationsFilter);
          var attributeDataSourceKeyAttributeKeyPairs = Data.attributeRelations.getFilteredAttributeDataSourceKeyAttributeKeyPairs(attributeRelationsFilter);

          if (spatialDataSources) {
            _forEach(spatialDataSources, function (dataSource) {
              finalLayers.push(getFinalLayerByDataSourceAndLayerState(dataSource, layerState, null, attributeDataSourceKeyAttributeKeyPairs, mapKey, spatialRelationsFilter, attributeRelationsFilter, attributeDataFilter));
            });
          }
        }
    });

    return finalLayers.length ? finalLayers : null;
  } else {
    return null;
  }
}, recomputeSelectorOptions);
var Maps = {
  isMapInUse: isMapInUse,
  isMapSetInUse: isMapSetInUse,
  getSubstate: getSubstate$h,
  getAllLayersStateByMapKey: getAllLayersStateByMapKey,
  getAllMapSetsMaps: getAllMapSetsMaps,
  getAllMapsInUse: getAllMapsInUse,
  getAllMapSetsInUse: getAllMapSetsInUse,
  getAttributeDataFilterFromLayerState: getAttributeDataFilterFromLayerState,
  getAttributeRelationsFilterFromLayerState: getAttributeRelationsFilterFromLayerState,
  getBackgroundLayerStateByMapKey: getBackgroundLayerStateByMapKey,
  getFilterByActiveByMapKey: getFilterByActiveByMapKey,
  getFinalLayerByDataSourceAndLayerState: getFinalLayerByDataSourceAndLayerState,
  getLayerStateByLayerKeyAndMapKey: getLayerStateByLayerKeyAndMapKey,
  getLayersStateByMapKey: getLayersStateByMapKey,
  getMetadataModifiersByMapKey: getMetadataModifiersByMapKey,
  getMapBackgroundLayerStateByMapKey: getMapBackgroundLayerStateByMapKey,
  getMapBackgroundLayer: getMapBackgroundLayer,
  getMapByKey: getMapByKey,
  getMapFilterByActiveByMapKey: getMapFilterByActiveByMapKey,
  getMapLayersStateByMapKey: getMapLayersStateByMapKey,
  getMapLayers: getMapLayers,
  getMapLayersStateWithModifiersByMapKey: getMapLayersStateWithModifiersByMapKey,
  getMapMetadataModifiersByMapKey: getMapMetadataModifiersByMapKey,
  getMapSetActiveMapKey: getMapSetActiveMapKey,
  getMapSetActiveMapView: getMapSetActiveMapView,
  getMapSetBackgroundLayerStateByMapKey: getMapSetBackgroundLayerStateByMapKey,
  getMapSetByMapKey: getMapSetByMapKey,
  getMapSetByKey: getMapSetByKey,
  getMapSetFilterByActiveByMapKey: getMapSetFilterByActiveByMapKey,
  getMapSetLayersStateByMapKey: getMapSetLayersStateByMapKey,
  getMapSetLayersStateWithModifiersByMapKey: getMapSetLayersStateWithModifiersByMapKey,
  getMapSetMetadataModifiersByMapKey: getMapSetMetadataModifiersByMapKey,
  getMapSetMapKeys: getMapSetMapKeys,
  getMapSetMaps: getMapSetMaps,
  getMapSets: getMapSets,
  getMapSetView: getMapSetView,
  getMapSetViewLimits: getMapSetViewLimits,
  getSpatialFilterByMapKey: getSpatialFilterByMapKey,
  getSpatialRelationsFilterFromLayerState: getSpatialRelationsFilterFromLayerState,
  getViewByMapKey: getViewByMapKey,
  getViewportByMapKey: getViewportByMapKey,
  getViewLimitsByMapKey: getViewLimitsByMapKey
};

var getSubstate$i = function getSubstate(state) {
  return state.periods;
};

var getAll$b = commonSelectors.getAll(getSubstate$i);
var getAllAsObject$b = commonSelectors.getAllAsObject(getSubstate$i);
var getActive$a = commonSelectors.getActive(getSubstate$i);
var getActiveKey$a = commonSelectors.getActiveKey(getSubstate$i);
var getActiveKeys$6 = commonSelectors.getActiveKeys(getSubstate$i);
var getActiveModels$6 = commonSelectors.getActiveModels(getSubstate$i);
var getByKey$7 = commonSelectors.getByKey(getSubstate$i);
var getByKeys$a = commonSelectors.getByKeys(getSubstate$i);
var getByKeysAsObject$7 = commonSelectors.getByKeysAsObject(getSubstate$i);
var getDataByKey$7 = commonSelectors.getDataByKey(getSubstate$i);
var getDeletePermissionByKey$7 = commonSelectors.getDeletePermissionByKey(getSubstate$i);
var getEditedActive$7 = commonSelectors.getEditedActive(getSubstate$i);
var getEditedAll$7 = commonSelectors.getEditedAll(getSubstate$i);
var getEditedAllAsObject$7 = commonSelectors.getEditedAllAsObject(getSubstate$i);
var getEditedByKey$7 = commonSelectors.getEditedByKey(getSubstate$i);
var getEditedDataByKey$7 = commonSelectors.getEditedDataByKey(getSubstate$i);
var getEditedKeys$7 = commonSelectors.getEditedKeys(getSubstate$i);
var getIndexed$a = commonSelectors.getIndexed(getSubstate$i);
var getStateToSave$7 = commonSelectors.getStateToSave(getSubstate$i);
var getUpdatePermissionByKey$7 = commonSelectors.getUpdatePermissionByKey(getSubstate$i);
var getUsedKeysForComponent$7 = commonSelectors.getUsedKeysForComponent(getSubstate$i);
var haveAllKeysRegisteredUse$7 = commonSelectors.haveAllKeysRegisteredUse(getSubstate$i);
/**
 * Both start and end time must be defined, otherwise all available periods are returned.
 */

/**
 * Get periods which are between defined bounds
 * @param state {Object}
 * @param start {string} moment-like time string
 * @param end {string} moment-like time string
 * @param {Array} Collection of models
 */

var getByFullPeriodAsObject = createCachedSelector([getAllAsObject$b, function (state, start) {
  return start;
}, function (state, start, end) {
  return end;
}], function (periods, start, end) {
  if (periods && start && end) {
    var selectedPeriods = _pickBy2(periods, function (period) {
      var _period$data, _period$data2;

      var periodStart = (_period$data = period.data) === null || _period$data === void 0 ? void 0 : _period$data.start;
      var periodEnd = (_period$data2 = period.data) === null || _period$data2 === void 0 ? void 0 : _period$data2.end;

      if (periodStart && periodEnd) {
        return moment(periodStart).isBetween(start, end, null, '[]') && moment(periodEnd).isBetween(start, end, null, '[]');
      } else if (periodStart) {
        return moment(periodStart).isBetween(start, end, null, '[]');
      } else if (periodEnd) {
        return moment(periodEnd).isBetween(start, end, null, '[]');
      } else {
        return false;
      }
    });

    return _isEmpty2(selectedPeriods) ? null : selectedPeriods;
  } else {
    return null;
  }
})(function (state, start, end) {
  return "".concat(start, "_").concat(end);
});
var Periods = {
  getActive: getActive$a,
  getActiveKey: getActiveKey$a,
  getActiveKeys: getActiveKeys$6,
  getActiveModels: getActiveModels$6,
  getAll: getAll$b,
  getAllAsObject: getAllAsObject$b,
  getByKey: getByKey$7,
  getByKeys: getByKeys$a,
  getByKeysAsObject: getByKeysAsObject$7,
  getByFullPeriodAsObject: getByFullPeriodAsObject,
  getDataByKey: getDataByKey$7,
  getDeletePermissionByKey: getDeletePermissionByKey$7,
  getEditedActive: getEditedActive$7,
  getEditedAll: getEditedAll$7,
  getEditedAllAsObject: getEditedAllAsObject$7,
  getEditedByKey: getEditedByKey$7,
  getEditedDataByKey: getEditedDataByKey$7,
  getEditedKeys: getEditedKeys$7,
  getIndexed: getIndexed$a,
  getStateToSave: getStateToSave$7,
  getSubstate: getSubstate$i,
  getUpdatePermissionByKey: getUpdatePermissionByKey$7,
  getUsedKeysForComponent: getUsedKeysForComponent$7,
  haveAllKeysRegisteredUse: haveAllKeysRegisteredUse$7
};

var getSubstate$j = function getSubstate(state) {
  return state.places;
};

var getAll$c = commonSelectors.getAll(getSubstate$j);
var getAllAsObject$c = commonSelectors.getAllAsObject(getSubstate$j);
var getActiveKey$b = commonSelectors.getActiveKey(getSubstate$j);
var getActiveKeys$7 = commonSelectors.getActiveKeys(getSubstate$j);
var getActive$b = commonSelectors.getActive(getSubstate$j);
var getActiveModels$7 = commonSelectors.getActiveModels(getSubstate$j);
var getByKey$8 = commonSelectors.getByKey(getSubstate$j);
var getByKeys$b = commonSelectors.getByKeys(getSubstate$j);
var getByKeysAsObject$8 = commonSelectors.getByKeysAsObject(getSubstate$j);
var getDataByKey$8 = commonSelectors.getDataByKey(getSubstate$j);
var getDeletePermissionByKey$8 = commonSelectors.getDeletePermissionByKey(getSubstate$j);
var getEditedActive$8 = commonSelectors.getEditedActive(getSubstate$j);
var getEditedAll$8 = commonSelectors.getEditedAll(getSubstate$j);
var getEditedAllAsObject$8 = commonSelectors.getEditedAllAsObject(getSubstate$j);
var getEditedByKey$8 = commonSelectors.getEditedByKey(getSubstate$j);
var getEditedDataByKey$8 = commonSelectors.getEditedDataByKey(getSubstate$j);
var getEditedKeys$8 = commonSelectors.getEditedKeys(getSubstate$j);
var getIndexed$b = commonSelectors.getIndexed(getSubstate$j);
var getStateToSave$8 = commonSelectors.getStateToSave(getSubstate$j);
var getUpdatePermissionByKey$8 = commonSelectors.getUpdatePermissionByKey(getSubstate$j);
var getUsedKeysForComponent$8 = commonSelectors.getUsedKeysForComponent(getSubstate$j);
var haveAllKeysRegisteredUse$8 = commonSelectors.haveAllKeysRegisteredUse(getSubstate$j);
var Places = {
  getAll: getAll$c,
  getAllAsObject: getAllAsObject$c,
  getActiveKey: getActiveKey$b,
  getActiveKeys: getActiveKeys$7,
  getActive: getActive$b,
  getActiveModels: getActiveModels$7,
  getByKey: getByKey$8,
  getByKeys: getByKeys$b,
  getByKeysAsObject: getByKeysAsObject$8,
  getDataByKey: getDataByKey$8,
  getDeletePermissionByKey: getDeletePermissionByKey$8,
  getEditedActive: getEditedActive$8,
  getEditedAll: getEditedAll$8,
  getEditedAllAsObject: getEditedAllAsObject$8,
  getEditedByKey: getEditedByKey$8,
  getEditedDataByKey: getEditedDataByKey$8,
  getEditedKeys: getEditedKeys$8,
  getIndexed: getIndexed$b,
  getStateToSave: getStateToSave$8,
  getSubstate: getSubstate$j,
  getUpdatePermissionByKey: getUpdatePermissionByKey$8,
  getUsedKeysForComponent: getUsedKeysForComponent$8,
  haveAllKeysRegisteredUse: haveAllKeysRegisteredUse$8
};

var getSubstate$k = function getSubstate(state) {
  return state.scenarios;
};

var getAll$d = commonSelectors.getAll(getSubstate$k);
var getAllAsObject$d = commonSelectors.getAllAsObject(getSubstate$k);
var getActiveKey$c = commonSelectors.getActiveKey(getSubstate$k);
var getActiveKeys$8 = commonSelectors.getActiveKeys(getSubstate$k);
var getActive$c = commonSelectors.getActive(getSubstate$k);
var getActiveModels$8 = commonSelectors.getActiveModels(getSubstate$k);
var getByKey$9 = commonSelectors.getByKey(getSubstate$k);
var getByKeys$c = commonSelectors.getByKeys(getSubstate$k);
var getByKeysAsObject$9 = commonSelectors.getByKeysAsObject(getSubstate$k);
var getDataByKey$9 = commonSelectors.getDataByKey(getSubstate$k);
var getDeletePermissionByKey$9 = commonSelectors.getDeletePermissionByKey(getSubstate$k);
var getEditedActive$9 = commonSelectors.getEditedActive(getSubstate$k);
var getEditedAll$9 = commonSelectors.getEditedAll(getSubstate$k);
var getEditedAllAsObject$9 = commonSelectors.getEditedAllAsObject(getSubstate$k);
var getEditedByKey$9 = commonSelectors.getEditedByKey(getSubstate$k);
var getEditedDataByKey$9 = commonSelectors.getEditedDataByKey(getSubstate$k);
var getEditedKeys$9 = commonSelectors.getEditedKeys(getSubstate$k);
var getIndexed$c = commonSelectors.getIndexed(getSubstate$k);
var getStateToSave$9 = commonSelectors.getStateToSave(getSubstate$k);
var getUpdatePermissionByKey$9 = commonSelectors.getUpdatePermissionByKey(getSubstate$k);
var getUsedKeysForComponent$9 = commonSelectors.getUsedKeysForComponent(getSubstate$k);
var haveAllKeysRegisteredUse$9 = commonSelectors.haveAllKeysRegisteredUse(getSubstate$k);
var Scenarios = {
  getActive: getActive$c,
  getActiveModels: getActiveModels$8,
  getActiveKey: getActiveKey$c,
  getActiveKeys: getActiveKeys$8,
  getAll: getAll$d,
  getAllAsObject: getAllAsObject$d,
  getByKey: getByKey$9,
  getByKeys: getByKeys$c,
  getByKeysAsObject: getByKeysAsObject$9,
  getDataByKey: getDataByKey$9,
  getDeletePermissionByKey: getDeletePermissionByKey$9,
  getEditedActive: getEditedActive$9,
  getEditedAll: getEditedAll$9,
  getEditedAllAsObject: getEditedAllAsObject$9,
  getEditedByKey: getEditedByKey$9,
  getEditedDataByKey: getEditedDataByKey$9,
  getEditedKeys: getEditedKeys$9,
  getIndexed: getIndexed$c,
  getStateToSave: getStateToSave$9,
  getSubstate: getSubstate$k,
  getUpdatePermissionByKey: getUpdatePermissionByKey$9,
  getUsedKeysForComponent: getUsedKeysForComponent$9,
  haveAllKeysRegisteredUse: haveAllKeysRegisteredUse$9
};

var getSubstate$l = function getSubstate(state) {
  return state.scopes;
};

var getAll$e = commonSelectors.getAll(getSubstate$l);
var getAllAsObject$e = commonSelectors.getAllAsObject(getSubstate$l);
var getActive$d = commonSelectors.getActive(getSubstate$l);
var getActiveKey$d = commonSelectors.getActiveKey(getSubstate$l);
var getByKey$a = commonSelectors.getByKey(getSubstate$l);
var getByKeys$d = commonSelectors.getByKeys(getSubstate$l);
var getByKeysAsObject$a = commonSelectors.getByKeysAsObject(getSubstate$l);
var getDataByKey$a = commonSelectors.getDataByKey(getSubstate$l);
var getEditedActive$a = commonSelectors.getEditedActive(getSubstate$l);
var getEditedAll$a = commonSelectors.getEditedAll(getSubstate$l);
var getEditedAllAsObject$a = commonSelectors.getEditedAllAsObject(getSubstate$l);
var getEditedByKey$a = commonSelectors.getEditedByKey(getSubstate$l);
var getEditedDataByKey$a = commonSelectors.getEditedDataByKey(getSubstate$l);
var getEditedKeys$a = commonSelectors.getEditedKeys(getSubstate$l);
var getDeletePermissionByKey$a = commonSelectors.getDeletePermissionByKey(getSubstate$l);
var getUpdatePermissionByKey$a = commonSelectors.getUpdatePermissionByKey(getSubstate$l);
var getUsedKeysForComponent$a = commonSelectors.getUsedKeysForComponent(getSubstate$l);
var getIndexed$d = commonSelectors.getIndexed(getSubstate$l);
var getStateToSave$a = commonSelectors.getStateToSave(getSubstate$l);
var haveAllKeysRegisteredUse$a = commonSelectors.haveAllKeysRegisteredUse(getSubstate$l);
var getActiveScopeConfiguration = createSelector([getActive$d], function (scope) {
  var _scope$data;

  return (scope === null || scope === void 0 ? void 0 : (_scope$data = scope.data) === null || _scope$data === void 0 ? void 0 : _scope$data.configuration) || null;
});
var Scopes = {
  getActive: getActive$d,
  getActiveKey: getActiveKey$d,
  getActiveScopeConfiguration: getActiveScopeConfiguration,
  getAll: getAll$e,
  getAllAsObject: getAllAsObject$e,
  getByKey: getByKey$a,
  getByKeys: getByKeys$d,
  getByKeysAsObject: getByKeysAsObject$a,
  getDataByKey: getDataByKey$a,
  getDeletePermissionByKey: getDeletePermissionByKey$a,
  getEditedActive: getEditedActive$a,
  getEditedAll: getEditedAll$a,
  getEditedAllAsObject: getEditedAllAsObject$a,
  getEditedByKey: getEditedByKey$a,
  getEditedDataByKey: getEditedDataByKey$a,
  getEditedKeys: getEditedKeys$a,
  getIndexed: getIndexed$d,
  getStateToSave: getStateToSave$a,
  getSubstate: getSubstate$l,
  getUpdatePermissionByKey: getUpdatePermissionByKey$a,
  getUsedKeysForComponent: getUsedKeysForComponent$a,
  haveAllKeysRegisteredUse: haveAllKeysRegisteredUse$a
};

var getAllScreensAsObject = function getAllScreensAsObject(state) {
  return state.screens.screens;
};

var getAllSetsAsObject = function getAllSetsAsObject(state) {
  return state.screens.sets;
};
/**
 * @param state {Object}
 * @param key {string} set key
 */


var getSetByKey = createSelector([getAllSetsAsObject, function (state, key) {
  return key;
}],
/**
 * @param sets {Object} all sets as object
 * @param key {string} set key
 * @return {Object | null} selected object
 */
function (sets, key) {
  if (sets && !_isEmpty2(sets) && key && sets[key]) {
    return sets[key];
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param key {string} set key
 */

var getScreensBySetKey = createSelector([getSetByKey, getAllScreensAsObject],
/**
 * @param set {Object} set
 * @param screens {Object} all screens as object
 * @return {null | Object} selected screen
 */
function (set, screens) {
  if (set) {
    var setScreens = {};

    _each(set.orderBySpace, function (lineage) {
      setScreens[lineage] = screens[lineage];
    });

    return setScreens;
  } else {
    return null;
  }
});
/**
 * @param state {Object}
 * @param screenLineage {string}
 */

var getSetKeyByScreenLineage = createSelector([getAllSetsAsObject, function (state, screenLineage) {
  return screenLineage;
}],
/**
 * @param sets {Object} all sets as object
 * @param lineage {string}
 * @return {string | null} screen set key
 */
function (sets, lineage) {
  var setKey = null;

  _forIn(sets, function (value, key) {
    if (_includes(value.orderByHistory, lineage)) {
      setKey = key;
    }
  });

  return setKey;
});
/**
 * @param state {Object}
 * @param screenLineage {string}
 */

var getScreenByLineage = createSelector([getAllScreensAsObject, function (state, lineage) {
  return lineage;
}],
/**
 * @param screens {object} all screens as object
 * @param lineage {string}
 * @return {Object | null} screen
 */
function (screens, lineage) {
  if (screens && !_isEmpty2(screens) && lineage && screens[lineage]) {
    return screens[lineage];
  } else {
    return null;
  }
});
var Screens = {
  getScreenByLineage: getScreenByLineage,
  getScreensBySetKey: getScreensBySetKey,
  getSetByKey: getSetByKey,
  getSetKeyByScreenLineage: getSetKeyByScreenLineage
};

var getSubstate$m = function getSubstate(state) {
  return state.tags;
};

var getActive$e = commonSelectors.getActive(getSubstate$m);
var getActiveModels$9 = commonSelectors.getActiveModels(getSubstate$m);
var getActiveKey$e = commonSelectors.getActiveKey(getSubstate$m);
var getActiveKeys$9 = commonSelectors.getActiveKeys(getSubstate$m);
var getAll$f = commonSelectors.getAll(getSubstate$m);
var getAllAsObject$f = commonSelectors.getAllAsObject(getSubstate$m);
var getByKey$b = commonSelectors.getByKey(getSubstate$m);
var getByKeys$e = commonSelectors.getByKeys(getSubstate$m);
var getByKeysAsObject$b = commonSelectors.getByKeysAsObject(getSubstate$m);
var getDataByKey$b = commonSelectors.getDataByKey(getSubstate$m);
var getEditedActive$b = commonSelectors.getEditedActive(getSubstate$m);
var getEditedAll$b = commonSelectors.getEditedAll(getSubstate$m);
var getEditedAllAsObject$b = commonSelectors.getEditedAllAsObject(getSubstate$m);
var getEditedByKey$b = commonSelectors.getEditedByKey(getSubstate$m);
var getEditedDataByKey$b = commonSelectors.getEditedDataByKey(getSubstate$m);
var getEditedKeys$b = commonSelectors.getEditedKeys(getSubstate$m);
var getIndexed$e = commonSelectors.getIndexed(getSubstate$m);
var getStateToSave$b = commonSelectors.getStateToSave(getSubstate$m);
var getDeletePermissionByKey$b = commonSelectors.getDeletePermissionByKey(getSubstate$m);
var getUpdatePermissionByKey$b = commonSelectors.getUpdatePermissionByKey(getSubstate$m);
var getUsedKeysForComponent$b = commonSelectors.getUsedKeysForComponent(getSubstate$m);
var haveAllKeysRegisteredUse$b = commonSelectors.haveAllKeysRegisteredUse(getSubstate$m);
var Tags = {
  getActive: getActive$e,
  getActiveKey: getActiveKey$e,
  getActiveKeys: getActiveKeys$9,
  getActiveModels: getActiveModels$9,
  getAll: getAll$f,
  getAllAsObject: getAllAsObject$f,
  getByKey: getByKey$b,
  getByKeys: getByKeys$e,
  getByKeysAsObject: getByKeysAsObject$b,
  getDataByKey: getDataByKey$b,
  getDeletePermissionByKey: getDeletePermissionByKey$b,
  getEditedActive: getEditedActive$b,
  getEditedAll: getEditedAll$b,
  getEditedAllAsObject: getEditedAllAsObject$b,
  getEditedByKey: getEditedByKey$b,
  getEditedDataByKey: getEditedDataByKey$b,
  getEditedKeys: getEditedKeys$b,
  getIndexed: getIndexed$e,
  getStateToSave: getStateToSave$b,
  getSubstate: getSubstate$m,
  getUpdatePermissionByKey: getUpdatePermissionByKey$b,
  getUsedKeysForComponent: getUsedKeysForComponent$b,
  haveAllKeysRegisteredUse: haveAllKeysRegisteredUse$b
};

var DEFAULT_CATEGORY = 'metadata';

var getSubstate$n = function getSubstate(state) {
  return state.users;
};

var getGroupsSubstate = function getGroupsSubstate(state) {
  return state.users.groups;
};

var getAll$g = commonSelectors.getAll(getSubstate$n);
var getGroups = commonSelectors.getAll(getGroupsSubstate);
var getActiveKey$f = commonSelectors.getActiveKey(getSubstate$n);
var getActive$f = commonSelectors.getActive(getSubstate$n);
var getByKey$c = commonSelectors.getByKey(getSubstate$n);

var isLoggedIn = function isLoggedIn(state) {
  return !!state.users.activeKey;
};

var isAdmin = function isAdmin(state) {
  return state.users.isAdmin;
};

var getById = createSelector([getAll$g, function (state, userId) {
  return userId;
}], function (users, userId) {
  if (userId) {
    return users.find(function (user) {
      return user.id === userId;
    });
  }

  return false;
});
var isAdminGroupMember = createSelector([getActive$f], function (user) {
  if (user) {
    return _includes(user.groups, 1);
  }

  return false;
});
var getActiveUserPermissions = createSelector([getActive$f], function (user) {
  if (user && user.permissions) {
    return user.permissions;
  } else {
    return null;
  }
});
var isAdminOrAdminGroupMember = createSelector([isAdmin, isAdminGroupMember], function (isAdmin, isAdminGroupMember) {
  return isAdmin || isAdminGroupMember;
});
var getGroupKeysForActiveUser = createSelector([getActive$f], function (activeUser) {
  if (activeUser && activeUser.groups) {
    return activeUser.groups;
  } else {
    return [];
  }
});
var hasActiveUserPermissionToCreate = createSelector([getActiveUserPermissions, function (state, type) {
  return type;
}, function (state, type, category) {
  return category;
}], function (permissions, type) {
  var category = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_CATEGORY;
  return type && permissions && permissions[category] && permissions[category][type] && permissions[category][type].create;
});

var isDromasAdmin = function isDromasAdmin(state) {
  var isDromasAdmin = false;

  if (state.users && state.users.data && state.users.data.length) {
    var currentUser = state.users.data.filter(function (user) {
      return user.key === state.users.activeKey;
    });

    if (currentUser.length > 0) {
      currentUser[0].groups.forEach(function (group) {
        if (group.name === 'Aktualizace LPIS Gisat admin') {
          isDromasAdmin = true;
        }
      });
    }
  }

  return isDromasAdmin || state.users.isAdmin;
};

var getActiveUserDromasLpisChangeReviewGroup = createSelector([getGroupKeysForActiveUser, Scopes.getActiveScopeConfiguration], function (activeUserGroupKeys, activeScopeConfiguration) {
  if (_includes(activeUserGroupKeys, activeScopeConfiguration.dromasLpisChangeReview.groups.gisatAdmins)) {
    return 'gisatAdmins';
  } else if (_includes(activeUserGroupKeys, activeScopeConfiguration.dromasLpisChangeReview.groups.szifAdmins)) {
    return 'szifAdmins';
  } else if (_includes(activeUserGroupKeys, activeScopeConfiguration.dromasLpisChangeReview.groups.gisatUsers)) {
    return 'gisatUsers';
  } else if (_includes(activeUserGroupKeys, activeScopeConfiguration.dromasLpisChangeReview.groups.szifUsers)) {
    return 'szifUsers';
  } else {
    return null;
  }
});
var Users = {
  getAll: getAll$g,
  getActive: getActive$f,
  getByKey: getByKey$c,
  getById: getById,
  getActiveKey: getActiveKey$f,
  getActiveUser: getActive$f,
  getGroupKeysForActiveUser: getGroupKeysForActiveUser,
  getGroupsForActiveUser: getGroupKeysForActiveUser,
  getUsers: getAll$g,
  getGroups: getGroups,
  getSubstate: getSubstate$n,
  getGroupsSubstate: getGroupsSubstate,
  hasActiveUserPermissionToCreate: hasActiveUserPermissionToCreate,
  isAdmin: isAdmin,
  isAdminGroupMember: isAdminGroupMember,
  isAdminOrAdminGroupMember: isAdminOrAdminGroupMember,
  isLoggedIn: isLoggedIn,
  isDromasAdmin: isDromasAdmin,
  getActiveUserDromasLpisChangeReviewGroup: getActiveUserDromasLpisChangeReviewGroup
};

var getSubstate$o = function getSubstate(state) {
  return state.views;
};

var getActive$g = commonSelectors.getActive(getSubstate$o);
var getActiveKey$g = commonSelectors.getActiveKey(getSubstate$o);
var getAll$h = commonSelectors.getAll(getSubstate$o);
var getAllAsObject$g = commonSelectors.getAllAsObject(getSubstate$o);
var getByKey$d = commonSelectors.getByKey(getSubstate$o);
var getByKeys$f = commonSelectors.getByKeys(getSubstate$o);
var getByKeysAsObject$c = commonSelectors.getByKeysAsObject(getSubstate$o);
var getDataByKey$c = commonSelectors.getDataByKey(getSubstate$o);
var getEditedActive$c = commonSelectors.getEditedActive(getSubstate$o);
var getEditedAll$c = commonSelectors.getEditedAll(getSubstate$o);
var getEditedAllAsObject$c = commonSelectors.getEditedAllAsObject(getSubstate$o);
var getEditedByKey$c = commonSelectors.getEditedByKey(getSubstate$o);
var getEditedDataByKey$c = commonSelectors.getEditedDataByKey(getSubstate$o);
var getEditedKeys$c = commonSelectors.getEditedKeys(getSubstate$o);
var getIndexed$f = commonSelectors.getIndexed(getSubstate$o);
var getDeletePermissionByKey$c = commonSelectors.getDeletePermissionByKey(getSubstate$o);
var getUpdatePermissionByKey$c = commonSelectors.getUpdatePermissionByKey(getSubstate$o);
var getUsedKeysForComponent$c = commonSelectors.getUsedKeysForComponent(getSubstate$o);
var haveAllKeysRegisteredUse$c = commonSelectors.haveAllKeysRegisteredUse(getSubstate$o); // TODO add other stores

var getStateToSave$c = createSelector([Attributes.getStateToSave, AttributeSets.getStateToSave, Components.getStateToSave, Scopes.getStateToSave], function (attributes, attributeSets, components, scopes) {
  return {
    attributes: attributes,
    attributeSets: attributeSets,
    components: components,
    scopes: scopes
  };
});
var Views = {
  getActive: getActive$g,
  getActiveKey: getActiveKey$g,
  getAll: getAll$h,
  getAllAsObject: getAllAsObject$g,
  getByKey: getByKey$d,
  getByKeys: getByKeys$f,
  getByKeysAsObject: getByKeysAsObject$c,
  getDataByKey: getDataByKey$c,
  getDeletePermissionByKey: getDeletePermissionByKey$c,
  getEditedActive: getEditedActive$c,
  getEditedAll: getEditedAll$c,
  getEditedAllAsObject: getEditedAllAsObject$c,
  getEditedByKey: getEditedByKey$c,
  getEditedDataByKey: getEditedDataByKey$c,
  getEditedKeys: getEditedKeys$c,
  getIndexed: getIndexed$f,
  getStateToSave: getStateToSave$c,
  getSubstate: getSubstate$o,
  getUpdatePermissionByKey: getUpdatePermissionByKey$c,
  getUsedKeysForComponent: getUsedKeysForComponent$c,
  haveAllKeysRegisteredUse: haveAllKeysRegisteredUse$c
};

var getAllSetsAsObject$1 = function getAllSetsAsObject(state) {
  return state.windows.sets;
};

var getAllWindowsAsObject = function getAllWindowsAsObject(state) {
  return state.windows.windows;
};

var getSetByKey$1 = createSelector([getAllSetsAsObject$1, function (state, key) {
  return key;
}], function (sets, key) {
  return sets && sets[key];
});
var getWindow = createSelector([getAllWindowsAsObject, function (state, key) {
  return key;
}], function (windows, key) {
  return windows && windows[key];
});
var getWindowsBySetKeyAsObject = createSelector([getSetByKey$1, getAllWindowsAsObject], function (set, windows) {
  if (set && set.orderByHistory && set.orderByHistory.length) {
    var setWindows = {};

    _each(set.orderByHistory, function (key) {
      setWindows[key] = windows[key];
    });

    return setWindows;
  } else {
    return null;
  }
});
var isOpen = createSelector([getWindow], function (window) {
  return window && window.data && window.data.state === 'open';
});
var Windows = {
  getSetByKey: getSetByKey$1,
  getWindow: getWindow,
  getWindowsBySetKeyAsObject: getWindowsBySetKeyAsObject,
  isOpen: isOpen
};

var Select = {
  app: selectors,
  areas: Areas,
  areaRelations: AreaRelations,
  attributes: Attributes,
  attributeSets: AttributeSets,
  cases: Cases,
  components: Components,
  data: Data,
  layerTemplates: LayerTemplates,
  layerTrees: LayerTrees,
  maps: Maps,
  periods: Periods,
  places: Places,
  scenarios: Scenarios,
  scopes: Scopes,
  screens: Screens,
  selections: Selections,
  styles: Styles,
  tags: Tags,
  users: Users,
  views: Views,
  windows: Windows
};

var DEFAULT_CATEGORY_PATH = 'metadata'; // ============ factories ===========

var apiDelete = function apiDelete(dataType, categoryPath, data) {
  return function (dispatch, getState) {
    var localConfig = Select.app.getCompleteLocalConfiguration(getState());
    var apiPath = 'rest/' + categoryPath;
    var payload = {
      data: _defineProperty({}, dataType, data)
    };
    return request(localConfig, apiPath, 'DELETE', null, payload).then(function (result) {
      if (result.errors && result.errors[dataType] || result.data && !result.data[dataType]) {
        dispatch(actionGeneralError(result.errors[dataType] || new Error('no data')));
      } else {
        var itemsDeleted = result.data[dataType];

        if (itemsDeleted.length > 0) {
          return result;
        } else {
          console.warn("No data updated for ".concat(dataType, " metadata type"));
        }
      }
    })["catch"](function (error) {
      dispatch(actionGeneralError(error));
    });
  };
};

var apiUpdate = function apiUpdate(getSubstate, dataType, actionTypes, categoryPath, editedData) {
  return function (dispatch, getState) {
    var localConfig = Select.app.getCompleteLocalConfiguration(getState());
    var apiPath = 'rest/' + categoryPath;
    var payload = {
      data: _defineProperty({}, dataType, editedData)
    };
    return request(localConfig, apiPath, 'PUT', null, payload).then(function (result) {
      if (result.errors && result.errors[dataType] || result.data && !result.data[dataType]) {
        dispatch(actionGeneralError(result.errors[dataType] || new Error('no data')));
      } else {
        dispatch(receiveUpdated(getSubstate, actionTypes, result, dataType, categoryPath));
      }
    })["catch"](function (error) {
      dispatch(actionGeneralError(error));
    });
  };
};

var updateEdited = function updateEdited(getSubstate, actionTypes) {
  return function (modelKey, key, value) {
    return function (dispatch, getState) {
      if (!getSubstate) {
        return dispatch(actionGeneralError('common/actions#updateEdited: setSubstate parameter is missing!'));
      }

      if (!actionTypes) {
        return dispatch(actionGeneralError('common/actions#updateEdited: actionTypes parameter is missing!'));
      }

      if (!modelKey) {
        return dispatch(actionGeneralError('common/actions#updateEdited: Model key is missing!'));
      }

      if (!key) {
        return dispatch(actionGeneralError('common/actions#updateEdited: Property key is missing!'));
      }

      var originalModel = commonSelectors.getByKey(getSubstate)(getState(), modelKey); // delete property from edited, if the value in update is the same as in state
      //TODO - test

      if (originalModel && (value === originalModel.data[key] || _isEqual2(originalModel.data[key], value))) {
        dispatch(actionRemovePropertyFromEdited(actionTypes, modelKey, key));
      } else {
        dispatch(actionUpdateEdited(actionTypes, [{
          key: modelKey,
          data: _defineProperty({}, key, value)
        }]));
      }
    };
  };
};

var updateStore = function updateStore(getSubstate, actionTypes) {
  return function (data) {
    return function (dispatch) {
      dispatch(actionUpdateStore(actionTypes, data));
    };
  };
};

var removePropertyFromEdited = function removePropertyFromEdited(actionTypes) {
  return function (modelKey, key) {
    return dispatch(actionRemovePropertyFromEdited(actionTypes, modelKey, key));
  };
};

var deleteItem = function deleteItem(getSubstate, dataType, actionTypes) {
  var categoryPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_CATEGORY_PATH;
  return function (item) {
    return function (dispatch, getState) {
      if (!item) {
        return dispatch(actionGeneralError('common/actions#deleteItem: item to delete is missing!'));
      }

      if (!item.key) {
        return dispatch(actionGeneralError('common/actions#deleteItem: item key to delete is missing!'));
      } //dispatch deleting?
      //TODO


      return dispatch(apiDelete(dataType, categoryPath, [{
        key: item.key
      }])).then(function (result) {
        var data = result.data[dataType];
        var deletedKeys = data.map(function (d) {
          return d.key;
        }); //Check if item deleted

        if (_isEqual2(deletedKeys, [item.key])) {
          // mark deleted items by "deleted" date
          var deleteDate = moment(new Date().toISOString()).utc().format();
          deletedKeys.forEach(function (key) {
            dispatch(actionMarkAsDeleted(actionTypes, key, deleteDate));
          }); // remove dependencies in all edited metadata

          dispatch(actionRemovePropertyValuesFromAllEdited(dataType, deletedKeys)); // TODO check original metadata dependencies
          //refresh proper indexes

          var state = getState();
          var indexes = commonSelectors.getIndexesByFilteredItem(getSubstate)(state, item) || [];

          if (!_isEmpty2(indexes)) {
            indexes.forEach(function (index) {
              if (index) {
                //invalidate data
                dispatch(actionClearIndex(actionTypes, index.filter, index.order)); //refresh data

                dispatch(refreshIndex$1(getSubstate, dataType, index.filter, index.order, actionTypes, categoryPath));
              }
            });
          }
        } else {
          //error
          return dispatch(actionGeneralError('common/actions#deleteItem: Deleted key is not equal to key to delete!'));
        }
      });
    };
  };
};

var saveEdited = function saveEdited(getSubstate, dataType, actionTypes) {
  var categoryPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_CATEGORY_PATH;
  return function (key) {
    return function (dispatch, getState) {
      if (!getSubstate) {
        return dispatch(actionGeneralError('common/actions#saveEdited: setSubstate parameter is missing!'));
      }

      if (!dataType) {
        return dispatch(actionGeneralError('common/actions#saveEdited: dataType parameter is missing!'));
      }

      if (!actionTypes) {
        return dispatch(actionGeneralError('common/actions#saveEdited: actionTypes parameter is missing!'));
      }

      if (!key) {
        return dispatch(actionGeneralError('common/actions#saveEdited: Model key is missing!'));
      }

      var state = getState();
      var saved = commonSelectors.getByKey(getSubstate)(state, key);
      var edited = commonSelectors.getEditedByKey(getSubstate)(state, key);

      if (saved) {
        // update
        return dispatch(apiUpdate(getSubstate, dataType, actionTypes, categoryPath, [edited]));
      } else {
        // create
        debugger;
      }
    };
  };
};

var useKeys = function useKeys(getSubstate, dataType, actionTypes) {
  var categoryPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_CATEGORY_PATH;
  return function (keys, componentId) {
    return function (dispatch, getState) {
      var state = getState();
      var isRegistered = commonSelectors.haveAllKeysRegisteredUse(getSubstate)(state, componentId, keys);

      if (!isRegistered) {
        dispatch(actionUseKeysRegister(actionTypes, componentId, keys));
      }

      return dispatch(ensureKeys(getSubstate, dataType, actionTypes, keys, categoryPath));
    };
  };
};

var useIndexed = function useIndexed(getSubstate, dataType, actionTypes) {
  var categoryPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_CATEGORY_PATH;
  return function (filterByActive, filter, order, start, length, componentId) {
    return function (dispatch, getState) {
      dispatch(actionUseIndexedRegister(actionTypes, componentId, filterByActive, filter, order, start, length));
      var state = getState();
      var activeKeys = commonSelectors.getAllActiveKeys(state);
      var fullFilter = commonHelpers.mergeFilters(activeKeys, filterByActive, filter);
      return dispatch(ensureIndexed(getSubstate, dataType, fullFilter, order, start, length, actionTypes, categoryPath));
    };
  };
};
/**
 * If not refresh data, call clearIndex to invalidate data.
 */


function refreshIndex$1(getSubstate, dataType, filter, order, actionTypes) {
  var categoryPath = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : DEFAULT_CATEGORY_PATH;
  return function (dispatch, getState) {
    var state = getState();
    var usesForIndex = commonSelectors.getUsedIndexPage(getSubstate)(state, filter, order);

    if (usesForIndex) {
      _each(usesForIndex.uses, function (use) {
        dispatch(ensureIndexed(getSubstate, dataType, usesForIndex.filter, usesForIndex.order, use.start, use.length, actionTypes, categoryPath));
      });
    }
  };
}

function receiveIndexed(actionTypes, result, dataType, filter, order, start) {
  return function (dispatch) {
    // add data to store
    if (result.data[dataType].length) {
      dispatch(actionAdd(actionTypes, result.data[dataType], filter));
    } // add to index


    dispatch(actionAddIndex(actionTypes, filter, order, result.total, start, result.data[dataType], result.changes && result.changes[dataType]));
  };
}

function requestWrapper(apiPath, method, query, payload, successAction, errorAction) {
  return function (dispatch, getState) {
    var localConfig = Select.app.getCompleteLocalConfiguration(getState());
    request(localConfig, apiPath, method, query, payload).then(function (result) {
      dispatch(successAction(result.data));
    })["catch"](function (error) {
      dispatch(errorAction(error));
    });
  };
}

function create(getSubstate, dataType, actionTypes) {
  var categoryPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_CATEGORY_PATH;
  return function (key, appKey) {
    return function (dispatch, getState) {
      var state = getState();
      var apiPath = path.join('rest', categoryPath);
      var localConfig = Select.app.getCompleteLocalConfiguration(state);
      var applicationKey = null;

      if (appKey) {
        applicationKey = appKey;
      } else {
        var currentAppKey = Select.app.getKey(state);

        if (currentAppKey) {
          applicationKey = currentAppKey;
        }
      }

      var payload = getCreatePayload(dataType, key, applicationKey);
      return request(localConfig, apiPath, 'POST', null, payload).then(function (result) {
        if (result.errors && result.errors[dataType] || result.data && !result.data[dataType]) {
          dispatch(actionGeneralError(result.errors[dataType] || new Error('no data')));
        } else {
          var items = result.data[dataType];
          dispatch(actionAdd(actionTypes, items));
          var indexes = [];
          items.forEach(function (item) {
            indexes = indexes.concat(commonSelectors.getIndexesByFilteredItem(getSubstate)(getState(), item)) || [];
          });
          var uniqueIndexes = commonHelpers.getUniqueIndexes(indexes);

          if (!_isEmpty2(uniqueIndexes)) {
            uniqueIndexes.forEach(function (index) {
              if (index) {
                //invalidate data
                dispatch(actionClearIndex(actionTypes, index.filter, index.order)); //refresh data

                dispatch(refreshIndex$1(getSubstate, dataType, index.filter, index.order, actionTypes, categoryPath));
              }
            });
          }
        }
      })["catch"](function (error) {
        dispatch(actionGeneralError(error));
      });
    };
  };
}

function ensureKeys(getSubstate, dataType, actionTypes, keys) {
  var categoryPath = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : DEFAULT_CATEGORY_PATH;
  return function (dispatch, getState) {
    var state = getState();
    var PAGE_SIZE = Select.app.getLocalConfiguration(state, 'requestPageSize') || configDefaults.requestPageSize;
    var keysToLoad = commonSelectors.getKeysToLoad(getSubstate)(state, keys);
    var promises = [];

    if (keysToLoad) {
      keysToLoad = _chunk(keysToLoad, PAGE_SIZE);

      _each(keysToLoad, function (keysToLoadPage) {
        promises.push(dispatch(loadKeysPage(dataType, actionTypes, keysToLoadPage, categoryPath)));
      });
    }

    return Promise.all(promises);
  };
}

function ensureIndexed(getSubstate, dataType, filter, order, start, length, actionTypes) {
  var categoryPath = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : DEFAULT_CATEGORY_PATH;
  return function (dispatch, getState) {
    var state = getState();
    var localConfig = Select.app.getCompleteLocalConfiguration(state);
    var PAGE_SIZE = localConfig.requestPageSize || configDefaults.requestPageSize;
    var total = commonSelectors.getIndexTotal(getSubstate)(state, filter, order);
    var changedOn = commonSelectors.getIndexChangedOn(getSubstate)(state, filter, order);

    if (total != null) {
      // we have existing index, we only load what we don't have
      var indexPage = commonSelectors.getIndexPage(getSubstate)(state, filter, order, start, length) || {};

      var pages = _chunk(Object.values(indexPage), PAGE_SIZE);

      var promises = pages.map(function (page, i) {
        var loadedKeys = page.filter(function (v) {
          return v != null;
        });

        if (loadedKeys.length === page.length) {
          return; // page is already loaded
        }

        var completeFilter = loadedKeys.length ? _objectSpread2(_objectSpread2({}, filter), {}, {
          key: {
            notin: loadedKeys
          }
        }) : filter;
        return dispatch(loadIndexedPage(dataType, completeFilter, order, start + i * PAGE_SIZE, changedOn, actionTypes, categoryPath))["catch"](function (err) {
          if (err.message === 'Index outdated') {
            dispatch(refreshIndex$1(getSubstate, dataType, filter, order, actionTypes, categoryPath));
          }
        });
      });
      return Promise.all(promises);
    } else {
      // we don't have index, we need to load everything
      return dispatch(loadIndexedPage(dataType, filter, order, start, changedOn, actionTypes, categoryPath)).then(function (response) {
        // check success to make sure it's our error from BE and not anything broken in render chain
        if (response && response.message && response.success === false) ; else {
          // remaining pages
          if (length > PAGE_SIZE) {
            return dispatch(ensureIndexed(getSubstate, dataType, filter, order, start + PAGE_SIZE, length - PAGE_SIZE, actionTypes, categoryPath));
          } // else already done

        }
      })["catch"](function (err) {
        if (err.message === 'Index outdated') {
          dispatch(refreshIndex$1(getSubstate, dataType, filter, order, actionTypes, categoryPath));
        } else {
          throw new Error("_common/actions#ensure: ".concat(err));
        }
      });
    }
  };
}

function loadKeysPage(dataType, actionTypes, keys) {
  var categoryPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_CATEGORY_PATH;
  return function (dispatch, getState) {
    var localConfig = Select.app.getCompleteLocalConfiguration(getState());
    var apiPath = getAPIPath(categoryPath, dataType);
    var payload = {
      filter: {
        key: {
          "in": keys
        }
      }
    };
    return request(localConfig, apiPath, 'POST', null, payload).then(function (result) {
      if (result.errors && result.errors[dataType] || result.data && !result.data[dataType]) {
        throw new Error(result.errors[dataType] || 'no data');
      } else {
        dispatch(receiveKeys(actionTypes, result, dataType, keys));
      }
    })["catch"](function (error) {
      dispatch(actionGeneralError(error));
      return error;
    });
  };
}

function loadIndexedPage(dataType, filter, order, start, changedOn, actionTypes) {
  var categoryPath = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : DEFAULT_CATEGORY_PATH;
  return function (dispatch, getState) {
    var localConfig = Select.app.getCompleteLocalConfiguration(getState());
    var PAGE_SIZE = localConfig.requestPageSize || configDefaults.requestPageSize;
    var apiPath = getAPIPath(categoryPath, dataType);
    var payload = {
      filter: filter && _objectSpread2({}, filter),
      offset: start - 1,
      order: order,
      limit: PAGE_SIZE
    };
    return request(localConfig, apiPath, 'POST', null, payload).then(function (result) {
      if (result.errors && result.errors[dataType] || result.data && !result.data[dataType]) {
        throw new Error(result.errors[dataType] || 'no data');
      } else if (result.changes && result.changes[dataType] && moment(result.changes[dataType]).isAfter(changedOn)) {
        throw new Error('Index outdated');
      } else {
        dispatch(receiveIndexed(actionTypes, result, dataType, filter, order, start));
      }
    })["catch"](function (error) {
      dispatch(actionGeneralError(error));
      return error; //todo do we need to return this
    });
  };
}

function receiveUpdated(getSubstate, actionTypes, result, dataType, categoryPath) {
  return function (dispatch, getState) {
    var data = result.data[dataType];

    if (data.length) {
      var originalData = commonSelectors.getAllAsObject(getSubstate)(getState());
      dispatch(actionAdd(actionTypes, data));
      var editedData = commonSelectors.getEditedAllAsObject(getSubstate)(getState());
      var indexes = [];
      data.forEach(function (model) {
        var _editedData$model$key;

        var original = originalData === null || originalData === void 0 ? void 0 : originalData[model.key];
        var edited = editedData === null || editedData === void 0 ? void 0 : (_editedData$model$key = editedData[model.key]) === null || _editedData$model$key === void 0 ? void 0 : _editedData$model$key.data;

        _forIn(edited, function (value, key) {
          if (model.data[key] === value) {
            dispatch(actionRemovePropertyFromEdited(actionTypes, model.key, key));
          } else if (_isObject2(value)) {
            if (JSON.stringify(value) === JSON.stringify(model.data[key])) {
              dispatch(actionRemovePropertyFromEdited(actionTypes, model.key, key));
            } else if (_isArray2(value) && _isEmpty2(value)) {
              if (_isEmpty2(model.data[key]) || model.data && !model.data[key]) {
                dispatch(actionRemovePropertyFromEdited(actionTypes, model.key, key));
              }
            }
          }
        });

        indexes = indexes.concat(commonSelectors.getIndexesByFilteredItem(getSubstate)(getState() || [], model));
        indexes = indexes.concat(commonSelectors.getIndexesByFilteredItem(getSubstate)(getState() || [], original));
      });
      var uniqueIndexes = commonHelpers.getUniqueIndexes(indexes);

      if (!_isEmpty2(uniqueIndexes)) {
        uniqueIndexes.forEach(function (index) {
          if (index) {
            //invalidate data
            dispatch(actionClearIndex(actionTypes, index.filter, index.order)); //refresh data

            dispatch(refreshIndex$1(getSubstate, dataType, index.filter, index.order, actionTypes, categoryPath));
          }
        });
      }
    } else {
      console.warn("No data updated for ".concat(dataType, " metadata type"));
    }
  };
}

function receiveKeys(actionTypes, result, dataType, keys) {
  return function (dispatch) {
    // add data to store
    if (result.data[dataType].length) {
      dispatch(actionAdd(actionTypes, result.data[dataType]));
    } // add unreceived keys


    _remove(keys, function (key) {
      return _find2(result.data[dataType], {
        key: key
      });
    });

    if (keys.length) {
      dispatch(actionAddUnreceivedKeys(actionTypes, keys));
    }
  };
}

function refreshUses(getSubstate, dataType, actionTypes) {
  var categoryPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_CATEGORY_PATH;
  return function () {
    return function (dispatch, getState) {
      dispatch(actionClearIndexes(actionTypes));
      var state = getState();
      var usedKeys = commonSelectors.getKeysInUse(getSubstate)(state);
      dispatch(ensureKeys(getSubstate, dataType, actionTypes, usedKeys, categoryPath));
      var usedIndexPages = commonSelectors.getUsedIndexPages(getSubstate)(state);

      var promises = _flatMap(usedIndexPages, function (usedIndexPage) {
        _map(usedIndexPage.uses, function (use) {
          return dispatch(ensureIndexed(getSubstate, dataType, usedIndexPage.filter, usedIndexPage.order, use.start, use.length, actionTypes, categoryPath));
        });
      });

      return Promise.all(promises);
    };
  };
}

function ensureIndexesWithFilterByActive(getSubstate, dataType, actionTypes) {
  var categoryPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_CATEGORY_PATH;
  return function (filterByActive) {
    return function (dispatch, getState) {
      var state = getState();
      var usedIndexes = commonSelectors.getUsesWithActiveDependency(getSubstate)(state, filterByActive);

      var promises = _flatMap(usedIndexes, function (usedIndex) {
        _map(usedIndex.uses, function (use) {
          return dispatch(ensureIndexed(getSubstate, dataType, usedIndex.filter, usedIndex.order, use.start, use.length, actionTypes, categoryPath));
        });
      });

      return Promise.all(promises);
    };
  };
}

function updateSubstateFromView(actionTypes) {
  return function (data) {
    return function (dispatch) {
      if (data && data.activeKey) {
        dispatch(actionSetActiveKey(actionTypes, data.activeKey));
      } else if (data && data.activeKeys) {
        dispatch(actionSetActiveKeys(actionTypes, data.activeKeys));
      }
    };
  };
} // ============ common namespace actions ===========


function actionDataSetOutdated() {
  return {
    type: commonActionTypes.COMMON.DATA.SET_OUTDATED
  };
}

function actionRemovePropertyValuesFromAllEdited(dataType, keys) {
  return {
    type: commonActionTypes.COMMON.EDITED.REMOVE_PROPERTY_VALUES,
    dataType: dataType,
    keys: keys
  };
}

function actionGeneralError(e) {
  console.error('common/actions error', e);
  return {
    type: 'ERROR'
  };
} // ============ specific store namespace actions ===========


var creator = function creator(action) {
  return function (actionTypes) {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return function (dispatch) {
        dispatch(action.apply(void 0, [actionTypes].concat(args)));
      };
    };
  };
};

function action(actionTypes, type, payload) {
  type = type.split('.');

  _each(type, function (pathSegment) {
    if (!actionTypes.hasOwnProperty(pathSegment)) {
      console.error('common/actions#action: Action not in namespace', type, payload);
      throw new Error('common/actions#action: Action not in namespace');
    }

    actionTypes = actionTypes[pathSegment];
  });

  if (typeof actionTypes !== 'string') throw new Error('common/actions#action: Action type not string');
  return _objectSpread2(_objectSpread2({}, payload), {}, {
    type: actionTypes
  });
}

function actionAdd(actionTypes, data, filter) {
  if (!_isArray2(data)) data = [data];
  return action(actionTypes, 'ADD', {
    data: data,
    filter: filter
  });
}

function actionAddUnreceivedKeys(actionTypes, keys) {
  if (!_isArray2(keys)) keys = [keys];
  return action(actionTypes, 'ADD_UNRECEIVED', {
    keys: keys
  });
}

function actionAddIndex(actionTypes, filter, order, count, start, data, changedOn, limit //optional
) {
  return action(actionTypes, 'INDEX.ADD', _objectSpread2({
    filter: filter,
    order: order,
    count: count,
    start: start,
    data: data,
    changedOn: changedOn
  }, limit && {
    limit: limit
  }));
}
/**
 * Useful for invalidate data before refresh indexes
 */


function actionClearIndex(actionTypes, filter, order) {
  return action(actionTypes, 'INDEX.CLEAR_INDEX', {
    filter: filter,
    order: order
  });
}

var actionMarkAsDeleted = function actionMarkAsDeleted(actionTypes, key, date) {
  return action(actionTypes, 'MARK_DELETED', {
    key: key,
    date: date
  });
};

function actionClearIndexes(actionTypes) {
  return action(actionTypes, 'INDEX.CLEAR_ALL');
}

function actionSetActiveKey(actionTypes, key) {
  return action(actionTypes, 'SET_ACTIVE_KEY', {
    key: key
  });
}

function actionSetActiveKeys(actionTypes, keys) {
  return action(actionTypes, 'SET_ACTIVE_KEYS', {
    keys: keys
  });
}

function actionUpdateEdited(actionTypes, data) {
  return action(actionTypes, 'EDITED.UPDATE', {
    data: data
  });
}

function actionRemovePropertyFromEdited(actionTypes, key, property) {
  return action(actionTypes, 'EDITED.REMOVE_PROPERTY', {
    key: key,
    property: property
  });
}

function actionUseIndexedRegister(actionTypes, componentId, filterByActive, filter, order, start, length) {
  return action(actionTypes, 'USE.INDEXED.REGISTER', {
    componentId: componentId,
    filterByActive: filterByActive,
    filter: filter,
    order: order,
    start: start,
    length: length
  });
}

function actionUseIndexedClear(actionTypes, componentId) {
  return action(actionTypes, 'USE.INDEXED.CLEAR', {
    componentId: componentId
  });
}

function actionUseIndexedClearAll(actionTypes) {
  return action(actionTypes, 'USE.INDEXED.CLEAR_ALL');
}

function actionUpdateStore(actionTypes, data) {
  return action(actionTypes, 'UPDATE_STORE', data);
}

function actionUseKeysClear(actionTypes, componentId) {
  return action(actionTypes, 'USE.KEYS.CLEAR', {
    componentId: componentId
  });
}

function actionUseKeysRegister(actionTypes, componentId, keys) {
  return action(actionTypes, 'USE.KEYS.REGISTER', {
    componentId: componentId,
    keys: keys
  });
} // ============ utilities ===========


var getAPIPath = function getAPIPath() {
  var categoryPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_CATEGORY_PATH;
  var dataType = arguments.length > 1 ? arguments[1] : undefined;
  return path.join('rest', categoryPath, 'filtered', dataType);
};

var getCreatePayload = function getCreatePayload(datatype) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : utils.uuid();
  var applicationKey = arguments.length > 2 ? arguments[2] : undefined;
  var payload = {
    data: {}
  };
  var model = {
    key: key,
    data: {}
  };

  if (applicationKey) {
    model.data = {
      applicationKey: applicationKey
    };
  }

  payload.data[datatype] = [model];
  return payload;
}; // ============ export ===========


var commonActions = {
  add: creator(actionAdd),
  action: action,
  addIndex: creator(actionAddIndex),
  actionGeneralError: actionGeneralError,
  apiUpdate: apiUpdate,
  creator: creator,
  create: create,
  "delete": deleteItem,
  ensure: ensureKeys,
  ensureIndexed: ensureIndexed,
  ensureIndexesWithFilterByActive: ensureIndexesWithFilterByActive,
  ensureKeys: ensureKeys,
  loadIndexedPage: loadIndexedPage,
  loadKeysPage: loadKeysPage,
  setActiveKey: creator(actionSetActiveKey),
  setActiveKeys: creator(actionSetActiveKeys),
  receiveUpdated: receiveUpdated,
  receiveIndexed: receiveIndexed,
  receiveKeys: receiveKeys,
  refreshUses: refreshUses,
  removePropertyFromEdited: removePropertyFromEdited,
  request: requestWrapper,
  saveEdited: saveEdited,
  updateSubstateFromView: updateSubstateFromView,
  updateEdited: updateEdited,
  updateStore: updateStore,
  useKeys: useKeys,
  useKeysClear: creator(actionUseKeysClear),
  useIndexed: useIndexed,
  clearIndex: creator(actionClearIndex),
  useIndexedRegister: actionUseIndexedRegister,
  useIndexedClear: creator(actionUseIndexedClear),
  useIndexedClearAll: creator(actionUseIndexedClearAll),
  actionDataSetOutdated: actionDataSetOutdated,
  actionSetActiveKey: actionSetActiveKey
};

var loadConfiguration = function loadConfiguration() {
  return function (dispatch, getState) {
    var localConfig = Select.app.getCompleteLocalConfiguration(getState());
    var apiPath = 'rest/applications/filtered/configurations';
    var applicationKey = selectors.getKey(getState());
    var payload = {
      filter: {
        applicationKey: applicationKey
      }
    };
    return request(localConfig, apiPath, 'POST', null, payload).then(function (result) {
      if (result.errors && result.errors.configurations || result.data && !result.data.configurations) {
        dispatch(commonActions.actionGeneralError(result.errors.configurations || new Error('no data')));
      } else if (result.data.configurations.length && result.data.configurations[0].data && result.data.configurations[0].data.data) {
        dispatch(actionReceiveConfiguration(result.data.configurations[0].data.data));
      } else {
        dispatch(commonActions.actionGeneralError(new Error('empty configuration')));
      }
    })["catch"](function (error) {
      dispatch(commonActions.actionGeneralError(error));
    });
  };
}; // ============ actions ===========


var actionSetKey = function actionSetKey(key) {
  return {
    type: commonActionTypes.APP.SET_KEY,
    key: key
  };
};

var actionSetBaseUrl = function actionSetBaseUrl(url) {
  return {
    type: commonActionTypes.APP.SET_BASE_URL,
    url: url
  };
};

var actionSetLocalConfiguration = function actionSetLocalConfiguration(path, value) {
  return {
    type: commonActionTypes.APP.SET_LOCAL_CONFIGURATION,
    path: path,
    value: value
  };
};

var actionUpdateLocalConfiguration = function actionUpdateLocalConfiguration(update) {
  return {
    type: commonActionTypes.APP.UPDATE_LOCAL_CONFIGURATION,
    update: update
  };
};

var actionReceiveConfiguration = function actionReceiveConfiguration(configuration) {
  return {
    type: commonActionTypes.APP.RECEIVE_CONFIGURATION,
    configuration: configuration
  };
}; // ============ export ===========


var App = {
  add: actionReceiveConfiguration,
  setKey: actionSetKey,
  updateLocalConfiguration: actionUpdateLocalConfiguration,
  setBaseUrl: actionSetBaseUrl,
  setLocalConfiguration: actionSetLocalConfiguration,
  loadConfiguration: loadConfiguration
};

var setActiveKey = commonActions.setActiveKey(commonActionTypes.AREAS.AREA_TREE_LEVELS);
var useIndexed$1 = commonActions.useIndexed(Select.areas.areaTreeLevels.getSubstate, 'areaTreeLevels', commonActionTypes.AREAS.AREA_TREE_LEVELS);
var useKeys$1 = commonActions.useKeys(Select.areas.areaTreeLevels.getSubstate, 'areaTreeLevels', commonActionTypes.AREAS.AREA_TREE_LEVELS);
var refreshUses$1 = commonActions.refreshUses(Select.areas.areaTreeLevels.getSubstate, "areaTreeLevels", commonActionTypes.AREAS.AREA_TREE_LEVELS);

var setActiveKeyAndEnsureDependencies = function setActiveKeyAndEnsureDependencies(key) {
  return function (dispatch, getState, options) {
    dispatch(setActiveKey(key));
    dispatch(options.ensureDependenciesOfActiveMetadataType('areaTreeLevel'));
  };
}; // ============ actions ===========


function actionClearUseIndexed(componentId) {
  return {
    type: commonActionTypes.AREAS.AREA_TREE_LEVELS.USE.INDEXED.CLEAR,
    componentId: componentId
  };
} // ============ export ===========


var areaTreeLevels$1 = {
  refreshUses: refreshUses$1,
  setActiveKey: setActiveKeyAndEnsureDependencies,
  useIndexed: useIndexed$1,
  useIndexedClear: actionClearUseIndexed,
  useKeys: useKeys$1
};

var setActiveKey$1 = commonActions.setActiveKey(commonActionTypes.AREAS.AREA_TREES);
var useIndexed$2 = commonActions.useIndexed(Select.areas.areaTrees.getSubstate, 'areaTrees', commonActionTypes.AREAS.AREA_TREES);
var useKeys$2 = commonActions.useKeys(Select.areas.areaTrees.getSubstate, 'areaTrees', commonActionTypes.AREAS.AREA_TREES);
var refreshUses$2 = commonActions.refreshUses(Select.areas.areaTrees.getSubstate, "areaTrees", commonActionTypes.AREAS.AREA_TREES); // ============ actions ===========

function actionClearUseIndexed$1(componentId) {
  return {
    type: commonActionTypes.AREAS.AREA_TREES.USE.INDEXED.CLEAR,
    componentId: componentId
  };
} // ============ export ===========


var areaTrees$1 = {
  refreshUses: refreshUses$2,
  setActiveKey: setActiveKey$1,
  useIndexed: useIndexed$2,
  useIndexedClear: actionClearUseIndexed$1,
  useKeys: useKeys$2,
  useKeysClear: commonActions.useKeysClear(commonActionTypes.AREAS.AREA_TREES)
};

var Areas$1 = {
  areaTreeLevels: areaTreeLevels$1,
  areaTrees: areaTrees$1
};

var useIndexedRegister = function useIndexedRegister(componentId, filterByActive, filter, order, start, length) {
  return commonActions.useIndexedRegister(commonActionTypes.AREA_RELATIONS, componentId, filterByActive, filter, order, start, length);
};

var ensureIndexed$1 = function ensureIndexed(filter, order, start, length) {
  return commonActions.ensureIndexed(Select.areaRelations.getSubstate, 'area', filter, order, start, length, commonActionTypes.AREA_RELATIONS, 'relations');
};

var add = commonActions.add(commonActionTypes.AREA_RELATIONS);
var useIndexedClearAll = commonActions.useIndexedClearAll(commonActionTypes.AREA_RELATIONS); // ============ export ===========

var AreaRelations$1 = {
  add: add,
  useIndexedRegister: useIndexedRegister,
  useIndexedClearAll: useIndexedClearAll,
  ensureIndexed: ensureIndexed$1
};

var create$1 = commonActions.create(Select.attributes.getSubstate, 'attributes', commonActionTypes.ATTRIBUTES);
var refreshUses$3 = commonActions.refreshUses(Select.attributes.getSubstate, "attributes", commonActionTypes.ATTRIBUTES);
var deleteItem$1 = commonActions["delete"](Select.attributes.getSubstate, 'attributes', commonActionTypes.ATTRIBUTES);
var saveEdited$1 = commonActions.saveEdited(Select.attributes.getSubstate, 'attributes', commonActionTypes.ATTRIBUTES);
var setActiveKey$2 = commonActions.setActiveKey(commonActionTypes.ATTRIBUTES);
var setActiveKeys = commonActions.setActiveKeys(commonActionTypes.ATTRIBUTES);
var updateEdited$1 = commonActions.updateEdited(Select.attributes.getSubstate, commonActionTypes.ATTRIBUTES);
var updateStore$1 = commonActions.updateStore(Select.attributes.getSubstate, commonActionTypes.ATTRIBUTES);
var useIndexed$3 = commonActions.useIndexed(Select.attributes.getSubstate, 'attributes', commonActionTypes.ATTRIBUTES);
var useIndexedClear = commonActions.useIndexedClear(commonActionTypes.ATTRIBUTES);
var useKeys$3 = commonActions.useKeys(Select.attributes.getSubstate, 'attributes', commonActionTypes.ATTRIBUTES);
var useKeysClear = commonActions.useKeysClear(commonActionTypes.ATTRIBUTES);
var updateStateFromView = commonActions.updateSubstateFromView(commonActionTypes.ATTRIBUTES);

var setActiveKeyAndEnsureDependencies$1 = function setActiveKeyAndEnsureDependencies(key) {
  return function (dispatch, getState, options) {
    dispatch(setActiveKey$2(key));
    dispatch(options.ensureDependenciesOfActiveMetadataType('attribute'));
  };
};

var setActiveKeysAndEnsureDependencies = function setActiveKeysAndEnsureDependencies(keys) {
  return function (dispatch, getState, options) {
    dispatch(setActiveKeys(keys));
    dispatch(options.ensureDependenciesOfActiveMetadataType('attribute'));
  };
}; // ============ export ===========


var Attributes$1 = {
  create: create$1,
  "delete": deleteItem$1,
  updateStateFromView: updateStateFromView,
  refreshUses: refreshUses$3,
  saveEdited: saveEdited$1,
  setActiveKey: setActiveKeyAndEnsureDependencies$1,
  setActiveKeys: setActiveKeysAndEnsureDependencies,
  updateEdited: updateEdited$1,
  updateStore: updateStore$1,
  useIndexed: useIndexed$3,
  useIndexedClear: useIndexedClear,
  useKeys: useKeys$3,
  useKeysClear: useKeysClear
};

var setActiveKeys$1 = commonActions.setActiveKeys(commonActionTypes.ATTRIBUTE_SETS); // ============ export ===========

var AttributeSets$1 = {
  setActiveKeys: setActiveKeys$1
};

var add$1 = commonActions.add(commonActionTypes.CASES);
var create$2 = commonActions.create(Select.cases.getSubstate, 'cases', commonActionTypes.CASES);
var deleteItem$2 = commonActions["delete"](Select.cases.getSubstate, 'cases', commonActionTypes.CASES);
var saveEdited$2 = commonActions.saveEdited(Select.cases.getSubstate, 'cases', commonActionTypes.CASES);
var setActiveKey$3 = commonActions.setActiveKey(commonActionTypes.CASES);
var setActiveKeys$2 = commonActions.setActiveKeys(commonActionTypes.CASES);
var updateEdited$2 = commonActions.updateEdited(Select.cases.getSubstate, commonActionTypes.CASES);
var updateStateFromView$1 = commonActions.updateSubstateFromView(commonActionTypes.CASES);
var useKeys$4 = commonActions.useKeys(Select.cases.getSubstate, 'cases', commonActionTypes.CASES);
var useKeysClear$1 = commonActions.useKeysClear(commonActionTypes.CASES);
var useIndexed$4 = commonActions.useIndexed(Select.cases.getSubstate, 'cases', commonActionTypes.CASES);
var useIndexedClear$1 = commonActions.useIndexedClear(commonActionTypes.CASES);
var refreshUses$4 = commonActions.refreshUses(Select.cases.getSubstate, "cases", commonActionTypes.CASES);

var setActiveKeyAndEnsureDependencies$2 = function setActiveKeyAndEnsureDependencies(key) {
  return function (dispatch, getState, options) {
    dispatch(setActiveKey$3(key));
    dispatch(options.ensureDependenciesOfActiveMetadataType('case'));
  };
};

var setActiveKeysAndEnsureDependencies$1 = function setActiveKeysAndEnsureDependencies(keys) {
  return function (dispatch, getState, options) {
    dispatch(setActiveKeys$2(keys));
    dispatch(options.ensureDependenciesOfActiveMetadataType('case'));
  };
}; // ============ actions ===========
// ============ export ===========


var Cases$1 = {
  add: add$1,
  create: create$2,
  "delete": deleteItem$2,
  refreshUses: refreshUses$4,
  saveEdited: saveEdited$2,
  setActiveKey: setActiveKeyAndEnsureDependencies$2,
  setActiveKeys: setActiveKeysAndEnsureDependencies$1,
  updateEdited: updateEdited$2,
  updateStateFromView: updateStateFromView$1,
  useIndexed: useIndexed$4,
  useIndexedClear: useIndexedClear$1,
  useKeys: useKeys$4,
  useKeysClear: useKeysClear$1
};

var updateStore$2 = commonActions.updateStore(Select.components.getSubstate, commonActionTypes.COMPONENTS); // ============ creators ===========

function update(component, data) {
  return function (dispatch) {
    dispatch(actionUpdate(component, data));
  };
} // ============ actions ===========


function actionUpdate(component, data) {
  return {
    type: commonActionTypes.COMPONENTS.UPDATE,
    component: component,
    update: data
  };
}

function actionSet(component, path, value) {
  return {
    type: commonActionTypes.COMPONENTS.SET,
    component: component,
    path: path,
    value: value
  };
} // ============ export ===========


var Components$1 = {
  update: update,
  updateStateFromView: updateStore$2,
  updateStore: updateStore$2,
  set: actionSet
};

var actionTypes$1 = commonActionTypes.DATA.ATTRIBUTE_RELATIONS;
var add$2 = commonActions.add(actionTypes$1);
var addIndex = commonActions.addIndex(actionTypes$1); // ============ creators ===========

/**
 * It ensure adding index and adding or updating received data from BE.
 * Add relations to state only when attributeRelations received, in case of empty attributeRelations it adds only index.
 * @param {Array} attributeRelations Array received from BE contains attributeRelations.
 * @param {Object} filter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Array?} order
 * @param {Number} start
 * @param {Number} total
 * @param {string?} changedOn
 */

function receiveIndexed$1(attributeRelations, filter, order, start, total, changedOn, limit) {
  return function (dispatch) {
    // add attributeRelations to store
    if (attributeRelations.length) {
      dispatch(add$2(attributeRelations, filter));
    } // add to index


    dispatch(addIndex(filter, order, total, start, attributeRelations, changedOn, limit));
  };
}
/**
 * Create new index based on given level and tiles with loading indicator.
 * @param {Object} filter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Array?} order
 * @param {Number} level
 * @param {Array.[Array]} tiles
 */


function addLoadingIndex(pagination, filter, order) {
  var changedOn = null; //Fake new data object for common action

  var data = _reduce(_toConsumableArray(Array(pagination.limit)), function (acc, val) {
    //Use key = true as a loading identificator
    return [].concat(_toConsumableArray(acc), [{
      key: true
    }]);
  }, []); // filter, order, data, start, count, changedOn


  return addIndexAction(filter, order, data, pagination.offset + 1, null, changedOn);
} // ============ actions ============


var actionUpdateStore$1 = function actionUpdateStore(data) {
  return {
    type: commonActionTypes.DATA.ATTRIBUTE_RELATIONS.UPDATE_STORE,
    data: data
  };
};

function addIndexAction(filter, order, data, start, count, changedOn) {
  return {
    type: actionTypes$1.INDEX.ADD,
    filter: filter,
    order: order,
    data: data,
    start: start,
    count: count,
    changedOn: changedOn
  };
} // ============ export ===========


var attributeRelations$1 = {
  receiveIndexed: receiveIndexed$1,
  addLoadingIndex: addLoadingIndex,
  updateStore: actionUpdateStore$1
};

var actionTypes$2 = commonActionTypes.DATA.ATTRIBUTE_DATA_SOURCES;
var addIndex$1 = commonActions.addIndex(actionTypes$2);
var add$3 = commonActions.add(actionTypes$2); // ============ creators ===========

/**
 * It ensure adding index and adding or updating received data from BE.
 * Add dataSources to state only when attributeDataSources received, in case of empty attributeDataSources it adds only index.
 * @param {Array} attributeDataSources Array received from BE contains attributeDataSource definitions.
 * @param {Object} filter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Array?} order
 * @param {Number} start
 * @param {Number} total
 * @param {string?} changedOn
 */

function receiveIndexed$2(attributeDataSources, filter, order, start, total, changedOn) {
  return function (dispatch) {
    // add attributeDataSources to store
    if (attributeDataSources.length) {
      dispatch(add$3(attributeDataSources, filter));
    } // add to index


    dispatch(addIndex$1(filter, order, total, start, attributeDataSources, changedOn));
  };
} // ============ actions ============


var actionUpdateStore$2 = function actionUpdateStore(data) {
  return {
    type: commonActionTypes.DATA.ATTRIBUTE_DATA_SOURCES.UPDATE_STORE,
    data: data
  };
}; // ============ export ===========


var attributeDataSources$1 = {
  add: add$3,
  receiveIndexed: receiveIndexed$2,
  updateStore: actionUpdateStore$2
};

var actionTypes$3 = commonActionTypes.DATA.ATTRIBUTE_DATA; // ============ creators ===========

/**
 * It ensure adding index and adding or updating received data from BE.
 * Add data to state only when attributeData received, in case of empty attributeData it adds only index.
 * @param {Object} attributeData Object received from BE contains under attributeDataKey object of data attributes [id]: [value].
 * @param {Object} spatialData Object received from BE contains under spatialDataKey object of data attributes [id]: {data, spatialIndex}.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Array?} order
 * @param {string?} changedOn
 */

var receiveIndexed$3 = function receiveIndexed(attributeData, spatialData, attributeDataFilter, order, changedOn) {
  return function (dispatch) {
    if (!_isEmpty2(attributeData)) {
      dispatch(addDataAndIndexBasedOnSpatialData(attributeDataFilter, order, attributeData, spatialData, changedOn));
    } else {
      // add to index
      dispatch(createAndAddIndexBasedOnSpatialData(attributeDataFilter, order, attributeData, spatialData, changedOn));
    }
  };
};
/**
 * Ensure adding index and adding or updating received data from BE.
 * @param {Object} attributeData
 * @param {Array} attributeData.index
 * @param {Object} attributeData.attributeData
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Array?} order
 * @param {Array?} start
 * @param {Array?} total
 * @param {string?} changedOn
 */


var receiveIndexedAttributeEndPoint = function receiveIndexedAttributeEndPoint(attributeData, attributeDataFilter, order, start, total, changedOn) {
  return addDataAndIndexAction(attributeDataFilter, order, total, start, attributeData.index, attributeData.attributeData, changedOn);
};
/**
 * Add data and index at the same time
 *
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Object} attributeData Object received from BE contains under attributeDataKey object of data attributes [id]: [value].
 * @param {Object} spatialData Object received from BE contains under spatialDataKey object of data attributes [id]: {data, spatialIndex}
 * @param order {Array}
 * @param changedOn {string}
 */


function addDataAndIndexBasedOnSpatialData(attributeDataFilter, order, attributeData, spatialData, changedOn) {
  return function (dispatch) {
    var indexData = getIndexDataBySpatialData(spatialData, attributeData);

    for (var _i = 0, _Object$keys = Object.keys(attributeData); _i < _Object$keys.length; _i++) {
      var attributeDataSourceKey = _Object$keys[_i];
      dispatch(addDataAndIndexBasedOnSpatialDataAction(attributeDataSourceKey, attributeData[attributeDataSourceKey], attributeDataFilter, order, [indexData], changedOn));
    }
  };
}
/**
 * Create and add index for given attribute data based on related spatial data index.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Array?} order
 * @param {Object} attributeData Object received from BE contains under attributeDataKey object of data attributes [id]: [value].
 * @param {Object} spatialData Object received from BE contains under spatialDataKey object of data attributes [id]: {data, spatialIndex}. SpatialData indexes are used as a templete for attribute data indexes.
 * @param {*} changedOn
 */


function createAndAddIndexBasedOnSpatialData(attributeDataFilter, order, attributeData, spatialData, changedOn) {
  var indexByLevelByTileByDataSourceKey = getIndexDataBySpatialData(spatialData, attributeData);
  return addIndexActionWithSpatialIndex(attributeDataFilter, order, [indexByLevelByTileByDataSourceKey], changedOn);
}
/**
 * Create new index based on given level and tiles with loading indicator.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Array?} order
 * @param {Number} level
 * @param {Array.[Array]} tiles
 */


function addLoadingSpatialIndex(attributeDataFilter, order, level, tiles) {
  var changedOn = null; //create index with tiles value "true" that indicates loading state

  var loadingTiles = _reduce(tiles, function (acc, tile) {
    var tileId = tileAsString(tile);
    acc[tileId] = true;
    return acc;
  }, {});

  var index = _defineProperty({}, level, loadingTiles);

  return addIndexActionWithSpatialIndex(attributeDataFilter, order, [index], changedOn);
}
/**
 * Create new index based on pagination with loading indicator.
 * @param {Object} pagination
 * @param {Number} pagination.limit
 * @param {Number} pagination.offset
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Array?} order
 */


function addLoadingIndex$1(pagination, attributeDataFilter, order) {
  var changedOn = null; //Fake new data object for common action

  var data = _reduce(_toConsumableArray(Array(pagination.limit)), function (acc, val) {
    //Use key = true as a loading identificator
    return [].concat(_toConsumableArray(acc), [{
      key: true
    }]);
  }, []); // filter, order, data, start, count, changedOn


  return addIndexAction$1(attributeDataFilter, order, data, pagination.offset + 1, null, changedOn);
} // ============ helpers ============

/**
 * Get data for indexing
 * @param {Object} spatialData
 * @param {Object} attributeData
 * @return {Object}
 */


function getIndexDataBySpatialData(spatialData, attributeData) {
  var indexByLevelByTileByDataSourceKey = {}; //Attribute data indexes are stored in related spatial index
  //for all spatial data keys in spatialData

  for (var _i2 = 0, _Object$entries = Object.entries(spatialData); _i2 < _Object$entries.length; _i2++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2);
        _Object$entries$_i[0];
        var datasource = _Object$entries$_i[1];

    //for all levels in spatial data source
    for (var _i3 = 0, _Object$entries2 = Object.entries(datasource.spatialIndex); _i3 < _Object$entries2.length; _i3++) {
      var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i3], 2),
          level = _Object$entries2$_i[0],
          tiles = _Object$entries2$_i[1];

      if (!indexByLevelByTileByDataSourceKey[level]) {
        indexByLevelByTileByDataSourceKey[level] = {};
      } //for all tiles in tiles


      for (var _i4 = 0, _Object$entries3 = Object.entries(tiles); _i4 < _Object$entries3.length; _i4++) {
        var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i4], 2),
            tile = _Object$entries3$_i[0],
            tileData = _Object$entries3$_i[1];

        // If empty attributeData, then rewrite "loading" state.
        // or
        // Prepare empty tile for new data if tile does not exists.
        if (!indexByLevelByTileByDataSourceKey[level][tileAsString(tile)] || _isEmpty2(attributeData)) {
          indexByLevelByTileByDataSourceKey[level][tileAsString(tile)] = {};
        }

        if (!_isEmpty2(attributeData)) {
          var _loop = function _loop() {
            var _indexByLevelByTileBy, _indexByLevelByTileBy2;

            var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i5], 2),
                attributeDataSourceKey = _Object$entries4$_i[0],
                attributeDataSource = _Object$entries4$_i[1];

            // Save only tileData that are incuded in attribute data keys
            var indexes = tileData.filter(function (e) {
              return Object.keys(attributeDataSource).includes(e.toString());
            }); //Add to existing index

            if (indexByLevelByTileByDataSourceKey !== null && indexByLevelByTileByDataSourceKey !== void 0 && (_indexByLevelByTileBy = indexByLevelByTileByDataSourceKey[level]) !== null && _indexByLevelByTileBy !== void 0 && (_indexByLevelByTileBy2 = _indexByLevelByTileBy[tileAsString(tile)]) !== null && _indexByLevelByTileBy2 !== void 0 && _indexByLevelByTileBy2[attributeDataSourceKey]) {
              indexByLevelByTileByDataSourceKey[level][tileAsString(tile)][attributeDataSourceKey] = [].concat(_toConsumableArray(indexByLevelByTileByDataSourceKey[level][tileAsString(tile)][attributeDataSourceKey]), _toConsumableArray(indexes));
            } else {
              //Create new tile and insert dsKey index data
              indexByLevelByTileByDataSourceKey[level][tileAsString(tile)][attributeDataSourceKey] = indexes;
            }
          };

          //for all attribute data source keys in attributeData
          for (var _i5 = 0, _Object$entries4 = Object.entries(attributeData); _i5 < _Object$entries4.length; _i5++) {
            _loop();
          }
        }
      }
    }
  }

  return indexByLevelByTileByDataSourceKey;
} // ============ actions ============


function removeSpatialIndexAction(filter, order) {
  return {
    type: actionTypes$3.SPATIAL_INDEX.REMOVE,
    filter: filter,
    order: order
  };
}
/**
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Array?} order
 * @param {Number} total
 * @param {Number} start
 * @param {Array} index
 * @param {Object} data
 * @param {string?} changedOn
 */


function addDataAndIndexBasedOnSpatialDataAction(attributeDataSourceKey, data, attributeDataFilter, order, indexData, changedOn) {
  return {
    type: actionTypes$3.ADD_WITH_SPATIAL_INDEX,
    attributeDataSourceKey: attributeDataSourceKey,
    data: data,
    filter: attributeDataFilter,
    order: order,
    indexData: indexData,
    changedOn: changedOn
  };
}
/**
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Array?} order
 * @param {Number} total
 * @param {Number} start
 * @param {Array} index
 * @param {Object} data
 * @param {string?} changedOn
 */


function addDataAndIndexAction(attributeDataFilter, order, total, start, index, data, changedOn) {
  return {
    type: actionTypes$3.ADD_WITH_INDEX,
    filter: attributeDataFilter,
    order: order,
    total: total,
    start: start,
    index: index,
    data: data,
    changedOn: changedOn
  };
}

function addIndexActionWithSpatialIndex(attributeDataFilter, order, index, changedOn) {
  return {
    type: actionTypes$3.SPATIAL_INDEX.ADD,
    filter: attributeDataFilter,
    order: order,
    indexData: index,
    changedOn: changedOn
  };
}
/**
 *
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {*} order
 * @param {*} data
 * @param {*} start
 * @param {*} count
 * @param {*} changedOn
 * @returns
 */


function addIndexAction$1(attributeDataFilter, order, data, start, count, changedOn) {
  return {
    type: actionTypes$3.INDEX.ADD,
    filter: attributeDataFilter,
    order: order,
    data: data,
    start: start,
    count: count,
    changedOn: changedOn
  };
}

function actionUpdateStore$3(data) {
  return {
    type: actionTypes$3.UPDATE_STORE,
    data: data
  };
} // ============ export ===========


var attributeData$1 = {
  addLoadingIndex: addLoadingIndex$1,
  addLoadingSpatialIndex: addLoadingSpatialIndex,
  getIndexDataBySpatialData: getIndexDataBySpatialData,
  receiveIndexed: receiveIndexed$3,
  receiveIndexedAttributeEndPoint: receiveIndexedAttributeEndPoint,
  removeSpatialIndex: removeSpatialIndexAction,
  updateStore: actionUpdateStore$3 //do we use it?

};

/**
 *
 * @param {Number} [count] Optional size of data on BE. Usually known after request on BE.
 * @param {Number} PAGE_SIZE Size of pagesize
 * @param {Number} [optStart]  Optional start, if not set, default value 1 is used.
 * @param {Number} [optLength] Optional length of requested data. If set, then last page will not overfloat requested data.
 * @return {Array.<Number>}
 */

function getRestPages(count, PAGE_SIZE) {
  var optStart = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var optLength = arguments.length > 3 ? arguments[3] : undefined;
  optStart = _isNumber(optStart) ? optStart : 1;

  if (_isNumber(count) && (count === 0 || optStart > count)) {
    return [];
  } else {
    var wanted;

    if (_isNumber(count)) {
      wanted = count - optStart + 1; // Request specific number of results

      if (_isNumber(optLength)) {
        if (optStart + optLength - 1 > count) {
          wanted = count - optStart + 1;
        } else {
          wanted = optLength;
        }
      }
    } else {
      // Request specific number of results
      if (_isNumber(optLength)) {
        wanted = optLength;
      } else {
        wanted = PAGE_SIZE;
      }
    }

    var startIndex = optStart; //1

    var endIndex = optStart + wanted; //101

    var lastPageIndex = Math.ceil((endIndex - startIndex) / PAGE_SIZE);

    var pages = _toConsumableArray(Array(lastPageIndex)).map(function (_, i) {
      return i;
    });

    return pages;
  }
}
/**
 *
 * @param {Number} pageIndex Page index based on count, PAGE_SIZE, start and length
 * @param {Number} [optStart]  Optional start, if not set, default value 1 is used.
 * @param {Number} pageSize Size of pagesize
 * @param {Number} [optLength] Optional length of requested data. If set, then last page will not overfloat requested data.
 * @param {Number} [optCount] Optional size of data on BE. Usually known after request on BE.
 * @return {Object} {offset:Number, limint: Number}
 */

function getPagination(pageIndex) {
  var optStart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var pageSize = arguments.length > 2 ? arguments[2] : undefined;
  var optLength = arguments.length > 3 ? arguments[3] : undefined;
  var optCount = arguments.length > 4 ? arguments[4] : undefined;
  optStart = _isNumber(optStart) ? optStart : 1;
  var limit = pageSize;

  if (_isNumber(optLength) && pageIndex * pageSize + pageSize > optLength) {
    limit = Math.max(0, optLength - pageIndex * pageSize);
  }

  if (_isNumber(optCount) && optStart + pageIndex * pageSize + limit - 1 > optCount) {
    limit = Math.max(0, optCount - (optStart + pageIndex * pageSize - 1));
  }

  return {
    offset: Math.max(0, optStart + pageIndex * pageSize - 1),
    limit: limit
  };
}
/**
 * Get empty pagination
 * @return {Object} {offset:Number, limint: Number
 */

function getNullishPagination() {
  return getPagination(0, 1, 0, 0);
}
/**
 * Find loaded or loading pages
 * @param {Object} dataIndex Index with loaded or loading data
 * @param {Number} [optStart] Optional start, if not set, default value 1 is used.
 * @param {Number} pageSize Size of pagesize
 * @param {Array.<Number>} pages Which pages asking for
 * @param {Number} [optCount] Optional size of data on BE. Usually known after request on BE.
 * @param {Number} [optLength] Optional length of requested data. If set, then last page will not overfloat requested data.
 * @return {Array} Array of page indexex that are loaded of loading
 */

function getLoadedPages() {
  var dataIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var optStart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var pageSize = arguments.length > 2 ? arguments[2] : undefined;
  var pages = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var optCount = arguments.length > 4 ? arguments[4] : undefined;
  var optLength = arguments.length > 5 ? arguments[5] : undefined;
  optStart = _isNumber(optStart) ? optStart : 1;
  var loadedPages = [];
  pages.forEach(function (pageIndex) {
    var itemsOnPage = 0;

    if (_isNumber(optCount)) {
      if (_isNumber(optLength) && pageSize * (pageIndex + 1) > optLength) {
        itemsOnPage = optLength - pageSize * pageIndex;

        if (optStart + itemsOnPage > optCount) {
          itemsOnPage = optCount - (optStart + pageSize * (pageIndex + 1) - pageSize) + 1;
        }
      } else if (optStart + pageSize * (pageIndex + 1) > optCount) {
        itemsOnPage = optCount - (optStart + pageSize * (pageIndex + 1) - pageSize) + 1;
      } else {
        itemsOnPage = pageSize;
      }
    } else {
      if (_isNumber(optLength) && pageSize * (pageIndex + 1) > optLength) {
        itemsOnPage = optLength - pageSize * pageIndex;
      } else {
        itemsOnPage = pageSize;
      }
    }

    var requestedDataIndexes = _toConsumableArray(Array(itemsOnPage)).map(function (_, i) {
      return optStart + pageSize * pageIndex + i;
    });

    var hasPage = requestedDataIndexes.every(function (index) {
      return dataIndex.hasOwnProperty(index);
    });

    if (hasPage) {
      loadedPages.push(pageIndex);
    }
  });
  return loadedPages;
}
/**
 * Determinate requested pages and which pages are alredy loaded or loading. Return difference between requested an loaded pages.
 * @param {Object} [optDataIndex]
 * @param {Number} pageSize Size of pagesize
 * @param {Number} [optStart] Optional start.
 * @param {Number} [optLength] Optional length of requested data.
 */

function getMissingPages(optDataIndex, pageSize, optStart, optLength) {
  var count = (optDataIndex === null || optDataIndex === void 0 ? void 0 : optDataIndex.count) || null;
  var restPages = getRestPages(count, pageSize, optStart, optLength);
  var loadedPages = getLoadedPages(optDataIndex === null || optDataIndex === void 0 ? void 0 : optDataIndex.index, optStart, pageSize, restPages, count, optLength);

  var missingPages = _difference(restPages, loadedPages);

  return missingPages;
}

var DEFAULT_PAGE_PAGINATION = {
  offset: 0,
  limit: configDefaults.requestPageSize
};
/**
 * Update whole data.components.components object with given components
 * @param components {Object}
 */

function updateComponentsStateFromView(components) {
  return function (dispatch) {
    if (components) {
      dispatch(actionUpdateComponents(components));
    }
  };
}

function updateComponent(componentKey, update) {
  return function (dispatch, getState) {
    var state = getState();
    var componentState = Select.data.components.getComponentStateByKey(state, componentKey);
    dispatch(actionUpdateComponents(_defineProperty({}, componentKey, _objectSpread2(_objectSpread2({}, componentState), update))));
  };
}
/**
 * Ensure load attribute data and relations.
 * Useful if no indexes are registered for relations and attribute data.
 * Function has two phases, it loads data and relations in first and determinate and loads what is missing in second phase.
 * @param {String} componentKey Related component
 * @param {Array?} order Order object for attributes
 * @param {Object} commonFilter Common filter object used as a relationsFilter and used in attributeDataFilter.
 * @param {Object} attributeDataFilterExtension Object contains values for extend commonFilter to create attributeDataFilter.
 * @param {Number} start Position of first asked item after ordered.
 * @param {Number} length How many attribute data asking for.
 * @param {Number} PAGE_SIZE How many attribute data items will be in one request.
 * @param {Boolean} loadRelations Whether to load relations.
 * @param {Boolean} loadData Whether to load attribute data.
 * @param {Object} attributePagination Paginations for attributes {offset: Number, limit: Number}
 * @param {Object} relationsPagination Paginations for relations {offset: Number, limit: Number}
 * @return {function}
 */


function ensureDataAndRelations(componentKey, order, commonFilter, attributeDataFilterExtension, start, length, PAGE_SIZE, loadRelations, loadData, attributePagination, relationsPagination) {
  return function (dispatch, getState) {
    var state = getState();
    setState(state);
    var localConfig = Select.app.getCompleteLocalConfiguration(state);
    var PAGE_SIZE = getPageSize(localConfig);
    var RELATIONS_PAGE_SIZE = getPageSize(localConfig);
    return dispatch(loadIndexedPage$1(order, commonFilter, attributeDataFilterExtension, !!loadRelations, loadData, relationsPagination, attributePagination)).then(function (response) {
      if (response instanceof Error) {
        return;
      }

      setState(getState());
      var attributeDataIndex = Select.data.components.getIndexForAttributeDataByComponentKey(componentKey) || [];

      var relationsFilter = _objectSpread2({}, commonFilter);

      var attributeRelationsIndex = Select.data.attributeRelations.getIndex(getState(), relationsFilter) || [];
      var missingAttributesPages = getMissingPages(attributeDataIndex, PAGE_SIZE, start, length);
      var missingRelationsPages = getMissingPages(attributeRelationsIndex, RELATIONS_PAGE_SIZE, 1, null);

      if (missingRelationsPages.length === 0 && missingAttributesPages.length === 0) {
        //nothing to load
        return;
      } else {
        //needs to load more relations or data
        return dispatch(loadMissingRelationsAndData(componentKey, order, commonFilter, attributeDataFilterExtension, missingRelationsPages, missingAttributesPages, start, length, PAGE_SIZE));
      }
    });
  };
}
/**
 * Helper function. Usually second step in requesting data.
 * Load all relations and attributeData based on its remaining page counts.
 * @param {String} componentKey
 * @param {Array?} order Order object for attributes
 * @param {Object} commonFilter Common filter object used as a relationsFilter and used in attributeDataFilter.
 * @param {Object} attributeDataFilterExtension Object contains values for extend commonFilter to create attributeDataFilter.
 * @param {Array} remainingRelationsPages Missing page indexes of ralations defined in array. [0,1,2,3] || [2,5]
 * @param {Array} remainingAttributeDataPages Missing page indexes of attributes defined in array. [0,1,2,3] || [2,5]
 * @param {Array} start Starting position of first requested item. Defualt is 1.
 * @param {Array} length Length of asked attributeData
 * @param {Number} PAGE_SIZE How many attribute data items will be in one request.
 * @return {function} Return promise.
 */


function loadMissingRelationsAndData(componentKey, order, commonFilter, attributeDataFilterExtension, remainingRelationsPages, remainingAttributeDataPages, start, length, PAGE_SIZE) {
  return function (dispatch, getState) {
    var state = getState();
    setState(state);
    var localConfig = Select.app.getCompleteLocalConfiguration(state);
    var RELATIONS_PAGE_SIZE = getPageSize(localConfig);
    var promises = [];
    var attributeDataIndex = Select.data.components.getIndexForAttributeDataByComponentKey(componentKey) || {};
    var attributeCount = attributeDataIndex.count; // load remaining relations pages

    var pagination = 0;
    var loadRelations = true;

    for (var i = 1; i <= remainingRelationsPages.length; i++) {
      var relationsPagination = getPagination(remainingRelationsPages[i - 1], 1, RELATIONS_PAGE_SIZE); //only if missing attribute data pages missing

      var attributePagination = getNullishPagination();
      var loadData = false;

      if (pagination < remainingAttributeDataPages.length) {
        attributePagination = getPagination(remainingAttributeDataPages[i - 1], start, PAGE_SIZE, length, attributeCount);
        loadData = true;
        pagination = i;
      }

      promises.push(dispatch(loadIndexedPage$1(order, commonFilter, attributeDataFilterExtension, loadRelations, loadData, relationsPagination, //pagination for relations
      attributePagination //pagination for data is same like for relations here
      )));
    } // If its still needed, load remaining data pages


    for (var _i = pagination + 1; _i <= remainingAttributeDataPages.length; _i++) {
      var _relationsPagination = getNullishPagination();

      var _attributePagination = getPagination(remainingAttributeDataPages[_i - 1], start, PAGE_SIZE, length, attributeCount);

      var _loadRelations = false;
      var _loadData = true;
      promises.push(dispatch(loadIndexedPage$1(order, commonFilter, attributeDataFilterExtension, _loadRelations, _loadData, _relationsPagination, _attributePagination)));
    }

    return Promise.all(promises);
  };
}
/**
 * Check if for given componentKey missing data or relations and load them.
 * @param {String} componentKey
 */


var ensure = function ensure(componentKey) {
  return function (dispatch, getState) {
    var state = getState();
    setState(state);
    var componentState = Select.data.components.getComponentStateByKey(state, componentKey);

    if (componentState) {
      var _componentState$attri = componentState.attributeOrder,
          order = _componentState$attri === void 0 ? null : _componentState$attri,
          _componentState$start = componentState.start,
          start = _componentState$start === void 0 ? 1 : _componentState$start,
          length = componentState.length;
      var attributeDataFilterExtension = Select.data.components.getAttributeDataFilterExtensionByComponentKey(componentKey);
      var commonFilter = Select.data.components.getCommonFilterByComponentKey(componentKey);

      var relationsFilter = _objectSpread2({}, commonFilter);

      var attributeDataIndex = Select.data.components.getIndexForAttributeDataByComponentKey(componentKey) || [];
      var attributeRelationsIndex = Select.data.attributeRelations.getIndex(state, relationsFilter) || [];
      var loadRelations = true;
      var loadData = true;
      var localConfig = Select.app.getCompleteLocalConfiguration(state);
      var RELATIONS_PAGE_SIZE = getPageSize(localConfig); // Attribute data page size is same like app page size
      // In case of need PAGE_SIZE could be modified here

      var PAGE_SIZE = RELATIONS_PAGE_SIZE;
      var relationsPagination = getPagination(0, 1, RELATIONS_PAGE_SIZE);
      var attributePagination = getPagination(0, start, PAGE_SIZE, length);
      var missingRelationsPages, missingAttributesPages; // Relations index exist
      // find if all required relations are loaded

      if (!_isEmpty2(attributeDataIndex)) {
        missingRelationsPages = getMissingPages(attributeRelationsIndex, RELATIONS_PAGE_SIZE, 1, null);
        relationsPagination = getPagination(missingRelationsPages[0] || 0, 0, RELATIONS_PAGE_SIZE);

        if (missingRelationsPages.length > 0) {
          loadRelations = true;
        } else {
          loadRelations = false;
        }
      } // Attribute data index exist
      // find if all required data are loaded


      if (!_isEmpty2(attributeDataIndex)) {
        missingAttributesPages = getMissingPages(attributeDataIndex, PAGE_SIZE, start, length);
        attributePagination = getPagination(missingAttributesPages[0] || 0, start, PAGE_SIZE, length, attributeDataIndex.count);

        if (missingAttributesPages.length > 0) {
          loadData = true;
        } else {
          loadData = false;
        }
      } // Attribute and relation index is loaded. We know exactly which attribute or relations pages we need.


      if (!_isEmpty2(attributeDataIndex) && !_isEmpty2(attributeRelationsIndex)) {
        // Some of data or relations are needed
        if (loadData || loadRelations) {
          // Load just missing data and relations defined by missingPages
          return dispatch(loadMissingRelationsAndData(componentKey, order, commonFilter, attributeDataFilterExtension, missingRelationsPages, missingAttributesPages, start, length, PAGE_SIZE));
        } else {
          // All data are loaded
          return;
        } // Attribute or relations or both index is not loaded.

      } else {
        // Load relations and data
        return dispatch(ensureDataAndRelations(componentKey, order, commonFilter, attributeDataFilterExtension, start, length, PAGE_SIZE, loadRelations, loadData, attributePagination, relationsPagination));
      }
    }
  };
};

var ensureWithFilterByActive = function ensureWithFilterByActive(filterByActive) {
  return function (dispatch, getState) {
    var state = getState();
    var componentsInUse = Select.data.components.getAllComponentsInUse(state);

    if (componentsInUse.length) {
      componentsInUse.forEach(function (componentKey) {
        var fitsFilterByActive = Select.data.components.componentMatchesFilterByActive(state, componentKey, filterByActive);

        if (fitsFilterByActive) {
          dispatch(ensure(componentKey));
        }
      });
    }
  };
};
/**
 * Entry point for ensuring data for component
 * @param {string} componentKey
 */


var use = function use(componentKey) {
  return function (dispatch) {
    dispatch(componentUseRegister(componentKey));
    dispatch(ensure(componentKey));
  };
};
/**
 * Clear use of the component
 * @param componentKey {string}
 */


var componentUseClear = function componentUseClear(componentKey) {
  return function (dispatch, getState) {
    var registered = Select.data.components.isComponentInUse(getState(), componentKey);

    if (registered) {
      dispatch(actionComponentUseClear(componentKey));
    }
  };
};
/**
 * Register use of the component
 * @param componentKey {string}
 */


var componentUseRegister = function componentUseRegister(componentKey) {
  return function (dispatch, getState) {
    var alreadyRegistered = Select.data.components.isComponentInUse(getState(), componentKey);

    if (!alreadyRegistered) {
      dispatch(actionComponentUseRegister(componentKey));
    }
  };
};
/**
 * Compose payload for request from given parameters
 * @param {Object} commonFilter Common filter object used as a relationsFilter and used in attributeDataFilter.
 * @param {Object} relationsPagination Pagination for relations. Example `{relations: true, limit:100, offset:0}`.
 * @param {Object?} attributeDataPagination Pagination for attributeData. Example `{data: true, limit:100, offset:0}`.
 * @param {Object} attributeDataFilterExtension Object contains values for extend commonFilter to create attributeDataFilter.
 * @param {Array?} order Order object for attributes
 * @returns {Object}
 */


var getPayload = function getPayload(commonFilter, relationsPagination, attributeDataPagination, attributeDataFilterExtension, order) {
  var attributeFilter = attributeDataFilterExtension.attributeFilter,
      dataSourceKeys = attributeDataFilterExtension.dataSourceKeys,
      featureKeys = attributeDataFilterExtension.featureKeys,
      spatialFilter = attributeDataFilterExtension.spatialFilter;
  var layerTemplateKey = commonFilter.layerTemplateKey,
      areaTreeLevelKey = commonFilter.areaTreeLevelKey,
      attributeKeys = commonFilter.attributeKeys,
      modifiers = commonFilter.modifiers; // Create payload

  var payload = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({
    modifiers: modifiers
  }, layerTemplateKey && {
    layerTemplateKey: layerTemplateKey
  }), areaTreeLevelKey && {
    areaTreeLevelKey: areaTreeLevelKey
  }), attributeKeys && {
    attributeKeys: attributeKeys
  }), {}, {
    // pagination for relations (& data sources)
    // TODO add support for relations:false on BE
    // ...(loadRelations && {relations: usedRelationsPagination}),
    relations: relationsPagination,
    data: _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, attributeDataPagination && attributeDataPagination), attributeFilter && {
      attributeFilter: attributeFilter
    }), {}, {
      attributeOrder: order || null
    }, featureKeys && {
      featureKeys: featureKeys
    }), spatialFilter && {
      spatialFilter: spatialFilter
    }), dataSourceKeys && {
      dataSourceKeys: dataSourceKeys
    })
  });

  return payload;
};
/**
 * Process result into smaller actions that pass loaded data into store.
 * @param {Object} result Result from BE
 * @param {bool} loadRelations Wether BE should return relations
 * @param {Object} relationsFilter Filter object with modifiers
 * @param {Object?} relationsOrder Order object for relations
 * @param {Object} attributeDataFilter Object contains values extended by commonFilter.
 * @param {Array?} order Order object for attributes
 * @param {Number} relationsLimit Numeric limitation for loading relations
 * @returns
 */


var processResult = function processResult(result, loadRelations, relationsFilter, relationsOrder, attributeDataFilter, order, relationsLimit) {
  return function (dispatch) {
    if (result.attributeData || result.attributeRelationsDataSources) {
      if (loadRelations) {
        var changes = null;
        dispatch(attributeRelations$1.receiveIndexed(result.attributeRelationsDataSources.attributeRelations, relationsFilter, relationsOrder, result.attributeRelationsDataSources.offset + 1, result.attributeRelationsDataSources.total, changes, relationsLimit));
      }

      if (result.attributeData.attributeData) {
        var _changes = null;
        dispatch(attributeData$1.receiveIndexedAttributeEndPoint(result.attributeData, attributeDataFilter, order, result.attributeData.offset + 1, result.attributeData.total, _changes));
      }
    }
  };
};
/**
 *
 * @param {Array?} order Order object for attributes
 * @param {Object} commonFilter Common filter object used as a relationsFilter and used in attributeDataFilter.
 * @param {Object} attributeDataFilterExtension Object contains values for extend commonFilter to create attributeDataFilter.
 * @param {bool} loadRelations Whether response should contain relations
 * @param {bool} loadData Whether response should contain data
 * @param {Object?} relationsPagination Pagination for relations.
 * @param {Object?} attributeDataPagination Pagination for attributeData.
 */


function loadIndexedPage$1(order, commonFilter, attributeDataFilterExtension, loadRelations, loadData, relationsPagination, attributeDataPagination) {
  return function (dispatch, getState) {
    var localConfig = Select.app.getCompleteLocalConfiguration(getState());
    var apiPath = 'rest/attributeData/filtered';
    var relationsOrder = null;

    var relationsFilter = _objectSpread2({}, commonFilter);

    var attributeDataFilter = _objectSpread2(_objectSpread2({}, commonFilter), attributeDataFilterExtension);

    var usedRelationsPagination = relationsPagination ? _objectSpread2({}, relationsPagination) : DEFAULT_PAGE_PAGINATION;

    if (loadRelations) {
      usedRelationsPagination.relations = true; //set relations loading

      dispatch(attributeRelations$1.addLoadingIndex(usedRelationsPagination, relationsFilter, relationsOrder));
    } else {
      usedRelationsPagination.relations = false;
    }

    var usedAttributeDataPagination = attributeDataPagination ? _objectSpread2({}, attributeDataPagination) : DEFAULT_PAGE_PAGINATION;

    if (loadData) {
      usedAttributeDataPagination.data = true; //set attributeData loading

      dispatch(attributeData$1.addLoadingIndex(usedAttributeDataPagination, attributeDataFilter, order));
    } else {
      usedAttributeDataPagination.data = false;
    }

    var payload = getPayload(commonFilter, usedRelationsPagination, usedAttributeDataPagination, attributeDataFilterExtension, order);
    return request(localConfig, apiPath, 'POST', null, payload, undefined, null).then(function (result) {
      if (result.errors) {
        throw new Error(result.errors[dataType] || 'no data');
      } else {
        if (result.attributeData || result.attributeRelationsDataSources) {
          var relationsLimit = usedRelationsPagination.limit;
          dispatch(processResult(result, loadRelations, relationsFilter, relationsOrder, attributeDataFilter, order, relationsLimit));
          return result;
        } else {
          var error = new Error('no data');
          dispatch(commonActions.actionGeneralError(error));
          return error;
        }
      }
    })["catch"](function (error) {
      dispatch(commonActions.actionGeneralError(error));
      return error; //todo do we need to return this
    });
  };
} // Actions ------------------------------------------------------------------------------------------------------------

/**
 *
 * @param componentKey {string}
 * @param attributeKeys {Array}
 * @returns
 */


var actionSetAttributeKeys = function actionSetAttributeKeys(componentKey, attributeKeys) {
  return {
    type: commonActionTypes.DATA.COMPONENTS.COMPONENT.SET.ATTRIBUTE_KEYS,
    componentKey: componentKey,
    attributeKeys: attributeKeys
  };
};

var actionUpdateComponents = function actionUpdateComponents(components) {
  return {
    type: commonActionTypes.DATA.COMPONENTS.UPDATE_COMPONENTS,
    components: components
  };
};

var actionComponentUseClear = function actionComponentUseClear(componentKey) {
  return {
    type: commonActionTypes.DATA.COMPONENTS.COMPONENT.USE.CLEAR,
    componentKey: componentKey
  };
};

var actionComponentUseRegister = function actionComponentUseRegister(componentKey) {
  return {
    type: commonActionTypes.DATA.COMPONENTS.COMPONENT.USE.REGISTER,
    componentKey: componentKey
  };
};

var DataComponentsActions = {
  componentUseClear: componentUseClear,
  componentUseRegister: componentUseRegister,
  ensure: ensure,
  ensureDataAndRelations: ensureDataAndRelations,
  ensureWithFilterByActive: ensureWithFilterByActive,
  getPayload: getPayload,
  loadIndexedPage: loadIndexedPage$1,
  loadMissingRelationsAndData: loadMissingRelationsAndData,
  processResult: processResult,
  setAttributeKeys: actionSetAttributeKeys,
  updateComponentsStateFromView: updateComponentsStateFromView,
  updateComponent: updateComponent,
  use: use
};

var actionTypes$4 = commonActionTypes.DATA.SPATIAL_RELATIONS;
var addIndex$2 = commonActions.addIndex(actionTypes$4);
var add$4 = commonActions.add(actionTypes$4); // ============ creators ===========

/**
 * It ensure adding index and adding received spatialRelations from BE.
 * Add relations to state only when spatialRelations received, in case of empty spatialRelations it adds only index.
 * @param {Object} spatialRelations Object received from BE.
 * @param {Object} filter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Array?} order
 * @param {Number} start
 * @param {Number} total
 * @param {string?} changedOn
 */

function receiveIndexed$4(spatialRelations, filter, order, start, total, changes) {
  return function (dispatch) {
    // add spatialRelations to store
    // There should be check if relation is already in the store.
    if (spatialRelations.length) {
      dispatch(add$4(spatialRelations, filter));
    } // add to index


    dispatch(addIndex$2(filter, order, total, start, spatialRelations, changes));
  };
} // ============ actions ============
// ============ export ===========


var spatialRelations$1 = {
  receiveIndexed: receiveIndexed$4
};

var actionTypes$5 = commonActionTypes.DATA.SPATIAL_DATA_SOURCES;
var addIndex$3 = commonActions.addIndex(actionTypes$5);
var add$5 = commonActions.add(actionTypes$5); // ============ creators ===========

/**
 * It ensure adding index and adding received spatialDataSources from BE.
 * Add dataSources to state only when spatialDataSources received, in case of empty spatialDataSources it adds only index.
 * @param {Object} spatialDataSources Object received from BE.
 * @param {Object} filter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Array?} order
 * @param {Number} start
 * @param {Number} total
 * @param {string?} changedOn
 */

function receiveIndexed$5(spatialDataSources, filter, order, start, total, changedOn) {
  return function (dispatch) {
    // add spatialDataSources to store
    // There should be check if spatialDataSources is already in the store.
    if (spatialDataSources.length) {
      dispatch(add$5(spatialDataSources, filter));
    } // add to index


    dispatch(addIndex$3(filter, order, total, start, spatialDataSources, changedOn));
  };
} // ============ actions ============
// ============ export ===========


var spatialDataSources$1 = {
  add: add$5,
  receiveIndexed: receiveIndexed$5
};

var actionTypes$6 = commonActionTypes.DATA.SPATIAL_DATA; // ============ creators ===========

/**
 * It ensure adding index and adding received data from BE.
 * Add data to state only when spatialData received, in case of empty spatialData it adds only index.
 * @param {Object} spatialData Object received from BE contains under spatialDataKey object of data attributes [id]: {data, spatialIndex}.
 * @param {Object} filter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Array?} order
 * @param {string?} changedOn
 */

var receiveIndexed$6 = function receiveIndexed(spatialData, filter, order, changedOn) {
  return function (dispatch) {
    if (spatialData && !_isEmpty2(spatialData)) {
      return dispatch(addDataAndIndex(spatialData, filter, order, changedOn));
    }
  };
};
/**
 * Add data and index at the same time
 * Add data, even if data are empty, for replacing loading indicator.
 * @param spatialDataAndIndexByDataSourceKey {Object} [dataSourceKey]: {data: Object, spatialIndex: Object}
 * @param filter {Object}
 * @param order {Array}
 * @param changedOn {string}
 */


function addDataAndIndex(spatialDataAndIndexByDataSourceKey, filter, order, changedOn) {
  return function (dispatch) {
    var indexByLevelByTileByDataSourceKey = getIndexData(spatialDataAndIndexByDataSourceKey); // spatialData should be only from one level

    var level = Object.keys(indexByLevelByTileByDataSourceKey)[0];
    var spatialDataByDataSourceKey = {};

    _forIn(spatialDataAndIndexByDataSourceKey, function (value, spatialDataSourceKey) {
      spatialDataByDataSourceKey[spatialDataSourceKey] = value.data;
    });

    dispatch(addDataAndIndexAction$1(spatialDataByDataSourceKey, level, filter, order, [indexByLevelByTileByDataSourceKey], changedOn));
  };
}
/**
 * Create new index based on given level and tiles with loading indicator.
 * @param {Object} filter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Array?} order
 * @param {Number} level
 * @param {Array.[Array]} tiles
 */


function addLoadingIndex$2(filter, order, level, tiles) {
  var changedOn = null; //create index with tiles value "true" that indicates loading state

  var loadingTiles = _reduce(tiles, function (acc, tile) {
    var tileId = tileAsString(tile);
    acc[tileId] = true;
    return acc;
  }, {});

  var index = _defineProperty({}, level, loadingTiles);

  return addIndexAction$2(filter, order, [index], changedOn);
} // ============ helpers ============

/**
 * Get data for indexing
 * @param spatialDataByDataSourceKey {Object} [dataSourceKey]: {data: Object, spatialIndex: Object}
 * @return {Object}
 */


function getIndexData(spatialDataByDataSourceKey) {
  var indexByLevelByTileByDataSourceKey = {};

  for (var _i = 0, _Object$entries = Object.entries(spatialDataByDataSourceKey); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        dsKey = _Object$entries$_i[0],
        datasource = _Object$entries$_i[1];

    for (var _i2 = 0, _Object$entries2 = Object.entries(datasource.spatialIndex); _i2 < _Object$entries2.length; _i2++) {
      var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
          level = _Object$entries2$_i[0],
          tiles = _Object$entries2$_i[1];

      if (!indexByLevelByTileByDataSourceKey[level]) {
        indexByLevelByTileByDataSourceKey[level] = {};
      }

      for (var _i3 = 0, _Object$entries3 = Object.entries(tiles); _i3 < _Object$entries3.length; _i3++) {
        var _indexByLevelByTileBy;

        var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),
            tile = _Object$entries3$_i[0],
            tileData = _Object$entries3$_i[1];

        //Add to existing index
        if (indexByLevelByTileByDataSourceKey !== null && indexByLevelByTileByDataSourceKey !== void 0 && (_indexByLevelByTileBy = indexByLevelByTileByDataSourceKey[level]) !== null && _indexByLevelByTileBy !== void 0 && _indexByLevelByTileBy[tileAsString(tile)]) {
          indexByLevelByTileByDataSourceKey[level][tileAsString(tile)] = _objectSpread2(_objectSpread2({}, indexByLevelByTileByDataSourceKey[level][tileAsString(tile)]), {}, _defineProperty({}, dsKey, tileData));
        } else {
          //Create new tile and insert dsKey index data
          indexByLevelByTileByDataSourceKey[level][tileAsString(tile)] = _defineProperty({}, dsKey, tileData);
        }
      }
    }
  }

  return indexByLevelByTileByDataSourceKey;
} // ============ actions ============


function removeIndexAction(filter, order) {
  return {
    type: actionTypes$6.INDEX.REMOVE,
    filter: filter,
    order: order
  };
}

function addDataAndIndexAction$1(dataByDataSourceKey, level, filter, order, indexData, changedOn) {
  return {
    type: actionTypes$6.ADD_WITH_INDEX,
    dataByDataSourceKey: dataByDataSourceKey,
    level: level,
    filter: filter,
    order: order,
    indexData: indexData,
    changedOn: changedOn
  };
}

function addIndexAction$2(filter, order, index, changedOn) {
  return {
    type: actionTypes$6.INDEX.ADD,
    filter: filter,
    order: order,
    indexData: index,
    changedOn: changedOn
  };
} // ============ export ===========


var spatialData$1 = {
  addLoadingIndex: addLoadingIndex$2,
  getIndexData: getIndexData,
  //export for tests
  removeIndex: removeIndexAction,
  receiveIndexed: receiveIndexed$6
};

// Layer data types that supports vector tiling.
// Tiled vectors has spatial and attributes indexes with loading indication.
// TODO 'vector' is only temporary, remove it once it is modified on BE
var TILED_VECTOR_LAYER_TYPES = ['tiledVector', 'tiled-vector'];

var DEFAULT_RELATIONS_PAGE = {
  offset: 0,
  limit: configDefaults.requestPageSize
};
/**
 * Calculates how many page of relations is missing.
 * It assume that one page of size PAGE_SIZE was loaded.
 * @param {Number} attributeRelationsCount Wanted attributeRelations items
 * @param {Number} spatialRelationsCount Wanted spatialRelations items
 * @param {Number} PAGE_SIZE How many items fit to one page
 * @returns Number How many pages remaining
 */

var getRestRelationsPages = function getRestRelationsPages(attributeRelationsCount, spatialRelationsCount, PAGE_SIZE) {
  // What is higer to load? attributeRelations or spatialRelations
  var maxCountValue = Math.max(attributeRelationsCount, spatialRelationsCount);

  if (maxCountValue === 0) {
    return 0;
  } else {
    var remainingPageCount = Math.ceil((maxCountValue - PAGE_SIZE) / PAGE_SIZE);
    return remainingPageCount;
  }
};
/**
 * Helper function. Usually second step in requesting data.
 * Calculate if relations requests are missing based on attributeRelationsCount and spatialRelationsCount.
 * Each relations request loads one next tile from spatialFilter.
 * Rest tiles are loaded without relatiions.
 * @param {bool} loadGeometry Whether response should contain geometry
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @param {string?} styleKey UUID
 * @param {Array?} order
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Object} attributeRelationsFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Number} attributeRelationsCount Count of known attribute relations. Used for determinate further requests.
 * @param {Number} spatialRelationsCount Count of known spatial relations. Used for determinate further requests.
 * @param {Array} preloadedSpatialDataSources SpatialDataSources loaded by previous request.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @return {function} Return promise.
 */


function loadMissingRelationsAndData$1(loadGeometry, spatialFilter, styleKey, order, spatialRelationsFilter, attributeRelationsFilter, attributeRelationsCount, spatialRelationsCount) {
  var preloadedSpatialDataSources = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : [];
  var attributeDataFilter = arguments.length > 9 ? arguments[9] : undefined;
  return function (dispatch, getState) {
    var _spatialFilter$tiles;

    var localConfig = Select.app.getCompleteLocalConfiguration(getState());
    var PAGE_SIZE = getPageSize(localConfig);
    var promises = []; // load remaining relations pages
    // ignoring first page

    var remainingRelationsPageCount = getRestRelationsPages(attributeRelationsCount, spatialRelationsCount, PAGE_SIZE);
    var tilesPagination = 0;

    for (var i = 1; i <= remainingRelationsPageCount; i++) {
      //load only needed relations
      var loadAttributeRelations = attributeRelationsCount - i > 0;
      var loadSpatialRelations = spatialRelationsCount - i > 0;
      var relations = {
        offset: i * PAGE_SIZE,
        limit: PAGE_SIZE
      };
      tilesPagination = i;
      var spatialIndex = {
        tiles: [spatialFilter.tiles[tilesPagination]]
      };
      promises.push(dispatch(loadIndexedPage$2(styleKey, relations, spatialIndex, spatialFilter, loadGeometry, loadAttributeRelations, loadSpatialRelations, order, spatialRelationsFilter, attributeRelationsFilter, attributeDataFilter)));
    } //
    //load rest of tiles
    //


    var remainingTilesPageCount = (spatialFilter === null || spatialFilter === void 0 ? void 0 : (_spatialFilter$tiles = spatialFilter.tiles) === null || _spatialFilter$tiles === void 0 ? void 0 : _spatialFilter$tiles.length) || 0; //first tile was loaded before loadMissingRelationsAndData first request

    for (var _i = tilesPagination + 1; _i < remainingTilesPageCount; _i++) {
      var _spatialIndex = {
        tiles: [spatialFilter.tiles[_i]]
      };
      var _relations = {};
      var loadRestTilesRelations = false;
      promises.push(dispatch(loadIndexedPage$2(styleKey, _relations, _spatialIndex, spatialFilter, loadGeometry, loadRestTilesRelations, loadRestTilesRelations, order, spatialRelationsFilter, attributeRelationsFilter, attributeDataFilter)));
    }

    if (promises.length > 0) {
      return Promise.all(promises).then(function () {
        var response = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        // All relations are loaded at this moment.
        // Check if all spatialDataSources relations from response and preloadedSpatialDataSources are type of "unsupported" like raster/wms/wmts.
        // If all spatialDataSources are unsupported, then received data are empty and indexes needs to be removed.
        // If only some of spatialDataSources relations are unsupported, then loading status on index will be replaced by data.
        var spatialDataSourcesTypes = _flattenDeep(response.map(function (r) {
          var _r$spatialAttributeRe, _r$spatialAttributeRe2;

          return r === null || r === void 0 ? void 0 : (_r$spatialAttributeRe = r.spatialAttributeRelationsDataSources) === null || _r$spatialAttributeRe === void 0 ? void 0 : (_r$spatialAttributeRe2 = _r$spatialAttributeRe.spatialDataSources) === null || _r$spatialAttributeRe2 === void 0 ? void 0 : _r$spatialAttributeRe2.map(function (sds) {
            return {
              type: sds.data.type,
              key: sds.key
            };
          });
        }));

        var spatialDataSourcesPairs = [].concat(_toConsumableArray(spatialDataSourcesTypes), _toConsumableArray(preloadedSpatialDataSources)); //test spatialDataSources only if some come from BE

        var allSourcesAreUnsupported = !_isEmpty2(spatialDataSourcesPairs) ? spatialDataSourcesPairs.every(function (ds) {
          return !TILED_VECTOR_LAYER_TYPES.includes(ds.type);
        }) : false; // Check if all of returned spatialDataSources are unsupported type.
        // Indexes for unsupported layers can be cleared.

        if (allSourcesAreUnsupported) {
          // AttributeData and spatialData index represented by spatialRelationsFilter, attributeRelationsFilter and order can be deleted
          dispatch(spatialData$1.removeIndex(spatialRelationsFilter, order));
          dispatch(attributeData$1.removeSpatialIndex(attributeDataFilter, order));
        }
      });
    } else {
      return Promise.resolve();
    }
  };
}
/**
 * Ensure load missing attribute data and relations for tiles defined in spatialFilter that are not loaded or loading in state.
 *
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @param {string?} styleKey UUID
 * @param {Array?} order
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Object} attributeRelationsFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @return {function}
 */


function loadMissingAttributeData(spatialFilter, styleKey, order, spatialRelationsFilter, attributeRelationsFilter, attributeDataFilter) {
  return function (dispatch, getState) {
    // console.log("loadMissingAttributeData",spatialFilter);
    var state = getState();
    var localConfig = Select.app.getCompleteLocalConfiguration(state);
    var PAGE_SIZE = getPageSize(localConfig);
    var relations = {
      // start: 0,
      // length: 1000,
      offset: 0,
      limit: PAGE_SIZE
    }; //
    // which attribute data to load
    //
    //get attribute data index with loaded and loading data

    var attributeDataIndex = Select.data.attributeData.getIndex(state, 'spatialIndexes', attributeDataFilter, order) || []; //diff loaded attribute data from index with wanted spatial data

    var missingAttributeDataTiles = getMissingTiles(attributeDataIndex, spatialFilter) || []; // Load relations and data sources in first request if they are not already loaded.

    var attributeRelations = Select.data.attributeRelations.getIndex(state, attributeRelationsFilter, order);
    var attributeDataSources = Select.data.attributeDataSources.getIndex(state, attributeRelationsFilter, order);
    var loadAttributeRelationsAndDS = !(!_isEmpty2(attributeRelations) && !_isEmpty2(attributeDataSources)); //load only attribute data

    var loadGeometry = false; // Modified spatial filter with only missing attribute data tiles

    var spatialFilterWithMissingTiles = _objectSpread2(_objectSpread2({}, spatialFilter), {}, {
      tiles: missingAttributeDataTiles
    }); // Relations for given filters are missing


    if (loadAttributeRelationsAndDS) {
      // Only if spatialIndex is null then is set whole spatialFilter.tiles as loading true in one step
      var spatialIndex = null;
      var loadAttributeRelations = true;
      var loadSpatialRelations = false; // Load relations

      return dispatch(loadIndexedPage$2(styleKey, relations, spatialIndex, spatialFilterWithMissingTiles, loadGeometry, loadAttributeRelations, loadSpatialRelations, order, spatialRelationsFilter, attributeRelationsFilter, attributeDataFilter)).then(function (response) {
        var _response$spatialAttr;

        if (response instanceof Error) {
          return;
        }

        var spatialDataSources = (response === null || response === void 0 ? void 0 : (_response$spatialAttr = response.spatialAttributeRelationsDataSources) === null || _response$spatialAttr === void 0 ? void 0 : _response$spatialAttr.spatialDataSources) || [];
        var preloadSpatialDataSources = spatialDataSources.map(function (sds) {
          return {
            type: sds.data.type,
            key: sds.key
          };
        });
        var attributeRelationsCount = response.spatialAttributeRelationsDataSources.total.attributeRelations;
        var spatialRelationsCount = response.spatialAttributeRelationsDataSources.total.spatialRelations;
        return dispatch(loadMissingRelationsAndData$1(loadGeometry, spatialFilterWithMissingTiles, styleKey, order, spatialRelationsFilter, attributeRelationsFilter, attributeRelationsCount, spatialRelationsCount, preloadSpatialDataSources, attributeDataFilter));
      });
    } else {
      var promises = [];
      var _loadAttributeRelations = false;
      var _loadSpatialRelations = false;

      var _iterator = _createForOfIteratorHelper(missingAttributeDataTiles),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var tile = _step.value;
          var _spatialIndex2 = {
            tiles: [tile]
          };
          promises.push(dispatch(loadIndexedPage$2(styleKey, relations, _spatialIndex2, spatialFilter, loadGeometry, _loadAttributeRelations, _loadSpatialRelations, order, spatialRelationsFilter, attributeRelationsFilter, attributeDataFilter)));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return Promise.all(promises);
    }
  };
}
/**
 * Ensure load missing spatial data for tiles defined in spatialFilter that are not loaded or loading in state.
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @param {string?} styleKey UUID
 * @param {Array?} order
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Object} attributeRelationsFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @return {function}
 */


function loadMissingSpatialData(spatialFilter, styleKey, order, spatialRelationsFilter, attributeRelationsFilter, attributeDataFilter) {
  return function (dispatch, getState) {
    // console.log("loadMissingSpatialData",spatialFilter);
    //
    //which spatial data to load
    //
    //get spatial data index with loaded and loading data
    var spatialDataIndex = Select.data.spatialData.getIndex(getState(), spatialRelationsFilter, order) || []; //diff spatial data loaded/loading and to load

    var missingSpatialDataTiles = getMissingTiles(spatialDataIndex, spatialFilter) || [];
    var loadGeometry = true;
    dispatch(setLoading(attributeDataFilter, {
      tiles: missingSpatialDataTiles
    }, spatialFilter, spatialRelationsFilter, order, loadGeometry));
    var promises = [];

    var _iterator2 = _createForOfIteratorHelper(missingSpatialDataTiles),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var tile = _step2.value;
        var spatialIndex = {
          tiles: [tile]
        };
        var relations = {};
        var loadRelations = false;
        promises.push(dispatch(loadIndexedPage$2(styleKey, relations, spatialIndex, spatialFilter, loadGeometry, loadRelations, loadRelations, order, spatialRelationsFilter, attributeRelationsFilter, attributeDataFilter)));
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    return Promise.all(promises);
  };
}
/**
 * Ensure load spatial data, attribute data and relations for tiles defined in spatialFilter.
 * Makes load first page of data, if more date missing, pass filters to loadMissingRelationsAndData.
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @param {string?} styleKey UUID
 * @param {Array?} order
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Object} attributeRelationsFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @return {function}
 */


function ensureDataAndRelations$1(spatialFilter, styleKey, order, spatialRelationsFilter, attributeRelationsFilter, attributeDataFilter) {
  return function (dispatch, getState) {
    // console.log("ensureDataAndRelations", spatialFilter);
    var localConfig = Select.app.getCompleteLocalConfiguration(getState());
    var PAGE_SIZE = getPageSize(localConfig);
    var relations = {
      // start: 0,
      // length: 1000,
      offset: 0,
      limit: PAGE_SIZE
    };
    var loadGeometry = true;
    var loadAttributeRelations = true;
    var loadSpatialRelations = true;

    if (spatialFilter && !_isEmpty2(spatialFilter)) {
      // Only if spatialIndex is null then is set whole spatialFilter.tiles as loading true in one step
      var spatialIndex = null;
      return dispatch(loadIndexedPage$2(styleKey, relations, spatialIndex, spatialFilter, loadGeometry, loadAttributeRelations, loadSpatialRelations, order, spatialRelationsFilter, attributeRelationsFilter, attributeDataFilter)).then(function (response) {
        var _response$spatialAttr2;

        if (response instanceof Error) {
          return;
        }

        var attributeRelationsCount = response.spatialAttributeRelationsDataSources.total.attributeRelations;
        var spatialRelationsCount = response.spatialAttributeRelationsDataSources.total.spatialRelations;
        var restRelationsPages = getRestRelationsPages(attributeRelationsCount, spatialRelationsCount, PAGE_SIZE);
        var spatialDataSources = (response === null || response === void 0 ? void 0 : (_response$spatialAttr2 = response.spatialAttributeRelationsDataSources) === null || _response$spatialAttr2 === void 0 ? void 0 : _response$spatialAttr2.spatialDataSources) || []; //test spatialDataSources only if some come from BE

        var allSourcesAreUnsupported = spatialDataSources.every(function (ds) {
          var _ds$data;

          return !TILED_VECTOR_LAYER_TYPES.includes((_ds$data = ds.data) === null || _ds$data === void 0 ? void 0 : _ds$data.type);
        }) ; // Check if all of returned spatialDataSources are unsupported type.
        // If so, is no reason to make further requests.
        // Indexes for unsupported layers can be cleared.

        if (restRelationsPages === 0 && allSourcesAreUnsupported) {
          // AttributeData and spatialData index represented by spatialRelationsFilter, attributeRelationsFilter and order can be deleted
          dispatch(spatialData$1.removeIndex(spatialRelationsFilter, order));
          dispatch(attributeData$1.removeSpatialIndex(attributeDataFilter, order));
          return;
        } else {
          var preloadSpatialDataSources = spatialDataSources.map(function (sds) {
            return {
              type: sds.data.type,
              key: sds.key
            };
          });
          return dispatch(loadMissingRelationsAndData$1(loadGeometry, spatialFilter, styleKey, order, spatialRelationsFilter, attributeRelationsFilter, attributeRelationsCount, spatialRelationsCount, preloadSpatialDataSources, attributeDataFilter));
        }
      })["catch"](function (err) {
        if ((err === null || err === void 0 ? void 0 : err.message) === 'Index outdated') {
          dispatch(refreshIndex(getSubstate, dataType, filter, order, actionTypes, categoryPath));
        } else {
          throw new Error("data/actions#ensure: ".concat(err));
        }
      });
    } else {
      return dispatch(commonActions.actionGeneralError(new Error('Missing spatial filter')));
    }
  };
}
/**
 * Find out all tiles from spatialFilter without loaded attribute data
 * @param {Object} attributeDataIndex
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 */


var hasMissingAttributesData = function hasMissingAttributesData(attributeDataIndex, spatialFilter) {
  var missingAttributeDataTiles = getMissingTiles(attributeDataIndex, spatialFilter) || spatialFilter.tiles;
  return missingAttributeDataTiles && missingAttributeDataTiles.length && missingAttributeDataTiles.length > 0 ? true : false;
};
/**
 * Find out all tiles from spatialFilter without loaded attribute data
 * @param {Object} spatialDataIndex
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 */


var hasMissingSpatialData = function hasMissingSpatialData(spatialDataIndex, spatialFilter) {
  var missingSpatialDataTiles = getMissingTiles(spatialDataIndex, spatialFilter) || spatialFilter.tiles;
  return missingSpatialDataTiles && missingSpatialDataTiles.length && missingSpatialDataTiles.length > 0 ? true : false;
};
/**
 * It find out if for given spatialRelationsFilter exists relations index.
 * The Existence of index means it is loading or loaded or we can just find out missing data.
 * TODO - add support of areaTrees
 * TODO - add support of dataSourcesKeys
 * @param {Object} state App state object
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Array} order
 * @return {bool}
 */


var hasSpatialOrAreaRelations = function hasSpatialOrAreaRelations(state, spatialRelationsFilter, order) {
  var spatialRelationsIndex = null;
  var areaRelationsIndex = null;

  if (spatialRelationsFilter.layerTemplateKey) {
    spatialRelationsIndex = Select.data.spatialRelations.getIndex(state, spatialRelationsFilter, order);
  } // FIXME - add support for areaTreeLevels


  if (spatialRelationsFilter.areaTreeLevelKey) ;

  return spatialRelationsIndex !== null || areaRelationsIndex !== null;
};
/**
 * Entry function for requesting of loading new data. In first step are identified loaded indexes based on filters.
 * Next phase is request only data that are missing.
 * @param styleKey {string}
 * @param commonRelationsFilter {Object} Filter object with modifiers, layerTemplateKey or areaTreeLevelKey. It defines spatialRealations and after add styleKey is used as a attributeRelations filter.
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @param attributeDataFilterExtension {Object} Filter object with optional values for attributeFilter, dataSourceKeys and featureKeys. After merge with attributeRelationsFilter it defines filter for attributeData
 * @return {function}
 */


function ensure$1(styleKey, commonRelationsFilter, spatialFilter, attributeDataFilterExtension) {
  return function (dispatch, getState) {
    // Filter params - see Panther docs: Code/API/Data endpoint
    commonRelationsFilter.areaTreeLevelKey;
        commonRelationsFilter.layerTemplateKey;
    var spatialRelationsFilter = commonRelationsFilter;

    var attributeRelationsFilter = _objectSpread2(_objectSpread2({}, commonRelationsFilter), {}, {
      styleKey: styleKey
    });

    var attributeDataFilter = _objectSpread2(_objectSpread2({}, attributeRelationsFilter), attributeDataFilterExtension); // ensure string datatype for tiles in filter


    spatialFilter.tiles = spatialFilter.tiles.map(tileAsStringArray); // Order for spatialData if null at the moment

    var order = null;
    var spatialDataIndex = Select.data.spatialData.getIndex(getState(), spatialRelationsFilter, order) || [];
    var attributeDataIndex = Select.data.attributeData.getIndex(getState(), 'spatialIndexes', attributeDataFilter, order) || [];
    var missingAttributesData = hasMissingAttributesData(attributeDataIndex, spatialFilter);
    var missingSpatialData = hasMissingSpatialData(spatialDataIndex, spatialFilter);
    var filterHasSpatialOrAreaRelations = hasSpatialOrAreaRelations(getState(), spatialRelationsFilter, order);
    var loadRelationsAndData = !filterHasSpatialOrAreaRelations && missingSpatialData;

    var modifiedSpatialFilterForAttributes = _objectSpread2({}, spatialFilter);

    var modifiedSpatialFilterForSpatial = _objectSpread2({}, spatialFilter); // If spatial relations are loaded and spatial and attribute date are missing,
    // find which only attribute tile are missing and which attribute tiles load with spatial data.


    if (!loadRelationsAndData && missingAttributesData) {
      var missingAttributeDataTiles = getMissingTiles(attributeDataIndex, spatialFilter) || [];
      var missingSpatialDataTiles = getMissingTiles(spatialDataIndex, spatialFilter) || [];

      var missingAttributeDataTilesToLoad = _difference(missingAttributeDataTiles, missingSpatialDataTiles);

      var missingSpatialAndAttributeDataTiles = _intersection(missingAttributeDataTiles, missingSpatialDataTiles);

      modifiedSpatialFilterForAttributes.tiles = missingAttributeDataTilesToLoad;
      modifiedSpatialFilterForSpatial.tiles = missingSpatialAndAttributeDataTiles;
    }

    var promises = [];

    if (loadRelationsAndData) {
      promises.push(dispatch(ensureDataAndRelations$1(spatialFilter, styleKey, order, spatialRelationsFilter, attributeRelationsFilter, attributeDataFilter)));
    }

    if (filterHasSpatialOrAreaRelations && missingSpatialData && !_isEmpty2(modifiedSpatialFilterForSpatial.tiles)) {
      promises.push(dispatch(loadMissingSpatialData(modifiedSpatialFilterForSpatial, styleKey, order, spatialRelationsFilter, attributeRelationsFilter, attributeDataFilter)));
    }

    if (!loadRelationsAndData && !_isEmpty2(modifiedSpatialFilterForAttributes.tiles)) {
      promises.push(dispatch(loadMissingAttributeData(modifiedSpatialFilterForAttributes, styleKey, order, spatialRelationsFilter, attributeRelationsFilter, attributeDataFilter)));
    }

    return Promise.all(promises);
  };
}
/**
 * Save result data to related stores.
 * If data are presented, then save them to attributeRelations, attributeDataSources, attributeData, spatialRelations, spatialDataSources, spatialData.
 * @param {Object} result result data from backend data endpoind
 * @param {bool} loadGeometry Whether response should contain geometry
 * @param {bool} loadAttributeRelations Whether response should contain relations
 * @param {bool} loadSpatialRelations Whether response should contain relations
 * @param {Array?} order
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Object} attributeRelationsFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Object} start
 */


function processResult$1(result, loadGeometry, loadAttributeRelations, loadSpatialRelations, order, spatialRelationsFilter, attributeRelationsFilter, attributeDataFilter, start) {
  return function (dispatch, getState) {
    ////
    // Attributes
    ////
    if (!!loadAttributeRelations && result.spatialAttributeRelationsDataSources.attributeRelations && !_isEmpty2(result.spatialAttributeRelationsDataSources.attributeRelations)) {
      var changes = null;
      dispatch(attributeRelations$1.receiveIndexed(result.spatialAttributeRelationsDataSources.attributeRelations, attributeRelationsFilter, order, start, result.spatialAttributeRelationsDataSources.total.attributeRelations, changes));
    }

    if (!!loadAttributeRelations && result.spatialAttributeRelationsDataSources.attributeDataSources && !_isEmpty2(result.spatialAttributeRelationsDataSources.attributeDataSources)) {
      var _changes = null;
      dispatch(attributeDataSources$1.receiveIndexed(result.spatialAttributeRelationsDataSources.attributeDataSources, attributeRelationsFilter, order, start, result.spatialAttributeRelationsDataSources.total.attributeRelations, _changes));
    }

    if (result.spatialData && result.attributeData) {
      var _changes2 = null;
      dispatch(attributeData$1.receiveIndexed(result.attributeData, result.spatialData, attributeDataFilter, order, _changes2));
    } ////
    // Spatial data
    ////


    if (!!loadSpatialRelations && result.spatialAttributeRelationsDataSources.spatialRelations && !_isEmpty2(result.spatialAttributeRelationsDataSources.spatialRelations)) {
      var _changes3 = null;
      dispatch(spatialRelations$1.receiveIndexed(result.spatialAttributeRelationsDataSources.spatialRelations, spatialRelationsFilter, order, start, result.spatialAttributeRelationsDataSources.total.spatialRelations, _changes3));
    }

    if (!!loadSpatialRelations && result.spatialAttributeRelationsDataSources.spatialDataSources && !_isEmpty2(result.spatialAttributeRelationsDataSources.spatialDataSources)) {
      var _changes4 = null;
      dispatch(spatialDataSources$1.receiveIndexed(result.spatialAttributeRelationsDataSources.spatialDataSources, spatialRelationsFilter, order, start, result.spatialAttributeRelationsDataSources.total.spatialRelations, _changes4));
    }

    if (!!loadGeometry) {
      // Add data even if data are empty.
      // Override loading indicator in state index
      var _changes5 = null;
      dispatch(spatialData$1.receiveIndexed(result.spatialData, spatialRelationsFilter, order, _changes5));
    }
  };
}
/**
 * Create request payload for data endpoint
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {string?} styleKey
 * @param {Object?} relations Pagination for relations.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Object?} spatialIndex Object where under "tiles" key is array of tiles that should be loaded. Tiles are subset of tiles defined inspatilaFilter.
 * @param {bool} loadGeometry Whether response should contain geometry
 * @param {bool} loadAttributeRelations Whether response should contain relations
 * @param {bool} loadSpatialRelations Whether response should contain relations
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @returns
 */


function composeDataEndpointPayload(spatialRelationsFilter, styleKey, relations, attributeDataFilter, spatialIndex, loadGeometry, loadAttributeRelations, loadSpatialRelations, spatialFilter) {
  var _ref = spatialRelationsFilter || {},
      areaTreeLevelKey = _ref.areaTreeLevelKey,
      layerTemplateKey = _ref.layerTemplateKey,
      modifiers = _ref.modifiers; // Create payload


  var payload = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, modifiers && {
    modifiers: modifiers
  }), layerTemplateKey && {
    layerTemplateKey: layerTemplateKey
  }), areaTreeLevelKey && {
    areaTreeLevelKey: areaTreeLevelKey
  }), styleKey && {
    styleKey: styleKey
  }), {}, {
    // pagination for relations (& data sources)
    relations: _objectSpread2(_objectSpread2({}, relations), {}, {
      //should response contain attribute or spatial relations
      attribute: !!loadAttributeRelations,
      spatial: !!loadSpatialRelations
    }),
    data: _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, (attributeDataFilter === null || attributeDataFilter === void 0 ? void 0 : attributeDataFilter.featureKeys) && {
      featureKeys: attributeDataFilter.featureKeys
    }), spatialIndex && {
      spatialIndex: spatialIndex
    }), {}, {
      // extent
      spatialFilter: spatialFilter
    }, (attributeDataFilter === null || attributeDataFilter === void 0 ? void 0 : attributeDataFilter.attributeFilter) && {
      attributeFilter: attributeDataFilter.attributeFilter
    }), {}, {
      //request for geometry
      geometry: !!loadGeometry
    }, (attributeDataFilter === null || attributeDataFilter === void 0 ? void 0 : attributeDataFilter.dataSourceKeys) && {
      dataSourceKeys: attributeDataFilter.dataSourceKeys
    })
  });

  return payload;
}
/**
 * Set loading status to spatialData and attributeData stores to related indexes, level and tiles.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 * @param {Object?} spatialIndex Object where under "tiles" key is array of tiles that should be loaded. Tiles are subset of tiles defined inspatilaFilter.
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Array?} order
 * @param {bool} loadGeometry Whether response should contain geometry
 */


function setLoading(attributeDataFilter, spatialIndex, spatialFilter, spatialRelationsFilter, order, loadGeometry) {
  return function (dispatch, getState) {
    setState(getState());
    var loadingTilesGeometry = (spatialIndex === null || spatialIndex === void 0 ? void 0 : spatialIndex.tiles) || (spatialFilter === null || spatialFilter === void 0 ? void 0 : spatialFilter.tiles) || []; //get loading tiles

    var spatialTilesInNotLoadingState = _reduce(loadingTilesGeometry, function () {
      var acc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var tile = arguments.length > 1 ? arguments[1] : undefined;
      var loading = Select.data.spatialData.isTileLoading(spatialRelationsFilter, spatialFilter.level, tileAsString(tile));

      if (!loading) {
        return [].concat(_toConsumableArray(acc), [tileAsStringArray(tile)]);
      } else {
        return acc;
      }
    }, []);

    var attributesTilesInNotLoadingState = _reduce(loadingTilesGeometry, function () {
      var acc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var tile = arguments.length > 1 ? arguments[1] : undefined;
      var loading = Select.data.attributeData.isTileLoading(attributeDataFilter, spatialFilter.level, tileAsString(tile));

      if (!loading) {
        return [].concat(_toConsumableArray(acc), [tileAsStringArray(tile)]);
      } else {
        return acc;
      }
    }, []); ////
    // Spatial
    ////


    if (loadGeometry && spatialTilesInNotLoadingState.length > 0) {
      dispatch(spatialData$1.addLoadingIndex(spatialRelationsFilter, order, spatialFilter.level, spatialTilesInNotLoadingState));
    } ////
    // Attribute
    ////


    if (attributesTilesInNotLoadingState.length > 0) {
      dispatch(attributeData$1.addLoadingSpatialIndex(attributeDataFilter, order, spatialFilter.level, attributesTilesInNotLoadingState));
    }
  };
}
/**
 * Central method for executing requests to data endpoint.
 * @param {string?} styleKey
 * @param {Object?} relations Pagination for relations.
 * @param {Object?} spatialIndex Object where under "tiles" key is array of tiles that should be loaded. Tiles are subset of tiles defined inspatilaFilter.
 * @param {Object} spatialFilter Spatial defined filter of level and its tiles
 * @param {bool} loadGeometry Whether response should contain geometry
 * @param {bool} loadAttributeRelations Whether response should contain relations
 * @param {bool} loadSpatialRelations Whether response should contain relations
 * @param {Array?} order
 * @param {Object} spatialRelationsFilter Filler object contains modifiers and layerTemplateKey or areaTreeLevelKey.
 * @param {Object} attributeRelationsFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey and styleKey.
 * @param {Object} attributeDataFilter Filler object contains modifiers, layerTemplateKey or areaTreeLevelKey, styleKey, and optional values for attributeFilter, dataSourceKeys and featureKeys.
 */


function loadIndexedPage$2(styleKey, relations, spatialIndex, spatialFilter, loadGeometry, loadAttributeRelations, loadSpatialRelations, order) {
  var spatialRelationsFilter = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : {};
  var attributeRelationsFilter = arguments.length > 9 ? arguments[9] : undefined;
  var attributeDataFilter = arguments.length > 10 ? arguments[10] : undefined;
  return function (dispatch, getState) {
    var localConfig = Select.app.getCompleteLocalConfiguration(getState());
    var apiPath = 'rest/data/filtered'; //Register loading to related indexes and tiles

    dispatch(setLoading(attributeDataFilter, spatialIndex, spatialFilter, spatialRelationsFilter, order, loadGeometry));
    var usedRelations = relations ? _objectSpread2({}, relations) : DEFAULT_RELATIONS_PAGE;
    var payload = composeDataEndpointPayload(spatialRelationsFilter, styleKey, usedRelations, attributeDataFilter, spatialIndex, loadGeometry, loadAttributeRelations, loadSpatialRelations, spatialFilter);
    var start = usedRelations.offset + 1;
    return request(localConfig, apiPath, 'POST', null, payload, undefined, null).then(function (result) {
      if (result.errors) {
        var error = new Error(result.errors[dataType] || 'no data');
        dispatch(commonActions.actionGeneralError(error));
      } else {
        if (result.spatialAttributeRelationsDataSources && result.spatialData && result.attributeData) {
          dispatch(processResult$1(result, loadGeometry, loadAttributeRelations, loadSpatialRelations, order, spatialRelationsFilter, attributeRelationsFilter, attributeDataFilter, start));
          return result;
        } else {
          var _error = new Error('no data');

          dispatch(commonActions.actionGeneralError(_error));
          return _error;
        }
      }
    })["catch"](function (error) {
      dispatch(commonActions.actionGeneralError(error));
      return error; //todo do we need to return this
    });
  };
}

var Data$1 = {
  //export of sub actions
  attributeData: attributeData$1,
  attributeDataSources: attributeDataSources$1,
  attributeRelations: attributeRelations$1,
  components: DataComponentsActions,
  spatialData: spatialData$1,
  spatialDataSources: spatialDataSources$1,
  spatialRelations: spatialRelations$1,
  //export functions
  composeDataEndpointPayload: composeDataEndpointPayload,
  //tested
  ensure: ensure$1,
  ensureDataAndRelations: ensureDataAndRelations$1,
  getRestRelationsPages: getRestRelationsPages,
  //tested
  hasMissingAttributesData: hasMissingAttributesData,
  //tested
  hasMissingSpatialData: hasMissingSpatialData,
  //tested
  hasSpatialOrAreaRelations: hasSpatialOrAreaRelations,
  //tested
  loadIndexedPage: loadIndexedPage$2,
  //tested
  loadMissingAttributeData: loadMissingAttributeData,
  loadMissingRelationsAndData: loadMissingRelationsAndData$1,
  //tested
  loadMissingSpatialData: loadMissingSpatialData,
  processResult: processResult$1,
  //tested
  setLoading: setLoading //tested

};

var add$6 = commonActions.add(commonActionTypes.LAYER_TEMPLATES);
var create$3 = commonActions.create(Select.layerTemplates.getSubstate, 'layerTemplates', commonActionTypes.LAYER_TEMPLATES);
var deleteItem$3 = commonActions["delete"](Select.layerTemplates.getSubstate, 'layerTemplates', commonActionTypes.LAYER_TEMPLATES);
var saveEdited$3 = commonActions.saveEdited(Select.layerTemplates.getSubstate, 'layerTemplates', commonActionTypes.LAYER_TEMPLATES);
var setActiveKey$4 = commonActions.setActiveKey(commonActionTypes.LAYER_TEMPLATES);
var updateEdited$3 = commonActions.updateEdited(Select.layerTemplates.getSubstate, commonActionTypes.LAYER_TEMPLATES);
var useKeys$5 = commonActions.useKeys(Select.layerTemplates.getSubstate, 'layerTemplates', commonActionTypes.LAYER_TEMPLATES);
var useKeysClear$2 = commonActions.useKeysClear(commonActionTypes.LAYER_TEMPLATES);
var useIndexed$5 = commonActions.useIndexed(Select.layerTemplates.getSubstate, 'layerTemplates', commonActionTypes.LAYER_TEMPLATES);
var useIndexedClear$2 = commonActions.useIndexedClear(commonActionTypes.LAYER_TEMPLATES);
var clearIndex = commonActions.clearIndex(commonActionTypes.LAYER_TEMPLATES);

var setActiveKeyAndEnsureDependencies$3 = function setActiveKeyAndEnsureDependencies(key) {
  return function (dispatch, getState, options) {
    dispatch(setActiveKey$4(key));
    dispatch(options.ensureDependenciesOfActiveMetadataType('layerTemplate'));
  };
}; // ============ export ===========


var LayerTemplates$1 = {
  add: add$6,
  clearIndex: clearIndex,
  create: create$3,
  "delete": deleteItem$3,
  saveEdited: saveEdited$3,
  setActiveKey: setActiveKeyAndEnsureDependencies$3,
  updateEdited: updateEdited$3,
  useIndexed: useIndexed$5,
  useIndexedClear: useIndexedClear$2,
  useKeys: useKeys$5,
  useKeysClear: useKeysClear$2
};

var create$4 = commonActions.create(Select.layerTrees.getSubstate, 'layerTrees', commonActionTypes.LAYER_TREES, 'applications');
var deleteItem$4 = commonActions["delete"](Select.layerTrees.getSubstate, 'layerTrees', commonActionTypes.LAYER_TREES, 'applications');
var saveEdited$4 = commonActions.saveEdited(Select.layerTrees.getSubstate, 'layerTrees', commonActionTypes.LAYER_TREES, 'applications');
var updateEdited$4 = commonActions.updateEdited(Select.layerTrees.getSubstate, commonActionTypes.LAYER_TREES);
var useKeys$6 = commonActions.useKeys(Select.layerTrees.getSubstate, 'layerTrees', commonActionTypes.LAYER_TREES, 'applications');
var useKeysClear$3 = commonActions.useKeysClear(commonActionTypes.LAYER_TREES);
var useIndexedClear$3 = commonActions.useIndexedClear(commonActionTypes.LAYER_TREES);
var useIndexed$6 = commonActions.useIndexed(Select.layerTrees.getSubstate, 'layerTrees', commonActionTypes.LAYER_TREES, 'applications');
var refreshUses$5 = commonActions.refreshUses(Select.layerTrees.getSubstate, 'layerTrees', commonActionTypes.LAYER_TREES, 'applications');
var updateStateFromView$2 = commonActions.updateSubstateFromView(commonActionTypes.LAYER_TREES); // ============ actions ===========

function ensureData(filter, componentId) {
  return function (dispatch) {
    return dispatch(useIndexed$6(null, filter, null, 1, 100, componentId)).then();
  };
} // ============ export ===========


var LayerTrees$1 = {
  create: create$4,
  "delete": deleteItem$4,
  ensureData: ensureData,
  refreshUses: refreshUses$5,
  saveEdited: saveEdited$4,
  updateEdited: updateEdited$4,
  updateStateFromView: updateStateFromView$2,
  useIndexed: useIndexed$6,
  useIndexedClear: useIndexedClear$3,
  useKeys: useKeys$6,
  useKeysClear: useKeysClear$3
};

var add$7 = commonActions.add(commonActionTypes.STYLES);
var useIndexed$7 = commonActions.useIndexed(Select.styles.getSubstate, 'styles', commonActionTypes.STYLES);
var useKeys$7 = commonActions.useKeys(Select.styles.getSubstate, 'styles', commonActionTypes.STYLES);
var useKeysClear$4 = commonActions.useKeysClear(commonActionTypes.STYLES);
var updateStateFromView$3 = commonActions.updateSubstateFromView(commonActionTypes.STYLES); // ============ export ===========
// TODO - common?

var updateStateFromViewWithData = function updateStateFromViewWithData(view) {
  return function (dispatch, getState) {
    dispatch(updateStateFromView$3(view));

    if (view.data) {
      dispatch(add$7(view.data));
    }
  };
};

var Styles$1 = {
  add: add$7,
  useIndexed: useIndexed$7,
  useKeys: useKeys$7,
  useKeysClear: useKeysClear$4,
  updateStateFromView: updateStateFromView$3,
  updateStateFromViewWithData: updateStateFromViewWithData
};

var add$8 = commonActions.add(commonActionTypes.SELECTIONS);
var setActiveKey$5 = commonActions.setActiveKey(commonActionTypes.SELECTIONS);
var updateStateFromView$4 = commonActions.updateSubstateFromView(commonActionTypes.SELECTIONS);

var setActiveSelectionFeatureKeysFilterKeys = function setActiveSelectionFeatureKeysFilterKeys(selectionKeys) {
  return function (dispatch, getState) {
    var activeSelectionKey = Select.selections.getActiveKey(getState());

    if (activeSelectionKey && selectionKeys) {
      dispatch(setFeatureKeysFilterKeys(activeSelectionKey, selectionKeys));
    }
  };
};

var updateStateFromViewWithData$1 = function updateStateFromViewWithData(view) {
  return function (dispatch, getState) {
    dispatch(updateStateFromView$4(view));

    if (view.data) {
      dispatch(add$8(view.data));
    }
  };
}; // ============ actions ===========


function clearFeatureKeysFilter(key) {
  return {
    type: commonActionTypes.SELECTIONS.CLEAR.FEATURE_KEYS_FILTER,
    key: key
  };
}

function setFeatureKeysFilterKeys(key, featureKeys) {
  return {
    type: commonActionTypes.SELECTIONS.SET.FEATURE_KEYS_FILTER.KEYS,
    key: key,
    featureKeys: featureKeys
  };
}

var Selections$1 = {
  add: add$8,
  clearFeatureKeysFilter: clearFeatureKeysFilter,
  setActiveSelectionFeatureKeysFilterKeys: setActiveSelectionFeatureKeysFilterKeys,
  setActiveKey: setActiveKey$5,
  updateStateFromView: updateStateFromView$4,
  updateStateFromViewWithData: updateStateFromViewWithData$1
};

/* ==================================================
 * CREATORS
 * ================================================== */

/**
 * Clear use of the map set
 * @param mapSetKey {string}
 */

var mapSetUseClear = function mapSetUseClear(mapSetKey) {
  return function (dispatch, getState) {
    var registered = Select.maps.isMapSetInUse(getState(), mapSetKey);

    if (registered) {
      dispatch(actionMapSetUseClear(mapSetKey));
    }
  };
};
/**
 * Register use of the map set
 * @param mapSetKey {string}
 */


var mapSetUseRegister = function mapSetUseRegister(mapSetKey) {
  return function (dispatch, getState) {
    var alreadyRegistered = Select.maps.isMapSetInUse(getState(), mapSetKey);

    if (!alreadyRegistered) {
      dispatch(actionMapSetUseRegister(mapSetKey));
    }
  };
};
/**
 * Clear use of the map
 * @param mapKey {string}
 */


var mapUseClear = function mapUseClear(mapKey) {
  return function (dispatch, getState) {
    var registered = Select.maps.isMapInUse(getState(), mapKey);

    if (registered) {
      dispatch(actionMapUseClear(mapKey));
    }
  };
};
/**
 * Register use of the map
 * @param mapKey {string}
 */


var mapUseRegister = function mapUseRegister(mapKey) {
  return function (dispatch, getState) {
    var alreadyRegistered = Select.maps.isMapInUse(getState(), mapKey);

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


function use$1(mapKey, backgroundLayer, layers, mapWidth, mapHeight) {
  return function (dispatch, getState) {
    dispatch(mapUseRegister(mapKey));
    var state = getState();
    var spatialFilter = Select.maps.getSpatialFilterByMapKey(state, mapKey, mapWidth, mapHeight); //spatial filter is required for now

    if (!spatialFilter) {
      return;
    } // uncontrolled map - the map is not controlled from store, but layer data is collected based on stored metadata.


    if (backgroundLayer || layers) {
      layers = helpers.mergeBackgroundLayerWithLayers(layers, backgroundLayer);
    } // controlled map (with stateMapKey) - the map is completely controlled from store
    else {
        layers = Select.maps.getAllLayersStateByMapKey(state, mapKey);
      }

    if (layers) {
      layers.forEach(function (layer) {
        return (// apply layerUse asynchronous on each leyer
          // it cause better FPS and prevent long synchronous tasks
          setTimeout(function () {
            dispatch(layerUse(layer, spatialFilter));
          }, 0)
        );
      });
    }
  };
}
/**
 * @param layerState {Object} layer definition
 * @param spatialFilter {{level: number}, {tiles: Array}}
 */


function layerUse(layerState, spatialFilter) {
  return function (dispatch, getState) {
    var state = getState(); // modifiers defined by key

    var metadataDefinedByKey = layerState.metadataModifiers ? _objectSpread2({}, layerState.metadataModifiers) : {}; // add layerTemplate od areaTreeLevelKey

    if (layerState.layerTemplateKey) {
      metadataDefinedByKey.layerTemplateKey = layerState.layerTemplateKey; // TODO use layerTemplate here?
    } else if (layerState.areaTreeLevelKey) {
      metadataDefinedByKey.areaTreeLevelKey = layerState.areaTreeLevelKey; // TODO use areaTreeLevelKey here?
    } // Get actual metadata keys defined by filterByActive


    var activeMetadataKeys = layerState.filterByActive ? commonSelectors.getActiveKeysByFilterByActive(state, layerState.filterByActive) : null; // Merge metadata, metadata defined by key have priority

    var mergedMetadataKeys = commonHelpers.mergeMetadataKeys(metadataDefinedByKey, activeMetadataKeys); // Decouple modifiers from templates

    var areaTreeLevelKey = mergedMetadataKeys.areaTreeLevelKey,
        layerTemplateKey = mergedMetadataKeys.layerTemplateKey,
        modifiers = _objectWithoutProperties(mergedMetadataKeys, ["areaTreeLevelKey", "layerTemplateKey"]); // It converts modifiers from metadataKeys: ["A", "B"] to metadataKey: {in: ["A", "B"]}


    var modifiersForRequest = commonHelpers.convertModifiersToRequestFriendlyFormat(modifiers);

    if (layerTemplateKey || areaTreeLevelKey) {
      var _layerState$options, _layerState$options2, _layerState$options3;

      var commonRelationsFilter = {};

      if (areaTreeLevelKey) {
        commonRelationsFilter = _objectSpread2(_objectSpread2({}, modifiersForRequest && {
          modifiers: modifiersForRequest
        }), {}, {
          areaTreeLevelKey: areaTreeLevelKey
        });
      }

      if (layerTemplateKey) {
        commonRelationsFilter = _objectSpread2(_objectSpread2({}, modifiersForRequest && {
          modifiers: modifiersForRequest
        }), {}, {
          layerTemplateKey: layerTemplateKey
        });
      }

      if (layerTemplateKey) {
        var order = null;
        var spatialDataSources = Select.data.spatialDataSources.getIndexed(state, commonRelationsFilter, order);
        var sdsContainsVector = (spatialDataSources === null || spatialDataSources === void 0 ? void 0 : spatialDataSources.some(function (spatialDataSource) {
          var _spatialDataSource$da;

          return TILED_VECTOR_LAYER_TYPES.includes(spatialDataSource === null || spatialDataSource === void 0 ? void 0 : (_spatialDataSource$da = spatialDataSource.data) === null || _spatialDataSource$da === void 0 ? void 0 : _spatialDataSource$da.type);
        })) || false; // load only dataSources that are supported type

        if (spatialDataSources && !sdsContainsVector) {
          return;
        }
      }

      var styleKey = layerState.styleKey || null; // TODO ensure style here for now

      if (styleKey) {
        dispatch(Styles$1.useKeys([layerState.styleKey], layerState.key + '_layerUse'));
      }

      var attributeDataFilterExtension = _objectSpread2(_objectSpread2(_objectSpread2({}, (layerState === null || layerState === void 0 ? void 0 : (_layerState$options = layerState.options) === null || _layerState$options === void 0 ? void 0 : _layerState$options.attributeFilter) && {
        attributeFilter: layerState.options.attributeFilter
      }), (layerState === null || layerState === void 0 ? void 0 : (_layerState$options2 = layerState.options) === null || _layerState$options2 === void 0 ? void 0 : _layerState$options2.dataSourceKeys) && {
        dataSourceKeys: layerState.options.dataSourceKeys
      }), (layerState === null || layerState === void 0 ? void 0 : (_layerState$options3 = layerState.options) === null || _layerState$options3 === void 0 ? void 0 : _layerState$options3.featureKeys) && {
        featureKeys: layerState.options.featureKeys
      });

      dispatch(Data$1.ensure(styleKey, commonRelationsFilter, spatialFilter, attributeDataFilterExtension));
    }
  };
}
/**
 * Ensure indexes with filter by active for each active map
 * @param filterByActive {Object}
 */


function ensureWithFilterByActive$1(filterByActive) {
  return function (dispatch, getState) {
    var state = getState();
    var activeKeys = commonSelectors.getAllActiveKeys(state);
    var mapKeys = Select.maps.getAllMapsInUse(state);

    if (mapKeys && activeKeys) {
      mapKeys.forEach(function (mapKey) {
        var mapViewport = Select.maps.getViewportByMapKey(state, mapKey);

        if (mapViewport) {
          var width = mapViewport.width,
              height = mapViewport.height;
          var spatialFilter = Select.maps.getSpatialFilterByMapKey(state, mapKey, width, height);

          if (spatialFilter) {
            var layers = Select.maps.getAllLayersStateByMapKey(state, mapKey);

            if (layers) {
              layers.forEach(function (layer) {
                if (layer.filterByActive && _isMatch2(layer.filterByActive, filterByActive)) {
                  // apply layerUse asynchronous on each leyer
                  // it cause better FPS and prevent long synchronous tasks
                  setTimeout(function () {
                    dispatch(layerUse(layer, spatialFilter));
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
  return function (dispatch, getState) {
    var _layer$options;

    var state = getState();
    var layer = Select.maps.getLayerStateByLayerKeyAndMapKey(state, mapKey, layerKey);

    if (layer !== null && layer !== void 0 && (_layer$options = layer.options) !== null && _layer$options !== void 0 && _layer$options.selectable) {
      var _layer$options$select;

      var activeSelectionKey = Select.selections.getActiveKey(state);

      if (activeSelectionKey && (_layer$options$select = layer.options.selected) !== null && _layer$options$select !== void 0 && _layer$options$select.hasOwnProperty(activeSelectionKey)) {
        // TODO possible conflicts if features with same key from different layers are selected
        dispatch(Selections$1.setActiveSelectionFeatureKeysFilterKeys(selectedFeatureKeys));
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
  return function (dispatch, getState) {
    var layer = Select.maps.getLayerStateByLayerKeyAndMapKey(getState(), mapKey, layerKey);

    if (layer) {
      dispatch(actionSetMapLayerStyleKey(mapKey, layerKey, styleKey));
    }
  };
}
/**
 * @param mapKey {string}
 */


function setMapSetActiveMapKey(mapKey) {
  return function (dispatch, getState) {
    var state = getState();
    var set = Select.maps.getMapSetByMapKey(state, mapKey);

    if (set) {
      var activeMapKey = Select.maps.getMapSetActiveMapKey(state, set.key);

      if (activeMapKey !== mapKey) {
        dispatch(actionSetMapSetActiveMapKey(set.key, mapKey));
      }
    }
  };
}
/**
 * @param setKey {string}
 * @param backgroundLayer {Object} background layer definition
 */


function setMapSetBackgroundLayer(setKey, backgroundLayer) {
  return function (dispatch, getState) {
    dispatch(actionSetMapSetBackgroundLayer(setKey, backgroundLayer));
    var maps = Select.maps.getMapSetMaps(getState(), setKey);

    if (maps) {
      maps.forEach(function (map) {
        var _map$data, _map$data$viewport, _map$data2, _map$data2$viewport;

        // TODO is viewport always defined?
        dispatch(use$1(map.key, null, null, map === null || map === void 0 ? void 0 : (_map$data = map.data) === null || _map$data === void 0 ? void 0 : (_map$data$viewport = _map$data.viewport) === null || _map$data$viewport === void 0 ? void 0 : _map$data$viewport.width, map === null || map === void 0 ? void 0 : (_map$data2 = map.data) === null || _map$data2 === void 0 ? void 0 : (_map$data2$viewport = _map$data2.viewport) === null || _map$data2$viewport === void 0 ? void 0 : _map$data2$viewport.height));
      });
    }
  };
}
/**
 * @param setKey {string}
 */


function refreshMapSetUse(setKey) {
  return function (dispatch, getState) {
    var maps = Select.maps.getMapSetMaps(getState(), setKey);

    if (maps) {
      maps.forEach(function (map) {
        var _map$data3, _map$data3$viewport, _map$data4, _map$data4$viewport;

        // TODO is viewport always defined?
        dispatch(use$1(map.key, null, null, map === null || map === void 0 ? void 0 : (_map$data3 = map.data) === null || _map$data3 === void 0 ? void 0 : (_map$data3$viewport = _map$data3.viewport) === null || _map$data3$viewport === void 0 ? void 0 : _map$data3$viewport.width, map === null || map === void 0 ? void 0 : (_map$data4 = map.data) === null || _map$data4 === void 0 ? void 0 : (_map$data4$viewport = _map$data4.viewport) === null || _map$data4$viewport === void 0 ? void 0 : _map$data4$viewport.height));
      });
    }
  };
}
/**
 * @param setKey {string}
 * @param mapKey {string}
 */


function removeMapFromSet(setKey, mapKey) {
  return function (dispatch, getState) {
    var state = getState();
    var mapSetMapKeys = Select.maps.getMapSetMapKeys(state, setKey);

    if (mapSetMapKeys && mapSetMapKeys.includes(mapKey)) {
      var activeMapKey = Select.maps.getMapSetActiveMapKey(state, setKey);
      dispatch(actionRemoveMapFromSet(setKey, mapKey)); // if map to remove is active at the same time

      if (activeMapKey === mapKey) {
        // check map set map keys again & set first map as active
        var _mapSetMapKeys = Select.maps.getMapSetMapKeys(getState(), setKey);

        if (!_isEmpty2(_mapSetMapKeys)) {
          dispatch(actionSetMapSetActiveMapKey(setKey, _mapSetMapKeys[0]));
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
  return function (dispatch, getState) {
    var set = Select.maps.getMapSetByMapKey(getState(), mapKey);
    var forSet, forMap;
    var map$1 = Select.maps.getMapByKey(getState(), mapKey);

    if (set && set.sync && map$1) {
      // pick key-value pairs that are synced for set
      forSet = _pickBy2(update, function (updateVal, updateKey) {
        return set.sync[updateKey];
      });
      forMap = _omitBy(update, function (updateVal, updateKey) {
        return set.sync[updateKey];
      });
    } else if (map$1) {
      forMap = update;
    }

    if (forSet && !_isEmpty2(forSet)) {
      //check data integrity
      forSet = map.view.ensureViewIntegrity(forSet); //TODO test

      dispatch(actionUpdateSetView(set.key, forSet));
    }

    if (forMap && !_isEmpty2(forMap)) {
      //check data integrity
      forMap = map.view.ensureViewIntegrity(forMap); //TODO test

      dispatch(actionUpdateMapView(mapKey, forMap));
    }
  };
}
/**
 * @param setKey {string}
 * @param update {Object} map view fragment
 */


function updateSetView(setKey, update) {
  return function (dispatch, getState) {
    var activeMapKey = Select.maps.getMapSetActiveMapKey(getState(), setKey);

    if (activeMapKey) {
      dispatch(updateMapAndSetView(activeMapKey, update));
    }
  };
}
/**
 * Update whole maps state from view definition
 * @param data {Object}
 */


function updateStateFromView$5(data) {
  return function (dispatch) {
    if (data) {
      dispatch(actionUpdate$1(data));
    }
  };
}

function setMapViewport(mapKey, width, height) {
  return function (dispatch, getState) {
    if (mapKey && _isNumber(width) && _isNumber(height)) {
      var state = getState();
      var existingMap = Select.maps.getMapByKey(state, mapKey);
      var currentViewport = Select.maps.getViewportByMapKey(state, mapKey);

      if (existingMap && (!currentViewport || (currentViewport === null || currentViewport === void 0 ? void 0 : currentViewport.width) !== width || (currentViewport === null || currentViewport === void 0 ? void 0 : currentViewport.height) !== height)) {
        dispatch(actionSetMapViewport(mapKey, width, height));
      }
    }
  };
}
/* ==================================================
 * ACTIONS
 * ================================================== */


var actionRemoveMapFromSet = function actionRemoveMapFromSet(setKey, mapKey) {
  return {
    type: commonActionTypes.MAPS.SET.REMOVE_MAP,
    setKey: setKey,
    mapKey: mapKey
  };
};

var actionSetMapLayerStyleKey = function actionSetMapLayerStyleKey(mapKey, layerKey, styleKey) {
  return {
    type: commonActionTypes.MAPS.MAP.LAYERS.SET_STYLE_KEY,
    mapKey: mapKey,
    layerKey: layerKey,
    styleKey: styleKey
  };
};

var actionSetMapSetActiveMapKey = function actionSetMapSetActiveMapKey(setKey, mapKey) {
  return {
    type: commonActionTypes.MAPS.SET.SET_ACTIVE_MAP_KEY,
    mapKey: mapKey,
    setKey: setKey
  };
};

var actionSetMapSetBackgroundLayer = function actionSetMapSetBackgroundLayer(setKey, backgroundLayer) {
  return {
    type: commonActionTypes.MAPS.SET.SET_BACKGROUND_LAYER,
    setKey: setKey,
    backgroundLayer: backgroundLayer
  };
};

var actionSetMapViewport = function actionSetMapViewport(mapKey, width, height) {
  return {
    type: commonActionTypes.MAPS.MAP.VIEWPORT.SET,
    mapKey: mapKey,
    width: width,
    height: height
  };
};

var actionUpdate$1 = function actionUpdate(data) {
  return {
    type: commonActionTypes.MAPS.UPDATE,
    data: data
  };
};

var actionUpdateMapView = function actionUpdateMapView(mapKey, update) {
  return {
    type: commonActionTypes.MAPS.MAP.VIEW.UPDATE,
    mapKey: mapKey,
    update: update
  };
};

var actionUpdateSetView = function actionUpdateSetView(setKey, update) {
  return {
    type: commonActionTypes.MAPS.SET.VIEW.UPDATE,
    setKey: setKey,
    update: update
  };
};

var actionMapSetUseClear = function actionMapSetUseClear(mapSetKey) {
  return {
    type: commonActionTypes.MAPS.SET.USE.CLEAR,
    mapSetKey: mapSetKey
  };
};

var actionMapSetUseRegister = function actionMapSetUseRegister(mapSetKey) {
  return {
    type: commonActionTypes.MAPS.SET.USE.REGISTER,
    mapSetKey: mapSetKey
  };
};

var actionMapUseClear = function actionMapUseClear(mapKey) {
  return {
    type: commonActionTypes.MAPS.MAP.USE.CLEAR,
    mapKey: mapKey
  };
};

var actionMapUseRegister = function actionMapUseRegister(mapKey) {
  return {
    type: commonActionTypes.MAPS.MAP.USE.REGISTER,
    mapKey: mapKey
  };
}; // ============ export ===========


var MapsActions = {
  ensureWithFilterByActive: ensureWithFilterByActive$1,
  layerUse: layerUse,
  mapSetUseClear: mapSetUseClear,
  mapSetUseRegister: mapSetUseRegister,
  mapUseClear: mapUseClear,
  mapUseRegister: mapUseRegister,
  refreshMapSetUse: refreshMapSetUse,
  //T
  removeMapFromSet: removeMapFromSet,
  setLayerSelectedFeatureKeys: setLayerSelectedFeatureKeys,
  setMapLayerStyleKey: setMapLayerStyleKey,
  setMapSetActiveMapKey: setMapSetActiveMapKey,
  setMapSetBackgroundLayer: setMapSetBackgroundLayer,
  //T
  setMapViewport: setMapViewport,
  updateMapAndSetView: updateMapAndSetView,
  updateSetView: updateSetView,
  updateStateFromView: updateStateFromView$5,
  use: use$1
};

var add$9 = commonActions.add(commonActionTypes.PERIODS);
var create$5 = commonActions.create(Select.periods.getSubstate, 'periods', commonActionTypes.PERIODS);
var deleteItem$5 = commonActions["delete"](Select.periods.getSubstate, 'periods', commonActionTypes.PERIODS);
var saveEdited$5 = commonActions.saveEdited(Select.periods.getSubstate, 'periods', commonActionTypes.PERIODS);
var setActiveKey$6 = commonActions.setActiveKey(commonActionTypes.PERIODS);
var setActiveKeys$3 = commonActions.setActiveKeys(commonActionTypes.PERIODS);
var updateEdited$5 = commonActions.updateEdited(Select.periods.getSubstate, commonActionTypes.PERIODS);
var updateStateFromView$6 = commonActions.updateSubstateFromView(commonActionTypes.PERIODS);
var useKeys$8 = commonActions.useKeys(Select.periods.getSubstate, 'periods', commonActionTypes.PERIODS);
var useKeysClear$5 = commonActions.useKeysClear(commonActionTypes.PERIODS);
var useIndexed$8 = commonActions.useIndexed(Select.periods.getSubstate, 'periods', commonActionTypes.PERIODS);
var useIndexedClear$4 = commonActions.useIndexedClear(commonActionTypes.PERIODS);
var refreshUses$6 = commonActions.refreshUses(Select.periods.getSubstate, "periods", commonActionTypes.PERIODS);

var setActiveKeyAndEnsureDependencies$4 = function setActiveKeyAndEnsureDependencies(key) {
  return function (dispatch, getState, options) {
    dispatch(setActiveKey$6(key));
    dispatch(options.ensureDependenciesOfActiveMetadataType('period'));
  };
};

var setActiveKeysAndEnsureDependencies$2 = function setActiveKeysAndEnsureDependencies(keys) {
  return function (dispatch, getState, options) {
    dispatch(setActiveKeys$3(keys));
    dispatch(options.ensureDependenciesOfActiveMetadataType('period'));
  };
}; // ============ actions ===========
// ============ export ===========


var Periods$1 = {
  add: add$9,
  create: create$5,
  "delete": deleteItem$5,
  refreshUses: refreshUses$6,
  saveEdited: saveEdited$5,
  setActiveKey: setActiveKeyAndEnsureDependencies$4,
  setActiveKeys: setActiveKeysAndEnsureDependencies$2,
  updateEdited: updateEdited$5,
  updateStateFromView: updateStateFromView$6,
  useIndexed: useIndexed$8,
  useIndexedClear: useIndexedClear$4,
  useKeys: useKeys$8,
  useKeysClear: useKeysClear$5
};

var add$a = commonActions.add(commonActionTypes.PLACES);
var create$6 = commonActions.create(Select.places.getSubstate, 'places', commonActionTypes.PLACES);
var deleteItem$6 = commonActions["delete"](Select.places.getSubstate, 'places', commonActionTypes.PLACES);
var saveEdited$6 = commonActions.saveEdited(Select.places.getSubstate, 'places', commonActionTypes.PLACES);
var setActiveKey$7 = commonActions.setActiveKey(commonActionTypes.PLACES);
var setActiveKeys$4 = commonActions.setActiveKeys(commonActionTypes.PLACES);
var updateEdited$6 = commonActions.updateEdited(Select.places.getSubstate, commonActionTypes.PLACES);
var updateStateFromView$7 = commonActions.updateSubstateFromView(commonActionTypes.PLACES);
var useIndexed$9 = commonActions.useIndexed(Select.places.getSubstate, 'places', commonActionTypes.PLACES);
var useIndexedClear$5 = commonActions.useIndexedClear(commonActionTypes.PLACES);
var useKeys$9 = commonActions.useKeys(Select.places.getSubstate, 'places', commonActionTypes.PLACES);
var useKeysClear$6 = commonActions.useKeysClear(commonActionTypes.PLACES);
var refreshUses$7 = commonActions.refreshUses(Select.places.getSubstate, "places", commonActionTypes.PLACES);

var setActiveKeyAndEnsureDependencies$5 = function setActiveKeyAndEnsureDependencies(key) {
  return function (dispatch, getState, options) {
    dispatch(setActiveKey$7(key));
    dispatch(options.ensureDependenciesOfActiveMetadataType('place'));
  };
};

var setActiveKeysAndEnsureDependencies$3 = function setActiveKeysAndEnsureDependencies(keys) {
  return function (dispatch, getState, options) {
    dispatch(setActiveKeys$4(keys));
    dispatch(options.ensureDependenciesOfActiveMetadataType('place'));
  };
}; // ============ export ===========


var Places$1 = {
  add: add$a,
  create: create$6,
  "delete": deleteItem$6,
  refreshUses: refreshUses$7,
  saveEdited: saveEdited$6,
  setActiveKey: setActiveKeyAndEnsureDependencies$5,
  setActiveKeys: setActiveKeysAndEnsureDependencies$3,
  updateEdited: updateEdited$6,
  updateStateFromView: updateStateFromView$7,
  useIndexed: useIndexed$9,
  useIndexedClear: useIndexedClear$5,
  useKeys: useKeys$9,
  useKeysClear: useKeysClear$6
};

var add$b = commonActions.add(commonActionTypes.SCENARIOS);
var setActiveKey$8 = commonActions.setActiveKey(commonActionTypes.SCENARIOS);
var setActiveKeys$5 = commonActions.setActiveKeys(commonActionTypes.SCENARIOS);
var updateStateFromView$8 = commonActions.updateSubstateFromView(commonActionTypes.SCENARIOS);

var setActiveKeyAndEnsureDependencies$6 = function setActiveKeyAndEnsureDependencies(key) {
  return function (dispatch, getState, options) {
    dispatch(setActiveKey$8(key));
    dispatch(options.ensureDependenciesOfActiveMetadataType('scenario'));
  };
};

var setActiveKeysAndEnsureDependencies$4 = function setActiveKeysAndEnsureDependencies(keys) {
  return function (dispatch, getState, options) {
    dispatch(setActiveKeys$5(keys));
    dispatch(options.ensureDependenciesOfActiveMetadataType('scenario'));
  };
}; // ============ export ===========


var Scenarios$1 = {
  add: add$b,
  setActiveKey: setActiveKeyAndEnsureDependencies$6,
  setActiveKeys: setActiveKeysAndEnsureDependencies$4,
  updateStateFromView: updateStateFromView$8
};

// ============ creators ===========
var add$c = commonActions.add(commonActionTypes.SCOPES);
var create$7 = commonActions.create(Select.scopes.getSubstate, 'scopes', commonActionTypes.SCOPES);
var deleteItem$7 = commonActions["delete"](Select.scopes.getSubstate, 'scopes', commonActionTypes.SCOPES);
var saveEdited$7 = commonActions.saveEdited(Select.scopes.getSubstate, 'scopes', commonActionTypes.SCOPES);
var setActiveKey$9 = commonActions.setActiveKey(commonActionTypes.SCOPES);
var updateEdited$7 = commonActions.updateEdited(Select.scopes.getSubstate, commonActionTypes.SCOPES);
var useKeys$a = commonActions.useKeys(Select.scopes.getSubstate, 'scopes', commonActionTypes.SCOPES);
var useKeysClear$7 = commonActions.useKeysClear(commonActionTypes.SCOPES);
var useIndexedClear$6 = commonActions.useIndexedClear(commonActionTypes.SCOPES);
var useIndexed$a = commonActions.useIndexed(Select.scopes.getSubstate, 'scopes', commonActionTypes.SCOPES);
var refreshUses$8 = commonActions.refreshUses(Select.scopes.getSubstate, "scopes", commonActionTypes.SCOPES);

var setActiveKeyAndEnsureDependencies$7 = function setActiveKeyAndEnsureDependencies(key) {
  return function (dispatch, getState, options) {
    dispatch(setActiveKey$9(key));
    dispatch(options.ensureDependenciesOfActiveMetadataType('scope'));
  };
};

function updateStateFromView$9(data) {
  return function (dispatch) {
    if (data) {
      if (data && data.byKey) {
        dispatch(add$c(_values(data.byKey)));
      }

      if (data && data.activeKey) {
        dispatch(setActiveKeyAndEnsureDependencies$7(data.activeKey));
      }
    }
  };
} // ============ actions ===========
// ============ export ===========


var Scopes$1 = {
  add: add$c,
  create: create$7,
  "delete": deleteItem$7,
  refreshUses: refreshUses$8,
  saveEdited: saveEdited$7,
  setActiveKey: setActiveKeyAndEnsureDependencies$7,
  updateEdited: updateEdited$7,
  updateStateFromView: updateStateFromView$9,
  useIndexed: useIndexed$a,
  useIndexedClear: useIndexedClear$6,
  useKeys: useKeys$a,
  useKeysClear: useKeysClear$7
};

var timeouts = {}; // ============ creators ===========

function addOrUpdate(setKey, lineage, width, minActiveWidth, component, props) {
  return function (dispatch, getState) {
    var existingScreen = Select.screens.getScreenByLineage(getState(), lineage);

    if (existingScreen) {
      if (timeouts[lineage]) {
        clearTimeout(timeouts[lineage]);
      }

      dispatch(actionUpdate$2(setKey, lineage, {
        width: width,
        minActiveWidth: minActiveWidth,
        desiredState: 'opening',
        component: component,
        props: props
      }));
    } else {
      dispatch(actionAdd$1(setKey, lineage, {
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
    var existingSet = Select.screens.getSetByKey(getState(), setKey);

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


var actionAdd$1 = function actionAdd(setKey, lineage, data) {
  return {
    type: commonActionTypes.SCREENS.ADD,
    setKey: setKey,
    lineage: lineage,
    data: data
  };
};

var actionAddSet = function actionAddSet(setKey) {
  return {
    type: commonActionTypes.SCREENS.SETS.ADD,
    setKey: setKey
  };
};

var actionOpen = function actionOpen(setKey, lineage) {
  return {
    type: commonActionTypes.SCREENS.OPEN,
    setKey: setKey,
    lineage: lineage
  };
};

var actionClose = function actionClose(setKey, lineage) {
  return {
    type: commonActionTypes.SCREENS.CLOSE,
    setKey: setKey,
    lineage: lineage
  };
};

var actionRemove = function actionRemove(setKey, lineage) {
  return {
    type: commonActionTypes.SCREENS.REMOVE,
    setKey: setKey,
    lineage: lineage
  };
};

var actionRemoveAllScreensFromSet = function actionRemoveAllScreensFromSet(setKey) {
  return {
    type: commonActionTypes.SCREENS.REMOVE_ALL,
    setKey: setKey
  };
};

var actionRetract = function actionRetract(setKey, lineage) {
  return {
    type: commonActionTypes.SCREENS.RETRACT,
    setKey: setKey,
    lineage: lineage
  };
};

var actionTopHistory = function actionTopHistory(setKey, lineage) {
  return {
    type: commonActionTypes.SCREENS.TOP_HISTORY,
    setKey: setKey,
    lineage: lineage
  };
};

var actionUpdate$2 = function actionUpdate(setKey, lineage, data) {
  return {
    type: commonActionTypes.SCREENS.UPDATE,
    setKey: setKey,
    lineage: lineage,
    data: data
  };
}; // ============ export ===========


var Screens$1 = {
  addOrUpdate: addOrUpdate,
  addSet: actionAddSet,
  close: close,
  open: open,
  removeAllScreensFromSet: removeAllScreensFromSet,
  retract: retract,
  topHistory: topHistory
};

var create$8 = commonActions.create(Select.tags.getSubstate, 'tags', commonActionTypes.TAGS);
var deleteItem$8 = commonActions["delete"](Select.tags.getSubstate, 'tags', commonActionTypes.TAGS);
var saveEdited$8 = commonActions.saveEdited(Select.tags.getSubstate, 'tags', commonActionTypes.TAGS);
var updateEdited$8 = commonActions.updateEdited(Select.tags.getSubstate, commonActionTypes.TAGS);
var useKeys$b = commonActions.useKeys(Select.tags.getSubstate, 'tags', commonActionTypes.TAGS);
var useKeysClear$8 = commonActions.useKeysClear(commonActionTypes.TAGS);
var useIndexedClear$7 = commonActions.useIndexedClear(commonActionTypes.TAGS);
var useIndexed$b = commonActions.useIndexed(Select.tags.getSubstate, 'tags', commonActionTypes.TAGS);
var refreshUses$9 = commonActions.refreshUses(Select.tags.getSubstate, "tags", commonActionTypes.TAGS); // ============ actions ===========
// ============ export ===========

var Tags$1 = {
  create: create$8,
  "delete": deleteItem$8,
  saveEdited: saveEdited$8,
  updateEdited: updateEdited$8,
  useKeys: useKeys$b,
  useKeysClear: useKeysClear$8,
  refreshUses: refreshUses$9,
  useIndexed: useIndexed$b,
  useIndexedClear: useIndexedClear$7
};

var TTL$1 = 5; // ============ creators ===========

var add$d = commonActions.add(commonActionTypes.USERS);
var setActiveKey$a = commonActions.setActiveKey(commonActionTypes.USERS);

var refreshUses$a = function refreshUses() {
  return function (dispatch) {
    dispatch(commonActions.refreshUses(Select.users.getSubstate, 'users', commonActionTypes.USERS, 'user')());
    dispatch(commonActions.refreshUses(Select.users.getGroupsSubstate, 'groups', commonActionTypes.USERS.GROUPS, 'user')());
  };
};

var useKeys$c = commonActions.useKeys(Select.users.getSubstate, 'users', commonActionTypes.USERS, 'user');
var useKeysClear$9 = commonActions.useKeysClear(commonActionTypes.USERS);
var useIndexedUsers = commonActions.useIndexed(Select.users.getSubstate, 'users', commonActionTypes.USERS, 'user');
var useIndexedGroups = commonActions.useIndexed(Select.users.getGroupsSubstate, 'groups', commonActionTypes.USERS.GROUPS, 'user');

function onLogin() {
  return function (dispatch) {
    dispatch(commonActions.actionDataSetOutdated());
    dispatch(apiLoadCurrentUser());
    dispatch(Scopes$1.refreshUses());
    dispatch(Places$1.refreshUses());
    dispatch(Periods$1.refreshUses());
    dispatch(refreshUses$a());
  };
}

function onLogout() {
  return function (dispatch) {
    dispatch(actionLogout());
    dispatch(setActiveKey$a(null));
    dispatch(Scopes$1.refreshUses());
    dispatch(Places$1.refreshUses());
    dispatch(Periods$1.refreshUses());
    dispatch(refreshUses$a());
  };
}

function apiLoginUser(email, password) {
  return function (dispatch, getState) {
    var localConfig = Select.app.getCompleteLocalConfiguration(getState());
    dispatch(actionApiLoginRequest());
    var payload = {
      username: email,
      password: password
    };
    return request(localConfig, 'api/login/login', 'POST', null, payload).then(function (result) {
      if (result.data.status === 'ok') {
        dispatch(onLogin());
      }
    })["catch"](function (error) {
      dispatch(commonActions.actionGeneralError(error));
      return error;
    });
  };
} // function apiLoad(ttl) {
// 	if (_.isUndefined(ttl)) ttl = TTL;
// 	return (dispatch, getState) => {
// 		let state = getState();
// 		if (state.users.loading) {
// 			// already loading, do nothing
// 		} else {
// 			dispatch(actionApiLoadRequest());
//
// 			let url = config.apiBackendProtocol + '://' + path.join(config.apiBackendHost, 'backend/rest/user');
//
// 			return fetch(url, {
// 				method: 'GET',
// 				credentials: 'include',
// 				headers: {
// 					'Content-Type': 'application/json',
// 					'Accept': 'application/json'
// 				}
// 			}).then(
// 				response => {
// 					let contentType = response.headers.get('Content-type');
// 					if (response.ok && contentType && (contentType.indexOf('application/json') !== -1)) {
// 						return response.json().then(data => {
// 							Promise.all(data.data.map(user => {
// 								return new User({data: user}).then(user => {
// 									user.key = user.id;
// 									return user;
// 								});
// 							})).then(users => {
// 								dispatch(actionAdd(users));
// 							});
// 						});
// 					} else {
// 						dispatch(actionApiLoadRequestError('scopes#action Problem with loading scopes.'));
// 					}
// 				},
// 				error => {
// 					if (ttl - 1) {
// 						dispatch(apiLoad(ttl - 1));
// 					} else {
// 						dispatch(actionApiLoadRequestError('scopes#action Problem with loading scopes.'));
// 					}
// 				}
// 			);
// 		}
// 	};
// }


function apiLoadCurrentUser() {
  return function (dispatch, getState) {
    var localConfig = Select.app.getCompleteLocalConfiguration(getState());
    dispatch(actionApiLoadCurrentUserRequest());
    return request(localConfig, 'rest/user/current', 'GET', null, null).then(function (result) {
      if (result.errors) {
        //todo how do we return errors here?
        throw new Error(result.errors);
      } else {
        if (result.key === 0) {
          // no logged in user = guest
          dispatch(actionAddGroups(transformGroups(result.groups)));
        } else if (result.key) {
          // logged in user
          dispatch(setActiveKey$a(result.key));
          dispatch(add$d(transformUser(result)));
          dispatch(actionAddGroups(transformGroups(result.groups)));
        }
      }
    })["catch"](function (error) {
      dispatch(commonActions.actionGeneralError(error));
      return error;
    });
  };
}

function apiLogoutUser(ttl) {
  if (_isUndefined(ttl)) ttl = TTL$1;
  return function (dispatch, getState) {
    var apiBackendProtocol = Select.app.getLocalConfiguration(getState(), 'apiBackendProtocol');
    var apiBackendHost = Select.app.getLocalConfiguration(getState(), 'apiBackendHost');
    dispatch(actionApiLogoutRequest());
    var url = apiBackendProtocol + '://' + path.join(apiBackendHost, 'api/login/logout');
    return _fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).then(function (response) {
      console.log('#### logout user response', response);

      if (response.ok) {
        // window.location.reload();
        dispatch(onLogout());
      } else {
        dispatch(actionApiLogoutRequestError('user#action logout Problem with logging out the User, please try later.'));
      }
    }, function (error) {
      console.log('#### logout user error', error);

      if (ttl - 1) {
        dispatch(apiLogoutUser(ttl - 1));
      } else {
        dispatch(actionApiLogoutRequestError('user#action logout Problem with logging out the User, please try later.'));
      }
    });
  };
} // ============ helpers ===========


function transformUser(user) {
  return _objectSpread2(_objectSpread2({}, user), {}, {
    //TODO remove -> workaround with permissions.guest.get
    permissions: _objectSpread2(_objectSpread2({}, user.permissions), {}, {
      guest: {
        get: false
      }
    }),
    groups: _map(user.groups, 'key')
  });
} //TODO remove -> workaround with permissions.guest.get


function transformGroups(groups) {
  return groups.map(function (group) {
    return _objectSpread2(_objectSpread2({}, group), {}, {
      permissions: {
        guest: {
          get: false
        }
      }
    });
  });
} // ============ actions ===========


function actionClearUsersUseIndexed(componentId) {
  return {
    type: commonActionTypes.USERS.USE.INDEXED.CLEAR,
    componentId: componentId
  };
}

function actionClearGroupsUseIndexed(componentId) {
  return {
    type: commonActionTypes.USERS.GROUPS.USE.INDEXED.CLEAR,
    componentId: componentId
  };
}

function actionAddGroups(groups) {
  return {
    type: commonActionTypes.USERS.GROUPS.ADD,
    data: groups
  };
}

function actionApiLogoutRequest() {
  return {
    type: commonActionTypes.USERS_LOGOUT_REQUEST
  };
}

function actionApiLogoutRequestError(error) {
  return {
    type: commonActionTypes.USERS_LOGOUT_REQUEST_ERROR,
    error: error
  };
}

function actionApiLoginRequest() {
  return {
    type: commonActionTypes.USERS.LOGIN.REQUEST
  };
}

function actionApiLoadCurrentUserRequest() {
  return {
    type: commonActionTypes.USERS.CURRENT.REQUEST
  };
}

function actionLogout() {
  return {
    type: commonActionTypes.COMMON.DATA.CLEANUP_ON_LOGOUT
  };
} // ============ export ===========


var Users$1 = {
  add: add$d,
  // apiLoad: apiLoad,
  apiLoadCurrentUser: apiLoadCurrentUser,
  apiLoginUser: apiLoginUser,
  apiLogoutUser: apiLogoutUser,
  refreshUses: refreshUses$a,
  useKeys: useKeys$c,
  useKeysClear: useKeysClear$9,
  useIndexedUsers: useIndexedUsers,
  useIndexedGroups: useIndexedGroups,
  useIndexedUsersClear: actionClearUsersUseIndexed,
  useIndexedGroupsClear: actionClearGroupsUseIndexed // update: update

};

// ============ creators ===========
var add$e = commonActions.add(commonActionTypes.VIEWS);
var setActiveKey$b = commonActions.setActiveKey(commonActionTypes.VIEWS);
var setActiveKeys$6 = commonActions.setActiveKeys(commonActionTypes.VIEWS);
var create$9 = commonActions.create(Select.views.getSubstate, 'views', commonActionTypes.VIEWS, 'views');
var deleteItem$9 = commonActions["delete"](Select.views.getSubstate, 'views', commonActionTypes.VIEWS, 'views');
var saveEdited$9 = commonActions.saveEdited(Select.views.getSubstate, 'views', commonActionTypes.VIEWS, 'views');
var updateEdited$9 = commonActions.updateEdited(Select.views.getSubstate, commonActionTypes.VIEWS, 'views');
var useKeys$d = commonActions.useKeys(Select.views.getSubstate, 'views', commonActionTypes.VIEWS, 'views');
var useKeysClear$a = commonActions.useKeysClear(commonActionTypes.VIEWS);
var useIndexedClear$8 = commonActions.useIndexedClear(commonActionTypes.VIEWS);
var useIndexed$c = commonActions.useIndexed(Select.views.getSubstate, 'views', commonActionTypes.VIEWS, 'views');
var refreshUses$b = commonActions.refreshUses(Select.views.getSubstate, "views", commonActionTypes.VIEWS, 'views'); // ============ actions ===========

var apply = function apply(key, actions) {
  return function (dispatch, getState) {
    return dispatch(commonActions.ensureKeys(Select.views.getSubstate, 'views', commonActionTypes.VIEWS, [key], 'views')).then(function () {
      var data = Select.views.getDataByKey(getState(), key);

      if (data && data.state) {
        var _data$state$data;

        var actionCreators = [];

        _each(actions, function (storeActions, key) {
          if (storeActions.hasOwnProperty('updateStateFromView') && data.state[key]) {
            actionCreators.push(storeActions.updateStateFromView(data.state[key]));
          }
        });

        if (actions.data.components && (_data$state$data = data.state.data) !== null && _data$state$data !== void 0 && _data$state$data.components) {
          actionCreators.push(actions.data.components.updateComponentsStateFromView(data.state.data.components));
        }

        if (actions.specific) {
          _each(actions.specific, function (storeActions, key) {
            if (storeActions.hasOwnProperty('updateStateFromView') && data.state[key]) {
              actionCreators.push(storeActions.updateStateFromView(data.state[key]));
            }
          });
        }

        dispatch(actionCreators);
      } else {
        dispatch(commonActions.actionGeneralError("Views#apply: View or state of view doesn't exist! View key: " + key));
      }
    })["catch"](function (err) {
      dispatch(commonActions.actionGeneralError('Views#apply: ' + err));
    });
  };
};

var applyAndSetActive = function applyAndSetActive(key, actions) {
  return function (dispatch) {
    return dispatch(apply(key, actions)).then(function () {
      dispatch(setActiveKey$b(key));
    });
  };
}; // ============ export ===========


var Views$1 = {
  add: add$e,
  apply: apply,
  applyAndSetActive: applyAndSetActive,
  setActiveKey: setActiveKey$b,
  setActiveKeys: setActiveKeys$6,
  create: create$9,
  "delete": deleteItem$9,
  saveEdited: saveEdited$9,
  updateEdited: updateEdited$9,
  useKeys: useKeys$d,
  useKeysClear: useKeysClear$a,
  refreshUses: refreshUses$b,
  useIndexed: useIndexed$c,
  useIndexedClear: useIndexedClear$8
};

// TODO add or update

function addOrOpen(setKey, windowKey, settings, component, props) {
  return function (dispatch, getState) {
    var existingWindow = Select.windows.getWindow(getState(), windowKey);

    if (existingWindow) {
      dispatch(actionOpen$1(setKey, windowKey));
    } else {
      dispatch(actionAdd$2(setKey, windowKey, 'open', settings, component, props));
    }
  };
}

function updateSettings(windowKey, settings) {
  return function (dispatch, getState) {
    var window = Select.windows.getWindow(getState(), windowKey);

    var updatedData = _objectSpread2(_objectSpread2({}, window.data), {}, {
      settings: _objectSpread2(_objectSpread2({}, window.data.settings), settings)
    });

    dispatch(actionUpdate$3(windowKey, updatedData));
  };
} // ============ actions ===========


var actionAdd$2 = function actionAdd(setKey, windowKey, state, settings, component, props) {
  return {
    type: commonActionTypes.WINDOWS.ADD,
    setKey: setKey,
    windowKey: windowKey,
    state: state,
    settings: settings,
    component: component,
    props: props
  };
};

var actionOpen$1 = function actionOpen(setKey, windowKey) {
  return {
    type: commonActionTypes.WINDOWS.OPEN,
    setKey: setKey,
    windowKey: windowKey
  };
};

var actionRemove$1 = function actionRemove(setKey, windowKey) {
  return {
    type: commonActionTypes.WINDOWS.REMOVE,
    setKey: setKey,
    windowKey: windowKey
  };
};

var actionTopWindow = function actionTopWindow(setKey, windowKey) {
  return {
    type: commonActionTypes.WINDOWS.TOP,
    setKey: setKey,
    windowKey: windowKey
  };
};

var actionUpdate$3 = function actionUpdate(windowKey, data) {
  return {
    type: commonActionTypes.WINDOWS.UPDATE,
    windowKey: windowKey,
    data: data
  };
}; // ============ export ===========


var Windows$1 = {
  addOrOpen: addOrOpen,
  remove: actionRemove$1,
  topWindow: actionTopWindow,
  updateSettings: updateSettings
};

var Action = {
  app: App,
  areas: Areas$1,
  areaRelations: AreaRelations$1,
  attributes: Attributes$1,
  attributeSets: AttributeSets$1,
  cases: Cases$1,
  components: Components$1,
  data: Data$1,
  layerTemplates: LayerTemplates$1,
  layerTrees: LayerTrees$1,
  maps: MapsActions,
  periods: Periods$1,
  places: Places$1,
  scenarios: Scenarios$1,
  scopes: Scopes$1,
  screens: Screens$1,
  selections: Selections$1,
  styles: Styles$1,
  tags: Tags$1,
  users: Users$1,
  views: Views$1,
  windows: Windows$1
};

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    activeUser: Select.users.getActive(state),
    loginOverlayOpen: Select.components.get(state, 'App_Container', 'loginOverlayOpen')
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onLogIn: function onLogIn(email, password) {
      dispatch(Action.users.apiLoginUser(email, password));
    },
    onLoginOverlayClose: function onLoginOverlayClose() {
      dispatch(Action.components.set('App_Container', 'loginOverlayOpen', false));
    }
  };
};

var AppContainer = connect(mapStateToProps, mapDispatchToProps);

var mapStateToProps$1 = function mapStateToProps(state, ownProps) {
  setState(state);
  return Select.data.components.getDataForCartesianChart(ownProps);
};

var mapDispatchToPropsFactory = function mapDispatchToPropsFactory() {
  return function (dispatch, ownProps) {
    return {
      onMount: function onMount() {
        dispatch(Action.data.components.use(ownProps.stateComponentKey));
      },
      onUnmount: function onUnmount() {
        dispatch(Action.data.components.componentUseClear(ownProps.stateComponentKey));
      }
    };
  };
};

var CartesianChart = connect(mapStateToProps$1, mapDispatchToPropsFactory);

var mapStateToProps$2 = function mapStateToProps(state, ownProps) {
  setState(state);

  if (ownProps.stateMapKey) {
    return {
      backgroundLayer: Select.maps.getMapBackgroundLayer(ownProps.stateMapKey),
      layers: Select.maps.getMapLayers(ownProps.stateMapKey),
      viewport: Select.maps.getViewportByMapKey(state, ownProps.stateMapKey),
      view: Select.maps.getViewByMapKey(state, ownProps.stateMapKey),
      viewLimits: Select.maps.getViewLimitsByMapKey(state, ownProps.stateMapKey),
      mapKey: ownProps.stateMapKey
    };
  } else {
    return {
      backgroundLayer: Select.maps.getMapBackgroundLayer(ownProps.mapKey, ownProps.backgroundLayer),
      layers: Select.maps.getMapLayers(ownProps.mapKey, ownProps.layers)
    };
  }
};

var mapDispatchToPropsFactory$1 = function mapDispatchToPropsFactory() {
  var componentId = 'Map_' + utils.randomString(6);
  return function (dispatch, ownProps) {
    if (ownProps.stateMapKey) {
      return {
        onMount: function onMount(mapWidth, mapHeight) {
          dispatch(Action.maps.setMapViewport(ownProps.stateMapKey, mapWidth, mapHeight));
          dispatch(Action.maps.use(ownProps.stateMapKey, null, null, mapWidth, mapHeight));
        },
        onResize: function onResize(mapWidth, mapHeight) {
          dispatch(Action.maps.setMapViewport(ownProps.stateMapKey, mapWidth, mapHeight));
          dispatch(Action.maps.use(ownProps.stateMapKey, null, null, mapWidth, mapHeight));
        },
        onUnmount: function onUnmount() {
          dispatch(Action.maps.mapUseClear(ownProps.stateMapKey));
        },
        refreshUse: function refreshUse() {},
        onViewChange: function onViewChange(update) {
          dispatch(Action.maps.updateMapAndSetView(ownProps.stateMapKey, update));
        },
        onPropViewChange: function onPropViewChange(update, mapWidth, mapHeight) {
          dispatch(Action.maps.setMapViewport(ownProps.stateMapKey, mapWidth, mapHeight));
          dispatch(Action.maps.use(ownProps.stateMapKey, undefined, undefined, mapWidth, mapHeight));
        },
        resetHeading: function resetHeading() {},
        onClick: function onClick(view) {
          dispatch(Action.maps.setMapSetActiveMapKey(ownProps.stateMapKey));
        },
        onLayerClick: function onLayerClick(mapKey, layerKey, selectedFeatureKeys) {
          dispatch(Action.maps.setLayerSelectedFeatureKeys(ownProps.stateMapKey, layerKey, selectedFeatureKeys));
        }
      };
    } else {
      var mapKey = ownProps.mapKey || componentId;
      return {
        onMount: function onMount() {
          dispatch(Action.maps.use(mapKey, ownProps.backgroundLayer, ownProps.layers));
        },
        onUnmount: function onUnmount() {},
        refreshUse: function refreshUse() {},
        onViewChange: ownProps.onViewChange || function (update) {},
        onClick: ownProps.onClick || function (view) {}
      };
    }
  };
};

var Map = connect(mapStateToProps$2, mapDispatchToPropsFactory$1);

var mapStateToProps$3 = function mapStateToProps(state, ownProps) {
  if (ownProps.stateMapSetKey) {
    var activeMapKey = Select.maps.getMapSetActiveMapKey(state, ownProps.stateMapSetKey);
    return {
      activeMapKey: activeMapKey,
      activeMapView: Select.maps.getMapSetActiveMapView(state, ownProps.stateMapSetKey),
      maps: Select.maps.getMapSetMapKeys(state, ownProps.stateMapSetKey),
      view: Select.maps.getMapSetView(state, ownProps.stateMapSetKey),
      activeMapViewport: Select.maps.getViewportByMapKey(state, activeMapKey),
      viewLimits: Select.maps.getMapSetViewLimits(state, ownProps.stateMapSetKey)
    };
  } else {
    return {
      backgroundLayer: null,
      layers: null
    };
  }
};

var mapDispatchToPropsFactory$2 = function mapDispatchToPropsFactory() {
  var componentId = 'MapSet_' + utils.randomString(6);
  return function (dispatch, ownProps) {
    if (ownProps.stateMapSetKey) {
      return {
        onMount: function onMount() {
          dispatch(Action.maps.mapSetUseRegister(ownProps.stateMapSetKey));
        },
        onUnmount: function onUnmount() {
          dispatch(Action.maps.mapSetUseClear(ownProps.stateMapSetKey));
        },
        updateView: function updateView(update, mapKey) {
          dispatch(Action.maps.updateMapAndSetView(mapKey, update));
        },
        resetHeading: function resetHeading(mapKey) {},
        onMapRemove: function onMapRemove(mapKey) {
          dispatch(Action.maps.removeMapFromSet(ownProps.stateMapSetKey, mapKey));
        }
      };
    } else {
      ownProps.setKey || componentId;
      return {
        onMount: function onMount() {},
        onUnmount: function onUnmount() {},
        refreshUse: function refreshUse() {}
      };
    }
  };
};

var MapSet = connect(mapStateToProps$3, mapDispatchToPropsFactory$2);

var mapStateToProps$4 = function mapStateToProps(state, props) {
  return {
    screens: Select.screens.getScreensBySetKey(state, props.setKey),
    set: Select.screens.getSetByKey(state, props.setKey)
  };
};

var mapDispatchToProps$1 = function mapDispatchToProps(dispatch, ownProps) {
  return {
    onFocusScreen: function onFocusScreen(screenLineage) {
      dispatch(Action.screens.topHistory(ownProps.setKey, screenLineage));
    },
    onCloseScreen: function onCloseScreen(screenLineage) {
      dispatch(Action.screens.close(ownProps.setKey, screenLineage));
    },
    onOpenScreen: function onOpenScreen(screenLineage) {
      dispatch(Action.screens.open(ownProps.setKey, screenLineage));
    },
    onRetractScreen: function onRetractScreen(screenLineage) {
      dispatch(Action.screens.retract(ownProps.setKey, screenLineage));
    }
  };
};

var Screens$2 = connect(mapStateToProps$4, mapDispatchToProps$1);

var mapStateToProps$5 = function mapStateToProps(state, props) {
  return {
    user: Select.users.getActiveUser(state)
  };
};

var mapDispatchToProps$2 = function mapDispatchToProps(dispatch) {
  return {
    login: function login() {
      dispatch(Action.components.set('App_Container', 'loginOverlayOpen', true));
    },
    logout: function logout() {
      dispatch(Action.users.apiLogoutUser());
    }
  };
};

var User = connect(mapStateToProps$5, mapDispatchToProps$2);

var mapStateToProps$6 = function mapStateToProps(state, ownProps) {
  return {
    set: Select.windows.getSetByKey(state, ownProps.setKey),
    windows: Select.windows.getWindowsBySetKeyAsObject(state, ownProps.setKey)
  };
};

var mapDispatchToProps$3 = function mapDispatchToProps(dispatch, ownProps) {
  return {
    onWindowClick: function onWindowClick(windowKey) {
      dispatch(Action.windows.topWindow(ownProps.setKey, windowKey));
    },
    onWindowClose: function onWindowClose(windowKey) {
      dispatch(Action.windows.remove(ownProps.setKey, windowKey));
    },
    onWindowDragStart: function onWindowDragStart(windowKey) {
      dispatch(Action.windows.topWindow(ownProps.setKey, windowKey));
    },
    onWindowDragStop: function onWindowDragStop(windowKey, position) {
      dispatch(Action.windows.updateSettings(windowKey, {
        position: position
      }));
    },
    onWindowResize: function onWindowResize(windowKey, width, height, position) {
      dispatch(Action.windows.updateSettings(windowKey, {
        width: width,
        height: height,
        position: position
      }));
    }
  };
};

var WindowsContainer = connect(mapStateToProps$6, mapDispatchToProps$3);

var connects = {
  AppContainer: AppContainer,
  CartesianChart: CartesianChart,
  Map: Map,
  MapSet: MapSet,
  Screens: Screens$2,
  User: User,
  WindowsContainer: WindowsContainer
};

function mountWrapper(Component) {
  return /*#__PURE__*/function (_React$PureComponent) {
    _inherits(_class, _React$PureComponent);

    var _super = _createSuper(_class);

    function _class() {
      _classCallCheck(this, _class);

      return _super.apply(this, arguments);
    }

    _createClass(_class, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.props.onMount();
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.props.onUnmount();
      }
    }, {
      key: "render",
      value: function render() {
        return /*#__PURE__*/React.createElement(Component, this.props);
      }
    }]);

    return _class;
  }(React.PureComponent);
}

var DEFAULT_INITIAL_STATE = {
  activeKey: null,
  byKey: null,
  count: null,
  editedByKey: null,
  indexes: null,
  inUse: {
    indexes: null,
    keys: null
  },
  lastChangedOn: null,
  loading: false,
  loadingKeys: null
};
var commonReducers = {
  /**
   * Add models to store or update them
   * @param state {Object}
   * @param action {Object}
   * @param action.data {Array} A collection of models to add
   * @return {Object} updated state
   */
  add: function add(state, action) {
    var _action$data;

    if (action !== null && action !== void 0 && (_action$data = action.data) !== null && _action$data !== void 0 && _action$data.length) {
      var newData = _objectSpread2({}, state.byKey);

      action.data.forEach(function (model) {
        newData[model.key] = _objectSpread2(_objectSpread2({}, newData[model.key]), model);
        delete newData[model.key].outdated;
        delete newData[model.key].unreceived;
      });
      return _objectSpread2(_objectSpread2({}, state), {}, {
        byKey: newData
      });
    } else {
      return state;
    }
  },

  /**
   * Add just keys and mark as unreceived for unreceived models
   * @param state {Object}
   * @param action {Object}
   * @param action.keys {Array} A list of unreceived keys
   * @return {Object} updated state
   */
  addUnreceivedKeys: function addUnreceivedKeys(state, action) {
    var _action$keys;

    if (action !== null && action !== void 0 && (_action$keys = action.keys) !== null && _action$keys !== void 0 && _action$keys.length) {
      var newData = _objectSpread2({}, state.byKey);

      action.keys.forEach(function (key) {
        newData[key] = {
          key: key,
          unreceived: true
        };
      });
      return _objectSpread2(_objectSpread2({}, state), {}, {
        byKey: newData
      });
    } else {
      return state;
    }
  },

  /**
   * Add new or updated existing index
   * @param state {Object}
   * @param action {Object}
   * @param action.data {Array} A collection of models to add
   * @param action.filter {Object}
   * @param action.order {Array}
   * @param action.start {number}
   * @param action.length {number}
   * @param action.count {number}
   * @param action.changedOn {string}
   * @return {Object} updated state
   */
  addIndex: function addIndex(state, action) {
    if (action !== null && action !== void 0 && action.data) {
      var updatedIndexes = state.indexes ? _toConsumableArray(state.indexes) : [];
      var indexOfIndex = updatedIndexes.length ? _findIndex2(state.indexes, function (index) {
        return _isEqual2(index.filter, action.filter) && _isEqual2(index.order, action.order);
      }) : -1; // update existing index

      if (indexOfIndex > -1) {
        var updatedIndex = _objectSpread2({}, updatedIndexes[indexOfIndex]); // register models to index


        var updatedIndexIndex = commonHelpers.registerModelsToIndex(_objectSpread2({}, updatedIndex.index), action.data, action.start); // Remove loading indicator if data does not come

        if (action.length) {
          for (var i = action.start; i < action.start + action.length; i++) {
            if (updatedIndexIndex[i] === true) {
              delete updatedIndexIndex[i];
            }
          }
        }

        updatedIndexes[indexOfIndex] = _objectSpread2(_objectSpread2({}, updatedIndex), {}, {
          count: action.count || updatedIndex.count || null,
          changedOn: action.changedOn || updatedIndex.changedOn || null,
          index: updatedIndexIndex
        });
      } // add new index
      else {
          updatedIndexes.push({
            filter: action.filter || null,
            order: action.order || null,
            count: action.count || null,
            changedOn: action.changedOn || null,
            index: commonHelpers.registerModelsToIndex({}, action.data, action.start)
          });
        }

      return _objectSpread2(_objectSpread2({}, state), {}, {
        indexes: updatedIndexes
      });
    } else {
      return state;
    }
  },

  /**
   * Register usage of indexed data
   * @param state {Object}
   * @param action {Object}
   * @param action.data {Array} A collection of models to add
   * @param action.componentId {string}
   * @param action.filterByActive {Object}
   * @param action.filter {Object}
   * @param action.order {Array}
   * @param action.start {number}
   * @param action.length {number}
   * @return {Object} updated state
   */
  registerUseIndexed: function registerUseIndexed(state, action) {
    var newUse = {
      filterByActive: action.filterByActive,
      filter: action.filter,
      order: action.order,
      start: action.start,
      length: action.length
    };
    var existingUse = false;

    if (state.inUse.indexes && state.inUse.indexes[action.componentId]) {
      existingUse = _find2(state.inUse.indexes[action.componentId], newUse);
    } // add use if it doesn't already exist


    if (!existingUse) {
      return _objectSpread2(_objectSpread2({}, state), {}, {
        inUse: _objectSpread2(_objectSpread2({}, state.inUse), {}, {
          indexes: _objectSpread2(_objectSpread2({}, state.inUse.indexes), {}, _defineProperty({}, action.componentId, state.inUse.indexes && state.inUse.indexes[action.componentId] ? [].concat(_toConsumableArray(state.inUse.indexes[action.componentId]), [newUse]) : [newUse]))
        })
      });
    } else {
      return state;
    }
  },

  /**
   * Clear the usage of indexed data
   * @param state {Object}
   * @param action {Object}
   * @param action.componentId {string}
   * @return {Object} updated state
   */
  useIndexedClear: function useIndexedClear(state, action) {
    var _state$inUse, _state$inUse$indexes;

    if (action.componentId && (_state$inUse = state.inUse) !== null && _state$inUse !== void 0 && (_state$inUse$indexes = _state$inUse.indexes) !== null && _state$inUse$indexes !== void 0 && _state$inUse$indexes.hasOwnProperty(action.componentId)) {
      var indexes = _objectSpread2({}, state.inUse.indexes);

      delete indexes[action.componentId];
      return _objectSpread2(_objectSpread2({}, state), {}, {
        inUse: _objectSpread2(_objectSpread2({}, state.inUse), {}, {
          indexes: _isEmpty2(indexes) ? null : indexes
        })
      });
    } else {
      return state;
    }
  },

  /**
   * Clear all usages of indexed data
   * @param state {Object}
   * @param action {Object}
   * @return {Object} updated state
   */
  useIndexedClearAll: function useIndexedClearAll(state, action) {
    var _state$inUse2;

    if (state.inUse && (_state$inUse2 = state.inUse) !== null && _state$inUse2 !== void 0 && _state$inUse2.indexes) {
      return _objectSpread2(_objectSpread2({}, state), {}, {
        inUse: _objectSpread2(_objectSpread2({}, state.inUse), {}, {
          indexes: null
        })
      });
    } else {
      return state;
    }
  },

  /**
   * Register the usage of a model with key
   * @param state {Object}
   * @param action {Object}
   * @param action.componentId {Object} string
   * @param action.keys {Array} list of keys
   * @return {Object} updated state
   */
  useKeysRegister: function useKeysRegister(state, action) {
    var _action$keys2;

    if (action.componentId && (_action$keys2 = action.keys) !== null && _action$keys2 !== void 0 && _action$keys2.length) {
      var _state$inUse$keys;

      return _objectSpread2(_objectSpread2({}, state), {}, {
        inUse: _objectSpread2(_objectSpread2({}, state.inUse), {}, {
          keys: _objectSpread2(_objectSpread2({}, state.inUse.keys), {}, _defineProperty({}, action.componentId, (_state$inUse$keys = state.inUse.keys) !== null && _state$inUse$keys !== void 0 && _state$inUse$keys[action.componentId] ? _union2(state.inUse.keys[action.componentId], action.keys) : action.keys))
        })
      });
    } else {
      return state;
    }
  },

  /**
   * Clear the usage of models for component
   * @param state {Object}
   * @param action {Object}
   * @param action.componentId {string}
   * @return {Object} updated state
   */
  useKeysClear: function useKeysClear(state, action) {
    if (action.componentId) {
      var keys = _objectSpread2({}, state.inUse.keys);

      delete keys[action.componentId];
      return _objectSpread2(_objectSpread2({}, state), {}, {
        inUse: _objectSpread2(_objectSpread2({}, state.inUse), {}, {
          keys: _isEmpty2(keys) ? null : keys
        })
      });
    } else {
      return state;
    }
  },

  /**
   * Mark model as deleted
   * @param state {Object}
   * @param action {Object}
   * @param action.key {string}
   * @return {Object} updated state
   */
  markDeleted: function markDeleted(state, action) {
    var _state$byKey;

    if (action.key && (_state$byKey = state.byKey) !== null && _state$byKey !== void 0 && _state$byKey[action.key]) {
      return _objectSpread2(_objectSpread2({}, state), {}, {
        byKey: _objectSpread2(_objectSpread2({}, state.byKey), {}, _defineProperty({}, action.key, _objectSpread2(_objectSpread2({}, state.byKey[action.key]), {}, {
          removed: true
        })))
      });
    } else {
      return state;
    }
  },

  /**
   * Remove models from byKey
   * @param state {Object}
   * @param action {Object}
   * @param action.keys {Array} list of model keys to remove
   * @return {Object} updated state
   */
  remove: function remove(state, action) {
    var _action$keys3;

    if ((_action$keys3 = action.keys) !== null && _action$keys3 !== void 0 && _action$keys3.length && state.byKey) {
      var updatedByKey = _omit2(state.byKey, action.keys);

      return _objectSpread2(_objectSpread2({}, state), {}, {
        byKey: _isEmpty2(updatedByKey) ? null : updatedByKey
      });
    } else {
      return state;
    }
  },

  /**
   * Remove edited models
   * @param state {Object}
   * @param action {Object}
   * @param action.keys {Array} list of model keys to remove
   * @return {Object} updated state
   */
  removeEdited: function removeEdited(state, action) {
    var _action$keys4;

    if ((_action$keys4 = action.keys) !== null && _action$keys4 !== void 0 && _action$keys4.length && state.editedByKey) {
      var updatedEditedByKey = _omit2(state.editedByKey, action.keys);

      return _objectSpread2(_objectSpread2({}, state), {}, {
        editedByKey: _isEmpty2(updatedEditedByKey) ? null : updatedEditedByKey
      });
    } else {
      return state;
    }
  },

  /**
   * Remove edited active model
   * @param state {Object}
   * @param action {Object}
   * @return {Object} updated state
   */
  removeEditedActive: function removeEditedActive(state, action) {
    if (state.activeKey && state.editedByKey) {
      var updatedEditedByKey = _omit2(state.editedByKey, state.activeKey);

      return _objectSpread2(_objectSpread2({}, state), {}, {
        editedByKey: _isEmpty2(updatedEditedByKey) ? null : updatedEditedByKey
      });
    } else {
      return state;
    }
  },

  /**
   * Remove edited model property
   * @param state {Object}
   * @param action {Object}
   * @param action.key {Array} edited model key
   * @param action.property {Array} edited model property
   * @return {Object} updated state
   */
  removeEditedProperty: function removeEditedProperty(state, action) {
    if (action.key && state.editedByKey) {
      var editedModel = state.editedByKey[action.key];
      var editedModelData = editedModel === null || editedModel === void 0 ? void 0 : editedModel.data;

      if (editedModelData !== null && editedModelData !== void 0 && editedModelData.hasOwnProperty(action.property)) {
        var _action$property = action.property;
            editedModelData[_action$property];
            var restProps = _objectWithoutProperties(editedModelData, [_action$property].map(_toPropertyKey));

        if (_isEmpty2(restProps)) {
          var editedModels = _objectSpread2({}, state.editedByKey);

          delete editedModels[action.key];
          return _objectSpread2(_objectSpread2({}, state), {}, {
            editedByKey: _isEmpty2(editedModels) ? null : editedModels
          });
        } else {
          return _objectSpread2(_objectSpread2({}, state), {}, {
            editedByKey: _objectSpread2(_objectSpread2({}, state.editedByKey), {}, _defineProperty({}, action.key, _objectSpread2(_objectSpread2({}, state.editedByKey[action.key]), {}, {
              data: restProps
            })))
          });
        }
      } else {
        return state;
      }
    } else {
      return state;
    }
  },

  /**
   * Set active key
   * @param state {Object}
   * @param action {Object}
   * @param action.key {string|null} key
   * @return {Object} state
   */
  setActive: function setActive(state, action) {
    return _objectSpread2(_objectSpread2({}, state), {}, {
      activeKey: action.key,
      activeKeys: null
    });
  },

  /**
   * Set active keys
   * @param state {Object}
   * @param action {Object}
   * @param action.keys {array|null} keys
   * @return {Object} state
   */
  setActiveMultiple: function setActiveMultiple(state, action) {
    return _objectSpread2(_objectSpread2({}, state), {}, {
      activeKeys: action.keys,
      activeKey: null
    });
  },

  /**
   * Add or update edited models
   * @param state {Object}
   * @param action {Object}
   * @param action.data {Object} update
   * @return {Object} updated state
   */
  updateEdited: function updateEdited(state, action) {
    var _action$data2;

    if ((_action$data2 = action.data) !== null && _action$data2 !== void 0 && _action$data2.length) {
      var newEditedData = _objectSpread2({}, state.editedByKey);

      action.data.forEach(function (model) {
        if (newEditedData[model.key]) {
          newEditedData[model.key] = _objectSpread2(_objectSpread2({}, newEditedData[model.key]), {}, {
            data: _objectSpread2(_objectSpread2({}, newEditedData[model.key].data), model.data)
          });
        } else {
          newEditedData[model.key] = model;
        }
      });
      return _objectSpread2(_objectSpread2({}, state), {}, {
        editedByKey: newEditedData
      });
    } else {
      return state;
    }
  },

  /**
   * Set indexes as outdated
   * @param state {Object}
   * @param action {Object}
   * @return {Object} updated state
   */
  clearIndexes: function clearIndexes(state, action) {
    var _state$indexes;

    if ((_state$indexes = state.indexes) !== null && _state$indexes !== void 0 && _state$indexes.length) {
      var indexes = _map(state.indexes, function (index) {
        return _objectSpread2(_objectSpread2({}, index), {}, {
          index: null,
          count: null,
          changedOn: null,
          outdated: index.index,
          outdatedCount: index.count
        });
      });

      return _objectSpread2(_objectSpread2({}, state), {}, {
        indexes: indexes
      });
    } else {
      return state;
    }
  },

  /**
   * Useful for invalidate data before refresh indexes
   * @param state {Object}
   * @param action {Object}
   * @param action.filter {Object}
   * @param action.order {Array}
   * @return {Object} updated state
   * */
  clearIndex: function clearIndex(state, action) {
    var _state$indexes2;

    if ((_state$indexes2 = state.indexes) !== null && _state$indexes2 !== void 0 && _state$indexes2.length) {
      var indexes = _toConsumableArray(state.indexes).map(function (index) {
        var correspondIndex = commonHelpers.isCorrespondingIndex(index, action.filter, action.order);

        if (correspondIndex) {
          return _objectSpread2(_objectSpread2({}, index), {}, {
            outdated: index.index,
            outdatedCount: index.count,
            index: null,
            count: null,
            changedOn: null
          });
        } else {
          return index;
        }
      });

      return _objectSpread2(_objectSpread2({}, state), {}, {
        indexes: indexes
      });
    } else {
      return state;
    }
  },

  /**
   * Mark all models as outdated
   * @param state {Object}
   * @param action {Object}
   * @return {Object}
   */
  dataSetOutdated: function dataSetOutdated(state, action) {
    if (state.byKey) {
      var byKey = {};

      _each(state.byKey, function (model, key) {
        byKey[key] = _objectSpread2(_objectSpread2({}, model), {}, {
          outdated: true
        });
      });

      return _objectSpread2(_objectSpread2({}, state), {}, {
        byKey: byKey
      });
    } else {
      return state;
    }
  },

  /**
   * Cleanup on logout
   * @param state {Object}
   * @param action {Object}
   * @return {Object}
   */
  cleanupOnLogout: function cleanupOnLogout(state, action) {
    if (state.byKey) {
      var byKey = {};

      _each(state.byKey, function (model, key) {
        var _model$permissions, _model$permissions$gu;

        if ((_model$permissions = model.permissions) !== null && _model$permissions !== void 0 && (_model$permissions$gu = _model$permissions.guest) !== null && _model$permissions$gu !== void 0 && _model$permissions$gu.get) {
          byKey[key] = _objectSpread2(_objectSpread2({}, model), {}, {
            permissions: {
              guest: model.permissions.guest
            }
          });
        }
      });

      return _objectSpread2(_objectSpread2({}, state), {}, {
        byKey: byKey
      });
    } else {
      return state;
    }
  },

  /**
   * Update whole state
   * @param state {Object}
   * @param action {Object}
   * @return {Object}
   */
  updateStore: function updateStore(state, action) {
    if (action) {
      action.type;
          var data = _objectWithoutProperties(action, ["type"]);

      return _objectSpread2(_objectSpread2({}, state), data);
    } else {
      return state;
    }
  }
};

/**
 * A list of stores where indexes should be checked, if they depend on given filter by active.
 * The collection item has following structure: {storeKey: [getSubstate, data type, action types, category path ('metadata' by default)]}
 */

var STORES_TO_ENSURE_WITH_FILTER_BY_ACTIVE = {
  areaRelations: [Select.areaRelations.getSubstate, 'area', commonActionTypes.AREA_RELATIONS, 'relations'],
  areaTrees: [Select.areas.areaTrees.getSubstate, 'areaTrees', commonActionTypes.AREAS.AREA_TREES],
  areaTreeLevels: [Select.areas.areaTrees.getSubstate, 'areaTreeLevels', commonActionTypes.AREAS.AREA_TREE_LEVELS],
  attributes: [Select.attributes.getSubstate, 'attributes', commonActionTypes.ATTRIBUTES],
  attributeSets: [Select.attributeSets.getSubstate, 'attributes', commonActionTypes.ATTRIBUTE_SETS],
  cases: [Select.cases.getSubstate, 'cases', commonActionTypes.CASES],
  layerTemplates: [Select.layerTemplates.getSubstate, 'layerTemplates', commonActionTypes.LAYER_TEMPLATES],
  periods: [Select.periods.getSubstate, 'periods', commonActionTypes.PERIODS],
  places: [Select.places.getSubstate, 'places', commonActionTypes.PLACES],
  scenarios: [Select.scenarios.getSubstate, 'scenarios', commonActionTypes.SCENARIOS],
  scopes: [Select.scopes.getSubstate, 'scopes', commonActionTypes.SCOPES],
  tags: [Select.tags.getSubstate, 'tags', commonActionTypes.TAGS],
  views: [Select.views.getSubstate, 'views', commonActionTypes.VIEWS, 'views']
};

/**
 * Ensure indexes with filter by active for each store from the list (above) & for data-based components
 *
 * @param filterKey {string} active metadata type key (e.g. scope, place, ..)
 */

function ensureDependenciesOfActiveMetadataType(filterKey) {
  return function (dispatch) {
    var filterByActive = _defineProperty({}, filterKey, true);

    _forIn(STORES_TO_ENSURE_WITH_FILTER_BY_ACTIVE, function (params) {
      dispatch(commonActions.ensureIndexesWithFilterByActive.apply(commonActions, _toConsumableArray(params))(filterByActive));
    });

    dispatch(DataComponentsActions.ensureWithFilterByActive(filterByActive));
    dispatch(MapsActions.ensureWithFilterByActive(filterByActive));
  };
}

var activeMetadataActions = {
  ensureDependenciesOfActiveMetadataType: ensureDependenciesOfActiveMetadataType
};

var INITIAL_STATE = {
  key: null
};
/**
 * @param state
 * @param action
 * @param action.key {string}
 * @return {Object}
 */

var setKey = function setKey(state, action) {
  return _objectSpread2(_objectSpread2({}, state), {}, {
    key: action.key
  });
};

var setBaseUrl = function setBaseUrl(state, action) {
  return _objectSpread2(_objectSpread2({}, state), {}, {
    baseUrl: action.url
  });
};

var setLocalConfiguration = function setLocalConfiguration(state, action) {
  var path = action.path.split('.');
  return _objectSpread2(_objectSpread2({}, state), {}, {
    localConfiguration: setHelper(state.localConfiguration, path, action.value)
  });
};

var updateLocalConfiguration = function updateLocalConfiguration(state, action) {
  return _objectSpread2(_objectSpread2({}, state), {}, {
    localConfiguration: state.localConfiguration ? _objectSpread2(_objectSpread2({}, state.localConfiguration), action.update) : action.update
  });
};

function setHelper(state, path, value) {
  var remainingPath = _toConsumableArray(path);

  var currentKey = remainingPath.shift();

  if (remainingPath.length) {
    return _objectSpread2(_objectSpread2({}, state), {}, _defineProperty({}, currentKey, setHelper(state[currentKey], remainingPath, value)));
  } else {
    return _objectSpread2(_objectSpread2({}, state), {}, _defineProperty({}, currentKey, value));
  }
}

var receiveConfiguration = function receiveConfiguration(state, action) {
  return _objectSpread2(_objectSpread2({}, state), {}, {
    configuration: action.configuration
  });
};

var appReducers = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case commonActionTypes.APP.SET_BASE_URL:
      return setBaseUrl(state, action);

    case commonActionTypes.APP.SET_KEY:
      return setKey(state, action);

    case commonActionTypes.APP.SET_LOCAL_CONFIGURATION:
      return setLocalConfiguration(state, action);

    case commonActionTypes.APP.UPDATE_LOCAL_CONFIGURATION:
      return updateLocalConfiguration(state, action);

    case commonActionTypes.APP.RECEIVE_CONFIGURATION:
      return receiveConfiguration(state, action);

    default:
      return state;
  }
});

var INITIAL_STATE$1 = _objectSpread2({}, DEFAULT_INITIAL_STATE);

var areaTreeLevels$2 = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE$1;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case commonActionTypes.AREAS.AREA_TREE_LEVELS.ADD:
      return commonReducers.add(state, action);

    case commonActionTypes.AREAS.AREA_TREE_LEVELS.ADD_UNRECEIVED:
      return commonReducers.addUnreceivedKeys(state, action);

    case commonActionTypes.AREAS.AREA_TREE_LEVELS.INDEX.ADD:
      return commonReducers.addIndex(state, action);

    case commonActionTypes.AREAS.AREA_TREE_LEVELS.SET_ACTIVE_KEY:
      return commonReducers.setActive(state, action);

    case commonActionTypes.AREAS.AREA_TREE_LEVELS.USE.INDEXED.REGISTER:
      return commonReducers.registerUseIndexed(state, action);

    case commonActionTypes.AREAS.AREA_TREE_LEVELS.USE.INDEXED.CLEAR:
      return commonReducers.useIndexedClear(state, action);

    case commonActionTypes.AREAS.AREA_TREE_LEVELS.USE.KEYS.REGISTER:
      return commonReducers.useKeysRegister(state, action);

    case commonActionTypes.AREAS.AREA_TREE_LEVELS.USE.KEYS.CLEAR:
      return commonReducers.useKeysClear(state, action);

    case commonActionTypes.AREAS.AREA_TREE_LEVELS.INDEX.CLEAR_ALL:
      return commonReducers.clearIndexes(state, action);

    case commonActionTypes.COMMON.DATA.SET_OUTDATED:
      return commonReducers.dataSetOutdated(state, action);

    case commonActionTypes.COMMON.DATA.CLEANUP_ON_LOGOUT:
      return commonReducers.cleanupOnLogout(state, action);

    default:
      return state;
  }
});

var INITIAL_STATE$2 = _objectSpread2({}, DEFAULT_INITIAL_STATE);

var areaTrees$2 = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE$2;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case commonActionTypes.AREAS.AREA_TREES.ADD:
      return commonReducers.add(state, action);

    case commonActionTypes.AREAS.AREA_TREES.ADD_UNRECEIVED:
      return commonReducers.addUnreceivedKeys(state, action);

    case commonActionTypes.AREAS.AREA_TREES.INDEX.ADD:
      return commonReducers.addIndex(state, action);

    case commonActionTypes.AREAS.AREA_TREES.SET_ACTIVE_KEY:
      return commonReducers.setActive(state, action);

    case commonActionTypes.AREAS.AREA_TREES.USE.INDEXED.REGISTER:
      return commonReducers.registerUseIndexed(state, action);

    case commonActionTypes.AREAS.AREA_TREES.USE.INDEXED.CLEAR:
      return commonReducers.useIndexedClear(state, action);

    case commonActionTypes.AREAS.AREA_TREES.USE.KEYS.REGISTER:
      return commonReducers.useKeysRegister(state, action);

    case commonActionTypes.AREAS.AREA_TREES.USE.KEYS.CLEAR:
      return commonReducers.useKeysClear(state, action);

    case commonActionTypes.AREAS.AREA_TREES.INDEX.CLEAR_ALL:
      return commonReducers.clearIndexes(state, action);

    case commonActionTypes.COMMON.DATA.SET_OUTDATED:
      return commonReducers.dataSetOutdated(state, action);

    case commonActionTypes.COMMON.DATA.CLEANUP_ON_LOGOUT:
      return commonReducers.cleanupOnLogout(state, action);

    default:
      return state;
  }
});

var areasReducers = combineReducers({
  areaTreeLevels: areaTreeLevels$2,
  areaTrees: areaTrees$2
});

var INITIAL_STATE$3 = _objectSpread2({}, DEFAULT_INITIAL_STATE);

var areaRelationsReducers = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE$3;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case commonActionTypes.AREA_RELATIONS.ADD:
      return commonReducers.add(state, action);

    case commonActionTypes.AREA_RELATIONS.ADD_UNRECEIVED:
      return commonReducers.addUnreceivedKeys(state, action);

    case commonActionTypes.AREA_RELATIONS.INDEX.ADD:
      return commonReducers.addIndex(state, action);

    case commonActionTypes.AREA_RELATIONS.USE.INDEXED.REGISTER:
      return commonReducers.registerUseIndexed(state, action);

    case commonActionTypes.AREA_RELATIONS.USE.INDEXED.CLEAR:
      return commonReducers.useIndexedClear(state, action);

    case commonActionTypes.AREA_RELATIONS.USE.INDEXED.CLEAR_ALL:
      return commonReducers.useIndexedClearAll(state, action);

    default:
      return state;
  }
});

var INITIAL_STATE$4 = _objectSpread2({}, DEFAULT_INITIAL_STATE);
var attributesReducers = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE$4;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case commonActionTypes.ATTRIBUTES.ADD:
      return commonReducers.add(state, action);

    case commonActionTypes.ATTRIBUTES.ADD_UNRECEIVED:
      return commonReducers.addUnreceivedKeys(state, action);

    case commonActionTypes.ATTRIBUTES.DELETE:
      return commonReducers.remove(state, action);

    case commonActionTypes.ATTRIBUTES.EDITED.REMOVE:
      return commonReducers.removeEdited(state, action);

    case commonActionTypes.ATTRIBUTES.EDITED.REMOVE_ACTIVE:
      return commonReducers.removeEditedActive(state, action);

    case commonActionTypes.ATTRIBUTES.EDITED.REMOVE_PROPERTY:
      return commonReducers.removeEditedProperty(state, action);

    case commonActionTypes.ATTRIBUTES.EDITED.UPDATE:
      return commonReducers.updateEdited(state, action);

    case commonActionTypes.ATTRIBUTES.INDEX.ADD:
      return commonReducers.addIndex(state, action);

    case commonActionTypes.ATTRIBUTES.INDEX.CLEAR_ALL:
      return commonReducers.clearIndexes(state, action);

    case commonActionTypes.ATTRIBUTES.INDEX.CLEAR_INDEX:
      return commonReducers.clearIndex(state, action);

    case commonActionTypes.ATTRIBUTES.MARK_DELETED:
      return commonReducers.markDeleted(state, action);

    case commonActionTypes.ATTRIBUTES.SET_ACTIVE_KEY:
      return commonReducers.setActive(state, action);

    case commonActionTypes.ATTRIBUTES.SET_ACTIVE_KEYS:
      return commonReducers.setActiveMultiple(state, action);

    case commonActionTypes.ATTRIBUTES.UPDATE_STORE:
      return commonReducers.updateStore(state, action);

    case commonActionTypes.ATTRIBUTES.USE.INDEXED.CLEAR:
      return commonReducers.useIndexedClear(state, action);

    case commonActionTypes.ATTRIBUTES.USE.INDEXED.CLEAR_ALL:
      return commonReducers.useIndexedClearAll(state, action);

    case commonActionTypes.ATTRIBUTES.USE.INDEXED.REGISTER:
      return commonReducers.registerUseIndexed(state, action);

    case commonActionTypes.ATTRIBUTES.USE.KEYS.REGISTER:
      return commonReducers.useKeysRegister(state, action);

    case commonActionTypes.ATTRIBUTES.USE.KEYS.CLEAR:
      return commonReducers.useKeysClear(state, action);

    case commonActionTypes.COMMON.DATA.SET_OUTDATED:
      return commonReducers.dataSetOutdated(state, action);

    case commonActionTypes.COMMON.DATA.CLEANUP_ON_LOGOUT:
      return commonReducers.cleanupOnLogout(state, action);

    default:
      return state;
  }
});

var INITIAL_STATE$5 = _objectSpread2(_objectSpread2({}, DEFAULT_INITIAL_STATE), {}, {
  activeKeys: null
});
var attributeSetsReducers = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE$5;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case commonActionTypes.ATTRIBUTE_SETS.ADD:
      return commonReducers.add(state, action);

    case commonActionTypes.ATTRIBUTE_SETS.ADD_UNRECEIVED:
      return commonReducers.addUnreceivedKeys(state, action);

    case commonActionTypes.ATTRIBUTE_SETS.DELETE:
      return commonReducers.remove(state, action);

    case commonActionTypes.ATTRIBUTE_SETS.EDITED.REMOVE:
      return commonReducers.removeEdited(state, action);

    case commonActionTypes.ATTRIBUTE_SETS.EDITED.REMOVE_ACTIVE:
      return commonReducers.removeEditedActive(state, action);

    case commonActionTypes.ATTRIBUTE_SETS.EDITED.REMOVE_PROPERTY:
      return commonReducers.removeEditedProperty(state, action);

    case commonActionTypes.ATTRIBUTE_SETS.EDITED.UPDATE:
      return commonReducers.updateEdited(state, action);

    case commonActionTypes.ATTRIBUTE_SETS.INDEX.ADD:
      return commonReducers.addIndex(state, action);

    case commonActionTypes.ATTRIBUTE_SETS.INDEX.CLEAR_ALL:
      return commonReducers.clearIndexes(state, action);

    case commonActionTypes.ATTRIBUTE_SETS.INDEX.CLEAR_INDEX:
      return commonReducers.clearIndex(state, action);

    case commonActionTypes.ATTRIBUTE_SETS.MARK_DELETED:
      return commonReducers.markDeleted(state, action);

    case commonActionTypes.ATTRIBUTE_SETS.SET_ACTIVE_KEY:
      return commonReducers.setActive(state, action);

    case commonActionTypes.ATTRIBUTE_SETS.SET_ACTIVE_KEYS:
      return commonReducers.setActiveMultiple(state, action);

    case commonActionTypes.ATTRIBUTE_SETS.UPDATE_STORE:
      return commonReducers.updateStore(state, action);

    case commonActionTypes.ATTRIBUTE_SETS.USE.INDEXED.CLEAR:
      return commonReducers.useIndexedClear(state, action);

    case commonActionTypes.ATTRIBUTE_SETS.USE.INDEXED.CLEAR_ALL:
      return commonReducers.useIndexedClearAll(state, action);

    case commonActionTypes.ATTRIBUTE_SETS.USE.INDEXED.REGISTER:
      return commonReducers.registerUseIndexed(state, action);

    case commonActionTypes.ATTRIBUTE_SETS.USE.KEYS.REGISTER:
      return commonReducers.useKeysRegister(state, action);

    case commonActionTypes.ATTRIBUTE_SETS.USE.KEYS.CLEAR:
      return commonReducers.useKeysClear(state, action);

    case commonActionTypes.COMMON.DATA.SET_OUTDATED:
      return commonReducers.dataSetOutdated(state, action);

    case commonActionTypes.COMMON.DATA.CLEANUP_ON_LOGOUT:
      return commonReducers.cleanupOnLogout(state, action);

    default:
      return state;
  }
});

var INITIAL_STATE$6 = _objectSpread2({}, DEFAULT_INITIAL_STATE);
var casesReducers = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE$6;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case commonActionTypes.CASES.ADD:
      return commonReducers.add(state, action);

    case commonActionTypes.CASES.ADD_UNRECEIVED:
      return commonReducers.addUnreceivedKeys(state, action);

    case commonActionTypes.CASES.DELETE:
      return commonReducers.remove(state, action);

    case commonActionTypes.CASES.EDITED.REMOVE:
      return commonReducers.removeEdited(state, action);

    case commonActionTypes.CASES.EDITED.REMOVE_ACTIVE:
      return commonReducers.removeEditedActive(state, action);

    case commonActionTypes.CASES.EDITED.REMOVE_PROPERTY:
      return commonReducers.removeEditedProperty(state, action);

    case commonActionTypes.CASES.EDITED.UPDATE:
      return commonReducers.updateEdited(state, action);

    case commonActionTypes.CASES.INDEX.ADD:
      return commonReducers.addIndex(state, action);

    case commonActionTypes.CASES.INDEX.CLEAR_ALL:
      return commonReducers.clearIndexes(state, action);

    case commonActionTypes.CASES.INDEX.CLEAR_INDEX:
      return commonReducers.clearIndex(state, action);

    case commonActionTypes.CASES.MARK_DELETED:
      return commonReducers.markDeleted(state, action);

    case commonActionTypes.CASES.SET_ACTIVE_KEY:
      return commonReducers.setActive(state, action);

    case commonActionTypes.CASES.SET_ACTIVE_KEYS:
      return commonReducers.setActiveMultiple(state, action);

    case commonActionTypes.CASES.UPDATE_STORE:
      return commonReducers.updateStore(state, action);

    case commonActionTypes.CASES.USE.INDEXED.CLEAR:
      return commonReducers.useIndexedClear(state, action);

    case commonActionTypes.CASES.USE.INDEXED.CLEAR_ALL:
      return commonReducers.useIndexedClearAll(state, action);

    case commonActionTypes.CASES.USE.INDEXED.REGISTER:
      return commonReducers.registerUseIndexed(state, action);

    case commonActionTypes.CASES.USE.KEYS.REGISTER:
      return commonReducers.useKeysRegister(state, action);

    case commonActionTypes.CASES.USE.KEYS.CLEAR:
      return commonReducers.useKeysClear(state, action);

    case commonActionTypes.COMMON.DATA.SET_OUTDATED:
      return commonReducers.dataSetOutdated(state, action);

    case commonActionTypes.COMMON.DATA.CLEANUP_ON_LOGOUT:
      return commonReducers.cleanupOnLogout(state, action);

    default:
      return state;
  }
});

var INITIAL_STATE$7 = {};
/**
 * Update component
 * @param state {Object}
 * @param componentKey {string}
 * @param update {Object}
 * @return {Object} state
 */

function update$1(state, componentKey, update) {
  if (!_isEmpty2(update)) {
    return _objectSpread2(_objectSpread2({}, state), {}, _defineProperty({}, componentKey, state[componentKey] ? _objectSpread2(_objectSpread2({}, state[componentKey]), update) : update));
  } else {
    return state;
  }
}
/**
 * Set value in given path
 * @param state {Object}
 * @param component {string}
 * @param path {string} data.property.something
 * @param value {*}
 * @return {Object} state
 */


function set(state, component, path, value) {
  if (component && path) {
    var pathParams = path.split('.');
    return _objectSpread2(_objectSpread2({}, state), {}, _defineProperty({}, component, setHelper$1(state[component], pathParams, value)));
  } else {
    return state;
  }
} // helpers ---------------------------------------------------------------------

/**
 *
 * @param state {Object}
 * @param path {string}
 * @param value {*}
 * @return {Object}
 */


function setHelper$1(state, path, value) {
  var remainingPath = _toConsumableArray(path);

  var currentKey = remainingPath.shift();

  if (remainingPath.length) {
    return _objectSpread2(_objectSpread2({}, state), {}, _defineProperty({}, currentKey, setHelper$1(state[currentKey], remainingPath, value)));
  } else {
    return _objectSpread2(_objectSpread2({}, state), {}, _defineProperty({}, currentKey, value));
  }
}

var componentsReducers = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE$7;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case commonActionTypes.COMPONENTS.UPDATE:
      return update$1(state, action.component, action.update);

    case commonActionTypes.COMPONENTS.UPDATE_STORE:
      return commonReducers.updateStore(state, action);

    case commonActionTypes.COMPONENTS.SET:
      return set(state, action.component, action.path, action.value);

    default:
      return state;
  }
});

var INITIAL_STATE$8 = _objectSpread2({}, DEFAULT_INITIAL_STATE);
var attributeRelations$2 = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE$8;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case commonActionTypes.DATA.ATTRIBUTE_RELATIONS.ADD:
      return commonReducers.add(state, action);

    case commonActionTypes.DATA.ATTRIBUTE_RELATIONS.INDEX.ADD:
      return commonReducers.addIndex(state, action);

    case commonActionTypes.DATA.ATTRIBUTE_RELATIONS.UPDATE_STORE:
      return commonReducers.updateStore(state, action.data);

    default:
      return state;
  }
});

var INITIAL_STATE$9 = _objectSpread2({}, DEFAULT_INITIAL_STATE);
var attributeDataSources$2 = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE$9;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case commonActionTypes.DATA.ATTRIBUTE_DATA_SOURCES.ADD:
      return commonReducers.add(state, action);

    case commonActionTypes.DATA.ATTRIBUTE_DATA_SOURCES.INDEX.ADD:
      return commonReducers.addIndex(state, action);

    case commonActionTypes.DATA.ATTRIBUTE_DATA_SOURCES.UPDATE_STORE:
      return commonReducers.updateStore(state, action.data);

    default:
      return state;
  }
});

var INITIAL_STATE$a = _objectSpread2(_objectSpread2({}, DEFAULT_INITIAL_STATE), {}, {
  byDataSourceKey: {}
});
/**
 * Add attribute data
 * @param state {Object}
 * @param attributeDataSourceKey {string} attribute data source key
 * @param data {Object} feature key - attribute value pairs
 * @return {Object}
 */

var add$f = function add(state, attributeDataSourceKey, data) {
  if (attributeDataSourceKey && data) {
    return _objectSpread2(_objectSpread2({}, state), {}, {
      byDataSourceKey: _objectSpread2(_objectSpread2({}, state.byDataSourceKey), {}, _defineProperty({}, attributeDataSourceKey, data))
    });
  } else {
    return state;
  }
};
/**
 * Update attribute data for given data source
 * @param state {Object}
 * @param attributeDataSourceKey {string} attribute data source key
 * @param data {Object} feature key - attribute value pairs
 * @return {Object}
 */


var update$2 = function update(state, attributeDataSourceKey, data) {
  if (attributeDataSourceKey && data) {
    return _objectSpread2(_objectSpread2({}, state), {}, {
      byDataSourceKey: _objectSpread2(_objectSpread2({}, state.byDataSourceKey), {}, _defineProperty({}, attributeDataSourceKey, state.byDataSourceKey[attributeDataSourceKey] ? _objectSpread2(_objectSpread2({}, state.byDataSourceKey[attributeDataSourceKey]), data) : data))
    });
  } else {
    return state;
  }
};
/**
 * @param state {Object}
 * @param attributeDataSourceKey {string} uuid
 * @param data {Object} attribute data
 * @param filter {Object}
 * @param order {Array}
 * @param indexData {Array}
 * @param changedOn {string}
 * @return {Object}
 */


var addWithSpatialIndex = function addWithSpatialIndex(state, attributeDataSourceKey, data, filter, order, indexData, changedOn) {
  var byDataSourceKey = _objectSpread2(_objectSpread2({}, state.byDataSourceKey), {}, _defineProperty({}, attributeDataSourceKey, state.byDataSourceKey[attributeDataSourceKey] ? _objectSpread2(_objectSpread2({}, state.byDataSourceKey[attributeDataSourceKey]), data) : data)); // TODO test commonHelpers.getUpdatedIndexes properly


  var updatedIndexes = commonHelpers.getUpdatedIndexes(state, filter, order, indexData, changedOn, 'spatialIndexes');
  return _objectSpread2(_objectSpread2({}, state), {}, {
    byDataSourceKey: byDataSourceKey,
    spatialIndexes: updatedIndexes
  });
};
/**
 * Add data and index in one step
 * @param state {Object}
 * @param index {Array} ordered index
 * @param data {Object} Object with data
 * @param filter {Array}
 * @param order {Array}
 * @param start {Array}
 * @param total {Array}
 * @param changedOn {string}
 * @return {Object}
 */


var addWithIndex = function addWithIndex(state, index, data, filter, order, start, total, changedOn) {
  // TODO test commonHelpers.getUpdatedByDataSourceKey properly
  var byDataSourceKey = commonHelpers.getUpdatedByDataSourceKey(state.byDataSourceKey, data); //Fake new data object for common action

  var newData = _reduce(index, function (acc, val) {
    return [].concat(_toConsumableArray(acc), [{
      key: val
    }]);
  }, []);

  var addIndexAction = {
    filter: filter,
    order: order,
    data: newData,
    start: start,
    count: total,
    changedOn: changedOn
  }; // TODO test common.addIndex properly

  var stateWithUpdatedIndexes = commonReducers.addIndex(state, addIndexAction);
  return _objectSpread2(_objectSpread2({}, state), {}, {
    byDataSourceKey: byDataSourceKey,
    indexes: stateWithUpdatedIndexes.indexes
  });
};
/**
 * Add spatial index
 * @param state {Object}
 * @param filter {Object}
 * @param order {Array}
 * @param indexData {Array}
 * @param changedOn {string}
 * @return {*&{spatialIndexes: []}}
 */


var addSpatialIndex = function addSpatialIndex(state, filter, order, indexData, changedOn) {
  var updatedIndexes = commonHelpers.getUpdatedIndexes(state, filter, order, indexData, changedOn, 'spatialIndexes');
  return _objectSpread2(_objectSpread2({}, state), {}, {
    spatialIndexes: updatedIndexes
  });
};
/**
 * Remove spatial index that fit to filter and order from state.
 * @param {Object} state
 * @param {Object} filter
 * @param {Object} order
 * @return {Object}
 */


var removeSpatialIndex = function removeSpatialIndex(state, filter, order) {
  var updatedIndexes = commonHelpers.removeIndex(state.spatialIndexes, filter, order);
  return _objectSpread2(_objectSpread2({}, state), {}, {
    spatialIndexes: updatedIndexes
  });
};

var attributeData$2 = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE$a;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case commonActionTypes.DATA.ATTRIBUTE_DATA.ADD:
      return add$f(state, action.key, action.data);

    case commonActionTypes.DATA.ATTRIBUTE_DATA.ADD_WITH_SPATIAL_INDEX:
      return addWithSpatialIndex(state, action.attributeDataSourceKey, action.data, action.filter, action.order, action.indexData, action.changedOn);

    case commonActionTypes.DATA.ATTRIBUTE_DATA.ADD_WITH_INDEX:
      return addWithIndex(state, action.index, action.data, action.filter, action.order, action.start, action.total, action.changedOn);

    case commonActionTypes.DATA.ATTRIBUTE_DATA.UPDATE:
      return update$2(state, action.key, action.data);

    case commonActionTypes.DATA.ATTRIBUTE_DATA.INDEX.ADD:
      return commonReducers.addIndex(state, action);

    case commonActionTypes.DATA.ATTRIBUTE_DATA.SPATIAL_INDEX.ADD:
      return addSpatialIndex(state, action.filter, action.order, action.indexData, action.changedOn);

    case commonActionTypes.DATA.ATTRIBUTE_DATA.SPATIAL_INDEX.REMOVE:
      return removeSpatialIndex(state, action.filter, action.order);

    case commonActionTypes.DATA.ATTRIBUTE_DATA.UPDATE_STORE:
      return commonReducers.updateStore(state, action.data);

    default:
      return state;
  }
});

var INITIAL_STATE$b = {
  components: {
    byKey: {},
    inUse: []
  },
  sets: {}
};
/**
 * Remove component key from the list of usages
 * @param state {Object}
 * @param componentKey {string}
 * @return {Object} updated state
 */

var componentUseClear$1 = function componentUseClear(state, componentKey) {
  if (componentKey && !_isEmpty2(state.components.inUse)) {
    var index = _indexOf2(state.components.inUse, componentKey);

    if (index > -1) {
      var updatedInUse = [].concat(_toConsumableArray(state.components.inUse.slice(0, index)), _toConsumableArray(state.components.inUse.slice(index + 1)));
      return _objectSpread2(_objectSpread2({}, state), {}, {
        components: _objectSpread2(_objectSpread2({}, state.components), {}, {
          inUse: updatedInUse
        })
      });
    } else {
      return state;
    }
  } else {
    return state;
  }
};
/**
 * Add component key to the list of usages
 * @param state {Object}
 * @param componentKey {string}
 * @return {Object} updated state
 */


var componentUseRegister$1 = function componentUseRegister(state, componentKey) {
  if (componentKey) {
    return _objectSpread2(_objectSpread2({}, state), {}, {
      components: _objectSpread2(_objectSpread2({}, state.components), {}, {
        inUse: [].concat(_toConsumableArray(state.components.inUse), [componentKey])
      })
    });
  } else {
    return state;
  }
};
/**
 * Set attribute keys for given component
 * @param state {Object}
 * @param componentKey {string}
 * @param attributeKeys {Array}
 * @return {Object} updated state
 */


var setComponentAttributeKeys = function setComponentAttributeKeys(state, componentKey, attributeKeys) {
  if (componentKey && attributeKeys !== null && attributeKeys !== void 0 && attributeKeys.length) {
    return _objectSpread2(_objectSpread2({}, state), {}, {
      components: _objectSpread2(_objectSpread2({}, state.components), {}, {
        byKey: _objectSpread2(_objectSpread2({}, state.components.byKey), {}, _defineProperty({}, componentKey, state.components.byKey[componentKey] ? _objectSpread2(_objectSpread2({}, state.components.byKey[componentKey]), {}, {
          attributeKeys: attributeKeys
        }) : {
          attributeKeys: attributeKeys
        }))
      })
    });
  } else {
    return state;
  }
};
/**
 * Update whole data.components.components.byKey object with given components
 * @param state {Object}
 * @param componentsByKey {Object}
 * @return {Object}
 */


var updateComponents = function updateComponents(state, componentsByKey) {
  if (componentsByKey) {
    return _objectSpread2(_objectSpread2({}, state), {}, {
      components: _objectSpread2(_objectSpread2({}, state.components), {}, {
        byKey: _objectSpread2(_objectSpread2({}, state.components.byKey), componentsByKey)
      })
    });
  } else {
    return state;
  }
};

var components$1 = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE$b;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case commonActionTypes.DATA.COMPONENTS.COMPONENT.SET.ATTRIBUTE_KEYS:
      return setComponentAttributeKeys(state, action.componentKey, action.attributeKeys);

    case commonActionTypes.DATA.COMPONENTS.COMPONENT.USE.CLEAR:
      return componentUseClear$1(state, action.componentKey);

    case commonActionTypes.DATA.COMPONENTS.COMPONENT.USE.REGISTER:
      return componentUseRegister$1(state, action.componentKey);

    case commonActionTypes.DATA.COMPONENTS.UPDATE_COMPONENTS:
      return updateComponents(state, action.components);

    default:
      return state;
  }
});

var INITIAL_STATE$c = _objectSpread2({}, DEFAULT_INITIAL_STATE);
var spatialRelations$2 = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE$c;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case commonActionTypes.DATA.SPATIAL_RELATIONS.ADD:
      return commonReducers.add(state, action);

    case commonActionTypes.DATA.SPATIAL_RELATIONS.INDEX.ADD:
      return commonReducers.addIndex(state, action);

    default:
      return state;
  }
});

var INITIAL_STATE$d = _objectSpread2({}, DEFAULT_INITIAL_STATE);
var spatialDataSources$2 = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE$d;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case commonActionTypes.DATA.SPATIAL_DATA_SOURCES.ADD:
      return commonReducers.add(state, action);

    case commonActionTypes.DATA.SPATIAL_DATA_SOURCES.INDEX.ADD:
      return commonReducers.addIndex(state, action);

    default:
      return state;
  }
});

var INITIAL_STATE$e = _objectSpread2(_objectSpread2({}, DEFAULT_INITIAL_STATE), {}, {
  byDataSourceKey: {}
});

var getEmptyFeature = function getEmptyFeature() {
  return {
    geometries: {}
  };
};
/**
 * Add spatial data
 * @param state {Object}
 * @param action {Object}
 * @param action.key {String} Data source key
 * @param action.level {number} Zoom level
 * @param action.data {Object} Features as object
 * @return {Object}
 */


var add$g = function add(state, action) {
  var dataSourceKey = action.key;
  var updatedDataForDataSourceKey = getUpdatedDataForDataSourceKey(state, dataSourceKey, action.data, action.level);
  return _objectSpread2(_objectSpread2({}, state), {}, {
    byDataSourceKey: _objectSpread2(_objectSpread2({}, state.byDataSourceKey), {}, _defineProperty({}, dataSourceKey, updatedDataForDataSourceKey))
  });
};

var addWithIndex$1 = function addWithIndex(state, action) {
  var updatedByDataSourceKey = getUpdatedByDataSourceKey$1(state, action.dataByDataSourceKey, action.level);
  var updatedIndexes = commonHelpers.getUpdatedIndexes(state, action.filter, action.order, action.indexData, action.changedOn);
  return _objectSpread2(_objectSpread2({}, state), {}, {
    byDataSourceKey: updatedByDataSourceKey,
    indexes: updatedIndexes
  });
};

var addIndex$4 = function addIndex(state, action) {
  var updatedIndexes = commonHelpers.getUpdatedIndexes(state, action.filter, action.order, action.indexData, action.changedOn);
  return _objectSpread2(_objectSpread2({}, state), {}, {
    indexes: updatedIndexes
  });
};
/**
 * Remove index that fit to filter and order from state.
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */


var removeIndex$1 = function removeIndex(state, action) {
  var updatedIndexes = commonHelpers.removeIndex(state.indexes, action.filter, action.order);
  return _objectSpread2(_objectSpread2({}, state), {}, {
    indexes: updatedIndexes
  });
}; // helpers

/**
 * @param state {Object}
 * @param dataSourceKey {string} uuid
 * @param featuresAsObject {Object}
 * @param level {number}
 * @return {Object}
 */


function getUpdatedDataForDataSourceKey(state, dataSourceKey, featuresAsObject, level) {
  // TODO what about features adding without level?
  var dataFeaturesKeys = Object.keys(featuresAsObject);
  var updatedData = state.byDataSourceKey[dataSourceKey] ? _objectSpread2({}, state.byDataSourceKey[dataSourceKey]) : {};
  dataFeaturesKeys.forEach(function (featureKey) {
    if (updatedData.hasOwnProperty(featureKey)) {
      //add just level geometry to existing feature
      updatedData[featureKey].geometries[level] = featuresAsObject[featureKey];
    } else {
      //create new feature with geometry and add to state
      var newFeature = getEmptyFeature();
      newFeature.geometries[level] = featuresAsObject[featureKey];
      updatedData = _objectSpread2(_objectSpread2({}, updatedData), {}, _defineProperty({}, featureKey, _objectSpread2({}, newFeature)));
    }
  });
  return updatedData;
}

function getUpdatedByDataSourceKey$1(state, dataByDataSourceKey, level) {
  var updatedData = _objectSpread2({}, state.byDataSourceKey);

  _forIn(dataByDataSourceKey, function (data, dataSourceKey) {
    if (!updatedData.hasOwnProperty(dataSourceKey)) {
      updatedData[dataSourceKey] = {};
    }

    var newFeatures = {};

    _forIn(data, function (geometry, featureKey) {
      var existingFeature = updatedData[dataSourceKey].hasOwnProperty(featureKey);

      if (existingFeature) {
        //add just level geometry to existing feature
        updatedData[dataSourceKey][featureKey].geometries[level] = geometry;
      } else {
        //create new feature with geometry and add to state
        var newFeature = getEmptyFeature();
        newFeature.geometries[level] = geometry;
        newFeatures[featureKey] = newFeature;
      }
    });

    updatedData[dataSourceKey] = _objectSpread2(_objectSpread2({}, updatedData[dataSourceKey]), newFeatures);
  });

  return updatedData;
}

var spatialData$2 = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE$e;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case commonActionTypes.DATA.SPATIAL_DATA.ADD:
      return add$g(state, action);

    case commonActionTypes.DATA.SPATIAL_DATA.ADD_WITH_INDEX:
      return addWithIndex$1(state, action);

    case commonActionTypes.DATA.SPATIAL_DATA.INDEX.ADD:
      return addIndex$4(state, action);

    case commonActionTypes.DATA.SPATIAL_DATA.INDEX.REMOVE:
      return removeIndex$1(state, action);

    default:
      return state;
  }
});

var dataReducers = combineReducers({
  attributeData: attributeData$2,
  attributeDataSources: attributeDataSources$2,
  attributeRelations: attributeRelations$2,
  components: components$1,
  spatialData: spatialData$2,
  spatialDataSources: spatialDataSources$2,
  spatialRelations: spatialRelations$2
});

var INITIAL_STATE$f = _objectSpread2({}, DEFAULT_INITIAL_STATE);
var layerTemplatesReducers = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE$f;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case commonActionTypes.LAYER_TEMPLATES.ADD:
      return commonReducers.add(state, action);

    case commonActionTypes.LAYER_TEMPLATES.ADD_UNRECEIVED:
      return commonReducers.addUnreceivedKeys(state, action);

    case commonActionTypes.LAYER_TEMPLATES.DELETE:
      return commonReducers.remove(state, action);

    case commonActionTypes.LAYER_TEMPLATES.EDITED.REMOVE:
      return commonReducers.removeEdited(state, action);

    case commonActionTypes.LAYER_TEMPLATES.EDITED.REMOVE_ACTIVE:
      return commonReducers.removeEditedActive(state, action);

    case commonActionTypes.LAYER_TEMPLATES.EDITED.REMOVE_PROPERTY:
      return commonReducers.removeEditedProperty(state, action);

    case commonActionTypes.LAYER_TEMPLATES.EDITED.UPDATE:
      return commonReducers.updateEdited(state, action);

    case commonActionTypes.LAYER_TEMPLATES.INDEX.ADD:
      return commonReducers.addIndex(state, action);

    case commonActionTypes.LAYER_TEMPLATES.INDEX.CLEAR_ALL:
      return commonReducers.clearIndexes(state, action);

    case commonActionTypes.LAYER_TEMPLATES.INDEX.CLEAR_INDEX:
      return commonReducers.clearIndex(state, action);

    case commonActionTypes.LAYER_TEMPLATES.MARK_DELETED:
      return commonReducers.markDeleted(state, action);

    case commonActionTypes.LAYER_TEMPLATES.SET_ACTIVE_KEY:
      return commonReducers.setActive(state, action);

    case commonActionTypes.LAYER_TEMPLATES.SET_ACTIVE_KEYS:
      return commonReducers.setActiveMultiple(state, action);

    case commonActionTypes.LAYER_TEMPLATES.UPDATE_STORE:
      return commonReducers.updateStore(state, action);

    case commonActionTypes.LAYER_TEMPLATES.USE.KEYS.REGISTER:
      return commonReducers.useKeysRegister(state, action);

    case commonActionTypes.LAYER_TEMPLATES.USE.KEYS.CLEAR:
      return commonReducers.useKeysClear(state, action);

    case commonActionTypes.LAYER_TEMPLATES.USE.INDEXED.REGISTER:
      return commonReducers.registerUseIndexed(state, action);

    case commonActionTypes.LAYER_TEMPLATES.USE.INDEXED.CLEAR:
      return commonReducers.useIndexedClear(state, action);

    case commonActionTypes.LAYER_TEMPLATES.USE.INDEXED.CLEAR_ALL:
      return commonReducers.useIndexedClearAll(state, action);

    case commonActionTypes.COMMON.DATA.SET_OUTDATED:
      return commonReducers.dataSetOutdated(state, action);

    case commonActionTypes.COMMON.DATA.CLEANUP_ON_LOGOUT:
      return commonReducers.cleanupOnLogout(state, action);

    default:
      return state;
  }
});

var INITIAL_STATE$g = _objectSpread2({}, DEFAULT_INITIAL_STATE);
var layerTreesReducers = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE$g;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case commonActionTypes.LAYER_TREES.ADD:
      return commonReducers.add(state, action);

    case commonActionTypes.LAYER_TREES.ADD_UNRECEIVED:
      return commonReducers.addUnreceivedKeys(state, action);

    case commonActionTypes.LAYER_TREES.DELETE:
      return commonReducers.remove(state, action);

    case commonActionTypes.LAYER_TREES.EDITED.REMOVE:
      return commonReducers.removeEdited(state, action);

    case commonActionTypes.LAYER_TREES.EDITED.REMOVE_PROPERTY:
      return commonReducers.removeEditedProperty(state, action);

    case commonActionTypes.LAYER_TREES.EDITED.UPDATE:
      return commonReducers.updateEdited(state, action);

    case commonActionTypes.LAYER_TREES.INDEX.ADD:
      return commonReducers.addIndex(state, action);

    case commonActionTypes.LAYER_TREES.INDEX.CLEAR_ALL:
      return commonReducers.clearIndexes(state, action);

    case commonActionTypes.LAYER_TREES.INDEX.CLEAR_INDEX:
      return commonReducers.clearIndex(state, action);

    case commonActionTypes.LAYER_TREES.MARK_DELETED:
      return commonReducers.markDeleted(state, action);

    case commonActionTypes.LAYER_TREES.UPDATE_STORE:
      return commonReducers.updateStore(state, action);

    case commonActionTypes.LAYER_TREES.USE.KEYS.CLEAR:
      return commonReducers.useKeysClear(state, action);

    case commonActionTypes.LAYER_TREES.USE.KEYS.REGISTER:
      return commonReducers.useKeysRegister(state, action);

    case commonActionTypes.LAYER_TREES.USE.INDEXED.REGISTER:
      return commonReducers.registerUseIndexed(state, action);

    case commonActionTypes.LAYER_TREES.USE.INDEXED.CLEAR:
      return commonReducers.useIndexedClear(state, action);

    case commonActionTypes.LAYER_TREES.USE.INDEXED.CLEAR_ALL:
      return commonReducers.useIndexedClearAll(state, action);

    case commonActionTypes.COMMON.DATA.SET_OUTDATED:
      return commonReducers.dataSetOutdated(state, action);

    case commonActionTypes.COMMON.DATA.CLEANUP_ON_LOGOUT:
      return commonReducers.cleanupOnLogout(state, action);

    default:
      return state;
  }
});

var INITIAL_STATE$h = {
  activeSetKey: null,
  activeMapKey: null,
  inUse: {
    maps: [],
    sets: []
  },
  maps: {},
  sets: {}
};

var removeMapFromSet$1 = function removeMapFromSet(state, setKey, mapKey) {
  if (setKey && mapKey) {
    var _state$sets$setKey;

    var index = _indexOf2((_state$sets$setKey = state.sets[setKey]) === null || _state$sets$setKey === void 0 ? void 0 : _state$sets$setKey.maps, mapKey);

    if (index > -1) {
      var updatedMaps = [].concat(_toConsumableArray(state.sets[setKey].maps.slice(0, index)), _toConsumableArray(state.sets[setKey].maps.slice(index + 1)));
      return _objectSpread2(_objectSpread2({}, state), {}, {
        sets: _objectSpread2(_objectSpread2({}, state.sets), {}, _defineProperty({}, setKey, _objectSpread2(_objectSpread2({}, state.sets[setKey]), {}, {
          maps: updatedMaps
        })))
      });
    } else {
      return state;
    }
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


var setMapLayerStyleKey$1 = function setMapLayerStyleKey(state, mapKey, layerKey, styleKey) {
  var _state$maps$mapKey, _state$maps$mapKey$da;

  var layers = (_state$maps$mapKey = state.maps[mapKey]) === null || _state$maps$mapKey === void 0 ? void 0 : (_state$maps$mapKey$da = _state$maps$mapKey.data) === null || _state$maps$mapKey$da === void 0 ? void 0 : _state$maps$mapKey$da.layers;

  if (layers) {
    var updatedLayers = layers.map(function (item) {
      if (item.key === layerKey) {
        return _objectSpread2(_objectSpread2({}, item), {}, {
          styleKey: styleKey
        });
      } else {
        return item;
      }
    });
    return _objectSpread2(_objectSpread2({}, state), {}, {
      maps: _objectSpread2(_objectSpread2({}, state.maps), {}, _defineProperty({}, mapKey, _objectSpread2(_objectSpread2({}, state.maps[mapKey]), {}, {
        data: _objectSpread2(_objectSpread2({}, state.maps[mapKey].data), {}, {
          layers: updatedLayers
        })
      })))
    });
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


var setMapViewport$1 = function setMapViewport(state, mapKey, width, height) {
  if (mapKey && width && height) {
    return _objectSpread2(_objectSpread2({}, state), {}, {
      maps: _objectSpread2(_objectSpread2({}, state.maps), {}, _defineProperty({}, mapKey, _objectSpread2(_objectSpread2({}, state.maps[mapKey]), {}, {
        data: _objectSpread2(_objectSpread2({}, state.maps[mapKey].data), {}, {
          viewport: {
            width: width,
            height: height
          }
        })
      })))
    });
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


var setSetActiveMapKey = function setSetActiveMapKey(state, setKey, mapKey) {
  return _objectSpread2(_objectSpread2({}, state), {}, {
    sets: _objectSpread2(_objectSpread2({}, state.sets), {}, _defineProperty({}, setKey, _objectSpread2(_objectSpread2({}, state.sets[setKey]), {}, {
      activeMapKey: mapKey
    })))
  });
};
/**
 * Set map set background layer state
 * @param state {Object}
 * @param setKey {string}
 * @param backgroundLayer {Object} background layer state
 * @return {Object} state
 */


var setSetBackgroundLayer = function setSetBackgroundLayer(state, setKey, backgroundLayer) {
  return _objectSpread2(_objectSpread2({}, state), {}, {
    sets: _objectSpread2(_objectSpread2({}, state.sets), {}, _defineProperty({}, setKey, _objectSpread2(_objectSpread2({}, state.sets[setKey]), {}, {
      data: _objectSpread2(_objectSpread2({}, state.sets[setKey].data), {}, {
        backgroundLayer: backgroundLayer
      })
    })))
  });
};
/**
 * Update whole map state
 * @param state {Object}
 * @param data {Object}
 * @return {Object}
 */


var update$3 = function update(state, data) {
  return _objectSpread2(_objectSpread2({}, state), data);
};
/**
 * Update map view
 * @param state {Object}
 * @param mapKey {string}
 * @param updates {Object} map view updates
 * @return {Object} state
 */


var updateMapView = function updateMapView(state, mapKey, updates) {
  if (updates && !_isEmpty2(updates)) {
    return _objectSpread2(_objectSpread2({}, state), {}, {
      maps: _objectSpread2(_objectSpread2({}, state.maps), {}, _defineProperty({}, mapKey, _objectSpread2(_objectSpread2({}, state.maps[mapKey]), {}, {
        data: _objectSpread2(_objectSpread2({}, state.maps[mapKey].data), {}, {
          view: state.maps[mapKey].data.view ? _objectSpread2(_objectSpread2({}, state.maps[mapKey].data.view), updates) : updates
        })
      })))
    });
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


var updateSetView$1 = function updateSetView(state, setKey, updates) {
  if (updates && !_isEmpty2(updates)) {
    return _objectSpread2(_objectSpread2({}, state), {}, {
      sets: _objectSpread2(_objectSpread2({}, state.sets), {}, _defineProperty({}, setKey, _objectSpread2(_objectSpread2({}, state.sets[setKey]), {}, {
        data: _objectSpread2(_objectSpread2({}, state.sets[setKey].data), {}, {
          view: state.sets[setKey].data.view ? _objectSpread2(_objectSpread2({}, state.sets[setKey].data.view), updates) : updates
        })
      })))
    });
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


var mapUseClear$1 = function mapUseClear(state, mapKey) {
  if (mapKey) {
    var index = _indexOf2(state.inUse.maps, mapKey);

    if (index > -1) {
      var updatedInUse = [].concat(_toConsumableArray(state.inUse.maps.slice(0, index)), _toConsumableArray(state.inUse.maps.slice(index + 1)));
      return _objectSpread2(_objectSpread2({}, state), {}, {
        inUse: _objectSpread2(_objectSpread2({}, state.inUse), {}, {
          maps: updatedInUse
        })
      });
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


var mapSetUseClear$1 = function mapSetUseClear(state, mapSetKey) {
  if (mapSetKey) {
    var index = _indexOf2(state.inUse.sets, mapSetKey);

    if (index > -1) {
      var updatedInUse = [].concat(_toConsumableArray(state.inUse.sets.slice(0, index)), _toConsumableArray(state.inUse.sets.slice(index + 1)));
      return _objectSpread2(_objectSpread2({}, state), {}, {
        inUse: _objectSpread2(_objectSpread2({}, state.inUse), {}, {
          sets: updatedInUse
        })
      });
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


var mapUseRegister$1 = function mapUseRegister(state, mapKey) {
  if (mapKey) {
    return _objectSpread2(_objectSpread2({}, state), {}, {
      inUse: _objectSpread2(_objectSpread2({}, state.inUse), {}, {
        maps: [].concat(_toConsumableArray(state.inUse.maps), [mapKey])
      })
    });
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


var mapSetUseRegister$1 = function mapSetUseRegister(state, mapSetKey) {
  if (mapSetKey) {
    return _objectSpread2(_objectSpread2({}, state), {}, {
      inUse: _objectSpread2(_objectSpread2({}, state.inUse), {}, {
        sets: [].concat(_toConsumableArray(state.inUse.sets), [mapSetKey])
      })
    });
  } else {
    return state;
  }
};

function tasksReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE$h;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case commonActionTypes.MAPS.MAP.LAYERS.SET_STYLE_KEY:
      return setMapLayerStyleKey$1(state, action.mapKey, action.layerKey, action.styleKey);

    case commonActionTypes.MAPS.MAP.USE.CLEAR:
      return mapUseClear$1(state, action.mapKey);

    case commonActionTypes.MAPS.MAP.USE.REGISTER:
      return mapUseRegister$1(state, action.mapKey);

    case commonActionTypes.MAPS.MAP.VIEW.UPDATE:
      return updateMapView(state, action.mapKey, action.update);

    case commonActionTypes.MAPS.MAP.VIEWPORT.SET:
      return setMapViewport$1(state, action.mapKey, action.width, action.height);

    case commonActionTypes.MAPS.SET.REMOVE_MAP:
      return removeMapFromSet$1(state, action.setKey, action.mapKey);

    case commonActionTypes.MAPS.SET.SET_ACTIVE_MAP_KEY:
      return setSetActiveMapKey(state, action.setKey, action.mapKey);

    case commonActionTypes.MAPS.SET.SET_BACKGROUND_LAYER:
      return setSetBackgroundLayer(state, action.setKey, action.backgroundLayer);

    case commonActionTypes.MAPS.SET.USE.CLEAR:
      return mapSetUseClear$1(state, action.mapSetKey);

    case commonActionTypes.MAPS.SET.USE.REGISTER:
      return mapSetUseRegister$1(state, action.mapSetKey);

    case commonActionTypes.MAPS.SET.VIEW.UPDATE:
      return updateSetView$1(state, action.setKey, action.update);

    case commonActionTypes.MAPS.UPDATE:
      return update$3(state, action.data);

    default:
      return state;
  }
}

var INITIAL_STATE$i = _objectSpread2({}, DEFAULT_INITIAL_STATE);
var periodsReducers = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE$i;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case commonActionTypes.PERIODS.ADD:
      return commonReducers.add(state, action);

    case commonActionTypes.PERIODS.ADD_UNRECEIVED:
      return commonReducers.addUnreceivedKeys(state, action);

    case commonActionTypes.PERIODS.DELETE:
      return commonReducers.remove(state, action);

    case commonActionTypes.PERIODS.EDITED.REMOVE:
      return commonReducers.removeEdited(state, action);

    case commonActionTypes.PERIODS.EDITED.REMOVE_ACTIVE:
      return commonReducers.removeEditedActive(state, action);

    case commonActionTypes.PERIODS.EDITED.REMOVE_PROPERTY:
      return commonReducers.removeEditedProperty(state, action);

    case commonActionTypes.PERIODS.EDITED.UPDATE:
      return commonReducers.updateEdited(state, action);

    case commonActionTypes.PERIODS.INDEX.ADD:
      return commonReducers.addIndex(state, action);

    case commonActionTypes.PERIODS.INDEX.CLEAR_ALL:
      return commonReducers.clearIndexes(state, action);

    case commonActionTypes.PERIODS.INDEX.CLEAR_INDEX:
      return commonReducers.clearIndex(state, action);

    case commonActionTypes.PERIODS.MARK_DELETED:
      return commonReducers.markDeleted(state, action);

    case commonActionTypes.PERIODS.SET_ACTIVE_KEY:
      return commonReducers.setActive(state, action);

    case commonActionTypes.PERIODS.SET_ACTIVE_KEYS:
      return commonReducers.setActiveMultiple(state, action);

    case commonActionTypes.PERIODS.UPDATE_STORE:
      return commonReducers.updateStore(state, action);

    case commonActionTypes.PERIODS.USE.INDEXED.CLEAR:
      return commonReducers.useIndexedClear(state, action);

    case commonActionTypes.PERIODS.USE.INDEXED.CLEAR_ALL:
      return commonReducers.useIndexedClearAll(state, action);

    case commonActionTypes.PERIODS.USE.INDEXED.REGISTER:
      return commonReducers.registerUseIndexed(state, action);

    case commonActionTypes.PERIODS.USE.KEYS.REGISTER:
      return commonReducers.useKeysRegister(state, action);

    case commonActionTypes.PERIODS.USE.KEYS.CLEAR:
      return commonReducers.useKeysClear(state, action);

    case commonActionTypes.COMMON.DATA.SET_OUTDATED:
      return commonReducers.dataSetOutdated(state, action);

    case commonActionTypes.COMMON.DATA.CLEANUP_ON_LOGOUT:
      return commonReducers.cleanupOnLogout(state, action);

    default:
      return state;
  }
});

var INITIAL_STATE$j = _objectSpread2(_objectSpread2({}, DEFAULT_INITIAL_STATE), {}, {
  activeKeys: null
});
var placesReducers = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE$j;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case commonActionTypes.PLACES.ADD:
      return commonReducers.add(state, action);

    case commonActionTypes.PLACES.ADD_UNRECEIVED:
      return commonReducers.addUnreceivedKeys(state, action);

    case commonActionTypes.PLACES.DELETE:
      return commonReducers.remove(state, action);

    case commonActionTypes.PLACES.EDITED.REMOVE:
      return commonReducers.removeEdited(state, action);

    case commonActionTypes.PLACES.EDITED.REMOVE_ACTIVE:
      return commonReducers.removeEditedActive(state, action);

    case commonActionTypes.PLACES.EDITED.REMOVE_PROPERTY:
      return commonReducers.removeEditedProperty(state, action);

    case commonActionTypes.PLACES.EDITED.UPDATE:
      return commonReducers.updateEdited(state, action);

    case commonActionTypes.PLACES.INDEX.ADD:
      return commonReducers.addIndex(state, action);

    case commonActionTypes.PLACES.INDEX.CLEAR_ALL:
      return commonReducers.clearIndexes(state, action);

    case commonActionTypes.PLACES.INDEX.CLEAR_INDEX:
      return commonReducers.clearIndex(state, action);

    case commonActionTypes.PLACES.MARK_DELETED:
      return commonReducers.markDeleted(state, action);

    case commonActionTypes.PLACES.SET_ACTIVE_KEY:
      return commonReducers.setActive(state, action);

    case commonActionTypes.PLACES.SET_ACTIVE_KEYS:
      return commonReducers.setActiveMultiple(state, action);

    case commonActionTypes.PLACES.UPDATE_STORE:
      return commonReducers.updateStore(state, action);

    case commonActionTypes.PLACES.USE.INDEXED.CLEAR:
      return commonReducers.useIndexedClear(state, action);

    case commonActionTypes.PLACES.USE.INDEXED.CLEAR_ALL:
      return commonReducers.useIndexedClearAll(state, action);

    case commonActionTypes.PLACES.USE.INDEXED.REGISTER:
      return commonReducers.registerUseIndexed(state, action);

    case commonActionTypes.PLACES.USE.KEYS.REGISTER:
      return commonReducers.useKeysRegister(state, action);

    case commonActionTypes.PLACES.USE.KEYS.CLEAR:
      return commonReducers.useKeysClear(state, action);

    case commonActionTypes.COMMON.DATA.SET_OUTDATED:
      return commonReducers.dataSetOutdated(state, action);

    case commonActionTypes.COMMON.DATA.CLEANUP_ON_LOGOUT:
      return commonReducers.cleanupOnLogout(state, action);

    default:
      return state;
  }
});

var INITIAL_STATE$k = _objectSpread2({}, DEFAULT_INITIAL_STATE);
var scenariosReducers = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE$k;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case commonActionTypes.SCENARIOS.ADD:
      return commonReducers.add(state, action);

    case commonActionTypes.SCENARIOS.ADD_UNRECEIVED:
      return commonReducers.addUnreceivedKeys(state, action);

    case commonActionTypes.SCENARIOS.DELETE:
      return commonReducers.remove(state, action);

    case commonActionTypes.SCENARIOS.EDITED.REMOVE:
      return commonReducers.removeEdited(state, action);

    case commonActionTypes.SCENARIOS.EDITED.REMOVE_ACTIVE:
      return commonReducers.removeEditedActive(state, action);

    case commonActionTypes.SCENARIOS.EDITED.REMOVE_PROPERTY:
      return commonReducers.removeEditedProperty(state, action);

    case commonActionTypes.SCENARIOS.EDITED.UPDATE:
      return commonReducers.updateEdited(state, action);

    case commonActionTypes.SCENARIOS.INDEX.ADD:
      return commonReducers.addIndex(state, action);

    case commonActionTypes.SCENARIOS.INDEX.CLEAR_ALL:
      return commonReducers.clearIndexes(state, action);

    case commonActionTypes.SCENARIOS.INDEX.CLEAR_INDEX:
      return commonReducers.clearIndex(state, action);

    case commonActionTypes.SCENARIOS.MARK_DELETED:
      return commonReducers.markDeleted(state, action);

    case commonActionTypes.SCENARIOS.SET_ACTIVE_KEY:
      return commonReducers.setActive(state, action);

    case commonActionTypes.SCENARIOS.SET_ACTIVE_KEYS:
      return commonReducers.setActiveMultiple(state, action);

    case commonActionTypes.SCENARIOS.UPDATE_STORE:
      return commonReducers.updateStore(state, action);

    case commonActionTypes.SCENARIOS.USE.KEYS.CLEAR:
      return commonReducers.useKeysClear(state, action);

    case commonActionTypes.SCENARIOS.USE.KEYS.REGISTER:
      return commonReducers.useKeysRegister(state, action);

    case commonActionTypes.SCENARIOS.USE.INDEXED.REGISTER:
      return commonReducers.registerUseIndexed(state, action);

    case commonActionTypes.SCENARIOS.USE.INDEXED.CLEAR:
      return commonReducers.useIndexedClear(state, action);

    case commonActionTypes.SCENARIOS.USE.INDEXED.CLEAR_ALL:
      return commonReducers.useIndexedClearAll(state, action);

    case commonActionTypes.COMMON.DATA.SET_OUTDATED:
      return commonReducers.dataSetOutdated(state, action);

    case commonActionTypes.COMMON.DATA.CLEANUP_ON_LOGOUT:
      return commonReducers.cleanupOnLogout(state, action);

    default:
      return state;
  }
});

var INITIAL_STATE$l = _objectSpread2({}, DEFAULT_INITIAL_STATE);
var scopesReducers = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE$l;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case commonActionTypes.SCOPES.ADD:
      return commonReducers.add(state, action);

    case commonActionTypes.SCOPES.ADD_UNRECEIVED:
      return commonReducers.addUnreceivedKeys(state, action);

    case commonActionTypes.SCOPES.DELETE:
      return commonReducers.remove(state, action);

    case commonActionTypes.SCOPES.EDITED.REMOVE:
      return commonReducers.removeEdited(state, action);

    case commonActionTypes.SCOPES.EDITED.REMOVE_ACTIVE:
      return commonReducers.removeEditedActive(state, action);

    case commonActionTypes.SCOPES.EDITED.REMOVE_PROPERTY:
      return commonReducers.removeEditedProperty(state, action);

    case commonActionTypes.SCOPES.EDITED.UPDATE:
      return commonReducers.updateEdited(state, action);

    case commonActionTypes.SCOPES.INDEX.ADD:
      return commonReducers.addIndex(state, action);

    case commonActionTypes.SCOPES.INDEX.CLEAR_ALL:
      return commonReducers.clearIndexes(state, action);

    case commonActionTypes.SCOPES.INDEX.CLEAR_INDEX:
      return commonReducers.clearIndex(state, action);

    case commonActionTypes.SCOPES.MARK_DELETED:
      return commonReducers.markDeleted(state, action);

    case commonActionTypes.SCOPES.SET_ACTIVE_KEY:
      return commonReducers.setActive(state, action);

    case commonActionTypes.SCOPES.UPDATE_STORE:
      return commonReducers.updateStore(state, action);

    case commonActionTypes.SCOPES.USE.INDEXED.REGISTER:
      return commonReducers.registerUseIndexed(state, action);

    case commonActionTypes.SCOPES.USE.INDEXED.CLEAR:
      return commonReducers.useIndexedClear(state, action);

    case commonActionTypes.SCOPES.USE.INDEXED.CLEAR_ALL:
      return commonReducers.useIndexedClearAll(state, action);

    case commonActionTypes.SCOPES.USE.KEYS.REGISTER:
      return commonReducers.useKeysRegister(state, action);

    case commonActionTypes.SCOPES.USE.KEYS.CLEAR:
      return commonReducers.useKeysClear(state, action);

    case commonActionTypes.COMMON.DATA.SET_OUTDATED:
      return commonReducers.dataSetOutdated(state, action);

    case commonActionTypes.COMMON.DATA.CLEANUP_ON_LOGOUT:
      return commonReducers.cleanupOnLogout(state, action);

    default:
      return state;
  }
});

var INITIAL_STATE$m = {
  screens: {},
  sets: {}
};
var INITIAL_SET_STATE = {
  orderByHistory: [],
  orderBySpace: []
};
var INITIAL_SCREEN_DATA = {
  width: null,
  minActiveWidth: null,
  desiredState: 'open' //open/retracted/closing

};

var add$h = function add(state, action) {
  var screens = _objectSpread2({}, state.screens);

  screens[action.lineage] = {
    lineage: action.lineage,
    data: _objectSpread2(_objectSpread2({}, INITIAL_SCREEN_DATA), action.data)
  };

  var sets = _objectSpread2({}, state.sets);

  sets[action.setKey] = _objectSpread2(_objectSpread2({}, INITIAL_SET_STATE), sets[action.setKey]);
  sets[action.setKey].orderBySpace = [].concat(_toConsumableArray(sets[action.setKey].orderBySpace), [action.lineage]);
  sets[action.setKey].orderByHistory = [].concat(_toConsumableArray(sets[action.setKey].orderByHistory), [action.lineage]);
  return _objectSpread2(_objectSpread2({}, state), {}, {
    screens: screens,
    sets: sets
  });
};

var addSet = function addSet(state, action) {
  var sets = _objectSpread2({}, state.sets);

  sets[action.setKey] = _objectSpread2({}, INITIAL_SET_STATE);
  return _objectSpread2(_objectSpread2({}, state), {}, {
    sets: sets
  });
};

var close$1 = function close(state, action) {
  var screens = _objectSpread2({}, state.screens);

  screens[action.lineage] = {
    lineage: action.lineage,
    data: _objectSpread2(_objectSpread2({}, screens[action.lineage].data), {}, {
      desiredState: 'closing'
    })
  };
  return _objectSpread2(_objectSpread2({}, state), {}, {
    screens: screens
  });
};

var open$1 = function open(state, action) {
  var screens = _objectSpread2({}, state.screens);

  screens[action.lineage] = {
    lineage: action.lineage,
    data: _objectSpread2(_objectSpread2({}, screens[action.lineage].data), {}, {
      desiredState: 'open'
    })
  };
  return _objectSpread2(_objectSpread2({}, state), {}, {
    screens: screens
  });
};

var remove = function remove(state, action) {
  var sets = _objectSpread2({}, state.sets);

  var orderByHistory = _without(_toConsumableArray(sets[action.setKey].orderByHistory), action.lineage);

  var orderBySpace = _without(_toConsumableArray(sets[action.setKey].orderBySpace), action.lineage);

  return _objectSpread2(_objectSpread2({}, state), {}, {
    sets: _objectSpread2(_objectSpread2({}, sets), {}, _defineProperty({}, action.setKey, {
      orderByHistory: orderByHistory,
      orderBySpace: orderBySpace
    }))
  });
};

var removeAllScreensFromSet$1 = function removeAllScreensFromSet(state, action) {
  var sets = _objectSpread2({}, state.sets);

  return _objectSpread2(_objectSpread2({}, state), {}, {
    sets: _objectSpread2(_objectSpread2({}, sets), {}, _defineProperty({}, action.setKey, {
      orderByHistory: [],
      orderBySpace: []
    }))
  });
};

var retract$1 = function retract(state, action) {
  var screens = _objectSpread2({}, state.screens);

  screens[action.lineage] = {
    lineage: action.lineage,
    data: _objectSpread2(_objectSpread2({}, screens[action.lineage].data), {}, {
      desiredState: 'retracted'
    })
  };
  return _objectSpread2(_objectSpread2({}, state), {}, {
    screens: screens
  });
};

var topHistory$1 = function topHistory(state, action) {
  var sets = _objectSpread2({}, state.sets);

  var orderByHistory = _without(_toConsumableArray(sets[action.setKey].orderByHistory), action.lineage);

  orderByHistory.push(action.lineage);
  return _objectSpread2(_objectSpread2({}, state), {}, {
    sets: _objectSpread2(_objectSpread2({}, sets), {}, _defineProperty({}, action.setKey, _objectSpread2(_objectSpread2({}, sets[action.setKey]), {}, {
      orderByHistory: orderByHistory
    })))
  });
}; // TODO test properly!


var update$4 = function update(state, action) {
  var screens = _objectSpread2({}, state.screens);

  screens[action.lineage] = _objectSpread2(_objectSpread2({}, screens[action.lineage]), {}, {
    data: _objectSpread2(_objectSpread2({}, screens[action.lineage].data), action.data)
  });

  var sets = _objectSpread2({}, state.sets);

  sets[action.setKey] = _objectSpread2(_objectSpread2({}, INITIAL_SET_STATE), sets[action.setKey]);

  var orderByHistory = _without(sets[action.setKey].orderByHistory, action.lineage);

  orderByHistory.push(action.lineage);
  sets[action.setKey].orderByHistory = orderByHistory;

  var alreadyInOrder = _find2(sets[action.setKey].orderBySpace, function (lineage) {
    return lineage === action.lineage;
  });

  if (!alreadyInOrder) {
    var orderBySpace = _without(sets[action.setKey].orderBySpace, action.lineage);

    orderBySpace.push(action.lineage);
    sets[action.setKey].orderBySpace = orderBySpace;
  }

  return _objectSpread2(_objectSpread2({}, state), {}, {
    screens: screens,
    sets: sets
  });
};

var screensReducers = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE$m;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case commonActionTypes.SCREENS.ADD:
      return add$h(state, action);

    case commonActionTypes.SCREENS.CLOSE:
      return close$1(state, action);

    case commonActionTypes.SCREENS.OPEN:
      return open$1(state, action);

    case commonActionTypes.SCREENS.REMOVE:
      return remove(state, action);

    case commonActionTypes.SCREENS.REMOVE_ALL:
      return removeAllScreensFromSet$1(state, action);

    case commonActionTypes.SCREENS.RETRACT:
      return retract$1(state, action);

    case commonActionTypes.SCREENS.SETS.ADD:
      return addSet(state, action);

    case commonActionTypes.SCREENS.TOP_HISTORY:
      return topHistory$1(state, action);

    case commonActionTypes.SCREENS.UPDATE:
      return update$4(state, action);

    default:
      return state;
  }
});

var INITIAL_STATE$n = _objectSpread2({}, DEFAULT_INITIAL_STATE);

var clearFeatureKeysFilter$1 = function clearFeatureKeysFilter(state, key) {
  var updatedByKey = _objectSpread2(_objectSpread2({}, state.byKey), {}, _defineProperty({}, key, _objectSpread2(_objectSpread2({}, state.byKey[key]), {}, {
    data: _objectSpread2(_objectSpread2({}, state.byKey[key].data), {}, {
      featureKeysFilter: null
    })
  })));

  return _objectSpread2(_objectSpread2({}, state), {}, {
    byKey: updatedByKey
  });
};

var setFeatureKeysFilterKeys$1 = function setFeatureKeysFilterKeys(state, key, featureKeys) {
  var updatedByKey = _objectSpread2(_objectSpread2({}, state.byKey), {}, _defineProperty({}, key, _objectSpread2(_objectSpread2({}, state.byKey[key]), {}, {
    data: _objectSpread2(_objectSpread2({}, state.byKey[key].data), {}, {
      featureKeysFilter: _objectSpread2(_objectSpread2({}, state.byKey[key].data.featureKeysFilter), {}, {
        keys: featureKeys
      })
    })
  })));

  return _objectSpread2(_objectSpread2({}, state), {}, {
    byKey: updatedByKey
  });
};

var selectionsReducers = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE$n;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case commonActionTypes.SELECTIONS.ADD:
      return commonReducers.add(state, action);

    case commonActionTypes.SELECTIONS.CLEAR.FEATURE_KEYS_FILTER:
      return clearFeatureKeysFilter$1(state, action.key);

    case commonActionTypes.SELECTIONS.SET_ACTIVE_KEY:
      return commonReducers.setActive(state, action);

    case commonActionTypes.SELECTIONS.SET.FEATURE_KEYS_FILTER.KEYS:
      return setFeatureKeysFilterKeys$1(state, action.key, action.featureKeys);

    default:
      return state;
  }
});

var INITIAL_STATE$o = _objectSpread2({}, DEFAULT_INITIAL_STATE);
var stylesReducers = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE$o;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case commonActionTypes.STYLES.ADD:
      return commonReducers.add(state, action);

    case commonActionTypes.STYLES.ADD_UNRECEIVED:
      return commonReducers.addUnreceivedKeys(state, action);

    case commonActionTypes.STYLES.DELETE:
      return commonReducers.remove(state, action);

    case commonActionTypes.STYLES.EDITED.REMOVE:
      return commonReducers.removeEdited(state, action);

    case commonActionTypes.STYLES.EDITED.REMOVE_ACTIVE:
      return commonReducers.removeEditedActive(state, action);

    case commonActionTypes.STYLES.EDITED.REMOVE_PROPERTY:
      return commonReducers.removeEditedProperty(state, action);

    case commonActionTypes.STYLES.EDITED.UPDATE:
      return commonReducers.updateEdited(state, action);

    case commonActionTypes.STYLES.INDEX.ADD:
      return commonReducers.addIndex(state, action);

    case commonActionTypes.STYLES.SET_ACTIVE_KEY:
      return commonReducers.setActive(state, action);

    case commonActionTypes.STYLES.UPDATE_STORE:
      return commonReducers.updateStore(state, action);

    case commonActionTypes.STYLES.USE.KEYS.REGISTER:
      return commonReducers.useKeysRegister(state, action);

    case commonActionTypes.STYLES.USE.KEYS.CLEAR:
      return commonReducers.useKeysClear(state, action);

    case commonActionTypes.STYLES.USE.INDEXED.REGISTER:
      return commonReducers.registerUseIndexed(state, action);

    case commonActionTypes.STYLES.USE.INDEXED.CLEAR:
      return commonReducers.useIndexedClear(state, action);

    case commonActionTypes.STYLES.USE.INDEXED.CLEAR_ALL:
      return commonReducers.useIndexedClearAll(state, action);

    case commonActionTypes.STYLES.INDEX.CLEAR_ALL:
      return commonReducers.clearIndexes(state, action);

    case commonActionTypes.STYLES.INDEX.CLEAR_INDEX:
      return commonReducers.clearIndex(state, action);

    case commonActionTypes.STYLES.MARK_DELETED:
      return commonReducers.markDeleted(state, action);

    case commonActionTypes.COMMON.DATA.SET_OUTDATED:
      return commonReducers.dataSetOutdated(state, action);

    case commonActionTypes.COMMON.DATA.CLEANUP_ON_LOGOUT:
      return commonReducers.cleanupOnLogout(state, action);

    default:
      return state;
  }
});

var INITIAL_STATE$p = _objectSpread2({}, DEFAULT_INITIAL_STATE);
var tagsReducers = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE$p;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case commonActionTypes.TAGS.ADD:
      return commonReducers.add(state, action);

    case commonActionTypes.TAGS.ADD_UNRECEIVED:
      return commonReducers.addUnreceivedKeys(state, action);

    case commonActionTypes.TAGS.DELETE:
      return commonReducers.remove(state, action);

    case commonActionTypes.TAGS.EDITED.REMOVE:
      return commonReducers.removeEdited(state, action);

    case commonActionTypes.TAGS.EDITED.REMOVE_ACTIVE:
      return commonReducers.removeEditedActive(state, action);

    case commonActionTypes.TAGS.EDITED.REMOVE_PROPERTY:
      return commonReducers.removeEditedProperty(state, action);

    case commonActionTypes.TAGS.EDITED.UPDATE:
      return commonReducers.updateEdited(state, action);

    case commonActionTypes.TAGS.INDEX.ADD:
      return commonReducers.addIndex(state, action);

    case commonActionTypes.TAGS.INDEX.CLEAR_ALL:
      return commonReducers.clearIndexes(state, action);

    case commonActionTypes.TAGS.INDEX.CLEAR_INDEX:
      return commonReducers.clearIndex(state, action);

    case commonActionTypes.TAGS.MARK_DELETED:
      return commonReducers.markDeleted(state, action);

    case commonActionTypes.TAGS.SET_ACTIVE_KEY:
      return commonReducers.setActive(state, action);

    case commonActionTypes.TAGS.SET_ACTIVE_KEYS:
      return commonReducers.setActiveMultiple(state, action);

    case commonActionTypes.TAGS.UPDATE_STORE:
      return commonReducers.updateStore(state, action);

    case commonActionTypes.TAGS.USE.KEYS.CLEAR:
      return commonReducers.useKeysClear(state, action);

    case commonActionTypes.TAGS.USE.KEYS.REGISTER:
      return commonReducers.useKeysRegister(state, action);

    case commonActionTypes.TAGS.USE.INDEXED.REGISTER:
      return commonReducers.registerUseIndexed(state, action);

    case commonActionTypes.TAGS.USE.INDEXED.CLEAR:
      return commonReducers.useIndexedClear(state, action);

    case commonActionTypes.TAGS.USE.INDEXED.CLEAR_ALL:
      return commonReducers.useIndexedClearAll(state, action);

    case commonActionTypes.COMMON.DATA.SET_OUTDATED:
      return commonReducers.dataSetOutdated(state, action);

    case commonActionTypes.COMMON.DATA.CLEANUP_ON_LOGOUT:
      return commonReducers.cleanupOnLogout(state, action);

    default:
      return state;
  }
});

var INITIAL_STATE$q = _objectSpread2(_objectSpread2({}, DEFAULT_INITIAL_STATE), {}, {
  groups: _objectSpread2({}, DEFAULT_INITIAL_STATE)
});

function update$5(state, action) {
  var _action$data = action.data;
      _action$data.userId;
      var data = _objectWithoutProperties(_action$data, ["userId"]);

  data.activeKey = action.data.userId;
  return _objectSpread2(_objectSpread2({}, state), data);
}

function loadRequest(state, action) {
  return _objectSpread2(_objectSpread2({}, state), {}, {
    loading: true
  });
}

function loadRequestError(state, action) {
  return _objectSpread2(_objectSpread2({}, state), {}, {
    loading: false
  });
}

var usersReducers = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE$q;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case commonActionTypes.USERS.ADD:
      return commonReducers.add(state, action);

    case commonActionTypes.USERS.INDEX.ADD:
      return commonReducers.addIndex(state, action);

    case commonActionTypes.USERS.INDEX.CLEAR_ALL:
      return commonReducers.clearIndexes(state, action);

    case commonActionTypes.USERS.USE.INDEXED.CLEAR:
      return commonReducers.useIndexedClear(state, action);

    case commonActionTypes.USERS.USE.INDEXED.REGISTER:
      return commonReducers.registerUseIndexed(state, action);

    case commonActionTypes.USERS.ADD_UNRECEIVED:
      return commonReducers.addUnreceivedKeys(state, action);

    case commonActionTypes.USERS.SET_ACTIVE_KEY:
      return commonReducers.setActive(state, action);

    case commonActionTypes.USERS.USE.KEYS.CLEAR:
      return commonReducers.useKeysClear(state, action);

    case commonActionTypes.USERS.USE.KEYS.REGISTER:
      return commonReducers.useKeysRegister(state, action);

    case commonActionTypes.COMMON.DATA.SET_OUTDATED:
      //set outdated for users and users.groups
      return _objectSpread2(_objectSpread2({}, commonReducers.dataSetOutdated(state, action)), {}, {
        groups: commonReducers.dataSetOutdated(state.groups, action)
      });

    case commonActionTypes.COMMON.DATA.CLEANUP_ON_LOGOUT:
      //clear users and users.groups
      return _objectSpread2(_objectSpread2({}, commonReducers.cleanupOnLogout(state, action)), {}, {
        groups: commonReducers.cleanupOnLogout(state.groups, action)
      });

    case commonActionTypes.USERS_LOAD_REQUEST:
      return loadRequest(state);

    case commonActionTypes.USERS_LOAD_REQUEST_ERROR:
      return loadRequestError(state);

    case commonActionTypes.USERS_UPDATE:
      return update$5(state, action);

    case commonActionTypes.USERS.GROUPS.ADD:
      return _objectSpread2(_objectSpread2({}, state), {}, {
        groups: commonReducers.add(state.groups, action)
      });

    case commonActionTypes.USERS.GROUPS.INDEX.ADD:
      return _objectSpread2(_objectSpread2({}, state), {}, {
        groups: commonReducers.addIndex(state.groups, action)
      });

    case commonActionTypes.USERS.GROUPS.INDEX.CLEAR_ALL:
      return _objectSpread2(_objectSpread2({}, state), {}, {
        groups: commonReducers.clearIndexes(state.groups, action)
      });

    case commonActionTypes.USERS.GROUPS.ADD_UNRECEIVED:
      return _objectSpread2(_objectSpread2({}, state), {}, {
        groups: commonReducers.addUnreceivedKeys(state.groups, action)
      });

    case commonActionTypes.USERS.GROUPS.USE.INDEXED.CLEAR:
      return _objectSpread2(_objectSpread2({}, state), {}, {
        groups: commonReducers.useIndexedClear(state.groups, action)
      });

    case commonActionTypes.USERS.GROUPS.USE.KEYS.CLEAR:
      return _objectSpread2(_objectSpread2({}, state), {}, {
        groups: commonReducers.useKeysClear(state.groups, action)
      });

    case commonActionTypes.USERS.GROUPS.USE.INDEXED.REGISTER:
      return _objectSpread2(_objectSpread2({}, state), {}, {
        groups: commonReducers.registerUseIndexed(state.groups, action)
      });

    default:
      return state;
  }
});

var INITIAL_STATE$r = _objectSpread2({}, DEFAULT_INITIAL_STATE);
var viewsReducers = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE$r;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case commonActionTypes.VIEWS.ADD:
      return commonReducers.add(state, action);

    case commonActionTypes.VIEWS.ADD_UNRECEIVED:
      return commonReducers.addUnreceivedKeys(state, action);

    case commonActionTypes.VIEWS.DELETE:
      return commonReducers.remove(state, action);

    case commonActionTypes.VIEWS.EDITED.REMOVE:
      return commonReducers.removeEdited(state, action);

    case commonActionTypes.VIEWS.EDITED.REMOVE_ACTIVE:
      return commonReducers.removeEditedActive(state, action);

    case commonActionTypes.VIEWS.EDITED.REMOVE_PROPERTY:
      return commonReducers.removeEditedProperty(state, action);

    case commonActionTypes.VIEWS.EDITED.UPDATE:
      return commonReducers.updateEdited(state, action);

    case commonActionTypes.VIEWS.INDEX.ADD:
      return commonReducers.addIndex(state, action);

    case commonActionTypes.VIEWS.SET_ACTIVE_KEY:
      return commonReducers.setActive(state, action);

    case commonActionTypes.VIEWS.UPDATE_STORE:
      return commonReducers.updateStore(state, action);

    case commonActionTypes.VIEWS.USE.KEYS.REGISTER:
      return commonReducers.useKeysRegister(state, action);

    case commonActionTypes.VIEWS.USE.KEYS.CLEAR:
      return commonReducers.useKeysClear(state, action);

    case commonActionTypes.VIEWS.USE.INDEXED.REGISTER:
      return commonReducers.registerUseIndexed(state, action);

    case commonActionTypes.VIEWS.USE.INDEXED.CLEAR:
      return commonReducers.useIndexedClear(state, action);

    case commonActionTypes.VIEWS.USE.INDEXED.CLEAR_ALL:
      return commonReducers.useIndexedClearAll(state, action);

    case commonActionTypes.VIEWS.INDEX.CLEAR_ALL:
      return commonReducers.clearIndexes(state, action);

    case commonActionTypes.VIEWS.INDEX.CLEAR_INDEX:
      return commonReducers.clearIndex(state, action);

    case commonActionTypes.VIEWS.MARK_DELETED:
      return commonReducers.markDeleted(state, action);

    case commonActionTypes.COMMON.DATA.SET_OUTDATED:
      return commonReducers.dataSetOutdated(state, action);

    case commonActionTypes.COMMON.DATA.CLEANUP_ON_LOGOUT:
      return commonReducers.cleanupOnLogout(state, action);

    default:
      return state;
  }
});

var INITIAL_STATE$s = {
  windows: {},
  sets: {}
};
var INITIAL_SET_STATE$1 = {
  orderByHistory: []
};
var INITIAL_WINDOW_STATE = null; // opening/open/closing/closed
// TODO handle sizes in rem

var INITIAL_WINDOW_SETTINGS = {
  minWidth: 100,
  minHeight: 200,
  maxWidth: 500,
  maxHeight: 500,
  width: 200,
  height: 300,
  position: {
    top: 50,
    left: 50
  }
};

var add$i = function add(state, action) {
  var windows = _objectSpread2({}, state.windows);

  windows[action.windowKey] = {
    key: action.windowKey,
    data: {
      state: action.state ? action.state : INITIAL_WINDOW_STATE,
      settings: _objectSpread2(_objectSpread2({}, INITIAL_WINDOW_SETTINGS), action.settings),
      component: action.component,
      props: action.props
    }
  };

  var sets = _objectSpread2({}, state.sets);

  sets[action.setKey] = _objectSpread2(_objectSpread2({}, INITIAL_SET_STATE$1), sets[action.setKey]);
  sets[action.setKey].orderByHistory = [].concat(_toConsumableArray(sets[action.setKey].orderByHistory), [action.windowKey]);
  return _objectSpread2(_objectSpread2({}, state), {}, {
    windows: windows,
    sets: sets
  });
};

var open$2 = function open(state, action) {
  var windows = _objectSpread2({}, state.windows);

  windows[action.windowKey] = {
    key: action.windowKey,
    data: _objectSpread2(_objectSpread2({}, windows[action.windowKey].data), {}, {
      state: 'open'
    })
  };

  var sets = _objectSpread2({}, state.sets);

  sets[action.setKey] = _objectSpread2(_objectSpread2({}, INITIAL_SET_STATE$1), sets[action.setKey]);
  sets[action.setKey].orderByHistory = [].concat(_toConsumableArray(sets[action.setKey].orderByHistory), [action.windowKey]);
  return _objectSpread2(_objectSpread2({}, state), {}, {
    windows: windows,
    sets: sets
  });
};

var remove$1 = function remove(state, action) {
  var sets = _objectSpread2({}, state.sets);

  if (_isEmpty2(sets) || _isEmpty2(sets[action.setKey]) || !action.windowKey) {
    return state;
  }

  var orderByHistory = _without(_toConsumableArray(sets[action.setKey].orderByHistory), action.windowKey);

  var windows = _objectSpread2({}, state.windows);

  if (windows[action.windowKey]) {
    windows[action.windowKey] = {
      key: action.windowKey,
      data: _objectSpread2(_objectSpread2({}, windows[action.windowKey].data), {}, {
        state: 'close'
      })
    };
  }

  return _objectSpread2(_objectSpread2({}, state), {}, {
    windows: windows,
    sets: _objectSpread2(_objectSpread2({}, sets), {}, _defineProperty({}, action.setKey, {
      orderByHistory: orderByHistory
    }))
  });
};

var top = function top(state, action) {
  var sets = _objectSpread2({}, state.sets);

  var orderByHistory = _without(_toConsumableArray(sets[action.setKey].orderByHistory), action.windowKey);

  orderByHistory.push(action.windowKey);
  return _objectSpread2(_objectSpread2({}, state), {}, {
    sets: _objectSpread2(_objectSpread2({}, sets), {}, _defineProperty({}, action.setKey, _objectSpread2(_objectSpread2({}, sets[action.setKey]), {}, {
      orderByHistory: orderByHistory
    })))
  });
};

var update$6 = function update(state, action) {
  var windows = _objectSpread2({}, state.windows);

  windows[action.windowKey] = {
    key: action.windowKey,
    data: _objectSpread2(_objectSpread2({}, windows[action.windowKey].data), action.data)
  };
  return _objectSpread2(_objectSpread2({}, state), {}, {
    windows: windows
  });
};

var windowsReducers = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE$s;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case commonActionTypes.WINDOWS.ADD:
      return add$i(state, action);

    case commonActionTypes.WINDOWS.OPEN:
      return open$2(state, action);

    case commonActionTypes.WINDOWS.REMOVE:
      return remove$1(state, action);

    case commonActionTypes.WINDOWS.SETS.ADD: // return addSet(state, action);

    case commonActionTypes.WINDOWS.TOP:
      return top(state, action);

    case commonActionTypes.WINDOWS.UPDATE:
      return update$6(state, action);

    default:
      return state;
  }
});

var baseStores = {
  app: appReducers,
  areas: areasReducers,
  areaRelations: areaRelationsReducers,
  attributes: attributesReducers,
  attributeSets: attributeSetsReducers,
  cases: casesReducers,
  components: componentsReducers,
  data: dataReducers,
  layerTemplates: layerTemplatesReducers,
  layerTrees: layerTreesReducers,
  maps: tasksReducer,
  periods: periodsReducers,
  places: placesReducers,
  scenarios: scenariosReducers,
  scopes: scopesReducers,
  screens: screensReducers,
  selections: selectionsReducers,
  styles: stylesReducers,
  tags: tagsReducers,
  users: usersReducers,
  views: viewsReducers,
  windows: windowsReducers
};

var createBaseStore = function createBaseStore(specificStores, rootStores, middleware) {
  var enhancedThunk = thunk.withExtraArgument(activeMetadataActions);
  var appliedMiddleware = applyMiddleware.apply(void 0, [enhancedThunk].concat(_toConsumableArray(middleware)));

  if (process.env.NODE_ENV === 'development') {
    appliedMiddleware = applyMiddleware.apply(void 0, [enhancedThunk, logger].concat(_toConsumableArray(middleware)));
  }

  var stores = specificStores ? _objectSpread2(_objectSpread2(_objectSpread2({}, baseStores), rootStores), {}, {
    specific: combineReducers(specificStores)
  }) : _objectSpread2(_objectSpread2({}, baseStores), rootStores);
  return createStore(combineReducers(stores), compose(reduxBatch, appliedMiddleware, reduxBatch, applyMiddleware(enhancedThunk), reduxBatch));
};

var index = {
  commonActionTypes: commonActionTypes,
  Action: Action,
  Select: Select,
  commonActions: commonActions,
  commonHelpers: commonHelpers,
  commonReducers: commonReducers,
  commonSelectors: commonSelectors,
  DEFAULT_INITIAL_STATE: DEFAULT_INITIAL_STATE
};

export default index;
export { Action, DEFAULT_INITIAL_STATE, mountWrapper as MountWrapper, STORES_TO_ENSURE_WITH_FILTER_BY_ACTIVE, Select, activeMetadataActions, baseStores, commonActionTypes, commonActions, commonHelpers, commonReducers, commonSelectors, connects, createBaseStore };
//# sourceMappingURL=index.es.js.map
