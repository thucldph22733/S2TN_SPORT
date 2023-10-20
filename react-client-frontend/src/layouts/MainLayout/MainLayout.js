import { Fragment } from 'react';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';

function MainLayout({ children }) {
    return (
        <Fragment>
            <Header />
            <main>{children}</main>
            <Footer />
        </Fragment>
    );
}

export default MainLayout;
