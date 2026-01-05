import Category from '@pages/category/Category';
import Level from '@pages/level/Level';
import Login from '@pages/login/Login';
import MyBookmark from '@pages/myBookmark/MyBookmark';
import GoogleCallback from '@pages/onBoarding/GoogleCallback';
import OnBoarding from '@pages/onBoarding/OnBoarding';
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
      {
        path: ROUTES_CONFIG.onBoarding.path,
        element: <OnBoarding />,
      },
      {
        path: ROUTES_CONFIG.onBoardingCallback.path,
        element: <GoogleCallback />,
      },
      {
        path: ROUTES_CONFIG.login.path,
        element: <Login />,
      },
    ],
  },
]);
