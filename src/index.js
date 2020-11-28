// export const date = require("./utils/date");

import getColor from "./utils/getColor";
import queryPaser from "./utils/middleware/queryPaser";
import mongoObjectId from "./utils/mongoObjectId";

import * as httpErrors from "./utils/httpErrors";
import * as list from "./utils/list";
import * as regex from "./utils/regex";
import * as object from "./utils/object";
import * as number from "./utils/number";
import AxiosHelper, { errorHandler } from "./utils/AxiosHelper";

import FireStorageHelper from "./utils/FireStorageHelper";
import SocketRouter from "./utils/SocketRouter";
import Logger from "./utils/Logger";
import CacheHelper from "./utils/CacheHelper";

export {
  AxiosHelper,
  FireStorageHelper,
  CacheHelper,
  SocketRouter,
  Logger,
  getColor,
  queryPaser,
  mongoObjectId,
  errorHandler,
};

let a = {
  ...list,
  ...httpErrors,
  ...regex,
  ...object,
  ...number,
};

Object.entries(a).forEach(([key, value]) => (module.exports[key] = value));
