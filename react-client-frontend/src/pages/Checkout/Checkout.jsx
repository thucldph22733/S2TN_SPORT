import React, { useEffect, useState } from 'react';
import './Checkout.css';
import { Breadcrumb, Button, Checkbox, Col, Collapse, Form, Input, Modal, Popconfirm, Radio, Row, Select, Tag, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { getDistrictsByCity, getProvinces, getWardsByDistrict } from '~/service/ApiService';
import { DeleteOutlined, FormOutlined, HomeOutlined, PlusOutlined, SendOutlined, TagsOutlined, TransactionOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import CartService from '~/service/CartService';
import formatCurrency from '~/utils/format-currency';
import AddressService from '~/service/AddressService';
import PaymentService from '~/service/PaymentService';
import OrderService from '~/service/OrderService';
import path_name from '~/core/constants/routers';
import { FaMapMarkedAlt } from 'react-icons/fa';
import VoucherService from '~/service/VoucherService';
import FormatDate from '~/utils/format-date';
import voucher_icon from '~/assets/images/voucher_logo.png';

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
    // Calculate the total amount
    const calculateTotalAmount = () => {
        let totalAmount = 0;
        cartDetail.forEach(item => {
            totalAmount += parseInt(item.totalPrice);
        });
        return totalAmount;
    };

    const calculateTotal = () => {
        return (parseInt(calculateTotalAmount()) + 30000);
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
        await AddressService.findAddressesByUserIdAnDeletedTrue(user.id)
            .then(response => {
                setAddress(response);
                console.log(response)
            }).catch(error => {
                console.error(error);
            })
    }
    useEffect(() => {
        findAddressesByUserIdAnDeletedTrue();
    }, [])
    //------------------------Thanh toán-----------------------------------------
    const [payment, setPayment] = useState();

    const create = async () => {
        const data = { amount: 10000000 }
        await PaymentService.create(data)
            .then(response => {
                setPayment(response);
                console.log(response)

            }).catch(error => {
                console.error(error);
            })
    }
    useEffect(() => {
        create();
    }, [])

    const handleCreate = async () => {
        try {
            const values = await form.validateFields();
            // Sử dụng giá trị từ values thay vì form.getFieldsValue()
            values.userId = user.id;
            values.deliveryId = 1;
            values.voucherId = 1;
            values.statusId = 2;
            values.orderTotal = calculateTotal();
            values.orderType = 'Online';

            await OrderService.create(values)
                .then((response) => {
                    navigate(`${path_name.show_bill_check}/${response.id}`)
                    notification.success({
                        message: 'Thông báo',
                        description: 'Đặt hàng thành công!',
                    });
                })
                .catch(error => {
                    notification.error({
                        message: 'Thông báo',
                        description: 'Đặt hàng thất bại!',
                    });
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    };



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

    const navigate = useNavigate();

    // const navigate = useNavigate();
    const handlePlaceOrder = () => {

        if (selectedMethod === "vnpay") {
            var a = document.createElement("a");
            a.href = payment.data;
            a.click();
        } else {
            handleCreate();
        }


    }
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
                                    <Button type='dashed' onClick={() => showAddressModal(user)}>Chọn địa chỉ</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} lg={12} >
                                    <div className="checkout__input">
                                        <Form.Item
                                            label="Họ và tên"
                                            name="recipientName"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập họ và tên!',
                                                },
                                            ]}
                                            initialValue={address?.recipientName}

                                        >
                                            <Input placeholder="Nhập họ và tên..." disabled={true} />
                                        </Form.Item>
                                    </div>

                                </Col>
                                <Col span={12} lg={12} >
                                    <div className="checkout__input">
                                        <Form.Item
                                            label="Số điện thoại"
                                            name="phoneNumber"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập số điện thoại!',
                                                },
                                            ]}
                                            initialValue={address?.phoneNumber}
                                        >
                                            <Input placeholder="Nhập số điện thoại..." disabled={true} />
                                        </Form.Item>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <div className="checkout__input">
                                        <Form.Item label="Tỉnh/Thành phố:" name="city"
                                            rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]}
                                            initialValue={address?.city}
                                        >
                                            <Select
                                                showSearch
                                                style={{
                                                    width: '100%',
                                                    height: '45px'
                                                }}
                                                onChange={handleCityChange}
                                                placeholder="Chọn Tỉnh/Thành phố"
                                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                filterSort={(optionA, optionB) =>
                                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                }
                                                options={cities.map(city => ({ value: city.code, label: city.name }))}
                                                disabled={true}
                                            />

                                        </Form.Item>
                                    </div>
                                </Col>

                                <Col span={12}>
                                    <div className="checkout__input">
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
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={12}>
                                    <div className="checkout__input">
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
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="checkout__input">
                                        <Form.Item label="Địa chỉ cụ thể:" name="addressDetail"
                                            initialValue={address?.addressDetail}
                                            rules={[{ required: true, message: 'Vui lòng nhập tên vai trò!' }]}>
                                            <Input placeholder="Địa chỉ cụ thể..." disabled={true} />
                                        </Form.Item>
                                    </div>
                                </Col>
                            </Row>
                            <div className="checkout__input">
                                <Form.Item label="Ghi chú:" name="note" >
                                    <TextArea rows={4} placeholder="Nhập ghi chú..." />
                                </Form.Item>
                            </div>
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
                                    <h6 style={{ marginLeft: '10px', fontWeight: '600' }}>Phương thức thanh toán</h6>
                                    <Row>
                                        <Col span={12}>
                                            <div
                                                style={{
                                                    border: `1px solid ${selectedMethod === 'cashOnDelivery' ? '#2123bf' : '#cdcdcd'}`,
                                                    borderRadius: '8px',
                                                    margin: '10px',
                                                    cursor: 'pointer',
                                                    color: selectedMethod === 'cashOnDelivery' ? '#2123bf' : 'black',
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
                                                }}
                                                onClick={() => handlePaymentMethodClick('vnpay')}
                                            >
                                                <p style={{ textAlign: 'center', margin: '10px 0' }}>Thanh toán VNPay</p>
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
                                        <Col span={10}>
                                            <p>Tạm tính:</p>
                                        </Col>
                                        <Col span={14}>
                                            <span style={{ float: 'right' }}>{formatCurrency(calculateTotalAmount())}</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={10}>
                                            <p>Giảm giá:</p>
                                        </Col>
                                        <Col span={14} >
                                            <span style={{ float: 'right' }}>{formatCurrency(0)}</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={10}>
                                            <p>Phí giao hàng:</p>
                                        </Col>
                                        <Col span={14} >
                                            <span style={{ float: 'right' }}>{formatCurrency(30000)}</span>
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
            // onVoucherSelect={handleVoucherOk}

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
                    reacord={addressModal2.reacord}
                    hideModal={hideAddressModal2}
                    isModal={addressModal2.isModal}
                    fetchAddress={fetchAddress}

                />
            )}
        </>
    );
}

