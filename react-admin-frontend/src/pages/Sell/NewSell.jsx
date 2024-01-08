import { DeleteOutlined, ExclamationCircleOutlined, FileDoneOutlined, FilterOutlined, FormOutlined, PlusOutlined, QrcodeOutlined, RedoOutlined, TagsOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Col, DatePicker, Empty, Form, Image, Input, InputNumber, Modal, Popconfirm, Radio, Row, Select, Space, Spin, Switch, Table, Tabs, Tag, message, notification } from 'antd';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import path_name from '~/constants/routers';
import OrderDetailService from '~/service/OrderDetailService';
import OrderService from '~/service/OrderService';
import ProductDetailService from '~/service/ProductDetaiService';
import formatCurrency from '~/utils/format-currency';
import { getDistrictsByCity, getProvinces, getWardsByDistrict } from '~/service/ApiService';
import AddressService from '~/service/AddressService';
import TextArea from 'antd/es/input/TextArea';
import { MdOutlineMapsUgc } from "react-icons/md";
import { MdPayments } from "react-icons/md";
import CategoryService from '~/service/CategoryService';
import BrandService from '~/service/BrandService';
import SizeService from '~/service/SizeService';
import ColorService from '~/service/ColorService';
import MaterialService from '~/service/MaterialService';
import UserService from '~/service/UserService';
import FormatDate from '~/utils/format-date';
import dayjs from 'dayjs';
import { FaMapMarkedAlt } from 'react-icons/fa';
import VoucherService from '~/service/VoucherService';
import voucher_icon from '~/assets/images/voucher_logo.png';

