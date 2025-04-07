import { notification } from 'antd';

import { getToken } from '@/utils';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

export default () => {
  return {
    timeout: 60 * 1000, // 请求超时时间
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    prefix: process.env.NODE_ENV === 'development' ? '/api' : '/',
    // errorConfig: {
    //   errorHandler,
    // }, // 添加统一的错误处理
    requestInterceptors: [
      (config) => {
        const token = getToken();
        const headers = { ...config.headers, token };
        const url = config.prefix.concat(config.url);
        return { ...config, url, headers };
      },
    ],
    responseInterceptors: [
      [
        async (response) => {
          // NOTE:如果是文件流，不进行任何处理截止返回数据
          if (response?.data instanceof Blob) {
            return response;
          } else {
            // 格式化response的数据结构
            return response;
          }
        },
        (error) => {
          const { response } = error || {};
          if (response?.config?.ignoreError) {
            // 忽略错误信息弹出 || 取消请求错误时不进行处理
          } else if (response && response?.status) {
            const errorText =
              response?.data?.message ||
              response?.statusText ||
              codeMessage[response?.status];
            notification.error({
              message: `${response?.request?.responseURL ?? ''}`,
              description: errorText,
            });
          } else {
            // 发送请求时出了点问题
            notification.error({
              description: error?.message || '您的网络发生异常，无法连接服务器',
              message: '网络异常',
            });
          }
          // 格式化response的数据结构
          return response;
        },
      ],
    ],
  };
};
