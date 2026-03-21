import { db } from './firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { handleFirebaseError } from './firebase';

/**
 * Initialize Firebase database with default data
 */
export async function initializeDatabase() {
  try {
    console.log('Initializing Firebase database...');

    // First, check if we can connect to the database
    try {
      // Try a simple read operation to test connection
      const testQuery = query(collection(db, 'users'), where('email', '==', 'nonexistent@test.com'));
      await getDocs(testQuery);
      console.log('Database connection successful');
    } catch (connectionError) {
      console.error('Database connection failed:', connectionError);
      const errorMessage = handleFirebaseError(connectionError);
      console.error('Firebase Error:', errorMessage);

      // If connection fails, try to create a test document to see if we have write access
      try {
        await addDoc(collection(db, 'test'), {
          test: true,
          timestamp: new Date()
        });
        console.log('Write access successful, but read access failed');
        return true;
      } catch (writeError) {
        console.error('Write access also failed:', writeError);
        return false;
      }
    }

    // Check if we already have users collection
    const usersQuery = query(collection(db, 'users'));
    const usersSnapshot = await getDocs(usersQuery);

    if (usersSnapshot.empty) {
      console.log('No users found, creating initial admin user...');

      // Create initial admin user (you can remove this in production)
      await addDoc(collection(db, 'users'), {
        name: 'Admin User',
        email: 'admin@sobrietytracker.com',
        startDate: new Date(),
        streak: 0,
        lastUpdate: new Date(),
        isAdmin: true
      });

      console.log('Initial admin user created');
    } else {
      console.log(`Found ${usersSnapshot.size} existing users`);
    }

    console.log('Database initialization complete');
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    const errorMessage = handleFirebaseError(error);
    console.error('Firebase Error:', errorMessage);
    return false;
  }
}

/**
 * Check if database is properly connected
 */
export async function checkDatabaseConnection() {
  try {
    // Try a simple read operation
    const testQuery = query(collection(db, 'users'), where('email', '==', 'test@test.com'));
    await getDocs(testQuery);
    return true;
  } catch (error) {
    console.error('Database connection check failed:', error);
    const errorMessage = handleFirebaseError(error);
    console.error('Firebase Error:', errorMessage);
    return false;
  }
}