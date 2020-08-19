import isObject from "isobject";
import equal from "deep-equal";
import _clone from "clone";

export const clone = (obj) => _clone(obj);

export const isEmpty = (obj) =>
  obj === null ||
  obj === undefined ||
  (obj.constructor === Object && Object.keys(obj).length === 0);

export const clean = (obj) => {
  if (!isObject(obj)) return obj;

  for (const key in obj) if (obj[key] === "") delete obj[key];
  return obj;
};

/**
 *
 * @param {object} a original object
 * @param {object} b modified object
 * @returns {object} changed attributes in b
 */
export function changedFields(a, b) {
  if ((!a && !b) || !b) return null;

  if (!a) return Object.assign({}, b);

  return Object.keys(b)
    .filter((key) => !isEqual(a[key], b[key]))
    .reduce((obj, key) => {
      obj[key] = b[key];
      return obj;
    }, {});
}

export function extend(obj, src) {
  for (var key in src) obj[key] = src[key];
  return obj;
}

/**
 * Check if object 1 is equal to object 2
 * @param {Any} a Object 1
 * @param {Any} b Object 2
 */
export const isEqual = (a, b) => equal(a, b);

/**
 * Use this function to run a function in the object
 * @param {Object} object
 * @param {String} name
 * @param {...Any} parameters
 */
export function run(object, name, ...parameters) {
  if (!object || !name) return;

  let func = object[name];
  parameters = parameters || [];

  if (func && typeof func === "function") {
    func(...parameters);
  }
}

/**
 *
 * @param {Object} object
 * @param {String} key
 * @param {Any} value
 * @param {{ parent? : Boolean, first? : Boolean }} options
 * @return {?Any} the parent which have the the given key-value pair
 */
export function findNestedItem(
  object,
  key,
  value,
  { parent = false, first = true }
) {
  if (!object) return null;

  var result = null;

  if (object instanceof Array) {
    for (var i = 0; i < object.length; i++) {
      result = findNestedKey(object[i], key, value, { parent, first });

      if (result) {
        if (parent) return object[prop];
        if (first) return result;
      }
    }
  } else {
    for (var prop in object) {
      if (prop == key) {
        if (object[prop] == value) {
          return object;
        }
      }

      if (object[prop] instanceof Object || object[prop] instanceof Array)
        result = findNestedKey(object[prop], key, value, { parent, first });
      if (result) {
        if (parent) return object[prop];
        if (first) return result;
      }
    }
  }
  return result;
}

/**
 *
 * @param { Object } object
 * @param { String } key
 * @return { Object } the parent object who contins the $key
 */
export function findNestedKey(object, key) {
  var result = null;

  for (var prop in object) {
    if (prop == key) return object;

    if (object[prop] instanceof Object || object[prop] instanceof Array)
      result = findNestedKey(object[prop], key);
    if (result) break;
  }

  return result;
}
