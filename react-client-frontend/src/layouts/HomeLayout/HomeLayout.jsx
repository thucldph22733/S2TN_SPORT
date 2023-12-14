import { Fragment } from 'react';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import Slider from '../Components/Slider/Slider';
import { Outlet } from 'react-router-dom';

function HomeLayout() {
    return (
        <Fragment>
            <Header />
            <Slider />
            <Outlet />
            <Footer />
        </Fragment>
    );
}

export default HomeLayout;
