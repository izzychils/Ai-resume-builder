// src/lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9QtyiVRUfy_pecBEubqyp35D9u_R9nTU",
  authDomain: "authentication-for-gide.firebaseapp.com",
  projectId: "authentication-for-gide",
  storageBucket: "authentication-for-gide.firebasestorage.app",
  messagingSenderId: "594248581269",
  appId: "1:594248581269:web:f600da262efb8567a7db9c",
  measurementId: "G-SNZ4VE5Z5X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Analytics (optional)
export const analytics = getAnalytics(app);

export default app;