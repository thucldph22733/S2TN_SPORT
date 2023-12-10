import React, { useReducer, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faMoneyCheck } from '@fortawesome/free-solid-svg-icons';
import {
    AutoComplete,
    Button,
    Col,
    Modal,
    Row,
    Select,
    Table,
    theme,
    Image,
    InputNumber,
    Space,
    Alert,
    notification,
    message,
    Popconfirm,
    Input,
    Radio,
    Switch,
    Tag,
    Form,
    DatePicker,
    ConfigProvider,
} from 'antd';
import { useState } from 'react';
import {
    CloseSquareFilled,
    DeleteOutlined,
    FormOutlined,
    PlusCircleFilled,
    PlusOutlined,
    PlusSquareOutlined,
    QrcodeOutlined,
    RedoOutlined,
    ReloadOutlined,
    SearchOutlined,
    ShopOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import { QrReader } from 'react-qr-reader';
import OrderService from '~/service/OrderService';
import FormatDate from '~/utils/format-date';
import dayjs from 'dayjs';
import { PiLockKeyFill, PiLockKeyOpenFill } from 'react-icons/pi';
import { FaMapMarkedAlt } from 'react-icons/fa';
import UserService from '~/service/UserService';
import ShowAddressModal from '../User/Address';


export default function OrderDetail() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const formatCurrency = (amount) => {
        const roundedAmount = Math.floor(amount); // Làm tròn xuống để lấy phần nguyên
        const formattedAmount = new Intl.NumberFormat('vi-VN').format(roundedAmount);
        return `${formattedAmount}`; // Thêm dấu chấm ở cuối
    };
    const [scanningEnabled, setScanningEnabled] = useState(true);
    const [showScanner, setShowScanner] = useState(false);
    const [qrData, setQrData] = useState(null);
    const [scannedOnce, setScannedOnce] = useState(false);
    const [selectedVoucherInfo, setSelectedVoucherInfo] = useState(null);
    const [autoCompleteValue, setAutoCompleteValue] = useState('');
    const [showPopconfirm, setShowPopconfirm] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showSuccessAlertCustonmer, setShowSuccessAlertCustonmer] = useState(false);
    const autoCompleteRef = useRef();
    const [customerOptions, setCustomerOptions] = useState([]);
    const [voucherOptions, setVoucherOptions] = useState([]);
    const [orderDetailIdToDelete, setorderDetailIdToDelete] = useState(null);
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [selectedVoucherId, setSelectedVoucherId] = useState(null);
    const [autoCompleteOptionsKey, setAutoCompleteOptionsKey] = useState(0);
    const [customer, setCustomer] = useState([]);
    const [order, setOrder] = useState({}); // Bạn có thể điều chỉnh cấu trúc của order theo nhu cầu
    const [quantityValues, setQuantityValues] = useState({});
    const [productDetailsKey, setProductDetailsKey] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUserOpen, setIsModalUserOpen] = useState(false);
    const [isModalQuantityOpen, setIsModalQuantityOpen] = useState(false);
    const [productDetails, setProductDetails] = useState([]);
    const [orderDetails, setOrderDetails] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [disCountMoney, setDiscountMoney] = useState("0");
    const [orderTotal, setOrderTotal] = useState(0);
    const [orderTotalInitial, setOrderTotalInitial] = useState(0);
    const [customerPayment, setCustomerPayment] = useState(0);
    const [canCreateOrder, setCanCreateOrder] = useState(false);
    const [isCreatingOrder, setIsCreatingOrder] = useState(false);
    const { id } = useParams();
    const { Option } = Select;
    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    useEffect(() => {
        loadOrderDetails();
    }, [productDetailsKey]);

    useEffect(() => {
        loadCustomerOptions();
        loadVoucherOptions();
    }, []);

    useEffect(() => {
        loadProductDetails();
        loadOrder();
    }, []);

    useEffect(() => {
        const fetchVoucherInfo = async () => {
            try {
                if (selectedVoucherId) {
                    const voucherResponse = await axios.get(
                        `http://localhost:8080/api/v1/vouchers/findVoucherById?id=${selectedVoucherId}`,
                    );

                    if (voucherResponse.status === 200) {
                        const voucher = voucherResponse.data;
                        setSelectedVoucher(voucher);
                        setShowSuccessAlert(true);
                    } else {
                        console.error('Có lỗi xảy ra khi lấy thông tin voucher');
                    }
                }
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        };

        fetchVoucherInfo();
    }, [selectedVoucherId]);

    useEffect(() => {
        const fetchCustomerInfo = async () => {
            try {
                if (selectedCustomerId) {
                    const CustomerResponse = await axios.get(
                        `http://localhost:8080/api/v1/users/getUserById?id=${selectedCustomerId}`,
                    );

                    if (CustomerResponse.status === 200) {
                        const customers = CustomerResponse.data;
                        setSelectedCustomer(customers);
                    } else {
                        console.error('Có lỗi xảy ra khi lấy thông tin customer');
                    }
                }
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        };

        fetchCustomerInfo();
    }, [selectedCustomerId]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const userModel = () => {
        setIsModalUserOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        setIsModalUserOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setIsModalUserOpen(false);
    };
    const showModalQuantity = (productId) => {
        const selectedProduct = productDetails.find((product) => product.id === productId);
        setSelectedProduct(selectedProduct);
        setIsModalQuantityOpen(true);
    };
    const layidUSer = (userId) => {
        // const selectedUser = users.find((user) => user.id === userId);
        console.log("abcccccc" + userId);
        setSelectedCustomerId(userId);
        // loadCustomerOptions();
        setShowSuccessAlertCustonmer(true);
        setIsModalUserOpen(false);
    }
    const handleOkQuantity = () => {
        setIsModalQuantityOpen(false);
        if (selectedProduct) {
            handleAddToProductDetail(selectedProduct.id);
            loadProductDetails();
            loadOrderDetails();
        }
    };

    const handleCancelQuantity = () => {
        setIsModalQuantityOpen(false);
    };

    const handleAddToProductDetail = async (productId) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/orderDetails/create', {
                orderId: id,
                productDetailId: productId,
                quantity: quantity,
                price: 0,
                note: '',
            });

            if (response.status === 201) {
                console.log('Sản phẩm đã được thêm vào đơn hàng');
                const orderResponse = await axios.get(`http://localhost:8080/api/v1/orders/findOrderById?id=${id}`);
                if (orderResponse.status === 200) {
                    const order = orderResponse.data;

                    // Tính toán giảm giá và tổng tiền sau giảm từ order
                    const discountRate = order.voucher ? order.voucher.discountRate : 0;
                    const orderTotalInitial = order.orderTotalInitial;
                    const giamGia = (orderTotalInitial * discountRate) / 100;
                    const orderTotal = orderTotalInitial - giamGia;
                    // Cập nhật state để hiển thị trên giao diện

                    const updateOrderResponse = await axios.put(`http://localhost:8080/api/v1/orders/update?id=${id}`, {
                        voucherId: order.voucher ? order.voucher.id : null,
                        orderTotal: orderTotal,
                        customerId: order.customer ? order.customer.id : null,
                        discountMoney: giamGia,
                        orderTotalInitial: orderTotalInitial,
                        deliveryId: '',
                        paymentId: selectedPaymentId,
                        addressId: '',
                        statusId: 1,
                        note: note,
                        orderTypeId: 3,
                    });
                    setOrderTotal(orderTotal);
                    setOrderTotalInitial(orderTotalInitial);
                    setDiscountMoney(giamGia);
                } else {
                    console.error('Có lỗi xảy ra khi lấy thông tin order');
                }
                loadOrderDetails();
                loadOrder();
                setProductDetailsKey((prevKey) => prevKey + 1);
            } else {
                console.error('Có lỗi xảy ra khi thêm sản phẩm vào đơn hàng');
            }
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    };

    const loadOrderDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/orderDetails/getByOrderId?id=${id}`);
            if (response.status === 200) {
                const updatedOrderDetails = response.data.map((orderDetail) => {
                    const productDetailId = orderDetail.productDetail?.id;
                    orderDetail.productDetailId = productDetailId;
                    return orderDetail;
                });
                setOrderDetails(updatedOrderDetails);
                const totalPrice = updatedOrderDetails.reduce((acc, orderDetail) => acc + orderDetail.price, 0);
                setOrderTotalInitial(totalPrice);
                // loadCustomerById();
            } else {
                console.error('Đơn hàng đang trống');
            }
        } catch (error) {
            console.error('Error loading order details:', error);
        }
    };

    const loadProductDetails = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/productDetails/getAll');
            if (Array.isArray(response.data)) {
                setProductDetails(response.data);
            } else {
                console.error('API trả về không phải là một mảng: a', response.data);
            }
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    };
    const loadCustomerOptions = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/users/findAllUsersWithUserRole');
            if (Array.isArray(response.data.data)) {
                const options = response.data.data.map((user) => ({
                    value: user.id,
                    label: `${user.userName} - ${user.phoneNumber}`,
                    data: user,
                }));
                setCustomerOptions(options);
                // Làm mới AutoComplete bằng cách thay đổi giá trị key
                setAutoCompleteOptionsKey((prevKey) => prevKey + 1);
            } else {
                console.error('API trả về không phải là một mảng: b', response.data);
            }
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    };

    const handleCustomerSelect = async (value, option) => {
        console.log('aaaaaaaaaaaaaaaa', value);
        setSelectedCustomerId(value);
        try {
            console.log('Order đã được cập nhật với khách hàng mới');
            loadCustomerOptions();
            setShowSuccessAlertCustonmer(true);
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    };

    const handleAlertClose = () => {
        setShowSuccessAlertCustonmer(false);
        // Gọi hàm hủy chọn khách hàng tại đây
        handleCancelCustomerSelection(); // Thay bằng tên hàm và tham số phù hợp
    };

    const handleCancelCustomerSelection = () => {
        setSelectedCustomer(null);
        setSelectedCustomerId(null);
        // Các bước xử lý khác (nếu cần)
    };

    const handleQuantityChange = async (record, value) => {
        try {
            if (record.id) {
                // Cập nhật state với giá trị số lượng mới cho từng dòng
                setQuantityValues({
                    ...quantityValues,
                    [record.id]: value,
                });
                console.log('aaaaa', id);

                // Gọi API để cập nhật số lượng trên server
                const response = await axios.put(`http://localhost:8080/api/v1/orderDetails/update?id=${record.id}`, {
                    orderId: record.idOrder,
                    productDetailId: record.idProductDetail,
                    quantity: value,
                });

                if (response.status === 200) {
                    console.log('Số lượng sản phẩm đã được cập nhật');
                    // Gọi API để lấy thông tin order sau khi cập nhật số lượng
                    const orderResponse = await axios.get(`http://localhost:8080/api/v1/orders/findOrderById?id=${id}`);
                    if (orderResponse.status === 200) {
                        const order = orderResponse.data;

                        // Tính toán giảm giá và tổng tiền sau giảm từ order
                        const discountRate = order.voucher ? order.voucher.discountRate : 0;
                        const orderTotalInitial = order.orderTotalInitial;
                        const giamGia = (orderTotalInitial * discountRate) / 100;
                        const orderTotal = orderTotalInitial - giamGia;
                        // Cập nhật state để hiển thị trên giao diện

                        const updateOrderResponse = await axios.put(
                            `http://localhost:8080/api/v1/orders/update?id=${record.idOrder}`,
                            {
                                voucherId: order.voucher ? order.voucher.id : null,
                                orderTotal: orderTotal,
                                customerId: order.customer ? order.customer.id : null,
                                discountMoney: giamGia,
                                orderTotalInitial: orderTotalInitial,
                                deliveryId: '',
                                paymentId: selectedPaymentId,
                                addressId: '',
                                statusId: 1,
                                note: note,
                                orderTypeId: 3,
                            },
                        );
                        setOrderTotal(orderTotal);
                        setOrderTotalInitial(orderTotalInitial);
                        setDiscountMoney(giamGia);
                    } else {
                        console.error('Có lỗi xảy ra khi lấy thông tin order');
                    }
                    setProductDetailsKey((prevKey) => prevKey + 1);
                    loadOrderDetails();
                    loadOrder();
                } else {
                    console.error('Có lỗi xảy ra khi cập nhật số lượng sản phẩm');
                }
            } else {
                console.error('productDetailId is null');
            }
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    };

    const loadVoucherOptions = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/vouchers/getAll');
            if (Array.isArray(response.data.data)) {
                const options = response.data.data.map((voucher) => ({
                    value: voucher.id, // Chỉ lấy id của voucher làm giá trị value
                    label: (
                        <div>
                            Phần trăm giảm: {voucher.discountRate}% -- Đơn tối thiểu: {voucher.orderMinimum}
                            <br />
                            Số lượng: {voucher.quantity}
                        </div>
                    ),
                    data: voucher,
                }));

                setVoucherOptions(options);

                const foundOption = options.find((option) => option.value === selectedVoucherId);

                if (foundOption) {
                    setAutoCompleteValue(foundOption.value);
                } else {
                    setAutoCompleteValue(null);
                }

                console.log('Options:', options);
            } else {
                console.error('API trả về không phải là một mảng:', response.data);
            }
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    };

    const handleVoucherSelect = async (value, option) => {
        if (value !== undefined && value !== null) {
            try {
                const voucherId = value; // Lấy id từ value, vì value là id của voucher
                setSelectedVoucherId(voucherId);

                // Gọi API để lấy thông tin voucher
                const voucherResponse = await axios.get(
                    `http://localhost:8080/api/v1/vouchers/findVoucherById?id=${voucherId}`,
                );

                if (voucherResponse.status === 200) {
                    const voucher = voucherResponse.data;
                    const discountRate = voucher.discountRate;

                    if (orderTotalInitial < voucher.orderMinimum) {
                        // Hiển thị thông báo lỗi
                        notification.error({
                            message: 'Lỗi chọn voucher',
                            description: `Tiền ban đầu không đạt yêu cầu tối thiểu của voucher. Yêu cầu tối thiểu là ${voucher.orderMinimum}`,
                        });

                        // Reset state and return
                        setSelectedVoucher(null);
                        setSelectedVoucherId(null);

                        return false;
                    }


                    console.log('Entering showSuccessAlert block');
                    const giamGia = (orderTotalInitial * discountRate) / 100;
                    setDiscountMoney(giamGia);
                    const newOrderTotal = orderTotalInitial - giamGia;
                    setOrderTotal(newOrderTotal);

                    const newQuantity = voucher.quantity;

                    setVoucherOptions((options) =>
                        options.map((opt) => {
                            if (opt.value === voucherId) {
                                return {
                                    ...opt,
                                    label: (
                                        <div>
                                            Phần trăm giảm: {voucher.discountRate}% -- Đơn tối thiểu:{' '}
                                            {voucher.orderMinimum}
                                            <br />
                                            Số lượng: {newQuantity}
                                        </div>
                                    ),
                                    data: voucher,
                                };
                            }
                            return opt;
                        }),
                    );
                    setSelectedVoucherInfo(voucher);
                    console.log('Before setShowSuccessAlert(true)');
                    setShowSuccessAlert(true);
                    console.log('After setShowSuccessAlert(true)');

                } else {
                    console.error('Order id is null or voucherId is null');
                }
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        } else {
            // Bạn có thể thực hiện một hành động khác tùy thuộc vào yêu cầu của bạn
            console.warn('Voucher is not selected. No API call is made.');
        }
    };

    const columnCart = [
        {
            title: '#',
            dataIndex: 'index',
            width: 50,
            render: (text, record, index) => index + 1, // Hiển thị STT bắt đầu từ 1
        },
        {
            title: 'Ảnh',
            dataIndex: 'productAvatar',
            width: 60,
            render: (record) => <Image width={130} src={record} alt="Avatar" />,
        },
        {
            title: 'Sản phẩm',
            dataIndex: '',
            width: 100,
            render: (record) => (
                <Row gutter={[5]}>
                    <Col span={16}>
                        {record.productName} [{record.sizeName} - {record.colorName}] <br />
                    </Col>
                    <Col span={16}>
                        <span style={{ color: 'red' }}>{productDetails.price} VND</span>
                    </Col>
                </Row>
            ),
        },
        {
            title: 'Số lượng',
            dataIndex: '',
            width: 60,
            render: (record) => (
                <InputNumber
                    min={1}
                    value={quantityValues[record.id] || record.quantity}
                    onChange={(value) => handleQuantityChange(record, value)}
                />
            ),
        },

        {
            title: 'Tổng tiền',
            dataIndex: 'price',
            width: 60,
        },
        {
            title: <div style={{ textAlign: 'center' }}>Hành động</div>,
            dataIndex: '',
            width: 50,
            render: (record) => (
                <div style={{ textAlign: 'center' }}>
                    <Popconfirm
                        title="Xoá sản phẩm"
                        description="Bạn chắc chắn xóa sản phẩm này?"
                        onConfirm={handleConfirm}
                        onCancel={handleCancelPopConFirm}
                        okText="OK"
                        cancelText="Hủy"
                        visible={showPopconfirm}
                        onVisibleChange={handlePopconfirmVisibleChange}
                    >
                        <button
                            className="btn btn-outline-danger"
                            style={{ marginRight: '10px' }}
                            onClick={() => {
                                setorderDetailIdToDelete(record.id);
                                setShowPopconfirm(true);
                            }}
                        >
                            <DeleteOutlined />
                        </button>
                    </Popconfirm>
                </div>
            ),
        },
    ];
    const columnProduct = [
        {
            title: '#',
            dataIndex: 'index',
            width: 40,
            render: (text, record, index) => index + 1, // Hiển thị STT bắt đầu từ 1
        },
        {
            title: 'Sản phẩm',
            dataIndex: '',
            width: 110,
            render: (record) => (
                <Row gutter={[5]}>
                    <Col span={12}>
                        <Image width={130} src={record.productAvatar} alt="Avatar" />
                    </Col>
                    <Col span={12}>
                        {record.productName} x [{record.colorName} - {record.sizeName}] <br />
                        Màu:{record.colorName} - kích cỡ:{record.sizeName}
                    </Col>
                </Row>
            ),
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            width: 50,
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            width: 50,
        },
        {
            title: <div style={{ textAlign: 'center' }}>Hành động</div>,
            dataIndex: '',
            width: 50,
            render: (record) => (
                <div style={{ textAlign: 'center' }}>
                    {/* <button className="btn btn-outline-warning" onClick={() => handleAddToProductDetail(record.id)}>
                            Chọn
                        </button> */}
                    <button className="btn btn-outline-warning" onClick={() => showModalQuantity(record.id)}>
                        Chọn
                    </button>
                </div>
            ),
        },
    ];

    const loadOrder = async () => {
        const result = await axios.get(`http://localhost:8080/api/v1/orders/findOrderById?id=${id}`);
        if (result.data) {
            const { orderTotal, orderTotalInitial, discountMoney, idCustomer } = result.data;
            setOrderTotal(orderTotal);
            setOrderTotalInitial(orderTotalInitial);
            setDiscountMoney(discountMoney);
            // setCustomer(idCustomer);
        }
    };

    const handleConfirm = () => {
        if (orderDetailIdToDelete) {
            deleteProductsInCart(orderDetailIdToDelete);
            setShowPopconfirm(false);
        }
    };

    const handleCancelPopConFirm = () => {
        setShowPopconfirm(false);
        message.error('Đã hủy');
    };

    const handlePopconfirmVisibleChange = (visible) => {
        setShowPopconfirm(visible);
    };

    const deleteProductsInCart = async (orderDetailId) => {
        try {
            // Gọi API để xóa sản phẩm trong chi tiết đơn hàng
            const response = await axios.delete(
                `http://localhost:8080/api/v1/orderDetails/deleteProducts?id=${orderDetailId}`,
            );

            if (response.status === 200) {
                // Nếu xóa thành công, cập nhật lại dữ liệu
                loadOrderDetails();
                loadOrder();

                // Sử dụng hàm setOrderDetails để đảm bảo cập nhật state
                setOrderDetails((prevOrderDetails) => {
                    // Lọc bỏ sản phẩm đã xóa khỏi state
                    return prevOrderDetails.filter((item) => item.id !== orderDetailId);
                });
            } else {
                console.error('Có lỗi xảy ra khi xóa sản phẩm');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const createFinalOrder = () => {
        if (customerPayment < orderTotal) {
            // Hiển thị thông báo lỗi nếu tiền khách đưa không đủ
            return (
                <Alert
                    message="Vui lòng nhập đủ tiền khách đưa!"
                    type="error"
                    style={{
                        height: '35px',
                        width: '100%',
                        display: 'flex',
                        marginLeft: '10px',
                    }}
                />
            );
        } else {
            // Hiển thị thông báo thành công nếu đủ tiền
            return (
                <Alert
                    message={`Khách đã đưa đủ tiền`}
                    type="success"
                    style={{
                        height: '35px',
                        width: '100%',
                        display: 'flex',
                        marginLeft: '10px',
                    }}
                />
            );
        }
    };
    const navigate = useNavigate();

    const handleCreateOrder = async () => {
        setIsCreatingOrder(true);
        const data = {
            voucherId: selectedVoucherId,
            orderTotal: orderTotal,
            customerId: selectedCustomer.id,
            orderTotalInitial: orderTotalInitial,
            deliveryId: '',
            paymentId: selectedPaymentId,
            addressId: '',
            statusId: 5,
            note: note,
            orderTypeId: 1
        }
        await OrderService.updateTimeLine(id, data)
            .then(() => {
                notification.success({
                    message: 'Thông báo',
                    description: 'Tạo mới đơn hàng thành công!',
                });
                navigate('/don-hang');
            })
            .catch(error => {
                notification.error({
                    message: 'Thông báo',
                    description: 'Tạo mới đơn hàng thất bại!',
                });
                console.error(error);
            });
    };

    const [selectedPaymentId, setSelectedPaymentId] = useState(1); // Khởi tạo giá trị mặc định là 'cash'

    const handlePaymentChange = (e) => {
        setSelectedPaymentId(e.target.value);
    };

    const [note, setNote] = useState('');

    const handleNoteChange = (e) => {
        setNote(e.target.value);
    };
    // Kiểm tra có thể tạo đơn hàng hay không
    const canCreateOrderButton = customerPayment >= orderTotal;

    const openScanner = () => {
        setShowScanner(true);
        setScannedOnce(false);
        setScanningEnabled(true); // Cho phép quét QR khi mở modal
    };

    const closeScanner = () => {
        setShowScanner(false);
    };

    const handleError = (err) => {
        console.error(err);
    };

    const processQRData = async (data) => {
        if (data && !scannedOnce && scanningEnabled) {
            setScannedOnce(true);
            setScanningEnabled(false); // Tắt quét QR để tránh thêm sản phẩm liên tục
            // Thực hiện thêm sản phẩm vào đơn hàng từ QR code
            await handleAddToProductDetailFromQR(data);
            // Đóng modal tự động khi quét xong lần đầu
            closeScanner();
        }
    };

    const handleScan = async (data) => {
        processQRData(data);
    };

    const handleResult = (result) => {
        if (result && showScanner && !scannedOnce && scanningEnabled) {
            setQrData(result.text);
            handleAddToProductDetailFromQR(result);
            closeScanner();
        }
    };

    useEffect(() => {
        if (scannedOnce) {
            closeScanner();
        }
    }, [scannedOnce]);

    const handleAddToProductDetailFromQR = async (result) => {
        try {
            const qrText = result.text;
            const response = await axios.get(
                `http://localhost:8080/api/v1/productDetails/findProductDetailById?id=${qrText}`,
            );
            // Lấy giá trị text từ data

            // console.log('ooooooooooooo' + qrText);
            // Gọi API để lấy thông tin sản phẩm từ QR code
            const productData = response.data;
            // console.log('Product data from QR:', productData);

            // Tiếp tục xử lý, kiểm tra và thêm sản phẩm vào đơn hàng
            if (productData) {
                // Thực hiện thêm sản phẩm vào chi tiết đơn hàng với thông tin từ QR
                const response = await axios.post('http://localhost:8080/api/v1/orderDetails/create', {
                    orderId: id,
                    productDetailId: productData.id,
                    quantity: 1,
                    price: 0,
                    note: '',
                });

                // Tiếp theo, thực hiện các bước cập nhật đơn hàng và state như trong hàm gốc
                if (response.status === 201) {
                    // Cập nhật đơn hàng và state
                    const updatedOrder = await updateOrderDetailsAndState();
                    setScannedOnce(false); // Đặt lại giá trị sau khi xử lý thành công
                    loadOrderDetails();
                    loadOrder();
                } else {
                    console.error('Có lỗi xảy ra khi thêm sản phẩm vào đơn hàng');
                }
            } else {
                console.error('Không thể lấy thông tin sản phẩm từ QR code');
            }
        } catch (error) {
            console.error('Lỗi khi xử lý dữ liệu từ QR code:', error);
        }
    };

    // Hàm cập nhật đơn hàng và state
    const updateOrderDetailsAndState = async () => {
        // Cập nhật đơn hàng và state
        const orderResponse = await axios.get(`http://localhost:8080/api/v1/orders/findOrderById?id=${id}`);
        if (orderResponse.status === 200) {
            const order = orderResponse.data;
            console.log('Updated order:', order);
            // Tính toán giảm giá và tổng tiền sau giảm từ order
            const discountRate = order.voucher ? order.voucher.discountRate : 0;
            const orderTotalInitial = order.orderTotalInitial;
            const giamGia = (orderTotalInitial * discountRate) / 100;
            const orderTotal = orderTotalInitial - giamGia;
            // Cập nhật state để hiển thị trên giao diện

            const updateOrderResponse = await axios.put(`http://localhost:8080/api/v1/orders/update?id=${id}`, {
                voucherId: order.voucher ? order.voucher.id : null,
                orderTotal: orderTotal,
                customerId: order.customer ? order.customer.id : null,
                discountMoney: giamGia,
                orderTotalInitial: orderTotalInitial,
                deliveryId: '',
                paymentId: selectedPaymentId,
                addressId: '',
                statusId: 1,
                note: note,
                orderTypeId: 3,
            });
            setOrderTotal(orderTotal);
            setOrderTotalInitial(orderTotalInitial);
            setDiscountMoney(giamGia);
            return order;
        } else {
            console.error('Có lỗi xảy ra khi lấy thông tin order');
            return null;
        }
    };
    const [isDeliveryEnabled, setDeliveryEnabled] = useState(false);

    const handleSwitchChange = (checked) => {
        setDeliveryEnabled(checked);
    };


    ////phần user//////////

    const [loading, setLoading] = useState(false);
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

    const [open, setOpen] = useState({ isModal: false, isMode: '', reacord: null });

    const showModall = (mode, record) => {
        setOpen({
            isModal: true,
            isMode: mode,
            reacord: record,
        });
    };

    const hideModal = () => {
        setOpen({ isModal: false });
    };

    const [users, setUsers] = useState([]);

    const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });

    const [deleted, setDeleted] = useState(null);

    const [searchName, setSearchName] = useState(null);

    const [searchPhone, setSearchPhone] = useState(null);

    const [searchEmail, setSearchEmail] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);

        await UserService.getAllUserByRole(pagination.current - 1, pagination.pageSize, searchName, searchPhone, searchEmail, deleted)
            .then(response => {

                setUsers(response.data);
                console.log(response.data)
                setPagination({
                    ...pagination,
                    total: response.totalCount,
                });
                setLoading(false);

            }).catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        fetchUsers();
    }, [pagination.current, pagination.pageSize, searchName, searchPhone, searchEmail, deleted]);


    const handleDelete = async (id) => {

        await UserService.delete(id).then(response => {
            console.log(response.ata);
            notification.success({
                message: 'Thông báo',
                description: 'Xử lý thành công!',
            });
            fetchUsers();
        }).catch(error => {
            console.error(error);
            notification.error({
                message: 'Thông báo',
                description: 'Đã lỗi xảy ra!',
            });
        });

    };

    const handleReset = () => {

        setSearchEmail(null);
        setSearchName(null);
        setSearchPhone(null);
        setDeleted(null);

        setPagination({
            ...pagination,
            current: 1,
        });
        handleTableChange(pagination, null)
    };


    const handleTableChange = (pagination, filters) => {
        console.log(filters)
        setPagination({
            ...pagination,
        });

        const searchNameFilter = filters?.userName;
        if (searchNameFilter) {
            setSearchName(searchNameFilter[0]);
        } else {
            setSearchName(null)
        }

        const searchPhoneFilter = filters?.phoneNumber;
        if (searchPhoneFilter) {
            setSearchPhone(searchPhoneFilter[0]);
        } else {
            setSearchPhone(null)
        }

        const searchEmailFilter = filters?.email;
        if (searchEmailFilter) {
            setSearchEmail(searchEmailFilter[0]);
        } else {
            setSearchEmail(null)
        }

        const statusFilter = filters?.deleted;
        const isNoStatusFilter = !statusFilter || statusFilter.length === 0;

        if (!isNoStatusFilter) {
            const isBothStatus = statusFilter.length === 2;

            setDeleted(isBothStatus ? null : statusFilter[0]);
        } else {
            setDeleted(null);
        }
    };

    const getColumnSearchProps = (dataIndex) => ({
        filteredValue: dataIndex === 'userName' ? [searchName] : dataIndex === 'phoneNumber' ? [searchPhone] : [searchEmail],
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
            <Input.Search
                placeholder={`Nhập từ khóa...`}
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onSearch={(value) => {
                    setSelectedKeys(value ? [value.trim()] : []);
                    confirm();
                }}
                style={{ display: 'block' }}
            />
        ),
    });

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
            filterIcon: <SearchOutlined style={{ fontSize: '14px', color: 'rgb(158, 154, 154)' }} />,
            ...getColumnSearchProps('userName')
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: '15%',
            filterIcon: <SearchOutlined style={{ fontSize: '14px', color: 'rgb(158, 154, 154)' }} />,
            ...getColumnSearchProps('phoneNumber')
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '15%',
            filterIcon: <SearchOutlined style={{ fontSize: '14px', color: 'rgb(158, 154, 154)' }} />,
            ...getColumnSearchProps('email')
        },
        // {
        //     title: 'Giới tính',
        //     dataIndex: 'gender',
        //     key: 'gender',
        //     width: '10%',
        //     render: (text) => {
        //         return text !== null ? (text === true ? "Nam" : "Nữ") : '';
        //     },
        // },
        // {
        //     title: 'Ngày sinh',
        //     dataIndex: 'birthOfDay',
        //     key: 'birthOfDay',
        //     width: '10%',

        // },
        // {
        //     title: 'Ngày tạo',
        //     dataIndex: 'createdAt',
        //     key: 'createdAt',
        //     width: '15%',
        // },
        {
            title: 'Trạng thái',
            key: 'deleted',
            dataIndex: 'deleted',
            width: '10%',
            filters: [
                {
                    text: 'Hoạt động',
                    value: true,
                },
                {
                    text: 'Tạm khóa',
                    value: false,
                },
            ],
            onFilter: (value, record) => record.deleted === value,
            render: (text) => (
                text ? <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="#108ee9">Hoạt động</Tag>
                    : <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="#f50">Tạm khóa</Tag>
            )
        },
        {
            title: 'Hành động',
            key: 'action',
            width: '10%',
            render: (record) => {

                return <Space size="middle" >
                    <Button type="text"
                        icon={<FormOutlined style={{ color: 'rgb(214, 103, 12)' }} />}
                        onClick={() => showModall("edit", record)} />
                    <Popconfirm
                        title={record.deleted ? "Khóa tài khoản" : "Mở khóa tài khoản"}
                        description={record.deleted ? "Bạn có chắc muốn khóa tài khoản này không?" : "Bạn có chắc muốn mở lại tài khoản này không?"}
                        placement="leftTop"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Đồng ý"
                        cancelText="Hủy bỏ"
                    >
                        <Button
                            type="text"
                            icon={record.deleted ? <PiLockKeyOpenFill style={{ color: '#7859f2', fontSize: '17px' }} /> : <PiLockKeyFill style={{ color: '#7859f2', fontSize: '17px' }} />}
                        />
                    </Popconfirm>
                    <Button type="text"
                        icon={<FaMapMarkedAlt />}
                        style={{ color: '#5a76f3', fontSize: '16px' }}
                        onClick={() => showAddressModal(record)}
                    />
                    <Button
                        type="text"
                        icon={<PlusSquareOutlined style={{ color: 'rgb(214, 103, 12)' }} />}
                        onClick={() => layidUSer(record.id)} />

                </Space>
            }
        },
    ];

    <ConfigProvider
        theme={{
            token: {
                // Seed Token
                colorPrimary: 'red',
                borderRadius: 2,
            },
        }}
    ></ConfigProvider>

    ////phần user//////////

    return (
        <>
            <Modal open={isModalQuantityOpen} onOk={handleOkQuantity} onCancel={handleCancelQuantity}>
                {selectedProduct && (
                    <div>
                        <h6>Số lượng sản phẩm ({selectedProduct.quantity})</h6>
                        {/* Thêm các thông tin khác của sản phẩm nếu cần */}
                        <InputNumber defaultValue={1} onChange={(value) => setQuantity(value)} />
                    </div>
                )}
            </Modal>

            <Modal title="Danh sách Khách hàng"
                open={isModalUserOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
                footer={null}>
                <>
                    <h3 style={{ marginBottom: '16px', float: 'left', color: '#2123bf' }}>Danh sách tài khoản</h3>

                    <Button type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => showModall("add")}
                        style={{ marginBottom: '16px', float: 'right', borderRadius: '2px' }} >
                        Thêm mới
                    </Button>

                    <Button type="primary"
                        icon={<RedoOutlined style={{ fontSize: '18px' }} />}
                        style={{ marginBottom: '16px', float: 'right', marginRight: '6px', borderRadius: '4px', }}
                        onClick={handleReset}
                    />

                    <Table
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
                        fetchUsers={fetchUsers} />}


                    {addressModal.isModal && <ShowAddressModal
                        reacord={addressModal.reacord}
                        hideModal={hideAddressModal}
                        isModal={addressModal.isModal}
                    />}

                </>
            </Modal>

            <Modal
                title="Danh sách sản phẩm"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
                footer={null}
            >
                <Row gutter={[10]} justify="center">
                    <Col className="gutter-row" span={8} style={{ textAlign: 'center' }}>
                        <label>Tên sản phẩm</label>
                    </Col>
                    <Col className="gutter-row" span={8} style={{ textAlign: 'center' }}>
                        <label>Kích cỡ</label>
                    </Col>
                    <Col className="gutter-row" span={8} style={{ textAlign: 'center' }}>
                        <label>Màu sắc</label>
                    </Col>

                    <Col className="gutter-row" span={8} style={{ textAlign: 'center' }}>
                        <AutoComplete
                            style={{
                                width: 200,
                            }}
                            options={null}
                            placeholder="Tìm kiếm sản phẩm theo tên"
                            filterOption={(inputValue, option) =>
                                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                        />
                    </Col>
                    <Col className="gutter-row" span={8} style={{ textAlign: 'center' }}>
                        <Select
                            style={{
                                width: 200,
                            }}
                            showSearch
                            allowClear
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={null}
                            onSearch={null}
                            filterOption={filterOption}
                            options={[
                                {
                                    value: 'jack',
                                    label: 'Jack',
                                },
                                {
                                    value: 'lucy',
                                    label: 'Lucy',
                                },
                                {
                                    value: 'tom',
                                    label: 'Tom',
                                },
                            ]}
                        />
                    </Col>
                    <Col className="gutter-row" span={8} style={{ textAlign: 'center' }}>
                        <Select
                            style={{
                                width: 200,
                            }}
                            showSearch
                            allowClear
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={null}
                            onSearch={null}
                            filterOption={filterOption}
                            options={[
                                {
                                    value: 'jack',
                                    label: 'Jack',
                                },
                                {
                                    value: 'lucy',
                                    label: 'Lucy',
                                },
                                {
                                    value: 'tom',
                                    label: 'Tom',
                                },
                            ]}
                        />
                    </Col>
                </Row>
                <Row justify={'center'}>
                    <Col className="gutter-row" span={12} style={{ textAlign: 'center' }}>
                        <label>Thương hiệu</label>
                    </Col>
                    <Col className="gutter-row" span={12} style={{ textAlign: 'center' }}>
                        <label>Câu lập bộ</label>
                    </Col>
                    <Col className="gutter-row" span={12} style={{ textAlign: 'center' }}>
                        <Select
                            style={{
                                width: 200,
                            }}
                            showSearch
                            allowClear
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={null}
                            onSearch={null}
                            filterOption={filterOption}
                            options={[
                                {
                                    value: 'jack',
                                    label: 'Jack',
                                },
                                {
                                    value: 'lucy',
                                    label: 'Lucy',
                                },
                                {
                                    value: 'tom',
                                    label: 'Tom',
                                },
                            ]}
                        />
                    </Col>
                    <Col className="gutter-row" span={12} style={{ textAlign: 'center' }}>
                        <Select
                            style={{
                                width: 200,
                            }}
                            showSearch
                            allowClear
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={null}
                            onSearch={null}
                            filterOption={filterOption}
                            options={[
                                {
                                    value: 'jack',
                                    label: 'Jack',
                                },
                                {
                                    value: 'lucy',
                                    label: 'Lucy',
                                },
                                {
                                    value: 'tom',
                                    label: 'Tom',
                                },
                            ]}
                        />
                    </Col>
                </Row>
                <Row gutter={[8, 24]} justify="center" style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <Col>
                        <Button type="primary" icon={<ReloadOutlined />}>
                            Làm mới
                        </Button>
                    </Col>
                    <Col>
                        <Button type="primary" icon={<SearchOutlined />}>
                            Tìm kiếm
                        </Button>
                    </Col>
                </Row>
                <Table
                    key={productDetails.length} // Thay đổi key khi có sự thay đổi trong productDetails
                    columns={columnProduct}
                    dataSource={productDetails}
                    pagination={{
                        pageSize: 50,
                    }}
                    scroll={{
                        y: 240,
                    }}
                />
            </Modal>
            <div>
                <div className="name">
                    <label className="tieu-de">Đơn hàng</label>
                    <Button type="primary" icon={<QrcodeOutlined />} style={{ float: 'right' }} onClick={openScanner}>
                        QR Code
                    </Button>

                    {/* QR Code scanner modal */}
                    <Modal visible={showScanner} onCancel={closeScanner} footer={null} width={300} centered>
                        {showScanner && (
                            <QrReader
                                delay={4000}
                                onError={handleError}
                                onScan={handleScan}
                                onResult={handleResult}
                                style={{ width: '100%' }}
                            />
                        )}
                    </Modal>

                    <Button
                        type="primary"
                        onClick={showModal}
                        icon={<PlusOutlined />}
                        style={{ float: 'right', marginRight: '5px' }}
                    >
                        Thêm sản phẩm
                    </Button>
                </div>
                <div
                    style={{
                        margin: '40px 10px ',
                        padding: 14,
                        minHeight: 280,
                        border: '1px solid #ccc', // Thêm viền với màu xám nhạt
                        boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', // Thêm bóng với độ mờ
                        background: colorBgContainer,
                    }}
                >
                    <div className="tieu-de" style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                        Giỏ hàng
                    </div>
                    <Table
                        columns={columnCart}
                        dataSource={orderDetails}
                        pagination={{
                            pageSize: 50,
                        }}
                        scroll={{
                            y: 240,
                        }}
                    />
                    <h3>Tổng tiền: {formatCurrency(orderTotalInitial)} VND</h3>

                    {/* table hóa đơn chi tiết */}
                </div>
                <div
                    style={{
                        margin: '40px 10px ',
                        padding: 14,
                        minHeight: 280,
                        border: '1px solid #ccc',
                        boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                        background: colorBgContainer,
                    }}
                >
                    <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                        <Row gutter={[8, 8]}>
                            <Col span={8}>
                                <label className="tieu-de">Thông tin khách hàng</label>
                            </Col>
                            <Col span={8}>
                                {/* {console.log('Customer Name:', selectedCustomer.customerName)} */}
                                {selectedCustomer && showSuccessAlertCustonmer && (
                                    <Alert
                                        message={
                                            <h7
                                                style={{
                                                    height: '20px',
                                                    width: '370px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >{`Chọn thành công khách hàng "${selectedCustomer.usersName}"`}</h7>
                                        }
                                        type="success"
                                        closable
                                        onClose={handleAlertClose} // Gọi hàm xử lý khi đóng alert
                                        style={{ marginLeft: '10px' }}
                                    />
                                )}
                            </Col>
                            <Col span={8}>
                                <Button
                                    type="primary"
                                    icon={<PlusCircleFilled />}
                                    onClick={userModel}
                                    style={{ float: 'right', marginLeft: '5px' }}
                                >
                                    Chọn khách hàng
                                </Button>

                                {/* Hiển thị thông tin khách hàng đã chọn */}
                                <AutoComplete
                                    key={autoCompleteOptionsKey}
                                    ref={autoCompleteRef}
                                    style={{
                                        width: 200,
                                        float: 'right',
                                        marginLeft: '5px',
                                    }}
                                    options={customerOptions || []}
                                    placeholder="Chọn khách hàng"
                                    filterOption={(inputValue, option) =>
                                        option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                    onSelect={handleCustomerSelect}
                                />
                            </Col>
                        </Row>
                    </div>
                    {/* {console.log('Selected Customer ID:', selectedCustomerId)}
                    {console.log('Selected Customer:', selectedCustomer)} */}
                    {selectedCustomer && (
                        <>
                            <p>{`Tên: ${selectedCustomer.usersName}`}</p>
                            <p>{`Email: ${selectedCustomer.email}`}</p>
                            <p>{`Số điện thoại: ${selectedCustomer.phoneNumber}`}</p>
                            {/* Thêm các trường khác nếu cần */}
                        </>
                    )}
                    {!selectedCustomer && <p>Khách hàng lẻ</p>}
                </div>

                <div
                    style={{
                        margin: '10px 10px ',
                        padding: 14,
                        minHeight: 280,
                        border: '1px solid #ccc', // Thêm viền với màu xám nhạt
                        boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', // Thêm bóng với độ mờ
                        background: colorBgContainer,
                    }}
                >
                    <div className="tieu-de" style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                        Khách hàng
                    </div>
                    <Row>
                        <Col span={16}>
                            {isDeliveryEnabled && (
                                <Row gutter={[8, 16]}>
                                    <Col span={12}>
                                        <div className="col-md-12">
                                            <label for="validationCustom01" className="form-label">
                                                Họ và tên
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="validationCustom01"
                                                required
                                            />
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div className="col-md-12">
                                            <label for="validationCustom01" className="form-label">
                                                Số điện thoại
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="validationCustom01"
                                                required
                                            />
                                        </div>
                                    </Col>
                                    <Col span={8}>
                                        <div className="col-md-12">
                                            <label for="validationCustom01" className="form-label">
                                                Tỉnh/Thành phố
                                            </label>
                                            <br />
                                            <Select
                                                defaultValue="lucy"
                                                style={{
                                                    width: '100%',
                                                }}
                                                allowClear
                                                options={[
                                                    {
                                                        value: 'lucy',
                                                        label: 'Lucy',
                                                    },
                                                ]}
                                            />
                                        </div>
                                    </Col>
                                    <Col span={8}>
                                        <div className="col-md-12">
                                            <label for="validationCustom01" className="form-label">
                                                Quận/huyện
                                            </label>
                                            <br />
                                            <Select
                                                defaultValue="lucy"
                                                style={{
                                                    width: '100%',
                                                }}
                                                allowClear
                                                options={[
                                                    {
                                                        value: 'lucy',
                                                        label: 'Lucy',
                                                    },
                                                ]}
                                            />
                                        </div>
                                    </Col>
                                    <Col span={8}>
                                        <div className="col-md-12">
                                            <label for="validationCustom01" className="form-label">
                                                Xã/phường/thị trấn
                                            </label>
                                            <br />
                                            <Select
                                                defaultValue="lucy"
                                                style={{
                                                    width: '100%',
                                                }}
                                                allowClear
                                                options={[
                                                    {
                                                        value: 'lucy',
                                                        label: 'Lucy',
                                                    },
                                                ]}
                                            />
                                        </div>
                                    </Col>
                                    <Col span={14}>
                                        <div className="col-md-12">
                                            <label for="validationCustom01" className="form-label">
                                                Địa chỉ cụ thể
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="validationCustom01"
                                                required
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            )}
                        </Col>
                        <Col span={8}>
                            {/* <h5>
                                <ShopOutlined /> Thông tin thanh toán
                            </h5> */}
                            <Row gutter={[20, 8]}>
                                <Col span={24}>
                                    <Switch onChange={handleSwitchChange} /> Giao Hàng
                                </Col>
                                <Col span={24}>
                                    {' '}
                                    <AutoComplete
                                        style={{
                                            width: '100%',
                                            // float: 'right',
                                            // marginLeft: '5px',
                                        }}
                                        value={autoCompleteValue} // Thay vì selectedVoucherId
                                        onSelect={handleVoucherSelect}
                                        // onChange={(value) => handleVoucherSearch(value)}
                                        options={voucherOptions}
                                        allowClear={{
                                            clearIcon: <CloseSquareFilled />,
                                        }}
                                        placeholder="Chọn voucher"
                                        filterOption={(inputValue, option) =>
                                            typeof option.label === 'string' &&
                                            option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                        }
                                    />
                                </Col>
                                <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Tạm tính:</span>
                                    <span style={{ float: 'right', textAlign: 'center' }}>
                                        {formatCurrency(orderTotalInitial)} đ
                                    </span>
                                </Col>

                                <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Giảm giá:</span>
                                    <span style={{ float: 'right', textAlign: 'center' }}>
                                        {formatCurrency(disCountMoney)} đ
                                    </span>
                                </Col>
                                {selectedVoucher && showSuccessAlert && (
                                    <Alert
                                        message={
                                            <h7
                                                style={{
                                                    height: '20px',
                                                    width: '100%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    // justifyContent: 'center',
                                                }}
                                            >{`Chọn thành công voucher "${selectedVoucher.voucherName}"`}</h7>
                                        }
                                        type="success"
                                        // showIcon
                                        closable
                                        onClose={() => setShowSuccessAlert(false)}
                                        style={{ marginLeft: '10px' }}
                                    />
                                )}
                                <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Tổng số tiền:</span>
                                    <span style={{ float: 'right', textAlign: 'center', color: 'red' }}>
                                        {formatCurrency(orderTotal)} đ
                                    </span>
                                </Col>
                                <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Input
                                        type="number"
                                        size="default size"
                                        placeholder="Nhập tiền khách đưa"
                                        value={customerPayment}
                                        onChange={(e) => {
                                            setCustomerPayment(e.target.value);
                                            setCanCreateOrder(false); // Reset trạng thái khi giá trị thay đổi
                                        }}
                                    />
                                </Col>
                                {createFinalOrder()}
                                <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Tiền thừa:</span>
                                    <span style={{ float: 'right', textAlign: 'center', color: 'red' }}>
                                        {formatCurrency(
                                            customerPayment >= orderTotal ? customerPayment - orderTotal : 0,
                                        )}{' '}
                                        đ
                                    </span>
                                </Col>
                                <Col span={24}>
                                    <Radio.Group
                                        defaultValue="1"
                                        buttonStyle="solid"
                                        onChange={handlePaymentChange}
                                        style={{
                                            whiteSpace: 'nowrap',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Radio.Button
                                            value="1"
                                            data-id="1"
                                            style={{
                                                width: '210px',
                                                height: '60px',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                textAlign: 'center',
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faCoins}
                                                style={{ color: 'yellow', fontSize: '2em', marginRight: '8px' }}
                                            />
                                            <span style={{ color: 'black', fontSize: '1.5em', lineHeight: '1em' }}>
                                                Tiền mặt
                                            </span>
                                        </Radio.Button>
                                        <Radio.Button
                                            value="2"
                                            data-id="2"
                                            style={{
                                                width: '205px',
                                                height: '60px',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                textAlign: 'center',
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faMoneyCheck}
                                                style={{ color: '', fontSize: '2em', marginRight: '8px' }}
                                            />
                                            <span style={{ color: 'black', fontSize: '1.5em', lineHeight: '1em' }}>
                                                Chuyển khoản
                                            </span>
                                        </Radio.Button>
                                    </Radio.Group>
                                </Col>
                                <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <TextArea
                                        placeholder="Nhập ghi chú"
                                        rows={4}
                                        value={note}
                                        onChange={handleNoteChange}
                                    />
                                </Col>
                                <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button
                                        type="primary"
                                        style={{ width: '100%' }}
                                        disabled={!canCreateOrderButton}
                                        onClick={handleCreateOrder}
                                    >
                                        Tạo đơn hàng
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
}

const UserModal = ({ isMode, reacord, hideModal, isModal, fetchUsers }) => {

    const [form] = Form.useForm();
    // const [roles, setRoles] = useState([]);

    // useEffect(() => {
    //     fetchRoles()
    // }, []);
    // const fetchRoles = async () => {

    //     await RoleService.findAllByDeletedTrue()
    //         .then(response => {

    //             setRoles(response.data)

    //         }).catch(error => {
    //             console.error(error);
    //         })
    // }
    const handleCreate = () => {
        form.validateFields().then(async () => {

            const data = await form.getFieldsValue();
            data.role = "USER";
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
    const handleUpdate = () => {
        form.validateFields().then(async () => {

            const data = await form.getFieldsValue();

            await UserService.update(reacord.id, data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Cập nhật thành công!',
                    });
                    fetchUsers();
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

        <Modal
            width={650}
            title={isMode === "edit" ? "Cập nhật tài khoản người dùng" : "Thêm mới một tài khoản người dùng"}
            open={isModal}
            onOk={isMode === "edit" ? handleUpdate : handleCreate}
            onCancel={hideModal}
            okText={isMode === "edit" ? "Cập nhật" : "Thêm mới"}
            cancelText="Hủy bỏ"
        >
            <Form
                name="wrap"
                labelCol={{ flex: '110px' }}
                labelAlign="left"
                labelWrap
                wrapperCol={{ flex: 1 }}
                colon={false}
                style={{ maxWidth: 600, marginTop: '25px' }}
                form={form}
                initialValues={{
                    ...reacord,
                    ...(reacord?.birthOfDay && { birthOfDay: dayjs(reacord.birthOfDay, "DD/MM/YYYY") }),
                }}
            >
                <Form.Item label="Tên:" name="userName" rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản!' }]}>
                    <Input placeholder="Nhập tên người dùng..." />
                </Form.Item>

                <Form.Item label="Email:" name="email" rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
                    <Input placeholder="Nhập email..." />
                </Form.Item>

                <Form.Item label="Số điện thoại:" name="phoneNumber" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
                    <Input placeholder="Nhập số điện thoại..." />
                </Form.Item>
                <Row>
                    <Col span={12}>
                        <Form.Item label="Ngày sinh:" name="birthOfDay" rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}>
                            <DatePicker placeholder="Chọn ngày sinh" style={{ width: '100%' }} format="DD/MM/YYYY" />
                        </Form.Item>
                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={11}>
                        <Form.Item label="Giới tính:" name="gender" initialValue={true} rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}>
                            <Radio.Group name="radiogroup" style={{ float: 'left' }}>
                                <Radio value={true}>Nam</Radio>
                                <Radio value={false}>Nữ</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
                {isMode === "add" && <Form.Item label="Mật khẩu:" name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
                    <Input type="password" placeholder="Nhập tên mật khẩu..." />
                </Form.Item>}
                <Form.Item label="Trạng thái:" name="deleted" initialValue={true} rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản!' }]} >
                    <Radio.Group name="radiogroup" style={{ float: 'left' }}>
                        <Radio value={true}>Hoạt động</Radio>
                        <Radio value={false}>Tạm khóa</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    );
};