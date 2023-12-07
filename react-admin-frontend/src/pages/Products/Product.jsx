import { ExclamationCircleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Button, Input, Form, Modal, Radio, Space, Select, Row, Col, Checkbox } from 'antd';
import TextArea from 'antd/es/input/TextArea';
const LocalizedModal = () => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Modal
            </Button>
            <Modal
                title="Thêm mới một địa chỉ"
                open={open}
                onOk={hideModal}
                onCancel={hideModal}
                okText="Thêm mới"
                cancelText="Hủy bỏ"
            >
                <Form
                    name="validateOnly" layout="vertical" autoComplete="off"
                    style={{ maxWidth: 600, marginTop: '25px' }}
                    form={form}
                >
                    <Form.Item label="Họ và tên:" name="recipientName" rules={[{ required: true, message: 'Vui lòng nhập tên vai trò!' }]}>
                        <Input placeholder="Họ và tên..." />
                    </Form.Item>
                    <Form.Item label="Số điện thoại:" name="recipientName" rules={[{ required: true, message: 'Vui lòng nhập tên vai trò!' }]}>
                        <Input placeholder="Số điện thoại..." />
                    </Form.Item>
                    <Row>
                        <Col span={11}>
                            <Form.Item label="Tỉnh/Thành phố:" name="" rules={[{ required: true, message: 'Vui lòng nhập tên vai trò!' }]}>
                                <Select
                                    showSearch
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Chọn Tỉnh/Thành phố"
                                    // optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={[
                                        {
                                            value: '1',
                                            label: 'Not Identified',
                                        },

                                    ]}
                                />

                            </Form.Item>
                        </Col>
                        <Col span={2} />
                        <Col span={11}>
                            <Form.Item label="Quận/Huyện:" name="" rules={[{ required: true, message: 'Vui lòng nhập tên vai trò!' }]}>
                                <Select
                                    showSearch
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Chọn Quận/Huyện"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={[
                                        {
                                            value: '1',
                                            label: 'Not Identified',
                                        },

                                    ]}
                                />

                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                            <Form.Item label="Phường/Xã:" name="" rules={[{ required: true, message: 'Vui lòng nhập tên vai trò!' }]}>
                                <Select
                                    showSearch
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Chọn Phường/Xã"
                                    // optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={[
                                        {
                                            value: '1',
                                            label: 'Not Identified',
                                        },

                                    ]}
                                />

                            </Form.Item>
                        </Col>
                        <Col span={2} />
                        <Col span={11}>
                            <Form.Item label="Địa chỉ cụ thể:" name="recipientName" rules={[{ required: true, message: 'Vui lòng nhập tên vai trò!' }]}>
                                <Input placeholder="Địa chỉ cụ thể..." />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Checkbox>Đặt làm địa chỉ mặc định</Checkbox>


                </Form>
            </Modal>

        </>
    );
};
const App = () => {

    return (
        <>
            <Space>
                <LocalizedModal />
            </Space>
        </>
    );
};
export default App;