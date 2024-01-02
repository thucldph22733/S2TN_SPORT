import React, { useState, useEffect } from 'react';
import { Table, Image, Tag, Button, Descriptions, Space, notification, Modal, Form } from 'antd';
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
        } else if (status === 'Chờ giao hàng') {
            return '#007FFF	';
        } else if (status === 'Đang vận chuyển') {
            return '#FF6600';
        } else if (status === 'Đã giao hàng') {
            return '#007BA7';
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
        } else if (status === 'Chờ giao hàng') {
            return FaBox;
        } else if (status === 'Đang vận chuyển') {
            return FaTruck;
        } else if (status === 'Đã giao hàng') {
            return FaRegCalendarCheck;
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

    //------------------Load dữ liệu------------------------------------------

    useEffect(() => {
        fetchOrder();
        fetchOrderDetail();
        getAllTimeLineByOrderId();

    }, []);

    //----------------------------Định nghĩa tên cột load dữ liệu cho bảng-------------------------------------------
    // const columnCart = [
    //     {
    //         title: '#',
    //         dataIndex: 'index',
    //         width: 50,
    //         render: (index) => index + 1, // Hiển thị STT bắt đầu từ 1
    //     },
    //     {
    //         title: 'Số tiền',
    //         dataIndex: '',
    //         width: 60,
    //         render: () => <span style={{ color: 'red' }}>{formatCurrency(order.orderTotal)}</span>,
    //     },
    //     {
    //         title: 'Thời gian',
    //         dataIndex: 'createdAt',
    //         width: 100,
    //     },
    //     {
    //         title: 'Phương thức thanh toán',
    //         dataIndex: '',
    //         width: 60,
    //         render: () => order.payment.paymentName
    //     },
    //     {
    //         title: 'Nhân viên xác nhận',
    //         dataIndex: 'createdBy',
    //         width: 60,
    //     },
    //     {
    //         title: 'Ghi chú',
    //         dataIndex: 'note',
    //         width: 60,
    //     },
    // ];
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
                            {(orders.orderStatus?.statusName !== 'Hoàn thành' &&
                                <Button type='primary' style={{ borderRadius: '5px' }} onClick={() => showModalStatus('status')}>
                                    {orders.orderStatus?.statusName === 'Chờ xác nhận' ? 'Xác nhận' : ''}
                                    {orders.orderStatus?.statusName === 'Chờ giao hàng' ? 'Giao hàng' : ''}
                                    {orders.orderStatus?.statusName === 'Đang vận chuyển' ? 'Lấy hàng' : ''}
                                    {orders.orderStatus?.statusName === 'Đã giao hàng' ? 'Hoàn thành' : ''}
                                </Button>
                            )}
                            {(orders.orderStatus?.statusName === 'Chờ xác nhận'
                                || orders.orderStatus?.statusName === 'Chờ giao hàng'
                                || orders.orderStatus?.statusName === 'Đang vận chuyển'
                                // || orders.orderStatus?.statusName === 'Đã giao hàng'
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



                <div style={{ borderBottom: '2px solid black', marginTop: '30px' }}>
                    <h6 style={{ fontSize: '15px', fontWeight: '550' }}>THÔNG TIN ĐƠN HÀNG: <span style={{ color: 'red' }}>HD{orders.id}</span></h6>
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
                        {formatCurrency(30000)}
                    </Descriptions.Item>

                    <Descriptions.Item label="Phương thức thanh toán" span={2}>
                        <Tag color="green" >Thanh toán khi nhận hàng</Tag>
                    </Descriptions.Item>

                    <Descriptions.Item label="Thành tiền">
                        {formatCurrency(orders.orderTotal)}
                    </Descriptions.Item>

                </Descriptions>
            </div>

            {
                openStatus.isModal && <OrderStatusModal
                    isModal={openStatus.isModal}
                    isMode={openStatus.isMode}
                    hideModal={handleStatusCancel}
                    orders={orders}
                    getAllTimeLineByOrderId={getAllTimeLineByOrderId}
                    fetchOrders={fetchOrder}
                />
            }

            {
                openOrderHistory && <OrderHistoryModal
                    isModal={openOrderHistory}
                    hideModal={handleOrderHistoryCancel}
                    orderHistories={orderHistories}
                />
            }

        </>
    );
}

const OrderStatusModal = ({ hideModal, isModal, isMode, fetchOrders, getAllTimeLineByOrderId, orders }) => {

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
                        data.newStatusName = 'Chờ giao hàng';
                        break;
                    case "Chờ giao hàng":
                        data.newStatusName = 'Đang vận chuyển';
                        break;
                    case "Đang vận chuyển":
                        data.newStatusName = 'Đã giao hàng';
                        break;
                    case "Đã giao hàng":
                        data.newStatusName = 'Hoàn thành';
                        break;
                    default:
                        data.newStatusName = 'Tạo đơn hàng';
                        break;
                }
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
            width: '15%'
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
            width: '40%'
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

// const ProductModal = ({ isModal, hideModal }) => {

//     const [productDetails, setProductDetails] = useState([]);

//     const [paginationProduct, setPaginationProduct] = useState({ current: 1, pageSize: 3, total: 0 });

//     const fetchProductDetails = async () => {

//         await ProductDetailService.getAllProductDetails(paginationProduct.current - 1, paginationProduct.pageSize)
//             .then(response => {

//                 setProductDetails(response.data);
//                 setPaginationProduct({
//                     ...paginationProduct,
//                     total: response.totalCount,
//                 });


//             }).catch(error => {
//                 console.error(error);
//             })
//     };
//     const handleTableProductChange = (pagination) => {
//         setPaginationProduct({
//             ...pagination,
//         });

//     };
//     useEffect(() => {
//         fetchProductDetails();
//     }, [paginationProduct.current - 1, paginationProduct.pageSize])

//     const columns = [
//         {
//             title: '#',
//             dataIndex: 'index',
//             key: 'index',
//             width: '5%',
//             render: (text, record, index) => (
//                 <span>{index + 1}</span>
//             ),
//         },
//         {
//             title: 'Ảnh',
//             dataIndex: 'productAvatar',
//             key: 'productAvatar',
//             width: '7%',
//             render: (text) => (
//                 <Image width={50} height={50} src={text} alt="Avatar" />
//             ),
//         },
//         {
//             title: 'Sản phẩm',
//             width: '30%',
//             render: (record) => (
//                 <>
//                     <span>{`${record.productName}`}</span>
//                     <p style={{ marginBottom: '0' }}>[{record.colorName} - {record.sizeName}]</p>
//                 </>
//             )
//         },
//         {
//             title: 'Chất liệu',
//             dataIndex: 'materialName',
//             key: 'materialName',
//             width: '15%'
//         },
//         {
//             title: 'Đơn giá',
//             dataIndex: 'price',
//             key: 'price',
//             width: '10%',
//             render: (text) => (
//                 <span >
//                     {formatCurrency(text)}
//                 </span>
//             ),
//         },
//         {
//             title: 'Số lượng',
//             dataIndex: 'quantity',
//             key: 'quantity',
//             width: '10%'
//         },
//         {
//             title: 'Hành động',
//             key: 'action',
//             width: "10%",
//             render: (record) => {
//                 return <Space size="middle">

//                     <Button type="primary" style={{ borderRadius: '5px', backgroundColor: '#5a76f3' }} onClick={() => showModalQuantity()}>Chọn</Button>

//                 </Space>
//             },
//         },
//     ];
//     const [quantityModal, setQuantityModal] = useState(false);
//     const showModalQuantity = () => {
//         setQuantityModal(true);

//     };

//     const handleQuantityCancel = () => {
//         setQuantityModal(false);
//     };
//     return (
//         <>
//             <Modal
//                 title="Danh sách sản phẩm"
//                 open={isModal}
//                 onCancel={hideModal}
//                 footer={false}
//                 width={1000}
//             >
//                 <Table onChange={handleTableProductChange} dataSource={productDetails} columns={columns} pagination={{
//                     current: paginationProduct.current,
//                     pageSize: paginationProduct.pageSize,
//                     defaultPageSize: 5,
//                     pageSizeOptions: ['5', '10', '15'],
//                     total: paginationProduct.total,
//                     showSizeChanger: true,
//                 }} />
//             </Modal>

//             {quantityModal && <Modal
//                 title="Số lượng sản phẩm"
//                 open={quantityModal}
//                 onCancel={handleQuantityCancel}
//                 width={250}
//                 style={{ textAlign: 'center' }}
//                 okText="Thêm"
//                 cancelText="Hủy bỏ"
//             >
//                 <InputNumber min={1} max={10} defaultValue={3} />
//             </Modal>}
//         </>
//     );
// };