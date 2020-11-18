"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.split");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCookie = setCookie;
exports.getCookie = getCookie;
exports.deleteCookie = deleteCookie;

/**
 * function to set a cookie with name '_cname_' and '__cvalue__' as it's
 * content
 * @see https://www.w3schools.com/js/js_cookies.asp
 *
 * @param {String} cname Name of cookie
 * @param {*} cvalue Value to store
 * @param {Number} exdays Validity in days
 */
function setCookie(cname, cvalue) {
  var exdays = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=".concat(d.toUTCString());
  document.cookie = "".concat(cname, "=").concat(cvalue, ";").concat(expires, ";path=/");
}
/**
 * Function to get a cookie with name '_cname_'
 *
 * @param {String} cname Name of cookie
 *
 * @see https: //www.w3schools.com/js/js_cookies.asp
 */


function getCookie(cname) {
  var name = "".concat(cname, "=");
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }

    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }

  return "";
}
/**
 * Funciton to delete a set cookie
 *
 * @param {String} name name of the cooke to delete [expire];
 */


function deleteCookie(name) {
  setCookie(name, "", -1);
}