// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import exp from "constants";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjs1Kf4S6XhPzeLex1FKCiuuKTDIAnU6s",
  authDomain: "netflix-gpt-5b3cc.firebaseapp.com",
  projectId: "netflix-gpt-5b3cc",
  storageBucket: "netflix-gpt-5b3cc.firebasestorage.app",
  messagingSenderId: "1068199159366",
  appId: "1:1068199159366:web:edd0873a6a7aeb76cf8c47",
  measurementId: "G-J8VL4JP2KR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();