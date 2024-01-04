import React from 'react';
import { Button, Result } from 'antd';
import { Link, useParams } from 'react-router-dom'; // Import thư viện Link để chuyển hướng đến trang khác
import path_name from '~/core/constants/routers';

const OrderSuccessMessage = () => {
    let { id } = useParams();
    const userString = localStorage.getItem('user2');
    const user = userString ? JSON.parse(userString) : null;
    return (
        <Result
            status="success"
            title="Đơn hàng đã nhận"
            subTitle="Cảm ơn bạn đã đặt hàng! Đơn hàng của bạn đã được xác nhận và sẽ sớm được xử lý."
            extra={[
                <Button type="primary" key="console">
                    <Link to="/">Quay về trang chủ</Link>
                </Button>,
                user && (
                    <Button key="buy">
                        <Link to={`${path_name.orderView}/${id}`}>Xem lịch sử đơn hàng</Link>
                    </Button>
                ),
            ]}
        />
    )
};

export default OrderSuccessMessage;