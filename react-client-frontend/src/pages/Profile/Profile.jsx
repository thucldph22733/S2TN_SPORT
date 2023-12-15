import { FileTextOutlined, HomeOutlined, MehOutlined, UserOutlined } from '@ant-design/icons'
import { Breadcrumb, Col, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { FaMapLocationDot } from "react-icons/fa6";
import { TbPasswordUser } from "react-icons/tb";
import ChangePassword from '../Auth/ChangePassword';
import User from './User';
import Order from '../Order/Order';
import Address from './Address';
function Profile() {
    return (
        <div className='container'>
            <div className='container' style={{ height: '80px', padding: '30px 10px' }} >
                <Breadcrumb
                    style={{ fontSize: '15px' }}

                    items={[
                        {
                            title: <Link to=""><HomeOutlined style={{ marginRight: '5px' }} />Trang chủ</Link>,
                        },
                        {
                            title: <Link to="">Hồ sơ</Link>,
                        },
                    ]}
                />
            </div>
            <Row>
                <Col span={5} style={{ borderRight: '1px solid #cdcdcd' }}>
                    <h6><MehOutlined style={{ marginRight: '5px' }} />Tài khoản của tôi</h6>
                    <Row>
                        <Link style={{ margin: '10px 20px' }} to={""}><UserOutlined style={{ marginRight: '5px', marginBottom: '5px' }} />Hồ sơ</Link>
                    </Row>
                    <Row>
                        <Link style={{ margin: '10px 20px' }} to={""}><FaMapLocationDot style={{ marginRight: '5px', marginBottom: '5px' }} />Địa chỉ</Link>
                    </Row>
                    <Row>
                        <Link style={{ margin: '10px 20px' }} to={""}><TbPasswordUser style={{ marginRight: '5px', marginBottom: '5px' }} />Đổi mật khẩu</Link>
                    </Row>
                    <Row>
                        <Link style={{ margin: '10px 20px' }} to={""}><FileTextOutlined style={{ marginRight: '5px', marginBottom: '5px' }} />Đơn mua</Link>
                    </Row>
                </Col>
                <Col span={19}>
                    <Address />
                </Col>
            </Row>
        </div>
    )
}

export default Profile