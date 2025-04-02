import { PageContainer } from '@ant-design/pro-components';
const Home = () => {
  const pageContainerProps = {
    content: '欢迎!!! 这里是首页',
  };
  return <PageContainer {...pageContainerProps}></PageContainer>;
};

export default Home;
