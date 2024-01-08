import { DeleteOutlined, ExclamationCircleOutlined, FileDoneOutlined, FilterOutlined, PlusOutlined, QrcodeOutlined, RedoOutlined, TagsOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Empty, Form, Image, Input, InputNumber, Modal, Row, Select, Space, Spin, Switch, Table, Tabs, Tag, message, notification } from 'antd';
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
export default function NewSell() {

    //bật địa chỉ giao hàng
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    //Mỏ modal sản phẩm
    const [openProduct, setOpenProduct] = useState(false);
    const showProductModal = () => {
        setOpenProduct(true);

    };

    const closeProduct = () => {
        setOpenProduct(false);
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
                setOrderCount(response.length); // Update order count
            })
            .catch(error => {
                console.error(error);
            })
    }

    //Tạo đơn hàng
    const handleCreate = async () => {
        if (orderCount >= 5) {
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
            title: '#',
            key: 'key',
            dataIndex: 'key',
            width: '5%',
        },
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
            render: (text) => (
                <InputNumber disabled min={1} defaultValue={text} />
            ),
        },
        {
            title: 'Thành tiền',
            key: 'total',
            dataIndex: 'total',
            width: '10%',
            render: (text) => (
                <span style={{ color: 'red' }}>
                    {formatCurrency(text)}
                </span>
            ),
        },
        {
            title: 'Thao tác',
            width: '10%',
            render: () => (
                <Space size="middle" >
                    <Button type="text" icon={<DeleteOutlined />} style={{ color: 'red' }} />
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
                // setPagination({
                //     ...pagination,
                //     total: response.totalCount,
                // });

            }).catch(error => {
                console.error(error);
            })
    };
    // const handleTableChange = (pagination) => {
    //     setPagination({
    //         ...pagination,
    //     });

    // }

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
                style={{ marginTop: '20px' }}
                columns={columnOrderDetail}
                dataSource={orderDetails.map((orderDetail, index) => ({
                    ...orderDetail,
                    key: index + 1,
                    total: orderDetail.price * orderDetail.quantity
                }))}

                pagination={false} />)}
            <div style={{ borderBottom: '1px solid #cdcdcd', margin: '30px 0 10px 0', paddingBottom: '10px' }}>
                <Row>
                    <Col span={12}>
                        <h6 style={{ fontSize: '15px', fontWeight: '550' }}>THÔNG TIN THANH TOÁN</h6>
                    </Col>
                    <Col span={12}>
                        <Button type='primary'
                            icon={<UserAddOutlined />}
                            style={{ float: 'right', backgroundColor: '#5a76f3', borderRadius: '5px' }}
                        >Chọn khách hàng</Button>
                    </Col>
                </Row>
            </div>

            <Row>
                <Col span={14}>
                    <Row style={{ margin: '10px 0', paddingRight: '10px', color: '#5a76f3' }}>
                        <Col span={12}>
                            <h5 style={{ fontSize: '20px' }}>Khách hàng:<span style={{ marginLeft: '15px' }}>Lê Đăng Thành</span></h5>
                        </Col>
                        <Col span={12}>
                            <Button icon={<MdOutlineMapsUgc />} type='primary' style={{ float: 'right', backgroundColor: '#5a76f3', borderRadius: '5px', display: isSwitchOn ? 'block' : 'none' }}>Chọn địa chỉ</Button>
                        </Col>

                    </Row>
                    <div style={{ display: isSwitchOn ? 'block' : 'none' }}>
                        <Row>
                            <Col span={12} lg={12} style={{ paddingRight: '15px' }}>
                                <Form.Item
                                    labelCol={{ span: 24 }}
                                    label="Họ và tên"
                                    name="recipientName"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập họ và tên!',
                                        },
                                    ]}
                                // initialValue={address?.recipientName}
                                >
                                    <Input
                                        placeholder="Nhập họ và tên..."
                                        // disabled={user ? true : false}
                                        style={{ height: '40px', borderRadius: '5px' }} />
                                </Form.Item>
                            </Col>
                            <Col span={12} lg={12} style={{ paddingRight: '15px' }}>
                                <Form.Item
                                    labelCol={{ span: 24 }}
                                    label="Số điện thoại"
                                    name="phoneNumber"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập số điện thoại!',
                                        },
                                    ]}
                                // initialValue={address?.phoneNumber}
                                >
                                    <Input
                                        className='checkout__input'
                                        placeholder="Nhập số điện thoại..."
                                        // disabled={user ? true : false} 
                                        style={{ height: '40px', borderRadius: '5px' }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row >
                            <Col span={12} style={{ paddingRight: '15px' }}>

                                <Form.Item label="Tỉnh/Thành phố:" name="city"
                                    labelCol={{ span: 24 }}
                                    rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]}
                                // initialValue={address?.city}
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
                                    // disabled={user ? true : false}
                                    />

                                </Form.Item>

                            </Col>
                            <Col span={12} style={{ paddingRight: '15px' }}>

                                <Form.Item label="Quận/Huyện:" name="district"
                                    labelCol={{ span: 24 }}
                                    // initialValue={address?.district}
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
                                    labelCol={{ span: 24 }}
                                    // initialValue={address?.ward}
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
                                    labelCol={{ span: 24 }}
                                    // initialValue={address?.addressDetail}
                                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ cụ thể!' }]}>
                                    <Input
                                        placeholder="Địa chỉ cụ thể..."
                                        // disabled={user ? true : false}
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
                            //  onClick={() => showVoucherModal()}
                            >Chọn mã giảm giá</Button>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                        <Col span={10}>
                            <p style={{ fontWeight: '600' }}>Tiền hàng:</p>
                        </Col>
                        <Col span={14}>
                            <span style={{ float: 'right', marginRight: '15px', fontWeight: '600', color: 'red' }}>
                                {/* {formatCurrency(calculateTotalAmount())} */}
                                100.000 đ
                            </span>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                        <Col span={10}>
                            <p style={{ fontWeight: '600' }}>Phí vận chuyển:</p>
                        </Col>
                        <Col span={14}>
                            <span style={{ float: 'right', marginRight: '15px', fontWeight: '600', color: 'red' }}>
                                {/* {formatCurrency(calculateTotalAmount())} */}
                                100.000 đ
                            </span>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                        <Col span={10}>
                            <p style={{ fontWeight: '600' }}>Giảm giá:</p>
                        </Col>
                        <Col span={14}>
                            <span style={{ float: 'right', marginRight: '15px', fontWeight: '600', color: 'red' }}>
                                {/* {formatCurrency(calculateTotalAmount())} */}
                                100.000 đ
                            </span>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                        <Col span={10}>
                            <p style={{ fontWeight: '600' }}>Tổng tiền:</p>
                        </Col>
                        <Col span={14}>
                            <span style={{ float: 'right', marginRight: '15px', fontWeight: '600', color: 'red' }}>
                                {/* {formatCurrency(calculateTotalAmount())} */}
                                100.000 đ
                            </span>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                        <Col span={10}>
                            <p style={{ fontWeight: '600' }}>Khách thanh toán: <Button type='dashed' style={{ width: '50px', marginLeft: '30px' }} icon={<MdPayments style={{ fontSize: '20px' }} />} /></p>

                        </Col>
                        <Col span={14}>
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
    // const [form] = Form.useForm();
    // const [address, setAddress] = useState({});

    // useEffect(() => {
    //     if (address) {
    //         // Use form.setFieldsValue to set values for multiple fields
    //         form.setFieldsValue({
    //             'recipientName': address.recipientName,
    //             'phoneNumber': address.phoneNumber,
    //             'city': address.city,
    //             'district': address.district,
    //             'ward': address.ward,
    //             'addressDetail': address.addressDetail,
    //         });
    //     }
    // }, [address, form]);

    // const findAddressesByUserIdAnDeletedTrue = async () => {
    //     await AddressService.findAddressesByUserIdAnDeletedTrue(userId)
    //         .then(response => {
    //             setAddress(response);
    //             console.log(response)
    //         }).catch(error => {
    //             console.error(error);
    //         })
    // }
    // useEffect(() => {
    //     if (user) {
    //         findAddressesByUserIdAnDeletedTrue();
    //     }
    // }, [])
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
            <Row style={{ width: '100%', marginTop: '20px' }}>
                <Tabs
                    hideAdd
                    onChange={onChange}
                    type="editable-card"
                    onEdit={handleDelete}
                    items={items}
                    style={{ width: '100%' }}
                />
            </Row>
            {
                openProduct && <ProductModal
                    isModal={openProduct}
                    hideModal={closeProduct}
                    orderId={orderId}
                    fetchOrderDetail={fetchOrderDetail}
                />
            }
        </>
    );
}
const ProductModal = ({ isModal, hideModal, orderId, fetchOrderDetail }) => {

    const [productDetails, setProductDetails] = useState([]);

    const [paginationProduct, setPaginationProduct] = useState({ current: 1, pageSize: 5, total: 0 });

    const fetchProductDetails = async () => {

        await ProductDetailService.getAllProductDetails(paginationProduct.current - 1, paginationProduct.pageSize)
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

    };
    useEffect(() => {
        fetchProductDetails();
    }, [paginationProduct.current - 1, paginationProduct.pageSize])


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
                                <Input
                                    style={{
                                        width: '100%',
                                        height: '35px',
                                        borderRadius: '5px',
                                    }}
                                    placeholder="Nhập mã, tên sản phẩm..."
                                // value={searchKeyword}
                                // onChange={(e) => setSearchKeyword(e.target.value)}

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
                                    // value={selectedOrderType}
                                    // onChange={(value) => setSelectedOrderType(value)}
                                    options={[
                                        {
                                            value: 'Tại quầy',
                                            label: 'Tại quầy',
                                        },
                                        {
                                            value: 'Online',
                                            label: 'Online',
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
                                    placeholder="Thương hiệu"
                                    // value={selectedOrderType}
                                    // onChange={(value) => setSelectedOrderType(value)}
                                    options={[
                                        {
                                            value: 'Tại quầy',
                                            label: 'Tại quầy',
                                        },
                                        {
                                            value: 'Online',
                                            label: 'Online',
                                        },
                                    ]}
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
                                    // value={selectedOrderType}
                                    // onChange={(value) => setSelectedOrderType(value)}
                                    options={[
                                        {
                                            value: 'Tại quầy',
                                            label: 'Tại quầy',
                                        },
                                        {
                                            value: 'Online',
                                            label: 'Online',
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
                                    placeholder="Màu sắc"
                                    // value={selectedOrderType}
                                    // onChange={(value) => setSelectedOrderType(value)}
                                    options={[
                                        {
                                            value: 'Tại quầy',
                                            label: 'Tại quầy',
                                        },
                                        {
                                            value: 'Online',
                                            label: 'Online',
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
                                    placeholder="Kích thước"
                                    // value={selectedOrderType}
                                    // onChange={(value) => setSelectedOrderType(value)}
                                    options={[
                                        {
                                            value: 'Tại quầy',
                                            label: 'Tại quầy',
                                        },
                                        {
                                            value: 'Online',
                                            label: 'Online',
                                        },
                                    ]}
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
                                    placeholder="Khoảng giá"
                                    // value={selectedOrderType}
                                    // onChange={(value) => setSelectedOrderType(value)}
                                    options={[
                                        {
                                            value: 'Tại quầy',
                                            label: 'Tại quầy',
                                        },
                                        {
                                            value: 'Online',
                                            label: 'Online',
                                        },
                                    ]}
                                />
                            </Col>
                            <Col span={16} style={{ padding: '0 50px' }}>
                                <Button
                                    type="primary"
                                    style={{
                                        float: 'right',
                                        borderRadius: '4px',
                                        backgroundColor: '#5a76f3',
                                    }}
                                // onClick={handleSearch}
                                >
                                    Tìm kiếm
                                </Button>
                                <Button
                                    type="primary"
                                    icon={<RedoOutlined style={{ fontSize: '18px' }} />}
                                    style={{
                                        float: 'right',
                                        marginRight: '6px',
                                        borderRadius: '4px',
                                        backgroundColor: '#5a76f3',
                                    }}
                                // onClick={handleReset}
                                />
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

const UserModal = () => {

    // const [loading, setLoading] = useState(false);

    // const [open, setOpen] = useState(false);

    // const showModalUser = () => {
    //     setOpen(true);
    // };

    // const hideModal = () => {
    //     setOpen(false);
    // };

    // const [users, setUsers] = useState([]);

    // const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });

    // const fetchUsers = async () => {
    //     setLoading(true);

    //     await UserService.getAll(pagination.current - 1, pagination.pageSize, searchName, searchPhone, searchEmail, deleted)
    //         .then(response => {

    //             setUsers(response.data);
    //             console.log(response.data)
    //             setPagination({
    //                 ...pagination,
    //                 total: response.totalCount,
    //             });
    //             setLoading(false);

    //         }).catch(error => {
    //             console.error(error);
    //         })
    // }

    // useEffect(() => {
    //     fetchUsers();
    // }, [pagination.current, pagination.pageSize, searchName, searchPhone, searchEmail, deleted]);


    // const handleReset = () => {

    //     setSearchEmail(null);
    //     setSearchName(null);
    //     setSearchPhone(null);
    //     setDeleted(null);

    //     setPagination({
    //         ...pagination,
    //         current: 1,
    //     });
    //     handleTableChange(pagination, null)
    // };

    // const handleTableChange = (pagination, filters) => {
    //     console.log(filters)
    //     setPagination({
    //         ...pagination,
    //     });

    // };



    const columns = [
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
            width: '20%',
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
            width: '10%',
            render: (text) => {
                return text !== null ? (text === true ? "Nam" : "Nữ") : '';
            },
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthOfDay',
            key: 'birthOfDay',
            width: '10%',
        },
        {
            title: 'Hành động',
            key: 'action',
            width: "10%",
            render: (record) => {
                return <Space size="middle">

                    <Button type="primary" style={{ borderRadius: '5px', backgroundColor: '#5a76f3' }}>Chọn</Button>

                </Space>
            },
        },
    ];
    return (
        <>
            <Modal
                title="Sản phẩm"
                // open={isModal}
                // onCancel={hideModal}
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
                                <Input
                                    style={{
                                        width: '100%',
                                        height: '35px',
                                        borderRadius: '5px',
                                    }}
                                    placeholder="Nhập mã, tên sản phẩm..."
                                // value={searchKeyword}
                                // onChange={(e) => setSearchKeyword(e.target.value)}

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
                                    // value={selectedOrderType}
                                    // onChange={(value) => setSelectedOrderType(value)}
                                    options={[
                                        {
                                            value: 'Tại quầy',
                                            label: 'Tại quầy',
                                        },
                                        {
                                            value: 'Online',
                                            label: 'Online',
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
                                    placeholder="Thương hiệu"
                                    // value={selectedOrderType}
                                    // onChange={(value) => setSelectedOrderType(value)}
                                    options={[
                                        {
                                            value: 'Tại quầy',
                                            label: 'Tại quầy',
                                        },
                                        {
                                            value: 'Online',
                                            label: 'Online',
                                        },
                                    ]}
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
                                    placeholder="Khoảng giá"
                                    // value={selectedOrderType}
                                    // onChange={(value) => setSelectedOrderType(value)}
                                    options={[
                                        {
                                            value: 'Tại quầy',
                                            label: 'Tại quầy',
                                        },
                                        {
                                            value: 'Online',
                                            label: 'Online',
                                        },
                                    ]}
                                />
                            </Col>
                            <Col span={16} style={{ padding: '0 50px' }}>
                                <Button
                                    type="primary"
                                    style={{
                                        float: 'right',
                                        borderRadius: '4px',
                                        backgroundColor: '#5a76f3',
                                    }}
                                // onClick={handleSearch}
                                >
                                    Tìm kiếm
                                </Button>
                                <Button
                                    type="primary"
                                    icon={<RedoOutlined style={{ fontSize: '18px' }} />}
                                    style={{
                                        float: 'right',
                                        marginRight: '6px',
                                        borderRadius: '4px',
                                        backgroundColor: '#5a76f3',
                                    }}
                                // onClick={handleReset}
                                />
                            </Col>

                        </Row>

                    </Card>
                    <Card
                        title={<span style={{ color: '#5a76f3' }}>Danh sách sản phẩm</span>}
                        style={{ marginTop: '20px', borderRadius: '10px' }}
                    >
                        <Button type="primary"
                            icon={<PlusOutlined />}
                            // onClick={() => showModal("add")}
                            style={{ marginBottom: '16px', float: 'right', borderRadius: '2px' }} >
                            Thêm mới
                        </Button>

                        <Button type="primary"
                            icon={<RedoOutlined style={{ fontSize: '18px' }} />}
                            style={{ marginBottom: '16px', float: 'right', marginRight: '6px', borderRadius: '4px', }}
                        // onClick={handleReset}
                        />

                        {/* <Table
                            dataSource={users.map((user, index) => ({
                                ...user,
                                key: index + 1,
                                createdAt: FormatDate(user.createdAt),
                                birthOfDay: user.birthOfDay ? dayjs(user.birthOfDay).format("DD/MM/YYYY") : '',
                            }))}

                            onChange={handleTableChange}
                            loading={loading}
                            columns={columns}
                            pagination={{
                                current: pagination.current,
                                pageSize: pagination.pageSize,
                                defaultPageSize: 5,
                                pageSizeOptions: ['5', '10', '15'],
                                total: pagination.total,
                                showSizeChanger: true,
                            }}></Table >

                        {open.isModal && <UserModal
                            isMode={open.isMode}
                            reacord={open.reacord}
                            hideModal={hideModal}
                            isModal={open.isModal}
                            fetchUsers={fetchUsers} />} */}

                    </Card>
                </div>
            </Modal >
        </ >
    );
};