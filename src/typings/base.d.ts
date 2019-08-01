/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 项目相关的类型设置
 */
declare module 'ProjectBasic' {
  export interface TableParams {
    startIndex: number;
    maxResults: number;
    sort: string;
    filter: Record<string, string[]>;
  }

  export interface QueryTableParams {
    startIndex: number;
    maxResults: number;
    sort: string;
  }
}
