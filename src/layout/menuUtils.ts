/**
 * 专用于 Menu 的方法
 */
import pathToRegexp from 'path-to-regexp';
import {MenuDataItem} from './MenuList';

interface MenuKeysData {
  selectedKeys: string[];
  openKeys: string[];
  current: string[];
}
/**
 *递归 menu 数组, 匹配 pathname, 返回 Menu 组件需要的 selectedKeys, openKeys
 */
export function getMenuKeysFromLocation(
  menu: MenuDataItem[] = [],
  pathname: string = '/',
  menuData: MenuKeysData = {selectedKeys: [], openKeys: [], current: []}
): MenuKeysData {
  return menu.reduce((prev, cur) => {
    // reset menuData.current
    // children
    if (!cur.children || !cur.children.length) {
      prev.selectedKeys =
        cur.path !== pathname
          ? prev.selectedKeys
          : [...prev.selectedKeys, cur.path];
      prev.current = cur.path !== pathname ? [] : [cur.path];
      return prev;
    }

    const result = getMenuKeysFromLocation(cur.children, pathname, prev);

    prev.openKeys = !result.current.length
      ? result.openKeys
      : [...result.openKeys, cur.path || cur.name];

    prev.current = [];
    return prev;
  }, menuData);
}

/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => {path,path2}
 * @param  menus
 */
export const getFlatMenuKeys = (menuData: MenuDataItem[] = []): string[] => {
  let keys: string[] = [];
  menuData.forEach((item) => {
    if (!item || !item.path) {
      return;
    }
    keys.push(item.path);
    if (item.children) {
      keys = keys.concat(getFlatMenuKeys(item.children));
    }
  });
  return keys;
};

// menuitem match
export const getMenuMatches = (
  flatMenuKeys: string[] = [],
  path: string
): string[] => {
  const ret = flatMenuKeys.filter((item) => {
    const reg = pathToRegexp(item);
    const result = reg.test(path);

    return item && result;
  });
  return ret;
};
