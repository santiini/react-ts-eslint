/**
 * 项目判断
 */
import React from 'react';

// React Component 组件的判断
export const isComponentClass = (
  component: React.ComponentClass | React.ReactNode
): boolean => {
  if (!component) return false;
  const proto = Object.getPrototypeOf(component);
  if (proto === React.Component || proto === Function.prototype) return true;
  return isComponentClass(proto);
};
