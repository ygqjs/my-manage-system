import { getRegExp } from '@/utils';

// 两边不能有空格校验
export function validateNoSpacesAround(param, _, value) {
  if (value && (value.startsWith(' ') || value.endsWith(' '))) {
    return Promise.reject(new Error('输入值的两端不能有空格'));
  }
  return Promise.resolve();
}
// 密码校验
export function validatePassword(param, _, value) {
  const regExp = getRegExp('password');
  if (value && !regExp.test(value)) {
    return Promise.reject(
      new Error(
        '请输入8-128位密码（至少包括一位字母、数字和特殊字符!、@、$、_、-、.）',
      ),
    );
  }
  return Promise.resolve();
}
// 英文名称校验
export function validateName(param, _, value) {
  const regExp = getRegExp('name');
  if (value && !regExp.test(value)) {
    return Promise.reject(
      new Error('请输入2-16位字符（字母、数字、!、@、$、_、-、.）'),
    );
  }
  return Promise.resolve();
}

// 可包含中文名称校验
export function validateNameZh(param, _, value) {
  const regExp = getRegExp('nameZh');
  if (value && !regExp.test(value)) {
    return Promise.reject(
      new Error('请输入2-16位字符（中文、字母、数字、!、@、$、_、-、.）'),
    );
  }
  return Promise.resolve();
}
// IP:PORT校验
export function validateIPAndPort(param, _, value) {
  const regExp = getRegExp('ipAndPort');
  if (value && !regExp.test(value)) {
    return Promise.reject(new Error('ip:port格式有误'));
  }
  return Promise.resolve();
}

// 邮箱验证
export function validateEmail(param, _, value) {
  const regExp = getRegExp('email');
  if (value && !regExp.test(value)) {
    return Promise.reject(new Error('请输入正确的邮箱地址'));
  }
  return Promise.resolve();
}

// 端口范围校验
export function validatePortRange(param, _, value) {
  const { required } = param,
    [min, max] = value;
  if (required) {
    if (!min || !max) {
      return Promise.reject(new Error('最大或最小端口号不能为空'));
    }
    if (min > max) {
      return Promise.reject(new Error('最小端口必须小于或等于最大端口'));
    }
    if (max - min < 2) {
      return Promise.reject(new Error('端口范围间隔必须大于或等于3'));
    }
  } else {
    if ((min && !max) || (!min && max)) {
      return Promise.reject(new Error('最大或最小端口号不能为空'));
    }
    if (min && max) {
      if (min > max) {
        return Promise.reject(new Error('最小端口必须小于或等于最大端口'));
      }
      if (max - min < 2) {
        return Promise.reject(new Error('端口范围间隔必须大于或等于3'));
      }
    }
  }

  return Promise.resolve();
}

// IP验证
export function validateIP(param, _, value) {
  const regExp = getRegExp('ip');
  if (value && !regExp.test(value)) {
    return Promise.reject(new Error('请输入正确的IP地址'));
  }
  return Promise.resolve();
}
