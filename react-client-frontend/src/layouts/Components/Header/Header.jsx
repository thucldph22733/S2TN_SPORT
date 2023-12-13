import './Header.css';

import { Link } from 'react-router-dom';
// import Icon
import logo from '~/assets/images/logo.png';
import path_name from '~/core/constants/routers';
import { useState } from 'react';
import { AutoComplete, Avatar, Badge, Button, Col, Input, Row, Tooltip } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';

function Header() {
    const [menu, setMenu] = useState('home');
    return (
        <header className="header">
            <Row >
                <Col span={4} >
                    <Link to={path_name.home} style={{ float: 'right', margin: '8px 0' }}>
                        <img className='logo' src={logo} alt="" />
                    </Link>
                </Col>
                <Col span={13} >
                    <nav className="header__menu">
                        <ul>
                            <li
                                onClick={() => {
                                    setMenu();
                                }}
                                className={menu === 'home' ? 'active' : <></>}
                            >
                                <Link to={path_name.home}>Trang chủ</Link>
                            </li>

                            <li
                                onClick={() => {
                                    setMenu('product');
                                }}
                                className={menu === 'product' ? 'active' : <></>}
                            >
                                <Link to={path_name.product}>Sản phẩm</Link>

                            </li>
                            <li
                                onClick={() => {
                                    setMenu('about');
                                }}
                                className={menu === 'about' ? 'active' : <></>}
                            >
                                <Link to={path_name.about}>Giới thiệu</Link>
                            </li>
                            <li
                                onClick={() => {
                                    setMenu('blog');
                                }}
                                className={menu === 'blog' ? 'active' : <></>}
                            >
                                <Link to={path_name.blog}>Tin tức</Link>
                            </li>
                            <li
                                onClick={() => {
                                    setMenu('contact');
                                }}
                                className={menu === 'contact' ? 'active' : <></>}
                            >
                                <Link to={path_name.contact}>Liên hệ</Link>
                            </li>
                        </ul>
                    </nav>
                </Col>
                <Col span={7}>
                    <Row>
                        <AutoComplete
                            popupMatchSelectWidth={252}
                            style={{
                                margin: '10px 0'
                            }}
                        // options={options}
                        // onSelect={onSelect}
                        // onSearch={handleSearch}
                        // size="small"
                        >
                            <Input.Search style={{ width: 200 }} placeholder="Tìm tên sản phẩm..." enterButton />
                        </AutoComplete>

                        <Link to={path_name.shopping_cart} style={{ margin: '15px' }}>
                            <Badge count={1} size='small' >
                                <ShoppingCartOutlined style={{ fontSize: '22px', color: 'black' }} />
                            </Badge>
                        </Link>
                        <Link to={path_name.login} style={{ margin: '10px 5px 10px 0' }}>
                            <Tooltip title="Đăng nhập" placement="top">
                                <Avatar
                                    // style={{
                                    //     backgroundColor: '#87d068',
                                    // }}
                                    icon={<UserOutlined />}
                                />
                                Lê đang Thành
                            </Tooltip>
                        </Link>

                    </Row>
                </Col>

            </Row >
        </header >
    );
}

export default Header;
