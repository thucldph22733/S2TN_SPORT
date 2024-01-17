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
    const userId = user ? user.id : null;

    // Load dữ liệu cartDetail và cập nhật tổng số lượng
    const getAllCartDetailByUserId = async () => {
        await CartService.getAllCartDetailByUserId(userId)
            .then(response => {
                const cartDetailMap = response.map((item, index) => ({
                    ...item,
                    key: index + 1,
                    totalPrice: item.quantity * item.price
                }));
                setCartDetail(cartDetailMap);
            })
            .catch(error => {
                console.error(error);
            });
    };
    useEffect(() => {
        if (userId) {
            getAllCartDetailByUserId();
        } else {
            const localCartString = localStorage.getItem('localCart');
            if (localCartString) {
                const localCart = JSON.parse(localCartString);
                const cartDetailMap = localCart.map((item, index) => ({
                    ...item,
                    key: index + 1,
                    totalPrice: item.quantity * item.price
                }));
                setCartDetail(cartDetailMap);
            }
        }
    }, [userId]);

    //-------------------------------
    const handleDelete = async (id) => {
        if (user) {
            await CartService.delete(id).then(() => {
                message.success('Xóa sản phẩm khỏi giỏ hàng thành công!');
                getAllCartDetailByUserId(); // Reload data from the server cart
            }).catch(() => {
                message.error('Lỗi xóa sản phẩm khỏi giỏ hàng!');
            });
        } else {
            const existingCart = JSON.parse(localStorage.getItem('localCart')) || [];

            // Find the index of the item with the specified id in the local cart
            const index = existingCart.findIndex(item => item.id === id);

            if (index !== -1) {
                // Remove the item from the local cart
                existingCart.splice(index, 1);

                // Update the local storage
                localStorage.setItem('localCart', JSON.stringify(existingCart));
                setCartDetail(existingCart);
                message.success('Xóa sản phẩm khỏi giỏ hàng thành công!');
            } else {
                message.error('Lỗi xóa sản phẩm khỏi giỏ hàng!');
            }
        }
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
                if (user) {
                    // If user is logged in, call the API to update cart details
                    await CartService.update(item.quantity, item.id);
                } else {
                    // If user is not logged in, update the local cart
                    const existingCart = JSON.parse(localStorage.getItem('localCart')) || [];
                    const updatedCart = existingCart.map(cartItem => {
                        if (cartItem.id === item.id) {
                            return { ...cartItem, quantity: item.quantity };
                        }
                        return cartItem;
                    });
                    localStorage.setItem('localCart', JSON.stringify(updatedCart));
                }
            });

            // Chờ cho tất cả promises được giải quyết
            await Promise.all(updatePromises);
            message.success('Cập nhật giỏ hàng thành công!');
            // Sau khi tất cả cập nhật hoàn thành, cập nhật lại trạng thái cartDetail
            getAllCartDetailByUserId();
        } catch (error) {
            console.error("Error updating cart details:", error);
            message.success('Lỗi cập nhật giỏ hàng!');
            // Hiển thị thông báo lỗi, có thể sử dụng notification.error() từ Ant Design hoặc các phương pháp khác
        } finally {
            // Vô hiệu hóa nút cập nhật sau khi hoàn thành
            setIsUpdateDisabled(true);
        }
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
                    if (user) {
                        // If user is logged in, call the API to update cart details
                        await CartService.update(item.quantity, item.id);
                    } else {
                        // If user is not logged in, update the local cart
                        const existingCart = JSON.parse(localStorage.getItem('localCart')) || [];
                        const updatedCart = existingCart.map(cartItem => {
                            if (cartItem.id === item.id) {
                                return { ...cartItem, quantity: item.quantity };
                            }
                            return cartItem;
                        });
                        localStorage.setItem('localCart', JSON.stringify(updatedCart));
                    }
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
                        <p>[ {record.colorName} - {record.sizeName}  - {record.materialName}]</p>
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
        const totalAmount = calculateTotalAmount();
        const discountedTotal = totalAmount - discountRate;
        const total = discountedTotal < 0 ? 0 : discountedTotal;
        return total;
    }
    // Lấy danh sách giảm giá từ local storage (nếu có)
    const localVouchersString = localStorage.getItem('localVoucher');

    const localVouchers = localVouchersString ? JSON.parse(localVouchersString) : [];
    // Giảm giá
    const discountRate = localVouchers.length != 0 ? localVouchers.discountRate : 0;
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
                <>
                    {localStorage.removeItem('localVoucher')} {/* Xóa voucher khỏi local storage nếu giỏ hàng trống */}
                    <Result
                        title="Giỏ hàng của bạn còn trống!"
                        icon={<img style={{ width: 140 }} src={cart} alt="" />}
                        extra={
                            <Link to={path_name.home}>
                                <Button type="primary" key="console">
                                    Mua ngay
                                </Button>
                            </Link>
                        }
                    />
                </>
            ) : (
                <section className="shopping-cart">
                    <div className="container" style={{ height: '80px', padding: '30px 10px' }}>
                        <Breadcrumb
                            style={{ fontSize: '15px' }}
                            items={[
                                {
                                    title: <Link to={path_name.home}><HomeOutlined style={{ marginRight: '5px' }} />Trang chủ</Link>,
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
                                    <h6>Tổng giỏ hàng</h6>
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
                                            <span style={{ float: 'right' }}>{formatCurrency(-discountRate)}</span>
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
                        voucher={localVouchers}
                        calculateTotalAmount={calculateTotalAmount()}
                    // getCartByUserId={getCartByUserId}
                    // user={user}
                    />}
                </section>
            )}
        </>
    );
};

