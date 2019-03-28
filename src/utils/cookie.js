export function getCookie(name) {
  const v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  return v ? v[2] : null;
}

export function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
  document.cookie = `${name}=${value};path=/;expires=${d.toGMTString()}`;
}

export function deleteCookie(name) {
  setCookie(name, '', -1);
}
