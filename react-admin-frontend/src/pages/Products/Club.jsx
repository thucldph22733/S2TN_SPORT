import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Table, Space, Button, Input, Form, Modal, notification, Radio, Popconfirm, Select } from 'antd';
import {
    PlusOutlined,
    RedoOutlined,
    FormOutlined,
    DeleteOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import './Product.css'
import ClubService from '~/service/ClubService';
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
function Club() {

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

    const [Clubs, setClubs] = useState([]);

    const [pagination, setPagination] = useState({ pageNo: 1, pageSize: 5 });

    const [filteredStatus, setFilteredStatus] = useState(null);

    const searchText = useRef(null);

    const [totalCount, setTotalCount] = useState(1);

    const fetchClubs = async () => {
        setLoading(true);

        await ClubService.getAll(pagination.pageNo - 1, pagination.pageSize, searchText.current, filteredStatus)
            .then(response => {

                setClubs(response.data);
                console.log(response.data)
                setTotalCount(response.totalCount);

                setLoading(false);

            }).catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        fetchClubs();
    }, [pagination]);


    const handleDelete = async (id) => {

        await ClubService.delete(id).then(response => {
            console.log(response.data);
            notification.success({
                message: 'Thông báo',
                description: 'Xóa thành công!',
            });
            fetchClubs();
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
        fetchClubs();
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        searchText.current = selectedKeys[0];
        fetchClubs();
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        searchText.current = null;
        fetchClubs();
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
            title: 'Tên câu lạc bộ',
            dataIndex: 'clubName',
            key: 'clubName',
            width: '20%',
            ...getColumnSearchProps('clubName')
        },
        {
            title: 'Kiểu áo',
            dataIndex: 'typeClub',
            key: 'typeClub',
            width: '10%',
        },
        {
            title: 'Mô tả',
            dataIndex: 'clubDescribe',
            key: 'clubDescribe',
            width: '15%',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: '14%',
        },
        {
            title: 'Người tạo',
            dataIndex: 'createdBy',
            key: 'createdBy',
            width: '10%',
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
                        title="Xóa câu lạc bộ"
                        description="Bạn có chắc chắn xóa câu lạc bộ này không?"
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
            <h3 style={{ marginBottom: '16px', float: 'left', color: '#2123bf' }}>Danh sách câu lạc bộ</h3>

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
                dataSource={Clubs.map((Club, index) => ({
                    ...Club,
                    key: index + 1,
                    createdAt: FormatDate(Club.createdAt)
                }))}
                // onChange={(_, filters) => {
                //     const status = filters.deleted && filters.deleted.length > 0 ? filters.deleted[0] : null;
                //     setFilteredStatus(status);
                //     fetchClubs();
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

            {open.isModal && <ClubModal
                isMode={open.isMode}
                reacord={open.reacord}
                hideModal={hideModal}
                isModal={open.isModal}
                fetchClubs={fetchClubs} />}
        </>
    )
};
export default Club;


const ClubModal = ({ isMode, reacord, hideModal, isModal, fetchClubs }) => {

    const [form] = Form.useForm();

    const handleCreate = () => {
        form.validateFields().then(async () => {

            const data = form.getFieldsValue();

            await ClubService.create(data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Thêm mới thành công!',
                    });
                    fetchClubs();
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

            await ClubService.update(reacord.id, data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Cập nhật thành công!',
                    });
                    fetchClubs();
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
            title={isMode === "edit" ? "Cập nhật câu lạc bộ" : "Thêm mới một câu lạc bộ"}
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
                <Form.Item label="Tên:" name="clubName" rules={[{ required: true, message: 'Vui lòng nhập tên câu lạc bộ!' }]}>
                    <Input placeholder="Nhập tên câu lạc bộ..." />
                </Form.Item>

                <Form.Item label="Kiểu áo" name="typeClub" rules={[{ required: true, message: 'Vui lòng chọn kiểu áo!' }]}>
                    <Select style={{ width: '100%' }}
                        allowClear
                        options={[
                            {
                                value: 'Đội tuyển quốc gia',
                                label: 'Đội tuyển quốc gia',
                            },
                            {
                                value: 'Câu lạc bộ',
                                label: 'Câu lạc bộ',
                            },
                            {
                                value: 'Áo không logo',
                                label: 'Áo không logo',
                            },
                            {
                                value: 'Áo khác',
                                label: 'Áo khác',
                            },
                        ]}
                    />
                </Form.Item>

                <Form.Item label="Mô tả:" name="clubDescribe" >
                    <TextArea rows={4} placeholder="Nhập mô tả câu lạc bộ..." />
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

