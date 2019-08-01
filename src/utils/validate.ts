/**
 * 项目判断
 */
import React from 'react';
import {IAppPlatforms} from 'KolPlatforms';
import {appPlatforms} from '../config/platform';

// React Component 组件的判断
export const isComponentClass = (
  component: React.ComponentClass | React.ReactNode
): boolean => {
  if (!component) return false;
  const proto = Object.getPrototypeOf(component);
  if (proto === React.Component || proto === Function.prototype) return true;
  return isComponentClass(proto);
};

// 平台验证
export function isAppPlatform(platform: string): platform is IAppPlatforms {
  return appPlatforms.includes(platform as IAppPlatforms);
}
