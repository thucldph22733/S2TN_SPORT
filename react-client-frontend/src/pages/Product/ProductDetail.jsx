import React, { useState } from 'react';
import './Product.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Image, InputNumber, Modal, Rate, Row, Table } from 'antd';
import { SendOutlined, ShoppingCartOutlined } from '@ant-design/icons';


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


    const [productDetail, setProductDetail] = useState({
        name: '',
        price: 0,
        size: '',
        color: '',
        quantity: 1, // Mặc định số lượng là 1
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductDetail({ ...productDetail, [name]: value });
    };

    const handleAddCart = () => {
        // Lưu thông tin sản phẩm vào localStorage
        saveToLocalStorage(productDetail);

        // Thông báo hoặc chuyển hướng đến trang giỏ hàng (nếu cần)
    };

    const saveToLocalStorage = (product) => {
        // Lấy danh sách sản phẩm từ localStorage (nếu có)
        const existingProducts = JSON.parse(localStorage.getItem('cart')) || [];

        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        const existingProductIndex = existingProducts.findIndex(
            (item) =>
                item.name === product.name &&
                item.size === product.size &&
                item.color === product.color
        );

        if (existingProductIndex !== -1) {
            // Nếu sản phẩm đã tồn tại, cập nhật số lượng
            existingProducts[existingProductIndex].quantity += product.quantity;
        } else {
            // Nếu sản phẩm chưa tồn tại, thêm mới vào danh sách
            existingProducts.push(product);
        }

        // Lưu danh sách sản phẩm mới vào localStorage
        localStorage.setItem('cart', JSON.stringify(existingProducts));
    };
    return (
        <div className='container'>
            <Row style={{ margin: '30px 0px' }}>
                <Col span={12}>
                    <Row >
                        <Col span={6}>
                            <Row style={{ marginBottom: '10px' }}>
                                <Image width={120} src="https://www.bootdey.com/image/115x100/87CEFA/000000" alt="" />
                            </Row>
                            <Row style={{ marginBottom: '10px' }}>
                                <Image width={120} src="https://www.bootdey.com/image/115x100/FF7F50/000000" alt="" />
                            </Row>
                            <Row style={{ marginBottom: '10px' }}>
                                <Image width={120} src="https://www.bootdey.com/image/115x100/20B2AA/000000" alt="" />
                            </Row>
                            <Row style={{ marginBottom: '10px' }}>
                                <Image width={120} src="https://www.bootdey.com/image/120x100/20B2AA/000000" alt="" />
                            </Row>
                        </Col>
                        <Col span={18} >
                            <Image width={400} height={443} src="https://www.bootdey.com/image/550x380/FFB6C1/000000" alt="" />
                        </Col>
                    </Row>
                </Col>
                <Col span={12} style={{ padding: '0 40px ' }}>

                    <Row>
                        <h1 style={{ color: '#656565', fontSize: '23px' }}>Leopard Shirt Dress</h1>
                    </Row>
                    <Row style={{ marginTop: '5px' }}>
                        <Rate style={{ fontSize: '16px', marginTop: '3px', marginRight: '5px' }} /><span>(Đánh giá)</span>
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                        <label style={{ fontWeight: 'bolder', color: 'red' }} >8.000.000 VND</label>
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
                                <label>Do</label>
                                <label >Xanh</label>
                                <label >Vang</label>
                            </Row>
                        </div>
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                        <div className="productdisplay-right-size">
                            <h1 style={{ color: '#656565', fontSize: '15px' }}>Kích thước:</h1>
                            <Row className='productdisplay-right-sizes'>
                                <label >S</label>
                                <label>M</label>
                                <label>L</label>
                                <label>XL</label>
                                <label>XXL</label>
                            </Row>
                        </div>
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                        <Col span={5}>
                            <InputNumber min={1} max={10} defaultValue={1} />
                        </Col>
                        <Col span={10}>
                            <Button type='primary' style={{ marginLeft: '20px' }} icon={<ShoppingCartOutlined />} onClick={handleAddCart}>Thêm vào giỏ hàng</Button>
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
    );
}
export default ProductDetail;