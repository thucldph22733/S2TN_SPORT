import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import imgage1 from '~/assets/images/product/product-21.jpg';
import imgage2 from '~/assets/images/product/product-20.jpg';
import banner1 from '~/assets/images/banner/banner_1.jpg'
import banner2 from '~/assets/images/banner/banner_2.jpg'
import banner3 from '~/assets/images/banner/banner_3.jpg'
import banner4 from '~/assets/images/banner/banner_4.jpg'
import feedback from '~/assets/images/bannner1.png'
import banner from '~/assets/images/bannner.png'
import { GiBurningRoundShot } from "react-icons/gi";
import { FaSalesforce } from "react-icons/fa";
import { MdFiberNew } from "react-icons/md";
import { Avatar, Card, Col, Image, Pagination, Row } from 'antd';
import './Home.css';
import path_name from '~/core/constants/routers';
import ProductService from '~/service/ProductService';
import formatCurrency from '~/utils/format-currency';
import { AntDesignOutlined } from '@ant-design/icons';
import { FaFacebook } from "react-icons/fa";

const { Meta } = Card;

const Home = () => {


    const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });

    //----------------------------------Sản phẩm hot--------------------------------------------------
    const [productHot, setProductHot] = useState(null);

    const getProductHomePageByProductHot = async () => {

        await ProductService.getProductHomePageByProductHot(pagination.current - 1, pagination.pageSize)
            .then(response => {

                setProductHot(response.data);
                console.log(response.data)
                setPagination({
                    ...pagination,
                    total: response.totalCount,
                });
                console.log(response.data)
            }).catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        getProductHomePageByProductHot();
    }, [pagination.current, pagination.pageSize]);

    //-----------------------Sản phẩm mới----------------------------------------------------
    const [productNew, setProductNew] = useState(null);
    const getProductHomePageByProductNew = async () => {

        await ProductService.getProductHomePageByProductNew(pagination.current - 1, pagination.pageSize)
            .then(response => {

                setProductNew(response.data);
                console.log(response.data)
                setPagination({
                    ...pagination,
                    total: response.totalCount,
                });
                console.log(response.data)
            }).catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        getProductHomePageByProductNew();
    }, [pagination.current, pagination.pageSize]);


    // ---------------------Sản phẩm bán chạy------------------------------------------------
    const [productSale, setProductSale] = useState(null);
    const getProductHomePageByProductSale = async () => {

        await ProductService.getProductHomePageByProductSale(pagination.current - 1, pagination.pageSize)
            .then(response => {

                setProductSale(response.data);
                console.log(response.data)
                setPagination({
                    ...pagination,
                    total: response.totalCount,
                });
                console.log(response.data)
            }).catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        getProductHomePageByProductSale();
    }, [pagination.current, pagination.pageSize]);

    // const handleTableChange = (pagination) => {
    //     setPagination({
    //         ...pagination,
    //     });


    return (
        <>
            <h4 style={{ textAlign: 'center', marginTop: '20px' }}>DANH MỤC SẢN PHẨM</h4>
            <p style={{ textAlign: 'center' }}>Hàng nghìn mẫu áo độc quyền theo từng phong cách khác nhau để quý khách chọn lựa!</p>
            <Row style={{ margin: '20px', borderBottom: '1px solid #e1e1e1' }}>
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

            <h4 style={{ textAlign: 'center', marginTop: '40px' }}>TỔNG QUAN SẢN PHẨM</h4>
            <h6 style={{ marginTop: '20px', textAlign: 'center' }}>SẢN PHẨM MỚI <MdFiberNew style={{ color: 'brown', fontSize: '20px', marginBottom: '10px' }} /></h6>
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
                                    <Meta title={item.productName} description={formatCurrency(item.minPrice)} />
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </div>
            <img style={{ width: '95%', height: '350px', margin: '20px 40px', }} src={banner} alt="" />
            <h6 style={{ marginTop: '20px', textAlign: 'center' }}>SẢN PHẨM HOT <GiBurningRoundShot style={{ color: 'red', fontSize: '20px', marginBottom: '10px' }} /></h6>
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
                                    <Meta title={item.productName} description={formatCurrency(item.minPrice)} />
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </div>
            <img style={{ width: '95%', margin: '20px 40px', }} src={feedback} alt="" />
            <h6 style={{ marginTop: '20px', textAlign: 'center' }}>SẢN PHẨM BÁN CHẠY <FaSalesforce style={{ color: 'blueviolet', fontSize: '20px', marginBottom: '10px' }} /></h6>
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
                                    <Meta title={item.productName} description={formatCurrency(item.minPrice)} />
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </div>
            {/* <FaFacebook style={{ fontSize: '50px', color: '#1E90FF' }} /> */}
        </>
    )

};

export default Home;
