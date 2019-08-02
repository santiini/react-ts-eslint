/* eslint-disable no-console */
/**
 * useRef 的作用：保存引用值
 *   1. 实现 ref 功能，缓存 dom
 *   2. 实现 ClassComponent 中类属性的功能，this.attrs
 *   3. TypeScript 中， useRef 的两种函数重载，指向不同的类型， 初始值 null 和 undefined
 */
import React, {FC, useRef, useEffect, useState} from 'react';
import {Input} from 'antd';
import PageHeaderWrapper from '../../../layout/PageHeaderWrapper';
import {MRow, MButton} from '../../styledComponents/Antd';

interface SpaceProps {
  name: string;
  age: number;
}

interface UseRefDemoProps {
  name?: string;
}
const UseRefDemo: FC<UseRefDemoProps> = (props) => {
  const [title, setTitle] = useState('title');
  /**
   * useRef 缓存 dom, 初始值 null
   */
  const inputRef = useRef<HTMLInputElement>(null);
  const antdInputRef = useRef<Input>(null);

  /**
   * useRef 缓存引用值, 和 ClassComponent 一样，不会引起组件刷新, 初始值 undefined
   *   1. 常用于保存各种实例， echarts, swiper 等
   *   2. 保存不会引起渲染的变量
   */
  const mySpace = useRef<SpaceProps>();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChangeSpace = (): void => {
    mySpace.current = {
      name: 'santiiny',
      age: 29,
    };
  };

  const handleFocus = (): void => {
    if (antdInputRef.current) {
      antdInputRef.current.select();
    }
  };

  const handleChangeState = (): void => {
    setTitle('changed-state');
  };

  console.log(mySpace);

  return (
    <PageHeaderWrapper title="useRef">
      <MRow>Ref value: {mySpace.current && mySpace.current.name}</MRow>
      <MRow>state title: {title}</MRow>
      <MRow>
        <input ref={inputRef} placeholder="原生input" />
      </MRow>
      <MRow>
        <Input
          style={{width: 200}}
          ref={antdInputRef}
          placeholder="antd-input"
        />
      </MRow>
      <MRow>
        <MButton onClick={handleFocus}>Antd-Input Focus</MButton>
        <MButton onClick={handleChangeSpace}>change ref value</MButton>
        <MButton onClick={handleChangeState}>change state value</MButton>
      </MRow>
    </PageHeaderWrapper>
  );
};

export default UseRefDemo;
