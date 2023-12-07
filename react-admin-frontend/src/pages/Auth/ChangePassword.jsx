import React, { useState } from 'react';
import { Form, Input, Button, notification, Row, Col } from 'antd';
import axios from 'axios';

const ChangePassword = () => {
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
        <Form
            style={{ marginTop: '15px' }}
            onFinish={handleSubmit}
            name="validateOnly" layout="vertical" autoComplete="off"
            colon={false}
        >   <h1 style={{ textAlign: 'center', color: '#2123bf' }}>Đổi mật khẩu</h1>
            <Row>
                <Col span={10} offset={7}>
                    <Form.Item
                        label="Mật khẩu hiện tại:"
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
                        label="Mật khẩu mới:"
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
                        label="Xác nhận mật khẩu:"
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
                    <Form.Item style={{ float: 'right' }}>
                        <Button type="primary" htmlType="submit">
                            Đổi mật khẩu
                        </Button>
                    </Form.Item>
                </Col>
            </Row>

        </Form>
    );
};

export default ChangePassword;
