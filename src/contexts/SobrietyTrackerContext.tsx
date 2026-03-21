"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, orderBy, where, doc, updateDoc, onSnapshot, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
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
        setIsDatabaseReady(false);
      }
    };
    initDb();
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    if (!isDatabaseReady) return;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          // User is signed in
          const q = query(collection(db, "users"), where("email", "==", user.email));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            const userDocId = querySnapshot.docs[0].id;

            // Handle timestamp conversion safely
            const startDate = userData.startDate?.toDate ? userData.startDate.toDate() : new Date(userData.startDate);
            const lastUpdate = userData.lastUpdate?.toDate ? userData.lastUpdate.toDate() : new Date(userData.lastUpdate);

            const formattedUser: UserData = {
              id: userDocId,
              name: userData.name || "User",
              email: userData.email,
              startDate: startDate,
              streak: userData.streak || 0,
              lastUpdate: lastUpdate,
              isAdmin: userData.isAdmin || false,
            };

            setCurrentUser(formattedUser);
            setIsLoggedIn(true);
            await refreshLeaderboard();
          } else {
            // User exists in auth but not in Firestore - create user document
            await addDoc(collection(db, "users"), {
              name: user.displayName || "User",
              email: user.email,
              startDate: serverTimestamp(),
              streak: 0,
              lastUpdate: serverTimestamp(),
              isAdmin: false,
            });

            // Fetch the newly created user
            const newQuery = query(collection(db, "users"), where("email", "==", user.email));
            const newSnapshot = await getDocs(newQuery);

            if (!newSnapshot.empty) {
              const newUserData = newSnapshot.docs[0].data();
              const newUserDocId = newSnapshot.docs[0].id;

              const newFormattedUser: UserData = {
                id: newUserDocId,
                name: newUserData.name || "User",
                email: newUserData.email,
                startDate: newUserData.startDate.toDate(),
                streak: newUserData.streak || 0,
                lastUpdate: newUserData.lastUpdate.toDate(),
                isAdmin: newUserData.isAdmin || false,
              };

              setCurrentUser(newFormattedUser);
              setIsLoggedIn(true);
            }
          }
        } else {
          // User is signed out
          setCurrentUser(null);
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error in auth state change:", error);
        showError("Error loading user data");
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
      // Only fetch leaderboard if current user is admin
      if (currentUser?.isAdmin) {
        const q = query(collection(db, "users"), orderBy("streak", "desc"));
        const querySnapshot = await getDocs(q);
        const users: UserData[] = [];

        querySnapshot.forEach((doc) => {
          try {
            const data = doc.data();
            // Handle timestamp conversion safely
            const startDate = data.startDate?.toDate ? data.startDate.toDate() : new Date(data.startDate);
            const lastUpdate = data.lastUpdate?.toDate ? data.lastUpdate.toDate() : new Date(data.lastUpdate);

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
          }
        });

        setLeaderboard(users);
      } else {
        // For non-admin users, return empty leaderboard
        setLeaderboard([]);
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      showError("Error loading leaderboard");
      // Set empty leaderboard to prevent UI issues
      setLeaderboard([]);
    }
  };

  // Check database connection status
  const checkDatabaseStatus = async () => {
    try {
      const testQuery = query(collection(db, 'users'), where('email', '==', 'test@test.com'));
      await getDocs(testQuery);
      return true;
    } catch (error) {
      console.error('Database connection check failed:', error);
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
      const now = serverTimestamp();
      await addDoc(collection(db, "users"), {
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
      const now = serverTimestamp();
      const userRef = doc(db, "users", currentUser.id);
      await updateDoc(userRef, {
        startDate: now,
        streak: 0,
        lastUpdate: now,
      });

      setCurrentUser({ ...currentUser, startDate: new Date(), streak: 0, lastUpdate: new Date() });
      showSuccess("Progress reset successfully!");
    } catch (error: any) {
      console.error("Reset progress error:", error);
      showError(error.message || "Failed to reset progress");
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
      showError(error.message || "Failed to delete account");
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
      showError(error.message || "Failed to update admin status");
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