import React, { useEffect, useState } from 'react';
import './ShoppingCart.css';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteFilled, DoubleLeftOutlined, ExportOutlined, SendOutlined, TransactionOutlined, HomeOutlined } from '@ant-design/icons';
import { InputNumber, Button, Table, Image, Row, Col, Input, Breadcrumb, notification, Result, message } from 'antd';
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

        await CartService.getAllCartDetailByUserId(user.id)
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
        await CartService.delete(id).then(() => {
            message.success('Xóa sản phẩm khỏi giỏ hàng thành công!');
            findImageByProductId();
        }).catch(() => {
            message.error('Lỗi xóa sản phẩm khỏi giỏ hàng!');
        })

    };
    // Calculate the total amount
    const calculateTotalAmount = () => {
        let totalAmount = 0;
        cartDetail.forEach(item => {
            totalAmount += parseFloat(item.totalPrice);
        });
        return formatCurrency(totalAmount);
    };
    // Hàm thực hiện cập nhật số lượng sản phẩm trong giỏ hàng
    const updateItemCount = () => {
        cartDetail.reduce((total, item) => total + item.quantity, 0);
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
    const handleUpdateClick = async () => {
        try {
            // Tạo một mảng promises cho các hoạt động cập nhật
            const updatePromises = cartDetail.map(async item => {
                // Gọi API cập nhật số lượng cho từng sản phẩm trong giỏ hàng
                await CartService.update(item.quantity, item.id);
            });

            // Chờ cho tất cả promises được giải quyết
            await Promise.all(updatePromises);
            message.success('Cập nhật giỏ hàng thành công!');
            // Sau khi tất cả cập nhật hoàn thành, cập nhật lại trạng thái cartDetail
            findImageByProductId();
        } catch (error) {
            console.error("Error updating cart details:", error);
            message.success('Lỗi cập nhật giỏ hàng!');
            // Hiển thị thông báo lỗi, có thể sử dụng notification.error() từ Ant Design hoặc các phương pháp khác
        } finally {
            // Vô hiệu hóa nút cập nhật sau khi hoàn thành
            setIsUpdateDisabled(true);
        };
    };
    //-------------------checkout----------------------------------
    const navigate = useNavigate();

    const handleCheckoutClick = async () => {
        // Kiểm tra xem có sản phẩm nào có số lượng thay đổi mà chưa được cập nhật hay không
        if (isUpdateDisabled) {
            // Nếu nút "Cập nhật" bị vô hiệu hóa, chuyển hướng trực tiếp
            navigate(path_name.checkout);
        } else {
            // Nếu nút "Cập nhật" không bị vô hiệu hóa, thực hiện cập nhật giỏ hàng trước khi chuyển hướng
            try {
                const updatePromises = cartDetail.map(async item => {
                    // Gọi API cập nhật số lượng cho từng sản phẩm trong giỏ hàng
                    await CartDetailService.update(item.quantity, item.id);
                });
                // Chờ cho tất cả promises được giải quyết
                await Promise.all(updatePromises);
                navigate(path_name.checkout);
            } catch (error) {
                console.error("Error during automatic update before checkout:", error);
                // Hiển thị thông báo lỗi nếu có lỗi trong quá trình cập nhật
                message.error('Lỗi cập nhật giỏ hàng trước khi đặt hàng!');
            }
        }
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
                        max={10000}
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
                                            Tổng tiền: <span>{calculateTotalAmount()}</span>
                                        </li>
                                    </ul>

                                    <Button type="primary" icon={<SendOutlined />}
                                        style={{ width: '100%', height: '40px' }}
                                        onClick={handleCheckoutClick}>
                                        Tiến hành đặt hàng
                                    </Button>

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
