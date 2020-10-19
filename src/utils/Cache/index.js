import ms from "ms";
import Logger from "../Logger";

const logger = new Logger("Cache");

export default function (name) {
  if (!name) throw new Error("Name required");
  return {
    addInCache(path, data, life) {
      caches
        .open(name)
        .then((cache) =>
          cache.put(
            new Request(`/${path}`, { method: "get" }),
            new Response(
              JSON.stringify({ data, expiresIn: Date.now() + ms(life) })
            )
          )
        )
        .catch((err) => logger.w(err));
    },
    getFromCache(path, callback) {
      caches
        .open(name)
        .then((cache) =>
          cache.match(new Request(`/${path}`, { method: "get" }))
        )
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
    },
    removeFromCache(path) {
      caches
        .open(name)
        .then((cache) =>
          cache.delete(new Request(`/${path}`, { method: "get" }))
        )
        .catch((err) => logger.w(err));
    },
  };
}
