import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
export const storage = getStorage(app);

// Enable Offline Persistence
enableIndexedDbPersistence(db).catch((err) => {
    if (err.code == 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled in one tab at a a time.
        console.warn('Persistence failed: Multiple tabs open');
    } else if (err.code == 'unimplemented') {
        // The current browser does not support all of the features required to enable persistence
        console.warn('Persistence not supported by browser');
    }
});
