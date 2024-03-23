import Constants from 'expo-constants';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const expoExtraConfig = Constants.expoConfig?.extra;

// Firebase configuration
const firebaseConfig = {
  apiKey: expoExtraConfig?.apiKey,
  authDomain: expoExtraConfig?.authDomain,
  projectId: expoExtraConfig?.projectId,
  storageBucket: expoExtraConfig?.storageBucket,
  messagingSenderId: expoExtraConfig?.messagingSenderId,
  appId: expoExtraConfig?.appId,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);
export const firebaseDatabase = getFirestore(firebaseApp);
