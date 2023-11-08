import { DeleteOutlined, FileExcelOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Popconfirm, Space, Spin, Table, message, theme } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import Highlighter from 'react-highlight-words';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import qs from 'qs';
function OderStatus() {
    const [orderStatusData, setOrderStatusData] = useState([]);
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 5,
        },
    });
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const searchInput = useRef(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [showPopconfirm, setShowPopconfirm] = useState(false);
    const [customerIdToDelete, setCustomerIdToDelete] = useState(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const [orderStatus, setOrderStatus] = useState({
        statusName: '',
        statusDescribe: '',
    });
    const { statusName, statusDescribe } = orderStatus;

    const onInputChange = (e) => {
        setOrderStatus({ ...orderStatus, [e.target.name]: e.target.value });
    };

    const loadOrderStatus = async () => {
        const result = await axios.get('http://localhost:8080/api/orderStatus/getAll');
        setOrderStatusData(result.data);
    };

    useEffect(() => {
        loadOrderStatus();
    }, []);

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

    const fetchData = () => {
        setLoading(true);
        fetch(`http://localhost:8080/api/orderStatus/getAll?${qs.stringify(getRandomuserParams(tableParams))}`)
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
    //Code confirm thông báo
    const handlePopconfirmVisibleChange = (visible) => {
        setShowPopconfirm(visible);
    };

    const handleConfirm = () => {
        if (customerIdToDelete) {
            setShowPopconfirm(false);
        }
    };

    const handleCancelPopConFirm = () => {
        setShowPopconfirm(false);
        message.error('Đã hủy cập nhật');
    };
    //Code confirm thông báo
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

    const columns = [
        {
            title: 'Tên trạng thái',
            dataIndex: 'statusName',
            key: 'statusName',
            width: '25%',
            ...getColumnSearchProps('statusName'),
            sorter: (a, b) => a.customerName.length - b.customerName.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Mổ tả',
            dataIndex: 'statusDescribe',
            key: 'statusDescribe',
            width: '20%',
        },
        {
            title: <div style={{ textAlign: 'center' }}>Hành động</div>,
            dataIndex: '',
            key: 'x',
            width: '20%',
            render: (record) => (
                <div style={{ textAlign: 'center' }}>
                    <Popconfirm
                        title="Cập nhật trạng thái"
                        description="Bạn chắc chắn muốn cập nhật trạng thái?"
                        onConfirm={handleConfirm}
                        onCancel={handleCancelPopConFirm}
                        okText="OK"
                        cancelText="Hủy"
                        visible={showPopconfirm}
                        onVisibleChange={handlePopconfirmVisibleChange}
                    >
                        <button
                            className="btn btn-outline-danger"
                            style={{ marginRight: '10px' }}
                            onClick={() => {
                                setCustomerIdToDelete(record.id);
                                setShowPopconfirm(true);
                            }}
                        >
                            <DeleteOutlined />
                        </button>
                    </Popconfirm>

                    <Link
                        className="btn btn-outline-primary"
                        onClick={() => onEditClick(record)} // Truyền record vào hàm onEditClick
                        style={{ marginRight: '10px' }}
                    >
                        <FaEdit />
                    </Link>

                    <Link className="btn btn-outline-warning">
                        <FaEdit />
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

    //Model
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    //Model

    //CRUD
    const onSubmitAdd = async (e) => {
        e.preventDefault();
        setSpinning(true);
        await axios.post('http://localhost:8080/api/orderStatus/create', orderStatus);
        setOrderStatus({
            statusName: '',
            statusDescribe: '',
        });
        setIsModalOpen(false);
        setSpinning(false);
        loadOrderStatus();
    };

    const onAddClick = () => {
        setIsEditMode(false); // Chuyển sang chế độ thêm
        showModal();
    };

    const onEditClick = async (record) => {
        setIsEditMode(true);
        showModal();
    };

    const onSubmitEdit = async (e) => {
        e.preventDefault();
    };
    //CRUD

    //Loading
    const [spinning, setSpinning] = React.useState(false);
    //Loading
    return (
        <>
            <div
                style={{
                    margin: '10px 10px',
                    padding: 14,
                    minHeight: 280,
                    background: colorBgContainer,
                }}
            >
                <Modal
                    title={isEditMode ? 'Chỉnh sửa trạng thái hóa đơn' : 'Thêm trạng thái hóa đơn'}
                    open={isModalOpen}
                    onOk={isEditMode ? onSubmitEdit : onSubmitAdd}
                    onCancel={handleCancel}
                >
                    <Spin spinning={spinning} size="large">
                        <form onSubmit={isEditMode ? onSubmitEdit : onSubmitAdd}>
                            <div className="mb-3">
                                <label htmlFor="statusName" className="form-label">
                                    Tên trạng thái
                                </label>
                                <input
                                    type={'text'}
                                    className="form-control"
                                    placeholder=""
                                    name="statusName"
                                    value={statusName}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="statusDescribe" className="form-label">
                                    Mô tả
                                </label>
                                <input
                                    type={'text'}
                                    className="form-control"
                                    placeholder=""
                                    name="statusDescribe"
                                    value={statusDescribe}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                        </form>
                    </Spin>
                </Modal>
                <div className="tieu-de" style={{ float: 'left', marginLeft: '10px' }}>
                    <h4>Danh sách trạng thái hóa đơn</h4>
                </div>
                <Link
                    className="btn btn-success mx-2"
                    // to={path_name.addcustomer}
                    onClick={onAddClick}
                    style={{ float: 'right', marginBottom: '15px' }}
                >
                    <PlusOutlined /> Thêm mới
                </Link>
                <Link className="btn btn-success mx-2" style={{ float: 'right', marginBottom: '15px' }}>
                    <FileExcelOutlined /> Xuất dữ liệu
                </Link>
                <Table
                    columns={columns}
                    dataSource={orderStatusData}
                    pagination={tableParams.pagination}
                    loading={loading}
                    onChange={handleTableChange}
                />
            </div>
        </>
    );
}

export default OderStatus;
