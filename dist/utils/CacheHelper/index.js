"use strict";

require("core-js/modules/es.date.now");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.match");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ms = _interopRequireDefault(require("ms"));

var _Logger = _interopRequireDefault(require("../Logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var logger = new _Logger["default"]("Cache");

var CacheHelper = /*#__PURE__*/function () {
  function CacheHelper(name) {
    _classCallCheck(this, CacheHelper);

    if (!name) throw new Error("Name required");
    this.name = name;
    this.caches = window.caches;
  }

  _createClass(CacheHelper, [{
    key: "addInCache",
    value: function addInCache(path, data, life) {
      this.caches.open(this.name).then(function (cache) {
        return cache.put(new Request("/".concat(path), {
          method: "get"
        }), new Response(JSON.stringify({
          data: data,
          expiresIn: Date.now() + (0, _ms["default"])(life)
        })));
      })["catch"](function (err) {
        return logger.w(err);
      });
    }
  }, {
    key: "getFromCache",
    value: function getFromCache(path, callback) {
      this.caches.open(this.name).then(function (cache) {
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
    }
  }, {
    key: "removeFromCache",
    value: function removeFromCache(path) {
      this.caches.open(this.name).then(function (cache) {
        return cache["delete"](new Request("/".concat(path), {
          method: "get"
        }));
      })["catch"](function (err) {
        return logger.w(err);
      });
    }
  }]);

  return CacheHelper;
}();

var _default = CacheHelper;
exports["default"] = _default;