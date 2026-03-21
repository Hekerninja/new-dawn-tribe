import { db } from './firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

/**
 * Initialize Firebase database with default data
 */
export async function initializeDatabase() {
  try {
    console.log('Initializing Firebase database...');

    // First, check if we can connect to the database
    try {
      const testQuery = query(collection(db, 'users'), where('email', '==', 'nonexistent@test.com'));
      await getDocs(testQuery);
      console.log('Database connection successful');
    } catch (connectionError) {
      console.error('Database connection failed:', connectionError);
      return false;
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
    return false;
  }
}

/**
 * Check if database is properly connected
 */
export async function checkDatabaseConnection() {
  try {
    const testQuery = query(collection(db, 'users'), where('email', '==', 'test@test.com'));
    await getDocs(testQuery);
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}