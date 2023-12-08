// import React, { useState, useRef, useMemo, useEffect } from 'react';
// import { Table, Space, Button, Input, Form, Modal, notification, Radio, Popconfirm, Tag } from 'antd';
// import {
//     PlusOutlined,
//     RedoOutlined,
//     FormOutlined,
//     DeleteOutlined,
//     SearchOutlined,
// } from '@ant-design/icons';
// import RoleService from '~/service/RoleService';
// import FormatDate from '~/utils/format-date';

// const { TextArea } = Input;

// function Role() {

//     const [loading, setLoading] = useState(false);

//     const [open, setOpen] = useState({ isModal: false, isMode: '', reacord: null });

//     const showModal = (mode, record) => {
//         setOpen({
//             isModal: true,
//             isMode: mode,
//             reacord: record,
//         });
//     };

//     const hideModal = () => {
//         setOpen({ isModal: false });
//     };

//     const [roles, setRoles] = useState([]);


//     const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });

//     const [deleted, setDeleted] = useState(null);

//     const [searchText, setSearchText] = useState(null);

//     const fetchRoles = async () => {
//         setLoading(true);

//         await RoleService.getAll(pagination.current - 1, pagination.pageSize, searchText, deleted)
//             .then(response => {

//                 setRoles(response.data);
//                 setPagination({
//                     ...pagination,
//                     total: response.totalCount,
//                 });
//                 setLoading(false);

//             }).catch(error => {
//                 console.error(error);
//             })
//     }
//     const handleDelete = async (id) => {

//         await RoleService.delete(id).then(response => {
//             console.log(response.data);
//             notification.success({
//                 message: 'Thông báo',
//                 description: 'Xóa thành công!',
//             });
//             fetchRoles();
//         }).catch(error => {
//             console.error(error);
//             notification.error({
//                 message: 'Thông báo',
//                 description: 'Xóa thất bại!',
//             });
//         });

//     };
//     useEffect(() => {
//         fetchRoles();
//     }, [pagination.current, pagination.pageSize, searchText, deleted]);


//     const handleReset = () => {

//         setSearchText(null);
//         setDeleted(null);

//         setPagination({
//             ...pagination,
//             current: 1,
//         });
//         handleTableChange(pagination, null)
//     };


//     const handleTableChange = (pagination, filters) => {

//         setPagination({
//             ...pagination,
//         });
//         const statusFilter = filters?.deleted;
//         const searchFilter = filters?.roleName;
//         // Kiểm tra nếu statusFilter không tồn tại hoặc là mảng rỗng
//         const isNoStatusFilter = !statusFilter || statusFilter.length === 0;

//         if (searchFilter) {
//             setSearchText(searchFilter[0]);
//         } else {
//             setSearchText(null)
//         }
//         // Kiểm tra nếu có lựa chọn bộ lọc và không phải là trường hợp không chọn
//         if (!isNoStatusFilter) {
//             const isBothStatus = statusFilter.length === 2;
//             // Sử dụng biểu thức điều kiện để xác định trạng thái để lọc
//             setDeleted(isBothStatus ? null : statusFilter[0]);
//         } else {
//             // Nếu không có lựa chọn bộ lọc, đặt trạng thái deleted về null hoặc giá trị mặc định
//             setDeleted(null);
//         }
//     };
//     const getColumnSearchProps = (dataIndex) => ({
//         filteredValue: [searchText] || null,
//         filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
//             <Input.Search
//                 placeholder={`Nhập tên...`}
//                 value={selectedKeys[0]}
//                 onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//                 onSearch={(value) => {
//                     setSelectedKeys(value ? [value.trim()] : []);
//                     confirm();
//                 }}
//                 style={{ display: 'block' }}
//             />
//         ),
//     });


//     const columns = [
//         {
//             title: '#',
//             dataIndex: 'key',
//             key: 'key',
//             width: '5%',
//         },
//         {
//             title: 'Tên vai trò',
//             dataIndex: 'roleName',
//             key: 'roleName',
//             width: '20%',
//             filterIcon: <SearchOutlined style={{ fontSize: '14px', color: 'rgb(158, 154, 154)' }} />,
//             ...getColumnSearchProps('roleName')
//         },
//         {
//             title: 'Ghi chú',
//             dataIndex: 'roleDescribe',
//             key: 'roleDescribe',
//             width: '19%',
//         },
//         {
//             title: 'Ngày tạo',
//             dataIndex: 'createdAt',
//             key: 'createdAt',
//             width: '15%',
//         },
//         {
//             title: 'Người tạo',
//             dataIndex: 'createdBy',
//             key: 'createdBy',
//             width: '15%',
//         },
//         {
//             title: 'Trạng thái',
//             key: 'deleted',
//             dataIndex: 'deleted',
//             width: '16%',
//             filters: [
//                 {
//                     text: 'Đang hoạt động',
//                     value: true,
//                 },
//                 {
//                     text: 'Ngừng hoạt động',
//                     value: false,
//                 },
//             ],
//             onFilter: (value, record) => record.deleted === value,
//             render: (text) => (
//                 text ? <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="#108ee9">Đang hoạt động</Tag>
//                     : <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="#f50">Ngừng hoạt động</Tag>
//             )
//         },
//         {
//             title: 'Hành động',
//             key: 'action',
//             width: '10%',
//             render: (record) => {

