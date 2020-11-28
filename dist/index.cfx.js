'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getColor = _interopRequireDefault(require("./utils/getColor"));

var _queryPaser = _interopRequireDefault(require("./utils/middleware/queryPaser"));

var _mongoObjectId = _interopRequireDefault(require("./utils/mongoObjectId"));

var httpErrors = _interopRequireWildcard(require("./utils/httpErrors"));

var list = _interopRequireWildcard(require("./utils/list"));

var regex = _interopRequireWildcard(require("./utils/regex"));

var object = _interopRequireWildcard(require("./utils/object"));

var number = _interopRequireWildcard(require("./utils/number"));

var axiosHelper = _interopRequireWildcard(require("./utils/AxiosHelper"));

var _FireStorageHelper = _interopRequireDefault(require("./utils/FireStorageHelper"));

var _SocketRouter = _interopRequireDefault(require("./utils/SocketRouter"));

var _Logger = _interopRequireDefault(require("./utils/Logger"));

var _CacheHelper = _interopRequireDefault(require("./utils/CacheHelper"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({
  AxiosHelper: axiosHelper["default"],
  FireStorageHelper: _FireStorageHelper["default"],
  CacheHelper: _CacheHelper["default"],
  SocketRouter: _SocketRouter["default"],
  Logger: _Logger["default"],
  getColor: _getColor["default"],
  queryPaser: _queryPaser["default"],
  mongoObjectId: _mongoObjectId["default"],
  errorHandler: axiosHelper.errorHandler
}, list), httpErrors), regex), object), number);

exports["default"] = _default;