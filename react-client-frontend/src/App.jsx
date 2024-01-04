import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import path_name from './core/constants/routers';
import LogIn from './pages/Auth/LogIn';
import Register from './pages/Auth/Register';
import Product from './pages/Product/Product';
import About from './pages/About/About';
import Blog from './pages/Blog/Blog';
import Contact from './pages/Contact/Contact';
import MainLayout from './layouts/MainLayout/MainLayout';
import Home from './pages/Home/Home';
// import '~/assets/css/style.css';
import HomeLayout from './layouts/HomeLayout/HomeLayout';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart';
import Checkout from './pages/Checkout/Checkout';
import ProductDetail from './pages/Product/ProductDetail';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Order from './pages/Order/Order';
import Profile from './pages/Profile/Profile';
import Address from './pages/Profile/Address';
import ChangePassword from './pages/Auth/ChangePassword';
import User from './pages/Profile/User';
// import Image from './pages/Product/Image';
import OrderDetail from './pages/Order/OrderDetail';
import OrderSuccessMessage from './pages/Message/OrderSuccessMessage';
import PaymentSuccess from './pages/Message/PaymentSuccess';

function App() {
    const router = createBrowserRouter([
        {
            path: path_name.login,
            element: <LogIn />,
        },
        {
            path: path_name.register,
            element: <Register />,
        },
        {
            path: path_name.forgot_password,
            element: <ForgotPassword />,
        },
        {
            path: path_name.home,
            element: <HomeLayout />,
            children: [
                {
                    path: path_name.home,
                    element: <Home />,
                },
            ],
        },
        {
            path: path_name.home,
            element: <MainLayout />,
            children: [
                {
                    path: path_name.product,
                    element: <Product />,
                },
                {
                    path: path_name.show_bill_check + '/:id',
                    element: <OrderSuccessMessage />,
                },
                {
                    path: path_name.show_payment,
                    element: <PaymentSuccess />,
                },
                {
                    path: path_name.product_detail + '/:id',
                    element: <ProductDetail />,
                },
                {
                    path: path_name.about,
                    element: <About />,
                },
                {
                    path: path_name.blog,
                    element: <Blog />,
                },
                {
                    path: path_name.contact,
                    element: <Contact />,
                },
                {
                    path: path_name.shopping_cart,
                    element: <ShoppingCart />,
                },
                {
                    path: path_name.checkout,
                    element: <Checkout />,
                },
                {
                    path: '/',
                    element: <Profile />,
                    children: [
                        {
                            path: path_name.address,
                            element: <Address />,
                        },
                        {
                            path: path_name.change_password,
                            element: <ChangePassword />,
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
                            path: path_name.orderView + '/:id',
                            element: <OrderDetail />,
                        },
                    ],
                },
            ],
        },

    ]);
    return <RouterProvider router={router} />;
}

export default App;
