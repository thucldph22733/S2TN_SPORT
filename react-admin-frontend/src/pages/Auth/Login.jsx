import { Link, useNavigate } from 'react-router-dom';
import path_name from '~/constants/routers';
import { useState } from 'react';
// import { useAuth } from '~/components/AuthContext';
import axios from 'axios';
import './Auth.css';
function LogIn() {
    // const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/api/v1/auth/login",
            JSON.stringify({ email, password }),
            {
                headers: { 'Content-Type': 'application/json' },
            }).then(function (response) {
                console.log(response.data);

                const token = response.data.access_token

                localStorage.setItem('jsonwebtoken', token)
                navigate("/");
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-6 col-lg-6 col-md-6">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Đăng nhập!</h1>
                                        </div>
                                        <form className="user" onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <input
                                                    type="email"
                                                    className="form-control form-control-user"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Nhập địa chỉ email..."
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="password"
                                                    className="form-control form-control-user"
                                                    placeholder="Nhập mật khẩu..."
                                                    name="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox small">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="customCheck"
                                                    />
                                                    <label className="custom-control-label" for="customCheck">
                                                        Ghi nhớ
                                                    </label>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-primary btn-user btn-block">
                                                Đăng nhập
                                            </button>
                                            {/* <hr />
                                            <a href="index.html" className="btn btn-google btn-user btn-block">
                                                <i className="fab fa-google fa-fw"></i> Đăng nhập với Google
                                            </a>
                                            <a href="index.html" className="btn btn-facebook btn-user btn-block">
                                                <i className="fab fa-facebook-f fa-fw"></i> Đăng nhập với Facebook
                                            </a> */}
                                        </form>
                                        <hr />
                                        <div className="text-center">
                                            <Link className="small" to={path_name.forgot_password}>
                                                Quên mật khẩu?
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogIn;