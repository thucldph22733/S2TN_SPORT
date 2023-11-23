import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom'
import path_name from '~/constants/routers';
const Error500 = () => (
    <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={<Button type="primary">
            <Link to={path_name.dashboard}>Back Home</Link>
        </Button>}
    />
);
export default Error500;