/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PanelLayoutImport } from './routes/panel/_layout'

// Create Virtual Routes

const PanelImport = createFileRoute('/panel')()
const IndexLazyImport = createFileRoute('/')()
const AuthLoginLazyImport = createFileRoute('/auth/login')()
const PanelLayoutIndexLazyImport = createFileRoute('/panel/_layout/')()
const PanelLayoutServersIndexLazyImport = createFileRoute(
  '/panel/_layout/servers/',
)()
const PanelLayoutServersAddLazyImport = createFileRoute(
  '/panel/_layout/servers/add',
)()

// Create/Update Routes

const PanelRoute = PanelImport.update({
  id: '/panel',
  path: '/panel',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const AuthLoginLazyRoute = AuthLoginLazyImport.update({
  id: '/auth/login',
  path: '/auth/login',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/auth/login.lazy').then((d) => d.Route))

const PanelLayoutRoute = PanelLayoutImport.update({
  id: '/_layout',
  getParentRoute: () => PanelRoute,
} as any)

const PanelLayoutIndexLazyRoute = PanelLayoutIndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => PanelLayoutRoute,
} as any).lazy(() =>
  import('./routes/panel/_layout/index.lazy').then((d) => d.Route),
)

const PanelLayoutServersIndexLazyRoute =
  PanelLayoutServersIndexLazyImport.update({
    id: '/servers/',
    path: '/servers/',
    getParentRoute: () => PanelLayoutRoute,
  } as any).lazy(() =>
    import('./routes/panel/_layout/servers/index.lazy').then((d) => d.Route),
  )

const PanelLayoutServersAddLazyRoute = PanelLayoutServersAddLazyImport.update({
  id: '/servers/add',
  path: '/servers/add',
  getParentRoute: () => PanelLayoutRoute,
} as any).lazy(() =>
  import('./routes/panel/_layout/servers/add.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/panel': {
      id: '/panel'
      path: '/panel'
      fullPath: '/panel'
      preLoaderRoute: typeof PanelImport
      parentRoute: typeof rootRoute
    }
    '/panel/_layout': {
      id: '/panel/_layout'
      path: '/panel'
      fullPath: '/panel'
      preLoaderRoute: typeof PanelLayoutImport
      parentRoute: typeof PanelRoute
    }
    '/auth/login': {
      id: '/auth/login'
      path: '/auth/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthLoginLazyImport
      parentRoute: typeof rootRoute
    }
    '/panel/_layout/': {
      id: '/panel/_layout/'
      path: '/'
      fullPath: '/panel/'
      preLoaderRoute: typeof PanelLayoutIndexLazyImport
      parentRoute: typeof PanelLayoutImport
    }
    '/panel/_layout/servers/add': {
      id: '/panel/_layout/servers/add'
      path: '/servers/add'
      fullPath: '/panel/servers/add'
      preLoaderRoute: typeof PanelLayoutServersAddLazyImport
      parentRoute: typeof PanelLayoutImport
    }
    '/panel/_layout/servers/': {
      id: '/panel/_layout/servers/'
      path: '/servers'
      fullPath: '/panel/servers'
      preLoaderRoute: typeof PanelLayoutServersIndexLazyImport
      parentRoute: typeof PanelLayoutImport
    }
  }
}

// Create and export the route tree

interface PanelLayoutRouteChildren {
  PanelLayoutIndexLazyRoute: typeof PanelLayoutIndexLazyRoute
  PanelLayoutServersAddLazyRoute: typeof PanelLayoutServersAddLazyRoute
  PanelLayoutServersIndexLazyRoute: typeof PanelLayoutServersIndexLazyRoute
}

const PanelLayoutRouteChildren: PanelLayoutRouteChildren = {
  PanelLayoutIndexLazyRoute: PanelLayoutIndexLazyRoute,
  PanelLayoutServersAddLazyRoute: PanelLayoutServersAddLazyRoute,
  PanelLayoutServersIndexLazyRoute: PanelLayoutServersIndexLazyRoute,
}

const PanelLayoutRouteWithChildren = PanelLayoutRoute._addFileChildren(
  PanelLayoutRouteChildren,
)

interface PanelRouteChildren {
  PanelLayoutRoute: typeof PanelLayoutRouteWithChildren
}

const PanelRouteChildren: PanelRouteChildren = {
  PanelLayoutRoute: PanelLayoutRouteWithChildren,
}

const PanelRouteWithChildren = PanelRoute._addFileChildren(PanelRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/panel': typeof PanelLayoutRouteWithChildren
  '/auth/login': typeof AuthLoginLazyRoute
  '/panel/': typeof PanelLayoutIndexLazyRoute
  '/panel/servers/add': typeof PanelLayoutServersAddLazyRoute
  '/panel/servers': typeof PanelLayoutServersIndexLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/panel': typeof PanelLayoutIndexLazyRoute
  '/auth/login': typeof AuthLoginLazyRoute
  '/panel/servers/add': typeof PanelLayoutServersAddLazyRoute
  '/panel/servers': typeof PanelLayoutServersIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/panel': typeof PanelRouteWithChildren
  '/panel/_layout': typeof PanelLayoutRouteWithChildren
  '/auth/login': typeof AuthLoginLazyRoute
  '/panel/_layout/': typeof PanelLayoutIndexLazyRoute
  '/panel/_layout/servers/add': typeof PanelLayoutServersAddLazyRoute
  '/panel/_layout/servers/': typeof PanelLayoutServersIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/panel'
    | '/auth/login'
    | '/panel/'
    | '/panel/servers/add'
    | '/panel/servers'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/panel' | '/auth/login' | '/panel/servers/add' | '/panel/servers'
  id:
    | '__root__'
    | '/'
    | '/panel'
    | '/panel/_layout'
    | '/auth/login'
    | '/panel/_layout/'
    | '/panel/_layout/servers/add'
    | '/panel/_layout/servers/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  PanelRoute: typeof PanelRouteWithChildren
  AuthLoginLazyRoute: typeof AuthLoginLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  PanelRoute: PanelRouteWithChildren,
  AuthLoginLazyRoute: AuthLoginLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/panel",
        "/auth/login"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/panel": {
      "filePath": "panel",
      "children": [
        "/panel/_layout"
      ]
    },
    "/panel/_layout": {
      "filePath": "panel/_layout.tsx",
      "parent": "/panel",
      "children": [
        "/panel/_layout/",
        "/panel/_layout/servers/add",
        "/panel/_layout/servers/"
      ]
    },
    "/auth/login": {
      "filePath": "auth/login.lazy.tsx"
    },
    "/panel/_layout/": {
      "filePath": "panel/_layout/index.lazy.tsx",
      "parent": "/panel/_layout"
    },
    "/panel/_layout/servers/add": {
      "filePath": "panel/_layout/servers/add.lazy.tsx",
      "parent": "/panel/_layout"
    },
    "/panel/_layout/servers/": {
      "filePath": "panel/_layout/servers/index.lazy.tsx",
      "parent": "/panel/_layout"
    }
  }
}
ROUTE_MANIFEST_END */