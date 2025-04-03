import _map from 'lodash/map';

import { calculateTextWidth } from '@/utils';

import {
  validateEmail,
  validateIP,
  validateIPAndPort,
  validateName,
  validateNameZh,
  validateNoSpacesAround,
  validatePassword,
  validatePortRange,
} from './validate';

export const getBuiltInRules = (formItem) => {
  const { builtInRules = [], required, rules } = formItem;
  const builtInRulesMap = {
    noSpacesAround: validateNoSpacesAround,
    password: validatePassword,
    name: validateName,
    nameZh: validateNameZh,
    ipAndPort: validateIPAndPort,
    email: validateEmail,
    portRange: validatePortRange,
    ip: validateIP,
  };

  // 动态生成校验规则，并在校验时使用 required 参数调整校验逻辑
  return _map(builtInRules, (rule) => {
    return {
      validator: builtInRulesMap[rule].bind(
        null,
        required || rules?.some((item) => item.required),
      ),
    };
  });
};

/**
 * 获取标签宽度
 *
 * @param {Array} formItem - 表单项数组
 * @returns {Array} 返回最长的label长度
 */
export function getLabelWidth(formItem) {
  return formItem.reduce((pre, cur) => {
    // :的长度
    let colonWidth = 22;
    if (cur.required || cur.rules?.some((rule) => rule.required)) {
      colonWidth += 14; // 必填项图标的长度
    }
    if (cur.tooltip) {
      colonWidth += 18; // tooltip提示图标的长度
    }
    // 当前label的默认宽度
    let curLabelWidth = 50;
    if (!cur.hidden) {
      // 当前标签没有隐藏时，计算出宽度
      curLabelWidth = calculateTextWidth(cur.label || '') + colonWidth;
    }
    return Math.max(pre, curLabelWidth);
  }, 50);
}
