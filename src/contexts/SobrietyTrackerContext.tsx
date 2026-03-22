"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, orderBy, where, doc, updateDoc, onSnapshot, serverTimestamp, deleteDoc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, handleFirebaseError } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { showSuccess, showError } from '@/utils/toast';
import { initializeDatabase } from '@/lib/initFirebase';

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
  checkDatabaseStatus: () => Promise<boolean>;
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
  const [isDatabaseReady, setIsDatabaseReady] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // Initialize database on first load
  useEffect(() => {
    const initDb = async () => {
      try {
        const dbReady = await initializeDatabase();
        setIsDatabaseReady(dbReady);
      } catch (error) {
        console.error('Database initialization failed:', error);
        const errorMessage = handleFirebaseError(error);
        console.error('Firebase Error:', errorMessage);
        setIsDatabaseReady(false);
      }
    };
    initDb();
  }, []);

  // Helper function to safely convert Firebase timestamp to Date
  const convertFirebaseTimestamp = (timestamp: any): Date => {
    if (timestamp && typeof timestamp === 'object') {
      if (timestamp.seconds && timestamp.nanoseconds) {
        // This is a Firebase Timestamp object
        return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
      }
      if (timestamp.toDate) {
        // This is a Firebase Timestamp with toDate method
        return timestamp.toDate();
      }
    }
    // If it's not a valid timestamp, return current date
    return new Date();
  };

  // Listen for auth state changes
  useEffect(() => {
    if (!isDatabaseReady) return;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          // User is signed in
          try {
            // Get user document
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
              const userData = userDoc.data();
              // Handle timestamp conversion safely
              const startDate = convertFirebaseTimestamp(userData.startDate);
              const lastUpdate = convertFirebaseTimestamp(userData.lastUpdate);

              const formattedUser: UserData = {
                id: userDoc.id,
                name: userData.name || "User",
                email: userData.email,
                startDate: startDate,
                streak: userData.streak || 0,
                lastUpdate: lastUpdate,
                isAdmin: userData.isAdmin || false,
              };

              setCurrentUser(formattedUser);
              setIsLoggedIn(true);

              // Always refresh leaderboard when user logs in
              await refreshLeaderboard();
            } else {
              // User exists in auth but not in Firestore - create user document
              const now = new Date(); // Use JavaScript Date instead of serverTimestamp
              await setDoc(userDocRef, {
                name: user.displayName || "User",
                email: user.email,
                startDate: now,
                streak: 0,
                lastUpdate: now,
                isAdmin: false,
              });

              // Fetch the newly created user
              const newUserDoc = await getDoc(userDocRef);

              if (newUserDoc.exists()) {
                const newUserData = newUserDoc.data();
                const newFormattedUser: UserData = {
                  id: newUserDoc.id,
                  name: newUserData.name || "User",
                  email: newUserData.email,
                  startDate: convertFirebaseTimestamp(newUserData.startDate),
                  streak: newUserData.streak || 0,
                  lastUpdate: convertFirebaseTimestamp(newUserData.lastUpdate),
                  isAdmin: newUserData.isAdmin || false,
                };

                setCurrentUser(newFormattedUser);
                setIsLoggedIn(true);
                await refreshLeaderboard();
              }
            }
          } catch (permissionError) {
            console.error("Permission error loading user data:", permissionError);
            const errorMessage = handleFirebaseError(permissionError);
            showError(errorMessage);

            // Create a fallback user object for UI consistency
            const fallbackUser: UserData = {
              id: user.uid,
              name: user.displayName || "User",
              email: user.email || "",
              startDate: new Date(),
              streak: 0,
              lastUpdate: new Date(),
              isAdmin: false,
            };

            setCurrentUser(fallbackUser);
            setIsLoggedIn(true);
          }
        } else {
          // User is signed out
          setCurrentUser(null);
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error in auth state change:", error);
        const errorMessage = handleFirebaseError(error);
        showError(errorMessage);
      } finally {
        setAuthChecked(true);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [isDatabaseReady]);

  // Refresh leaderboard
  const refreshLeaderboard = async () => {
    try {
      // Fetch all users for leaderboard
      const q = query(collection(db, "users"), orderBy("streak", "desc"));
      const querySnapshot = await getDocs(q);
      const users: UserData[] = [];

      querySnapshot.forEach((doc) => {
        try {
          const data = doc.data();
          // Handle timestamp conversion safely
          const startDate = convertFirebaseTimestamp(data.startDate);
          const lastUpdate = convertFirebaseTimestamp(data.lastUpdate);

          users.push({
            id: doc.id,
            name: data.name || "User",
            email: data.email,
            startDate: startDate,
            streak: data.streak || 0,
            lastUpdate: lastUpdate,
            isAdmin: data.isAdmin || false,
          });
        } catch (error) {
          console.error("Error processing user document:", error);
          const errorMessage = handleFirebaseError(error);
          console.error('Firebase Error:', errorMessage);
        }
      });

      setLeaderboard(users);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      const errorMessage = handleFirebaseError(error);
      showError(errorMessage);
      // Set empty leaderboard to prevent UI issues
      setLeaderboard([]);
    }
  };

  // Check database connection status
  const checkDatabaseStatus = async () => {
    try {
      // Try to read from test collection to verify connection
      const testQuery = query(collection(db, 'test'), where('test', '==', true));
      await getDocs(testQuery);
      return true;
    } catch (error) {
      console.error('Database connection check failed:', error);
      const errorMessage = handleFirebaseError(error);
      console.error('Firebase Error:', errorMessage);
      return false;
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showSuccess("Logged in successfully!");
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage = handleFirebaseError(error);
      showError(errorMessage);
      throw error;
    }
  };

  // Signup function
  const signup = async (name: string, email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user to Firestore with current date
      const now = new Date();
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        startDate: now,
        streak: 0,
        lastUpdate: now,
        isAdmin: false,
      });

      showSuccess("Account created successfully!");
    } catch (error: any) {
      console.error("Signup error:", error);
      const errorMessage = handleFirebaseError(error);
      showError(errorMessage);
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
      const errorMessage = handleFirebaseError(error);
      showError(errorMessage);
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
        lastUpdate: now,
      });

      setCurrentUser({ ...currentUser, startDate: now, streak: 0, lastUpdate: now });
      showSuccess("Progress reset successfully!");
    } catch (error: any) {
      console.error("Reset progress error:", error);
      const errorMessage = handleFirebaseError(error);
      showError(errorMessage);
      throw error;
    }
  };

  // Delete account function (admin only)
  const deleteAccount = async (userId: string) => {
    try {
      // Check if current user is admin
      if (!currentUser?.isAdmin) {
        showError("You don't have permission to delete accounts");
        return;
      }

      // Delete user document from Firestore
      await deleteDoc(doc(db, "users", userId));

      // Refresh leaderboard after deletion
      await refreshLeaderboard();

      showSuccess("Account deleted successfully!");
    } catch (error: any) {
      console.error("Delete account error:", error);
      const errorMessage = handleFirebaseError(error);
      showError(errorMessage);
      throw error;
    }
  };

  // Update admin status function (admin only)
  const updateAdminStatus = async (userId: string, isAdmin: boolean) => {
    try {
      // Check if current user is admin
      if (!currentUser?.isAdmin) {
        showError("You don't have permission to change admin status");
        return;
      }

      // Update admin status in Firestore
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        isAdmin: isAdmin,
      });

      // Refresh leaderboard after update
      await refreshLeaderboard();

      showSuccess(`Admin status updated successfully!`);
    } catch (error: any) {
      console.error("Update admin status error:", error);
      const errorMessage = handleFirebaseError(error);
      showError(errorMessage);
      throw error;
    }
  };

  // Set loading to false if database is ready but auth hasn't been checked yet
  useEffect(() => {
    if (isDatabaseReady && !authChecked) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 5000); // Timeout after 5 seconds to prevent infinite loading

      return () => clearTimeout(timer);
    }
  }, [isDatabaseReady, authChecked]);

  const value: SobrietyTrackerContextType = {
    currentUser,
    isLoggedIn,
    isLoading,
    leaderboard,
    login,
    signup,
    logout,
    resetProgress,
    refreshLeaderboard,
    checkDatabaseStatus,
    deleteAccount,
    updateAdminStatus,
  };

  return (
    <SobrietyTrackerContext.Provider value={value}>
      {children}
    </SobrietyTrackerContext.Provider>
  );
};