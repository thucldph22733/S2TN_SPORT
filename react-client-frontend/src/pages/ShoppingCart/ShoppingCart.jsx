import React, { useEffect, useRef, useState } from 'react';
import './ShoppingCart.css';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteFilled, DoubleLeftOutlined, ExportOutlined, SendOutlined, TransactionOutlined, HomeOutlined, TagsOutlined } from '@ant-design/icons';
import { InputNumber, Button, Table, Image, Row, Col, Input, Breadcrumb, notification, Result, message, Modal, Radio } from 'antd';
import path_name from '~/core/constants/routers';
import cart from '~/assets/images/cart_icon.png'
import CartDetailService from '~/service/CartDetailService';
import CartService from '~/service/CartService';
import formatCurrency from '~/utils/format-currency';
import voucher_icon from '~/assets/images/voucher_logo.png';
import VoucherService from '~/service/VoucherService';
import FormatDate from '~/utils/format-date';

const ShoppingCart = () => {


    //----------------Load giỏ hàng chi tiết-------------------------
    const [cartDetail, setCartDetail] = useState([]);

    const userString = localStorage.getItem('user2');
    const user = userString ? JSON.parse(userString) : null;
    //load data cartDeatil
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
    //load data cart
    const [carts, setCarts] = useState({});

    const getCartByUserId = async () => {

        await CartService.getCartByUserId(user.id)
            .then(response => {
                setCarts(response);
            }).catch(error => {
                console.error(error);
            })
    }
    useEffect(() => {
        getCartByUserId();
    }, []);
    //-------------------------------
    const handleDelete = async (id) => {
        await CartService.delete(id).then(() => {
            message.success('Xóa sản phẩm khỏi giỏ hàng thành công!');
            findImageByProductId();
        }).catch(() => {
            message.error('Lỗi xóa sản phẩm khỏi giỏ hàng!');
        })

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

    //Mở modal hiển thị voucher
    const [voucherModal, setVoucherModal] = useState(false);

    const showVoucherModal = () => {
        setVoucherModal(true);
    };

    const hideVoucherModal = () => {
        setVoucherModal(false);
    };

    //---------------- Các hàm tính toán  -----------------------------
    //Tổng tiền
    const calculateTotal = () => {
        const total = calculateTotalAmount() - calculateDiscountRate()
        if (total < 0) {
            return 0
        }
        return total;
    };
    // Giảm giá
    const calculateDiscountRate = () => {
        if (carts.voucher == null) {
            return 0;
        } else {

            return carts.voucher.deleted == false ? 0 : carts.voucher.discountRate
        }
    };
    // Tạm tính
    const calculateTotalAmount = () => {
        let totalAmount = 0;
        cartDetail.forEach(item => {
            totalAmount += parseFloat(item.totalPrice);
        });
        return totalAmount;
    };


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
                                        <Link to={path_name.home}>
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

                            <Col span={8} lg={8} style={{ paddingLeft: '20px' }}>
                                <div className="cart__total">
                                    <h6>Cộng giỏ hàng</h6>
                                    <Row style={{ borderBottom: '1px solid #cdcdcd', padding: '7px 0 10px 0px' }}>
                                        <Col span={12}>
                                            <Button type='text' icon={<TagsOutlined />} style={{ fontWeight: '600' }}>Voucher</Button>
                                        </Col>
                                        <Col span={12}>
                                            <Button type='link' style={{ float: 'right' }} onClick={() => showVoucherModal()}>Chọn mã giảm giá</Button>
                                        </Col>
                                    </Row>
                                    <Row style={{ padding: '10px 12px 10px 14px' }}>
                                        <Col span={12}>
                                            <span >Tạm tính:</span>
                                        </Col>
                                        <Col span={12}>
                                            <span style={{ float: 'right' }}>{formatCurrency(calculateTotalAmount())}</span>
                                        </Col>
                                    </Row>
                                    <Row style={{ padding: '10px 12px 10px 14px' }}>
                                        <Col span={12}>
                                            <span >Giảm giá:</span>
                                        </Col>
                                        <Col span={12}>
                                            <span style={{ float: 'right' }}>{formatCurrency(-calculateDiscountRate())}</span>
                                        </Col>
                                    </Row>

                                    <Row style={{ borderTop: '1px solid #cdcdcd', padding: '20px 50px' }}>
                                        <h5>
                                            Tổng tiền: <span style={{ color: 'red', fontWeight: '550' }}>{formatCurrency(calculateTotal())}</span>
                                        </h5>
                                    </Row>
                                    <Button type="primary" icon={<SendOutlined />}
                                        style={{ width: '100%', height: '40px' }}
                                        onClick={handleCheckoutClick}>
                                        Tiến hành đặt hàng
                                    </Button>

                                </div>
                            </Col>
                        </Row>
                    </div>
                    {voucherModal && <ModalVoucher
                        hideModal={hideVoucherModal}
                        isModal={voucherModal}
                        carts={carts}
                        getCartByUserId={getCartByUserId}
                    />}
                </section>
            )}
        </>
    );
};

