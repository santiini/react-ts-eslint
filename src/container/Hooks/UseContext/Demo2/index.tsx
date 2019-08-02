import React from 'react';
import ThemeButton from './ThemeButton';
import {ThemeContext, themes} from './context';
import {Button} from 'antd';

const ToolBar: React.FC = (props) => (
  <div>
    <ThemeButton />
  </div>
);

interface Learn5State {
  theme: {
    foreground: string;
    background: string;
  };
}
/**
 * ThemeContext.Provider 中传入的 context
 *   1. context 通过 Provider 传入
 *   2. Provider 上的 value 属性，可以覆盖默认的 context
 */
class Learn6 extends React.Component<{}, Learn5State> {
  // Provider 的 value 可以是动态变化的，但是需要注意：
  //   只要 context 变化，则 Provider 的所有 context 子组件都重新渲染
  public state = {
    theme: themes.light,
  };

  public toggleTheme = (): void => {
    this.setState(
      (prev): Pick<Learn5State, keyof Learn5State> => ({
        theme: prev.theme === themes.dark ? themes.light : themes.dark,
      })
    );
  };

  public render(): React.ReactElement {
    return (
      <div>
        <h4>Learn5--ContextApi2</h4>
        <ThemeContext.Provider value={this.state.theme}>
          <ToolBar />
        </ThemeContext.Provider>
        <h5>切换Provider--value</h5>
        <Button onClick={this.toggleTheme}>切换theme</Button>
      </div>
    );
  }
}

export default Learn6;
