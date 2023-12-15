import React from 'react';
import './ShoppingCart.css';
import { Link } from 'react-router-dom';
import { CloseOutlined, ArrowRightOutlined, LoadingOutlined, DeleteFilled, DoubleLeftOutlined, ExportOutlined, SendOutlined, CheckCircleOutlined, TransactionOutlined, HomeOutlined } from '@ant-design/icons';
import { InputNumber, Button, Table, Image, Row, Col, Form, Input, Breadcrumb } from 'antd';
import path_name from '~/core/constants/routers';
import imgage1 from '~/assets/images/product/product-21.jpg';
import imgage2 from '~/assets/images/product/product-20.jpg';
const { Column } = Table;

const ShoppingCart = () => {
    const dataSource = [
        {
            key: '1',
            name: 'T-shirt Contrast Pocket',
            price: 98.49,
            quantity: 1,
            total: 30.0,
        },
        {
            key: '2',
            name: 'Diagonal Textured Cap',
            price: 98.49,
            quantity: 1,
            total: 32.5,
        },
        {
            key: '1',
            name: 'T-shirt Contrast Pocket',
            price: 98.49,
            quantity: 1,
            total: 30.0,
        },
        {
            key: '2',
            name: 'Diagonal Textured Cap',
            price: 98.49,
            quantity: 1,
            total: 32.5,
        },
    ];

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            with: '5%'
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'name',
            key: 'name',
            with: '50%',
            render: (text, record) => (
                <Row className="product__cart__item">
                    <Col span={7} className="product__cart__item__pic">
                        <Image width={70} src={cartImages[record.key - 1]} alt="" />
                    </Col>
                    <Col span={17} className="product__cart__item__text">
                        <h6>{text}</h6>
                        <h5>${record.price.toFixed(2)}</h5>
                    </Col>
                </Row>
            ),
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            with: '20%',
            render: (text, record) => (
                <div className="quantity__item">
                    <InputNumber min={1} max={10} defaultValue={text} />
                </div>
            ),
        },
        {
            title: 'Thành tiền',
            dataIndex: 'total',
            key: 'total',
            with: '20%',
            render: (text) => <span className="cart__price">${text.toFixed(2)}</span>,
        },
        {
            title: 'Xóa',
            key: 'action',
            with: '5%',
            render: () => (
                <Button type='text' icon={<DeleteFilled />} />
            ),
        },
    ];

    const cartImages = [imgage1, imgage2,];

    return (
        <section className="shopping-cart">
            <div className='container' style={{ height: '80px', padding: '30px 10px', }} >
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
                <Row >
                    <Col span={16} lg={16}>
                        <Table dataSource={dataSource} pagination={false}>
                            {columns.map((column) => (
                                <Column {...column} key={column.key} />
                            ))}
                        </Table>
                        <Row style={{ marginTop: '20px' }}>
                            <Col lg={12} md={12} sm={12}>
                                <Link to={path_name.product}>
                                    <Button type="link" icon={<DoubleLeftOutlined />}>
                                        Tiếp tục mua sắm
                                    </Button>
                                </Link>
                            </Col>
                            <Col lg={12} md={12} sm={12} >
                                <Button type="primary" icon={<ExportOutlined />} style={{ float: 'right' }}>
                                    Cập nhật
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8} lg={8} style={{ padding: '0 0 0 20px' }}>

                        <Row >
                            {/* <Form action="#"> */}
                            <Col span={17} >
                                <Input style={{ height: '40px' }} type="text" placeholder="Mã giảm giá" />
                            </Col>
                            <Col span={7}>
                                <Button type="primary" icon={<TransactionOutlined />} style={{ height: '40px', float: 'right' }}>
                                    Áp dụng
                                </Button>
                            </Col>
                            {/* </Form> */}
                        </Row>
                        <div className="cart__total">
                            <h6>Cộng giỏ hàng</h6>
                            <ul>
                                <li>
                                    Tạm tính: <span>$ 169.50</span>
                                </li>
                                <li>
                                    Giảm giá: <span>$ 169.50</span>
                                </li>
                                <li>
                                    Tổng tiền: <span>$ 169.50</span>
                                </li>
                            </ul>
                            <Link to={path_name.checkout} >
                                <Button type='primary' icon={<SendOutlined />} style={{ width: '100%', height: '40px' }}>
                                    Tiến hành đặt hàng
                                </Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </div>
        </section>
    );
};

export default ShoppingCart;
