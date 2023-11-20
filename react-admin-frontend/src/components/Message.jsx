import React, { useContext } from 'react';
import { notification } from 'antd';
// import Context from './YourContext'; // Import your context file

const Message = () => {
    const { name, notificationType, openNotification } = useContext(Context);

    const getMessageConfig = () => {
        const baseConfig = {
            message: 'Thông báo',
            placement: 'topRight',
        };

        if (notificationType === 'success') {
            return {
                ...baseConfig,
                description: `${name} thành công!`,
            };
        } else if (notificationType === 'error') {
            return {
                ...baseConfig,
                description: `${name} thất bại!`,
            };
        }

        return null;
    };

    const messageConfig = getMessageConfig();

    if (messageConfig) {
        notification[notificationType](messageConfig);
    }

    return null;
};

export default Message;