"use strict";

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.parse-int");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

require("core-js/modules/web.url");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = errorHandler;
exports["default"] = void 0;

require("regenerator-runtime/runtime");

var _axios = _interopRequireDefault(require("axios"));

require("url-search-params-polyfill");

var _Logger = _interopRequireDefault(require("../Logger"));

var _object = require("../object");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var logger = new _Logger["default"]("Axios");
/**
 *
 * @param {AxiosHelper} requestHelper
 * @param {String} baseUrl
 */

function createAxios(requestHelper, baseUrl) {
  return new _axios["default"].create({
    baseURL: baseUrl,
    onUploadProgress: function onUploadProgress(progressEvent) {
      var progress = parseInt(Math.round(progressEvent.loaded / progressEvent.total * 100));

      for (var key in requestHelper.progressCallbacks) {
        if (key in requestHelper.progressCallbacks) {
          var element = requestHelper.progressCallbacks[key];
          element && element(progress, progressEvent);
        }
      }
    }
  });
}

var AxiosHelper = /*#__PURE__*/function () {
  function AxiosHelper() {
    var baseUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "http://localhost:3000/";
    var token = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, AxiosHelper);

    this.progressCallbacks = {};
    this.axios = createAxios(this, baseUrl);
    this.token = token;
  }

  _createClass(AxiosHelper, [{
    key: "changeUrl",
    value: function changeUrl(baseUrl) {
      this.axios = createAxios(this, baseUrl);
    }
  }, {
    key: "addProgressCallback",
    value: function addProgressCallback(name, cb) {
      this.progressCallbacks[name] = cb;
      return this;
    }
  }, {
    key: "removeProgressCallback",
    value: function removeProgressCallback(name) {
      delete this.progressCallbacks[name];
      return this;
    }
  }, {
    key: "makeRequest",
    value: function () {
      var _makeRequest = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(method, model) {
        var url,
            Authorization,
            callback,
            data,
            headers,
            headersToAdd,
            queryItems,
            id,
            _headers,
            query,
            attr,
            params,
            key,
            element,
            response,
            _args = arguments;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                url = model;
                Authorization = "Bearer " + this.token;
                callback = (_args.length <= 3 ? undefined : _args[3]) || (_args.length <= 2 ? undefined : _args[2]);
                data = ((_args.length <= 2 ? undefined : _args[2]) instanceof Function ? {} : _args.length <= 2 ? undefined : _args[2]) || {};
                headers = {
                  Authorization: Authorization
                };
                headersToAdd = null, queryItems = null;

                if (global.FormData && data instanceof global.FormData) {
                  id = data.get("id");
                  if (id) url += "/" + id;
                  data["delete"]("id");
                  _headers = data.get("header");
                  _headers = _headers && JSON.parse(_headers);

                  if (_headers) {
                    headersToAdd = _headers;
                    data["delete"]("header");
                  }

                  query = data.get("query");
                  query = query && JSON.parse(query);

                  if (query) {
                    queryItems = query;
                    data["delete"]("query");
                  }
                } else {
                  if (data.id) url += "/" + data.id;
                  delete data.id;

                  if ("header" in data) {
                    headersToAdd = (0, _object.clone)(data.header);
                    delete data.header;
                  }

                  if ("query" in data) {
                    queryItems = (0, _object.clone)(data.query);
                    delete data.query;
                  }
                }

                if (headersToAdd) for (attr in headersToAdd) {
                  headers[attr] = headersToAdd[attr];
                }

                if (queryItems) {
                  params = new URLSearchParams();

                  for (key in queryItems) {
                    if (key in queryItems) {
                      element = queryItems[key];
                      params.append(key, element);
                    }
                  }

                  url += "?" + params.toString();
                }

                _context.next = 11;
                return this.axios({
                  headers: headers,
                  method: method,
                  url: url,
                  responseType: "json",
                  data: data
                });

              case 11:
                response = _context.sent;
                return _context.abrupt("return", typeof callback == "function" ? callback(response) : response);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function makeRequest(_x, _x2) {
        return _makeRequest.apply(this, arguments);
      }

      return makeRequest;
    }()
  }]);

  return AxiosHelper;
}();

exports["default"] = AxiosHelper;

function errorHandler(err) {
  var message;

  if (err.response && err.response.data) {
    if (err.response.data.error) console.info(err.response.data.error);
    logger.i("Config", err.config);
    message = err.response.data.message;
  } else {
    logger.w("Error", err);
    message = err.message;
  }

  return message;
}