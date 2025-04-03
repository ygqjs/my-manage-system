import { useRef } from 'react';

import { Button } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';

import { useSetState } from 'ahooks';

import { getUserList } from '@/services/user';

import UserModal from './userModal';

const Users = () => {
  const actionRef = useRef();
  const [state, setState] = useSetState({
    userModalOpen: false,
    isCreate: false,
  });
  const { userModalOpen } = state;
  const request = async (params) => {
    const res = await getUserList({ ...params });
    const { data, total } = res.data;
    return {
      data: data || [],
      success: res.success,
      total: total,
    };
  };
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      valueType: 'select',
      valueEnum: {
        1: { text: '男' },
        0: { text: '女' },
      },
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '操作',
      valueType: 'option',
      render: () => {
        return [
          <a
            key="edit"
            onClick={() => setState({ userModalOpen: true, isCreate: false })}
          >
            编辑
          </a>,
          <a key="delete" type="primary" danger>
            删除
          </a>,
        ];
      },
    },
  ];
  const toolBarRender = () => {
    const createBtnProps = {
      key: 'create',
      type: 'primary',
      icon: <PlusOutlined />,
      onClick: () => {
        setState({ userModalOpen: true, isCreate: true });
      },
    };
    return [<Button {...createBtnProps}>Create</Button>];
  };
  const proTableProps = {
    rowKey: 'id',
    actionRef,
    request,
    columns,
    options: false,
    cardBordered: true,
    toolBarRender,
  };
  const userModalProps = {
    open: userModalOpen,
    onCancel: () => {
      setState({ userModalOpen: false });
    },
    onOk: () => {
      setState({ userModalOpen: false });
    },
  };
  return (
    <PageContainer>
      <ProTable {...proTableProps} />
      <UserModal {...userModalProps} />
    </PageContainer>
  );
};

export default Users;
