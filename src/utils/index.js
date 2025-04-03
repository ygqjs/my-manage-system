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

/**
 * 获取校验正则
 * @param {string} regExpName 正则名称
 */
export function getRegExp(regExpName) {
  const regExpList = {
    password:
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@$.\\_\\-])[a-zA-Z\d!@$.\\_\\-]{8,128}$/,
    name: /^[a-zA-Z0-9!@$._-]{2,16}$/,
    nameZh: /^[a-zA-Z0-9\u4e00-\u9fa5!@$._-]{2,16}$/,
    ip: /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/,
    ipAndPort:
      /^(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])):(([1-9](\d{0,4}))$|^([1-5]\d{4})$|^(6[0-4]\d{3})$|^(65[0-4]\d{2})$|^(655[0-2]\d)$|^(6553[0-5]))$/,
    email:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  };
  return regExpList[regExpName];
}

// 计算文本宽度 用dom方法计算
export function calculateTextWidth(
  text,
  styles = {
    fontSize: '14px',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
  },
) {
  const span = document.createElement('span');
  span.style.visibility = 'hidden';
  span.style.position = 'absolute';
  for (const [key, value] of Object.entries(styles)) {
    span.style[key] = value;
  }
  span.innerText = text;
  document.body.appendChild(span);
  const width = span.offsetWidth;
  document.body.removeChild(span);
  return width;
}
