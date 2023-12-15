import React from 'react';
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
import { Card, Col, Image, Pagination, Row } from 'antd';
import './Home.css';
import path_name from '~/core/constants/routers';
const { Meta } = Card;

const Home = () => (
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
                {[1, 2, 3, 4].map((item) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={item}>
                        <Link to={path_name.product_detail}>
                            <Card
                                hoverable
                                style={{
                                    width: '100%',
                                    textAlign: 'center',
                                }}
                                cover={<Image alt="example" src={imgage2} />}
                            >
                                <Meta title="Europe Street beat" description="9.000.000 " />
                            </Card>
                        </Link>
                    </Col>
                ))}
                {/* <Pagination defaultCurrent={1} total={50} style={{ float: 'right' }} /> */}
            </Row>
        </div>
        <img style={{ width: '95%', height: '350px', margin: '20px 40px', }} src={banner} alt="" />
        <h6 style={{ marginTop: '20px', textAlign: 'center' }}>SẢN PHẨM HOT <GiBurningRoundShot style={{ color: 'red', fontSize: '20px', marginBottom: '10px' }} /></h6>
        <div className='container'>
            <Row justify="center" gutter={[16, 16]} >
                {[1, 2, 3, 4].map((item) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={item}>
                        <Link to={path_name.product_detail}>
                            <Card
                                hoverable
                                style={{
                                    width: '100%',
                                    textAlign: 'center',
                                }}
                                cover={<Image alt="example" src={imgage1} />}
                            >
                                <Meta title="Europe Street beat" description="9.000.000 " />
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
                {[1, 2, 3, 4].map((item) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={item}>
                        <Link to={path_name.product_detail}>
                            <Card
                                hoverable
                                style={{
                                    width: '100%',
                                    textAlign: 'center',
                                }}
                                cover={<Image alt="example" src={banner2} />}
                            >
                                <Meta title="Europe Street beat" description="9.000.000 " />
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </div>
    </>

);

export default Home;
