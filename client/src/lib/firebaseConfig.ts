// Firebase Realtime Cloud Configuration for Cross-Device Sync
// Paste your Firebase Web Config values below.
// If not configured yet, the app safely falls back to local storage.

export const FIREBASE_CONFIG = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

export const IS_FIREBASE_ENABLED = Boolean(
  FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.databaseURL
);
