import React from 'react';
import { Row, Col, Card, Form, Input, Button, Typography } from 'antd';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'; // Assuming you are using React Router
import path_name from '~/constants/routers';

import './Auth.css'
const { Text } = Typography;
const ForgotPassword = () => {
    const onFinish = (values) => {
        // Handle form submission logic here
        console.log('Received values:', values);
    };

    return (

        <Form
            name="normal_login"
            className="login-form"
            // name="forgot-password-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
        >
            <h2 className='title_login'>Quên mật khẩu?</h2>
            <Form.Item
                label="Nhập địa chỉ email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập địa chỉ email!',
                    },
                    {
                        type: 'email',
                        message: 'Địa chỉ email không hợp lệ!',
                    },
                ]}
            >
                <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Đặt lại mật khẩu
                </Button>
            </Form.Item>
            <div style={{ textAlign: 'center' }}>
                <Text>
                    <Link to={path_name.login}>Đăng nhập!</Link>
                </Text>
            </div>
        </Form>
    );
};

export default ForgotPassword;