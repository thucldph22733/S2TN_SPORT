import React, { useRef, useEffect, useState } from 'react';
import { EditOutlined, SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import { Button, Input, Space, Table, theme } from 'antd';
import { Link, useParams } from 'react-router-dom';
import qs from 'qs';
import path_name from '~/constants/routers';
import { DeleteOutlined } from '@ant-design/icons';
export default function Address() {
    const [searchText, setSearchText] = useState('');

    const [searchedColumn, setSearchedColumn] = useState('');

    const [addressData, setAddressData] = useState([]); // Đổi tên biến thành addressData

    const { id } = useParams();

    const searchInput = useRef(null);

    useEffect(() => {
        loadAddress();
    }, []);

    const loadAddress = async () => {
        const result = await axios.get('http://localhost:8080/api/address');
        setAddressData(result.data); // Sử dụng setAddressData để cập nhật dữ liệu
    };

    const deleteAddress = async (id) => {
        await axios.delete(`http://localhost:8080/api/delete-address/${id}`);
        loadAddress();
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
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
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
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
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
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
            title: 'recipientName',
            dataIndex: 'recipientName',
            key: 'recipientName',
            width: '30%',
            ...getColumnSearchProps('recipientName'),
            sorter: (b, a) => b.recipientName.length - a.recipientName.length,
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: 'phoneNumber',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: '20%',
            ...getColumnSearchProps('phoneNumber'),
        },
        {
            title: 'addressDetail',
            dataIndex: 'addressDetail',
            key: 'addressDetail',
        },
        {
            title: 'region',
            dataIndex: 'region',
            key: 'region',
            width: '20%',
        },
        {
            title: 'city',
            dataIndex: 'city',
            key: 'city',
            width: '20%',
        },
        {
            title: 'country',
            dataIndex: 'country',
            key: 'country',
            width: '20%',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            width: '10%',
            render: (record) => (
                <div>
                    <DeleteOutlined
                        onClick={() => deleteAddress(record.id)}
                        style={{ marginRight: '5px', color: 'red' }}
                    />

                    <Link to={`${path_name.editaddress}/${record.id}`}>
                        <EditOutlined />
                    </Link>
                </div>
            ),
        },
    ];

    const getRandomuserParams = (params) => ({
        results: params.pagination?.pageSize,
        page: params.pagination?.current,
        ...params,
    });

    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 5,
        },
    });

    const fetchData = () => {
        setLoading(true);
        fetch(`http://localhost:8080/api/address?${qs.stringify(getRandomuserParams(tableParams))}`)
            .then((res) => res.json())
            .then(({ results }) => {
                setData(results);
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: results,
                        // 200 is mock data, you should read it from server
                        // total: data.totalCount,
                    },
                });
            });
    };

    useEffect(() => {
        fetchData();
    }, [JSON.stringify(tableParams)]);

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <div className="container">
            <div style={{ margin: '34px 56px', padding: 10, minHeight: 40, background: colorBgContainer }}>
                <h2 style={{ textAlign: 'center' }}>Address</h2>
            </div>
            <div style={{ margin: '34px 56px', padding: 24, minHeight: 280, background: colorBgContainer }}>
                <Link
                    className="btn btn-outline-danger mx-2"
                    to={path_name.addaddress}
                    style={{ float: 'right', marginBottom: '10px' }}
                >
                    <UserAddOutlined />
                </Link>

                <Table
                    columns={columns}
                    dataSource={addressData}
                    pagination={tableParams.pagination}
                    loading={loading}
                    onChange={handleTableChange}
                />
            </div>
        </div>
    );
}
