import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './MainLayout.css';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    BarChartOutlined,
    LogoutOutlined,
    FileDoneOutlined,
    UsergroupAddOutlined,
    BarsOutlined,
    TagsOutlined,
    ShoppingCartOutlined,
    SlackOutlined
} from '@ant-design/icons';
import { MdOutlinePassword } from "react-icons/md";

import logo from '~/assets/images/logo.jpg'
import { Layout, Menu, Button, Avatar, Tooltip } from 'antd';
import path_name from '~/constants/routers';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from 'react'
import { useAuth } from '~/components/AuthContext';
const { Header, Sider, Content } = Layout;

const MainLayout = () => {

    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState("/");
    //Đăng xuất
    const handleLogout = () => {
        localStorage.clear();
        navigate(path_name.login)
    }
    //Lấy user từ local
    const userString = localStorage.getItem('user1');
    const user = userString ? JSON.parse(userString) : null;

    useEffect(() => {
        const pathName = location.pathname;
        setSelectedKeys(pathName);
    }, [location.pathname]);

    return (
        <Layout className="container_layout">
            <Sider trigger={null} collapsible collapsed={collapsed} theme='light' width={230}>
                <div className="logo_layout" style={{ margin: collapsed ? 14 : 0 }}>
                    <img src={logo} width={collapsed ? 50 : 160} alt="Logo"></img>
                </div>
                <Menu
                    style={{ margin: '20px 1px' }}
                    onClick={(item) => {
                        navigate(item.key);
                    }}
                    mode="inline"
                    selectedKeys={[selectedKeys]}
                    items={[
                        {
                            key: path_name.newSell,
                            icon: <ShoppingCartOutlined style={{ fontSize: "16px" }} />,
                            label: 'Bán hàng tại quầy',
                        },

                        {
                            key: path_name.order,
                            icon: <FileDoneOutlined style={{ fontSize: "16px" }} />,
                            label: 'Quản lý đơn hàng',
                        },
                        user?.role == "ADMIN" &&
                        {
                            key: path_name.dashboard,
                            icon: <BarChartOutlined style={{ fontSize: "16px" }} />,
                            label: 'Thống kê',
                        },
                        {
                            icon: <BarsOutlined style={{ fontSize: "16px" }} />,
                            label: 'Quản lý sản phẩm',
                            children: [
                                {
                                    icon: <SlackOutlined style={{ fontSize: "10px" }} />,
                                    key: path_name.product,
                                    label: 'Sản phẩm',
                                },
                                {
                                    icon: <SlackOutlined style={{ fontSize: "10px" }} />,
                                    key: path_name.category,
                                    label: 'Danh mục',
                                },
                                {
                                    icon: <SlackOutlined style={{ fontSize: "10px" }} />,
                                    key: path_name.color,
                                    label: 'Màu sắc',
                                },
                                {
                                    icon: <SlackOutlined style={{ fontSize: "10px" }} />,
                                    key: path_name.size,
                                    label: 'Kích thước',
                                },
                                {
                                    icon: <SlackOutlined style={{ fontSize: "10px" }} />,
                                    key: path_name.material,
                                    label: 'Chất liệu',
                                },
                                {
                                    icon: <SlackOutlined style={{ fontSize: "10px" }} />,
                                    key: path_name.brand,
                                    label: 'Thương hiệu',
                                },
                                {
                                    icon: <SlackOutlined style={{ fontSize: "10px" }} />,
                                    key: path_name.club,
                                    label: 'Câu lạc bộ',
                                },
                                {
                                    icon: <SlackOutlined style={{ fontSize: "10px" }} />,
                                    key: path_name.supplier,
                                    label: 'Nhà cung cấp',
                                },
                            ]
                        },
                        user?.role == "ADMIN" &&
                        {
                            key: path_name.voucher,
                            icon: <TagsOutlined style={{ fontSize: "16px" }} />,
                            label: 'Quản lý giảm giá',
                        },
                        user?.role == "ADMIN" &&
                        {
                            key: path_name.user,
                            icon: <UsergroupAddOutlined style={{ fontSize: "16px" }} />,
                            label: 'Quản lý người dùng',
                            // children: [
                            //     {
                            //         icon: <SlackOutlined style={{ fontSize: "10px" }} />,
                            //         key: path_name.user,
                            //         label: 'Tài khoản',
                            //     },
                            //     {
                            //         icon: <SlackOutlined style={{ fontSize: "10px" }} />,
                            //         key: path_name.role,
                            //         label: 'Vai trò',
                            //     },
                            // ]
                        },
                        {
                            key: path_name.change_password,
                            icon: <MdOutlinePassword style={{ fontSize: "16px" }} />,
                            label: 'Đổi mật khẩu',
                        },
                        {
                            key: path_name.login,
                            icon: <LogoutOutlined style={{ fontSize: "16px" }} />,
                            label: 'Đăng xuất',
                            onClick: handleLogout
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
                        <p>Xin chào, {user ? user.userName : ''}!</p>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '12px',
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