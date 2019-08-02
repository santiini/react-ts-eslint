import React from 'react';
import {ContextDemo1, DemoContext} from './context';
import TodoProvider from './provider';

// const {Consumer} = ContextDemo1;

const Search: React.FC<
  Pick<DemoContext, 'inputValue' | 'handleChange' | 'handleClick'>
> = (props) => (
  <div>
    <input
      value={props.inputValue}
      onChange={props.handleChange}
      style={{marginRight: 10}}
    />
    <button onClick={props.handleClick}>添加</button>
  </div>
);

const TodoList: React.FC<Pick<DemoContext, 'list' | 'handleDelete'>> = (
  props
) => (
  <div>
    {props.list.map(
      (item, index): React.ReactElement => {
        return (
          <li
            onClick={(): void => {
              props.handleDelete && props.handleDelete(index);
            }}
            key={index}
          >
            {item}
          </li>
        );
      }
    )}
  </div>
);

/**
 * 在16.8.6之后, React又提供了contextType Api用于支持Context,
 *   1. 通过this.context的形式消费数据, 这是新版本的 ContextApi
 *   2. 通过contextType, 可以在组件的任意位置进行调用(包括生命周期函数内)
 *   3. 新版本的 ContextApi, Provider 中无需包含 Consumer，
 *      可以直接使用 this.context, 通过 contextType 注入 ContextDemo1
 */
class TodolistCousumer1 extends React.Component {
  // contextType 可以通过 React.createContext(initialState) 创建
  public static contextType = ContextDemo1;

  public context!: React.ContextType<typeof ContextDemo1>;

  public render(): React.ReactElement | null {
    console.warn(this.context);

    if (!this.context.list) return null;
    return (
      // <TodoProvider>
      <div>
        <Search
          inputValue={this.context.inputValue}
          handleChange={this.context.handleChange}
          handleClick={this.context.handleClick}
        />
        <TodoList
          list={this.context.list}
          handleDelete={this.context.handleDelete}
        />
      </div>
      // </TodoProvider>
    );
  }
}

// TodolistCousumer.contextType = ContextDemo1;

const ProviderContainer: React.FC = (props) => {
  return (
    <TodoProvider>
      <TodolistCousumer1 />
    </TodoProvider>
  );
};

export default ProviderContainer;
