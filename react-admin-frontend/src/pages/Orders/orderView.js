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
export default function OrderView() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { id } = useParams();
    const [order, setOrder] = useState({}); // Bạn có thể điều chỉnh cấu trúc của order theo nhu cầu

    useEffect(() => {
        loadOrder();
    }, []);

    const loadOrder = async () => {
        const result = await axios.get(`http://localhost:8080/api/orders/findOrderById?id=${id}`);
        setOrder(result.data);
    };

    return (
        <>
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
                <div style={{ background: '#b6cdd1' }}>
                    <h4>Thông tin đơn hàng</h4>
                </div>
                <Row gutter={16}>
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
                                {order.categoryOrder}
                            </span>
                        </Col>
                        <br />
                        <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Tổng tiền</span>
                            <span style={{ float: 'right', textAlign: 'center', color: 'red' }}>
                            {order.orderTotal}
                            </span>
                        </Col>
                    </Col>
                    <Col span={8}>
                        <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Mã đơn hàng</span>
                            <span style={{ float: 'right', textAlign: 'center', color: 'red' }}>
                                #HD{order.id}
                            </span>
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
            </div>
        </>
    );
}
