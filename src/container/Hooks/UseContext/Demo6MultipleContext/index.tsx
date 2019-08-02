/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {Context, useState} from 'react';
import {Button} from 'antd';
import {ThemeContext, UserContext} from './context';
import Content from './Content';

const compose = (
  contexts: [Context<any>, any][],
  children: React.ReactElement
): React.ReactElement => {
  return contexts.reduce((acc, [ContextItem, value]): React.ReactElement => {
    return <ContextItem.Provider value={value}>{acc}</ContextItem.Provider>;
  }, children);
};

interface ProviderBoxProps {
  theme: {bg: string; font: string};
  user: {name: string};
}

const ProviderBox: React.FC<ProviderBoxProps> = (props) => {
  const {theme, user} = props;
  return compose(
    [[ThemeContext, theme], [UserContext, user]],
    <Content />
  );
};

const ProviderContainer: React.FC = () => {
  const [theme, setTheme] = useState({bg: '#fff', font: 'red'});
  const [user, setUser] = useState({name: 'admin'});
  const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

  const toggleTheme = (): void => {
    setTheme(
      themeName === 'dark'
        ? {bg: '#fff', font: 'red'}
        : {bg: '#000', font: 'blue'}
    );
    setUser({name: 'guest'});
    setThemeName((prev): 'light' | 'dark' =>
      prev === 'light' ? 'dark' : 'light'
    );
  };

  return (
    <div>
      <ProviderBox theme={theme} user={user} />
      <Button onClick={toggleTheme}>Toggle Theme</Button>
    </div>
  );
};

export default ProviderContainer;
