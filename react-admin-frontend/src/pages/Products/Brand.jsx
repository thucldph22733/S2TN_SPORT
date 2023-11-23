import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Table, Space, Button, Input, Form, Modal, notification, Radio, Popconfirm } from 'antd';
import {
    PlusOutlined,
    RedoOutlined,
    FormOutlined,
    DeleteOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import './Product.css'
import BrandService from '~/service/BrandService';
import FormatDate from '~/utils/format-date';

const { TextArea } = Input;

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

    const [filteredStatus, setFilteredStatus] = useState(null);

    // const handleStatusFilterChange = (value) => {
    //     setFilteredStatus(value);
    // };

    const [searchText, setSearchText] = useState(null);

    const [brands, setBrands] = useState([]);

    const [totalCount, setTotalCount] = useState(1);

    const [pagination, setPagination] = useState({ pageNo: 1, pageSize: 5 });

    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState({ isModal: false, isMode: '', reacord: null });

    const showModal = (mode, record) => {
        setOpen({
            isModal: true,
            isMode: mode,
            reacord: record,
        });
    };

    const hideModal = () => {
        setOpen({ isModal: false });
    };

    useEffect(() => {
        fetchBrands();
    }, [pagination]);

    const fetchBrands = async () => {
        setLoading(true);

        await BrandService.getAll(pagination.pageNo - 1, pagination.pageSize, searchText, filteredStatus)
            .then(response => {

                setBrands(response.data.data);

                setTotalCount(response.data.totalCount);

                setLoading(false);

            }).catch(error => {
                console.error(error);
            })
    }

    const handleDelete = async (id) => {

        await BrandService.delete(id).then(response => {
            console.log(response.data);
            notification.success({
                message: 'Thông báo',
                description: 'Xóa thành công!',
            });
            fetchBrands();
        }).catch(error => {
            console.error(error);
            notification.error({
                message: 'Thông báo',
                description: 'Xóa thất bại!',
            });
        });

    };

    const handleResetPage = () => {
        setSearchText(null);
        setFilteredStatus(null);
        setPagination({ pageNo: 1, pageSize: 5 });
        fetchBrands();
    };

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
        filterDropdown: ({ setSelectedKeys, selectedKeys, clearFilters, close }) => (
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
                    onPressEnter={() => handleSearch(selectedKeys, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, dataIndex)}
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
            onFilter: (value, record) => record.address.indexOf(value) === 0,
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

                return <Space size="middle">
                    <Button type="text"
                        icon={<FormOutlined style={{ color: 'rgb(214, 103, 12)' }} />}
                        onClick={() => showModal("edit", record)} />
                    {record.deleted && <Popconfirm
                        title="Xóa thương hiệu"
                        description="Bạn có chắc chắn xóa thương hiệu này không?"
                        placement="leftTop"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Đồng ý"
                        cancelText="Hủy bỏ"
                    >
                        <Button type="text" icon={<DeleteOutlined />} style={{ color: 'red' }} />
                    </Popconfirm>}

                </Space>
            }

        },
    ];

    return (
        <>
            <h2 style={{ marginBottom: '16px', float: 'left', color: '#2123bf' }}>Danh sách thương hiệu</h2>

            <Button type="primary"
                icon={<PlusOutlined />}
                onClick={() => showModal("add")}
                style={{ marginBottom: '16px', float: 'right', borderRadius: '2px' }} >
                Thêm mới
            </Button>

            <Button type="primary"
                icon={<RedoOutlined style={{ fontSize: '18px' }} />}
                style={{ marginBottom: '16px', float: 'right', marginRight: '6px', borderRadius: '4px', }}
                onClick={handleResetPage}
            />

            <Table
                dataSource={brands.map((brand, index) => ({
                    ...brand,
                    key: index + 1,
                    createdAt: FormatDate(brand.createdAt)
                }))}
                onChange={(_, filter) => {
                    console.log(filter)
                }}

                loading={loading}
                columns={columns}
                pagination={{
                    defaultPageSize: 5,
                    pageSizeOptions: ['5', '10', '15'],
                    total: totalCount,
                    showSizeChanger: true,
                    onChange: (pageNo, pageSize) => {
                        setPagination({ pageNo, pageSize })
                    },

                }}></Table >

            {open.isModal && <BrandModal
                isMode={open.isMode}
                reacord={open.reacord}
                hideModal={hideModal}
                isModal={open.isModal}
                fetchBrands={fetchBrands} />}
        </>
    )
};
export default Brand;


const BrandModal = ({ isMode, reacord, hideModal, isModal, fetchBrands }) => {

    const [form] = Form.useForm();

    const handleCreate = () => {
        form.validateFields().then(async () => {

            const data = form.getFieldsValue();

            await BrandService.create(data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Thêm mới thành công!',
                    });
                    fetchBrands();
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

            const data = form.getFieldsValue();

            await BrandService.update(reacord.id, data)
                .then(() => {
                    notification.success({
                        message: 'Thông báo',
                        description: 'Cập nhật thành công!',
                    });
                    fetchBrands();
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
            title={isMode === "edit" ? "Cập nhật thương hiệu" : "Thêm mới một thương hiệu"}
            open={isModal}
            onOk={isMode === "edit" ? handleUpdate : handleCreate}
            onCancel={hideModal}
            okText={isMode === "edit" ? "Cập nhật" : "Thêm mới"}
            cancelText="Hủy bỏ"
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
                initialValues={{ ...reacord }}
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

