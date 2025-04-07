import { useRef } from 'react';

import { Button, message, notification } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';

import { useSetState } from 'ahooks';

import { addUser, getUserList, updateUser } from '@/services/user';

import UserModal from './userModal';

const Users = () => {
  const actionRef = useRef();
  const [state, setState] = useSetState({
    userModalOpen: false,
    isCreate: false,
    curVal: {},
  });
  const { userModalOpen, isCreate, curVal } = state;
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
      render: (_, record) => {
        return [
          <a
            key="edit"
            onClick={() =>
              setState({ userModalOpen: true, isCreate: false, curVal: record })
            }
          >
            编辑
          </a>,
          <a key="delete" type="primary">
            删除
          </a>,
        ];
      },
    },
  ];
  const toolBarRender = () => {
    const createBtnProps = {
      type: 'primary',
      icon: <PlusOutlined />,
      onClick: () => {
        setState({ userModalOpen: true, isCreate: true });
      },
    };
    return [
      <Button key="create" {...createBtnProps}>
        Create
      </Button>,
    ];
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
    isCreate,
    curVal,
    open: userModalOpen,
    onCancel: () => {
      setState({ userModalOpen: false });
    },
    onOk: async (params) => {
      const res = isCreate ? await addUser(params) : await updateUser(params);
      console.log('res', res);
      if (res.success) {
        message.success(isCreate ? '新增成功' : '修改成功');
        setState({ userModalOpen: false });
        actionRef.current.reload();
      } else {
        notification.error({
          message: isCreate ? '新增失败' : '修改失败',
          description: res.message,
        });
      }
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
