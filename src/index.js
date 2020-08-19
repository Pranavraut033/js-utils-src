// export const date = require("./utils/date");

import getColor from "./utils/getColor";
import queryPaser from "./utils/middleware/queryPaser";

import * as httpErrors from "./utils/httpErrors";
import * as list from "./utils/list";
import * as regex from "./utils/regex";
import * as object from "./utils/object";
import * as number from "./utils/number";

import { default as AxiosHelper, errorHandler } from "./utils/AxiosHelper";
import { default as FireStorageHelper } from "./utils/FireStorageHelper";
import { default as SocketRouter } from "./utils/SocketRouter";

export {
  AxiosHelper,
  FireStorageHelper,
  SocketRouter,
  errorHandler,
  getColor,
  queryPaser,
  httpErrors,
  list,
  number,
  object,
  regex,
};
