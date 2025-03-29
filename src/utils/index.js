export function setToken(value, name = 'token') {
  localStorage.setItem(name, value);
}
export function getToken(name = 'token') {
  return localStorage.getItem(name);
}
export function removeToken(name = 'token') {
  localStorage.removeItem(name);
}
