import { useEffect } from "react";
import { useState } from "react";
import AddressService from "~/service/AddressService";
import { FaMapMarkedAlt } from "react-icons/fa";
const { PlusOutlined, FormOutlined, DeleteOutlined } = require("@ant-design/icons");
const { Row, Col, Radio, Button, Modal, Tag, Form, Input, Select, Checkbox } = require("antd");

const ShowAddressModal = ({ reacord, hideModal, isModal }) => {

    // const [openAddressModal, setOpenAddressModal] = useState({ isModal: false, isMode: '', reacord: null });

    // const showModalAddress = (mode, record) => {
    //     setOpenAddressModal({
    //         isModal: true,
    //         isMode: mode,
    //         reacord: record,
    //     });

    // };

    // const hideModalAddress = () => {
    //     setOpenAddressModal({ isModal: false });
    // };
    const [address, setAddress] = useState([]);

    const fetchAddress = async () => {
        await AddressService.getAddressesByUserId(reacord.id)
            .then(response => {
                setAddress(response);

            }).catch(error => {
                console.error(error);
            })
    }
    useEffect(() => {
        fetchAddress();
    }, [])
    return (
        <>
            <Modal
                title="Thêm mới"
                onCancel={hideModal}
                footer={null}
                open={isModal}
            >
                <Row style={{ borderBottom: '1px solid #e8e8e8', paddingBottom: '8px', marginBottom: '8px' }}>
                    <Col span={18} />
                    <Col span={6}>
                        <Button type="primary"
                            icon={<PlusOutlined />}
                            // onClick={() => showModalAddress("add")}
                            style={{ marginBottom: '16px', borderRadius: '2px' }} >
                            Thêm mới
                        </Button>
                    </Col>
                </Row>
                {address.length === 0 ? (
                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        <FaMapMarkedAlt style={{ fontSize: '30px', color: '#8c8c8c', marginBottom: '8px' }} />
                        <p style={{ marginBottom: '0', fontSize: '16px' }}>Không có dữ liệu!!!</p>
                    </div>
                ) : (
                    address.map((address, index) => (
                        <Row key={index + 1} style={{ borderBottom: '1px solid #e8e8e8', paddingBottom: '8px', marginBottom: '8px' }}>
                            <Col span={21}>
                                <p>
                                    <Radio value={true} checked={address.deleted}></Radio>
                                    <b>{address?.recipientName}</b> | {address?.phoneNumber}
                                </p>
                                <p>{address?.addressDetail} - {address?.region} - {address?.district} - {address?.city}</p>
                                {address.deleted && <Tag color='red'>Mặc định</Tag>}
                            </Col>
                            <Col span={3}>
                                <Button type="text"
                                    icon={<FormOutlined style={{ color: 'rgb(214, 103, 12)' }} />}
                                />
                                <Button type="text" icon={<DeleteOutlined />} style={{ color: 'red' }} />
                            </Col>
                        </Row>
                    ))
                )}
            </Modal>
            {/* {openAddressModal.isModal && <AddressModal
                isMode={openAddressModal.isMode}
                reacord={openAddressModal.reacord}
                hideModal={hideModalAddress}
                isModal={openAddressModal.isModal}
            />} */}
        </>
    );
};
// const AddressModal = (isMode, reacord, hideModal, isModal) => {
//     const [form] = Form.useForm();
//     const handleCreate = () => {
//         form.validateFields().then(async () => {

//             const data = await form.getFieldsValue();

//             await AddressService.create(data)
//                 .then(() => {
//                     notification.success({
//                         message: 'Thông báo',
//                         description: 'Thêm mới thành công!',
//                     });
//                     fetchUsers();
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

