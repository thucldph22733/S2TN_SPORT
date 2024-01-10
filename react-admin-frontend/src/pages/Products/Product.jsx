import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Input, Form, Modal, notification, Radio, Popconfirm, Tag, Select, Row, Col, Checkbox, Card } from 'antd';
import {
    PlusOutlined,
    RedoOutlined,
    FormOutlined,
    DeleteOutlined,
    SearchOutlined,
    EyeOutlined,
    FilterOutlined,
    FileDoneOutlined,
} from '@ant-design/icons';
import './Product.css'
import FormatDate from '~/utils/format-date';
import ProductService from '~/service/ProductService';
import CategoryService from '~/service/CategoryService';
import BrandService from '~/service/BrandService';
import SuppplierService from '~/service/SupplierService';
import MaterialService from '~/service/MaterialService';
import ShowProductDetailModal from './ProductDetail';

const { TextArea } = Input;

function Product() {

    const [loading, setLoading] = useState(false);

    const [productDetalModal, setProductDetalModal] = useState({ isModal: false, reacord: null });

    const showProductDetalModal = (record) => {
        setProductDetalModal({
            isModal: true,
            reacord: record,
        });
    };

    const hideProductDetalModal = () => {
        setProductDetalModal({ isModal: false });
    };



    const [products, setProduct] = useState([]);

    const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });

    const [deleted, setDeleted] = useState(null);

    const [searchText, setSearchText] = useState(null);

    const fetchProducts = async () => {
        setLoading(true)
        await ProductService.getAll(pagination.current - 1, pagination.pageSize, searchText, deleted)
            .then(response => {

                setProduct(response.data);
                console.log(response.data)
                setPagination({
                    ...pagination,
                    total: response.totalCount,
                });
                setLoading(false)
            }).catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        fetchProducts();
    }, [pagination.current, pagination.pageSize, searchText, deleted]);


    const handleDelete = async (id) => {

        await ProductService.delete(id).then(response => {
            console.log(response.data);
            notification.success({
                message: 'Thông báo',
                description: 'Xóa thành công!',
            });
            fetchProducts();
        }).catch(error => {
            console.error(error);
            notification.error({
                message: 'Thông báo',
                description: 'Xóa thất bại!',
            });
        });

    };

    const handleReset = () => {

        setSearchText(null);
        setDeleted(null);

        setPagination({
            ...pagination,
            current: 1,
        });
        handleTableChange(pagination, null)
    };


    const handleTableChange = (pagination, filters) => {

        setPagination({
            ...pagination,
        });
        const statusFilter = filters?.deleted;
        const searchFilter = filters?.productName;
        // Kiểm tra nếu statusFilter không tồn tại hoặc là mảng rỗng
        const isNoStatusFilter = !statusFilter || statusFilter.length === 0;

        if (searchFilter) {
            setSearchText(searchFilter[0]);
        } else {
            setSearchText(null)
        }
        // Kiểm tra nếu có lựa chọn bộ lọc và không phải là trường hợp không chọn
        if (!isNoStatusFilter) {
            const isBothStatus = statusFilter.length === 2;

            // Sử dụng biểu thức điều kiện để xác định trạng thái để lọc
            setDeleted(isBothStatus ? null : statusFilter[0]);
        } else {
            // Nếu không có lựa chọn bộ lọc, đặt trạng thái deleted về null hoặc giá trị mặc định
            setDeleted(null);
        }
    };


    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            width: '5%',
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'productName',
            key: 'productName',
            width: '20%',

        },
        {
            title: 'Danh mục',
            dataIndex: 'categoryName',
            key: 'categoryName',
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
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: '10%',
        },
        {
            title: 'Người tạo',
            dataIndex: 'createdBy',
            key: 'createdBy',
            width: '10%',
        },
        {
            title: 'Trạng thái',
            key: 'deleted',
            dataIndex: 'deleted',
            width: '10%',
            render: (text) => (
                text ? <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="#108ee9">Đang bán</Tag>
                    : <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="#f50">Ngừng bán</Tag>
            )
        },
        {
            title: 'Hành động',
            key: 'action',
            width: '10%',
            render: (record) => {

                return <Space size="middle">
                    <Button type="text"
                        icon={<FormOutlined style={{ color: 'rgb(214, 103, 12)' }} />}
                    // onClick={() => showModal("edit", record)}
                    />
                    {record.deleted && <Popconfirm
                        title="Xóa sản phẩm"
                        description="Bạn có chắc chắn xóa sản phẩm này không?"
                        placement="leftTop"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Đồng ý"
                        cancelText="Hủy bỏ"
                    >
                        <Button type="text" icon={<DeleteOutlined />} style={{ color: 'red' }} />

                    </Popconfirm>}
                    <Button type="text" icon={<EyeOutlined />} style={{ color: '#5a76f3', fontSize: '16px' }} onClick={() => showProductDetalModal(record)} />
                </Space>
            }

        },
    ];

    return (
        <>
            <Card
                title={<span style={{ color: '#5a76f3' }}><FilterOutlined /> Lọc</span>}
                style={{ borderRadius: '10px' }}
            >
                <Row>
                    <Col span={8} style={{ padding: '0 50px' }}>
                        <Select
                            style={{
                                width: '100%',
                                height: '35px',
                            }}
                            allowClear
                            placeholder="Khoảng giá"
                            // value={priceRange}
                            // onChange={(value) => handleFilterChange('priceRange', value)}
                            options={[
                                {
                                    value: 1,
                                    label: 'Dưới 200.000 đ',
                                },
                                {
                                    value: 2,
                                    label: '200.000 đ - 400.000 đ',
                                },
                                {
                                    value: 3,
                                    label: '400.000 đ - 600.000 đ',
                                },
                                {
                                    value: 4,
                                    label: 'Trên 600.000 đ',
                                },
                            ]}
                        />
                    </Col>
                    <Col span={8} style={{ padding: '0 50px' }}>
                        <Select
                            style={{
                                width: '100%',
                                height: '35px',
                            }}
                            allowClear
                            placeholder="Danh mục"
                            showSearch
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                        // value={filterProduct.categoryId}
                        // onChange={(value) => handleFilterChange('categoryId', value)}
                        // options={categories.map(item => ({
                        //     value: item.id,
                        //     label: item.categoryName,
                        // }))}
                        />
                    </Col>
                    <Col span={8} style={{ padding: '0 50px' }}>
                        <Select
                            style={{
                                width: '100%',
                                height: '35px',
                            }}
                            allowClear
                            placeholder="Thương hiệu"
                            showSearch
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                        // value={filterProduct.brandId}
                        // onChange={(value) => handleFilterChange('brandId', value)}
                        // options={brands.map(item => ({
                        //     value: item.id,
                        //     label: item.brandName,
                        // }))}
                        />
                    </Col>
                </Row>
                <Row style={{ marginTop: '20px' }}>
                    <Col span={8} style={{ padding: '0 50px' }}>
                        <Select
                            style={{
                                width: '100%',
                                height: '35px',
                            }}
                            allowClear
                            placeholder="Chất liệu"
                            showSearch
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                        // value={filterProduct.materialId}
                        // onChange={(value) => handleFilterChange('materialId', value)}
                        // options={materials.map(item => ({
                        //     value: item.id,
                        //     label: item.materialName,
                        // }))}
                        />
                    </Col>
                    <Col span={8} style={{ padding: '0 50px' }}>
                        <Select
                            style={{
                                width: '100%',
                                height: '35px',
                            }}
                            allowClear
                            placeholder="Màu sắc"
                            showSearch
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                        // value={filterProduct.colorId}
                        // onChange={(value) => handleFilterChange('colorId', value)}
                        // options={colors.map(item => ({
                        //     value: item.id,
                        //     label: item.colorName,
                        // }))}
                        />
                    </Col>
                    <Col span={8} style={{ padding: '0 50px' }}>
                        <Select
                            style={{
                                width: '100%',
                                height: '35px',
                            }}
                            allowClear
                            placeholder="Kích thước"
                            showSearch
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                        // value={filterProduct.sizeId}
                        // onChange={(value) => handleFilterChange('sizeId', value)}
                        // options={sizes.map(item => ({
                        //     value: item.id,
                        //     label: item.sizeName,
                        // }))}
                        />
                    </Col>

                </Row>

                <Row style={{ marginTop: '20px' }}>

                    <Col span={16} style={{ padding: '0 50px' }}>
                        <Input
                            style={{
                                width: '100%',
                                height: '35px',
                                borderRadius: '5px',
                            }}
                            placeholder="Nhập mã, tên sản phẩm..."
                        // value={searchKeyword}
                        // onChange={(e) => setSearchKeyword(e.target.value)}

                        />
                    </Col>
                    <Col span={8} style={{ padding: '0 50px' }}>
                        <Button type="primary"
                            icon={<PlusOutlined />}
                            // onClick={() => showModal("add")}
                            style={{ marginLeft: '6px', float: 'right', borderRadius: '4px' }} >
                            Thêm mới
                        </Button>
                        <Button
                            type="primary"
                            style={{
                                float: 'left',
                                borderRadius: '4px',
                                backgroundColor: '#5a76f3',
                                marginRight: '6px',
                            }}

                        // onClick={handleSearch}
                        >
                            Tìm kiếm
                        </Button>
                        <Button
                            type="primary"
                            icon={<RedoOutlined style={{ fontSize: '18px' }} />}
                            style={{
                                float: 'left',
                                borderRadius: '4px',
                                backgroundColor: '#5a76f3',
                            }}
                            onClick={handleReset}
                        />

                    </Col>

                </Row>

            </Card>
            <Card
                title={<span style={{ color: '#5a76f3' }}><FileDoneOutlined /> Danh sách sản phẩm</span>}
                style={{ marginTop: '20px', borderRadius: '10px' }}
            >


                <Table
                    dataSource={products?.map((product) => ({
                        ...product,
                        key: product.id,
                        createdAt: FormatDate(product.createdAt)
                    }))}

                    loading={loading}
                    columns={columns}
                    onChange={handleTableChange}
                    pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        defaultPageSize: 5,
                        pageSizeOptions: ['5', '10', '15'],
                        total: pagination.total,
                        showSizeChanger: true,
                    }}></Table >
            </Card>
            {/* {open.isModal && <ProductModal
                isMode={open.isMode}
                reacord={open.reacord}
                hideModal={hideModal}
                isModal={open.isModal}
                fetchProducts={fetchProducts} />} */}

            {/* {productDetalModal.isModal && <ShowProductDetailModal
                reacord={productDetalModal.reacord}
                hideModal={hideProductDetalModal}
                isModal={productDetalModal.isModal}
            />} */}
        </>
    )
};
export default Product;


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