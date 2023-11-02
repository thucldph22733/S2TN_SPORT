import React, { useRef, useEffect, useState } from 'react';
import { EditOutlined, SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import { Button, Input, Space, Table, theme } from 'antd';
import { Link, useParams } from 'react-router-dom';
import qs from 'qs';
import path_name from '~/core/constants/routers';
import { DeleteOutlined } from '@ant-design/icons';
import { FaEdit, FaEye } from 'react-icons/fa';
import images from '../../assets/images/s2tn.png';
export default function Customer() {
    // Đường dẫn đến ảnh mặc định

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [customerData, setCustomerData] = useState([]);
    const { id } = useParams();
    const searchInput = useRef(null);

    useEffect(() => {
        loadCustomer();
    }, []);

    const loadCustomer = async () => {
        const result = await axios.get('http://localhost:8080/api/customers');
        setCustomerData(result.data);
    };

    const deleteCustomer = async (id) => {
        await axios.delete(`http://localhost:8080/api/delete-customer/${id}`);
        loadCustomer();
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
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            width: '10%',
            render: (text, record) => {
                const imageDirectory = '../../assets/images'; // Thư mục chứa tất cả ảnh
                const imageFileName = record.avatar; // record.avatar là tên ảnh từ cơ sở dữ liệu
                const imagePath = `${imageDirectory}/${imageFileName}`;

                // Sau đó, sử dụng imagePath để hiển thị ảnh

                return <img src={imagePath} alt="Avatar" style={{ width: '50px' }} />;
            },
        },
        {
            title: 'customerName',
            dataIndex: 'customerName',
            key: 'customerName',
            width: '15%',
            ...getColumnSearchProps('customerName'),
            sorter: (a, b) => a.customerName.length - b.customerName.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'numberPhone',
            dataIndex: 'numberPhone',
            key: 'numberPhone',
            width: '10%',
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
            width: '10%',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            width: '10%',
            filters: [
                { text: 'Nam', value: true },
                { text: 'Nữ', value: false },
            ],
            onFilter: (value, record) => record.gender === value,
            render: (text) => (text === true ? 'Nam' : 'Nữ'),
        },
        {
            title: 'birthOfDay',
            dataIndex: 'birthOfDay',
            key: 'birthOfDay',
            width: '15%',
        },
        {
            title: <div style={{ textAlign: 'center' }}>Action</div>,
            dataIndex: '',
            key: 'x',
            width: '30%',
            render: (record) => (
                <div style={{ textAlign: 'center' }}>
                    <DeleteOutlined
                        onClick={() => deleteCustomer(record.id)}
                        className="btn btn-danger"
                        style={{ marginRight: '10px' }}
                    />

                    <Link
                        to={`${path_name.editcustomer}/${record.id}`}
                        className="btn btn-primary"
                        style={{ marginRight: '10px' }}
                    >
                        <FaEdit />
                    </Link>
                    <Link to={`${path_name.editcustomer}/${record.id}`} className="btn btn-warning">
                        <FaEye />
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
        fetch(`http://localhost:8080/api/customers?${qs.stringify(getRandomuserParams(tableParams))}`)
            .then((res) => res.json())
            .then(({ results }) => {
                setData(results);
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: results,
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
            <div style={{ margin: '24px 26px', padding: 10, minHeight: 40, background: colorBgContainer }}>
                <h2 style={{ textAlign: 'center' }}>Khách Hàng</h2>
            </div>
            <div style={{ margin: '24px 26px', padding: 14, minHeight: 280, background: colorBgContainer }}>
                <Link
                    className="btn btn-outline-danger mx-2"
                    to={path_name.addcustomer}
                    style={{ float: 'right', marginBottom: '10px' }}
                >
                    <UserAddOutlined />
                </Link>

                <Table
                    columns={columns}
                    dataSource={customerData}
                    pagination={tableParams.pagination}
                    loading={loading}
                    onChange={handleTableChange}
                />
            </div>
        </div>
    );
}
