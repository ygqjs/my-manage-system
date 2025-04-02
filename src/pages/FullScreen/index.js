import { AdaptiveFullScreenGrid } from '@/components';

import Header from './Header';
import LeftBottom from './LeftBottom';
import LeftMid from './LeftMid';
import LeftTop from './LeftTop';
import MidBottom from './MidBottom';
import MidTop from './MidTop';
import RightBottom from './RightBottom';
import RightTop from './RightTop';

const FullScreen = () => {
  const layoutSize = {
    header: [240, 13],
    leftTop: [61.625, 27.75],
    leftMid: [61.625, 39.625],
    leftBottom: [61.625, 39.625],
    midTop: [98.5, 60],
    midBottom: [100.125, 43.5],
    rightTop: [61.625, 39.625],
    rightBottom: [61.625, 71.25],
  };
  const xMargin = 1;
  const yMargin = 1;
  const layout = [
    {
      i: 'header',
      x: 0,
      y: 0,
      w: layoutSize.header[0],
      h: layoutSize.header[1],
      component: <Header />,
    },
    {
      i: 'leftTop',
      x: xMargin * 4.5,
      y: layoutSize.header[1] + yMargin * 3,
      w: layoutSize.leftTop[0],
      h: layoutSize.leftTop[1],
      component: <LeftTop />,
    },
    {
      i: 'leftMid',
      x: xMargin * 4.5,
      y: layoutSize.header[1] + layoutSize.leftTop[1] + yMargin * (3 + 3.75),
      w: layoutSize.leftMid[0],
      h: layoutSize.leftMid[1],
      component: <LeftMid />,
    },
    {
      i: 'leftBottom',
      x: xMargin * 4.5,
      y:
        layoutSize.header[1] +
        layoutSize.leftTop[1] +
        layoutSize.leftMid[1] +
        yMargin * (3 + 3.75 + 3.75),
      w: layoutSize.leftBottom[0],
      h: layoutSize.leftBottom[1],
      component: <LeftBottom />,
    },
    {
      i: 'midTop',
      x: layoutSize.leftTop[0] + xMargin * (4.5 + 4.5),
      y: layoutSize.header[1] + yMargin * 7.25,
      w: layoutSize.midTop[0],
      h: layoutSize.midTop[1],
      component: <MidTop />,
    },
    {
      i: 'midBottom',
      x: layoutSize.leftTop[0] + xMargin * (4.5 + 3.75),
      y: layoutSize.header[1] + layoutSize.midTop[1] + yMargin * (7.25 + 6.75),
      w: layoutSize.midBottom[0],
      h: layoutSize.midBottom[1],
      component: <MidBottom />,
    },
    {
      i: 'rightTop',
      x:
        layoutSize.leftTop[0] +
        layoutSize.midTop[0] +
        xMargin * (4.5 + 4.5 + 4.625),
      y: layoutSize.header[1] + yMargin * 3,
      w: layoutSize.rightTop[0],
      h: layoutSize.rightTop[1],
      component: <RightTop />,
    },
    {
      i: 'rightBottom',
      x:
        layoutSize.leftBottom[0] +
        layoutSize.midTop[0] +
        xMargin * (4.5 + 4.5 + 4.625),
      y: layoutSize.header[1] + layoutSize.rightTop[1] + yMargin * (3 + 3.75),
      w: layoutSize.rightBottom[0],
      h: layoutSize.rightBottom[1],
      component: <RightBottom />,
    },
  ];

  return <AdaptiveFullScreenGrid layout={layout} />;
};

export default FullScreen;
