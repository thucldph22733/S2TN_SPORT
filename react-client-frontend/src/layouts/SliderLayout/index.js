import { Fragment } from 'react';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import Slider from '../Components/Slider/Slider';

function SliderLayout({ children }) {
    return (
        <Fragment>
            <Header />
            <Slider />
            <main>{children}</main>
            <Footer />
        </Fragment>
    );
}

export default SliderLayout;
