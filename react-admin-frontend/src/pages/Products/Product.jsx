// import React, { useState, useEffect } from 'react';
// import { Table, Space, Button, Input, Form, Modal, notification, Radio, Popconfirm, Tag, Select, Row, Col, Checkbox } from 'antd';
// import {
//     PlusOutlined,
//     RedoOutlined,
//     FormOutlined,
//     DeleteOutlined,
//     SearchOutlined,
//     EyeOutlined,
// } from '@ant-design/icons';
// import './Product.css'
// import FormatDate from '~/utils/format-date';
// import ProductService from '~/service/ProductService';
// import CategoryService from '~/service/CategoryService';
// import BrandService from '~/service/BrandService';
// import ClubService from '~/service/ClubService';
// import SuppplierService from '~/service/SupplierService';
// import MaterialService from '~/service/MaterialService';
// import ShowProductDetailModal from './ProductDetail';

// const { TextArea } = Input;

// function Product() {

//     const [loading, setLoading] = useState(false);

//     const [productDetalModal, setProductDetalModal] = useState({ isModal: false, reacord: null });

//     const showProductDetalModal = (record) => {
//         setProductDetalModal({
//             isModal: true,
//             reacord: record,
//         });
//     };

//     const hideProductDetalModal = () => {
//         setProductDetalModal({ isModal: false });
//     };

    

//     const [products, setProduct] = useState([]);

//     const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });

//     const [deleted, setDeleted] = useState(null);

//     const [searchText, setSearchText] = useState(null);

//     const fetchProducts = async () => {
//         setLoading(true)
//         await ProductService.getAll(pagination.current - 1, pagination.pageSize, searchText, deleted)
//             .then(response => {

//                 setProduct(response.data);
//                 console.log(response.data)
//                 setPagination({
//                     ...pagination,
//                     total: response.totalCount,
//                 });
//                 setLoading(false)
//             }).catch(error => {
//                 console.error(error);
//             })
//     }

//     useEffect(() => {
//         fetchProducts();
//     }, [pagination.current, pagination.pageSize, searchText, deleted]);


//     const handleDelete = async (id) => {

//         await ProductService.delete(id).then(response => {
//             console.log(response.data);
//             notification.success({
//                 message: 'Thông báo',
//                 description: 'Xóa thành công!',
//             });
//             fetchProducts();
//         }).catch(error => {
//             console.error(error);
//             notification.error({
//                 message: 'Thông báo',
//                 description: 'Xóa thất bại!',
//             });
//         });

//     };

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
//         const searchFilter = filters?.productName;
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
//             title: 'Tên sản phẩm',
//             dataIndex: 'productName',
//             key: 'productName',
//             width: '10%',
//             filterIcon: <SearchOutlined style={{ fontSize: '14px', color: 'rgb(158, 154, 154)' }} />,
//             ...getColumnSearchProps('productName')

//         },
//         {
//             title: 'Danh mục',
//             dataIndex: 'categoryName',
//             key: 'categoryName',
//             width: '10%',
//         },
//         {
//             title: 'Chất liệu',
//             dataIndex: 'materialName',
//             key: 'materialName',
//             width: '10%',
//         },
//         {
//             title: 'Thương hiệu',
//             dataIndex: 'brandName',
//             key: 'brandName',
//             width: '10%',
//         },
//         {
//             title: 'Nhà cung cấp',
//             dataIndex: 'supplierName',
//             key: 'supplierName',
//             width: '10%',
//         },
//         {
//             title: 'Ngày tạo',
//             dataIndex: 'createdAt',
//             key: 'createdAt',
//             width: '10%',
//         },
//         {
//             title: 'Người tạo',
//             dataIndex: 'createdBy',
//             key: 'createdBy',
//             width: '10%',
//         },
//         {
//             title: 'Trạng thái',
//             key: 'deleted',
//             dataIndex: 'deleted',
//             width: '15%',
//             filters: [
//                 {
//                     text: 'Đang bán',
//                     value: true,
//                 },
//                 {
//                     text: 'Ngừng bán',
//                     value: false,
//                 },
//             ],

//             onFilter: (value, record) => record.deleted === value,
//             render: (text) => (
//                 text ? <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="#108ee9">Đang bán</Tag>
//                     : <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="#f50">Ngừng bán</Tag>
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
//                         title="Xóa sản phẩm"
//                         description="Bạn có chắc chắn xóa sản phẩm này không?"
//                         placement="leftTop"
//                         onConfirm={() => handleDelete(record.id)}
//                         okText="Đồng ý"
//                         cancelText="Hủy bỏ"
//                     >
//                         <Button type="text" icon={<DeleteOutlined />} style={{ color: 'red' }} />

