/* eslint-disable no-console */
/**
 * useLayout, 和 useEffect 差不多， 基于 dom 刷新执行
 *   1. 用法和 useEffect 一样，执行时机不一样
 *   2. 推荐先用 useEffect, 有结局不了的问题时再尝试 useLayoutEffect
 */
import React, {FC, useState, useLayoutEffect, useEffect, useRef} from 'react';
import PageHeaderWrapper from '../../../layout/PageHeaderWrapper';
import {MRow, MButton} from '../../styledComponents/Antd';

interface UseLayoutDemoProps {
  name?: string;
}
const UseLayoutDemo: FC<UseLayoutDemoProps> = (props) => {
  const [title, setTitle] = useState('title');
  const titleRef = useRef<HTMLDivElement>(null);

  const handleChangeState = (): void => {
    setTitle('changed-state');
  };

  useLayoutEffect(() => {
    console.log('useLayout');
  });
  useEffect(() => {
    console.log('useEffect');
  });

  useLayoutEffect(() => {
    console.log('useLayout-title');
  }, [title]);
  useEffect(() => {
    console.log('useEffect-title');
  }, [title]);
  return (
    <PageHeaderWrapper title="useLayout">
      <div ref={titleRef}>Use Layout</div>
      <MRow>state title: {title}</MRow>
      <MRow>
        <MButton onClick={handleChangeState}>change state value</MButton>
      </MRow>
    </PageHeaderWrapper>
  );
};

export default UseLayoutDemo;
