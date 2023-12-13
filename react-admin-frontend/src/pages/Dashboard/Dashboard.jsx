import { ArrowDownOutlined, SwapOutlined, UserSwitchOutlined } from '@ant-design/icons'
import { Col, Row, Card, Statistic, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { GiMoneyStack, GiTakeMyMoney } from "react-icons/gi";
import BarChart from './BarChart';

import PieChart from './PieChart';
import DashboardService from '~/service/DashboardService';
function Dashboard() {
    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
        },

        {
            title: 'Tên sản phẩm',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Số lượng bán',
            dataIndex: 'totalQuantitySold',
            key: 'totalQuantitySold',
            render: (text) => (
                <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="processing">{text}</Tag>

            )
        },
        {
            title: 'Doanh thu',
            dataIndex: 'totalRevenue',
            key: 'totalRevenue',
            render: (text) => (
                <span style={{ color: 'red' }}>
                    {isNaN(parseFloat(text)) ? '' : parseFloat(text).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </span>
            ),
        },
    ];

    const [top10BestSelling, setTop10BestSelling] = useState([]);
    const getTop10BestSellingProducts = async () => {
        await DashboardService.getTop10BestSellingProducts()
            .then(response => {

                setTop10BestSelling(response);

            }).catch(error => {
                console.error(error);
            })
    }



    const [countDeletedUsers, setCountDeletedUsers] = useState(0);
    const getCountDeletedUsers = async () => {
        await DashboardService.getCountDeletedUsers()
            .then(response => {

                setCountDeletedUsers(response);

            }).catch(error => {
                console.error(error);
            })
    }

    const [monthlyRevenue, setMonthlyRevenue] = useState(0);
    const getMonthlyRevenue = async () => {
        await DashboardService.getMonthlyRevenue()
            .then(response => {
                const result = isNaN(parseFloat(response)) ? '' : parseFloat(response).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                setMonthlyRevenue(result);

            }).catch(error => {
                console.error(error);
            })
    }

    const [revenueToday, setRevenueToday] = useState(0);
    const getRevenueToday = async () => {
        await DashboardService.getRevenueToday()
            .then(response => {
                const result = isNaN(parseFloat(response)) ? '' : parseFloat(response).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                setRevenueToday(result);
            }).catch(error => {
                console.error(error);
            })
    }

    const [totalQuantitySoldThisMonth, setTotalQuantitySoldThisMonth] = useState(0);
    const getTotalQuantitySoldThisMonth = async () => {
        await DashboardService.getTotalQuantitySoldThisMonth()
            .then(response => {
                setTotalQuantitySoldThisMonth(response);
            }).catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        getTop10BestSellingProducts();
        getCountDeletedUsers();
        getRevenueToday();
        getMonthlyRevenue();
        getTotalQuantitySoldThisMonth();
    }, [])
    return (
        <>
            <Row>
                <Col span={6}>
                    <Card style={{ backgroundColor: '#5a76f3', margin: '0 5px', borderRadius: '5px' }}>
                        <Statistic
                            title="Doanh thu tháng này"
                            value={monthlyRevenue}
                            valueStyle={{
                                color: '#f7f5f6',
                                fontSize: '18px',
                            }}
                            prefix={<GiMoneyStack style={{ fontSize: '23px', color: '#ffff' }} />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card style={{ backgroundColor: '#37c7a1', margin: '0 5px', borderRadius: '5px' }}>
                        <Statistic
                            title="Doanh thu hôm nay"
                            value={revenueToday}
                            valueStyle={{
                                color: '#f7f5f6',
                                fontSize: '18px',

                            }}
                            prefix={<GiTakeMyMoney style={{ fontSize: '23px', color: '#ffff', marginRight: '5px' }} />}

                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card style={{ backgroundColor: '#f28c5b', margin: '0 5px', borderRadius: '5px' }}>
                        <Statistic
                            title="Hàng bán được tháng này"
                            value={totalQuantitySoldThisMonth}
                            valueStyle={{
                                color: '#f7f5f6',
                                fontSize: '18px',
                            }}
                            prefix={<SwapOutlined style={{ fontSize: '25px', color: '#ffff' }} />}
                            suffix='sản phẩm'
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card style={{ backgroundColor: '#7859f2', margin: '0 5px', borderRadius: '5px' }}>
                        <Statistic
                            title="Số lượng người dùng"
                            value={countDeletedUsers}

                            valueStyle={{
                                color: '#f7f5f6',
                                fontSize: '18px',
                            }}
                            prefix={<UserSwitchOutlined style={{ fontSize: '25px', color: '#ffff', marginRight: '5px' }} />}

                        />
                    </Card>
                </Col>
            </Row>

            <h3 style={{ marginTop: '50px' }}>Biểu đổ hiển thị tổng doanh thu theo tháng</h3>
            <Row >

                <BarChart />
            </Row>
            <Row style={{ marginTop: '25px', height: '300px' }}>
                <Col span={14}>
                    <h3>Top 5 sản phẩm bán chạy</h3>
                    <Table
                        dataSource={top10BestSelling.map((top10Best, index) => ({
                            ...top10Best,
                            key: index + 1,
                            productName: top10Best.productName + ' - ' + top10Best.colorName + ' - ' + top10Best.sizeName,
                        }))}
                        columns={columns}
                        pagination={false} />
                </Col>

                <Col span={10}>
                    <Row> <h3 >Trạng thái đơn hàng</h3></Row>
                    <Row style={{ width: '100%', height: '300px', marginTop: '10px' }}>
                        <PieChart />
                    </Row>
                </Col>
            </Row>

        </>
    )
}

export default Dashboard