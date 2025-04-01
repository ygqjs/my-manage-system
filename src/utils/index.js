export function setToken(value, name = 'token') {
  localStorage.setItem(name, value);
}
export function getToken(name = 'token') {
  return localStorage.getItem(name);
}
export function removeToken(name = 'token') {
  localStorage.removeItem(name);
}

/**
 * 检查存储在 Local Storage 中的 JWT Token 是否过期
 * @param {string} name - 存储在 Local Storage 中的 Token 的键名
 * @returns {boolean} - 如果 Token 有效，则返回 true；否则返回 false
 */
export function isTokenValid(name = 'token') {
  const token = localStorage.getItem(name);
  if (token) {
    // 解析 JWT Token
    const payload = JSON.parse(atob(token.split('.')[1]));
    // 获取当前时间
    const currentTime = Math.floor(Date.now() / 1000);
    // 检查 Token 是否过期
    if (payload.exp < currentTime) {
      // 可以选择删除过期的 Token
      localStorage.removeItem(name);
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}
