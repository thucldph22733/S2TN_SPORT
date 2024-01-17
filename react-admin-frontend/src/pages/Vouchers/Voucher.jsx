import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Input, Form, Modal, notification, Radio, Row, Select, DatePicker, InputNumber, Col, Tag, Popconfirm, Card, Switch, Popover } from 'antd';
import {
    PlusOutlined,
    RedoOutlined,
    FormOutlined,
    DeleteOutlined,
    SearchOutlined,
    FileDoneOutlined,
    FilterOutlined,
} from '@ant-design/icons';
import './Voucher.css'
import VoucherService from '~/service/VoucherService';
import FormatDate from '~/utils/format-date';
import dayjs from 'dayjs';
import formatCurrency from '~/utils/format-currency';
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

    const [filterVoucher, setFilterVoucher] = useState({
        keyword: null,
        createdAtStart: null,
        createdAtEnd: null,
        status: null,
        pageNo: 0,
        pageSize: 5
    });
    const fetchVouchers = async () => {
        setLoading(true);

        await VoucherService.getVoucherByFilter(filterVoucher)
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
    }, [filterVoucher]);

    const handleTableChange = (pagination) => {
        setPagination({
            ...pagination,
        });
        setFilterVoucher({
            ...filterVoucher,
            pageNo: pagination.current - 1,
            pageSize: pagination.pageSize,
        });
    };
    const handleFilterVoucherChange = (property, value) => {
        setFilterVoucher({
            ...filterVoucher,
            [property]: value,
            pageNo: 0,
        });
    };
    const [searchKeywordVoucher, setSearchKeywordVoucher] = useState(null);

    const handleSearchVoucher = () => {
        setFilterVoucher({
            ...filterVoucher,
            keyword: searchKeywordVoucher,
            pageNo: 0,
        });
    };
    const handleResetVoucher = () => {
        setSearchKeywordVoucher(null)
        setFilterVoucher({
            keyword: null,
            createdAtStart: null,
            createdAtEnd: null,
            status: null,
            pageNo: 0,
            pageSize: 10
        });
        setPagination({
            ...pagination,
            current: 1,
            pageSize: 5,
        });
    };
    const handleDelete = async (id) => {

        await VoucherService.delete(id).then(() => {
            fetchVouchers();
        }).catch(error => {
            console.error(error);
            notification.error({
                message: 'Thông báo',
                description: 'Đã có lỗi xảy ra!',
            });
        });

    };

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            width: '4%',
            render: (value, item, index) => (pagination.current - 1) * pagination.pageSize + index + 1
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

        },

        {
            title: 'Giảm giá',
            dataIndex: 'discountRate',
            key: 'discountRate',
            width: '8%',
            sorter: (a, b) => a.discountRate - b.discountRate,
            render: (text) => <span>{formatCurrency(text)}</span>,
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'startDate',
            key: 'startDate',
            width: '9%',
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'endDate',
            key: 'endDate',
            width: '9%',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            width: '9%',
            sorter: (a, b) => a.quantity - b.quantity,
        },
        {
            title: 'Đơn tối thiểu',
            dataIndex: 'orderMinimum',
            key: 'orderMinimum',
            width: '9%',
            sorter: (a, b) => a.orderMinimum - b.orderMinimum,
            render: (text) => <span>{formatCurrency(text)}</span>,
        },
        {
            title: 'Giảm tối đa',
            dataIndex: 'maxReduce',
            key: 'maxReduce',
            width: '9%',
            sorter: (a, b) => a.maxReduce - b.maxReduce,
            render: (text) => <span>{formatCurrency(text)}</span>,
        },

        {
            title: 'Trạng thái',
            key: 'deleted',
            dataIndex: 'deleted',
            width: '10%',
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

            <Card
                title={<span style={{ color: '#5a76f3' }}><FilterOutlined /> Lọc</span>}
                style={{ borderRadius: '10px' }}
            >
                <Row>
                    <Col span={12} style={{ padding: '0 100px' }}>
                        <DatePicker
                            format="HH:mm:ss - DD/MM/YYYY"
                            style={{
                                width: '100%',
                                height: '35px',
                                borderRadius: '5px',
                            }}
                            showTime

                            placeholder="Từ ngày"
                            value={filterVoucher.createdAtStart}
                            onChange={(value) => handleFilterVoucherChange('createdAtStart', value && dayjs(value).add(7, 'hour'))}
                        />
                    </Col>
                    <Col span={12} style={{ padding: '0 100px' }}>
                        <DatePicker
                            format="HH:mm:ss - DD/MM/YYYY"
                            style={{
                                width: '100%',
                                height: '35px',
                                borderRadius: '5px',
                            }}
                            showTime
                            placeholder="Đến ngày"
                            value={filterVoucher.createdAtEnd}
                            onChange={(value) => handleFilterVoucherChange('createdAtEnd', value && dayjs(value).add(7, 'hour'))}
                        />
                    </Col>
                </Row>

                <Row style={{ marginTop: '20px' }}>
                    <Col span={12} style={{ padding: '0 100px' }}>
                        <Select
                            style={{
                                width: '100%',
                            }}
                            allowClear
                            placeholder="Trạng thái"
                            value={filterVoucher.status}
                            onChange={(value) => handleFilterVoucherChange('status', value)}
                            options={[
                                {
                                    value: true,
                                    label: 'Hoạt động',
                                },
                                {
                                    value: false,
                                    label: 'Hết hạn',
                                },
                            ]}
                        />
                    </Col>
                    <Col span={12} style={{ padding: '0 100px' }}>
                        <Input.Search

                            placeholder="Nhập mã, tên, mức giảm giá..."
                            value={searchKeywordVoucher}
                            onChange={(e) => setSearchKeywordVoucher(e.target.value)}
                            onSearch={handleSearchVoucher}
                        />
                    </Col>
                </Row>

            </Card>
            <Card
                title={<span style={{ color: '#5a76f3' }}><FileDoneOutlined />  Danh sách giảm giá</span>}
                style={{ marginTop: '25px', borderRadius: '10px' }}
            >
                <Button type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => showModal("add")}
                    style={{ marginBottom: '5px', float: 'right', borderRadius: '2px' }} >
                    Thêm mới
                </Button>

                <Button type="primary"
                    icon={<RedoOutlined style={{ fontSize: '18px' }} />}
                    style={{ marginBottom: '5px', float: 'right', marginRight: '6px', borderRadius: '4px', }}
                    onClick={handleResetVoucher}
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
            </Card>
            {open.isModal && <VoucherModal
                isMode={open.isMode}
                reacord={open.reacord || {}}
                hideModal={hideModal}
                isModal={open.isModal}
                vouchers={vouchers}
                fetchVouchers={fetchVouchers}
            />}
        </>
    )
};
export default Voucher;


