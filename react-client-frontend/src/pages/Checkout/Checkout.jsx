import React, { useEffect, useState } from 'react';
import './Checkout.css';
import { Breadcrumb, Button, Checkbox, Col, Collapse, Form, Input, Modal, Popconfirm, Radio, Row, Select, Tag, message, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { getDistrictsByCity, getProvinces, getWardsByDistrict } from '~/service/ApiService';
import { DeleteOutlined, FormOutlined, HomeOutlined, PlusOutlined, TagsOutlined } from '@ant-design/icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CartService from '~/service/CartService';
import formatCurrency from '~/utils/format-currency';
import AddressService from '~/service/AddressService';
import PaymentService from '~/service/PaymentService';
import OrderService from '~/service/OrderService';
import path_name from '~/core/constants/routers';
import { FaMapMarkedAlt, FaIdCard } from 'react-icons/fa';
import { HiTruck } from "react-icons/hi2";
import VoucherService from '~/service/VoucherService';
import FormatDate from '~/utils/format-date';
import voucher_icon from '~/assets/images/voucher_logo.png';
import vnpay from '~/assets/images/vnpayy.webp';
import axios, { Axios, AxiosError } from 'axios';
function Checkout() {

    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');


    useEffect(() => {

        // Gọi hàm từ service API để lấy dữ liệu tỉnh/thành phố
        getProvinces(3)
            .then(data => setCities(data))
            .catch(error => console.error('Lỗi khi lấy dữ liệu tỉnh/thành phố:', error));
    }, []);

    useEffect(() => {
        // Gọi hàm từ service API để lấy dữ liệu quận/huyện dựa trên tỉnh/thành phố được chọn
        if (selectedCity) {
            getDistrictsByCity(selectedCity, 2)
                .then(data => setDistricts(data))
                .catch(error => console.error('Lỗi khi lấy dữ liệu quận/huyện:', error));
        }
    }, [selectedCity]);

    useEffect(() => {
        // Gọi hàm từ service API để lấy dữ liệu phường/xã dựa trên quận/huyện được chọn
        if (selectedDistrict) {
            getWardsByDistrict(selectedDistrict, 2)
                .then(data => setWards(data))
                .catch(error => console.error('Lỗi khi lấy dữ liệu phường/xã:', error));
        }
    }, [selectedDistrict]);

    const handleCityChange = (value) => {
        setSelectedCity(value);
        setSelectedDistrict('');
        setSelectedWard('');
    };

    const handleDistrictChange = (value) => {
        setSelectedDistrict(value);
        setSelectedWard('');
    };
    //--------------------------load sản phẩm trong giỏ hàng--------------------------

    const userString = localStorage.getItem('user2');
    const user = userString ? JSON.parse(userString) : null;
    const userId = user ? user.id : null;


    const [cartDetail, setCartDetail] = useState([]);

    //load data cartDeatil
    const getAllCartDetailByUserId = async () => {

        await CartService.getAllCartDetailByUserId(userId)
            .then(response => {

                const cartDetailMap = response.map((item, index) => ({
                    ...item,
                    key: index + 1,
                    totalPrice: item.quantity * item.price
                }));
                console.log(cartDetailMap)
                setCartDetail(cartDetailMap);
            }).catch(error => {
                console.error(error);
            })
    }
    // User is not logged in, fetch cart data from local storage
    const localCartString = localStorage.getItem('localCart');
    useEffect(() => {
        // Check if the user is logged in
        if (userId) {
            // User is logged in, fetch cart data from the server
            getAllCartDetailByUserId();
        } else {

            if (localCartString) {
                const localCart = JSON.parse(localCartString);
                // Assuming localCart is an array of items in the same format as your API response
                const cartDetailMap = localCart.map((item, index) => ({
                    ...item,
                    key: index + 1,
                    totalPrice: item.quantity * item.price
                }));
                setCartDetail(cartDetailMap);
            }
        }
    }, [userId]);

    //Tổng tiền
    const calculateTotal = () => {
        const total = calculateTotalAmount() + calculateTransportFee() - discountRate
        if (total < 0) {
            return 0
        }
        return total;
    };

    // Lấy danh sách giảm giá từ local storage (nếu có)
    const localVouchersString = localStorage.getItem('localVoucher');
    const localVouchers = localVouchersString ? JSON.parse(localVouchersString) : [];
    // Giảm giá
    const discountRate = localVouchers.length != 0 ? localVouchers.discountRate : 0;

    // Tính phí ship
    const calculateTransportFee = () => {
        if (calculateTotalAmount() >= 500000) {
            return 0;
        } else {
            return 30000;
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

    //----------------------------load địa chỉ mặc định------------------------
    const [form] = Form.useForm();
    const [address, setAddress] = useState({});

    useEffect(() => {
        if (address) {
            // Use form.setFieldsValue to set values for multiple fields
            form.setFieldsValue({
                'recipientName': address.recipientName,
                'phoneNumber': address.phoneNumber,
                'city': address.city,
                'district': address.district,
                'ward': address.ward,
                'addressDetail': address.addressDetail,
            });
        }
    }, [address, form]);

    const findAddressesByUserIdAnDeletedTrue = async () => {
        await AddressService.findAddressesByUserIdAnDeletedTrue(userId)
            .then(response => {
                setAddress(response);
                console.log(response)
            }).catch(error => {
                console.error(error);
            })
    }
    useEffect(() => {
        if (user) {
            findAddressesByUserIdAnDeletedTrue();
        }
    }, [])
    //------------------------Thanh toán-----------------------------------------
    const [payment, setPayment] = useState();
    const [orderId, setOrderId] = useState(null);
    const [amount, setAmount] = useState(null);
    const navigate = useNavigate();

    // const createPayment = async () => {
    //     const data = {
    //         amount: parseInt(amount),
    //         orderId: orderId
    //     }

    //     try {
    //         const response = await PaymentService.create(data);
    //         setPayment(response);
    //         console.log(response);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // useEffect(() => {
    //     if (orderId && amount) {
    //         createPayment();
    //     }
    // }, [orderId, amount]);

    const handleCreate = async () => {
        try {
            const values = await form.validateFields();

            values.userId = userId;
            values.voucherId = localVouchers == null ? null : localVouchers.id;
            values.statusName = 'Chờ xác nhận';
            values.orderTotal = calculateTotal();
            values.orderType = 'Online';
            values.transportFee = calculateTransportFee();

            if (!user) {
                const localCart = JSON.parse(localCartString);
                values.orderDetail = localCart.map(item => ({
                    productDetailId: item.id,
                    quantity: item.quantity,
                    price: item.price,
                }));
                values.city = cities.find(city => city.code === Number(values.city))?.name ?? ''
                values.district = districts.find(district => district.code === Number(values.district))?.name ?? ''
                values.ward = wards.find(ward => ward.code === Number(values.ward))?.name ?? ''
            }

            const response = await OrderService.create(values);

            if (selectedMethod === 'cashOnDelivery') {
                navigate(`${path_name.show_bill_check}/${response.id}`);
                notification.success({
                    message: 'Thông báo',
                    description: 'Đặt hàng thành công!',
                });
                localStorage.removeItem("localCart");
                localStorage.removeItem("localVoucher");
            } else {
                const dataPayment = {
                    orderId: response.id,
                    paymentDate: new Date(),
                    amount: response.orderTotal,
                    paymentMethod: "Chuyển khoản",
                    note: `Thanh toán đơn hàng ngày ${FormatDate(new Date())}`,
                    status: "Đã thanh toán"
                };
                await PaymentService.create(dataPayment);
                const data = {
                    amount: parseInt(response.orderTotal),
                    orderId: response.id
                };
                const result = await PaymentService.payment(data);
                if (result && result.data) {
                    var a = document.createElement("a");
                    a.href = result.data;
                    a.click();
                }
            }
        } catch (error) {

            if (error?.outOfDate === false) {
                console.error("error", error);
            } else {
                message.error(error.response.data.errorMessage);
            }
        }
    };

    const handlePlaceOrder = async () => {
        if (selectedMethod === "vnpay") {
            await handleCreate();
        } else if (selectedMethod === "cashOnDelivery") {
            await handleCreate();
        } else {
            notification.error({
                message: 'Thông báo',
                description: 'Vui lòng chọn phương thức thanh toán!',
            });
        }
    }

    //-------------------------------------
    const [selectedMethod, setSelectedMethod] = useState("cashOnDelivery");

    const handlePaymentMethodClick = (method) => {
        // Nếu phương thức đã được chọn, bỏ chọn nó
        if (selectedMethod === method) {
            setSelectedMethod(null);
        } else {
            // Nếu phương thức chưa được chọn, chọn nó
            setSelectedMethod(method);
        }
    };



    //Mở modal hiển thị address
    const [addressModal, setAddressModal] = useState({ isModal: false, reacord: null });

    const showAddressModal = (record) => {
        setAddressModal({
            isModal: true,
            reacord: record,
        });
    };

    const hideAddressModal = () => {
        setAddressModal({ isModal: false });
    };
    //Mở modal voucher
    const [voucherModal, setVoucherModal] = useState(false);

    const showVoucherModal = () => {
        setVoucherModal(true);
    };
    const hideVoucherModal = () => {
        setVoucherModal(false);
    };
    return (
        <section className="checkout">
            <div className='container' style={{ height: '80px', padding: '30px 10px', }} >
                <Breadcrumb
                    style={{ fontSize: '15px' }}

                    items={[
                        {
                            title: <Link to={path_name.home}><HomeOutlined style={{ marginRight: '5px' }} />Trang chủ</Link>,
                        },
                        {
                            title: <Link to={path_name.shopping_cart}>Giỏ hàng</Link>,
                        },
                        {
                            title: <Link to="">Thanh toán</Link>,
                        },
                    ]}
                />
            </div>
            <div className="container">

                <Form name="validateOnly" layout="vertical" autoComplete="off" form={form}>
                    <Row>
                        <Col span={16} lg={16} md={12} key={address.id}>

                            <Row style={{ borderBottom: '2px solid #2123bf', marginBottom: '30px', paddingBottom: '20px' }}>
                                <Col span={20}><h6 className="checkout__title">THÔNG TIN THANH TOÁN</h6></Col>
                                <Col span={4}>
                                    {user && <Button type='dashed' onClick={() => showAddressModal(user)}>Chọn địa chỉ</Button>}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} lg={12} style={{ paddingRight: '15px' }}>
                                    <Form.Item
                                        label="Họ và tên"
                                        name="recipientName"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập họ và tên!',
                                            },
                                            {
                                                validator: (_, value) => {
                                                    // Kiểm tra xem có dấu cách ở đầu và cuối không
                                                    if (value && (value.trim() !== value)) {
                                                        return Promise.reject('Họ và tên không được có dấu cách ở đầu hoặc cuối');
                                                    }
                                                    return Promise.resolve();
                                                },
                                            },
                                        ]}
                                        initialValue={address?.recipientName}
                                    >
                                        <Input
                                            placeholder="Nhập họ và tên..."
                                            className='checkout__input'
                                        />
                                    </Form.Item>

                                </Col>
                                <Col span={12} lg={12} style={{ paddingRight: '15px' }}>
                                    <Form.Item
                                        label="Số điện thoại"
                                        name="phoneNumber"
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập số điện thoại!' },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    const phoneNumberRegex = /^[0-9]{10,12}$/;

                                                    if (!value) {
                                                        return Promise.resolve();
                                                    }

                                                    if (!phoneNumberRegex.test(value)) {
                                                        // notification.error({
                                                        //     message: 'Lỗi',
                                                        //     description: 'Số điện thoại không đúng định dạng!',
                                                        // });
                                                        return Promise.reject('Số điện thoại không đúng định dạng!');
                                                    }

                                                    return Promise.resolve();
                                                },
                                            }),
                                        ]}
                                        initialValue={address?.phoneNumber}
                                    >
                                        <Input
                                            className='checkout__input'
                                            placeholder="Nhập số điện thoại..."
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: '10px' }}>
                                <Col span={12} style={{ paddingRight: '15px' }}>

                                    <Form.Item label="Tỉnh/Thành phố:" name="city"
                                        rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]}
                                        initialValue={address?.city}
                                    >
                                        <Select
                                            showSearch
                                            style={{
                                                width: '100%',
                                                height: '45px',

                                            }}
                                            onChange={handleCityChange}
                                            placeholder="Chọn Tỉnh/Thành phố"
                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                            filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                            options={cities.map(city => ({ value: city.code, label: city.name }))}

                                        />

                                    </Form.Item>

                                </Col>
                                <Col span={12} style={{ paddingRight: '15px' }}>

                                    <Form.Item label="Quận/Huyện:" name="district"
                                        initialValue={address?.district}
                                        rules={[{ required: true, message: 'Vui lòng chọn quận/huyện!' }]}>
                                        <Select
                                            showSearch
                                            style={{
                                                width: '100%',
                                                height: '45px'
                                            }}
                                            onChange={handleDistrictChange}
                                            placeholder="Chọn Quận/Huyện"
                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                            filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                            disabled={!selectedCity}
                                            options={districts.map(district => ({ value: district.code, label: district.name }))}
                                        />
                                    </Form.Item>

                                </Col>
                            </Row>

                            <Row style={{ marginTop: '10px' }}>
                                <Col span={12} style={{ paddingRight: '15px' }}>

                                    <Form.Item label="Phường/Xã:" name="ward"
                                        initialValue={address?.ward}
                                        rules={[{ required: true, message: 'Vui lòng chọn phường/xã!' }]}>
                                        <Select
                                            showSearch
                                            style={{
                                                width: '100%',
                                                height: '45px'
                                            }}
                                            placeholder="Chọn Phường/Xã"
                                            onChange={value => setSelectedWard(value)}
                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                            filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                            disabled={!selectedDistrict}
                                            options={wards.map(ward => ({ value: ward.code, label: ward.name }))}
                                        />
                                    </Form.Item>

                                </Col>
                                <Col span={12} style={{ paddingRight: '15px' }}>

                                    <Form.Item label="Địa chỉ cụ thể:" name="addressDetail"
                                        initialValue={address?.addressDetail}
                                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ cụ thể!' }]}>
                                        <Input
                                            placeholder="Địa chỉ cụ thể..."

                                            className='checkout__input' />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row style={{ paddingRight: '10px' }}>
                                <Form.Item label="Ghi chú:" name="note" style={{ width: '100%' }}>
                                    <TextArea style={{ width: '100%' }} rows={4} placeholder="Nhập ghi chú..." />
                                </Form.Item>
                            </Row>
                            <Row style={{ padding: '15px 0' }}>
                                <Col span={12} style={{ borderRight: '1px dashed #cdcdcd' }}>
                                    <h6 style={{ marginLeft: '10px', fontWeight: '600' }}><TagsOutlined />Giảm giá</h6>
                                    <Row >

                                        <Button type='dashed'
                                            icon={<PlusOutlined />}
                                            onClick={() => showVoucherModal()}
                                            style={{ height: '42px', borderRadius: '8px', margin: '10px' }}
                                        >Chọn mã giảm giá</Button>

                                    </Row>
                                </Col>

                                <Col span={12}>
                                    <h6 style={{ marginLeft: '10px', fontWeight: '600' }}>Phương thức thanh toán <FaIdCard /></h6>
                                    <Row>
                                        <Col span={12}>
                                            <div
                                                style={{
                                                    border: `1px solid ${selectedMethod === 'cashOnDelivery' ? '#2123bf' : '#cdcdcd'}`,
                                                    borderRadius: '8px',
                                                    margin: '10px',
                                                    cursor: 'pointer',
                                                    color: selectedMethod === 'cashOnDelivery' ? '#2123bf' : 'black',
                                                    backgroundColor: '#ffffff'
                                                }}
                                                onClick={() => handlePaymentMethodClick('cashOnDelivery')}
                                            >
                                                <p style={{ textAlign: 'center', margin: '10px 0' }}>Thanh toán khi nhận hàng</p>
                                            </div>
                                        </Col>
                                        <Col span={12}>
                                            <div
                                                style={{
                                                    border: `1px solid ${selectedMethod === 'vnpay' ? '#2123bf' : '#cdcdcd'}`,
                                                    borderRadius: '8px',
                                                    margin: '10px',
                                                    cursor: 'pointer',
                                                    color: selectedMethod === 'vnpay' ? '#2123bf' : 'black',
                                                    backgroundColor: '#ffffff'
                                                }}
                                                onClick={() => handlePaymentMethodClick('vnpay')}
                                            >
                                                <p style={{ textAlign: 'center', margin: '10px 0' }}>Thanh toán VNPay <img width={25} src={vnpay} alt="" /></p>
                                            </div>
                                        </Col>
                                    </Row>

                                </Col>
                            </Row>
                            {/* <h6 className="coupon__code">
                                Bạn đã có mã giảm giá? <a style={{ color: 'red' }} href="#">Ấn vào đây để nhập mã</a>
                            </h6> */}
                        </Col>
                        <Col span={8} lg={8} md={12}>
                            <div className="checkout__order">
                                <h6 className="order__title">Đơn hàng của bạn</h6>
                                <Row >
                                    <Col span={18}>
                                        <b>SẢN PHẨM</b>
                                    </Col>
                                    <Col span={6} style={{ float: 'right' }}>
                                        <b style={{ float: 'right' }}>TẠM TÍNH</b>
                                    </Col>
                                </Row>
                                {cartDetail.map((item, index) => (
                                    <Row key={index} style={{ marginTop: '10px' }}>
                                        <Col span={18} key={item.key}>
                                            <p style={{ marginBottom: '0' }}>{index + 1}. {item.productName} [ {item.colorName} - {item.sizeName} ]</p>
                                            <span style={{ color: 'red' }}>{formatCurrency(item.price)}</span> | x{item.quantity}
                                        </Col>
                                        <Col span={6} key={`totalPrice_${index}`}>
                                            <p style={{ float: 'right', color: 'red' }}>{formatCurrency(item.totalPrice)}</p>
                                        </Col>
                                    </Row>
                                ))}
                                <div className="checkout__total__all">
                                    <Row>
                                        <span style={{ color: '#2123bf', margin: '10px 0' }}> Miễn phí vận chuyển cho đơn hàng trên 500k </span> <HiTruck style={{ fontSize: '20px', color: 'orange', margin: '10px 5px' }} />
                                    </Row>
                                    <Row>
                                        <Col span={10}>
                                            <p>Tạm tính:</p>
                                        </Col>
                                        <Col span={14}>
                                            <span style={{ float: 'right' }}>{formatCurrency(calculateTotalAmount())}</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={10}>
                                            <p>Phí giao hàng:</p>
                                        </Col>
                                        <Col span={14} >
                                            <span style={{ float: 'right' }}>{formatCurrency(calculateTransportFee())}</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={10}>
                                            <p>Giảm giá:</p>
                                        </Col>
                                        <Col span={14} >
                                            <span style={{ float: 'right' }}>{formatCurrency(-discountRate)}</span>
                                        </Col>
                                    </Row>
                                    <Row >
                                        <Col span={10}>
                                            <p> Tổng tiền:</p>
                                        </Col>
                                        <Col span={14} >
                                            <span style={{ float: 'right' }}>{formatCurrency(calculateTotal())}</span>
                                        </Col>
                                    </Row>
                                </div>

                                <Button onClick={handlePlaceOrder} type='primary' style={{ width: '100%', height: '45px', marginTop: '20px', fontSize: '17px', fontWeight: '600', borderRadius: '5px' }}>
                                    Đặt hàng
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div >
            {
                addressModal.isModal && <ShowAddressModal
                    reacord={addressModal.reacord}
                    hideModal={hideAddressModal}
                    isModal={addressModal.isModal}
                    findAddressesByUserIdAnDeletedTrue={findAddressesByUserIdAnDeletedTrue}
                />
            }
            {voucherModal && <ModalVoucher
                hideModal={hideVoucherModal}
                isModal={voucherModal}
                voucher={localVouchers}
                calculateTotalAmount={calculateTotalAmount()}

            // getCartByUserId={getCartByUserId}
            />}
        </section >
    );
}

