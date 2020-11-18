"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ = require("..");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable */
var Logger = /*#__PURE__*/function () {
  function Logger() {
    var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Logger";
    var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, Logger);

    this.tag = tag;
    this.force = force;
  }
  /**
   *
   * @param {any} message
   * @param  {...any} optionalParams
   */


  _createClass(Logger, [{
    key: "d",
    value: function d(message) {
      var _console;

      for (var _len = arguments.length, optionalParams = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        optionalParams[_key - 1] = arguments[_key];
      }

      if (this.force || !(0, _.isProduction)()) (_console = console).debug.apply(_console, ["".concat(this.tag, ":")].concat([message].concat(optionalParams)));
    }
    /**
     *
     * @param {any} message
     * @param  {...any} optionalParams
     */

  }, {
    key: "e",
    value: function e(message) {
      var _console2;

      for (var _len2 = arguments.length, optionalParams = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        optionalParams[_key2 - 1] = arguments[_key2];
      }

      (_console2 = console).error.apply(_console2, ["".concat(this.tag, ":")].concat([message].concat(optionalParams)));
    }
    /**
     *
     * @param {any} message
     * @param  {...any} optionalParams
     */

  }, {
    key: "l",
    value: function l(message) {
      var _console3;

      for (var _len3 = arguments.length, optionalParams = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        optionalParams[_key3 - 1] = arguments[_key3];
      }

      (_console3 = console).log.apply(_console3, ["".concat(this.tag, ":")].concat([message].concat(optionalParams)));
    }
    /**
     *
     * @param {any} message
     * @param  {...any} optionalParams
     */

  }, {
    key: "w",
    value: function w(message) {
      var _console4;

      for (var _len4 = arguments.length, optionalParams = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        optionalParams[_key4 - 1] = arguments[_key4];
      }

      if (this.force || !(0, _.isProduction)()) (_console4 = console).log.apply(_console4, ["".concat(this.tag, ":")].concat([message].concat(optionalParams)));
    }
    /**
     * call always to skip debug check
     */

  }, {
    key: "always",
    value: function always() {
      this.force = true;
      return this;
    }
  }]);

  return Logger;
}();

exports["default"] = Logger;