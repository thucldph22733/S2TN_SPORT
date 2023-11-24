import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Table, Space, Button, Input, Form, Modal, notification, Radio, Popconfirm, DatePicker, InputNumber } from 'antd';
import {
    PlusOutlined,
    RedoOutlined,
    FormOutlined,
    DeleteOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import './Voucher.css'
import VoucherService from '~/service/VoucherService';
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
function Voucher() {

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

    const [Vouchers, setVouchers] = useState([]);

    const [pagination, setPagination] = useState({ pageNo: 1, pageSize: 5 });

    const [filteredStatus, setFilteredStatus] = useState(null);

    const searchText = useRef(null);

    const [totalCount, setTotalCount] = useState(1);

    // const fetchVouchers = async () => {
    //     setLoading(true);

    //     await VoucherService.getAll(pagination.pageNo - 1, pagination.pageSize, searchText.current, filteredStatus)
    //         .then(response => {

    //             setVouchers(response.data);

    //             setTotalCount(response.totalCount);

    //             setLoading(false);

    //         }).catch(error => {
    //             console.error(error);
    //         })
    // }

    useEffect(() => {
        // fetchVouchers();
    }, [pagination]);


    const handleDelete = async (id) => {

        await VoucherService.delete(id).then(response => {
            console.log(response.data);
            notification.success({
                message: 'Thông báo',
                description: 'Xóa thành công!',
            });
            // fetchVouchers();
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
        // fetchVouchers();
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        searchText.current = selectedKeys[0];
        // fetchVouchers();
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        searchText.current = null;
        // fetchVouchers();
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
            width: '4%',
        },
        {
            title: 'Tên giảm giá',
            dataIndex: 'voucherName',
            key: 'voucherName',
            width: '10%',
            ...getColumnSearchProps('voucherName')
        },
        {
            title: 'Kiểu giảm',
            dataIndex: 'typeVoucher',
            key: 'typeVoucher',
            width: '7%',
        },
        {
            title: 'Giảm giá',
            dataIndex: 'discountRate',
            key: 'discountRate',
            width: '7%',
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'startDate',
            key: 'startDate',
            width: '10%',
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'endDate',
            key: 'endDate',
            width: '10%',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            width: '7%',
        },
        {
            title: 'Đơn tối thiểu',
            dataIndex: 'orderMinimum',
            key: 'orderMinimum',
            width: '10%',
        },
        {
            title: 'Giảm tối đa',
            dataIndex: 'maxReduce',
            key: 'maxReduce',
            width: '10%',
        },

        {
            title: 'Trạng thái',
            key: 'deleted',
            dataIndex: 'deleted',
            width: '10%',
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
            width: '8%',
            render: (record) => {

                return <Space size="middle">
                    <Button type="text"
                        icon={<FormOutlined style={{ color: 'rgb(214, 103, 12)' }} />}
                        onClick={() => showModal("edit", record)} />
                    {record.deleted && <Popconfirm
                        title="Xóa giảm giá"
                        description="Bạn có chắc chắn xóa giảm giá này không?"
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
            <h2 style={{ marginBottom: '16px', float: 'left', color: '#2123bf' }}>Danh sách giảm giá</h2>

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
                dataSource={Vouchers.map((Voucher, index) => ({
                    ...Voucher,
                    key: index + 1,
                    createdAt: FormatDate(Voucher.createdAt)
                }))}
                // onChange={(_, filters) => {
                //     const status = filters.deleted && filters.deleted.length > 0 ? filters.deleted[0] : null;
                //     setFilteredStatus(status);
                //     fetchVouchers();
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

            {open.isModal && <VoucherModal
                isMode={open.isMode}
                reacord={open.reacord}
                hideModal={hideModal}
                isModal={open.isModal}
            // fetchVouchers={fetchVouchers} 
            />}
        </>
    )
};
export default Voucher;


const VoucherModal = ({ isMode, reacord, hideModal, isModal, fetchVouchers }) => {

    const [form] = Form.useForm();

    const handleCreate = () => {
        form.validateFields().then(async () => {

            const data = form.getFieldsValue();

            await VoucherService.create(data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Thêm mới thành công!',
                    });
                    // fetchVouchers();
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

            await VoucherService.update(reacord.id, data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Cập nhật thành công!',
                    });
                    // fetchVouchers();
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
        <div className='container'>
            <div className='col-8 offset-2'>
                <Modal
                    title={isMode === "edit" ? "Cập nhật giảm giá" : "Thêm mới một giảm giá"}
                    open={isModal}
                    onOk={isMode === "edit" ? handleUpdate : handleCreate}
                    onCancel={hideModal}
                    okText={isMode === "edit" ? "Cập nhật" : "Thêm mới"}
                    cancelText="Hủy bỏ"
                >
                    <Form
                        name="wrap"
                        labelCol={{ flex: '90px' }}
                        labelAlign="left"
                        // labelWrap/
                        // wrapperCol={{ flex: 1 }}
                        colon={false}
                        form={form}
                        initialValues={{ ...reacord }}

                    >
                        <Form.Item label="Tên:" name="voucherName" rules={[{ required: true, message: 'Vui lòng nhập tên giảm giá!' }]}>
                            <Input placeholder="Nhập tên..." />
                        </Form.Item>

                        <Form.Item label="Kiểu giảm:" name="typeVoucher" rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
                            <Input placeholder="Nhập email..." />
                        </Form.Item>


                        <div className='row'>
                            <Form.Item label="Ngày kết thúc:" name="endDate" className='col-md-6'>
                                <DatePicker />
                            </Form.Item>
                            <Form.Item label="Ngày bắt đầu:" name="startDate" className='col-md-6'>
                                <DatePicker />
                            </Form.Item>
                        </div>

                        <div className='row'>
                            <Form.Item label="Giảm giá:" name="discountRate" className='col-md-6'>
                                <Input placeholder="Nhập dịa chỉ..." />
                            </Form.Item>
                            <Form.Item label="Số lượng:" name="quantity" className='col-md-6' rules={[
                                {
                                    type: 'number',
                                    min: 0,
                                    max: 99,
                                },
                            ]}
                                initialValue={100}>
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                        </div>
                        <div className='row'>
                            <Form.Item label="Tối thiểu:" name="orderMinimum" className='col-md-6'>
                                <Input placeholder="Nhập dịa chỉ..." />
                            </Form.Item>
                            <Form.Item label="Giảm max:" name="maxReduce" className='col-md-6'>
                                <Input placeholder="Nhập dịa chỉ..." />
                            </Form.Item>
                        </div>


                        <Form.Item label="Mô tả:" name="VoucherDescribe" >
                            <TextArea rows={4} placeholder="Nhập mô tả giảm giá..." />
                        </Form.Item>

                        <Form.Item label="Trạng thái:" name="deleted" initialValue={true} >
                            <Radio.Group name="radiogroup" style={{ float: 'left' }}>
                                <Radio value={true}>Đang hoạt động</Radio>
                                <Radio value={false}>Ngừng hoạt động</Radio>
                            </Radio.Group>
                        </Form.Item>

                    </Form>
                </Modal>
            </div>
        </div>

    );
};

