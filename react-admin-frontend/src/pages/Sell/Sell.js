import React, { useEffect, useState } from 'react';
import { AutoComplete, Button, Col, Modal, Row, Select, Table, Tabs, theme, Image, InputNumber } from 'antd';
import {
    DeleteOutlined,
    PlusCircleFilled,
    PlusOutlined,
    QrcodeOutlined,
    ReloadOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import axios from 'axios';
//-------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------

//-----------------------------CoLumn của hóa đơn chi tiết-------------------------------------------------------------------------

//-----------------------------CoLumn của hóa đơn chi tiết-------------------------------------------------------------------------

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
    const [activeKey, setActiveKey] = useState('');
    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);
    const [productDetails, setProductDetails] = useState('');
    const [orderDetails, setOrderDetails] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [tabClicked, setTabClicked] = useState(false);

    const onChanges = (key) => {
        console.log('Active key changed:', key);
        setActiveKey(key);
    
        // ... phần còn lại của hàm
    
        console.log('Updated Active Key:', activeKey);
    };


    useEffect(() => {
        loadOrders();
        loadProductDetails();
    }, []);



    const columnProduct = [
        {
            title: '#',
            dataIndex: 'index',
            width: 40,
            render: (text, record, index) => index + 1, // Hiển thị STT bắt đầu từ 1
        },
        {
            title: 'Sản phẩm',
            dataIndex: '',
            width: 110,
            render: (record) => (
                <Row gutter={[5]}>
                    <Col span={12}>
                        <Image width={130} src={record.productAvatar} alt="Avatar" />
                    </Col>
                    <Col span={12}>
                        {record.productName} x [{record.colorName} - {record.sizeName}] <br />
                        Màu:{record.colorName} - kích cỡ:{record.sizeName}
                    </Col>
                </Row>
            ),
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            width: 50,
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            width: 50,
        },
        {
            title: <div style={{ textAlign: 'center' }}>Hành động</div>,
            dataIndex: '',
            width: 50,
            render: (record) => (
                <div style={{ textAlign: 'center' }}>
                    <button className="btn btn-outline-warning" onClick={() => handleAddToProductDetail(record.id)}>
                        Chọn
                    </button>
                </div>
            ),
        },
    ];
    const columnCart = [
        {
            title: '#',
            dataIndex: 'index',
            width: 50,
            render: (text, record, index) => index + 1, // Hiển thị STT bắt đầu từ 1
        },
        {
            title: 'Ảnh',
            dataIndex: 'productAvatar',
            width: 110,
            render: (record) => <Image width={130} src={record} alt="Avatar" />,
        },
        // {
        //     title: 'Sản phẩm',
        //     dataIndex: '',
        //     width: 70,
        //     render: (record) => (
        //         <Row gutter={[5]}>
        //             <Col span={16}>
        //                 {record.productName} x [{record.colorName} - {record.sizeName}] <br />
        //                 Màu:{record.colorName} - kích cỡ:{record.sizeName}
        //             </Col>
        //             <Col span={16}>
        //                 Đơn giá:<span style={{ color: 'red' }}>{record.price}</span>
        //             </Col>
        //         </Row>
        //     ),
        // },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            width: 60,
            render: (record) => <InputNumber min={1} max={10} defaultValue={record} />,
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'price',
            width: 60,
        },
        {
            title: <div style={{ textAlign: 'center' }}>Hành động</div>,
            dataIndex: '',
            width: 50,
            render: (render) => (
                <div style={{ textAlign: 'center' }}>
                    <button className="btn btn-outline-warning">
                        <DeleteOutlined />
                    </button>
                </div>
            ),
        },
    ];
    const createTabContent = () => (
        <div>
            <div className="name">
                <label className="tieu-de">Đơn hàng</label>
                <Button type="primary" icon={<QrcodeOutlined />} style={{ float: 'right' }}>
                    QR Code
                </Button>
                <Button
                    type="primary"
                    onClick={showModal}
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
                {console.log('Order details:', currentTabData)}
                <Table
                    columns={columnCart}
                    dataSource={currentTabData}
                    pagination={{
                        pageSize: 50,
                    }}
                    scroll={{
                        y: 240,
                    }}
                    key={forceRender}
                />
                {/* table hóa đơn chi tiết */}
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
            const response = await axios.get('http://localhost:8080/api/orders/getAll');
            const orders = response.data;
            setItems(
                orders.map((order) => ({
                    label: `HD${order.id}`,
                    children: createTabContent(order.id), // Truyền ID của order thay vì orderDetails
                    key: String(order.id),
                    orderDetails: [],
                })),
            );
        } catch (error) {
            console.error('Lỗi khi lấy danh sách hóa đơn:', error);
        }
    };

    const loadProductDetails = async () => {
        const response = await axios.get('http://localhost:8080/api/productDetails/getAll');
        setProductDetails(response.data);
    };
    const loadOrderDetails = async () => {
            if (!tabClicked) {
                return; // Nếu chưa click vào tab, không thực hiện gì
            }
    };
    
    

    const createOrder = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/orders/create', {
                // Thêm dữ liệu cần thiết cho đơn hàng mới vào đây
            });

            if (response.status === 201) {
                const responseData = response.data;
                const newOrderId = responseData?.data?.id; // Kiểm tra xem có ID hay không

                console.log('ID của order mới:', newOrderId);

                // Cập nhật orderDetails với dữ liệu mới
                loadOrderDetails(newOrderId);

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
    const onSearch = (value, _e, info) => console.log(info?.source, value);

    const handleAddToProductDetail = async (productId) => {
        try {
            const response = await axios.post('http://localhost:8080/api/orderDetails/create', {
                orderId: activeKey,
                productDetailId: productId,
                quantity: 1,
                price: 0,
                note: '',
            });

            if (response.status === 201) {
                console.log('Sản phẩm đã được thêm vào đơn hàng');
                // Sau khi thêm sản phẩm, gọi lại loadOrderDetails với giá trị activeKey hiện tại
                loadOrderDetails();
            } else {
                console.error('Có lỗi xảy ra khi thêm sản phẩm vào đơn hàng');
            }
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    };
    const handleTabSelect = (key) => {
        setTabClicked(true);
        loadOrderDetails(key);
    };
    
      
    const itemsMainTab = [
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
                         onSelect={(key) => handleTabSelect(key)}
                        hideAdd
                        onChange={onChanges}
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
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
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
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
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
                            onChange={null}
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
                            onChange={null}
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
                            onChange={null}
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
                            onChange={null}
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
                    columns={columnProduct}
                    dataSource={productDetails}
                    pagination={{
                        pageSize: 50,
                    }}
                    scroll={{
                        y: 240,
                    }}
                />
            </Modal>

            <Tabs defaultActiveKey="1" items={itemsMainTab} onChange={null} />
        </div>
    );
}
