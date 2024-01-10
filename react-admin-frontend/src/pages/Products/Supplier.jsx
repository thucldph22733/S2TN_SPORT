import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Table, Space, Button, Input, Form, Modal, notification, Radio, Popconfirm, Tag, Switch } from 'antd';
import {
    PlusOutlined,
    RedoOutlined,
    FormOutlined,
    DeleteOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import './Product.css'
import SupplierService from '~/service/SupplierService';
import FormatDate from '~/utils/format-date';

const { TextArea } = Input;


function Supplier() {

    const [loading, setLoading] = useState(false);

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

    const [suppliers, setSuppliers] = useState([]);

    const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });

    const [deleted, setDeleted] = useState(null);

    const [searchName, setSearchName] = useState(null);

    const [searchPhone, setSearchPhone] = useState(null);

    const [searchEmail, setSearchEmail] = useState(null);


    const fetchSuppliers = async () => {
        setLoading(true);

        await SupplierService.getAll(pagination.current - 1, pagination.pageSize, searchName, searchPhone, searchEmail, deleted)
            .then(response => {
                setSuppliers(response.data);
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
        fetchSuppliers();
    }, [pagination.current, pagination.pageSize, searchName, searchPhone, searchEmail, deleted]);


    const handleDelete = async (id) => {

        await SupplierService.delete(id).then(() => {

            fetchSuppliers();
        }).catch(error => {
            console.error(error);
            notification.error({
                message: 'Thông báo',
                description: 'Đã xảy ra lỗi!',
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


        const searchNameFilter = filters?.supplierName;
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
        filteredValue: dataIndex === 'supplierName' ? [searchName] : dataIndex === 'phoneNumber' ? [searchPhone] : [searchEmail],
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
            title: 'Tên nhà cung cấp',
            dataIndex: 'supplierName',
            key: 'supplierName',
            width: '15%',
            filterIcon: <SearchOutlined style={{ fontSize: '14px', color: 'rgb(158, 154, 154)' }} />,
            ...getColumnSearchProps('supplierName')
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
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: '10%',
            filterIcon: <SearchOutlined style={{ fontSize: '14px', color: 'rgb(158, 154, 154)' }} />,
            ...getColumnSearchProps('phoneNumber')
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            width: '14%',
        },
        {
            title: 'Ghi chú',
            dataIndex: 'supplierDescribe',
            key: 'supplierDescribe',
            width: '15%',
        },
        {
            title: 'Trạng thái',
            key: 'deleted',
            dataIndex: 'deleted',
            width: '16%',
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

                return <Space size="middle">
                    <Button type="text"
                        icon={<FormOutlined style={{ color: 'rgb(214, 103, 12)' }} />}
                        onClick={() => showModal("edit", record)} />
                    <Switch
                        size="small"
                        defaultChecked={record.deleted}
                        onClick={() => handleDelete(record.id)}
                    />

                </Space>
            }

        },
    ];

    return (
        <>
            <h3 style={{ marginBottom: '16px', float: 'left', color: '#2123bf' }}>Danh sách nhà cung cấp</h3>

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
                dataSource={suppliers.map((supplier) => ({
                    ...supplier,
                    key: supplier.id,
                    createdAt: FormatDate(supplier.createdAt)
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

            {open.isModal && <SupplierModal
                isMode={open.isMode}
                reacord={open.reacord}
                hideModal={hideModal}
                isModal={open.isModal}
                fetchSuppliers={fetchSuppliers} />}
        </>
    )
};
export default Supplier;


const SupplierModal = ({ isMode, reacord, hideModal, isModal, fetchSuppliers }) => {

    const [form] = Form.useForm();

    const handleCreate = () => {
        form.validateFields().then(async () => {

            const data = form.getFieldsValue();

            await SupplierService.create(data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Thêm mới thành công!',
                    });
                    fetchSuppliers();
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

            const data = form.getFieldsValue();

            await SupplierService.update(reacord.id, data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Cập nhật thành công!',
                    });
                    fetchSuppliers();
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
            title={isMode === "edit" ? "Cập nhật nhà cung cấp" : "Thêm mới một nhà cung cấp"}
            open={isModal}
            onOk={isMode === "edit" ? handleUpdate : handleCreate}
            onCancel={hideModal}
            okText={isMode === "edit" ? "Cập nhật" : "Thêm mới"}
            cancelText="Hủy bỏ"
        >
            <Form
                name="wrap"
                labelCol={{ flex: '100px' }}
                labelAlign="left"
                labelWrap
                wrapperCol={{ flex: 1 }}
                colon={false}
                style={{ maxWidth: 600, marginTop: '25px' }}
                form={form}
                initialValues={{ ...reacord }}
            >
                <Form.Item label="Tên:" name="supplierName" rules={[{ required: true, message: 'Vui lòng nhập tên nhà cung cấp!' }]}>
                    <Input placeholder="Nhập tên..." />
                </Form.Item>

                <Form.Item label="Email:" name="email" >
                    <Input placeholder="Nhập email..." />
                </Form.Item>

                <Form.Item label="Sdt:" name="phoneNumber" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
                    <Input placeholder="Nhập số điện thoại..." />
                </Form.Item>

                <Form.Item label="Địa chỉ:" name="address" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}>
                    <Input placeholder="Nhập dịa chỉ..." />
                </Form.Item>

                <Form.Item label="Ghi chú:" name="supplierDescribe">
                    <TextArea rows={4} placeholder="Nhập ghi chú..." />
                </Form.Item>

                <Form.Item label="Trạng thái:" name="deleted" initialValue={true}>
                    <Radio.Group name="radiogroup" style={{ float: 'left' }}>
                        <Radio value={true}>Đang hoạt động</Radio>
                        <Radio value={false}>Ngừng hoạt động</Radio>
                    </Radio.Group>
                </Form.Item>

            </Form>
        </Modal>
    );
};

