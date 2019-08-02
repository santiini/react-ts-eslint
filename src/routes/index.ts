/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 路由
 */
import {lazy} from 'react';
import {MenuDataItem} from '../layout/MenuList';

const Campaign = lazy(() => import('../container/Campaign/List'));
const CampaignDetail = lazy(() =>
  import('../container/Campaign/CampaignDetail')
);
const CampaignAnalysis = lazy(() =>
  import('../container/Campaign/CampaignAnalysis')
);
const Task = lazy(() => import('../container/Task'));
const Member = lazy(() => import('../container/Member'));
const UseStateDeno = lazy(() => import('../container/Hooks/UseState'));
const UseEffectDemo = lazy(() => import('../container/Hooks/UseEffect'));
const UseMemoDemo = lazy(() => import('../container/Hooks/UseMemo'));
const UseRefDemo = lazy(() => import('../container/Hooks/UseRef'));
const UseLayoutDemo = lazy(() => import('../container/Hooks/UseLayout'));
const UserContextDemo = lazy(() =>
  import('../container/Hooks/UseContext/Demo7')
);

// 嵌套的 MenuList，无法作为 Route 来遍历
export const menuList: MenuDataItem[] = [
  {
    name: '环境构建',
    icon: 'user',
    path: '/members',
    component: Member,
  },
  {
    name: '类型学习',
    icon: 'schedule',
    children: [
      {
        name: '基础类型',
        icon: 'basetype',
        path: '/campaigns/list',
        component: Campaign,
      },
      {
        name: '接口',
        icon: 'schedule',
        path: '/interface',
        component: CampaignDetail,
      },
      {
        name: '泛型',
        icon: 'schedule',
        path: '/generic',
        component: CampaignAnalysis,
      },
    ],
  },
  {
    name: '函数相关',
    path: '/function',
    icon: 'unordered-list',
    component: Task,
  },
  {
    name: 'Class 相关',
    path: '/class',
    icon: 'unordered-list',
    component: Task,
  },
  {
    name: 'React Hooks',
    path: '/hook',
    icon: 'unordered-list',
    children: [
      {
        name: 'useState',
        path: '/useState',
        icon: 'unordered-list',
        component: UseStateDeno,
      },
      {
        name: 'useEffect',
        path: '/useEffect',
        icon: 'unordered-list',
        component: UseEffectDemo,
      },
      {
        name: 'useMemo',
        path: '/useMemo',
        icon: 'unordered-list',
        component: UseMemoDemo,
      },
      {
        name: 'useRef',
        path: '/useRef',
        icon: 'unordered-list',
        component: UseRefDemo,
      },
      {
        name: 'useLayout',
        path: '/useLayout',
        icon: 'unordered-list',
        component: UseLayoutDemo,
      },
      {
        name: 'userContext',
        path: '/userContext',
        icon: 'unordered-list',
        component: UserContextDemo,
      },
    ],
  },
];

interface MenuRoute {
  name: string;
  path: string;
  component: React.ComponentType<any>;
}
// 递归 menuList，获取 menuRoutes 数组, 过滤掉非组件项
function convertToMenuRoutes(
  menus: MenuDataItem[],
  results: MenuRoute[] = []
): MenuRoute[] {
  const result = menus.reduce<MenuRoute[]>((prev, cur) => {
    if (!cur.children) {
      return !cur.component || !cur.path
        ? prev
        : [
            ...prev,
            {
              name: cur.name,
              component: cur.component,
              path: cur.path,
            },
          ];
    }

    return convertToMenuRoutes(cur.children, prev);
  }, results);

  return result;
}

export const menuRoutes = convertToMenuRoutes(menuList);
