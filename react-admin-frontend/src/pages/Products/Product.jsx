import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Input, Form, Modal, notification, Radio, Popconfirm, Tag, Select, Row, Col, Checkbox, Card, Switch, Image } from 'antd';
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
import ColorService from '~/service/ColorService';
import SizeService from '~/service/SizeService';
import path_name from '~/constants/routers';
import { Link, useNavigate } from 'react-router-dom';
import ShowProductDetailModal from './ProductDetail';

const { TextArea } = Input;

function Product() {
    const navigate = useNavigate();
    //---------------------------Danh mục-----------------------------------------
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategory()
    }, []);

    const fetchCategory = async () => {

        await CategoryService.findAllByDeletedTrue()
            .then(response => {

                setCategories(response.data)
            }).catch(error => {
                console.error(error);
            })
    }
    //-----------------------Thương hiệu-------------------------------
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        fetchBrand()
    }, []);
    const fetchBrand = async () => {

        await BrandService.findAllByDeletedTrue()
            .then(response => {

                setBrands(response.data)

            }).catch(error => {
                console.error(error);
            })
    }

    //---------------------------Kích thước-------------------------------------
    const [sizes, setSizes] = useState([]);

    useEffect(() => {
        fetchSize()
    }, []);

    const fetchSize = async () => {

        await SizeService.findAllByDeletedTrue()
            .then(response => {
                setSizes(response.data)
            }).catch(error => {
                console.error(error);
            })
    }
    //--------------------------------Màu sắc--------------------------------
    const [colors, setColors] = useState([]);

    useEffect(() => {
        fetchColor()
    }, []);
    const fetchColor = async () => {

        await ColorService.findAllByDeletedTrue()
            .then(response => {

                setColors(response.data)
            }).catch(error => {
                console.error(error);
            })
    }
    //-------------------------Chất liệu----------------------------------
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        fetchMaterial()
    }, []);
    const fetchMaterial = async () => {

        await MaterialService.findAllByDeletedTrue()
            .then(response => {

                setMaterials(response.data)

            }).catch(error => {
                console.error(error);
            })
    }


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

    const [open, setOpen] = useState({ isModal: false, reacord: null });

    const showProductModal = (record) => {
        setOpen({
            isModal: true,
            reacord: record,
        });
    };

    const hideProductModal = () => {
        setOpen({ isModal: false });
    };



    const [products, setProduct] = useState([]);

    const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });

    const [filters, setFilters] = useState({
        colorId: null,
        sizeId: null,
        materialId: null,
        brandId: null,
        priceMin: null,
        priceMax: null,
        categoryId: null,
        keyword: null,
        pageNo: 0,
        pageSize: 5
    });

    const fetchProducts = async () => {
        setLoading(true)
        await ProductService.getAllProducts(filters)
            .then(response => {

                setProduct(response.data);
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
    }, [filters]);

    const handleTableChange = (pagination) => {
        setPagination({
            ...pagination,
        });
        setFilters({
            ...filters,
            pageNo: pagination.current - 1,
            pageSize: pagination.pageSize,
        });
    };

    const handleDelete = async (id) => {

        await ProductService.delete(id).then(() => {

            fetchProducts();
        }).catch(error => {
            console.error(error);
            notification.error({
                message: 'Thông báo',
                description: 'Đã có lỗi xảy ra!',
            });
        });

    };

    const handleFilterChange = (property, value) => {
        if (property === 'priceRange') {
            setPriceRange(value);
            setFilters({
                ...filters,
                priceMin: calculateMinPrice(value),
                priceMax: calculateMaxPrice(value),
                pageNo: 0
            });
        } else {
            setFilters({
                ...filters,
                [property]: value,
                pageNo: 0,
            });
        }
    };

    const [searchKeyword, setSearchKeyword] = useState(null);
    const handleSearch = () => {
        setFilters({
            ...filters,
            keyword: searchKeyword,
            pageNo: 0,
            pageSize: 5
        });
    };
    //lọc theo khoảng giá
    const [priceRange, setPriceRange] = useState(null);

    const calculateMinPrice = (range) => {
        switch (range) {
            case 1:
                return 0;
            case 2:
                return 200000;
            case 3:
                return 400000;
            case 4:
                return 600000;
            default:
                return null;
        }
    };

    const calculateMaxPrice = (range) => {
        switch (range) {
            case 1:
                return 200000;
            case 2:
                return 400000;
            case 3:
                return 600000;
            case 4:
                return null;
            default:
                return null;
        }
    };
    const handleReset = () => {
        setSearchKeyword(null)
        setPriceRange(null)
        setFilters({
            colorId: null,
            sizeId: null,
            materialId: null,
            brandId: null,
            priceMin: null,
            priceMax: null,
            categoryId: null,
            keyword: null,
            pageNo: 0,
            pageSize: 5
        });
        setPagination({
            ...pagination,
            current: 1,
            pageSize: 5,
        });
    };
    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            width: '5%',
        },
        {
            title: 'Ảnh',
            dataIndex: 'productImage',
            key: 'productImage',
            width: '5%',
            render: (text) => (
                <Image width={50} src={text} />
            )

        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'productName',
            key: 'productName',
            width: '30%',
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
            title: 'Số lượng',
            dataIndex: 'quantityTotal',
            key: 'quantityTotal',
            width: '10%',
            sorter: (a, b) => a.quantityTotal - b.quantityTotal,

        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
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
            title: 'Thao tác',
            key: 'action',
            width: '10%',
            render: (record) => {

                return <Space size="middle">
                    <Link to={path_name.edit_product + `/${record.id}`}>
                        <Button type="link"
                            icon={<FormOutlined style={{ color: 'rgb(214, 103, 12)' }} />}
                        />
                    </Link>
                    <Switch
                        size="small"
                        defaultChecked={record.deleted}
                        onClick={() => handleDelete(record.id)}
                    />
                    {/* <Button type="text"
                        icon={<EyeOutlined />}
                        style={{ color: '#5a76f3', fontSize: '16px' }}
                        onClick={() => showProductDetalModal(record)}
                    /> */}
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
                            value={priceRange}
                            onChange={(value) => handleFilterChange('priceRange', value)}
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
                            value={filters.categoryId}
                            onChange={(value) => handleFilterChange('categoryId', value)}
                            options={categories.map(item => ({
                                value: item.id,
                                label: item.categoryName,
                            }))}
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
                            value={filters.brandId}
                            onChange={(value) => handleFilterChange('brandId', value)}
                            options={brands.map(item => ({
                                value: item.id,
                                label: item.brandName,
                            }))}
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
                            value={filters.materialId}
                            onChange={(value) => handleFilterChange('materialId', value)}
                            options={materials.map(item => ({
                                value: item.id,
                                label: item.materialName,
                            }))}
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
                            value={filters.colorId}
                            onChange={(value) => handleFilterChange('colorId', value)}
                            options={colors.map(item => ({
                                value: item.id,
                                label: item.colorName,
                            }))}
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
                            value={filters.sizeId}
                            onChange={(value) => handleFilterChange('sizeId', value)}
                            options={sizes.map(item => ({
                                value: item.id,
                                label: item.sizeName,
                            }))}
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
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}

                        />
                    </Col>
                    <Col span={8} style={{ padding: '0 50px' }}>
                        <Button type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => navigate(path_name.add_product)}
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

                            onClick={handleSearch}
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
                    dataSource={products?.map((product, index) => ({
                        ...product,
                        key: index + 1,
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
            {open.isModal && <ProductModal
                reacord={open.reacord}
                hideModal={hideProductModal}
                isModal={open.isModal}
                fetchProducts={fetchProducts} />}

            {productDetalModal.isModal && <ShowProductDetailModal
                record={productDetalModal.reacord}
                hideModal={hideProductDetalModal}
                isModal={productDetalModal.isModal}
            />}
        </>
    )
};
export default Product;


const ProductModal = ({ reacord, hideModal, isModal, fetchProducts }) => {

    ////Loại sp
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategory()
    }, []);

    const fetchCategory = async () => {

        await CategoryService.findAllByDeletedTrue()
            .then(response => {

                setCategories(response.data)
            }).catch(error => {
                console.error(error);
            })
    }


    // /thương hiệu
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        fetchBrand()
    }, []);
    const fetchBrand = async () => {

        await BrandService.findAllByDeletedTrue()
            .then(response => {

                setBrands(response.data)

            }).catch(error => {
                console.error(error);
            })
    }


    // /nhà phẩn phối
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        fetchSupplier()
    }, []);
    const fetchSupplier = async () => {

        await SuppplierService.findAllByDeletedTrue()
            .then(response => {

                setSuppliers(response.data)
            }).catch(error => {
                console.error(error);
            })
    }

    const [form] = Form.useForm();
    const handleUpdate = () => {
        form.validateFields().then(async () => {

            const data = form.getFieldsValue(true);
            await ProductService.update(reacord.id, data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Cập nhật thành công!',
                    });
                    fetchProducts();
                    // Đóng modal
                    hideModal();
                })
                .catch(error => {
                    notification.error({
                        message: 'Thông báo',
                        description: 'Cập nhật thất bại!',
                    });
                    console.error(error);
                });

        }).catch(error => {
            console.error(error);
        })

    }

    return (

        <Modal
            width={700}
            title="Cập nhật sản phẩm"
            open={isModal}
            onOk={handleUpdate}
            onCancel={hideModal}
            okText="Cập nhật"
            cancelText="Hủy bỏ"
        >
            <Form
                name="validateOnly" layout="vertical" autoComplete="off"
                style={{ maxWidth: 700, marginTop: '25px' }}
                form={form}
                initialValues={{
                    ...reacord,
                }}
            >
                <Form.Item label="Tên sản phẩm:" name="productName" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}>
                    <Input placeholder="Nhập tên sản phẩm..." />
                </Form.Item>
                <Row>
                    <Col span={11}>
                        <Form.Item label="Danh mục:" name="categoryName" rules={[{ required: true, message: 'Vui lòng chọn danh mục !' }]}>
                            <Select
                                showSearch
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Chọn loại sản phẩm"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}

                                options={categories.map(option => ({ value: option.categoryName, label: option.categoryName }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={11}>
                        <Form.Item label="Nhà cung cấp:" name="supplierName" rules={[{ required: true, message: 'Vui lòng chọn nhà cung cấp !' }]}>
                            <Select
                                showSearch
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Chọn nhà cung cấp"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}

                                options={suppliers.map(option => ({ value: option.supplierName, label: option.supplierName }))}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={11}>
                        <Form.Item label="Thương hiệu:" name="brandName" rules={[{ required: true, message: 'Vui lòng chọn thương hiệu !' }]}>
                            <Select
                                showSearch
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Chọn thương hiệu"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}

                                options={brands.map(option => ({ value: option.brandName, label: option.brandName }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={11}>
                        <Form.Item label="Trạng thái:" name="deleted" initialValue={true}>
                            <Radio.Group name="radiogroup" style={{ float: 'left' }}>
                                <Radio value={true}>Đang bán</Radio>
                                <Radio value={false}>Ngừng bán</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="Mô tả:" name="productDescribe" >
                    <TextArea rows={4} placeholder="Nhập mô tả..." />
                </Form.Item>

            </Form>
        </Modal>
    );
};