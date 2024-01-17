import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Input, Form, Modal, notification, Radio, Popconfirm, DatePicker, Row, Col, Select, Tag, Card } from 'antd';
import { FaMapMarkedAlt } from "react-icons/fa";
import { PiLockKeyOpenFill, PiLockKeyFill } from "react-icons/pi";
import {
    PlusOutlined,
    RedoOutlined,
    FormOutlined,
    SearchOutlined,
    FileDoneOutlined,
    FilterOutlined,
} from '@ant-design/icons';
import UserService from '~/service/UserService';
import FormatDate from '~/utils/format-date';
import dayjs from 'dayjs';
import RoleService from '~/service/RoleService';
import ShowAddressModal from './Address';

const { TextArea } = Input;


function User() {

    const userString = localStorage.getItem('user1');
    const user = userString ? JSON.parse(userString) : null;
    console.log("user:", user.role);
    const [loading, setLoading] = useState(false);
    //Mở modal hiển thị address
    const [addressModal, setAddressModal] = useState({ isModal: false, reacord: null });

    const showAddressModal = (record) => {
        setAddressModal({
            isModal: true,
            reacord: record,
        });
    };

    const hideAddressModal = () => {
        setAddressModal({ isModal: false });
    };

    const [open, setOpen] = useState({ isModal: false, isMode: '', reacord: null });

    const showModal = (mode, record) => {
        setOpen({
            isModal: true,
            isMode: mode,
            reacord: record,
        });
    };

    const hideModal = () => {
        setOpen({ isModal: false });
    };

    const handleDelete = async (id) => {
        const status = users.map((item) => item.role === "ADMIN")

        await UserService.delete(id).then(response => {
            console.log(response.ata);
            notification.success({
                message: 'Thông báo',
                description: 'Xử lý thành công!',
            });
            fetchUsers();
        }).catch(error => {
            console.error(error);
            notification.error({
                message: 'Thông báo',
                description: 'Đã lỗi xảy ra!',
            });
        });

    };


    const [users, setUsers] = useState([]);

    const [filterUser, setFilterUser] = useState({
        keyword: null,
        birthOfDay: null,
        gender: null,
        status: null,
        pageNo: 0,
        pageSize: 5
    });

    const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });

    const fetchUsers = async () => {
        setLoading(true);
        await UserService.getAllUserByFilter(filterUser)
            .then(response => {

                setUsers(response.data);

                setPagination({
                    ...pagination,
                    total: response.totalCount,
                });
                setLoading(false)
            }).catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        fetchUsers();
    }, [filterUser]);
    const handleTableChange = (pagination) => {
        setPagination({
            ...pagination,
        });
        setFilterUser({
            ...filterUser,
            pageNo: pagination.current - 1,
            pageSize: pagination.pageSize,
        });
    };
    const handleFilterUserChange = (property, value) => {
        setFilterUser({
            ...filterUser,
            [property]: value,
            pageNo: 0,
        });
    };
    const [searchKeywordUser, setSearchKeywordUser] = useState(null);
    const handleSearchUser = () => {
        setFilterUser({
            ...filterUser,
            keyword: searchKeywordUser,
            pageNo: 0,
        });
    };
    const handleResetUser = () => {
        setSearchKeywordUser(null)
        setFilterUser({
            keyword: null,
            birthOfDay: null,
            gender: null,
            status: null,
            pageNo: 0,
            pageSize: 5
        });
        setPagination({
            ...pagination,
            current: 1,
            pageSize: 5,
        });
    };
    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            width: '5%',
            render: (value, item, index) => (pagination.current - 1) * pagination.pageSize + index + 1

        },
        {
            title: 'Tên',
            dataIndex: 'userName',
            key: 'userName',
            width: '20%',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: '15%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '15%',
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            width: '10%',
            render: (text) => {
                return text !== null ? (text === true ? "Nam" : "Nữ") : '';
            },
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthOfDay',
            key: 'birthOfDay',
            width: '10%',

        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: '15%',
        },
        {
            title: 'Trạng thái',
            key: 'deleted',
            dataIndex: 'deleted',
            width: '10%',
            render: (text) => (
                text ? <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="#108ee9">Hoạt động</Tag>
                    : <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="#f50">Tạm khóa</Tag>
            )
        },
        {
            title: 'Hành động',
            key: 'action',
            width: '10%',
            render: (record) => {

                return <Space size="middle" >
                    <Button type="text"
                        icon={<FormOutlined style={{ color: 'rgb(214, 103, 12)' }} />}
                        onClick={() => showModal("edit", record)} />
                    <Popconfirm
                        title={record.deleted ? "Khóa tài khoản" : "Mở khóa tài khoản"}
                        description={record.deleted ? "Bạn có chắc muốn khóa tài khoản này không?" : "Bạn có chắc muốn mở lại tài khoản này không?"}
                        placement="leftTop"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Đồng ý"
                        cancelText="Hủy bỏ"
                    >
                        <Button
                            disabled={record.role === "ADMIN" ? true : false}
                            type="text"
                            icon={record.deleted ? <PiLockKeyOpenFill style={{ color: '#7859f2', fontSize: '17px' }} /> : <PiLockKeyFill style={{ color: '#7859f2', fontSize: '17px' }} />}
                        />
                    </Popconfirm>

                    <Button type="text"
                        icon={<FaMapMarkedAlt />}
                        style={{ color: '#5a76f3', fontSize: '16px' }}
                        onClick={() => showAddressModal(record)}
                    />
                </Space>
            }
        },
    ];
    return (
        <>
            <Card
                title={<span style={{ color: '#5a76f3' }}><FilterOutlined /> Lọc</span>}
                style={{ borderRadius: '10px' }}
            >
                <Row>
                    <Col span={12} style={{ padding: '0 100px' }}>
                        <DatePicker
                            format="DD/MM/YYYY"
                            style={{
                                width: '100%',
                                borderRadius: '5px',
                            }}

                            placeholder="Ngày sinh"
                            value={filterUser.birthOfDay}
                            onChange={(value) => handleFilterUserChange('birthOfDay', value)}
                        />
                    </Col>
                    <Col span={12} style={{ padding: '0 100px' }}>
                        <Select
                            style={{
                                width: '100%',
                            }}
                            allowClear
                            placeholder="Giới tính"
                            value={filterUser.gender}
                            onChange={(value) => handleFilterUserChange('gender', value)}
                            options={[
                                {
                                    value: true,
                                    label: 'Nam',
                                },
                                {
                                    value: false,
                                    label: 'Nữ',
                                },
                            ]}
                        />
                    </Col>
                </Row>

                <Row style={{ marginTop: '20px' }}>
                    <Col span={12} style={{ padding: '0 100px' }}>
                        <Select
                            style={{
                                width: '100%',
                            }}
                            allowClear
                            placeholder="Trạng thái"
                            value={filterUser.status}
                            onChange={(value) => handleFilterUserChange('status', value)}
                            options={[
                                {
                                    value: true,
                                    label: 'Hoạt động',
                                },
                                {
                                    value: false,
                                    label: 'Tạm khóa',
                                },
                            ]}
                        />
                    </Col>
                    <Col span={12} style={{ padding: '0 100px' }}>
                        <Input.Search

                            placeholder="Nhập mã, tên, sdt, email..."
                            value={searchKeywordUser}
                            onChange={(e) => setSearchKeywordUser(e.target.value)}
                            onSearch={handleSearchUser}
                        />
                    </Col>
                </Row>

            </Card>
            <Card
                title={<span style={{ color: '#5a76f3' }}><FileDoneOutlined />  Danh sách người dùng</span>}
                style={{ marginTop: '25px', borderRadius: '10px' }}
            >
                <Button type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => showModal("add")}
                    style={{ marginBottom: '5px', float: 'right', borderRadius: '2px' }} >
                    Thêm mới
                </Button>

                <Button type="primary"
                    icon={<RedoOutlined style={{ fontSize: '18px' }} />}
                    style={{ marginBottom: '5px', float: 'right', marginRight: '6px', borderRadius: '4px', }}
                    onClick={handleResetUser}
                />

                <Table
                    dataSource={users.map((user, index) => ({
                        ...user,
                        key: index + 1,
                        createdAt: FormatDate(user.createdAt),
                        birthOfDay: user.birthOfDay ? dayjs(user.birthOfDay).format("DD/MM/YYYY") : '',
                    }))}

                    onChange={handleTableChange}
                    loading={loading}
                    columns={columns}
                    pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        defaultPageSize: 5,
                        pageSizeOptions: ['5', '10', '15'],
                        total: pagination.total,
                        showSizeChanger: true,
                    }}></Table >
            </Card>

            {open.isModal && <UserModal
                isMode={open.isMode}
                reacord={open.reacord || {}}
                hideModal={hideModal}
                users={users}
                isModal={open.isModal}
                fetchUsers={fetchUsers} />}


            {addressModal.isModal && <ShowAddressModal
                reacord={addressModal.reacord}
                hideModal={hideAddressModal}
                isModal={addressModal.isModal}
            />}


        </>
    )
};
export default User;


