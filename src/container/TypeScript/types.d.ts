/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @types 库
 *   1. npm install @types/react -S 安装 js 库对应的类型声明
 *   2. 项目开发时，使用项目内的 .d.ts 作为类型声明文件
 */

// 变量声明
declare var foo: any;

declare var classNames: any;
declare var window: Window;
declare var ActiveXObject: any;

// global modules
declare module 'qs';