export default Checkout;



const ShowAddressModal = ({ reacord, hideModal, isModal, findAddressesByUserIdAnDeletedTrue }) => {

    //Mở modal thêm sử address
    const [addressModal2, setAddressModal2] = useState({ isModal: false, isMode: '', reacord: null });

    const showAddressModal2 = (mode, record) => {
        setAddressModal2({
            isModal: true,
            isMode: mode,
            reacord: record,
        });
    };

    const hideAddressModal2 = () => {
        setAddressModal2({ isModal: false });
    };

    const [address, setAddress] = useState([]);

    const fetchAddress = async () => {
        findAddressesByUserIdAnDeletedTrue();
        await AddressService.getAddressesByUserId(reacord.id)
            .then(response => {
                setAddress(response);

            }).catch(error => {
                console.error(error);
            })

    }
    useEffect(() => {

        fetchAddress();
    }, [])

    const handleDelete = async (id) => {

        await AddressService.delete(id).then(response => {
            console.log(response.data);
            notification.success({
                message: 'Thông báo',
                description: 'Xóa thành công!',
            });
            fetchAddress();
        }).catch(error => {
            console.error(error);
            notification.error({
                message: 'Thông báo',
                description: 'Xóa thất bại!',
            });
        });
    };
    return (
        <>
            <Modal
                title="Địa chỉ"
                onCancel={hideModal}
                footer={null}
                open={isModal}
            >
                <Row style={{ borderBottom: '1px solid #e8e8e8', paddingBottom: '8px', marginBottom: '8px' }}>
                    <Col span={18} />
                    <Col span={6}>
                        <Button type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => showAddressModal2("add", reacord.id)}
                            style={{ marginBottom: '16px', borderRadius: '2px' }} >
                            Thêm mới
                        </Button>
                    </Col>
                </Row>
                {address.length === 0 ? (
                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        <FaMapMarkedAlt style={{ fontSize: '30px', color: '#8c8c8c', marginBottom: '8px' }} />
                        <p style={{ marginBottom: '0', fontSize: '16px' }}>Không có dữ liệu!!!</p>
                    </div>
                ) : (
                    address.map((address, index) => (
                        <Row key={index + 1} style={{ borderBottom: '1px solid #e8e8e8', paddingBottom: '8px', marginBottom: '8px' }}>
                            <Col span={21}>
                                <p>
                                    <b>{address?.recipientName}</b> | {address?.phoneNumber}
                                </p>
                                <p>{address?.addressDetail} - {address?.ward} - {address?.district} - {address?.city}</p>
                                {address.deleted && <Tag color='red'>Mặc định</Tag>}
                            </Col>
                            <Col span={3}>
                                <Button type="text"
                                    icon={<FormOutlined
                                        style={{ color: 'rgb(214, 103, 12)' }}
                                        onClick={() => {
                                            showAddressModal2("edit", address);
                                        }} />}
                                />
                                {address.deleted != true && <Popconfirm
                                    title="Xóa địa chỉ"
                                    description="Bạn có chắc chắn xóa địa chỉ này không?"
                                    placement="topRight"
                                    onConfirm={() => handleDelete(address.id)}
                                    okText="Đồng ý"
                                    cancelText="Hủy bỏ"
                                >
                                    <Button type="text" icon={<DeleteOutlined />} style={{ color: 'red' }} />
                                </Popconfirm>}
                            </Col>
                        </Row>
                    ))
                )}
            </Modal>
            {addressModal2.isModal && (
                <AddressModal
                    isMode={addressModal2.isMode}
                    reacord={addressModal2.reacord || {}}
                    address={address}
                    hideModal={hideAddressModal2}
                    isModal={addressModal2.isModal}
                    fetchAddress={fetchAddress}

                />
            )}
        </>
    );
}

