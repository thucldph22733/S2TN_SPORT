import React, { useState, useEffect } from 'react';
import { Table, Image, Tag, Button, Descriptions } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { Timeline, TimelineEvent } from '@mailtop/horizontal-timeline';
import { FaBox, FaMinus, FaRegCalendarCheck, FaRegFileAlt, FaTruck, FaCheckCircle } from 'react-icons/fa';
import FormatDate from '~/utils/format-date';
import OrderHistoryService from '~/service/OrderHistoryService';
import OrderService from '~/service/OrderService';
import { DoubleLeftOutlined } from '@ant-design/icons';
import path_name from '~/core/constants/routers';
import OrderDetailService from '~/service/OrderDetailService';
import formatCurrency from '~/utils/format-currency';
import PaymentService from '~/service/PaymentService';


export default function OrderDetail() {
    const { id } = useParams();

    //----------------------------------Lịch sử đơn hàng---------------------------------------------------------------
    const [timeLines, setTimeLines] = useState([]);

    const getAllTimeLineByOrderId = async () => {
        OrderHistoryService.getAllTimeLineByOrderId(id).then(response => {
            // Lọc các sự kiện có trạng thái là "Hoàn thành"
            const filteredTimeline = response.filter(event => event.status.statusName !== 'Đã giao hàng');

            // Chuyển đổi các sự kiện còn lại thành định dạng bạn muốn hiển thị
            const convertedTimeline = filteredTimeline.map((event) => ({
                title: event.status.statusName,
                subtitle: FormatDate(event.createdAt),
                color: getStatusColor(event.status.statusName),
                icon: getIconByStatus(event.status.statusName),
            }));

            // Cập nhật state với danh sách đã lọc
            setTimeLines(convertedTimeline);

            console.log('Timeline:', response); // Add this line
        }).catch((error) => {
            console.error('Error fetching timeline:', error);
        });
    };
    // Logic chuyển đổi màu sắc tùy thuộc vào status
    const getStatusColor = (status) => {

        if (status === 'Tạo đơn hàng') {
            return 'green';
        } else if (status === 'Chờ xác nhận') {
            return '#40826D';
        } else if (status === 'Chờ lấy hàng') {
            return '#007FFF	';
        } else if (status === 'Đang vận chuyển') {
            return '#FF6600';
        } else if (status === 'Hoàn thành') {
            return '#7859f2';
        } else if (status === 'Đã hủy') {
            return 'red';
        }
    };
    // Logic chuyển đổi biểu tượng tùy thuộc vào status
    const getIconByStatus = (status) => {

        if (status === 'Tạo đơn hàng') {
            return FaRegFileAlt;
        } else if (status === 'Chờ xác nhận') {
            return FaRegFileAlt;
        } else if (status === 'Chờ lấy hàng') {
            return FaBox;
        } else if (status === 'Đang vận chuyển') {
            return FaTruck;
        } else if (status === 'Hoàn thành') {
            return FaCheckCircle;
        } else if (status === 'Đã hủy') {
            return FaMinus;
        }
    };
    //-------------------------------------------Hóa đơn---------------------------------------------
    const [orders, setOrders] = useState([]);

    const fetchOrder = async () => {
        await OrderService.findOrderById(id)
            .then(response => {

                setOrders(response);

                console.log(response)
            }).catch(error => {
                console.error(error);
            })
    };

    //---------------------------------Hóa đơn chi tiết--------------------------------------------------------
    const [orderDetails, setOrderDetails] = useState([]);

    const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });

    const fetchOrderDetail = async () => {
        await OrderDetailService.getOrderDetailByOrderId(pagination.current - 1, pagination.pageSize, id)
            .then(response => {

                setOrderDetails(response.data);
                setPagination({
                    ...pagination,
                    total: response.totalCount,
                });
                console.log(response.data)

            }).catch(error => {
                console.error(error);
            })
    };

    const handleTableChange = (pagination) => {
        setPagination({
            ...pagination,
        });

    };
    const [payment, setPaymet] = useState([]);
    const fetchPayment = async () => {
        await PaymentService.getAllPaymentByOrdersId(id)
            .then(response => {
                setPaymet(response);
            }).catch(error => {
                console.error(error);
            })
    };
    //-------------------------Load dữ liệu---------------------------------------------
    useEffect(() => {
        fetchOrder();
        fetchOrderDetail();
        getAllTimeLineByOrderId();
        fetchPayment();
    }, []);

    //-------------------------------Colum table--------------------------------------------------
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

            width: '45%',
            render: (record) => (
                <span>{`${record.productName} [${record.colorName} - ${record.sizeName}]`}</span>
            )
        },
        {
            title: 'Đơn giá',
            key: 'price',
            dataIndex: 'price',
            width: '15%',
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
    ];

    //----------------------------------- Hàm  tính tổng tiền hàng-------------------------------------------
    const calculateTotalAmount = () => {
        let totalAmount = 0;
        orderDetails.forEach(item => {
            totalAmount += parseFloat(item.price * item.quantity);
        });
        return totalAmount;
    };
    return (
        <>

            <div style={{ borderBottom: '1px solid #ebebeb' }}>
                <Link to={path_name.order}>
                    <Button type="link" icon={<DoubleLeftOutlined />}>
                        Trở lại
                    </Button>
                </Link>
            </div>



            <div className='container' style={{ marginTop: '10px' }}>
                <div style={{
                    width: '100%',
                    overflowX: 'scroll',
                    marginBottom: '20px'
                }}>
                    <div style={{
                        width: '1100px',
                    }}>
                        <Timeline minEvents={7} placeholder >
                            {timeLines.map((timeLine, index) => (
                                <TimelineEvent
                                    key={index}
                                    color={timeLine.color}
                                    icon={timeLine.icon}
                                    title={timeLine.title}
                                    subtitle={timeLine.subtitle}

                                />
                            ))}
                        </Timeline>
                    </div>
                </div>



                <div style={{ borderBottom: '2px solid black', marginTop: '20px' }}>
                    <h6>SẢN PHẨM</h6>
                </div>
                <Table
                    onChange={handleTableChange}

                    columns={columnOrderDetail}
                    dataSource={orderDetails.map((orderDetail, index) => ({
                        ...orderDetail,
                        key: index + 1,
                        total: orderDetail.price * orderDetail.quantity// Sử dụng ID hoặc một giá trị duy nhất khác
                    }))}
                    pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        defaultPageSize: 5,
                        pageSizeOptions: ['5', '10', '15'],
                        total: pagination.total,
                        showSizeChanger: true,
                    }} />

                <div style={{ borderBottom: '2px solid black', margin: '20px 0 10px 0' }}>
                    <h6>THÔNG TIN ĐƠN HÀNG: <span style={{ color: 'red' }}>HD{orders.id}</span></h6>
                </div>
                <Descriptions
                    size='default'
                    bordered
                    style={{ padding: '10px 10px' }}
                >
                    <Descriptions.Item label="Họ và tên">
                        {orders.recipientName == null ? 'Khách lẻ' : orders.recipientName}
                    </Descriptions.Item>

                    <Descriptions.Item label="Trạng thái">
                        {orders.orderStatus == null ? '' : <Tag color="blue">{orders.orderStatus.statusName}</Tag>}
                    </Descriptions.Item>

                    <Descriptions.Item label="Tổng tiền hàng">
                        {formatCurrency(calculateTotalAmount())}
                    </Descriptions.Item>

                    <Descriptions.Item label="Số điện thoại" >
                        {orders.phoneNumber == null ? 'Không có' : orders.phoneNumber}
                    </Descriptions.Item>

                    <Descriptions.Item label="Loại đơn hàng">
                        {orders.orderType && orders.orderType === "Online" ?
                            <Tag color="purple">Online</Tag> :
                            <Tag color="volcano">Tại quầy</Tag>}
                    </Descriptions.Item>

                    <Descriptions.Item label="Voucher">
                        {formatCurrency(orders.voucher != null ? -orders.voucher.discountRate : 0)}
                    </Descriptions.Item>

                    <Descriptions.Item label="Địa chỉ" span={2}>  {orders.ward && orders.district && orders.city && orders.addressDetail
                        ? `${orders.addressDetail} - ${orders.ward} - ${orders.district} - ${orders.city}`
                        : "Không có"}
                    </Descriptions.Item>

                    <Descriptions.Item label="Phí vận chuyển">
                        {formatCurrency(orders.transportFee)}
                    </Descriptions.Item>

                    <Descriptions.Item label="Phương thức thanh toán:" span={2}>
                        <Tag color="volcano">{payment.paymentMethod == "Chuyển khoản" ? "Thanh toán VNPay" : "Thanh toán khi nhận hàng"}</Tag>
                    </Descriptions.Item>

                    <Descriptions.Item label="Thành tiền">
                        {formatCurrency(orders.orderTotal)}
                    </Descriptions.Item>
                </Descriptions>

            </div>
        </>
    );
}
