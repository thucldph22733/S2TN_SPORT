import React, { useCallback, useRef, useEffect, useState } from 'react';
import {
    EditOutlined,
    FileExcelOutlined,
    PlusOutlined,
    QuestionCircleOutlined,
    SearchOutlined,
    UserAddOutlined,
} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import { Button, Input, Space, Table, theme, Image, Modal, Popconfirm, message, Spin } from 'antd';
import { Link, useParams, useNavigate } from 'react-router-dom';
import qs from 'qs';
import path_name from '~/core/constants/routers';
import { DeleteOutlined } from '@ant-design/icons';
import { FaEdit, FaEye } from 'react-icons/fa';
import { Form } from 'react-bootstrap';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { firebaseApp } from './config';
import { v4 } from 'uuid';

export default function Customer() {
    // Đường dẫn đến ảnh mặc định
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [customerData, setCustomerData] = useState([]);
    const { id } = useParams();
    const searchInput = useRef(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editCustomerId, setEditCustomerId] = useState(null);
    const fileInputRef = useRef(null);
    const [showPopconfirm, setShowPopconfirm] = useState(false);
    const [customerIdToDelete, setCustomerIdToDelete] = useState(null);
    const [customer, setCustomer] = useState({
        customerName: '',
        avatar: '', // Sử dụng null thay vì tên tệp
        phoneNumber: '',
        email: '',
        gender: true,
        birthOfDay: '',
        password: '',
        status: 1,
    });

    const { customerName, avatar, phoneNumber, email, gender, birthOfDay, password, status } = customer;

    const onInputChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const onFileChange = (e) => {
        const avatar = fileInputRef.current.files[0];
        setCustomer({ ...customer, avatar });
        console.log('New avatar selected:', avatar);
    };

    useEffect(() => {
        loadCustomer();
    }, []);

    //Code confirm thông báo
    const handlePopconfirmVisibleChange = (visible) => {
        setShowPopconfirm(visible);
    };

    const handleConfirm = () => {
        if (customerIdToDelete) {
            toggleCustomerStatus(customerIdToDelete);
            setShowPopconfirm(false);
        }
    };

    const handleCancelPopConFirm = () => {
        setShowPopconfirm(false);
        message.error('Đã hủy cập nhật');
    };
    //Code confirm thông báo

    //code load dữ liệu lên table
    const [data, setData] = useState();

    const [loading, setLoading] = useState(false);

    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 5,
        },
    });

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

    const loadCustomer = async () => {
        const result = await axios.get('http://localhost:8080/api/customers/getAll');
        setCustomerData(result.data);
    };

    const fetchData = () => {
        setLoading(true);
        fetch(`http://localhost:8080/api/customers/getAll?${qs.stringify(getRandomuserParams(tableParams))}`)
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

    const columns = [
        // {
        //     title: 'Email',
        //     dataIndex: 'email',
        //     key: 'email',
        //     width: '10%',
        // },
        {
            title: 'Ảnh',
            dataIndex: 'avatar',
            key: 'avatar',
            width: '10%',
            render: (record) => {
                console.log('abccc', record);
                return <Image width={70} src={record} alt="Avatar" />;
            },
        },

        {
            title: 'Tên khách hàng',
            dataIndex: 'customerName',
            key: 'customerName',
            width: '15%',
            ...getColumnSearchProps('customerName'),
            sorter: (a, b) => a.customerName.length - b.customerName.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: '10%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '10%',
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            width: '9%',
            filters: [
                { text: 'Nam', value: true },
                { text: 'Nữ', value: false },
            ],
            onFilter: (value, record) => record.gender === value,
            render: (text) => (text === true ? 'Nam' : 'Nữ'),
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthOfDay',
            key: 'birthOfDay',
            width: '10%',
        },
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
    //code load dữ liệu lên table

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
        const formData = new FormData();
        formData.append('customerName', customerName);
        formData.append('phoneNumber', phoneNumber);
        formData.append('email', email);
        formData.append('gender', gender);
        formData.append('birthOfDay', birthOfDay);
        formData.append('password', password);
        formData.append('status', status);

        // Lấy hình ảnh từ trường input
        if (avatar) {
            formData.append('avatar', avatar);
            try {
                // Lưu URL tải xuống từ Firebase và gửi cho back-end
                const downloadURL = await uploadFileToFirebase(avatar);

                // Gửi URL tải xuống đến back-end
                formData.append('avatarUrl', downloadURL);

                const response = await fetch('http://localhost:8080/api/customers/create-customer', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);

                    // Reset form state
                    setCustomer({
                        customerName: '',
                        avatar: '',
                        phoneNumber: '',
                        email: '',
                        gender: true,
                        birthOfDay: '',
                        password: '',
                        status: '',
                    });

                    // Reload dữ liệu khách hàng

                    setIsModalOpen(false);
                    setSpinning(false);
                    loadCustomer();
                } else {
                    console.error('Lỗi:', response.status);
                    setSpinning(false);
                }
            } catch (error) {
                console.error(error);
                setSpinning(false);
            }
        } else {
            console.error('Bạn chưa chọn hình ảnh.');
        }
    };

    const onAddClick = () => {
        setIsEditMode(false); // Chuyển sang chế độ thêm
        showModal();
    };

    const onEditClick = async (record) => {
        setIsEditMode(true);

        showModal();
        try {
            // Fetch the current customer data by ID
            const response = await axios.get(`http://localhost:8080/api/customers/getAll/${record.id}`);
            if (response.status === 200) {
                const currentCustomer = response.data;
                setCustomer({
                    customerName: currentCustomer.customerName,
                    avatar: currentCustomer.avatar || null, // Đặt giá trị avatar hoặc null
                    phoneNumber: currentCustomer.phoneNumber,
                    email: currentCustomer.email,
                    gender: currentCustomer.gender,
                    birthOfDay: currentCustomer.birthOfDay,
                    password: currentCustomer.password,
                    status: currentCustomer.status,
                });
                setFormAvatar(currentCustomer.avatar);
                setEditCustomerId(record.id);
            } else {
                console.error('Error occurred while fetching customer data.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmitEdit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('customerName', customerName);
        formData.append('phoneNumber', phoneNumber);
        formData.append('email', email);
        formData.append('gender', gender);
        formData.append('birthOfDay', birthOfDay);
        formData.append('password', password);
        formData.append('status', status);

        // Kiểm tra xem có tệp avatar mới được chọn hay không
        if (avatar instanceof File) {
            formData.append('avatar', avatar);
        }

        try {
            const response = await fetch(`http://localhost:8080/api/customers/update?id=${editCustomerId}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                // Sau khi chỉnh sửa thành công, bạn có thể thực hiện các hành động cần thiết
                // Ví dụ: hiển thị thông báo hoặc làm mới danh sách khách hàng
                console.log('Cập nhật thành công');
                setIsModalOpen(false);
                loadCustomer(); // Load lại danh sách khách hàng sau khi cập nhật
            } else {
                console.error('Có lỗi xảy ra khi cập nhật.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const toggleCustomerStatus = async (customerId) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/customers/toggle-status/${customerId}`);
            if (response.status === 200) {
                // Cập nhật trạng thái thành công
                // Đảm bảo bạn cập nhật lại danh sách khách hàng sau khi cập nhật trạng thái
                loadCustomer();
                message.success('Cập nhật Trạng thái thành công');
            } else {
                console.error('Có lỗi xảy ra khi cập nhật trạng thái.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const uploadFileToFirebase = async (file) => {
        const storage = getStorage(firebaseApp);
        const storageRef = ref(storage, `files/${v4()}`);

        const task = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
            task.on(
                'state_changed',
                (snapshot) => {
                    // Xử lý tiến trình tải lên nếu cần
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(task.snapshot.ref)
                        .then((downloadURL) => {
                            resolve(downloadURL);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                },
            );
        });
    };
    //CRUD

    //Loading
    const [spinning, setSpinning] = React.useState(false);
    //Loading

    const [formAvatar, setFormAvatar] = useState('');

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
                    title={isEditMode ? 'Chỉnh sửa khách hàng' : 'Thêm khách hàng'}
                    open={isModalOpen}
                    onOk={isEditMode ? onSubmitEdit : onSubmitAdd}
                    onCancel={handleCancel}
                >
                    <Spin spinning={spinning} size="large">
                        <form onSubmit={isEditMode ? onSubmitEdit : onSubmitAdd} encType="multipart/form-data">
                            <div className="mb-3">
                                <label htmlFor="customerName" className="form-label">
                                    Tên khách hàng
                                </label>
                                <input
                                    type={'text'}
                                    className="form-control"
                                    placeholder="Enter your first name"
                                    name="customerName"
                                    value={customerName}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="avatar" className="form-label">
                                    Ảnh
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="avatar"
                                    ref={fileInputRef}
                                    onChange={(e) => onFileChange(e)}
                                    // Đặt giá trị mặc định từ formAvatar hoặc một chuỗi trống
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phoneNumber" className="form-label">
                                    Số điện thoại
                                </label>
                                <input
                                    type={'text'}
                                    className="form-control"
                                    placeholder="Enter your Phone Number"
                                    name="phoneNumber"
                                    value={phoneNumber}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type={'text'}
                                    className="form-control"
                                    placeholder="Enter your email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    Mật khẩu
                                </label>
                                <input
                                    type={'text'}
                                    className="form-control"
                                    placeholder="Enter your password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <Form.Group>
                                    <Form.Label>Giới tính</Form.Label>
                                    <Form.Select name="gender" value={gender} onChange={(e) => onInputChange(e)}>
                                        <option value="true">Nam</option>
                                        <option value="false">Nữ</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="birthOfDay" className="form-label">
                                    Ngày sinh
                                </label>
                                <input
                                    type={'date'}
                                    className="form-control"
                                    placeholder="Enter your birthOfDay"
                                    name="birthOfDay"
                                    value={birthOfDay}
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
                    </Spin>
                </Modal>
                <div className="tieu-de" style={{ float: 'left', marginLeft: '10px' }}>
                    <h4>Danh sách khách hàng</h4>
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
                    to={path_name.addcustomer}
                    style={{ float: 'right', marginBottom: '15px' }}
                >
                    <FileExcelOutlined /> Xuất dữ liệu
                </Link>
                <Table
                    columns={columns}
                    dataSource={customerData}
                    pagination={tableParams.pagination}
                    loading={loading}
                    onChange={handleTableChange}
                />
            </div>
        </>
    );
}
