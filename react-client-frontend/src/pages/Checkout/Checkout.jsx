import React from 'react';
import './Checkout.css';
function Checkout() {
    return (
        <section className="checkout spad">
            <div className="container">
                <div className="checkout__form">
                    <form action="#">
                        <div className="row">
                            <div className="col-lg-8 col-md-6">
                                <h6 className="coupon__code">
                                    <span className="icon_tag_alt"></span> Have a coupon? <a href="#">Click here</a> to
                                    enter your code
                                </h6>
                                <h6 className="checkout__title">THÔNG TIN THANH TOÁN</h6>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="checkout__input">
                                            <label className="form-label">
                                                Họ và tên<span>*</span>
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="Nhập họ và tên..."
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="checkout__input">
                                            <label className="form-label">
                                                Số điện thoại<span>*</span>
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="Nhập số điện thoại..."
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="checkout__input">
                                            <label className="form-label">
                                                Tỉnh/Thành phố<span>*</span>
                                            </label>
                                            <input className="form-control" type="text" />
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="checkout__input">
                                            <label className="form-label">
                                                Quận/Huyện<span>*</span>
                                            </label>
                                            <input className="form-control" type="text" />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="checkout__input">
                                            <label className="form-label">
                                                Phường/Xã<span>*</span>
                                            </label>
                                            <input className="form-control" type="text" />
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="checkout__input">
                                            <label className="form-label">
                                                Số nhà/Số đường<span>*</span>
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="Nhập số nhà, ngõ, đường..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="checkout__input">
                                    <label className="form-label">
                                        Ghi chú<span>*</span>
                                    </label>
                                    <textarea
                                        style={{ height: '100px' }}
                                        className="form-control"
                                        placeholder="Nội dung..."
                                    ></textarea>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="checkout__order">
                                    <h4 className="order__title">Đơn hàng của bạn</h4>
                                    <div className="checkout__order__products">
                                        Sản phẩm <span>Tạm tính</span>
                                    </div>
                                    <ul className="checkout__total__products">
                                        <li>
                                            01. Vanilla salted caramel <span>$ 300.0</span>
                                        </li>
                                        <li>
                                            02. German chocolate <span>$ 170.0</span>
                                        </li>
                                        <li>
                                            03. Sweet autumn <span>$ 170.0</span>
                                        </li>
                                        <li>
                                            04. Cluten free mini dozen <span>$ 110.0</span>
                                        </li>
                                    </ul>
                                    <ul className="checkout__total__all">
                                        <li>
                                            Tạm tính <span>$750.99</span>
                                        </li>

                                        <li>
                                            Tổng tiền <span>$750.99</span>
                                        </li>
                                    </ul>

                                    <div className="checkout__input__checkbox">
                                        <label for="payment">
                                            Check Payment
                                            <input type="checkbox" id="payment" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="checkout__input__checkbox">
                                        <label for="paypal">
                                            Paypal
                                            <input type="checkbox" id="paypal" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <button type="submit" className="site-btn">
                                        Đặt hàng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Checkout;
