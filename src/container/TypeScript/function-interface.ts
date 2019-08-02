/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
export const name = '可调用的类型注解';

/**
 * type 类型别名,
 *   1. 箭头函数表示函数
 *   2. 无法函数重载
 */
type Func1 = (str: string) => string;

/* interface 表示函数 */
interface Func2 {
  (num: number): number;
}

/* interface 多种调用签名，表示函数重载 */
interface Func3 {
  (foo: string): string;
  (foo: number): number;
  (foo: number, bar: number): number;
  (foo: string, bar: string): string;
}

/* interface 表示可实例化，class 的 constructor */
class Person {
  public sayHi(str: string): void {}
}

interface PersonInterface {
  // new (name: string, age: number): Person;

  goHome(time: number): void;
}

class NewPerson implements PersonInterface {
  private _name = '';
  private _age = 10;

  public constructor(name: string, age: number) {
    console.log('constructor');
  }

  public printName(): void {
    console.log(this._name);
  }
  public printAge(): void {
    console.log(this._age);
  }

  public goHome(time: number): void {
    console.log('goHomt');
  }
}
