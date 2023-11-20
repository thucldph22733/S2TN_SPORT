import React, { useState, useRef, useMemo } from 'react';
import { Table, Space, Button, Pagination, Input, Form, Modal, notification, Radio } from 'antd';
import {
    PlusOutlined,
    RedoOutlined,
    FormOutlined,
    DeleteOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
// import './Products.css'


const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: 'Đang hoạt động',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: 'Ngừng hoạt động',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: 'Đang hoạt động',
    },
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: 'Đang hoạt động',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: 'Ngừng hoạt động',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: 'Đang hoạt động',
    },
];
// const Context = React.createContext({
//     name: 'Default',
// });

function Brand() {

    const [open, setOpen] = useState({ isModal: false, isMode: '' });
    const showModal = (mode) => {
        setOpen({
            isModal: true,
            isMode: mode
        });
    };
    const hideModal = () => {
        setOpen({ isModal: false });
    };

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        // setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>

                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            width: '5%',
        },
        {
            title: 'Tên thương hiệu',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            ...getColumnSearchProps('name')
        },
        {
            title: 'Mô tả',
            dataIndex: 'age',
            key: 'age',
            width: '19%',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'address',
            key: 'address',
            width: '15%',
        },
        {
            title: 'Người tạo',
            dataIndex: 'address',
            key: 'address',
            width: '15%',
        },
        {
            title: 'Trạng thái',
            key: 'tags',
            dataIndex: 'tags',
            width: '16%',
            filters: [
                {
                    text: 'Đang hoạt động',
                    value: 'Đang hoạt động',
                },
                {
                    text: 'Ngừng hoạt động',
                    value: 'Ngừng hoạt động',
                },
            ],
            onFilter: (value, record) => record.tags.indexOf(value) === 0,

            render: (text) => (
                <span
                    style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        backgroundColor: text === 'Đang hoạt động' ? 'rgb(66, 185, 126)' : 'rgb(243, 78, 28)',
                        color: 'white',
                    }}
                >
                    {text === 'Đang hoạt động' ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                </span>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            width: '10%',
            render: () => (
                <Space size="middle">
                    <Button type="text" icon={<FormOutlined style={{ color: 'rgb(214, 103, 12)' }} />} onClick={() => showModal("edit")} />
                    <Button type="text" icon={<DeleteOutlined style={{ color: 'red' }} />} />
                </Space>
            )
        },
    ];

    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 5; // Số mục trên mỗi trang

    const handleChangePage = (page) => {
        setCurrentPage(page);
    };

    const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);



    const [api, contextHolder] = notification.useNotification();

    const openNotification = (type) => {
        if (type === 'success') {
            api.success({
                message: 'Thông báo',
                description: 'Xử lý thành công!!!',
                placement: 'topRight',
            });
        } else if (type === 'error') {
            api.error({
                message: 'Thông báo',
                description: 'Xử lý thất bại!!!',
                placement: 'topRight',
            });
        }
    };
    const onOk = () => {
        console.log("first")
        const isSuccess = true;

        if (isSuccess) {
            openNotification('success');
        } else {
            openNotification('error');
        }
        hideModal();

    }

    return (
        <>
            {contextHolder}
            <h5 style={{ marginBottom: '16px', float: 'left', color: '#2123bf' }}>Danh sách thương hiệu</h5>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal("add")} style={{ marginBottom: '16px', float: 'right', borderRadius: '2px' }} >
                Thêm mới
            </Button>

            <Button type="primary" icon={<RedoOutlined style={{ fontSize: '18px' }} />} style={{ marginBottom: '16px', float: 'right', marginRight: '6px', borderRadius: '4px', }} />

            <Table columns={columns} dataSource={paginatedData} pagination={false} />

            <Pagination
                current={currentPage}
                total={data.length}
                pageSize={pageSize}
                onChange={handleChangePage}
                style={{ marginTop: '16px', textAlign: 'right' }}
            />

            {open.isModal && <Modal
                title={open.isMode === "edit" ? "Cập nhật thương hiệu" : "Thêm mới một thương hiệu"}
                open={open}
                onOk={onOk}
                onCancel={hideModal}
                okText={open.isMode === "edit" ? "Cập nhật" : "Thêm mới"}
                cancelText="Hủy bỏ"
                style={{ textAlign: 'center' }}
            >
                <Form
                    name="wrap"
                    labelCol={{ flex: '100px' }}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{ flex: 1 }}
                    colon={false}
                    style={{ maxWidth: 600, marginTop: '25px' }}
                >
                    <Form.Item label="Tên:" name="username" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Mô tả:" name="de" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Trạng thái:" name="deleted" rules={[{ required: true }]}>
                        <Radio.Group name="radiogroup" defaultValue={true} style={{ float: 'left' }}>
                            <Radio value={true}>Đang hoạt động</Radio>
                            <Radio value={false}>Ngừng hoạt động</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>}

        </>
    )
};
export default Brand;


