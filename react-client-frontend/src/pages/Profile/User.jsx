import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Input, Form, Modal, notification, Radio, Popconfirm, DatePicker, Row, Col, Select, Tag } from 'antd';
import { FaMapMarkedAlt } from "react-icons/fa";
import { PiLockKeyOpenFill, PiLockKeyFill } from "react-icons/pi";
import {
    PlusOutlined,
    RedoOutlined,
    FormOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import UserService from '~/service/UserService';
import dayjs from 'dayjs';


function User() {


    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {

        await UserService.getAll()
            .then(response => {

                setUsers(response.data);

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

            await UserService.update(data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Cập nhật thành công!',
                    });
                    fetchUsers();

                })
                .catch(error => {
                    notification.error({
                        message: 'Thông báo',
                        description: 'Cập nhật thất bại!',
                    });
                    console.error(error);
                });

        }).catch(error => {
            console.error(error);
        })

    }

    return (
        <Col span={16} offset={5}>
            <h6 style={{ textAlign: 'center' }}>Hồ sơ</h6>
            <Form
                name="validateOnly" layout="vertical" autoComplete="off"

                style={{ maxWidth: 600, marginTop: '25px' }}
                form={form}
                initialValues={{
                    // ...reacord,
                    // ...(reacord?.birthOfDay && { birthOfDay: dayjs(reacord.birthOfDay, "DD/MM/YYYY") }),
                }}
            >

                <Form.Item label="Họ và tên:" name="userName" rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản!' }]}>
                    <Input placeholder="Nhập tên người dùng..." />
                </Form.Item>

                <Form.Item label="Email:" name="email" rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
                    <Input placeholder="Nhập email..." />
                </Form.Item>

                <Form.Item label="Số điện thoại:" name="phoneNumber" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
                    <Input placeholder="Nhập số điện thoại..." />
                </Form.Item>
                <Row>
                    <Col span={12}>
                        <Form.Item label="Ngày sinh:" name="birthOfDay" rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}>
                            <DatePicker placeholder="Chọn ngày sinh" style={{ width: '100%' }} format="DD/MM/YYYY" />
                        </Form.Item>
                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={11}>
                        <Form.Item label="Giới tính:" name="gender" initialValue={true} rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}>
                            <Radio.Group name="radiogroup" style={{ float: 'left' }}>
                                <Radio value={true}>Nam</Radio>
                                <Radio value={false}>Nữ</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
                <Button type='primary' style={{ width: '100px' }}>Lưu</Button>
            </Form>
        </Col>
    )
};
export default User;




