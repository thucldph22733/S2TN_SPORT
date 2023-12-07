import { Link } from 'react-router-dom';
import path_name from '~/core/constants/routers';
import './Auth.css';
function Register() {
    return (
        <div className="container">
            <div className="card o-hidden col-md-6 offset-3 border-0 shadow-lg my-5">
                <div className="row">
                    <div className="p-5">
                        <div className="text-center">
                            <h1 className="h4 text-gray-900 mb-4">Đăng ký</h1>
                        </div>
                        <form className="user">
                            <div className="form-group row">
                                <div className="col-sm-6 mb-3 mb-sm-0">
                                    <input
                                        type="text"
                                        className="form-control form-control-user"
                                        id="exampleFirstName"
                                        placeholder="Nhập họ và tên..."
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <input
                                        type="text"
                                        className="form-control form-control-user"
                                        id="exampleLastName"
                                        placeholder="Nhập số điện thoại..."
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control form-control-user"
                                    id="exampleInputEmail"
                                    placeholder="Nhập địa chỉ email..."
                                />
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-6 mb-3 mb-sm-0">
                                    <input
                                        type="password"
                                        className="form-control form-control-user"
                                        id="exampleInputPassword"
                                        placeholder="Nhập mật khẩu..."
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <input
                                        type="password"
                                        className="form-control form-control-user"
                                        id="exampleRepeatPassword"
                                        placeholder="Nhập lại mật khẩu..."
                                    />
                                </div>
                            </div>
                            <a href="login.html" className="btn btn-primary btn-user btn-block">
                                Đăng ký
                            </a>
                            <hr />
                            <a href="index.html" className="btn btn-google btn-user btn-block">
                                <i className="fab fa-google fa-fw"></i> Đăng ký với Google
                            </a>
                            <a href="index.html" className="btn btn-facebook btn-user btn-block">
                                <i className="fab fa-facebook-f fa-fw"></i> Đăng ký với Facebook
                            </a>
                        </form>
                        <hr />
                        <div className="text-center">
                            <Link className="small" to={path_name.forgot_password}>
                                Quên mật khẩu?
                            </Link>
                        </div>
                        <div className="text-center">
                            <Link className="small" to={path_name.login}>
                                Đăng nhập!
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
