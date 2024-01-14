import React, { useState, useEffect } from 'react';
import { Button, Input, Form, notification, Radio, DatePicker, Row, Col } from 'antd';
import UserService from '~/service/UserService';
import dayjs from 'dayjs';


function User() {
    const userString = localStorage.getItem('user2');
    const user = userString ? JSON.parse(userString) : null;

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {

        await UserService.getUserById(user.id)
            .then(response => {

                setUsers(response.data);
                console.log(response.data);
            }).catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const [form] = Form.useForm();

    const handleUpdate = () => {
        form.validateFields().then(async () => {

            const data = await form.getFieldsValue();
            data.role = user.role
            data.deleted = user.deleted
            await UserService.update(user.id, data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Cập nhật hồ sơ thành công!',
                    });
                    fetchUsers();
                })
                .catch(error => {
                    notification.error({
                        message: 'Thông báo',
                        description: 'Cập nhật hồ sơ thất bại!',
                    });
                    console.error(error);
                });

        }).catch(error => {
            console.error(error);
        })

    }

    return (
        <Col span={16} offset={5}>
            <h6>Hồ sơ của tôi</h6>
            <Form
                name="validateOnly"
                layout="vertical"
                autoComplete="off"
                style={{ maxWidth: 600, marginTop: '25px' }}
                form={form}
            >
                <React.Fragment key={users.id}>
                    <Form.Item label="Họ và tên:" name='userName' initialValue={users.userName}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập họ và tên!',
                            },
                            {
                                validator: (_, value) => {
                                    // Kiểm tra xem có dấu cách ở đầu và cuối không
                                    if (value && (value.trim() !== value)) {
                                        return Promise.reject('Họ và tên không được có dấu cách ở đầu hoặc cuối');
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <Input placeholder="Nhập tên người dùng..." />
                    </Form.Item>

                    <Form.Item
                        label="Email:"
                        name='email'
                        initialValue={users.email}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập email!',
                            },
                            {
                                pattern: /^[a-zA-Z0-9._-]+@gmail\.com$/,
                                message: 'Email phải có định dạng @gmail.com!',
                            },
                        ]}
                    >
                        <Input placeholder="Nhập email..." />
                    </Form.Item>

                    <Form.Item label="Số điện thoại:" name='phoneNumber' initialValue={users.phoneNumber}
                        rules={[
                            { required: true, message: 'Vui lòng nhập số điện thoại!' },
                            { pattern: /^[0-9]+$/, message: 'Số điện thoại chỉ được chứa chữ số' },
                            { min: 10, message: 'Số điện thoại phải 10 chữ số' },
                            { max: 10, message: 'Số điện thoại phải 10 chữ số' },
                            {
                                validator: async (_, value) => {
                                    // Kiểm tra giá trị có tồn tại không
                                    if (!value) {
                                        return Promise.resolve(); // Bỏ qua kiểm tra nếu giá trị không tồn tại
                                    }

                                    // Kiểm tra số đầu tiên là số 0
                                    if (value.charAt(0) !== '0') {
                                        throw new Error('Số điện thoại phải bắt đầu bằng số 0');
                                    }

                                    // Kiểm tra các quy tắc khác ở đây nếu cần

                                    return Promise.resolve();
                                },
                            }
                        ]}
                    >
                        <Input placeholder="Nhập số điện thoại..." />
                    </Form.Item>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label="Ngày sinh:"
                                name="birthOfDay"
                                initialValue={dayjs(users.birthOfDay)}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn ngày sinh!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            const selectedDate = new Date(value);
                                            const currentDate = new Date();

                                            if (selectedDate > currentDate) {
                                                return Promise.reject(new Error('không được chọn tương lai!'));
                                            }
                                            return Promise.resolve();
                                        },
                                    }),
                                ]}
                            >
                                <DatePicker placeholder="Chọn ngày sinh" style={{ width: '100%' }} format="DD/MM/YYYY" />
                            </Form.Item>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={11}>
                            <Form.Item label="Giới tính:" name='gender' initialValue={users.gender} rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}>
                                <Radio.Group name="radiogroup" style={{ float: 'left' }}>
                                    <Radio value={true}>Nam</Radio>
                                    <Radio value={false}>Nữ</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                </React.Fragment>

                <Button type="primary" style={{ width: '100px' }} onClick={handleUpdate}>
                    Lưu
                </Button>
            </Form>
        </Col>
    );
};
export default User;




