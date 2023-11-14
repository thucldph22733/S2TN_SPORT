import '~/assets/css/style.css';
import MainLayout from './layouts/MainLayout/MainLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import path_name from '~/constants/routers';
// pages
import Sell from './pages/Sell/Sell';
import Product from './pages/Products/Product';
import Login from './pages/Auth/Login';
import Order from './pages/Orders/Order';
import Address from './pages/Address/Address';
import AddAddress from './pages/Address/AddAddress';
import EditAddress from './pages/Address/EditAddress';
import Customer from './pages/Customer/Customer';
import EditCustomer from './pages/Customer/EditCustomer';
import AddCustomer from './pages/Customer/AddCustomer';
import Size from './pages/Products/Sizes';
import EditProduct from './pages/Products/EditProduct';
import AddProduct from './pages/Products/AddProduct';
import ForgotPassword from './pages/Auth/ForgotPassword';
import PrivateRoute from './layouts/PrivateRoute';

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
            element: <PrivateRoute/>,
            children:[{
            path: path_name.home,
            element: <MainLayout />,
            children: [
                {
                    path: path_name.sell,
                    element: <Sell />,
                },
                // {
                //     path: path_name.product,
                //     element: <Product />,
                // },
                // {
                //     path: path_name.addproduct,
                //     element: <AddProduct />,
                // },
                // {
                //     path: path_name.order,
                //     element: <Order />,
                // },
                // {
                //     path: path_name.address,
                //     element: <Address />,
                // },
                // {
                //     path: path_name.addaddress,
                //     element: <AddAddress />,
                // },
                // {
                //     path: path_name.editaddress + '/:id',
                //     element: <EditAddress />,
                // },
                // {
                //     path: path_name.customer,
                //     element: <Customer />,
                // },
                // {
                //     path: path_name.addcustomer,
                //     element: <AddCustomer />,
                // },
                // {
                //     path: path_name.size,
                //     element: <Size />,
                // },
                // {
                //     path: path_name.editcustomer + '/:id',
                //     element: <EditCustomer />,
                // },
                // {
                //     path: path_name.editproduct + '/:id',
                //     element: <EditProduct />,
                // },
            ],}]
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
