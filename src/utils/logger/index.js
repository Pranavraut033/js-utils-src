import { isDebug } from "../../utils";

/* eslint-disable */
export default function(tag = "Logger") {
  return {
    /**
     *
     * @param {any} message
     * @param  {...any} optionalParams
     */
    d(message, ...optionalParams) {
      if (this.force || isDebug())
        console.debug(`${tag}:`, ...[message, ...optionalParams]);
    },
    /**
     *
     * @param {any} message
     * @param  {...any} optionalParams
     */
    e(message, ...optionalParams) {
      console.error(`${tag}:`, ...[message, ...optionalParams]);
    },
    /**
     *
     * @param {any} message
     * @param  {...any} optionalParams
     */
    l(message, ...optionalParams) {
      console.log(`${tag}:`, ...[message, ...optionalParams]);
    },
    /**
     *
     * @param {any} message
     * @param  {...any} optionalParams
     */
    w(message, ...optionalParams) {
      if (this.force || isDebug())
        console.log(`${tag}:`, ...[message, ...optionalParams]);
    },
    /**
     * call always to skip debug check
     */
    always() {
      this.force = true;
      return this;
    },
  };
}
