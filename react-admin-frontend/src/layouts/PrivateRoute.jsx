import React from 'react';
import { Outlet } from 'react-router-dom';
function PrivateRoute() {
    localStorage.getItem('jsonwebtoken');
    console.log(localStorage.getItem('jsonwebtoken'));
    return (<Outlet />);
}

export default PrivateRoute;