"use client";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// Note: These values are loaded from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDqQcJzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "new-dawn-tribe.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "new-dawn-tribe",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "new-dawn-tribe.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Add error handling for Firebase operations
export const handleFirebaseError = (error: any) => {
  console.error('Firebase Error:', error);

  if (error.code === 'permission-denied') {
    console.error('Permission denied - check your Firebase security rules');
    return 'Permission denied - please check your Firebase configuration';
  }

  if (error.code === 'unauthenticated') {
    console.error('User not authenticated');
    return 'Please log in to perform this action';
  }

  if (error.code === 'network-request-failed') {
    console.error('Network request failed');
    return 'Network error - please check your internet connection';
  }

  if (error.code === 'invalid-api-key') {
    console.error('Invalid Firebase API key');
    return 'Invalid Firebase configuration - please check your API key';
  }

  return error.message || 'An error occurred with Firebase';
};

export default app;