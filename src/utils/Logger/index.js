import { isProduction } from "..";

/* eslint-disable */
class Logger {
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
      console.debug(`${this.tag}:`, ...[message, ...optionalParams]);
  }
  /**
   *
   * @param {any} message
   * @param  {...any} optionalParams
   */
  i(message, ...optionalParams) {
    if (this.force || !isProduction())
      console.info(`${this.tag}:`, ...[message, ...optionalParams]);
  }
  /**
   *
   * @param {any} message
   * @param  {...any} optionalParams
   */
  e(message, ...optionalParams) {
    console.error(`${this.tag}:`, ...[message, ...optionalParams]);
  }

  /**
   *
   * @param {any} message
   * @param  {...any} optionalParams
   */
  l(message, ...optionalParams) {
    console.log(`${this.tag}:`, ...[message, ...optionalParams]);
  }

  /**
   *
   * @param {any} message
   * @param  {...any} optionalParams
   */
  w(message, ...optionalParams) {
    if (this.force || !isProduction())
      console.log(`${this.tag}:`, ...[message, ...optionalParams]);
  }

  /**
   * call always to skip debug check
   */
  always() {
    this.force = true;
    return this;
  }
}

export default Logger;
