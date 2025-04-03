import { Input } from 'antd';

export default (props) => {
  const { notFieldProps, ...componentProps } = props;
  const { autoComplete = 'new-password' } = notFieldProps || {};

  return <Input.Password {...componentProps} autoComplete={autoComplete} />;
};
