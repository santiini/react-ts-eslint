/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const name = 'createActions';

function createReducer<S, A extends {type: string}>(
  initialState: S,
  handlers: {
    [P in A['type']]?: A extends {type: P} ? (state: S, action: A) => S : never;
  }
) {
  return (state: S = initialState, action: A): S => {
    if (handlers.hasOwnProperty(action.type)) {
      return (handlers as any)[action.type](state, action);
    } else {
      return state;
    }
  };
}

type IActionTest1 =
  | {type: 'test1'}
  | {type: 'test2'; payload: string}
  | {type: 'test3'; payload: string[]}
  | {type: 'test4'; payload: {id: number; name: string}[]};

/**
 * 解析公共类型中的公共部分进行判断: 这里指 A extends { type: string } 中的 type
 * 1. 解析 Type 的集合: ITest1 中 Type 的总和，形成对象属性: [K in A['type]]
 * 2. 针对传入的具体类型 A, 通过判断 A extends { type: K } 判断是否是当前传入类型，
 *    解析到特定类型 A, 使得：[A.type]: (state, action) => S 中 A.type 和 action.type 的类型一致
 */
type IHandlers<S, A extends {type: string}> = {
  [K in A['type']]?: A extends {type: K} ? (state: S, action: A) => S : never;
};

interface ITestState {
  name: string;
  list: string[];
  ids: number[];
  data: {id: number; name: string}[];
}

const testState: ITestState = {
  name: '',
  list: [],
  ids: [],
  data: [],
};
const testHandlers: IHandlers<ITestState, IActionTest1> = {
  test1: (state = testState, action) => ({...state, name: 'test1'}),
  test2: (state = testState, action) => ({...state, name: action.payload}),
  test3: (state = testState, action) => ({
    ...state,
    name: 'test3',
    list: action.payload,
  }),
  test4: (state = testState, action) => ({
    ...state,
    name: 'test4',
    data: action.payload,
  }),
};
