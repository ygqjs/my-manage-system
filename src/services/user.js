import { request } from '@umijs/max';

// 获取资产统计信息
export async function login(params = {}) {
  return request('/user/login', {
    method: 'post',
    data: params,
  });
}
