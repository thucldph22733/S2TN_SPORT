
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import path_name from '~/constants/routers';
// pages
import Sell from './pages/Sell/Sell';
import Product from './pages/Products/Product';
import Login from './pages/Auth/Login';
import Order from './pages/Orders/Order';
import Customer from './pages/Customers/Customer';
import ForgotPassword from './pages/Auth/ForgotPassword';
import { AuthProvider } from './components/AuthContext';
import MainLayout from './layouts/MainLayout';
import Voucher from './pages/Vouchers/Voucher';
import Employee from './pages/Employee/Employee';
import Brand from './pages/Products/Brand';
import Color from './pages/Products/Color';
import Error500 from './pages/Error/Error500';
import Category from './pages/Products/Category';
import Size from './pages/Products/Size';
import Material from './pages/Products/Material';
import Club from './pages/Products/Club';
import Supplier from './pages/Products/Supplier';
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
            // element: <AuthProvider/>,
            // children:[{
            path: path_name.dashboard,
            element: <MainLayout />,
            children: [
                {
                    path: path_name.sell,
                    element: <Sell />,
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
                    path: path_name.club,
                    element: <Club />,
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
                    path: path_name.order,
                    element: <Order />,
                },
                {
                    path: path_name.employee,
                    element: <Employee />,
                },
                {
                    path: path_name.customer,
                    element: <Customer />,
                },
                {
                    path: path_name.voucher,
                    element: <Voucher />,
                },
            ],
            // }]
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
