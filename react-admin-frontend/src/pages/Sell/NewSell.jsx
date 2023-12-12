import { DeleteOutlined, ExclamationCircleOutlined, FormOutlined, PlusCircleFilled, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Popconfirm, Space, Table, notification, theme } from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import path_name from '~/constants/routers';
import OrderService from '~/service/OrderService';
import FormatDate from '~/utils/format-date';

export default function NewSell() {
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

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

    const onEditClick = async (record) => {
        try {
            await axios.get(`http://localhost:8080/api/orderDetails/getByOrderId/${record.id}`);
            navigate('/orderdetail');
        } catch (error) {
            console.error(error);
        }
    };


    const handleCreate = async () => {
        const data = { statusId: 1, orderTypeId: 1 };
        console.log(data)
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
        },
        {
            title: 'Hành động',
            dataIndex: '',
            width: '15%',
            render: (record) => {

                return <Space size="middle">
                    {/* <Button type="link"
                        icon={<FormOutlined style={{ color: 'rgb(214, 103, 12)' }} />}
                        onClick={`${path_name.orderDetail}/${record.id}`} /> */}
                    <div style={{ textAlign: 'center' }}>
                        <Link to={`${path_name.orderDetail}/${record.id}`} className="btn btn-outline-warning">
                            <FaEdit />
                        </Link>
                    </div>
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
            onOk: () => {  // Sử dụng hàm không tên (anonymous function) ở đây
                handleCreate();  // Gọi hàm handleCreate trong hàm callback này
            },
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
                // dataSource={orders}
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
