import config from '~/config';

// Layouts
import { SliderLayout } from '~/layouts';

// Pages
import Home from '~/pages/Home/Home';
import Product from '~/pages/Product/Product';
import About from '~/pages/About/About';
import Blog from '~/pages/Blog/Blog';
import Contact from '~/pages/Contact/Contact';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: SliderLayout },
    { path: config.routes.product, component: Product },
    { path: config.routes.about, component: About },
    { path: config.routes.blog, component: Blog },
    { path: config.routes.contact, component: Contact },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
