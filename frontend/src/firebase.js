import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBm6tGJyWsPEt0eB8CVDnoGhFOX1VDOaoU",
    authDomain: "cryptique-backend.firebaseapp.com",
    projectId: "cryptique-backend",
    storageBucket: "cryptique-backend.firebasestorage.app",
    messagingSenderId: "318037903312",
    appId: "1:318037903312:web:e48f8e6a10f27632369bd5"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };