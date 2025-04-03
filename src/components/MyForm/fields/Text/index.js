export default (props) => {
  const { notFieldProps, onChange, value, ...componentProps } = props;
  return <span {...componentProps}>{value}</span>;
};
