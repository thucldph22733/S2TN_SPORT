import '~/assets/css/style.css';
import MainLayout from './layouts/MainLayout/MainLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import path_name from '~/core/constants/routers';
// pages
import Sell from './pages/Sell/Sell';
import Product from './pages/Products/Product';
import LogIn from './pages/Auth/LogIn';
import Order from './pages/Orders/Order';
import Customer from './pages/Customers/Customer';
import Address from './pages/Address/Address';

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
                    path: path_name.customer,
                    element: <Customer />,
                },
                {
                    path: path_name.address,
                    element: <Address />,
                },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
