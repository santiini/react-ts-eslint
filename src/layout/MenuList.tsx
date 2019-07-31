import React, {FC} from 'react';
import {Menu, Icon} from 'antd';
import {Link} from 'react-router-dom';

interface MenuListProps {
  list: {name: string; value: string; path: string}[];
  url: string;
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
          <Link to={`${props.url}${item.path}`}>
            <Icon type="user" />
            {item.name}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default MenuList;
