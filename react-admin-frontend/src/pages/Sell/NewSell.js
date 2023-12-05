import { DeleteOutlined, PlusCircleFilled, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Table, theme } from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import path_name from '~/core/constants/routers';

export default function NewSell() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [order, setOrder] = useState('');
    let navigate = useNavigate();

    useEffect(() => {
        loadOrder();
    }, []);

    const loadOrder = async () => {
        const result = await axios.get('http://localhost:8080/api/orders/getAllCompletedOrder');
        setOrder(result.data);
    };

    const onEditClick = async (record) => {
        try {
            await axios.get(`http://localhost:8080/api/orderDetails/getByOrderId/${record.id}`);
            navigate('/orderdetail');
        } catch (error) {
            console.error(error);
        }
    };
    const createOrder = async () => {
        try {
            // Gọi API để tạo đơn hàng mới
            const response = await axios.post('http://localhost:8080/api/orders/create', {
                StatusId: 4,
                // Thêm dữ liệu cần thiết cho đơn hàng mới vào đây
            });

            // Kiểm tra phản hồi từ máy chủ và xử lý theo ý muốn
            if (response.status === 201) {
                const responseData = response.data;
                const newOrderId = responseData?.data?.id; // Kiểm tra xem có ID hay không
                console.log('ID của order mới:', newOrderId);
                return newOrderId; // Trả về ID của order để sử dụng sau này
            }
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error('Lỗi khi tạo đơn hàng:', error);
            return null; // Trả về null nếu có lỗi
        }
    };

    const add = async () => {
        await createOrder();
        loadOrder(); // Load lại danh sách đơn hàng
    };


    const columnCart = [
        {
            title: '#',
            dataIndex: 'index',
            width: 50,
            render: (text, record, index) => index + 1, // Hiển thị STT bắt đầu từ 1
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'orderTotal',
            width: 60,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'orderDate',
            width: 60,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'statusName',
            width: 60,
        },
        {
            title: <div style={{ textAlign: 'center' }}>Hành động</div>,
            dataIndex: '',
            width: 50,
            render: (record) => (
                <div style={{ textAlign: 'center' }}>
                    <Link to={`${path_name.orderDetail}/${record.id}`} className="btn btn-outline-warning">
                        <FaEdit />
                    </Link>
                </div>
            ),
        },
    ];
    return (
        <div
            style={{
                margin: '10px 10px',
                padding: 14,
                minHeight: 280,
                background: colorBgContainer,
            }}
        >
            <Button type="primary" onClick={add} icon={<PlusOutlined />} style={{ float: 'right', marginLeft: '5px', marginBottom: '15px' }}>
                Tạo đơn hàng
            </Button>
            <Table
                columns={columnCart}
                dataSource={order}
                pagination={{
                    pageSize: 50,
                }}
                scroll={{
                    y: 240,
                }}
            />
        </div>
    );
}
