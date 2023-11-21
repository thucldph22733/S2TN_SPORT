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
    QrcodeOutlined,
    SlackOutlined
} from '@ant-design/icons';
import logo from '~/assets/images/logo.jpg'
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
                <div className="logo" style={{ width: collapsed ? 64 : 230 }}>
                    <img src={logo} width={collapsed ? 50 : 130} alt="Logo"></img>
                </div>
                <Menu
                    onClick={(item) => {
                        navigate(item.key);
                    }}
                    mode="inline"
                    selectedKeys={[selectedKeys]}
                    items={[
                        {
                            key: path_name.dashboard,
                            icon: <BarChartOutlined style={{ fontSize: "16px" }} />,
                            label: 'Thống kê',
                        },
                        {
                            key: path_name.sell,
                            icon: <QrcodeOutlined style={{ fontSize: "16px" }} />,
                            label: 'Bán hàng',

                        },
                        {
                            key: path_name.order,
                            icon: <FileDoneOutlined style={{ fontSize: "16px" }} />,
                            label: 'Đơn hàng',
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
                                    key: 'category',
                                    label: 'Loại sản phẩm',
                                },
                                {
                                    icon: <SlackOutlined style={{ fontSize: "10px" }} />,
                                    key: path_name.color,
                                    label: 'Màu sắc',
                                },
                                {
                                    icon: <SlackOutlined style={{ fontSize: "10px" }} />,
                                    key: 'size',
                                    label: 'Kích thước',
                                },
                                {
                                    icon: <SlackOutlined style={{ fontSize: "10px" }} />,
                                    key: 'cc',
                                    label: 'Chất liệu',
                                },
                                {
                                    icon: <SlackOutlined style={{ fontSize: "10px" }} />,
                                    key: path_name.brand,
                                    label: 'Thương hiệu',
                                },
                                {
                                    icon: <SlackOutlined style={{ fontSize: "10px" }} />,
                                    key: 'club',
                                    label: 'Câu lạc bộ',
                                },
                                {
                                    icon: <SlackOutlined style={{ fontSize: "10px" }} />,
                                    key: 'ncc',
                                    label: 'Nhà cung cấp',
                                },
                            ]
                        },
                        {
                            key: path_name.voucher,
                            icon: <TagsOutlined style={{ fontSize: "16px" }} />,
                            label: 'Quản lý giảm giá',
                        },
                        {
                            icon: <UsergroupAddOutlined style={{ fontSize: "16px" }} />,
                            label: 'Quản lý người dùng',
                            children: [
                                {
                                    icon: <SlackOutlined style={{ fontSize: "10px" }} />,
                                    key: path_name.employee,
                                    label: 'Nhân viên',
                                },
                                {
                                    icon: <SlackOutlined style={{ fontSize: "10px" }} />,
                                    key: path_name.customer,
                                    label: 'Khách hàng',
                                },
                            ]
                        },
                        {
                            key: path_name.logout,
                            icon: <LogoutOutlined style={{ fontSize: "16px" }} />,
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