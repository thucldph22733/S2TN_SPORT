import React from 'react';
import { Col, Row, Input, Form, Button, Space } from 'antd';
// import { PiMapPinLine, AiOutlinePhone, AiOutlineMail, AiOutlineFieldTime } from 'react-icons/';  // Import tất cả các biểu tượng từ thư viện react-icons

import { SiMinutemailer } from "react-icons/si";
import './Contact.css';
import { PiMapPinLine } from 'react-icons/pi';
import { AiOutlineFieldTime, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';

const Contact = () => {
    const onFinish = (values) => {
        // Xử lý logic khi form được submit
        console.log('Received values:', values);
    };

    return (
        <>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5579.432544361822!2d105.73108875762416!3d21.03970654515736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345550b525aa03%3A0x3fdefc40f69a023a!2zQ2FvIMSR4bqzbmcgRlBUIFBo4buRIFRy4buLbmggVsSDbiBCw7QgLCBQaMaw4budbmcgUGjGsMahbmcgQ2FuaCAsIHF14bqtbiBU4burIExpw6pt!5e0!3m2!1svi!2s!4v1697621128802!5m2!1svi!2s"
                allowFullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                style={{
                    width: '100%',
                    height: '450px'
                }}
            ></iframe>
            <section className="contact spad">
                <div className="container">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} lg={12}>
                            <div className="contact__text">
                                <div className="section-title">
                                    <h5 style={{ color: '#2123bf' }}>Cửa hàng S2TN SPORT</h5>
                                    <p>Hân hạnh được phục vụ quý khách!</p>
                                </div>
                                <p>
                                    <PiMapPinLine className="contact_icon" />: Tòa nhà FPT Polytechnic, 13 phố Trịnh Văn
                                    Bô, phường Phương Canh, quận Nam Từ Liêm, TP Hà Nội
                                </p>
                                <p>
                                    <AiOutlinePhone className="contact_icon" />: 024 7300 1955
                                </p>
                                <p>
                                    <AiOutlineMail className="contact_icon" />: caodang@fpt.edu.vn
                                </p>
                                <p>
                                    <AiOutlineFieldTime className="contact_icon" />: 8h sáng đến 8h tối từ thứ 2 đến thứ
                                    7, Chủ Nhật shop nghỉ.
                                </p>
                            </div>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Form
                                name="contactForm"
                                onFinish={onFinish}
                                initialValues={{
                                    remember: true,
                                }}
                            >
                                <Row gutter={[16, 16]}>
                                    <Col xs={24} lg={12}>
                                        <Form.Item
                                            name="fullName"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập họ và tên!',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Họ và tên" style={{ height: '45px' }} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} lg={12}>
                                        <Form.Item
                                            name="email"
                                            rules={[
                                                {
                                                    required: true,
                                                    type: 'email',
                                                    message: 'Vui lòng nhập email hợp lệ!',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Email" style={{ height: '45px' }} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24}>
                                        <Form.Item
                                            name="message"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập nội dung!',
                                                },
                                            ]}
                                        >
                                            <Input.TextArea placeholder="Nội dung" rows={5} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24}>
                                        <Form.Item>
                                            <Button style={{ height: '45px', fontSize: '16px' }} type="primary" htmlType="submit" icon={<SiMinutemailer />}>
                                                Gửi thông báo
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </section>
        </>
    );
};

export default Contact;
