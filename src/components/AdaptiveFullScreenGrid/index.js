import React, { useCallback, useEffect, useMemo, useState } from 'react';

import _debounce from 'lodash/debounce';
import ReactGridLayout, { WidthProvider } from 'react-grid-layout'; // 默认导入

// 使用 WidthProvider 增强 ReactGridLayout
const GridLayout = WidthProvider(ReactGridLayout);

/**
 * AdaptiveFullScreenGrid 是一个大屏自适应网格布局组件
 * @param {Array} design - 设计稿尺寸，格式为 [宽度, 高度]，默认 [1920, 1080]（1920px 宽，1080px 高）
 * @param {number} widthRemove - 从窗口宽度中移除的像素数，默认 0
 * @param {number} heightRemove - 从窗口高度中移除的像素数，默认 0
 * @param {Array} layout - 布局数组，每个元素包含网格项的配置
 */
function AdaptiveFullScreenGrid({
  design = [1920, 1080], // 设计稿尺寸：1920px 宽，1080px 高
  widthRemove = 0,
  heightRemove = 0,
  layout = [],
}) {
  // 状态管理：窗口尺寸和网格单元尺寸
  const [windowSize, setWindowSize] = useState({
    windowWidth: window.innerWidth - widthRemove,
    windowHeight: window.innerHeight - heightRemove,
    partWidth: 0, // 每个网格单元的像素宽度
    partHeight: 0, // 每个网格单元的像素高度
  });

  // 计算网格的列数和行数（设计稿每 8 像素为一个格子）
  const designWidth = design[0]; // 设计稿宽度：1920px
  const designHeight = design[1]; // 设计稿高度：1080px
  const cols = designWidth / 8; // 1920 / 8 = 240 列
  const rows = designHeight / 8; // 1080 / 8 = 135 行

  // 设置 HTML 的 font-size（REM 基准值）
  const setHtmlFontSize = useCallback(() => {
    const windowWidth = window.innerWidth - widthRemove;
    const windowHeight = window.innerHeight - heightRemove;

    // 计算 REM 基准值：1rem = (当前窗口宽度 / 设计稿宽度) * 100
    // 例如：窗口宽度 1920px，设计稿宽度 1920px，则 1rem = (1920 / 1920) * 100 = 100px
    const fontSize = ((windowWidth / designWidth) * 100).toFixed(3);
    document.documentElement.style.fontSize = `${fontSize}px`;

    // 计算每个网格单元的像素大小
    // 设计稿宽度 1920px 分为 240 列（1920 / 8），每个格子 8px
    // 窗口宽度 960px 时，每个格子宽度 = 960 / 240 = 4px
    const partWidth = Number((windowWidth / (designWidth / 8)).toFixed(3));
    // 设计稿高度 1080px 分为 135 行（1080 / 8），每个格子 8px
    // 窗口高度 540px 时，每个格子高度 = 540 / 135 = 4px
    const partHeight = Number((windowHeight / (designHeight / 8)).toFixed(3));

    // 存储到 document.dataset 中，便于调试
    document.documentElement.dataset.partWidth = partWidth;
    document.documentElement.dataset.partHeight = partHeight;

    // 更新状态
    setWindowSize({
      windowWidth,
      windowHeight,
      partWidth,
      partHeight,
    });
  }, [designWidth, designHeight, widthRemove, heightRemove]);

  // 监听窗口大小变化
  useEffect(() => {
    setHtmlFontSize(); // 初始设置
    const debouncedResize = _debounce(setHtmlFontSize, 300);
    window.addEventListener('resize', debouncedResize);

    // 清理事件监听
    return () => {
      window.removeEventListener('resize', debouncedResize);
    };
  }, [setHtmlFontSize]);

  // 渲染子组件
  const renderItems = useMemo(() => {
    return layout.map(({ i, w, h, component, componentProps = {} }) => {
      const props = {
        ...componentProps,
        width: Math.floor(w * windowSize.partWidth), // 计算实际像素宽度
        height: Math.floor(h * windowSize.partHeight), // 计算实际像素高度
        rootFontSize: parseFloat(
          document.documentElement.style?.fontSize?.replace('px', '') || 100,
        ),
      };

      return (
        <div key={i}>
          {component
            ? React.cloneElement(component, props)
            : `暂未传入component组件`}
        </div>
      );
    });
  }, [layout, windowSize.partWidth, windowSize.partHeight]);

  // 网格布局配置
  const gridProps = useMemo(
    () => ({
      className: 'layout',
      layout,
      cols,
      rowHeight: windowSize.windowHeight / rows, // 动态计算每个格子的高度
      margin: [0, 0], // 无间距
      containerPadding: [0, 0], // 无内边距
      isDraggable: false, // 禁止拖拽
      isResizable: false, // 禁止调整大小
      compactType: null, // 不自动压缩
      style: {
        overflow: 'hidden',
        height: windowSize.windowHeight, // 确保容器高度与窗口一致
      },
    }),
    [layout, cols, rows, windowSize.windowHeight],
  );

  return <GridLayout {...gridProps}>{renderItems}</GridLayout>;
}

export default AdaptiveFullScreenGrid;
