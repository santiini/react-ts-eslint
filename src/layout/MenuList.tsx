/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * MenuList
 *   1. children 可以嵌套菜单
 *   2. MenuList 组件自身维护 selectedKeys
 *   3. 组件自身维护 openKeys
 */
import React, {FC, useMemo, memo} from 'react';
import {Menu, Icon} from 'antd';
import {Link} from 'react-router-dom';
import {getMenuKeysFromLocation} from './menuUtils';

export interface MenuDataItem {
  name: string;
  path?: string;
  icon?: string;
  component?: React.ComponentType<any>;
  // children?: Omit<MenuDataItem, 'children'>;
  children?: MenuDataItem[];
}
interface MenuListProps {
  list: MenuDataItem[];
  url: string;
  collapsed?: boolean;
  pathname?: string;
  value?: string;
  onChange?: (value: string) => void;
}
const MenuList: FC<MenuListProps> = (props) => {
  const {list = []} = props;
  // menuItem
  function renderMenuItem(arr: MenuDataItem[]): React.ReactNodeArray {
    return arr.map((item) => renderSubMenuOrItem(item)).filter((item) => item);
  }

  // subOrItem
  function renderSubMenuOrItem(item: MenuDataItem): React.ReactNode {
    if (
      Array.isArray(item.children) &&
      item.children.some((child) => !!child.path)
    ) {
      return (
        <Menu.SubMenu
          title={
            item.icon ? (
              <span>
                <Icon type={item.icon} />
                {item.name}
              </span>
            ) : (
              item.name
            )
          }
          key={item.path || item.name}
        >
          {renderMenuItem(item.children)}
        </Menu.SubMenu>
      );
    }
    return (
      <Menu.Item key={item.path}>
        <Link to={`${props.url}${item.path}`}>
          <Icon type={item.icon} />
          {item.name}
        </Link>
      </Menu.Item>
    );
  }

  /* 缓存，只计算一次 */
  const menuRet = useMemo(() => {
    const result = getMenuKeysFromLocation(list, props.pathname);

    return result;
  }, []);

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultOpenKeys={menuRet.openKeys}
      defaultSelectedKeys={menuRet.selectedKeys}
    >
      {renderMenuItem(list)}
    </Menu>
  );
};

export default memo(MenuList);
