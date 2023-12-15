import React from 'react'
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
// import './Home.css';
const { Meta } = Card;
function Product() {
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
                                    children: <>
                                        <Row><Checkbox >Áo đội tuyển</Checkbox></Row>
                                        <Row><Checkbox >Áo đội tuyển</Checkbox></Row>
                                        <Row><Checkbox >Áo đội tuyển</Checkbox></Row>
                                        <Row><Checkbox >Áo đội tuyển</Checkbox></Row>
                                        <Row><Checkbox >Áo đội tuyển</Checkbox></Row>
                                    </>,

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
                                        <Row><Checkbox >Áo đội tuyển</Checkbox></Row>
                                        <Row><Checkbox >Áo đội tuyển</Checkbox></Row>
                                        <Row><Checkbox >Áo đội tuyển</Checkbox></Row>
                                        <Row><Checkbox >Áo đội tuyển</Checkbox></Row>
                                        <Row><Checkbox >Áo đội tuyển</Checkbox></Row>
                                    </>,

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
                                        <Row><Checkbox >Áo đội tuyển</Checkbox></Row>
                                        <Row><Checkbox >Áo đội tuyển</Checkbox></Row>
                                        <Row><Checkbox >Áo đội tuyển</Checkbox></Row>
                                        <Row><Checkbox >Áo đội tuyển</Checkbox></Row>
                                        <Row><Checkbox >Áo đội tuyển</Checkbox></Row>
                                    </>,

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
                                        <Row><Checkbox >Đỏ</Checkbox></Row>
                                        <Row><Checkbox >Xanh</Checkbox></Row>
                                        <Row><Checkbox >Cam</Checkbox></Row>
                                        <Row><Checkbox >Vàng</Checkbox></Row>
                                        <Row><Checkbox >Đỏ</Checkbox></Row>
                                    </>,

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
                                        <Row><Checkbox >S</Checkbox></Row>
                                        <Row><Checkbox >M</Checkbox></Row>
                                        <Row><Checkbox >L</Checkbox></Row>
                                        <Row><Checkbox >XL</Checkbox></Row>
                                        <Row><Checkbox >XXL</Checkbox></Row>
                                    </>,

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
                                        <Row><Checkbox >Áo đội tuyển</Checkbox></Row>
                                        <Row><Checkbox >Áo đội tuyển</Checkbox></Row>
                                        <Row><Checkbox >Áo đội tuyển</Checkbox></Row>
                                        <Row><Checkbox >Áo đội tuyển</Checkbox></Row>
                                        <Row><Checkbox >Áo đội tuyển</Checkbox></Row>
                                    </>,

                                },
                            ]}
                        />
                    </Col>
                    <Col span={19}>
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
                        <Row style={{ marginTop: '20px' }} justify="center" gutter={[16, 16]} >
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
                        <Row style={{ marginTop: '20px' }} justify="center" gutter={[16, 16]} >
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
                    </Col>
                </Row>

            </div>
        </>
    )
}

export default Product