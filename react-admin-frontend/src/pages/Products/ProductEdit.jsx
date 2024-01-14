import React, { useState, useEffect } from 'react';
import { Table, Space, Card, Button, Input, Form, Modal, notification, Select, Row, Col, Checkbox, InputNumber, Upload, message, Radio, Image, Spin, Switch, Tag } from 'antd';
import {
    DeleteOutlined,
    DoubleLeftOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    FormOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import './Product.css'
import ProductService from '~/service/ProductService';
import CategoryService from '~/service/CategoryService';
import BrandService from '~/service/BrandService';
import MaterialService from '~/service/MaterialService';
import ColorService from '~/service/ColorService';
import SizeService from '~/service/SizeService';
import { v4 } from 'uuid';
import ImageService from '~/service/ImageService';
import path_name from '~/constants/routers';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { imageDB } from '~/config/ConfigFirebase';
import 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { deleteObject, getStorage, getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import ProductDetailService from '~/service/ProductDetaiService';
import SupplierService from '~/service/SupplierService';
import formatCurrency from '~/utils/format-currency';
const { TextArea } = Input;
function ProductEdit() {

    //--------------------------------Mở modal ảnh-------------------------------------

    const [openImage, setOpenImage] = useState(false);

    const showModalImage = () => {
        setOpenImage(true);
    };

    const handleCancelImage = () => {
        setOpenImage(false);
    };

    //-------------------------------Mở modal thương hiệu---------------------------------------
    const [openBrand, setOpenBrand] = useState(false);

    const showModalBrand = () => {
        setOpenBrand(true);
    };

    const handleCancelBrand = () => {
        setOpenBrand(false);
    };
    //-------------------------------Mở modal nhà cng cấp---------------------------------------
    const [openSupplier, setOpenSupplier] = useState(false);

    const showModalSupplier = () => {
        setOpenSupplier(true);
    };

    const handleCancelSupplier = () => {
        setOpenSupplier(false);
    };
    //-------------------------------Mở modal danh mục---------------------------------------
    const [openCategory, setOpenCategory] = useState(false);

    const showModalCategory = () => {
        setOpenCategory(true);
    };

    const handleCancelCategory = () => {
        setOpenCategory(false);
    };

    // const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     fetchProduct()
    // }, []);
    // const fetchProduct = async () => {

    //     await ProductService.findAllByDeletedTrue()
    //         .then(response => {

    //             setProducts(response.data)
    //             console.log(response.data)
    //         }).catch(error => {
    //             console.error(error);
    //         })
    // }


    //---------------------------------------------------------------------------------------
    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);

    const [modal, contextHolder] = Modal.useModal();
    const confirm = () => {
        modal.confirm({
            title: 'Thông báo!',
            icon: <ExclamationCircleOutlined />,
            content: 'Bạn có chắc muốn tạo mới một sản phẩm không?',
            onOk: () => {
                setLoading(true);
                setTimeout(() => {
                    handleCreate();
                }, 2000);
            },
            okText: 'Đồng ý',
            cancelText: 'Hủy bỏ',
        });
    }

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

        await SupplierService.findAllByDeletedTrue()
            .then(response => {

                setSuppliers(response.data)
            }).catch(error => {
                console.error(error);
            })
    }

    const [fileList, setFileList] = useState([]);

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    // const handleCancel = () => setPreviewOpen(false);
    const navigate = useNavigate();
    const handleCreate = async () => {
        // setLoading(true);

        // try {
        //     await form.validateFields();

        //     // Tạo mảng promises chứa tất cả các tác vụ upload ảnh
        //     const uploadPromises = fileList.map(async (file) => {
        //         const imgRef = ref(imageDB, `files/${uuidv4()}`);
        //         await uploadBytes(imgRef, file.originFileObj);
        //         const url = await getDownloadURL(imgRef);

        //         // Thêm thông tin file vào Firebase Database hoặc làm các xử lý khác nếu cần
        //         return {
        //             imageName: file.name,
        //             imageLink: url,
        //             imageType: file.type,
        //         };
        //     });

        //     // Sử dụng Promise.all để đợi tất cả các tác vụ upload ảnh hoàn tất
        //     const uploadedFiles = await Promise.all(uploadPromises);

        //     // Tạo sản phẩm và lấy productId từ kết quả
        //     try {
        //         const data = await form.getFieldsValue();
        //         data.deleted = true;
        //         const productId = await ProductService.create(data);

        //         // Thêm productId vào mỗi fileInfo
        //         uploadedFiles.forEach(fileInfo => fileInfo.productId = productId.id);

        //         // Gọi API để lưu thông tin ảnh vào backend
        //         await ImageService.create(uploadedFiles);

        //         // const formValues = formThuocTinh.getFieldsValue()
        //         const productDetail = productDetailData.map(item => ({
        //             ...item,
        //             productId: productId.id,
        //         }));
        //         console.log(productDetail);
        //         // Gọi API để lưu thông tin ảnh vào backend
        //         await ProductDetailService.create(productDetail);

        //         setFileList([]);
        //         setLoading(false);
        //         notification.success({
        //             message: 'Thông báo',
        //             description: 'Thêm mới sản phẩm thành công!',
        //         });
        //         navigate(path_name.product);
        //     } catch (error) {
        //         setLoading(false);
        //         notification.error({
        //             message: 'Thông báo',
        //             description: 'Lỗi thêm mới sản phẩm!',
        //         });
        //     }
        // } catch (error) {
        //     setLoading(false);
        //     notification.error({
        //         message: 'Thông báo',
        //         description: 'Lỗi thêm mới sản phẩm!',
        //     });
        // }
    };

    let { id } = useParams();

    const [open, setOpen] = useState({ isModal: false, isMode: '', reacord: null });

    const showModal = (mode, record) => {
        setOpen({
            isModal: true,
            isMode: mode,
            reacord: record,
        });
    };

    const hideModal = () => {
        setOpen({ isModal: false });
    };
    //Load sản phẩm
    const [productDetails, setProductDetails] = useState([]);

    const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });



    const fetchProductDetails = async () => {
        setLoading(true);
        await ProductDetailService.getAllByProductId(id, pagination.current - 1, pagination.pageSize)
            .then(response => {

                setProductDetails(response.data);
                setPagination({
                    ...pagination,
                    total: response.totalCount,
                });
                setLoading(false);

            }).catch(error => {
                console.error(error);
            })
    };
    const handleTableChange = (pagination) => {
        setPagination({
            ...pagination,
        });
    }
    useEffect(() => {
        fetchProductDetails();
    }, [pagination.current, pagination.pageSize]);

    const handleDelete = async (id) => {

        await ProductDetailService.delete(id).then(() => {

            fetchProductDetails();
        }).catch(error => {
            console.error(error);
            notification.error({
                message: 'Thông báo',
                description: 'Đã có lỗi xảy ra!',
            });
        });
    };
    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            width: '5%',
            render: (text, record, index) => (
                <span>{index + 1}</span>
            ),
        },
        {
            title: 'Ảnh',
            dataIndex: 'productAvatar',
            key: 'productAvatar',
            width: '5%',
            render: (text) => (
                <Image width={60} height={60} src={text} alt="Avatar" />
            ),
        },
        {
            title: 'Sản phẩm',
            width: '40%',
            render: (record) => (
                <>
                    <span>{`${record.productName}`}</span>
                    <p style={{ marginBottom: '0' }}>[{record.colorName} - {record.sizeName} - {record.materialName}]</p>
                </>
            )
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            width: '15%'
        },

        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            width: '15%',
            render: (text) => (
                <span >
                    {formatCurrency(text)}
                </span>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: '10%',
            render: (text) => (
                text ? <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="#108ee9">Đang bán</Tag>
                    : <Tag style={{ borderRadius: '4px', fontWeight: '450', padding: '0 4px ' }} color="#f50">Ngừng bán</Tag>
            )
        },
        {
            title: 'Hành động',
            key: 'action',
            width: "10%",
            render: (record) => {
                return <Space size="middle">
                    <Button type="text"
                        icon={<FormOutlined style={{ color: 'rgb(214, 103, 12)' }} />}
                        onClick={() => showModal('edit', record)}
                    />
                    <Switch
                        size="small"
                        defaultChecked={record.status}
                        onClick={() => handleDelete(record.id)}
                    />

                </Space>
            },
        },
    ];
    return (
        <>
            {contextHolder}
            <Spin spinning={loading} tip="Đang xử lý...">
                <Row>
                    <Col span={4}>
                        <Link to={path_name.product}><DoubleLeftOutlined />Trở lại</Link>
                    </Col>
                    <Col span={9}>
                        <h3 style={{ color: '#5a76f3', fontWeight: '600', float: 'right' }}>Cập nhật sản phẩm</h3>
                    </Col>
                    <Col span={11}>
                        <Button type='primary' style={{ float: 'right', borderRadius: '5px' }} onClick={confirm}>
                            <EditOutlined />Cập nhật
                        </Button>
                    </Col>
                </Row>
                <Card title={<span style={{ color: '#5a76f3' }}>Thông tin chung</span>}
                    style={{ borderRadius: '10px', marginTop: '10px' }} >
                    <Form
                        name="validateOnly" layout="vertical" autoComplete="off"
                        style={{ marginTop: '25px' }}
                        form={form}
                    >
                        <Row>
                            <Col span={12} style={{ paddingRight: '20px' }}>
                                <Form.Item
                                    label="Tên sản phẩm:"
                                    name="productName"
                                    rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
                                >
                                    <Input
                                        placeholder="Nhập tên sản phẩm..."
                                        style={{ height: '35px', borderRadius: '5px' }}
                                    // onChange={(e) => handleProductNameChange(e.target.value)}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={12} style={{ paddingLeft: '20px' }}>

                                <Row>
                                    <Col span={22}>
                                        <Form.Item label="Danh mục:" name="categoryName" rules={[{ required: true, message: 'Vui lòng chọn danh mục !' }]}>
                                            <Select
                                                showSearch
                                                style={{
                                                    width: '100%',
                                                    height: '35px'
                                                }}
                                                placeholder="Chọn loại sản phẩm"
                                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                options={categories.map(option => ({ value: option.categoryName, label: option.categoryName }))}
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col span={2}>
                                        <Button type="primary"
                                            icon={<PlusOutlined />}
                                            onClick={showModalCategory}
                                            style={{ marginTop: '31px', width: '35px', height: '35px', float: 'right', borderRadius: '2px' }}
                                        >
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12} style={{ paddingRight: '20px' }}>
                                <Row>
                                    <Col span={22}>
                                        <Form.Item label="Thương hiệu:" name="brandName" rules={[{ required: true, message: 'Vui lòng chọn thương hiệu !' }]}>
                                            <Select
                                                showSearch
                                                style={{
                                                    width: '100%',
                                                    height: '35px'
                                                }}
                                                placeholder="Chọn thương hiệu"
                                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                options={brands.map(option => ({ value: option.brandName, label: option.brandName }))}
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col span={2}>
                                        <Button type="primary"
                                            icon={<PlusOutlined />}
                                            onClick={showModalBrand}
                                            style={{ marginTop: '31px', width: '35px', height: '35px', float: 'right', borderRadius: '2px' }}
                                        >
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={12} style={{ paddingLeft: '20px' }}>
                                <Row>
                                    <Col span={22}>
                                        <Form.Item label="Nhà cung cấp:" name="supplierName" rules={[{ required: true, message: 'Vui lòng chọn nhà cung cấp !' }]}>
                                            <Select
                                                showSearch
                                                style={{
                                                    width: '100%',
                                                    height: '35px'
                                                }}
                                                placeholder="Chọn nhà cung cấp"
                                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                options={suppliers.map(option => ({ value: option.supplierName, label: option.supplierName }))}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={2}>
                                        <Button type="primary"
                                            icon={<PlusOutlined />}
                                            onClick={showModalSupplier}
                                            style={{ marginTop: '31px', width: '35px', height: '35px', float: 'right', borderRadius: '2px' }}
                                        >
                                        </Button>
                                    </Col>

                                </Row>


                            </Col>
                        </Row>
                        <Form.Item label="Mô tả:" name="productDescribe" >
                            <TextArea rows={4} placeholder="Nhập mô tả..." style={{ borderRadius: '10px' }} />
                        </Form.Item>
                    </Form >
                </Card>

                <Card title={<span style={{ color: '#5a76f3' }}>Ảnh sản phẩm</span>}
                    style={{ marginTop: '10px', borderRadius: '10px' }} >

                    <Upload
                        customRequest={async ({ file, onSuccess, onError }) => {
                            try {
                                const isImage = file.type.startsWith('files/');
                                if (!isImage) {
                                    throw new Error('Only images are allowed.');
                                }

                                const reader = new FileReader();
                                reader.onload = (e) => {
                                    onSuccess();
                                };
                                reader.readAsDataURL(file);
                            } catch (error) {
                                console.error('Error processing file:', error);
                                onError(error);
                            }
                        }}
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleChange}
                        maxCount={5}
                        multiple
                    >
                        {fileList?.length >= 5 ? null : (
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        )}
                    </Upload>

                </Card>
                <Card title={<span style={{ color: '#5a76f3' }}>Danh sách sản phẩm chi tiết</span>}
                    style={{ borderRadius: '10px', marginTop: '10px' }} >
                    <Button type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => showModal("add")}
                        style={{ marginBottom: '5px', float: 'right', borderRadius: '2px' }} >
                        Thêm mới
                    </Button>
                    <Table
                        onChange={handleTableChange}
                        loading={loading}
                        dataSource={productDetails} columns={columns} pagination={{
                            current: pagination.current,
                            pageSize: pagination.pageSize,
                            defaultPageSize: 5,
                            pageSizeOptions: ['5'],
                            total: pagination.total,
                            showSizeChanger: true,
                        }} />
                </Card>
            </Spin>
            {open.isModal && <ProductDetailModal
                isMode={open.isMode}
                reacord={open.reacord}
                hideModal={hideModal}
                isModal={open.isModal}
                fetchProductDetails={fetchProductDetails}
                productId={id}
            />}

            {
                openBrand && <BrandModal
                    isModal={openBrand}
                    hideModal={handleCancelBrand}
                    fetchBrands={fetchBrand}
                />
            }
            {
                openCategory && <CategoryModal
                    isModal={openCategory}
                    hideModal={handleCancelCategory}
                    fetchCategorys={fetchCategory}
                />
            }
            {
                openSupplier && < SupplierModal
                    isModal={openSupplier}
                    hideModal={handleCancelSupplier}
                    fetchSuppliers={fetchSupplier}
                />
            }

        </>

    )
}

