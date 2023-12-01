import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Table, Space, Button, Input, Form, Modal, notification, Radio, Row, Select, DatePicker, InputNumber, Col, Tag, Popconfirm } from 'antd';
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

function Voucher() {

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

    const [vouchers, setVouchers] = useState([]);

    const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });

    const [deleted, setDeleted] = useState(null);

    const [searchName, setSearchName] = useState(null);

    const [searchCode, setSearchCode] = useState(null);

    const fetchVouchers = async () => {
        setLoading(true);

        await VoucherService.getAll(pagination.current - 1, pagination.pageSize, searchCode, searchName, deleted)
            .then(response => {

                const formattedData = response.data.map((voucher, index) => ({
                    ...voucher,
                    key: index + 1,
                    startDate: FormatDate(voucher.startDate),
                    endDate: FormatDate(voucher.endDate)
                }));

                setVouchers(formattedData);
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
        fetchVouchers();
    }, [pagination.current, pagination.pageSize, searchCode, searchName, deleted]);


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

    const handleReset = () => {

        setSearchName(null);
        setSearchCode(null);
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
        const searchCodeFilter = filters?.voucherCode;
        const searchNameFilter = filters?.voucherName;

        // Kiểm tra nếu statusFilter không tồn tại hoặc là mảng rỗng
        const isNoStatusFilter = !statusFilter || statusFilter.length === 0;

        if (searchCodeFilter) {
            setSearchCode(searchCodeFilter[0]);
        } else {
            setSearchCode(null)
        }
        if (searchNameFilter) {
            setSearchName(searchNameFilter[0]);
        } else {
            setSearchName(null)
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
        filteredValue: dataIndex === 'voucherName' ? [searchName] : dataIndex === 'voucherCode' ? [searchCode] : null, filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
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
            width: '4%',
        },
        {
            title: 'Mã',
            dataIndex: 'voucherCode',
            key: 'voucherCode',
            width: '7%',
            filterIcon: <SearchOutlined style={{ fontSize: '14px', color: 'rgb(158, 154, 154)' }} />,
            ...getColumnSearchProps('voucherCode')
        },
        {
            title: 'Tên',
            dataIndex: 'voucherName',
            key: 'voucherName',
            width: '10%',
            filterIcon: <SearchOutlined style={{ fontSize: '14px', color: 'rgb(158, 154, 154)' }} />,
            ...getColumnSearchProps('voucherName')
        },

        {
            title: 'Giảm giá',
            dataIndex: 'discountRate',
            key: 'discountRate',
            width: '7%',
            sorter: (a, b) => a.discountRate - b.discountRate,
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
            sorter: (a, b) => a.quantity - b.quantity,
        },
        {
            title: 'Đơn tối thiểu',
            dataIndex: 'orderMinimum',
            key: 'orderMinimum',
            width: '10%',
            sorter: (a, b) => a.orderMinimum - b.orderMinimum,
        },
        {
            title: 'Giảm tối đa',
            dataIndex: 'maxReduce',
            key: 'maxReduce',
            width: '10%',
            sorter: (a, b) => a.maxReduce - b.maxReduce,

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
            onFilter: (value, record) => record.deleted === value,
            render: (text) => (
                text ? <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="#108ee9">Hoạt động</Tag>
                    : <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="#f50">Hết hạn</Tag>
            )
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
                onClick={handleReset}
            />

            <Table
                dataSource={vouchers}
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

            const values = await form.validateFields();

            await VoucherService.create(values)
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
                            ...(reacord?.startDate && { startDate: dayjs(reacord.startDate, "HH:mm:ss - DD/MM/YYYY") }),
                            ...(reacord?.endDate && { endDate: dayjs(reacord.endDate, "HH:mm:ss - DD/MM/YYYY") }),
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
                                    <DatePicker style={{ width: '100%' }} showTime format="HH:mm:ss - DD/MM/YYYY" />
                                </Form.Item>
                            </Col>
                            <Col span={1}></Col>
                            <Col span={12}>
                                <Form.Item label="Ngày kết thúc:" name="endDate" rules={[{ required: true, message: 'Vui lòng nhập ngày kết thúc!' }]}>
                                    <DatePicker style={{ width: '100%' }} showTime format="HH:mm:ss - DD/MM/YYYY" />
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

