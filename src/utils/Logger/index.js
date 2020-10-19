import { isProduction } from "..";

/* eslint-disable */
export default class Logger {
  constructor(tag = "Logger", force = false) {
    this.tag = tag;
    this.force = force;
  }

  /**
   *
   * @param {any} message
   * @param  {...any} optionalParams
   */
  d(message, ...optionalParams) {
    if (this.force || !isProduction())
      console.debug(`${tag}:`, ...[message, ...optionalParams]);
  }

  /**
   *
   * @param {any} message
   * @param  {...any} optionalParams
   */
  e(message, ...optionalParams) {
    console.error(`${tag}:`, ...[message, ...optionalParams]);
  }

  /**
   *
   * @param {any} message
   * @param  {...any} optionalParams
   */
  l(message, ...optionalParams) {
    console.log(`${tag}:`, ...[message, ...optionalParams]);
  }

  /**
   *
   * @param {any} message
   * @param  {...any} optionalParams
   */
  w(message, ...optionalParams) {
    if (this.force || !isProduction())
      console.log(`${tag}:`, ...[message, ...optionalParams]);
  }

  /**
   * call always to skip debug check
   */
  always() {
    this.force = true;
    return this;
  }
}
