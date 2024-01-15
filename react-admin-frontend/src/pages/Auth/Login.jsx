import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import './Auth.css'
import { useAuth } from '~/components/AuthContext';
import { useNavigate } from 'react-router-dom';
import path_name from '~/constants/routers';
import AuthService from '~/service/AuthService';

const Login = () => {
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const handleSubmit = () => {
        const data = form.getFieldsValue();
        console.log(data);
        AuthService.login(data).then((response) => {
            console.log(response)
            localStorage.setItem('access_token1', response.access_token)
            localStorage.setItem('refresh_token2', response.refresh_token)
            const user = JSON.stringify(response.user);
            localStorage.setItem('user1', user)

            notification.success({
                message: 'Thông báo',
                description: 'Đăng nhập thành công!',
            });
            navigate(path_name.newSell)

        }).catch(err => {
            notification.error({
                message: 'Thông báo',
                description: 'Tài khoản hoặc mật khẩu không đúng!',
            });
        });
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
            <h2 className='title_login'>ĐĂNG NHẬP</h2>
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
                <Form.Item noStyle >
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
