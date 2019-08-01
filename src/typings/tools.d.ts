/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * type tools
 */
declare module 'TypeTools' {
  export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
}
