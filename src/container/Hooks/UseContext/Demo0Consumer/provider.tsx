import React, {ChangeEvent} from 'react';
import {ContextDemo1} from './context';

const {Provider} = ContextDemo1;

interface TodoProviderState {
  inputValue: string;
  list: string[];
}

/**
 * Provider 作为顶层组件用于提供数据
 *   1. 数据可以是字符串,数字, 甚至是函数
 *   2. 数据会存放在一个名为 value 的属性中
 */
class TodoProvider extends React.Component<{}, TodoProviderState> {
  // state 通过 Provider 的 value 属性注入到子组件中，覆盖默认的 React.createContext(demo1Context);
  public state: TodoProviderState = {
    inputValue: '111',
    list: [],
  };

  public handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({inputValue: e.target.value});
  };

  public handleClick = (): void => {
    this.setState(
      (prev): Pick<TodoProviderState, 'list'> => ({
        list: [...prev.list, prev.inputValue],
      })
    );
  };

  public handleDelete = (index: number): void => {
    this.setState(
      (prev): Pick<TodoProviderState, 'list'> => ({
        list: prev.list.filter((v, i): boolean => i !== index),
      })
    );
  };

  public render(): React.ReactElement {
    return (
      <div>
        <Provider
          value={{
            // state: this.state,
            ...this.state,
            handleChange: this.handleChange,
            handleClick: this.handleClick,
            handleDelete: this.handleDelete,
          }}
        >
          {this.props.children}
        </Provider>
      </div>
    );
  }
}

export default TodoProvider;
