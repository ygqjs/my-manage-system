import { useRef } from 'react';

import { Select, Tag } from 'antd';

import { useSetState } from 'ahooks';
import _filter from 'lodash/filter';
import _find from 'lodash/find';
import _includes from 'lodash/includes';
import _isArray from 'lodash/isArray';
import _isEmpty from 'lodash/isEmpty';
import _last from 'lodash/last';

// 会从options里解析数据，如果存在mode= multiple 或没传 代表当前值是多选， mode=single是单选
export default (props) => {
  const { notFieldProps = {}, onChange, value, ...componentProps } = props;
  const { options } = notFieldProps;
  let singleOptions = _filter(options, (item) => item.mode === 'single');
  if (_isEmpty(singleOptions)) {
    singleOptions = [{ value: 'all' }];
  }
  const selectRef = useRef(null);
  const [state, setState] = useSetState({
    open: false,
  });
  const { open } = state;

  // 强制组件获取焦点
  const onFocus = () => {
    setState({ open: true });
  };
  // 强制组件失去焦点
  const onBlur = () => {
    setState({ open: false });
  };
  // 强制组件失去焦点，从而触发弹框关闭
  const handleBlur = () => {
    if (selectRef.current) {
      selectRef.current.blur(); // 调用 blur() 方法让 Select 失去焦点
      setState({ open: false });
    }
  };
  const onSelectChange = (value) => {
    let valueArr = _isArray(value) ? value : [value];
    if (_find(singleOptions, { value: _last(valueArr) })) {
      // 当最后一个值是 单选 时，只保留单选
      valueArr = [_last(valueArr)];
      handleBlur();
    } else if (
      _find(singleOptions, ({ value }) => _includes(valueArr, value))
    ) {
      // 当存在 单选 时(非最后一个选项)，删除 单选
      valueArr = _filter(
        valueArr,
        (item) => !_find(singleOptions, { value: item }),
      );
    }
    onChange(valueArr);
  };
  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return _find(singleOptions, { value }) ? (
      <span style={{ marginLeft: 4 }}>{label}</span>
    ) : (
      <Tag
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginInlineEnd: 4 }}
      >
        {label}
      </Tag>
    );
  };
  const findComponentProps = {
    options,
    autoClearSearchValue: false,
    mode: 'multiple',
    open,
    onFocus,
    onBlur,
    value,
    onChange: onSelectChange,
    ref: selectRef,
    tagRender,
    ...componentProps,
  };
  return <Select {...findComponentProps} />;
};