const UserModal = ({ isMode, reacord, hideModal, isModal, fetchUsers, users }) => {

    const [form] = Form.useForm();

    const handleCreate = () => {
        form.validateFields().then(async () => {

            const data = await form.getFieldsValue();
            console.log(data)
            await UserService.create(data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Thêm mới thành công!',
                    });
                    fetchUsers();
                    // Đóng modal
                    hideModal();
                })
                .catch(error => {
                    notification.error({
                        message: 'Thông báo',
                        description: 'Thêm mới thất bại!',
                    });
                    console.error(error);
                });

        }).catch(error => {
            console.error(error);
        })

    }
    const handleUpdate = () => {
        form.validateFields().then(async () => {

            const data = await form.getFieldsValue();

            await UserService.update(reacord.id, data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Cập nhật thành công!',
                    });
                    fetchUsers();
                    // Đóng modal
                    hideModal();
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

        <Modal
            width={750}
            title={isMode === "edit" ? "Cập nhật tài khoản người dùng" : "Thêm mới một tài khoản người dùng"}
            open={isModal}
            onOk={isMode === "edit" ? handleUpdate : handleCreate}
            onCancel={hideModal}
            okText={isMode === "edit" ? "Cập nhật" : "Thêm mới"}
            cancelText="Hủy bỏ"
        >
            <Form
                name="wrap"
                labelCol={{ flex: '110px' }}
                labelAlign="left"
                labelWrap
                wrapperCol={{ flex: 1 }}
                colon={false}
                style={{ marginTop: '25px' }}
                form={form}
                initialValues={{
                    ...reacord,
                    ...(reacord?.birthOfDay && { birthOfDay: dayjs(reacord.birthOfDay, "DD/MM/YYYY") }),
                }}
            >
                <Form.Item label="Tên:" name="userName" rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản!' },
                {
                    validator: (_, value) => {
                        if (!value) {
                            return Promise.resolve(); // Không thực hiện validate khi giá trị rỗng
                        }

                        // Kiểm tra dấu cách ở đầu và cuối
                        if (/^\s|\s$/.test(value)) {
                            return Promise.reject('Tên người dùng không được chứa dấu cách ở đầu và cuối!');
                        }
                        return Promise.resolve();
                    },
                },
                ]}>
                    <Input placeholder="Nhập tên người dùng..." />
                </Form.Item>

                <Form.Item label="Email:" name="email"
                    rules={[
                        { required: true, type: 'email', message: 'Vui lòng nhập email!' },
                        {
                            pattern: /^[a-zA-Z0-9._-]+@gmail\.com$/,
                            message: 'Email không đúng định dạng!',
                        },
                        // { max: 320, message: 'Email không đúng định dạng' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {

                                if (!value) {
                                    return Promise.resolve();
                                }

                                const trimmedValue = value.trim(); // Loại bỏ dấu cách ở đầu và cuối
                                const lowercaseValue = trimmedValue.toLowerCase(); // Chuyển về chữ thường
                                const isDuplicate = users.some(
                                    (user) => user.email.trim().toLowerCase() === lowercaseValue && user.id !== reacord.id
                                );
                                if (isDuplicate) {
                                    return Promise.reject('Email đã tồn tại!');
                                }

                                return Promise.resolve();
                            },
                        }),
                    ]}>
                    <Input placeholder="Nhập email..." />
                </Form.Item>
                <Form.Item
                    label="Số điện thoại:"
                    name="phoneNumber"
                    rules={[
                        { required: true, message: 'Vui lòng nhập số điện thoại!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                const phoneNumberRegex = /^[0-9]{10,12}$/;

                                if (!value) {
                                    return Promise.resolve();
                                }

                                const trimmedValue = value.trim(); // Loại bỏ dấu cách ở đầu và cuối
                                const lowercaseValue = trimmedValue.toLowerCase(); // Chuyển về chữ thường
                                const isDuplicate = users.some(
                                    (user) => user.phoneNumber.trim().toLowerCase() === lowercaseValue && user.id !== reacord.id
                                );
                                if (isDuplicate) {
                                    return Promise.reject('Số điện thoại đã tồn tại!');
                                }

                                if (!phoneNumberRegex.test(value)) {
                                    // notification.error({
                                    //     message: 'Lỗi',
                                    //     description: 'Số điện thoại không đúng định dạng!',
                                    // });
                                    return Promise.reject('Số điện thoại không đúng định dạng!');
                                }

                                return Promise.resolve();
                            },
                        }),
                    ]}
                >
                    <Input placeholder="Nhập số điện thoại..." />
                </Form.Item>

                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="Ngày sinh:"
                            name="birthOfDay"
                            rules={[
                                {
                                    required: false,
                                    message: 'Vui lòng chọn ngày sinh!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        const selectedDate = new Date(value);
                                        const currentDate = new Date();

                                        if (selectedDate > currentDate) {
                                            return Promise.reject(new Error('Ngày sinh không lớn hơn ngày hiện tại!'));
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                        >
                            <DatePicker placeholder="Chọn ngày sinh" style={{ width: '100%' }} format="DD/MM/YYYY" />
                        </Form.Item>

                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={11}>
                        <Form.Item label="Giới tính:" name="gender" initialValue={true} >
                            <Radio.Group name="radiogroup" style={{ float: 'left' }}>
                                <Radio value={true}>Nam</Radio>
                                <Radio value={false}>Nữ</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
                {isMode === "add" &&
                    <Form.Item
                        label="Mật khẩu:"
                        name="password"
                        rules={[
                            isMode === "add" && { required: true, message: 'Vui lòng nhập mật khẩu!' },
                            {
                                validator: (_, value) => {
                                    if (/\s/.test(value)) {
                                        return Promise.reject('Mật khẩu không được chứa dấu cách!');
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <Input type="password" placeholder="Nhập tên mật khẩu..." />
                    </Form.Item>
                }
                <Form.Item label="Vai trò:" name="role" rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}>
                    <Select
                        allowClear
                        style={{
                            width: '100%',
                        }}
                        placeholder="Chọn vai trò"
                        options={[

                            {
                                value: 'ADMIN',
                                label: 'ADMIN',
                            },
                            {
                                text: 'USER',
                                value: 'USER',
                            },
                            {
                                text: 'EMPLOYEE',
                                value: 'EMPLOYEE',
                            },
                        ]}
                    />

                </Form.Item>
                <Form.Item label="Trạng thái:" name="deleted" initialValue={true} >
                    <Radio.Group name="radiogroup" style={{ float: 'left' }}>
                        <Radio value={true}>Hoạt động</Radio>
                        <Radio value={false}>Tạm khóa</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    );
};


