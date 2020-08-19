// eslint-disable-next-line
export const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/gm;
// eslint-disable-next-line
export const emailRegex_v2 = /^(([^<>()\[\]\\.,;:\s@"]{2,}(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".{3,}"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// eslint-disable-next-line
export const URL_REGEX = /((https?:\/\/(?:www\.|(?!www)))?[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|(https?:\/\/(?:www\.|(?!www)))?[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gim;

export const FIELD_EMAIL = [
  ...getReqiredField("E-mail"),
  (v) => emailRegex_v2.test(v) || "E-mail must be valid",
];

export function getReqiredField(attr = "Field") {
  return [(v) => !!v || `${attr} is required`];
}

export function stringToRegex(input) {
  // eslint-disable-next-line
  input = input && input.trim().replace(/[\[\]\\\^\$\.\|\?\*\+\(\)]/g, "");

  return input && new RegExp(input, "ig");
}
