export default [
  {
    path: '/',
    redirect: '/login',
  },
  {
    name: 'login',
    path: '/login',
    component: './Login',
    layout: false,
  },
  {
    path: '/home',
    name: 'home',
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
    path: '/users',
    name: 'users',
    icon: 'smile',
    component: './Users',
  },
  {
    path: '/large-file-upload',
    name: 'largeFileUpload',
    component: './LargeFileUpload',
  },
  {
    path: '*',
    component: './404', // 指向一个404页面组件
  },
];
