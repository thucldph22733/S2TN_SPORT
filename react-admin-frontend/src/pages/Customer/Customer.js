// import React, { useCallback, useRef, useEffect, useState } from 'react';
// import { EditOutlined, FileExcelOutlined, PlusOutlined, SearchOutlined, UserAddOutlined } from '@ant-design/icons';
// import Highlighter from 'react-highlight-words';
// import axios from 'axios';
// import { Button, Input, Space, Table, theme, Image, Modal } from 'antd';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import qs from 'qs';
// import path_name from '~/core/constants/routers';
// import { DeleteOutlined } from '@ant-design/icons';
// import { FaEdit, FaEye } from 'react-icons/fa';
// import imagess from 'D:/DoAnTotNghiep/S2TN_SPORT/react-admin-frontend/src/assets/images/importImages';
// import { Form } from 'react-bootstrap';
// export default function Customer() {
//     // Đường dẫn đến ảnh mặc định
//     const [searchText, setSearchText] = useState('');
//     const [searchedColumn, setSearchedColumn] = useState('');
//     const [customerData, setCustomerData] = useState([]);
//     const { id } = useParams();
//     const searchInput = useRef(null);
//     const [isEditMode, setIsEditMode] = useState(false);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const navigate = useNavigate();
//     const [editCustomerId, setEditCustomerId] = useState(null);

//     useEffect(() => {
//         loadCustomer();
//     }, []);

//     const loadCustomer = async () => {
//         const result = await axios.get('http://localhost:8080/api/customers/getAll');
//         setCustomerData(result.data);
//     };

//     const deleteCustomer = async (id) => {
//         await axios.delete(`http://localhost:8080/api/customers/delete/${id}`);
//         loadCustomer();
//     };

//     const handleSearch = (selectedKeys, confirm, dataIndex) => {
//         confirm();
//         setSearchText(selectedKeys[0]);
//         setSearchedColumn(dataIndex);
//     };

//     const handleReset = (clearFilters) => {
//         clearFilters();
//         setSearchText('');
//     };

//     const getColumnSearchProps = (dataIndex) => ({
//         filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
//             <div
//                 style={{
//                     padding: 8,
//                 }}
//                 onKeyDown={(e) => e.stopPropagation()}
//             >
//                 <Input
//                     ref={searchInput}
//                     placeholder={`Search ${dataIndex}`}
//                     value={selectedKeys[0]}
//                     onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//                     onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                     style={{
//                         marginBottom: 8,
//                         display: 'block',
//                     }}
//                 />
//                 <Space>
//                     <Button
//                         type="primary"
//                         onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                         icon={<SearchOutlined />}
//                         size="small"
//                         style={{
//                             width: 90,
//                         }}
//                     >
//                         Search
//                     </Button>
//                     <Button
//                         onClick={() => clearFilters && handleReset(clearFilters)}
//                         size="small"
//                         style={{
//                             width: 90,
//                         }}
//                     >
//                         Reset
//                     </Button>
//                     <Button
//                         type="link"
//                         size="small"
//                         onClick={() => {
//                             confirm({
//                                 closeDropdown: false,
//                             });
//                             setSearchText(selectedKeys[0]);
//                             setSearchedColumn(dataIndex);
//                         }}
//                     >
//                         Filter
//                     </Button>
//                     <Button
//                         type="link"
//                         size="small"
//                         onClick={() => {
//                             close();
//                         }}
//                     >
//                         close
//                     </Button>
//                 </Space>
//             </div>
//         ),
//         filterIcon: (filtered) => (
//             <SearchOutlined
//                 style={{
//                     color: filtered ? '#1677ff' : undefined,
//                 }}
//             />
//         ),
//         onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
//         onFilterDropdownOpenChange: (visible) => {
//             if (visible) {
//                 setTimeout(() => searchInput.current?.select(), 100);
//             }
//         },
//         render: (text) =>
//             searchedColumn === dataIndex ? (
//                 <Highlighter
//                     highlightStyle={{
//                         backgroundColor: '#ffc069',
//                         padding: 0,
//                     }}
//                     searchWords={[searchText]}
//                     autoEscape
//                     textToHighlight={text ? text.toString() : ''}
//                 />
//             ) : (
//                 text
//             ),
//     });
//     const columns = [
//         {
//             title: 'Ảnh',
//             dataIndex: 'avatar',
//             key: 'avatar',
//             width: '10%',
//             render: (record) => {
//                 return <Image width={70} src={imagess[`./${record}`]} />;
//             },
//         },