export default function NewSell() {

    //bật địa chỉ giao hàng
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    //Mở modal hiển thị voucher
    const [voucherModal, setVoucherModal] = useState(false);

    const showVoucherModal = () => {
        setVoucherModal(true);
    };

    const hideVoucherModal = () => {
        setVoucherModal(false);
    };
    // Lấy danh sách giảm giá từ local storage (nếu có)
    const localVouchersString = localStorage.getItem('localVoucher');

    const localVouchers = localVouchersString ? JSON.parse(localVouchersString) : [];
    // Giảm giá
    const discountRate = localVouchers.length != 0 ? localVouchers.discountRate : 0;

    //Moddal modal sản phẩm
    const [openProduct, setOpenProduct] = useState(false);
    const showProductModal = () => {
        setOpenProduct(true);

    };

    const closeProduct = () => {
        setOpenProduct(false);
    };
    //Mở Moddal hiển thị address
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
    //Mỏ modal user
    const [openUser, setOpenUser] = useState(false);
    const showUserModal = () => {
        setOpenUser(true);

    };

    const closeUser = () => {
        setOpenUser(false);
    };

    //Mở modal qrcode
    const [showScanner, setShowScanner] = useState(false);
    const [qrData, setQrData] = useState(null);
    const [scannedOnce, setScannedOnce] = useState(false);
    const [scanningEnabled, setScanningEnabled] = useState(true);
    const openScanner = () => {
        setShowScanner(true);
        setScannedOnce(false);
        setScanningEnabled(true); // Cho phép quét QR khi mở modal
    };

    const closeScanner = () => {
        setShowScanner(false);
    };
    const handleScan = async (data) => {
        if (data && !scannedOnce && scanningEnabled) {
            setScannedOnce(true);
            setScanningEnabled(false); // Tắt quét QR để tránh thêm sản phẩm liên tục
            // Thực hiện thêm sản phẩm vào đơn hàng từ QR code
            // await handleAddToProductDetailFromQR(data);
            // Đóng modal tự động khi quét xong lần đầu
            closeScanner();
        }
    };
    const handleResult = (result) => {
        if (result && showScanner && !scannedOnce && scanningEnabled) {
            setQrData(result.text);
            // handleAddToProductDetailFromQR(result);
            closeScanner();
        }
    };
    const [modal, contextHolder] = Modal.useModal();
    const confirm = () => {
        modal.confirm({
            title: 'Thông báo!',
            icon: <ExclamationCircleOutlined />,
            content: 'Bạn có chắc muốn tạo mới một đơn hàng không?',
            onOk: () => { handleCreate(); },
            okText: 'Đồng ý',
            cancelText: 'Hủy bỏ',
        });
    }
    // lấy dữ liệu đơn hàng
    const [orders, setOrders] = useState([]);

    const [orderCount, setOrderCount] = useState(0);

    const getAllOrderByStatusName = async () => {
        await OrderService.getAllOrderByStatusName()
            .then(response => {
                setOrders(response);
                console.log(response)
                setOrderCount(response.length); // Update order count
            })
            .catch(error => {
                console.error(error);
            })
    }

    //Tạo đơn hàng
    const handleCreate = async () => {
        if (orderCount >= 10) {
            notification.warning({
                message: 'Thông báo',
                description: 'Bạn không thể thêm nhiều hơn 5 đơn hàng!',
            });
            return;
        }
        await OrderService.create()
            .then(() => {

                notification.success({
                    message: 'Thông báo',
                    description: 'Tạo mới đơn hàng thành công!',
                });
                getAllOrderByStatusName();
            })
            .catch(error => {
                notification.error({
                    message: 'Thông báo',
                    description: 'Tạo mới đơn hàng thất bại!',
                });
                console.error(error);
            });
    };
    //Xóa đơn hàng
    const handleDelete = async (id) => {

        await OrderService.delete(id).then(response => {
            console.log(response.data);
            notification.success({
                message: 'Thông báo',
                description: 'Xóa đơn hàng thành công!',
            });
            getAllOrderByStatusName();
            fetchOrderDetail();
        }).catch(error => {
            console.error(error);
            notification.error({
                message: 'Thông báo',
                description: 'Xóa thất bại!',
            });
        });
    }
    useEffect(() => {
        getAllOrderByStatusName();

    }, []);

    const columnOrderDetail = [

        {
            title: 'Ảnh',
            dataIndex: 'productImage',
            key: 'productImage',
            width: '10%',
            render: (text) => (
                <Image width={50} height={50} src={text} alt="Avatar" />
            ),
        },
        {
            title: 'Sản phẩm',
            width: '40%',
            render: (record) => (
                <span>{`${record.productName} [${record.colorName} - ${record.sizeName}]`}</span>
            )
        },
        {
            title: 'Đơn giá',
            key: 'price',
            dataIndex: 'price',
            width: '10%',
            render: (text) => (
                <span >
                    {formatCurrency(text)}
                </span>
            ),
        },
        {
            title: 'Số lượng',
            key: 'quantity',
            dataIndex: 'quantity',
            width: '10%',
            render: (text, record) => (
                <InputNumber
                    disabled={!disabledRows[record.key]}
                    min={1}
                    value={quantityValues[record.key] || text} // Use quantityValues state
                    onChange={(value) => handleQuantityChange(value, record.key)}
                />
            ),
        },
        {
            title: 'Thành tiền',
            key: 'total',
            dataIndex: 'total',
            width: '15%',
            render: (text) => (
                <span style={{ color: 'red' }}>
                    {formatCurrency(text)}
                </span>
            ),
        },
        {
            title: 'Thao tác',
            width: '10%',
            render: (record) => (
                <Space size="middle" >
                    <Button type="text" icon={<DeleteOutlined />} style={{ color: 'red' }} onClick={() => handleOrderDetailDelete(record.id)} />
                </Space>
            ),
        },
    ];

    const [orderDetails, setOrderDetails] = useState([]);
    const [orderId, setOrderId] = useState(null);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 100, total: 0 });

    const fetchOrderDetail = async () => {

        await OrderDetailService.getOrderDetailByOrderId(pagination.current - 1, pagination.pageSize, orderId)
            .then(response => {

                setOrderDetails(response.data);
                console.log(response.data)


            }).catch(error => {
                console.error(error);
            })
    };

    //Xóa đơn hàng
    const handleOrderDetailDelete = async (id) => {
        await OrderDetailService.delete(id).then(response => {
            fetchOrderDetail();
            console.error(response);
        }).catch(error => {
            console.error(error);

        });
    }

    //Tổng tiền
    const calculateTotal = () => {

        const total = calculateTotalAmount() + calculateTransportFee() - discountRate
        if (total < 0) {
            return 0
        }
        return total;
    };
    // Tạm tính
    const calculateTotalAmount = () => {
        let totalAmount = 0;
        orderDetails.forEach(item => {
            totalAmount += parseFloat(item.price * item.quantity);
        });
        return totalAmount;
    };
    // Tính phí ship
    const calculateTransportFee = () => {
        if (isSwitchOn == true) {
            if (calculateTotalAmount() >= 500000) {
                return 0;
            } else {
                return 30000;
            }
        } else {
            return 0;
        }
    };
    const [quantityValues, setQuantityValues] = useState({});
    const handleQuantityChange = (value, key) => {
        setQuantityValues((prevValues) => ({
            ...prevValues,
            [key]: value,
        }));
    };
    const [disabledRows, setDisabledRows] = useState({});

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            const newDisabledRows = {};
            selectedRows.forEach(row => {
                newDisabledRows[row.key] = true;
            });
            setDisabledRows(newDisabledRows);
        },
        getCheckboxProps: (record) => ({
            name: record.key,
        }),
    };
    // const [selectionType, setSelectionType] = useState('checkbox');
    const tabContent = () => (
        <>
            <div style={{ borderBottom: '1px solid #cdcdcd', margin: '10px 0', paddingBottom: '10px' }}>
                <Row>
                    <Col span={12}>
                        <h6 style={{ fontSize: '15px', fontWeight: '550' }}>GIỎ HÀNG</h6>
                    </Col>
                    <Col span={12}>
                        <Button type='primary'
                            style={{ float: 'right', borderRadius: '5px' }}
                            icon={<PlusOutlined />}
                            onClick={() => showProductModal()}
                        >Thêm sản phẩm</Button>
                        <Button type="primary" icon={<QrcodeOutlined />} style={{ float: 'right', borderRadius: '5px', marginRight: '5px' }}
                            onClick={openScanner}
                        >
                            QR Code
                        </Button>

                    </Col>
                </Row>
                <Modal open={showScanner} onCancel={closeScanner} footer={null} width={350} centered>
                    {showScanner && (
                        <QrReader
                            delay={4000}
                            onScan={handleScan}
                            onResult={handleResult}
                            style={{ width: '100%' }}
                        />
                    )}
                </Modal>
            </div>

            {orderDetails.length == 0 ? (<Empty style={{ marginTop: '40px', fontSize: '18px' }} description="Không có sản phẩm nào trong giỏ hàng!" />) : (<Table
                // onChange={handleTableChange}
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }}
                style={{ marginTop: '20px' }}
                columns={columnOrderDetail}
                dataSource={orderDetails.map((orderDetail, index) => ({
                    ...orderDetail,
                    total: orderDetail.price * orderDetail.quantity,
                    key: orderDetail.id.toString(), // Ensure the key is a string or a unique identifier

                }))}

                pagination={false} />)}
            <Row>
                <Col span={24}>
                    <h3 style={{ float: 'right', color: '#5a76f3', marginTop: '5px', fontWeight: '600' }}>Tổng tiền hàng: <span style={{ color: 'red' }}> {formatCurrency(calculateTotalAmount())}</span> </h3>
                </Col>
            </Row>
            <div style={{ borderBottom: '1px solid #cdcdcd', margin: '20px 0 10px 0', paddingBottom: '10px' }}>
                <Row >
                    <Col span={12}>
                        <h6 style={{ fontSize: '15px', fontWeight: '550' }}>THÔNG TIN THANH TOÁN</h6>
                    </Col>
                    <Col span={12}>
                        <Button type='primary'
                            icon={<UserAddOutlined />}
                            style={{ float: 'right', backgroundColor: '#5a76f3', borderRadius: '5px' }}
                            onClick={() => showUserModal()}
                        >Chọn khách hàng</Button>
                    </Col>
                </Row>
            </div>
            <Form name="validateOnly" layout="vertical" autoComplete="off" form={form}>

                <Row>
                    <Col span={14}>
                        <Row style={{ margin: '10px 0', paddingRight: '10px', color: '#5a76f3' }}>
                            <Col span={12}>
                                <h5 style={{ fontSize: '20px' }}>Khách hàng:<span style={{ marginLeft: '15px' }}>Lê Đăng Thành</span></h5>
                            </Col>
                            <Col span={12}>
                                <Button icon={<MdOutlineMapsUgc />} type='primary'
                                    onClick={() => showAddressModal()}
                                    style={{ float: 'right', backgroundColor: '#5a76f3', borderRadius: '5px', display: isSwitchOn ? 'block' : 'none' }}
                                >Chọn địa chỉ</Button>
                            </Col>

                        </Row>
                        <div style={{ display: isSwitchOn ? 'block' : 'none' }} key={address.id} >

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
                                        ]}
                                        initialValue={address?.recipientName}
                                    >
                                        <Input
                                            placeholder="Nhập họ và tên..."
                                            disabled={orders.user ? true : false}
                                            style={{ height: '40px', borderRadius: '5px' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={12} lg={12} style={{ paddingRight: '15px' }}>
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
                                        <Input
                                            className='checkout__input'
                                            placeholder="Nhập số điện thoại..."
                                            disabled={orders.user ? true : false}
                                            style={{ height: '40px', borderRadius: '5px' }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={12} style={{ paddingRight: '15px' }}>

                                    <Form.Item label="Tỉnh/Thành phố:" name="city"
                                        rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]}
                                        initialValue={address?.city}
                                    >
                                        <Select
                                            showSearch
                                            style={{
                                                width: '100%',
                                                height: '40px',

                                            }}
                                            onChange={handleCityChange}
                                            placeholder="Chọn Tỉnh/Thành phố"
                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                            filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                            options={cities.map(city => ({ value: city.code, label: city.name }))}
                                            disabled={orders.user ? true : false}
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
                                                height: '40px'
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

                            <Row >
                                <Col span={12} style={{ paddingRight: '15px' }}>
                                    <Form.Item label="Phường/Xã:" name="ward"
                                        initialValue={address?.ward}
                                        rules={[{ required: true, message: 'Vui lòng chọn phường/xã!' }]}>
                                        <Select
                                            showSearch
                                            style={{
                                                width: '100%',
                                                height: '40px'
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
                                            disabled={orders.user ? true : false}
                                            style={{ height: '40px', borderRadius: '5px' }} />

                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row style={{ paddingRight: '10px' }}>
                                <Form.Item label="Ghi chú:" name="note" labelCol={{ span: 24 }} style={{ width: '100%' }}>
                                    <TextArea style={{ width: '100%', borderRadius: '5px' }} rows={3} placeholder="Nhập ghi chú..." />
                                </Form.Item>
                            </Row>

                        </div>

                    </Col>
                    <Col span={10} style={{ marginTop: '10px', paddingLeft: '10px' }}>
                        <Row>
                            <Col span={8}>
                                <span style={{ marginTop: '5px', fontSize: '16px', fontWeight: '600' }}>Giao hàng  </span>
                                <Switch
                                    onChange={(checked) => setIsSwitchOn(checked)}
                                />
                            </Col>
                            <Col span={16}>
                                <p style={{ fontWeight: '600', color: 'red', float: 'right', marginRight: '15px' }}>Miễn phí vân chuyển cho đơn hàng trên 500k</p>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '10px' }}>
                            <Col span={12}>
                                <span style={{ fontWeight: '600' }}>Voucher</span>
                            </Col>
                            <Col span={12}>
                                <Button type='link' icon={<TagsOutlined />} style={{ float: 'right' }}
                                    onClick={() => showVoucherModal()}
                                >Chọn mã giảm giá</Button>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '10px' }}>
                            <Col span={10}>
                                <p style={{ fontWeight: '600' }}>Tiền hàng:</p>
                            </Col>
                            <Col span={14}>
                                <span style={{ float: 'right', marginRight: '15px', fontWeight: '600', color: 'red' }}>
                                    {formatCurrency(calculateTotalAmount())}
                                </span>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '10px' }}>
                            <Col span={10}>
                                <p style={{ fontWeight: '600' }}>Phí vận chuyển:</p>
                            </Col>
                            <Col span={14}>
                                <span style={{ float: 'right', marginRight: '15px', fontWeight: '600', color: 'red' }}>
                                    {formatCurrency(calculateTransportFee())}
                                </span>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '10px' }}>
                            <Col span={10}>
                                <p style={{ fontWeight: '600' }}>Giảm giá:</p>
                            </Col>
                            <Col span={14}>
                                <span style={{ float: 'right', marginRight: '15px', fontWeight: '600', color: 'red' }}>
                                    {formatCurrency(-discountRate)}
                                </span>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '10px' }}>
                            <Col span={10}>
                                <p style={{ fontWeight: '600' }}>Tổng tiền:</p>
                            </Col>
                            <Col span={14}>
                                <span style={{ float: 'right', marginRight: '15px', fontWeight: '600', color: 'red' }}>
                                    {formatCurrency(calculateTotal())}

                                </span>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '10px' }}>
                            <Col span={14}>
                                <p style={{ fontWeight: '600' }}>Khách thanh toán: <Button type='dashed' style={{ width: '50px', marginLeft: '30px' }} icon={<MdPayments style={{ fontSize: '20px' }} />} /></p>

                            </Col>
                            <Col span={10}>
                                <span style={{ float: 'right', marginRight: '15px', fontWeight: '600', color: 'red' }}>
                                    {/* {formatCurrency(calculateTotalAmount())} */}
                                    100.000 đ
                                </span>
                            </Col>
                        </Row>
                        <Button
                            // onClick={handlePlaceOrder}
                            type='primary' style={{ width: '100%', height: '45px', marginTop: '20px', fontSize: '17px', fontWeight: '600', borderRadius: '5px' }}>
                            ĐẶT HÀNG
                        </Button>

                    </Col>
                </Row>
            </Form>
        </>
    );


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
    // //----------------------------load địa chỉ mặc định------------------------
    const [form] = Form.useForm();
    const [address, setAddress] = useState({});
    console.log(address)
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
        await AddressService.findAddressesByUserIdAnDeletedTrue(1)
            .then(response => {
                setAddress(response);
                console.log(response)
            }).catch(error => {
                console.error(error);
            })
    }
    useEffect(() => {
        // if (orders.user) {
        findAddressesByUserIdAnDeletedTrue();
        // }
    }, [])
    //load mã hóa đơn lên tabs
    const items = [
        ...orders.map(order => ({
            key: order.id,
            label: `HD${order.id}`,
            children: tabContent(),
        })),
    ];

    const onChange = key => {
        if (key !== null) {
            setOrderId(key);
        }
    };
    useEffect(() => {
        if (items.length > 0 && orderId === null) {
            const initialOrderId = items[0].key;
            setOrderId(initialOrderId);
        }
    }, [orderId, items]);
    useEffect(() => {
        fetchOrderDetail();
    }, [orderId]);

    return (
        <>
            {contextHolder}
            <Row>
                <Col span={24}>
                    <Button type="primary"
                        icon={<PlusOutlined />}
                        onClick={confirm}
                        style={{ marginBottom: '16px', float: 'rights', borderRadius: '2px' }} >
                        Tạo đơn hàng
                    </Button>
                </Col>
            </Row>
            {orders.length == 0 ? (<Empty description="Không có đơn hàng nào!" />) : (<Row style={{ width: '100%', marginTop: '20px' }}>
                <Tabs
                    hideAdd
                    onChange={onChange}
                    type="editable-card"
                    onEdit={handleDelete}
                    items={items}
                    style={{ width: '100%' }}
                />
            </Row>)}
            {
                openProduct && <ProductModal
                    isModal={openProduct}
                    hideModal={closeProduct}
                    orderId={orderId}
                    fetchOrderDetail={fetchOrderDetail}
                />
            }
            {
                openUser && <UserModal
                    isModal={openUser}
                    hideModal={closeUser}
                // orderId={orderId}
                // fetchOrderDetail={fetchOrderDetail}
                />
            }
            {addressModal.isModal && <ShowAddressModal
                reacord={addressModal.reacord}
                hideModal={hideAddressModal}
                isModal={addressModal.isModal}
            />}
            {voucherModal && <ModalVoucher
                hideModal={hideVoucherModal}
                isModal={voucherModal}
                voucher={localVouchers}

            />}
        </>
    );
}
const ProductModal = ({ isModal, hideModal, orderId, fetchOrderDetail }) => {
    //---------------------------Danh mục-----------------------------------------
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategory()
    }, []);

    const fetchCategory = async () => {

        await CategoryService.findAllByDeletedTrue()
            .then(response => {

                setCategories(response.data)
            }).catch(error => {
                console.error(error);
            })
    }
    //-----------------------Thương hiệu-------------------------------
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        fetchBrand()
    }, []);
    const fetchBrand = async () => {

        await BrandService.findAllByDeletedTrue()
            .then(response => {

                setBrands(response.data)

            }).catch(error => {
                console.error(error);
            })
    }

    //---------------------------Kích thước-------------------------------------
    const [sizes, setSizes] = useState([]);

    useEffect(() => {
        fetchSize()
    }, []);

    const fetchSize = async () => {

        await SizeService.findAllByDeletedTrue()
            .then(response => {
                setSizes(response.data)
            }).catch(error => {
                console.error(error);
            })
    }
    //--------------------------------Màu sắc--------------------------------
    const [colors, setColors] = useState([]);

    useEffect(() => {
        fetchColor()
    }, []);
    const fetchColor = async () => {

        await ColorService.findAllByDeletedTrue()
            .then(response => {

                setColors(response.data)
            }).catch(error => {
                console.error(error);
            })
    }
    //-------------------------Chất liệu----------------------------------
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        fetchMaterial()
    }, []);
    const fetchMaterial = async () => {

        await MaterialService.findAllByDeletedTrue()
            .then(response => {

                setMaterials(response.data)

            }).catch(error => {
                console.error(error);
            })
    }

    //Load sản phẩm
    const [productDetails, setProductDetails] = useState([]);

    const [paginationProduct, setPaginationProduct] = useState({ current: 1, pageSize: 5, total: 0 });

    const [filterProduct, setFilterProduct] = useState({
        colorId: null,
        sizeId: null,
        materialId: null,
        brandId: null,
        priceMin: null,
        priceMax: null,
        categoryId: null,
        keyword: null,
        pageNo: 0,
        pageSize: 5
    });

    const fetchProductDetails = async () => {

        await ProductDetailService.getAllProductDetailsFilter(filterProduct)
            .then(response => {

                setProductDetails(response.data);
                setPaginationProduct({
                    ...paginationProduct,
                    total: response.totalCount,
                });

            }).catch(error => {
                console.error(error);
            })
    };
    const handleTableProductChange = (pagination) => {
        setPaginationProduct({
            ...pagination,
        });
        setFilterProduct({
            ...filterProduct,
            pageNo: pagination.current - 1,
            pageSize: pagination.pageSize,
        });
    };
    useEffect(() => {
        fetchProductDetails();
    }, [filterProduct])

    const handleFilterChange = (property, value) => {
        if (property === 'priceRange') {
            setPriceRange(value);
            setFilterProduct({
                ...filterProduct,
                priceMin: calculateMinPrice(value),
                priceMax: calculateMaxPrice(value),
                pageNo: 0
            });
        } else {
            setFilterProduct({
                ...filterProduct,
                [property]: value,
                pageNo: 0,
            });
        }
    };
    //lọc theo khoảng giá
    const [priceRange, setPriceRange] = useState(null);

    const calculateMinPrice = (range) => {
        switch (range) {
            case 1:
                return 0;
            case 2:
                return 200000;
            case 3:
                return 400000;
            case 4:
                return 600000;
            default:
                return null;
        }
    };

    const calculateMaxPrice = (range) => {
        switch (range) {
            case 1:
                return 200000;
            case 2:
                return 400000;
            case 3:
                return 600000;
            case 4:
                return null;
            default:
                return null;
        }
    };
    // Hàm xử lý sự kiện khi nhấn nút Tìm kiếm
    const [searchKeyword, setSearchKeyword] = useState(null);

    const handleSearch = () => {
        setFilterProduct({
            ...filterProduct,
            keyword: searchKeyword,
            pageNo: 0,
            pageSize: 5
        });
    };
    const handleReset = () => {
        setSearchKeyword(null)
        setPriceRange(null)
        setFilterProduct({
            colorId: null,
            sizeId: null,
            materialId: null,
            brandId: null,
            priceMin: null,
            priceMax: null,
            categoryId: null,
            keyword: null,
            pageNo: 0,
            pageSize: 5
        });
        setPaginationProduct({
            ...paginationProduct,
            current: 1,
            pageSize: 5,
        });
    };
    const [quantityProduct, setQuantityProduct] = useState(1); // Add this line

    const handleQuantityChange = (value) => {
        setQuantityProduct(value);
    };
    const handleCreate = async () => {
        const data = {
            productDetailId: quantityModal.record.id,
            orderId: orderId,
            quantity: quantityProduct,
            price: quantityModal.record.price
        };

        try {
            await OrderDetailService.create(data);
            message.success("Thêm sản phẩm vào giỏ hàng thành công !");

            fetchOrderDetail();
            handleQuantityCancel();
        } catch (error) {
            message.error("Thêm sản phẩm vào giỏ hàng thất bại !");
            console.error(error);
        }
    };

    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            width: '5%',
            render: (text, record, index) => (
                <span>{index + 1}</span>
            ),
        },
        {
            title: 'Ảnh',
            dataIndex: 'productAvatar',
            key: 'productAvatar',
            width: '7%',
            render: (text) => (
                <Image width={60} height={60} src={text} alt="Avatar" />
            ),
        },
        {
            title: 'Sản phẩm',
            width: '30%',
            render: (record) => (
                <>
                    <span>{`${record.productName}`}</span>
                    <p style={{ marginBottom: '0' }}>[{record.colorName} - {record.sizeName}]</p>
                </>
            )
        },
        {
            title: 'Chất liệu',
            dataIndex: 'materialName',
            key: 'materialName',
            width: '15%'
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            width: '10%',
            render: (text) => (
                <span >
                    {formatCurrency(text)}
                </span>
            ),
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            width: '10%'
        },
        {
            title: 'Hành động',
            key: 'action',
            width: "10%",
            render: (record) => {
                return <Space size="middle">

                    <Button type="primary" style={{ borderRadius: '5px', backgroundColor: '#5a76f3' }} onClick={() => showModalQuantity(record)}>Chọn</Button>

                </Space>
            },
        },
    ];
    const [quantityModal, setQuantityModal] = useState({ isModal: false, record: null });
    const showModalQuantity = (record) => {
        setQuantityModal({ isModal: true, record: record });

    };

    const handleQuantityCancel = () => {
        setQuantityModal({ isModal: false });
    };
    return (
        <>
            <Modal
                title="Sản phẩm"
                open={isModal}
                onCancel={hideModal}
                footer={false}
                width={1200}
            >
                <div style={{ height: '500px', overflowY: 'auto', }}>
                    <Card
                        title={<span style={{ color: '#5a76f3' }}><FilterOutlined /> Lọc</span>}
                        style={{ borderRadius: '10px' }}
                    >
                        <Row>
                            <Col span={8} style={{ padding: '0 50px' }}>
                                <Select
                                    style={{
                                        width: '100%',
                                        height: '35px',
                                    }}
                                    allowClear
                                    placeholder="Khoảng giá"
                                    value={priceRange}
                                    onChange={(value) => handleFilterChange('priceRange', value)}
                                    options={[
                                        {
                                            value: 1,
                                            label: 'Dưới 200.000 đ',
                                        },
                                        {
                                            value: 2,
                                            label: '200.000 đ - 400.000 đ',
                                        },
                                        {
                                            value: 3,
                                            label: '400.000 đ - 600.000 đ',
                                        },
                                        {
                                            value: 4,
                                            label: 'Trên 600.000 đ',
                                        },
                                    ]}
                                />
                            </Col>
                            <Col span={8} style={{ padding: '0 50px' }}>
                                <Select
                                    style={{
                                        width: '100%',
                                        height: '35px',
                                    }}
                                    allowClear
                                    placeholder="Danh mục"
                                    showSearch
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    value={filterProduct.categoryId}
                                    onChange={(value) => handleFilterChange('categoryId', value)}
                                    options={categories.map(item => ({
                                        value: item.id,
                                        label: item.categoryName,
                                    }))}
                                />
                            </Col>
                            <Col span={8} style={{ padding: '0 50px' }}>
                                <Select
                                    style={{
                                        width: '100%',
                                        height: '35px',
                                    }}
                                    allowClear
                                    placeholder="Thương hiệu"
                                    showSearch
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    value={filterProduct.brandId}
                                    onChange={(value) => handleFilterChange('brandId', value)}
                                    options={brands.map(item => ({
                                        value: item.id,
                                        label: item.brandName,
                                    }))}
                                />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '20px' }}>
                            <Col span={8} style={{ padding: '0 50px' }}>
                                <Select
                                    style={{
                                        width: '100%',
                                        height: '35px',
                                    }}
                                    allowClear
                                    placeholder="Chất liệu"
                                    showSearch
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    value={filterProduct.materialId}
                                    onChange={(value) => handleFilterChange('materialId', value)}
                                    options={materials.map(item => ({
                                        value: item.id,
                                        label: item.materialName,
                                    }))}
                                />
                            </Col>
                            <Col span={8} style={{ padding: '0 50px' }}>
                                <Select
                                    style={{
                                        width: '100%',
                                        height: '35px',
                                    }}
                                    allowClear
                                    placeholder="Màu sắc"
                                    showSearch
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    value={filterProduct.colorId}
                                    onChange={(value) => handleFilterChange('colorId', value)}
                                    options={colors.map(item => ({
                                        value: item.id,
                                        label: item.colorName,
                                    }))}
                                />
                            </Col>
                            <Col span={8} style={{ padding: '0 50px' }}>
                                <Select
                                    style={{
                                        width: '100%',
                                        height: '35px',
                                    }}
                                    allowClear
                                    placeholder="Kích thước"
                                    showSearch
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    value={filterProduct.sizeId}
                                    onChange={(value) => handleFilterChange('sizeId', value)}
                                    options={sizes.map(item => ({
                                        value: item.id,
                                        label: item.sizeName,
                                    }))}
                                />
                            </Col>

                        </Row>

                        <Row style={{ marginTop: '20px' }}>

                            <Col span={16} style={{ padding: '0 50px' }}>
                                <Input
                                    style={{
                                        width: '100%',
                                        height: '35px',
                                        borderRadius: '5px',
                                    }}
                                    placeholder="Nhập mã, tên sản phẩm..."
                                    value={searchKeyword}
                                    onChange={(e) => setSearchKeyword(e.target.value)}

                                />
                            </Col>
                            <Col span={8} style={{ padding: '0 50px' }}>

                                <Button
                                    type="primary"
                                    icon={<RedoOutlined style={{ fontSize: '18px' }} />}
                                    style={{
                                        float: 'right',
                                        borderRadius: '4px',
                                        backgroundColor: '#5a76f3',
                                    }}
                                    onClick={handleReset}
                                />
                                <Button
                                    type="primary"
                                    style={{
                                        float: 'right',
                                        borderRadius: '4px',
                                        backgroundColor: '#5a76f3',
                                        marginRight: '6px',
                                    }}

                                    onClick={handleSearch}
                                >
                                    Tìm kiếm
                                </Button>
                            </Col>

                        </Row>

                    </Card>
                    <Card
                        title={<span style={{ color: '#5a76f3' }}>Danh sách sản phẩm</span>}
                        style={{ marginTop: '20px', borderRadius: '10px' }}
                    >
                        <Table onChange={handleTableProductChange} dataSource={productDetails} columns={columns} pagination={{
                            current: paginationProduct.current,
                            pageSize: paginationProduct.pageSize,
                            defaultPageSize: 5,
                            pageSizeOptions: ['5', '10', '15'],
                            total: paginationProduct.total,
                            showSizeChanger: true,
                        }} />
                    </Card>
                </div>
            </Modal >

            {quantityModal.isModal &&
                <Modal
                    title={`Số lượng sản phẩm: ${quantityModal.record.quantity}`}
                    open={quantityModal.isModal}
                    onCancel={handleQuantityCancel}
                    width={400}
                    onOk={handleCreate}
                    style={{ textAlign: 'center' }}
                    okText="Thêm"
                    cancelText="Hủy bỏ"
                >
                    <p>{quantityModal.record.productName}</p>
                    <p>[ Màu: {quantityModal.record.colorName} - Kích thước: {quantityModal.record.sizeName} ]</p>
                    <InputNumber min={1} max={10} defaultValue={1} onChange={handleQuantityChange} />
                </Modal>
            }

        </ >
    );
};

