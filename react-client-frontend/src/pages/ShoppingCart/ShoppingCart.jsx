import React, { useEffect, useState } from 'react';
import './ShoppingCart.css';
import { Link } from 'react-router-dom';
import { DeleteFilled, DoubleLeftOutlined, ExportOutlined, SendOutlined, TransactionOutlined, HomeOutlined } from '@ant-design/icons';
import { InputNumber, Button, Table, Image, Row, Col, Input, Breadcrumb, notification, Result } from 'antd';
import path_name from '~/core/constants/routers';
import cart from '~/assets/images/cart_icon.png'
import CartDetailService from '~/service/CartDetailService';
import CartService from '~/service/CartService';
import formatCurrency from '~/utils/format-currency';


const ShoppingCart = () => {


    //----------------Load giỏ hàng chi tiết-------------------------
    const [cartDetail, setCartDetail] = useState([]);

    const userString = localStorage.getItem('user2');
    const user = userString ? JSON.parse(userString) : null;

    const findImageByProductId = async () => {
        const response = await CartService.create(user.id);
        console.log(response);
        // Trích xuất ID của giỏ hàng từ response
        const newCartId = response.id;
        console.log(newCartId)
        await CartDetailService.getAllCartDetailByCartId(newCartId)
            .then(response => {

                const cartDetailMap = response.map((item, index) => ({
                    ...item,
                    key: index + 1,
                    totalPrice: item.quantity * item.price
                }));
                setCartDetail(cartDetailMap);
            }).catch(error => {
                console.error(error);
            })
    }
    useEffect(() => {
        findImageByProductId();
    }, []);

    const handleDelete = async (id) => {
        await CartDetailService.delete(id)
        findImageByProductId();

    };
    // Calculate the total amount
    const calculateTotalAmount = () => {
        let totalAmount = 0;
        cartDetail.forEach(item => {
            totalAmount += parseFloat(item.totalPrice);
        });
        return formatCurrency(totalAmount);
    };

    const [isUpdateDisabled, setIsUpdateDisabled] = useState(true);
    const handleQuantityChange = (id, newQuantity) => {
        // Update the quantity in state
        setCartDetail(prevCartDetail =>
            prevCartDetail.map(item =>
                item.id === id
                    ? {
                        ...item,
                        quantity: newQuantity,
                        totalPrice: newQuantity * item.price,
                    }
                    : item
            )
        );
        setIsUpdateDisabled(false);
    };

    //-------------------update----------------------------------
    const handleUpdateClick = () => {
        // Handle update logic here
        // ...
        // After handling update, disable the button again
        setIsUpdateDisabled(true);
    };
    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            with: '5%',

        },
        {
            title: 'Sản phẩm',
            with: '40%',
            render: (record) => (
                <Row >
                    <Col span={7}>
                        <Image width={60} src={record.productImage} alt="" />
                    </Col>
                    <Col span={17}>
                        <h6>{record.productName}</h6>
                        <p>[ {record.colorName} - {record.sizeName} ]</p>
                    </Col>
                </Row>
            ),
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            with: '15%',
            render: (text) => (
                <span>
                    {formatCurrency(text)}
                </span>
            ),
        },
        {
            title: 'Số lượng',
            with: '15%',
            render: (record) => (
                <div>
                    <InputNumber
                        min={1}
                        max={10}
                        defaultValue={record.quantity}
                        onChange={(newQuantity) => handleQuantityChange(record.id, parseInt(newQuantity, 10))} />
                </div>
            ),
        },
        {
            title: 'Thành tiền',
            with: '20%',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (text) => <span style={{ color: 'red' }}>{formatCurrency(text)}</span>,
        },
        {
            title: 'Xóa',
            key: 'action',
            with: '5%',
            render: (record) => (
                <Button type='text' icon={<DeleteFilled />} onClick={() => handleDelete(record.id)} />
            ),
        },
    ];
    return (
        <>
            {cartDetail.length === 0 ? (
                <Result
                    title="Giỏ hàng của bạn còn trống!"
                    icon={<img style={{ width: 140 }} src={cart} alt="" />}
                    extra={
                        <Link to={path_name.product}>
                            <Button type="primary" key="console">
                                Mua ngay
                            </Button>
                        </Link>
                    }
                />
            ) : (
                <section className="shopping-cart">
                    <div className="container" style={{ height: '80px', padding: '30px 10px' }}>
                        <Breadcrumb
                            style={{ fontSize: '15px' }}
                            items={[
                                {
                                    title: <Link to=""><HomeOutlined style={{ marginRight: '5px' }} />Trang chủ</Link>,
                                },
                                {
                                    title: <Link to="">Giỏ hàng</Link>,
                                },
                            ]}
                        />
                    </div>
                    <div className="container">
                        <Row>
                            <Col span={16} lg={16}>

                                <Table dataSource={cartDetail} pagination={false} columns={columns} />
                                <Row style={{ marginTop: '20px' }}>
                                    <Col lg={12} md={12} sm={12}>
                                        <Link to={path_name.product}>
                                            <Button type="link" icon={<DoubleLeftOutlined />}>
                                                Tiếp tục mua sắm
                                            </Button>
                                        </Link>
                                    </Col>
                                    <Col lg={12} md={12} sm={12}>
                                        <Button
                                            type="primary"
                                            icon={<ExportOutlined />}
                                            disabled={isUpdateDisabled} // Disable based on state
                                            onClick={handleUpdateClick} // Add onClick handler
                                            style={{ float: 'right' }}>
                                            Cập nhật
                                        </Button>
                                    </Col>
                                </Row>

                            </Col>

                            <Col span={8} lg={8} style={{ padding: '0 0 0 20px' }}>
                                <Row>
                                    <Col span={17}>
                                        <Input style={{ height: '40px' }} type="text" placeholder="Mã giảm giá" />
                                    </Col>
                                    <Col span={7}>
                                        <Button type="primary" icon={<TransactionOutlined />} style={{ height: '40px', float: 'right' }}>
                                            Áp dụng
                                        </Button>
                                    </Col>
                                </Row>
                                <div className="cart__total">
                                    <h6>Cộng giỏ hàng</h6>
                                    <ul>
                                        <li>
                                            Tạm tính: <span>{calculateTotalAmount()}</span>
                                        </li>
                                        {/* <li>
                                            Giảm giá: <span>$ 169.50</span>
                                        </li> */}
                                        <li>
                                            Tổng tiền: <span>$ 169.50</span>
                                        </li>
                                    </ul>
                                    <Link to={path_name.checkout}>
                                        <Button type="primary" icon={<SendOutlined />} style={{ width: '100%', height: '40px' }}>
                                            Tiến hành đặt hàng
                                        </Button>
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </section>
            )}
        </>
    );
};

export default ShoppingCart;
