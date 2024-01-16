

import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {

    return (
        <Result
            status="success"
            title="Đơn hàng đã được thanh toán"
            subTitle="Cảm ơn bạn đã đặt hàng! Đơn hàng của bạn đã được xác nhận và sẽ sớm được xử lý."
            extra={[
                <Button type="primary" key="console">
                    <Link to="/">Quay về trang chủ</Link>
                </Button>,

            ]}
        />
    );
};

export default PaymentSuccess;