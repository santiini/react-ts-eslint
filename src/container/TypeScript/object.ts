/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 结构化解析
 *   1. 符合必要的参数，多余的参数可以忽略
 */
export const name = '结构化解析';
interface Point2D {
  x: number;
  y: number;
}

const point2D: Point2D = {x: 0, y: 10};
const point3D = {x: 0, y: 10, z: 20};
function iTakePoint2D(point: Point2D): void {
  /* do something */
}

iTakePoint2D(point2D); // ok, 完全匹配
iTakePoint2D(point3D); // 额外的信息，没关系
// iTakePoint2D({x: 0}); // Error: 没有 'y'

type FnParam = (err: Error, data: any) => void;
const iTakeSomethingAndPassItAnErr = (x: FnParam): void => {
  /* 做一些其他的 */
};

iTakeSomethingAndPassItAnErr(() => null); // ok
iTakeSomethingAndPassItAnErr((err) => null); // ok
iTakeSomethingAndPassItAnErr((err, data) => null); // ok

// Error: 参数类型 `(err: any, data: any, more: any) => null` 不能赋值给参数类型 `(err: Error, data: any) => void`
// iTakeSomethingAndPassItAnErr((err, data, more) => null);
