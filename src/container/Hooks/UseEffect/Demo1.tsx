/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/**
 * useEffect: 功能最为强大
 *   1. 替代 componentDidMount, componentDidUpdate,
 *      componentWillReceiveProps, static getDerivedStateFromProps
 *   2. 注意顺序，hooks 的顺序很重要，尤其是有 return 的时候
 */
import React, {FC, useEffect, useState} from 'react';
import {MRow, MButton} from '../../styledComponents/Antd';
import {sleep} from '../../../utils/tools';
import {Parent} from './index';

interface Demo22Props {
  name?: string;
  title?: string;
  parentName?: Parent;
}
const Demo22: FC<Demo22Props> = (props) => {
  const {parentName} = props;
  const [count, setCount] = useState(0);
  const [name, setName] = useState('name');
  const [loading, setLoading] = useState(true);

  /**
   * useEffect: 务必在任何情况下都会执行
   * React Hook "useEffect" is called conditionally.
   * React Hooks must be called in the exact same order in every component render
   *
  // if (!!loading) return;

  /**
   * componentDidMount
   */
  useEffect(() => {
    console.log('componentDidMount');
    setLoading(false);
  }, []);

  /**
   * componentDidUpdate
   */
  useEffect(() => {
    if (count % 2 === 0) {
      setName((prev) => `${prev}-${count}`);
    }
  }, [count]);

  /**
   * componentWillReceiveProps, static getDerivedStateFromProps
   */
  useEffect(() => {
    console.log('componentWillReceiveProps, getDerivedStateFromProps');
  }, [props]);

  /**
   * shouldComponentUpdate, 原理同 PureComponent, 不是 isEqual 的比较
   */
  useEffect(() => {
    if (!props.parentName) return;
    console.log('shouldComponentUpdate');
  }, [props.parentName]);

  /**
   * 事件的监听和取消: addEventListener, removeEventListener
   */
  useEffect(() => {
    const timer = setInterval(() => {
      // setCount((prevCount) => prevCount + 1);
      console.count('timer 定时器');
    }, 1000);

    // 返回时间的取消函数： removeEventListener
    return (): void => {
      document.title = 'componentWillUnmount';
      clearInterval(timer);
    };
  }, [count]);

  /**
   * 异步请求
   */
  useEffect(() => {
    const asyncFn = async (): Promise<void> => {
      await sleep(2000);
      console.log('async result');
    };

    asyncFn();
  }, []);

  /**
   * 不传参数， 每次执行
   */
  useEffect(() => {
    console.log('useEffect');
  });

  const handleIncrease = (): void => {
    setCount((prev) => prev + 1);
  };

  const handleDecrease = (): void => {
    setCount((prev) => prev - 1);
  };

  return (
    <>
      <div>count: {count}</div>
      <div>name--count为偶数时变化: {name}</div>
      <div>
        Parent Name:
        {`${(parentName && parentName.name) || ''}--${(parentName &&
          parentName.age) ||
          ''}`}
      </div>
      <MRow>
        <MButton onClick={handleIncrease}>++</MButton>
        <MButton onClick={handleDecrease}>++</MButton>
      </MRow>
    </>
  );
};

export default Demo22;
