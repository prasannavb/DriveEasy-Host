import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBKtbRDK1iEWcHBTQBCqP3UmVEADmUeLkc",
  authDomain: "car-rental-seller-f4210.firebaseapp.com",
  projectId: "car-rental-seller-f4210",
  storageBucket: "car-rental-seller-f4210.appspot.com",
  messagingSenderId: "473620828003",
  appId: "1:473620828003:web:58939c96a5e3ab77094d56",
  measurementId: "G-92VKQREMPV"
};

const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)
const auth=getAuth(app)

export default auth;