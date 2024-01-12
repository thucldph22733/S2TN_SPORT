import React, { useState, useEffect } from 'react';
import { Table, Space, Card, Button, Input, Form, Modal, notification, Select, Row, Col, Checkbox, InputNumber, Upload, message, Radio } from 'antd';
import {
    DeleteOutlined,
    DoubleLeftOutlined,
    PlusOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import './Product.css'
import ProductService from '~/service/ProductService';
import CategoryService from '~/service/CategoryService';
import BrandService from '~/service/BrandService';
import SuppplierService from '~/service/SupplierService';
import MaterialService from '~/service/MaterialService';
import ColorService from '~/service/ColorService';
import SizeService from '~/service/SizeService';
import axios from 'axios';
// import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
// import { firebaseApp, storage } from '../Customer/config';
import { v4 } from 'uuid';
import ImageService from '~/service/ImageService';
import confirm from 'antd/es/modal/confirm';
import { Modal as AntModal } from 'antd';
import path_name from '~/constants/routers';
import { Link } from 'react-router-dom';
import { imageDB } from '~/config/ConfigFirebase';

import 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { deleteObject, getStorage, getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import ProductDetailService from '~/service/ProductDetaiService';
const { useForm } = Form;
const { TextArea } = Input;
function ProductAdd() {

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
    const [productDetailDataList, setProductDetailDataList] = useState([]);
    const [productDetailData, setProductDetailData] = useState([]);
    console.log(productDetailData)
    // Trạng thái để lưu thông tin cho mỗi bảng màu sắc
    const [colorTables, setColorTables] = useState({});

    // Trạng thái để theo dõi màu sắc đã chọn
    const [selectedColors, setSelectedColors] = useState([]);
    console.log(selectedColors)
    // Xử lý sự kiện khi chọn màu sắc
    const handleColorChange = (selectedColor) => {
        setSelectedColors(selectedColor);
    };
    // Trạng thái để theo dõi kích thước đã chọn
    const [selectedSizes, setSelectedSizes] = useState([]);
    console.log(selectedSizes)
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


    useEffect(() => {
        const generatedColorTables = createColorTable(selectedColors, selectedSizes, selectedProductName, selectedMaterial);
        setColorTables(generatedColorTables);
    }, [selectedColors, selectedSizes, selectedProductName, selectedMaterial]);


    function findColorNameById(colorId) {
        const color = colors.find(c => c.id === colorId);
        return color ? color.colorName : null;
    }

    function findSizeNameById(sizeId) {
        const size = sizes.find(s => s.id === sizeId);
        return size ? size.sizeName : null;
    }
    function findMaterialNameById(materialId) {
        const size = materials.find(s => s.id === materialId);
        return size ? size.materialName : null;
    }
    const [form] = Form.useForm();

    const [formThuocTinh] = Form.useForm();


    const handleQuantityChange = (value, key) => {
        setProductDetailDataList(prevDataSource =>
            prevDataSource.map(item =>
                item.key === key ? { ...item, quantity: value } : item
            )
        );
    };

    const handlePriceChange = (value, key) => {
        setProductDetailDataList(prevDataSource =>
            prevDataSource.map(item =>
                item.key === key ? { ...item, price: value } : item
            )
        );
    };


    const handelDelete = (key) => {

        // Tạo một bản sao của mảng để không làm thay đổi mảng gốc
        const updatedProductDataList = [...productDetailDataList];

        // Tìm vị trí của phần tử cần xóa trong mảng
        const indexToDelete = updatedProductDataList.findIndex(item => item.key === key);

        // Nếu tìm thấy phần tử, thực hiện xóa
        if (indexToDelete !== -1) {
            updatedProductDataList.splice(indexToDelete, 1);

            // Cập nhật state với mảng đã được cập nhật
            setProductDetailDataList(updatedProductDataList);

            // Set giá trị mới cho state refreshTable để trigger render lại bảng
        } else {
            console.log("Không tìm thấy phần tử để xóa.");
        }
    };

    // const createColorTable = (selectedColors, selectedSizes, selectedProductName, selectedMaterial) => {
    //     const dataSource = [];

    //     for (const color of selectedColors) {
    //         const colorGroup = [];

    //         for (const size of selectedSizes) {
    //             const materialsArray = Array.isArray(selectedMaterial) ? selectedMaterial : [selectedMaterial];

    //             for (const material of materialsArray) {
    //                 const key = `${selectedProductName}_${color}_${size}`;

    //                 setProductDetailData((prevProductDetailData) => [
    //                     ...prevProductDetailData,
    //                     {
    //                         colorId: color,
    //                         sizeId: size,
    //                         materialId: material,
    //                         quantity: 100,
    //                         price: 100000,
    //                         productId: null,
    //                     },
    //                 ]);

    //                 colorGroup.push({
    //                     productName: selectedProductName,
    //                     size: findSizeNameById(size),
    //                     color: findColorNameById(color),
    //                     material: findMaterialNameById(material),
    //                 });
    //             }
    //         }

    //         dataSource.push(...colorGroup);
    //     }
    //     setProductDetailDataList(dataSource);


    // const columns = [
    // {
    //     title: '#',
    //     dataIndex: 'index',
    //     key: 'index',
    //     width: '5%'
    // },
    // {
    //     title: 'Sản phẩm',
    //     // dataIndex: 'key',
    //     // key: 'key',
    //     width: '25%',
    //     render: (text, record) => (<span>{`${record.productName} [${record.color} - ${record.size}]`}</span>)
    // },
    // {
    //     title: 'Chất liệu',
    //     dataIndex: 'material',
    //     key: 'material',
    //     width: '15%',
    // },
    // {
    //     title: 'Số lượng',
    //     width: '10%',
    //     render: (text, record) => (
    //         <Form.Item name={`quantity_${record.key}`} initialValue={text}>
    //             <InputNumber min={1} onChange={(value) => handleQuantityChange(value, record.key)} />
    //         </Form.Item>
    //     ),
    // },
    // {
    //     title: 'Giá bán',

    //     width: '10%',
    //     render: (text, record) => (
    //         <Form.Item name={`price_${record.key}`} initialValue={text}>
    //             <InputNumber min={1} onChange={(value) => handlePriceChange(value, record.key)} />
    //         </Form.Item>
    //     ),
    // },
    // {
    //     title: 'Thao tác',
    //     width: '8%',
    //     render: (record) => (
    //         <Space size="middle">
    //             <Button type="text" icon={<DeleteOutlined />} style={{ color: 'red' }} onClick={() => handelDelete(record.key)} />
    //         </Space>
    //     ),
    // },
    // {
    //     title: <div style={{ display: 'flex', justifyContent: 'center' }}>Thêm ảnh</div>,
    //     width: '20%',
    //     render: (_, record) => (
    //         record.index === 1 && (
    //             <Space size="middle" style={{ display: 'flex', justifyContent: 'center' }}>
    //                 {/* Thẻ Upload để chọn ảnh */}
    //                 <Upload
    //                     customRequest={async ({ file, onSuccess, onError }) => {
    //                         try {
    //                             // Xử lý tạm thời ở đây
    //                             const isImage = file.type.startsWith('image/');
    //                             if (!isImage) {
    //                                 throw new Error('Only images are allowed.');
    //                             }

    //                             const reader = new FileReader();
    //                             reader.onload = (e) => {
    //                                 // Tạm thời lưu file vào state, để sau này có thể xác nhận upload
    //                                 onSuccess();
    //                             };
    //                             reader.readAsDataURL(file);
    //                         } catch (error) {
    //                             console.error('Error processing file:', error);
    //                             onError(error);
    //                         }
    //                     }}// Đặt URL bạn muốn gửi ảnh lên
    //                     listType="picture-card"
    //                     multiple={true}  // Cho phép chọn nhiều ảnh
    //                     showUploadList={true}  // Hiển thị danh sách đã tải lên
    //                     beforeUpload={(file) => {
    //                         console.log('File type:', file.type);

    //                     }}
    //                     style={{ width: '60px' }}
    //                 // onPreview={handlePreview}
    //                 // onChange={(info) => handleImageChange(info, record.key)}
    //                 >
    //                     <PlusOutlined style={{ fontSize: '20px' }} />
    //                 </Upload>
    //             </Space>
    //         )
    //     ),
    //     onCell: (record) => ({
    //         rowSpan: record.index === 1 ? selectedSizes.length : 0,
    //     }),
    // },
    //     ];

    //     return {
    //         columns,
    //         dataSource,
    //     };
    // };
    const createColorTable = (selectedColors, selectedSizes, selectedProductName, selectedMaterial) => {
        const dataSource = [];

        for (const color of selectedColors) {
            const colorGroup = [];

            for (const size of selectedSizes) {
                const key = `${selectedProductName}_${color}_${size}`;

                setProductDetailData((prevProductDetailData) => [
                    ...prevProductDetailData,
                    {
                        colorId: color,
                        sizeId: size,
                        materialId: selectedMaterial,
                        quantity: 100,
                        price: 100000,
                    },
                ]);

                colorGroup.push({
                    // key,
                    productName: selectedProductName,
                    size: findSizeNameById(size),
                    color: findColorNameById(color),
                    material: findMaterialNameById(selectedMaterial),

                });
            }

            dataSource.push(...colorGroup);
            // setDataSource(dataSource);
        }
        setProductDetailDataList(dataSource)


        const columns = [
            // {
            //     title: '#',
            //     dataIndex: 'index',
            //     key: 'index',
            //     width: '5%'
            // },
            {
                title: 'Sản phẩm',
                // dataIndex: 'key',
                // key: 'key',
                width: '25%',
                render: (text, record) => (<span>{`${record.productName} [${record.color} - ${record.size}]`}</span>)
            },
            {
                title: 'Chất liệu',
                dataIndex: 'material',
                key: 'material',
                width: '15%',
            },
            {
                title: 'Số lượng',
                width: '10%',
                render: (text, record) => (
                    <Form.Item name={`quantity_${record.key}`} initialValue={text}>
                        <InputNumber min={1} onChange={(value) => handleQuantityChange(value, record.key)} />
                    </Form.Item>
                ),
            },
            {
                title: 'Giá bán',

                width: '10%',
                render: (text, record) => (
                    <Form.Item name={`price_${record.key}`} initialValue={text}>
                        <InputNumber min={1} onChange={(value) => handlePriceChange(value, record.key)} />
                    </Form.Item>
                ),
            },
            {
                title: 'Thao tác',
                width: '8%',
                render: (record) => (
                    <Space size="middle">
                        <Button type="text" icon={<DeleteOutlined />} style={{ color: 'red' }} onClick={() => handelDelete(record.key)} />
                    </Space>
                ),
            },
            // {
            //     title: <div style={{ display: 'flex', justifyContent: 'center' }}>Thêm ảnh</div>,
            //     width: '20%',
            //     render: (_, record) => (
            //         record.index === 1 && (
            //             <Space size="middle" style={{ display: 'flex', justifyContent: 'center' }}>
            //                 {/* Thẻ Upload để chọn ảnh */}
            //                 <Upload
            //                     customRequest={async ({ file, onSuccess, onError }) => {
            //                         try {
            //                             // Xử lý tạm thời ở đây
            //                             const isImage = file.type.startsWith('image/');
            //                             if (!isImage) {
            //                                 throw new Error('Only images are allowed.');
            //                             }

            //                             const reader = new FileReader();
            //                             reader.onload = (e) => {
            //                                 // Tạm thời lưu file vào state, để sau này có thể xác nhận upload
            //                                 onSuccess();
            //                             };
            //                             reader.readAsDataURL(file);
            //                         } catch (error) {
            //                             console.error('Error processing file:', error);
            //                             onError(error);
            //                         }
            //                     }}// Đặt URL bạn muốn gửi ảnh lên
            //                     listType="picture-card"
            //                     multiple={true}  // Cho phép chọn nhiều ảnh
            //                     showUploadList={true}  // Hiển thị danh sách đã tải lên
            //                     beforeUpload={(file) => {
            //                         console.log('File type:', file.type);

            //                     }}
            //                     style={{ width: '60px' }}
            //                 // onPreview={handlePreview}
            //                 // onChange={(info) => handleImageChange(info, record.key)}
            //                 >
            //                     <PlusOutlined style={{ fontSize: '20px' }} />
            //                 </Upload>
            //             </Space>
            //         )
            //     ),
            //     onCell: (record) => ({
            //         rowSpan: record.index === 1 ? selectedSizes.length : 0,
            //     }),
            // },
        ];

        return {
            columns,
            dataSource,
        };
    };

    ///phần xem ảnh
    const [selectedFiles, setSelectedFiles] = useState([]);

    //phần modal confirm thêm sản phẩm
    const [isModalVisible, setModalVisible] = useState(false);

    const showModal = () => {
        setModalVisible(true);
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

        await SuppplierService.findAllByDeletedTrue()
            .then(response => {

                setSuppliers(response.data)
            }).catch(error => {
                console.error(error);
            })
    }


    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    console.log(fileList)


    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    const handleCancel = () => setPreviewOpen(false);

    const handleAddToFirebase = async () => {
        try {
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
                const data = form.getFieldsValue();
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

                // Gọi API để lưu thông tin ảnh vào backend
                await ProductDetailService.create(productDetail);
                // console.
                setFileList([]);
                message.success('Files added to Firebase and backend successfully');
            } catch (error) {
                console.error('Error creating product:', error);
                message.error('Error creating product');
            }
        } catch (error) {
            console.error('Error adding files to Firebase:', error);
            message.error('Error adding files to Firebase');
        }
    };


    return (
        <>
            <Row>
                <Col span={24}>
                    <Button type='primary' style={{ float: 'right', borderRadius: '5px' }} onClick={handleAddToFirebase}>
                        <PlusOutlined />Hoàn tất
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
                                    onChange={(e) => handleProductNameChange(e.target.value)}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12} style={{ paddingLeft: '20px' }}>
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
                    </Row>
                    <Row>
                        <Col span={12} style={{ paddingRight: '20px' }}>
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
                        <Col span={12} style={{ paddingLeft: '20px' }}>
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
                    </Row>
                    <Form.Item label="Mô tả:" name="productDescribe" >
                        <TextArea rows={4} placeholder="Nhập mô tả..." style={{ borderRadius: '10px' }} />
                    </Form.Item>
                </Form >
            </Card>
            <Row>
                <Col span={12} style={{ paddingRight: '10px' }}>
                    <Card title={<span style={{ color: '#5a76f3' }}>Ảnh sản phẩm</span>}
                        style={{ marginTop: '20px', borderRadius: '10px' }} >

                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            // onPreview={handlePreview}
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

                        <Modal
                            open={previewOpen}
                            title={previewTitle}
                            footer={null}
                            onCancel={handleCancel}
                        >
                            <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </Card>

                </Col>
                <Col span={12} style={{ paddingLeft: '10px' }}>

                    <Card title={<span style={{ color: '#5a76f3' }}>Thuộc tính</span>}
                        style={{ marginTop: '20px', borderRadius: '10px' }} >
                        <Form
                            name="validateOnly" layout="vertical" autoComplete="off"
                            style={{ marginTop: '25px' }}
                            form={formThuocTinh}
                        >
                            <Row>
                                <Col span={21}>
                                    <Form.Item label="Chất liệu:" name="materialName" rules={[{ required: true, message: 'Vui lòng chọn chất liệu !' }]} >
                                        <Select
                                            showSearch
                                            style={{
                                                width: '100%',
                                            }}
                                            placeholder="Chọn chất liệu"
                                            onChange={handleMaterialChange}
                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}

                                            options={materials.map(option => ({ value: option.id, label: option.materialName }))}
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
                                <Col span={21} >
                                    <Form.Item label="Màu sắc" name="colorName" rules={[{ required: true, message: 'Vui lòng chọn màu sắc !' }]}>
                                        <Select
                                            mode="multiple"
                                            allowClear
                                            style={{
                                                width: '100%',
                                            }}
                                            placeholder="Chọn màu sắc"
                                            onChange={handleColorChange}
                                            options={colors.map(option => ({ value: option.id, label: option.colorName }))}
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
                            <Row>
                                <Col span={21}>
                                    <Form.Item label="Kích thước" name="sizeName" rules={[{ required: true, message: 'Vui lòng chọn kích thước !' }]}>
                                        <Select
                                            mode="multiple"
                                            allowClear
                                            style={{
                                                width: '100%',
                                            }}
                                            placeholder="Chọn kích thước"
                                            onChange={handleSizeChange}
                                            options={sizes.map(option => ({ value: option.id, label: option.sizeName }))} />
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
                        </Form>
                    </Card>
                </Col>
            </Row>

            {colorTables.length !== 0 &&

                <Card title={<span style={{ color: '#5a76f3' }}>Các biến thể sản phẩm</span>}
                    style={{ marginTop: '10px', borderRadius: '10px' }}>
                    <Table
                        columns={colorTables.columns}
                        dataSource={colorTables.dataSource}
                        pagination={false}
                        style={{ height: '350px', overflowY: 'auto', }}
                    />
                </Card>
            }
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
        </>

    )
}

export default ProductAdd;

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

                style={{ maxWidth: 600, marginTop: '25px' }}
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
                style={{ maxWidth: 600, marginTop: '25px' }}
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
                style={{ maxWidth: 600, marginTop: '25px' }}
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