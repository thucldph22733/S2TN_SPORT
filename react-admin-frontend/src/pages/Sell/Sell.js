import React, { useEffect, useRef, useState } from 'react';
import { AutoComplete, Button, Col, Modal, Row, Select, Table, Tabs, theme } from 'antd';
import {
    PlusCircleFilled,
    PlusOutlined,
    QrcodeOutlined,
    QuestionCircleOutlined,
    ReloadOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import axios from 'axios';
const onChanges = (key) => {
    console.log(key);
};

const columns = [
    {
        title: '#',
        dataIndex: 'index',
        width: 50,
        render: (text, record, index) => index + 1, // Hiển thị STT bắt đầu từ 1
    },
    {
        title: 'Ảnh',
        dataIndex: 'name',
        width: 110,
    },
    {
        title: 'Sản phẩm',
        dataIndex: 'age',
        width: 70,
    },
    {
        title: 'Số lượng',
        dataIndex: 'address',
        width: 60,
    },
    {
        title: 'Tổng tiền',
        dataIndex: 'address',
        width: 60,
    },
    {
        title: 'Hành động',
        dataIndex: 'address',
        width: 70,
    },
];
const columnSanPham = [
    {
        title: '#',
        dataIndex: 'index',
        width: 50,
        render: (text, record, index) => index + 1, // Hiển thị STT bắt đầu từ 1
    },

    {
        title: 'Sản phẩm',
        dataIndex: 'age',
        width: 70,
    },
    {
        title: 'Số lượng',
        dataIndex: 'address',
        width: 60,
    },
    {
        title: 'Đơn giá',
        dataIndex: 'address',
        width: 60,
    },
    {
        title: 'Cổ áo',
        dataIndex: 'address',
        width: 70,
    },
    {
        title: 'Hành động',
        dataIndex: 'address',
        width: 70,
    },
];
const onSearch = (value, _e, info) => console.log(info?.source, value);
const fetchOrders = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/orders/getAll'); // Thay 'URL_API_getAll' bằng URL thực tế của API
        const orders = response.data; // Danh sách hóa đơn được trả về từ máy chủ
        return orders;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách hóa đơn:', error);
        return [];
    }
};
export default function Sell() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const modalFooter = null;
    const [activeKey, setActiveKey] = useState(localStorage.getItem('activeTabKey') || '1');
    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);
    const onChange = (key) => {
        console.log('Active key changed:', key);
        localStorage.setItem('activeTabKey', key);
        setActiveKey(key);
    };
    const createTabContent = () => (
        <div>
            <div className="name">
                <label className="tieu-de">Đơn hàng</label>
                <Button type="primary" icon={<QrcodeOutlined />} style={{ float: 'right' }}>
                    QR Code
                </Button>
                <Button
                    type="primary"
                    onClick={() => setOpen(true)}
                    icon={<PlusOutlined />}
                    style={{ float: 'right', marginRight: '5px' }}
                >
                    Thêm sản phẩm
                </Button>
            </div>
            <div
                style={{
                    margin: '40px 10px ',
                    padding: 14,
                    minHeight: 280,
                    border: '1px solid #ccc', // Thêm viền với màu xám nhạt
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', // Thêm bóng với độ mờ
                }}
            >
                <div className="tieu-de">Giỏ hàng</div>
                <Table
                    columns={columns}
                    dataSource={null}
                    pagination={{
                        pageSize: 50,
                    }}
                    scroll={{
                        y: 240,
                    }}
                />
            </div>
            <div
                style={{
                    margin: '40px 10px ',
                    padding: 14,
                    minHeight: 280,
                    border: '1px solid #ccc', // Thêm viền với màu xám nhạt
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', // Thêm bóng với độ mờ
                }}
            >
                <label className="tieu-de">Thông tin khách hàng</label>
                <Button type="primary" icon={<PlusCircleFilled />} style={{ float: 'right', marginLeft: '5px' }}>
                    Thêm khách hàng
                </Button>
                <Search
                    placeholder="Tìm kiếm khách hàng"
                    allowClear
                    onSearch={onSearch}
                    style={{
                        width: 300,
                        float: 'right',
                    }}
                />
            </div>
            <div
                style={{
                    margin: '10px 10px ',
                    padding: 14,
                    minHeight: 280,
                    border: '1px solid #ccc', // Thêm viền với màu xám nhạt
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', // Thêm bóng với độ mờ
                }}
            >
                <label className="tieu-de">Thông tin thanh toán</label>
            </div>
        </div>
    );
    const loadOrders = async () => {
        try {
            const orders = await fetchOrders();
            const defaultPanes = orders.map((order) => {
                return {
                    label: `HD${order.id}`,
                    children: createTabContent(order),
                    key: String(order.id),
                };
            });
            setItems(defaultPanes);
            const newActiveKey = defaultPanes.length > 0 ? defaultPanes[defaultPanes.length - 1].key : '1';
            setActiveKey(newActiveKey);
            localStorage.setItem('activeTabKey', newActiveKey);
            // console.log('Load orders and set active key:', newActiveKey);
            // console.log('Updated items:', defaultPanes);
        } catch (error) {
            console.error('Lỗi khi load danh sách hóa đơn:', error);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const createOrder = async () => {
        try {
            // Gọi API để tạo đơn hàng mới
            const response = await axios.post('http://localhost:8080/api/orders/create', {
                // Thêm dữ liệu cần thiết cho đơn hàng mới vào đây
            });

            // Kiểm tra phản hồi từ máy chủ và xử lý theo ý muốn
            if (response.status === 201) {
                const responseData = response.data;
                const newOrderId = responseData?.data?.id; // Kiểm tra xem có ID hay không
                console.log('ID của order mới:', newOrderId);
                return newOrderId; // Trả về ID của order để sử dụng sau này
            }
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error('Lỗi khi tạo đơn hàng:', error);
            return null; // Trả về null nếu có lỗi
        }
    };

    const add = async () => {
        await createOrder();
        loadOrders(); // Load lại danh sách đơn hàng
    };

    const remove = (targetKey) => {
        const targetIndex = items.findIndex((pane) => pane.key === targetKey);
        const newPanes = items.filter((pane) => pane.key !== targetKey);
        if (newPanes.length && targetKey === activeKey) {
            const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
            setActiveKey(key);
        }
        setItems(newPanes);
    };

    const onEdit = (targetKey, action) => {
        console.log('Edit action:', action, 'Target key:', targetKey);
        if (action === 'add') {
            add();
        } else {
            remove(targetKey);
        }
    };

    const itemss = [
        {
            key: '1',
            label: 'Tạo mới',
            children: (
                <div>
                    <div
                        style={{
                            marginBottom: 16,
                        }}
                    >
                        <Button onClick={add}>Tạo đơn hàng mới</Button>
                    </div>
                    <Tabs
                        hideAdd
                        onChange={onChange}
                        activeKey={activeKey}
                        type="editable-card"
                        onEdit={onEdit}
                        items={items}
                    />
                </div>
            ),
        },
        {
            key: '2',
            label: 'Danh sách đơn hàng',
            children: 'Content of Tab Pane 2',
        },
    ];
    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    return (
        <div
            style={{
                margin: '10px 10px',
                padding: 14,
                minHeight: 280,
                background: colorBgContainer,
            }}
        >
            <Modal
                title="Danh sách sản phẩm"
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
                footer={modalFooter}
            >
                <Row gutter={[10]} justify="center">
                    <Col className="gutter-row" span={8} style={{ textAlign: 'center' }}>
                        <label>Tên sản phẩm</label>
                    </Col>
                    <Col className="gutter-row" span={8} style={{ textAlign: 'center' }}>
                        <label>Kích cỡ</label>
                    </Col>
                    <Col className="gutter-row" span={8} style={{ textAlign: 'center' }}>
                        <label>Màu sắc</label>
                    </Col>

                    <Col className="gutter-row" span={8} style={{ textAlign: 'center' }}>
                        <AutoComplete
                            style={{
                                width: 200,
                            }}
                            options={null}
                            placeholder="Tìm kiếm sản phẩm theo tên"
                            filterOption={(inputValue, option) =>
                                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                        />
                    </Col>
                    <Col className="gutter-row" span={8} style={{ textAlign: 'center' }}>
                        <Select
                            style={{
                                width: 200,
                            }}
                            showSearch
                            allowClear
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={onChange}
                            onSearch={onSearch}
                            filterOption={filterOption}
                            options={[
                                {
                                    value: 'jack',
                                    label: 'Jack',
                                },
                                {
                                    value: 'lucy',
                                    label: 'Lucy',
                                },
                                {
                                    value: 'tom',
                                    label: 'Tom',
                                },
                            ]}
                        />
                    </Col>
                    <Col className="gutter-row" span={8} style={{ textAlign: 'center' }}>
                        <Select
                            style={{
                                width: 200,
                            }}
                            showSearch
                            allowClear
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={onChange}
                            onSearch={onSearch}
                            filterOption={filterOption}
                            options={[
                                {
                                    value: 'jack',
                                    label: 'Jack',
                                },
                                {
                                    value: 'lucy',
                                    label: 'Lucy',
                                },
                                {
                                    value: 'tom',
                                    label: 'Tom',
                                },
                            ]}
                        />
                    </Col>
                </Row>
                <Row justify={'center'}>
                    <Col className="gutter-row" span={12} style={{ textAlign: 'center' }}>
                        <label>Thương hiệu</label>
                    </Col>
                    <Col className="gutter-row" span={12} style={{ textAlign: 'center' }}>
                        <label>Câu lập bộ</label>
                    </Col>
                    <Col className="gutter-row" span={12} style={{ textAlign: 'center' }}>
                        <Select
                            style={{
                                width: 200,
                            }}
                            showSearch
                            allowClear
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={onChange}
                            onSearch={onSearch}
                            filterOption={filterOption}
                            options={[
                                {
                                    value: 'jack',
                                    label: 'Jack',
                                },
                                {
                                    value: 'lucy',
                                    label: 'Lucy',
                                },
                                {
                                    value: 'tom',
                                    label: 'Tom',
                                },
                            ]}
                        />
                    </Col>
                    <Col className="gutter-row" span={12} style={{ textAlign: 'center' }}>
                        <Select
                            style={{
                                width: 200,
                            }}
                            showSearch
                            allowClear
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={onChange}
                            onSearch={onSearch}
                            filterOption={filterOption}
                            options={[
                                {
                                    value: 'jack',
                                    label: 'Jack',
                                },
                                {
                                    value: 'lucy',
                                    label: 'Lucy',
                                },
                                {
                                    value: 'tom',
                                    label: 'Tom',
                                },
                            ]}
                        />
                    </Col>
                </Row>
                <Row gutter={[8, 24]} justify="center" style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <Col>
                        <Button type="primary" icon={<ReloadOutlined />}>
                            Làm mới
                        </Button>
                    </Col>
                    <Col>
                        <Button type="primary" icon={<SearchOutlined />}>
                            Tìm kiếm
                        </Button>
                    </Col>
                </Row>
                <Table
                    columns={columnSanPham}
                    dataSource={null}
                    pagination={{
                        pageSize: 50,
                    }}
                    scroll={{
                        y: 240,
                    }}
                />
            </Modal>

            <Tabs defaultActiveKey="1" items={itemss} onChange={onChanges} />
        </div>
    );
}
