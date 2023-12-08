
import AddressService from "~/service/AddressService";
import { FaMapMarkedAlt } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import { findProvincesByCode, getDistrictsByCity, getProvinces, getWardsByDistrict } from '~/service/ApiService';
import { PlusOutlined, FormOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Row, Col, Radio, Button, Modal, Tag, Form, Input, Select, Checkbox, Popconfirm, notification, Space, Table } from 'antd';

const ShowProductDetailModal = ({ reacord, hideModal, isModal }) => {
    //Mở modal thêm sử address
    const [addressModal2, setAddressModal2] = useState({ isModal: false, isMode: '', reacord: null });

    const showAddressModal2 = (mode, record) => {
        setAddressModal2({
            isModal: true,
            isMode: mode,
            reacord: record,
        });
    };

    const hideAddressModal2 = () => {
        setAddressModal2({ isModal: false });
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
            dataIndex: 'productName',
            key: 'productName',
            width: '10%',
            // filterIcon: <SearchOutlined style={{ fontSize: '14px', color: 'rgb(158, 154, 154)' }} />,
            // ...getColumnSearchProps('productName')

        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'productName',
            key: 'productName',
            width: '10%',
            // filterIcon: <SearchOutlined style={{ fontSize: '14px', color: 'rgb(158, 154, 154)' }} />,
            // ...getColumnSearchProps('productName')

        },
        {
            title: 'Kích thước',
            dataIndex: 'createdBy',
            key: 'createdBy',
            width: '10%',
        },
        {
            title: 'Màu sắc',
            dataIndex: 'createdBy',
            key: 'createdBy',
            width: '10%',
        },
        {
            title: 'Số lượng',
            dataIndex: 'categoryName',
            key: 'categoryName',
            width: '10%',
        },

        {
            title: 'Giá bán',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: '10%',
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
                    {/* <Button type="text" icon={<EyeOutlined />} style={{ color: '#5a76f3', fontSize: '16px' }} onClick={() => showProductDetalModal(record)} /> */}
                </Space>
            }

        },
    ];

    // const [address, setAddress] = useState([]);

    // const fetchAddress = async () => {
    //     await AddressService.getAddressesByUserId(reacord.id)
    //         .then(response => {
    //             setAddress(response);

    //         }).catch(error => {
    //             console.error(error);
    //         })
    // }
    // useEffect(() => {
    //     fetchAddress();
    // }, [])

    // useEffect(() => {
    //     findProvincesByCode(1).then(data => {
    //         console.log(data)
    //     }).catch(error => {
    //         console.error(error)
    //     })
    // }, [])

    const handleDelete = async (id) => {

        await AddressService.delete(id).then(response => {
            console.log(response.data);
            notification.success({
                message: 'Thông báo',
                description: 'Xóa thành công!',
            });
            // fetchAddress();
        }).catch(error => {
            console.error(error);
            notification.error({
                message: 'Thông báo',
                description: 'Xóa thất bại!',
            });
        });

    };
    return (
        <>
            <Modal
                width={1000}
                title="Danh sách chi tiết sản phẩm"
                onCancel={hideModal}
                footer={null}
                open={isModal}
            >
                <Row >
                    <Col span={21} />
                    <Col span={3} >
                        <Button type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => showAddressModal2("add", reacord.id)}
                            style={{ marginBottom: '16px', borderRadius: '2px' }} >
                            Thêm mới
                        </Button>
                    </Col>
                </Row>
                <Table
                    // dataSource={products?.map((product) => ({
                    //     ...product,
                    //     key: product.id,
                    //     createdAt: FormatDate(product.createdAt)
                    // }))}

                    // loading={loading}
                    columns={columns}
                // onChange={handleTableChange}
                // pagination={{
                //     current: pagination.current,
                //     pageSize: pagination.pageSize,
                //     defaultPageSize: 5,
                //     pageSizeOptions: ['5', '10', '15'],
                //     total: pagination.total,
                //     showSizeChanger: true,
                // }}
                ></Table >
            </Modal>
            {/* {addressModal2.isModal && (
                <AddressModal
                    isMode={addressModal2.isMode}
                    reacord={addressModal2.reacord}
                    hideModal={hideAddressModal2}
                    isModal={addressModal2.isModal}
                    fetchAddress={fetchAddress}

                />
            )} */}
        </>
    );
};
export default ShowProductDetailModal;

// const AddressModal = ({ isMode, reacord, hideModal, isModal, fetchAddress }) => {

//     //Đoạn mã lấy api tỉnh thành, quận huyện, phường xã
//     const [cities, setCities] = useState([]);
//     const [districts, setDistricts] = useState([]);
//     const [wards, setWards] = useState([]);
//     const [selectedCity, setSelectedCity] = useState('');
//     const [selectedDistrict, setSelectedDistrict] = useState('');
//     const [selectedWard, setSelectedWard] = useState('');
//     const getCityNameByCode = (cityCode) => {
//         const city = cities.find(city => city.code === cityCode);
//         return city.name;
//     };
//     console.log(getCityNameByCode(1))
//     // const getDistrictNameByCode = (districtCode) => {
//     //     const district = districts.find(district => district.code === districtCode);
//     //     return district ? district.name : 'Unknown District';
//     // };
//     // const getWardNameByCode = (wardCode) => {
//     //     const ward = wards.find(ward => ward.code === wardCode);
//     //     return ward ? ward.name : 'Unknown Ward';
//     // };
//     useEffect(() => {

//         // Gọi hàm từ service API để lấy dữ liệu tỉnh/thành phố
//         getProvinces(1)
//             .then(data => setCities(data))
//             .catch(error => console.error('Lỗi khi lấy dữ liệu tỉnh/thành phố:', error));
//     }, []);

