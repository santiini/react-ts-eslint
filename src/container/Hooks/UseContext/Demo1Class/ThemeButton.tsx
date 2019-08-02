import React from 'react';
import {ThemeContext} from './context';

/**
 * ContextApi 的调用者
 *   1. 组件中注入 contextType
 *   2. 组件的调用通过 this.context 获取 contextApi 上的属性，是 Provider 的 value 注入的属性
 */
class ThemeButton extends React.Component {
  /**
   * 在 react 16.8.6以后，新的 contentApi 使用时，需要注意:
   *   1. 通过 static contentType = React.createContext() 注入 context
   *   2. 使用 TypeScript 时，需要重新声明 context 类型， context!: React.ContextType<typeof ThemeContext>
   */
  public static contextType = ThemeContext;
  public context!: React.ContextType<typeof ThemeContext>;

  public render(): React.ReactElement {
    const props = this.props;
    const theme = this.context;

    console.warn(theme);

    return (
      <div>
        <div style={{backgroundColor: theme.background, color: 'green'}}>
          测试文字
        </div>
        <button {...props}>点击测试</button>
      </div>
    );
  }
}

// ThemeButton.contextType = ThemeContext;

export default ThemeButton;
