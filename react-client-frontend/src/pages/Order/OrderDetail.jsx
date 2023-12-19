import React, { useState, useEffect } from 'react';
import {
    Table,
    Image,
    Tag,
    Button,
    Descriptions
} from 'antd';
import { Link, useParams } from 'react-router-dom';
import { Timeline, TimelineEvent } from '@mailtop/horizontal-timeline';
import { FaBox, FaMinus, FaRegCalendarCheck, FaRegFileAlt, FaTruck, FaTruckLoading } from 'react-icons/fa';
import FormatDate from '~/utils/format-date';
import OrderHistoryService from '~/service/OrderHistoryService';
import OrderService from '~/service/OrderService';
import { DoubleLeftOutlined } from '@ant-design/icons';
import path_name from '~/core/constants/routers';
import OrderDetailService from '~/service/OrderDetailService';
import formatCurrency from '~/utils/format-currency';

export default function OrderDetail() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);


    const [timeLines, setTimeLines] = useState([]); // Bạn có thể điều chỉnh cấu trúc của order theo nhu cầu

    useEffect(() => {
        fetchOrder();
        fetchOrderDetail();
        getAllTimeLineByOrderId();
        // loadOrderDetails();
    }, []);

    //----------------------Hóa đơn---------------------------------------------
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
        setLoading(true)
        await OrderDetailService.getOrderDetailByOrderId(pagination.current - 1, pagination.pageSize, id)
            .then(response => {
                const orderDetatilMap = response.data.map((orderDetail, index) => ({

                    key: index + 1,
                    productName: orderDetail.productDetail.product.productName
                        + ' [ ' + orderDetail.productDetail.color.colorName + ' - ' +
                        orderDetail.productDetail.size.sizeName + ' ] ',
                    price: orderDetail.price,
                    quantity: orderDetail.quantity,
                    total: orderDetail.price * orderDetail.quantity
                }))
                setOrderDetails(orderDetatilMap);
                setPagination({
                    ...pagination,
                    total: response.totalCount,
                });
                setLoading(false)
            }).catch(error => {
                console.error(error);
            })
    };
    const handleTableChange = (pagination) => {
        setPagination({
            ...pagination,
        });

    };
    const columnOrderDetail = [
        {
            title: '#',
            key: 'key',
            dataIndex: 'key',
            width: '5%',
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            width: '15%',
            render: () => (
                <Image width={50} height={50} src="" alt="Avatar" />
            ),
        },
        {
            title: 'Sản phẩm',
            key: 'productName',
            dataIndex: 'productName',
            width: '35%',

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
            width: '15%',
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
    //----------------------------------Lịch sử đơn hàng---------------------------------------------------------------

    const getAllTimeLineByOrderId = async () => {
        OrderHistoryService.getAllTimeLineByOrderId(id).then(response => {
            const convertedTimeline = response.map((event) => ({
                title: event.status.statusName,
                subtitle: FormatDate(event.createdAt),
                color: getStatusColor(event.status.id),
                icon: getIconByStatus(event.status.id),
            }));
            setTimeLines(convertedTimeline);
            console.log('Timeline:', response); // Add this line
        }).catch((error) => {
            console.error('Error fetching timeline:', error);
        })

    };
    const getStatusColor = (status) => {
        // Logic chuyển đổi màu sắc tùy thuộc vào status
        // Ví dụ:
        if (status === 1) {
            return 'green';
        } else if (status === 2) {
            return '#40826D';
        } else if (status === 3) {
            return '#007FFF	';
        } else if (status === 4) {
            return '#FF6600';
        } else if (status === 5) {
            return '#007BA7';
        } else if (status === 6) {
            return 'red';
        }
    };

    const getIconByStatus = (status) => {
        // Logic chuyển đổi biểu tượng tùy thuộc vào status
        // Ví dụ:
        if (status === 1) {
            return FaRegFileAlt;
        } else if (status === 2) {
            return FaTruckLoading;
        } else if (status === 3) {
            return FaBox;
        } else if (status === 4) {
            return FaTruck;
        } else if (status === 5) {
            return FaRegCalendarCheck;
        } else if (status === 6) {
            return FaMinus;
        }
    };
    //-------------------------------------------------------------------------
    const columnPaymentHistory = [
        {
            title: '#',
            dataIndex: 'index',
            width: 50,
            render: (index) => index + 1, // Hiển thị STT bắt đầu từ 1
        },
        {
            title: 'Số tiền',
            dataIndex: '',
            width: 60,
            // render: () => <span style={{ color: 'red' }}>{formatCurrency(order.orderTotal)}</span>,
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
            // render: () => order.payment.paymentName
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
                        <Timeline minEvents={9} placeholder >
                            {timeLines.map((timeLine, index) => (
                                <TimelineEvent
                                    key={index}
                                    // style={{ display: 'inline-block', marginRight: '20px' }}
                                    color={timeLine.color}
                                    icon={timeLine.icon}
                                    title={timeLine.title}
                                    subtitle={timeLine.subtitle}

                                />
                            ))}
                        </Timeline>
                    </div>
                </div>
                <div style={{ borderBottom: '2px solid black', marginBottom: '10px' }}>
                    <h6>THÔNG TIN ĐƠN HÀNG</h6>
                </div>
                <Descriptions
                    size='default'
                    // layout="vertical"
                    // bordered
                    style={{ padding: '0 10px' }}
                >
                    <Descriptions.Item label="Mã đơn hàng" ><p style={{ color: 'red' }}>HD{orders.id}</p> </Descriptions.Item>
                    <Descriptions.Item label="Loại đơn hàng">
                        {orders.orderType && orders.orderType !== "Online" ? <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="processing">Tại quầy</Tag>
                            : <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="success">Online</Tag>}
                    </Descriptions.Item>
                    <Descriptions.Item label="Trạng thái">
                        <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="red">{orders.orderStatus == null ? '' : orders.orderStatus.statusName}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Họ và tên">{orders.recipientName == null ? 'Khách lẻ' : orders.recipientName}</Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">{orders.phoneNumber == null ? 'Không có' : orders.phoneNumber}</Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ">  {orders.ward && orders.district && orders.city
                        ? `${orders.ward} - ${orders.district} - ${orders.city}`
                        : "Không có"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Phí ship">300</Descriptions.Item>
                    <Descriptions.Item label="Giá giảm">{orders.voucher != null ? orders.voucher.discountRate : ''}</Descriptions.Item>
                    <Descriptions.Item label="Tổng tiền">{formatCurrency(orders.orderTotal)}</Descriptions.Item>
                </Descriptions>

                <div style={{ borderBottom: '2px solid black', marginTop: '10px' }}>
                    <h6>LỊCH SỬ THANH TOÁN</h6>
                </div>
                <Table
                    columns={columnPaymentHistory}
                    // dataSource={timeLines.map((tl, index) => ({
                    //     ...tl,
                    //     key: index + 1,
                    //     createdAt: FormatDate(tl.createdAt),

                    // }))}
                    // pagination={{
                    //     pageSize: 50,
                    // }}
                    scroll={{
                        y: 240,
                    }}
                />
                <div style={{ borderBottom: '2px solid black', marginTop: '20px' }}>
                    <h6>SẢN PHẨM</h6>
                </div>
                <Table
                    onChange={handleTableChange}
                    loading={loading}
                    columns={columnOrderDetail}
                    dataSource={orderDetails}
                    pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        defaultPageSize: 5,
                        pageSizeOptions: ['5', '10', '15'],
                        total: pagination.total,
                        showSizeChanger: true,
                    }}></Table >

            </div>
        </>
    );
}
