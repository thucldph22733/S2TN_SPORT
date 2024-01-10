import React, { useState, useEffect } from 'react';
import { Table, Image, Tag, Button, Descriptions, Space, notification, Modal, Form, Col, Row, Radio, Input } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { Timeline, TimelineEvent } from '@mailtop/horizontal-timeline';
import { FaBox, FaMinus, FaRegCalendarCheck, FaRegFileAlt, FaTruck, FaCheckCircle } from 'react-icons/fa';
import FormatDate from '~/utils/format-date';
import OrderHistoryService from '~/service/OrderHistoryService';
import OrderService from '~/service/OrderService';
import { DoubleLeftOutlined } from '@ant-design/icons';
import path_name from '~/constants/routers';
import OrderDetailService from '~/service/OrderDetailService';
import formatCurrency from '~/utils/format-currency';
import TextArea from 'antd/es/input/TextArea';
import PaymentService from '~/service/PaymentService';

export default function OrderDetail() {

    const { id } = useParams();
    //----------------------------------Lịch sử đơn hàng---------------------------------------------------------------

    //Lưu timeline đơn hàng
    const [timeLines, setTimeLines] = useState([]);

    //Lưu lịch sử để load đơn hàng
    const [orderHistories, setOrderHistories] = useState([]);

    const getAllTimeLineByOrderId = async () => {
        OrderHistoryService.getAllTimeLineByOrderId(id).then(response => {

            const convertedTimeline = response.map((event) => ({
                title: event.status.statusName,
                subtitle: FormatDate(event.createdAt),
                color: getStatusColor(event.status.statusName),
                icon: getIconByStatus(event.status.statusName),
            }));

            setTimeLines(convertedTimeline);

            setOrderHistories(response.map((item, index) => (
                {
                    key: index + 1,
                    date: FormatDate(item.createdAt),
                    status: item.status.statusName,
                    createdBy: item.createdBy,
                    note: item.note
                }
            )))

        }).catch((error) => {
            console.error('Lỗi:', error);
        })

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
    //----------------------Hóa đơn---------------------------------------------

    const [orders, setOrders] = useState([]);

    const fetchOrder = async () => {
        await OrderService.findOrderById(id)
            .then(response => {

                setOrders(response);

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

            }).catch(error => {
                console.error(error);
            })
    };
    const handleTableChange = (pagination) => {
        setPagination({
            ...pagination,
        });

    }
    //---------------Thanh toán----------------------------------
    const [payment, setPaymet] = useState([]);
    const fetchPayment = async () => {
        await PaymentService.getAllPaymentByOrdersId(id)
            .then(response => {
                setPaymet(response);
            }).catch(error => {
                console.error(error);
            })
    };
    //------------------Load dữ liệu------------------------------------------

    useEffect(() => {
        fetchOrder();
        fetchOrderDetail();
        getAllTimeLineByOrderId();
        fetchPayment();
    }, []);

    //----------------------------Định nghĩa tên cột load dữ liệu cho bảng-------------------------------------------
    const columnPaymentHistory = [
        {
            title: 'Ngày thanh toán',
            dataIndex: 'paymentDate',
            key: 'paymentDate',
            width: '17%',
            render: (text) => <span>{FormatDate(text)}</span>
        },
        {
            title: 'Số tiền',
            dataIndex: 'amount',
            key: 'amount',
            width: '10%',
            render: (text) => <span style={{ color: 'red' }}>{formatCurrency(text)}</span>,
        },
        {
            title: 'PT thanh toán',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            width: '10%',
            render: (text) => <Tag color="green" >{text}</Tag>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: '15%',
            render: (text) => <span style={{ color: 'red', fontWeight: '600' }}>{text}</span>
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
            key: 'note',
            width: '15%',
        },
        {
            title: 'Nhân viên xác nhận',
            dataIndex: 'createdBy',
            key: 'createdBy',
            width: '20%',
        },
    ];
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


    // ------------------------Mở modal trạng thái----------------------------------------------

    const [openStatus, setOpenStatus] = useState({ isModal: false, isMode: '' });

    const showModalStatus = (isMode) => {
        setOpenStatus({ isModal: true, isMode: isMode });

    };

    const handleStatusCancel = () => {
        setOpenStatus({ isModal: false });
    };
    // ------------------------Mở modal thanh toan----------------------------------------------

    const [openPayment, setOpenPayment] = useState(false);

    const showModalPayment = () => {
        setOpenPayment(true);

    };

    const handlePaymentCansel = () => {
        setOpenPayment(false);
    };
    //----------------Mở modal lịch sử đơn hàng-------------------------
    const [openOrderHistory, setOrderHistory] = useState(false);

    const showModalOrderHistory = () => {
        setOrderHistory(true);

    };

    const handleOrderHistoryCancel = () => {
        setOrderHistory(false);
    };

    // Hàm  tính tổng tiền hàng
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
                }}>

                    <div style={{
                        width: '1300px',
                    }}>
                        <Timeline minEvents={7} placeholder >
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

                    <Space size="middle" style={{ marginBottom: '20px' }}>

                        <>
                            {orders.orderStatus?.statusName === 'Chờ xác nhận' &&
                                <Button type='primary' style={{ borderRadius: '5px' }} onClick={() => showModalStatus('status')}>
                                    Xác nhận
                                </Button>
                            }
                            {orders.orderStatus?.statusName === 'Chờ lấy hàng' &&
                                <Button type='primary' style={{ borderRadius: '5px' }} onClick={() => showModalStatus('status')}>
                                    Giao hàng
                                </Button>
                            }
                            {orders.orderStatus?.statusName === 'Đang vận chuyển' &&
                                <Button type='primary' style={{ borderRadius: '5px' }} onClick={() => showModalStatus('status')}>
                                    Hoàn thành
                                </Button>
                            }

                            {(orders.orderStatus?.statusName === 'Chờ xác nhận'
                                || orders.orderStatus?.statusName === 'Chờ lấy hàng'
                                || orders.orderStatus?.statusName === 'Đang vận chuyển'
                                || orders.orderStatus?.statusName === 'Chờ giao hàng'
                            ) && (
                                    <Button type='primary' style={{ backgroundColor: 'red', borderRadius: '5px' }} onClick={() => showModalStatus('Cancel')}>
                                        Hủy đơn
                                    </Button>
                                )}
                        </>

                    </Space>


                    <Button type='primary' style={{ float: 'right', margin: '0 20px 20px 20px', borderRadius: '5px', backgroundColor: 'black' }}
                        onClick={() => showModalOrderHistory()}>
                        Lịch sử
                    </Button>
                </div>
                <div style={{ borderBottom: '2px solid black', marginTop: '30px' }}>
                    <h6 style={{ fontSize: '15px', fontWeight: '550' }}>SẢN PHẨM</h6>
                </div>
                <Table
                    onChange={handleTableChange}
                    columns={columnOrderDetail}
                    dataSource={orderDetails.map((orderDetail, index) => ({
                        ...orderDetail,
                        key: index + 1,
                        total: orderDetail.price * orderDetail.quantity
                    }))}

                    pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        defaultPageSize: 5,
                        pageSizeOptions: ['5', '10', '15'],
                        total: pagination.total,
                        showSizeChanger: true,
                    }} />

                <div style={{ borderBottom: '2px solid black', margin: '10px 0', paddingBottom: '5px' }}>
                    <Row>
                        <Col span={12}>
                            <h6 style={{ fontSize: '15px', fontWeight: '550' }}>LỊCH SỬ THANH TOÁN</h6>
                        </Col>
                        <Col span={12}>
                            {payment.length == 0 && <Button type='primary'
                                style={{ float: 'right', backgroundColor: '#5a76f3', borderRadius: '5px' }}
                                onClick={() => showModalPayment()}>Xác nhận thanh toán</Button>}
                        </Col>
                    </Row>

                </div>
                <Table
                    columns={columnPaymentHistory}
                    dataSource={payment}
                    pagination={false} />

                <div style={{ borderBottom: '2px solid black', marginTop: '30px' }}>
                    <h6 style={{ fontSize: '15px', fontWeight: '550' }}>THÔNG TIN ĐƠN HÀNG: <span style={{ color: 'red' }}>{orders.id}</span></h6>
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

                    <Descriptions.Item label="Ghi chú đơn hàng" span={2}>
                        {orders.note ? orders.note : "Không có"}
                    </Descriptions.Item>

                    <Descriptions.Item label="Thành tiền">
                        {formatCurrency(orders.orderTotal)}
                    </Descriptions.Item>

                </Descriptions>
            </div >

            {
                openStatus.isModal && <OrderStatusModal
                    isModal={openStatus.isModal}
                    isMode={openStatus.isMode}
                    hideModal={handleStatusCancel}
                    orders={orders}
                    getAllTimeLineByOrderId={getAllTimeLineByOrderId}
                    fetchOrders={fetchOrder}
                    payment={payment}
                />
            }
            {
                openOrderHistory && <OrderHistoryModal
                    isModal={openOrderHistory}
                    hideModal={handleOrderHistoryCancel}
                    orderHistories={orderHistories}
                />
            }
            {
                openPayment && <PaymentModal
                    isModal={openPayment}
                    hideModal={handlePaymentCansel}
                    orders={orders}
                    fetchPayment={fetchPayment}
                />
            }
        </>
    );
}

