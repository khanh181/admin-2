import routes from '.';
import type { IRoute } from './index';

/**
 *
 * Converts routes to a one-dimensional array
 * @param routeList routing
 * @param deep Whether it is a deep conversion
 * @param auth Whether the route needs to check authorization, the auth priority of the route configuration is higher than here
 */

export function flattenRoute(
  routeList: IRoute[],
  deep: boolean,
  auth: boolean,
): IRoute[] {
  const result: IRoute[] = [];

  for (let i = 0; i < routeList.length; i += 1) {
    const route = routeList[i];

    result.push({
      ...route,
      auth: typeof route.auth !== 'undefined' ? route.auth : auth,
    });

    if (route.children && deep) {
      result.push(...flattenRoute(route.children, deep, auth));
    }
  }

  return result;
}

function getLayoutRouteList(): IRoute[] {
  return flattenRoute(routes, false, false);
}

function getBusinessRouteList(): IRoute[] {
  const routeList = routes.filter((route) => route.path === '/');

  if (routeList.length > 0) {
    return flattenRoute(routeList, true, true);
  }
  return [];
}

function getSystemRouteList(): IRoute[] {
  const routeList = routes.filter((route) => route.path === '/system');

  if (routeList.length > 0) {
    return flattenRoute(routeList, true, false);
  }
  return [];
}

/**
 * All routes in the config are parsed into three arrays
 * The first: the outermost route, such as Layout UserLayout ...
 * Second: System routing, such as Login Register RegisterResult
 * The third: Service route, which is the business route under / route
 */

export const layoutRouteList = getLayoutRouteList();

export const businessRouteList = getBusinessRouteList();

export const systemRouteList = getSystemRouteList();

function findRoutesByPaths(
  pathList: string[],
  routeList: IRoute[],
  basename?: string,
): IRoute[] {
  return routeList.filter(
    (child: IRoute) => pathList.indexOf((basename || '') + child.path) !== -1,
  );
}

export function getPageTitle(routeList: IRoute[]): string {
  const route = routeList.find((child) => child.path === window.location.pathname);

  return route ? route.meta.title : '';
}

export function getPagePathList(pathname?: string): string[] {
  return (pathname || window.location.pathname)
    .split('/')
    .filter(Boolean)
    .map((value, index, array) => '/'.concat(array.slice(0, index + 1).join('/')));
}

/**
 * 只有业务路由会有面包屑
 */
export function getBreadcrumbs(): IRoute[] {
  return findRoutesByPaths(getPagePathList(), businessRouteList);
}
