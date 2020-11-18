"use strict";

require("core-js/modules/es.array.concat");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHTTPResponse = createHTTPResponse;
exports.create500 = exports.create499 = exports.create498 = exports.create409 = exports.create404 = exports.create403 = exports.create401 = exports.create400 = void 0;

var _isString = _interopRequireDefault(require("is-string"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Bad Request
 * @param {Request} res
 * @param  {[String|Error, Error]} options
 */
var create400 = function create400(res) {
  for (var _len = arguments.length, options = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    options[_key - 1] = arguments[_key];
  }

  return createHTTPResponse.apply(void 0, [400, res].concat(options));
};
/**
 * Unauthorized
 * @param {Request} res
 * @param  {[String|Error, Error]} options
 */


exports.create400 = create400;

var create401 = function create401(res) {
  for (var _len2 = arguments.length, options = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    options[_key2 - 1] = arguments[_key2];
  }

  return createHTTPResponse.apply(void 0, [401, res].concat(options));
};
/**
 * Forbidden
 * @param {Request} res
 * @param  {[String|Error, Error]} options
 */


exports.create401 = create401;

var create403 = function create403(res) {
  for (var _len3 = arguments.length, options = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    options[_key3 - 1] = arguments[_key3];
  }

  return createHTTPResponse.apply(void 0, [403, res].concat(options));
};
/**
 * Not Found
 * @param {Request} res
 * @param  {[String|Error, Error]} options
 */


exports.create403 = create403;

var create404 = function create404(res) {
  for (var _len4 = arguments.length, options = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    options[_key4 - 1] = arguments[_key4];
  }

  return createHTTPResponse.apply(void 0, [404, res].concat(options));
};
/**
 * Confict
 * @param {Request} res
 * @param  {[String|Error, Error]} options
 */


exports.create404 = create404;

var create409 = function create409(res) {
  for (var _len5 = arguments.length, options = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    options[_key5 - 1] = arguments[_key5];
  }

  return createHTTPResponse.apply(void 0, [409, res].concat(options));
};
/**
 * Invalid Token
 * @param {Request} res
 * @param  {[String|Error, Error]} options
 */


exports.create409 = create409;

var create498 = function create498(res) {
  for (var _len6 = arguments.length, options = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
    options[_key6 - 1] = arguments[_key6];
  }

  return createHTTPResponse.apply(void 0, [498, res].concat(options));
};
/**
 * Token Required
 * @param {Request} res
 * @param  {[String|Error, Error]} options
 */


exports.create498 = create498;

var create499 = function create499(res) {
  for (var _len7 = arguments.length, options = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
    options[_key7 - 1] = arguments[_key7];
  }

  return createHTTPResponse.apply(void 0, [499, res].concat(options));
};
/**
 * Internal Server Error
 * @param {Request} res
 * @param  {[String|Error, Error]} options
 */


exports.create499 = create499;

var create500 = function create500(res) {
  for (var _len8 = arguments.length, options = new Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
    options[_key8 - 1] = arguments[_key8];
  }

  return createHTTPResponse.apply(void 0, [500, res].concat(options));
};
/**
 *
 * @param {Number} status http status code
 * @param {Request} res
 * @param  {[String|Error, Error]} options
 */


exports.create500 = create500;

function createHTTPResponse(status, res) {
  for (var _len9 = arguments.length, options = new Array(_len9 > 2 ? _len9 - 2 : 0), _key9 = 2; _key9 < _len9; _key9++) {
    options[_key9 - 2] = arguments[_key9];
  }

  return res.status(status).json(getMessageBody.apply(void 0, options));
}
/**
 *
 * @param  {[String|Error, Error]} options
 * @return {String} Error string either from error or message provided
 */


function getMessageBody() {
  var message, err;

  if ((0, _isString["default"])(arguments.length <= 0 ? undefined : arguments[0])) {
    message = arguments.length <= 0 ? undefined : arguments[0];
    err = arguments.length <= 1 ? undefined : arguments[1];
  } else err = arguments.length <= 0 ? undefined : arguments[0];

  message = message || err && (err._message || err.message);
  var body = {
    message: message || "Some error occurred. Try again in some time"
  };
  if (err) console.warn(body.error = err);
  return body;
}