import { CloseSquareOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Empty, Form, Modal, Radio, Space, Table, Tabs, Tag, Tooltip, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import path_name from '~/core/constants/routers';
import OrderService from '~/service/OrderService';
import formatCurrency from '~/utils/format-currency';
import FormatDate from '~/utils/format-date';




function Order() {


    // const columns = [
    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            width: "5%",
            render: (value, item, index) => (pagination.current - 1) * pagination.pageSize + index + 1

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
            dataIndex: 'orderType',
            key: 'orderType',
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
                    {formatCurrency(text)}
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
                    case 'Tạo đơn hàng':
                        return <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="green">Tạo đơn hàng</Tag>
                    case 'Chờ xác nhận':
                        return <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="processing">Chờ xác nhận</Tag>
                    case 'Chờ lấy hàng':
                        return <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="purple">Chờ lấy hàng</Tag>
                    case 'Đang vận chuyển':
                        return <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="volcano">Đang vận chuyển</Tag>
                    case 'Hoàn thành':
                        return <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="cyan">Hoàn thành</Tag>
                    case 'Đã hủy':
                        return <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="red">Đã hủy</Tag>
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

    //lấy user từ loacal storage
    const userString = localStorage.getItem('user2');
    const user = userString ? JSON.parse(userString) : null;

    const [loading, setLoading] = useState(false);

    const [orders, setOrders] = useState([]);

    const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });

    const [orderStatusName, setOrderStatusName] = useState(null);

    const fetchOrders = async () => {
        setLoading(true)
        await OrderService.getAllOrdersByUserId(pagination.current - 1, pagination.pageSize, user.id, orderStatusName)
            .then(response => {
                console.log(response.data)
                setOrders(response.data);

                setPagination({
                    ...pagination,
                    total: response.totalCount,
                });

                setLoading(false)
            }).catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        fetchOrders();
    }, [pagination.current, pagination.pageSize, orderStatusName]);

    const handleTableChange = (pagination) => {
        setPagination({
            ...pagination,
        });

    };

    // --------------------------Mở modal hủy đơn hàng--------------------------------------------
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

    const tabContent = () => (

        <Table
            dataSource={orders.map((order, index) => ({
                ...order,
                key: index + 1,
                createdAt: FormatDate(order.createdAt),
                orderStatusName: order.orderStatus ? order.orderStatus.statusName : "",

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
            key: null,
            label: 'Tất cả',
            children: tabContent(),
        },
        {
            key: 'Chờ xác nhận',
            label: 'Chờ xác nhận',
            children: tabContent(),
        },
        {
            key: 'Chờ lấy hàng',
            label: 'Chờ lấy hàng',
            children: tabContent(),
        },
        {
            key: 'Đang vận chuyển',
            label: 'Đang vận chuyển',
            children: tabContent(),
        },

        {
            key: 'Hoàn thành',
            label: 'Hoàn thành',
            children: tabContent(),
        },
        {
            key: 'Đã hủy',
            label: 'Đã hủy',
            children: tabContent(),
        },
    ];

    const handleTabChange = (key) => {
        setOrderStatusName(key)
    };

    return (
        <div style={{ marginLeft: '30px' }}>

            <h6>Đơn hàng của tôi</h6>

            <Tabs defaultActiveKey=""
                items={items}
                onChange={handleTabChange}></Tabs>

            {open.isModal && (
                <OrderModal
                    isModal={open.isModal}
                    hideModal={handleCancel}
                    fetchOrders={fetchOrders}
                    reacord={open.reacord}
                />
            )}
        </div>
    );
}
const OrderModal = ({ hideModal, isModal, fetchOrders, reacord }) => {

    const [form] = Form.useForm();

    const handleOrderCancel = () => {
        form.validateFields().then(async () => {
            const data = form.getFieldsValue();

            // Kiểm tra trạng thái của đơn hàng trước khi hủy
            if (reacord.statusName === 'Chờ xác nhận' || reacord.statusName === 'Chờ lấy hàng') {
                data.newStatusName = 'Đã hủy'; //6 là trạng thái đã hủy
                data.orderId = reacord.id;

                await OrderService.updateOrderStatus(data)
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
            } else {
                notification.warning({
                    message: 'Thông báo',
                    description: 'Không thể hủy đơn hàng với trạng thái hiện tại!',
                });
            }
        }).catch(error => {
            console.error(error);
        });
    };



    const onRadioChange = (e) => {
        const radioValue = e.target.value;
        // cập nhật giá trị cho ghi chú
        form.setFieldsValue({
            note: radioValue,
        });
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
                form={form}
            >
                <Radio.Group
                    onChange={onRadioChange}
                    style={{ margin: '10px 0' }}
                >
                    <Space direction="vertical">

                        <Radio
                            value={"Tôi muốn cập nhật địa chỉ/số điện thoại nhận hàng."}>
                            Tôi muốn cập nhật địa chỉ/số điện thoại nhận hàng.
                        </Radio>

                        <Radio
                            value={"Tôi muốn thêm thay đổi mã giảm giá."}>
                            Tôi muốn thêm thay đổi mã giảm giá.
                        </Radio>

                        <Radio
                            value={"Tôi muốn thay đổi sản phẩm (kích thước, màu sắc, số lượng)"}>
                            Tôi muốn thay đổi sản phẩm (kích thước, màu sắc, số lượng)
                        </Radio>

                        <Radio
                            value={"Tôi tìm thấy chỗ mua khác tốt hơn (rẻ hơn, uy tín hơn, giao nhanh hơn...)"}>
                            Tôi tìm thấy chỗ mua khác tốt hơn (rẻ hơn, uy tín hơn, giao nhanh hơn...)
                        </Radio>

                        <Radio
                            value={"Tôi không có nhu cầu nữa."}>
                            Tôi không có nhu cầu nữa.
                        </Radio>

                        <Radio
                            value={"Thủ tục thanh toán rắc rối."}>
                            Thủ tục thanh toán rắc rối.
                        </Radio>

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