//         {
//             title: 'Tên khách hàng',
//             dataIndex: 'customerName',
//             key: 'customerName',
//             width: '15%',
//             ...getColumnSearchProps('customerName'),
//             sorter: (a, b) => a.customerName.length - b.customerName.length,
//             sortDirections: ['descend', 'ascend'],
//         },
//         {
//             title: 'Số điện thoại',
//             dataIndex: 'phoneNumber',
//             key: 'phoneNumber',
//             width: '10%',
//         },
//         {
//             title: 'Email',
//             dataIndex: 'email',
//             key: 'email',
//             width: '10%',
//         },
//         {
//             title: 'Giới tính',
//             dataIndex: 'gender',
//             key: 'gender',
//             width: '9%',
//             filters: [
//                 { text: 'Nam', value: true },
//                 { text: 'Nữ', value: false },
//             ],
//             onFilter: (value, record) => record.gender === value,
//             render: (text) => (text === true ? 'Nam' : 'Nữ'),
//         },
//         {
//             title: 'Ngày sinh',
//             dataIndex: 'birthOfDay',
//             key: 'birthOfDay',
//             width: '10%',
//         },
//         {
//             title: 'Trạng thái',
//             dataIndex: 'status',
//             key: 'status',
//             width: '15%',
//             render: (text) => (
//                 <span
//                     style={{
//                         display: 'inline-block',
//                         padding: '4px 8px',
//                         borderRadius: '4px',
//                         textAlign: 'center',
//                         fontWeight: 'bold',
//                         cursor: 'pointer',
//                         backgroundColor: text === 0 ? 'green' : 'red',
//                         color: 'white',
//                     }}
//                 >
//                     {text === 0 ? 'Đang hoạt động' : 'Không hoạt động'}
//                 </span>
//             ),
//         },
//         {
//             title: <div style={{ textAlign: 'center' }}>Hành động</div>,
//             dataIndex: '',
//             key: 'x',
//             width: '30%',
//             render: (record) => (
//                 <div style={{ textAlign: 'center' }}>
//                     <button
//                         onClick={() => toggleCustomerStatus(record.id)}
//                         className="btn btn-outline-danger"
//                         style={{ marginRight: '10px' }}
//                     >
//                         <DeleteOutlined />
//                     </button>

//                     <Link
//                         className="btn btn-outline-primary"
//                         onClick={() => onEditClick(record)} // Truyền record vào hàm onEditClick
//                         style={{ marginRight: '10px' }}
//                     >
//                         <FaEdit />
//                     </Link>

//                     <Link className="btn btn-outline-warning">
//                         <FaEye />
//                     </Link>
//                 </div>
//             ),
//         },
//     ];

//     const getRandomuserParams = (params) => ({
//         results: params.pagination?.pageSize,
//         page: params.pagination?.current,
//         ...params,
//     });

//     const [data, setData] = useState();
//     const [loading, setLoading] = useState(false);
//     const [tableParams, setTableParams] = useState({
//         pagination: {
//             current: 1,
//             pageSize: 5,
//         },
//     });

//     const fetchData = () => {
//         setLoading(true);
//         fetch(`http://localhost:8080/api/customers/getAll?${qs.stringify(getRandomuserParams(tableParams))}`)
//             .then((res) => res.json())
//             .then(({ results }) => {
//                 setData(results);
//                 setLoading(false);
//                 setTableParams({
//                     ...tableParams,
//                     pagination: {
//                         ...tableParams.pagination,
//                         total: results,
//                     },
//                 });
//             });
//     };

//     useEffect(() => {
//         fetchData();
//     }, [JSON.stringify(tableParams)]);

//     const handleTableChange = (pagination, filters, sorter) => {
//         setTableParams({
//             pagination,
//             filters,
//             ...sorter,
//         });

//         if (pagination.pageSize !== tableParams.pagination?.pageSize) {
//             setData([]);
//         }
//     };
//     const {
//         token: { colorBgContainer },
//     } = theme.useToken();

//     const showModal = () => {
//         setIsModalOpen(true);
//     };
//     const handleCancel = () => {
//         setIsModalOpen(false);
//     };

