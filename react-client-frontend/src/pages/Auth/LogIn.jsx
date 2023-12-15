import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import './Auth.css'
// import { useAuth } from '~/components/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import path_name from '~/core/constants/routers';
// import path_name from '~/constants/routers';

const Login = () => {
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