const UserModal = ({ isModal, hideModal }) => {

    // const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);

    const showModalUser = () => {
        setOpen(true);
    };

    const hideModalUser = () => {
        setOpen(false);
    };

    const [users, setUsers] = useState([]);

    const [filterUser, setFilterUser] = useState({
        keyword: null,
        birthOfDay: null,
        gender: null,
        status: null,
        pageNo: 0,
        pageSize: 5
    });


    const [paginationUser, setPaginationUser] = useState({ current: 1, pageSize: 5, total: 0 });

    const fetchUsers = async () => {
        await UserService.getAllUserByFilter(filterUser)
            .then(response => {

                setUsers(response.data);

                setPaginationUser({
                    ...paginationUser,
                    total: response.totalCount,
                });

            }).catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        fetchUsers();
    }, [filterUser]);
    const handleTableChange = (pagination) => {
        setPaginationUser({
            ...pagination,
        });
        setFilterUser({
            ...filterUser,
            pageNo: pagination.current - 1,
            pageSize: pagination.pageSize,
        });
    };
    const handleFilterUserChange = (property, value) => {
        setFilterUser({
            ...filterUser,
            [property]: value,
            pageNo: 0,
        });
    };

    const [searchKeywordUser, setSearchKeywordUser] = useState(null)
    const handleSearchUser = () => {
        setFilterUser({
            ...filterUser,
            keyword: searchKeywordUser,
            pageNo: 0,
        });
    };
    const handleResetUser = () => {
        setSearchKeywordUser(null)
        setFilterUser({
            keyword: null,
            birthOfDay: null,
            gender: null,
            status: null,
            pageNo: 0,
            pageSize: 5
        });
        setPaginationUser({
            ...paginationUser,
            current: 1,
            pageSize: 5,
        });
    };
    const columnsUser = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            width: '5%',
        },
        {
            title: 'Tên',
            dataIndex: 'userName',
            key: 'userName',
            width: '15%',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: '15%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '15%',

        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            width: '15%',
            render: (text) => {
                return text !== null ? (text === true ? "Nam" : "Nữ") : '';
            },
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthOfDay',
            key: 'birthOfDay',
            width: '15%',
        },
        {
            title: 'Hành động',
            key: 'action',
            width: "10%",
            render: (record) => {
                return <Space size="middle">

                    <Button type="primary" style={{ borderRadius: '5px', backgroundColor: '#5a76f3' }} >Chọn</Button>

                </Space>
            },
        },
    ];

    return (
        <>
            <Modal
                title="Người dùng"
                open={isModal}
                onCancel={hideModal}
                footer={false}
                width={1000}
            >
                <div style={{ height: '500px', overflowY: 'auto', }}>
                    <Card
                        title={<span style={{ color: '#5a76f3' }}><FilterOutlined /> Lọc</span>}
                        style={{ borderRadius: '10px' }}
                    >
                        <Row>
                            <Col span={8} style={{ padding: '0 50px' }}>
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    style={{
                                        width: '100%',
                                        height: '35px',
                                        borderRadius: '5px',
                                    }}

                                    placeholder="Ngày sinh"
                                    value={filterUser.birthOfDay}
                                    onChange={(value) => handleFilterUserChange('birthOfDay', value)}
                                />

                            </Col>
                            <Col span={8} style={{ padding: '0 50px' }}>
                                <Select
                                    style={{
                                        width: '100%',
                                        height: '35px',
                                    }}
                                    allowClear
                                    placeholder="Giới tính"
                                    value={filterUser.gender}
                                    onChange={(value) => handleFilterUserChange('gender', value)}
                                    options={[
                                        {
                                            value: true,
                                            label: 'Nam',
                                        },
                                        {
                                            value: false,
                                            label: 'Nữ',
                                        },
                                    ]}
                                />
                            </Col>
                            <Col span={8} style={{ padding: '0 50px' }}>
                                <Button type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={() => showModalUser()}
                                    style={{ float: 'right', borderRadius: '2px', width: '125px' }} >
                                    Thêm mới
                                </Button>
                            </Col>
                        </Row>

                        <Row style={{ marginTop: '20px' }}>

                            <Col span={16} style={{ padding: '0 50px' }}>
                                <Input
                                    style={{
                                        width: '100%',
                                        height: '35px',
                                        borderRadius: '5px',
                                    }}
                                    placeholder="Nhập mã, tên, sdt, email..."
                                    value={searchKeywordUser}
                                    onChange={(e) => setSearchKeywordUser(e.target.value)}

                                />
                            </Col>
                            <Col span={8} style={{ padding: '0 50px' }}>
                                <Button
                                    type="primary"
                                    icon={<RedoOutlined style={{ fontSize: '18px' }} />}
                                    style={{
                                        float: 'right',
                                        borderRadius: '4px',
                                        backgroundColor: '#5a76f3',
                                    }}
                                    onClick={handleResetUser}
                                />
                                <Button
                                    type="primary"
                                    style={{
                                        float: 'right',
                                        borderRadius: '4px',
                                        backgroundColor: '#5a76f3',
                                        marginRight: '6px',
                                    }}

                                    onClick={handleSearchUser}
                                >
                                    Tìm kiếm
                                </Button>
                            </Col>

                        </Row>

                    </Card>
                    <Card
                        title={<span style={{ color: '#5a76f3' }}>Danh sách người dùng</span>}
                        style={{ marginTop: '20px', borderRadius: '10px' }}>


                        <Table
                            dataSource={users.map((user, index) => ({
                                ...user,
                                key: index + 1,
                                createdAt: FormatDate(user.createdAt),
                                birthOfDay: user.birthOfDay ? dayjs(user.birthOfDay).format("DD/MM/YYYY") : '',
                            }))}

                            onChange={handleTableChange}
                            // loading={loading}
                            columns={columnsUser}
                            pagination={{
                                current: paginationUser.current,
                                pageSize: paginationUser.pageSize,
                                defaultPageSize: 5,
                                pageSizeOptions: ['5', '10', '15'],
                                total: paginationUser.total,
                                showSizeChanger: true,
                            }}></Table >

                        {open && <UserCreateModal
                            hideModal={hideModal}
                            isModal={open}
                            fetchUsers={fetchUsers} />}

                    </Card>
                </div>
            </Modal >
        </ >
    );
};

