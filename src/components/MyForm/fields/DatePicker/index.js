import { DatePicker } from 'antd';

export default (props) => {
  const { notFieldProps, ...componentProps } = props;

  return <DatePicker style={{ width: '100%' }} {...componentProps} />;
};
