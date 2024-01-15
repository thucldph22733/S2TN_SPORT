import React, { useState, useEffect } from 'react';
import { Table, Space, Card, Button, Input, Form, Modal, notification, Select, Row, Col, Checkbox, InputNumber, Upload, message, Radio, Image, Spin } from 'antd';
import {
    DeleteOutlined,
    DoubleLeftOutlined,
    ExclamationCircleOutlined,
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
import { Link, useNavigate } from 'react-router-dom';
import { imageDB } from '~/config/ConfigFirebase';
import 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { deleteObject, getStorage, getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import ProductDetailService from '~/service/ProductDetaiService';
import SupplierService from '~/service/SupplierService';
const { TextArea } = Input;
function ProductAdd() {

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
    // const [productDetailDataList, setProductDetailDataList] = useState([]);

    // Trạng thái để lưu thông tin cho mỗi bảng màu sắc
    const [colorTables, setColorTables] = useState({});

    // Trạng thái để theo dõi màu sắc đã chọn
    const [selectedColors, setSelectedColors] = useState([]);

    // Xử lý sự kiện khi chọn màu sắc
    const handleColorChange = (selectedColor) => {
        setSelectedColors(selectedColor);
    };
    // Trạng thái để theo dõi kích thước đã chọn
    const [selectedSizes, setSelectedSizes] = useState([]);

    const handleSizeChange = (selectedSize) => {
        setSelectedSizes(selectedSize);
    };
    // Trạng thái để theo dõi sản phẩm đã chọn đã chọn
    const [selectedProductName, setSelectedProductName] = useState(null);

    const handleProductNameChange = (productName) => {
        setSelectedProductName(productName);
    };

    // Trạng thái để theo dõi chất liệu đã chọn
    const [selectedMaterial, setSelectedMaterial] = useState(null)

    const handleMaterialChange = (material) => {
        setSelectedMaterial(material);
    };

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
    const [form] = Form.useForm();

    const [formThuocTinh] = Form.useForm();


    const [inputData, setInputData] = useState({});
    console.log(inputData)
    const [productDetailData, setProductDetailData] = useState([]);
    console.log(productDetailData)

    const handleDelete = (keyToDelete) => {
        // Tạo một bản sao của productDetailData để tránh thay đổi trực tiếp state
        const updatedProductDetailData = [...productDetailData];

        // Lọc ra các phần tử có key khác với keyToDelete
        const filteredData = updatedProductDetailData.filter(item => item.key !== keyToDelete);

        // Xóa mục có key tương ứng từ inputData
        const updatedInputData = { ...inputData };
        delete updatedInputData[keyToDelete];

        // Cập nhật state
        setProductDetailData(filteredData);
        setInputData(updatedInputData);
    };
    const handleInputChange = (value, key, type) => {
        setInputData((prevInputData) => ({
            ...prevInputData,
            [key]: {
                ...prevInputData[key],
                [type]: value,
            },
        }));
    };

    useEffect(() => {
        const tables = createColorTable(selectedColors, selectedSizes, selectedProductName, selectedMaterial);
        setColorTables(tables);
    }, [selectedColors, selectedSizes, selectedProductName, selectedMaterial, inputData]);

    let keyCounter = 1; // Biến đếm key

    const createColorTable = (selectedColors, selectedSizes, selectedProductName, selectedMaterial) => {
        const colorSource = [];
        const dataSource = [];

        for (const color of selectedColors) {
            const colorGroup = [];
            const dataGroup = [];

            for (const size of selectedSizes) {
                const materialsArray = Array.isArray(selectedMaterial) ? selectedMaterial : [selectedMaterial];

                for (const material of materialsArray) {
                    const key = keyCounter++;

                    const inputDataForProduct = inputData[key] ?? {};

                    const dataItem = {
                        colorName: color,
                        sizeName: size,
                        materialName: material,
                        quantity: inputDataForProduct?.quantity,
                        price: inputDataForProduct?.price,
                        productId: null,
                        key: key,
                    };

                    dataGroup.push(dataItem);

                    const colorItem = {
                        key: key,
                        productName: selectedProductName,
                        sizeName: size,
                        colorName: color,
                        materialName: material,
                    };

                    colorGroup.push(colorItem);
                }
            }

            colorSource.push(...colorGroup);
            dataSource.push(...dataGroup);
        }

        setProductDetailData(dataSource);

        const columns = [
            {
                title: 'Sản phẩm',
                width: '50%',
                render: (record) => (
                    <span>{`${record.productName} [${record.colorName} - ${record.sizeName} - ${record.materialName}]`}</span>
                ),
            },
            {
                title: 'Số lượng',
                width: '10%',
                render: (record) => (
                    <InputNumber
                        value={inputData[record.key]?.quantity}
                        style={{ width: '100%' }}
                        min={0}
                        onChange={(value) => handleInputChange(value, record.key, 'quantity')}
                    />
                ),
            },
            {
                title: 'Giá bán',
                width: '10%',
                render: (record) => (
                    <InputNumber
                        value={inputData[record.key]?.price}
                        style={{ width: '100%' }}
                        min={0}
                        onChange={(value) => handleInputChange(value, record.key, 'price')}
                    />
                ),
            },
            {
                title: 'Thao tác',
                width: '10%',
                render: (record) => (
                    <Space size="middle">
                        <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            style={{ color: 'red' }}
                            onClick={() => handleDelete(record.key)}
                        />
                    </Space>
                ),
            },
        ];

        return {
            columns,
            colorSource,
        };
    };



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
        setLoading(true);

        try {
            await form.validateFields();

            // Tạo mảng promises chứa tất cả các tác vụ upload ảnh
            const uploadPromises = fileList.map(async (file) => {
                const imgRef = ref(imageDB, `files/${uuidv4()}`);
                await uploadBytes(imgRef, file.originFileObj);
                const url = await getDownloadURL(imgRef);

                // Thêm thông tin file vào Firebase Database hoặc làm các xử lý khác nếu cần
                return {
                    imageName: file.name,
                    imageLink: url,
                    imageType: file.type,
                };
            });

            // Sử dụng Promise.all để đợi tất cả các tác vụ upload ảnh hoàn tất
            const uploadedFiles = await Promise.all(uploadPromises);

            // Tạo sản phẩm và lấy productId từ kết quả
            try {
                const data = await form.getFieldsValue();
                data.deleted = true;
                const productId = await ProductService.create(data);

                // Thêm productId vào mỗi fileInfo
                uploadedFiles.forEach(fileInfo => fileInfo.productId = productId.id);

                // Gọi API để lưu thông tin ảnh vào backend
                await ImageService.create(uploadedFiles);

                // const formValues = formThuocTinh.getFieldsValue()
                const productDetail = productDetailData.map(item => ({
                    ...item,
                    productId: productId.id,
                }));
                console.log(productDetail);
                // Gọi API để lưu thông tin ảnh vào backend
                await ProductDetailService.create(productDetail);

                setFileList([]);
                setLoading(false);
                notification.success({
                    message: 'Thông báo',
                    description: 'Thêm mới sản phẩm thành công!',
                });
                navigate(path_name.product);
            } catch (error) {
                setLoading(false);
                notification.error({
                    message: 'Thông báo',
                    description: 'Lỗi thêm mới sản phẩm!',
                });
            }
        } catch (error) {
            setLoading(false);
            notification.error({
                message: 'Thông báo',
                description: 'Lỗi thêm mới sản phẩm!',
            });
        }
    };

    return (
        <>
            {contextHolder}
            <Spin spinning={loading} tip="Đang xử lý...">
                <Row>
                    <Col span={4}>
                        <Link to={path_name.product}><DoubleLeftOutlined />Trở lại</Link>
                    </Col>
                    <Col span={9}>
                        <h3 style={{ color: '#5a76f3', fontWeight: '600', float: 'right' }}>Thêm mới sản phẩm</h3>
                    </Col>
                    <Col span={11}>
                        <Button type='primary' style={{ float: 'right', borderRadius: '5px' }} onClick={confirm}>
                            <PlusOutlined />Thêm mới
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
                                    rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' },
                                    {
                                        validator: (_, value) => {
                                            const trimmedValue = value.trim(); // Loại bỏ dấu cách ở đầu và cuối
                                            const lowercaseValue = trimmedValue.toLowerCase(); // Chuyển về chữ thường

                                            // Lấy giá trị của trường 'voucherCode' từ form
                                            const productNameFieldValue = form.getFieldValue('productName');

                                            const isDuplicate = products.some(
                                                (product) => product.productName.trim().toLowerCase() === lowercaseValue && product.id !== productNameFieldValue
                                            );

                                            if (isDuplicate) {
                                                return Promise.reject('Sản phẩm đã tồn tại!');
                                            }
                                            // Kiểm tra xem có dấu cách ở đầu và cuối không
                                            if (value && (value.trim() !== value)) {
                                                return Promise.reject('Tên sản phẩm không được có dấu cách ở đầu hoặc cuối');
                                            }
                                            return Promise.resolve();
                                        },
                                    },
                                    ]}
                                >
                                    <Input
                                        placeholder="Nhập tên sản phẩm..."
                                        style={{ height: '35px', borderRadius: '5px' }}
                                        onChange={(e) => handleProductNameChange(e.target.value)}
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
                    style={{ marginTop: '20px', borderRadius: '10px' }} >

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

                <Card title={<span style={{ color: '#5a76f3' }}>Thuộc tính</span>}
                    style={{ marginTop: '20px', borderRadius: '10px' }} >
                    <Form
                        name="validateOnly" layout="vertical" autoComplete="off"
                        style={{ marginTop: '25px' }}
                        form={formThuocTinh}
                    >
                        <Row>
                            <Col span={8}>
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
                                                onChange={handleSizeChange}
                                                options={sizes.map(option => ({ value: option.sizeName, label: option.sizeName }))} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={4}>
                                        <Button type="primary"
                                            icon={<PlusOutlined />}
                                            onClick={showModalSize}
                                            style={{ marginTop: '31px', marginLeft: '10px', borderRadius: '2px' }}
                                        >
                                        </Button>
                                    </Col>

                                </Row>

                            </Col>

                            <Col span={8} >
                                <Row>
                                    <Col span={20}>
                                        <Form.Item label="Màu sắc" name="colorName" rules={[{ required: true, message: 'Vui lòng chọn màu sắc !' }]}>
                                            <Select
                                                showSearch
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
                                    <Col span={4}>
                                        <Button type="primary"
                                            icon={<PlusOutlined />}
                                            onClick={showModalColor}
                                            style={{ marginTop: '31px', marginLeft: '10px', borderRadius: '2px' }}
                                        >
                                        </Button>
                                    </Col>


                                </Row>
                            </Col>

                            <Col span={8}>
                                <Row>
                                    <Col span={20}>
                                        <Form.Item label="Chất liệu:" name="materialName" rules={[{ required: true, message: 'Vui lòng chọn chất liệu !' }]} >
                                            <Select
                                                showSearch
                                                mode="multiple"
                                                style={{
                                                    width: '100%',
                                                }}
                                                allowClear
                                                placeholder="Chọn chất liệu"
                                                onChange={handleMaterialChange}
                                                filterOption={(input, option) => (option?.label ?? '').includes(input)}

                                                options={materials.map(option => ({ value: option.materialName, label: option.materialName }))}
                                            />

                                        </Form.Item>
                                    </Col>
                                    <Col span={4}>
                                        <Button type="primary"
                                            icon={<PlusOutlined />}
                                            onClick={showModalMaterial}
                                            style={{ marginTop: '30px', marginLeft: '10px', borderRadius: '2px' }}
                                        >
                                        </Button>
                                    </Col>

                                </Row>
                            </Col>

                        </Row>
                    </Form>
                </Card>
                {colorTables.length !== 0 &&
                    <Card title={<span style={{ color: '#5a76f3' }}>Các biến thể sản phẩm</span>}
                        style={{ marginTop: '15px', borderRadius: '10px' }}>
                        <Table
                            columns={colorTables.columns}
                            dataSource={colorTables.colorSource}
                            pagination={false}
                            style={{ height: '350px', overflowY: 'auto', }}
                        />
                    </Card>
                }
            </Spin>

            {
                openImage && <ImageModal
                    isModal={openImage}
                    hideModal={handleCancelImage}
                    fileList={fileList}
                    handleChange={handleChange}
                />
            }

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
        </>

    )
}

export default ProductAdd;

const ImageModal = ({ hideModal, isModal, fileList, handleChange }) => {

    return (

        <Modal
            width={700}
            title={"Ảnh sản phẩm"}
            open={isModal}
            // onOk={handleCreate}
            onCancel={hideModal}
            okText={"Lưu"}
            cancelText="Hủy bỏ"
        >

            <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={false}
                onChange={handleChange}
                // beforeUpload={beforeUpload}
                // onRemove={handleRemove}
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

        </Modal>
    );
};

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

        await SupplierService.findAllByDeletedTrue()
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