//                     </Popconfirm>}
//                     <Button type="text" icon={<EyeOutlined />} style={{ color: '#5a76f3', fontSize: '16px' }} onClick={() => showProductDetalModal(record)} />
//                 </Space>
//             }

//         },
//     ];

//     return (
//         <>
//             <h3 style={{ marginBottom: '16px', float: 'left', color: '#2123bf' }}>Danh sách sản phẩm</h3>

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
//                 dataSource={products?.map((product) => ({
//                     ...product,
//                     key: product.id,
//                     createdAt: FormatDate(product.createdAt)
//                 }))}

//                 loading={loading}
//                 columns={columns}
//                 onChange={handleTableChange}
//                 pagination={{
//                     current: pagination.current,
//                     pageSize: pagination.pageSize,
//                     defaultPageSize: 5,
//                     pageSizeOptions: ['5', '10', '15'],
//                     total: pagination.total,
//                     showSizeChanger: true,
//                 }}></Table >

//             {open.isModal && <ProductModal
//                 isMode={open.isMode}
//                 reacord={open.reacord}
//                 hideModal={hideModal}
//                 isModal={open.isModal}
//                 fetchProducts={fetchProducts} />}

//             {productDetalModal.isModal && <ShowProductDetailModal
//                 reacord={productDetalModal.reacord}
//                 hideModal={hideProductDetalModal}
//                 isModal={productDetalModal.isModal}
//             />}
//         </>
//     )
// };
// export default Product;


// const ProductModal = ({ isMode, reacord, hideModal, isModal, fetchProducts }) => {

//     ////Loại sp
//     const [categories, setCategories] = useState([]);

//     useEffect(() => {
//         fetchCategory()
//     }, []);

//     const fetchCategory = async () => {

//         await CategoryService.findAllByDeletedTrue()
//             .then(response => {

//                 setCategories(response.data)
//             }).catch(error => {
//                 console.error(error);
//             })
//     }

//     // câu lạc bộ
//     const [materials, setMaterials] = useState([]);

//     useEffect(() => {
//         fetchMaterial()
//     }, []);
//     const fetchMaterial = async () => {

//         await MaterialService.findAllByDeletedTrue()
//             .then(response => {

//                 setMaterials(response.data)

//             }).catch(error => {
//                 console.error(error);
//             })
//     }

//     // /thương hiệu
//     const [brands, setBrands] = useState([]);

//     useEffect(() => {
//         fetchBrand()
//     }, []);
//     const fetchBrand = async () => {

//         await BrandService.findAllByDeletedTrue()
//             .then(response => {

//                 setBrands(response.data)

//             }).catch(error => {
//                 console.error(error);
//             })
//     }


//     // /nhà phẩn phối
//     const [suppliers, setSuppliers] = useState([]);

//     useEffect(() => {
//         fetchSupplier()
//     }, []);
//     const fetchSupplier = async () => {

//         await SuppplierService.findAllByDeletedTrue()
//             .then(response => {

//                 setSuppliers(response.data)
//             }).catch(error => {
//                 console.error(error);
//             })
//     }

//     const [form] = Form.useForm();

//     const handleCreate = () => {
//         form.validateFields().then(async () => {

//             const data = form.getFieldsValue();

//             data.productNew = data.productNew ? true : false
//             data.productSale = data.productSale ? true : false
//             data.productHot = data.productHot ? true : false

//             await ProductService.create(data)
//                 .then(() => {
//                     notification.success({
//                         message: 'Thông báo',
//                         description: 'Thêm mới thành công!',
//                     });
//                     fetchProducts();
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

//             const data = form.getFieldsValue(true);
//             await ProductService.update(reacord.id, data)
//                 .then(() => {
//                     notification.success({
//                         message: 'Thông báo',
//                         description: 'Cập nhật thành công!',
//                     });
//                     fetchProducts();
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

//     console.log(reacord)
//     return (

//         <Modal
//             width={700}
//             title={isMode === "edit" ? "Cập nhật sản phẩm" : "Thêm mới một sản phẩm"}
//             open={isModal}
//             onOk={isMode === "edit" ? handleUpdate : handleCreate}
//             onCancel={hideModal}
//             okText={isMode === "edit" ? "Cập nhật" : "Thêm mới"}
//             cancelText="Hủy bỏ"
//         >
//             <Form
//                 name="validateOnly" layout="vertical" autoComplete="off"
//                 style={{ maxWidth: 700, marginTop: '25px' }}
//                 form={form}
//                 initialValues={{
//                     ...reacord,

