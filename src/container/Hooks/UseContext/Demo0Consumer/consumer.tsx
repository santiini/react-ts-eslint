import React from 'react';
import {ContextDemo1, DemoContext} from './context';
import TodoProvider from './provider';

const {Consumer} = ContextDemo1;

type SearchProps = Pick<
  DemoContext,
  'inputValue' | 'handleChange' | 'handleClick'
>;
const Search: React.FC<SearchProps> = (props) => (
  <div>
    <input
      value={props.inputValue}
      onChange={props.handleChange}
      style={{marginRight: 10}}
    />
    <button onClick={props.handleClick}>添加</button>
  </div>
);

type TodoListProps = Pick<DemoContext, 'handleDelete' | 'list'>;
const TodoList: React.FunctionComponent<TodoListProps> = (props) => {
  return (
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
};

/**
 * Consumer 作为消费组件用于订阅数据
 *   1. 它可以出现在组件树的任意位置
 *   2. Consumer 需要被包裹着 Provider 之中, 这是旧版本的 ContextApi
 */
export default class TodolistCousumer extends React.Component {
  public render(): React.ReactElement {
    return (
      <TodoProvider>
        <Consumer>
          {(context): React.ReactElement => (
            <div>
              <Search
                inputValue={context.inputValue}
                handleChange={context.handleChange}
                handleClick={context.handleClick}
              />
              <TodoList
                list={context.list}
                handleDelete={context.handleDelete}
              />
            </div>
          )}
        </Consumer>
      </TodoProvider>
    );
  }
}
