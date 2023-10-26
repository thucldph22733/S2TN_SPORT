import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import path_name from './core/constants/routers';
import LogIn from './pages/Auth/LogIn';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Product from './pages/Product/Product';
import About from './pages/About/About';
import Blog from './pages/Blog/Blog';
import Contact from './pages/Contact/Contact';
import MainLayout from './layouts/MainLayout/MainLayout';
import Home from './pages/Home/Home';
import SliderLayout from './layouts/SliderLayout/SliderLayout';
import '~/assets/css/style.css';

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
            element: <SliderLayout />,
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
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
