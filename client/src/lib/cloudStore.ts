import { FIREBASE_CONFIG, IS_FIREBASE_ENABLED } from "./firebaseConfig";
import { Mentor, Booking } from "./appStore";

// Direct REST API calls to Firebase Realtime Database
// Requires zero npm dependencies and works seamlessly in all browsers and on Vercel

function getBaseUrl(): string {
  let url = FIREBASE_CONFIG.databaseURL || "";
  if (url.endsWith("/")) {
    url = url.slice(0, -1);
  }
  return url;
}

/**
 * Fetch all registered mentors from Firebase Cloud
 */
export async function fetchCloudMentors(): Promise<Mentor[] | null> {
  if (!IS_FIREBASE_ENABLED) return null;
  try {
    const res = await fetch(`${getBaseUrl()}/mentors.json`);
    if (!res.ok) return null;
    const data = await res.json();
    if (!data) return [];
    if (Array.isArray(data)) {
      return data.filter(Boolean);
    }
    // If stored as an object with IDs as keys
    return Object.values(data) as Mentor[];
  } catch (err) {
    console.warn("Failed to fetch cloud mentors:", err);
    return null;
  }
}

/**
 * Save or update a mentor in Firebase Cloud
 */
export async function saveCloudMentor(mentor: Mentor): Promise<boolean> {
  if (!IS_FIREBASE_ENABLED) return false;
  try {
    const safeKey = mentor.id.replace(/[.#$[\]]/g, "_");
    const res = await fetch(`${getBaseUrl()}/mentors/${safeKey}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mentor),
    });
    return res.ok;
  } catch (err) {
    console.warn("Failed to save cloud mentor:", err);
    return false;
  }
}

/**
 * Delete a mentor from Firebase Cloud
 */
export async function deleteCloudMentor(mentorId: string): Promise<boolean> {
  if (!IS_FIREBASE_ENABLED) return false;
  try {
    const safeKey = mentorId.replace(/[.#$[\]]/g, "_");
    const res = await fetch(`${getBaseUrl()}/mentors/${safeKey}.json`, {
      method: "DELETE",
    });
    return res.ok;
  } catch (err) {
    console.warn("Failed to delete cloud mentor:", err);
    return false;
  }
}

/**
 * Fetch all bookings from Firebase Cloud
 */
export async function fetchCloudBookings(): Promise<Booking[] | null> {
  if (!IS_FIREBASE_ENABLED) return null;
  try {
    const res = await fetch(`${getBaseUrl()}/bookings.json`);
    if (!res.ok) return null;
    const data = await res.json();
    if (!data) return [];
    if (Array.isArray(data)) {
      return data.filter(Boolean);
    }
    return Object.values(data) as Booking[];
  } catch (err) {
    console.warn("Failed to fetch cloud bookings:", err);
    return null;
  }
}

/**
 * Save a booking to Firebase Cloud
 */
export async function saveCloudBooking(booking: Booking): Promise<boolean> {
  if (!IS_FIREBASE_ENABLED) return false;
  try {
    const safeKey = booking.id.replace(/[.#$[\]]/g, "_");
    const res = await fetch(`${getBaseUrl()}/bookings/${safeKey}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    });
    return res.ok;
  } catch (err) {
    console.warn("Failed to save cloud booking:", err);
    return false;
  }
}