const AddressModal = ({ isMode, reacord, hideModal, isModal, fetchAddress }) => {
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
                    <Form.Item label="Họ và tên:" name="recipientName" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                        <Input placeholder="Họ và tên..." />
                    </Form.Item>
                    <Form.Item label="Số điện thoại:" name="phoneNumber" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
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
                            <Form.Item label="Địa chỉ cụ thể:" name="addressDetail" rules={[{ required: true, message: 'Vui lòng nhập tên vai trò!' }]}>
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
const ModalVoucher = ({ hideModal, isModal }) => {

    const [vouchers, setVouchers] = useState([]);
    // const [selectedVoucher, setSelectedVoucher] = useState(null); // Thêm state mới

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

    // const handleRadioChange = (e) => {
    //     const voucherId = e.target.value;
    //     setSelectedVoucher(voucherId);
    //     // Lấy thông tin voucher tương ứng từ danh sách và gọi hàm callback để thông báo cho ShoppingCart

    // };

    // Hàm xử lý khi ấn "OK" trên Modal
    // const handleOk = () => {

    //     const selectedVoucherInfo = vouchers.find(voucher => voucher.id === selectedVoucher);
    //     onVoucherSelect(selectedVoucherInfo);
    //     // Đóng modal
    //     hideModal();
    // };

    return (
        <>
            <Modal
                title={<span>Chọn mã giảm giá </span>}
                open={isModal}
                // onOk={handleOk}
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
                                // checked={selectedVoucher === item.id}
                                // onChange={handleRadioChange}
                                />
                            </Col>
                        </Row>
                    ))}
                </div>
            </Modal >
        </>
    );
};