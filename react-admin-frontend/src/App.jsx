
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import path_name from '~/constants/routers';
// pages
import Login from './pages/Auth/Login';
import Order from './pages/Orders/Order';
import ForgotPassword from './pages/Auth/ForgotPassword';
import { AuthProvider } from './components/AuthContext';
import MainLayout from './layouts/MainLayout';
import Voucher from './pages/Vouchers/Voucher';
import Brand from './pages/Products/Brand';
import Color from './pages/Products/Color';
import Error500 from './pages/Error/Error500';
import Category from './pages/Products/Category';
import Size from './pages/Products/Size';
import Material from './pages/Products/Material';
import Supplier from './pages/Products/Supplier';
import Dashboard from './pages/Dashboard/Dashboard';
import User from './pages/User/User';
import Role from './pages/Role/Role';
import NewSell from './pages/Sell/NewSell';
import Error404 from './pages/Error/Error404';
import Error403 from './pages/Error/Error403';
import ChangePassword from './pages/Auth/ChangePassword';
import ProductDetail from './pages/Products/ProductDetail';
import Sell from './pages/Sell/Sell';
import OrderDetail from './pages/Orders/OrderDetail';
import Product from './pages/Products/Product';
function App() {

    const router = createBrowserRouter([
        {
            path: path_name.login,
            element: <Login />,
        },
        {
            path: path_name.forgot_password,
            element: <ForgotPassword />,
        },
        {
            path: '/500',
            element: <Error500 />,
        },
        {
            path: '/404',
            element: <Error404 />,
        },
        {
            path: '/403',
            element: <Error403 />,
        },
        {
            element: <MainLayout />,
            children: [
                {
                    path: path_name.dashboard,
                    element: <Dashboard />,
                },
                {
                    path: path_name.product,
                    element: <Product />,
                },
                {
                    path: path_name.brand,
                    element: <Brand />,
                },
                {
                    path: path_name.color,
                    element: <Color />,
                },
                {
                    path: path_name.category,
                    element: <Category />,
                },
                {
                    path: path_name.supplier,
                    element: <Supplier />,
                },
                {
                    path: path_name.size,
                    element: <Size />,
                },
                {
                    path: path_name.material,
                    element: <Material />,
                },
                {
                    path: path_name.newSell,
                    element: <NewSell />,
                },
                {
                    path: path_name.order,
                    element: <Order />,
                },
                {
                    path: path_name.user,
                    element: <User />,
                },
                {
                    path: path_name.role,
                    element: <Role />,
                },
                {
                    path: path_name.voucher,
                    element: <Voucher />,
                },
                {
                    path: path_name.sell + '/:id',
                    element: <Sell />,
                },
                {
                    path: path_name.order_detail + '/:id',
                    element: <OrderDetail />,
                },
                {
                    path: path_name.change_password,
                    element: <ChangePassword />,
                },
                {
                    path: 'p',
                    element: <ProductDetail />,
                },
            ],

        },
    ]);
    return <RouterProvider router={router} />;
    // <AuthProvider>

    // </AuthProvider>
}

export default App;
