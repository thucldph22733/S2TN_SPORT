import '~/assets/css/style.css';
import MainLayout from './layouts/MainLayout/MainLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import path_name from '~/core/constants/routers';
// pages
import Sell from './pages/Sell/Sell';
import Product from './pages/Products/Product';
import LogIn from './pages/Auth/LogIn';
import Order from './pages/Orders/Order';
import Address from './pages/Address/Address';
import AddAddress from './pages/Address/AddAddress';
import EditAddress from './pages/Address/EditAddress';
import Customer from './pages/Customer/Customer';
import Size from './pages/Products/Sizes';
import OderStatus from './pages/Orders/oderStatus';

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
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
