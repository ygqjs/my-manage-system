import { Radio } from 'antd';

export default (props) => {
  const { notFieldProps, ...componentProps } = props,
    { options } = notFieldProps,
    findComponentProps = {
      options,
      ...componentProps,
    };
  return <Radio.Group {...findComponentProps} />;
};
