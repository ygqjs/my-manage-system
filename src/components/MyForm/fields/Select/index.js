import { Select } from 'antd';

export default (props) => {
  const { notFieldProps = {}, ...componentProps } = props,
    { options } = notFieldProps,
    findComponentProps = {
      options,
      autoClearSearchValue: false,
      popupMatchSelectWidth: false,
      ...componentProps,
    };
  return <Select {...findComponentProps} />;
};
