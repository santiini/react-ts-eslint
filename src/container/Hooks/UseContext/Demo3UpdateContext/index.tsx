import React from 'react';
import ThemeButton from './ThemeToggleButton';
import {ThemeContext, themes} from './context';

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

class Learn7 extends React.Component<{}, Learn5State> {
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
        <ThemeContext.Provider
          value={{
            theme: this.state.theme,
            toggleTheme: this.toggleTheme,
          }}
        >
          <ToolBar />
        </ThemeContext.Provider>
      </div>
    );
  }
}

export default Learn7;
