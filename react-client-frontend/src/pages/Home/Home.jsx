import React from 'react';
import imgage1 from '~/assets/images/product/product-4.jpg'
import { Card, Col, Row } from 'antd';
import './Home.css'
const { Meta } = Card;
const Home = () => (
    <div className='container'>
        <Row justify="center" align="middle" gutter={16} style={{ marginTop: '30px' }}>
            <Col span={6}>
                <Card
                    hoverable
                    style={{
                        width: 250,
                        textAlign: 'center'
                    }}
                    cover={<img alt="example" src={imgage1} />}
                >
                    <Meta
                        title="Europe Street beat"
                        description="9.000.000 " />
                </Card>
            </Col>
            <Col span={6}>
                <Card
                    hoverable
                    style={{
                        width: 250,
                        textAlign: 'center'
                    }}
                    cover={<img alt="example" src={imgage1} />}
                >
                    <Meta
                        title="Europe Street beat"
                        description="9.000.000 " />
                </Card>
            </Col>
            <Col span={6}>
                <Card
                    hoverable
                    style={{
                        width: 250,
                        textAlign: 'center'
                    }}
                    cover={<img alt="example" src={imgage1} />}
                >
                    <Meta title="Europe Street beat"
                        description="9.000.000 " />
                </Card>
            </Col>
            <Col span={6}>
                <Card
                    hoverable
                    style={{
                        width: 250,
                        textAlign: 'center'
                    }}
                    cover={<img alt="example" src={imgage1} />}
                >
                    <Meta
                        title="Europe Street eas"
                        description="9.000.000 " />
                </Card>
            </Col>
        </Row>
        <Row justify="center" align="middle" gutter={16} style={{ marginTop: '30px' }}>
            <Col span={6} >
                <Card
                    hoverable
                    style={{
                        width: 250,
                        textAlign: 'center'
                    }}
                    cover={<img alt="example" src={imgage1} />}
                >
                    <Meta
                        title="Europe Street beat"
                        description="9.000.000 " />
                </Card>
            </Col>
            <Col span={6}>
                <Card
                    hoverable
                    style={{
                        width: 250,
                        textAlign: 'center'
                    }}
                    cover={<img alt="example" src={imgage1} />}
                >
                    <Meta
                        title="Europe Street beat"
                        description="9.000.000 " />
                </Card>
            </Col>
            <Col span={6}>
                <Card
                    hoverable
                    style={{
                        width: 250,
                        textAlign: 'center'
                    }}
                    cover={<img alt="example" src={imgage1} />}
                >
                    <Meta title="Europe Street beat"
                        description="9.000.000 " />
                </Card>
            </Col>
            <Col span={6}>
                <Card
                    hoverable
                    style={{
                        width: 250,
                        textAlign: 'center'
                    }}
                    cover={<img alt="example" src={imgage1} />}
                >
                    <Meta
                        title="Europe Street eas"
                        description="9.000.000 " />
                </Card>
            </Col>
        </Row>
    </div>

);

export default Home;
