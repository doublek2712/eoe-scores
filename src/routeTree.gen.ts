/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as GuideImport } from './routes/guide'
import { Route as ContactImport } from './routes/contact'
import { Route as AdminImport } from './routes/admin'
import { Route as IndexImport } from './routes/index'
import { Route as TeamTeamIdIndexImport } from './routes/team/$teamId/index'

// Create/Update Routes

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const GuideRoute = GuideImport.update({
  id: '/guide',
  path: '/guide',
  getParentRoute: () => rootRoute,
} as any)

const ContactRoute = ContactImport.update({
  id: '/contact',
  path: '/contact',
  getParentRoute: () => rootRoute,
} as any)

const AdminRoute = AdminImport.update({
  id: '/admin',
  path: '/admin',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const TeamTeamIdIndexRoute = TeamTeamIdIndexImport.update({
  id: '/team/$teamId/',
  path: '/team/$teamId/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/admin': {
      id: '/admin'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof AdminImport
      parentRoute: typeof rootRoute
    }
    '/contact': {
      id: '/contact'
      path: '/contact'
      fullPath: '/contact'
      preLoaderRoute: typeof ContactImport
      parentRoute: typeof rootRoute
    }
    '/guide': {
      id: '/guide'
      path: '/guide'
      fullPath: '/guide'
      preLoaderRoute: typeof GuideImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/team/$teamId/': {
      id: '/team/$teamId/'
      path: '/team/$teamId'
      fullPath: '/team/$teamId'
      preLoaderRoute: typeof TeamTeamIdIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/admin': typeof AdminRoute
  '/contact': typeof ContactRoute
  '/guide': typeof GuideRoute
  '/login': typeof LoginRoute
  '/team/$teamId': typeof TeamTeamIdIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/admin': typeof AdminRoute
  '/contact': typeof ContactRoute
  '/guide': typeof GuideRoute
  '/login': typeof LoginRoute
  '/team/$teamId': typeof TeamTeamIdIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/admin': typeof AdminRoute
  '/contact': typeof ContactRoute
  '/guide': typeof GuideRoute
  '/login': typeof LoginRoute
  '/team/$teamId/': typeof TeamTeamIdIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/admin' | '/contact' | '/guide' | '/login' | '/team/$teamId'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/admin' | '/contact' | '/guide' | '/login' | '/team/$teamId'
  id:
    | '__root__'
    | '/'
    | '/admin'
    | '/contact'
    | '/guide'
    | '/login'
    | '/team/$teamId/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AdminRoute: typeof AdminRoute
  ContactRoute: typeof ContactRoute
  GuideRoute: typeof GuideRoute
  LoginRoute: typeof LoginRoute
  TeamTeamIdIndexRoute: typeof TeamTeamIdIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AdminRoute: AdminRoute,
  ContactRoute: ContactRoute,
  GuideRoute: GuideRoute,
  LoginRoute: LoginRoute,
  TeamTeamIdIndexRoute: TeamTeamIdIndexRoute,
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
        "/admin",
        "/contact",
        "/guide",
        "/login",
        "/team/$teamId/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/admin": {
      "filePath": "admin.tsx"
    },
    "/contact": {
      "filePath": "contact.tsx"
    },
    "/guide": {
      "filePath": "guide.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/team/$teamId/": {
      "filePath": "team/$teamId/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
