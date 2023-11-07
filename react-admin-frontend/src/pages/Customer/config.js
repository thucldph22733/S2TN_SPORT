// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
    apiKey: 'AIzaSyDlHuirzRpC7XKZhE_iB7Ab4Mw5ynU6TXA',
    authDomain: 'imageuploadtodatabase-d2f78.firebaseapp.com',
    projectId: 'imageuploadtodatabase-d2f78',
    storageBucket: 'imageuploadtodatabase-d2f78.appspot.com',
    messagingSenderId: '53456357292',
    appId: '1:53456357292:web:78e18aad67f5f462e11c09',
    measurementId: 'G-FWFXR3J1C6',
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export { storage, firebaseApp };
