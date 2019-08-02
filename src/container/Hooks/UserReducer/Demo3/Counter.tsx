import React, {FC} from 'react';
import {useCount} from './store';
import {ActionType} from './reducer';
import {MRow, MButton} from '../../../styledComponents/Antd';

interface CounterProps {
  name?: string;
}
const Counter: FC<CounterProps> = (props) => {
  const [count, dispatch] = useCount()!;
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
    <div>
      counter: {count.name}, count: {count.count}
      <MRow>
        <MRow>
          <MButton onClick={handleIncrease}>++</MButton>
          <MButton onClick={handleDecrease}>--</MButton>
          <MButton onClick={handleReset}>reset</MButton>
        </MRow>
      </MRow>
    </div>
  );
};

export default Counter;
