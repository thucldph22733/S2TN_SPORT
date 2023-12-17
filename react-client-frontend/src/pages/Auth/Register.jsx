import React from 'react';
import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, notification } from 'antd';
import './Auth.css'
import { Link, useNavigate } from 'react-router-dom';
import path_name from '~/core/constants/routers';
import AuthService from '~/service/AuthService';

const Register = () => {
    const navigate = useNavigate();

    const [form] = Form.useForm();

    const handleSubmit = () => {

        const data = form.getFieldsValue();

        AuthService.register(data).then(() => {
            notification.success({
                message: 'Thông báo',
                description: 'Đăng ký thành công!',
            });
            navigate("/login")
        }).catch(() => {
            notification.error({
                message: 'Thông báo',
                description: 'Đăng ký thất bại!',
            });
        })
    };

    return (
        <Col span={8} offset={8} className='auth-form'>
            <Form
                onFinish={handleSubmit}
                form={form}
            >
                <h4 className='title_login'>ĐĂNG KÝ</h4>
                <div className='auth_input'>
                    <Form.Item
                        name="userName"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập họ và tênl!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Nhập họ và tên..." />
                    </Form.Item>
                </div>
                <div className='auth_input'>
                    <Form.Item
                        name="phoneNumber"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số điện thoại!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<PhoneOutlined className="site-form-item-icon" />}
                            placeholder="Nhập số điện thoại..." />
                    </Form.Item>
                </div>
                <div className='auth_input'>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập địa chỉ email!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            placeholder="Nhập địa chỉ email..." />
                    </Form.Item>
                </div>
                <div className='auth_input'>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu!',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Nhập mật khẩu..." />
                    </Form.Item>
                </div>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Đăng ký
                    </Button>
                </Form.Item>
                <Link to={path_name.login} >
                    Đăng nhập!
                </Link>
            </Form>
        </Col>
    );
};
export default Register;
