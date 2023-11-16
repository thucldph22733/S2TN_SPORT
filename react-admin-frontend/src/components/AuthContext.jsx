
// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { useNavigate, Outlet } from 'react-router-dom';
// import axios from 'axios';
// const AuthContext = createContext();

// export function useAuth() {
//     return useContext(AuthContext);
// }

// export function AuthProvider() {

//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     let navigate = useNavigate();

//     useEffect(() => {
//         // Check if user has a valid JWT in localStorage
//         const token = localStorage.getItem('token');
//         if (token) {
//             // Make a request to the server to validate the token and get user data
//             // If token is valid, set user state with user data
//             // If token is invalid, remove the token from localStorage and set user state to null
//         }

//     }, []);

//     function login(email, password) {
//         // Gửi yêu cầu tới server để xác thực người dùng
//         axios.post("http://localhost:8080/api/v1/auth/admin/login",
//             JSON.stringify({ email, password }),
//             {
//                 headers: { 'Content-Type': 'application/json' },
//             }).then(function (response) {
//                 console.log(response.data);

//                 const token = response.data.access_token

//                 localStorage.setItem('jsonwebtoken', token)
//                 navigate("/");
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
//     }

//     function logout() {
//         // Xóa JWT khỏi localStorage và đặt trạng thái người dùng thành null
//         localStorage.removeItem('token');
//         setUser(null);
//         // Chuyển hướng đến trang đăng nhập
//         navigate("/login");
//     }

//     const value = {
//         user,
//         login,
//         logout,
//         loading,
//     };

//     return <AuthContext.Provider value={value}><Outlet /></AuthContext.Provider>;
// }