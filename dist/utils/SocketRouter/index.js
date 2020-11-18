"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _httpErrors = require("../httpErrors");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SocketRouter = /*#__PURE__*/function () {
  function SocketRouter(IO) {
    _classCallCheck(this, SocketRouter);

    if (!IO) throw new Error("IO Object required");
    this.sockets = {};
    this.IO = IO;
  }

  _createClass(SocketRouter, [{
    key: "createSocket",
    value: function createSocket(id) {
      if (this.sockets[id]) return;
      this.sockets[id] = this.IO.of("/" + id).on("connection", function () {
        console.log("Socket:", id + ": connected");
        this.sockets[id].on("disconnect", function () {
          console.log("Socket:", id + ": disconnected");
        });
      });
    }
  }, {
    key: "sendData",
    value: function sendData(id, event, data) {
      if (this.sockets[id]) {
        this.sockets[id].emit(event, data);
        if (!this.sockets[id].connected) return "Not connected";
      } else return "No socket avaiable";
    }
    /**
     *
     * @param {Router} router express router instance
     * @param {function} authFunction router function(req, res, next) next should be called
     */

  }, {
    key: "register",
    value: function register(router, authFunction) {
      authFunction = authFunction || function (_, __, next) {
        return next();
      };

      router.get("/socket/create/:id", authFunction, function (req, res) {
        this.createSocket(req.params.id);
        res.send("ok");
      });
      router.post("/socket/send/:id", authFunction, function (req, res) {
        var err = this.sendData(req.params.id, req.body.event, req.body.data);
        if (err) (0, _httpErrors.create404)(res, err);else res.json("ok");
      });
      router.post("/socket/isConnected/:id", authFunction, function (req, res) {
        if (!this.sockets[req.params.id]) return (0, _httpErrors.create404)(res, "No socket available");
        res.send(this.sockets[req.params.id].isConnected);
      });
    }
  }]);

  return SocketRouter;
}();

exports["default"] = SocketRouter;