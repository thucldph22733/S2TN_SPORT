import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Table, Space, Button, Pagination, Input, Form, Modal, notification, Radio, Popconfirm } from 'antd';
import {
    PlusOutlined,
    RedoOutlined,
    FormOutlined,
    DeleteOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
// import './Products.css'
// import Message from '~/components/Message'
import BrandService from '~/service/BrandService';
import FormatDate from '~/utils/format-date';


// const Context = React.createContext({
//     name: 'Default',
// });
const getStatusBadgeStyle = (text) => {
    const backgroundColor = text === true ? 'rgb(66, 185, 126)' : 'rgb(243, 78, 28)';
    return {
        display: 'inline-block',
        padding: '4px 8px',
        borderRadius: '4px',
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor,
        color: 'white',
    };
};

const getStatusText = (text) => {
    return text === true ? 'Đang hoạt động' : 'Ngừng hoạt động';
};
function Brand() {

    const [brands, setBrands] = useState([]);

    // const [totalPages, setTotalPages] = useState(1);

    const [loading, setLoading] = useState(false);


    useEffect(() => {
        fetchBrands(1);
    }, []);



    const fetchBrands = async () => {
        setLoading(true);
        await BrandService.getAll()
            .then(response => {
                setBrands(response.data);
                // setTotalPages(response.data.);
                console.log(response.data)
            }).catch(error => {
                console.error(error);
            }).finally(() => {
                setLoading(false);
            });
    }


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
            dataIndex: 'brandName',
            key: 'brandName',
            width: '20%',
            ...getColumnSearchProps('brandName')
        },
        {
            title: 'Mô tả',
            dataIndex: 'brandDescribe',
            key: 'brandDescribe',
            width: '19%',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: '15%',
        },
        {
            title: 'Người tạo',
            dataIndex: 'createdBy',
            key: 'createdBy',
            width: '15%',
        },
        {
            title: 'Trạng thái',
            key: 'deleted',
            dataIndex: 'deleted',
            width: '16%',
            filters: [
                {
                    text: 'Đang hoạt động',
                    value: true,
                },
                {
                    text: 'Ngừng hoạt động',
                    value: false,
                },
            ],
            onFilter: (value, record) => record.deleted.indexOf(value) === 0,

            render: (text) => (
                <span style={getStatusBadgeStyle(text)}>
                    {getStatusText(text)}
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
                    <Popconfirm
                        title="Xóa thương hiệu"
                        description="Bạn có chắc chắn xóa thương hiệu này không?"
                        placement="leftTop"
                        // onConfirm
                        // onCancel
                        okText="Đồng ý"
                        cancelText="Hủy bỏ"
                    >
                        <Button type="text" icon={<DeleteOutlined style={{ color: 'red' }} />} />
                    </Popconfirm>

                </Space>
            )
        },
    ];



    // const [api, contextHolder] = notification.useNotification();


    const onOk = () => {
        console.log("first")
        // const isSuccess = true;

        // if (isSuccess) {
        //     Message(api).openNotification('success');
        // } else {
        //     Message.openNotification('error');
        // }
        hideModal();

    }

    return (
        <>
            {/* {contextHolder} */}
            <h2 style={{ marginBottom: '16px', float: 'left', color: '#2123bf' }}>Danh sách thương hiệu</h2>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal("add")} style={{ marginBottom: '16px', float: 'right', borderRadius: '2px' }} >
                Thêm mới
            </Button>

            <Button type="primary" icon={<RedoOutlined style={{ fontSize: '18px' }} />} style={{ marginBottom: '16px', float: 'right', marginRight: '6px', borderRadius: '4px', }} />

            <Table
                dataSource={brands.map((brand, index) => ({
                    ...brand,
                    key: index + 1,
                    createdAt: FormatDate(brand.createdAt)
                }))}
                loading={loading}
                columns={columns}
                pagination={{
                    pageSize: 2,
                    // total: ,
                    onChange: (pageNo) => {
                        fetchBrands(pageNo);
                    },
                }}></Table>


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


