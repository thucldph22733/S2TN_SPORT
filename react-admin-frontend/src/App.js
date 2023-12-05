import '~/assets/css/style.css';
import MainLayout from './layouts/MainLayout/MainLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import path_name from '~/core/constants/routers';
// pages
import Product from './pages/Products/Product';
import LogIn from './pages/Auth/LogIn';
import Order from './pages/Orders/Order';
import Address from './pages/Address/Address';
import AddAddress from './pages/Address/AddAddress';
import EditAddress from './pages/Address/EditAddress';
import Customer from './pages/Customer/Customer';
import Size from './pages/Products/Sizes';
import OderStatus from './pages/Orders/oderStatus';
import EditProduct from './pages/Products/EditProduct';
import AddProduct from './pages/Products/AddProduct';
import NewSell from './pages/Sell/NewSell';
import OrderStatus from './pages/Sell/OrderDetail';
import OrderDetail from './pages/Sell/OrderDetail';
import OrderView from './pages/Orders/orderView';

function App() {
    const router = createBrowserRouter([
        {
            path: path_name.login,
            element: <LogIn />,
        },
        {
            path: path_name.home,
            element: <MainLayout />,
            children: [
                {
                    path: path_name.newSell,
                    element: <NewSell />,
                },
                {
                    path: path_name.orderDetail + '/:id',
                    element: <OrderDetail />,
                },
                {
                    path: path_name.orderView + '/:id',
                    element: <OrderView />,
                },
                {
                    path: path_name.product,
                    element: <Product />,
                },
                {
                    path: path_name.addproduct,
                    element: <AddProduct />,
                },
                {
                    path: path_name.order,
                    element: <Order />,
                },
                {
                    path: path_name.address,
                    element: <Address />,
                },
                {
                    path: path_name.addaddress,
                    element: <AddAddress />,
                },
                {
                    path: path_name.editaddress + '/:id',
                    element: <EditAddress />,
                },
                {
                    path: path_name.customer,
                    element: <Customer />,
                },
                {
                    path: path_name.size,
                    element: <Size />,
                },
                {
                    path: path_name.orderstatus,
                    element: <OderStatus />,
                },
                {
                    path: path_name.editproduct + '/:id',
                    element: <EditProduct />,
                },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
