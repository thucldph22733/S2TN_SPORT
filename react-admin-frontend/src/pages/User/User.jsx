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
import FormatDate from '~/utils/format-date';
import dayjs from 'dayjs';
import RoleService from '~/service/RoleService';
import ShowAddressModal from './Address';

const { TextArea } = Input;


function User() {

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

    const [users, setUsers] = useState([]);

    const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });

    const [deleted, setDeleted] = useState(null);

    const [searchName, setSearchName] = useState(null);

    const [searchPhone, setSearchPhone] = useState(null);

    const [searchEmail, setSearchEmail] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);

        await UserService.getAll(pagination.current - 1, pagination.pageSize, searchName, searchPhone, searchEmail, deleted)
            .then(response => {

                setUsers(response.data);
                setPagination({
                    ...pagination,
                    total: response.totalCount,
                });
                setLoading(false);

            }).catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        fetchUsers();
    }, [pagination.current, pagination.pageSize, searchName, searchPhone, searchEmail, deleted]);


    const handleDelete = async (id) => {

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

    const handleReset = () => {

        setSearchEmail(null);
        setSearchName(null);
        setSearchPhone(null);
        setDeleted(null);

        setPagination({
            ...pagination,
            current: 1,
        });
        handleTableChange(pagination, null)
    };


    const handleTableChange = (pagination, filters) => {
        console.log(filters)
        setPagination({
            ...pagination,
        });

        const searchNameFilter = filters?.userName;
        if (searchNameFilter) {
            setSearchName(searchNameFilter[0]);
        } else {
            setSearchName(null)
        }

        const searchPhoneFilter = filters?.phoneNumber;
        if (searchPhoneFilter) {
            setSearchPhone(searchPhoneFilter[0]);
        } else {
            setSearchPhone(null)
        }

        const searchEmailFilter = filters?.email;
        if (searchEmailFilter) {
            setSearchEmail(searchEmailFilter[0]);
        } else {
            setSearchEmail(null)
        }

        const statusFilter = filters?.deleted;
        const isNoStatusFilter = !statusFilter || statusFilter.length === 0;

        if (!isNoStatusFilter) {
            const isBothStatus = statusFilter.length === 2;

            setDeleted(isBothStatus ? null : statusFilter[0]);
        } else {
            setDeleted(null);
        }
    };

    const getColumnSearchProps = (dataIndex) => ({
        filteredValue: dataIndex === 'userName' ? [searchName] : dataIndex === 'phoneNumber' ? [searchPhone] : [searchEmail],
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
            <Input.Search
                placeholder={`Nhập từ khóa...`}
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onSearch={(value) => {
                    setSelectedKeys(value ? [value.trim()] : []);
                    confirm();
                }}
                style={{ display: 'block' }}
            />
        ),
    });

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            width: '5%',
        },
        {
            title: 'Tên',
            dataIndex: 'userName',
            key: 'userName',
            width: '15%',
            filterIcon: <SearchOutlined style={{ fontSize: '14px', color: 'rgb(158, 154, 154)' }} />,
            ...getColumnSearchProps('userName')
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: '15%',
            filterIcon: <SearchOutlined style={{ fontSize: '14px', color: 'rgb(158, 154, 154)' }} />,
            ...getColumnSearchProps('phoneNumber')
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '15%',
            filterIcon: <SearchOutlined style={{ fontSize: '14px', color: 'rgb(158, 154, 154)' }} />,
            ...getColumnSearchProps('email')
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
            width: '15%',
            filters: [
                {
                    text: 'Đang hoạt động',
                    value: true,
                },
                {
                    text: 'Ngừng hoạt động',
                    value: false,
                },
            ],
            onFilter: (value, record) => record.deleted === value,
            render: (text) => (
                text ? <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="#108ee9">Đang hoạt động</Tag>
                    : <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="#f50">Ngừng hoạt động</Tag>
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
            <h3 style={{ marginBottom: '16px', float: 'left', color: '#2123bf' }}>Danh sách tài khoản</h3>

            <Button type="primary"
                icon={<PlusOutlined />}
                onClick={() => showModal("add")}
                style={{ marginBottom: '16px', float: 'right', borderRadius: '2px' }} >
                Thêm mới
            </Button>

            <Button type="primary"
                icon={<RedoOutlined style={{ fontSize: '18px' }} />}
                style={{ marginBottom: '16px', float: 'right', marginRight: '6px', borderRadius: '4px', }}
                onClick={handleReset}
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

            {open.isModal && <UserModal
                isMode={open.isMode}
                reacord={open.reacord}
                hideModal={hideModal}
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


const UserModal = ({ isMode, reacord, hideModal, isModal, fetchUsers }) => {

    const [form] = Form.useForm();
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        fetchRoles()
    }, []);
    const fetchRoles = async () => {

        await RoleService.findAllByDeletedTrue()
            .then(response => {

                setRoles(response.data)

            }).catch(error => {
                console.error(error);
            })
    }
    const handleCreate = () => {
        form.validateFields().then(async () => {

            const data = await form.getFieldsValue();

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

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    return (

        <Modal
            width={650}
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
                style={{ maxWidth: 600, marginTop: '25px' }}
                form={form}
                initialValues={{
                    ...reacord,
                    ...(reacord?.birthOfDay && { birthOfDay: dayjs(reacord.birthOfDay, "DD/MM/YYYY") }),
                }}
            >
                <Form.Item label="Tên:" name="userName" rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản!' }]}>
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
                {isMode === "add" && <Form.Item label="Mật khẩu:" name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
                    <Input type="password" placeholder="Nhập tên mật khẩu..." />
                </Form.Item>}
                <Form.Item label="Vai trò:" name="roleList" rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}>
                    <Select
                        mode="tags"
                        style={{
                            width: '100%',
                        }}
                        placeholder="Chọn vai trò"
                        onChange={handleChange}
                        options={roles.map(option => ({ value: option.roleName, label: option.roleName }))}
                    />
                </Form.Item>
                <Form.Item label="Trạng thái:" name="deleted" initialValue={true} rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản!' }]} >
                    <Radio.Group name="radiogroup" style={{ float: 'left' }}>
                        <Radio value={true}>Đang hoạt động</Radio>
                        <Radio value={false}>Ngừng hoạt động</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    );
};


