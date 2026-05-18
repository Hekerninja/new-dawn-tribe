"use client";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// Note: These values are loaded from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Add error handling for Firebase operations
export const handleFirebaseError = (error: any): string => {
  if (error.code === 'permission-denied') return 'Permission denied.';
  if (error.code === 'unauthenticated') return 'Please log in to perform this action.';
  if (error.code === 'network-request-failed') return 'Network error — please check your connection.';
  if (error.code === 'invalid-api-key') return 'Service configuration error.';
  return 'An unexpected error occurred. Please try again.';
};

export default app;