const AddressModal = ({ isMode, reacord, hideModal, isModal, fetchAddress, address }) => {
    //Đoạn mã lấy api tỉnh thành, quận huyện, phường xã
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');


    useEffect(() => {
        // Gọi hàm từ service API để lấy dữ liệu tỉnh/thành phố
        getProvinces(3)
            .then(data => setCities(data))
            .catch(error => console.error('Lỗi khi lấy dữ liệu tỉnh/thành phố:', error));
    }, []);

    useEffect(() => {
        // Gọi hàm từ service API để lấy dữ liệu quận/huyện dựa trên tỉnh/thành phố được chọn
        if (selectedCity) {
            getDistrictsByCity(selectedCity, 2)
                .then(data => setDistricts(data))
                .catch(error => console.error('Lỗi khi lấy dữ liệu quận/huyện:', error));
        }
    }, [selectedCity]);

    useEffect(() => {
        // Gọi hàm từ service API để lấy dữ liệu phường/xã dựa trên quận/huyện được chọn
        if (selectedDistrict) {
            getWardsByDistrict(selectedDistrict, 2)
                .then(data => setWards(data))
                .catch(error => console.error('Lỗi khi lấy dữ liệu phường/xã:', error));
        }
    }, [selectedDistrict]);

    const handleCityChange = (value) => {
        setSelectedCity(value);
        setSelectedDistrict('');
        setSelectedWard('');
    };

    const handleDistrictChange = (value) => {
        setSelectedDistrict(value);
        setSelectedWard('');
    };

    //---------------------------------------------------------------------------------------------
    const [form] = Form.useForm();
    const handleCreate = () => {
        form.validateFields().then(async () => {

            const data = await form.getFieldsValue(true);
            data.usersId = reacord;
            data.deleted = data.deleted ? true : false
            data.city = cities.find(city => city.code === Number(data.city))?.name ?? ''
            data.district = districts.find(district => district.code === Number(data.district))?.name ?? ''
            data.ward = wards.find(ward => ward.code === Number(data.ward))?.name ?? ''

            await AddressService.create(data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Thêm mới thành công!',
                    });
                    fetchAddress();
                    // Đóng modal
                    hideModal();
                })
                .catch(error => {
                    notification.error({
                        message: 'Thông báo',
                        description: 'Thêm mới thất bại!',
                    });
                    console.error(error);
                });

        }).catch(error => {
            console.error(error);
        })

    }
    const handleUpdate = () => {
        form.validateFields().then(async () => {

            const data = await form.getFieldsValue(true);

            await AddressService.update(reacord.id, data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Cập nhật thành công!',
                    });
                    fetchAddress()
                    // Đóng modal
                    hideModal();
                })
                .catch(error => {
                    notification.error({
                        message: 'Thông báo',
                        description: 'Cập nhật thất bại!',
                    });
                    console.error(error);
                });

        }).catch(error => {
            console.error(error);
        })

    }
    return (
        <>
            <Modal
                width={600}
                title={isMode === "edit" ? "Cập nhật địa chỉ" : "Thêm mới một địa chỉ"}
                open={isModal}
                onCancel={hideModal}
                onOk={isMode === "edit" ? handleUpdate : handleCreate}
                okText={isMode === "edit" ? "Cập nhật" : "Thêm mới"}
                cancelText="Hủy bỏ"
            >
                <Form
                    name="validateOnly" layout="vertical" autoComplete="off"
                    style={{ maxWidth: 600, marginTop: '25px' }}
                    form={form}
                    initialValues={{
                        ...reacord,
                        city: reacord.city
                    }}
                >
                    <Form.Item label="Họ và tên:" name="recipientName"
                        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }
                            ,
                        {
                            validator: (_, value) => {
                                if (!value) {
                                    return Promise.resolve(); // Không thực hiện validate khi giá trị rỗng
                                }
                                // Kiểm tra dấu cách ở đầu và cuối
                                if (/^\s|\s$/.test(value)) {
                                    return Promise.reject('Tên người dùng không được chứa dấu cách ở đầu và cuối!');
                                }
                                return Promise.resolve();
                            },
                        },
                        ]}
                    >
                        <Input placeholder="Họ và tên..." />
                    </Form.Item>
                    <Form.Item label="Số điện thoại:" name="phoneNumber"
                        rules={[
                            { required: true, message: 'Vui lòng nhập số điện thoại!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    const phoneNumberRegex = /^[0-9]{10,12}$/;

                                    if (!value) {
                                        return Promise.resolve();
                                    }

                                    if (!phoneNumberRegex.test(value)) {
                                        // notification.error({
                                        //     message: 'Lỗi',
                                        //     description: 'Số điện thoại không đúng định dạng!',
                                        // });
                                        return Promise.reject('Số điện thoại không đúng định dạng!');
                                    }

                                    return Promise.resolve();
                                },
                            }),
                        ]}
                    >
                        <Input placeholder="Số điện thoại..." />
                    </Form.Item>
                    <Row>
                        <Col span={11}>
                            <Form.Item label="Tỉnh/Thành phố:" name="city" rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]}>
                                <Select
                                    showSearch
                                    style={{
                                        width: '100%',
                                    }}
                                    onChange={handleCityChange}
                                    placeholder="Chọn Tỉnh/Thành phố"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={cities.map(city => ({ value: city.code, label: city.name }))}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={2} />
                        <Col span={11}>
                            <Form.Item label="Quận/Huyện:" name="district" rules={[{ required: true, message: 'Vui lòng chọn quận/huyện!' }]}>
                                <Select
                                    showSearch
                                    style={{
                                        width: '100%',
                                    }}
                                    onChange={handleDistrictChange}
                                    placeholder="Chọn Quận/Huyện"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    disabled={!selectedCity}
                                    options={districts.map(district => ({ value: district.code, label: district.name }))}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                            <Form.Item label="Phường/Xã:" name="ward" rules={[{ required: true, message: 'Vui lòng chọn phường/xã!' }]}>
                                <Select
                                    showSearch
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Chọn Phường/Xã"
                                    onChange={value => setSelectedWard(value)}
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    disabled={!selectedDistrict}
                                    options={wards.map(ward => ({ value: ward.code, label: ward.name }))}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={2} />
                        <Col span={11}>
                            <Form.Item label="Địa chỉ cụ thể:" name="addressDetail" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ cụ thể!' }]}>
                                <Input placeholder="Địa chỉ cụ thể..." />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="deleted" valuePropName="checked">
                        <Checkbox disabled={isMode === "edit" && reacord.deleted == true}>Đặt làm địa chỉ mặc định</Checkbox>
                    </Form.Item>
                </Form>
            </Modal>

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