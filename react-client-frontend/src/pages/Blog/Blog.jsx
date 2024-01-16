import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import path_name from '~/core/constants/routers';
const Blog = () => (
    <Result
        status="warning"
        title="Trang này đang trong quá trình phát triển!!!"
        extra={
            <Link to={path_name.home}>
                <Button type="primary" key="console">
                    Quay về trang chủ
                </Button>
            </Link>
        }
    />
)

export default Blog