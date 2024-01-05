import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'antd/dist/reset.css';
import { ConfigProvider } from 'antd';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#5a76f3',
                    borderRadius: 0,
                },
            }}
        >
            <App />
        </ConfigProvider>
    </React.StrictMode>,
);
