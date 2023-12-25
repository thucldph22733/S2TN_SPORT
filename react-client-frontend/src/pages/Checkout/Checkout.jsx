import React, { useEffect, useState } from 'react';
import './Checkout.css';
import { Breadcrumb, Button, Col, Collapse, Form, Input, Radio, Row, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { getDistrictsByCity, getProvinces, getWardsByDistrict } from '~/service/ApiService';
import { HomeOutlined, SendOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import CartDetailService from '~/service/CartDetailService';
import CartService from '~/service/CartService';
import formatCurrency from '~/utils/format-currency';

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
    // Calculate the total amount
    const calculateTotalAmount = () => {
        let totalAmount = 0;
        cartDetail.forEach(item => {
            totalAmount += parseFloat(item.totalPrice);
        });
        return formatCurrency(totalAmount);
    };

    const calculateTotal = () => {
        let totalAmount = 0;
        cartDetail.forEach(item => {
            totalAmount += parseFloat(item.totalPrice);
        });
        return formatCurrency(totalAmount + 30000);
    };
    return (
        <section className="checkout">
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
                        {
                            title: <Link to="">Thủ tục thanh toán</Link>,
                        },
                    ]}
                />
            </div>
            <div className="container">

                <Form name="validateOnly" layout="vertical" autoComplete="off">
                    <Row>
                        <Col span={16} lg={16} md={12}>
                            {/* <h6 className="coupon__code">
                                <span className="icon_tag_alt"></span>Bạn đã có tài khoản? <a style={{ color: 'red' }} href="#">Ấn vào đây để đăng nhập</a>
                            </h6> */}
                            <Row style={{ borderBottom: '1px solid #e1e1e1', marginBottom: '30px', paddingBottom: '20px' }}>
                                <Col span={21}><h6 className="checkout__title">THÔNG TIN THANH TOÁN</h6></Col>
                                <Col span={3}>
                                    <Button type='dashed'>Chọn địa chỉ</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} lg={12} >
                                    <div className="checkout__input">
                                        <Form.Item
                                            label="Họ và tên"
                                            name="username"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập họ và tên!',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Nhập họ và tên..." />
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
                                        >
                                            <Input placeholder="Nhập số điện thoại..." />
                                        </Form.Item>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <div className="checkout__input">
                                        <Form.Item label="Tỉnh/Thành phố:" name="city" rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]}>
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
                                            />

                                        </Form.Item>
                                    </div>
                                </Col>

                                <Col span={12}>
                                    <div className="checkout__input">
                                        <Form.Item label="Quận/Huyện:" name="district" rules={[{ required: true, message: 'Vui lòng chọn quận/huyện!' }]}>
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
                                        <Form.Item label="Phường/Xã:" name="ward" rules={[{ required: true, message: 'Vui lòng chọn phường/xã!' }]}>
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
                                        <Form.Item label="Địa chỉ cụ thể:" name="addressDetail" rules={[{ required: true, message: 'Vui lòng nhập tên vai trò!' }]}>
                                            <Input placeholder="Địa chỉ cụ thể..." />
                                        </Form.Item>
                                    </div>
                                </Col>
                            </Row>
                            <div className="checkout__input">
                                <Form.Item label="Ghi chú:" name="sizeDescribe" >
                                    <TextArea rows={4} placeholder="Nhập ghi chú..." />
                                </Form.Item>
                            </div>


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
                                    <Row style={{ marginTop: '10px', borderTop: '1px solid #cdcdcd' }}>
                                        <Col span={18} >
                                            <p>{index + 1}. {item.productName} [ {item.colorName} - {item.sizeName} ]</p>
                                            <span style={{ color: 'red' }}>{formatCurrency(item.price)}</span> | x{item.quantity}
                                        </Col>
                                        <Col span={6}>
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
                                            <span style={{ float: 'right' }}>{calculateTotalAmount()}</span>
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
                                            <span style={{ float: 'right' }}>{calculateTotal()}</span>
                                        </Col>
                                    </Row>

                                </div>

                                <Collapse
                                    items={[
                                        {
                                            label: 'Phương thức thanh toán',
                                            children: <Radio.Group
                                            // onChange={onChange} value={value}
                                            >
                                                <Radio style={{ marginBottom: '10px' }} value={1}>Thanh toán khi nhận hàng</Radio>
                                                <Radio value={2}>Chuyển khoản ngân hàng</Radio>
                                            </Radio.Group>,
                                        },
                                    ]}
                                />
                                <Button type='primary' style={{ width: '100%', height: '40px', marginTop: '20px', fontSize: '16px', fontWeight: '600' }}>
                                    Đặt hàng
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        </section>
    );
}

export default Checkout;
