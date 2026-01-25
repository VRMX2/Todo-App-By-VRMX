import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBG4YsTuzXDJFNWe7Ebu8ImhTWvu1qWVuA",
    authDomain: "taskflow-vrmx-khadmoney.firebaseapp.com",
    projectId: "taskflow-vrmx-khadmoney",
    storageBucket: "taskflow-vrmx-khadmoney.firebasestorage.app",
    messagingSenderId: "673568631808",
    appId: "1:673568631808:web:63c0020467565d3c747ce5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
