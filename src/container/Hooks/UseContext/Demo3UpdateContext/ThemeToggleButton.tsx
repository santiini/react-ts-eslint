import React from 'react';
import {ThemeContext} from './context';
import {Button} from 'antd';

/**
 * contextApi 在 FunctionComponent 中的使用
 *   1. contextType 注入 context 只能在 ClassComponent 中使用
 *   2. FunctionComponent 中，可以使用 <ThemeContext.Consumer> 来传递 { theme, toggleTheme }
 */
const ThemeToggleButton: React.FC = () => {
  return (
    <ThemeContext.Consumer>
      {({theme, toggleTheme}): React.ReactElement => (
        <div>
          <div style={{backgroundColor: theme.background}}>测试文字</div>
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
      )}
    </ThemeContext.Consumer>
  );
};

export default ThemeToggleButton;
