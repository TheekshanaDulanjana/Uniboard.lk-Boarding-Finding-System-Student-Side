import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "uniboard-7aecc.firebaseapp.com",
  projectId: "uniboard-7aecc",
  storageBucket: "uniboard-7aecc.appspot.com",
  messagingSenderId: "443737852031",
  appId: "1:443737852031:web:c6a4e6a7a6b9f48cabd74a"
};

export const app = initializeApp(firebaseConfig);