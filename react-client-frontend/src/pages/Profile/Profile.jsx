import { FileTextOutlined, HomeOutlined, MehOutlined, UserOutlined } from '@ant-design/icons'
import { Breadcrumb, Col, Row } from 'antd'
import React, { Children } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { FaMapLocationDot } from "react-icons/fa6";
import { TbPasswordUser } from "react-icons/tb";
import path_name from '~/core/constants/routers';
function Profile() {
    return (
        <div className='container' style={{ marginBottom: '100px' }}>
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
                <Col span={5} style={{ borderRight: '1px solid #cdcdcd', paddingLeft: '10px' }}>
                    <h6>Tài khoản của tôi <MehOutlined style={{ color: '#CC5500	' }} /></h6>
                    <Row>
                        <Link style={{ margin: '10px 20px' }} to={path_name.user}><UserOutlined style={{ marginRight: '5px', marginBottom: '5px', color: '#007BA7' }} />Hồ sơ</Link>
                    </Row>
                    <Row>
                        <Link style={{ margin: '10px 20px' }} to={path_name.address}><FaMapLocationDot style={{ marginRight: '5px', marginBottom: '5px', color: '#008000' }} />Địa chỉ</Link>
                    </Row>
                    <Row>
                        <Link style={{ margin: '10px 20px' }} to={path_name.change_password}><TbPasswordUser style={{ marginRight: '5px', marginBottom: '5px', color: '#9966CC' }} />Đổi mật khẩu</Link>
                    </Row>
                    <Row>
                        <Link style={{ margin: '10px 20px' }} to={path_name.order}><FileTextOutlined style={{ marginRight: '5px', marginBottom: '5px', color: '#FF7F50' }} />Đơn mua</Link>
                    </Row>
                </Col>
                <Col span={19}>
                    <Outlet />
                </Col>
            </Row>
        </div>
    )
}

export default Profile