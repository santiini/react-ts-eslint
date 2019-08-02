/**
 * demo1: useState
 *   1. 替代 this.state, setState
 */
import React, {FC, useState, useEffect} from 'react';
import {InputNumber} from 'antd';
import PageHeaderWrapper from '../../../layout/PageHeaderWrapper';
import {MRow, MButton} from '../../styledComponents/Antd';

interface Person {
  name: string;
  age: number;
}

interface Demo1Props {
  title?: string;
}
const Demo1: FC<Demo1Props> = (props) => {
  // useState 的函数重载
  const [count, setCount] = useState(0);
  const [person, setPerson] = useState<Person>({name: 'react', age: 10});
  // const [person, setPerson] = useState<Person>();
  const [number, setNumber] = useState<number>();

  // base setValue
  const handleCount10 = (): void => {
    setCount(10);
  };

  // setValue with previous value, setState(() => {})
  const handleIncrease = (): void => {
    setCount((prev) => prev + 1);
  };

  const handleDecrease = (): void => {
    setCount((prev) => prev - 1);
  };

  const handleChangePerson = (): void => {
    setPerson({name: 'sxt', age: 30});
  };

  // useEffect 模仿 setState((), () => {}), setState 的回调函数
  useEffect(() => {
    if (count > 0) {
      setPerson((prev) => ({
        ...prev,
        age: count,
      }));
    }
  }, [count]);

  return (
    <PageHeaderWrapper title="useState">
      <div>count: {count}</div>
      <div>person: {`${person.name}（${person.age}）`}</div>
      <div>number: {number}</div>
      <MRow>
        <MButton onClick={handleIncrease}>++</MButton>
        <MButton onClick={handleDecrease}>++</MButton>
      </MRow>
      <MRow>
        <MButton onClick={handleCount10}>count 10</MButton>
        <MButton onClick={handleChangePerson}>Person</MButton>
      </MRow>
      <MRow>
        {/* setNumber： 参数类型和 number 类型一致 */}
        <InputNumber value={number} onChange={setNumber} placeholder="number" />
      </MRow>
    </PageHeaderWrapper>
  );
};

export default Demo1;