//             await UserService.update(reacord.id, data)
//                 .then(() => {
//                     notification.success({
//                         message: 'Thông báo',
//                         description: 'Cập nhật thành công!',
//                     });
//                     fetchUsers();
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
//                 title={isMode === "edit" ? "Cập nhật tài khoản người dùng" : "Thêm mới một tài khoản người dùng"}
//                 open={isModal}  // Thay đổi từ "open" thành "visible"
//                 onCancel={hideModal}
//                 okText="Thêm mới"
//                 cancelText="Hủy bỏ"
//             >
//                 <Form
//                     name="validateOnly" layout="vertical" autoComplete="off"
//                     style={{ maxWidth: 600, marginTop: '25px' }}
//                     form={form}
//                 >
//                     <Form.Item label="Họ và tên:" name="recipientName" rules={[{ required: true, message: 'Vui lòng nhập tên vai trò!' }]}>
//                         <Input placeholder="Họ và tên..." />
//                     </Form.Item>
//                     <Form.Item label="Số điện thoại:" name="recipientName" rules={[{ required: true, message: 'Vui lòng nhập tên vai trò!' }]}>
//                         <Input placeholder="Số điện thoại..." />
//                     </Form.Item>
//                     <Row>
//                         <Col span={11}>
//                             <Form.Item label="Tỉnh/Thành phố:" name="" rules={[{ required: true, message: 'Vui lòng nhập tên vai trò!' }]}>
//                                 <Select
//                                     showSearch
//                                     style={{
//                                         width: '100%',
//                                     }}
//                                     placeholder="Chọn Tỉnh/Thành phố"
//                                     // optionFilterProp="children"
//                                     filterOption={(input, option) => (option?.label ?? '').includes(input)}
//                                     filterSort={(optionA, optionB) =>
//                                         (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
//                                     }
//                                     options={[
//                                         {
//                                             value: '1',
//                                             label: 'Not Identified',
//                                         },

//                                     ]}
//                                 />

//                             </Form.Item>
//                         </Col>
//                         <Col span={2} />
//                         <Col span={11}>
//                             <Form.Item label="Quận/Huyện:" name="" rules={[{ required: true, message: 'Vui lòng nhập tên vai trò!' }]}>
//                                 <Select
//                                     showSearch
//                                     style={{
//                                         width: '100%',
//                                     }}
//                                     placeholder="Chọn Quận/Huyện"
//                                     optionFilterProp="children"
//                                     filterOption={(input, option) => (option?.label ?? '').includes(input)}
//                                     filterSort={(optionA, optionB) =>
//                                         (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
//                                     }
//                                     options={[
//                                         {
//                                             value: '1',
//                                             label: 'Not Identified',
//                                         },

//                                     ]}
//                                 />

//                             </Form.Item>
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col span={11}>
//                             <Form.Item label="Phường/Xã:" name="" rules={[{ required: true, message: 'Vui lòng nhập tên vai trò!' }]}>
//                                 <Select
//                                     showSearch
//                                     style={{
//                                         width: '100%',
//                                     }}
//                                     placeholder="Chọn Phường/Xã"
//                                     // optionFilterProp="children"
//                                     filterOption={(input, option) => (option?.label ?? '').includes(input)}
//                                     filterSort={(optionA, optionB) =>
//                                         (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
//                                     }
//                                     options={[
//                                         {
//                                             value: '1',
//                                             label: 'Not Identified',
//                                         },

//                                     ]}
//                                 />

//                             </Form.Item>
//                         </Col>
//                         <Col span={2} />
//                         <Col span={11}>
//                             <Form.Item label="Địa chỉ cụ thể:" name="recipientName" rules={[{ required: true, message: 'Vui lòng nhập tên vai trò!' }]}>
//                                 <Input placeholder="Địa chỉ cụ thể..." />
//                             </Form.Item>
//                         </Col>
//                     </Row>
//                     <Form.Item>
//                         <Checkbox>Đặt làm địa chỉ mặc định</Checkbox>
//                     </Form.Item>
//                 </Form>
//             </Modal>

//         </>
//     );
// };
export default ShowAddressModal;