const OrderStatusModal = ({ hideModal, isModal, isMode, fetchOrders, getAllTimeLineByOrderId, orders, payment }) => {

    const [form] = Form.useForm();

    const handleOrderCancel = () => {

        form.validateFields().then(async () => {

            const data = form.getFieldsValue();

            //Nếu click vào button hủy 
            if (isMode === "Cancel") {
                //Lấy id trạng thái 6 = đã hủy
                data.newStatusName = 'Đã hủy';
            } else {

                const orderStatusName = orders.orderStatus?.statusName || "";

                switch (orderStatusName) {
                    case "Chờ xác nhận":
                        data.newStatusName = 'Chờ lấy hàng';
                        break;
                    case "Chờ lấy hàng":
                        data.newStatusName = 'Đang vận chuyển';
                        break;
                    case "Đang vận chuyển":
                        data.newStatusName = 'Hoàn thành';
                        break;
                    default:
                        data.newStatusName = 'Tạo đơn hàng';
                        break;
                }
            }
            if (payment.length === 0 && orders.orderStatus?.statusName == "Đang vận chuyển") {
                notification.error({
                    message: 'Thông báo',
                    description: 'Vui lòng xác nhận thanh toán!',
                });
                hideModal();
                return;
            }
            data.orderId = orders.id

            await OrderService.updateOrderStatus(data)
                .then(() => {

                    notification.success({
                        message: 'Thông báo',
                        description: 'Xác nhận đơn hàng thành công!',
                    });

                    //gọi lại hai hàm để đồng bộ lại dữ liệu khi sửa trang thái đơn hàng
                    fetchOrders();
                    getAllTimeLineByOrderId();

                    //đóng modal khi click xác nhận
                    hideModal();
                })
                .catch(error => {

                    notification.error({
                        message: 'Thông báo',
                        description: 'Xác nhận đơn hàng thất bại!',
                    });
                    console.error(error);
                });

        }).catch(error => {
            console.error(error);
        })

    }

    return (
        <Modal
            title="Xác nhận đơn hàng"
            open={isModal}
            onOk={handleOrderCancel}
            onCancel={hideModal}
            okText={"Xác nhận"}
            cancelText="Hủy bỏ"
        >
            <Form
                name="validateOnly" layout="vertical" autoComplete="off"
                form={form}
            >
                <Form.Item name="note" rules={[{ required: true, message: 'Vui lòng nhập ghi chú!' }]}>
                    <TextArea rows={4} placeholder="Nhập ghi chú..." />
                </Form.Item>

            </Form>
        </Modal>
    );
};

