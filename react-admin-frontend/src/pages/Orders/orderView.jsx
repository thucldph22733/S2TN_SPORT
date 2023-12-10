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
    Tabs,
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
} from 'antd';
import { useState } from 'react';
import {
    CloseSquareFilled,
    DeleteOutlined,
    EuroCircleOutlined,
    PlusCircleFilled,
    PlusOutlined,
    QrcodeOutlined,
    ReloadOutlined,
    SearchOutlined,
    ShopOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import Search from 'antd/es/input/Search';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import { Timeline, TimelineEvent } from '@mailtop/horizontal-timeline';
import { FaBug, FaRegCalendarCheck, FaRegFileAlt } from 'react-icons/fa';
import { Scrollbars } from 'react-custom-scrollbars';
import FormatDate from '~/utils/format-date';
export default function OrderView() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { id } = useParams();
    const [order, setOrder] = useState({}); // Bạn có thể điều chỉnh cấu trúc của order theo nhu cầu
    const [timeLine, setTimeLine] = useState([]); // Bạn có thể điều chỉnh cấu trúc của order theo nhu cầu
    const [timeLines, setTimeLines] = useState([]); // Bạn có thể điều chỉnh cấu trúc của order theo nhu cầu
    const [productDetails, setProductDetails] = useState([]);

    useEffect(() => {
        loadOrder();
        findAllTimeLineByOrderId();
        loadTimeLine();
        loadOrderDetails();
    }, []);

    const loadOrder = async () => {
        const result = await axios.get(`http://localhost:8080/api/v1/orders/findOrderById?id=${id}`);
        setOrder(result.data);
    };
    const loadTimeLine = async () => {
        const result = await axios.get(`http://localhost:8080/api/v1/timeline/findByOrderIdAndStatus?id=${id}`);
        setTimeLines(result.data);
    };
    const findAllTimeLineByOrderId = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/api/v1/timeline/findAllTimelineByOrderId?id=${id}`);
            const convertedTimeline = result.data.map((event) => ({
                title: getStatusTitle(event.status),
                subtitle: FormatDate(event.createdAt),
                color: getStatusColor(event.status),
                icon: getIconByStatus(event.status),
            }));
            setTimeLine(convertedTimeline);
        } catch (error) {
            console.error('Error fetching timeline:', error);
        }
    };

    const getStatusTitle = (status) => {
        // Logic chuyển đổi status sang title tương ứng
        // Ví dụ:
        if (status === 1) {
            return 'Tạo hóa đơn';
        } else if (status === 2) {
            return 'Đã thanh toán';
        }
        return 'Khác';
    };



    const getStatusColor = (status) => {
        // Logic chuyển đổi màu sắc tùy thuộc vào status
        // Ví dụ:
        return status === 1 ? 'green' : '#87a2c7';
    };

    const getIconByStatus = (status) => {
        // Logic chuyển đổi biểu tượng tùy thuộc vào status
        // Ví dụ:
        return status === 1 ? FaRegFileAlt : FaRegCalendarCheck;
    };

    const formatCurrency = (amount) => {
        const roundedAmount = Math.floor(amount);
        const formattedAmount = new Intl.NumberFormat('vi-VN').format(roundedAmount);
        return `${formattedAmount.replace('.', ',')} đ`;
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
                setProductDetails(updatedOrderDetails);
                // loadCustomerById();
            } else {
                console.error('Đơn hàng đang trống');
            }
        } catch (error) {
            console.error('Error loading order details:', error);
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
            title: 'Số tiền',
            dataIndex: '',
            width: 60,
            render: (text, record) => <span style={{ color: 'red' }}>{formatCurrency(order.orderTotal)}</span>,
        },
        {
            title: 'Thời gian',
            dataIndex: 'createdAt',
            width: 100,
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: '',
            width: 60,
            render: (text, record) => order.payment.paymentName
        },
        {
            title: 'Nhân viên xác nhận',
            dataIndex: 'createdBy',
            width: 60,
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
            width: 60,
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
            title: 'Ảnh',
            dataIndex: '',
            width: 80,
            render: (record) => (
                <Row gutter={[5]}>
                    <Col span={12}>
                        <Image width={150} height={100} src={record.productAvatar} alt="Avatar" />
                    </Col>
                </Row>
            ),
        },
        {
            title: 'Sản phẩm',
            dataIndex: '',
            width: 110,
            render: (record) => (
                <Row>
                    <Col span={16}>
                        <h5>
                            {record.productName} [{record.colorName} - {record.sizeName}]
                        </h5>
                    </Col>
                    <Col span={16}>
                        <h6>
                            Đơn giá: <span style={{ color: 'red' }}>{formatCurrency(record.priceSecond)}</span>
                        </h6>
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
            title: 'Tổng tiền',
            dataIndex: 'price',
            width: 50,
            render: (text, record) => ({
                children: formatCurrency(record.price),
                props: {
                    style: { color: 'red' }, // Màu sắc bạn muốn đặt
                },
            }),
        },
    ];
    return (
        <>
            {/* <div
                style={{
                    margin: '40px 10px ',
                    padding: 14,
                    minHeight: 280,
                    border: '1px solid #ccc', // Thêm viền với màu xám nhạt
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', // Thêm bóng với độ mờ
                    background: colorBgContainer,
                }}
            > */}
            <div style={{ marginBottom: '40px' }}>
                <Scrollbars
                    autoHide={false}
                    style={{
                        display: 'flex',
                        height: '240px',
                        flexWrap: 'nowrap',
                        overflowX: 'scroll',
                    }}
                >
                    <Timeline minEvents={9} placeholder>
                        {timeLine.map((event, index) => (
                            <TimelineEvent
                                key={index}
                                style={{ display: 'inline-block', marginRight: '20px' }}
                                color={event.color}
                                icon={event.icon}
                                title={event.title}
                                subtitle={event.subtitle}
                            />
                        ))}
                    </Timeline>
                </Scrollbars>
            </div>

            <div style={{ borderBottom: '2px solid black', fontWeight: 'bolder' }}>
                <h4><b>Thông tin đơn hàng</b></h4>
            </div>
            <Row gutter={16} style={{ marginBottom: '40px' }}>
                <Col span={8}>
                    <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Trạng thái</span>
                        <span style={{ float: 'right', textAlign: 'center', color: 'red' }}>
                            {order.orderStatus && order.orderStatus.statusName}
                        </span>
                    </Col>

                    <br />
                    <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Loại đơn hàng</span>
                        <span style={{ float: 'right', textAlign: 'center', color: 'red' }}>
                            {order.orderType && order.orderType.orderTypeName}
                        </span>
                    </Col>
                    <br />
                    <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Tổng tiền</span>
                        <span style={{ float: 'right', textAlign: 'center', color: 'red' }}>
                            {formatCurrency(order.orderTotal)}
                        </span>
                    </Col>
                </Col>
                <Col span={8}>
                    <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Mã đơn hàng</span>
                        <span style={{ float: 'right', textAlign: 'center', color: 'red' }}>#HD{order.id}</span>
                    </Col>
                    <br />
                    <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Khách hàng</span>
                        <span style={{ float: 'right', textAlign: 'center', color: 'red' }}>
                            {order.customer && order.customer.customerName}
                            {!order.customer && <p>Khách lẻ</p>}
                        </span>
                    </Col>
                </Col>
                <Col span={8}>
                    <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Số điện thoại</span>
                        <span style={{ float: 'right', textAlign: 'center', color: 'red' }}>
                            {order.customer && order.customer.phoneNumber}
                            {!order.customer && <p>Không có</p>}
                        </span>
                    </Col>
                    <br />
                    <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>địa chỉ</span>
                        <span style={{ float: 'right', textAlign: 'center', color: 'red' }}>
                            {order.customer && order.customer.address}
                            {!order.customer && <p>Không có</p>}
                        </span>
                    </Col>
                </Col>
            </Row>
            <div style={{ borderBottom: '2px solid black' }}>
                <h4><b>Lịch sử thanh toán</b></h4>
            </div>
            <Table
                columns={columnCart}
                dataSource={timeLines.map((tl, index) => ({
                    ...tl,

                    createdAt: FormatDate(tl.createdAt),

                }))}
                pagination={{
                    pageSize: 50,
                }}
                scroll={{
                    y: 240,
                }}
            />
            <div style={{ borderBottom: '2px solid black' }}>
                <h4><b>Sản phẩm</b></h4>
            </div>
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
            {/* </div> */}
        </>
    );
}
