"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "getColor", {
  enumerable: true,
  get: function get() {
    return _getColor["default"];
  }
});
Object.defineProperty(exports, "setColor", {
  enumerable: true,
  get: function get() {
    return _getColor.setColor;
  }
});
Object.defineProperty(exports, "queryPaser", {
  enumerable: true,
  get: function get() {
    return _queryPaser["default"];
  }
});
Object.defineProperty(exports, "mongoObjectId", {
  enumerable: true,
  get: function get() {
    return _mongoObjectId["default"];
  }
});
Object.defineProperty(exports, "AxiosHelper", {
  enumerable: true,
  get: function get() {
    return _AxiosHelper["default"];
  }
});
Object.defineProperty(exports, "errorHandler", {
  enumerable: true,
  get: function get() {
    return _AxiosHelper.errorHandler;
  }
});
Object.defineProperty(exports, "FireStorageHelper", {
  enumerable: true,
  get: function get() {
    return _FireStorageHelper["default"];
  }
});
Object.defineProperty(exports, "SocketRouter", {
  enumerable: true,
  get: function get() {
    return _SocketRouter["default"];
  }
});
Object.defineProperty(exports, "Logger", {
  enumerable: true,
  get: function get() {
    return _Logger["default"];
  }
});
Object.defineProperty(exports, "CacheHelper", {
  enumerable: true,
  get: function get() {
    return _CacheHelper["default"];
  }
});

var _getColor = _interopRequireWildcard(require("./utils/getColor"));

var _queryPaser = _interopRequireDefault(require("./utils/middleware/queryPaser"));

var _mongoObjectId = _interopRequireDefault(require("./utils/mongoObjectId"));

var httpErrors = _interopRequireWildcard(require("./utils/httpErrors"));

var list = _interopRequireWildcard(require("./utils/list"));

var regex = _interopRequireWildcard(require("./utils/regex"));

var object = _interopRequireWildcard(require("./utils/object"));

var cookie = _interopRequireWildcard(require("./utils/cookie"));

var utils = _interopRequireWildcard(require("./utils"));

var number = _interopRequireWildcard(require("./utils/number"));

var _AxiosHelper = _interopRequireWildcard(require("./utils/AxiosHelper"));

var _FireStorageHelper = _interopRequireDefault(require("./utils/FireStorageHelper"));

var _SocketRouter = _interopRequireDefault(require("./utils/SocketRouter"));

var _Logger = _interopRequireDefault(require("./utils/Logger"));

var _CacheHelper = _interopRequireDefault(require("./utils/CacheHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var a = _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, list), httpErrors), regex), cookie), object), number), utils);

Object.entries(a).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];

  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return value;
    }
  });
});