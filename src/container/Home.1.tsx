import React, {FC} from 'react';
import {Button} from 'antd';
import styled from '@emotion/styled';
import {useStateValue} from '../store';
import {CounterActionTypes} from '../store/counterReducer';
import {TeamActionTypes} from '../store/teamReducer';
import {ThemeActionTypes} from '../store/themeReducer';

const ThemeTitle = styled.div((props) => ({
  color: props.theme.color,
  fontSize: props.theme.fontSize,
  backgroundColor: props.theme.bgColor,
}));
interface HomeProps {
  title?: string;
}
const Home: FC<HomeProps> = (props) => {
  const [state, dispatch] = useStateValue()!;

  const handleIncrement = (): void => {
    dispatch({
      key: 'counter',
      type: CounterActionTypes.Increment,
      payload: {
        data: 11,
      },
    });
  };

  const handleDecrement = (): void => {
    dispatch({
      key: 'counter',
      type: CounterActionTypes.Decrement,
      payload: {
        data: 4,
      },
    });
  };

  const handleChangeTeam = (): void => {
    dispatch({
      key: 'team',
      type: TeamActionTypes.ChangeTeam,
      payload: {
        data: 'team 3',
        total: 3,
      },
    });
  };

  const handleChangeTheme = (): void => {
    dispatch({
      key: 'theme',
      type: ThemeActionTypes.ChangeTheme,
      payload: {
        data: 'light',
      },
    });
  };

  return (
    <div>
      <h4>Home--Test</h4>
      <div>{state.counter.count}</div>
      <Button onClick={handleIncrement}>increment++</Button>
      <Button onClick={handleDecrement}>decrement--</Button>
      <h4>Team</h4>
      <div>data: {state.team.data}</div>
      <div>id: {state.team.id}</div>
      <Button onClick={handleChangeTeam}>change Team</Button>
      <h4>theme: {state.theme.name}</h4>
      <ThemeTitle>Theme-Title</ThemeTitle>
      <Button onClick={handleChangeTheme}>change Team</Button>
    </div>
  );
};

export default Home;
