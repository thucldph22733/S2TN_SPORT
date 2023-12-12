
import React, { useState, useEffect } from 'react';
import { Table, Space, Card, Button, Input, Form, Modal, notification, Popconfirm, Tag, Select, Row, Col, Checkbox, InputNumber } from 'antd';
import {
    DeleteOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import './Product.css'
import ProductService from '~/service/ProductService';
import CategoryService from '~/service/CategoryService';
import BrandService from '~/service/BrandService';
import SuppplierService from '~/service/SupplierService';
import MaterialService from '~/service/MaterialService';
import ColorService from '~/service/ColorService';
import SizeService from '~/service/SizeService';

const { TextArea } = Input;

function ProductDetail() {

    //--------------------------------Sản phẩm-------------------------------------
    // mở modeal thêm sửa sản phẩm:
    const [openProduct, setOpenProduct] = useState(false);

    const showModalProduct = () => {
        setOpenProduct(true);
    };

    const handleCancelProduct = () => {
        setOpenProduct(false);
    };

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProduct()
    }, []);
    const fetchProduct = async () => {

        await ProductService.findAllByDeletedTrue()
            .then(response => {

                setProducts(response.data)
                console.log(response.data)
            }).catch(error => {
                console.error(error);
            })
    }

    //-------------------------------Chất liệu---------------------------------------
    const [openMaterial, setOpenMaterial] = useState(false);

    const showModalMaterial = () => {
        setOpenMaterial(true);
    };

    const handleCancelMaterial = () => {
        setOpenMaterial(false);
    };
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
    //--------------------------------Màu sắc---------------------------------------
    const [openColor, setOpenColor] = useState(false);

    const showModalColor = () => {
        setOpenColor(true);
    };

    const handleCancelColor = () => {
        setOpenColor(false);
    };

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
    //----------------------------Kích thước------------------------------------------
    const [openSize, setOpenSize] = useState(false);

    const showModalSize = () => {
        setOpenSize(true);
    };

    const handleCancelSize = () => {
        setOpenSize(false);
    };

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
    //---------------------------------------------------------------------------------------

    // Trạng thái để theo dõi màu sắc đã chọn
    const [selectedColors, setSelectedColors] = useState([]);
    // Trạng thái để lưu thông tin cho mỗi bảng màu sắc
    const [colorTables, setColorTables] = useState({});

    // Trạng thái để theo dõi màu sắc đã chọn
    //  const [selectedSizes, setSelectedSizes] = useState([]);

    // Xử lý sự kiện khi chọn màu sắc
    const handleColorChange = (selectedColor) => {
        setSelectedColors(selectedColor);
    };

    // const handleSizeChange = (selectedSize) => {
    //     setSelectedSizes(selectedSize);
    // };

    // Xử lý hiển thị bảng cho mỗi màu sắc
    useEffect(() => {
        const tables = {};
        selectedColors.forEach((color) => {
            // Nếu bảng cho màu sắc này chưa tồn tại, tạo mới
            if (!colorTables[color]) {
                tables[color] = createColorTable(color);
            }
        });
        // Cập nhật trạng thái của các bảng màu sắc
        setColorTables((prevColorTables) => ({ ...prevColorTables, ...tables }));
    }, [selectedColors]);

    // Tạo bảng cho mỗi màu sắc
    const createColorTable = (color, size) => {
        return {
            columns: [
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
                    title: 'Chất liệu',
                    dataIndex: 'materialName',
                    key: 'materialName',
                    width: '15%',
                },
                {
                    title: 'Số lượng',
                    dataIndex: 'quantity',
                    key: 'quantity',
                    width: '15%',
                    render: (text) => (
                        <InputNumber min={1} max={10000000} defaultValue={text} />
                    )
                },
                {
                    title: 'Giá bán',
                    dataIndex: 'price',
                    key: 'price',
                    width: '15%',
                    render: (text) => (
                        <InputNumber min={1} max={1000000} defaultValue={text} />
                    )
                },
                {
                    title: 'Hành động',
                    dataIndex: 'createdBy',
                    key: 'createdBy',
                    width: '10%',
                    render: () => {
                        return <Space size="middle">
                            <Button type="text" icon={<DeleteOutlined />} style={{ color: 'red' }} />
                        </Space>
                    }
                },
                {
                    title: 'Ảnh',
                    dataIndex: 'createdBy',
                    key: 'createdBy',
                    width: '10%',
                }
            ],
            dataSource: [{
                key: '1',
                productName: 'John Brown',
                materialName: 'New York No. 1 Lake Park',
                quantity: 254,
                price: 2334,

            }],
        };
    };

    return (
        <>
            <div></div>

            <Form
                name="validateOnly" layout="vertical" autoComplete="off"
                style={{ marginTop: '25px' }}
            // form={form}
            // initialValues={{
            //     ...reacord,

            // }}
            >
                <h3 style={{ fontWeight: 'bold' }}>Thêm mới sản phẩm </h3>
                <Card >
                    <Row>
                        <Col span={10}>
                            <Form.Item label="Tên sản phẩm:" name="productName" rules={[{ required: true, message: 'Vui lòng chọn tên sản phẩm !' }]} >
                                <Select
                                    showSearch
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Chọn sản phẩm"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={products.map(option => ({ value: option.productName, label: option.productName }))}
                                />

                            </Form.Item>
                        </Col>
                        <Col span={2}>
                            <Button type="primary"
                                icon={<PlusOutlined />}
                                onClick={showModalProduct}
                                style={{ marginTop: '30px', marginLeft: '10px', borderRadius: '2px' }}
                            >
                            </Button>
                        </Col>
                    </Row>
                </Card>

                <Card title="Thuộc tính" bordered={false} style={{ marginTop: '20px' }} >
                    <Row>
                        <Col span={10}>
                            <Form.Item label="Chất liệu:" name="materialName" rules={[{ required: true, message: 'Vui lòng chọn chất liệu !' }]} >
                                <Select
                                    showSearch
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Chọn chất liệu"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={materials.map(option => ({ value: option.materialName, label: option.materialName }))}
                                />

                            </Form.Item>
                        </Col>
                        <Col span={2}>
                            <Button type="primary"
                                icon={<PlusOutlined />}
                                onClick={showModalMaterial}
                                style={{ marginTop: '30px', marginLeft: '10px', borderRadius: '2px' }}
                            >
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Row>
                                <Col span={20}>
                                    <Form.Item label="Máu sắc" name="colorName" rules={[{ required: true, message: 'Vui lòng chọn màu sắc !' }]}>
                                        <Select
                                            mode="multiple"
                                            allowClear
                                            style={{
                                                width: '100%',
                                            }}
                                            placeholder="Chọn màu sắc"
                                            onChange={handleColorChange}
                                            options={colors.map(option => ({ value: option.colorName, label: option.colorName }))}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Button type="primary"
                                        icon={<PlusOutlined />}
                                        onClick={showModalColor}
                                        style={{ marginTop: '31px', marginLeft: '10px', borderRadius: '2px' }}
                                    >
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row>
                                <Col span={20}>
                                    <Form.Item label="Kích thước" name="sizeName" rules={[{ required: true, message: 'Vui lòng chọn kích thước !' }]}>
                                        <Select
                                            mode="multiple"
                                            allowClear
                                            style={{
                                                width: '100%',
                                            }}
                                            placeholder="Chọn kích thước"
                                            // onChange={handleSizeChange}
                                            options={sizes.map(option => ({ value: option.sizeName, label: option.sizeName }))} />
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Button type="primary"
                                        icon={<PlusOutlined />}
                                        onClick={showModalSize}
                                        style={{ marginTop: '31px', marginLeft: '10px', borderRadius: '2px' }}
                                    >
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </Form >
            {
                openProduct && <ProductModal
                    isModal={openProduct}
                    hideModal={handleCancelProduct}
                    fetchProducts={fetchProduct}
                />
            }
            {
                openMaterial && <MaterialModal
                    isModal={openMaterial}
                    hideModal={handleCancelMaterial}
                    fetchMaterials={fetchMaterial}
                />
            }
            {
                openColor && <ColorModal
                    isModal={openColor}
                    hideModal={handleCancelColor}
                    fetchColors={fetchColor}
                />
            }
            {
                openSize && <SizeModal
                    isModal={openSize}
                    hideModal={handleCancelSize}
                    fetchSizes={fetchSize}
                />
            }
            {selectedColors.map((color) => {
                const colorTable = colorTables[color];
                if (colorTable) {
                    return (
                        <div key={color}>
                            <Card title={`Các sản phẩm màu ${color.toLowerCase()}`} style={{ marginTop: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)' }}>
                                <Table columns={colorTable.columns} dataSource={colorTable.dataSource} />
                            </Card>
                        </div>
                    );
                }
                return null; // Tránh lỗi khi colorTable không tồn tại
            })}
        </>

    )
}

