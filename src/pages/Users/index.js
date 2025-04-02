import { PageContainer, ProTable } from '@ant-design/pro-components';

import { getUserList } from '@/services/user';
const Users = () => {
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
  ];
  const proTableProps = {
    request,
    columns,
  };
  return (
    <PageContainer>
      <ProTable {...proTableProps} />
    </PageContainer>
  );
};

export default Users;
