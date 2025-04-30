import { useEffect, useRef } from 'react';

import { useSetState } from 'ahooks';

import { lrc as lrcContent } from './music/data.js';
import musicSrc from './music/music.mp3';

import styles from './index.less';

/**
 * 解析歌词时间
 * @param {*} timeStr 歌词时间字符串 "01:03.02"
 * @returns {Number} 返回歌词时间 1 * 60 + 3.02 => 63.02
 */
const parseTime = (timeStr) => {
  const timeArr = timeStr.split(':');
  const min = Number(timeArr[0]);
  const sec = Number(timeArr[1]);
  return min * 60 + sec;
};
/**
 * 解析歌词
 * @param {*} lrc 歌词内容
 * @returns {Array} 返回歌词数组 []{time: 0, text: ''}
 */
const parseLRC = (lrc) => {
  const lrcArr = lrc.split('\n');
  const formatLrcArr = lrcArr.map((item) => {
    const itemSpilt = item.split(']');
    const timeStr = itemSpilt[0].slice(1);
    const textStr = itemSpilt[1];
    return {
      time: parseTime(timeStr),
      text: textStr,
    };
  });
  return formatLrcArr;
};

/**
 * 根据audio currentTime来计算出当前歌词所在的索引位置
 * @returns {Number} index
 */
const getCurrentLrcIndex = (currentTime, lrcArr) => {
  if (!lrcArr?.length) return -1;
  for (let i = 0; i < lrcArr.length; i++) {
    if (currentTime < lrcArr[i].time) {
      return Math.max(i - 1, 0); // 确保不返回负数
    }
  }
  return lrcArr.length - 1;
};

/**
 * 计算ul y轴偏移量
 * @returns {Number} offset
 */
const getUlOffset = (currentLrcIndex, ulDom) => {
  const lineHeight = ulDom?.children[0]?.clientHeight;
  const offset = currentLrcIndex * lineHeight + lineHeight / 2 - 600 / 2;
  if (offset < 0) {
    return 0;
  }
  // 设置最大偏移量
  const maxOffset = ulDom?.clientHeight - 600;
  if (offset > maxOffset) {
    return maxOffset;
  }
  return offset;
};
const Music = () => {
  const audioRef = useRef(null);
  const ulRef = useRef(null);
  const [state, setState] = useSetState({
    lrcArr: [],
    currentLrcIndex: 0, // 第几句歌词
  });
  const { lrcArr, currentLrcIndex } = state;

  useEffect(() => {
    const formatLrcArr = parseLRC(lrcContent);
    setState({ lrcArr: formatLrcArr });
    const handleTimeUpdate = () => {
      const { currentTime } = audioRef.current;
      setState({
        currentLrcIndex: getCurrentLrcIndex(currentTime, formatLrcArr),
      });
    };
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    return () =>
      audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  useEffect(() => {
    if (ulRef.current) {
      const ulOffset = getUlOffset(currentLrcIndex, ulRef.current);
      ulRef.current.style.transform = `translateY(-${ulOffset}px)`;
      ulRef.current.style.transition = 'transform 0.3s ease';
    }
  }, [currentLrcIndex]);

  return (
    <div className={styles.container}>
      <audio src={musicSrc} controls="controls" ref={audioRef} />
      <div className={styles.lrcContainer}>
        {lrcArr.length !== 0 && (
          <ul ref={ulRef}>
            {lrcArr.map((item, index) => {
              return (
                <li
                  key={item.time}
                  className={index === currentLrcIndex ? styles.active : null}
                >
                  {item.text}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Music;
