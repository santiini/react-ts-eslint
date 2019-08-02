/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/**
 * object 类型的升级版
 */
export const name = 'map object';

/* knowledge */
// 1. keyof: For any type T, keyof T is the union of known, public property names of T
type IFunction = (...arg: any[]) => void | any;
type IEmptyFunction = () => void;

type IStringOrNumber = number | string;
type IPlatform = 'weibo' | 'wechat';
type IKeyType1 = 'weibo' | 1823;

type IKeyof1 = keyof 'keyof1';
type IKeyof2 = keyof 111;
type IKeyof3 = keyof number;
type IKeyof4 = keyof string;
type IKeyof5 = keyof number[];
type IKeyof6 = keyof {name: string; age: number};
type IKeyof7 = keyof {};
type IKeyof8 = keyof ITest1;
type IKeyof9 = keyof IPlatform;
type IKeyof10 = keyof IStringOrNumber; // 提取了 number, string 的公共方法
type IKeyof11 = keyof IKeyType1; // 提取了 number, string 的公共方法

/* 一、 利用 对象属性 获取其特定类型 */

/* demo1-1: 指定属性 */
type ITest1 =
  | {type: 'test1'}
  | {type: 'test2'; name: string}
  | {type: 'test3'; age: number}
  | {type: 'test4'; list: number[]};

/* 获取 */
type ITest1Keys = keyof ITest1;
type ITest1Types1 = ITest1[keyof ITest1];
type ITest1Types2 = ITest1['type'];

/* demo1-2 */
type ITest12 =
  | {id: number; type: 'test1'}
  | {id: number; type: 'test2'; name: string}
  | {id: number; type: 'test3'; age: number}
  | {id: number; type: 'test4'; list: number[]};

/* 获取 */
type ITest12Keys = keyof ITest12;
type ITest12Types1 = ITest12[keyof ITest12];
type ITest12Types2 = ITest12['type'];
type ITest12Types3 = ITest12['id'];

/* demo1-3 */
type ITest13 =
  | {id: 1; type: 'test1'}
  | {id: 2; type: 'test2'; name: string}
  | {id: 3; type: 'test3'; age: number}
  | {id: 4; type: 'test4'; list: number[]};

/* 获取 */
type ITest13Keys = keyof ITest13;
type ITest13Types1 = ITest13[keyof ITest13];
type ITest13Types2 = ITest13['type'];
type ITest13Types3 = ITest13['id'];

/* demo1-4 */
type ITest14<T> = {
  [K in keyof T]: T[K] extends (...arg: any[]) => void | any ? K : never;
}[keyof T];

/* ITest14 的拆解: 1.获取对象类型 */
type ITest142<T> = {[K in keyof T]: T[K] extends void ? never : K};

/* ITest14 的拆解: 2. keyof T 获取 T 的所有属性，进行遍历和筛选: T[K] extends void */
type ITest143<T> = {[K in keyof T]: T[K] extends void ? never : K}[keyof T];

const test14Data1 = {
  name: 'test1',
  age: 1,
  list: [11],
  update: (num: number) => num + 1,
};
type ITest14Type0 = typeof test14Data1;
type ITest14Type01 = keyof typeof test14Data1; // 获取 object 的所有属性名类型

/* 过滤 T 的属性: 1. {}[keyof T] 遍历属性
    2. { [K in keyof T]: ... ? never } 通过 never 过滤掉不符合条件的属性
*/
type ITest14Type1 = ITest14<typeof test14Data1>;
const test14Data2: Record<ITest14Type1, string> = {
  update: 'update',
};
type ITest14Type2 = ITest14Type1 | 'test';
const test14Data3: Pick<ITest14Type0, ITest14Type1> = {
  update: (num) => num + 10,
};
// const test14Data5: Pick<ITest14Type0, ITest14Type2> = {
//   update: num => num + 10,
// }

/**
 * tips: Pick<T, Exclude<keyof T, K>> 和 Pick<T, K> 的比较
 * 1. Pick<T, K> 实质上是 Pick<T, K extends keyof T> = { [P in K]: T[P] }
 * 2. Pick<T, Exclude<keyof T, K>> 则自由度更高
 */
const test14Data4: Pick<
  ITest14Type0,
  Extract<keyof ITest14Type0, ITest14Type2>
  // Extract<keyof ITest14Type0, ITest14Type1>
> = {
  update: (num) => num + 10,
};

/* 不过滤 T 的属性：获取结果 ITest143Type1 和 typeof ITest142Type1 结果一致 */
// tips: keyof T 无法过滤属相，只能通过 T[keyof T] 过滤
type ITest142Type1 = ITest142<typeof test14Data1>;
type ITest142Type2 = keyof ITest142<typeof test14Data1>;
type ITest143Type1 = ITest143<typeof test14Data1>;

/* demo1-5 */
function createReducerFunc<S, A extends {type: string}>(
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