export default ProductEdit;

const ProductDetailModal = ({ isMode, reacord, hideModal, isModal, fetchProductDetails, productId }) => {

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

    const [form] = Form.useForm();
    const handleCreate = () => {
        form.validateFields().then(async () => {

            const data = form.getFieldsValue();
            data.productId = parseInt(productId);

            await ProductDetailService.createProductDetail(data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Thêm mới thành công!',
                    });
                    fetchProductDetails();
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

    const handleUpdate = () => {
        form.validateFields().then(async () => {

            const data = form.getFieldsValue();
            data.productId = parseInt(productId);
            await ProductDetailService.update(data, reacord.id)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Cập nhật thành công!',
                    });
                    fetchProductDetails();
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
            width={600}
            title={isMode === "edit" ? "Cập nhật chi tiết sản phẩm" : "Thêm mới chi tiết sản phẩm"}
            open={isModal}
            onOk={isMode === "edit" ? handleUpdate : handleCreate}
            onCancel={hideModal}
            okText={isMode === "edit" ? "Cập nhật" : "Thêm mới"}
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
                <Row>
                    <Col span={22}>
                        <Form.Item label="Kích thước" name="sizeId" rules={[{ required: true, message: 'Vui lòng chọn kích thước !' }]}>
                            <Select
                                allowClear
                                showSearch
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Chọn kích thước"
                                options={sizes.map(option => ({ value: option.id, label: option.sizeName }))} />
                        </Form.Item>
                    </Col>
                    <Col span={2}>
                        <Button type="primary"
                            icon={<PlusOutlined />}
                            onClick={showModalSize}
                            style={{ marginTop: '31px', float: 'right', borderRadius: '2px' }}
                        >
                        </Button>
                    </Col>

                </Row>
                <Row>
                    <Col span={22}>
                        <Form.Item label="Màu sắc" name="colorId" rules={[{ required: true, message: 'Vui lòng chọn màu sắc !' }]}>
                            <Select
                                showSearch
                                allowClear
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Chọn màu sắc"
                                options={colors.map(option => ({ value: option.id, label: option.colorName }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={2}>
                        <Button type="primary"
                            icon={<PlusOutlined />}
                            onClick={showModalColor}
                            style={{ marginTop: '31px', float: 'right', borderRadius: '2px' }}
                        >
                        </Button>
                    </Col>

                </Row>

                <Row>
                    <Col span={22}>
                        <Form.Item label="Chất liệu:" name="materialId" rules={[{ required: true, message: 'Vui lòng chọn chất liệu !' }]} >
                            <Select
                                showSearch
                                style={{
                                    width: '100%',
                                }}
                                allowClear
                                placeholder="Chọn chất liệu"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}

                                options={materials.map(option => ({ value: option.id, label: option.materialName }))}
                            />

                        </Form.Item>
                    </Col>
                    <Col span={2}>
                        <Button type="primary"
                            icon={<PlusOutlined />}
                            onClick={showModalMaterial}
                            style={{ marginTop: '30px', float: 'right', borderRadius: '2px' }}
                        >
                        </Button>
                    </Col>

                </Row>

                <Form.Item label="Số lượng:" name="quantity">
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label="Giá bán:" name="price" >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
            </Form>
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
        </Modal>
    );
};

const MaterialModal = ({ hideModal, isModal, fetchMaterials }) => {

    const [form] = Form.useForm();

    const handleCreate = () => {
        form.validateFields().then(async () => {

            const data = form.getFieldsValue();
            data.deleted = true;
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
                name="validateOnly" layout="vertical" autoComplete="off"
                form={form}
            >
                <Form.Item label="Tên" name="materialName" rules={[{ required: true, message: 'Vui lòng nhập tên chất liệu!' }]}>
                    <Input placeholder="Nhập tên chất liệu..." />
                </Form.Item>

                <Form.Item label="Ghi chú" name="materialDescribe">
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
                name="validateOnly" layout="vertical" autoComplete="off"
                form={form}
            >
                <Form.Item label="Tên:" name="colorName" rules={[{ required: true, message: 'Vui lòng nhập tên màu sắc!' }]}>
                    <Input placeholder="Nhập tên màu sắc..." />
                </Form.Item>

                <Form.Item label="Ghi chú:" name="colorDescribe">
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
            data.deleted = true
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
                name="validateOnly" layout="vertical" autoComplete="off"
                form={form}
            >
                <Form.Item label="Tên:" name="sizeName" rules={[{ required: true, message: 'Vui lòng nhập tên kích thước!' }]}>
                    <Input placeholder="Nhập tên kích thước..." />
                </Form.Item>

                <Form.Item label="Ghi chú:" name="sizeDescribe" >
                    <TextArea rows={4} placeholder="Nhập ghi chú..." />
                </Form.Item>

            </Form>
        </Modal>
    );
};

const BrandModal = ({ hideModal, isModal, fetchBrands }) => {

    const [form] = Form.useForm();

    const handleCreate = () => {
        form.validateFields().then(async () => {

            const data = form.getFieldsValue();
            data.deleted = true;
            await BrandService.create(data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Thêm mới thành công!',
                    });
                    fetchBrands();
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
            title="Thêm mới một thương hiệu"
            open={isModal}
            onOk={handleCreate}
            onCancel={hideModal}
            okText="Thêm mới"
            cancelText="Hủy bỏ"
        >
            <Form
                name="validateOnly" layout="vertical" autoComplete="off"
                form={form}

            >
                <Form.Item label="Tên:" name="brandName" rules={[{ required: true, message: 'Vui lòng nhập tên thương hiệu!' }]}>
                    <Input placeholder="Nhập tên thương hiệu..." />
                </Form.Item>

                <Form.Item label="Ghi chú:" name="brandDescribe">
                    <TextArea rows={4} placeholder="Nhập ghi chú..." />
                </Form.Item>

            </Form>
        </Modal>
    );
};

const CategoryModal = ({ hideModal, isModal, fetchCategorys }) => {

    const [form] = Form.useForm();

    const handleCreate = () => {
        form.validateFields().then(async () => {

            const data = form.getFieldsValue();
            data.deleted = true;
            await CategoryService.create(data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Thêm mới thành công!',
                    });
                    fetchCategorys();
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
            title="Thêm mới một danh mục"
            open={isModal}
            onOk={handleCreate}
            onCancel={hideModal}
            okText="Thêm mới"
            cancelText="Hủy bỏ"
        >
            <Form
                name="validateOnly" layout="vertical" autoComplete="off"
                form={form}

            >
                <Form.Item label="Tên:" name="categoryName" rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}>
                    <Input placeholder="Nhập tên loại sản phẩm..." />
                </Form.Item>

                <Form.Item label="Ghi chú:" name="categoryDescribe" >
                    <TextArea rows={4} placeholder="Nhập ghi chú..." rules={[{ required: true, message: 'Vui lòng nhập ghi chú!' }]} />
                </Form.Item>

            </Form>
        </Modal>
    );
};

const SupplierModal = ({ hideModal, isModal, fetchSuppliers }) => {

    const [form] = Form.useForm();

    const handleCreate = () => {
        form.validateFields().then(async () => {

            const data = form.getFieldsValue();
            data.deleted = true;
            await SupplierService.create(data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Thêm mới thành công!',
                    });
                    fetchSuppliers();
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
            title="Thêm mới một nhà cung cấp"
            open={isModal}
            onOk={handleCreate}
            onCancel={hideModal}
            okText="Thêm mới"
            cancelText="Hủy bỏ"
        >
            <Form
                name="validateOnly" layout="vertical" autoComplete="off"
                form={form}

            >
                <Form.Item label="Tên:" name="supplierName" rules={[{ required: true, message: 'Vui lòng nhập tên nhà cung cấp!' }]}>
                    <Input placeholder="Nhập tên..." />
                </Form.Item>

                <Form.Item label="Ghi chú:" name="supplierDescribe">
                    <TextArea rows={4} placeholder="Nhập ghi chú..." />
                </Form.Item>

            </Form>
        </Modal>
    );
};