import Category from '@pages/category/Category';
import Level from '@pages/level/Level';
import MyBookmark from '@pages/myBookmark/MyBookmark';
import Remind from '@pages/remind/Remind';
import { ROUTES_CONFIG } from '@routes/routesConfig';
import { createBrowserRouter } from 'react-router-dom';
import Layout from 'src/layout/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: ROUTES_CONFIG.remind.path,
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
    ],
  },
]);
