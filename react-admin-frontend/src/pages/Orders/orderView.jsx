import React, { useState, useEffect } from 'react';
import {
    Col,
    Row,
    Table,
    Image,
    notification,
    Input,
    Tag,
    Modal,
    Button
} from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Timeline, TimelineEvent } from '@mailtop/horizontal-timeline';
import { FaBox, FaCheck, FaMinus, FaRegCalendarCheck, FaRegFileAlt, FaTruck, FaTruckLoading } from 'react-icons/fa';
import { Scrollbars } from 'react-custom-scrollbars';
import FormatDate from '~/utils/format-date';
import TimeLineService from '~/service/TimeLineService';
import OrderService from '~/service/OrderService';
import { genStatusStyle } from 'antd/es/input/style';
export default function OrderView() {
    const { id } = useParams();
    const [order, setOrder] = useState({}); // Bạn có thể điều chỉnh cấu trúc của order theo nhu cầu
    const [timeLine, setTimeLine] = useState([]); // Bạn có thể điều chỉnh cấu trúc của order theo nhu cầu
    const [timeLines, setTimeLines] = useState([]); // Bạn có thể điều chỉnh cấu trúc của order theo nhu cầu
    const [productDetails, setProductDetails] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
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
            console.log('Timeline:', convertedTimeline); // Add this line
        } catch (error) {
            console.error('Error fetching timeline:', error);
        }
    };


    const getStatusTitle = (status) => {
        // Logic chuyển đổi status sang title tương ứng
        // Ví dụ:
        if (status === 1) {
            return 'Tạo đơn hàng';
        } else if (status === 2) {
            return 'Chờ xác nhận';
        } else if (status === 3) {
            return 'Chờ lấy hàng';
        } else if (status === 4) {
            return 'Chờ giao hàng';
        } else if (status === 5) {
            return 'Hoàn thành';
        } else if (status === 6) {
            return 'Đã hủy';
        }
        return 'Khác';
    };



    const getStatusColor = (status) => {
        // Logic chuyển đổi màu sắc tùy thuộc vào status
        // Ví dụ:
        if (status === 1) {
            return 'green';
        } else if (status === 2) {
            return 'green';
        } else if (status === 3) {
            return 'green';
        } else if (status === 4) {
            return 'green';
        } else if (status === 5) {
            return 'green';
        } else if (status === 6) {
            return 'red';
        }
        return 'Khác';

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
        return 'Khác';
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
            render: (index) => index + 1, // Hiển thị STT bắt đầu từ 1
        },
        {
            title: 'Số tiền',
            dataIndex: '',
            width: 60,
            render: () => <span style={{ color: 'red' }}>{formatCurrency(order.orderTotal)}</span>,
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
            render: () => order.payment.paymentName
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
            dataIndex: 'key',
            width: '5%',
        },
        // {
        //     title: 'Ảnh',
        //     dataIndex: 'image',
        //     width: '20%',
        //     render: (record) => (
        //         <Row gutter={[5]}>
        //             <Col span={12}>
        //                 <Image width={150} height={100} src={record.productAvatar} alt="Avatar" />
        //             </Col>
        //         </Row>
        //     ),
        // },
        {
            title: 'Sản phẩm',
            dataIndex: '',
            width: '35%',
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
            width: '20%',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            width: '20%',
            render: (text, record) => ({
                children: formatCurrency(record.price),
                props: {
                    style: { color: 'red' }, // Màu sắc bạn muốn đặt
                },
            }),
        },
    ];
    const renderStatusButtons = () => {
        if (timeLine.length > 0) {
            const lastEvent = timeLine[timeLine.length - 1];

            if (lastEvent.title === 'Chờ lấy hàng') {
                return (
                    <div>
                        <Button type="primary" onClick={showModal}>
                            Xác nhận
                        </Button>
                        <Button type="primary" onClick={handleCancel}>
                            Hủy
                        </Button>
                    </div>
                );
            }
            if (lastEvent.title === 'Chờ giao hàng') {
                return (
                    <div>
                        <Button type="primary" onClick={showModal}>
                            Xác nhận
                        </Button>
                    </div>
                );
            }
        }

        return null;
    };

    const showModal = () => {
        setModalVisible(true);
    };

    const handleOk = async () => {
        try {
            let statusToUpdate = 2;
            if (timeLine.length > 0) {
                const lastEvent = timeLine[timeLine.length - 1];

                // Kiểm tra lastEvent.title và cập nhật status tùy thuộc vào giá trị đó
                if (lastEvent.title === 'Chờ lấy hàng') {
                    statusToUpdate = 4;
                } else if (lastEvent.title === 'Chờ giao hàng') {
                    statusToUpdate = 5;
                }

                let timelineData = { status: statusToUpdate, orderId: id };

                // Gọi hàm từ service để tạo mới timeline với dữ liệu từ input
                await TimeLineService.create(timelineData)
                    .then(async () => {
                        notification.success({
                            message: 'Thông báo',
                            description: 'Xác nhận thành công',
                        });

                        // Cập nhật trạng thái trong order
                        let orderData = { statusId: statusToUpdate };
                        await OrderService.updateOrderStatus(id, orderData);

                        // Lấy lại danh sách timeline và cập nhật giao diện
                        findAllTimeLineByOrderId();
                        loadTimeLine();
                        loadOrder();
                        setModalVisible(false);
                    })
                    .catch(error => {
                        notification.error({
                            message: 'Thông báo',
                            description: 'Thất bại!',
                        });
                        console.error(error);
                    });

                // Đóng modal
            }
        } catch (error) {
            console.error('Error creating timeline:', error);
            // Xử lý lỗi nếu cần thiết
        }
    };


    const getStatusColors = (statusName) => {
        switch (statusName) {
            case 'Tạo đơn hàng':
                return 'green';
            case 'Chờ xác nhận':
                return 'processing';
            case 'Chờ lấy hàng':
                return 'volcano';
            case 'Chờ giao hàng':
                return 'purple';
            case 'Hoàn thành':
                return 'success';
            case 'Đã hủy':
                return 'red';
            default:
                return 'black'; // Màu mặc định hoặc bạn có thể chọn một màu khác
        }
    };

    const handleClose = () => {
        setModalVisible(false);
    }



    const handleCancel = async () => {
        // Đóng modal nếu ấn nút Hủy
        try {
            let statusToUpdate = 6;
            if (timeLine.length > 0) {
                const lastEvent = timeLine[timeLine.length - 1];

                // Kiểm tra lastEvent.title và cập nhật status tùy thuộc vào giá trị đó
                if (lastEvent.title === 'Chờ lấy hàng') {
                    statusToUpdate = 6;
                }

                let timelineData = { status: statusToUpdate, orderId: id };

                // Gọi hàm từ service để tạo mới timeline với dữ liệu từ input
                await TimeLineService.create(timelineData)
                    .then(async () => {
                        notification.success({
                            message: 'Thông báo',
                            description: 'Đã hủy',
                        });

                        // Cập nhật trạng thái trong order
                        let orderData = { statusId: statusToUpdate };
                        await OrderService.updateOrderStatusCancle(id, orderData);

                        // Lấy lại danh sách timeline và cập nhật giao diện
                        findAllTimeLineByOrderId();
                        loadTimeLine();
                        loadOrder();
                        setModalVisible(false);
                    })
                    .catch(error => {
                        notification.error({
                            message: 'Thông báo',
                            description: 'Thất bại!',
                        });
                        console.error(error);
                    });

                // Đóng modal
            }
        } catch (error) {
            console.error('Error creating timeline:', error);
            // Xử lý lỗi nếu cần thiết
        }
    };


    return (
        <>
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
                {renderStatusButtons()}
            </div>
            <Modal
                title="Xác nhận đơn hàng"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleClose}
            >
                {/* Input trong modal */}
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Nhập thông tin xác nhận"
                />
            </Modal>

            <div style={{ borderBottom: '2px solid black', fontWeight: 'bolder', marginBottom: '10px' }}>
                <h4><b>Thông tin đơn hàng</b></h4>
            </div>
            <Row gutter={[16, 16]}>
                <Col span={8} >
                    <span>Trạng thái</span>
                    <span style={{ float: 'right', textAlign: 'center' }}>
                        {order.orderStatus && (
                            <Tag
                                style={{
                                    borderRadius: '4px',
                                    fontWeight: '450',
                                    padding: '0 4px ',
                                }}
                                color={getStatusColors(order.orderStatus.statusName)}
                            >
                                {order.orderStatus.statusName}
                            </Tag>
                        )}
                    </span>
                </Col>
                <Col span={8} >
                    <span>Mã đơn hàng</span>
                    <span style={{ float: 'right', textAlign: 'center', color: 'red' }}>#HD{order.id}</span>
                </Col>
                <Col span={8} >
                    <span>Số điện thoại</span>
                    <span style={{ float: 'right', textAlign: 'center', color: 'red' }}>
                        {order.phoneNumber}
                        {!order.phoneNumber && <p>Không có</p>}
                    </span>
                </Col>

                <Col span={8} >
                    <span>Loại đơn hàng</span>
                    <span style={{ float: 'right', textAlign: 'center' }}>
                        {order.orderType && order.orderType.orderTypeName === "Tại quầy" ? <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="processing">Tại quầy</Tag>
                            : <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="warning">Online</Tag>}
                    </span>
                </Col>
                <Col span={8} >
                    <span>Khách hàng</span>
                    <span style={{ float: 'right', textAlign: 'center', color: 'red' }}>
                        {order.recipientName}
                        {!order.recipientName && <p>Khách lẻ</p>}
                    </span>
                </Col>
                <Col span={8} >
                    <span>địa chỉ</span>
                    <span style={{ float: 'right', textAlign: 'center', color: 'red' }}>
                        {order.addressDetail && order.ward && order.district && order.city ? (
                            `${order.addressDetail}/${order.ward}/${order.district}/${order.city}`
                        ) : (
                            "Không có"
                        )}
                    </span>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={8} >
                    <span>Tổng tiền</span>
                    <span style={{ float: 'right', textAlign: 'center', color: 'red' }}>
                        {formatCurrency(order.orderTotal)}
                    </span>
                </Col>
                <Col span={8} >

                </Col>
                <Col span={8} >

                </Col>
            </Row>

            <div style={{ borderBottom: '2px solid black' }}>
                <h3><b>Lịch sử thanh toán</b></h3>
            </div>
            <Table
                columns={columnCart}
                dataSource={timeLines.map((tl, index) => ({
                    ...tl,
                    key: index + 1,
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
                <h3><b>Sản phẩm</b></h3>
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
