import { FileDoneOutlined, FilterOutlined, RedoOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Input, Row, Select, Space, Table, Tabs, Tag, Tooltip, Card } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import path_name from '~/constants/routers';
import OrderService from '~/service/OrderService';
import formatCurrency from '~/utils/format-currency';
import FormatDate from '~/utils/format-date';


function Order() {

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            width: "5%",
        },
        {
            title: 'Mã HD',
            dataIndex: 'id',
            key: 'id',
            width: "10%",
            render: (text) => <span style={{ color: 'red' }}>{text}</span>,
        },
        {
            title: 'Khách hàng',
            dataIndex: 'customerName',
            key: 'customerName',
            width: "10%",
        },
        {
            title: 'Loại đơn hàng',
            dataIndex: 'orderType',
            key: 'orderType',
            width: "15%",
            render: (text) => (
                text === "Tại quầy" ? <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="processing">Tại quầy</Tag>
                    : <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="warning">Online</Tag>
            )
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: "15%",
        },
        {
            title: 'Tiền giảm',
            dataIndex: 'voucher',
            key: 'voucher',
            width: "10%",
            render: (text) => <span>{formatCurrency(text)}</span>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'orderStatusName',
            key: 'orderStatusName',
            width: "15%",
            render: (text) => {
                switch (text) {
                    case 'Tạo đơn hàng':
                        return <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="green">Tạo đơn hàng</Tag>
                    case 'Chờ xác nhận':
                        return <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="processing">Chờ xác nhận</Tag>
                    case 'Chờ lấy hàng':
                        return <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="purple">Chờ lấy hàng</Tag>
                    case 'Đang vận chuyển':
                        return <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="volcano">Đang vận chuyển</Tag>
                    case 'Hoàn thành':
                        return <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="cyan">Hoàn thành</Tag>
                    case 'Đã hủy':
                        return <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="red">Đã hủy</Tag>
                    default:
                        break;
                }
            }
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'orderTotal',
            key: 'orderTotal',
            width: "10%",
            render: (text) => (
                <span style={{ color: 'red' }}>
                    {formatCurrency(text)}
                </span>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            width: "10%",
            render: (record) => {

                return <Space size="middle">
                    <Tooltip title="Xem chi tiết" placement="top">
                        <Link to={`${path_name.order_detail}/${record.id}`}>
                            <Button type="text" icon={<FaEye style={{ color: 'rgb(214, 103, 12)' }} />} />
                        </Link>
                    </Tooltip>

                </Space>
            },
        },
    ];
    //-------------------------Load dữ liệu hóa đơn----------------------------------------
    const [loading, setLoading] = useState(false);

    const [orders, setOrders] = useState([]);

    const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });
    const [searchKeyword, setSearchKeyword] = useState(null);
    const [selectedOrderType, setSelectedOrderType] = useState(null);
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [filterOrder, setFilterOrder] = useState({
        pageNo: 0,
        pageSize: 5,
        orderStatusName: null,
        orderId: null,
        orderType: null,
        startDate: null,
        endDate: null,
    });

    const getAllOrdersAndFilter = async () => {
        setLoading(true)
        await OrderService.getAllOrdersAndFilter(filterOrder)
            .then(response => {

                setOrders(response.data);
                setPagination({
                    ...pagination,
                    total: response.totalCount,
                });

                setLoading(false)
            }).catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        getAllOrdersAndFilter();
    }, [filterOrder]);

    const handleTableChange = (pagination) => {
        setPagination({
            ...pagination,
        });
        setFilterOrder({
            ...filterOrder,
            pageNo: pagination.current - 1,
            pageSize: pagination.pageSize,
        });
    };
    const handleReset = () => {
        setSearchKeyword(null);
        setSelectedOrderType(null);
        setSelectedStartDate(null);
        setSelectedEndDate(null);
        setFilterOrder({
            pageNo: 0,
            pageSize: 5,
            orderStatusName: null,
            orderId: null,
            orderType: null,
            startDate: null,
            endDate: null,
        });
        setPagination({
            ...pagination,
            current: 1,
            pageSize: 5,
        });
    };

    const tabContent = () => (

        <Table
            dataSource={orders.map((order, index) => ({
                ...order,
                key: index + 1,
                createdAt: FormatDate(order.createdAt),
                voucher: order.voucher ? order.voucher.discountRate : 0,
                customerName: order.user ? order.user.usersName : "Khách lẻ",
                orderStatusName: order.orderStatus ? order.orderStatus.statusName : "",

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
    );

    const items = [
        {
            key: null,
            label: 'Tất cả',
            children: tabContent(),
        },
        {
            key: 'Chờ xác nhận',
            label: 'Chờ xác nhận',
            children: tabContent(),
        },
        {
            key: 'Chờ lấy hàng',
            label: 'Chờ lấy hàng',
            children: tabContent(),
        },
        {
            key: 'Đang vận chuyển',
            label: 'Đang vận chuyển',
            children: tabContent(),
        },
        {
            key: 'Hoàn thành',
            label: 'Hoàn thành',
            children: tabContent(),
        },
        {
            key: 'Đã hủy',
            label: 'Đã hủy',
            children: tabContent(),
        },
    ];


    const handleTabChange = (key) => {
        setFilterOrder({
            ...filterOrder,
            orderStatusName: key
        })
    };
    const handleSearch = () => {
        const adjustedStartDate = selectedStartDate && dayjs(selectedStartDate).add(7, 'hour');
        const adjustedEndDate = selectedEndDate && dayjs(selectedEndDate).add(7, 'hour');
        setFilterOrder({
            ...filterOrder,
            pageNo: 0,
            orderId: searchKeyword,
            orderType: selectedOrderType,
            startDate: adjustedStartDate,
            endDate: adjustedEndDate,
        });
    };
    return (
        <>
            <Card
                title={<span style={{ color: '#5a76f3' }}><FilterOutlined /> Lọc</span>}
                style={{ borderRadius: '10px' }}
            >
                <Row>
                    <Col span={12} style={{ padding: '0 50px' }}>
                        <Input
                            style={{
                                width: '100%',
                                height: '35px',
                                borderRadius: '5px',
                            }}
                            placeholder="Nhập mã hóa đơn..."
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}

                        />
                    </Col>
                    <Col span={12} style={{ padding: '0 50px' }}>
                        <Select
                            style={{
                                width: '100%',
                                height: '35px',
                            }}
                            allowClear
                            placeholder="Loại đơn hàng"
                            value={selectedOrderType}
                            onChange={(value) => setSelectedOrderType(value)}
                            options={[
                                {
                                    value: 'Tại quầy',
                                    label: 'Tại quầy',
                                },
                                {
                                    value: 'Online',
                                    label: 'Online',
                                },
                            ]}
                        />
                    </Col>
                </Row>
                <Row style={{ marginTop: '20px' }}>
                    <Col span={12} style={{ padding: '0 50px' }}>
                        <DatePicker
                            format="HH:mm:ss - DD/MM/YYYY"
                            style={{
                                width: '100%',
                                height: '35px',
                                borderRadius: '5px',
                            }}
                            showTime
                            // ={{
                            //     defaultValue: dayjs('00:00:00', 'HH:mm:ss'),
                            // }}
                            placeholder="Ngày bắt đầu"
                            value={selectedStartDate}
                            onChange={(date) => setSelectedStartDate(date)}
                        />
                    </Col>
                    <Col span={12} style={{ padding: '0 50px' }}>
                        <DatePicker
                            format="HH:mm:ss - DD/MM/YYYY"
                            style={{
                                width: '100%',
                                height: '35px',
                                borderRadius: '5px',
                            }}
                            showTime={{
                                defaultValue: dayjs('00:00:00', 'HH:mm:ss'),
                            }}
                            placeholder="Ngày kết thúc"
                            value={selectedEndDate}
                            onChange={(date) => setSelectedEndDate(date)}
                        />
                    </Col>
                </Row>
                <Button
                    type="primary"
                    style={{
                        marginBottom: '16px',
                        float: 'right',
                        borderRadius: '4px',
                        margin: '15px 50px 0 6px',
                        backgroundColor: '#5a76f3',
                    }}
                    onClick={handleSearch}
                >
                    Tìm kiếm
                </Button>
                <Button
                    type="primary"
                    icon={<RedoOutlined style={{ fontSize: '18px' }} />}
                    style={{
                        marginBottom: '16px',
                        float: 'right',
                        marginTop: '15px',
                        borderRadius: '4px',
                        backgroundColor: '#5a76f3',
                    }}
                    onClick={handleReset}
                />
            </Card>
            <Card
                title={<span style={{ color: '#5a76f3' }}><FileDoneOutlined />  Danh sách đơn hàng</span>}
                style={{ marginTop: '25px', borderRadius: '10px' }}
            >
                <Tabs defaultActiveKey=""
                    items={items}
                    onChange={handleTabChange}></Tabs>
            </Card>


        </>
    );
}

export default Order;
