
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA21UXzLnLTEBHufPwTAu6EsC3J823wTIY",
    authDomain: "fbhelpdesk-cded1.firebaseapp.com",
    projectId: "fbhelpdesk-cded1",
    storageBucket: "fbhelpdesk-cded1.appspot.com",
    messagingSenderId: "249038783220",
    appId: "1:249038783220:web:1c61ef86c303a200f194a1",
    measurementId: "G-X6GFEZ5DQX"
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore();
const auth = getAuth();

export default app
export { db, auth } 