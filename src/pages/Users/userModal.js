import { Modal } from 'antd';

import { useDeepCompareEffect, useSetState } from 'ahooks';

import { MyForm } from '@/components';
import { MODAL_DEFAULT_PROPS } from '@/constants';
const UserModal = ({
  isCreate = false,
  curVal = {},
  open = false,
  onCancel = () => {},
  onOk = async () => {},
}) => {
  const [form] = MyForm.useForm();
  const [state, setState] = useSetState({
    confirmLoading: false,
  });
  const { confirmLoading } = state;
  useDeepCompareEffect(() => {
    if (open) {
      form.resetFields();
      setState({ confirmLoading: false });
      if (!isCreate) {
        // 编辑
        form.setFieldsValue({
          ...curVal,
        });
      }
    }
  }, [open]);
  const onFinish = async (values) => {
    setState({ confirmLoading: true });
    onOk && (await onOk(values));
    setState({ confirmLoading: false });
  };
  const modalProps = {
    ...MODAL_DEFAULT_PROPS,
    open,
    title: isCreate ? '创建' : '修改',
    onCancel,
    onOk: form.submit,
    confirmLoading,
  };
  const myFormProps = {
    form,
    formProps: {
      onFinish,
    },
    formItem: [
      {
        name: 'username',
        label: '用户名',
        type: 'input',
        builtInRules: ['name', 'noSpacesAround'],
        rules: [{ required: true }],
      },
      {
        name: 'password',
        label: '密码',
        type: 'password',
        builtInRules: ['password'],
        rules: [{ required: true }],
      },
      {
        name: 'sex',
        label: '性别',
        type: 'select',
        rules: [{ required: true, message: '请选择性别' }],
        valueEnum: [
          { label: '男', value: 1 },
          { label: '女', value: 0 },
        ],
      },
      {
        name: 'address',
        label: '地址',
        type: 'textarea',
        rules: [{ required: true }],
      },
    ],
  };
  return (
    <Modal {...modalProps}>
      <MyForm {...myFormProps} />
    </Modal>
  );
};

export default UserModal;
