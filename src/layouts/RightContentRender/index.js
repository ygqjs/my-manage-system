import { Avatar, Dropdown } from 'antd';

import { KeyOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';

import { useModel } from '@umijs/max';

import styles from './index.less';

const RightContentRender = () => {
  const { initialState } = useModel('@@initialState');
  const { username } = initialState || {};

  const dropdownProps = {
    placement: 'bottom',
    menu: {
      onClick: () => {},
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
