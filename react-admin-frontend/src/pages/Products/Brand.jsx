import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Table, Space, Button, Pagination, Input, Form, Modal, notification, Radio, Popconfirm } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import {
    PlusOutlined,
    RedoOutlined,
    FormOutlined,
    DeleteOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import './Product.css'
// import Message from '~/components/Message'
import BrandService from '~/service/BrandService';
import FormatDate from '~/utils/format-date';
import { useParams } from 'react-router-dom'
const { TextArea } = Input;
// const Context = React.createContext({
//     name: 'Default',
// });
const getStatusBadgeStyle = (text) => {
    const backgroundColor = text === true ? 'rgb(66, 185, 126)' : 'rgb(243, 78, 28)';
    return {
        display: 'inline-block',
        padding: '4px 8px',
        borderRadius: '4px',
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor,
        color: 'white',
    };
};

const getStatusText = (text) => {
    return text === true ? 'Đang hoạt động' : 'Ngừng hoạt động';
};
function Brand() {
    const { id } = useParams();
    const [brands, setBrands] = useState([]);
    // const [totalPages, setTotalPages] = useState(1);
    const [pagination, setPagination] = useState({ pageNo: 1, pageSize: 5 });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchBrands();
    }, [pagination]);

    const fetchBrands = async () => {
        setLoading(true);
        await BrandService.getAll(pagination.pageNo, pagination.pageSize)
            .then(response => {

                setBrands(response.data);

                setLoading(false);
                console.log(response.data)
            }).catch(error => {
                console.error(error);
            })
    }

    const [open, setOpen] = useState({ isModal: false, isMode: '', selectedRecord: null });
    const showModal = (mode, record) => {
        setOpen({
            isModal: true,
            isMode: mode,
            selectedRecord: record,
        });
    };
    const hideModal = () => {
        setOpen({ isModal: false });
    };

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        // setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>

                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            width: '5%',
        },
        {
            title: 'Tên thương hiệu',
            dataIndex: 'brandName',
            key: 'brandName',
            width: '20%',
            ...getColumnSearchProps('brandName')
        },
        {
            title: 'Mô tả',
            dataIndex: 'brandDescribe',
            key: 'brandDescribe',
            width: '19%',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: '15%',
        },
        {
            title: 'Người tạo',
            dataIndex: 'createdBy',
            key: 'createdBy',
            width: '15%',
        },
        {
            title: 'Trạng thái',
            key: 'deleted',
            dataIndex: 'deleted',
            width: '16%',
            filters: [
                {
                    text: 'Đang hoạt động',
                    value: true,
                },
                {
                    text: 'Ngừng hoạt động',
                    value: false,
                },
            ],
            onFilter: (value, record) => record.deleted.indexOf(value) === 0,

            render: (text) => (
                <span style={getStatusBadgeStyle(text)}>
                    {getStatusText(text)}
                </span>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            width: '10%',
            render: (record) => {
                console.log(record)
                return <Space size="middle">
                    <Button type="text" icon={<FormOutlined style={{ color: 'rgb(214, 103, 12)' }} />} onClick={() => showModal("edit", record)} />
                    <Popconfirm
                        title="Xóa thương hiệu"
                        description="Bạn có chắc chắn xóa thương hiệu này không?"
                        placement="leftTop"
                        // onConfirm
                        // onCancel
                        okText="Đồng ý"
                        cancelText="Hủy bỏ"
                    >
                        <Button type="text" icon={<DeleteOutlined style={{ color: 'red' }} />} />
                    </Popconfirm>

                </Space>
            }

        },
    ];

    return (
        <>
            <h2 style={{ marginBottom: '16px', float: 'left', color: '#2123bf' }}>Danh sách thương hiệu</h2>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal("add")} style={{ marginBottom: '16px', float: 'right', borderRadius: '2px' }} >
                Thêm mới
            </Button>

            <Button type="primary" icon={<RedoOutlined style={{ fontSize: '18px' }} />} style={{ marginBottom: '16px', float: 'right', marginRight: '6px', borderRadius: '4px', }} />

            <Table
                dataSource={brands.map((brand, index) => ({
                    ...brand,
                    key: index + 1,
                    createdAt: FormatDate(brand.createdAt)
                }))}
                loading={loading}
                columns={columns}
                pagination={{
                    defaultPageSize: 5,
                    pageSizeOptions: [5, 10, 15],
                    total: 1000,
                    showSizeChanger: true,
                    onChange: (pageNo, pageSize) => {
                        setPagination({ pageNo, pageSize })
                    },

                }}></Table>
            {open.isModal && <BrandModal isMode={open.isMode} selectedRecord={open.selectedRecord} hideModal={hideModal} isModal={open.isModal} />}
        </>
    )
};
export default Brand;

const BrandModal = ({ isMode, selectedRecord, hideModal, isModal }) => {
    const [form] = Form.useForm();
    const handleOK = () => {
        form.validateFields().then(async () => {
            console.log('t')
            const data = form.getFieldsValue();
            try {
                if (isMode === "add") {
                    // Gọi API để thêm mới
                    await BrandService.create(data);

                } else if (isMode === "edit") {
                    // Gọi API để cập nhật
                    await BrandService.update(selectedRecord.id, data);
                }

                // notification.success({
                //     message: 'Thông báo',
                //     description: 'Sử lý thành công!',
                // });
                // Sau khi thành công, refresh danh sách thương hiệu
                // fetchBrands();
                // Đóng modal
                hideModal();
            } catch (error) {
                // Xử lý lỗi nếu có
                console.error(error);
                // Hiển thị thông báo lỗi
                notification.error({
                    message: 'Lỗi',
                    description: 'Đã có lỗi xảy ra !',
                });
            }
        }).catch(error => {
            console.error(error);
        })

    }
    return (

        <Modal
            title={isMode === "edit" ? "Cập nhật thương hiệu" : "Thêm mới một thương hiệu"}
            open={isModal}
            onOk={handleOK}
            onCancel={hideModal}
            okText={isMode === "edit" ? "Cập nhật" : "Thêm mới"}
            cancelText="Hủy bỏ"
        // style={{ textAlign: 'center' }}
        >
            <Form
                name="wrap"
                labelCol={{ flex: '100px' }}
                labelAlign="left"
                labelWrap
                wrapperCol={{ flex: 1 }}
                colon={false}
                style={{ maxWidth: 600, marginTop: '25px' }}
                form={form}
                initialValues={{ ...selectedRecord }}
            >
                <Form.Item label="Tên:" name="brandName" rules={[{ required: true, message: 'Vui lòng nhập tên thương hiệu!' }]}>
                    <Input placeholder="Nhập tên thương hiệu..." />
                </Form.Item>

                <Form.Item label="Mô tả:" name="brandDescribe" >
                    <TextArea rows={4} placeholder="Nhập mô tả thương hiệu..." />
                </Form.Item>
                <Form.Item label="Trạng thái:" name="deleted" initialValue={true} >
                    <Radio.Group name="radiogroup" style={{ float: 'left' }}>
                        <Radio value={true}>Đang hoạt động</Radio>
                        <Radio value={false}>Ngừng hoạt động</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    );
};

