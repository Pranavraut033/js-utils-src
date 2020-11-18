"use strict";

require("core-js/modules/es.date.now");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.match");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _ms = _interopRequireDefault(require("ms"));

var _Logger = _interopRequireDefault(require("../Logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var logger = new _Logger["default"]("Cache");

function _default(name) {
  if (!name) throw new Error("Name required");
  return {
    addInCache: function addInCache(path, data, life) {
      caches.open(name).then(function (cache) {
        return cache.put(new Request("/".concat(path), {
          method: "get"
        }), new Response(JSON.stringify({
          data: data,
          expiresIn: Date.now() + (0, _ms["default"])(life)
        })));
      })["catch"](function (err) {
        return logger.w(err);
      });
    },
    getFromCache: function getFromCache(path, callback) {
      caches.open(name).then(function (cache) {
        return cache.match(new Request("/".concat(path), {
          method: "get"
        }));
      }).then(function (response) {
        return response && response.body.getReader().read();
      }).then(function (reader) {
        if (reader) {
          var cached = JSON.parse(new TextDecoder().decode(reader.value));
          if (Date.now() > cached.expiresIn) throw new Error("Path ".concat(path, " expired"));
          return callback(cached.data);
        }

        callback(null);
      })["catch"](function (err) {
        logger.w(err);
        callback(null);
      });
    },
    removeFromCache: function removeFromCache(path) {
      caches.open(name).then(function (cache) {
        return cache["delete"](new Request("/".concat(path), {
          method: "get"
        }));
      })["catch"](function (err) {
        return logger.w(err);
      });
    }
  };
}