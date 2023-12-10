import { DeleteOutlined } from '@ant-design/icons';
import { faPlus, faShop, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Popconfirm, Space, Table, Tabs, Tag, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import path_name from '~/constants/routers';
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
        title: 'Khách hàng',
        dataIndex: 'customerName',
        key: 'customerName',
        width: "10%"
    },
    {
        title: 'Loại đơn hàng',
        dataIndex: 'orderType',
        key: 'orderType',
        width: "10%",
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
        render: (text) => <span>{text} %</span>,
    },
    {
        title: 'Trạng thái',
        dataIndex: 'orderStatusName',
        key: 'orderStatusName',
        width: "15%",
        render: (text) => {
            switch (text) {
                case 'Tạo mới':
                    return <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="green">Tạo mới</Tag>
                    break;
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
        title: 'Tổng tiền',
        dataIndex: 'orderTotal',
        key: 'orderTotal',
        width: "10%",
        render: (text) => (
            <span style={{ color: 'red' }}>
                {parseFloat(text).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </span>
        ),
    },
    {
        title: 'Hành động',
        key: 'action',
        width: "10%",
        render: (record) => {

            return <Space size="middle">
                <Link to={`${path_name.orderView}/${record.id}`}>
                    <Button type="link" icon={<FaEye style={{ color: 'rgb(214, 103, 12)' }} />} />
                </Link>
                <Popconfirm
                    title="Xóa hóa đơn"
                    description="Bạn có chắc chắn xóa hóa đơn này không?"
                    placement="leftTop"
                    // onConfirm={() => handleDelete(record.id)}
                    okText="Đồng ý"
                    cancelText="Hủy bỏ"
                >
                    <Button type="text" icon={<DeleteOutlined />} style={{ color: 'red' }} />
                </Popconfirm>

            </Space>
        },
    },
];

function Order() {

    const [loading, setLoading] = useState(false);

    const [orders, setOrders] = useState([]);

    const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });

    const [orderStatusId, setOrderStatusId] = useState(null);

    const fetchOrders = async () => {
        setLoading(true)
        await OrderService.getAll(pagination.current - 1, pagination.pageSize, orderStatusId)
            .then(response => {

                setOrders(response.data);
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
                orderStatusName: order.orderStatus ? order.orderStatus.statusName : ""

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
        <>
            {/* <label>Danh sách hóa đơn</label> */}

            <Tabs defaultActiveKey=""
                items={items}
                onChange={handleTabChange}></Tabs>
        </>
    );
}

export default Order;
