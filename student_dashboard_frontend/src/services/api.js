/**
 * Lightweight data service with API fallback.
 * If REACT_APP_API_BASE is set, fetches from that API; otherwise serves local mock data.
 */
import { AppConfig } from '../config/config';
import mockProfile from '../mock/profile.json';
import mockSchedule from '../mock/schedule.json';
import mockGrades from '../mock/grades.json';
import mockAnnouncements from '../mock/announcements.json';

const cfg = AppConfig.get();

// PUBLIC_INTERFACE
export async function getProfile() {
  if (!cfg.apiBase) return delay(mockProfile);
  return safeFetch(`${cfg.apiBase}/profile`);
}

// PUBLIC_INTERFACE
export async function getSchedule() {
  if (!cfg.apiBase) return delay(mockSchedule);
  return safeFetch(`${cfg.apiBase}/schedule?upcoming=true`);
}

// PUBLIC_INTERFACE
export async function getGrades() {
  if (!cfg.apiBase) return delay(mockGrades);
  return safeFetch(`${cfg.apiBase}/grades?recent=true`);
}

// PUBLIC_INTERFACE
export async function getAnnouncements() {
  if (!cfg.apiBase) return delay(mockAnnouncements);
  return safeFetch(`${cfg.apiBase}/announcements`);
}

async function safeFetch(url, options = {}) {
  try {
    const res = await fetch(url, {
      headers: { 'Accept': 'application/json' },
      ...options
    });
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }
    return await res.json();
  } catch (e) {
    // Avoid logging sensitive information
    console.warn('Data fetch failed. Falling back to empty data.');
    return {};
  }
}

function delay(data, ms = 250) {
  return new Promise(resolve => setTimeout(()=> resolve(structuredClone(data)), ms));
}
