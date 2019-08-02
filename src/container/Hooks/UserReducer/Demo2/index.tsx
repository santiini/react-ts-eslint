/**
 * useReducer
 *   1. 每一个 useReducer 相互分离，不相关
 *   2. 同一个 useReducer 同步变化
 */
import React, {FC, useReducer} from 'react';
import PageHeaderWrapper from '../../../../layout/PageHeaderWrapper';
import {MRow, MButton} from '../../../styledComponents/Antd';
import {ActionType, initialCountState, counterReducer} from './reducer';

interface UserReducerDemo1Props {
  name?: string;
}
const UserReducerDemo2: FC<UserReducerDemo1Props> = (props) => {
  const [count, dispatch] = useReducer(counterReducer, initialCountState);
  const [count2, dispatch2] = useReducer(counterReducer, initialCountState);

  const handleIncrease = (): void => {
    dispatch({type: ActionType.Increment});
  };
  const handleDecrease = (): void => {
    dispatch({type: ActionType.Decrement});
  };
  const handleReset = (): void => {
    dispatch({type: ActionType.Reset});
  };
  const handleIncrease2 = (): void => {
    dispatch2({type: ActionType.Increment});
  };
  const handleDecrease2 = (): void => {
    dispatch2({type: ActionType.Decrement});
  };
  const handleReset2 = (): void => {
    dispatch2({type: ActionType.Reset});
  };

  return (
    <PageHeaderWrapper title="userReducer简单实例">
      <MRow>
        counter1: {count.name}, count: {count.count}
      </MRow>
      <MRow>
        <MRow>
          <MButton onClick={handleIncrease}>++</MButton>
          <MButton onClick={handleDecrease}>--</MButton>
          <MButton onClick={handleReset}>reset</MButton>
        </MRow>
      </MRow>
      <MRow>
        另一个counter1: {count.name}, count: {count.count}
      </MRow>
      <MRow>
        <MRow>
          <MButton onClick={handleIncrease}>++</MButton>
          <MButton onClick={handleDecrease}>--</MButton>
          <MButton onClick={handleReset}>reset</MButton>
        </MRow>
      </MRow>
      <MRow>
        counter2: {count2.name}, count: {count2.count}
      </MRow>
      <MRow>
        <MRow>
          <MButton onClick={handleIncrease2}>++</MButton>
          <MButton onClick={handleDecrease2}>--</MButton>
          <MButton onClick={handleReset2}>reset</MButton>
        </MRow>
      </MRow>
    </PageHeaderWrapper>
  );
};

export default UserReducerDemo2;
