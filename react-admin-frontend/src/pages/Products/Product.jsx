import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Button, Modal, Space } from 'antd';
const LocalizedModal = () => {
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
                title="Modal"
                open={open}
                onOk={hideModal}
                onCancel={hideModal}

            >
                <Button type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => showModal("add")}
                    style={{ marginBottom: '16px', float: 'right', borderRadius: '2px' }} >
                    Thêm mới
                </Button>

                <p>palalala</p>
                <p>palalala</p>

                <p>palalala</p>

                <p>palalala</p>

            </Modal>
        </>
    );
};
const Product = () => {
    const [modal, contextHolder] = Modal.useModal();
    const confirm = () => {
        modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: 'Bla bla ...',
            // okText: '确认',
            // cancelText: '取消',
        });
    };
    return (
        <>
            <Space>
                <LocalizedModal />
                <Button onClick={confirm}>Confirm</Button>
            </Space>
            {contextHolder}
        </>
    );
};
export default Product;