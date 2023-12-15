import './Footer.css';
import { PiMapPinLine } from 'react-icons/pi';
import { AiOutlinePhone, AiOutlineMail } from 'react-icons/ai';
import { Avatar, Badge, Col, Row } from 'antd';
import payment from '~/assets/images/payment.png';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined } from '@ant-design/icons';

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <Row gutter={[16, 16]}>
                    <Col span={24} md={6}>
                        <div className="footer__widget">
                            <h6>Về chúng tôi</h6>
                            <p>S2TN SPORT - Chuyên cung cấp, cập nhật nhanh nhất các mẫu quần áo đá bóng nổi tiếng. Chúng tôi được biết đến là một xưởng sản xuất quần áo thể thao chuyên nghiệp với quy mô lớn</p>
                            <img src={payment} alt="Payment Methods" />
                        </div>
                    </Col>
                    <Col span={24} md={6}>
                        <div className="footer__widget">
                            <h6>Chính sách</h6>
                            <ul>
                                <li><a href="#">Chính sách bảo mật</a></li>
                                <li><a href="#">Bảo hành đổi trả</a></li>
                                <li><a href="#">Chính sách chung</a></li>
                                <li><a href="#">Chính sách ưu đãi</a></li>
                            </ul>
                        </div>
                    </Col>
                    <Col span={24} md={6}>
                        <div className="footer__widget">
                            <h6>Hỗ trợ khách hàng</h6>
                            <ul>
                                <li><a href="#">Hướng dẫn mua hàng</a></li>
                                <li><a href="#">Hướng dẫn thanh toán</a></li>
                                <li><a href="#">Thắc mắc khiếu nại</a></li>
                                <li><a href="#">Câu hỏi thường gặp</a></li>
                            </ul>
                        </div>
                    </Col>
                    <Col span={24} md={6}>
                        <div className="footer__widget">
                            <h6>Thông tin liên hệ</h6>
                            <p><PiMapPinLine className="footer_icon" />: Tòa nhà FPT Polytechnic, 13 phố Trịnh Văn Bô, Nam Từ Liêm, Hà Nội</p>
                            <p><AiOutlinePhone className="footer_icon" />: 024 7300 1955</p>
                            <p><AiOutlineMail className="footer_icon" />: caodang@fpt.edu.vn</p>
                            <Row>
                                <a href="#" style={{ marginRight: '10px' }}>

                                    <Avatar style={{ backgroundColor: '#4e73df' }}>
                                        <FacebookOutlined style={{ color: 'white' }} />
                                    </Avatar>
                                </a>

                                <a href="#" style={{ marginRight: '10px' }}>

                                    <Avatar style={{ backgroundColor: '#414f7a' }}>
                                        <InstagramOutlined style={{ color: 'white' }} />
                                    </Avatar>
                                </a>
                                <a href="#" style={{ marginRight: '10px' }}>

                                    <Avatar style={{ backgroundColor: '#41607a' }}>
                                        <TwitterOutlined style={{ color: 'white' }} />
                                    </Avatar>
                                </a>
                                <a href="#">

                                    <Avatar style={{ backgroundColor: 'red' }}>
                                        <YoutubeOutlined style={{ color: 'white' }} />
                                    </Avatar>
                                </a>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        </footer>
    );
}

export default Footer;