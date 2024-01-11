import { FormOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Image, Input, InputNumber, Modal, Row, Select, Space, Switch, Table, Tag, notification } from "antd";
import { useEffect, useState } from "react";
import ColorService from "~/service/ColorService";
import MaterialService from "~/service/MaterialService";
import ProductDetailService from "~/service/ProductDetaiService";
import SizeService from "~/service/SizeService";
import formatCurrency from "~/utils/format-currency";

const ShowProductDetailModal = ({ isModal, hideModal, record }) => {

    const [open, setOpen] = useState({ isModal: false, reacord: null });

    const showOpenModal = (record) => {
        setOpen({
            isModal: true,
            reacord: record,
        });
    };

    const hideOpenModal = () => {
        setOpen({ isModal: false });
    };

    const [loading, setLoading] = useState(false);

    //Load sản phẩm
    const [productDetails, setProductDetails] = useState([]);

    const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });


    const fetchProductDetails = async () => {
        setLoading(true);
        await ProductDetailService.getAllByProductId(record.id, pagination.current - 1, pagination.pageSize)
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
            width: '7%',
            render: (text) => (
                <Image width={60} height={60} src={text} alt="Avatar" />
            ),
        },
        {
            title: 'Sản phẩm',
            width: '30%',
            render: (record) => (
                <>
                    <span>{`${record.productName}`}</span>
                    <p style={{ marginBottom: '0' }}>[{record.colorName} - {record.sizeName}]</p>
                </>
            )
        },
        {
            title: 'Chất liệu',
            dataIndex: 'materialName',
            key: 'materialName',
            width: '15%'
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            width: '10%'
        },

        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            width: '10%',
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
                        onClick={() => showOpenModal(record)}
                    />
                    <Switch
                        size="small"
                        defaultChecked={record.deleted}
                        onClick={() => handleDelete(record.id)}
                    />

                </Space>
            },
        },
    ];

    return (
        <>

            <Modal
                title="Danh sách sản phẩm chi tiết"
                open={isModal}
                onCancel={hideModal}
                footer={false}
                width={1200}
            >

                <div style={{ height: '500px', overflowY: 'auto', }}>
                    <Table
                        onChange={handleTableChange}
                        loading={loading}
                        dataSource={productDetails} columns={columns} pagination={{
                            current: pagination.current,
                            pageSize: pagination.pageSize,
                            defaultPageSize: 5,
                            pageSizeOptions: ['5', '10', '15'],
                            total: pagination.total,
                            showSizeChanger: true,
                        }} />
                </div>

            </Modal >

            {open.isModal && <ProductDetailModal
                record={open.reacord}
                hideModal={hideOpenModal}
                isModal={open.isModal}
            />}
        </ >
    );
};

const ProductDetailModal = ({ reacord, hideModal, isModal, fetchProductDetails }) => {

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

    const [form] = Form.useForm();
    const handleUpdate = () => {
        form.validateFields().then(async () => {

            const data = form.getFieldsValue(true);
            await ProductDetailService.update(reacord.id, data)
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
                <Row>
                    <Col span={12}>
                        {/* <Form.Item label="Sản phẩm:" name="categoryName" rules={[{ required: true, message: 'Vui lòng chọn danh mục !' }]}>
                            <Select
                                showSearch
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Chọn sản phẩm"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}

                                options={categories.map(option => ({ value: option.categoryName, label: option.categoryName }))}
                            />
                        </Form.Item> */}
                    </Col>
                    <Col span={12} style={{ paddingLeft: '10px' }}>
                        <Form.Item label="Chất liệu:" name="supplierName" rules={[{ required: true, message: 'Vui lòng chọn nhà cung cấp !' }]}>
                            <Select
                                showSearch
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Chọn chất liệu"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}

                                options={materials.map(option => ({ value: option.materialName, label: option.materialName }))}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={{ paddingRight: '10px' }}>
                        <Form.Item label="Kích thước:" name="brandName" rules={[{ required: true, message: 'Vui lòng chọn thương hiệu !' }]}>
                            <Select
                                showSearch
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Chọn kích thước"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}

                                options={sizes.map(option => ({ value: option.sizeName, label: option.sizeName }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12} style={{ paddingLeft: '10px' }}>
                        <Form.Item label="Màu sắc:" name="brandName" rules={[{ required: true, message: 'Vui lòng chọn thương hiệu !' }]}>
                            <Select
                                showSearch
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Chọn màu sắc"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}

                                options={colors.map(option => ({ value: option.colorName, label: option.colorName }))}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={{ paddingRight: '10px' }}>
                        <Form.Item label="Số lượng:" name="brandName" rules={[{ required: true, message: 'Vui lòng chọn thương hiệu !' }]}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12} style={{ paddingLeft: '10px' }}>
                        <Form.Item label="Giá bán:" name="brandName" rules={[{ required: true, message: 'Vui lòng chọn thương hiệu !' }]}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};
export default ShowProductDetailModal;