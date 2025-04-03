import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;
export default (props) => {
  const { notFieldProps, ...componentProps } = props;

  return <RangePicker style={{ width: '100%' }} {...componentProps} />;
};
