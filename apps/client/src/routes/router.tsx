import Remind from '@pages/remind/Remind';
import { ROUTES_CONFIG } from '@routes/routesConfig';
import { createBrowserRouter } from 'react-router-dom';
import Layout from 'src/layout/Layout';
import { lazy } from 'react';

const MyBookmark = lazy(() => import('@pages/myBookmark/MyBookmark'));
const Category = lazy(() => import('@pages/category/Category'));
const Level = lazy(() => import('@pages/level/Level'));
const OnBoarding = lazy(() => import('@pages/onBoarding/OnBoarding'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Remind />,
      },
      {
        path: ROUTES_CONFIG.myBookmarks.path,
        element: <MyBookmark />,
      },
      {
        path: ROUTES_CONFIG.category.path(':id'),
        element: <Category />,
      },
      {
        path: ROUTES_CONFIG.level.path,
        element: <Level />,
      },
      {
        path: ROUTES_CONFIG.onBoarding.path,
        element: <OnBoarding />,
      },
    ],
  },
]);
