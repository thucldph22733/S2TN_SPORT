import React, { useState, useEffect } from 'react';
import {
    Table,
    Image,
    Tag,
    Button,
    Descriptions,
    Col,
    Space,
    notification,
    Modal,
    Radio,
    Form,
    Popconfirm,
    Row,
    InputNumber
} from 'antd';
import { Link, useParams } from 'react-router-dom';
import { Timeline, TimelineEvent } from '@mailtop/horizontal-timeline';
import { FaBox, FaMinus, FaRegCalendarCheck, FaRegFileAlt, FaTruck, FaFileSignature } from 'react-icons/fa';
import FormatDate from '~/utils/format-date';
import OrderHistoryService from '~/service/OrderHistoryService';
import OrderService from '~/service/OrderService';
import { DeleteOutlined, DoubleLeftOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import path_name from '~/constants/routers';
import OrderDetailService from '~/service/OrderDetailService';
import formatCurrency from '~/utils/format-currency';
import TextArea from 'antd/es/input/TextArea';
import ProductDetailService from '~/service/ProductDetaiService';
// import { render } from '@testing-library/react';

export default function OrderDetail() {

    //----------------------------------Lịch sử đơn hàng---------------------------------------------------------------
    const { id } = useParams();
    const [timeLines, setTimeLines] = useState([]); // Bạn có thể điều chỉnh cấu trúc của order theo nhu cầu
    const [orderHisstorys, setOrderHistorys] = useState([]);
    const getAllTimeLineByOrderId = async () => {
        OrderHistoryService.getAllTimeLineByOrderId(id).then(response => {
            const convertedTimeline = response.map((event) => ({
                title: event.status.statusName,
                subtitle: FormatDate(event.createdAt),
                color: getStatusColor(event.status.id),
                icon: getIconByStatus(event.status.id),
            }));
            setTimeLines(convertedTimeline);
            setOrderHistorys(response.map((item, index) => (
                {
                    key: index + 1,
                    date: FormatDate(item.createdAt),
                    status: item.status.statusName,
                    createdBy: item.createdBy,
                    note: item.note
                }
            )))
            console.log(response)
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
            return FaFileSignature;
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

    };
    //------------------------------------------------------------

    useEffect(() => {
        fetchOrder();
        fetchOrderDetail();
        getAllTimeLineByOrderId();
        // loadOrderDetails();
    }, []);


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
            title: 'Hành động',
            key: 'action',
            width: "10%",
            render: (record) => {

                return <Space size="middle">
                    <Popconfirm
                        title="Xóa sản phẩm"
                        description="Bạn có chắc chắn xóa sản phẩm này không?"
                        placement="leftTop"
                        // onConfirm={() => handleDelete(record.id)}
                        okText="Đồng ý"
                        cancelText="Hủy bỏ"
                    >
                        <Button type="text" icon={<DeleteOutlined />} style={{ color: 'red' }} />
                    </Popconfirm>

                </Space>
            },
        },
    ];




    // ------------------------Mở modal cập nhật trạng thái----------------------------------------------

    const [openCansel, setOpenCansel] = useState({ isModal: false, isMode: '' });

    const showModalCansel = (isMode) => {
        setOpenCansel({ isModal: true, isMode: isMode });

    };

    const handleCancel = () => {
        setOpenCansel({ isModal: false });
    };

    //----------------Mở modal lịch sử đơn hàng-------------------------
    const [openOrderHistory, setOrderHistory] = useState(false);

    const showModalOrderHistory = () => {
        setOrderHistory(true);

    };

    const handleOrderHistoryCancel = () => {
        setOrderHistory(false);
    };

    //----------------Mở modal sản phẩm-------------------------
    const [openProduct, setOpenProduct] = useState(false);

    const showModalProduct = () => {
        setOpenProduct(true);

    };

    const handleProductCancel = () => {
        setOpenProduct(false);
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
                    // marginBottom: '20px'
                }}>
                    <div style={{
                        width: '1300px',
                    }}>
                        <Timeline minEvents={6} placeholder >
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
                        {(orders.orderStatus?.statusName === 'Chờ xác nhận' || orders.orderStatus?.statusName === 'Chờ lấy hàng' || orders.orderStatus?.statusName === 'Chờ giao hàng') && (
                            <>
                                <Button type='primary' style={{ borderRadius: '5px' }} onClick={() => showModalCansel('status')}>
                                    {orders.orderStatus?.statusName === 'Chờ xác nhận' ? 'Xác nhận' : ''}
                                    {orders.orderStatus?.statusName === 'Chờ lấy hàng' ? 'Giao hàng' : ''}
                                    {orders.orderStatus?.statusName === 'Chờ giao hàng' ? 'Hoàn thành' : ''}
                                </Button>
                                <Button type='primary' style={{ backgroundColor: 'red', borderRadius: '5px' }} onClick={() => showModalCansel('Cancel')}>
                                    Hủy đơn
                                </Button>
                            </>
                        )}
                    </Space>
                    <Button type='primary' style={{ float: 'right', margin: '0 20px 20px 20px', borderRadius: '5px', backgroundColor: 'black' }}
                        onClick={() => showModalOrderHistory()}>
                        Lịch sử
                    </Button>
                </div>

                <div style={{ borderBottom: '2px solid black', marginTop: '30px' }}>
                    <Row>
                        <Col span={12}>
                            <h6 style={{ fontSize: '15px', fontWeight: '550' }}>THÔNG TIN ĐƠN HÀNG</h6>
                        </Col>
                        <Col span={12}>
                            <Button type='primary' style={{ float: 'right', borderRadius: '5px', marginBottom: '5px', backgroundColor: '#5a76f3' }}>Thay đổi</Button>
                        </Col>

                    </Row>
                </div>
                <Descriptions
                    size='default'
                    // layout="vertical"
                    bordered
                    style={{ padding: '10px 10px' }}
                >
                    <Descriptions.Item label="Họ và tên">
                        {orders.recipientName == null ? 'Khách lẻ' : orders.recipientName}</Descriptions.Item>
                    <Descriptions.Item label="Trạng thái">
                        {orders.orderStatus == null ? '' : <Tag color="blue">{orders.orderStatus.statusName}</Tag>}
                    </Descriptions.Item>
                    <Descriptions.Item label="Voucher"> {formatCurrency(orders.voucher != null ? -orders.voucher.discountRate : 0)}</Descriptions.Item>

                    <Descriptions.Item label="Số điện thoại" >{orders.phoneNumber == null ? 'Không có' : orders.phoneNumber}</Descriptions.Item>
                    <Descriptions.Item label="Loại đơn hàng">
                        {orders.orderType && orders.orderType !== "Online" ? <Tag color="purple">Online</Tag> : <Tag color="volcano">Tại quầy</Tag>}
                    </Descriptions.Item>
                    <Descriptions.Item label="Phí vận chuyển">{formatCurrency(-30000)}</Descriptions.Item>

                    <Descriptions.Item label="Địa chỉ" span={2}>  {orders.ward && orders.district && orders.city && orders.addressDetail
                        ? `${orders.addressDetail} - ${orders.ward} - ${orders.district} - ${orders.city}`
                        : "Không có"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tổng tiền">{formatCurrency(orders.orderTotal)}</Descriptions.Item>

                    <Descriptions.Item label="Phương thức thanh toán"><Tag color="green">Thanh toán khi nhận hàng</Tag></Descriptions.Item>
                </Descriptions>
                <div style={{ borderBottom: '2px solid black', marginTop: '30px' }}>
                    <Row>
                        <Col span={12}>
                            <h6 style={{ fontSize: '15px', fontWeight: '550' }}>SẢN PHẨM</h6>
                        </Col>
                        <Col span={12}>
                            <Button type='primary' style={{ float: 'right', borderRadius: '5px', marginBottom: '5px', backgroundColor: '#5a76f3' }} icon={<PlusOutlined />} onClick={() => showModalProduct()}>Thêm sản phẩm</Button>
                        </Col>

                    </Row>
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
            </div>
            {
                openCansel.isModal && <OrderStatusModal
                    isModal={openCansel.isModal}
                    isMode={openCansel.isMode}
                    hideModal={handleCancel}
                    fetchOrders={fetchOrder}
                    reacord={orders}
                    getAllTimeLineByOrderId={getAllTimeLineByOrderId}
                />
            }
            {
                openOrderHistory && <OrderHistoryModal
                    isModal={openOrderHistory}
                    hideModal={handleOrderHistoryCancel}
                    reacord={orderHisstorys}
                />
            }
            {
                openProduct && <ProductModal
                    isModal={openProduct}
                    hideModal={handleProductCancel}
                />
            }
        </>
    );
}

