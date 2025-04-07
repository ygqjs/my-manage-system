import { InputNumber } from 'antd';

import './index.less';

export default ({ value = [], onChange }) => {
  const [min, max] = value;
  // const { notFieldProps, ...componentProps } = props;
  const triggerChange = (changedValue) => {
    if (onChange) {
      onChange([
        changedValue.min !== undefined ? changedValue.min : min,
        changedValue.max !== undefined ? changedValue.max : max,
      ]);
    }
  };

  const onMinChange = (val) => {
    triggerChange({ min: val });
  };

  const onMaxChange = (val) => {
    triggerChange({ max: val });
  };
  return (
    <div className="port-range-wrap">
      <InputNumber
        min={1}
        max={65535}
        value={min}
        onChange={onMinChange}
        placeholder="请输入最小端口号"
        className="port-range-input"
        style={{ width: '50%' }} // 以 50% 的宽度展示
      />
      <span style={{ margin: '0 8px' }}>-</span>
      <InputNumber
        min={1}
        max={65535}
        value={max}
        onChange={onMaxChange}
        placeholder="请输入最大端口号"
        className="port-range-input"
        style={{ width: '50%' }}
      />
    </div>
  );
};
