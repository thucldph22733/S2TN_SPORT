
import { notification } from 'antd';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

import HttpClient from '~/utils/http-client';
const API_URL = 'auth/';
const AuthContext = createContext();
export function useAuth() {
    return useContext(AuthContext);
}
export function AuthProvider({ children }) {
    // const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    function login(data) {
        return HttpClient.post(`${API_URL}login`, data)
            .then((response) => {
                console.log(response.data);
                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('refresh_token', response.data.refresh_token);
                localStorage.setItem('user_name', response.data.userName);

                setUser(response.data);
            })
            .catch(error => {
                notification.error({
                    message: 'Thông báo',
                    description: `${error.response.data.errorMessage}`,
                });

            });
    }

    // function refreshToken() {
    //     const refresh_token = localStorage.getItem('refresh_token');
    //     if (refresh_token) {
    //         HttpClient.post(`${API_URL}refresh-token`, refresh_token)
    //             .then((response) => {

    //                 const new_access_token = response.data.access_token;

    //                 localStorage.setItem('token', new_access_token);
    //             })
    //             .catch(error => {
    //                 console.error(error);
    //                 throw error;
    //             });
    //     }

    // }

    function logout() {
        // Xóa JWT khỏi localStorage và đặt trạng thái người dùng thành null
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_name')
        setUser(null);

    }

    const value = {
        user,
        login,
        logout,
        loading,
        // refreshToken
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
// export default AuthContext;