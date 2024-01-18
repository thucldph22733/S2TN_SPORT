import { FileDoneOutlined, RedoOutlined, SwapOutlined, UserSwitchOutlined } from '@ant-design/icons'
import { Col, Row, Card, Statistic, Table, Tag, DatePicker, Button, Image } from 'antd'
import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { GiMoneyStack, GiTakeMyMoney } from "react-icons/gi";
import BarChart from './BarChart';

import PieChart from './PieChart';
import DashboardService from '~/service/DashboardService';
import formatCurrency from '~/utils/format-currency';
import dayjs from 'dayjs';
function Dashboard() {
    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Ảnh',
            dataIndex: 'productImage',
            key: 'productImage',
            width: '10%',
            render: (test) => (
                <Image width={40} src={test} />
            )
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'productName',
            key: 'productName',
            width: '45%',
        },
        {
            title: 'Số lượng bán',
            dataIndex: 'totalQuantitySold',
            key: 'totalQuantitySold',
            width: '20%',
            render: (text) => (
                <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="processing">{text}</Tag>
            )
        },
        {
            title: 'Doanh thu',
            dataIndex: 'totalRevenue',
            key: 'totalRevenue',
            width: '20%',
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

    useEffect(() => {
        getTop10BestSellingProducts()
    }, [])
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);


    const [filterDate, setFilterDate] = useState({
        startDate: null,
        endDate: null,
    });

    const handleSearch = () => {
        const adjustedStartDate = selectedStartDate && dayjs(selectedStartDate).add(7, 'hour');
        const adjustedEndDate = selectedEndDate && dayjs(selectedEndDate).add(7, 'hour');
        setFilterDate({
            startDate: adjustedStartDate,
            endDate: adjustedEndDate,
        });

    };
    const handleReset = () => {
        setSelectedStartDate(null);
        setSelectedEndDate(null);
        setFilterDate({
            startDate: null,
            endDate: null,
        });
    };
    const [countDeletedUsers, setCountDeletedUsers] = useState(0);

    const getCountDeletedUsers = async () => {
        await DashboardService.getCountDeletedUsers(filterDate)
            .then(response => {
                setCountDeletedUsers(response);
            }).catch(error => {
                console.error(error);
            })
    }

    const [revenue, setRevenue] = useState(0);
    const getRevenue = async () => {
        await DashboardService.getRevenue(filterDate)
            .then(response => {

                setRevenue(formatCurrency(response));

            }).catch(error => {
                console.error(error);
            })
    }

    const [totalQuantityOrder, setTotalQuantityOrder] = useState(0);
    const getTotalStockQuantityOrder = async () => {
        await DashboardService.getTotalStockQuantityOrder(filterDate)
            .then(response => {
                setTotalQuantityOrder(response);
            }).catch(error => {
                console.error(error);
            })
    }

    const [totalQuantityProduct, setTotalQuantityProduct] = useState(0);
    const getTotalStockQuantityProduct = async () => {
        await DashboardService.getTotalStockQuantityProduct(filterDate)
            .then(response => {
                setTotalQuantityProduct(response);
            }).catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        // Gọi API khi có ngày hợp lệ
        getCountDeletedUsers();
        getTotalStockQuantityOrder();
        getTotalStockQuantityProduct();
        getRevenue();

    }, [filterDate]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    console.log(selectedYear)
    const handleYearChange = (date, dateString) => {
        // Lấy năm từ dateString và cập nhật state
        const year = dateString ? parseInt(dateString, 10) : new Date().getFullYear()
        setSelectedYear(year);
    };

    return (
        <>
            <Row>
                <Col span={6}>
                    <Card style={{ backgroundColor: '#5a76f3', margin: '0 5px', borderRadius: '5px' }}>
                        <Statistic
                            title="Doanh thu"
                            value={revenue}
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
                            title="Số đơn hàng đã bán"
                            value={totalQuantityOrder}
                            valueStyle={{
                                color: '#f7f5f6',
                                fontSize: '18px',
                            }}
                            prefix={<FileDoneOutlined style={{ fontSize: '23px', color: '#ffff', marginRight: '5px' }} />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card style={{ backgroundColor: '#f28c5b', margin: '0 5px', borderRadius: '5px' }}>
                        <Statistic
                            title="Số lượng sản phẩm tồn kho"
                            value={totalQuantityProduct}
                            valueStyle={{
                                color: '#f7f5f6',
                                fontSize: '18px',
                            }}
                            prefix={<SwapOutlined style={{ fontSize: '25px', color: '#ffff' }} />}

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
            <Row style={{ marginTop: '40px' }}>
                <Col span={6} >
                    <DatePicker
                        format="HH:mm:ss - DD/MM/YYYY"
                        style={{
                            width: '100%',
                            height: '35px',
                            borderRadius: '5px',
                        }}
                        showTime
                        placeholder="Ngày bắt đầu"
                        value={selectedStartDate}
                        onChange={(date) => setSelectedStartDate(date)}
                    />
                </Col>
                <Col span={6}>
                    <DatePicker
                        format="HH:mm:ss - DD/MM/YYYY"
                        style={{
                            width: '100%',
                            height: '35px',
                            borderRadius: '5px',
                        }}
                        showTime
                        placeholder="Ngày kết thúc"
                        value={selectedEndDate}
                        onChange={(date) => setSelectedEndDate(date)}
                    />
                </Col>
                <Col span={8}>
                    <Button
                        type="primary"
                        style={{
                            borderRadius: '4px',
                            marginRight: '6px',
                            marginLeft: '20px',
                            backgroundColor: '#5a76f3',
                        }}
                        onClick={handleSearch}
                    >
                        Tìm kiếm
                    </Button>
                    <Button
                        type="primary"
                        icon={<RedoOutlined style={{ fontSize: '18px' }} />}
                        style={{
                            marginBottom: '16px',
                            borderRadius: '4px',
                            backgroundColor: '#5a76f3',
                        }}
                        onClick={handleReset}
                    />
                </Col>

            </Row>

            <h3 style={{ marginTop: '50px', fontWeight: '600' }}>Biểu đổ hiển thị tổng doanh thu theo năm</h3>

            <DatePicker
                placeholder="Chọn năm"
                onChange={handleYearChange}
                style={{ borderRadius: '5px', height: '30px', width: '150px' }}
                picker="year"
            />
            <Row>
                <BarChart year={selectedYear} />
            </Row>
            <Row style={{ marginTop: '25px', height: '300px' }}>
                <Col span={14}>
                    <h3 style={{ fontWeight: '600', textAlign: 'center' }}>Top 10 sản phẩm bán nhiều nhất</h3>
                    <Table
                        dataSource={top10BestSelling.map((top10Best, index) => ({
                            ...top10Best,
                            key: index + 1,
                        }))}
                        columns={columns}
                        pagination={{
                            pageSize: 5
                        }} />
                </Col>

                <Col span={10}>
                    <Row><Col span={24}><h3 style={{ fontWeight: '600', textAlign: 'center' }}>Trạng thái đơn hàng</h3></Col> </Row>
                    <Row style={{ width: '100%', height: '350px', marginTop: '10px' }}>
                        <PieChart filter={filterDate} />
                    </Row>
                </Col>
            </Row>

        </>
    )
}

export default Dashboard