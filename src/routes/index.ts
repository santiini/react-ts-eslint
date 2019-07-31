/**
 * 路由
 */
import {lazy} from 'react';

const Campaign = lazy(() => import('../container/Campaign'));
const Task = lazy(() => import('../container/Task'));
const Member = lazy(() => import('../container/Member'));

export const menuRoutes = [
  {
    name: '人员管理',
    icon: 'user',
    value: 'members',
    path: '/members',
    component: Member,
  },
  {
    name: '项目管理',
    icon: 'schedule',
    value: 'campaigns',
    path: '/campaigns',
    component: Campaign,
  },
  {
    name: '任务管理',
    value: 'tasks',
    path: '/tasks',
    icon: 'unordered-list',
    component: Task,
  },
];

export type routeType = (typeof menuRoutes)[number];
