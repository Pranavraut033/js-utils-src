// export const date = require("./utils/date");

import getColor from "./utils/getColor";
import queryPaser from "./utils/middleware/queryPaser";
import mongoObjectId from "./utils/mongoObjectId";

import * as httpErrors from "./utils/httpErrors";
import * as list from "./utils/list";
import * as regex from "./utils/regex";
import * as object from "./utils/object";
import * as number from "./utils/number";
import * as axiosHelper from "./utils/AxiosHelper";

import { default as FireStorageHelper } from "./utils/FireStorageHelper";
import { default as SocketRouter } from "./utils/SocketRouter";
import { default as Logger } from "./utils/Logger";
import CacheHelper from "./utils/CacheHelper";

export default {
  AxiosHelper: axiosHelper.default,
  FireStorageHelper,
  CacheHelper,
  SocketRouter,
  Logger,
  getColor,
  queryPaser,
  mongoObjectId,
  errorHandler: axiosHelper.errorHandler,
  ...list,
  ...httpErrors,
  ...regex,
  ...object,
  ...number,
};
