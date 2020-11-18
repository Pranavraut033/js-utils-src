"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
exports.setColor = void 0;

var _stringToColor = _interopRequireDefault(require("string-to-color"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var colorMap = {};
/**
 *
 * @param {String} string
 */

function _default(string) {
  return colorMap[string] || (colorMap[string] = (0, _stringToColor["default"])(string));
}
/**
 *
 * @param {String} text
 * @param {String} color hex color
 */


var setColor = function setColor(text, color) {
  return colorMap[text] = color;
};

exports.setColor = setColor;