const ModalVoucher = ({ hideModal, isModal, carts, getCartByUserId }) => {

    const [vouchers, setVouchers] = useState([]);
    const [selectedVoucher, setSelectedVoucher] = useState(null); // Thêm state mới
    const [isRadioSelected, setIsRadioSelected] = useState(false);
    const fetchVoucher = async () => {
        await VoucherService.findAllVoucherByDeletedTrue()
            .then(response => {
                setVouchers(response.data);
                console.log(response.data)
            }).catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        fetchVoucher();
    }, [])

    useEffect(() => {
        // Kiểm tra xem giỏ hàng đã có voucher hay không
        const cartVoucherId = carts.voucher ? carts.voucher.id : null;
        setSelectedVoucher(cartVoucherId);
        setIsRadioSelected(!!cartVoucherId);
    }, [carts]);

    const handleRadioChange = e => {
        console.log('Radio changed!');
        const voucherId = e.target.value;

        // Nếu radio chưa được chọn, thì set selectedVoucher
        // Nếu radio đã được chọn, thì set selectedVoucher thành null để hủy chọn
        setSelectedVoucher(selectedVoucher === voucherId ? null : voucherId);
        setIsRadioSelected(!selectedVoucher); // Đảo ngược trạng thái isRadioSelected
    };

    // Hàm xử lý khi ấn "OK" trên Modal
    const handleOk = async () => {
        try {
            if (selectedVoucher == null && carts.voucher == null) {
                hideModal();
            } else {
                const data = { cartId: carts.id, voucherId: selectedVoucher };
                await CartService.updateCartVoucher(data);

                // Gọi API `getCartByUserId` sau khi cập nhật voucher
                await getCartByUserId();

                // Đóng modal
                hideModal();
            }
        } catch (error) {
            console.error("Error updating voucher:", error);
        }
    };

    return (
        <>
            <Modal
                title={<span>Chọn mã giảm giá </span>}
                open={isModal}
                onOk={handleOk}
                cancelText="Hủy bỏ"
                onCancel={hideModal}
            >
                <Row style={{ marginTop: '20px', padding: '15px', backgroundColor: '#ece9e9' }}>
                    <Col span={18}>
                        <Input placeholder="Mã giảm giá"></Input>
                    </Col>
                    <Col span={6}>
                        <Button style={{ float: 'right' }} type='primary'>Áp dụng</Button>
                    </Col>
                </Row>
                <h6 style={{ marginTop: '20px' }}>Chọn 1 mã giảm giá</h6>
                <div style={{
                    height: '250px',
                    overflowY: 'auto',  // Thêm thanh cuộn khi nội dung vượt quá chiều cao
                }}>
                    {vouchers.map((item, index) => (
                        <Row key={index + 1} style={{ marginTop: '7px', padding: '7px', border: '1px solid #cdcdcd' }}>
                            <Col span={5} style={{ borderRight: '1px dashed #cdcdcd' }}>
                                <img width={90} src={voucher_icon} alt={`Voucher ${item.voucherId}`} />
                            </Col>
                            <Col span={17} style={{ fontSize: '13px', paddingLeft: '10px' }}>
                                <p style={{ marginBottom: '0' }}>{item.voucherName}</p>
                                <p style={{ marginBottom: '0' }}>Giảm: {formatCurrency(item.discountRate)} | <span>Giảm tối đa:{formatCurrency(item.maxReduce)}</span></p>
                                <p style={{ marginBottom: '0' }}>Đơn tối thiểu: {formatCurrency(item.orderMinimum)}</p>
                                <p style={{ marginBottom: '0' }}>HSD: {FormatDate(item.endDate)}</p>
                            </Col>
                            <Col span={2}>
                                <Radio
                                    value={item.id}
                                    style={{ marginTop: '35px' }}
                                    checked={selectedVoucher === item.id}
                                    onChange={handleRadioChange}
                                />
                            </Col>
                        </Row>
                    ))}
                </div>
            </Modal >
        </>
    );
};
export default ShoppingCart;
