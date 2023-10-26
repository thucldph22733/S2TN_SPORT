import React from 'react';
import Slider from '../Components/Slider/Slider';
import Header from '../Components/Header/Header';
import { Outlet } from 'react-router-dom';
function MainLayout() {
    return (
        <div className="wrapper">
            <Slider />

            <div id="content">
                <Header />
                <Outlet />
            </div>
        </div>
    );
}

export default MainLayout;
