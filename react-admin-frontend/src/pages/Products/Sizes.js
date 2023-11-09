import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Button, Space, Table, Input, Modal } from 'antd';
import { SearchOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import qs from 'qs';

function Size() {
    const [selectedRecord, setSelectedRecord] = useState(null);
    let navigate = useNavigate();

    const [size, setSize] = useState([]);
    const [sizes, setSizes] = useState({
        sizeName: '',
        sizeDescribe: '',
    });

    const { sizeName, sizeDescribe } = sizes;

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setSizes({ ...sizes, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8080/api/sizes/create', sizes);
        loadSize();
    };
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const showModalUpdate = (record) => {
        setSelectedRecord(record);
        setOpenEdit(true);
        setSizes((prevSizes) => ({
            ...prevSizes,
            sizeName: record.sizeName,
            sizeDescribe: record.sizeDescribe,
        }));
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 0);
    };
    const handleOkEdit = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpenEdit(false);
            loadSize(); // Gọi hàm loadSize sau khi hoàn thành cập nhật
        }, 0);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const handleCancelEdit = () => {
        setOpenEdit(false);
    };

    const { confirm } = Modal;

    const showDeleteConfirm = (id) => {
        confirm({
            title: 'Are you sure delete this size?',
            icon: <ExclamationCircleFilled />,
            content: 'Delete Size',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log('OK');
                deleteSize(id);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const { id } = useParams();

    useEffect(() => {
        loadSize();
    }, []);

    const loadSize = async () => {
        const result = await axios.get('http://localhost:8080/api/sizes/getAll');
        setSize(result.data);
    };

    const deleteSize = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/sizes/delete/${id}`);
            loadSize();
        } catch (error) {
            console.error('Error deleting size:', error);
            // Hiển thị thông báo lỗi cho người dùng
        }
    };
    const onSubmitEdit = async (e) => {
        e.preventDefault();
        const id = e.target.id.value; // Lấy giá trị id từ form
        const sizeName = e.target.sizeName.value; // Lấy giá trị sizeName từ form
        const sizeDescribe = e.target.sizeDescribe.value; // Lấy giá trị sizeDescribe từ form
        const data = {
            sizeName,
            sizeDescribe,
        };
        await axios.put(`http://localhost:8080/api/sizes/update/${id}`, data);
        loadSize();
    };

    // sort
    const [sortedInfo, setSortedInfo] = useState({});
    // search
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
            title: '#',
            dataIndex: 'id',
            key: 'id',
            ...getColumnSearchProps('id'),
            sorter: (a, b) => a.id.length - b.id.length,
            sortOrder: sortedInfo.columnKey === 'id' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Size',
            dataIndex: 'sizeName',
            key: 'sizeName',
            ...getColumnSearchProps('sizeName'),
            sorter: (a, b) => a.sizeName.length - b.sizeName.length,
            sortOrder: sortedInfo.columnKey === 'sizeName' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Describe',
            dataIndex: 'sizeDescribe',
            key: 'sizeDescribe',
            ...getColumnSearchProps('sizeDescribe'),
            sorter: (a, b) => a.sizeDescribe.length - b.sizeDescribe.length,
            sortOrder: sortedInfo.columnKey === 'sizeDescribe' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Action',
            dataIndex: '',
            key: '',
            width: '10%',
            render: (record) => (
                <button className="btn btn-outline-danger" onClick={() => showDeleteConfirm(record.id)}>
                    Delete
                </button>
            ),
        },
        {
            title: '',
            dataIndex: '',
            key: '',
            width: '10%',
            render: (record) => (
                <button className="btn btn-outline-warning" onClick={() => showModalUpdate(record)}>
                    Update
                </button>
            ),
        },
    ];
    const getRandomuserParams = (params) => ({
        results: params.pagination?.pageSize,
        page: params.pagination?.current,
        ...params,
    });

    const [data, setData] = useState();
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const fetchData = () => {
        setLoading(true);
        fetch(`http://localhost:8080/api/sizes/getAll?${qs.stringify(getRandomuserParams(tableParams))}`)
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
    return (
        <>
            {/* add */}
            <Button className="btn btn-primary py-1" onClick={showModal}>
                Add Size
            </Button>
            <Modal
                open={open}
                title="ADD SIZE"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" className="btn btn-outline-danger" onClick={handleCancel}>
                        Return
                    </Button>,
                ]}
            >
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Size</label>
                        <div className="col-sm-10">
                            <input
                                type={'text'}
                                className="form-control"
                                placeholder="Nhập size muốn thêm"
                                name="sizeName"
                                value={sizeName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Mô Tả</label>
                        <div className="col-sm-10">
                            <input
                                type={'text'}
                                className="form-control"
                                placeholder="Mô tả của size"
                                name="sizeDescribe"
                                value={sizeDescribe}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                    </div>
                    <button className="btn btn-outline-primary mx-2" onClick={handleOk}>
                        Thêm Mới
                    </button>
                </form>
            </Modal>

            {/* update */}
            <Modal
                open={openEdit}
                title="UPDATE SIZE"
                onOk={handleOkEdit}
                onCancel={handleCancelEdit}
                footer={[
                    <Button key="back" className="btn btn-outline-danger py-1" onClick={handleCancelEdit}>
                        Return
                    </Button>,
                ]}
            >
                {selectedRecord && (
                    <form onSubmit={(e) => onSubmitEdit(e)}>
                        {/* Trường ẩn để lưu id */}
                        <input type="hidden" name="id" value={selectedRecord.id} />
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Size</label>
                            <div className="col-sm-10">
                                <input
                                    type={'text'}
                                    className="form-control"
                                    placeholder="Nhập size muốn sửa"
                                    name="sizeName"
                                    value={sizes.sizeName}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Describe</label>
                            <div className="col-sm-10">
                                <input
                                    type={'text'}
                                    className="form-control"
                                    placeholder="Mô tả của size"
                                    name="sizeDescribe"
                                    value={sizes.sizeDescribe}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                        </div>
                        <button className="btn btn-outline-primary mx-2" onClick={handleOkEdit}>
                            Update
                        </button>
                    </form>

                    //          <form onSubmit={(e) => onSubmit(e)}>
                    //     <div className="mb-3 row">
                    //         <label className="col-sm-2 col-form-label">Size</label>
                    //         <div className="col-sm-10">
                    //             <input
                    //                 type={'text'}
                    //                 className="form-control"
                    //                 placeholder="Nhập size muốn thêm"
                    //                 name="sizeName"
                    //                 value={sizeName}
                    //                 onChange={(e) => onInputChange(e)}
                    //             />
                    //         </div>
                    //     </div>
                    //     <div className="mb-3 row">
                    //         <label className="col-sm-2 col-form-label">Mô Tả</label>
                    //         <div className="col-sm-10">
                    //             <input
                    //                 type={'text'}
                    //                 className="form-control"
                    //                 placeholder="Mô tả của size"
                    //                 name="sizeDescribe"
                    //                 value={sizeDescribe}
                    //                 onChange={(e) => onInputChange(e)}
                    //             />
                    //         </div>
                    //     </div>
                    //     <button className="btn btn-outline-primary mx-2" onClick={handleOk}>
                    //         Thêm Mới
                    //     </button>
                    // </form>
                )}
            </Modal>

            <Table
                className="table border shadow py-2"
                columns={columns}
                dataSource={size}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
                key={size.id}
            />
        </>
    );
}

export default Size;
