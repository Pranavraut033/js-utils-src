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
