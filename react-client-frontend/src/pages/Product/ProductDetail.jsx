import React, { useEffect, useState } from 'react';
import './Product.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Breadcrumb, Button, Col, Image, InputNumber, Modal, Rate, Row, Table, Tabs, message } from 'antd';
import { HomeOutlined, SendOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import ProductDetailService from '~/service/ProductDetailService';
import formatCurrency from '~/utils/format-currency';
import ImageService from '~/service/ImageService';
import CartService from '~/service/CartService';
import path_name from '~/core/constants/routers';

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

function ProductDetail() {

    let { id } = useParams();

    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    //----------------load Màu sắc----------------------------------
    const [colors, setColors] = useState([]);

    const findColorNamesByProductId = async () => {
        await ProductDetailService.findColorNamesByProductId(id)
            .then(response => {
                setColors(response);
                // console.log(response)
            }).catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        findColorNamesByProductId();
    }, []);

    //----------------Load--Kích thước------------------------------------

    const [sizes, setSizes] = useState([]);

    const findSizeNamesByProductId = async () => {
        await ProductDetailService.findSizeNamesByProductId(id)
            .then(response => {

                setSizes(response);

                // console.log(response)
            }).catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        findSizeNamesByProductId();
    }, []);
    //----------------Load--Chất liệu------------------------------------

    const [materials, setMaterial] = useState([]);

    const findMaterialNamesByProductId = async () => {
        await ProductDetailService.findMaterialNamesByProductId(id)
            .then(response => {

                setMaterial(response);

                // console.log(response)
            }).catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        findMaterialNamesByProductId();
    }, []);

    //---------------------Load sản phẩm -----------------------------------
    const [productDetail, setProductDetail] = useState([]);
    const fetchProductDetail = async () => {
        await ProductDetailService.getProductDetailsByProductId(id)
            .then(response => {

                setProductDetail(response);

                console.log(response)
            }).catch(error => {
                console.error(error);
            })
    }
    useEffect(() => {
        fetchProductDetail();
    }, []);

    //--------------------Load-ảnh------------------------------
    const [images, setImages] = useState([]);
    const findImageByProductId = async () => {
        await ImageService.findImageByProductId(id)
            .then(response => {

                setImages(response);
                // setCart(item => ({ ...item, productImage: response.imageLink }));

            }).catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        findImageByProductId();
    }, []);

    //-----------------------------------------------------------
    const [selectedColorId, setSelectedColorId] = useState(null);
    const [selectedSizeId, setSelectedSizeId] = useState(null);
    const [selectedMaterialId, setSelectedMaterialId] = useState(null);

    const [error, setError] = useState(null)

    const [quantity, setQuantity] = useState(productDetail.quantityTotal);
    const [price, setSetPrice] = useState(productDetail.minPrice);

    const [productId, setProductId] = useState(null);
    const findQuantityAndPrice = async (colorId, sizeId, materialId) => {
        const data = {
            productId: parseInt(id),
            colorId: colorId,
            sizeId: sizeId,
            materialId: materialId
        }
        await ProductDetailService.findQuantityAndPrice(data)
            .then(response => {

                setQuantity(response.quantity);
                setSetPrice(response.price)
                setCartDetail(prevCartDetail => ({ ...prevCartDetail, productDetailId: response.id }));
                setProductId(response.id)
            }).catch(error => {
                console.error(error);
            })
    }
    const resetQuantityAndPrice = () => {
        setQuantity(productDetail.quantityTotal || 0);
        setSetPrice(productDetail.minPrice || 0);
    };

    useEffect(() => {
        if (selectedColorId !== null && selectedSizeId !== null && selectedMaterialId !== null) {
            findQuantityAndPrice(selectedColorId, selectedSizeId, selectedMaterialId);
            setError(null);
        } else {
            resetQuantityAndPrice();
        }
    }, [selectedColorId, selectedSizeId, selectedMaterialId, productDetail]);

    //-----------------------------------------------
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedMaterial, setSelectedMaterial] = useState(null);



    const handleItemClick = (item, type) => {
        // Kiểm tra nếu đã chọn item này rồi thì hủy chọn

        if (type === 'color') {
            setSelectedColorId(selectedColor === item ? null : item.id);
            setSelectedColor(selectedColor === item ? null : item);
        } else if (type === 'size') {
            setSelectedSizeId(selectedSize === item ? null : item.id);
            setSelectedSize(selectedSize === item ? null : item);

        } else if (type === 'material') {
            setSelectedMaterialId(selectedMaterial === item ? null : item.id);
            setSelectedMaterial(selectedMaterial === item ? null : item);

        } else {
            if (selectedColorId !== null && selectedSizeId !== null && selectedMaterialId !== null) {
                findQuantityAndPrice(selectedColorId, selectedSizeId, selectedMaterialId);
                setError(null);
            } else {
                resetQuantityAndPrice(); // Gọi hàm reset khi không có màu và kích thước được chọn

            }
        }
    };
    //-------------------------Thêm sản phẩm vào giỏ hàng-------------------------------
    //Them khi có đăng nhập
    const userString = localStorage.getItem('user2');
    const user = userString ? JSON.parse(userString) : null;
    const userId = user ? user.id : null;
    const [cartDetail, setCartDetail] = useState({
        userId: userId,
        productDetailId: null,
        quantity: 1,
    })
    //Them khi khôg đăng nhập
    const addToLocalStorageCart = () => {
        const existingCart = JSON.parse(localStorage.getItem('localCart')) || [];

        const existingCartItem = existingCart.find(item => item.id === productId);

        if (existingCartItem) {
            // Product already exists in the local cart, update the quantity
            existingCartItem.quantity += cartDetail.quantity;
        } else {
            // Product doesn't exist in the local cart, add a new item
            const newCartItem = {
                id: productId,
                productImage: images[0]?.imageLink || '',
                productName: productDetail.productName,
                colorName: selectedColor?.colorName || '',
                sizeName: selectedSize?.sizeName || '',
                materialName: selectedMaterial?.materialName || '',
                quantity: cartDetail.quantity,
                price: price,
                totalPrice: price * cartDetail.quantity,
            };

            existingCart.push(newCartItem);
        }

        localStorage.setItem('localCart', JSON.stringify(existingCart));

        message.success('Sản phẩm đã được thêm vào giỏ hàng!');
    };

    const handleAddCart = async () => {
        if (selectedColor === null || selectedSize === null || selectedMaterial === null) {
            setError("Vui lòng chọn phân loại hàng!!!")
            return
        }
        if (user != null) {
            CartService.create(cartDetail).then(() => {

                message.success('Sản phẩm đã được thêm vào giỏ hàng!');
            }).catch(err => {
                message.error(err.response.data.errorMessage);
            });
        } else {
            addToLocalStorageCart();

        }

    };

    const items = [
        {
            key: '1',
            label: 'Mô tả',
            children: <>
                <Row style={{ marginTop: '10px' }}>
                    <span>Danh mục: {productDetail.categoryName}</span>
                </Row>
                <Row style={{ marginTop: '10px' }}>
                    <span>Thương hiệu: {productDetail.brandName}</span>
                </Row>
                <Row style={{ marginTop: '10px' }}>
                    <span>Mô tả: {productDetail.productDescribe}</span>
                </Row>
            </>,
        },

    ];
    return (
        <div className='product-detail'>
            <div className='container' style={{ height: '80px', padding: '30px 10px', }} >
                <Breadcrumb
                    style={{ fontSize: '15px' }}

                    items={[
                        {
                            title: <Link to={path_name.home}><HomeOutlined style={{ marginRight: '5px' }} />Trang chủ</Link>,
                        },
                        {
                            title: <Link to={path_name.product}>Sản phẩm</Link>,
                        },
                        {
                            title: <Link>Chi tiết sản phẩm</Link>,
                        },
                    ]}
                />
            </div>
            <div className='container'>
                <Row >
                    <Col span={12}>
                        <Row>
                            {images.length !== 1 && (
                                <Col span={4} xs={24} md={5}>
                                    {images
                                        .filter(image => !image.deleted)
                                        .map((image) => (
                                            <Row key={image.id} style={{ marginBottom: '10px' }}>
                                                <Image width={100} src={image.imageLink} alt={image} />
                                            </Row>
                                        ))}
                                </Col>
                            )}
                            <Col span={20} xs={24} md={19}>
                                <Image
                                    key={images[0]?.id}
                                    width={430}
                                    height={430}
                                    src={images[0]?.imageLink || ""}
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12} xs={24} md={12} >

                        <Row>
                            <h1 style={{ color: '#656565', fontSize: '23px' }}  >
                                {productDetail.productName}
                            </h1>
                        </Row>
                        <Row style={{ marginTop: '10px' }}>
                            <label
                                style={{ fontWeight: 'bolder', color: 'red' }}
                            >
                                {formatCurrency(price)}
                            </label>
                        </Row>
                        <Row style={{ marginTop: '15px' }}>
                            <div className="productdisplay-right-size">
                                <h1 style={{ color: '#656565', fontSize: '15px' }}>Màu sắc:</h1>
                                <Row className='productdisplay-right-sizes'>
                                    {colors.map((color) => (
                                        <label
                                            key={color.id}
                                            onClick={() => handleItemClick(color, 'color')}
                                            style={{
                                                border: `1px solid ${selectedColor === color ? '#2123bf' : '#cdcdcd'}`,
                                                color: selectedColor === color ? '#2123bf' : '#656565',
                                            }}
                                        >
                                            {color.colorName}
                                        </label>
                                    ))}
                                </Row>
                            </div>
                        </Row>
                        <Row style={{ marginTop: '15px' }}>
                            <div className="productdisplay-right-size">
                                <h1 style={{ color: '#656565', fontSize: '15px' }}>Kích thước:</h1>
                                <Row className='productdisplay-right-sizes'>
                                    {sizes.map((size) => (
                                        <label
                                            key={size.id}
                                            onClick={() => handleItemClick(size, 'size')}
                                            style={{
                                                border: `1px solid ${selectedSize === size ? '#2123bf' : '#cdcdcd'}`,
                                                color: selectedSize === size ? '#2123bf' : '#656565',
                                            }}
                                        >
                                            {size.sizeName}
                                        </label>
                                    ))}
                                </Row>
                            </div>
                        </Row>
                        <Row style={{ marginTop: '15px' }}>
                            <div className="productdisplay-right-size">
                                <h1 style={{ color: '#656565', fontSize: '15px' }}>Chất liệu:</h1>
                                <Row className='productdisplay-right-sizes'>
                                    {materials.map((material) => (
                                        <label
                                            key={material.id}
                                            onClick={() => handleItemClick(material, 'material')}
                                            style={{
                                                border: `1px solid ${selectedMaterial === material ? '#2123bf' : '#cdcdcd'}`,
                                                color: selectedMaterial === material ? '#2123bf' : '#656565',
                                            }}
                                        >
                                            {material.materialName}
                                        </label>
                                    ))}
                                </Row>
                            </div>
                        </Row>
                        <Row style={{ marginTop: '15px' }}>
                            <Col span={5}>
                                <InputNumber
                                    onChange={(value) => {
                                        // Kiểm tra nếu giá trị mới không phải là số, không làm gì cả
                                        if (isNaN(value)) {
                                            return;
                                        }

                                        // Nếu giá trị mới là số, thì cập nhật state
                                        setCartDetail(prevCartDetail => ({ ...prevCartDetail, quantity: value }));
                                        // setCart(item => ({ ...item, quantity: value }));
                                    }}
                                    min={1}
                                    max={quantity}
                                    defaultValue={1}

                                />
                            </Col>
                            <Col span={10}>
                                <Button type='primary' style={{ marginLeft: '20px' }} icon={<ShoppingCartOutlined />} onClick={handleAddCart}>Thêm vào giỏ hàng</Button>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '15px' }}>
                            <span> <b>{quantity}</b> sản phẩm có sẵn</span>
                        </Row>
                        <Row style={{ margin: '10px 0' }}>
                            {error && <span style={{ color: 'red' }}>{error}</span>}
                        </Row>

                        <Row >
                            <Button type='primary' onClick={showModal} icon={<SendOutlined />} >Bảng hướng dẫn chọn size</Button>
                        </Row>

                    </Col>
                </Row >

                <Tabs defaultActiveKey="1" style={{ marginTop: '30px' }} items={items} />
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
        </div >
    );
}
export default ProductDetail;