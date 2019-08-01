/**
 * RouteContext
 */
import {createContext, useContext} from 'react';
import {BreadcrumbProps as AntdBreadcrumbProps} from 'antd/lib/breadcrumb';

export type BreadcrumbListReturn = Pick<
  AntdBreadcrumbProps,
  Extract<keyof AntdBreadcrumbProps, 'routes' | 'itemRender'>
>;

interface RouteContextProps {
  breadcrumb?: BreadcrumbListReturn;
  pathname?: string;
}

export const RouteContext = createContext<RouteContextProps>({});

export const useRouteContext = (): RouteContextProps =>
  useContext(RouteContext);
