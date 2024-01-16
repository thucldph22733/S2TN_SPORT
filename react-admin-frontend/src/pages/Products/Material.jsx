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
import MaterialService from '~/service/MaterialService';
import FormatDate from '~/utils/format-date';

const { TextArea } = Input;

function Material() {

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

    const [materials, setMaterials] = useState([]);

    const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });

    const [deleted, setDeleted] = useState(null);

    const [searchText, setSearchText] = useState(null);

    const fetchMaterials = async () => {
        setLoading(true);

        await MaterialService.getAll(pagination.current - 1, pagination.pageSize, searchText, deleted)
            .then(response => {

                setMaterials(response.data);

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
        fetchMaterials();
    }, [pagination.current, pagination.pageSize, searchText, deleted]);


    const handleDelete = async (id) => {

        await MaterialService.delete(id).then(() => {

            fetchMaterials();
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
        const searchFilter = filters?.materialName;
        // Kiểm tra nếu statusFilter không tồn tại hoặc là mảng rỗng
        const isNoStatusFilter = !statusFilter || statusFilter.length === 0;

        if (searchFilter) {
            setSearchText(searchFilter[0]);
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
            render: (value, item, index) => (pagination.current - 1) * pagination.pageSize + index + 1
        },
        {
            title: 'Tên chất liệu',
            dataIndex: 'materialName',
            key: 'materialName',
            width: '20%',
            filterIcon: <SearchOutlined style={{ fontSize: '14px', color: 'rgb(158, 154, 154)' }} />,
            ...getColumnSearchProps('materialName')
        },
        {
            title: 'Ghi chú',
            dataIndex: 'materialDescribe',
            key: 'materialDescribe',
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
            <h3 style={{ marginBottom: '16px', float: 'left', color: '#2123bf' }}>Danh sách chất liệu</h3>

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
                dataSource={materials.map((material, index) => ({
                    ...material,
                    key: index + 1,
                    createdAt: FormatDate(material.createdAt)
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

            {open.isModal && <MaterialModal
                isMode={open.isMode}
                reacord={open.reacord || {}}
                hideModal={hideModal}
                isModal={open.isModal}
                materials={materials}
                fetchMaterials={fetchMaterials} />}
        </>
    )
};
export default Material;


const MaterialModal = ({ isMode, reacord, hideModal, isModal, fetchMaterials, materials }) => {

    const [form] = Form.useForm();

    const handleCreate = () => {
        form.validateFields().then(async () => {

            const data = form.getFieldsValue();

            await MaterialService.create(data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Thêm mới thành công!',
                    });
                    fetchMaterials();
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

            await MaterialService.update(reacord.id, data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Cập nhật thành công!',
                    });
                    fetchMaterials();
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
            title={isMode === "edit" ? "Cập nhật chất liệu" : "Thêm mới một chất liệu"}
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
                <Form.Item label="Tên:" name="materialName"
                    rules={[{ required: true, message: 'Vui lòng nhập tên chất liệu!' },
                    {
                        validator: (_, value) => {
                            if (!value) {
                                return Promise.resolve(); // Không thực hiện validate khi giá trị rỗng
                            }
                            const trimmedValue = value.trim(); // Loại bỏ dấu cách ở đầu và cuối
                            const lowercaseValue = trimmedValue.toLowerCase(); // Chuyển về chữ thường
                            const isDuplicate = materials.some(
                                (material) => material.materialName.trim().toLowerCase() === lowercaseValue && material.id !== reacord.id
                            );
                            if (isDuplicate) {
                                return Promise.reject('Tên chất liệu đã tồn tại!');
                            }
                            // Kiểm tra dấu cách ở đầu và cuối
                            if (/^\s|\s$/.test(value)) {
                                return Promise.reject('Tên chất liệu không được chứa dấu cách ở đầu và cuối!');
                            }
                            return Promise.resolve();
                        },
                    },
                    ]}>
                    <Input placeholder="Nhập tên chất liệu..." />
                </Form.Item>

                <Form.Item label="Ghi chú" name="materialDescribe">
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

