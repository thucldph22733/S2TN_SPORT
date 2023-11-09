import React from 'react';
import './ShoppingCart.css';
import { Link } from 'react-router-dom';
import cart1 from '~/assets/images/shopping-cart/cart-1.jpg';
import cart2 from '~/assets/images/shopping-cart/cart-2.jpg';
import cart3 from '~/assets/images/shopping-cart/cart-3.jpg';

import { AiOutlineClose } from 'react-icons/ai';
import path_name from '~/core/constants/routers';
function ShoppingCart() {
    return (
        <section className="shopping-cart spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="shopping__cart__table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sản phẩm</th>
                                        <th>Số lượng</th>
                                        <th>Thành tiền</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="product__cart__item">
                                            <div className="product__cart__item__pic">
                                                <img src={cart1} alt="" />
                                            </div>
                                            <div className="product__cart__item__text">
                                                <h6>T-shirt Contrast Pocket</h6>
                                                <h5>$98.49</h5>
                                            </div>
                                        </td>
                                        <td className="quantity__item">
                                            <div className="quantity">
                                                <div className="pro-qty-2">
                                                    <input type="text" value="1" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="cart__price">$ 30.00</td>
                                        <td className="cart__close">
                                            <Link>
                                                <AiOutlineClose />
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="product__cart__item">
                                            <div className="product__cart__item__pic">
                                                <img src={cart2} alt="" />
                                            </div>
                                            <div className="product__cart__item__text">
                                                <h6>Diagonal Textured Cap</h6>
                                                <h5>$98.49</h5>
                                            </div>
                                        </td>
                                        <td className="quantity__item">
                                            <div className="quantity">
                                                <div className="pro-qty-2">
                                                    <input type="text" value="1" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="cart__price">$ 32.50</td>
                                        <td className="cart__close">
                                            <Link>
                                                <AiOutlineClose />
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="product__cart__item">
                                            <div className="product__cart__item__pic">
                                                <img src={cart3} alt="" />
                                            </div>
                                            <div className="product__cart__item__text">
                                                <h6>Basic Flowing Scarf</h6>
                                                <h5>$98.49</h5>
                                            </div>
                                        </td>
                                        <td className="quantity__item">
                                            <div className="quantity">
                                                <div className="pro-qty-2">
                                                    <input type="text" value="1" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="cart__price">$ 47.00</td>
                                        <td className="cart__close">
                                            <Link>
                                                <AiOutlineClose />
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <div className="continue__btn">
                                    <a href="#">Tiếp tục mua sắm</a>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <div className="continue__btn update__btn">
                                    <a href="#">
                                        <i className="fa fa-spinner"></i> Cập nhật
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="cart__discount">
                            <h6>Mã giảm giá</h6>
                            <form action="#">
                                <input type="text" placeholder="Mã giảm giá" />
                                <button className="primary-btn" type="submit">
                                    Áp dụng
                                </button>
                            </form>
                        </div>
                        <div className="cart__total">
                            <h6>Cộng giỏ hàng</h6>
                            <ul>
                                <li>
                                    Tạm tính <span>$ 169.50</span>
                                </li>
                                <li>
                                    Tổng tiền<span>$ 169.50</span>
                                </li>
                            </ul>
                            <Link to={path_name.checkout} className="primary-btn">
                                Tiến hành đặt hàng
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ShoppingCart;
