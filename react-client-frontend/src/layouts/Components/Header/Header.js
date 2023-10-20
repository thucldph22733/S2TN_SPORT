import './Herder.css';

import { Link } from 'react-router-dom';
import config from '~/config';
// import Icon
import logo from '~/assets/images/logo.png';
import cart from '~/assets/images/icon/cart.png';
import search from '~/assets/images/icon/search.png';
import heart from '~/assets/images/icon/heart.png';

function Header() {
    return (
        <header className="header">
            <div className="header__top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-7">
                            <div className="header__top__left">
                                <p>
                                    Miễn phí vận chuyển cho đơn hàng trên 500k, hoàn trả hoặc hoàn tiền trong 10 ngày.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-5">
                            <div className="header__top__right">
                                <div className="header__top__links">
                                    <a href="#">Đăng nhập /</a>
                                    <a href="#">Đăng ký</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row ">
                    <div className="col-lg-2 col-md-2">
                        <div className="header__logo">
                            <a href="./index.html">
                                <img src={logo} alt="" />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-7 col-md-7">
                        <nav className="header__menu">
                            <ul>
                                <li className="active">
                                    <Link to={config.routes.home}>Trang chủ</Link>
                                </li>

                                <li>
                                    <Link to={config.routes.product}>Sản phẩm</Link>
                                    <ul className="dropdown">
                                        <li>
                                            <a href="./about.html">Áo đội tuyển</a>
                                        </li>
                                        <li>
                                            <a href="./shop-details.html">Áo không logo</a>
                                        </li>
                                        <li>
                                            <a href="./shopping-cart.html">Áo câu lạc bộ</a>
                                        </li>
                                        <li>
                                            <a href="./checkout.html">Áo khác</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link to={config.routes.about}>Giới thiệu</Link>
                                </li>
                                <li>
                                    <Link to={config.routes.blog}>Tin tức</Link>
                                </li>
                                <li>
                                    <Link to={config.routes.contact}>Liên hệ</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-lg-3 col-md-3">
                        <div className="header__nav__option">
                            <a href="#" className="search-switch">
                                <img src={search} alt="" />
                            </a>
                            <a href="#">
                                <img src={heart} alt="" />
                            </a>
                            <a href="#">
                                <img src={cart} alt="" /> <span>0</span>
                            </a>
                            <div className="price">$0.00</div>
                        </div>
                    </div>
                </div>
                <div className="canvas__open">
                    <i className="fa fa-bars"></i>
                </div>
            </div>
        </header>
    );
}

export default Header;
