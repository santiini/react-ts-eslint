import React from 'react';
import ThemeButton from './ThemeButton';
import {ThemeContext, themes} from './context';

const ToolBar: React.FC = (props) => (
  <div>
    <ThemeButton />
  </div>
);

/**
 * ThemeContext.Provider 中传入的 context
 *   1. context 通过 Provider 传入
 *   2. Provider 上的 value 属性，可以覆盖默认的 context
 */
class Learn5 extends React.Component {
  public render(): React.ReactElement {
    return (
      <div>
        <h4>Learn5--ContextApi2</h4>
        <ThemeContext.Provider value={themes.dark}>
          <ToolBar />
        </ThemeContext.Provider>
      </div>
    );
  }
}

export default Learn5;
