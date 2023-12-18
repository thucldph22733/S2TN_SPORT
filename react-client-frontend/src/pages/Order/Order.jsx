import { CloseCircleOutlined, CloseSquareOutlined, DeleteOutlined, HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Popconfirm, Space, Table, Tabs, Tag, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import path_name from '~/core/constants/routers';
import OrderService from '~/service/OrderService';
import FormatDate from '~/utils/format-date';


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
        title: 'Ngày đặt hàng',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: "15%",
    },
    {
        title: 'Loại đơn hàng',
        dataIndex: 'orderTypeName',
        key: 'orderTypeName',
        width: "15%",
        render: (text) => (
            text === "InStore" ? <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="processing">Tại quầy</Tag>
                : <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="warning">Online</Tag>
        )
    },

    {
        title: 'Tiền giảm',
        dataIndex: 'voucher',
        key: 'voucher',
        width: "10%",
        render: (text) => <span>{text} %</span>,
    },
    {
        title: 'Tổng tiền',
        dataIndex: 'orderTotal',
        key: 'orderTotal',
        width: "10%",
        render: (text) => (
            <span style={{ color: 'red' }}>
                {isNaN(parseFloat(text)) ? '' : parseFloat(text).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </span>
        ),
    },
    {
        title: 'Trạng thái',
        dataIndex: 'orderStatusName',
        key: 'orderStatusName',
        width: "15%",
        render: (text) => {
            switch (text) {
                case 'Chờ xác nhận':
                    return <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="processing">Chờ xác nhận</Tag>
                    break;
                case 'Chờ lấy hàng':
                    return <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="volcano">Chờ lấy hàng</Tag>
                    break;
                case 'Chờ giao hàng':
                    return <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="purple">Chờ giao hàng</Tag>
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
        title: 'Hành động',
        key: 'action',
        width: "10%",
        render: (record) => {

            return <Space size="middle">
                <Tooltip title="Xem chi tiết" placement="top">
                    <Link to={`${path_name.orderView}/${record.id}`}>
                        <Button type="text" icon={<FaEye style={{ color: 'rgb(214, 103, 12)' }} />} />
                    </Link>
                </Tooltip>

                <Tooltip title="Hủy đơn" placement="top">
                    <Button type="text" icon={<CloseSquareOutlined />} style={{ color: 'red' }} />
                </Tooltip>
            </Space>
        },
    },
];

function Order() {
    const userString = localStorage.getItem('user2');
    const user = userString ? JSON.parse(userString) : null;

    const [loading, setLoading] = useState(false);

    const [orders, setOrders] = useState([]);

    const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });

    const [orderStatusId, setOrderStatusId] = useState(null);

    const fetchOrders = async () => {
        setLoading(true)
        await OrderService.getAllOrdersByUserId(pagination.current - 1, pagination.pageSize, user.id, orderStatusId)
            .then(response => {

                setOrders(response.data);
                console.log(response.data)
                setPagination({
                    ...pagination,
                    total: response.totalCount,
                });
                console.log(response.data)
                setLoading(false)
            }).catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        fetchOrders();
    }, [pagination.current, pagination.pageSize, orderStatusId]);

    const handleTableChange = (pagination) => {
        setPagination({
            ...pagination,
        });

    };

    const tabContent = () => (

        <Table
            dataSource={orders.map((order) => ({
                ...order,
                key: order.id,
                createdAt: FormatDate(order.createdAt),
                voucher: order.voucher ? order.voucher.discountRate : 0,
                customerName: order.user ? order.user.usersName : "Khách lẻ",
                orderStatusName: order.orderStatus ? order.orderStatus.statusName : "",
                orderTypeName: order.orderType ? order.orderType.orderTypeName : ""

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
            key: '',
            label: 'Tất cả',
            children: tabContent(),
        },
        {
            key: '2',
            label: 'Chờ xác nhận',
            children: tabContent(),
        },
        {
            key: '3',
            label: 'Chờ lấy hàng',
            children: tabContent(),
        },
        {
            key: '4',
            label: 'Chờ giao hàng',
            children: tabContent(),
        },
        {
            key: '5',
            label: 'Hoàn thành',
            children: tabContent(),
        },
        {
            key: '6',
            label: 'Đã hủy',
            children: tabContent(),
        },

    ];
    const handleTabChange = (key) => {
        setOrderStatusId(key)
    };
    return (
        <div style={{ marginLeft: '30px' }}>

            <h6>Đơn hàng của tôi</h6>
            <Tabs defaultActiveKey=""
                items={items}
                onChange={handleTabChange}></Tabs>

        </div>

    );
}

export default Order;
