// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBo02GNXlpAQ6YLcBZWYjCivPs1qVRTvWQ",
  authDomain: "weatherapp-95f79.firebaseapp.com",
  projectId: "weatherapp-95f79",
  storageBucket: "weatherapp-95f79.firebasestorage.app",
  messagingSenderId: "794203348858",
  appId: "1:794203348858:web:32f19a5496c02c456500c3",
  measurementId: "G-6G7W7M5CZN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export default app;