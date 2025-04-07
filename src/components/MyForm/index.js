import { Fragment } from 'react';

import { Button, Form, Row } from 'antd';

import _assign from 'lodash/assign';
import _isArray from 'lodash/isArray';
import _map from 'lodash/map';
import _sortBy from 'lodash/sortBy';
import _toPairs from 'lodash/toPairs';

import formItemRender from './formItemRender';
import './index.less';

const FormItem = Form.Item;
const MyForm = ({
  columns = 1,
  gutter = [48, 0],
  form = null,
  formProps = {},
  formItem = [],
  isEnterSubmit = true,
}) => {
  const [defaultForm] = Form.useForm();
  const finalForm = form || defaultForm;

  // 合并表单属性
  const mergedFormProps = {
    form: finalForm,
    layout: 'horizontal',
    ...formProps,
    className: `myForm ${formProps.className || ''}`,
  };
  const formAreaRender = () => {
    // formItem 支持对象或者数组传入
    // 如果是数组，说明没有分区域，需要转化为对象
    // 如果是对象，说明有区域划分设置
    const formItemObj = _isArray(formItem)
      ? { default: { formItem } }
      : formItem;
    // toPairs对对象进行[[key1, value1], [key2, value2]] 转化；sortBy对数组进行key为order排序
    const sortedFormItem = _sortBy(_toPairs(formItemObj), ['order']);
    return _map(sortedFormItem, ([areaKey, areaValue]) => {
      const {
        gutter: formItemGutter = gutter,
        style,
        formItem,
        columns: formItemColumns = columns,
        hidden,
      } = areaValue;
      return (
        <Fragment key={areaKey}>
          <Row
            gutter={formItemGutter}
            style={{ display: hidden ? 'none' : 'flex', ...style }}
          >
            {formItemRender({
              formItem,
              formProps: mergedFormProps,
              columns: formItemColumns || columns,
            })}
          </Row>
        </Fragment>
      );
    });
  };
  return (
    <Form {...mergedFormProps}>
      {formAreaRender()}
      {/* 当 isEnterSubmit为true时，渲染一个被隐藏的提交按钮来触发表单提交 */}
      {isEnterSubmit ? (
        <FormItem style={{ display: 'none' }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormItem>
      ) : null}
    </Form>
  );
};
// 动态挂载 Form 的所有静态方法和属性到 XForm
_assign(MyForm, Form);
export default MyForm;
