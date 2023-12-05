import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';

const ChangePasswordForm = () => {
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setPasswords({
            ...passwords,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        try {
            // Kiểm tra xác nhận mật khẩu
            if (passwords.newPassword !== passwords.confirmPassword) {
                notification.error({
                    message: 'Lỗi',
                    description: 'Xác nhận mật khẩu không khớp!',
                });
                return;
            }

            const response = await axios.patch(
                'http://localhost:8080/api/v1/users/changePassword',
                passwords,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Xử lý phản hồi từ backend
            if (response.status === 200) {
                notification.success({
                    message: 'Thành công',
                    description: 'Mật khẩu đã được thay đổi!',
                });
            } else {
                notification.error({
                    message: 'Lỗi',
                    description: 'Đã có lỗi xảy ra khi thay đổi mật khẩu!',
                });
            }
        } catch (error) {
            console.error('Error:', error);
            notification.error({
                message: 'Lỗi',
                description: 'Đã có lỗi xảy ra khi thay đổi mật khẩu!',
            });
        }
    };

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item
                label="Mật khẩu hiện tại"
                name="currentPassword"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu hiện tại!',
                    },
                ]}
            >
                <Input.Password onChange={handleChange} />
            </Form.Item>
            <Form.Item
                label="Mật khẩu mới"
                name="newPassword"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu mới!',
                    },
                ]}
            >
                <Input.Password onChange={handleChange} />
            </Form.Item>
            <Form.Item
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng xác nhận mật khẩu!',
                    },
                ]}
            >
                <Input.Password onChange={handleChange} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Đổi mật khẩu
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ChangePasswordForm;
