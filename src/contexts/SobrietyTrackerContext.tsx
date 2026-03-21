"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  where,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { showSuccess, showError } from '@/utils/toast';

interface UserData {
  id: string;
  name: string;
  email: string;
  startDate: Date;
  streak: number;
  lastUpdate: Date;
  isAdmin?: boolean;
}

interface SobrietyTrackerContextType {
  currentUser: UserData | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  leaderboard: UserData[];
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetProgress: () => Promise<void>;
  refreshLeaderboard: () => Promise<void>;
  deleteAccount: (userId: string) => Promise<void>;
  updateAdminStatus: (userId: string, isAdmin: boolean) => Promise<void>;
}

const SobrietyTrackerContext = createContext<SobrietyTrackerContextType | undefined>(undefined);

export const useSobrietyTracker = () => {
  const context = useContext(SobrietyTrackerContext);
  if (context === undefined) {
    throw new Error('useSobrietyTracker must be used within a SobrietyTrackerProvider');
  }
  return context;
};

export const SobrietyTrackerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState<UserData[]>([]);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        try {
          // Fetch user data from Firestore
          const q = query(collection(db, "users"), where("email", "==", user.email));
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            const userDocId = querySnapshot.docs[0].id;
            
            const formattedUser: UserData = {
              id: userDocId,
              name: userData.name,
              email: userData.email,
              startDate: userData.startDate.toDate(),
              streak: userData.streak,
              lastUpdate: userData.lastUpdate.toDate(),
              isAdmin: userData.isAdmin || false
            };
            
            setCurrentUser(formattedUser);
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          showError("Error loading user data");
        }
      } else {
        // User is signed out
        setCurrentUser(null);
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Refresh leaderboard
  const refreshLeaderboard = async () => {
    try {
      const q = query(collection(db, "users"), orderBy("streak", "desc"));
      const querySnapshot = await getDocs(q);
      
      const users: UserData[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        users.push({
          id: doc.id,
          name: data.name,
          email: data.email,
          startDate: data.startDate.toDate(),
          streak: data.streak,
          lastUpdate: data.lastUpdate.toDate(),
          isAdmin: data.isAdmin || false
        });
      });
      
      setLeaderboard(users);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      showError("Error loading leaderboard");
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showSuccess("Logged in successfully!");
    } catch (error: any) {
      console.error("Login error:", error);
      showError(error.message || "Failed to log in");
      throw error;
    }
  };

  // Signup function
  const signup = async (name: string, email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Add user to Firestore
      const now = new Date();
      await addDoc(collection(db, "users"), {
        name,
        email,
        startDate: now,
        streak: 0,
        lastUpdate: now,
        isAdmin: false
      });
      
      showSuccess("Account created successfully!");
    } catch (error: any) {
      console.error("Signup error:", error);
      showError(error.message || "Failed to create account");
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      showSuccess("Logged out successfully!");
    } catch (error: any) {
      console.error("Logout error:", error);
      showError(error.message || "Failed to log out");
      throw error;
    }
  };

  // Reset progress function
  const resetProgress = async () => {
    if (!currentUser) return;
    
    try {
      const now = new Date();
      const userRef = doc(db, "users", currentUser.id);
      await updateDoc(userRef, {
        startDate: now,
        streak: 0,
        lastUpdate: now
      });
      
      setCurrentUser({
        ...currentUser,
        startDate: now,
        streak: 0,
        lastUpdate: now
      });
      
      showSuccess("Progress reset successfully!");
    } catch (error: any) {
      console.error("Reset progress error:", error);
      showError(error.message || "Failed to reset progress");
      throw error;
    }
  };

  // Delete user account
  const deleteAccount = async (userId: string) => {
    try {
      // Delete user document from Firestore
      await deleteDoc(doc(db, "users", userId));
      showSuccess("Account deleted successfully!");
    } catch (error: any) {
      console.error("Delete account error:", error);
      showError(error.message || "Failed to delete account");
      throw error;
    }
  };

  // Update admin status
  const updateAdminStatus = async (userId: string, isAdmin: boolean) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        isAdmin
      });
      showSuccess(`User admin status updated to ${isAdmin ? 'admin' : 'user'}!`);
      await refreshLeaderboard();
    } catch (error: any) {
      console.error("Update admin status error:", error);
      showError(error.message || "Failed to update admin status");
      throw error;
    }
  };

  const value = {
    currentUser,
    isLoggedIn,
    isLoading,
    leaderboard,
    login,
    signup,
    logout,
    resetProgress,
    refreshLeaderboard,
    deleteAccount,
    updateAdminStatus
  };

  return (
    <SobrietyTrackerContext.Provider value={value}>
      {children}
    </SobrietyTrackerContext.Provider>
  );
};