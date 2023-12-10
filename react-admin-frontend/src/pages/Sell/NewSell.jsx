import { DeleteOutlined, ExclamationCircleOutlined, FormOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Popconfirm, Space, Table, Tag, notification } from 'antd';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import path_name from '~/constants/routers';
import OrderService from '~/service/OrderService';
import FormatDate from '~/utils/format-date';

export default function NewSell() {
    const [loading, setLoading] = useState(false);

    const [orders, setOrders] = useState([]);

    const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });

    const fetchOrderStatusNewCreate = async () => {
        setLoading(true)
        await OrderService.getAllOrderByStatusId(pagination.current - 1, pagination.pageSize)
            .then(response => {

                setOrders(response.data);
                setPagination({
                    ...pagination,
                    total: response.totalCount,
                });
                console.log(response.data);
                setLoading(false)
            }).catch(error => {
                console.error(error);
            })
    }

    const handleDelete = async (id) => {

        await OrderService.delete(id).then(response => {
            console.log(response.data);
            notification.success({
                message: 'Thông báo',
                description: 'Xóa thành công!',
            });
            fetchOrderStatusNewCreate();
        }).catch(error => {
            console.error(error);
            notification.error({
                message: 'Thông báo',
                description: 'Xóa thất bại!',
            });
        });

    };
    useEffect(() => {
        fetchOrderStatusNewCreate();
    }, [pagination.current, pagination.pageSize]);


    const handleCreate = async () => {
        const data = { statusId: 1, orderType: "InStore" };
        await OrderService.create(data)
            .then(() => {
                notification.success({
                    message: 'Thông báo',
                    description: 'Tạo mới đơn hàng thành công!',
                });
                fetchOrderStatusNewCreate();
            })
            .catch(error => {
                notification.error({
                    message: 'Thông báo',
                    description: 'Tạo mới đơn hàng thất bại!',
                });
                console.error(error);
            });
    };

    const columnCart = [
        {
            title: '#',
            dataIndex: 'key',
            width: '5%',
        },
        {
            title: 'Mã hóa đơn',
            dataIndex: 'id',
            width: '15%',
            render: (text) => <a>HD{text}</a>,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            width: '25%',
        },
        {
            title: 'Người tạo',
            dataIndex: 'createdBy',
            width: '20%',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'orderStatus',
            width: '20%',
            render: (text) => (
                <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="green">{text}</Tag>
            )
        },
        {
            title: 'Hành động',
            dataIndex: '',
            width: '15%',
            render: (record) => {

                return <Space size="middle">
                    <Link to={`${path_name.orderDetail}/${record.id}`}>
                        <Button type="link" icon={<FormOutlined style={{ color: 'rgb(214, 103, 12)' }} />} />
                    </Link>
                    <Popconfirm
                        title="Xóa kích thước"
                        description="Bạn có chắc chắn xóa kích thước này không?"
                        placement="leftTop"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Đồng ý"
                        cancelText="Hủy bỏ"
                    >
                        <Button type="text" icon={<DeleteOutlined />} style={{ color: 'red' }} />
                    </Popconfirm>

                </Space>
            }

        },
    ];

    const [modal, contextHolder] = Modal.useModal();
    const confirm = () => {
        modal.confirm({
            title: 'Thông báo!',
            icon: <ExclamationCircleOutlined />,
            content: 'Bạn có chắc muốn tạo mới một đơn hàng không?',
            onOk: () => { handleCreate(); },
            okText: 'Đồng ý',
            cancelText: 'Hủy bỏ',
        });
    }
    return (
        <>
            {contextHolder}
            <Button type="primary"
                icon={<PlusOutlined />}
                onClick={confirm}
                style={{ marginBottom: '16px', float: 'right', borderRadius: '2px' }} >
                Tạo đơn hàng
            </Button>
            <Table
                loading={loading}
                columns={columnCart}
                dataSource={orders.map((order, index) => ({
                    ...order,
                    key: index + 1,
                    createdAt: FormatDate(order.createdAt),
                    orderStatus: order.orderStatus.statusName
                }))}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    defaultPageSize: 5,
                    pageSizeOptions: ['5', '10', '15'],
                    total: pagination.total,
                    showSizeChanger: true,
                }}

            />

        </>
    );
}
