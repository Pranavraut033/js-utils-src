"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changedFields = changedFields;
exports.extend = extend;
exports.run = run;
exports.findNestedItem = findNestedItem;
exports.findNestedKey = findNestedKey;
exports.isEqual = exports.clean = exports.isEmpty = exports.clone = void 0;

var _isobject = _interopRequireDefault(require("isobject"));

var _deepEqual = _interopRequireDefault(require("deep-equal"));

var _clone2 = _interopRequireDefault(require("clone"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var clone = function clone(obj) {
  return (0, _clone2["default"])(obj);
};

exports.clone = clone;

var isEmpty = function isEmpty(obj) {
  return obj === null || obj === undefined || obj.constructor === Object && Object.keys(obj).length === 0;
};

exports.isEmpty = isEmpty;

var clean = function clean(obj) {
  if (!(0, _isobject["default"])(obj)) return obj;

  for (var key in obj) {
    if (obj[key] === "") delete obj[key];
  }

  return obj;
};
/**
 *
 * @param {object} a original object
 * @param {object} b modified object
 * @returns {object} changed attributes in b
 */


exports.clean = clean;

function changedFields(a, b) {
  if (!a && !b || !b) return null;
  if (!a) return Object.assign({}, b);
  return Object.keys(b).filter(function (key) {
    return !isEqual(a[key], b[key]);
  }).reduce(function (obj, key) {
    obj[key] = b[key];
    return obj;
  }, {});
}

function extend(obj, src) {
  for (var key in src) {
    obj[key] = src[key];
  }

  return obj;
}
/**
 * Check if object 1 is equal to object 2
 * @param {Any} a Object 1
 * @param {Any} b Object 2
 */


var isEqual = function isEqual(a, b) {
  return (0, _deepEqual["default"])(a, b);
};
/**
 * Use this function to run a function in the object
 * @param {Object} object
 * @param {String} name
 * @param {...Any} parameters
 */


exports.isEqual = isEqual;

function run(object, name) {
  for (var _len = arguments.length, parameters = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    parameters[_key - 2] = arguments[_key];
  }

  if (!object || !name) return;
  var func = object[name];
  parameters = parameters || [];

  if (func && typeof func === "function") {
    func.apply(void 0, _toConsumableArray(parameters));
  }
}
/**
 *
 * @param {Object} object
 * @param {String} key
 * @param {Any} value
 * @param {{ parent? : Boolean, first? : Boolean }} options
 * @return {?Any} the parent which have the the given key-value pair
 */


function findNestedItem(object, key, value, _ref) {
  var _ref$parent = _ref.parent,
      parent = _ref$parent === void 0 ? false : _ref$parent,
      _ref$first = _ref.first,
      first = _ref$first === void 0 ? true : _ref$first;
  if (!object) return null;
  var result = null;

  if (object instanceof Array) {
    for (var i = 0; i < object.length; i++) {
      result = findNestedKey(object[i], key, value, {
        parent: parent,
        first: first
      });

      if (result) {
        if (parent) return object[prop];
        if (first) return result;
      }
    }
  } else {
    for (var prop in object) {
      if (prop == key) {
        if (object[prop] == value) {
          return object;
        }
      }

      if (object[prop] instanceof Object || object[prop] instanceof Array) result = findNestedKey(object[prop], key, value, {
        parent: parent,
        first: first
      });

      if (result) {
        if (parent) return object[prop];
        if (first) return result;
      }
    }
  }

  return result;
}
/**
 *
 * @param { Object } object
 * @param { String } key
 * @return { Object } the parent object who contins the $key
 */


function findNestedKey(object, key) {
  var result = null;

  for (var prop in object) {
    if (prop == key) return object;
    if (object[prop] instanceof Object || object[prop] instanceof Array) result = findNestedKey(object[prop], key);
    if (result) break;
  }

  return result;
}