const ModalVoucher = ({ hideModal, isModal, voucher, calculateTotalAmount }) => {
    const [vouchers, setVouchers] = useState([]);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [inputVoucherCode, setInputVoucherCode] = useState('');
    const [errorText, setErrorText] = useState('');

    const fetchVoucher = async () => {
        await VoucherService.findAllVoucherByDeletedTrue()
            .then(response => {
                setVouchers(response.data);

            }).catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        fetchVoucher();
    }, []);

    useEffect(() => {
        const cartVoucherId = voucher ? voucher.voucherCode : null;
        setSelectedVoucher(cartVoucherId);
    }, [voucher]);

    const handleRadioChange = (e) => {
        const voucherCode = e.target.value;
        setSelectedVoucher(selectedVoucher === voucherCode ? null : voucherCode);
    };

    const handleInputChange = (e) => {
        setInputVoucherCode(e.target.value);
    };

    const handleOkInput = async () => {
        try {
            setErrorText(''); // Reset error text
            const selectedVoucherData = vouchers.find(
                (voucher) => voucher.voucherCode === inputVoucherCode
            );
            if (calculateTotalAmount < selectedVoucherData?.orderMinimum) {
                notification.warning({
                    message: 'Thông báo',
                    description: 'Đơn hàng không đủ điều kiện!',
                });
                return;
            }
            if (!inputVoucherCode) {
                hideModal();
            } else {
                const selectedVoucherData = vouchers.find(
                    (voucher) => voucher.voucherCode === inputVoucherCode
                );
                if (selectedVoucherData) {
                    localStorage.setItem('localVoucher', JSON.stringify(selectedVoucherData));
                    hideModal();
                } else {
                    setErrorText('Không có mã giảm giá này!'); // Display error message
                }
            }
        } catch (error) {
            console.error('Error updating voucher:', error);
        }
    };

    const cs = vouchers.find((item) => item.voucherCode === selectedVoucher);
    // Hàm xử lý khi ấn "OK" trên Modal
    const handleOk = async () => {
        try {
            if (calculateTotalAmount < cs?.orderMinimum) {
                notification.warning({
                    message: 'Thông báo',
                    description: 'Đơn hàng không đủ điều kiện!',
                });
                return;
            }
            if (selectedVoucher == null) {
                hideModal();
            } else {
                const selectedVoucherData = vouchers.find(voucher => voucher.voucherCode === selectedVoucher);
                localStorage.setItem('localVoucher', JSON.stringify(selectedVoucherData));
            }
            // Đóng modal
            hideModal();

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
                        <Input
                            placeholder="Mã giảm giá"
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col span={6}>
                        <Button disabled={inputVoucherCode == '' ? true : false} style={{ float: 'right' }} type='primary' onClick={handleOkInput}>
                            Áp dụng
                        </Button>
                    </Col>
                </Row>
                {(errorText && inputVoucherCode) && <p style={{ color: 'red', marginTop: '5px' }}>{errorText}</p>}
                <h6 style={{ marginTop: '15px' }}>Chọn 1 mã giảm giá</h6>
                <div style={{
                    height: '250px',
                    overflowY: 'auto',
                }}>
                    {vouchers.map((item, index) => (
                        <Row key={index + 1} style={{ marginTop: '7px', padding: '7px', border: '1px solid #cdcdcd' }}>
                            <Col span={5} style={{ borderRight: '1px dashed #cdcdcd' }}>
                                <img width={90} src={voucher_icon} alt={`Voucher ${item.voucherId}`} />
                            </Col>
                            <Col span={17} style={{ fontSize: '13px', paddingLeft: '10px' }}>
                                <p style={{ marginBottom: '0' }}>{item.voucherName}</p>
                                <p style={{ marginBottom: '0' }}>Giảm: {formatCurrency(item.discountRate)}</p>
                                <p style={{ marginBottom: '0' }}>Đơn tối thiểu: {formatCurrency(item.orderMinimum)}</p>
                                <p style={{ marginBottom: '0' }}>HSD: {FormatDate(item.endDate)}</p>
                            </Col>
                            <Col span={2}>
                                <Radio
                                    value={item.voucherCode}
                                    style={{ marginTop: '35px' }}
                                    checked={selectedVoucher === item.voucherCode}
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
