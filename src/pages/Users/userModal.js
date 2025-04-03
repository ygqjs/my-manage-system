import { Form, Modal } from 'antd';

import { useSetState } from 'ahooks';

import { MODAL_DEFAULT_PROPS } from '@/constants';
const UserModal = ({
  isCreate = false,
  open = false,
  onCancel = () => {},
  onOk = async () => {},
}) => {
  const [form] = Form.useForm();
  const [state, setState] = useSetState({
    confirmLoading: false,
  });
  const { confirmLoading } = state;
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
  const formProps = {
    form,
    onFinish,
  };
  return (
    <Modal {...modalProps}>
      <Form {...formProps}>
        <Form.Item label="用户名" name="username">
          <input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
