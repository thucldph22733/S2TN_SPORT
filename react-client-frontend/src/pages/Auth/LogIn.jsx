import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import './Auth.css'
// import { useAuth } from '~/components/AuthContext';
import { useNavigate } from 'react-router-dom';
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
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={handleSubmit}
            form={form}
        >
            <h4 className='title_login'>ĐĂNG NHẬP</h4>
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
            <Form.Item>
                <Form.Item name="remember" noStyle >
                    <Checkbox>Ghi nhớ</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                    Quên mật khẩu?
                </a>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Đăng nhập
                </Button>
            </Form.Item>
        </Form>
    );
};
export default Login;
