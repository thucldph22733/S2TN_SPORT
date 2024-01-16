import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import firebase from 'firebase/app';
import 'firebase/storage';
import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { imageDB } from '~/config/ConfigFirebase';

const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};
const App = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    
    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    const beforeUpload = async (file) => {
        try {
            const imgRef = ref(imageDB, `files/${uuidv4()}`);
            await uploadBytes(imgRef, file);

            const url = await getDownloadURL(imgRef);
            setFileList((prevFileList) => [
                ...prevFileList,
                {
                    uid: uuidv4(),
                    name: file.name,
                    url: url,
                },
            ]);
            // Trả về false để ngăn chặn Ant Design Upload tiếp tục xử lý
            return false;
        } catch (error) {
            console.error('Error uploading image:', error);
            return Promise.reject(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const imgs = await listAll(ref(imageDB, 'files'));
                const urls = await Promise.all(imgs.items.map(async (val) => getDownloadURL(val)));

                setFileList(
                    urls.map((url, index) => ({
                        uid: uuidv4(),
                        name: `image-${index}.png`,
                        url: url,
                    }))
                );
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        fetchData();
    }, []);

    const handleRemove = async (file) => {
        try {
            const imgRef = ref(imageDB, `files/${file.uid}`);
            await deleteObject(imgRef);

            if (previewOpen && previewImage === file.url) {
                setPreviewOpen(false);
            }
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    return (
        <>
            <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={beforeUpload}
                onRemove={handleRemove}
            >
                {fileList.length >= 8 ? null : (
                    <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                )}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
};

export default App;
