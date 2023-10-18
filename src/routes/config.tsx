import React from 'react';

import BasicLayout from '@/layouts/BasicLayout';
import UserLayout from '@/layouts/UserLayout';
import Redirect from '@/pages/Redirect';
export interface IRouteConfig {
  // Routing path
  path: string;
  // Routing components
  component?: any;
  //  302 Jump
  redirect?: string;
  exact?: boolean;
  //  Routing information
  title: string;
  icon?: string;
  //Whether to validate the permission, false is not verified, the attribute does not exist, or true is checked, the child route will inherit the auth attribute of the parent route
  auth?: boolean;
  routes?: IRouteConfig[];
}

const layouts: IRouteConfig[] = [
  {
    path: '/',
    title: '/',
    exact: true,
    component: Redirect,
  },
  {
    path: '/sys',
    component: BasicLayout,
    title: 'System routing',
    // exact: true,
    routes: [
      {
        path: '/sys/home',
        title: 'Home',
        icon: 'home',
        component: React.lazy(() => import('@/pages/Home')),
      },
      {
        path: '/sys/about',
        title: 'concerning',
        icon: 'home',
        component: React.lazy(() => import('@/pages/About')),
      },
    ],
  },
  {
    path: '/user',
    component: UserLayout,
    title: 'User routes',
    redirect: '/user/login',
    routes: [
      {
        path: '/user/login',
        component: React.lazy(() => import('@/pages/User/Login')),
        title: 'login',
      },
      {
        path: '/user/register',
        component: React.lazy(() => import('@/pages/User/Register')),
        title: 'register',
      },
    ],
  },
  {
    path: '/noFond',
    title: 'noFond',
    component: React.lazy(() => import('@/pages/NoFond')),
  },
];

export default layouts;
