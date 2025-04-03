import { Input } from 'antd';

export default (props) => {
  const { TextArea } = Input;
  const { notFieldProps, ...componentProps } = props;
  return <TextArea {...componentProps} />;
};
