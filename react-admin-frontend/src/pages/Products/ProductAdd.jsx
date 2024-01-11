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
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { firebaseApp, storage } from '../Customer/config';
import { v4 } from 'uuid';
import ImageService from '~/service/ImageService';
import confirm from 'antd/es/modal/confirm';
import { Modal as AntModal } from 'antd';
import path_name from '~/constants/routers';
import { Link } from 'react-router-dom';
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
    console.log(productDetailDataList)
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

    // const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        const generatedColorTables = createColorTable(selectedColors, selectedSizes, selectedProductName, selectedMaterial);
        setColorTables(generatedColorTables);
    }, [selectedColors, selectedSizes, selectedProductName, selectedMaterial]);


    function findColorIdByName(colorName) {
        const color = colors.find(c => c.colorName === colorName);
        return color ? color.id : null;
    }

    function findSizeIdByName(sizeName) {
        const size = sizes.find(s => s.sizeName === sizeName);
        return size ? size.id : null;
    }
    const [form] = useForm();


    // const getColorIdByName = (colorName) => {
    //     const color = colors.find(color => color.colorName === colorName);
    //     return color ? color.id : null;
    // };

    // const getSizeIdByName = (sizeName) => {
    //     const size = sizes.find(size => size.sizeName === sizeName);
    //     return size ? size.id : null;
    // };


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

    const createColorTable = (selectedColors, selectedSizes, selectedProductName, selectedMaterial) => {
        const dataSource = [];

        for (const color of selectedColors) {
            const colorGroup = [];

            for (const size of selectedSizes) {
                const key = `${selectedProductName}_${color}_${size}`;

                // Chuyển đổi name thành id cho color và size
                // const colorId = findColorIdByName(color);
                // const sizeId = findSizeIdByName(size);

                // const productDetailData = {
                //     productId: selectedProductName,
                //     colorId: colorId,
                //     sizeId: sizeId,

                // };

                // productDetailData.imageFile = null;
                // productDetailDataList.push(productDetailData);
                colorGroup.push({
                    key,
                    index: colorGroup.length + 1,
                    productName: selectedProductName,
                    color,
                    size,
                    material: selectedMaterial,
                    quantity: 100,  // Thêm quantity từ productDetailData
                    price: 100000,     // Thêm price từ productDetailData
                });
            }

            dataSource.push(...colorGroup);
            // setDataSource(dataSource);
        }
        setProductDetailDataList(dataSource)


        const columns = [
            {
                title: '#',
                dataIndex: 'index',
                key: 'index',
                width: '5%'
            },
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
                dataIndex: 'quantity',
                key: 'quantity',
                width: '10%',
                render: (text, record) => (
                    <Form.Item name={`quantity_${record.key}`} initialValue={text}>
                        <InputNumber min={1} onChange={(value) => handleQuantityChange(value, record.key)} />
                    </Form.Item>
                ),
            },
            {
                title: 'Giá bán',
                dataIndex: 'price',
                key: 'price',
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
            {
                title: <div style={{ display: 'flex', justifyContent: 'center' }}>Thêm ảnh</div>,
                width: '20%',
                render: (_, record) => (
                    record.index === 1 && (
                        <Space size="middle" style={{ display: 'flex', justifyContent: 'center' }}>
                            {/* Thẻ Upload để chọn ảnh */}
                            <Upload
                                customRequest={async ({ file, onSuccess, onError }) => {
                                    try {
                                        // Xử lý tạm thời ở đây
                                        const isImage = file.type.startsWith('image/');
                                        if (!isImage) {
                                            throw new Error('Only images are allowed.');
                                        }

                                        const reader = new FileReader();
                                        reader.onload = (e) => {
                                            // Tạm thời lưu file vào state, để sau này có thể xác nhận upload
                                            onSuccess();
                                        };
                                        reader.readAsDataURL(file);
                                    } catch (error) {
                                        console.error('Error processing file:', error);
                                        onError(error);
                                    }
                                }}// Đặt URL bạn muốn gửi ảnh lên
                                listType="picture-card"
                                multiple={true}  // Cho phép chọn nhiều ảnh
                                showUploadList={true}  // Hiển thị danh sách đã tải lên
                                beforeUpload={(file) => {
                                    console.log('File type:', file.type);

                                }}
                                style={{ width: '60px' }}
                            // onPreview={handlePreview}
                            // onChange={(info) => handleImageChange(info, record.key)}
                            >
                                <PlusOutlined style={{ fontSize: '20px' }} />
                            </Upload>
                        </Space>
                    )
                ),
                onCell: (record) => ({
                    rowSpan: record.index === 1 ? selectedSizes.length : 0,
                }),
            },

        ];

        return {
            columns,
            dataSource,
        };
    };

    ///phần xem ảnh
    // const [selectedFiles, setSelectedFiles] = useState([]);
    // const [previewOpen, setPreviewOpen] = useState(false);
    // const [previewImage, setPreviewImage] = useState('');
    // const [previewTitle, setPreviewTitle] = useState('');
    // const handleCancel = () => setPreviewOpen(false);
    // const getBase64 = (file) =>
    //     new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onload = () => resolve(reader.result);
    //         reader.onerror = (error) => reject(error);
    //     });
    // const handlePreview = async (file) => {
    //     if (!file.url && !file.preview) {
    //         file.preview = await getBase64(file.originFileObj);
    //     }
    //     setPreviewImage(file.url || file.preview);
    //     setPreviewOpen(true);
    //     setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    // };

    ///phần xem ảnh


    //phần modal confirm thêm sản phẩm
    // const [isModalVisible, setModalVisible] = useState(false);

    // const showModal = () => {
    //     setModalVisible(true);
    // };

    // const handleOk = async () => {
    //     try {
    //         // Your existing code to get form values and create product detail
    //         await handleCreateProductDetail();

    //         // Close the modal after successful execution
    //         setModalVisible(false);
    //     } catch (error) {
    //         console.error('Error:', error);
    //         // Handle errors if needed
    //     }
    // };

    // const handleCancell = () => {
    //     setModalVisible(false);
    // };




    // const [selectedImagesByColor, setSelectedImagesByColor] = useState({});

    // const uploadFileToFirebase = async (file) => {
    //     try {
    //         // Kiểm tra lại định dạng file
    //         if (!file || !file.type.startsWith('image/')) {
    //             throw new Error('Invalid file type.');
    //         }

    //         const storage = getStorage(firebaseApp);
    //         const storageRef = ref(storage, `files/${v4()}`);
    //         const metadata = {
    //             contentType: 'image/png', // hoặc 'image/jpeg', tùy vào định dạng ảnh bạn sử dụng
    //         };
    //         const task = uploadBytesResumable(storageRef, file, metadata);


    //         return new Promise((resolve, reject) => {
    //             task.on(
    //                 'state_changed',
    //                 (snapshot) => {
    //                     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //                     console.log(`Upload is ${progress.toFixed(2)}% done`);
    //                 },
    //                 (error) => {
    //                     reject(error);
    //                 },
    //                 () => {
    //                     getDownloadURL(task.snapshot.ref)
    //                         .then((downloadURL) => {
    //                             resolve(downloadURL);
    //                         })
    //                         .catch((error) => {
    //                             reject(error);
    //                         });
    //                 },
    //             );
    //         });
    //     } catch (error) {
    //         console.error('Error uploading file to Firebase:', error);
    //         throw error;
    //     }
    // };

    // const handleImageChange = async (info, key) => {
    //     if (info.file.status === 'done') {
    //         try {
    //             const imageUrl = await uploadFileToFirebase(info.file.originFileObj);

    //             setSelectedImagesByColor((prevSelectedImages) => ({
    //                 ...prevSelectedImages,
    //                 [key]: [...(prevSelectedImages[key] || []), { file: info.file.originFileObj, imageUrl }],
    //             }));

    //             console.log(`Selected Images for key ${key}:`, { file: info.file.originFileObj, imageUrl });
    //         } catch (error) {
    //             console.error('Failed to upload image to Firebase:', error);
    //         }
    //     } else if (info.file.status === 'removed') {
    //         setSelectedImagesByColor((prevSelectedImages) => {
    //             const { [key]: removedImage, ...restImages } = prevSelectedImages;
    //             return restImages;
    //         });

    //         console.log(`Removed Images for key ${key}`);
    //     }
    // };




    // const createProductDetail = async (productDetailData) => {
    //     try {
    //         const response = await axios.post('http://localhost:8080/api/v1/productDetails/create', productDetailData);

    //         console.log('Response:', response.data);

    //         return response.data;
    //     } catch (error) {
    //         console.error('Error:', error.message);
    //         throw error;
    //     }
    // };

    // const handleCreateProductDetail = async () => {
    //     form.submit();
    //     try {
    //         const formValues = await form.validateFields();

    //         const resolvedProductDetailDataList = await Promise.all(
    //             dataSource.map(async (item) => {
    //                 const colorId = getColorIdByName(item.color);
    //                 const sizeId = getSizeIdByName(item.size);
    //                 const productId = products.find(product => product.productName === formValues.productName)?.id;
    //                 const materialId = materials.find(material => material.materialName === formValues.materialName)?.id;

    //                 const imageInfos = selectedImagesByColor[item.key] || [];
    //                 const imageIds = await Promise.all(imageInfos.map(async (imageInfo) => {
    //                     // Nếu có URL ảnh, tải ảnh lên Firebase và lấy ID ảnh
    //                     if (imageInfo && imageInfo.imageUrl) {
    //                         return await uploadImageAndGetId({
    //                             colorId: colorId,
    //                             productId: productId,
    //                             imageFile: imageInfo.file,
    //                         });
    //                     }
    //                     return null;
    //                 }));

    //                 return {
    //                     productId: productId,
    //                     materialId: materialId,
    //                     colorId: colorId,
    //                     sizeId: sizeId,
    //                     quantity: item.quantity,
    //                     price: item.price,
    //                     // imageIds: imageIds.filter(id => id !== null),  // Lọc bỏ các ID ảnh null
    //                 };
    //             })
    //         );

    //         // Now, you can use resolvedProductDetailDataList to createProductDetail
    //         await createProductDetail(resolvedProductDetailDataList);

    //         message.success('Product details created successfully!');
    //     } catch (error) {
    //         console.error('Failed to create product details:', error);
    //         message.error('Failed to create product details. Please try again.');
    //     }
    // };

    // const uploadImageAndGetId = async (imageData) => {
    //     try {
    //         // Tải ảnh lên Firebase và nhận URL tải về
    //         const imageUrl = await uploadFileToFirebase(imageData.imageFile);

    //         // Sau đó, tạo thông tin ảnh và lấy ID ảnh từ API
    //         const imageInfo = {
    //             colorId: imageData.colorId,
    //             productId: imageData.productId,
    //             imageLink: imageUrl,
    //         };

    //         return await ImageService.create(imageInfo)
    //     } catch (error) {
    //         console.error('Error uploading image and getting ID:', error);
    //         throw error;
    //     }
    // };


    return (
        <>
            {/* <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal> */}
            {/* <Modal
                title="Xác nhận thêm sản phẩm"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancell}
            >
                <p>Bạn có chắc muốn thêm sản phẩm?</p>
            </Modal> */}
            <Form
                name="validateOnly" layout="vertical" autoComplete="off"
                style={{ marginTop: '25px' }}
                form={form}
            >

                <Card title={<span style={{ color: '#5a76f3' }}>Thêm mới sản phẩm</span>}
                    style={{ borderRadius: '10px' }} >
                    <Row>
                        <Col span={10}>
                            <Form.Item
                                label="Tên sản phẩm:"
                                name="productName"
                                rules={[{ required: true, message: 'Vui lòng chọn tên sản phẩm !' }]}
                            >
                                <Select
                                    showSearch
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Chọn sản phẩm"
                                    onChange={handleProductNameChange}
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
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

                <Card title={<span style={{ color: '#5a76f3' }}>Thuộc tính</span>}
                    style={{ marginTop: '20px', borderRadius: '10px' }} >
                    <Row>
                        <Col span={10}>
                            <Form.Item label="Chất liệu:" name="materialName" rules={[{ required: true, message: 'Vui lòng chọn chất liệu !' }]} >
                                <Select
                                    showSearch
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Chọn chất liệu"
                                    onChange={handleMaterialChange}
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}

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
                                    <Form.Item label="Màu sắc" name="colorName" rules={[{ required: true, message: 'Vui lòng chọn màu sắc !' }]}>
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
                                            onChange={handleSizeChange}
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

            <Row style={{ marginTop: '10px' }}>
                <Col span={24}>
                    <Button type='primary' style={{ float: 'right', borderRadius: '5px' }}>
                        <PlusOutlined />Hoàn tất
                    </Button>
                </Col>
            </Row>
            {/* {colorTables !== null && */}

            <Form form={form}>

                <Card title={<span style={{ color: '#5a76f3' }}>Các biến thể sản phẩm</span>}
                    style={{ marginTop: '10px', borderRadius: '10px' }}>
                    <Table
                        columns={colorTables.columns}
                        dataSource={colorTables.dataSource}
                        pagination={false}
                        style={{ height: '400px', overflowY: 'auto', }}
                    />
                </Card>
            </Form>

            {/* } */}
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