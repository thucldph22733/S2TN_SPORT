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
                    <Form.Item label="Họ và tên:" name='userName' initialValue={users.userName} rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản!' }]}>
                        <Input placeholder="Nhập tên người dùng..." />
                    </Form.Item>

                    <Form.Item label="Email:" name='email' initialValue={users.email} rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
                        <Input placeholder="Nhập email..." />
                    </Form.Item>

                    <Form.Item label="Số điện thoại:" name='phoneNumber' initialValue={users.phoneNumber} rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
                        <Input placeholder="Nhập số điện thoại..." />
                    </Form.Item>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label="Ngày sinh:"
                                name="birthOfDay"
                                initialValue={dayjs(users.birthOfDay)}
                                rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
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




