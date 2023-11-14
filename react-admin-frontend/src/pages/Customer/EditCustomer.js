// import axios from 'axios';
// import React, { useCallback, useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Form, Button } from 'react-bootstrap';
// export default function EditCustomer() {
//     let navigate = useNavigate();

//     const { id } = useParams();

//     const [customer, setCustomer] = useState({
//         customerName: '',
//         avatar: '',
//         phoneNumber: '',
//         email: '',
//         gender: '',
//         birthOfDay: '',
//         password: '',
//         status: '',
//     });

//     const { customerName, avatar, phoneNumber, email, gender, birthOfDay, password, status } = customer;

//     const onInputChange = (e) => {
//         setCustomer({ ...customer, [e.target.name]: e.target.value });
//     };

//     const loadCustomer = useCallback(async () => {
//         const result = await axios.get(`http://localhost:8080/api/customers/getAll/${id}`);
//         setCustomer(result.data);
//     }, [id]);

//     const onsubmit = async (e) => {
//         e.preventDefault();
//         await axios.put(`http://localhost:8080/api/customers/update?id=${id}`, customer);
//         navigate('/Customer');
//     };

//     useEffect(() => {
//         loadCustomer();
//     }, [loadCustomer]);

//     return (
//         <div className="">
//             <div className="row">
//                 <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
//                     <h2 className="text-center m-4">Edit Customer</h2>
//                     <form onSubmit={(e) => onsubmit(e)}>
//                         <div className="mb-3">
//                             <label htmlFor="customerName" className="form-label">
//                                 Customer Name
//                             </label>
//                             <input
//                                 type={'text'}
//                                 className="form-control"
//                                 placeholder="Enter your first name"
//                                 name="customerName"
//                                 value={customerName}
//                                 onChange={(e) => onInputChange(e)}
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="avatar" className="form-label">
//                                 Avatar
//                             </label>
//                             <input
//                                 type={'text'}
//                                 className="form-control"
//                                 placeholder="Enter your avatar"
//                                 name="avatar"
//                                 value={avatar}
//                                 onChange={(e) => onInputChange(e)}
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="phoneNumber" className="form-label">
//                                 Phone Number
//                             </label>
//                             <input
//                                 type={'text'}
//                                 className="form-control"
//                                 placeholder="Enter your Phone Number"
//                                 name="phoneNumber"
//                                 value={phoneNumber}
//                                 onChange={(e) => onInputChange(e)}
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="email" className="form-label">
//                                 email
//                             </label>
//                             <input
//                                 type={'text'}
//                                 className="form-control"
//                                 placeholder="Enter your email"
//                                 name="email"
//                                 value={email}
//                                 onChange={(e) => onInputChange(e)}
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="password" className="form-label">
//                                 password
//                             </label>
//                             <input
//                                 type={'text'}
//                                 className="form-control"
//                                 placeholder="Enter your password"
//                                 name="password"
//                                 value={password}
//                                 onChange={(e) => onInputChange(e)}
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <Form.Group>
//                                 <Form.Label>Giới tính</Form.Label>
//                                 <Form.Select name="gender" value={gender} onChange={(e) => onInputChange(e)}>
//                                     <option value="true">Nam</option>
//                                     <option value="false">Nữ</option>
//                                 </Form.Select>
//                             </Form.Group>
//                         </div>

//                         <div className="mb-3">
//                             <label htmlFor="birthOfDay" className="form-label">
//                                 BirthOfDate
//                             </label>
//                             <input
//                                 type={'date'}
//                                 className="form-control"
//                                 placeholder="Enter your birthOfDay"
//                                 name="birthOfDay"
//                                 value={birthOfDay}
//                                 onChange={(e) => onInputChange(e)}
//                             />
//                         </div>

//                         <div className="mb-3">
//                             <Form.Group>
//                                 <Form.Label>Trạng thái</Form.Label>
//                                 <Form.Select name="status" value={status} onChange={(e) => onInputChange(e)}>
//                                     <option value="0">Đang hoạt động</option>
//                                     <option value="1">Không hoạt động</option>
//                                 </Form.Select>
//                             </Form.Group>
//                         </div>
//                         <button type="submit" className="btn btn-outline-primary">
//                             submit
//                         </button>
//                         <button type="button" className="btn btn-outline-danger mx-2">
//                             Cancel
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }
