import { CloseCircleOutlined, CloseSquareOutlined, DeleteOutlined, ExclamationCircleOutlined, HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Form, Modal, Popconfirm, Radio, Space, Table, Tabs, Tag, Tooltip, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import path_name from '~/core/constants/routers';
import OrderService from '~/service/OrderService';
import FormatDate from '~/utils/format-date';




function Order() {
    const userString = localStorage.getItem('user2');
    const user = userString ? JSON.parse(userString) : null;

    const [loading, setLoading] = useState(false);

    const [orders, setOrders] = useState([]);

    const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });

    const [orderStatusId, setOrderStatusId] = useState(null);

    const fetchOrders = async () => {
        setLoading(true)
        await OrderService.getAllOrdersByUserId(pagination.current - 1, pagination.pageSize, user.id, orderStatusId)
            .then(response => {

                setOrders(response.data);
                console.log(response.data)
                setPagination({
                    ...pagination,
                    total: response.totalCount,
                });
                console.log(response.data)
                setLoading(false)
            }).catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        fetchOrders();
    }, [pagination.current, pagination.pageSize, orderStatusId]);

    const handleTableChange = (pagination) => {
        setPagination({
            ...pagination,
        });

    };
    // ----------------------------------------------------------------------
    const [open, setOpen] = useState({ isModal: false, reacord: null });

    const showModal = (record) => {
        setOpen({
            isModal: true,
            reacord: record,
        });

    };

    const handleCancel = () => {
        setOpen({
            isModal: false,
        });
    };

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            width: "5%",
        },
        {
            title: 'Mã',
            dataIndex: 'id',
            key: 'id',
            width: "8%",
            render: (text) => <a>HD{text}</a>,
        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: "12%",
        },
        {
            title: 'Loại ĐH',
            dataIndex: 'orderTypeName',
            key: 'orderTypeName',
            width: "12%",
            render: (text) => (
                text === "InStore" ? <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="processing">Tại quầy</Tag>
                    : <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="warning">Online</Tag>
            )
        },

        {
            title: 'Tổng tiền',
            dataIndex: 'orderTotal',
            key: 'orderTotal',
            width: "10%",
            render: (text) => (
                <span style={{ color: 'red' }}>
                    {isNaN(parseFloat(text)) ? '' : parseFloat(text).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </span>
            ),
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
            key: 'note',
            width: "25%",
        },
        {
            title: 'Trạng thái',
            dataIndex: 'orderStatusName',
            key: 'orderStatusName',
            width: "15%",
            render: (text) => {
                switch (text) {
                    case 'Chờ xác nhận':
                        return <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="processing">Chờ xác nhận</Tag>
                        break;
                    case 'Chờ lấy hàng':
                        return <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="volcano">Chờ lấy hàng</Tag>
                        break;
                    case 'Chờ giao hàng':
                        return <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="purple">Chờ giao hàng</Tag>
                        break;
                    case 'Hoàn thành':
                        return <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="cyan">Hoàn thành</Tag>
                        break;
                    case 'Đã hủy':
                        return <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="red">Đã hủy</Tag>
                        break;
                    default:
                        break;
                }
            }
        },

        {
            title: 'Hành động',
            key: 'action',
            width: "10%",
            render: (record) => {

                return <Space size="middle">
                    <Tooltip title="Xem chi tiết" placement="top">
                        <Link to={`${path_name.orderView}/${record.id}`}>
                            <Button type="text" icon={<FaEye style={{ color: 'rgb(214, 103, 12)' }} />} />
                        </Link>
                    </Tooltip>

                    {(record.orderStatusName === "Chờ xác nhận" || record.orderStatusName === "Chờ lấy hàng") && <Tooltip title="Hủy đơn" placement="top">
                        <Button type="text" onClick={() => showModal(record)} icon={<CloseSquareOutlined />} style={{ color: 'red' }} />
                    </Tooltip>}
                </Space>
            },
        },
    ];
    const tabContent = () => (

        <Table
            dataSource={orders.map((order) => ({
                ...order,
                key: order.id,
                createdAt: FormatDate(order.createdAt),
                // voucher: order.voucher ? order.voucher.discountRate : 0,
                customerName: order.user ? order.user.usersName : "Khách lẻ",
                orderStatusName: order.orderStatus ? order.orderStatus.statusName : "",
                orderTypeName: order.orderType ? order.orderType.orderTypeName : ""

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
    );
    const items = [
        {
            key: '',
            label: 'Tất cả',
            children: tabContent(),
        },
        {
            key: '2',
            label: 'Chờ xác nhận',
            children: tabContent(),
        },
        {
            key: '3',
            label: 'Chờ lấy hàng',
            children: tabContent(),
        },
        {
            key: '4',
            label: 'Chờ giao hàng',
            children: tabContent(),
        },
        {
            key: '5',
            label: 'Hoàn thành',
            children: tabContent(),
        },
        {
            key: '6',
            label: 'Đã hủy',
            children: tabContent(),
        },

    ];
    const handleTabChange = (key) => {
        setOrderStatusId(key)
    };

    return (
        <div style={{ marginLeft: '30px' }}>

            <h6>Đơn hàng của tôi</h6>
            <Tabs defaultActiveKey=""
                items={items}
                onChange={handleTabChange}></Tabs>
            {
                open.isModal && <OrderModal
                    isModal={open.isModal}
                    hideModal={handleCancel}
                    fetchOrders={fetchOrders}
                    reacord={open.reacord}
                />
            }

        </div>

    );
}
const OrderModal = ({ hideModal, isModal, fetchOrders, reacord }) => {

    const [form] = Form.useForm();

    const handleOrderCancel = () => {
        form.validateFields().then(async () => {

            const data = form.getFieldsValue();
            data.statusId = 6     //6 là trạng thái đã hủy
            console.log(data)
            await OrderService.orderCancel(reacord.id, data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Hủy đơn hàng thành công!',
                    });
                    fetchOrders();
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
    const onRadioChange = (e) => {
        const radioValue = e.target.value;
        // Update the value of the 'note' field in the form
        form.setFieldsValue({
            note: radioValue,
        });
    };

    const onFinish = (values) => {
        console.log('Received values:', values);
        // Perform your form submission logic here
    };
    return (
        <Modal
            title={<span><ExclamationCircleOutlined style={{ color: 'red', marginRight: '7px' }} />Thông báo xác nhận lý do hủy đơn hàng! </span>}
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
                <Radio.Group
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
                </Radio.Group>
                <Form.Item name="note" rules={[{ required: true, message: 'Vui lòng nhập ghi chú!' }]}>
                    <TextArea rows={4} placeholder="Nhập lý do hủy..." />
                </Form.Item>

            </Form>
        </Modal>
    );
};
export default Order;
