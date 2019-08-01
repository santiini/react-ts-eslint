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

// 嵌套的 MenuList，无法作为 Route 来遍历
export const menuList: MenuDataItem[] = [
  {
    name: '人员管理',
    icon: 'user',
    path: '/members',
    component: Member,
  },
  {
    name: '项目管理',
    icon: 'schedule',
    children: [
      {
        name: '项目列表',
        icon: 'schedule',
        path: '/campaigns/list',
        component: Campaign,
      },
      {
        name: '项目详情',
        icon: 'schedule',
        path: '/campaigns/detail',
        component: CampaignDetail,
      },
      {
        name: '项目分析',
        icon: 'schedule',
        path: '/campaigns/analysis',
        component: CampaignAnalysis,
      },
    ],
  },
  {
    name: '任务管理',
    path: '/tasks',
    icon: 'unordered-list',
    component: Task,
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
