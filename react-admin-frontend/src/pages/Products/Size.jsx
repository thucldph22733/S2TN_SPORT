import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Table, Space, Button, Input, Form, Modal, notification, Radio, Popconfirm } from 'antd';
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

const getStatusBadgeStyle = (text) => {
    const backgroundColor = text === true ? 'rgb(66, 185, 126)' : 'rgb(243, 78, 28)';
    return {
        display: 'inline-block',
        padding: '4px 8px',
        borderRadius: '4px',
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor,
        color: 'white',
    };
};

const getStatusText = (text) => {
    return text === true ? 'Đang hoạt động' : 'Ngừng hoạt động';
};
function Size() {

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

    const [Sizes, setSizes] = useState([]);

    const [pagination, setPagination] = useState({ pageNo: 1, pageSize: 5 });

    const [filteredStatus, setFilteredStatus] = useState(null);

    const searchText = useRef(null);

    const [totalCount, setTotalCount] = useState(1);

    const fetchSizes = async () => {
        setLoading(true);

        await SizeService.getAll(pagination.pageNo - 1, pagination.pageSize, searchText.current, filteredStatus)
            .then(response => {

                setSizes(response.data);
                console.log(response.data);
                setTotalCount(response.totalCount);

                setLoading(false);

            }).catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        fetchSizes();
    }, [pagination]);


    const handleDelete = async (id) => {

        await SizeService.delete(id).then(response => {
            console.log(response.data);
            notification.success({
                message: 'Thông báo',
                description: 'Xóa thành công!',
            });
            fetchSizes();
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
        fetchSizes();
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        searchText.current = selectedKeys[0];
        fetchSizes();
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        searchText.current = null;
        fetchSizes();
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
            title: 'Tên kích thước',
            dataIndex: 'sizeName',
            key: 'sizeName',
            width: '20%',
            ...getColumnSearchProps('sizeName')
        },
        {
            title: 'Mô tả',
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
            // onFilter: (filteredStatus, record) => record.deleted === filteredStatus,
            render: (text) => (
                <span style={getStatusBadgeStyle(text)}>
                    {getStatusText(text)}
                </span>
            ),
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
                    {record.deleted && <Popconfirm
                        title="Xóa kích thước"
                        description="Bạn có chắc chắn xóa kích thước này không?"
                        placement="leftTop"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Đồng ý"
                        cancelText="Hủy bỏ"
                    >
                        <Button type="text" icon={<DeleteOutlined />} style={{ color: 'red' }} />
                    </Popconfirm>}

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
                onClick={handleResetPage}
            />

            <Table
                dataSource={Sizes.map((Size, index) => ({
                    ...Size,
                    key: index + 1,
                    createdAt: FormatDate(Size.createdAt)
                }))}
                // onChange={(_, filters) => {
                //     const status = filters.deleted && filters.deleted.length > 0 ? filters.deleted[0] : null;
                //     setFilteredStatus(status);
                //     fetchSizes();
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

            {open.isModal && <SizeModal
                isMode={open.isMode}
                reacord={open.reacord}
                hideModal={hideModal}
                isModal={open.isModal}
                fetchSizes={fetchSizes} />}
        </>
    )
};
export default Size;


const SizeModal = ({ isMode, reacord, hideModal, isModal, fetchSizes }) => {

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
                <Form.Item label="Tên:" name="sizeName" rules={[{ required: true, message: 'Vui lòng nhập tên kích thước!' }]}>
                    <Input placeholder="Nhập tên kích thước..." />
                </Form.Item>

                <Form.Item label="Mô tả:" name="sizeDescribe" >
                    <TextArea rows={4} placeholder="Nhập mô tả kích thước..." />
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

