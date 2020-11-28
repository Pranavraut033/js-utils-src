/**
 * function to set a cookie with name '_cname_' and '__cvalue__' as it's
 * content
 * @see https://www.w3schools.com/js/js_cookies.asp
 *
 * @param {String} cname Name of cookie
 * @param {*} cvalue Value to store
 * @param {Number} exdays Validity in days
 */
export function setCookie(cname, cvalue, exdays = 20) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

/**
 * Function to get a cookie with name '_cname_'
 *
 * @param {String} cname Name of cookie
 *
 * @see https: //www.w3schools.com/js/js_cookies.asp
 */
export function getCookie(cname) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

/**
 * Funciton to delete a set cookie
 *
 * @param {String} name name of the cooke to delete [expire];
 */
export function deleteCookie(name) {
  setCookie(name, "", -1);
}
