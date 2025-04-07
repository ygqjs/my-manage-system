import { Tooltip } from 'antd';

import { getLocale, Icon, setLocale } from '@umijs/max';

import './index.less';

function LangButton() {
  const locale = getLocale();
  const onChangeLang = () => {
    const changeLang = locale === 'zh-CN' ? 'en-US' : 'zh-CN';
    setLocale(changeLang, false);
  };
  const isZhCN = locale === 'zh-CN';
  const title = isZhCN ? '中文/English' : 'English/中文';
  return (
    <Tooltip title={title} placement="bottom">
      <button type="button" className="btn" onClick={onChangeLang}>
        <Icon
          icon={isZhCN ? 'local:cn' : 'local:us'}
          style={{ fontSize: 20 }}
        />
      </button>
    </Tooltip>
  );
}

export default LangButton;
