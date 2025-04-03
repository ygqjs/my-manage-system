import { Switch } from 'antd';

export default (props) => {
  const { notFieldProps, ...componentProps } = props;

  return <Switch {...componentProps} />;
};
