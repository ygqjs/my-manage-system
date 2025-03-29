import { useState } from 'react';

import { Divider, Space, Tabs, message, theme } from 'antd';

import {
  AlipayOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoOutlined,
  UserOutlined,
  WeiboOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';

import { antdImg } from '@/assets/icon';

import styles from './index.less';

const iconStyles = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

const Page = () => {
  const [loginType, setLoginType] = useState('account');
  const { token } = theme.useToken();
  const loginFormaActionRender = () => {
    const dividerFontSty = {
      color: token.colorTextPlaceholder,
      fontWeight: 'normal',
      fontSize: 14,
    };
    const iconContainerProps = {
      className: styles.iconSty,
      style: {
        border: `1px solid ${token.colorPrimaryBorder}`,
      },
    };
    return (
      <div className={styles.actionContainer}>
        <Divider plain>
          <span style={dividerFontSty}>其他登录方式</span>
        </Divider>
        <Space align="center" size={24}>
          <div {...iconContainerProps}>
            <AlipayOutlined style={{ ...iconStyles, color: '#1677FF' }} />
          </div>
          <div {...iconContainerProps}>
            <TaobaoOutlined style={{ ...iconStyles, color: '#FF6A10' }} />
          </div>
          <div {...iconContainerProps}>
            <WeiboOutlined style={{ ...iconStyles, color: '#FF6A10' }} />
          </div>
        </Space>
      </div>
    );
  };
  const accountFormItemRender = () => {
    return (
      <>
        <ProFormText
          name="username"
          placeholder={'用户名: admin'}
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined style={{ color: token.colorText }} />,
          }}
          rules={[{ required: true, message: '请输入用户名!' }]}
        />
        <ProFormText.Password
          name="password"
          placeholder={'密码: admin'}
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined style={{ color: token.colorText }} />,
          }}
          rules={[{ required: true, message: '请输入密码！' }]}
        />
      </>
    );
  };
  const phoneFormItemRender = () => {
    return (
      <>
        <ProFormText
          name="mobile"
          placeholder={'手机号'}
          fieldProps={{
            size: 'large',
            prefix: <MobileOutlined style={{ color: token.colorText }} />,
          }}
          rules={[
            { required: true, message: '请输入手机号！' },
            { pattern: /^1\d{10}$/, message: '手机号格式错误！' },
          ]}
        />
        <ProFormCaptcha
          name="captcha"
          placeholder={'请输入验证码'}
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined style={{ color: token.colorText }} />,
          }}
          captchaProps={{ size: 'large' }}
          rules={[{ required: true, message: '请输入验证码！' }]}
          captchaTextRender={(timing, count) => {
            if (timing) {
              return `${count} ${'获取验证码'}`;
            }
            return '获取验证码';
          }}
          onGetCaptcha={async () => {
            message.success('获取验证码成功！验证码为：1234');
          }}
        />
      </>
    );
  };
  const tabsProps = {
    centered: true,
    activeKey: loginType,
    onChange: (activeKey) => setLoginType(activeKey),
  };
  return (
    <div className={styles.container}>
      <LoginFormPage
        logo={antdImg}
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        title="my manage system"
        containerStyle={{
          backgroundColor: 'rgba(0, 0, 0,0.65)',
          backdropFilter: 'blur(1px)',
        }}
        subTitle="基于umi+antd的管理项目"
        actions={loginFormaActionRender()}
      >
        <Tabs {...tabsProps}>
          <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
          <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
        </Tabs>
        {loginType === 'account' && accountFormItemRender()}
        {loginType === 'phone' && phoneFormItemRender()}
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div>
      </LoginFormPage>
    </div>
  );
};

export default () => {
  return (
    <ProConfigProvider dark>
      <Page />
    </ProConfigProvider>
  );
};