//     useEffect(() => {
//         // Gọi hàm từ service API để lấy dữ liệu quận/huyện dựa trên tỉnh/thành phố được chọn
//         if (selectedCity) {
//             getDistrictsByCity(selectedCity, 2)
//                 .then(data => setDistricts(data))
//                 .catch(error => console.error('Lỗi khi lấy dữ liệu quận/huyện:', error));
//         }
//     }, [selectedCity]);

//     useEffect(() => {
//         // Gọi hàm từ service API để lấy dữ liệu phường/xã dựa trên quận/huyện được chọn
//         if (selectedDistrict) {
//             getWardsByDistrict(selectedDistrict, 2)
//                 .then(data => setWards(data))
//                 .catch(error => console.error('Lỗi khi lấy dữ liệu phường/xã:', error));
//         }
//     }, [selectedDistrict]);

//     const handleCityChange = (value) => {
//         setSelectedCity(value);
//         setSelectedDistrict('');
//         setSelectedWard('');
//     };

//     const handleDistrictChange = (value) => {
//         setSelectedDistrict(value);
//         setSelectedWard('');
//     };

//     //---------------------------------------------------------------------------------------------

//     const [form] = Form.useForm();
//     const handleCreate = () => {
//         form.validateFields().then(async () => {

//             const data = await form.getFieldsValue();
//             data.usersId = reacord;

//             console.log(data);
//             await AddressService.create(data)
//                 .then(() => {
//                     notification.success({
//                         message: 'Thông báo',
//                         description: 'Thêm mới thành công!',
//                     });
//                     fetchAddress();
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

//             const data = await form.getFieldsValue();

//             await AddressService.update(reacord.id, data)
//                 .then(() => {
//                     notification.success({
//                         message: 'Thông báo',
//                         description: 'Cập nhật thành công!',
//                     });
//                     fetchAddress()
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
//         <>
//             <Modal
//                 width={600}
//                 title={isMode === "edit" ? "Cập nhật địa chỉ" : "Thêm mới một địa chỉ"}
//                 open={isModal}
//                 onCancel={hideModal}
//                 onOk={isMode === "edit" ? handleUpdate : handleCreate}
//                 okText={isMode === "edit" ? "Cập nhật" : "Thêm mới"}
//                 cancelText="Hủy bỏ"
//             >
//                 <Form
//                     name="validateOnly" layout="vertical" autoComplete="off"
//                     style={{ maxWidth: 600, marginTop: '25px' }}
//                     form={form}
//                     initialValues={{
//                         ...reacord,
//                     }}
//                 >
//                     <Form.Item label="Họ và tên:" name="recipientName" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
//                         <Input placeholder="Họ và tên..." />
//                     </Form.Item>
//                     <Form.Item label="Số điện thoại:" name="phoneNumber" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
//                         <Input placeholder="Số điện thoại..." />
//                     </Form.Item>
//                     <Row>
//                         <Col span={11}>
//                             <Form.Item label="Tỉnh/Thành phố:" name="city" rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]}>
//                                 <Select
//                                     showSearch
//                                     style={{
//                                         width: '100%',
//                                     }}
//                                     onChange={handleCityChange}
//                                     placeholder="Chọn Tỉnh/Thành phố"
//                                     filterOption={(input, option) => (option?.label ?? '').includes(input)}
//                                     filterSort={(optionA, optionB) =>
//                                         (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
//                                     }
//                                     options={cities.map(city => ({ value: city.code, label: city.name }))}
//                                 />
//                             </Form.Item>
//                         </Col>
//                         <Col span={2} />
//                         <Col span={11}>
//                             <Form.Item label="Quận/Huyện:" name="district" rules={[{ required: true, message: 'Vui lòng chọn quận/huyện!' }]}>
//                                 <Select
//                                     showSearch
//                                     style={{
//                                         width: '100%',
//                                     }}
//                                     onChange={handleDistrictChange}
//                                     placeholder="Chọn Quận/Huyện"
//                                     filterOption={(input, option) => (option?.label ?? '').includes(input)}
//                                     filterSort={(optionA, optionB) =>
//                                         (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
//                                     }
//                                     disabled={!selectedCity}
//                                     options={districts.map(district => ({ value: district.code, label: district.name }))}
//                                 />
//                             </Form.Item>
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col span={11}>
//                             <Form.Item label="Phường/Xã:" name="region" rules={[{ required: true, message: 'Vui lòng chọn phường/xã!' }]}>
//                                 <Select
//                                     showSearch
//                                     style={{
//                                         width: '100%',
//                                     }}
//                                     placeholder="Chọn Phường/Xã"
//                                     onChange={value => setSelectedWard(value)}
//                                     filterOption={(input, option) => (option?.label ?? '').includes(input)}
//                                     filterSort={(optionA, optionB) =>
//                                         (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
//                                     }
//                                     disabled={!selectedDistrict}
//                                     options={wards.map(ward => ({ value: ward.code, label: ward.name }))}
//                                 />
//                             </Form.Item>
//                         </Col>
//                         <Col span={2} />
//                         <Col span={11}>
//                             <Form.Item label="Địa chỉ cụ thể:" name="addressDetail" rules={[{ required: true, message: 'Vui lòng nhập tên vai trò!' }]}>
//                                 <Input placeholder="Địa chỉ cụ thể..." />
//                             </Form.Item>
//                         </Col>
//                     </Row>
//                     <Form.Item name="deleted" valuePropName="checked">
//                         <Checkbox >Đặt làm địa chỉ mặc định</Checkbox>
//                     </Form.Item>
//                 </Form>
//             </Modal>

//         </>
//     );
// };