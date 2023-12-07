import './Header.css';

import { Link } from 'react-router-dom';
// import Icon
import logo from '~/assets/images/logo.png';
import cart from '~/assets/images/icon/cart.png';
import search from '~/assets/images/icon/search.png';
import heart from '~/assets/images/icon/heart.png';
import path_name from '~/core/constants/routers';
import { useState } from 'react';

function Header() {
    const [menu, setMenu] = useState('home');

    return (
        <header className="header">
            <div className="header__top">
                <div className="container">
                    <div class="row">
                        <div className="col-lg-6 col-md-7">
                            <div className="header__top__left">
                                <p>Miễn phí shipping cho đơn trên 1 triệu, hoàn trả, hoàn tiền trong 7 ngày.</p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-5">
                            <div className="header__top__right">
                                <div className="header__top__links">
                                    <a href="#">Đăng nhập</a>
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
                                <li
                                    onClick={() => {
                                        setMenu();
                                    }}
                                    className={menu === 'home' ? 'active' : <></>}
                                >
                                    <Link to={path_name.home}>Trang chủ</Link>
                                </li>

                                <li
                                    onClick={() => {
                                        setMenu('product');
                                    }}
                                    className={menu === 'product' ? 'active' : <></>}
                                >
                                    <Link to={path_name.product}>Sản phẩm</Link>
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
                                <li
                                    onClick={() => {
                                        setMenu('about');
                                    }}
                                    className={menu === 'about' ? 'active' : <></>}
                                >
                                    <Link to={path_name.about}>Giới thiệu</Link>
                                </li>
                                <li
                                    onClick={() => {
                                        setMenu('blog');
                                    }}
                                    className={menu === 'blog' ? 'active' : <></>}
                                >
                                    <Link to={path_name.blog}>Tin tức</Link>
                                </li>
                                <li
                                    onClick={() => {
                                        setMenu('contact');
                                    }}
                                    className={menu === 'contact' ? 'active' : <></>}
                                >
                                    <Link to={path_name.contact}>Liên hệ</Link>
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
                            <Link to={path_name.shopping_cart}>
                                <img src={cart} alt="" /> <span>0</span>
                            </Link>
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
