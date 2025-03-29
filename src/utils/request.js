export default () => {
  return {
    timeout: 1000 * 60,
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    prefix: process.env.NODE_ENV === 'development' ? '/api' : '/',
    requestInterceptors: [
      (config) => {
        const url = config.prefix.concat(config.url);
        return { ...config, url };
      },
    ],
  };
};
