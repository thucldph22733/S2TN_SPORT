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
import { Breadcrumb, Card, Checkbox, Col, Collapse, Image, Pagination, Row } from 'antd';
import { FilterOutlined, HomeOutlined } from '@ant-design/icons';
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
        sizeIds: null
    });
    console.log(filterProduct)
    // const [pagination, setPagination] = useState({ current: 1, pageSize: 2, total: 0 });
    // const [selectedCategories, setSelectedCategories] = useState(null);
    // const [selectedBrands, setSelectedBrands] = useState([]);
    // const [selectedMaterials, setSelectedMaterials] = useState([]);
    // const [selectedColors, setSelectedColors] = useState([]);
    // const [selectedSizes, setSelectedSizes] = useState([]);
    // console.log(selectedCategories)
    const handleCategoryChange = (checkedValues) => {
        console.log(checkedValues)
        setFilterProduct({
            ...filterProduct,
            categoryIds: checkedValues.length == 0 ? null : checkedValues
        });

    };
    // console.log(selectedCategories)
    // const handleBrandChange = (checkedValues) => {
    //     setSelectedBrands(checkedValues);
    // };

    // const handleMaterialChange = (checkedValues) => {
    //     setSelectedMaterials(checkedValues);
    // };

    // const handleColorChange = (checkedValues) => {
    //     setSelectedColors(checkedValues);
    // };

    // const handleSizesChange = (checkedValues) => {
    //     setSelectedSizes(checkedValues);
    // };

    const findProductsByFilters = async () => {

        await ProductService.findProductsByFilters(filterProduct)
            .then(response => {
                setProducts(response.data);
                // setPagination({
                //     ...pagination,
                //     current: response.pagination.currentPage,
                //     pageSize: response.pagination.pageSize,
                //     total: response.totalCount,
                // });

            }).catch(error => {
                console.error(error);
            })
    }
    // const handlePageChange = (page, pageSize) => {
    //     findProductsByFilters(page - 1, pageSize);
    // };

    // const handleSizeChange = (current, size) => {
    //     findProductsByFilters(0, size);
    // };

    useEffect(() => {
        findProductsByFilters();
    }, [filterProduct]);
    return (
        <>
            <div className='container' style={{ height: '80px', padding: '30px 10px' }} >
                <Breadcrumb
                    style={{ fontSize: '15px' }}

                    items={[
                        {
                            title: <Link to=""><HomeOutlined style={{ marginRight: '5px' }} />Trang chủ</Link>,
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
                    <Col span={5} style={{ paddingRight: '10px' }}>
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
                                        {brands.map((brand) => (
                                            <Row key={brand.id}>
                                                <Checkbox value={brand.id}>{brand.brandName}</Checkbox>
                                            </Row>
                                        ))}
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
                                        {materials.map((material) => (
                                            <Row key={material.id}>
                                                <Checkbox value={material.id}>{material.materialName}</Checkbox>
                                            </Row>
                                        ))}
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
                                        {colors.map((color) => (
                                            <Row key={color.id}>
                                                <Checkbox value={color.id}>{color.colorName}</Checkbox>
                                            </Row>
                                        ))}
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
                                        {sizes.map((size) => (
                                            <Row key={size.id}>
                                                <Checkbox value={size.id}>{size.sizeName}</Checkbox>
                                            </Row>
                                        ))}
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
                                    children: <>
                                        <Row><Checkbox >0 đ - 200.000 đ</Checkbox></Row>
                                        <Row><Checkbox >200.000 đ - 400.000 đ</Checkbox></Row>
                                        <Row><Checkbox >400.000 đ - 800.000 đ</Checkbox></Row>
                                        {/* <Row><Checkbox >Áo đội tuyển</Checkbox></Row>
                                        <Row><Checkbox >Áo đội tuyển</Checkbox></Row> */}
                                    </>,

                                },
                            ]}
                        />
                    </Col>
                    <Col span={19}>
                        <Row gutter={[16, 16]} >
                            {products && products.map((item) => (
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
                        {/* <Pagination
                            onChange={handlePageChange}
                            onShowSizeChange={handleSizeChange}
                            defaultCurrent={1}
                            current={pagination.current}
                            pageSize={pagination.pageSize}
                            total={pagination.total}
                            style={{ float: 'right', marginTop: '10px' }}
                        /> */}
                    </Col>
                </Row>

            </div >
        </>
    )
}

export default Product