const OrderStatusModal = ({ hideModal, isModal, isMode, fetchOrders, getAllTimeLineByOrderId, reacord }) => {

    const [form] = Form.useForm();

    const handleOrderCancel = () => {
        form.validateFields().then(async () => {
            const data = form.getFieldsValue();

            if (isMode === "Cancel") {
                data.newStatusId = 6;
            } else {
                const orderStatusName = reacord.orderStatus?.statusName || "";

                switch (orderStatusName) {
                    case "Chờ xác nhận":
                        data.newStatusId = 3;
                        break;
                    case "Chờ lấy hàng":
                        data.newStatusId = 4;
                        break;
                    case "Chờ giao hàng":
                        data.newStatusId = 5;
                        break;
                    default:
                        break;
                }
            }
            data.orderId = reacord.id
            await OrderService.updateOrderStatus(data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Hủy đơn hàng thành công!',
                    });
                    fetchOrders();
                    getAllTimeLineByOrderId();
                    // Đóng modal
                    hideModal();
                })
                .catch(error => {
                    notification.error({
                        message: 'Thông báo',
                        description: 'Hủy đơn thất bại!',
                    });
                    console.error(error);
                });

        }).catch(error => {
            console.error(error);
        })

    }


    const onFinish = (values) => {
        console.log('Received values:', values);
        // Perform your form submission logic here
    };
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
                onFinish={onFinish}
                form={form}
            >
                {/* <Radio.Group
                    onChange={onRadioChange}
                    style={{ margin: '10px 0' }}
                >
                    <Space direction="vertical">
                        <Radio value={"Tôi muốn cập nhật địa chỉ/số điện thoại nhận hàng."}>
                            Tôi muốn cập nhật địa chỉ/số điện thoại nhận hàng.</Radio>
                        <Radio value={"Tôi muốn thêm thay đổi mã giảm giá."}>Tôi muốn thêm thay đổi mã giảm giá.</Radio>
                        <Radio value={"Tôi muốn thay đổi sản phẩm (kích thước, màu sắc, số lượng)"}>Tôi muốn thay đổi sản phẩm (kích thước, màu sắc, số lượng)</Radio>
                        <Radio value={"Tôi tìm thấy chỗ mua khác tốt hơn (rẻ hơn, uy tín hơn, giao nhanh hơn...)"}>Tôi tìm thấy chỗ mua khác tốt hơn (rẻ hơn, uy tín hơn, giao nhanh hơn...)</Radio>
                        <Radio value={"Tôi không có nhu cầu nữa."}>Tôi không có nhu cầu nữa.</Radio>
                        <Radio value={"Thủ tục thanh toán rắc rối."}>Thủ tục thanh toán rắc rối.</Radio>
                    </Space>
                </Radio.Group> */}
                <Form.Item name="note" rules={[{ required: true, message: 'Vui lòng nhập ghi chú!' }]}>
                    <TextArea rows={4} placeholder="Nhập lý do hủy..." />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const OrderHistoryModal = ({ isModal, hideModal, reacord }) => {

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
                <Table dataSource={reacord} columns={columns} pagination={false} />
            </Modal>
        </>
    );
};