const VoucherModal = ({ isMode, reacord, hideModal, isModal, fetchVouchers, vouchers }) => {

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
            defaultValue="VND"
            style={{
                width: 90,
            }}
        >
            <Option value="VND">VND</Option>
        </Select>
    );



    const formatNumberToiThieu = (value) => {
        if (value === undefined || value === null) {
            return value;
        }

        const stringValue = String(value);
        const parts = stringValue.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        return parts.join('.');
    };
    const formatNumberToiDa = (value) => {
        if (value === undefined || value === null) {
            return value;
        }

        const stringValue = String(value);
        const parts = stringValue.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        return parts.join('.');
    };

    const formatGiamGia = (value) => {
        if (value === undefined || value === null) {
            return value;
        }

        const stringValue = String(value);
        const parts = stringValue.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        return parts.join('.');
    };

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
                        name="validateOnly" layout="vertical" autoComplete="off"
                        form={form}
                        initialValues={{
                            ...reacord,
                            ...(reacord?.startDate && { startDate: dayjs(reacord.startDate, "HH:mm:ss - DD/MM/YYYY") }),
                            ...(reacord?.endDate && { endDate: dayjs(reacord.endDate, "HH:mm:ss - DD/MM/YYYY") }),
                        }}

                    >
                        <Row>
                            <Col span={11}>
                                <Form.Item label="Mã:" name="voucherCode" rules={[{ required: true, message: 'Vui lòng nhập mã giảm giá!' }
                                    ,
                                {
                                    validator: (_, value) => {
                                        if (!value) {
                                            return Promise.resolve();
                                        }
                                        const trimmedValue = value.trim(); // Loại bỏ dấu cách ở đầu và cuối
                                        const lowercaseValue = trimmedValue.toLowerCase(); // Chuyển về chữ thường
                                        const isDuplicate = vouchers.some(
                                            (voucher) => voucher.voucherCode.trim().toLowerCase() === lowercaseValue && voucher.id !== reacord.id
                                        );
                                        if (isDuplicate) {
                                            return Promise.reject('Mã voucher đã tồn tại!');
                                        }
                                        // Kiểm tra dấu cách ở đầu và cuối
                                        if (/^\s|\s$/.test(value)) {
                                            return Promise.reject('Mã voucher không được chứa dấu cách ở đầu và cuối!');
                                        }
                                        return Promise.resolve();
                                    },
                                },
                                ]}>
                                    <Input placeholder="Nhập mã..." />
                                </Form.Item>
                            </Col>
                            <Col span={1}>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Tên:" name="voucherName" rules={[{ required: true, message: 'Vui lòng nhập tên giảm giá!' }
                                    ,
                                {
                                    validator: (_, value) => {
                                        if (!value) {
                                            return Promise.resolve();
                                        }
                                        const trimmedValue = value.trim(); // Loại bỏ dấu cách ở đầu và cuối
                                        const lowercaseValue = trimmedValue.toLowerCase(); // Chuyển về chữ thường
                                        const isDuplicate = vouchers.some(
                                            (voucher) => voucher.voucherName.trim().toLowerCase() === lowercaseValue && voucher.id !== reacord.id
                                        );
                                        if (isDuplicate) {
                                            return Promise.reject('Tên voucher đã tồn tại!');
                                        }
                                        // Kiểm tra dấu cách ở đầu và cuối
                                        if (/^\s|\s$/.test(value)) {
                                            return Promise.reject('Tên voucher không được chứa dấu cách ở đầu và cuối!');
                                        }
                                        return Promise.resolve();
                                    },
                                },
                                ]}>
                                    <Input placeholder="Nhập tên..." />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row >
                            <Col span={11}>
                                <Form.Item
                                    label="Giảm giá:"
                                    name="discountRate"
                                    rules={[
                                        {
                                            required: true,
                                            type: 'number',
                                            min: 0,
                                            message: 'Vui lòng nhập mức giảm lớn hơn hoặc bằng 0!',
                                        },
                                        {
                                            validator: (_, value) => {
                                                const intValue = parseInt(value, 10);
                                                if (!value) {
                                                    return Promise.resolve();
                                                }
                                                if (isNaN(intValue) || intValue <= 0) {
                                                    return Promise.reject(new Error('Vui lòng nhập số nguyên dương!'));
                                                }

                                                return Promise.resolve();
                                            },
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        addonAfter={selectAfter}
                                        formatter={(value) => formatGiamGia(value)}
                                        parser={(value) => value.replace(/[^\d]/g, '')} // Chỉ giữ lại số
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={1}></Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Số lượng:"
                                    name="quantity"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập số lượng!',
                                        },
                                    ]}
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        onChange={(e) => {
                                            // Chỉ giữ lại số và loại bỏ dấu cách ở đầu và cuối
                                            const newValue = e.target.value.replace(/[^\d]/g, '');
                                            form.setFieldsValue({
                                                quantity: newValue,
                                            });
                                        }}
                                        onBlur={(e) => {
                                            // Kiểm tra số nguyên và không có dấu cách ở đầu và cuối
                                            const value = e.target.value;
                                            const intValue = parseInt(value, 10);

                                            if (isNaN(intValue) || value.includes(' ') || value[0] === ' ' || value[value.length - 1] === ' ') {
                                                form.setFields([
                                                    {
                                                        name: 'quantity',
                                                        errors: ['Vui lòng nhập số nguyên và không có dấu cách ở đầu và cuối!'],
                                                    },
                                                ]);
                                            }
                                        }}
                                    />
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
                                <Form.Item
                                    label="Ngày kết thúc:"
                                    name="endDate"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập ngày kết thúc!' },
                                        ({ getFieldValue }) => ({
                                            validator(_, endDate) {
                                                const startDate = getFieldValue('startDate');
                                                const currentDate = dayjs();

                                                if (!startDate || !endDate) {
                                                    // Nếu chưa có giá trị, không validate
                                                    return Promise.resolve();
                                                }

                                                if (dayjs(startDate).isAfter(endDate)) {
                                                    // Ngày kết thúc không được trước ngày bắt đầu
                                                    return Promise.reject(new Error('Ngày kết thúc phải sau ngày bắt đầu!'));
                                                }

                                                if (dayjs(endDate).isBefore(currentDate, 'day')) {
                                                    // Ngày kết thúc không được là ngày hiện tại hoặc ngày quá khứ
                                                    return Promise.reject(new Error('Ngày kết thúc không được là ngày hiện tại hoặc ngày quá khứ!'));
                                                }

                                                return Promise.resolve();
                                            },
                                        }),
                                    ]}
                                >
                                    <DatePicker style={{ width: '100%' }} showTime format="HH:mm:ss - DD/MM/YYYY" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={11}>
                                <Form.Item
                                    label="Tối thiểu:"
                                    name="orderMinimum"
                                    rules={[
                                        {
                                            required: false,
                                            type: 'number',
                                            min: 1,
                                            message: 'Vui lòng nhập tối thiểu!',
                                        },
                                        {
                                            validator: (_, value) => {
                                                const stringValue = String(value);
                                                if (!value) {
                                                    return Promise.resolve();
                                                }
                                                if (/^\s|\s$/.test(stringValue)) {
                                                    return Promise.reject('Vui lòng nhập số nguyên và không có dấu cách ở đầu và cuối!');
                                                }

                                                const intValue = parseInt(stringValue, 10);

                                                if (isNaN(intValue)) {
                                                    return Promise.reject('Vui lòng nhập số nguyên!');
                                                }

                                                return Promise.resolve();
                                            },
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        formatter={(value) => formatNumberToiThieu(value)}
                                        parser={(value) => value.replace(/[^\d]/g, '')} // Chỉ giữ lại số
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={1}></Col>
                            <Col span={12}>
                                <Form.Item label="Giảm tối đa:" name="maxReduce" rules={[
                                    {
                                        required: false,
                                        type: 'number',
                                        min: 1,
                                        message: 'Vui lòng nhập giảm tối đa!'
                                    },
                                    {
                                        validator: (_, value) => {
                                            const stringValue = String(value);
                                            if (!value) {
                                                return Promise.resolve();
                                            }
                                            if (/^\s|\s$/.test(stringValue)) {
                                                return Promise.reject('Vui lòng nhập số nguyên và không có dấu cách ở đầu và cuối!');
                                            }

                                            const intValue = parseInt(stringValue, 10);

                                            if (isNaN(intValue)) {
                                                return Promise.reject('Vui lòng nhập số nguyên!');
                                            }

                                            return Promise.resolve();
                                        },
                                    },
                                ]}>
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        formatter={(value) => formatNumberToiDa(value)}
                                        parser={(value) => value.replace(/[^\d]/g, '')} // Chỉ giữ lại số
                                    />
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

