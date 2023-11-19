
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
