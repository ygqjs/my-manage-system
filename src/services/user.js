import { request } from '@umijs/max';

// 登录
export async function login(params = {}) {
  return request('/user/login', {
    method: 'post',
    data: params,
  });
}

// 获取用户信息
export async function getUserInfo() {
  return request('/user/user-info', {
    method: 'get',
    params: {},
  });
}
