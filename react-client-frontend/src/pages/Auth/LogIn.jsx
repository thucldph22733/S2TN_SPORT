import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, Row, notification } from 'antd';
import './Auth.css'
// import { useAuth } from '~/components/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import path_name from '~/core/constants/routers';
import AuthService from '~/service/AuthService';
// import path_name from '~/constants/routers';

const Login = () => {
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const handleSubmit = () => {
        const data = form.getFieldsValue();
        console.log(data);
        AuthService.login(data).then((response) => {
            console.log(response)
            localStorage.setItem('access_token2', response.access_token)
            localStorage.setItem('refresh_token2', response.refresh_token)
            const user = JSON.stringify(response.user);
            localStorage.setItem('user2', user)

            notification.success({
                message: 'Thông báo',
                description: 'Đăng nhập thành công!',
            });
            navigate("/")

        }).catch(err => {
            notification.error({
                message: 'Thông báo',
                description: 'Tài khoản hoặc mật khẩu không đúng!',
            });
        });
    };

    return (
        <Col span={8} offset={8} className='auth-form'>
            <Form

                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={handleSubmit}
                form={form}
            >
                <h4 className='title_login'>ĐĂNG NHẬP</h4>
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
                            prefix={<UserOutlined className="site-form-item-icon" />}
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
                            type="password"
                            placeholder="Nhập mật khẩu..."
                        />
                    </Form.Item>
                </div>
                <Row style={{ marginBottom: '20px' }}>
                    <Col span={12}> <Form.Item name="remember" noStyle >
                        <Checkbox style={{ float: 'left' }}>Ghi nhớ</Checkbox>
                    </Form.Item></Col>
                    <Col span={12}>
                        <Link to={path_name.forgot_password} style={{ float: 'right' }}>
                            Quên mật khẩu?
                        </Link>
                    </Col>
                </Row>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Đăng nhập
                    </Button>
                </Form.Item>

                <Link to={path_name.register} >
                    Tạo một tài khoản mới!
                </Link>

            </Form>
        </Col >
    );
};
export default Login;
