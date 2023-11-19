import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './MainLayout.css';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined
} from '@ant-design/icons';
import logo from '~/assets/images/logo2.jpg'
import { GiShoppingCart } from "react-icons/gi";
import { IoIosLogOut } from "react-icons/io";
import { AiOutlineFileText, AiOutlineTags, AiOutlineUsergroupAdd, AiOutlineBarChart, AiOutlineBars, AiOutlineSlack } from "react-icons/ai";
import { Layout, Menu, Button, theme, Avatar, Tooltip } from 'antd';
import path_name from '~/constants/routers';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from 'react'
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState("/");

    useEffect(() => {
        const pathName = location.pathname;
        setSelectedKeys(pathName);
    }, [location.pathname]);

    return (
        <Layout className="container_layout">
            <Sider trigger={null} collapsible collapsed={collapsed} theme='light' width={230}>
                <div className="logo">
                    <img src={logo} width={130} ></img>
                </div>
                <hr />
                <Menu
                    onClick={(item) => {
                        navigate(item.key);
                    }}
                    mode="inline"
                    selectedKeys={[selectedKeys]}
                    items={[
                        {
                            key: path_name.dashboard,
                            icon: <AiOutlineBarChart style={{ fontSize: "16px" }} />,
                            label: 'Thống kê',
                        },
                        {
                            key: path_name.sell,
                            icon: <GiShoppingCart style={{ fontSize: "16px" }} />,
                            label: 'Bán hàng',

                        },
                        {
                            key: path_name.order,
                            icon: <AiOutlineFileText style={{ fontSize: "16px" }} />,
                            label: 'Đơn hàng',
                        },
                        {
                            icon: <AiOutlineBars style={{ fontSize: "16px" }} />,
                            label: 'Quản lý sản phẩm',
                            children: [
                                {
                                    icon: <AiOutlineSlack style={{ fontSize: "10px" }} />,
                                    key: path_name.product,
                                    label: 'Sản phẩm',
                                },
                                {
                                    icon: <AiOutlineSlack style={{ fontSize: "10px" }} />,
                                    key: 'category',
                                    label: 'Loại sản phẩm',
                                },
                                {
                                    icon: <AiOutlineSlack style={{ fontSize: "10px" }} />,
                                    key: 'color',
                                    label: 'Màu sắc',
                                },
                                {
                                    icon: <AiOutlineSlack style={{ fontSize: "10px" }} />,
                                    key: 'size',
                                    label: 'Kích thước',
                                },
                                {
                                    icon: <AiOutlineSlack style={{ fontSize: "10px" }} />,
                                    key: '',
                                    label: 'Chất liệu',
                                },
                                {
                                    icon: <AiOutlineSlack style={{ fontSize: "10px" }} />,
                                    key: 'brand',
                                    label: 'Thương hiệu',
                                },
                                {
                                    icon: <AiOutlineSlack style={{ fontSize: "10px" }} />,
                                    key: 'club',
                                    label: 'Câu lạc bộ',
                                },
                                {
                                    icon: <AiOutlineSlack style={{ fontSize: "10px" }} />,
                                    key: 'club',
                                    label: 'Nhà cung cấp',
                                },
                            ]
                        },
                        {
                            key: path_name.voucher,
                            icon: <AiOutlineTags style={{ fontSize: "16px" }} />,
                            label: 'Quản lý giảm giá',
                        },
                        {
                            icon: <AiOutlineUsergroupAdd style={{ fontSize: "16px" }} />,
                            label: 'Quản lý người dùng',
                            children: [
                                {
                                    icon: <AiOutlineSlack style={{ fontSize: "10px" }} />,
                                    key: path_name.employee,
                                    label: 'Nhân viên',
                                },
                                {
                                    icon: <AiOutlineSlack style={{ fontSize: "10px" }} />,
                                    key: path_name.customer,
                                    label: 'Khách hàng',
                                },
                            ]
                        },
                        {
                            key: path_name.logout,
                            icon: <IoIosLogOut style={{ fontSize: "16px" }} />,
                            label: 'Đăng xuất',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header className='layout_header' >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div className='avatar'>
                        <Tooltip placement="top">
                            <Avatar
                                style={{
                                    backgroundColor: '#87d068',
                                }}
                                icon={<UserOutlined />}
                            />
                        </Tooltip>
                        <p>Lê Đăng Thành</p>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '15px',
                        padding: 24,
                        minHeight: 280,
                        backgroundColor: "white",
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default MainLayout;