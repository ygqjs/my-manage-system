import { history } from 'umi';

import { getUserInfo } from '@/services/user';
import { isTokenValid } from '@/utils';
import requestCustom from '@/utils/request';

// 运行时配置
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
async function fetchUserInfo(params = {}) {
  const { data = {} } = await getUserInfo('get', params);
  return data;
}

const loginPath = '/login';
export async function getInitialState() {
  let userInfo = {};
  const curPathname = history.location.pathname;
  if (isTokenValid()) {
    // token 有效
    // 请求用户信息
    console.log('111');
    userInfo = await fetchUserInfo();
    [loginPath, '', '/'].includes(location.pathname) && history.push('/home');
  } else {
    // 没有token 或 token失效
    curPathname !== loginPath && history.push(loginPath);
  }
  return {
    ...userInfo,
    fetchUserInfo,
  };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
  };
};

export const request = requestCustom;
