"use strict";

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.object.freeze");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _querystring = _interopRequireDefault(require("querystring"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(req, _, next) {
  var i = req.url.indexOf("?");
  var a = {};

  if (i != -1) {
    var parameters = _querystring["default"].parse(req.url.slice(i + 1));

    for (var key in parameters) {
      a[key] = parameters[key];
    }
  }

  req.queryParams = Object.freeze(a);
  next();
}