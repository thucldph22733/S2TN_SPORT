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
    //----------------------------------Sản phẩm--------------------------------------------------
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 12, total: 0 });
    const getProductHomePageByProducts = async (page, pageSize) => {

        await ProductService.getProductHomePageByProducts(page, pageSize)
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
        getProductHomePageByProducts(page - 1, pageSize);
    };

    const handleSizeChange = (current, size) => {
        getProductHomePageByProducts(0, size);
    };

    useEffect(() => {
        getProductHomePageByProducts(pagination.current - 1, pagination.pageSize);
    }, [pagination.current, pagination.pageSize]);


    return (
        <div style={{ marginBottom: '100px' }}>
            {/* <h4 style={{ textAlign: 'center', marginTop: '20px', fontWeight: '600' }}>DANH MỤC SẢN PHẨM</h4>
            <p style={{ textAlign: 'center', fontWeight: '400' }}>Hàng nghìn mẫu áo độc quyền theo từng phong cách khác nhau để quý khách chọn lựa!</p>
            <Row style={{ margin: '20px', borderBottom: '1px solid #cdcdcd' }}>
                <Col span={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                    <Link to={path_name.product}>
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
            </Row> */}

            <h4 style={{ textAlign: 'center', marginTop: '40px', fontWeight: '600' }}>TỔNG QUAN SẢN PHẨM</h4>
            <div className='container' style={{ marginTop: '50px' }}>
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
                    onShowSizeChange={handleSizeChange}
                    defaultCurrent={1}
                    current={pagination.current}
                    pageSize={pagination.pageSize}
                    total={pagination.total}
                    style={{ float: 'right', marginTop: '10px' }}
                />

            </div>
        </div>
    )

};

export default Home;
