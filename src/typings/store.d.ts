/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * store 相关
 */
declare module 'StoreComponent' {
  import {AxiosPromise} from 'axios';

  export type ErrorData = string;

  interface AxiosRequest<P = any, R = any> {
    (params: P): AxiosPromise<R>;
  }

  export interface FormatResponseOpt<T> {
    data: T[];
    total: number;
  }

  // type AxiosListRequest<P = any, T = any> = AxiosRequest<P, T[]>;
  type AxiosListRequest<P = any, T = any> = AxiosRequest<
    P,
    FormatResponseOpt<T>
  >;
}
