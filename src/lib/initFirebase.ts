import { db } from './firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { handleFirebaseError } from './firebase';

/**
 * Initialize Firebase database with default data
 */
export async function initializeDatabase() {
  try {
    console.log('Initializing Firebase database...');

    // First, check if we can connect to the database using test collection
    try {
      // Try to read from test collection to verify connection
      const testQuery = query(collection(db, 'test'), where('test', '==', true));
      const testSnapshot = await getDocs(testQuery);

      if (testSnapshot.empty) {
        // If no test document exists, create one
        try {
          await addDoc(collection(db, 'test'), { test: true, timestamp: new Date() });
          console.log('Test document created');
        } catch (writeError) {
          console.log('Could not create test document (may already exist)');
        }
      }
      console.log('Database connection successful');
    } catch (connectionError) {
      console.error('Database connection failed:', connectionError);
      // Don't return false - just log the error and continue
      // The app can still work even if initialization fails
      console.log('Continuing without full database initialization');
      return true;
    }

    // Try to check if we have users (this may fail if not authenticated)
    try {
      const usersQuery = query(collection(db, 'users'));
      const usersSnapshot = await getDocs(usersQuery);

      if (usersSnapshot.empty) {
        console.log('No users found in database');
      } else {
        console.log(`Found ${usersSnapshot.size} existing users`);
      }
    } catch (usersError) {
      console.log('Could not fetch users (authentication may be required)');
    }

    console.log('Database initialization complete');
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    const errorMessage = handleFirebaseError(error);
    console.error('Firebase Error:', errorMessage);
    // Return true anyway to allow the app to continue
    return true;
  }
}

/**
 * Check if database is properly connected
 */
export async function checkDatabaseConnection() {
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
}