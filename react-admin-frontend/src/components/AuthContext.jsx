
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


    // useEffect(() => {
    //     // Check if user has a valid JWT in localStorage
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         // Make a request to the server to validate the token and get user data
    //         // If token is valid, set user state with user data
    //         // If token is invalid, remove the token from localStorage and set user state to null
    //     }

    // }, []);

    function login(data) {
        return HttpClient.post(`${API_URL}login`, data)
            .then((response) => {
                const { access_token, refresh_token } = response.data;
                localStorage.setItem('token', access_token);
                localStorage.setItem('refresh_token', refresh_token);
                // navigate("/")
            })
            .catch(error => {
                console.error(error);
                throw error;
            });
    }
    function refreshToken() {
        const refresh_token = localStorage.getItem('refresh_token');
        if (!refresh_token) {
            // navigate("/dang-nhap");
        } else {
            HttpClient.post(`${API_URL}refresh-token`, refresh_token)
                .then((response) => {

                    const new_access_token = response.data.access_token;

                    localStorage.setItem('token', new_access_token);
                })
                .catch(error => {
                    console.error(error);
                    throw error;
                });
        }

    }
    function logout() {
        // Xóa JWT khỏi localStorage và đặt trạng thái người dùng thành null
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        // setUser(null);
        // Chuyển hướng đến trang đăng nhập
        // navigate("/dang-nhap");
    }

    const value = {
        user,
        login,
        logout,
        loading,
        refreshToken
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
// export default AuthContext;