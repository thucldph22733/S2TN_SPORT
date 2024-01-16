import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import imgage1 from '~/assets/images/product/product-21.jpg';
import imgage2 from '~/assets/images/product/product-20.jpg';
import banner1 from '~/assets/images/banner/banner_1.jpg'
import banner2 from '~/assets/images/banner/banner_2.jpg'
import banner3 from '~/assets/images/banner/banner_3.jpg'
import banner4 from '~/assets/images/banner/banner_4.jpg'
import { GiBurningRoundShot } from "react-icons/gi";
import { FaSalesforce } from "react-icons/fa";
import { MdFiberNew } from "react-icons/md";
import { AutoComplete, Breadcrumb, Card, Checkbox, Col, Collapse, Empty, Image, Input, Pagination, Radio, Row, Space } from 'antd';
import { ExclamationCircleOutlined, FilterOutlined, FrownOutlined, HomeOutlined } from '@ant-design/icons';
import path_name from '~/core/constants/routers';
import CategoryService from '~/service/CategoryService';
import BrandService from '~/service/BrandService';
import SizeService from '~/service/SizeService';
import ColorService from '~/service/ColorService';
import MaterialService from '~/service/MaterialService';
import ProductService from '~/service/ProductService';
import formatCurrency from '~/utils/format-currency';
// import './Home.css';
const { Meta } = Card;

