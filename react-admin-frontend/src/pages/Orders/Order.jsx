import React, { useState, useEffect } from 'react';
import { Select, Row, Col, Form, Input } from 'antd';
import { getAddressData, getDistrictsByCity, getWardsByDistrict } from '~/service/ApiService';

const { Option } = Select;

const YourComponent = () => {
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');

    useEffect(() => {
        // Gọi hàm từ service API để lấy dữ liệu tỉnh/thành phố
        getAddressData(1)
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

    return (
        <div>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label="Tỉnh/Thành phố:" name="city" rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]}>
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Chọn Tỉnh/Thành phố"
                            optionFilterProp="children"
                            onChange={handleCityChange}
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) => (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())}
                        >
                            {cities.map(city => (
                                <Option key={city.code} value={city.code}>{city.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Quận/Huyện:" name="district" rules={[{ required: true, message: 'Vui lòng chọn quận/huyện!' }]}>
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Chọn Quận/Huyện"
                            optionFilterProp="children"
                            onChange={handleDistrictChange}
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) => (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())}
                            disabled={!selectedCity}
                        >
                            {districts.map(district => (
                                <Option key={district.code} value={district.code}>{district.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label="Phường/Xã:" name="region" rules={[{ required: true, message: 'Vui lòng chọn phường/xã!' }]}>
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Chọn Phường/Xã"
                            optionFilterProp="children"
                            onChange={value => setSelectedWard(value)}
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) => (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())}
                            disabled={!selectedDistrict}
                        >
                            {wards.map(ward => (
                                <Option key={ward.code} value={ward.code}>{ward.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Địa chỉ cụ thể:" name="addressDetail" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ cụ thể!' }]}>
                        <Input placeholder="Địa chỉ cụ thể..." />
                    </Form.Item>
                </Col>
            </Row>
        </div>
    );
};

export default YourComponent;
