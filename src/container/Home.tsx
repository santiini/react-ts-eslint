import React, {FC, useState, Suspense} from 'react';
import {Layout} from 'antd';
import styled from '@emotion/styled';
import {NamedRouteComponentProps} from 'RouteComponent';
import logo from '../asserts/images/logo.svg';
import collapsedLogo from '../asserts/images/logo.png';
import MenuList from '../layout/MenuList';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import {menuRoutes} from '../routes';
import {NamedRoute} from '../lib/Route';
import {Redirect, Switch} from 'react-router-dom';

const {Sider, Content} = Layout;

const LogoWrapper = styled.div`
  height: 50px;
  display: flex;
  align-items: center;

  img {
    margin: 0 6px 0 16px;
    height: 32px;
    border-radius: 6px;
    vertical-align: middle;
  }

  span {
    display: inline-block;
    color: rgb(104, 160, 29);
    font-size: 16px;
    position: absolute;
    top: 13px;
  }
`;

interface HomeProps extends NamedRouteComponentProps {
  name?: string;
}
const Home: FC<HomeProps> = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{height: '100%', width: '100%'}}>
      <Sider trigger={null} collapsible={true} collapsed={collapsed}>
        <LogoWrapper>
          <img src={collapsed ? collapsedLogo : logo} alt="KOL Admin" />
        </LogoWrapper>
        <MenuList
          url={props.match.url}
          list={menuRoutes}
          defaultValue={menuRoutes[0] && menuRoutes[0].value}
        />
      </Sider>

      <Layout>
        <Header
          collapsed={collapsed}
          onToggleCollapsed={setCollapsed}
          style={{
            height: 64,
            flex: '0 0 auto',
          }}
        />
        <Content
          style={{margin: 24, flex: 'auto', paddingTop: 0, minHeight: 0}}
        >
          {menuRoutes.length > 0 && (
            <Suspense fallback={<div>loading...</div>}>
              <Switch>
                {menuRoutes.map((item) => (
                  <NamedRoute
                    key={item.name}
                    path={`${props.match.path}${item.path}`}
                    component={item.component}
                  />
                ))}
                <Redirect
                  from="*"
                  to={`${props.match.url}${menuRoutes[0].path}`}
                />
              </Switch>
            </Suspense>
          )}
        </Content>
        <Footer style={{padding: 0, flex: '0 0 auto'}} />
      </Layout>
    </Layout>
  );
};

export default Home;
