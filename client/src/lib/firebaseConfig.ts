// Firebase Realtime Cloud Configuration for Cross-Device Sync
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDLxUmEp_3Kea2maBoPXmYo97gnwUM_7eA",
  authDomain: "mentorly-75b78.firebaseapp.com",
  databaseURL: "https://mentorly-75b78-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mentorly-75b78",
  storageBucket: "mentorly-75b78.firebasestorage.app",
  messagingSenderId: "496644963938",
  appId: "1:496644963938:web:60990675f5663938695b3b",
  measurementId: "G-6T327NTPX4"
};

export const IS_FIREBASE_ENABLED = Boolean(
  FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.databaseURL
);
