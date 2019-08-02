/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
export const name = 'function-overload';

interface User {
  name: string;
  age: number;
}

function testFunc1(para: User): number;
function testFunc1(para: number, flag: boolean): number;
function testFunc1(para: any, flag?: any): number {
  if (!flag) return 1111111;
  return typeof para === 'number' ? 22222 : 3333;
}

const user = {
  name: 'Jack',
  age: 666,
};

// bingo
// Error: 参数不匹配
// const res = test(user, false)

// overloaded functions
function sum(x: number, y: number): number;
function sum(x: string, y: string, z: string): string;
// the combined implementation
function sum(x: any, y: any, z?: any): any {
  if (typeof z === 'undefined') {
    return x + y;
  } else {
    return x + y + z;
  }
}

const n = sum(1, 2);
const m = sum('1', '2', '33');
