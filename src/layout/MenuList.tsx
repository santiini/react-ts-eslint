import React, {FC} from 'react';
import {Menu, Icon} from 'antd';

interface MenuListProps {
  list: {name: string; value: string}[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
}
const MenuList: FC<MenuListProps> = (props) => {
  const {list = [], defaultValue = ''} = props;
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={[defaultValue]}>
      {list.map((item) => (
        <Menu.Item key={item.value}>
          <Icon type="user" />
          <span>{item.name}</span>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default MenuList;
