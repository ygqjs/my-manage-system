import { Avatar, Dropdown, message, notification } from 'antd';

import { KeyOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';

import { useModel } from '@umijs/max';

import { logout } from '@/services/user';
import { removeToken } from '@/utils';

import styles from './index.less';

const RightContentRender = () => {
  const { initialState, refresh } = useModel('@@initialState');
  const { username } = initialState || {};

  // 退出登录
  const handleLogout = async () => {
    const res = await logout();
    if (res.success) {
      removeToken();
      await refresh();
      message.success('登出成功');
    } else {
      notification.error({
        message: '登出失败',
        description: res?.message,
      });
    }
  };

  const onMenuClick = (event) => {
    const { key } = event;
    if (key === 'changePass') {
    } else if (key === 'logout') {
      console.log('logout');
      handleLogout();
    }
  };

  const dropdownProps = {
    placement: 'bottom',
    menu: {
      onClick: onMenuClick,
      items: [
        {
          key: 'changePass',
          icon: <KeyOutlined />,
          label: '修改密码',
        },
        {
          key: 'logout',
          icon: <LogoutOutlined />,
          label: '退出登录',
        },
      ],
    },
  };
  const avatarProps = {
    size: 'small',
    style: { backgroundColor: '#FFBC58' },
    icon: <UserOutlined />,
    alt: 'avatar',
  };
  return (
    <div className={styles.container}>
      <Dropdown {...dropdownProps}>
        <span className={styles.user}>
          <Avatar {...avatarProps} />
          <span>{username}</span>
        </span>
      </Dropdown>
    </div>
  );
};

export default RightContentRender;
