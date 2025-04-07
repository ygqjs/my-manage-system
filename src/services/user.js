import { request } from '@umijs/max';

// 登录
export async function login(params = {}) {
  return request('/user/login', {
    method: 'post',
    data: params,
  });
}

// 登出
export async function logout() {
  return request('/user/logout', {
    method: 'get',
    params: {},
  });
}

// 获取用户信息
export async function getUserInfo() {
  return request('/user/user-info', {
    method: 'get',
    params: {},
  });
}

// 新增用户
export async function addUser(data = {}) {
  return request('/users', {
    method: 'post',
    data,
  });
}

// 删除用户
export async function deleteUser(data = {}) {
  return request('/users', {
    method: 'delete',
    data,
  });
}

// 修改用户
export async function updateUser(data = {}) {
  return request('/users', {
    method: 'put',
    data,
  });
}

// 查询用户列表
export async function getUserList(params = {}) {
  return request('/users', {
    method: 'get',
    params,
  });
}
