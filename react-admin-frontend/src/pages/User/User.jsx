import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Table, Space, Button, Input, Form, Modal, notification, Radio, Popconfirm, DatePicker, Row, Col, Select, Tag } from 'antd';
import { FaMapMarkedAlt } from "react-icons/fa";

import {
    PlusOutlined,
    RedoOutlined,
    FormOutlined,
    DeleteOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import UserService from '~/service/UserService';
import FormatDate from '~/utils/format-date';
import dayjs from 'dayjs';
import RoleService from '~/service/RoleService';

const { TextArea } = Input;


function User() {

    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState({ isModal: false, isMode: '', reacord: null });

    // const handleStatusFilterChange = ({value:''}) => {
    //         setFilteredStatus(value);
    //     };

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

    const [Users, setUsers] = useState([]);

    const [pagination, setPagination] = useState({ pageNo: 1, pageSize: 5 });

    const [filteredStatus, setFilteredStatus] = useState(null);

    const searchText = useRef(null);

    const [totalCount, setTotalCount] = useState(1);

    const fetchUsers = async () => {
        setLoading(true);

        await UserService.getAll(pagination.pageNo - 1, pagination.pageSize)
            .then(response => {

                setUsers(response.data);

                setTotalCount(response.totalCount);

                setLoading(false);

            }).catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        fetchUsers();
    }, [pagination]);


    const handleDelete = async (id) => {

        await UserService.delete(id).then(response => {
            console.log(response.data);
            notification.success({
                message: 'Thông báo',
                description: 'Xóa thành công!',
            });
            fetchUsers();
        }).catch(error => {
            console.error(error);
            notification.error({
                message: 'Thông báo',
                description: 'Xóa thất bại!',
            });
        });

    };

    const handleResetPage = () => {
        setFilteredStatus(null);
        setPagination({ pageNo: 1, pageSize: 5 });
        fetchUsers();
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        searchText.current = selectedKeys[0];
        fetchUsers();
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        searchText.current = null;
        fetchUsers();
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchText}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchText.current?.select(), 1000);
            }
        },
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
            ...getColumnSearchProps('userName')
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
                return text === true ? "Nam" : "Nữ";
            }
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
            // onFilter: (filteredStatus, record) => record.deleted === filteredStatus,
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
                return <Space size="middle">
                    <Button type="text"
                        icon={<FormOutlined style={{ color: 'rgb(214, 103, 12)' }} />}
                        onClick={() => showModal("edit", record)} />
                    <Button type="text"
                        icon={<FaMapMarkedAlt />}
                        style={{ color: '#5a76f3', fontSize: '16px' }} />
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
                onClick={handleResetPage}
            />

            <Table
                dataSource={Users.map((user, index) => ({
                    ...user,
                    key: index + 1,
                    createdAt: FormatDate(user.createdAt),
                    birthOfDay: dayjs(user.birthOfDay).format("DD/MM/YYYY")
                }))}
                // onChange={(_, filters) => {
                //     const status = filters.deleted && filters.deleted.length > 0 ? filters.deleted[0] : null;
                //     setFilteredStatus(status);
                //     fetchUsers();
                // }}

                loading={loading}
                columns={columns}
                pagination={{
                    defaultPageSize: 5,
                    pageSizeOptions: ['5', '10', '15'],
                    total: totalCount,
                    showSizeChanger: true,
                    onChange: (pageNo, pageSize) => {
                        setPagination({ pageNo, pageSize })
                    },
                }}></Table >

            {open.isModal && <UserModal
                isMode={open.isMode}
                reacord={open.reacord}
                hideModal={hideModal}
                isModal={open.isModal}
                fetchUsers={fetchUsers} />}
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



