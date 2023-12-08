// import { faPlus, faShop, faTruckFast } from '@fortawesome/free-solid-svg-icons';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Space, Table, Tabs, Tag, theme } from 'antd';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { FaEye } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import path_name from '~/constants/routers';
// const onChange = (key) => {
//     console.log(key);
// };

// const itemStyle = {
//     paddingRight: '30px', // Thay đổi khoảng cách tại đây
// };
// const columnGetAllOrder = [
//     {
//         title: '#',
//         dataIndex: 'index',
//         width: 50,
//         render: (text, record, index) => index + 1, // Hiển thị STT bắt đầu từ 1
//     },
//     {
//         title: 'Mã',
//         dataIndex: 'id',
//         key: 'id',
//         render: (text) => <a>HD{text}</a>,
//     },
//     {
//         title: 'Khách hàng',
//         dataIndex: 'customerName',
//         key: 'customerName',
//     },
//     {
//         title: 'SDT',
//         dataIndex: 'phoneNumber',
//         key: 'phoneNumber',
//     },
//     {
//         title: 'Tổng tiền',
//         dataIndex: 'orderTotal',
//         key: 'orderTotal',
//     },
//     {
//         title: 'Loại đơn hàng',
//         dataIndex: 'categoryOrder',
//         key: 'categoryOrder',
//         render: (text, record) => {
//             let backgroundColor, textColor, icon;

//             switch (record.categoryOrder) {
//                 case 'Tại quầy':
//                     backgroundColor = '#7af57e';
//                     textColor = 'white';
//                     icon = faShop;
//                     break;
//                 case 'Đơn mới':
//                     backgroundColor = '#42baff';
//                     textColor = 'white';
//                     icon = faPlus;
//                     break;
//                 case 'Trạng thái khác':
//                     backgroundColor = 'blue';
//                     break;
//                 default:
//                     // backgroundColor = 'gray';
//                     break;
//             }

//             return (
//                 <span style={{ backgroundColor, color: textColor, padding: '5px', borderRadius: '4px' }}>
//                     {icon && <FontAwesomeIcon icon={icon} style={{ marginRight: '5px' }} />}
//                     {text}
//                 </span>
//             );
//         },
//     },
//     {
//         title: 'Ngày tạo',
//         dataIndex: 'orderDate',
//         key: 'orderDate',
//     },
//     // {
//     //     title: 'Tags',
//     //     key: 'tags',
//     //     dataIndex: 'tags',
//     //     render: (_, { tags }) => (
//     //         <>
//     //             {tags.map((tag) => {
//     //                 let color = tag.length > 5 ? 'geekblue' : 'green';
//     //                 if (tag === 'loser') {
//     //                     color = 'volcano';
//     //                 }
//     //                 return (
//     //                     <Tag color={color} key={tag}>
//     //                         {tag.toUpperCase()}
//     //                     </Tag>
//     //                 );
//     //             })}
//     //         </>
//     //     ),
//     // },
//     {
//         title: <div style={{ textAlign: 'center' }}>Hành động</div>,
//         key: 'action',
//         render: (record) => (
//             <div style={{ textAlign: 'center' }}>
//                 <Link to={`${path_name.orderView}/${record.id}`} className="btn btn-outline-warning">
//                     <FaEye />
//                 </Link>
//             </div>
//         ),
//     },
// ];

// function Order() {
//     const {
//         token: { colorBgContainer },
//     } = theme.useToken();
//     const [order, setOrder] = useState('');
//     useEffect(() => {
//         loadOrder();
//     }, []);
//     const creatTabContent = () => (
//         <div>
//             <Table columns={columnGetAllOrder} dataSource={order} />
//         </div>
//     );
//     const items = [
//         {
//             key: '1',
//             label: 'Tất cả',
//             children: creatTabContent(),
//         },
//         {
//             key: '2',
//             label: 'Chờ xác nhận',
//             children: 'Content of Tab Pane 2',
//         },
//         {
//             key: '3',
//             label: 'Chờ giao',
//             children: 'Content of Tab Pane 3',
//         },
//         {
//             key: '4',
//             label: 'Đang giao',
//             children: 'Content of Tab Pane 3',
//         },
//         {
//             key: '5',
//             label: 'Hoàn thành',
//             children: 'Content of Tab Pane 3',
//         },
//         {
//             key: '6',
//             label: 'Hủy',
//             children: 'Content of Tab Pane 3',
//         },
//         {
//             key: '7',
//             label: 'Chờ thanh toán',
//             children: 'Content of Tab Pane 3',
//         },
//     ];
//     const loadOrder = async () => {
//         const result = await axios.get('http://localhost:8080/api/v1/orders/getAll');
//         setOrder(result.data);
//     };

//     return (
//         <div
//             style={{
//                 margin: '10px 10px',
//                 padding: 14,
//                 minHeight: 280,
//                 background: colorBgContainer,
//             }}
//         >
//             <label>Danh sách hóa đơn</label>
//             <div style={{ borderBottomColor: 'GrayText' }}>
//                 <Tabs defaultActiveKey="1" items={items} onChange={onChange} itemStyle={itemStyle} />
//             </div>
//         </div>
//     );
// }

// export default Order;

import React from 'react'

function Order() {
    return (
        <div>Order</div>
    )
}

export default Order