import Axios from "axios";
import "url-search-params-polyfill";
import { clone } from "../object";

/**
 *
 * @param {AxiosHelper} requestHelper
 * @param {String} baseUrl
 */
function createAxios(requestHelper, baseUrl) {
  return new Axios.create({
    baseURL: baseUrl,
    onUploadProgress: function (progressEvent) {
      let progress = parseInt(
        Math.round((progressEvent.loaded / progressEvent.total) * 100)
      );

      for (const key in requestHelper.progressCallbacks) {
        if (key in requestHelper.progressCallbacks) {
          const element = requestHelper.progressCallbacks[key];
          element && element(progress, progressEvent);
        }
      }
    },
  });
}

export default class AxiosHelper {
  constructor(baseUrl = "http://localhost:3000/", token) {
    this.progressCallbacks = {};
    this.axios = createAxios(this, baseUrl);
    this.token = token;
  }

  changeUrl(baseUrl) {
    this.axios = createAxios(this, baseUrl);
  }

  addProgressCallback(name, cb) {
    this.progressCallbacks[name] = cb;
    return this;
  }

  removeProgressCallback(name) {
    delete this.progressCallbacks[name];
    return this;
  }

  async makeRequest(method, model, ...option) {
    var url = model;
    let Authorization = "Bearer " + this.token;

    let callback = option[1] || option[0];
    let data = (option[0] instanceof Function ? {} : option[0]) || {};
    let headers = { Authorization };
    var headersToAdd = null,
      queryItems = null;

    if (global.FormData && data instanceof global.FormData) {
      let id = data.get("id");
      if (id) url += "/" + id;

      data.delete("id");

      let headers = data.get("header");
      headers = headers && JSON.parse(headers);
      if (headers) {
        headersToAdd = headers;
        data.delete("header");
      }

      let query = data.get("query");
      query = query && JSON.parse(query);
      if (query) {
        queryItems = query;
        data.delete("query");
      }
    } else {
      if (data.id) url += "/" + data.id;
      delete data.id;

      if ("header" in data) {
        headersToAdd = clone(data.header);

        delete data.header;
      }

      if ("query" in data) {
        queryItems = clone(data.query);

        delete data.query;
      }
    }

    if (headersToAdd)
      for (const attr in headersToAdd) headers[attr] = headersToAdd[attr];

    if (queryItems) {
      let params = new URLSearchParams();
      for (const key in queryItems) {
        if (key in queryItems) {
          const element = queryItems[key];
          params.append(key, element);
        }
      }

      url += "?" + params.toString();
    }

    let response = await this.axios({
      headers,
      method,
      url,
      responseType: "json",
      data,
    });

    return typeof callback == "function" ? callback(response) : response;
  }
}

export function errorHandler(err) {
  var message;
  if (err.response && err.response.data) {
    if (err.response.data.error) console.info(err.response.data.error);
    console.info("Config", err.config);
    message = err.response.data.message;
  } else {
    console.info("Error", err);
    message = err.message;
  }
  return message;
}
