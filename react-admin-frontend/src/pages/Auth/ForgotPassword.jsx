import { Link } from 'react-router-dom';
import path_name from '~/constants/routers'

import './Auth.css';
function ForgotPassword() {
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
                                            <h1 className="h4 text-gray-900 mb-2">Quên mật khẩu?</h1>
                                            <p className="mb-4">
                                                Nếu tài khoản tồn tại, chúng tôi sẽ gửi cho bạn hướng dẫn đặt lại mật
                                                khẩu qua email.
                                            </p>
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
                                            <a href="login.html" className="btn btn-primary btn-user btn-block">
                                                Đặt lại mật khẩu
                                            </a>
                                        </form>
                                        <hr />
                                    
                                        <div className="text-center">
                                            <Link className="small" to={path_name.login}>
                                                Đăng nhập!
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

export default ForgotPassword;