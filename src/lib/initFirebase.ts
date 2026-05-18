import { db } from './firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

export async function initializeDatabase(): Promise<boolean> {
  try {
    const testQuery = query(collection(db, 'test'), where('test', '==', true));
    const testSnapshot = await getDocs(testQuery);

    if (testSnapshot.empty) {
      try {
        await addDoc(collection(db, 'test'), { test: true, timestamp: new Date() });
      } catch {
        // Test doc may already exist or user lacks write permission — non-fatal
      }
    }

    return true;
  } catch {
    // Connection failed — app will still function, Firestore ops will surface their own errors
    return false;
  }
}

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    const testQuery = query(collection(db, 'test'), where('test', '==', true));
    await getDocs(testQuery);
    return true;
  } catch {
    return false;
  }
}
