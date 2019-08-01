/**
 * 带有 Header 的 Content, CSS 和 结构有调整
 */
import React, {FC} from 'react';
import {GridContainer} from './GridContent';
import {PageHeader} from 'antd';
import {BreadcrumbProps} from 'antd/lib/breadcrumb';
import {Link} from 'react-router-dom';
import {useRouteContext} from '../store/RouteContext';

interface PageHeaderWrapperProps {
  title?: string;
  routes?: BreadcrumbProps['routes'];
  pageHeaderRender?: (props: PageHeaderWrapperProps) => React.ReactNode;
}

// header 的默认渲染和自定义渲染
const PageWrappedHeader: FC<PageHeaderWrapperProps> = (props) => {
  const routeContext = useRouteContext();
  if (props.pageHeaderRender) {
    return <>{props.pageHeaderRender({...props, ...routeContext})}</>;
  }
  // routes 是一种递进的关系
  // const routes = [
  //   {path: '/tasks', breadcrumbName: '项目管理'},
  //   {path: '/detail', breadcrumbName: '项目详情'},
  // ];

  // 使用 browserHistory 时，需要自定义 itemRender
  const itemRender: BreadcrumbProps['itemRender'] = (
    route,
    params,
    routes,
    paths
  ) => {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link to={paths.join('')}>{route.breadcrumbName}</Link>
    );
  };

  return (
    <PageHeader
      title={props.title}
      breadcrumb={{
        ...routeContext.breadcrumb,
        itemRender,
      }}
    />
  );
};

// 有 Header， CSS 发生变化
const PageHeaderWrapper: FC<PageHeaderWrapperProps> = (props) => {
  return (
    <div style={{margin: '-24px -24px 0'}}>
      <GridContainer>
        <PageWrappedHeader {...props} />
      </GridContainer>
      <GridContainer>
        <div style={{margin: '24px 24px 0'}}>{props.children}</div>
      </GridContainer>
    </div>
  );
};

export default PageHeaderWrapper;
