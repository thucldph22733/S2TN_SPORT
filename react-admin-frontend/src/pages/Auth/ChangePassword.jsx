
import { Form, Input, Button, notification, Row, Col } from 'antd';
import UserService from '~/service/UserService';

const ChangePassword = () => {
    const token = localStorage.getItem('token');

    const [form] = Form.useForm();
    const handleSubmit = () => {
        form.validateFields().then(async () => {
            const data = form.getFieldsValue();

            await UserService.changePassword(data, token).then(() => {
                notification.success({
                    message: 'Thông báo',
                    description: 'Đổi mật khẩu thành công!',
                });
            }).catch((error) => {
                console.error('Error:', error);
                notification.error({
                    message: 'Lỗi',
                    description: 'Mật khẩu không chính xác!',
                });
            });

        }).catch(error => {
            console.error(error);
        });
    };
    return (
        <Form
            style={{ marginTop: '15px' }}
            onFinish={handleSubmit}
            name="validateOnly" layout="vertical" autoComplete="off"
            colon={false}
            form={form}
        >
            <h1 style={{ textAlign: 'center', color: '#2123bf' }}>Đổi mật khẩu</h1>
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
                            {
                                validator: (_, value) => {
                                    // Kiểm tra xem có dấu cách ở đầu và cuối không
                                    if (value && (value.trim() !== value)) {
                                        return Promise.reject('Mật khẩu không được có dấu cách ở đầu hoặc cuối');
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <Input.Password style={{ height: '40px', width: '100%', borderRadius: '5px' }} />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu mới:"
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu mới!',
                            },
                            {
                                validator: (_, value) => {
                                    // Kiểm tra xem có dấu cách ở đầu và cuối không
                                    if (value && (value.trim() !== value)) {
                                        return Promise.reject('Mật khẩu không được có dấu cách ở đầu hoặc cuối');
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <Input.Password style={{ height: '40px', width: '100%', borderRadius: '5px' }} />
                    </Form.Item>
                    <Form.Item
                        label="Xác nhận mật khẩu:"
                        name="confirmationPassword"
                        dependencies={['newPassword']}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng xác nhận mật khẩu!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (value && (value.trim() !== value)) {
                                        return Promise.reject('Mật khẩu không được có dấu cách ở đầu hoặc cuối');
                                    }
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Mật khẩu xác nhận không khớp mật khẩu mới!');
                                },
                            }),
                        ]}
                    >
                        <Input.Password style={{ height: '40px', width: '100%', borderRadius: '5px' }} />
                    </Form.Item>
                    <Form.Item >
                        <Button style={{ height: '40px', width: '100%', borderRadius: '5px' }} type="primary" htmlType="submit">
                            Đổi mật khẩu
                        </Button>
                    </Form.Item>
                </Col>
            </Row>

        </Form>
    );
};

export default ChangePassword;
