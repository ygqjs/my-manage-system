import _isFunction from 'lodash/isFunction';

export default (props) => {
  const { notFieldProps } = props,
    { render } = notFieldProps;
  return _isFunction(render) && render(props);
};
