import _filter from 'lodash/filter';
import _isArray from 'lodash/isArray';
import _isObject from 'lodash/isObject';
import _map from 'lodash/map';

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

/**
 * 过滤空数据
 * @param value
 */
export function filterEmptyValues(value) {
  if (_isArray(value)) {
    return _filter(
      _map(value, (item) => {
        if (_isObject(item) || _isArray(item)) {
          return filterEmptyValues(item);
        }
        return item;
      }),
      (item) => item !== undefined && item !== null && item !== '',
    );
  }
  if (_isObject(value)) {
    // 为了避免引用类型数据被修改，这里使用了深拷贝
    const result = {};
    Object.keys(value).forEach((key) => {
      if (
        value[key] !== undefined &&
        value[key] !== '' &&
        value[key] !== null
      ) {
        if (_isObject(value[key]) || _isArray(value[key])) {
          result[key] = filterEmptyValues(value[key]);
        } else {
          result[key] = value[key];
        }
      }
    });
    return result;
  }
  return value;
}
