// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Form, Button } from 'react-bootstrap';

// export default function AddProduct() {
//   const navigate = useNavigate();

//   const [product, setProduct] = useState({
//     productName: '',
//     avatar: null, // Thay mảng thành tệp ảnh đơn
//     categoryName: '',
//     clubName: '',
//     brandName: '',
//     supplierName: '',
//     productDescribe: '',
//     createBy: '',
//     status: '',
//   });

//   const onInputChange = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };

//   const onFileChange = (e) => {
//     const file = e.target.files[0]; // Chỉ chấp nhận một tệp ảnh
//     setProduct({ ...product, avatar: file });
//   };

//   const onsubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();

//     formData.append('productName', product.productName);
//     formData.append('avatar', product.avatar);
//     formData.append('categoryName', product.categoryName);
//     formData.append('clubName', product.clubName);
//     formData.append('brandName', product.brandName);
//     formData.append('supplierName', product.supplierName);
//     formData.append('productDescribe', product.productDescribe);
//     formData.append('createBy', product.createBy);
//     formData.append('status', product.status);

//     try {
//       const response = await fetch('http://localhost:8080/api/product/create', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log(data);
//         navigate('/Product');
//       } else {
//         console.error('Error:', response.status);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
//           <h2 className="text-center m-4">Add Product</h2>
//           <form onSubmit={onsubmit} encType="multipart/form-data">
//             <div className="mb-3">
//               <label htmlFor="productName" className="form-label">
//                 Product Name
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Enter your first name"
//                 name="productName"
//                 value={product.productName}
//                 onChange={onInputChange}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="avatar" className="form-label">
//                 Avatar
//               </label>
//               <input type="file" className="form-control" name="avatar" onChange={onFileChange} />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="categoryName" className="form-label">
//                 Category Name
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Enter category name"
//                 name="categoryName"
//                 value={product.categoryName}
//                 onChange={onInputChange}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="clubName" className="form-label">
//                 Club Name
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Enter your email"
//                 name="clubName"
//                 value={product.clubName}
//                 onChange={onInputChange}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="brandName" className="form-label">
//                 Thương hiệu
//               </label>
//               <input
//                 type={'text'}
//                 className="form-control"
//                 placeholder="Enter brand name?"
//                 name="brandName"
//                 value={product.brandName}
//                 onChange={(e) => onInputChange(e)}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="supplierName" className="form-label">
//                 Nhà cung cấp
//               </label>
//               <input
//                 type={'text'}
//                 className="form-control"
//                 placeholder="Enter supplier name?"
//                 name="supplierName"
//                 value={product.supplierName}
//                 onChange={(e) => onInputChange(e)}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="productDescribe" className="form-label">
//                 Mô tả
//               </label>
//               <input
//                 type={'text'}
//                 className="form-control"
//                 placeholder="Enter Describe?"
//                 name="productDescribe"
//                 value={product.productDescribe}
//                 onChange={(e) => onInputChange(e)}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="createBy" className="form-label">
//                 Người tạo
//               </label>
//               <input
//                 type={'text'}
//                 className="form-control"
//                 placeholder="Enter create name?"
//                 name="createBy"
//                 value={product.createBy}
//                 onChange={(e) => onInputChange(e)}
//               />
//             </div>
//             <div className="mb-3">
//               <Form.Group>
//                 <Form.Label>Trạng thái</Form.Label>
//                 <Form.Select name="status" value={product.status} onChange={(e) => onInputChange(e)}>
//                   <option value="0">Đang hoạt động</option>
//                   <option value="1">Không hoạt động</option>
//                 </Form.Select>
//               </Form.Group>
//             </div>
//             <button type="submit" className="btn btn-outline-primary">
//               submit
//             </button>
//             <button type="button" className="btn btn-outline-danger mx-2">
//               Cancel
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
