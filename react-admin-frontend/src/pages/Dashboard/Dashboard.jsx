import { ArrowDownOutlined } from '@ant-design/icons'
import { Col, Row, Card, Statistic } from 'antd'
import React, { useState } from 'react'
import './Dashboard.css'
import { GiMoneyStack, GiTakeMyMoney } from "react-icons/gi";
import { UserData } from "../../Data";
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';

function Dashboard() {
    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.year),
        datasets: [
            {
                label: "Users Gained",
                data: UserData.map((data) => data.userGain),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
            },
        ],
    });
    return (
        <>
            <Row>
                <Col span={6}>
                    <Card style={{ backgroundColor: '#5a76f3', margin: '0 5px', borderRadius: '5px' }}>
                        <Statistic
                            title="Doanh thu tháng này"
                            value={90000000}
                            valueStyle={{
                                color: '#f7f5f6',
                                fontSize: '18px',
                            }}
                            prefix={<GiMoneyStack style={{ fontSize: '25px', color: '#ffff' }} />}
                            suffix="VND"
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card style={{ backgroundColor: '#37c7a1', margin: '0 5px', borderRadius: '5px' }}>
                        <Statistic
                            title="Doanh thu hôm nay"

                            value={9.3}
                            precision={2}
                            valueStyle={{
                                color: '#f7f5f6',
                                fontSize: '18px',
                            }}
                            prefix={<GiTakeMyMoney style={{ fontSize: '25px', color: '#ffff' }} />}
                            suffix="VND"

                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card style={{ backgroundColor: '#f28c5b', margin: '0 5px', borderRadius: '5px' }}>
                        <Statistic
                            title="Số đơn bán được hôm nay"
                            value={9.3}
                            precision={2}
                            valueStyle={{
                                color: '#f7f5f6',
                                fontSize: '18px',
                            }}
                            prefix={<ArrowDownOutlined />}
                            suffix="%"
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card style={{ backgroundColor: '#7859f2', margin: '0 5px', borderRadius: '5px' }}>
                        <Statistic
                            title="Hàng bán được tháng này"
                            value={9.3}
                            precision={2}
                            valueStyle={{
                                color: '#f7f5f6',
                                fontSize: '18px',
                            }}
                            prefix={<ArrowDownOutlined />}
                            suffix="%"
                        />
                    </Card>
                </Col>
            </Row>

            <Row style={{ marginTop: '100px' }}>
                <BarChart chartData={userData} />
            </Row>
            <Row >
                <Col span={12}><LineChart chartData={userData} /></Col>
                <Col span={12} style={{ maxWidth: '300px', margin: 'auto' }}><PieChart chartData={userData} /></Col>
            </Row>

        </>
    )
}

export default Dashboard