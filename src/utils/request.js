import { notification } from 'antd';

import { getToken } from '@/utils';
const codeMessage = {
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  410: '请求的资源被永久删除，且不会再得到的。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

export default () => {
  return {
    timeout: 60 * 1000, // 缩短到 5 秒，便于测试超时
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    prefix: process.env.NODE_ENV === 'development' ? '/api' : '/',
    errorConfig: {
      // errorHandler 处理 非接口返回的 非200状态码 处理
      errorHandler(error, opts) {
        console.log('opts', opts);
        console.log('error', error);
        const { message, config, response } = error;
        notification.error({
          message: '此处为非后端返回错误:' + config.url + message,
          description: codeMessage[response.status],
        });
      },
      errorThrower(error) {
        const { response } = error;
        if (response && response.status) {
          const errorText = codeMessage[response.status] || response.statusText;
          const { status, url } = response;

          notification.error({
            message: `请求错误 ${status}: ${url}`,
            description: errorText,
          });
        }
      },
    },
    requestInterceptors: [
      (config) => {
        const token = getToken();
        const headers = { ...config.headers, token };
        const url = config.prefix.concat(config.url);
        return { ...config, url, headers };
      },
    ],
    responseInterceptors: [
      (response) => {
        return response;
      },
    ],
  };
};