//     const [customer, setCustomer] = useState({
//         customerName: '',
//         avatar: null, // Thay mảng thành tệp ảnh đơn
//         phoneNumber: '',
//         email: '',
//         gender: '',
//         birthOfDay: '',
//         password: '',
//         status: 1,
//     });

//     const { customerName, avatar, phoneNumber, email, gender, birthOfDay, password, status } = customer;

//     const onInputChange = (e) => {
//         setCustomer({ ...customer, [e.target.name]: e.target.value });
//     };

//     const onFileChange = (e) => {
//         const file = e.target.files[0]; // Chỉ chấp nhận một tệp ảnh
//         setCustomer({ ...customer, avatar: file });
//     };

//     const onSubmitAdd = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('customerName', customerName);
//         formData.append('avatar', avatar);
//         formData.append('phoneNumber', phoneNumber);
//         formData.append('email', email);
//         formData.append('gender', gender);
//         formData.append('birthOfDay', birthOfDay);
//         formData.append('password', password);
//         formData.append('status', status);

//         try {
//             const response = await fetch('http://localhost:8080/api/customers/create-customer', {
//                 method: 'POST',
//                 body: formData,
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 console.log(data);
//                 setIsModalOpen(false);
//                 // Reset form state
//                 setCustomer({
//                     customerName: '',
//                     avatar: '',
//                     phoneNumber: '',
//                     email: '',
//                     gender: true,
//                     birthOfDay: '',
//                     password: '',
//                     status: '',
//                 });
//                 // Reload customer data
//                 loadCustomer(); // or loadCustomers() if needed
//             } else {
//                 console.error('Error:', response.status);
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const onAddClick = () => {
//         setIsEditMode(false); // Chuyển sang chế độ thêm
//         showModal();
//     };

//     const onEditClick = (record) => {
//         setIsEditMode(true); // Chuyển sang chế độ chỉnh sửa
//         showModal();
//         // Đặt dữ liệu khách hàng để chỉnh sửa
//         setCustomer({
//             customerName: record.customerName,
//             avatar: record.avatar,
//             phoneNumber: record.phoneNumber,
//             email: record.email,
//             gender: record.gender,
//             birthOfDay: record.birthOfDay,
//             password: record.password,
//             status: record.status,
//         });
//         setEditCustomerId(record.id); // Lưu ID của khách hàng vào một state khác (nếu bạn chưa có state này).
//     };

//     // const loadCustomers = async () => {
//     //     try {
//     //         const result = await axios.get(`http://localhost:8080/api/customers/getAll/${id}`);
//     //         setCustomer(result.data);
//     //     } catch (error) {
//     //         console.error('Axios error:', error);
//     //     }
//     // };

//     const onSubmitEdit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();

//         formData.append('customerName', customerName);
//         formData.append('phoneNumber', phoneNumber);
//         formData.append('email', email);
//         formData.append('gender', gender);
//         formData.append('birthOfDay', birthOfDay);
//         formData.append('password', password);
//         formData.append('status', status);

//         // Thêm kiểm tra nếu ảnh thay đổi
//         if (avatar instanceof File) {
//             formData.append('avatar', avatar);
//         }

//         try {
//             const response = await fetch(`http://localhost:8080/api/customers/update?id=${editCustomerId}`, {
//                 method: 'PUT',
//                 body: formData,
//             });

//             if (response.status === 200) {
//                 // Xử lý khi cập nhật thành công
//                 setIsModalOpen(false);
//                 setCustomer({
//                     customerName: '',
//                     avatar: '',
//                     phoneNumber: '',
//                     email: '',
//                     gender: true,
//                     birthOfDay: '',
//                     password: '',
//                     status: '',
//                 });
//                 loadCustomer(); // Hoặc loadCustomers() nếu cần
//             } else {
//                 console.error('Có lỗi xảy ra khi cập nhật.');
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const toggleCustomerStatus = async (customerId) => {
//         try {
//             const response = await axios.put(`http://localhost:8080/api/customers/toggle-status/${customerId}`);
//             if (response.status === 200) {
//                 // Cập nhật trạng thái thành công
//                 // Đảm bảo bạn cập nhật lại danh sách khách hàng sau khi cập nhật trạng thái
//                 loadCustomer();
//             } else {
//                 console.error('Có lỗi xảy ra khi cập nhật trạng thái.');
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <>
//             <div
//                 style={{
//                     margin: '10px 10px',
//                     padding: 14,
//                     minHeight: 280,
//                     background: colorBgContainer,
//                 }}
//             >
//                 <Modal
//                     title={isEditMode ? 'Chỉnh Sửa Khách Hàng' : 'Thêm Khách Hàng'}
//                     open={isModalOpen}
//                     onOk={isEditMode ? onSubmitEdit : onSubmitAdd}
//                     onCancel={handleCancel}
//                 >
//                     <form onSubmit={isEditMode ? onSubmitEdit : onSubmitAdd} encType="multipart/form-data">
//                         <div className="mb-3">
//                             <label htmlFor="customerName" className="form-label">
//                                 Tên khách hàng
//                             </label>
//                             <input
//                                 type={'text'}
//                                 className="form-control"
//                                 placeholder="Enter your first name"
//                                 name="customerName"
//                                 value={customerName}
//                                 onChange={(e) => onInputChange(e)}
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="avatar" className="form-label">
//                                 Ảnh
//                             </label>
//                             <input type="file" className="form-control" name="avatar" onChange={onFileChange} />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="phoneNumber" className="form-label">
//                                 Số điện thoại
//                             </label>
//                             <input
//                                 type={'text'}
//                                 className="form-control"
//                                 placeholder="Enter your Phone Number"
//                                 name="phoneNumber"
//                                 value={phoneNumber}
//                                 onChange={(e) => onInputChange(e)}
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="email" className="form-label">
//                                 Email
//                             </label>
//                             <input
//                                 type={'text'}
//                                 className="form-control"
//                                 placeholder="Enter your email"
//                                 name="email"
//                                 value={email}
//                                 onChange={(e) => onInputChange(e)}
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="password" className="form-label">
//                                 Mật khẩu
//                             </label>
//                             <input
//                                 type={'text'}
//                                 className="form-control"
//                                 placeholder="Enter your password"
//                                 name="password"
//                                 value={password}
//                                 onChange={(e) => onInputChange(e)}
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <Form.Group>
//                                 <Form.Label>Giới tính</Form.Label>
//                                 <Form.Select name="gender" value={gender} onChange={(e) => onInputChange(e)}>
//                                     <option value="true">Nam</option>
//                                     <option value="false">Nữ</option>
//                                 </Form.Select>
//                             </Form.Group>
//                         </div>

//                         <div className="mb-3">
//                             <label htmlFor="birthOfDay" className="form-label">
//                                 Ngày sinh
//                             </label>
//                             <input
//                                 type={'date'}
//                                 className="form-control"
//                                 placeholder="Enter your birthOfDay"
//                                 name="birthOfDay"
//                                 value={birthOfDay}
//                                 onChange={(e) => onInputChange(e)}
//                             />
//                         </div>

//                         <div className="mb-3">
//                             <Form.Group>
//                                 <Form.Label>Trạng thái</Form.Label>
//                                 <Form.Select name="status" value={status} onChange={(e) => onInputChange(e)}>
//                                     <option value="0">Đang hoạt động</option>
//                                     <option value="1">Không hoạt động</option>
//                                 </Form.Select>
//                             </Form.Group>
//                         </div>
//                     </form>
//                 </Modal>
//                 <div className="tieu-de" style={{ float: 'left', marginLeft: '10px' }}>
//                     <h4>Danh sách khách hàng</h4>
//                 </div>
//                 <Link
//                     className="btn btn-success mx-2"
//                     // to={path_name.addcustomer}
//                     onClick={onAddClick}
//                     style={{ float: 'right', marginBottom: '15px' }}
//                 >
//                     <PlusOutlined /> Thêm mới
//                 </Link>
//                 <Link
//                     className="btn btn-success mx-2"
//                     to={path_name.addcustomer}
//                     style={{ float: 'right', marginBottom: '15px' }}
//                 >
//                     <FileExcelOutlined /> Xuất dữ liệu
//                 </Link>
//                 <Table
//                     columns={columns}
//                     dataSource={customerData}
//                     pagination={tableParams.pagination}
//                     loading={loading}
//                     onChange={handleTableChange}
//                 />
//             </div>
//         </>
//     );
// }