function Product() {

    //---------------------------Danh mục-----------------------------------------
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategory()
    }, []);

    const fetchCategory = async () => {

        await CategoryService.findAllByDeletedTrue()
            .then(response => {

                setCategories(response.data)
            }).catch(error => {
                console.error(error);
            })
    }
    //-----------------------Thương hiệu-------------------------------
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        fetchBrand()
    }, []);
    const fetchBrand = async () => {

        await BrandService.findAllByDeletedTrue()
            .then(response => {

                setBrands(response.data)

            }).catch(error => {
                console.error(error);
            })
    }

    //---------------------------Kích thước-------------------------------------
    const [sizes, setSizes] = useState([]);

    useEffect(() => {
        fetchSize()
    }, []);

    const fetchSize = async () => {

        await SizeService.findAllByDeletedTrue()
            .then(response => {
                setSizes(response.data)
            }).catch(error => {
                console.error(error);
            })
    }
    //--------------------------------Màu sắc--------------------------------
    const [colors, setColors] = useState([]);

    useEffect(() => {
        fetchColor()
    }, []);
    const fetchColor = async () => {

        await ColorService.findAllByDeletedTrue()
            .then(response => {

                setColors(response.data)
            }).catch(error => {
                console.error(error);
            })
    }
    //-------------------------Chất liệu----------------------------------
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        fetchMaterial()
    }, []);
    const fetchMaterial = async () => {

        await MaterialService.findAllByDeletedTrue()
            .then(response => {

                setMaterials(response.data)

            }).catch(error => {
                console.error(error);
            })
    }
    //-----------------------------Sản phẩm-----------------------------
    const [products, setProducts] = useState([]);

    const [filterProduct, setFilterProduct] = useState({
        pageNo: 0,
        pageSize: 12,
        categoryIds: null,
        brandIds: null,
        colorIds: null,
        materialIds: null,
        sizeIds: null,
        minPrice: null,
        maxPrice: null,
        productName: null,
    });

    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const findProductsByFilters = async () => {

        await ProductService.findProductsByFilters(filterProduct)
            .then(response => {
                setProducts(response.data);
                setPagination({
                    ...pagination,
                    current: response.pagination.currentPage,
                    pageSize: response.pagination.pageSize,
                    total: response.totalCount,
                });

            }).catch(error => {
                console.error(error);
            })
    }
    const handlePageChange = (page, pageSize) => {
        setFilterProduct({
            ...filterProduct,
            pageNo: page - 1,
            pageSize: pageSize
        })
    };

    useEffect(() => {
        findProductsByFilters();
    }, [filterProduct]);
    const [productName, setProductName] = useState(null);
    const handleSearch = () => {
        setFilterProduct({
            ...filterProduct,
            productName: productName,
            pageNo: 0,
        });
    };
    // lọc danh mục
    const handleCategoryChange = (checkedValues) => {
        setFilterProduct({
            ...filterProduct,
            categoryIds: checkedValues.length == 0 ? null : checkedValues,
            pageNo: 0
        });

    };
    //lọc thương hiệu
    const handleBrandChange = (checkedValues) => {
        console.log(checkedValues)
        setFilterProduct({
            ...filterProduct,
            brandIds: checkedValues.length == 0 ? null : checkedValues,
            pageNo: 0
        });
    };
    //lọc chất liệu
    const handleMaterialChange = (checkedValues) => {
        setFilterProduct({
            ...filterProduct,
            materialIds: checkedValues.length == 0 ? null : checkedValues,
            pageNo: 0
        });
    };
    //lọc màu sắc
    const handleColorChange = (checkedValues) => {
        setFilterProduct({
            ...filterProduct,
            colorIds: checkedValues.length == 0 ? null : checkedValues,
            pageNo: 0
        });
    };
    //lọc kích thước
    const handleSizesChange = (checkedValues) => {
        setFilterProduct({
            ...filterProduct,
            sizeIds: checkedValues.length == 0 ? null : checkedValues,
            pageNo: 0
        });
    };
    //lọc theo khoảng giá
    const [priceRange, setPriceRange] = useState(null);

    const handlePriceRangeChange = (e) => {
        const value = e.target.value;
        setPriceRange(value);
        setFilterProduct({
            ...filterProduct,
            minPrice: calculateMinPrice(value),
            maxPrice: calculateMaxPrice(value),
            pageNo: 0
        });
    };

    const calculateMinPrice = (range) => {
        switch (range) {
            case 1:
                return 0;
            case 2:
                return 200000;
            case 3:
                return 400000;
            case 4:
                return 600000;
            default:
                return null;
        }
    };

    const calculateMaxPrice = (range) => {
        switch (range) {
            case 1:
                return 200000;
            case 2:
                return 400000;
            case 3:
                return 600000;
            case 4:
                return null;
            default:
                return null;
        }
    };

    return (
        <>
            <div className='container' style={{ height: '80px', padding: '30px 10px' }} >
                <Breadcrumb
                    style={{ fontSize: '15px' }}

                    items={[
                        {
                            title: <Link to="/"><HomeOutlined style={{ marginRight: '5px' }} />Trang chủ</Link>,
                        },
                        {
                            title: <Link to="">Sản phẩm</Link>,
                        },
                    ]}
                />
            </div>
            <div className='container'>
                <h6><FilterOutlined style={{ marginRight: '7px' }} />Bộ lọc </h6>
                <Row>
                    <Col span={5} style={{ paddingRight: '15px' }}>

                        <Input.Search
                            style={{ width: '100%' }}
                            placeholder="Tìm tên sản phẩm..."
                            enterButton
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            onSearch={handleSearch}
                        />
                        <Collapse
                            size="small"
                            style={{ border: 'none' }}
                            items={[
                                {
                                    key: '1',
                                    label: 'Danh mục',
                                    children: (
                                        <>
                                            <Checkbox.Group onChange={(checkedValue) => handleCategoryChange(checkedValue)}>
                                                <Row gutter={[6, 6]} >
                                                    {categories.map((category) => (
                                                        <Col key={category.id} span={24}>
                                                            <Checkbox value={category.id}>
                                                                {category.categoryName}
                                                            </Checkbox>
                                                        </Col>
                                                    ))}
                                                </Row>
                                            </Checkbox.Group >
                                        </>
                                    ),
                                },
                            ]}
                        />

                        <Collapse
                            size="small"
                            style={{ border: 'none' }}
                            items={[
                                {
                                    key: '1',
                                    label: 'Thương hiệu',
                                    children: <>
                                        <Checkbox.Group onChange={(checkedValue) => handleBrandChange(checkedValue)}>
                                            <Row gutter={[6, 6]} >
                                                {brands.map((brand) => (
                                                    <Col key={brand.id} span={24}>
                                                        <Checkbox value={brand.id}>
                                                            {brand.brandName}
                                                        </Checkbox>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </Checkbox.Group>
                                    </>

                                },
                            ]}
                        />
                        <Collapse
                            size="small"
                            style={{ border: 'none' }}
                            items={[
                                {
                                    key: '1',
                                    label: 'Chất liệu',
                                    children: <>
                                        <Checkbox.Group onChange={(checkedValue) => handleMaterialChange(checkedValue)}>
                                            <Row gutter={[6, 6]} >
                                                {materials.map((material) => (
                                                    <Col key={material.id} span={24}>
                                                        <Checkbox value={material.id}>{material.materialName}</Checkbox>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </Checkbox.Group>
                                    </>
                                },
                            ]}
                        />
                        <Collapse
                            size="small"
                            style={{ border: 'none' }}
                            items={[
                                {
                                    key: '1',
                                    label: 'Màu sắc',
                                    children: <>
                                        <Checkbox.Group onChange={(checkedValue) => handleColorChange(checkedValue)}>
                                            <Row gutter={[6, 6]} >
                                                {colors.map((color) => (
                                                    <Col key={color.id} span={12}>
                                                        <Checkbox value={color.id}>{color.colorName}</Checkbox>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </Checkbox.Group>
                                    </>

                                },
                            ]}
                        />
                        <Collapse
                            size="small"
                            style={{ border: 'none' }}
                            items={[
                                {
                                    key: '1',
                                    label: 'Kích thước',
                                    children: <>
                                        <Checkbox.Group onChange={(checkedValue) => handleSizesChange(checkedValue)}>
                                            <Row gutter={[6, 6]} >
                                                {sizes.map((size) => (
                                                    <Col key={size.id} span={12}>
                                                        <Checkbox value={size.id}>{size.sizeName}</Checkbox>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </Checkbox.Group>
                                    </>
                                },
                            ]}
                        />
                        <Collapse
                            size="small"
                            style={{ border: 'none' }}
                            items={[
                                {
                                    key: '1',
                                    label: 'Khoảng giá',
                                    children: <Radio.Group onChange={handlePriceRangeChange} value={priceRange}>
                                        <Space direction="vertical">
                                            <Radio value={1}>Dưới 200.000 đ</Radio>
                                            <Radio value={2}>200.000 đ - 400.000 đ</Radio>
                                            <Radio value={3}>400.000 đ - 600.000 đ</Radio>
                                            <Radio value={4}>Trên 600.000 đ</Radio>
                                        </Space>
                                    </Radio.Group>
                                },
                            ]}
                        />
                    </Col>
                    <Col span={19}>
                        {products.length === 0 ? (
                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <Empty description="Không tìm thấy sản phẩm nào!" />
                            </div>
                        ) : (
                            <>
                                <Row gutter={[16, 16]}>
                                    {products.map((item) => (
                                        <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
                                            <Link to={`${path_name.product_detail}/${item.id}`}>
                                                <Card
                                                    hoverable
                                                    style={{
                                                        width: '100%',
                                                        textAlign: 'center',
                                                    }}
                                                    cover={<Image alt="example" src={item.imageUrl} />}
                                                >
                                                    <Meta title={item.productName} description={<span style={{ color: 'red', fontWeight: '550' }}>{formatCurrency(item.minPrice)}</span>} />
                                                </Card>
                                            </Link>
                                        </Col>
                                    ))}
                                </Row>
                                <Pagination
                                    onChange={handlePageChange}
                                    current={pagination.current}
                                    pageSize={pagination.pageSize}
                                    total={pagination.total}
                                    style={{ float: 'right', marginTop: '10px' }}
                                />
                            </>
                        )}
                    </Col>
                </Row>

            </div >
        </>
    )
}

export default Product