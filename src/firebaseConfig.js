import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBgsjalPZxVFryWpW43pgjH-o3knnNT7-g",
  authDomain: "test-5c5e6.firebaseapp.com",
  projectId: "test-5c5e6",
  storageBucket: "test-5c5e6.firebasestorage.app",
  messagingSenderId: "26128295922",
  appId: "1:26128295922:web:73468d2f73053960986d6b",
  measurementId: "G-ZRZ6XLTYRV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);

export { auth };
