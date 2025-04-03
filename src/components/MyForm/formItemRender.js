import { Fragment } from 'react';

import { Col, Form } from 'antd';

import _isNumber from 'lodash/isNumber';

import * as FormItem from './fields';
import { getBuiltInRules, getLabelWidth } from './validate';
const formItemRender = ({ formItem = [], formProps, columns }) => {
  // 过滤不需要渲染的表单项
  const finalFormItem = formItem.filter((item) => item.isRender !== false);
  // 计算出所有label的最大宽度
  const labelMaxWidth = getLabelWidth(finalFormItem);

  return finalFormItem.map((item) => {
    const {
      name,
      label,
      type,
      isOneRow,
      colSpan,
      rules = [],
      required,
      whitespace,
      fieldProps = {},
      placeholder,
      extra,
      dependencies,
      valueEnum,
      disabled,
      autoComplete,
      render,
      hidden = false, // 是否隐藏字段（依然会收集和校验字段）
      validateFirst, // 当某一规则校验不通过时，是否停止剩下的规则的校验。设置 parallel 时会并行校验
      htmlFor = null, // 设置 label 标签的 label htmlFor 属性
      tooltip = null,
      title,
      formItemProps,
    } = item;

    // 表单项的栅格占位格数,如果isOneRow是true，则占满一行，否则就用colSpan的值，colSpan值不存的时候默认使用24/columns（列数）的值
    const span = isOneRow
      ? 24
      : colSpan || 24 / (_isNumber(columns) ? columns : 1);
    // 设置校验
    const buildInRules = getBuiltInRules(item);
    // 合并rules项
    const mergeRules = [
      ...(required ? [{ required: true }] : []),
      ...(whitespace ? [{ whitespace: true }] : []),
      ...buildInRules,
      ...rules,
    ];
    // 渲染默认extra前缀的元素
    const finalExtra = extra ? <span>{extra}</span> : null;
    // 获取表单项组件
    const Component = FormItem[type] || 'NotFound Component';
    // 定义表单项的className 并添加extra的class，如果直接将className添加到extra中，myForm-item中原有的margin无法一起更改
    const formItemClassName = `myForm-item ${extra ? 'myForm-extra-item' : ''}`;
    const labelCol =
      formProps?.layout === 'horizontal'
        ? { flex: `${labelMaxWidth}px` }
        : null;
    // FormItem上的属性
    const finalFormItemProps = {
      name,
      rules: mergeRules,
      label,
      extra: finalExtra,
      hidden,
      validateFirst,
      tooltip,
      htmlFor,
      className: formItemClassName,
      labelCol,
      ...formItemProps,
    };
    // 具体表单项上的属性
    const finalFieldProps = {
      placeholder,
      dependencies,
      disabled,
      notFieldProps: { options: valueEnum, autoComplete, render }, // 需要传递到组件的其他属性，但是不需要传递给表单项
      ...fieldProps,
    };

    // 如果是标题,渲染传入的标题元素
    if (type === 'title') {
      return <Fragment key={name}>{title}</Fragment>;
    }
    return (
      <Col span={span} key={name}>
        <Form.Item {...finalFormItemProps}>
          <Component {...finalFieldProps} />
        </Form.Item>
      </Col>
    );
  });
};

export default formItemRender;
