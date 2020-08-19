import { create404 } from "../httpErrors";

export default class SocketRouter {
  constructor(IO) {
    if (!IO) throw new Error("IO Object required");

    this.sockets = {};
    this.IO = IO;
  }

  createSocket(id) {
    if (this.sockets[id]) return;

    this.sockets[id] = this.IO.of("/" + id).on("connection", function () {
      console.log("Socket:", id + ": connected");

      this.sockets[id].on("disconnect", () => {
        console.log("Socket:", id + ": disconnected");
      });
    });
  }

  sendData(id, event, data) {
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
  register(router, authFunction) {
    authFunction = authFunction || ((_, __, next) => next());

    router.get("/socket/create/:id", authFunction, function (req, res) {
      this.createSocket(req.params.id);
      res.send("ok");
    });

    router.post("/socket/send/:id", authFunction, function (req, res) {
      let err = this.sendData(req.params.id, req.body.event, req.body.data);

      if (err) create404(res, err);
      else res.json("ok");
    });

    router.post("/socket/isConnected/:id", authFunction, function (req, res) {
      if (!this.sockets[req.params.id])
        return create404(res, "No socket available");

      res.send(this.sockets[req.params.id].isConnected);
    });
  }
}
