"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.reverse");

require("core-js/modules/es.number.to-fixed");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.split");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileMD5Hash = fileMD5Hash;
exports.getSize = getSize;
exports.getExtension = getExtension;

var _browserMd5File = _interopRequireDefault(require("browser-md5-file"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function fileMD5Hash(file) {
  var bmf = new _browserMd5File["default"]();
  return new Promise(function (resolve, reject) {
    bmf.md5(file, function (err, md5) {
      if (err) reject(err);else resolve(md5);
    });
  });
}
/**
 * Get Humman readable size string from
 * size in bytes
 *
 * @param {Number} size Size in byte
 */


function getSize(size) {
  var units = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
  var t = size;
  var i = 0;

  while (t > 1024) {
    t = t / 1024;
    i++;
  }

  return "".concat(t.toFixed(2), " ").concat(units[i]);
}

function getExtension(fileName) {
  return fileName && fileName.split(".").reverse()[0].toLowerCase();
}