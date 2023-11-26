import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Table, Space, Button, Input, Form, Modal, notification, Radio, Row, Select, DatePicker, InputNumber, Col } from 'antd';
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
import dayjs from 'dayjs';
const { TextArea } = Input;
const { Option } = Select;
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
    return text === true ? 'Hoạt động' : 'Hết hạn';
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

    const [vouchers, setVouchers] = useState([]);

    const [pagination, setPagination] = useState({ pageNo: 1, pageSize: 5 });

    const [filteredStatus, setFilteredStatus] = useState(null);

    const searchText = useRef(null);

    const [totalCount, setTotalCount] = useState(1);

    const fetchVouchers = async () => {
        setLoading(true);

        await VoucherService.getAll(pagination.pageNo - 1, pagination.pageSize)
            .then(response => {

                const formattedData = response.data.map((voucher, index) => ({
                    ...voucher,
                    key: index + 1,
                    startDate: FormatDate(voucher.startDate),
                    endDate: FormatDate(voucher.endDate)
                }));

                setVouchers(formattedData);

                setTotalCount(response.totalCount);

                setLoading(false);

            }).catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        fetchVouchers();
    }, [pagination]);


    const handleDelete = async (id) => {

        await VoucherService.delete(id).then(response => {
            console.log(response.data);
            notification.success({
                message: 'Thông báo',
                description: 'Xóa thành công!',
            });
            fetchVouchers();
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
        fetchVouchers();
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        searchText.current = selectedKeys[0];
        fetchVouchers();
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        searchText.current = null;
        fetchVouchers();
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
            title: 'Mã',
            dataIndex: 'voucherCode',
            key: 'voucherCode',
            width: '7%',
        },
        {
            title: 'Tên',
            dataIndex: 'voucherName',
            key: 'voucherName',
            width: '10%',
            ...getColumnSearchProps('voucherName')
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
                    text: 'Hoạt động',
                    value: true,
                },
                {
                    text: 'Hết hạn',
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
            width: '7%',
            render: (record) => {

                return <Space size="middle">
                    <Button type="text"
                        icon={<FormOutlined style={{ color: 'rgb(214, 103, 12)' }} />}
                        onClick={() => showModal("edit", record)} />
                    {/* {record.deleted && <Popconfirm
                        title="Xóa giảm giá"
                        description="Bạn có chắc chắn xóa giảm giá này không?"
                        placement="leftTop"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Đồng ý"
                        cancelText="Hủy bỏ"
                    >
                        <Button type="text" icon={<DeleteOutlined />} style={{ color: 'red' }} />
                    </Popconfirm>} */}

                </Space>
            }

        },
    ];

    return (
        <>
            <h3 style={{ marginBottom: '16px', float: 'left', color: '#2123bf' }}>Danh sách giảm giá</h3>

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
                dataSource={vouchers}
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
                fetchVouchers={fetchVouchers}
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
                    fetchVouchers();
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

            const values = await form.validateFields();

            await VoucherService.update(reacord.id, values)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Cập nhật thành công!',
                    });
                    fetchVouchers();
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
    const selectAfter = (
        <Select
            defaultValue="%"
            style={{
                width: 90,
            }}
        >
            <Option value="USD">%</Option>
            <Option value="EUR">VND</Option>

        </Select>
    );

    return (
        <Row>
            <Col span={24}>
                <Modal
                    width={800}
                    title={isMode === "edit" ? "Cập nhật giảm giá" : "Thêm mới một giảm giá"}
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
                        // labelWrap
                        colon={false}
                        form={form}
                        initialValues={{
                            ...reacord,
                        }}

                    >
                        <Row>
                            <Col span={11}>
                                <Form.Item label="Mã:" name="voucherCode" rules={[{ required: true, message: 'Vui lòng nhập mã giảm giá!' }]}>
                                    <Input placeholder="Nhập mã..." />
                                </Form.Item>
                            </Col>
                            <Col span={1}>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Tên:" name="voucherName" rules={[{ required: true, message: 'Vui lòng nhập tên giảm giá!' }]}>
                                    <Input placeholder="Nhập tên..." />
                                </Form.Item>
                            </Col>
                        </Row>



                        <Row >
                            <Col span={11}>
                                <Form.Item label="Giảm giá:" name="discountRate" rules={[
                                    {
                                        required: true,
                                        type: 'number',
                                        min: 0,
                                    }]}>
                                    <InputNumber style={{ width: '100%' }} addonAfter={selectAfter} />
                                </Form.Item>
                            </Col>
                            <Col span={1}></Col>
                            <Col span={12}>
                                <Form.Item label="Số lượng:" name="quantity" rules={[
                                    {
                                        required: true,
                                        type: 'number',
                                        min: 1,
                                    },
                                ]} >
                                    <InputNumber style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={11}>
                                <Form.Item label="Ngày bắt đầu:" name="startDate" rules={[{ required: true, message: 'Vui lòng nhập ngày bắt đầu!' }]}>
                                    <DatePicker style={{ width: '100%' }} showTime format="HH:mm:ss - DD/MM/YYYY'" />
                                </Form.Item>
                            </Col>
                            <Col span={1}></Col>
                            <Col span={12}>
                                <Form.Item label="Ngày kết thúc:" name="endDate" rules={[{ required: true, message: 'Vui lòng nhập ngày kết thúc!' }]}>
                                    <DatePicker style={{ width: '100%' }} showTime format="HH:mm:ss - DD/MM/YYYY'" />
                                </Form.Item>
                            </Col>
                        </Row>



                        <Row>
                            <Col span={11}>
                                <Form.Item label="Tối thiểu:" name="orderMinimum" rules={[
                                    {
                                        required: true,
                                        type: 'number',
                                        min: 0,
                                    },
                                ]} >
                                    <InputNumber style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={1}></Col>
                            <Col span={12}>
                                <Form.Item label="Giảm max:" name="maxReduce" rules={[
                                    {
                                        required: true,
                                        type: 'number',
                                        min: 0,
                                    },
                                ]} >
                                    <InputNumber style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>


                        </Row>


                        <Form.Item label="Ghi chú:" name="note" >
                            <TextArea rows={4} placeholder="Nhập ghi chú..." />
                        </Form.Item>

                        <Form.Item label="Trạng thái:" name="deleted" initialValue={true} >
                            <Radio.Group name="radiogroup" style={{ float: 'left' }}>
                                <Radio value={true}>Hoạt động</Radio>
                                <Radio value={false}>Hết hạn</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </Modal>
            </Col>

        </Row >
    );
};

