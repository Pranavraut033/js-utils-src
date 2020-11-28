import ms from "ms";
import Logger from "../Logger";

const logger = new Logger("Cache");

class CacheHelper {
  constructor(name) {
    if (!name) throw new Error("Name required");

    this.name = name;
    this.caches = window.caches;
  }

  addInCache(path, data, life) {
    this.caches
      .open(this.name)
      .then((cache) =>
        cache.put(
          new Request(`/${path}`, { method: "get" }),
          new Response(
            JSON.stringify({ data, expiresIn: Date.now() + ms(life) })
          )
        )
      )
      .catch((err) => logger.w(err));
  }

  getFromCache(path, callback) {
    this.caches
      .open(this.name)
      .then((cache) => cache.match(new Request(`/${path}`, { method: "get" })))
      .then((response) => response && response.body.getReader().read())
      .then((reader) => {
        if (reader) {
          const cached = JSON.parse(new TextDecoder().decode(reader.value));
          if (Date.now() > cached.expiresIn)
            throw new Error(`Path ${path} expired`);
          return callback(cached.data);
        }

        callback(null);
      })
      .catch((err) => {
        logger.w(err);
        callback(null);
      });
  }

  removeFromCache(path) {
    this.caches
      .open(this.name)
      .then((cache) => cache.delete(new Request(`/${path}`, { method: "get" })))
      .catch((err) => logger.w(err));
  }
}

export default CacheHelper;
