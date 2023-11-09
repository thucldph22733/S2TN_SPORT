import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddAddress() {
    let navigate = useNavigate();

    const [address, setAddress] = useState({
        recipientName: '',
        phoneNumber: '',
        addressDetail: '',
        region: '',
        city: '',
        country: '',
    });

    const { recipientName, phoneNumber, addressDetail, region, city, country } = address;

    const onInputChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const onsubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8080/api/create-address', address);
        navigate('/Address');
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Register Address</h2>
                    <form onSubmit={(e) => onsubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="recipientName" className="form-label">
                                Recipient Name
                            </label>
                            <input
                                type={'text'}
                                className="form-control"
                                placeholder="Enter your ecipient name"
                                name="recipientName"
                                value={recipientName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">
                                Phone Number
                            </label>
                            <input
                                type={'text'}
                                className="form-control"
                                placeholder="Enter your phone number"
                                name="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="addressDetail" className="form-label">
                                Address Detail
                            </label>
                            <input
                                type={'text'}
                                className="form-control"
                                placeholder="Enter your Phone Number"
                                name="addressDetail"
                                value={addressDetail}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="region" className="form-label">
                                region
                            </label>
                            <input
                                type={'text'}
                                className="form-control"
                                placeholder="Enter your region"
                                name="region"
                                value={region}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">
                                city
                            </label>
                            <input
                                type={'text'}
                                className="form-control"
                                placeholder="Enter your city"
                                name="city"
                                value={city}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="country" className="form-label">
                                country
                            </label>
                            <input
                                type={'text'}
                                className="form-control"
                                placeholder="Enter your country"
                                name="country"
                                value={country}
                                onChange={(e) => onInputChange(e)}
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
