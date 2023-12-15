import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import './Auth.css'
// import { useAuth } from '~/components/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import path_name from '~/core/constants/routers';
// import path_name from '~/constants/routers';

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [form] = Form.useForm();
    // const { login } = useAuth();

    const handleSubmit = () => {
        const data = form.getFieldsValue();

        // login(data);
        // navigate(path_name.newSell)
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
                <h4 className='title_login'>Quên mật khẩu?</h4>
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
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Đặt lại mật khẩu
                    </Button>
                </Form.Item>
                {/* 
                <Link style={{ float: 'left' }} to={path_name.register} >
                    Tạo một tài khoản mới!
                </Link>
                <Link style={{ float: 'right' }} to={path_name.login} >
                    Đăng nhập!
                </Link> */}
            </Form>
        </Col >
    );
};
export default ForgotPassword;
