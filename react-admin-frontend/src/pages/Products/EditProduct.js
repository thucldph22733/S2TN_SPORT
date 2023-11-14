// import axios from 'axios';
// import React, { useCallback, useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Form, Button } from 'react-bootstrap';
// export default function EditProduct() {
//     let navigate = useNavigate();

//     const { id } = useParams();

//     const [product, setProduct] = useState({
//         productName: '',
//         avatar: '',
//         categoryName: '',
//         clubName: '',
//         brandName: '',
//         supplierName: '',
//         productDescribe: '',
//         createBy:'',
//         status: '',
//     });

//     const { productName, avatar, categoryName, clubName, brandName, supplierName, productDescribe,createBy, status } = product;

//     const onInputChange = (e) => {
//         setProduct({ ...product, [e.target.name]: e.target.value });
//     };

//     const loadProduct = useCallback(async () => {
//         const result = await axios.get(`http://localhost:8080/api/product/getAll/${id}`);
//         setProduct(result.data);
//     }, [id]);

//     const onsubmit = async (e) => {
//         e.preventDefault();
//         await axios.put(`http://localhost:8080/api/product/update?id=${id}`, product);
//         navigate('/Product');
//     };

//     useEffect(() => {
//         loadProduct();
//     }, [loadProduct]);

//     return (
//         <div className="">
//             <div className="row">
//                 <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
//                     <h2 className="text-center m-4">Edit Product</h2>
//                     <form onSubmit={(e) => onsubmit(e)}>
//                         <div className="mb-3">
//                             <label htmlFor="productName" className="form-label">
//                                 Tên sản phẩm
//                             </label>
//                             <input
//                                 type={'text'}
//                                 className="form-control"
//                                 placeholder="Enter your Product name"
//                                 name="productName"
//                                 value={productName}
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
//                             <label htmlFor="categoryName" className="form-label">
//                                 Loại sản phẩm
//                             </label>
//                             <input
//                                 type={'text'}
//                                 className="form-control"
//                                 placeholder="Enter category name?"
//                                 name="categoryName"
//                                 value={categoryName}
//                                 onChange={(e) => onInputChange(e)}
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="clubName" className="form-label">
//                                 Câu lạc bộ
//                             </label>
//                             <input
//                                 type={'text'}
//                                 className="form-control"
//                                 placeholder="Enter club name?"
//                                 name="clubName"
//                                 value={clubName}
//                                 onChange={(e) => onInputChange(e)}
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="brandName" className="form-label">
//                                 Thương hiệu
//                             </label>
//                             <input
//                                 type={'text'}
//                                 className="form-control"
//                                 placeholder="Enter brand name?"
//                                 name="brandName"
//                                 value={brandName}
//                                 onChange={(e) => onInputChange(e)}
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="supplierName" className="form-label">
//                                 Nhà cung cấp
//                             </label>
//                             <input
//                                 type={'text'}
//                                 className="form-control"
//                                 placeholder="Enter supplier name?"
//                                 name="supplierName"
//                                 value={supplierName}
//                                 onChange={(e) => onInputChange(e)}
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="productDescribe" className="form-label">
//                                 Mô tả
//                             </label>
//                             <input
//                                 type={'text'}
//                                 className="form-control"
//                                 placeholder="Enter Describe?"
//                                 name="productDescribe"
//                                 value={productDescribe}
//                                 onChange={(e) => onInputChange(e)}
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="createBy" className="form-label">
//                                 Người tạo
//                             </label>
//                             <input
//                                 type={'text'}
//                                 className="form-control"
//                                 placeholder="Enter create name?"
//                                 name="createBy"
//                                 value={createBy}
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
