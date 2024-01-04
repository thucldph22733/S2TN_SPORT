

import React from 'react';
import { Button, Result } from 'antd';
import { Link, useParams, useNavigate } from 'react-router-dom';
import path_name from '~/core/constants/routers';

const PaymentSuccess = () => {
    const { vnp_TxnRef } = useParams();
    const userString = localStorage.getItem('user2');
    const user = userString ? JSON.parse(userString) : null;
    const navigate = useNavigate(); // Sử dụng hook useNavigate

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
                    <Button key="buy" onClick={() => navigate(`${path_name.orderView}/${vnp_TxnRef}`)}>
                        Xem lịch sử đơn hàng
                    </Button>
                ),
            ]}
        />
    );
};

export default PaymentSuccess;