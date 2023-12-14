import React from 'react';
import { Link } from 'react-router-dom';
import imgage1 from '~/assets/images/product/product-21.jpg';
import imgage2 from '~/assets/images/product/product-20.jpg';
import { Card, Col, Image, Row } from 'antd';
import './Home.css';
import { EyeOutlined } from '@ant-design/icons';
const { Meta } = Card;

const Home = () => (
    <div className='container'>
        <Row justify="center" gutter={[16, 16]} style={{ margin: '30px 0' }}>
            {[1, 2, 3, 4].map((item) => (
                <Col xs={24} sm={12} md={8} lg={6} key={item}>
                    <Link to={`/product-detail/${item}`}>
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
        <Row justify="center" gutter={[16, 16]} style={{ margin: '30px 0' }}>
            {[1, 2, 3, 4].map((item) => (
                <Col xs={24} sm={12} md={8} lg={6} key={item}>
                    <Link to={`/product-detail/${item}`}>
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
        </Row>
    </div>
);

export default Home;
