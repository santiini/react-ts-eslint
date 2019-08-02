import React, {ChangeEvent} from 'react';

export interface DemoContext {
  inputValue: string;
  list: string[];
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClick?: () => void;
  handleDelete?: (input: number) => void;
}
const demo1Context: DemoContext = {
  inputValue: 'Context Api test',
  list: ['test1', 'test2', 'test3', 'test4'],
};

/* React.createContext 初始化一个 Context */
export const ContextDemo1 = React.createContext(demo1Context);
