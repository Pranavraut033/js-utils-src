"use strict";

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.bind");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

var _file = require("../file");

var _object = require("../object");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function addStateChangeListener(uploadTask, path, options) {
  uploadTask.on("state_changed", function (snapshot) {
    var progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
    (0, _object.run)(options, "onProgress", progress);
    if (this.fireStorage) switch (snapshot.state) {
      case this.fireStorage.TaskState.PAUSED:
        (0, _object.run)(options, "onPause");
        break;

      case this.fireStorage.TaskState.RUNNING:
        (0, _object.run)(options, "onRunning");
        break;
    }
  }, function (error) {
    (0, _object.run)(options, "onFailed", error);
  }, function () {
    (0, _object.run)(options, "onComplete", path);
  });
}

var FireStorageHelper = /*#__PURE__*/function () {
  /**
   *
   * @param {*} fireStorage firebase storeage class
   * @param {*} storageRef firebase storage root ref
   */
  function FireStorageHelper(fireStorage, storageRef) {
    _classCallCheck(this, FireStorageHelper);

    this.fireStorage = fireStorage;
    this.storageRef = storageRef;
  }

  _createClass(FireStorageHelper, [{
    key: "uploadFile",
    value: function () {
      var _uploadFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(path, file, options) {
        var fileHash, uploadTask;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _file.fileMD5Hash)(file);

              case 2:
                fileHash = _context.sent;
                uploadTask = this.storageRef.child(path).put(file, {
                  contentType: file.type,
                  md5Hash: fileHash,
                  customMetadata: {}
                });
                addStateChangeListener.bind(this)(uploadTask, path, options);
                return _context.abrupt("return", uploadTask);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function uploadFile(_x, _x2, _x3) {
        return _uploadFile.apply(this, arguments);
      }

      return uploadFile;
    }()
  }, {
    key: "uploadString",
    value: function () {
      var _uploadString = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(path, dataString) {
        var type,
            options,
            uploadTask,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                type = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : "data_url";
                options = _args2.length > 3 ? _args2[3] : undefined;
                uploadTask = this.storageRef.child(path).putString(dataString, type);
                addStateChangeListener.bind(this)(uploadTask, path, options);
                return _context2.abrupt("return", uploadTask);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function uploadString(_x4, _x5) {
        return _uploadString.apply(this, arguments);
      }

      return uploadString;
    }()
  }, {
    key: "getDownloadPath",
    value: function getDownloadPath(path) {
      return this.storageRef.child(path).getDownloadURL();
    }
  }, {
    key: "deleteFile",
    value: function deleteFile() {
      var self = this;

      for (var _len = arguments.length, files = new Array(_len), _key = 0; _key < _len; _key++) {
        files[_key] = arguments[_key];
      }

      return Promise.all(files.map(function (path) {
        if (!path) return;
        var fileRef = self.storageRef.child(path); // Delete the file

        return fileRef["delete"]();
      }));
    }
  }]);

  return FireStorageHelper;
}();

exports["default"] = FireStorageHelper;