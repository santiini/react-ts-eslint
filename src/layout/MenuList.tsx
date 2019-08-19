/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * MenuList
 *   1. children 可以嵌套菜单
 *   2. MenuList 组件自身维护 selectedKeys
 *   3. 组件自身维护 openKeys
 *   4. 组件自身维护 selectedKeys
 */
import React, {FC, memo, useState, useEffect, useRef} from 'react';
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
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  // 控制 seleckedKeys 的变化类型： 内部触发 or 外部引起
  const selectChangeType = useRef<'inner' | 'outter'>();
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
                <span>{item.name}</span>
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
          <span>{item.name}</span>
        </Link>
      </Menu.Item>
    );
  }

  /* 缓存，只计算一次 */
  useEffect((): void => {
    if (selectChangeType.current === 'inner') {
      selectChangeType.current = undefined;
      return;
    }
    const result = getMenuKeysFromLocation(props.list, props.pathname);

    selectChangeType.current = 'outter';
    setOpenKeys(result.openKeys);
    setSelectedKeys(result.selectedKeys);
  }, [props.pathname]);

  // change select
  const handleMenuSelect = ({key}: {key: string}): void => {
    selectChangeType.current = 'inner';
    setSelectedKeys([key]);
  };

  // change open
  const handleOpenChange = (openKeys: string[]): void => {
    setOpenKeys(openKeys);
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      onSelect={handleMenuSelect}
      onOpenChange={handleOpenChange}
    >
      {renderMenuItem(list)}
    </Menu>
  );
};

export default memo(MenuList);
