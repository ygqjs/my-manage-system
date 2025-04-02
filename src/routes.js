export default [
  {
    path: '/',
    redirect: '/login',
  },
  {
    name: '登陆',
    path: '/login',
    component: './Login',
    layout: false,
  },
  {
    path: '/home',
    name: '首页',
    icon: 'smile',
    component: './Home',
  },
  {
    path: '/full-screen',
    name: '大屏',
    icon: 'smile',
    component: './FullScreen',
    layout: false,
  },
  {
    path: '*',
    component: './404', // 指向一个404页面组件
  },
];