const OrderHistoryModal = ({ isModal, hideModal, orderHistories }) => {

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            width: '5%'
        },

        {
            title: 'Ngày',
            dataIndex: 'date',
            key: 'date',
            width: '20%'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: '15%',

        },
        {
            title: 'Người xác nhận',
            dataIndex: 'createdBy',
            key: 'createdBy',
            width: '15%'
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
            key: 'note',
            width: '40%',
            render: (text) => (
                <span>
                    {text !== null ? text : "Không có"}
                </span>
            ),
        },
    ];

    return (
        <>

            <Modal
                title="Lịch sử"
                open={isModal}
                onCancel={hideModal}
                footer={false}
                width={900}
            >
                <Table dataSource={orderHistories} columns={columns} pagination={false} />
            </Modal>
        </>
    );
};


const PaymentModal = ({ isModal, hideModal, orders, fetchPayment }) => {
    const [form] = Form.useForm();
    const [change, setChange] = useState(0); // State to store the calculated change

    const handleCreate = () => {
        form.validateFields().then(async () => {
            const data = form.getFieldsValue();
            data.status = 'Đã thanh toán'
            data.orderId = orders.id
            data.paymentDate = new Date();
            await PaymentService.create(data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Thanh toán thành công!',
                    });
                    hideModal();
                    fetchPayment();
                })
                .catch(error => {
                    notification.error({
                        message: 'Thông báo',
                        description: 'Thanh toán thất bại!',
                    });
                    console.error(error);
                });
        }).catch(error => {
            console.error(error);
        })
    }

    const handleAmountChange = (value) => {
        if (value === undefined || value === null || value.trim() === '' || value <= orders.orderTotal) {
            setChange(0);
        } else {
            const enteredAmount = parseFloat(value);
            const remainingAmount = enteredAmount - orders.orderTotal;
            setChange(remainingAmount);
        }
    };

    return (
        <Modal
            title="Xác nhận thanh toán"
            open={isModal}
            onOk={handleCreate}
            onCancel={hideModal}
            okText={"Lưu"}
            cancelText="Hủy bỏ"
            width={500}
        >
            <Form
                name="validateOnly"
                layout="vertical"
                autoComplete="off"
                form={form}
                onValuesChange={(changedValues, allValues) => {
                    // Check if the 'amount' field changed and handle the change
                    if ('amount' in changedValues) {
                        handleAmountChange(changedValues['amount']);
                    }
                }}
            >
                <p style={{ fontSize: '20px' }}>Số tiền cần thanh toán: <span style={{ color: 'red' }}>{formatCurrency(orders.orderTotal)}</span></p>

                <Col>
                    <Form.Item
                        label="Tiền khách đưa:"
                        name="amount"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số tiền!',
                            },
                            {
                                validator(_, value) {
                                    if (!value) {
                                        return Promise.reject();
                                    }

                                    const enteredAmount = parseFloat(value);

                                    if (isNaN(enteredAmount)) {
                                        return Promise.reject(
                                            new Error('Vui lòng nhập đúng định dạng số!')
                                        );
                                    }

                                    if (enteredAmount < orders.orderTotal) {
                                        return Promise.reject(
                                            new Error(`Số tiền không được nhỏ hơn ${formatCurrency(orders.orderTotal)}`)
                                        );
                                    }

                                    handleAmountChange(value);
                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <Input placeholder="Nhập số tiền..." />
                    </Form.Item>
                </Col>

                <Form.Item label="Ghi chú:" name="note" rules={[{ required: true, message: 'Vui lòng nhập ghi chú!' }]}>
                    <TextArea rows={4} placeholder="Nhập ghi chú..." />
                </Form.Item>

                <Row>
                    <Col span={15}>
                        <Form.Item label="Phương thức thanh toán:" name="paymentMethod" rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán!' }]}>
                            <Radio.Group name="radiogroup" style={{ float: 'left' }}>
                                <Radio value='Tiền mặt'>Tiền mặt</Radio>
                                <Radio value='Chuyển khoản'>Chuyển khoản</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col span={9} style={{ paddingLeft: '10px' }}>
                        <p>Tiền thừa: <span style={{ color: 'red' }}>{formatCurrency(change)}</span></p>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

