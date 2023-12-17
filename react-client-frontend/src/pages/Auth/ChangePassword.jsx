
import { Form, Input, Button, notification, Row, Col } from 'antd';
import UserService from '~/service/UserService';

const ChangePassword = () => {
    const token = localStorage.getItem('access_token2');

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
                    description: 'Đã có lỗi xảy ra khi thay đổi mật khẩu!',
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
                        <Input.Password style={{ width: '100%', height: '40px' }} />
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
                        <Input.Password style={{ width: '100%', height: '40px' }} />
                    </Form.Item>
                    <Form.Item
                        label="Xác nhận mật khẩu:"
                        name="confirmationPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng xác nhận mật khẩu!',
                            },
                        ]}
                    >
                        <Input.Password style={{ width: '100%', height: '40px' }} />
                    </Form.Item>
                    <Form.Item >
                        <Button style={{ width: '100%', height: '40px' }} type="primary" htmlType="submit">
                            Đổi mật khẩu
                        </Button>
                    </Form.Item>
                </Col>
            </Row>

        </Form>
    );
};

export default ChangePassword;