const ProductModal = ({ isModal, hideModal }) => {

    const [productDetails, setProductDetails] = useState([]);

    const [paginationProduct, setPaginationProduct] = useState({ current: 1, pageSize: 3, total: 0 });

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
                <Image width={50} height={50} src={text} alt="Avatar" />
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

                    <Button type="primary" style={{ borderRadius: '5px', backgroundColor: '#5a76f3' }} onClick={() => showModalQuantity()}>Chọn</Button>

                </Space>
            },
        },
    ];
    const [quantityModal, setQuantityModal] = useState(false);
    const showModalQuantity = () => {
        setQuantityModal(true);

    };

    const handleQuantityCancel = () => {
        setQuantityModal(false);
    };
    return (
        <>
            <Modal
                title="Danh sách sản phẩm"
                open={isModal}
                onCancel={hideModal}
                footer={false}
                width={1000}
            >
                <Table onChange={handleTableProductChange} dataSource={productDetails} columns={columns} pagination={{
                    current: paginationProduct.current,
                    pageSize: paginationProduct.pageSize,
                    defaultPageSize: 5,
                    pageSizeOptions: ['5', '10', '15'],
                    total: paginationProduct.total,
                    showSizeChanger: true,
                }} />
            </Modal>

            {quantityModal && <Modal
                title="Số lượng sản phẩm"
                open={quantityModal}
                onCancel={handleQuantityCancel}
                width={250}
                style={{ textAlign: 'center' }}
                okText="Thêm"
                cancelText="Hủy bỏ"
            >
                <InputNumber min={1} max={10} defaultValue={3} />
            </Modal>}
        </>
    );
};