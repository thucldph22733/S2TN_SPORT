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
import SizeService from '~/service/SizeService';
import FormatDate from '~/utils/format-date';

const { TextArea } = Input;

function Size() {

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

    const [sizes, setSizes] = useState([]);

    const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });

    const [deleted, setDeleted] = useState(null);

    const [searchText, setSearchText] = useState(null);

    const fetchSizes = async () => {
        setLoading(true);

        await SizeService.getAll(pagination.current - 1, pagination.pageSize, searchText, deleted)
            .then(response => {

                setSizes(response.data);
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
        fetchSizes();
    }, [pagination.current, pagination.pageSize, searchText, deleted]);


    const handleDelete = async (id) => {

        await SizeService.delete(id).then(() => {

            fetchSizes();
        }).catch(error => {
            console.error(error);
            notification.error({
                message: 'Thông báo',
                description: 'Đã có lỗi xảy ra!',
            });
        });

    };

    const handleReset = () => {

        setSearchText(null);
        setDeleted(null);

        setPagination({
            ...pagination,
            current: 1,
        });
        handleTableChange(pagination, null)
    };

    const handleTableChange = (pagination, filters) => {

        setPagination({
            ...pagination,
        });
        const statusFilter = filters?.deleted;
        const searchFilter = filters?.sizeName;
        // Kiểm tra nếu statusFilter không tồn tại hoặc là mảng rỗng
        const isNoStatusFilter = !statusFilter || statusFilter.length === 0;

        if (searchFilter) {
            setSearchText(filters.sizeName[0]);
        } else {
            setSearchText(null)
        }
        // Kiểm tra nếu có lựa chọn bộ lọc và không phải là trường hợp không chọn
        if (!isNoStatusFilter) {
            const isBothStatus = statusFilter.length === 2;

            // Sử dụng biểu thức điều kiện để xác định trạng thái để lọc
            setDeleted(isBothStatus ? null : statusFilter[0]);
        } else {
            // Nếu không có lựa chọn bộ lọc, đặt trạng thái deleted về null hoặc giá trị mặc định
            setDeleted(null);
        }
    };

    const getColumnSearchProps = (dataIndex) => ({
        filteredValue: [searchText] || null,
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
            <Input.Search
                placeholder={`Nhập tên...`}
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
            title: 'Tên kích thước',
            dataIndex: 'sizeName',
            key: 'sizeName',
            width: '20%',
            filterIcon: <SearchOutlined style={{ fontSize: '14px', color: 'rgb(158, 154, 154)' }} />,
            ...getColumnSearchProps('sizeName')
        },
        {
            title: 'Ghi chú',
            dataIndex: 'sizeDescribe',
            key: 'sizeDescribe',
            width: '19%',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: '15%',
        },
        {
            title: 'Người tạo',
            dataIndex: 'createdBy',
            key: 'createdBy',
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
            onFilter: (value, record) => record.deleted === value, render: (text) => (
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
            <h3 style={{ marginBottom: '16px', float: 'left', color: '#2123bf' }}>Danh sách kích thước</h3>

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
                dataSource={sizes.map((size, index) => ({
                    ...size,
                    key: index + 1,
                    createdAt: FormatDate(size.createdAt)
                }))}


                loading={loading}
                columns={columns}
                onChange={handleTableChange}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    defaultPageSize: 5,
                    pageSizeOptions: ['5', '10', '15'],
                    total: pagination.total,
                    showSizeChanger: true,
                }}></Table >

            {open.isModal && <SizeModal
                isMode={open.isMode}
                reacord={open.reacord || {}}
                sizes={sizes}
                hideModal={hideModal}
                isModal={open.isModal}
                fetchSizes={fetchSizes} />}
        </>
    )
};
export default Size;


const SizeModal = ({ isMode, reacord, hideModal, isModal, fetchSizes, sizes }) => {

    const [form] = Form.useForm();

    const handleCreate = () => {
        form.validateFields().then(async () => {

            const data = form.getFieldsValue();

            await SizeService.create(data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Thêm mới thành công!',
                    });
                    fetchSizes();
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

            await SizeService.update(reacord.id, data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Cập nhật thành công!',
                    });
                    fetchSizes();
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
            title={isMode === "edit" ? "Cập nhật kích thước" : "Thêm mới một kích thước"}
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
                <Form.Item label="Tên:" name="sizeName" rules={[{ required: true, message: 'Vui lòng nhập tên kích thước!' }
                    ,
                {
                    validator: (_, value) => {
                        if (!value) {
                            return Promise.resolve(); // Không thực hiện validate khi giá trị rỗng
                        }
                        const trimmedValue = value.trim();
                        const lowercaseValue = trimmedValue.toLowerCase();
                        const isDuplicate = sizes.some(
                            (size) => size.sizeName.trim().toLowerCase() === lowercaseValue && size.id !== reacord.id
                        );

                        if (isDuplicate) {
                            return Promise.reject('Tên kích thước đã tồn tại!');
                        }

                        if (/^\s|\s$/.test(value)) {
                            return Promise.reject('Tên kích thước không được chứa dấu cách ở đầu và cuối!');
                        }

                        return Promise.resolve();
                    },
                }
                    ,
                ]}>
                    <Input placeholder="Nhập tên kích thước..." />
                </Form.Item>

                <Form.Item label="Ghi chú:" name="sizeDescribe" >
                    <TextArea rows={4} placeholder="Nhập ghi chú..." />
                </Form.Item>

                <Form.Item label="Trạng thái:" name="deleted" initialValue={true} >
                    <Radio.Group name="radiogroup" style={{ float: 'left' }}>
                        <Radio value={true}>Đang hoạt động</Radio>
                        <Radio value={false}>Ngừng hoạt động</Radio>
                    </Radio.Group>
                </Form.Item>

            </Form>
        </Modal>
    );
};

