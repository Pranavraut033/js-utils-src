"use strict";

require("core-js/modules/es.math.log10");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDigitCount = void 0;

/**
 * return the length of a number
 * @param {Number} n any number
 * @returns The length of the given number
 */
var getDigitCount = function getDigitCount(n) {
  return 1 + Math.log10(Math.abs(n) + 1) | 0;
};

exports.getDigitCount = getDigitCount;