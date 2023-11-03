import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddCustomer() {
    const navigate = useNavigate();

    const [customer, setCustomer] = useState({
        customerName: '',
        avatar: null, // Thay mảng thành tệp ảnh đơn
        phoneNumber: '',
        email: '',
        gender: true,
        birthOfDay: '',
        password: '',
        status: '',
    });

    const onInputChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const onFileChange = (e) => {
        const file = e.target.files[0]; // Chỉ chấp nhận một tệp ảnh
        setCustomer({ ...customer, avatar: file });
    };

    const onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('customerName', customer.customerName);
        formData.append('avatar', customer.avatar);
        formData.append('phoneNumber', customer.phoneNumber);
        formData.append('email', customer.email);
        formData.append('gender', customer.gender);
        formData.append('birthOfDay', customer.birthOfDay);
        formData.append('password', customer.password);

        try {
            const response = await fetch('http://localhost:8080/api/customers/create-customer', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                navigate('/Customer');
            } else {
                console.error('Error:', response.status);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Register Customer</h2>
                    <form onSubmit={onsubmit} encType="multipart/form-data">
                        <div className="mb-3">
                            <label htmlFor="customerName" className="form-label">
                                Customer Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your first name"
                                name="customerName"
                                value={customer.customerName}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="avatar" className="form-label">
                                Avatar
                            </label>
                            <input type="file" className="form-control" name="avatar" onChange={onFileChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">
                                Number Phone
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your number phone"
                                name="phoneNumber"
                                value={customer.phoneNumber}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your email"
                                name="email"
                                value={customer.email}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="birthOfDay" className="form-label">
                                Birth Of Day
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                placeholder="Enter your birth of day"
                                name="birthOfDay"
                                value={customer.birthOfDay}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                name="password"
                                value={customer.password}
                                onChange={onInputChange}
                            />
                        </div>

                        <button type="submit" className="btn btn-outline-primary">
                            submit
                        </button>
                        <button type="button" className="btn btn-outline-danger mx-2">
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
