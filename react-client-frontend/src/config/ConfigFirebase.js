import { initializeApp } from "firebase/app";
import{getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyCRI84iA8h3T5R8Nh8BKNL6WNJ0w8pexeE",
  authDomain: "imageuploaddb-efb38.firebaseapp.com",
  projectId: "imageuploaddb-efb38",
  storageBucket: "imageuploaddb-efb38.appspot.com",
  messagingSenderId: "749154967680",
  appId: "1:749154967680:web:05ef842a444fbb5076c665"
};

const app = initializeApp(firebaseConfig);
export const imageDB= getStorage(app);