import { Badge, Button, Radio, Space, Table, Tabs, Tag, Tooltip } from 'antd';
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
            title: 'Mã',
            dataIndex: 'id',
            key: 'id',
            width: "10%",
            render: (text) => <a>HD{text}</a>,
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
                text === "InStore" ? <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="processing">Tại quầy</Tag>
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
                        return <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="green">Đơn hàng mới</Tag>
                        break;
                    case 'Chờ xác nhận':
                        return <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="processing">Chờ xác nhận</Tag>
                        break;
                    case 'Chờ lấy hàng':
                        return <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="purple">Chờ lấy hàng</Tag>
                        break;
                    case 'Đang vận chuyển':
                        return <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="volcano">Đang vận chuyển</Tag>
                        break;
                    case 'Chờ giao hàng':
                        return <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="magenta">Chờ giao hàng</Tag>
                        break;
                    case 'Hoàn thành':
                        return <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="cyan">Hoàn thành</Tag>
                        break;
                    case 'Đã hủy':
                        return <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="red">Đã hủy</Tag>
                        break;
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

    const [orderStatusName, setOrderStatusName] = useState(null);

    const fetchOrders = async () => {
        setLoading(true)
        await OrderService.getAllOrders(pagination.current - 1, pagination.pageSize, orderStatusName)
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
        fetchOrders();
    }, [pagination.current, pagination.pageSize, orderStatusName]);

    const handleTableChange = (pagination) => {
        setPagination({
            ...pagination,
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
            key: 'Chờ giao hàng',
            label: 'Chờ giao hàng',
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
        setOrderStatusName(key)
    };

    return (
        <>
            <Tabs defaultActiveKey=""
                items={items}
                onChange={handleTabChange}></Tabs>

        </>
    );
}

export default Order;
