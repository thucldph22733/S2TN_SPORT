
import AddressService from "~/service/AddressService";
import { FaMapMarkedAlt } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import { getDistrictsByCity, getProvinces, getWardsByDistrict } from '~/service/ApiService';
import { PlusOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { Row, Col, Button, Modal, Tag, Form, Input, Select, Checkbox, Popconfirm, notification, Space } from 'antd';

const Address = () => {
    const userString = localStorage.getItem('user2');
    const user = userString ? JSON.parse(userString) : null;
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


    const [address, setAddress] = useState([]);

    const fetchAddress = async () => {
        await AddressService.getAddressesByUserId(user.id)
            .then(response => {
                setAddress(response);

            }).catch(error => {
                console.error(error);
            })
    }
    useEffect(() => {
        fetchAddress();
    }, [])


    const handleDelete = async (id) => {

        await AddressService.delete(id).then(response => {
            console.log(response.data);
            notification.success({
                message: 'Thông báo',
                description: 'Xóa thành công!',
            });
            fetchAddress();
        }).catch(error => {
            console.error(error);
            notification.error({
                message: 'Thông báo',
                description: 'Xóa thất bại!',
            });
        });

    };

    return (
        <div style={{ paddingLeft: '20px' }}>
            <Row style={{ borderBottom: '1px solid #e8e8e8', paddingBottom: '8px', marginBottom: '8px' }}>
                <Col span={12}>
                    <h6>Địa chỉ của tôi</h6>
                </Col>
                <Col span={12}>
                    <Button type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => showAddressModal2("add", user.id)}
                        style={{ marginBottom: '16px', borderRadius: '2px', float: 'right' }} >
                        Thêm mới
                    </Button>
                </Col>


            </Row>
            {address.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <FaMapMarkedAlt style={{ fontSize: '30px', color: '#8c8c8c', marginBottom: '8px' }} />
                    <p style={{ fontSize: '16px' }}>Không có dữ liệu!!!</p>
                </div>
            ) : (
                address.map((address, index) => (
                    <Row key={index + 1} style={{ borderBottom: '1px solid #e8e8e8', paddingBottom: '8px', marginBottom: '8px' }}>
                        <Col span={20}>
                            <p style={{ fontSize: '15px' }}>
                                <b>{address?.recipientName}</b> | {address?.phoneNumber}
                            </p>
                            <p style={{ fontSize: '15px' }}>{address?.addressDetail} - {address?.ward} - {address?.district} - {address?.city}</p>
                            {address.deleted && <Tag color='red' style={{ height: '25px', width: '70px' }}>Mặc định</Tag>}
                        </Col>
                        <Col span={4}>

                            <Space size="middle" style={{ float: 'right' }}>
                                <Button type="text"
                                    icon={<FormOutlined
                                        style={{ color: 'rgb(214, 103, 12)', fontSize: '18px' }}
                                        onClick={() => {
                                            showAddressModal2("edit", address);
                                        }} />}
                                />
                                {address.deleted != true &&
                                    <Popconfirm
                                        title="Xóa địa chỉ"
                                        description="Bạn có chắc chắn xóa địa chỉ này không?"
                                        placement="topRight"
                                        onConfirm={() => handleDelete(address.id)}
                                        okText="Đồng ý"
                                        cancelText="Hủy bỏ"
                                    >
                                        <Button type="text" icon={<DeleteOutlined style={{ fontSize: '18px' }} />} style={{ color: 'red' }} />
                                    </Popconfirm>
                                }
                            </Space >

                        </Col>
                    </Row>
                ))
            )}

            {addressModal2.isModal && (
                <AddressModal
                    isMode={addressModal2.isMode}
                    reacord={addressModal2.reacord || {}}
                    hideModal={hideAddressModal2}
                    address={address}
                    isModal={addressModal2.isModal}
                    fetchAddress={fetchAddress}

                />
            )}
        </div>
    );
};
export default Address;

