import React, {FC} from 'react';
import {Button} from 'antd';
import {useStateValue, ActionType} from './store';

interface HomeProps {
  title?: string;
}
const Home: FC<HomeProps> = (props) => {
  const [state, dispatch] = useStateValue()!;

  const handleIncrement = (): void => {
    dispatch({
      type: ActionType.Increment,
      payload: {
        count: 11,
      },
    });
  };

  const handleDecrement = (): void => {
    dispatch({
      type: ActionType.Decrement,
      payload: {
        count: 4,
      },
    });
  };

  return (
    <div>
      <h4>Home--Test</h4>
      <div>{state.count}</div>
      <Button onClick={handleIncrement}>increment++</Button>
      <Button onClick={handleDecrement}>decrement--</Button>
    </div>
  );
};

export default Home;
