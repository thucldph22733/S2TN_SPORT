import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import banner1 from '~/assets/images/banner/banner_1.jpg'
import banner2 from '~/assets/images/banner/banner_2.jpg'
import banner3 from '~/assets/images/banner/banner_3.jpg'
import banner4 from '~/assets/images/banner/banner_4.jpg'
import feedback from '~/assets/images/bannner1.png'
import banner from '~/assets/images/banner_4.png'
import { GiBurningRoundShot } from "react-icons/gi";
import { FaSalesforce } from "react-icons/fa";
import { MdFiberNew } from "react-icons/md";
import { Card, Col, Image, Pagination, Row } from 'antd';
import path_name from '~/core/constants/routers';
import ProductService from '~/service/ProductService';
import formatCurrency from '~/utils/format-currency';

const { Meta } = Card;

const Home = () => {
    //----------------------------------Sản phẩm hot--------------------------------------------------
    const [productHot, setProductHot] = useState([]);
    const [paginationHot, setPaginationHot] = useState({ current: 1, pageSize: 4, total: 0 });
    const getProductHomePageByProductHot = async (page, pageSize) => {

        await ProductService.getProductHomePageByProductHot(page, pageSize)
            .then(response => {

                setProductHot(response.data);

                setPaginationHot({
                    ...paginationHot,
                    current: response.pagination.currentPage,
                    pageSize: response.pagination.pageSize,
                    total: response.totalCount,
                });

            }).catch(error => {
                console.error(error);
            })
    }
    const handlePageChangeHot = (page, pageSize) => {
        getProductHomePageByProductHot(page - 1, pageSize);
    };

    const handleSizeChangeHot = (current, size) => {
        getProductHomePageByProductHot(0, size);
    };

    useEffect(() => {
        getProductHomePageByProductHot(paginationHot.current - 1, paginationHot.pageSize);
    }, [paginationHot.current, paginationHot.pageSize]);


    //-----------------------Sản phẩm mới----------------------------------------------------
    const [productNew, setProductNew] = useState([]);
    const [paginationNew, setPaginationNew] = useState({ current: 1, pageSize: 4, total: 0 });
    const getProductHomePageByProductNew = async (page, pageSize) => {

        await ProductService.getProductHomePageByProductNew(page, pageSize)
            .then(response => {

                setProductNew(response.data);

                setPaginationNew({
                    ...paginationNew,
                    current: response.pagination.currentPage,
                    pageSize: response.pagination.pageSize,
                    total: response.totalCount,
                });

            }).catch(error => {
                console.error(error);
            })
    }
    const handlePageChangeNew = (page, pageSize) => {
        getProductHomePageByProductNew(page - 1, pageSize);
    };

    const handleSizeChangeNew = (current, size) => {
        getProductHomePageByProductNew(0, size);
    };

    useEffect(() => {
        getProductHomePageByProductNew(paginationNew.current - 1, paginationNew.pageSize);
    }, [paginationNew.current, paginationNew.pageSize]);


    // ---------------------Sản phẩm bán chạy------------------------------------------------
    const [productSale, setProductSale] = useState([]);
    const [paginationSale, setPaginationSale] = useState({ current: 1, pageSize: 4, total: 0 });
    const getProductHomePageByProductSale = async (page, pageSize) => {

        await ProductService.getProductHomePageByProductSale(page, pageSize)
            .then(response => {

                setProductSale(response.data);

                setPaginationSale({
                    ...paginationSale,
                    current: response.pagination.currentPage,
                    pageSize: response.pagination.pageSize,
                    total: response.totalCount,
                });

            }).catch(error => {
                console.error(error);
            })
    }
    const handlePageChangeSale = (page, pageSize) => {
        getProductHomePageByProductSale(page - 1, pageSize);
    };

    const handleSizeChangeSale = (current, size) => {
        getProductHomePageByProductSale(0, size);
    };

    useEffect(() => {
        getProductHomePageByProductSale(paginationSale.current - 1, paginationSale.pageSize);
    }, [paginationSale.current, paginationSale.pageSize]);



    return (
        <div style={{ marginBottom: '100px' }}>
            <h4 style={{ textAlign: 'center', marginTop: '20px', fontWeight: '600' }}>DANH MỤC SẢN PHẨM</h4>
            <p style={{ textAlign: 'center', fontWeight: '400' }}>Hàng nghìn mẫu áo độc quyền theo từng phong cách khác nhau để quý khách chọn lựa!</p>
            <Row style={{ margin: '20px', borderBottom: '1px solid #cdcdcd' }}>
                <Col span={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                    <Link to={"dvg"}>
                        <Card
                            hoverable
                            style={{ width: '100%', textAlign: 'center', border: 'none' }}
                            cover={<img alt="example" src={banner2} style={{ borderRadius: '50%' }} />}
                        >
                            <Meta title="ÁO ĐỘI TUYỂN" />
                        </Card>
                    </Link>
                </Col>
                <Col span={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', }}>
                    <Link to={"dvg"}>
                        <Card
                            hoverable
                            style={{ width: '100%', textAlign: 'center', border: 'none' }}
                            cover={<img alt="example" src={banner1} style={{ borderRadius: '50%' }} />}
                        >
                            <Meta title="ÁO CÂU LẠC BỘ" />
                        </Card>
                    </Link>
                </Col>

                <Col span={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                    <Link to={"dvg"}>
                        <Card
                            hoverable
                            style={{ width: '100%', textAlign: 'center', border: 'none' }}
                            cover={<img alt="example" src={banner3} style={{ borderRadius: '50%' }} />}
                        >
                            <Meta title="ÁO KHÔNG LOGO" />
                        </Card>
                    </Link>
                </Col>
                <Col span={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                    <Link to={"dvg"}>
                        <Card
                            hoverable
                            style={{ width: '100%', textAlign: 'center', border: 'none' }}
                            cover={<img alt="example" src={banner4} style={{ borderRadius: '50%' }} />}
                        >
                            <Meta title="ÁO KHÁC" />
                        </Card>
                    </Link>
                </Col>
            </Row>

            <h4 style={{ textAlign: 'center', marginTop: '40px', fontWeight: '600' }}>TỔNG QUAN SẢN PHẨM</h4>
            <h6 style={{ marginTop: '20px', textAlign: 'center', fontWeight: '600' }}>SẢN PHẨM MỚI <MdFiberNew style={{ color: 'brown', fontSize: '20px', marginBottom: '10px' }} /></h6>
            <div className='container'>
                <Row justify="center" gutter={[16, 16]}>
                    {productNew && productNew.map((item) => (
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
                    onChange={handlePageChangeNew}
                    onShowSizeChange={handleSizeChangeNew}
                    defaultCurrent={1}
                    current={paginationNew.current}
                    pageSize={paginationNew.pageSize}
                    total={paginationNew.total}
                    style={{ float: 'right', marginTop: '10px' }}
                />
            </div>
            <img style={{ width: '95%', height: '300px', margin: '20px 40px', }} src={banner} alt="sd" />
            <h6 style={{ marginTop: '20px', textAlign: 'center', fontWeight: '600' }}>SẢN PHẨM HOT <GiBurningRoundShot style={{ color: 'red', fontSize: '20px', marginBottom: '10px' }} /></h6>
            <div className='container'>
                <Row justify="center" gutter={[16, 16]} >
                    {productHot && productHot.map((item) => (
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
                    onChange={handlePageChangeHot}
                    onShowSizeChange={handleSizeChangeHot}
                    defaultCurrent={1}
                    current={paginationHot.current}
                    pageSize={paginationHot.pageSize}
                    total={paginationHot.total}
                    style={{ float: 'right', marginTop: '10px' }}
                />
            </div>
            <img style={{ width: '95%', margin: '20px 40px', }} src={feedback} alt="" />
            <h6 style={{ marginTop: '20px', textAlign: 'center', fontWeight: '600' }}>SẢN PHẨM BÁN CHẠY <FaSalesforce style={{ color: 'blueviolet', fontSize: '20px', marginBottom: '10px' }} /></h6>
            <div className='container'>
                <Row justify="center" gutter={[16, 16]} >
                    {productSale && productSale.map((item) => (
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
                    onChange={handlePageChangeSale}
                    onShowSizeChange={handleSizeChangeSale}
                    defaultCurrent={1}
                    current={paginationSale.current}
                    pageSize={paginationSale.pageSize}
                    total={paginationSale.total}
                    style={{ float: 'right', marginTop: '10px' }}
                />

            </div>
        </div>
    )

};

export default Home;
