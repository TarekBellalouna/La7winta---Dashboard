import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Coupon from './pages/Coupon';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
////////////////////////////// nour
import Event from './pages/Event';
import Brand from './pages/Brand';
import Blog from './pages/Blog';
import User from './pages/User';
import Comment from './pages/Comment';
import Rating from './pages/Rating';
import Category from './pages/Category';
import NotFound from './pages/Page404'; 
import Order from './pages/Order';
import Auction from './pages/Auction';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'brand', element: <Brand /> },
        { path: 'category', element: <Category /> },
        { path: 'comment', element: <Comment /> },
        { path: 'rating', element: <Rating /> },
        { path: 'coupons', element: <Coupon /> },
        { path: 'orders', element: <Order /> },
        { path: 'category', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'auction', element: <Auction /> },

        { path: 'event', element: <Event /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
