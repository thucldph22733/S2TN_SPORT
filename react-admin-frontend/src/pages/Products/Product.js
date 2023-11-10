import React, { useCallback, useRef, useEffect, useState } from 'react';
import { EditOutlined, FileExcelOutlined, PlusOutlined, SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import { Button, Input, Space, Table, theme, Image, Modal } from 'antd';
import { Link, useParams, useNavigate } from 'react-router-dom';
import qs from 'qs';
import path_name from '~/core/constants/routers';
import { DeleteOutlined } from '@ant-design/icons';
import { FaEdit, FaEye } from 'react-icons/fa';
// import imagess from 'D:/DoAnTotNghiep/S2TN_SPORT/react-admin-frontend/src/assets/images/importImages';
import { Form } from 'react-bootstrap';
function Product() {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [productData, setProductData] = useState([]);
    const { id } = useParams();
    const searchInput = useRef(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const [editProductId, setEditProductId] = useState(null);

    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {
        const result = await axios.get('http://localhost:8080/api/product/getAll');
        setProductData(result.data);
    };

    const deleteProduct = async (id) => {
        await axios.delete(`http://localhost:8080/api/product/delete/${id}`);
        loadProduct();
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
            title: 'Ảnh',
            dataIndex: 'productAvatar',
            key: 'productAvatar',
            width: '10%',
            render: (record) => {
                // return <Image width={70} src={imagess[`./${record}`]} />;
            },
        },

        {
            title: 'Tên sản phẩm',
            dataIndex: 'productName',
            key: 'productName',
            width: '15%',
            ...getColumnSearchProps('productName'),
            sorter: (a, b) => a.productName.length - b.productName.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Loại sản phẩm',
            dataIndex: 'categoryName',
            key: 'categoryName',
            width: '10%',
        },
        {
            title: 'Câu lạc bộ',
            dataIndex: 'clubName',
            key: 'clubName',
            width: '10%',
        },
        {
            title: 'Thương hiệu',
            dataIndex: 'brandName',
            key: 'brandName',
            width: '10%',
        },
        {
            title: 'Nhà cung cấp',
            dataIndex: 'supplierName',
            key: 'supplierName',
            width: '10%',
        },
        {
            title: 'Mô tả',
            dataIndex: 'productDescribe',
            key: 'productDescribe',
            width: '10%',
        },
        // {
        //     title: 'Người tạo',
        //     dataIndex: 'createBy',
        //     key: 'createBy',
        //     width: '10%',
        // },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: '15%',
            render: (text) => (
                <span
                    style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        backgroundColor: text === 0 ? 'green' : 'red',
                        color: 'white',
                    }}
                >
                    {text === 0 ? 'Đang hoạt động' : 'Không hoạt động'}
                </span>
            ),
        },
        {
            title: <div style={{ textAlign: 'center' }}>Hành động</div>,
            dataIndex: '',
            key: 'x',
            width: '30%',
            render: (record) => (
                <div style={{ textAlign: 'center' }}>
                    <button
                        onClick={() => toggleProductStatus(record.id)}
                        className="btn btn-outline-danger"
                        style={{ marginRight: '10px' }}
                    >
                        <DeleteOutlined />
                    </button>
                    <Link
                        className="btn btn-outline-primary"
                        onClick={() => onEditClick(record)} // Truyền record vào hàm onEditClick
                        style={{ marginRight: '10px' }}
                    >
                        <FaEdit />
                    </Link>

                    <Link className="btn btn-outline-warning">
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
        fetch(`http://localhost:8080/api/product/getAll?${qs.stringify(getRandomuserParams(tableParams))}`)
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

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [product, setProduct] = useState({
        productName: '',
        avatar: null, // Thay mảng thành tệp ảnh đơn
        categoryName: '',
        clubName: '',
        brandName: '',
        supplierName: '',
        productDescribe: '',
        createBy: '',
        productSale: '',
        status: 1,
    });

    const {
        productName,
        avatar,
        categoryName,
        clubName,
        brandName,
        supplierName,
        productDescribe,
        createBy,
        productSale,
        status,
    } = product;

    const onInputChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const onFileChange = (e) => {
        const file = e.target.files[0]; // Chỉ chấp nhận một tệp ảnh
        setProduct({ ...product, avatar: file });
    };

    const onSubmitAdd = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('avatar', avatar);
        formData.append('categoryName', categoryName);
        formData.append('clubName', clubName);
        formData.append('brandName', brandName);
        formData.append('supplierName', supplierName);
        formData.append('productDescribe', productDescribe);
        formData.append('createBy', createBy);
        formData.append('productSale', productSale);
        formData.append('status', status);

        try {
            const response = await fetch('http://localhost:8080/api/product/create', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setIsModalOpen(false);
                // Reset form state
                setProduct({
                    productName: '',
                    avatar: '',
                    categoryName: '',
                    clubName: '',
                    brandName: '',
                    supplierName: '',
                    productDescribe: '',
                    createBy: '',
                    productSale: '',
                    status: '',
                });
                // Reload product data
                loadProduct(); // or loadproduct() if needed
            } else {
                console.error('Error:', response.status);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onAddClick = () => {
        setIsEditMode(false); // Chuyển sang chế độ thêm
        showModal();
    };

    const onEditClick = (record) => {
        setIsEditMode(true); // Chuyển sang chế độ chỉnh sửa
        showModal();
        // Đặt dữ liệu khách hàng để chỉnh sửa
        setProduct({
            productName: record.productName,
            avatar: record.avatar,
            categoryName: record.categoryName,
            clubName: record.clubName,
            brandName: record.brandName,
            supplierName: record.supplierName,
            productDescribe: record.productDescribe,
            createBy: record.createBy,
            productSale: record.productSale,
            status: record.status,
        });
        setEditProductId(record.id); // Lưu ID của khách hàng vào một state khác (nếu bạn chưa có state này).
    };

    // const loadCustomers = async () => {
    //     try {
    //         const result = await axios.get(`http://localhost:8080/api/customers/getAll/${id}`);
    //         setCustomer(result.data);
    //     } catch (error) {
    //         console.error('Axios error:', error);
    //     }
    // };

    const onSubmitEdit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('productName', productName);
        formData.append('categoryName', categoryName);
        formData.append('clubName', clubName);
        formData.append('brandName', brandName);
        formData.append('supplierName', supplierName);
        formData.append('productDescribe', productDescribe);
        formData.append('createBy', createBy);
        formData.append('productSale', productSale);
        formData.append('status', status);

        // Thêm kiểm tra nếu ảnh thay đổi
        if (avatar instanceof File) {
            formData.append('avatar', avatar);
        }

        try {
            const response = await fetch(`http://localhost:8080/api/product/update?id=${editProductId}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.status === 200) {
                // Xử lý khi cập nhật thành công
                setIsModalOpen(false);
                setProduct({
                    productName: '',
                    avatar: '',
                    categoryName: '',
                    clubName: '',
                    brandName: '',
                    supplierName: '',
                    productDescribe: '',
                    createBy: '',
                    status: '',
                });
                loadProduct(); // Hoặc loadCustomers() nếu cần
            } else {
                console.error('Có lỗi xảy ra khi cập nhật.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const toggleProductStatus = async (productId) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/product/toggle-status/${productId}`);
            if (response.status === 200) {
                // Cập nhật trạng thái thành công
                // Đảm bảo bạn cập nhật lại danh sách khách hàng sau khi cập nhật trạng thái
                loadProduct();
            } else {
                console.error('Có lỗi xảy ra khi cập nhật trạng thái.');
            }
        } catch (error) {
            console.error(error);
        }
    };

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
                    title={isEditMode ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm'}
                    open={isModalOpen}
                    onOk={isEditMode ? onSubmitEdit : onSubmitAdd}
                    onCancel={handleCancel}
                >
                    <form onSubmit={isEditMode ? onSubmitEdit : onSubmitAdd} encType="multipart/form-data">
                        <div className="mb-3">
                            <label htmlFor="productName" className="form-label">
                                Tên sản phẩm
                            </label>
                            <input
                                type={'text'}
                                className="form-control"
                                placeholder="Enter your Product name"
                                name="productName"
                                value={productName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="avatar" className="form-label">
                                Ảnh
                            </label>
                            <input type="file" className="form-control" name="avatar" onChange={onFileChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="categoryName" className="form-label">
                                Loại sản phẩm
                            </label>
                            <input
                                type={'text'}
                                className="form-control"
                                placeholder="Enter category name?"
                                name="categoryName"
                                value={categoryName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="clubName" className="form-label">
                                Câu lạc bộ
                            </label>
                            <input
                                type={'text'}
                                className="form-control"
                                placeholder="Enter club name?"
                                name="clubName"
                                value={clubName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="brandName" className="form-label">
                                Thương hiệu
                            </label>
                            <input
                                type={'text'}
                                className="form-control"
                                placeholder="Enter brand name?"
                                name="brandName"
                                value={brandName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="supplierName" className="form-label">
                                Nhà cung cấp
                            </label>
                            <input
                                type={'text'}
                                className="form-control"
                                placeholder="Enter supplier name?"
                                name="supplierName"
                                value={supplierName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="productDescribe" className="form-label">
                                Mô tả
                            </label>
                            <input
                                type={'text'}
                                className="form-control"
                                placeholder="Enter Describe?"
                                name="productDescribe"
                                value={productDescribe}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="createBy" className="form-label">
                                Người tạo
                            </label>
                            <input
                                type={'text'}
                                className="form-control"
                                placeholder="Enter create name?"
                                name="createBy"
                                value={createBy}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <Form.Group>
                                <Form.Label>Trạng thái</Form.Label>
                                <Form.Select name="status" value={status} onChange={(e) => onInputChange(e)}>
                                    <option value="0">Đang hoạt động</option>
                                    <option value="1">Không hoạt động</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                    </form>
                </Modal>
                <div className="tieu-de" style={{ float: 'left', marginLeft: '10px' }}>
                    <h4>Danh sách sản phẩm</h4>
                </div>
                <Link
                    className="btn btn-success mx-2"
                    // to={path_name.addcustomer}
                    onClick={onAddClick}
                    style={{ float: 'right', marginBottom: '15px' }}
                >
                    <PlusOutlined /> Thêm mới
                </Link>
                <Link
                    className="btn btn-success mx-2"
                    to={path_name.addproduct}
                    style={{ float: 'right', marginBottom: '15px' }}
                >
                    <FileExcelOutlined /> Xuất dữ liệu
                </Link>
                <Table
                    columns={columns}
                    dataSource={productData}
                    pagination={tableParams.pagination}
                    loading={loading}
                    onChange={handleTableChange}
                />
            </div>
        </>
    );
}

export default Product;
