/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/**
 * useMemo 缓存
 *   1. memoization, memoize-one 缓存结果
 *   2. 根据依赖项变化而变化
 *   3. 实现 useCallback 相同作用
 *   4. 解决 Class 组件中， render() 函数相同的问题，作用和 memoize-one 相同
 *   5. 函数式组件的 memo()， 同 PureComponent
 *   6. 提升性能有帮助，但没有必要所有都使用 memo, 根据情况使用
 */
import React, {FC, useState, useMemo, useCallback} from 'react';
import PageHeaderWrapper from '../../../layout/PageHeaderWrapper';
import {MRow, MButton} from '../../styledComponents/Antd';
import TestButton, {TestFnButton} from './Demo1';

const list = [
  {name: '苹果', price: 9},
  {name: '香蕉', price: 3},
  {name: '橘子', price: 4},
  {name: '桃子', price: 3},
];

type ListProps = typeof list;

const getMyFruit = (list: ListProps): ListProps => {
  console.log('计算水果');

  return list.filter((v) => v.price < 5);
};

interface Demo3Props {
  name?: string;
}
const Demo3: FC<Demo3Props> = (props) => {
  const [money, setMoney] = useState(500);

  /**
   * useMemo 缓存变量
   */
  // 不缓存结果，每次渲染都会计算
  // const fruit = getMyFruit(list);
  //  使用 useMemo
  const fruit = useMemo(() => {
    return getMyFruit(list);
  }, []);

  /**
   * useMemo 缓存函数: 指向同一个引用，而非是一个新的函数, 相当于 Class Componennt 中的 this.onClick
   */
  // 不缓存时
  const handleAddMoney = (): void => {
    console.log('加钱');
    setMoney((prev) => prev + 500);
  };

  // 缓存
  // const handleAddMoney = useMemo(() => {
  //   return (): void => {
  //     console.log('memo-加钱');
  //     setMoney((prev) => prev + 500);
  //   };
  // }, []);

  /**
   * useCallback 实现上面相同的功能: 记忆事件函数
   *   1. 作用相同，写法不同
   *   2. useMemo 是执行一个函数，返回缓存函数，执行中可以做很多事情
   */
  // const handleAddMoney = useCallback((): void => {
  //   console.log('callback-加钱');
  //   setMoney((prev) => prev + 500);
  // }, []);

  return (
    <PageHeaderWrapper title="useMemo">
      <h5>Money: {money}</h5>
      <MRow>
        {fruit.map((v) => (
          <div key={v.name}>{`${v.name}-￥${v.price}`}</div>
        ))}
      </MRow>
      <MRow>
        <MButton onClick={handleAddMoney}>加钱</MButton>
        <TestButton onClick={handleAddMoney}>加钱</TestButton>
        <TestFnButton onClick={handleAddMoney}>加钱</TestFnButton>
      </MRow>
    </PageHeaderWrapper>
  );
};

export default Demo3;
