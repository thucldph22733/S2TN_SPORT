import { Link } from 'react-router-dom';
import path_name from '~/core/constants/routers';
import './Auth.css';
function LogIn() {
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
                                        <form className="user">
                                            <div className="form-group">
                                                <input
                                                    type="email"
                                                    className="form-control form-control-user"
                                                    id="exampleInputEmail"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Nhập địa chỉ email..."
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="password"
                                                    className="form-control form-control-user"
                                                    id="exampleInputPassword"
                                                    placeholder="Nhập mật khẩu..."
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
                                            <a href="index.html" className="btn btn-primary btn-user btn-block">
                                                Đăng nhập
                                            </a>
                                            <hr />
                                            <a href="index.html" className="btn btn-google btn-user btn-block">
                                                <i className="fab fa-google fa-fw"></i> Đăng nhập với Google
                                            </a>
                                            <a href="index.html" className="btn btn-facebook btn-user btn-block">
                                                <i className="fab fa-facebook-f fa-fw"></i> Đăng nhập với Facebook
                                            </a>
                                        </form>
                                        <hr />
                                        <div className="text-center">
                                            <Link className="small" to={path_name.forgot_password}>
                                                Quên mật khẩu?
                                            </Link>
                                        </div>
                                        <div className="text-center">
                                            <Link className="small" to={path_name.register}>
                                                Tạo một tài khoản mới!
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