//                 }}
//             >
//                 <Form.Item label="Tên sản phẩm:" name="productName" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}>
//                     <Input placeholder="Nhập tên sản phẩm..." />
//                 </Form.Item>

//                 <Row>
//                     <Col span={11}>
//                         <Form.Item label="Danh mục:" name="categoryName" rules={[{ required: true, message: 'Vui lòng chọn danh mục !' }]}>
//                             <Select
//                                 showSearch
//                                 style={{
//                                     width: '100%',
//                                 }}
//                                 placeholder="Chọn loại sản phẩm"
//                                 filterOption={(input, option) => (option?.label ?? '').includes(input)}
//                                 filterSort={(optionA, optionB) =>
//                                     (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
//                                 }
//                                 options={categories.map(option => ({ value: option.categoryName, label: option.categoryName }))}
//                             />
//                         </Form.Item>
//                     </Col>
//                     <Col span={2}></Col>
//                     <Col span={11}>
//                         <Form.Item label="Chất liệu:" name="materialName" rules={[{ required: true, message: 'Vui lòng chọn chất liệu !' }]}>
//                             <Select
//                                 showSearch
//                                 style={{
//                                     width: '100%',
//                                 }}
//                                 placeholder="Chọn chất liệu"
//                                 filterOption={(input, option) => (option?.label ?? '').includes(input)}
//                                 filterSort={(optionA, optionB) =>
//                                     (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
//                                 }
//                                 options={materials.map(option => ({ value: option.materialName, label: option.materialName }))}
//                             />
//                         </Form.Item>
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col span={11}>
//                         <Form.Item label="Thương hiệu:" name="brandName" rules={[{ required: true, message: 'Vui lòng chọn thương hiệu !' }]}>
//                             <Select
//                                 showSearch
//                                 style={{
//                                     width: '100%',
//                                 }}
//                                 placeholder="Chọn thương hiệu"
//                                 filterOption={(input, option) => (option?.label ?? '').includes(input)}
//                                 filterSort={(optionA, optionB) =>
//                                     (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
//                                 }
//                                 options={brands.map(option => ({ value: option.brandName, label: option.brandName }))}
//                             />
//                         </Form.Item>
//                     </Col>
//                     <Col span={2}></Col>
//                     <Col span={11}>
//                         <Form.Item label="Nhà cung cấp:" name="supplierName" rules={[{ required: true, message: 'Vui lòng chọn nhà cung cấp !' }]}>
//                             <Select
//                                 showSearch
//                                 style={{
//                                     width: '100%',
//                                 }}
//                                 placeholder="Chọn nhà cung cấp"
//                                 filterOption={(input, option) => (option?.label ?? '').includes(input)}
//                                 filterSort={(optionA, optionB) =>
//                                     (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
//                                 }
//                                 options={suppliers.map(option => ({ value: option.supplierName, label: option.supplierName }))}
//                             />
//                         </Form.Item>
//                     </Col>
//                 </Row>
//                 <Row style={{ border: '1px solid #cdcdcd', padding: '20px 10px 0 10px', marginBottom: '7px' }}>

//                     <Col span={8}>
//                         <Form.Item name="productNew" valuePropName="checked">
//                             <Checkbox>Sản phẩm mới</Checkbox>
//                         </Form.Item>
//                     </Col>

//                     <Col span={8}>
//                         <Form.Item name="productHot" valuePropName="checked">
//                             <Checkbox>Sản phẩm hot</Checkbox>
//                         </Form.Item>
//                     </Col>

//                     <Col span={8}>
//                         <Form.Item name="productSale" valuePropName="checked">
//                             <Checkbox>Sản phẩm bán chạy</Checkbox>
//                         </Form.Item>
//                     </Col>

//                 </Row>
//                 <Form.Item label="Mô tả:" name="productDescribe" rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}>
//                     <TextArea rows={4} placeholder="Nhập mô tả..." />
//                 </Form.Item>

//                 <Form.Item label="Trạng thái:" name="deleted" initialValue={true} rules={[{ required: true, message: 'Vui lòng chọn tạng thái!' }]}>
//                     <Radio.Group name="radiogroup" style={{ float: 'left' }}>
//                         <Radio value={true}>Đang hoạt động</Radio>
//                         <Radio value={false}>Ngừng hoạt động</Radio>
//                     </Radio.Group>
//                 </Form.Item>

//             </Form>
//         </Modal>
//     );
// };