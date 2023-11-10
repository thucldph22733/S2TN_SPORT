import { Space, Table, Tabs, Tag, theme } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
const onChange = (key) => {
    console.log(key);
};

const itemStyle = {
    paddingRight: '30px', // Thay đổi khoảng cách tại đây
};
const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'customer',
        dataIndex: 'customerName',
        key: 'customerName',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    // {
    //     title: 'Tags',
    //     key: 'tags',
    //     dataIndex: 'tags',
    //     render: (_, { tags }) => (
    //         <>
    //             {tags.map((tag) => {
    //                 let color = tag.length > 5 ? 'geekblue' : 'green';
    //                 if (tag === 'loser') {
    //                     color = 'volcano';
    //                 }
    //                 return (
    //                     <Tag color={color} key={tag}>
    //                         {tag.toUpperCase()}
    //                     </Tag>
    //                 );
    //             })}
    //         </>
    //     ),
    // },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

function Order() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [order, setOrder] = useState('');
    useEffect(() => {
        loadOrder();
    }, []);
    const creatTabContent = () => (
        <div>
            <Table columns={columns} dataSource={order} />
        </div>
    );
    const items = [
        {
            key: '1',
            label: 'Tất cả',
            children: creatTabContent(),
        },
        {
            key: '2',
            label: 'Chờ xác nhận',
            children: 'Content of Tab Pane 2',
        },
        {
            key: '3',
            label: 'Chờ giao',
            children: 'Content of Tab Pane 3',
        },
        {
            key: '4',
            label: 'Đang giao',
            children: 'Content of Tab Pane 3',
        },
        {
            key: '5',
            label: 'Hoàn thành',
            children: 'Content of Tab Pane 3',
        },
        {
            key: '6',
            label: 'Hủy',
            children: 'Content of Tab Pane 3',
        },
        {
            key: '7',
            label: 'Chờ thanh toán',
            children: 'Content of Tab Pane 3',
        },
    ];
    const loadOrder = async () => {
        const result = await axios.get('http://localhost:8080/api/orders/getAll');
        setOrder(result.data);
    };

    return (
        <div
            style={{
                margin: '10px 10px',
                padding: 14,
                minHeight: 280,
                background: colorBgContainer,
            }}
        >
            <label>Danh sách hóa đơn</label>
            <div style={{ borderBottomColor: 'GrayText' }}>
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} itemStyle={itemStyle} />
            </div>
        </div>
    );
}

export default Order;