export default ProductDetail;

const ProductModal = ({ hideModal, isModal, fetchProducts }) => {

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

    const handleCreate = () => {
        form.validateFields().then(async () => {

            const data = form.getFieldsValue();
            data.deleted = true
            data.productNew = data.productNew ? true : false
            data.productSale = data.productSale ? true : false
            data.productHot = data.productHot ? true : false

            await ProductService.create(data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Thêm mới thành công!',
                    });
                    fetchProducts();
                    // Đóng modal
                    hideModal();
                })
                .catch(error => {
                    notification.error({
                        message: 'Thông báo',
                        description: 'Thêm mới thất bại!',
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
            title={"Thêm mới một sản phẩm"}
            open={isModal}
            onOk={handleCreate}
            onCancel={hideModal}
            okText={"Thêm mới"}
            cancelText="Hủy bỏ"
        >
            <Form
                name="validateOnly" layout="vertical" autoComplete="off"
                style={{ maxWidth: 700, marginTop: '25px' }}
                form={form}

            >
                <Row>
                    <Col span={11}>
                        <Form.Item label="Tên sản phẩm:" name="productName" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}>
                            <Input placeholder="Nhập tên sản phẩm..." />
                        </Form.Item>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={11}>
                        <Form.Item label="Danh mục:" name="categoryName" rules={[{ required: true, message: 'Vui lòng chọn danh mục !' }]}>
                            <Select
                                showSearch
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Chọn loại sản phẩm"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={categories.map(option => ({ value: option.categoryName, label: option.categoryName }))}
                            />
                        </Form.Item>
                    </Col>
                </Row>


                <Row>
                    <Col span={11}>
                        <Form.Item label="Nhà cung cấp:" name="supplierName" rules={[{ required: true, message: 'Vui lòng chọn nhà cung cấp !' }]}>
                            <Select
                                showSearch
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Chọn nhà cung cấp"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={suppliers.map(option => ({ value: option.supplierName, label: option.supplierName }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={11}>
                        <Form.Item label="Thương hiệu:" name="brandName" rules={[{ required: true, message: 'Vui lòng chọn thương hiệu !' }]}>
                            <Select
                                showSearch
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Chọn thương hiệu"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={brands.map(option => ({ value: option.brandName, label: option.brandName }))}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row style={{ border: '1px solid #cdcdcd', padding: '20px 10px 0 10px', marginBottom: '7px' }}>
                    <Col span={8}>
                        <Form.Item name="productNew" valuePropName="checked">
                            <Checkbox>Sản phẩm mới</Checkbox>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item name="productHot" valuePropName="checked">
                            <Checkbox>Sản phẩm hot</Checkbox>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item name="productSale" valuePropName="checked">
                            <Checkbox>Sản phẩm bán chạy</Checkbox>
                        </Form.Item>
                    </Col>

                </Row>
                <Form.Item label="Mô tả:" name="productDescribe" rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}>
                    <TextArea rows={4} placeholder="Nhập mô tả..." />
                </Form.Item>

            </Form>
        </Modal>
    );
};

const MaterialModal = ({ hideModal, isModal, fetchMaterials }) => {

    const [form] = Form.useForm();

    const handleCreate = () => {
        form.validateFields().then(async () => {

            const data = form.getFieldsValue();
            data.deleted = true
            await MaterialService.create(data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Thêm mới thành công!',
                    });
                    fetchMaterials();
                    // Đóng modal
                    hideModal();
                })
                .catch(error => {
                    notification.error({
                        message: 'Thông báo',
                        description: 'Thêm mới thất bại!',
                    });
                    console.error(error);
                });

        }).catch(error => {
            console.error(error);
        })

    }

    return (

        <Modal
            title={"Thêm mới một chất liệu"}
            open={isModal}
            onOk={handleCreate}
            onCancel={hideModal}
            okText={"Thêm mới"}
            cancelText="Hủy bỏ"
        >
            <Form
                name="wrap"
                labelCol={{ flex: '100px' }}
                labelAlign="left"
                labelWrap
                wrapperCol={{ flex: 1 }}
                colon={false}
                style={{ maxWidth: 600, marginTop: '25px' }}
                form={form}
            >
                <Form.Item label="Tên:" name="materialName" rules={[{ required: true, message: 'Vui lòng nhập tên chất liệu!' }]}>
                    <Input placeholder="Nhập tên chất liệu..." />
                </Form.Item>

                <Form.Item label="Ghi chú" name="materialDescribe" rules={[{ required: true, message: 'Vui lòng nhập ghi chú!' }]}>
                    <TextArea rows={4} placeholder="Nhập ghi chú..." />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const ColorModal = ({ hideModal, isModal, fetchColors }) => {

    const [form] = Form.useForm();

    const handleCreate = () => {
        form.validateFields().then(async () => {

            const data = form.getFieldsValue();
            data.deleted = true
            await ColorService.create(data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Thêm mới thành công!',
                    });
                    fetchColors();
                    // Đóng modal
                    hideModal();
                })
                .catch(error => {
                    notification.error({
                        message: 'Thông báo',
                        description: 'Thêm mới thất bại!',
                    });
                    console.error(error);
                });

        }).catch(error => {
            console.error(error);
        })

    }


    return (

        <Modal
            title={"Thêm mới một màu sắc"}
            open={isModal}
            onOk={handleCreate}
            onCancel={hideModal}
            okText={"Thêm mới"}
            cancelText="Hủy bỏ"
        >
            <Form
                name="wrap"
                labelCol={{ flex: '100px' }}
                labelAlign="left"
                labelWrap
                wrapperCol={{ flex: 1 }}
                colon={false}
                style={{ maxWidth: 600, marginTop: '25px' }}
                form={form}
            >
                <Form.Item label="Tên:" name="colorName" rules={[{ required: true, message: 'Vui lòng nhập tên màu sắc!' }]}>
                    <Input placeholder="Nhập tên màu sắc..." />
                </Form.Item>

                <Form.Item label="Ghi chú:" name="colorDescribe" rules={[{ required: true, message: 'Vui lòng nhập ghi chú!' }]}>
                    <TextArea rows={4} placeholder="Nhập ghi chú..." />
                </Form.Item>

            </Form>
        </Modal>
    );
};
const SizeModal = ({ hideModal, isModal, fetchSizes }) => {

    const [form] = Form.useForm();

    const handleCreate = () => {
        form.validateFields().then(async () => {

            const data = form.getFieldsValue();
            data.deleded = true
            await SizeService.create(data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Thêm mới thành công!',
                    });
                    fetchSizes();
                    // Đóng modal
                    hideModal();
                })
                .catch(error => {
                    notification.error({
                        message: 'Thông báo',
                        description: 'Thêm mới thất bại!',
                    });
                    console.error(error);
                });

        }).catch(error => {
            console.error(error);
        })

    }


    return (

        <Modal
            title={"Thêm mới một kích thước"}
            open={isModal}
            onOk={handleCreate}
            onCancel={hideModal}
            okText={"Thêm mới"}
            cancelText="Hủy bỏ"
        >
            <Form
                name="wrap"
                labelCol={{ flex: '100px' }}
                labelAlign="left"
                labelWrap
                wrapperCol={{ flex: 1 }}
                colon={false}
                style={{ maxWidth: 600, marginTop: '25px' }}
                form={form}
            >
                <Form.Item label="Tên:" name="sizeName" rules={[{ required: true, message: 'Vui lòng nhập tên kích thước!' }]}>
                    <Input placeholder="Nhập tên kích thước..." />
                </Form.Item>

                <Form.Item label="Ghi chú:" name="sizeDescribe" rules={[{ required: true, message: 'Vui lòng nhập ghi chú!' }]}>
                    <TextArea rows={4} placeholder="Nhập ghi chú..." />
                </Form.Item>

            </Form>
        </Modal>
    );
};