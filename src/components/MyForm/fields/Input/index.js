import { isValidElement } from 'react';

import { Button, Input, InputNumber } from 'antd';

import _isPlainObject from 'lodash/isPlainObject';
import _isString from 'lodash/isString';

import formItemRender from '../../formItemRender';

// 当 前缀/后缀 的值是数组时，渲染为下拉选择框
// addon 前缀/后缀属性，addonSelectProps 给前缀/后缀渲染为下拉框的配置属性
// addonBefore 和 addonAfter 的是值如果是string或者node节点则直接渲染,如果是object，则渲染为与表单平级的下拉选择框，
const addonSelectRender = (inputProps, addon) => {
  if (isValidElement(addon) || _isString(addon)) {
    return addon;
  }
  if (_isPlainObject(addon)) {
    const formItem = {
      disabled: inputProps?.disabled,
      formItemProps: {
        noStyle: true,
      },
      ...addon,
    };
    return formItemRender({ formItem: [formItem] });
  }
  return null;
};

export default (props) => {
  const { notFieldProps, ...componentProps } = props;
  const {
    isNumber = false,
    addonBefore,
    addonAfter,
    buttonProps, // 按钮属性
    ...inputProps
  } = componentProps;

  // 使用封装的方法来处理 addonBefore 和 addonAfter
  inputProps.addonBefore = addonSelectRender(inputProps, addonBefore);
  inputProps.addonAfter = addonSelectRender(inputProps, addonAfter);

  // 如果 isNumber 是true，则渲染为 InputNumber数字输入框
  const FinalInput = isNumber ? InputNumber : Input;
  // 配置input输入框默认样式，保持input宽度沾满空间
  const mergedInputProps = {
    ...inputProps,
    style: {
      // 如果传入的样式中有宽度，则不设置flex
      flex: inputProps.style?.width !== undefined ? 'unset' : 1,
      ...inputProps.style,
    },
  };
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <FinalInput {...mergedInputProps} />
      {_isPlainObject(buttonProps) ? (
        <Button
          {...buttonProps}
          onClick={() => buttonProps.onClick(inputProps.value)}
        >
          {buttonProps.text || ''}
        </Button>
      ) : null}
    </div>
  );
};
