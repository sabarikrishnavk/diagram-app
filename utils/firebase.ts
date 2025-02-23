import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // For Firestore
// import { getDatabase } from 'firebase/database'; // For Realtime Database

// Define the Firebase configuration interface
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Firebase configuration object
// const firebaseConfig: FirebaseConfig = {
//   apiKey: 'YOUR_API_KEY',
//   authDomain: 'YOUR_AUTH_DOMAIN',
//   projectId: 'YOUR_PROJECT_ID',
//   storageBucket: 'YOUR_STORAGE_BUCKET',
//   messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
//   appId: 'YOUR_APP_ID',
// };

const firebaseConfig: FirebaseConfig = {
  apiKey: 'AIzaSyB6fXdl1KMLjyzkFG5gHl0SEfvD0-GNjAs',
  authDomain: 'diagram-app-4d126.firebaseapp.com',
  projectId: 'diagram-app-4d126',
  storageBucket: 'diagram-app-4d126.firebasestorage.app',
  messagingSenderId: '490200816684',
  appId: '1:490200816684:web:3a6aac04f6c10ba6b54589',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (or Realtime Database)
const db = getFirestore(app); // For Firestore
// const db = getDatabase(app); // For Realtime Database

export { db };
