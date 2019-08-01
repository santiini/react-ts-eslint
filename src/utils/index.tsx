/**
 * utils
 */
import React from 'react';
import {MenuDataItem} from '../layout/MenuList';
import {BreadcrumbProps as AntdBreadcrumbProps} from 'antd/lib/breadcrumb';
import {RouteProps} from 'react-router';
import {BreadcrumbListReturn} from '../store/RouteContext';

export function urlToList(url?: string): string[] {
  if (!url || url === '/') {
    return ['/'];
  }
  const urlList = url.split('/').filter((i) => i);
  return urlList.map(
    (urlItem, index) => `/${urlList.slice(0, index + 1).join('/')}`
  );
}

export interface BreadcrumbProps {
  breadcrumbList?: {title: string; href: string}[];
  home?: string;
  location?: RouteProps['location'] | {pathname?: string};
  breadcrumb?: {[path: string]: MenuDataItem};
  breadcrumbRender?: (
    routers: AntdBreadcrumbProps['routes']
  ) => AntdBreadcrumbProps['routes'];
  itemRender?: AntdBreadcrumbProps['itemRender'];
}
/**
 * 获取面包屑映射
 * @param MenuDataItem[] menuData 菜单配置
 */
export const getBreadcrumbNameMap = (
  menuData: MenuDataItem[],
  rootRoute: MenuDataItem
): Record<string, MenuDataItem> => {
  const routerMap: Record<string, MenuDataItem> = {
    [rootRoute.path || '']: rootRoute,
  };
  const flattenMenuData: (data: MenuDataItem[]) => void = (data) => {
    data.forEach((menuItem) => {
      if (!menuItem) {
        return;
      }
      if (menuItem && menuItem.children) {
        flattenMenuData(menuItem.children);
      }
      const appPath = `${rootRoute.path}${menuItem.path}`;
      // Reduce memory usage
      routerMap[appPath] = menuItem;
    });
  };
  flattenMenuData(menuData);
  return routerMap;
};

// generate PageHeader bread with props
export function conversionFromProps(
  props: BreadcrumbProps
): AntdBreadcrumbProps['routes'] {
  const {breadcrumbList = []} = props;

  return breadcrumbList.map((item) => ({
    path: item.href,
    breadcrumbName: item.title,
  }));
}

// converte the url to an array
export function conversionFromLocation(
  routerLocation: BreadcrumbProps['location'] = {pathname: '/'},
  breadcrumb: {[path: string]: MenuDataItem},
  props: BreadcrumbProps
): AntdBreadcrumbProps['routes'] {
  if (!routerLocation) {
    return [];
  }
  const pathSnippets = urlToList(routerLocation.pathname);

  // path to breadcrumbitmes
  const extraBreadcrumbItems = pathSnippets
    .map((url) => {
      const currentBreadcrumb = breadcrumb[url];
      return !!currentBreadcrumb
        ? {
            path: url,
            breadcrumbName: currentBreadcrumb.name,
            value: currentBreadcrumb.path,
          }
        : {
            path: '',
            breadcrumbName: '',
            value: '',
          };
    })
    .filter((item) => item && item.path);

  return extraBreadcrumbItems;
}

function getRouteArray(props: BreadcrumbProps): AntdBreadcrumbProps['routes'] {
  const {location} = props;
  if (props.breadcrumbList && !!props.breadcrumbList.length) {
    return conversionFromProps(props);
  }
  if (location && location.pathname && props.breadcrumb) {
    return conversionFromLocation(location, props.breadcrumb, props);
  }
  return [];
}

function defaultItemRender(): AntdBreadcrumbProps['itemRender'] {
  return ({breadcrumbName, path}): React.ReactNode => (
    <a href={path}>{breadcrumbName}</a>
  );
}

/**
 *  构建 BreadcurmbProps
 *    1. 拆分 pathname, 匹配 menuMap, 获取 breadcrumb 组件参数
 */
export function getBreadcrumbProps(
  props: BreadcrumbProps
): BreadcrumbListReturn {
  const {breadcrumbRender} = props;

  const routeArray = getRouteArray(props);

  const itemRender = props.itemRender || defaultItemRender;

  let routes = routeArray;

  if (breadcrumbRender) {
    routes = breadcrumbRender(routes) || [];
  }
  if (routes && routes.length < 2) {
    routes = undefined;
  }
  return {
    routes,
    itemRender: itemRender,
  };
}
