/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * useReducer 简单实例
 */
import React, {FC, Reducer, useReducer} from 'react';
import PageHeaderWrapper from '../../../../layout/PageHeaderWrapper';
import {MRow, MButton} from '../../../styledComponents/Antd';

enum ActionType {
  Increment = 'increment',
  Decrement = 'decrement',
  Reset = 'reset',
}

interface CountAction {
  type: ActionType;
  payload?: any;
}

const initialState = 0;
const reducer: Reducer<number, CountAction> = (state, action) => {
  switch (action.type) {
    case ActionType.Increment:
      return state + 1;
    case ActionType.Decrement:
      return state - 1;
    case ActionType.Reset:
      return 0;
    default:
      throw new Error('Unexpected action');
  }
};

interface UserReducerDemo1Props {
  name?: string;
}
const UserReducerDemo1: FC<UserReducerDemo1Props> = (props) => {
  const [count, dispatch] = useReducer(reducer, initialState);

  const handleIncrease = (): void => {
    dispatch({type: ActionType.Decrement});
  };
  const handleDecrease = (): void => {
    dispatch({type: ActionType.Increment});
  };
  const handleReset = (): void => {
    dispatch({type: ActionType.Reset});
  };

  return (
    <PageHeaderWrapper title="userReducer简单实例">
      <MRow>count: {count}</MRow>
      <MRow>
        <MRow>
          <MButton onClick={handleIncrease}>++</MButton>
          <MButton onClick={handleDecrease}>--</MButton>
          <MButton onClick={handleReset}>reset</MButton>
        </MRow>
      </MRow>
    </PageHeaderWrapper>
  );
};

export default UserReducerDemo1;