const UserCreateModal = ({ isModal, hideModal, fetchUsers }) => {

    const [form] = Form.useForm();

    const handleCreate = () => {
        form.validateFields().then(async () => {

            const data = await form.getFieldsValue();
            data.deleted = true;
            await UserService.create(data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Thêm mới thành công!',
                    });
                    fetchUsers();
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
    return (

        <Modal
            width={500}
            title="Thêm mới một khách hàng"
            open={isModal}
            onOk={handleCreate}
            onCancel={hideModal}
            okText={"Thêm mới"}
            cancelText="Hủy bỏ"
        >
            <Form
                name="validateOnly" layout="vertical" autoComplete="off"
                form={form}

            >
                <Form.Item label="Tên:" name="userName" rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng!' }]}>
                    <Input placeholder="Nhập tên người dùng..." />
                </Form.Item>
                <Form.Item label="Email:" name="email" >
                    <Input placeholder="Nhập email..." />
                </Form.Item>
                <Form.Item label="Số điện thoại:" name="phoneNumber" >
                    <Input placeholder="Nhập số điện thoại..." />
                </Form.Item>


                <Form.Item label="Ngày sinh:" name="birthOfDay">
                    <DatePicker placeholder="Chọn ngày sinh" style={{ width: '100%' }} format="DD/MM/YYYY" />
                </Form.Item>

                <Form.Item label="Giới tính:" name="gender" initialValue={true}>
                    <Radio.Group name="radiogroup" style={{ float: 'left' }}>
                        <Radio value={true}>Nam</Radio>
                        <Radio value={false}>Nữ</Radio>
                    </Radio.Group>
                </Form.Item>

            </Form>
        </Modal>
    );
};

const ShowAddressModal = ({ reacord, hideModal, isModal }) => {


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
};

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

const ModalVoucher = ({ hideModal, isModal, voucher }) => {
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
    // Hàm xử lý khi ấn "OK" trên Modal
    const handleOk = async () => {
        try {
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
                <h6 style={{ marginTop: '15px', fontSize: '15px' }}>Chọn 1 mã giảm giá</h6>
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
                                <p style={{ marginBottom: '0' }}>Giảm: {formatCurrency(item.discountRate)} | <span>Giảm tối đa:{formatCurrency(item.maxReduce)}</span></p>
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

// const PaymentModal = ({ isModal, hideModal, orders, fetchPayment }) => {
//     const [form] = Form.useForm();
//     const [change, setChange] = useState(0); // State to store the calculated change

//     const handleCreate = () => {
//         form.validateFields().then(async () => {
//             const data = form.getFieldsValue();
//             data.status = 'Đã thanh toán'
//             data.orderId = orders.id
//             data.paymentDate = new Date();
//             await PaymentService.create(data)
//                 .then(() => {
//                     notification.success({
//                         message: 'Thông báo',
//                         description: 'Thanh toán thành công!',
//                     });
//                     hideModal();
//                     fetchPayment();
//                 })
//                 .catch(error => {
//                     notification.error({
//                         message: 'Thông báo',
//                         description: 'Thêm mới thất bại!',
//                     });
//                     console.error(error);
//                 });
//         }).catch(error => {
//             console.error(error);
//         })
//     }

//     const handleAmountChange = (value) => {
//         if (value === undefined || value === null || value.trim() === '') {
//             setChange(0);
//         } else {
//             const enteredAmount = parseFloat(value);
//             const remainingAmount = enteredAmount - orders.orderTotal;
//             setChange(remainingAmount);
//         }
//     };

//     return (
//         <Modal
//             title="Xác nhận thanh toán"
//             open={isModal}
//             onOk={handleCreate}
//             onCancel={hideModal}
//             okText={"Lưu"}
//             cancelText="Hủy bỏ"
//             width={500}
//         >
//             <Form
//                 name="validateOnly"
//                 layout="vertical"
//                 autoComplete="off"
//                 form={form}
//                 onValuesChange={(changedValues, allValues) => {
//                     // Check if the 'amount' field changed and handle the change
//                     if ('amount' in changedValues) {
//                         handleAmountChange(changedValues['amount']);
//                     }
//                 }}
//             >
//                 <p style={{ fontSize: '20px' }}>Số tiền cần thanh toán: <span style={{ color: 'red' }}>{formatCurrency(orders.orderTotal)}</span></p>

//                 <Col>
//                     <Form.Item
//                         label="Tiền khách đưa:"
//                         name="amount"
//                         rules={[
//                             {
//                                 required: true,
//                                 message: 'Vui lòng nhập số tiền!',
//                             },
//                             {
//                                 validator(_, value) {
//                                     if (!value) {
//                                         return Promise.reject();
//                                     }

//                                     const enteredAmount = parseFloat(value);

//                                     if (isNaN(enteredAmount)) {
//                                         return Promise.reject(
//                                             new Error('Vui lòng nhập đúng định dạng số!')
//                                         );
//                                     }

//                                     if (enteredAmount < orders.orderTotal) {
//                                         return Promise.reject(
//                                             new Error(`Số tiền không được nhỏ hơn ${formatCurrency(orders.orderTotal)}`)
//                                         );
//                                     }

//                                     handleAmountChange(value);
//                                     return Promise.resolve();
//                                 },
//                             },
//                         ]}
//                     >
//                         <Input placeholder="Nhập số tiền..." />
//                     </Form.Item>
//                 </Col>

//                 <Form.Item label="Ghi chú:" name="note" rules={[{ required: true, message: 'Vui lòng nhập ghi chú!' }]}>
//                     <TextArea rows={4} placeholder="Nhập ghi chú..." />
//                 </Form.Item>

//                 <Row>
//                     <Col span={15}>
//                         <Form.Item label="Phương thức thanh toán:" name="paymentMethod" rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán!' }]}>
//                             <Radio.Group name="radiogroup" style={{ float: 'left' }}>
//                                 <Radio value='Tiền mặt'>Tiền mặt</Radio>
//                                 <Radio value='Chuyển khoản'>Chuyển khoản</Radio>
//                             </Radio.Group>
//                         </Form.Item>
//                     </Col>
//                     <Col span={9} style={{ paddingLeft: '10px' }}>
//                         <p>Tiền thừa: <span style={{ color: 'red' }}>{formatCurrency(change)}</span></p>
//                     </Col>
//                 </Row>
//             </Form>
//         </Modal>
//     );
// };