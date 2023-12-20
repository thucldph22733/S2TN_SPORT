import { Fragment } from 'react';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { Avatar } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';

function MainLayout() {
    return (
        <Fragment>
            <Header />
            <Outlet />
            <Footer />
        </Fragment>
    );
}

export default MainLayout;
