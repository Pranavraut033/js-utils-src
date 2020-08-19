import stc from "string-to-color";

let colorMap = {};
/**
 *
 * @param {String} string
 */
export default function (string) {
  return colorMap[string] || (colorMap[string] = stc(string));
}
