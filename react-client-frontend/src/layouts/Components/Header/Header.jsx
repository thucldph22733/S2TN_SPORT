import './Header.css';

import { Link, useNavigate } from 'react-router-dom';
// import Icon
import logo from '~/assets/images/logo.png';
import path_name from '~/core/constants/routers';
import { useState, useEffect } from 'react';
import { AutoComplete, Avatar, Badge, Button, Col, Dropdown, Input, Row, Tooltip } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';

function Header() {

    const navigate = useNavigate();
    //Đăng xuất
    const handleLogout = () => {
        localStorage.clear();
        navigate('/')
    }
    //Lấy user từ local
    const userString = localStorage.getItem('user2');
    const user = userString ? JSON.parse(userString) : null;

    // set heder đứng im khi kéo chuột xuống
    const [menu, setMenu] = useState('home');
    const [isHeaderFixed, setIsHeaderFixed] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsHeaderFixed(scrollPosition > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const items = [
        !user && {

            label: (
                <Link to={path_name.login}>
                    Đăng nhập
                </Link>
            ),
        },
        !user && {
            label: (
                <Link to={path_name.register}>
                    Đăng ký
                </Link>
            ),
        },
        user && {

            label: (
                <Link to={path_name.user}>
                    Tài khoản của tôi
                </Link>
            ),
        },
        user && {
            label: (
                <Link to={path_name.order}>
                    Đơn mua
                </Link>
            ),
        },
        user && {
            label: "Đăng xuất",
            onClick: handleLogout,
        },


    ];
    return (
        <header className={`header ${isHeaderFixed ? 'fixed' : ''}`}>
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

                        <Link style={{ margin: '10px 5px 10px 0' }}>
                            <Dropdown
                                menu={{
                                    items,
                                }}
                                placement="bottomLeft"
                                arrow
                            >
                                <Avatar icon={<UserOutlined />}> </Avatar>

                            </Dropdown>

                        </Link>
                        {user && <span style={{ margin: '17px 3px' }}>{user.userName}</span>}
                    </Row>
                </Col>

            </Row >
        </header >
    );
}

export default Header;