const AddressModal = ({ isMode, reacord, hideModal, isModal, fetchAddress, address }) => {
    // Đoạn mã lấy api tỉnh thành, quận huyện, phường xã
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');


    useEffect(() => {

        // Gọi hàm từ service API để lấy dữ liệu tỉnh/thành phố
        getProvinces(1)
            .then(data => setCities(data))
            .catch(error => console.error('Lỗi khi lấy dữ liệu tỉnh/thành phố:', error));
    }, []);

    useEffect(() => {
        // Gọi hàm từ service API để lấy dữ liệu quận/huyện dựa trên tỉnh/thành phố được chọn
        if (selectedCity) {
            getDistrictsByCity(selectedCity, 2)
                .then(data => setDistricts(data))
                .catch(error => console.error('Lỗi khi lấy dữ liệu quận/huyện:', error));
        }
    }, [selectedCity]);

    useEffect(() => {
        // Gọi hàm từ service API để lấy dữ liệu phường/xã dựa trên quận/huyện được chọn
        if (selectedDistrict) {
            getWardsByDistrict(selectedDistrict, 2)
                .then(data => setWards(data))
                .catch(error => console.error('Lỗi khi lấy dữ liệu phường/xã:', error));
        }
    }, [selectedDistrict]);

    const handleCityChange = (value) => {
        setSelectedCity(value);
        setSelectedDistrict('');
        setSelectedWard('');
    };

    const handleDistrictChange = (value) => {
        setSelectedDistrict(value);
        setSelectedWard('');
    };

    //---------------------------------------------------------------------------------------------
    const [form] = Form.useForm();
    const handleCreate = () => {
        form.validateFields().then(async () => {

            const data = await form.getFieldsValue(true);
            data.usersId = reacord;
            data.deleted = data.deleted ? true : false
            data.city = cities.find(city => city.code === Number(data.city))?.name ?? ''
            data.district = districts.find(district => district.code === Number(data.district))?.name ?? ''
            data.ward = wards.find(ward => ward.code === Number(data.ward))?.name ?? ''
            console.log(data)
            await AddressService.create(data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Thêm mới thành công!',
                    });
                    fetchAddress();
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

            const data = await form.getFieldsValue(true);

            await AddressService.update(reacord.id, data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Cập nhật thành công!',
                    });
                    fetchAddress()
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
        <>
            <Modal
                width={600}
                title={isMode === "edit" ? "Cập nhật địa chỉ" : "Thêm mới một địa chỉ"}
                open={isModal}
                onCancel={hideModal}
                onOk={isMode === "edit" ? handleUpdate : handleCreate}
                okText={isMode === "edit" ? "Cập nhật" : "Thêm mới"}
                cancelText="Hủy bỏ"
            >
                <Form
                    name="validateOnly" layout="vertical" autoComplete="off"
                    style={{ maxWidth: 600, marginTop: '25px' }}
                    form={form}
                    initialValues={{
                        ...reacord,
                    }}
                >
                    <Form.Item label="Họ và tên:" name="recipientName"
                        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }
                            ,
                        {
                            validator: (_, value) => {
                                if (!value) {
                                    return Promise.resolve(); // Không thực hiện validate khi giá trị rỗng
                                }
                                // Kiểm tra dấu cách ở đầu và cuối
                                if (/^\s|\s$/.test(value)) {
                                    return Promise.reject('Tên người dùng không được chứa dấu cách ở đầu và cuối!');
                                }
                                return Promise.resolve();
                            },
                        },
                        ]}
                    >
                        <Input placeholder="Họ và tên..." />
                    </Form.Item>
                    <Form.Item label="Số điện thoại:" name="phoneNumber"
                        rules={[
                            { required: true, message: 'Vui lòng nhập số điện thoại!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    const phoneNumberRegex = /^[0-9]{10,12}$/;

                                    if (!value) {
                                        return Promise.resolve();
                                    }

                                    if (!phoneNumberRegex.test(value)) {
                                        // notification.error({
                                        //     message: 'Lỗi',
                                        //     description: 'Số điện thoại không đúng định dạng!',
                                        // });
                                        return Promise.reject('Số điện thoại không đúng định dạng!');
                                    }

                                    return Promise.resolve();
                                },
                            }),
                        ]}
                    >
                        <Input placeholder="Số điện thoại..." />
                    </Form.Item>
                    <Row>
                        <Col span={11}>
                            <Form.Item label="Tỉnh/Thành phố:" name="city" rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]}>
                                <Select
                                    showSearch
                                    style={{
                                        width: '100%',
                                    }}
                                    onChange={handleCityChange}
                                    placeholder="Chọn Tỉnh/Thành phố"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={cities.map(city => ({ value: city.code, label: city.name }))}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={2} />
                        <Col span={11}>
                            <Form.Item label="Quận/Huyện:" name="district" rules={[{ required: true, message: 'Vui lòng chọn quận/huyện!' }]}>
                                <Select
                                    showSearch
                                    style={{
                                        width: '100%',
                                    }}
                                    onChange={handleDistrictChange}
                                    placeholder="Chọn Quận/Huyện"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    disabled={!selectedCity}
                                    options={districts.map(district => ({ value: district.code, label: district.name }))}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                            <Form.Item label="Phường/Xã:" name="ward" rules={[{ required: true, message: 'Vui lòng chọn phường/xã!' }]}>
                                <Select
                                    showSearch
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Chọn Phường/Xã"
                                    onChange={value => setSelectedWard(value)}
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    disabled={!selectedDistrict}
                                    options={wards.map(ward => ({ value: ward.code, label: ward.name }))}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={2} />
                        <Col span={11}>
                            <Form.Item label="Địa chỉ cụ thể:" name="addressDetail" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ cụ thể!' }]}>
                                <Input placeholder="Địa chỉ cụ thể..." />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="deleted" valuePropName="checked">
                        <Checkbox disabled={isMode === "edit" && reacord.deleted == true}>Đặt làm địa chỉ mặc định</Checkbox>
                    </Form.Item>
                </Form>
            </Modal>

        </>
    );
};