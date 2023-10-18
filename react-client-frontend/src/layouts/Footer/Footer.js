import './Footer.css';
import logo from '~/assets/images/footer-logo.png';
import payment from '~/assets/images/payment.png';
function Footer() {
    return (
        <footer class="footer">
            <div class="container">
                <div class="row">
                    <div class="col-md-3">
                        <div class="footer__about">
                            <div class="footer__logo">
                                <a href="#">
                                    <img src={logo} alt="" />
                                </a>
                            </div>
                            <p>
                                S2TN SPORT - Chuyên cung cấp, cập nhật nhanh nhất các mẫu quần áo đá bóng nổi tiếng ở
                                trong nước và quốc tế.
                            </p>
                            <a href="#">
                                <img src={payment} alt="" />
                            </a>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="footer__widget">
                            <h6>Chính sách</h6>
                            <ul>
                                <li>
                                    <a href="#">Chính sách bảo mật</a>
                                </li>
                                <li>
                                    <a href="#">Bảo hành đổi trả</a>
                                </li>
                                <li>
                                    <a href="#">Chính sách chung</a>
                                </li>
                                <li>
                                    <a href="#">Chính sách ưu đãi</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="footer__widget">
                            <h6>Hỗ trợ khách hàng</h6>
                            <ul>
                                <li>
                                    <a href="#">Hướng dẫn mua hàng</a>
                                </li>
                                <li>
                                    <a href="#">Hướng dẫn thanh toán</a>
                                </li>
                                <li>
                                    <a href="#">Thắc mắc khiếu nại</a>
                                </li>
                                <li>
                                    <a href="#">Câu hỏi thường gặp</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="footer__widget">
                            <h6>Thông tin liên hệ</h6>
                            <ul>
                                <li>
                                    <p>
                                        Địa chỉ: Tòa nhà FPT Polytechnic, 13 phố Trịnh Văn Bô, phường Phương Canh, quận
                                        Nam Từ Liêm, TP Hà Nội
                                    </p>
                                </li>
                                <li>
                                    <p>Điện thoại: 024 7300 1955</p>
                                </li>
                                <li>
                                    <p>Email: caodang@fpt.edu.vn</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
