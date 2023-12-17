import React, { useState } from 'react';
import './Product.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Breadcrumb, Button, Col, Image, InputNumber, Modal, Rate, Row, Table } from 'antd';
import { HomeOutlined, SendOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import imgage1 from '~/assets/images/product/product-21.jpg';
import imgage2 from '~/assets/images/product/product-20.jpg';
import { Link } from 'react-router-dom';
import { MdLabelImportantOutline } from 'react-icons/md';


function ProductDetail() {
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    const dataSource = [
        {
            size: 'S',
            height: '1m45-1m59',
            weight: '40-49kg',

        },
        {
            size: 'M',
            height: '1m60-1m68',
            weight: '50-57kg',
        },
        {
            size: 'L',
            height: '1m69-1m75',
            weight: '58-66kg',
        },
        {
            size: 'XL',
            height: '1m76-1m80',
            weight: '67-75kg',
        },
        {
            size: 'XXL',
            height: 'Trên 1m80',
            weight: 'Trên 75kg',
        },
    ];

    const columns = [
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: 'Chiều cao',
            dataIndex: 'height',
            key: 'height',
        },
        {
            title: 'Cân nặng',
            dataIndex: 'weight',
            key: 'weight',
        },
    ];
    const [selectedColor, setSelectedColor] = useState(null); // New state for selected color

    const [productDetail, setProductDetail] = useState({
        name: 'Leopard Shirt Dress',
        price: '8.000.000 VND',
        color: '',
        size: '',
        quantity: 1,
    });

    const handleColorClick = (color) => {
        setSelectedColor(color === selectedColor ? null : color);
        setProductDetail({ ...productDetail, color });
    };

    const handleAddCard = () => {
        // Lưu giá trị từ các label vào localStorage
        localStorage.setItem('product-detail', JSON.stringify({
            name: getLabelValue('productName'),
            price: getLabelValue('productPrice'),
            color: productDetail.color,
            size: productDetail.size,
            quantity: productDetail.quantity,
        }));
    };

    // Hàm để lấy giá trị từ các label
    const getLabelValue = (key) => {
        const labelElement = document.getElementById(key);
        return labelElement ? labelElement.innerText : '';
    };
    return (
        <div className='product-detail'>
            <div className='container' style={{ height: '80px', padding: '30px 10px', }} >
                <Breadcrumb
                    style={{ fontSize: '15px' }}

                    items={[
                        {
                            title: <Link to=""><HomeOutlined style={{ marginRight: '5px' }} />Trang chủ</Link>,
                        },
                        {
                            title: <Link to="">Sản phẩm</Link>,
                        },
                        {
                            title: <Link to="">Chi tiết sản phẩm</Link>,
                        },
                    ]}
                />
            </div>
            <div className='container'>
                <Row >
                    <Col span={12}>
                        <Row >
                            <Col span={6} xs={24} md={6}>
                                <Row style={{ marginBottom: '10px' }}>
                                    <Image width={120} src={imgage1} alt="cc" />
                                </Row>
                                <Row style={{ marginBottom: '10px' }}>
                                    <Image width={120} src={imgage1} alt="cc" />
                                </Row>
                                <Row style={{ marginBottom: '10px' }}>
                                    <Image width={120} src={imgage1} alt="cc" />
                                </Row>
                                <Row style={{ marginBottom: '10px' }}>
                                    <Image width={120} src={imgage1} alt="cc" />
                                </Row>
                            </Col>
                            <Col span={18} xs={24} md={18}>
                                <Image width={400} height={448} src={imgage1} alt="cc" />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12} xs={24} md={12} style={{ padding: '0 40px ' }}>

                        <Row>
                            <h1
                                style={{ color: '#656565', fontSize: '23px' }}
                                id="productName"
                                onChange={(e) => setProductDetail({ ...productDetail, name: e.target.innerText })}
                            >
                                {productDetail.name}
                            </h1>
                        </Row>
                        <Row style={{ marginTop: '5px' }}>
                            <Rate style={{ fontSize: '16px', marginTop: '3px', marginRight: '5px' }} /><span>(Đánh giá)</span>
                        </Row>
                        <Row style={{ marginTop: '10px' }}>
                            <label
                                id="productPrice"
                                style={{ fontWeight: 'bolder', color: 'red' }}
                                onChange={(e) => setProductDetail({ ...productDetail, price: e.target.innerText })}
                            >
                                {productDetail.price}
                            </label>
                        </Row>
                        <Row style={{ marginTop: '10px' }}>
                            Praesent ac condimentum felis.
                            Nulla at nisl orci, at dignissim dolor,
                            Nulla at nisl orci, at dignissim dolor,
                        </Row>
                        <Row style={{ marginTop: '10px' }}>
                            <div className="productdisplay-right-size">
                                <h1 style={{ color: '#656565', fontSize: '15px' }}>Màu sắc:</h1>
                                <Row className='productdisplay-right-sizes'>
                                    <label
                                        style={{ backgroundColor: selectedColor === 'Do' ? 'red' : 'fbfbfb' }}
                                        onClick={() => handleColorClick('Do')}
                                    >
                                        Do
                                    </label>
                                    <label
                                        style={{ backgroundColor: selectedColor === 'Xanh' ? 'red' : 'fbfbfb' }}
                                        onClick={() => handleColorClick('Xanh')}
                                    >
                                        Xanh
                                    </label>
                                    <label
                                        style={{ backgroundColor: selectedColor === 'Vang' ? 'red' : 'fbfbfb' }}
                                        onClick={() => handleColorClick('Vang')}
                                    >
                                        Vang
                                    </label>
                                </Row>
                            </div>
                        </Row>
                        <Row style={{ marginTop: '10px' }}>
                            <div className="productdisplay-right-size">
                                <h1 style={{ color: '#656565', fontSize: '15px' }}>Kích thước:</h1>
                                <Row className='productdisplay-right-sizes'>
                                    <label
                                        id="productSize"
                                        onChange={(e) => setProductDetail({ ...productDetail, size: e.target.innerText })}
                                    >
                                        S
                                    </label>
                                    <label>M</label>
                                    <label>L</label>
                                    <label>XL</label>
                                    <label>XXL</label>
                                </Row>
                            </div>
                        </Row>
                        <Row style={{ marginTop: '10px' }}>
                            <Col span={5}>
                                <InputNumber
                                    value={productDetail.quantity}
                                    onChange={(value) => setProductDetail({ ...productDetail, quantity: value })}
                                    min={1} max={10} defaultValue={1}
                                />
                            </Col>
                            <Col span={10}>
                                <Button type='primary' onClick={handleAddCard} style={{ marginLeft: '20px' }} icon={<ShoppingCartOutlined />} >Thêm vào giỏ hàng</Button>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '10px' }}>
                            <span>Danh mục: Áo câu lạc bộ</span>
                        </Row>
                        <Row style={{ marginTop: '10px' }}>
                            <span>Chất liệu: Cotton</span>
                        </Row>
                        <Row style={{ marginTop: '10px' }}>
                            <Button type='primary' onClick={showModal} icon={<SendOutlined />} >Bảng hướng dẫn chọn size</Button>
                        </Row>
                    </Col>

                </Row >
                <Modal
                    title="Hướng dẫn chọn size"
                    open={open}
                    footer={null}
                    onCancel={handleCancel}
                    width={750}
                >
                    <p>Việc chọn size áo rất quan trọng, các bạn nên đọc kỹ các thông số S2TN SPORT đưa ra dưới đây trước để chọn cho mình 1 size áo bóng đá phù hợp:</p>
                    <Table dataSource={dataSource} columns={columns} pagination={false} />
                </Modal>
            </div >
        </div>
    );
}
export default ProductDetail;