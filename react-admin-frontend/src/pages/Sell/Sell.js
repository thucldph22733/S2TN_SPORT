import React, { useRef, useState } from 'react';
import { Button, Table, Tabs, theme } from 'antd';
import { PlusCircleFilled, PlusOutlined, QrcodeOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
const onChanges = (key) => {
    console.log(key);
};
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        width: 150,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        width: 150,
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];
const createTabContent = () => (
    <div>
        <div className="name">
            <label className="tieu-de">Đơn hàng</label>
            <Button type="primary" icon={<QrcodeOutlined />} style={{ float: 'right' }}>
                QR Code
            </Button>
            <Button type="primary" icon={<PlusOutlined />} style={{ float: 'right', marginRight: '5px' }}>
                Thêm sản phẩm
            </Button>
        </div>
        <div
            style={{
                margin: '40px 10px ',
                padding: 14,
                minHeight: 280,
                border: '1px solid #ccc', // Thêm viền với màu xám nhạt
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', // Thêm bóng với độ mờ
            }}
        >
            <div className="tieu-de">Giỏ hàng</div>
            <Table
                columns={columns}
                dataSource={null}
                pagination={{
                    pageSize: 50,
                }}
                scroll={{
                    y: 240,
                }}
            />
        </div>
        <div
            style={{
                margin: '40px 10px ',
                padding: 14,
                minHeight: 280,
                border: '1px solid #ccc', // Thêm viền với màu xám nhạt
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', // Thêm bóng với độ mờ
            }}
        >
            <label className="tieu-de">Thông tin khách hàng</label>
            <Button type="primary" icon={<PlusCircleFilled />} style={{ float: 'right', marginLeft: '5px' }}>
                Thêm khách hàng
            </Button>
            <Search
                placeholder="Tìm kiếm khách hàng"
                allowClear
                onSearch={onSearch}
                style={{
                    width: 300,
                    float: 'right',
                }}
            />
        </div>
        <div
            style={{
                margin: '10px 10px ',
                padding: 14,
                minHeight: 280,
                border: '1px solid #ccc', // Thêm viền với màu xám nhạt
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', // Thêm bóng với độ mờ
            }}
        >
            <label className="tieu-de">Thông tin thanh toán</label>
        </div>
    </div>
);
const onSearch = (value, _e, info) => console.log(info?.source, value);
const defaultPanes = new Array(1).fill(null).map((_, index) => {
    const id = String(index + 1);
    return {
        label: `Tab ${id}`,
        children: createTabContent(),
        key: id,
    };
});

export default function Sell() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [activeKey, setActiveKey] = useState(defaultPanes[0].key);
    const [items, setItems] = useState(defaultPanes);
    const newTabIndex = useRef(0);
    const onChange = (key) => {
        setActiveKey(key);
    };
    const add = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        setItems([
            ...items,
            {
                label: 'New Tab',
                children: createTabContent(),
                key: newActiveKey,
            },
        ]);
        setActiveKey(newActiveKey);
    };
    const remove = (targetKey) => {
        const targetIndex = items.findIndex((pane) => pane.key === targetKey);
        const newPanes = items.filter((pane) => pane.key !== targetKey);
        if (newPanes.length && targetKey === activeKey) {
            const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
            setActiveKey(key);
        }
        setItems(newPanes);
    };
    const onEdit = (targetKey, action) => {
        if (action === 'add') {
            add();
        } else {
            remove(targetKey);
        }
    };
    const itemss = [
        {
            key: '1',
            label: 'Tạo mới',
            children: (
                <div>
                    <div
                        style={{
                            marginBottom: 16,
                        }}
                    >
                        <Button onClick={add}>Tạo đơn hàng mới</Button>
                    </div>
                    <Tabs
                        hideAdd
                        onChange={onChange}
                        activeKey={activeKey}
                        type="editable-card"
                        onEdit={onEdit}
                        items={items}
                    />
                </div>
            ),
        },
        {
            key: '2',
            label: 'Danh sách đơn hàng',
            children: 'Content of Tab Pane 2',
        },
    ];
    return (
        <div
            style={{
                margin: '10px 10px',
                padding: 14,
                minHeight: 280,
                background: colorBgContainer,
            }}
        >
            <Tabs defaultActiveKey="1" items={itemss} onChange={onChanges} />
        </div>
    );
}