//                 return <Space size="middle">
//                     <Button type="text"
//                         icon={<FormOutlined style={{ color: 'rgb(214, 103, 12)' }} />}
//                         onClick={() => showModal("edit", record)} />
//                     {record.deleted && <Popconfirm
//                         title="Xóa vai trò"
//                         description="Bạn có chắc chắn xóa vai trò này không?"
//                         placement="leftTop"
//                         onConfirm={() => handleDelete(record.id)}
//                         okText="Đồng ý"
//                         cancelText="Hủy bỏ"
//                     >
//                         <Button type="text" icon={<DeleteOutlined />} style={{ color: 'red' }} />
//                     </Popconfirm>}

//                 </Space>
//             }

//         },
//     ];

//     return (
//         <>
//             <h3 style={{ marginBottom: '16px', float: 'left', color: '#2123bf' }}>Danh sách vai trò</h3>

//             <Button type="primary"
//                 icon={<PlusOutlined />}
//                 onClick={() => showModal("add")}
//                 style={{ marginBottom: '16px', float: 'right', borderRadius: '2px' }} >
//                 Thêm mới
//             </Button>

//             <Button type="primary"
//                 icon={<RedoOutlined style={{ fontSize: '18px' }} />}
//                 style={{ marginBottom: '16px', float: 'right', marginRight: '6px', borderRadius: '4px', }}
//                 onClick={handleReset}
//             />

//             <Table
//                 dataSource={roles.map((role) => ({
//                     ...role,
//                     key: role.id,
//                     createdAt: FormatDate(role.createdAt)
//                 }))}

//                 onChange={handleTableChange}

//                 loading={loading}
//                 columns={columns}
//                 pagination={{
//                     current: pagination.current,
//                     pageSize: pagination.pageSize,
//                     defaultPageSize: 5,
//                     pageSizeOptions: ['5', '10', '15'],
//                     total: pagination.total,
//                     showSizeChanger: true,
//                 }}></Table >

//             {open.isModal && <RoleModal
//                 isMode={open.isMode}
//                 reacord={open.reacord}
//                 hideModal={hideModal}
//                 isModal={open.isModal}
//                 fetchRoles={fetchRoles} />}
//         </>
//     )
// };
// export default Role;


// const RoleModal = ({ isMode, reacord, hideModal, isModal, fetchRoles }) => {

//     const [form] = Form.useForm();

//     const handleCreate = () => {
//         form.validateFields().then(async () => {

//             const data = form.getFieldsValue();

//             await RoleService.create(data)
//                 .then(() => {
//                     notification.success({
//                         message: 'Thông báo',
//                         description: 'Thêm mới thành công!',
//                     });
//                     fetchRoles();
//                     // Đóng modal
//                     hideModal();
//                 })
//                 .catch(error => {
//                     notification.error({
//                         message: 'Thông báo',
//                         description: 'Thêm mới thất bại!',
//                     });
//                     console.error(error);
//                 });

//         }).catch(error => {
//             console.error(error);
//         })

//     }
//     const handleUpdate = () => {
//         form.validateFields().then(async () => {

//             const data = form.getFieldsValue();

//             await RoleService.update(reacord.id, data)
//                 .then(() => {
//                     notification.success({
//                         message: 'Thông báo',
//                         description: 'Cập nhật thành công!',
//                     });
//                     fetchRoles();
//                     // Đóng modal
//                     hideModal();
//                 })
//                 .catch(error => {
//                     notification.error({
//                         message: 'Thông báo',
//                         description: 'Cập nhật thất bại!',
//                     });
//                     console.error(error);
//                 });

//         }).catch(error => {
//             console.error(error);
//         })

//     }

//     return (

//         <Modal
//             title={isMode === "edit" ? "Cập nhật vai trò" : "Thêm mới một vai trò"}
//             open={isModal}
//             onOk={isMode === "edit" ? handleUpdate : handleCreate}
//             onCancel={hideModal}
//             okText={isMode === "edit" ? "Cập nhật" : "Thêm mới"}
//             cancelText="Hủy bỏ"
//         >
//             <Form
//                 name="wrap"
//                 labelCol={{ flex: '100px' }}
//                 labelAlign="left"
//                 labelWrap
//                 wrapperCol={{ flex: 1 }}
//                 colon={false}
//                 style={{ maxWidth: 600, marginTop: '25px' }}
//                 form={form}
//                 initialValues={{ ...reacord }}
//             >
//                 <Form.Item label="Tên:" name="roleName" rules={[{ required: true, message: 'Vui lòng nhập tên vai trò!' }]}>
//                     <Input placeholder="Nhập tên vai trò..." />
//                 </Form.Item>

//                 <Form.Item label="Ghi chú:" name="roleDescribe" rules={[{ required: true, message: 'Vui lòng nhập ghi chú!' }]}>
//                     <TextArea rows={4} placeholder="Nhập ghi chú..." />
//                 </Form.Item>

//                 <Form.Item label="Trạng thái:" name="deleted" initialValue={true} rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}>
//                     <Radio.Group name="radiogroup" style={{ float: 'left' }}>
//                         <Radio value={true}>Đang hoạt động</Radio>
//                         <Radio value={false}>Ngừng hoạt động</Radio>
//                     </Radio.Group>
//                 </Form.Item>

//             </Form>
//         </Modal>
//     );
// };

